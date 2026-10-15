# Contributing

A small static site. Most changes are content, and content lives in two or
three predictable places.

## What gets changed where

| Change                                                  | File                                                                |
| ------------------------------------------------------- | ------------------------------------------------------------------- |
| Nav links, footer columns, legal links, the wordmark    | `src/data/site.ts`                                                  |
| Links to the extension (store listing, releases, guide) | `src/data/site.ts` (`toddleExtension`)                              |
| The extension's release notes                           | `src/data/releases.ts`                                              |
| Facts on the legal pages (versions, prices, contacts)   | `src/data/legal.ts`                                                 |
| Consent categories and the banner's version             | `src/data/consent.ts`                                               |
| The destination cards                                   | the `surfaces` array in `src/pages/index.astro`                     |
| Home page copy                                          | `src/pages/index.astro`                                             |
| Extension page copy                                     | `src/pages/toddle-enhancement-extension.astro`                      |
| Mukoko Lingo's links / page copy                        | `src/data/site.ts` (`mukokoLingo`) / `src/pages/mukoko-lingo.astro` |
| Header / footer structure                               | `src/components/SiteHeader.astro`, `SiteFooter.astro`               |
| `<head>`, metadata, theme bootstrap                     | `src/layouts/BaseLayout.astro`                                      |

## What must not be changed here

**Design tokens.** Colours, fonts, spacing, radii and the component classes
(`.btn-primary`, `.card`, `.eyebrow`, `.section`, …) all come from
`@bundu/ui`. `src/styles/global.css` imports them and adds nothing but a
`prefers-reduced-motion` block.

If something looks wrong, fix it in
[`@bundu/ui`](https://github.com/nyuchi/packages-ui) and bump the dependency —
that fixes nyuchi.com, bundu.org and mukoko.com at the same time. Redefining a
token here is how this site drifted away from nyuchi.com once already, so
`tests/branding.test.ts` fails the build if a `--token:` declaration appears in
`src/styles/global.css`.

The same applies to the wordmark: it is **Nyuchi Learning**, capitalised, and a
lowercase spelling anywhere in `src/` fails that test too.

## Local workflow

```sh
npm install
npm run dev          # http://localhost:4321 — hot reload
npm run check        # astro check
npm test             # build, then the tests (vp test), then the CSP hash check
npm run lint         # vp lint
npm run format       # prettier --write
npm run format:check # the org lint gate runs this
npm run fmt          # vp fmt; the org vite-plus gate runs `vp fmt --check`
```

## Keeping the clone light

`npm run clean` (`scripts/clean.mjs`) removes what the build and the tools
generate (`dist/`, `.astro/`, `.vercel/output/`, `qa-report.json`, the tools' caches), Claude Code worktrees with nothing uncommitted, and local
branches that are done: everything on them is already in `origin/main` or
`origin/staging` (a squash merge included), or their remote branch was
deleted after the pull request merged while they held nothing unpushed. It
touches only what Git ignores, never `main`, `staging`, the branch checked
out or one in a worktree, and names anything it leaves. `--dry-run` lists,
`--deep` also removes `node_modules` and npm's cache, `--no-fetch` works
offline.

It runs on its own after a `git pull` that merges (`.githooks/post-merge`,
turned on by `npm ci`), and after Claude Code merges a pull request
(`.claude/settings.json`, a `PostToolUse` hook) in whichever of the three
clones (`toddle-enhancement-extension`, `learning`, `nyuchi-licence-server`)
the pull request belongs to. The same script is in all three; only its list
of generated paths differs.

## If you touch an inline script

The inline scripts (the theme bootstrap in `BaseLayout.astro`, the consent
check in `Analytics.astro`, and the small modules Astro inlines) are allowed by
hashes in the Content-Security-Policy in `vercel.json`. Change one and its hash
no longer matches, so:

```sh
npm run build
npm run csp:fix      # rewrite vercel.json with the new hashes
```

Then review the diff — a changed hash should correspond to a change you meant
to make. `npm test` fails if you skip this, which is the point: a stale hash
would mean the browser refuses to run the script and it silently breaks in
production.

If you touch the consent banner or analytics, run `npm run consent:probe` too:
Google's tag must not be requested before the visitor agrees, and the privacy
policy says so.

## Adding a page

1. Create `src/pages/<slug>.astro`.
2. Wrap it in `BaseLayout`, passing `title`, `description` and `canonical`.
3. Add it to the nav or footer in `src/data/site.ts` if it should be findable.
4. Run `npm test` — the sitemap, the link checks and the CSP check all run.

## Pull requests

Branch from `staging` and open the pull request against `staging`. CI runs
`astro check`, the build, the tests and the CSP check, plus the org gates: the
lint gate (actionlint, JSON validity, Prettier, markdownlint, yamllint) and
`vite-plus / check` (`astro check`, `vp fmt --check`). All of it has to be
green. Each merge into `staging` is tagged as the next patch. A release is a
pull request from `staging` to `main`: production deploys from `main`, which
is tagged as the next minor. Add a line under "Unreleased" in CHANGELOG.md
for anything a reader of the site, or of this repo, would notice.

Do not add a link to the extension's source repository — it is private, and a
test fails the build on any `github.com` link for that reason.

Keep the copy in British English, and keep claims about the extension's privacy
behaviour accurate — the page is what a school's IT lead will read before
deciding whether to trust it, and overstating it there is worse than saying
less.
