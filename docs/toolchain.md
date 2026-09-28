# Toolchain

npm, Astro 7, Tailwind 4, Vitest, Prettier. Deploys to Vercel.

## Why not Vite+

[Vite+](https://viteplus.dev) was evaluated on 2026-09-28 and **cannot be
adopted yet**. Not for lack of merit — it works well — but because it cannot
be installed by npm, and both CI and Vercel install with npm.

### What was tried

`vp migrate --no-interactive` on a copy of this repo, on Vite+ 1.0.0:

| Step                             | Result                                                      |
| -------------------------------- | ----------------------------------------------------------- |
| `vp migrate`                     | clean; rewrote 5 files' imports, 2 configs, added git hooks |
| `vp install`                     | clean, **0 vulnerabilities**                                |
| `vp test run`                    | all 41 tests pass                                           |
| `vp run build`                   | builds the site correctly                                   |
| Oxfmt vs the org Prettier config | near-identical output; only `README.md` differed            |

So the tool itself is fine. The problem is upstream of it.

### The blocker

```
$ npm install vite-plus@1.0.0
npm error Cannot read properties of null (reading 'edgesOut')
```

npm 10.9.7 crashes resolving `vite-plus`'s dependency graph. This is the same
resolver bug that stops `vitest@4.1.11` installing here, which is why this repo
pins `vitest` to `~4.0.18`.

Installing through Vite+'s own installer works, but produces a lockfile that
`npm ci` then rejects:

```
$ npm ci
npm error `npm ci` can only install packages when your package.json and
npm error package-lock.json are in sync.
npm error Missing: lightningcss-android-arm64@1.33.0 from lock file
```

The optional platform binaries are resolved differently by the two installers.

### Why that is decisive

**Vercel builds this site with npm.** If npm cannot install the tree, the site
stops deploying. Adopting Vite+ therefore means changing the install command in
CI _and_ in the Vercel project settings to run Vite+'s installer first — a
`curl … | bash` step in front of every build, and a change in a dashboard
outside this repo.

The org lint gate is a second problem: it is a reusable workflow in
`nyuchi/.github` that this repo does not control, and `vp migrate` deletes
`.prettierrc` in favour of Oxfmt. That file has to stay for the gate to pass.

### When to revisit

- npm ships a fix for the `edgesOut` resolver crash — then `npm install
vite-plus` works and most of this goes away. Worth retesting on any npm
  newer than 10.9.7; it could not be tested here.
- Or Vite+ publishes a lockfile that `npm ci` accepts.
- Or the estate moves off `npm ci` deliberately, for reasons bigger than this
  repo.

If you adopt it anyway, the safe shape is: Vite+ for `test`, `build` and `dev`;
**keep Prettier and `.prettierrc`** so the org gate still passes; and change
Vercel's install command in the same sitting, not afterwards.
