# Changelog

## 3.3.0 — 2026-10-01

### Added

- **`/legal/security`** — the Toddle Enhancement Extension's security, for
  schools and for the privacy, legal and IT reviewers who approve software for
  them: an at-a-glance summary, the security model, how it is tested, the
  independent adversarial review of 1 October 2026 and what it fixed, the
  limit no extension can remove, and the vulnerability policy in full (the
  extension's repository is private, so it cannot be linked to). Linked from
  the footer, the privacy policy, the terms, the extension page and
  `llms.txt`, and in the sitemap.

### Changed

- **The extension page describes 0.8.2:** the student sidebar anywhere a
  student appears in Toddle, the Now card and today's classes and attendance,
  the class view and message buttons into Toddle's own chat, and the
  Attendance dashboard's Students tab. No new screenshots yet.
- **The privacy policy says what 0.8.2 reads for the sidebar,** when, and that
  none of it is stored or sent anywhere; that the extension asks Toddle for no
  student flags; and links the Security page.
- `SECURITY.md` describes this site as it is, and points to the Security page.

## 3.2.0 — 2026-09-28

### Added

- **Browser QA.** `npm run qa` builds the site, serves it, and drives a real
  browser over every page at phone, tablet and desktop width in both colour
  schemes: axe-core against WCAG 2.1 AA, plus a horizontal-overflow check that
  a desktop screenshot cannot catch. It found a serious violation on its first
  run (see below). 18 combinations, all clean.
- `/legal/terms` — terms and conditions, written to be read. It says plainly
  that the extension rides on an interface Toddle does not publish, that a
  Toddle release can break it, and that anything you are about to act on should
  be confirmed in Toddle itself.
- `llms.txt` — a plain-text map of the site for assistants, including an
  explicit note not to infer capability the product does not claim.
- JSON-LD on every page: an `Organization`/`WebSite`/`WebPage` graph, plus
  `SoftwareApplication` on the extension page. The claims mirror the privacy
  policy, because these are the sentences a search result or an assistant
  repeats.
- `tests/seo.test.ts` — canonicals, titles, descriptions, the JSON-LD graph,
  robots.txt, the sitemap, and that the footer links to every page.

### Fixed

- **Inline links were distinguishable by colour alone** — a serious WCAG 1.4.1
  failure (`link-in-text-block`) that axe-core found on the extension and
  privacy pages. They relied on `hover:underline`, which does not exist on
  touch and does not help a reader who cannot distinguish the colour. A `.link`
  component class now underlines them at rest.

### Changed

- The CSP hash check ignores `application/ld+json` blocks. They are data, never
  executed, so `script-src` does not apply — and hashing them meant every edit
  to a page title silently invalidated the policy.

## 3.1.0 — 2026-09-28

### Added

- `/legal/privacy` — the privacy policy. The Chrome Web Store requires a policy
  URL and makes the publisher certify it matches the listing's disclosures, so
  the claims on it are generated from `src/data/legal.ts`, the same source the
  listing copy is written from. They cannot drift apart silently.
- `robots.txt`, pointing at the sitemap.

### Changed

- **The extension's source repository is private**, so the site no longer links
  to it. A test fails the build on any `github.com` link, and one switch
  (`toddleExtension.webStore`) drives every call to action: an enquiry while
  there is no store listing, an install link the moment there is one.
- **Corrected the product page.** It described hiding student names; the
  shipping extension hides Toddle's student _flags_ and deliberately never
  hides names, because a gradebook of anonymous rows is no use to a teacher.
- Dropped the "free and open source" and "the source is public" claims, which
  stopped being true when the repository went private.
- The seven-mineral identity strip is the canonical `MineralStrip` from
  `@bundu/ui` — fixed to the left edge, full height, vertical. It was
  previously a hand-rolled horizontal bar in the footer.
- `npm test` builds before running the tests, so assertions about build output
  read a build of the commit under test rather than whatever was lying around.

Hosting stays on Vercel. A Cloudflare Workers migration was made and reverted
within this release; `learning.nyuchi.com` never moved.

## 3.0.0 — 2026-09-28

Rebuilt in Astro, rebranded, and given a second page.

### The site is Astro again

The SvelteKit one-pager is gone. Astro is what the rest of the Nyuchi
marketing estate is built on, and it is what `@bundu/ui` ships components for,
so a Svelte site could only ever reimplement the design system rather than
consume it.

Astro 7 with Tailwind 4. `@bundu/ui@0.1.1` ships a Tailwind 3 style config,
which Tailwind 4 consumes through `@config` — component classes, the token
set, the type scale and the `dark:` variants all come through intact, verified
against the build output.

### The design system comes from the package now

`src/app.css` used to carry a hand-copied subset of the design tokens, under a
comment claiming they were verbatim from the marketing monorepo. They were not:
nyuchi.com had since gained the sodalite and copper minerals, the heritage
palette, popover and destructive tokens, touch targets and a radius scale, and
had settled on gold as its primary. This site had none of that and was still on
malachite.

All of it now comes from `@bundu/ui` — `globals.css` for the tokens and
component classes, `brand-nyuchi.css` for the primary, and the Tailwind preset
for the utilities. `tests/branding.test.ts` fails the build if a token is
redefined locally, so the drift cannot recur quietly.

### Branding

The wordmark is capitalised: **Nyuchi Learning**, not the previous lowercase
setting. A test fails on a lowercase spelling anywhere in `src/`.

### Added

- `/toddle-enhancement-extension` — the product page for the Toddle
  Enhancement Extension: what it does, how to install it as a teacher or push
  it to a school, what it can see, and what Present mode does and does not do.
- A site shell matching nyuchi.com: sticky translucent header, the
  seven-mineral identity strip, a four-column footer, and a light/dark toggle
  that remembers the choice.
- A real Content-Security-Policy in `vercel.json`, with `script-src 'self'`
  plus a hash per inline script, plus `Referrer-Policy` and
  `Permissions-Policy`. `npm test` verifies the hashes against the build, so
  editing the theme bootstrap without updating the policy fails CI instead of
  breaking the theme in production.
- A skip link, and `prefers-reduced-motion` handling.

### Changed

- `npm run check` is `astro check`, not `svelte-check`.
- `vitest` pinned to `~4.0.18`; `4.1.11` trips a resolver bug in npm 10.9 that
  makes `npm install` fail outright.
- `overrides` pins `path-to-regexp` to `^6.3.0`, clearing the high-severity
  advisory that the current `@astrojs/vercel` still pulls in.
- The CI audit is split: `--omit=dev` at high severity blocks and is at zero;
  build and test tooling is reported without blocking, because the one
  remaining advisory (vitest) has no installable fix.
- `*.astro` added to `.prettierignore`, because the org lint gate runs Prettier
  without `prettier-plugin-astro` and cannot parse those files.

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
