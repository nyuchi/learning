// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://learning.nyuchi.com",

  // Fully static, and deployed to Cloudflare Workers as static assets — so
  // there is no adapter here on purpose. `astro build` emits dist/, wrangler
  // uploads it, and nothing runs per request. An SSR adapter would add a
  // worker invocation (and a cold start) to every page view of a site that has
  // nothing to compute.
  output: "static",

  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
