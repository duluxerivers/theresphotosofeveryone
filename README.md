# There's Photos of Everyone

A password-gated, search-engine-invisible archive. Jekyll, hosted on GitHub Pages.

**To add a post, read [POSTING.md](POSTING.md).**

## Layout of the repo

```
_posts/            one file per entry — this is where you work
_data/seasons.yml  the season list
_includes/         image / gallery / youtube / tweet / video helpers, the gate
_layouts/          page shells
assets/images/     upload photos here
assets/video/      upload video files here
assets/css/        the look
index.html         landing page + the disclaimer
archive.html       browse by season or by year
tags.html          the hashtag index
latest.html        newest first
password.html      tool for changing the password (lives at /password/)
```

## The gate

A single password, checked in the browser against a PBKDF2-SHA256 hash kept in
`_config.yml`. The password itself is never stored anywhere in the repo. Change it
at `/password/` on the live site.

It is a locked door, not a safe — these are static files, so someone technical could
read a page's source without unlocking. It keeps out anyone who wanders in, which is
what it's for.

## Staying unfindable

`robots.txt` blocks every crawler including the AI scrapers and the Internet Archive;
every page ships `noindex, nofollow, noarchive, noimageindex`; there's no sitemap, no
feed, no link previews, and no referrer is sent on outbound clicks.

The address itself is the last piece. Don't post it publicly.

## Running it locally (optional)

```
bundle install
bundle exec jekyll serve
```
