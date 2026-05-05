# Changelog

## 2.0.0 — 2026-05-04

Complete rewrite. The `learning.nyuchi.com` site is no longer a
content-bearing Astro app; it is a SvelteKit one-pager whose only job is
to redirect visitors to the place the original content moved to.

### Why this change happened

Up to May 2026 this repo housed two different audiences under one brand:

- **Open educational frameworks** — content that belonged with the Bundu
  Foundation's education initiative.
- **Commercial training and consultation** — content that belonged with
  Nyuchi Africa's commercial product line.

In [bundu-labs/marketing#5](https://github.com/bundu-labs/marketing/pull/5)
the content was migrated into the marketing monorepo and split across
three surfaces:

- `bundu.org/education` — Bundu Education (open frameworks)
- `nyuchi.com/learning` — Nyuchi Learning (commercial training)
- `mukoko.com/lingo` — Mukoko Lingo (consumer language learning)

With the content gone, the standalone Astro app no longer had a reason
to exist. Rather than leave the old site live with stale content or
return 404s, this repo now ships a small one-pager that lists the three
destinations and lets visitors pick the one that matches what they came
for.

### Added

- `src/routes/+page.svelte` — the one-pager. Hero, three project cards
  (Bundu Education, Nyuchi Learning, Mukoko Lingo), a closing
  "How they fit together" section, and a Bundu Family footer.
- `src/routes/+layout.svelte` — imports global CSS and renders the page
  snippet via Svelte 5 `{@render children()}`.
- `src/app.html` — shell with Noto Serif / Noto Sans / JetBrains Mono
  font preloads and the Tailwind body classes.
- `src/app.css` — design tokens copied verbatim from
  `bundu-labs/marketing apps/nyuchi/src/styles/global.css`. Primary
  mineral is **malachite** (the canonical "education" colour).
- `tailwind.config.mjs` — Five African Minerals palette, fluid type
  scale (`text-display`, `text-h1`...`text-caption`), dynamic-class
  safelist for `bg-{mineral}` etc.
- `svelte.config.js` + `vite.config.js` — SvelteKit 2 + Svelte 5 +
  Vite 8 + `@sveltejs/adapter-vercel`.
- `vercel.json` — `framework: sveltekit` plus the standard security
  headers (`X-Content-Type-Options`, `X-Frame-Options`,
  `X-XSS-Protection`).
- `.github/workflows/ci.yml` — runs `svelte-check`, `vite build`, and
  `prettier --check` on every PR.

### Changed

- `README.md` — rewritten to describe what the repo is now (a SvelteKit
  redirect page) instead of what it used to be (an Astro framework
  publisher).
- `SECURITY.md` — scoped down to reflect the new tiny attack surface
  (no auth, no forms, no API endpoints).
- `CONTRIBUTING.md` — rewritten as a short note: change the `projects`
  array in `+page.svelte` if a destination URL moves; everything else
  is set up correctly.

### Removed

- `astro.config.mjs`, `components.json`, `eslint.config.js`,
  `vitest.config.js`, `postcss.config.mjs` (Astro-shaped) — superseded.
- `src/` (entire Astro app — components, layouts, pages, blog,
  framework markdown, assets). Content lives in
  `bundu-labs/marketing` now.
- `public/` — replaced with `static/` (SvelteKit convention). Only the
  favicon survives.
- `tests/` — the source/build/a11y/SEO test suites. Out of scope for a
  redirect one-pager; if more substantial UI ever returns we'll
  reintroduce a small `vitest` setup.
- `ARCHITECTURE.md`, `BRANDING.md`, `DEPLOYMENT.md`,
  `MISSION_VISION_VALUES_PROPOSAL.md`, `PR_DESCRIPTION.md`,
  `PR_SUMMARY.md`, `TODO.md`, `CLAUDE.md` — described the old Astro
  app's architecture and roadmap. Obsolete.
- `LICENSE` — the repo is now private; no public licence applies.
- All Astro / React / Radix / Lucide / Tailwind 4 dependencies.

### Stack

- SvelteKit 2 + Svelte 5 (runes: `$props`, snippets via `{@render}`)
- Vite 8
- Tailwind 3 (matches the marketing monorepo; **not** Tailwind 4 as
  before)
- TypeScript 5
- Prettier 3.3.3 (pinned to match CI in `nyuchi/.github`'s reusable
  lint workflow)
- `@sveltejs/adapter-vercel` for deployment
