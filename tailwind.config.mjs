import preset from "@bundu/ui/tailwind-preset";
import typography from "@tailwindcss/typography";

/**
 * The palette, type scale, radii and timing functions all come from the
 * @bundu/ui preset — the same one nyuchi.com and bundu.org build against.
 * Nothing is redefined here: a local copy of the tokens is exactly how this
 * site drifted away from nyuchi.com in the first place.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  presets: [preset],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
    // The kit's own components carry utility classes that have to survive purge.
    "./node_modules/@bundu/ui/src/**/*.{astro,ts,tsx}",
  ],
  safelist: [
    // Mineral classes are composed from data (the footer strip, the card dots),
    // so Tailwind cannot see them in the source.
    {
      pattern:
        /^(bg|text|border|ring)-(cobalt|tanzanite|malachite|gold|terracotta|sodalite|copper)(-container|-on-container)?$/,
    },
  ],
  plugins: [typography],
};
