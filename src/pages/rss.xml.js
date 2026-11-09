import rss from '@astrojs/rss';
import { SITE } from '../consts';
import { getArticles } from '../utils/site';

export async function GET(context) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const articles = await getArticles();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site + base.replace(/^\//, ''),
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.dek,
      pubDate: a.data.date,
      link: `${base}/articles/${a.id}/`,
      categories: [...a.data.regions, ...a.data.topics],
    })),
  });
}
