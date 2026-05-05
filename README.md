# nyuchi learning — landing one-pager

The site at [learning.nyuchi.com](https://learning.nyuchi.com) is a SvelteKit
one-pager. Its only job is to redirect visitors to the right place now that
the original learning content has been split across the Bundu Family
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

In [bundu-labs/marketing#5](https://github.com/bundu-labs/marketing/pull/5)
the content was migrated into the marketing monorepo and split across
three surfaces:

| Surface         | URL                                                | Audience              | Mineral   |
| --------------- | -------------------------------------------------- | --------------------- | --------- |
| Bundu Education | [bundu.org/education](https://bundu.org/education) | Open frameworks       | malachite |
| Nyuchi Learning | [nyuchi.com/learning](https://nyuchi.com/learning) | Commercial training   | gold      |
| Mukoko Lingo    | [mukoko.com/lingo](https://mukoko.com/lingo)       | Consumer language app | tanzanite |

This repo now ships a single one-pager that:

1. Tells visitors arriving at the old domain that the content moved.
2. Lists the three destinations with a one-paragraph description each.
3. Links them out so the visitor lands on the surface that matches what
   they came for.

The page is responsive (single column on mobile, two columns at `md`,
three at `lg`), uses the same design tokens as `nyuchi.com` and
`bundu.org` (Five African Minerals, Noto Sans / Noto Serif, pill
primitives), and themes its primary mineral to **malachite** — the
canonical "education" colour in the marketing monorepo's data.

## Stack

- **SvelteKit 2** + **Svelte 5** runes (`$props`, snippets via `{@render}`)
- **Vite 8**
- **Tailwind 3** with the design tokens copied verbatim from
  `apps/nyuchi/src/styles/global.css` (the marketing monorepo)
- **`@sveltejs/adapter-vercel`** for deployment

The entire app is one route (`src/routes/+page.svelte`) and one shared
layout (`src/routes/+layout.svelte`) that imports the global CSS.

## Local development

```sh
npm install
npm run dev          # http://localhost:5173
npm run check        # svelte-check
npm run build        # produces .vercel/output for adapter-vercel
npm run preview      # serve the built output
```

## File map

```
.
├── src/
│   ├── app.html              # shell — fonts, html lang, body classes
│   ├── app.css               # design tokens + components (mirrors marketing monorepo)
│   └── routes/
│       ├── +layout.svelte    # imports app.css, renders page snippet
│       └── +page.svelte      # the one-pager
├── static/
│   └── favicon.svg           # carried over from the old Astro site
├── svelte.config.js          # adapter-vercel
├── vite.config.js            # sveltekit() plugin
├── tailwind.config.mjs       # mineral palette + fluid type scale + dynamic-class safelist
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
