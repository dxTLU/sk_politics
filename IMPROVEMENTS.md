# Snap News improvement backlog

Worked through one item at a time by the `site-improve` skill (`.claude/skills/site-improve/`).
Add ideas to the Backlog in priority order. The loop takes the top unchecked item.

## Backlog

- [ ] Corrections support: optional `correction` field in the article schema, shown as a notice at the top of the article.
- [ ] Series support: optional `series` field, a series landing page, and "Next in this series" links.
- [ ] Archive page listing all articles by month.
- [ ] Print stylesheet for articles (hide menu, share buttons; show link URLs).
- [ ] Accessibility audit with axe-core in Playwright (install as a dev dependency); fix every violation found.
- [ ] Strip EXIF/location metadata from images automatically (use Astro's image pipeline for article images) and document how to add images in the README.
- [ ] Previous/next article links at the end of each article.

## Needs owner

- Newsletter provider choice (Buttondown, Substack, Beehiiv, ...) before a signup form can be added.
- Custom domain (then update `site`/`base` in `astro.config.mjs` and `public/robots.txt`).
- Social media account links for the footer.

## Done

- [x] 2026-11-09: Per-article share images. `/og/<article>.png` (1200x630) is drawn at build time from the headline, type, region, byline and date, and used for `og:image` and the article's structured data. Added dependency: `sharp` (pinned to the version Astro already installs) to turn the SVG into a PNG. Uses DejaVu fonts, which GitHub's build machines have.
- [x] 2026-11-09: Glossary. Terms live in `src/content/glossary.yaml`; `[wording](glossary:id)` in an article becomes a tap/click definition card (native `popover`, no JavaScript); A–Z page at `/explained/glossary/`. Added dependencies: `yaml` (read the glossary at build time) and `@astrojs/markdown-satteri` (Astro's Markdown engine, to register the plugin); both were already installed by Astro.
- [x] 2026-11-09: "In this piece" table of contents on analysis articles with 3+ subheadings (`TableOfContents.astro`, no JavaScript).
- [x] 2026-11-09: Reading progress bar on article pages (`ReadingProgress.astro`): fixed, transform-only, no layout shift, no animation under reduced motion.
- [x] 2026-11-09: CI build check on every push to non-main branches and every pull request (`.github/workflows/ci.yml`).
- [x] 2026-11-09: Initial site: sidebar with World News regions dropdown, sections, article pages, search, RSS, sitemap, CSP, deploy workflow.
