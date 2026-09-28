export default {
  plugins: {
    // Must run before tailwindcss: the @bundu/ui stylesheets are pulled in with
    // @import, and their @layer components blocks have to be inlined before
    // Tailwind expands @tailwind components — otherwise .btn-primary, .card and
    // the rest are silently dropped from the build.
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
