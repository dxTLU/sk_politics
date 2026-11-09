# Snap News improvement backlog

Worked through one item at a time by the `site-improve` skill (`.claude/skills/site-improve/`).
Add ideas to the Backlog in priority order. The loop takes the top unchecked item.

## Backlog

- [ ] Glossary: a `glossary` content collection, an `/explained/glossary/` A-Z page, and a way to mark terms in articles that show a hover/tap definition. Seed only neutral placeholder terms.
- [ ] Generate a share image (Open Graph PNG) for each article with its headline, at build time, without third-party services.
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

- [x] 2026-11-09: "In this piece" table of contents on analysis articles with 3+ subheadings (`TableOfContents.astro`, no JavaScript).
- [x] 2026-11-09: Reading progress bar on article pages (`ReadingProgress.astro`): fixed, transform-only, no layout shift, no animation under reduced motion.
- [x] 2026-11-09: CI build check on every push to non-main branches and every pull request (`.github/workflows/ci.yml`).
- [x] 2026-11-09: Initial site: sidebar with World News regions dropdown, sections, article pages, search, RSS, sitemap, CSP, deploy workflow.
