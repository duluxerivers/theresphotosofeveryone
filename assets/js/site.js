(function () {
  "use strict";

  /* --- lightbox ------------------------------------------------------ */

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

  /* --- twitter / x embeds -------------------------------------------- */
  /* Only pull in the third-party script when the page actually has one.  */

  if (document.querySelector(".twitter-tweet")) {
    var s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    s.charset = "utf-8";
    document.body.appendChild(s);
  }
})();
