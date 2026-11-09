---
name: site-improve
description: Run one iteration of the Snap News self-improvement loop - pick the top item from IMPROVEMENTS.md (or audit the site to find one), implement it, build and visually verify it, commit and push, and log the result. Use when asked to improve the site, run the improvement loop, or via /loop /site-improve.
---

# Snap News self-improvement loop: one iteration

Each run makes **exactly one** small, verified improvement to the Snap News website, then stops.
Run it repeatedly (e.g. `/loop /site-improve`) to keep improving the site.

## Hard rules (never break these)

1. **Engineering and design only. Never write editorial content.** Do not write, edit or publish
   articles, headlines, opinions, or claims about real events, people or politics. Articles in
   `src/content/articles/` belong to Snap Father Patrick. You may only touch their *formatting* if
   a feature requires it, and the `sample-*.md` / `_TEMPLATE.md` files.
2. **Security and privacy stay strict.** No third-party scripts, fonts, CDNs, trackers, analytics,
   ads or embeds. Keep the Content-Security-Policy in `src/layouts/Base.astro` at least as strict
   as it is. No secrets in the repo.
3. **Pen name stays intact.** Commit as the configured git identity (Snap Father Patrick, noreply
   email). Never add the owner's real name or email anywhere.
4. **One improvement per iteration**, small enough to review in one sitting. No big rewrites,
   no framework swaps, no dependency added without a clear reason (note it in the log).
5. **Never break the build.** If `npm run build` fails or the browser check shows errors and you
   can't fix it within this iteration, revert your changes (`git checkout -- . && git clean -fd src public`)
   and log the item as blocked.
6. Push only to the current working branch. Never force-push, never push to `main`,
   never open a pull request unless the user asked.
7. Items that need a decision or an account from the owner (newsletter provider, custom domain,
   paid services) are **not** done by the loop: move them to the "Needs owner" section.

## Steps

1. **Orient.** `git status` (must be clean; if not, stop and report), `git pull` the current branch,
   read `IMPROVEMENTS.md`.
2. **Pick.** Take the first unchecked item in "Backlog". If the backlog is empty, audit the site
   and add 3-5 new well-scoped items first (sources of ideas: accessibility, mobile layout,
   performance, SEO/structured data, reading experience, writer workflow, security hardening,
   build checks). Then take the first one.
3. **Implement** the change following the existing code style (Astro components, CSS custom
   properties in `src/styles/global.css`, `url()` helper for internal links because of the
   `/sk_politics` base path).
4. **Verify.**
   - `npm run build` must succeed.
   - Start `npx astro preview --port 4321` in the background and use Playwright (preinstalled,
     `require('playwright')`) to load the affected pages at desktop (1400x900) and phone
     (`devices['iPhone 13']`) sizes, plus dark mode if styling changed. Collect `pageerror` and
     console errors - there must be none. Look at the screenshots yourself; fix anything ugly.
     Save screenshots in the scratchpad, not the repo.
   - Stop the preview server.
5. **Commit and push.** One commit, message `Improve: <short summary>` with a short body explaining
   what and why, then `git push -u origin <current-branch>`.
6. **Log.** In `IMPROVEMENTS.md`, check the item off and move it to "Done" with the date and the
   commit's short hash (amend nothing - make the log update part of the same commit by editing
   the file before committing).
7. **Report** in 2-4 lines: what changed, how it was verified, what's next in the backlog.

## Stop conditions (end the loop instead of continuing)

- The working tree was dirty at the start, or a push was rejected.
- The same item failed twice.
- Only "Needs owner" items remain and an audit finds nothing worthwhile.
- The user asked to stop.
