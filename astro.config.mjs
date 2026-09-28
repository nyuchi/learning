// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://learning.nyuchi.com",
  adapter: vercel(),
  // Everything here is static. Rendering on demand would buy nothing and cost
  // a cold start on a page whose whole job is to load fast on a slow link.
  output: "static",
  integrations: [
    // The base stylesheet is imported by the layout, so that the @bundu/ui
    // token imports run in the right order — the brand overlay has to come
    // after globals.css or it is overwritten by it.
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
