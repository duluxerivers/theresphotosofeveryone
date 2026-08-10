(function () {
  "use strict";

  /* --- third-party embeds -------------------------------------------- */
  /* Only pull in Twitter's script when the page actually has an embed.   */

  var twLoaded = false;

  function loadTweets() {
    if (!document.querySelector(".twitter-tweet")) return;
    if (!twLoaded) {
      twLoaded = true;
      var s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      s.charset = "utf-8";
      document.body.appendChild(s);
      return;
    }
    // Already loaded — ask it to pick up anything newly revealed.
    if (window.twttr && window.twttr.widgets) window.twttr.widgets.load();
  }

  /* --- feeds ----------------------------------------------------------- */
  /* Every post is in the page; we reveal them a batch at a time so a       */
  /* season with hundreds of entries still opens instantly.                */

  function initFeed() {
    var feed = document.querySelector("[data-feed]");
    if (!feed) return;

    var step  = parseInt(feed.getAttribute("data-step"), 10) || 8;
    var items = Array.prototype.slice.call(feed.querySelectorAll(".fpost"));
    var end   = document.querySelector("[data-feed-end]");
    var more  = document.querySelector("[data-feed-more]");
    var count = document.querySelector("[data-feed-count]");
    var shown = 0;

    // Count what the server already rendered visible.
    items.forEach(function (el) { if (!el.classList.contains("is-hidden")) shown++; });

    function sync() {
      if (!end) return;
      if (shown >= items.length) {
        end.hidden = true;
      } else {
        end.hidden = false;
        if (count) {
          count.textContent = shown + " of " + items.length;
        }
      }
    }

    var PREFETCH = 600; // start loading this far before the reader gets there

    function endInView() {
      if (!end || end.hidden) return false;
      var r = end.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) + PREFETCH;
    }

    function reveal() {
      if (shown >= items.length) return;
      var to = Math.min(shown + step, items.length);
      for (var i = shown; i < to; i++) items[i].classList.remove("is-hidden");
      shown = to;
      sync();
      loadTweets();

      // IntersectionObserver only fires on a *change*, so if the batch we just
      // added still doesn't fill the screen, keep going until it does.
      if (endInView()) requestAnimationFrame(reveal);
    }

    if (more) more.addEventListener("click", reveal);

    // Auto-reveal as the bottom comes into view, with the button as fallback.
    if (end && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) reveal(); });
      }, { rootMargin: PREFETCH + "px 0px" });
      io.observe(end);
    }

    sync();
  }

  /* --- lightbox ------------------------------------------------------- */

  var box, boxImg;

  function ensureBox() {
    if (box) return;
    box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    boxImg = document.createElement("img");
    boxImg.alt = "";
    box.appendChild(boxImg);
    document.body.appendChild(box);
    box.addEventListener("click", close);
  }

  function open(src, alt) {
    ensureBox();
    boxImg.src = src;
    boxImg.alt = alt || "";
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    if (!box) return;
    box.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    var img = e.target.closest ? e.target.closest(".fig__img") : null;
    if (!img) return;
    e.preventDefault();
    open(img.getAttribute("data-full") || img.currentSrc || img.src, img.alt);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  /* --- go -------------------------------------------------------------- */

  initFeed();
  loadTweets();
})();
