# alabarca.com — Ella Barker

Artist portfolio site built with [Hugo](https://gohugo.io/). All content is managed
as Markdown + small data/config files — no HTML editing required to add or change works.

## Run locally

```bash
hugo server        # http://localhost:1313 with live reload
hugo --gc --minify # production build into ./public
```

Requires **Hugo extended** (image processing + asset minification):
`brew install hugo` on macOS.

## Where the content lives

| What | File(s) |
|------|---------|
| Artworks (gallery + detail pages) | `content/work/<slug>/index.md` + image in the same folder |
| Bio text | `content/bio.md` |
| CV (education, exhibitions, awards, collections) | `data/cv.yaml` |
| Contact lede | `content/contact.md` |
| Email, Instagram, tagline, copyright | `hugo.toml` → `[params]` |

## Add a new artwork

```bash
hugo new work/the-title/index.md   # scaffolds from archetypes/work.md
```

Then:

1. Drop the artwork image (`.jpeg`) into the new `content/work/the-title/` folder.
2. Edit `index.md` front matter:
   - `title` — the work's name
   - `weight` — gallery order (lower appears first; existing works step 10, 20, 30, 40)
   - `medium` — e.g. `Oil on canvas`
   - `year` — e.g. `2024`
   - `dimensions` — e.g. `120 × 90 cm` (blank = hidden)
   - `price` — e.g. `$2,400` or `POA` (blank = hidden)
   - `availability` — `available`, `sold`, or `nfs` (shows a badge; `sold` hides the
     Enquire link)
   - `alt` — descriptive alt text for accessibility/SEO
3. Optionally write a description below the front matter (Markdown) — it appears on the
   artwork's own detail page at `/work/the-title/`.

The work automatically appears in the home gallery, gets a detail page, and is wired into
the lightbox. To remove a work, delete its folder.

## Edit the CV

Edit `data/cv.yaml`. Each section has a `title` and a list of `rows` (`year` + `detail`).
`detail` accepts Markdown — `*italics*` for exhibition titles — and the inline
`<span class="place">…</span>` for the muted venue text.

## Structure

```
content/        Markdown content (works, bio, contact, cv)
data/cv.yaml    Structured CV data
layouts/        Templates: baseof, partials (head/header/footer/work-card),
                gallery (index.html), artwork detail (work/single.html),
                bio/contact/cv page layouts
assets/css|js   Styles + lightbox JS (piped & fingerprinted by Hugo)
archetypes/     Scaffold for `hugo new work/...`
hugo.toml       Site config + site-wide params
```
