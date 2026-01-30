import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

/**
 * Astro Configuration for Nyuchi Learning
 *
 * Features:
 * - Static site generation for optimal performance
 * - Enhanced sitemap with priority and changefreq
 * - MDX support for rich content
 * - React integration for interactive components
 *
 * @see https://astro.build/config
 */

// Site URL
const siteUrl = 'https://learning.nyuchi.com';

// Sitemap configuration with priorities
const sitemapConfig = {
  // Custom filter to exclude certain pages
  filter: (page) => {
    // Exclude 404 and API routes
    return !page.includes('/404') && !page.includes('/api/');
  },

  // Custom serialization for priority and changefreq
  serialize: (item) => {
    const url = item.url;
    const path = new URL(url).pathname;

    // Define priorities based on page type
    let priority = 0.5;
    let changefreq = 'monthly';

    // Homepage - highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    }
    // Main framework pages - high priority
    else if (['/framework', '/frameworks', '/digital-literacy-framework', '/support-framework'].some(p => path.startsWith(p))) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    // Resources and pricing - high priority
    else if (['/resources', '/pricing'].some(p => path.startsWith(p))) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Blog posts - medium-high priority
    else if (path.startsWith('/blog')) {
      priority = path === '/blog' || path === '/blog/' ? 0.8 : 0.7;
      changefreq = path === '/blog' || path === '/blog/' ? 'weekly' : 'monthly';
    }
    // About pages - medium priority
    else if (['/about', '/team', '/global-reach', '/community', '/consultation'].some(p => path.startsWith(p))) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      url: item.url,
      lastmod: item.lastmod,
      changefreq,
      priority,
    };
  },

  // Additional sitemap options
  i18n: {
    defaultLocale: 'en',
    locales: {
      en: 'en-ZW',
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [
    mdx(),
    sitemap(sitemapConfig),
    react(),
  ],
  output: 'static',

  // Build optimization
  build: {
    // Inline small assets
    inlineStylesheets: 'auto',
  },

  // Vite configuration
  vite: {
    build: {
      // Generate source maps for debugging
      sourcemap: false,
      // Minify for production
      minify: 'esbuild',
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['lucide-react'],
    },
  },

  // Prefetch configuration for better performance
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  // Compression settings
  compressHTML: true,

  // Server configuration for development
  server: {
    port: 4321,
    host: true,
  },
});
