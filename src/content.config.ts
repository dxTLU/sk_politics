import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { REGIONS, TOPICS } from './consts';

const regionSlugs = REGIONS.map((r) => r.slug) as [string, ...string[]];
const topicSlugs = TOPICS.map((t) => t.slug) as [string, ...string[]];

const articles = defineCollection({
  // Files starting with "_" (like _TEMPLATE.md) are ignored.
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    dek: z.string().describe('One-sentence subtitle under the headline'),
    type: z.enum(['snap', 'analysis', 'explainer']).default('snap'),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    regions: z.array(z.enum(regionSlugs)).default([]),
    topics: z.array(z.enum(topicSlugs)).default([]),
    tags: z.array(z.string()).default([]),
    takeaways: z.array(z.string()).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
