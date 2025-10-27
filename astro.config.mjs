import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://learning.nyuchi.com',
  integrations: [mdx(), sitemap()],
  output: 'static',
});
