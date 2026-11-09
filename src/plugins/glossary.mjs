// Turns Markdown links like [wording](glossary:term-id) into a tappable term that opens a
// small definition card. Uses the native HTML `popover` attribute: no JavaScript needed,
// works with mouse, touch and keyboard, and closes on outside tap or Escape.
// Written as a hast plugin for Astro's default Markdown processor (Sätteri).
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

const PREFIX = 'glossary:';

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** @param {{ file: string, pageUrl: string }} options */
export function glossaryPlugin({ file, pageUrl }) {
  // Factory runs once per document: re-reads the glossary (so dev edits show up) and resets ids.
  return () => {
    const entries = parse(readFileSync(file, 'utf8')) ?? [];
    const glossary = new Map(entries.map((e) => [e.id, e]));
    let n = 0;

    return {
      name: 'snap-glossary',
      element: {
        filter: ['a'],
        visit(node, ctx) {
          const href = String(node.properties?.href ?? '');
          if (!href.startsWith(PREFIX)) return;

          const id = href.slice(PREFIX.length);
          const label = ctx.textContent(node);
          const entry = glossary.get(id);
          if (!entry) {
            ctx.report({ message: `Unknown glossary term "${id}"; shown as plain text.`, node, severity: 'warning' });
            console.warn(`[glossary] Unknown term "${id}" in ${ctx.fileURL?.pathname ?? 'an article'}; shown as plain text.`);
            ctx.replaceNode(node, { type: 'text', value: label });
            return;
          }

          const popId = `gloss-${id}-${++n}`;
          const html =
            `<span class="gloss">` +
            `<button type="button" class="gloss-term" popovertarget="${popId}" title="${esc(entry.definition)}">${esc(label)}</button>` +
            `<span id="${popId}" popover="auto" class="gloss-card" role="note">` +
            `<strong class="gloss-title">${esc(entry.term)}</strong>` +
            `<span class="gloss-def">${esc(entry.definition)}</span>` +
            `<a class="gloss-more" href="${esc(pageUrl)}#${esc(id)}">Full glossary →</a>` +
            `</span></span>`;
          ctx.replaceNode(node, { type: 'raw', value: html });
        },
      },
    };
  };
}
