export const SITE = {
  name: 'Snap News',
  tagline: 'Global politics and economics, in plain English.',
  description:
    'Snap News explains the world’s politics and economics for everyday readers: what happened, why it matters, and who it affects.',
  author: 'Snap Father Patrick',
  locale: 'en-GB',
};

export const REGIONS = [
  { slug: 'africa', label: 'Africa' },
  { slug: 'asia-pacific', label: 'Asia-Pacific' },
  { slug: 'europe', label: 'Europe' },
  { slug: 'latin-america', label: 'Latin America & Caribbean' },
  { slug: 'middle-east', label: 'Middle East & North Africa' },
  { slug: 'north-america', label: 'North America' },
  { slug: 'russia-central-asia', label: 'Russia & Central Asia' },
] as const;

export const TOPICS = [
  { slug: 'economy', label: 'Economy', blurb: 'Prices, wages, jobs, debt and who profits.' },
  { slug: 'politics', label: 'Politics', blurb: 'Governments, elections and who really decides.' },
] as const;

export const TYPES = {
  snap: 'Snap',
  analysis: 'Analysis',
  explainer: 'Explained',
} as const;

export type RegionSlug = (typeof REGIONS)[number]['slug'];
export type TopicSlug = (typeof TOPICS)[number]['slug'];

export const regionLabel = (slug: string) => REGIONS.find((r) => r.slug === slug)?.label ?? slug;
export const topicLabel = (slug: string) => TOPICS.find((t) => t.slug === slug)?.label ?? slug;
