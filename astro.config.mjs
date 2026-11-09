// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://dxtlu.github.io/sk_politics/
// If you add a custom domain later, set `site` to it and remove `base`.
export default defineConfig({
  site: 'https://dxtlu.github.io',
  base: '/sk_politics',
  integrations: [sitemap()],
  vite: {
    build: {
      // Keep scripts as separate files so the Content-Security-Policy can forbid inline scripts.
      assetsInlineLimit: 0,
    },
  },
});
