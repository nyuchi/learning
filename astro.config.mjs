// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://learning.nyuchi.com",
  adapter: vercel(),
  output: "static",
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
