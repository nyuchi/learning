# nyuchi learning - Development & Design Guidelines

**Version**: 5.0 (Clean Minimalist Design, APCA Contrast, Sanity CMS)
**Last Updated**: February 2026
**Maintained By**: nyuchi learning Development Team

---

## Design Philosophy

This project follows a **clean minimalist design philosophy** inspired by Anthropic's website and modern "barely-there UI" principles. Every design decision prioritizes **readability, content clarity, and trust** over visual spectacle.

### Core Principles

1. **Typography-led design** - Text communicates faster than images. Bold headlines, generous line heights, and large readable body text are the primary design tools.
2. **Restrained minimalism** - Generous whitespace is structural, not decorative. Every element earns its place.
3. **Content-first** - Reading flow is prioritized. Visuals support content instead of competing with it.
4. **Minimal imagery** - No stock photos or decorative images on pages. Blog posts (via Sanity.io) are the only exception. Use Lucide icons and typography for visual interest.
5. **Warm, trust-building palette** - Warm neutrals (cream, warm grays) in light mode; deep, warm darks in dark mode. Avoid cold, clinical aesthetics.
6. **Mobile-first, Africa-first** - Design for mobile devices on African networks first, scale up to desktop.
7. **Accessible by default** - WCAG 2.2 AAA compliance with forward-looking APCA (WCAG 3.0) contrast testing.

### What This Means in Practice

- **No hero images or background photos** - Use typography, whitespace, and color for visual impact
- **No decorative illustrations** - Lucide icons only, used sparingly and purposefully
- **Large body text** - 18px minimum on desktop, 16px minimum on mobile for comfortable reading
- **Generous spacing** - Sections breathe. Cards don't crowd. Content has room.
- **One font family doing most of the work** - Plus Jakarta Sans handles body and headings H2-H6; Noto Serif adds distinction to H1 headlines only
- **Muted accents** - The Five African Minerals palette provides color, but applied with restraint. Cobalt is for interactive elements, not decoration.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Directory Structure](#directory-structure)
3. [Design System](#design-system)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Navigation & Wayfinding](#navigation--wayfinding)
7. [Component Library](#component-library)
8. [Page Development](#page-development)
9. [Blog & Content (Sanity.io)](#blog--content-sanityio)
10. [SEO & Metadata](#seo--metadata)
11. [Accessibility](#accessibility)
12. [Responsive Design](#responsive-design)
13. [Animation System](#animation-system)
14. [Development Workflows](#development-workflows)
15. [Coding Conventions](#coding-conventions)
16. [Git Workflows](#git-workflows)
17. [Deployment](#deployment)
18. [Troubleshooting](#troubleshooting)

---

## Technology Stack

```json
{
  "framework": "Astro 5.16+",
  "language": "TypeScript 5.6+ (strict mode)",
  "styling": "Tailwind CSS 4.1+ with PostCSS",
  "icons": "@lucide/astro 0.574+, lucide-react 0.574+",
  "ui": "Radix UI React primitives",
  "react": "React 19+",
  "utilities": ["clsx", "class-variance-authority", "tailwind-merge"],
  "integrations": [
    "@astrojs/mdx",
    "@astrojs/react",
    "@astrojs/rss",
    "@astrojs/sitemap"
  ],
  "fonts": ["Noto Serif", "Plus Jakarta Sans", "JetBrains Mono"],
  "blogCMS": "Sanity.io (planned)",
  "brandSystem": "Bundu Family - Five African Minerals",
  "primaryMineral": "Cobalt (Education)",
  "analytics": "Google Analytics (G-BNHM29F8W5)",
  "deployment": "Vercel",
  "nodeVersion": "18+"
}
```

### Key Dependencies

| Category | Package | Purpose |
|----------|---------|---------|
| **Framework** | `astro` 5.16+ | Static site generator |
| **Styling** | `tailwindcss` 4.1+ | Utility-first CSS |
| **Styling** | `@tailwindcss/postcss` | PostCSS integration |
| **Styling** | `@tailwindcss/typography` | Prose typography |
| **UI** | `@radix-ui/react-*` | Accessible UI primitives (avatar, dialog, dropdown, navigation, scroll-area, tabs, tooltip) |
| **React** | `react` 19+, `react-dom` 19+ | Interactive components |
| **Utilities** | `clsx`, `class-variance-authority`, `tailwind-merge` | Conditional classes, variant management |
| **Icons** | `@lucide/astro`, `lucide-react` | Icon library |
| **Content** | `@astrojs/mdx` | Rich content authoring |
| **SEO** | `@astrojs/sitemap`, `@astrojs/rss` | Sitemap and RSS generation |

---

## Directory Structure

```
/
├── public/                     # Static assets (served as-is)
│   ├── *.svg                   # Logo files, favicon
│   ├── frameworks/             # Framework documentation (Markdown)
│   ├── llms.txt                # LLM/AI crawler directives
│   └── robots.txt              # SEO crawler configuration
├── src/
│   ├── components/             # Reusable components
│   │   ├── Logo.astro          # Logo (3 variants: main, horizontal, compact)
│   │   ├── SEO.astro           # Meta tags, Open Graph, JSON-LD
│   │   ├── ThemeToggle.astro   # Light/Dark/System theme switcher
│   │   ├── PageBreadcrumb.astro # Breadcrumb navigation
│   │   ├── BuilderBox.astro    # Builder UI pattern (dashed borders)
│   │   ├── InfoTooltip.astro   # Tooltip component
│   │   └── UserAvatar.astro    # Avatar component
│   ├── layouts/
│   │   └── BaseLayout.astro    # Master layout (header, footer, minerals strip, animations)
│   ├── lib/                    # Utility functions
│   ├── pages/                  # File-based routing (each .astro = route)
│   │   ├── index.astro         # Homepage (/)
│   │   ├── frameworks.astro    # Frameworks overview (/frameworks)
│   │   ├── framework.astro     # K-12 Digital Campus (/framework)
│   │   ├── support-framework.astro  # Support Process (/support-framework)
│   │   ├── digital-literacy-framework.astro  # Digital Literacy (/digital-literacy-framework)
│   │   ├── pricing.astro       # Budget Planning (/pricing)
│   │   ├── resources.astro     # Resources Hub (/resources)
│   │   ├── about.astro         # Mission & Impact (/about)
│   │   ├── global-reach.astro  # Global Reach (/global-reach)
│   │   ├── team.astro          # Team (/team)
│   │   ├── community.astro     # Community (/community)
│   │   ├── consultation.astro  # Book a Consultation (/consultation)
│   │   ├── rss.xml.ts          # RSS feed
│   │   └── blog/               # Blog section
│   │       ├── index.astro     # Blog index (/blog)
│   │       └── *.astro         # Individual blog posts
│   ├── styles/
│   │   └── global.css          # Tailwind theme, design tokens, component layer
│   └── env.d.ts                # TypeScript environment definitions
├── astro.config.mjs            # Astro configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration (strict, path aliases)
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.mjs          # PostCSS configuration
├── vercel.json                 # Vercel deployment configuration
├── CLAUDE.md                   # This file
├── BRANDING.md                 # Brand guidelines (v6.0)
├── CONTRIBUTING.md             # Contribution guidelines
├── DEPLOYMENT.md               # Deployment instructions
├── README.md                   # Project documentation
├── SECURITY.md                 # Security policy
└── LICENSE                     # MIT License
```

### Key Files

| File | Purpose |
|------|---------|
| `src/layouts/BaseLayout.astro` | Master layout (~1,500 lines). Header (auto-hide, transparent/solid, dropdown menus), footer (global mission, 4-column grid, wordmark), Minerals Strip, mobile menu, theme toggle, animation system, skip links |
| `src/styles/global.css` | Design system (~1,260 lines). Tailwind @theme tokens, @layer base/components/utilities, accessibility layer, print styles |
| `src/components/SEO.astro` | Comprehensive SEO: meta tags, Open Graph, Twitter Cards, JSON-LD structured data |
| `src/components/ThemeToggle.astro` | Light/Dark/System theme with localStorage persistence |
| `src/components/PageBreadcrumb.astro` | Accessible breadcrumb navigation with structured markup |
| `astro.config.mjs` | Site config, sitemap with per-page priorities, React integration |

---

## Design System

### Architecture

The design system is built on **Tailwind CSS 4.1+** using the `@theme` directive for design tokens and CSS layers for organization:

```
src/styles/global.css
├── @import "tailwindcss"
├── @theme { ... }              # Design tokens (colors, fonts, spacing, radii, shadows)
├── @layer base { ... }         # Theme variables, typography scale, responsive type
├── @layer components { ... }   # .card, .btn-primary, .btn-secondary, .input, .badge, .container, .section
├── @layer utilities { ... }    # Text colors, bg colors, minerals, shadows
├── Accessibility layer         # Skip links, focus indicators, touch targets, reduced motion, forced colors, print styles
```

### Design Tokens

**Spacing** (4px base unit):

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | 4px | Tight gaps |
| `--spacing-sm` | 8px | Small gaps |
| `--spacing-md` | 16px | Default spacing |
| `--spacing-lg` | 24px | Card padding, section gaps |
| `--spacing-xl` | 32px | Large spacing |
| `--spacing-2xl` | 48px | Section padding (mobile) |
| `--spacing-3xl` | 64px | Section padding (desktop) |

**Border Radii**:

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-button` | 12px | All buttons |
| `--radius-card` | 16px | Cards, containers |
| `--radius-input` | 8px | Form fields |
| `--radius-badge` | 9999px | Pill-shaped badges |
| `--radius-app-icon` | 24px | Application icons |

**Shadows** (soft, single-layer for clean feel):

| Token | Usage |
|-------|-------|
| `--shadow-sm` | Subtle elevation |
| `--shadow-base` | Default cards |
| `--shadow-md` | Hover states |
| `--shadow-lg` | Dropdowns |
| `--shadow-xl` | Modals |
| `--shadow-card` | Card resting state |
| `--shadow-card-hover` | Card hover state |

**Component Tokens**:

| Token | Value |
|-------|-------|
| `--nav-height` | 64px |
| `--nav-max-width` | 1200px |
| `--nav-touch-target` | 44px |
| `--nav-blur` | 24px |
| `--a11y-touch-target` | 44px |
| `--a11y-font-min` | 14px |

---

## Color System

### Philosophy

The color system draws from both the **Five African Minerals** palette (brand) and **Anthropic-inspired warm neutrals** (surfaces). Light mode uses a warm cream base (`#FAF9F5` - matching Anthropic's `#faf9f5`). Dark mode uses deep warm blacks (`#0A0A0A`) rather than cold slate.

### Theme Support

The site implements **three theme modes** via the ThemeToggle component:

- **Dark** (default) - Deep warm blacks with bright mineral accents
- **Light** - Warm cream/white with deep mineral colors
- **System** - Follows OS/browser `prefers-color-scheme`

Theme is applied via CSS class on `<html>` (`.light` or `.dark`) and persisted in `localStorage`.

### Surface Colors

**Light Mode** (warm, inviting):

| Surface | Value | Name |
|---------|-------|------|
| Base | `#FAF9F5` | Warm Cream |
| Surface | `#FFFFFF` | White |
| Dim | `#F3F2EE` | Subtle Warm Gray |
| Border | `rgba(10, 10, 10, 0.08)` | — |

**Dark Mode** (deep, warm):

| Surface | Value | Name |
|---------|-------|------|
| Base | `#0A0A0A` | Near Black |
| Surface | `#141414` | Warm Dark |
| Elevated | `#1E1E1E` | Warm Dark Gray |
| Border | `rgba(255, 255, 255, 0.08)` | — |

### Text Colors

**Light Mode**:

| Type | Value | Name |
|------|-------|------|
| Primary | `#141413` | Near Black |
| Secondary | `#4A4A46` | Warm Gray |
| Tertiary | `#5C5B58` | Muted Warm Gray |

**Dark Mode**:

| Type | Value | Name |
|------|-------|------|
| Primary | `#F5F5F4` | Warm White |
| Secondary | `#B8B8B3` | Warm Light Gray |
| Tertiary | `#9A9A95` | Muted Warm Gray |

### Five African Minerals

The Bundu Ecosystem's unified palette. All colors achieve **WCAG AAA (7:1+)** contrast ratios on their respective backgrounds.

| Mineral | Light Mode | Dark Mode | Origin | Usage |
|---------|------------|-----------|--------|-------|
| **Cobalt** | `#0047AB` | `#00B0FF` | DRC, Zambia | Primary interactive: CTAs, links, buttons |
| **Tanzanite** | `#4B0082` | `#B388FF` | Tanzania | Social, premium features |
| **Malachite** | `#004D40` | `#64FFDA` | Congo | Success states, confirmations |
| **Gold** | `#5D4037` | `#FFD740` | Ghana, South Africa | Rewards, highlights, warmth |
| **Terracotta** | `#8B4513` | `#D4A574` | Pan-African | Community, Ubuntu philosophy |

Each mineral also has `container` and `on-container` variants for contained UI elements (badges, chips, status indicators).

### Semantic Colors

| Type | Light | Dark | Usage |
|------|-------|------|-------|
| Success | `#004D40` | `#64FFDA` | Malachite - confirmations |
| Error | `#B3261E` | `#F2B8B5` | Destructive actions |
| Warning | `#7A5C00` | `#FFD866` | Alerts, caution |
| Info | `#0047AB` | `#00B0FF` | Cobalt - information |

### Color Usage Rules

- **Cobalt** is the primary interactive color. Use it for buttons, links, CTAs, focus indicators.
- **Other minerals** are accent colors. Use sparingly for semantic meaning, not decoration.
- **Surfaces** do the heavy lifting for visual hierarchy. Rely on surface layering (base > surface > elevated) rather than mineral colors for structure.
- **Text colors** must meet APCA Lc 60+ for body text, Lc 75+ preferred.
- **Never use colors outside the defined palette.** No ad-hoc hex values.

---

## Typography

### Font Stack

| Purpose | Font | Weights | Usage |
|---------|------|---------|-------|
| **Display (H1 only)** | Noto Serif | 400, 700 | Hero headlines, page titles |
| **Headings (H2-H6)** | Plus Jakarta Sans | 600, 700, 800 | Section titles, card titles |
| **Body** | Plus Jakarta Sans | 300, 400, 500, 600 | Paragraphs, UI text |
| **Code** | JetBrains Mono | 400, 500 | Code blocks, technical content |
| **Wordmarks** | Plus Jakarta Sans | 600 | Brand names (always lowercase) |

### Typography Scale

**Desktop** (prioritize readability - large, comfortable sizes):

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| H1 | Noto Serif | `clamp(2.5rem, 6vw, 4rem)` | 700 | 1.1 | -0.02em |
| H2 | Plus Jakarta Sans | `clamp(2rem, 4vw, 2.5rem)` | 700 | 1.2 | — |
| H3 | Plus Jakarta Sans | 1.5rem | 600 | 1.3 | — |
| H4 | Plus Jakarta Sans | 1.25rem | 600 | 1.4 | — |
| Body | Plus Jakarta Sans | 18px | 400 | 1.7 | — |
| Small | Plus Jakarta Sans | 14px | 400 | 1.5 | — |

**Mobile** (maintain readability):

| Element | Size |
|---------|------|
| H1 | `clamp(2rem, 8vw, 2.5rem)` |
| H2 | `clamp(1.5rem, 6vw, 2rem)` |
| H3 | 1.25rem |
| Body | 16px minimum |

### Typography Guidelines

- **Use `clamp()` everywhere** for fluid responsive sizing. No hard breakpoint jumps.
- **Body text is 18px on desktop, 16px minimum on mobile.** This is larger than most sites and is intentional for readability, especially for education content.
- **Line height of 1.7 for body text.** Generous for comfortable reading.
- **Maximum line width of ~65-75 characters** (`max-width: 65ch` on prose content). Long lines reduce readability.
- **Noto Serif is for H1 only.** It provides editorial distinction. Everything else uses Plus Jakarta Sans to keep the visual language clean.
- **Wordmarks are always lowercase:** nyuchi, bundu, mukoko, shamwari.

---

## Navigation & Wayfinding

Good navigation is critical for SEO, accessibility, and user experience. The site implements a multi-layered navigation system.

### Header Navigation

**Desktop** (>768px):

```
[Logo] Home | Frameworks | Resources | Budget Planning | Blog | About v | [Book a Consultation] [Theme Toggle]
```

The **About** link opens a dropdown with sub-items:
- Mission & Impact
- Global Reach
- Our Team
- Community

**Mobile** (<768px):

Hamburger menu with flat navigation (no nested dropdowns). All links listed vertically with 48px touch targets. Menu auto-closes on link click or Escape key.

**Header Behavior**:
- Fixed position, 64px height
- **Transparent** state when at top of page (for hero sections)
- **Solid** state when scrolled past 50px (background with blur backdrop)
- **Auto-hides** when scrolling down (past 100px)
- **Reappears** when scrolling up

### Breadcrumbs

Use the `PageBreadcrumb` component on all pages except the homepage:

```astro
---
import PageBreadcrumb from '../components/PageBreadcrumb.astro';
---

<PageBreadcrumb items={[
  { label: 'Frameworks', href: '/frameworks' },
  { label: 'K-12 Digital Campus' }
]} />
```

**Breadcrumb guidelines**:
- Always start with Home (built into the component)
- Last item has no `href` (current page, marked with `aria-current="page"`)
- Chevron separators between items (SVG, `aria-hidden`)
- Font size: 0.875rem (14px)
- Placed below the header, above page content
- Provides SEO structured data (BreadcrumbList schema)

### Footer

**Structure** (4 sections):

1. **Footer Hero** - Large heading ("Build Digital Campuses. Prepare Students for 2050."), Ubuntu tagline, geographic reach
2. **Footer Grid** (responsive: 1col mobile, 2col tablet, 4col desktop):
   - Frameworks: All Frameworks, K-12 Digital Campus, Digital Literacy, Support Process
   - Resources: Resources Hub, Budget Planning Guide, Blog & Insights, Book a Consultation
   - Community: Join Our Community, GitHub Repository, Discussions, Issues & Feedback
   - About: Mission & Impact, Global Reach, Our Team
3. **Full-Width Wordmark** - "nyuchi learning" in large responsive type
4. **Footer Bottom** - Meta info, principles, copyright

**Footer design principles**:
- Clean, well-spaced link groups
- No decorative elements - just organized navigation
- Responsive grid that collapses gracefully
- Ubuntu tagline and geographic reach for brand reinforcement

### Sitemap Priority

Configured in `astro.config.mjs` with per-page priorities:

| Page Type | Priority | Changefreq |
|-----------|----------|------------|
| Homepage | 1.0 | weekly |
| Framework pages | 0.9 | weekly |
| Resources, Pricing | 0.8 | monthly |
| Blog index | 0.8 | weekly |
| Blog posts | 0.7 | monthly |
| About pages | 0.6 | monthly |

---

## Component Library

### BaseLayout

**All pages must use BaseLayout.** It provides:
- Skip links (3 targets for WCAG 2.2 AAA)
- Minerals Strip (4px, left edge, hidden on mobile <480px)
- Header with navigation (desktop + mobile)
- Footer with links and Ubuntu messaging
- SEO meta tags via SEO component
- Google Analytics
- Theme system (light/dark/system)
- Animation system (Intersection Observer)
- Global styles

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Page Title"
  description="Page description for SEO"
  keywords="keyword1, keyword2"
  image="/og-image.png"
  type="website"
>
  <!-- Page content -->
</BaseLayout>
```

### SEO Component

Used automatically by BaseLayout. Generates:
- Primary meta tags (title, description, keywords)
- Open Graph tags (og:title, og:description, og:image, og:type)
- Twitter Cards (summary_large_image)
- JSON-LD structured data (Organization, Website, LearningResource)
- Geographic meta tags (Zimbabwe)
- AI crawler directives

### ThemeToggle

Light/Dark/System theme switcher with dropdown menu:
- Sun/Moon icon button
- Dropdown with 3 options: Light, Dark, System
- Persists to localStorage
- Respects `prefers-color-scheme` media query
- Accessible: keyboard navigable, focus indicators, Escape to close

### PageBreadcrumb

Accessible breadcrumb navigation:
- Semantic `<nav aria-label="Breadcrumb">` wrapper
- `<ol>` list with proper `aria-current="page"` on current item
- Chevron separators with `aria-hidden="true"`
- Responsive font sizing
- Hover states on links

### Logo

Three variants, three sizes:

| Variant | Description | Sizes |
|---------|-------------|-------|
| `main` | Stacked (icon + text) | sm: 120x36, md: 200x60, lg: 280x84 |
| `horizontal` | Side-by-side | sm: 180x30, md: 300x50, lg: 420x70 |
| `compact` | Icon with "N" initial | sm: 48x24, md: 80x40, lg: 112x56 |

```astro
<Logo variant="horizontal" size="md" />
```

### BuilderBox

Builder/construction UI pattern with dashed borders. Used for sections that are "in progress" or represent configurable areas.

### InfoTooltip

Tooltip component for contextual help. Built on Radix UI tooltip primitive.

### UserAvatar

Avatar component for user profiles. Built on Radix UI avatar primitive with fallback initials.

---

## Page Development

### Creating a New Page

```astro
---
// src/pages/my-page.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import PageBreadcrumb from '../components/PageBreadcrumb.astro';
import { BookOpen } from '@lucide/astro';
---

<BaseLayout
  title="My Page"
  description="Clear, compelling description for SEO (150-160 chars)"
  keywords="relevant, keywords"
>
  <!-- Breadcrumb -->
  <div class="max-w-[1200px] mx-auto px-8 pt-6">
    <PageBreadcrumb items={[
      { label: 'My Page' }
    ]} />
  </div>

  <!-- Hero Section -->
  <section class="py-24 px-8">
    <div class="max-w-[1200px] mx-auto">
      <h1 class="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.1] tracking-tight text-[var(--text)]">
        Page Title
      </h1>
      <p class="mt-6 text-lg text-[var(--text-secondary)] max-w-[65ch] leading-relaxed">
        Subtitle or introduction text. Keep it concise and valuable.
      </p>
    </div>
  </section>

  <!-- Content Section -->
  <section class="py-16 px-8">
    <div class="max-w-[1200px] mx-auto">
      <h2 class="text-[clamp(2rem,4vw,2.5rem)] font-bold text-[var(--text)]">
        Section Title
      </h2>
      <p class="mt-4 text-lg text-[var(--text-secondary)] max-w-[65ch] leading-relaxed">
        Content here. Keep paragraphs short. Use whitespace generously.
      </p>
    </div>
  </section>
</BaseLayout>
```

### Page Layout Principles

1. **Content width: 1200px max** with 32px padding (desktop) or 20px (mobile)
2. **Prose width: 65ch max** for readable line lengths
3. **Section spacing: 80-96px** vertical padding on desktop, 48px on mobile
4. **Hero sections: 96px top padding** (accounts for fixed 64px header + breathing room)
5. **No full-bleed images or backgrounds** unless absolutely necessary (e.g., hero gradient)
6. **Every page needs breadcrumbs** (except homepage)
7. **Every page needs proper SEO** (title, description, keywords, Open Graph)

### Content Hierarchy

Follow this visual hierarchy on every page:

1. **Breadcrumb** - Wayfinding context (small, subtle)
2. **H1** - Page title in Noto Serif (one per page)
3. **Subtitle** - Supporting text in secondary color
4. **H2** - Section headings in Plus Jakarta Sans
5. **Body text** - 18px, warm secondary color, generous line height
6. **Cards/grids** - For listing related items
7. **CTA** - Clear call to action where appropriate

---

## Blog & Content (Sanity.io)

### Current State

Blog posts are currently Astro page files (`src/pages/blog/*.astro`). The site is migrating to **Sanity.io** as the headless CMS for blog content.

### Sanity.io Integration (Planned)

**Dependencies to add:**
```bash
npm install @sanity/astro @sanity/client @sanity/image-url
```

**Astro config integration:**
```javascript
// astro.config.mjs
import sanity from '@sanity/astro';

export default defineConfig({
  integrations: [
    sanity({
      projectId: '<project-id>',
      dataset: 'production',
      apiVersion: '2025-01-28',
      useCdn: false, // false for static builds with webhook rebuilds
    }),
    // ... other integrations
  ],
});
```

**Content queried via GROQ** (Graph-Relational Object Queries) from Sanity's Content Lake.

### Blog Design Guidelines

Blog posts are the **only pages that should use images** prominently:
- Featured/hero image per post (from Sanity image pipeline)
- Inline images within content where editorially necessary
- All other pages rely on typography, icons, and whitespace

**Blog post metadata** (from Sanity schema):
- Title, slug, excerpt/description
- Published date, modified date
- Author (name, avatar, bio)
- Category, tags
- Featured image with alt text
- SEO fields (meta title, meta description, OG image)

**Blog listing page**:
- Clean card grid (1 column mobile, 2 columns desktop)
- Card shows: title, date, excerpt, category tag
- No image thumbnails on listing page (clean, text-focused)
- Pagination or infinite scroll

**Blog post page**:
- Breadcrumb: Home > Blog > Post Title
- Article schema markup (JSON-LD)
- Author attribution
- Published/modified dates
- Reading time estimate
- Clean prose typography (18px body, 65ch max width, 1.7 line height)
- Featured image with proper aspect ratio
- Social sharing metadata

---

## SEO & Metadata

### Meta Tag Strategy

Every page must have:

```astro
<BaseLayout
  title="Descriptive Page Title | nyuchi learning"
  description="Compelling 150-160 character description with target keywords"
  keywords="primary keyword, secondary keyword, tertiary keyword"
  image="/og-image.png"
  type="website"
/>
```

### SEO Component Output

The SEO component (`src/components/SEO.astro`) generates:

**Primary tags:**
- `<title>` - Unique per page, includes brand suffix
- `<meta name="description">` - 150-160 characters, compelling
- `<meta name="keywords">` - Relevant keywords

**Open Graph (Facebook, LinkedIn):**
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`

**Twitter Cards:**
- `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`

**Structured Data (JSON-LD):**
- `EducationalOrganization` schema for the site
- `LearningResource` schema for framework pages
- `Article` schema for blog posts
- `BreadcrumbList` schema for breadcrumb navigation
- `WebSite` schema with search action

**Additional:**
- Canonical URL
- Geographic meta tags (Zimbabwe)
- AI crawler directives (allow GPTBot, Claude-Web, PerplexityBot)
- Mobile app meta tags
- `robots: index, follow, max-image-preview:large`

### SEO Best Practices

1. **Unique titles and descriptions** for every page
2. **Target keywords** in title, description, H1, and first paragraph
3. **Descriptive URLs** - Use kebab-case slugs (`/digital-literacy-framework` not `/dlf`)
4. **Internal linking** - Link between related pages naturally
5. **Sitemap** - Auto-generated with page-specific priorities and changefreq
6. **RSS feed** - Available at `/rss.xml` for content syndication
7. **robots.txt** - Allows all crawlers, including AI (GPTBot, Claude-Web, CCBot, PerplexityBot)
8. **llms.txt** - AI crawler directives in `public/llms.txt`
9. **Image alt text** - Descriptive alt text on all images (when used in blog posts)
10. **Performance** - Fast load times directly improve SEO rankings

### Structured Data Templates

**For framework pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "K-12 Digital Campus Framework",
  "educationalLevel": "K-12",
  "isAccessibleForFree": true,
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Nyuchi Learning"
  }
}
```

**For blog posts:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-20",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  }
}
```

---

## Accessibility

### WCAG 2.2 AAA Compliance

The site targets **WCAG 2.2 AAA** as the baseline and additionally tests against **APCA (WCAG 3.0 draft)** for forward-looking contrast compliance.

### APCA Contrast (WCAG 3.0 Forward-Looking)

APCA (Accessible Perceptual Contrast Algorithm) is the new contrast method being developed for WCAG 3.0. It improves on WCAG 2.x by:

- **Considering font size and weight** - Thin text needs higher contrast than bold text
- **Polarity-aware** - Light-on-dark is perceived differently from dark-on-light
- **Perceptually uniform** - Better models human vision than simple luminance ratios

**APCA Minimum Contrast Levels (Lc values):**

| Content Type | Minimum Lc | Preferred Lc |
|-------------|-----------|-------------|
| Body text (16-18px, 400 weight) | Lc 60 | Lc 75 |
| Large text (24px+, 700 weight) | Lc 45 | Lc 60 |
| Non-text UI elements | Lc 30 | Lc 45 |
| Placeholder/hint text | Lc 30 | Lc 45 |
| Disabled elements | Lc 15 | — |

**Testing tools:**
- Myndex APCA calculator: `myndex.com/APCA/simple`
- Chrome DevTools (built-in contrast checker)
- Deque axe DevTools (automated scanning)

**APCA compliance of our palette:**

| Combination | APCA Lc | Status |
|-------------|---------|--------|
| `#F5F5F4` text on `#0A0A0A` bg (dark) | ~105 | Excellent |
| `#141413` text on `#FAF9F5` bg (light) | ~104 | Excellent |
| `#00B0FF` on `#0A0A0A` (dark CTA) | ~65 | Good for large text/buttons |
| `#0047AB` on `#FAF9F5` (light CTA) | ~62 | Good for large text/buttons |
| `#B8B8B3` on `#0A0A0A` (dark secondary) | ~68 | Good for body text |

### Implemented Accessibility Features

**Skip links** (3 targets):
- Skip to main content
- Skip to navigation
- Skip to footer

**Focus management:**
- 3px outline with 3px offset on `:focus-visible`
- Enhanced box-shadow focus for dark mode
- Focus trap in mobile menu and modals
- Escape key closes menus/modals

**Touch targets:**
- 44x44px minimum for all interactive elements (WCAG 2.1 AA)
- 48px minimum height for primary buttons
- Enforced via CSS `min-width`/`min-height`

**Keyboard navigation:**
- Full Tab navigation through all interactive elements
- Enter/Space activates buttons and links
- Escape closes menus, dropdowns, modals
- Arrow keys navigate dropdown menus

**Screen readers:**
- Semantic HTML (proper heading hierarchy, landmarks)
- ARIA labels on icon-only buttons
- `aria-current="page"` on breadcrumb current item
- `aria-hidden="true"` on decorative elements
- `.sr-only` class for screen-reader-only text

**Reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled, opacity/transform set to final state */
}
```

**High contrast / Forced colors:**
```css
@media (forced-colors: active) {
  /* Border-based focus indicators, system colors */
}
```

**Print styles:**
- Decorative elements hidden
- URLs shown after links
- Black text on white background

---

## Responsive Design

### Breakpoints

```css
/* Mobile-first approach */
/* Default styles: mobile (< 640px) */

@media (min-width: 640px)  { /* Tablet */ }
@media (min-width: 768px)  { /* Tablet landscape / small desktop */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }

/* Special breakpoints */
@media (max-width: 480px)  { /* Small phones - hide Minerals Strip */ }
```

### Mobile Optimizations

**Header:**
- Hamburger menu (Menu/X icon toggle)
- Full-viewport mobile navigation overlay
- Auto-close on link click or Escape
- Logo size reduction

**Typography:**
- H1: `clamp(2rem, 8vw, 2.5rem)`
- H2: `clamp(1.5rem, 6vw, 2rem)`
- Body: 16px minimum (never smaller)

**Layouts:**
- All grids collapse to single column below 768px
- Full-width buttons on mobile
- Reduced card padding (20px mobile vs 24px desktop)
- Icons: 40px on mobile (vs 48-56px desktop)

**Navigation:**
- Tables: horizontal scroll with `overflow-x: auto`
- Touch-friendly scrolling with `-webkit-overflow-scrolling: touch`
- Breadcrumbs: wrap and reduce font size

**Spacing:**
- Section padding: 48px mobile (vs 80px desktop)
- Card gaps: 16px mobile (vs 24px desktop)

**Performance:**
- `background-attachment: scroll` on mobile
- Reduced animation complexity
- Optimized touch event handling

**Minerals Strip:**
- Hidden on mobile (<480px)
- `body { margin-left: 0 }` when hidden

### Mobile Testing Checklist

- [ ] Test on 375px width (iPhone SE)
- [ ] Test on 393px width (Pixel 5)
- [ ] Test on 768px width (iPad)
- [ ] Verify all touch targets are 44x44px+
- [ ] Verify buttons are 48px height
- [ ] Verify no horizontal scrolling (except intentional)
- [ ] Verify hamburger menu works
- [ ] Verify Minerals Strip is hidden (<480px)
- [ ] Verify body text is 16px+
- [ ] Verify breadcrumbs are usable

---

## Animation System

### Intersection Observer Animations

The site uses an Intersection Observer-based system that triggers animations when elements enter the viewport.

### Available Classes

| Class | Effect |
|-------|--------|
| `animate-fade-in` | Opacity 0 -> 1 |
| `animate-slide-up` | Slide up 50px + fade in |
| `animate-slide-left` | Slide from left 50px + fade in |
| `animate-slide-right` | Slide from right 50px + fade in |
| `animate-scale-in` | Scale from 90% + fade in |

### Staggered Animations

Use `.animate-stagger` on a parent container to delay child animations:

```html
<div class="grid animate-stagger">
  <div class="card animate-slide-up">1st (0.1s delay)</div>
  <div class="card animate-slide-up">2nd (0.2s delay)</div>
  <div class="card animate-slide-up">3rd (0.3s delay)</div>
</div>
```

### Animation Guidelines

- **Use sparingly.** Animations should feel natural, not showy.
- **Default duration: 0.8s** with ease-out timing.
- **Only animate on first appearance.** No looping animations.
- **Always respect `prefers-reduced-motion`.** Elements appear immediately without animation.
- **Apply animation classes to individual elements**, not large sections.
- **Stagger grids** for a polished reveal effect.

---

## Development Workflows

### Local Development

```bash
npm run dev          # Start dev server at http://localhost:4321 (HMR enabled)
npm run build        # TypeScript check + production build to dist/
npm run preview      # Preview production build locally
```

### Testing

```bash
npm test             # Run all tests (design guidelines + accessibility/SEO)
npm run test:design  # Run design guidelines compliance tests only
npm run test:a11y    # Run accessibility & SEO tests only (requires build first)
npm run test:watch   # Run tests in watch mode during development
```

**Test suites:**
- `tests/design-guidelines.test.js` - Validates source files against CLAUDE.md design rules: breadcrumbs, no background images, no emojis, heading hierarchy, display font usage, no forbidden fonts, BaseLayout usage, typography tokens
- `tests/accessibility-seo.test.js` - Validates built HTML output: meta tags, Open Graph, JSON-LD, skip links, landmarks, lang attribute, heading hierarchy, viewport meta, CSS accessibility features, BaseLayout features, sitemap, RSS

### Linting & Formatting

```bash
npm run lint         # Run ESLint on src/
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Format all source files with Prettier
npm run format:check # Check formatting without modifying files
npm run check        # Run build + tests + lint (full CI check locally)
```

**Configuration:**
- ESLint: `eslint.config.js` - Astro plugin, no-var, prefer-const, no-unused-vars
- Prettier: `.prettierrc` - 2-space indent, single quotes, trailing commas, 100 char width
- Prettier plugin: `prettier-plugin-astro` for `.astro` file support

### CI/CD (GitHub Actions)

The `.github/workflows/ci.yml` workflow runs on every push to `main` and on pull requests:

1. **Lint & Format** job (runs first): ESLint, Prettier check, design guidelines tests
2. **Build & Test** job (runs after lint passes): TypeScript check, `astro build`, accessibility/SEO tests

### Development Best Practices

1. **Always run `npm run build` before committing** - catches TypeScript errors
2. **Test on mobile viewports** - iPhone SE (375px), Pixel 5 (393px)
3. **Verify breadcrumbs** on every page except homepage
4. **Check theme toggle** - test both light and dark modes
5. **Use design tokens** - CSS variables and Tailwind classes, never hard-coded values
6. **Use lowercase wordmarks** - nyuchi, bundu, etc.
7. **No emojis** - Lucide icons only
8. **No decorative images** - typography and whitespace for visual interest
9. **Verify APCA contrast** - especially for new color combinations
10. **Test keyboard navigation** - Tab through the page, verify focus indicators

---

## Coding Conventions

### Astro Component Structure

```astro
---
// 1. Imports
import BaseLayout from '../layouts/BaseLayout.astro';
import PageBreadcrumb from '../components/PageBreadcrumb.astro';
import { BookOpen, Users } from '@lucide/astro';

// 2. TypeScript interfaces
interface Props {
  title?: string;
  description?: string;
}

// 3. Props with defaults
const {
  title = 'Default Title',
  description = 'Default description'
} = Astro.props;

// 4. Data/logic
const data = await fetchData();
---

<!-- 5. Template -->
<BaseLayout title={title} description={description}>
  <section>
    <h1>{title}</h1>
  </section>
</BaseLayout>

<!-- 6. Scoped styles (or Tailwind classes inline) -->
<style>
  section { padding: 6rem 2rem; }
</style>

<!-- 7. Client-side scripts (if needed) -->
<script>
  // Browser-only JavaScript
</script>
```

### Styling Approach

The project uses **Tailwind CSS 4.1+** with custom `@theme` tokens. Both approaches are used:

1. **Tailwind utility classes** - Preferred for page-level layout and common patterns
2. **Scoped `<style>` blocks** - For component-specific styles that are complex or repetitive

```astro
<!-- Tailwind utilities for layout -->
<div class="max-w-[1200px] mx-auto px-8 py-16">
  <h2 class="text-[clamp(2rem,4vw,2.5rem)] font-bold text-[var(--text)]">Title</h2>
</div>

<!-- Scoped styles for complex components -->
<style>
  .custom-component {
    background: var(--bg-surface);
    border-radius: var(--radius-card);
    border: 1px solid var(--border);
  }
</style>
```

### TypeScript Conventions

- **Strict mode** enabled via `tsconfig.json`
- **Explicit interfaces** for all component props
- **No `any` types** - use proper typing
- **Path aliases** - `@/*` maps to `./src/*`

```typescript
// Good
interface Props {
  variant?: 'primary' | 'secondary';
  items: string[];
}

// Bad
const data: any = fetchData();
```

### Icon Usage

**Always use Lucide icons. Never use emojis.**

```astro
---
import { BookOpen, Users, Globe } from '@lucide/astro';
---

<BookOpen size={48} strokeWidth={1.5} />
```

**Sizing:**
- Feature icons (desktop): 48-56px
- Feature icons (mobile): 40px
- Navigation icons: 24-28px
- Button icons: 20-24px
- Stroke width: 1.5-2 (consistent)

---

## Git Workflows

### Branch Naming

```bash
feature/add-digital-literacy-page
fix/mobile-menu-toggle
content/update-blog-post
style/update-button-radius
refactor/extract-seo-component
docs/update-claude-md
chore/update-dependencies
```

### Commit Messages

Use conventional commits:

```bash
feat: add digital literacy framework page
feat(blog): add sanity.io integration
fix: resolve mobile menu toggle issue
fix(seo): correct Open Graph image path
style: update button border-radius to 12px
refactor: extract SEO component from BaseLayout
content: update pricing tier descriptions
docs: update CLAUDE.md with APCA guidelines
chore: update dependencies
```

### Pre-Commit Checklist

**Automated checks** (run `npm run check` for all at once):
- [ ] `npm run lint` passes (no ESLint errors)
- [ ] `npm run format:check` passes (Prettier formatting)
- [ ] `npm run test:design` passes (design guidelines compliance)
- [ ] `npm run build` passes (TypeScript check + production build)
- [ ] `npm run test:a11y` passes (accessibility/SEO on built output)

**Manual verification:**
- [ ] TypeScript errors resolved
- [ ] Mobile responsive (test in DevTools: 375px, 393px)
- [ ] Breadcrumbs present (except homepage)
- [ ] Both light and dark themes work
- [ ] No emojis used
- [ ] Design tokens used (no hard-coded values)
- [ ] Lowercase wordmarks
- [ ] Accessibility: keyboard nav, focus indicators, touch targets
- [ ] Minerals Strip visible desktop, hidden mobile (<480px)

**Documentation updates** (required for features, breaking changes, and releases):
- [ ] `CHANGELOG.md` updated with changes under appropriate version heading
- [ ] `CLAUDE.md` updated if design system, tech stack, or workflows changed
- [ ] `README.md` updated if features, scripts, or project structure changed
- [ ] `CONTRIBUTING.md` updated if development workflow or standards changed
- [ ] `BRANDING.md` updated if colors, typography, or brand guidelines changed
- [ ] `SECURITY.md` updated if dependencies or security model changed
- [ ] `DEPLOYMENT.md` updated if build process or deployment config changed

---

## Deployment

### Vercel (Automatic)

- **Production**: Push to `main` branch -> https://learning.nyuchi.com
- **Preview**: Push to any branch or PR -> auto-generated preview URL
- **Build command**: `npm run build`
- **Output**: `dist/`
- **Node**: 18.x

### Manual

```bash
npm run build    # Build to dist/
# Upload dist/ to hosting provider
```

---

## Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
- Run `npm run build` and read the error message
- Fix type mismatches, missing imports, incorrect prop types
- Check that all imports resolve correctly

**Mobile menu doesn't toggle:**
- Verify IDs match: `#mobileMenuBtn`, `#mobileMenu`, `#menuIcon`, `#closeIcon`
- Check that the script in BaseLayout is loading correctly

**Minerals Strip not showing:**
- Verify `.minerals-strip` element in BaseLayout
- Check z-index: 9999, position: fixed
- Verify `body { margin-left: 4px }` on desktop
- On mobile (<480px): should be hidden, margin-left: 0

**Theme toggle not working:**
- Verify ThemeToggle component is mounted in header
- Check localStorage for 'theme' key
- Verify `.light` / `.dark` classes are being applied to `<html>`

**Tailwind classes not applying:**
- Verify `@import "tailwindcss"` in global.css
- Check PostCSS config (`postcss.config.mjs`)
- Ensure the file is importing global.css

**Icons not rendering:**
- Verify import: `import { IconName } from '@lucide/astro'`
- Check icon name exists in Lucide library (PascalCase)

**Page not found (404):**
- Verify file exists in `src/pages/` with `.astro` extension
- File name = route (kebab-case)
- Restart dev server if needed

---

## Do's and Don'ts

### DO

- Use generous whitespace and spacing
- Use large, readable body text (18px desktop, 16px mobile)
- Use max-width 65ch for prose content
- Use breadcrumbs on every page (except homepage)
- Use the ThemeToggle for light/dark/system support
- Use Tailwind CSS utilities and design tokens
- Use Cobalt for interactive elements (buttons, links, CTAs)
- Use Noto Serif for H1 only, Plus Jakarta Sans for everything else
- Use lowercase wordmarks (nyuchi, bundu, mukoko, shamwari)
- Use Lucide icons, sized appropriately
- Use the Minerals Strip (4px, left edge, 5 colors)
- Ensure WCAG 2.2 AAA compliance + APCA testing
- Use clamp() for fluid responsive typography
- Use 12px button radius, 16px card radius
- Test both light and dark themes
- Test on mobile viewports
- Prioritize content and readability over visual flourish
- Keep pages clean and minimal

### DON'T

- Use images on non-blog pages (no stock photos, no decorative illustrations)
- Use emojis anywhere (Lucide icons only)
- Use colors outside the Five African Minerals palette
- Use fonts other than Noto Serif, Plus Jakarta Sans, JetBrains Mono
- Use old fonts (Newsreader, Inter, Playfair Display, Roboto)
- Use hard-coded color values (use CSS variables)
- Use small body text (<16px on mobile, <18px on desktop)
- Use pill-shaped buttons (9999px radius) for regular buttons
- Use capitalized brand names ("Nyuchi" - use "nyuchi")
- Use heavy shadows or gradients (keep shadows soft and minimal)
- Use aggressive, flashy design (keep it editorial and calm)
- Add unnecessary visual complexity
- Show Minerals Strip on mobile (<480px)
- Skip breadcrumbs on interior pages
- Skip SEO metadata on any page
- Forget to test keyboard navigation
- Forget to test `prefers-reduced-motion`

---

## Brand Quick Reference

| Element | Value |
|---------|-------|
| Primary color (dark) | `#00B0FF` (Cobalt) |
| Primary color (light) | `#0047AB` (Cobalt) |
| Background (dark) | `#0A0A0A` |
| Background (light) | `#FAF9F5` |
| Text (dark) | `#F5F5F4` |
| Text (light) | `#141413` |
| Display font | Noto Serif (H1 only) |
| Body font | Plus Jakarta Sans |
| Code font | JetBrains Mono |
| Button radius | 12px |
| Card radius | 16px |
| Body text size | 18px desktop, 16px mobile |
| Line height (body) | 1.7 |
| Max prose width | 65ch |
| Touch target min | 44x44px |
| Button height min | 48px |
| Nav height | 64px |
| Minerals Strip | 4px, left edge, hidden <480px |

---

**For detailed brand guidelines, see [BRANDING.md](BRANDING.md)**

**Site URL**: https://learning.nyuchi.com
**Repository**: https://github.com/nyuchitech/learning
