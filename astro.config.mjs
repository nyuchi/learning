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

  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
