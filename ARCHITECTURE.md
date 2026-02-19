# System Architecture

**Version**: 1.0
**Last Updated**: February 2026
**Status**: Authoritative. All development must follow this architecture.

---

## Overview

nyuchi learning follows a **layered architecture** designed for scalability, brand consistency, and maintainability. Every layer has a single responsibility. Changes flow downward through layers, never upward. This ensures that a styling change in one place propagates to every page, and content changes never require touching the shell or design system.

```
 Layer 1: Site Shell (BaseLayout, header, footer, navigation, error handling)
 Layer 2: Components (reusable UI primitives, Astro + React)
 Layer 3: Styling (global.css design tokens, semantic classes, theme system)
 Layer 4: Content (pages, blog posts, Sanity CMS data)
```

**The golden rule**: Content uses components. Components use styling. Styling uses tokens. Nothing reaches across layers.

---

## Layer 1: Site Shell

The site shell is the outermost wrapper that every page shares. It handles the concerns that are global to the entire site and should never need to be duplicated or customized per-page.

### What the shell provides

| Concern | Implementation | File |
|---------|----------------|------|
| **Document structure** | `<html>`, `<head>`, `<body>`, lang attribute | `BaseLayout.astro` |
| **SEO & metadata** | Meta tags, Open Graph, JSON-LD, canonical URLs | `SEO.astro` |
| **Navigation** | Header (desktop + mobile), dropdowns, hamburger menu | `BaseLayout.astro` |
| **Footer** | Link groups, wordmark, mission messaging, copyright | `BaseLayout.astro` |
| **Skip links** | 3 targets: main content, navigation, footer | `BaseLayout.astro` |
| **Theme system** | Light/dark/system toggle, localStorage persistence | `ThemeToggle.astro` |
| **Minerals Strip** | 4px brand strip, left edge, hidden on mobile | `BaseLayout.astro` |
| **Analytics** | Google Analytics script | `BaseLayout.astro` |
| **Animation system** | Intersection Observer, scroll-triggered animations | `BaseLayout.astro` |
| **Error boundaries** | 404 page, error states, graceful degradation | `pages/404.astro` (planned) |
| **Observability** | Analytics, performance monitoring, error tracking | Shell-level scripts |

### Shell rules

1. **Every page must use `BaseLayout`**. No page renders its own `<html>` or `<head>`.
2. **The shell is the single source of truth** for navigation, footer, and global scripts.
3. **Shell changes affect every page simultaneously**. This is intentional and desirable.
4. **Pages pass data to the shell via props** (`title`, `description`, `keywords`, `image`, `type`), never by modifying shell internals.

### Error handling (planned)

| Type | Implementation | Status |
|------|----------------|--------|
| **404 Not Found** | `src/pages/404.astro` using BaseLayout | Planned |
| **Error boundary** | Client-side React error boundary for interactive components | Planned |
| **Offline fallback** | Service worker with cached shell | Planned |
| **API error states** | Graceful degradation when Sanity CMS is unreachable | Planned |
| **Circuit breakers** | Timeout + fallback for external API calls (Sanity, analytics) | Planned |
| **Loading states** | Skeleton screens for async content | Planned |

---

## Layer 2: Components

Components are reusable UI building blocks. They accept props, render markup, and reference the styling layer for their appearance. Components never contain page-specific content or business logic.

### Component types

| Type | Technology | Location | Purpose |
|------|------------|----------|---------|
| **Astro components** | `.astro` | `src/components/` | Static, server-rendered UI |
| **React components** | `.tsx` | `src/components/ui/` | Interactive UI (Radix primitives) |

### Current component inventory

**Astro components** (site-specific):

| Component | Purpose |
|-----------|---------|
| `Logo.astro` | Brand logo (3 variants, 3 sizes) |
| `SEO.astro` | Meta tags, Open Graph, JSON-LD structured data |
| `ThemeToggle.astro` | Light/dark/system theme switcher |
| `PageBreadcrumb.astro` | Accessible breadcrumb navigation |
| `BuilderBox.astro` | Builder UI pattern (dashed borders) |
| `InfoTooltip.astro` | Contextual help tooltip |
| `UserAvatar.astro` | Avatar with fallback initials |

**React UI primitives** (from Radix UI, in `src/components/ui/`):

| Component | Radix Primitive | Purpose |
|-----------|-----------------|---------|
| `accordion.tsx` | Accordion | Expandable content sections |
| `avatar.tsx` | Avatar | User avatars |
| `badge.tsx` | — | Status indicators, tags |
| `breadcrumb.tsx` | — | Breadcrumb (React version) |
| `button.tsx` | — | Button variants |
| `card.tsx` | — | Card container |
| `dialog.tsx` | Dialog | Modal dialogs |
| `dropdown-menu.tsx` | DropdownMenu | Dropdown menus |
| `input.tsx` | — | Form inputs |
| `label.tsx` | Label | Form labels |
| `navigation-menu.tsx` | NavigationMenu | Navigation menus |
| `scroll-area.tsx` | ScrollArea | Custom scroll containers |
| `separator.tsx` | Separator | Visual dividers |
| `tabs.tsx` | Tabs | Tab interfaces |
| `tooltip.tsx` | Tooltip | Tooltips |

### Component rules

1. **Components are stateless renderers**. They receive props and return markup. No page-specific logic.
2. **Components reference the styling layer** for visual appearance. Use design tokens (`var(--text)`, `var(--primary)`) and semantic typography classes (`text-body`, `text-meta`), never hardcoded values.
3. **Components are reusable**. If it appears on more than one page, extract it into a component.
4. **Components do not fetch data**. Data fetching happens at the page level (Layer 4) and is passed as props.
5. **New components must be accessible by default**: ARIA labels, keyboard navigation, focus management, touch targets.

---

## Layer 3: Styling

The styling layer is the single source of truth for how everything looks. It defines the design tokens, semantic classes, and responsive behavior that components and pages consume.

### Architecture

```
src/styles/global.css
  @import "tailwindcss"
  @theme { ... }                 Design tokens (colors, fonts, spacing, sizes)
  @layer base { ... }            Theme variables, typography scale, HTML element defaults
  @layer components { ... }      Reusable component classes (.card, .btn-*, .text-body, etc.)
  @layer utilities { ... }       Custom utility classes (text colors, mineral colors, shadows)
  Accessibility layer            Skip links, focus, touch targets, reduced motion, print
```

### Design tokens (`@theme`)

All visual values are defined as CSS custom properties in the `@theme` block. These are the single source of truth:

- **Colors**: Five African Minerals palette, surface colors, text colors, semantic colors
- **Typography**: Font families, weights, and **text size scale tokens**
- **Spacing**: 4px base unit scale
- **Borders**: Radius tokens for buttons (12px), cards (16px), inputs (8px), badges (9999px)
- **Shadows**: Soft, single-layer shadow scale
- **Component tokens**: Button sizes, input sizes, nav dimensions

### Semantic typography system

**This is critical.** Text sizing is controlled centrally through semantic CSS classes defined in `@layer components`. Pages and components use these classes instead of raw Tailwind text sizing utilities.

| Class | Desktop | Mobile | Line Height | Use For |
|-------|---------|--------|-------------|---------|
| `.text-body` | 18px | 16px | 1.7 | Paragraphs, descriptions, list items, card content, button text |
| `.text-body-lg` | 20px | 18px | 1.6 | Section subtitles, lead paragraphs, featured descriptions |
| `.text-meta` | 16px | 14px | 1.5 | Dates, labels, secondary info, table data, form hints |
| `.text-caption` | 14px | 14px | 1.4 | Badges, tags, very short decorative labels |

These classes reference `@theme` tokens (`--text-size-body`, `--text-size-body-mobile`, etc.), so changing a single token value updates every instance across the site.

**What you must use semantic classes for:**
- All paragraph and body text -> `text-body`
- Section introductions and subtitles -> `text-body-lg`
- Dates, labels, metadata -> `text-meta`
- Badge and tag text -> `text-caption`

**What you must NOT do:**
- Use raw `text-sm`, `text-base`, `text-lg` for content text (these are for headings and exceptional cases only)
- Hardcode `font-size` values in scoped `<style>` blocks (reference tokens instead)
- Use responsive size patterns like `text-sm sm:text-base` (the semantic classes handle responsive sizing internally)

### Theme system

Two themes (dark default, light) controlled via CSS class on `<html>`:

- `:root` = dark mode (default)
- `:root.light` = light mode
- `@media (prefers-color-scheme: light)` for system preference fallback
- Theme variables (`--bg`, `--text`, `--primary`, etc.) swap between modes
- Persisted to `localStorage` via `ThemeToggle.astro`

### Styling rules

1. **All visual values come from tokens**. No hardcoded hex colors, pixel sizes, or font names in page files.
2. **Semantic typography classes for all content text**. Change sizes in one place, not across 17 pages.
3. **Component classes for repeated patterns** (`.card`, `.btn-primary`, `.badge`). Defined once in `@layer components`.
4. **Tailwind utilities for layout** (`flex`, `grid`, `gap-*`, `px-*`, `max-w-*`). These are fine to use inline.
5. **Scoped `<style>` blocks for complex component styles** that don't fit utilities. Must reference tokens.
6. **Mobile-first responsive design**. Default styles = mobile. Use `sm:`, `md:`, `lg:` for larger screens.
7. **`prefers-reduced-motion` must be respected**. All animations disabled when user requests it.

---

## Layer 4: Content

Content is the pages, blog posts, and data that fill the shell and use components. Content files focus on structure and information, not appearance.

### Page files

All page files live in `src/pages/` and follow Astro's file-based routing:

```
src/pages/
  index.astro           /
  frameworks.astro      /frameworks
  framework.astro       /framework
  pricing.astro         /pricing
  about.astro           /about
  ...
  blog/
    index.astro         /blog
    *.astro             /blog/*
```

### Page structure template

Every page follows the same pattern:

```astro
---
// 1. Imports
import BaseLayout from '../layouts/BaseLayout.astro';
import PageBreadcrumb from '../components/PageBreadcrumb.astro';
import { BookOpen } from '@lucide/astro';

// 2. Data (if needed)
const data = await fetchData();
---

<!-- 3. Shell wrapper with SEO props -->
<BaseLayout title="Page Title" description="SEO description" keywords="keywords">

  <!-- 4. Breadcrumb (all pages except homepage) -->
  <div class="max-w-[1200px] mx-auto px-8 pt-6">
    <PageBreadcrumb items={[{ label: 'Page Title' }]} />
  </div>

  <!-- 5. Content sections using semantic typography and component classes -->
  <section class="py-24 px-8">
    <div class="max-w-[1200px] mx-auto">
      <h1 class="font-display ...">Title</h1>
      <p class="mt-6 text-body text-[var(--text-secondary)] max-w-[65ch]">Subtitle</p>
    </div>
  </section>

</BaseLayout>
```

### Content rules

1. **Pages use `BaseLayout`** for the shell. Always.
2. **Pages use `PageBreadcrumb`** on every interior page (not homepage).
3. **Pages provide SEO data** via BaseLayout props: `title`, `description`, `keywords`.
4. **Pages use semantic typography classes** for text: `text-body`, `text-body-lg`, `text-meta`, `text-caption`.
5. **Pages use component classes** for UI patterns: `.card`, `.btn-primary`.
6. **Pages use Tailwind utilities** for layout: `flex`, `grid`, `max-w-`, `px-`, `py-`.
7. **Pages do NOT hardcode** colors, font sizes, font families, or shadows. Reference the styling layer.
8. **Pages do NOT duplicate** shell concerns (navigation, footer, analytics, theme).

### Blog content (Sanity CMS - planned)

Blog content will be managed in Sanity.io and queried via GROQ:

```
Sanity Content Lake -> GROQ Query -> Astro Page -> BaseLayout Shell
```

Blog posts are the only content that includes images (featured image, inline images). All other pages use typography, icons, and whitespace only.

---

## Enforcement

The architecture is enforced through automated tests and CI. If a change violates the architecture, tests fail and the PR is blocked.

### Test suites

| Suite | File | What it enforces |
|-------|------|------------------|
| **Design guidelines** | `tests/design-guidelines.test.js` | Breadcrumbs, no background images, no emojis, heading hierarchy, display font usage, no forbidden fonts, BaseLayout usage, typography tokens, semantic class usage |
| **Accessibility & SEO** | `tests/accessibility-seo.test.js` | Meta tags, Open Graph, JSON-LD, skip links, landmarks, lang attribute, heading hierarchy, viewport meta, CSS accessibility features, sitemap, RSS |

### What tests check

**Architecture compliance:**
- Every page imports and uses `BaseLayout`
- Every interior page has `PageBreadcrumb`
- No hardcoded text sizing classes (`text-sm`, `text-base`, `text-lg`) on content elements (use semantic classes)
- No hardcoded color values outside the palette
- No forbidden fonts (only Noto Serif, Plus Jakarta Sans, JetBrains Mono)
- No emojis (Lucide icons only)
- No background images on non-blog pages

**Accessibility compliance:**
- WCAG 2.2 AAA contrast (APCA Lc 60+ for body text)
- Skip links present (3 targets)
- Semantic landmarks (`<main>`, `<nav>`, `<footer>`)
- Heading hierarchy (one H1 per page, no skipped levels)
- Touch targets 44x44px minimum
- `prefers-reduced-motion` respected
- `prefers-contrast: more` supported
- `forced-colors: active` supported

**SEO compliance:**
- Unique `<title>` per page
- `<meta name="description">` present and 150-160 characters
- Open Graph tags present
- JSON-LD structured data present
- Sitemap generated
- RSS feed generated

### CI pipeline

```
Push/PR -> Lint & Format -> Design Tests -> Build -> Accessibility/SEO Tests
```

Every check must pass. No exceptions.

---

## Adding New Pages

Follow this checklist when adding any new page:

1. Create `src/pages/page-name.astro`
2. Import and wrap with `BaseLayout` (title, description, keywords)
3. Add `PageBreadcrumb` with correct hierarchy
4. Use semantic typography classes for all text content
5. Use component classes and Tailwind utilities for layout
6. Use Lucide icons only (no emojis, no images except blog)
7. Test both light and dark themes
8. Test mobile viewport (375px, 393px)
9. Verify keyboard navigation and focus indicators
10. Run `npm run check` (lint + format + tests + build)

## Adding New Components

1. Create in `src/components/` (Astro) or `src/components/ui/` (React)
2. Reference design tokens for all visual values
3. Use semantic typography classes, not raw Tailwind text sizes
4. Ensure accessibility: ARIA labels, keyboard nav, focus states, 44px touch targets
5. Document props interface with TypeScript
6. Export from `src/components/ui/index.ts` if React

## Modifying the Design System

1. Edit `src/styles/global.css` only
2. Change `@theme` tokens for values (colors, sizes, spacing)
3. Change `@layer components` for component class behavior
4. The change propagates to every page and component automatically
5. Run full test suite to verify no regressions
6. Update ARCHITECTURE.md if adding new tokens or classes

---

## Scaling Principles

1. **One source of truth per concern**. Tokens in `@theme`. Typography in component classes. Shell in BaseLayout. Navigation in one place.
2. **Change in one place, propagate everywhere**. Never duplicate a value. If you're copy-pasting a color, size, or style, extract it.
3. **Test the architecture, not just the output**. Tests verify structural rules (uses BaseLayout, has breadcrumbs, uses semantic classes) not just visual correctness.
4. **Content scales independently**. Adding a new page should require zero changes to the shell, components, or styling layers.
5. **Fail fast**. CI catches violations before they reach main. Lint, format, and design tests run before the build.
6. **Accessible by default**. Accessibility is built into every layer (shell skip links, component ARIA, styling focus indicators, content heading hierarchy). It's not an afterthought.

---

**Referenced by**: [CLAUDE.md](CLAUDE.md) | [CONTRIBUTING.md](CONTRIBUTING.md)
**Enforced by**: `tests/design-guidelines.test.js` | `tests/accessibility-seo.test.js` | `.github/workflows/ci.yml`
