// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://learning.nyuchi.com",
  /* Astro's HTML compression drops the space where a line break sits between
     text and an inline tag ("Applies to<strong>…"), across the legal pages.
     The pages are small; correct words matter more than a few bytes. */
  compressHTML: false,
  adapter: vercel(),

  // Fully static: every page is known at build time, so there is nothing to
  // render per request.
  output: "static",

  integrations: [
    sitemap({
      /* The thank-you page is where the feedback form lands; it is noindex and
         has nothing to find. */
      filter: (page) => !page.includes("/feedback/thanks"),
      /* Make the sitemap agree with the pages' own canonical tags.
       *
       * The build emits directory-style output, so this integration listed
       * `/legal/privacy/` while the page itself declared
       * `<link rel="canonical" href="https://learning.nyuchi.com/legal/privacy">`
       * — no trailing slash. Google follows the sitemap, finds a page that says
       * it is not the canonical version of the URL it just fetched, and drops
       * it as a duplicate. Every URL in the sitemap was doing that, which is
       * why nothing indexed.
       *
       * tests/seo.test.ts now asserts the two agree, so this cannot drift back.
       */
      serialize(item) {
        item.url = item.url.replace(/(.+)\/$/, "$1");
        // The sitemap item takes an ISO 8601 string, not a Date.
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
