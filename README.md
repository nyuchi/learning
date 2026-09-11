# Nyuchi Learning

> The landing one-pager at learning.nyuchi.com, whose only job is to send
> visitors to wherever the learning content lives now.

[![Lint](https://github.com/nyuchi/learning/actions/workflows/lint.yml/badge.svg)](https://github.com/nyuchi/learning/actions/workflows/lint.yml)
[![build](https://github.com/nyuchi/learning/actions/workflows/build.yml/badge.svg)](https://github.com/nyuchi/learning/actions/workflows/build.yml)
![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?style=flat-square&logo=svelte&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=flat-square&logo=vercel&logoColor=white)

**Version:** 2.0.0 | **Live:** [learning.nyuchi.com](https://learning.nyuchi.com) | **Default branch:** `master` | **Deploy:** Vercel

---

## What it is

A SvelteKit one-pager. It is the whole site at
[learning.nyuchi.com](https://learning.nyuchi.com), and it exists to redirect
visitors now that the original learning content has been split across the
ecosystem.

## What this repo used to be

Up to May 2026 this repo housed `learning.nyuchi.com` — an Astro site that
mixed two concerns under one brand:

- **Open educational frameworks** (the K-12 Digital Campus, support
  process, and digital literacy frameworks; framework blog; resources
  hub) — content that belonged to the Bundu Foundation's education
  initiative.
- **Commercial training and consultation** (cohort programmes, pricing,
  consultations) — content that belonged to Nyuchi Africa.

Mixing the two muddled the audience. The Foundation publishes; Nyuchi
sells; Mukoko reaches consumers. One repo couldn't be all three.

## What this repo is now

The content was migrated into the `bundu-labs/marketing` monorepo (in its PR #5
— a private repository, so that link is not reproduced here) and split across
three surfaces:

| Surface         | URL                                                | Audience              | Accent colour |
| --------------- | -------------------------------------------------- | --------------------- | ------------- |
| Bundu Education | [bundu.org/education](https://bundu.org/education) | Open frameworks       | malachite     |
| Nyuchi Learning | [nyuchi.com/learning](https://nyuchi.com/learning) | Commercial training   | gold          |
| Mukoko Lingo    | [mukoko.com](https://mukoko.com)                   | Consumer language app | tanzanite     |

> The page itself links Mukoko Lingo at `mukoko.com/lingo`, which currently
> returns 404. The parent site resolves; the deep link does not yet.

This repo now ships a single one-pager that:

1. Tells visitors arriving at the old domain that the content moved.
2. Lists the three destinations with a one-paragraph description each.
3. Links them out so the visitor lands on the surface that matches what
   they came for.

The page is responsive (single column on mobile, two columns at `md`,
three at `lg`) and uses the same design tokens as `nyuchi.com` and
`bundu.org`: Noto Sans and Noto Serif with JetBrains Mono, pill primitives, and
three colour families from the shared palette — **malachite**, **gold** and
**tanzanite** — with malachite as this site's primary, being the canonical
"education" colour in the marketing monorepo's data.

Those three are minerals from the shared palette, which has **21 colour
families in total**: seven minerals (cobalt, tanzanite, malachite, gold,
terracotta, sodalite, copper), seven heritage and seven experimental. This site
implements only the three it needs.

## Stack

- **SvelteKit 2** + **Svelte 5** runes (`$props`, snippets via `{@render}`)
- **Vite 8**
- **Tailwind 3** with the design tokens copied verbatim from
  `apps/nyuchi/src/styles/global.css` (the marketing monorepo)
- **`@sveltejs/adapter-vercel`** for deployment

The entire app is one route (`src/routes/+page.svelte`) and one shared
layout (`src/routes/+layout.svelte`) that imports the global CSS.

## Commands

```sh
npm install
```

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Development server on <http://localhost:5173>  |
| `npm run check`   | `svelte-check` against `tsconfig.json`         |
| `npm run test`    | Vitest — redirect targets and security headers |
| `npm run build`   | Produces `.vercel/output` for `adapter-vercel` |
| `npm run preview` | Serve the built output                         |
| `npm run format`  | Prettier over `src` and `tests`                |

## File map

```text
.
├── src/
│   ├── app.html              # shell — fonts, html lang, body classes
│   ├── app.css               # design tokens + components (mirrors marketing monorepo)
│   └── routes/
│       ├── +layout.svelte    # imports app.css, renders page snippet
│       └── +page.svelte      # the one-pager
├── static/
│   └── favicon.svg           # carried over from the old Astro site
├── tests/
│   ├── redirects.test.ts     # the three destinations resolve as configured
│   └── security.test.ts      # the headers vercel.json promises
├── svelte.config.js          # adapter-vercel
├── vite.config.js            # sveltekit() plugin
├── tailwind.config.mjs       # palette + fluid type scale + dynamic-class safelist
├── postcss.config.mjs        # tailwind + autoprefixer
└── vercel.json               # framework: sveltekit, security headers
```

## Updating the redirect targets

The three destinations are an array at the top of
`src/routes/+page.svelte`. Change a URL or add a fourth surface there;
the grid adapts automatically (it goes 1 → 2 → 3 columns at the `md`
and `lg` breakpoints).

## Why SvelteKit and not just a static HTML file?

Two reasons:

1. **Convention with the rest of the ecosystem.** The marketing apps
   are Astro, but Nyuchi's product surfaces lean SvelteKit. Standing this
   redirect up on SvelteKit lets the team treat it the same as any
   other Nyuchi-operated micro-app — same deploy story, same auth
   primitives if we ever need them, same telemetry hooks.
2. **Headroom.** If `learning.nyuchi.com` ever needs to grow beyond a
   redirect (e.g. a sign-in page that routes alumni to the right
   surface, or a search form that types into all three at once), the
   scaffolding is already in place.

## Licence

This repository ships **no LICENSE file** and GitHub reports no licence for it.
It is `"private": true` in `package.json` and is not published to npm. Treat it
as all rights reserved until a licence is added.

© Nyuchi Africa (PVT) Ltd.
