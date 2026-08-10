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
