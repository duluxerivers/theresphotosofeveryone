# How to post

Everything lives in the `_posts/` folder. One file = one post.

---

## 1. Make a new post

Click **Add file → Create new file** on GitHub and name it:

```
_posts/2019-03-14-a-short-name-for-it.md
```

The date at the front of the filename is required, and it must be `YYYY-MM-DD`.

Then paste this at the very top of the file:

```yaml
---
title: "What happened"
date: 2019-03-14
season: 3
tags: ["posted by oliver"]
---
```

Below that `---`, write whatever you want. Plain paragraphs work. Blank line between
paragraphs.

| Field    | What it does |
|----------|--------------|
| `title`  | Shows as the headline. Keep the quotes. |
| `date`   | Sorts the post and puts it in the right place in the season. |
| `season` | Files it under a season. The number is the filename in `_seasons/` — `0` is Pre-2018, `2` is Season 2. Leave it out if it doesn't belong to one. |
| `tags`   | The hashtags. Use them exactly as written in `_data/tags.yml` — see §8. |
| `source` | Optional. A URL — shows as a small "Source:" line at the bottom. |
| `subtitle` | Optional. One line under the headline. |

Posts show up in three places automatically: the season page, **Latest**, and any
tag you gave it. You never have to add it to a list by hand.

---

## 2. Formatting

```markdown
**bold**   *italic*

## A heading inside the post

> A pulled quote

[link text](https://example.com)

- a list
- of things
```

---

## 3. Pictures

Upload the image into `assets/images/` (**Add file → Upload files**), then:

```liquid
{% include image.html src="filename.jpg" caption="Somewhere, 2019" %}
```

Several at once, as a grid:

```liquid
{% include gallery.html src="one.jpg, two.jpg, three.jpg" caption="Set photos" %}
```

An image hosted somewhere else — pass the full URL instead of a filename.

Images are slightly desaturated and go full colour on hover; click one to blow it up.
(To turn the desaturation off site-wide, set `moody_images: false` in `_config.yml`.)

---

## 4. YouTube

```liquid
{% include youtube.html id="dQw4w9WgXcQ" caption="The interview" %}
```

Or just paste the link:

```liquid
{% include youtube.html url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}
```

Start partway in:

```liquid
{% include youtube.html id="dQw4w9WgXcQ" start="215" %}
```

---

## 5. Tweets / X posts

```liquid
{% include tweet.html url="https://twitter.com/someone/status/1234567890" %}
```

**Worth doing:** also type out what the tweet said. It stays on the page if the post
is ever deleted or the account goes private.

```liquid
{% include tweet.html url="https://twitter.com/someone/status/1234567890"
   text="what the tweet actually said" date="14 March 2019" %}
```

---

## 6. Video files

Upload to `assets/video/`, then:

```liquid
{% include video.html src="clip.mp4" caption="Panel, 2019" %}
```

---

## 7. A full example

```markdown
---
title: "The panel at PaleyFest"
date: 2019-03-17
season: 2
tags: ["posted by ryan"]
source: https://example.com/article
---

They sat next to each other for the whole thing.

{% include youtube.html id="dQw4w9WgXcQ" caption="Full panel" %}

{% include image.html src="paley01.jpg" caption="Backstage" %}

{% include tweet.html url="https://twitter.com/someone/status/123"
   text="they would not stop looking at each other" %}
```

---

## 8. Tags

The list of tags lives in `_data/tags.yml`. Right now it's:

```yaml
- name: "photo credit oliver stark"
- name: "posted by oliver"
- name: "posted by ryan"
```

On a post, write them exactly as they appear there, in square brackets and quotes:

```yaml
tags: ["posted by oliver", "photo credit oliver stark"]
```

**To add a new tag:** add a `- name: "…"` line to `_data/tags.yml`, then use it on a
post. Both steps matter — the file is the menu, the post is what puts it on the page.

The **/tags/** page shows every tag in the list. Ones nothing uses yet appear dimmed
with a dashed outline, so you can see what's available without hunting. Click a tag
that's in use to see everything filed under it.

*(A tag used on a post but missing from `_data/tags.yml` still shows up, so nothing
gets silently dropped — but add it to the file so the list stays honest.)*

---

## 9. Seasons

One file per season in `_seasons/`. The filename is the number you put in a post's
`season:` field — `_seasons/3.md` is `season: 3`, and lives at `/season/3/`.

To rename a season, edit its `label`:

```yaml
---
layout: season
number: 3
label: "Season 3 — 2019–2020"
---
```

Anything you write under that second `---` shows as an intro at the top of the season
page.

To add a season, make `_seasons/10.md`:

```yaml
---
layout: season
number: 10
label: "Season 10 — 2026–2027"
---
```

Season and year are the same thing here — one list, one link per season. A season with
nothing in it yet shows dimmed on the archive page.

---

## 10. Changing the password

Go to **/password/** on the live site (you'll need the current password to see it).
Type the new one, and it hands you a block of text. Paste that over the `gate:` section
in `_config.yml` and commit.

Anyone who already unlocked the site stays unlocked until they clear their browser
storage or hit **Lock** in the footer. The new password applies to everyone else.

**Be clear about what this is:** the gate keeps out anyone who wanders in. It is not
real encryption — the pages are static files, so someone determined and technical
could read the page source directly. Treat it as a locked door, not a safe.

---

## 11. What keeps it unfindable

- **Every page carries `noindex, nofollow, noarchive, noimageindex`.** This is the one
  doing the real work. It tells search engines not to list the page even if they find it.
- No sitemap, no RSS feed, no link previews when the URL is pasted anywhere, and no
  referrer sent when you click a link out
- Nothing is submitted to any search engine
- `robots.txt` names and blocks every crawler including the AI scrapers — see the caveat
  below

**Caveat on robots.txt.** The site is served from a folder
(`duluxerivers.github.io/theresphotosofeveryone/`), and crawlers only read `robots.txt`
from the top of a domain. So ours sits at a path they will not look at. It costs nothing
to keep, but the `noindex` tags are what actually protect the site — and they're the
stronger of the two anyway, because `noindex` stops a page being *listed*, while
`robots.txt` only asks a crawler not to *look*.

If you want the domain-level block as well, make a second repo named exactly
`duluxerivers.github.io`, put a `robots.txt` in it with:

```
User-agent: *
Disallow: /
```

That covers everything you ever host on that address.

The last thing is the address itself. Don't post the URL publicly.

---

## 12. The disclaimer people agree to

The text lives in one place: `_includes/disclaimer.html`. It's shown on the way in,
behind a checkbox nobody can skip, and again at **/about/**.

Edit that one file and both update.

If you change it meaningfully and want everyone to read and agree again, bump
`terms_version` in `_config.yml`:

```yaml
gate:
  terms_version: "2"
```

Everyone who already agreed will be shown the new text on their next visit. (They won't
have to re-enter the password — that's tracked separately.)

---

## 13. Where to keep the images

**Short answer: keep them here, in `assets/images/`.**

GitHub Pages gives you 1 GB of published site and a 100 GB/month soft bandwidth limit.
Your photos run around 200 KB each, so that's roughly **5,000 images** before you're
anywhere near the ceiling — and resizing anything wider than about 1600px would push
that further. You are a long way from having a storage problem.

**Don't hotlink from Twitter/X to save space.** It defeats the point of an archive:

- Tweets get deleted, and accounts go private or get suspended. When that happens the
  image is gone from your site too, and you often won't notice for months.
- X has repeatedly broken embed access for logged-out visitors. Your readers aren't
  logged in to X inside your page.
- The whole reason this archive exists is that the original ryliver docs went away.
  Don't rebuild it on top of something that can do the same thing.

**What to do instead — do both:**

1. Save the image into `assets/images/` and post it with `image.html`. That's your
   permanent copy, and it can't be taken away.
2. If the tweet *itself* is the thing worth keeping (the wording, the timestamp, who
   replied), embed it as well with `tweet.html` — and fill in the `text=` fallback so
   the words survive even if the tweet doesn't.

**Housekeeping that buys you room, in order of how much it helps:**

- Resize before uploading. Nothing needs to be wider than ~1600px. Halves your storage
  for no visible difference.
- Save photos as `.jpg`, not `.png`. PNG screenshots of photos are several times larger.
- Screenshots of text (tweets, articles) can go down to ~1000px wide and still read fine.

**If you ever genuinely outgrow 1 GB** — which would be thousands of entries — the next
step is a second repo just for images, served from its own Pages site, and `image.html`
already accepts a full URL so posts wouldn't need rewriting. Git LFS does *not* work with
GitHub Pages, so don't go down that road. But this is a bridge for a long way off.
