# Contributing

This repo is private and the site is a single redirect page. Contributions
are unlikely to be needed; if you do need to make a change, the workflow is
small:

## What gets changed here

- The three destination cards (URL, name, description) — edit the
  `projects` array at the top of `src/routes/+page.svelte`.
- Site copy in the hero or the closing "How they fit together" section —
  edit `src/routes/+page.svelte`.
- Design tokens — edit `src/app.css`. Keep the tokens in lockstep with
  `bundu-labs/marketing` (`apps/nyuchi/src/styles/global.css`).

Everything else (page structure, layout breakpoints, fonts, the favicon)
is set up correctly and shouldn't need to move.

## Local workflow

```sh
npm install
npm run dev          # http://localhost:5173 — hot reload
npm run check        # svelte-check (TypeScript across .svelte files)
npm run format       # prettier --write
npm run format:check # CI runs this
npm run build        # produces .vercel/output for adapter-vercel
npm run preview      # serve the built output locally
```

## Branch and commit conventions

- Branch off `main`.
- Use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- Open a PR against `main`. CI runs `svelte-check`, `vite build`, and
  `prettier --check`; all three must pass before merge.

## When the redirect targets change

If the marketing monorepo renames a section (e.g. `bundu.org/education`
moves), update both:

1. The `projects` array in `src/routes/+page.svelte`.
2. The destinations table in `README.md`.
