// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://learning.nyuchi.com",
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
        item.lastmod = new Date();
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
