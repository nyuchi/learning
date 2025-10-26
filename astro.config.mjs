import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://african-education-framework.vercel.app',
  integrations: [mdx(), sitemap()],
  output: 'static',
});
