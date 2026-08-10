# There's Photos of Everyone

A password-gated, search-engine-invisible archive. Jekyll, hosted on GitHub Pages.

**To add a post, read [POSTING.md](POSTING.md).**

## Layout of the repo

```
_posts/            one file per entry — this is where you work
_seasons/          one file per season; the filename is the season number
_data/tags.yml     the tag vocabulary
_includes/         media helpers, the gate, the disclaimer
_layouts/          page shells
assets/images/     upload photos here
assets/video/      upload video files here
assets/css/        the look
index.html         landing page
archive.html       one row per season
latest.html        every post in full, newest first, scrolls forever
tags.html          the hashtag index
about.html         the disclaimer, readable again after you're in
password.html      tool for changing the password (lives at /password/)
```

## Getting in

Two steps, in order:

1. **The password.** One password, checked in the browser against a PBKDF2-SHA256 hash
   kept in `_config.yml`. The password itself is never stored anywhere in the repo.
   Change it at `/password/` on the live site.
2. **The disclaimer.** The text from `_includes/disclaimer.html`, with a checkbox that
   has to be ticked before the Enter button does anything. Nobody reaches the archive
   without passing both.

Both are remembered per browser. **Lock** in the footer clears them and starts over.
Bumping `gate.terms_version` in `_config.yml` re-asks everyone to agree.

The password is a locked door, not a safe — these are static files, so someone technical
could read a page's source without unlocking. It keeps out anyone who wanders in, which
is what it's for.

## Reading

**Latest** and each season page are feeds: whole posts, one after another, scrolling.
Everything is in the page already; only the first `feed_step` (default 8) are visible
and more reveal as you approach the bottom, so a season with hundreds of entries still
opens instantly. There's a **Load more** button for anyone who'd rather click.

## Staying unfindable

Every page ships `noindex, nofollow, noarchive, noimageindex` — that's what actually
keeps it out of search results. There's no sitemap, no feed, no link previews, and no
referrer is sent on outbound clicks. `robots.txt` blocks every crawler by name, but note
that crawlers only read `robots.txt` from the root of a domain, and this is a project
site served from a subfolder — see POSTING.md §10 for how to cover the domain too.

The address itself is the last piece. Don't post it publicly.

## Where it's served

`https://duluxerivers.github.io/theresphotosofeveryone/`

`baseurl` in `_config.yml` has to match that subfolder. Put a custom domain on it and
you must change `baseurl` to `""`.

## Running it locally (optional)

```
bundle install
bundle exec jekyll serve
```
