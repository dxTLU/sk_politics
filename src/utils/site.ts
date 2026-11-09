import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../consts';

export type Article = CollectionEntry<'articles'>;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the site's base path (needed on GitHub Pages). */
export const url = (path = '/') => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
};

export const articleUrl = (a: Article) => url(`/articles/${a.id}/`);

/** Published articles, newest first. Drafts are hidden in the built site but visible in `npm run dev`. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', (a) => import.meta.env.DEV || !a.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString(SITE.locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export const readingTime = (body = '') => {
  const words = body.replace(/[#*_>`\[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
};
