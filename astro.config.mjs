import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO (before going live): set `site` to your real production URL.
// It is used for canonical URLs, Open Graph tags and the sitemap.
export default defineConfig({
  site: 'https://example.netlify.app',
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL', en: 'en-US' } },
    }),
  ],
});
