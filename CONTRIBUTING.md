# Contributing

A small static site. Most changes are content, and content lives in two or
three predictable places.

## What gets changed where

| Change                                                    | File                                                  |
| --------------------------------------------------------- | ----------------------------------------------------- |
| Nav links, footer columns, legal links, the wordmark      | `src/data/site.ts`                                    |
| Links to the extension (repo, releases, deployment guide) | `src/data/site.ts` (`toddleExtension`)                |
| The three destination cards                               | the `surfaces` array in `src/pages/index.astro`       |
| Home page copy                                            | `src/pages/index.astro`                               |
| Extension page copy                                       | `src/pages/toddle-enhancement-extension.astro`        |
| Header / footer structure                                 | `src/components/SiteHeader.astro`, `SiteFooter.astro` |
| `<head>`, metadata, theme bootstrap                       | `src/layouts/BaseLayout.astro`                        |

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
npm test             # vitest, then build, then the CSP hash check
npm run format       # prettier --write
npm run format:check # the org lint gate runs this
```

## If you touch the theme bootstrap

The one inline script in `BaseLayout.astro` is allowed by a hash in the
Content-Security-Policy in `vercel.json`. Change the script and the hash no
longer matches, so:

```sh
npm run build
npm run csp:fix      # rewrite vercel.json with the new hashes
```

Then review the diff — a changed hash should correspond to a change you meant
to make. `npm test` fails if you skip this, which is the point: a stale hash
would mean the browser refuses to run the script and the theme silently breaks
in production.

## Adding a page

1. Create `src/pages/<slug>.astro`.
2. Wrap it in `BaseLayout`, passing `title`, `description` and `canonical`.
3. Add it to the nav or footer in `src/data/site.ts` if it should be findable.
4. Run `npm test` — the sitemap, the link checks and the CSP check all run.

## Pull requests

CI runs `astro check`, the tests, the build and the CSP check, plus the org
lint gate (actionlint, JSON validity, Prettier, markdownlint, yamllint). All of
it has to be green.

Keep the copy in British English, and keep claims about the extension's privacy
behaviour accurate — the page is what a school's IT lead will read before
deciding whether to trust it, and overstating it there is worse than saying
less.
