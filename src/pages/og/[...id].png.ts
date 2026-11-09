// Builds a 1200x630 share image (Open Graph) for every article at build time.
// Pure SVG rendered to PNG with sharp: no external services, nothing loaded at runtime.
// Uses the DejaVu fonts, which are installed on GitHub's Ubuntu build machines.
import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { SITE, TYPES, regionLabel } from '../../consts';
import { getArticles, formatDate, type Article } from '../../utils/site';

export const getStaticPaths = (async () => {
  const articles = await getArticles();
  return articles.map((article) => ({ params: { id: article.id }, props: { article } }));
}) satisfies GetStaticPaths;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Greedy word wrap by approximate character count; ellipsis on the last line if it overflows. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= maxChars) { line = next; continue; }
    if (line) lines.push(line);
    line = word;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/\s*\S*$/, '') + '…';
    return kept;
  }
  return lines;
}

function render(article: Article): string {
  const d = article.data;
  // Shorter headlines get bigger type.
  const size = d.title.length <= 40 ? 76 : d.title.length <= 80 ? 64 : 54;
  const perLine = Math.floor(1040 / (size * 0.64)); // DejaVu Serif Bold averages ~0.6em per character
  const lines = wrap(d.title, perLine, 4);
  const lineH = Math.round(size * 1.15);
  const kicker = [TYPES[d.type], d.regions[0] && regionLabel(d.regions[0])].filter(Boolean).join('  ·  ').toUpperCase();
  const top = 200; // kicker baseline; the headline sits below it (4 lines max fit above the footer rule)

  const spark = [
    [16, 2.5, 16, 9], [16, 23, 16, 29.5], [2.5, 16, 9, 16], [23, 16, 29.5, 16],
    [6.5, 6.5, 10.6, 10.6], [21.4, 21.4, 25.5, 25.5], [25.5, 6.5, 21.4, 10.6], [10.6, 21.4, 6.5, 25.5],
  ].map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#16181d"/>
  <rect x="0" y="0" width="1200" height="8" fill="#f97316"/>
  <g transform="translate(80 58) scale(1.5)" stroke="#f97316" stroke-width="2.6" stroke-linecap="round">${spark}<circle cx="16" cy="16" r="3.4" fill="#f97316" stroke="none"/></g>
  <text x="142" y="96" font-family="DejaVu Sans" font-weight="bold" font-size="34" letter-spacing="2" fill="#ece9e2">SNAP<tspan fill="#f97316" dx="10">NEWS</tspan></text>
  <text x="80" y="${top}" font-family="DejaVu Sans" font-weight="bold" font-size="24" letter-spacing="3" fill="#f97316">${esc(kicker)}</text>
  <text font-family="DejaVu Serif" font-weight="bold" font-size="${size}" fill="#ece9e2">
    ${lines.map((l, i) => `<tspan x="80" y="${top + 26 + size + i * lineH}">${esc(l)}</tspan>`).join('\n    ')}
  </text>
  <line x1="80" y1="540" x2="1120" y2="540" stroke="#2c2f36" stroke-width="2"/>
  <text x="80" y="582" font-family="DejaVu Sans" font-size="26" fill="#9aa0aa">By ${esc(SITE.author)}  ·  ${esc(formatDate(d.date))}</text>
</svg>`;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await sharp(Buffer.from(render(props.article as Article))).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
