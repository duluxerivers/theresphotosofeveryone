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
tags: [ryan, oliver, interview]
---
```

Below that `---`, write whatever you want. Plain paragraphs work. Blank line between
paragraphs.

| Field    | What it does |
|----------|--------------|
| `title`  | Shows as the headline. Keep the quotes. |
| `date`   | Sorts the post and files it under a year. |
| `season` | Files it under a season. Numbers come from `_data/seasons.yml` — `0` is Pre-2018. Leave it out if it doesn't belong to one. |
| `tags`   | The hashtags. Lowercase, no spaces — use hyphens: `on-set`, `red-carpet`. |
| `source` | Optional. A URL — shows as a small "Source:" line at the bottom. |
| `subtitle` | Optional. One line under the headline. |

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
tags: [ryan, oliver, panel, paleyfest]
source: https://example.com/article
---

They sat next to each other for the whole thing.

{% include youtube.html id="dQw4w9WgXcQ" caption="Full panel" %}

{% include image.html src="paley01.jpg" caption="Backstage" %}

{% include tweet.html url="https://twitter.com/someone/status/123"
   text="they would not stop looking at each other" %}
```

---

## 8. Seasons

Season names live in `_data/seasons.yml`. Edit the labels there, or add a new one:

```yaml
- number: 10
  label: "2026–2027 — Season 10"
```

---

## 9. Changing the password

Go to **/password/** on the live site (you'll need the current password to see it).
Type the new one, and it hands you a block of text. Paste that over the `gate:` section
in `_config.yml` and commit.

Anyone who already unlocked the site stays unlocked until they clear their browser
storage or hit **Lock** in the footer. The new password applies to everyone else.

**Be clear about what this is:** the gate keeps out anyone who wanders in. It is not
real encryption — the pages are static files, so someone determined and technical
could read the page source directly. Treat it as a locked door, not a safe.

---

## 10. What keeps it unfindable

- `robots.txt` blocks every crawler, including the AI ones and the Internet Archive
- every page carries `noindex, nofollow, noarchive, noimageindex`
- no sitemap, no RSS feed, no link previews, no referrer sent when you click out
- nothing is submitted to any search engine

The one thing left is the address itself. Don't post the URL publicly.
