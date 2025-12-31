# K-12 Digital Campus Framework - Technical & Design Guidelines

**Last Updated**: December 2025
**Version**: 4.0 (Education Theme, Five African Minerals, Bundu Family)
**Maintained By**: nyuchi learning Development Team

---

# PART 1: AI ASSISTANT DEVELOPMENT GUIDELINES

This section provides comprehensive technical guidance for AI assistants working on this codebase.

## Table of Contents - Part 1 (Technical)

1. [Codebase Overview](#codebase-overview)
2. [Development Workflows](#development-workflows)
3. [Coding Conventions](#coding-conventions)
4. [Component Patterns](#component-patterns)
5. [Page Development](#page-development)
6. [Common Tasks](#common-tasks)
7. [Git Workflows](#git-workflows)
8. [Testing & Quality](#testing--quality)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## Codebase Overview

### Project Architecture

**Project Type**: Static site generator using Astro 4.15+
**Language**: TypeScript with strict type checking
**Styling**: Scoped CSS within Astro components (no CSS preprocessors)
**Icons**: Lucide Icons (via lucide-astro package)
**Deployment**: Vercel (automatic deployment on push)

### Technology Stack

```json
{
  "framework": "Astro 4.15+",
  "language": "TypeScript 5.6+",
  "icons": "lucide-astro 0.441+",
  "integrations": [
    "@astrojs/mdx",
    "@astrojs/rss",
    "@astrojs/sitemap"
  ],
  "fonts": ["Noto Serif", "Plus Jakarta Sans"],
  "brandSystem": "Bundu Family - Five African Minerals",
  "primaryMineral": "Cobalt (Education)",
  "analytics": "Google Analytics (G-BNHM29F8W5)",
  "deployment": "Vercel",
  "nodeVersion": "18+"
}
```

### Directory Structure Explained

```
/
├── .github/                    # GitHub configuration
│   └── ISSUE_TEMPLATE/         # Bug report & feature request templates
├── public/                     # Static assets (served as-is)
│   ├── *.svg                   # Logo files and favicon
│   ├── frameworks/             # Framework documentation (MD + future PDFs)
│   │   ├── k12-digital-campus-framework.md
│   │   └── k12-support-process-framework.md
│   └── robots.txt              # SEO crawler configuration
├── src/
│   ├── components/             # Reusable Astro components
│   │   ├── Logo.astro          # Nyuchi Learning logo component
│   │   └── SEO.astro           # SEO meta tags component
│   ├── layouts/                # Layout components
│   │   └── BaseLayout.astro    # Main layout (header, footer, flag strip)
│   ├── pages/                  # File-based routing (each .astro = route)
│   │   ├── index.astro         # Homepage (/)
│   │   ├── frameworks.astro    # Frameworks overview (/frameworks)
│   │   ├── framework.astro     # K-12 Digital Campus (/framework)
│   │   ├── support-framework.astro  # Support Process (/support-framework)
│   │   ├── digital-literacy-framework.astro  # Digital Literacy (/digital-literacy-framework)
│   │   ├── pricing.astro       # Pricing (/pricing)
│   │   ├── resources.astro     # Resources Hub (/resources) - Implementation guides
│   │   ├── about.astro         # Mission & Impact page (/about)
│   │   ├── global-reach.astro  # Global Reach (/global-reach) - Geographic scope
│   │   ├── team.astro          # Team page (/team)
│   │   ├── community.astro     # Community page (/community) - GitHub integration
│   │   ├── consultation.astro  # Consultation booking (/consultation)
│   │   └── blog/               # Blog section
│   │       ├── index.astro     # Blog index (/blog)
│   │       ├── launching-the-framework.astro
│   │       ├── why-open-source.astro
│   │       ├── digital-literacy-importance.astro
│   │       └── developing-world-educational-advantage.astro
│   └── env.d.ts                # TypeScript environment definitions
├── astro.config.mjs            # Astro configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vercel.json                 # Vercel deployment configuration
├── CLAUDE.md                   # This file - Comprehensive guidelines
├── BRANDING.md                 # Brand guidelines (Nyuchi Learning)
├── DEPLOYMENT.md               # Deployment instructions
├── README.md                   # Project documentation
└── SECURITY.md                 # Security policy
```

### Key Files Explained

| File | Purpose |
|------|---------|
| **src/layouts/BaseLayout.astro** | Main layout wrapper - includes header (with auto-hide, transparent/solid states, dropdown menus), footer (with global mission messaging), Minerals Strip (5 African minerals), mobile menu, SEO, Google Analytics, global styles, animation system |
| **src/components/SEO.astro** | SEO meta tags, Open Graph, Twitter Cards, structured data (JSON-LD) |
| **src/components/Logo.astro** | Nyuchi Learning logo with 3 variants (main, horizontal, compact) and 3 sizes (sm, md, lg) |
| **astro.config.mjs** | Astro configuration (site URL, integrations, output mode) |
| **package.json** | Dependencies and npm scripts (dev, build, preview) |
| **tsconfig.json** | TypeScript strict mode configuration |

---

## Development Workflows

### Local Development

**Starting development server:**
```bash
npm run dev
# or
npm start
```
- Opens at `http://localhost:4321`
- Hot module replacement (HMR) enabled
- Changes to `.astro`, `.ts`, CSS automatically reload

**Building for production:**
```bash
npm run build
```
- Runs `astro check` (TypeScript validation)
- Builds static site to `dist/` folder
- Optimizes assets, minifies code

**Previewing production build:**
```bash
npm run preview
```
- Serves the `dist/` folder locally
- Test production build before deployment

### Development Best Practices

1. **Always run `npm run build` before committing** to catch TypeScript errors
2. **Test mobile responsiveness** - Use browser DevTools mobile view (iPhone SE, Pixel 5)
3. **Check accessibility** - Verify WCAG AAA compliance (7:1+ color contrast, keyboard nav)
4. **Validate Minerals Strip** - Must appear on all pages (4px, desktop only, hidden on mobile <480px)
5. **No emojis** - Use Lucide icons only
6. **Use design tokens** - CSS variables defined in BaseLayout.astro
7. **Use lowercase wordmarks** - All brand names are lowercase (nyuchi, bundu, etc.)

---

## Coding Conventions

### Astro Component Structure

**Standard component template:**

```astro
---
// 1. Imports (components, icons, types)
import BaseLayout from '../layouts/BaseLayout.astro';
import { BookOpen, Users } from 'lucide-astro';

// 2. TypeScript interface for component props
interface Props {
  title?: string;
  description?: string;
}

// 3. Extract props with defaults
const {
  title = 'Default Title',
  description = 'Default description'
} = Astro.props;

// 4. Data fetching or logic (if needed)
const data = await fetchData();
---

<!-- 5. HTML Template -->
<BaseLayout title={title} description={description}>
  <section class="hero">
    <h1>{title}</h1>
    <BookOpen size={48} strokeWidth={1.5} />
  </section>
</BaseLayout>

<!-- 6. Scoped styles -->
<style>
  .hero {
    padding: 4rem 2rem;
    background: var(--bg);
  }

  h1 {
    font-family: 'Noto Serif', Georgia, serif;
    font-size: clamp(2.5rem, 6vw, 4rem);
    color: var(--text);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .hero {
      padding: 3rem 1.5rem;
    }
  }
</style>

<!-- 7. Client-side scripts (if needed) -->
<script>
  // Client-side JavaScript (runs in browser)
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');
  });
</script>
```

### TypeScript Conventions

**Strict typing:**
```typescript
// ✅ GOOD - Explicit types
interface Props {
  title: string;
  count?: number;  // Optional property
  items: string[];
}

// ❌ BAD - Using 'any'
const data: any = fetchData();

// ✅ GOOD - Proper typing
const data: FrameworkData = await fetchData();
```

**Type imports:**
```typescript
// Use interface for component props
interface Props {
  variant?: 'primary' | 'secondary';
}

// Use type for unions or complex types
type ButtonSize = 'sm' | 'md' | 'lg';
type Status = 'pending' | 'active' | 'completed';
```

### CSS/Styling Conventions

**Use CSS variables (design tokens):**
```css
/* ✅ GOOD - Use design tokens */
.button {
  background: var(--primary);
  color: white;
  border-radius: 10px;
  padding: var(--space-4);
}

/* ❌ BAD - Hard-coded values */
.button {
  background: #8B80E8;
  color: #FFFFFF;
  border-radius: 10px;
  padding: 16px;
}
```

**Responsive design patterns:**
```css
/* Mobile-first approach */
.container {
  padding: 1.5rem;  /* Mobile default */
  max-width: 100%;
}

/* Desktop enhancement */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 1200px;
  }
}

/* Use clamp() for fluid typography */
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}
```

**Color usage rules (Five African Minerals):**
```css
/* PRIMARY UI COLOR: Cobalt (Education) */
a, .btn-primary, .icon-primary {
  color: var(--primary);  /* #00B0FF Cobalt (dark mode) */
}

/* Backgrounds: Slate (Education Theme) */
body, .dark-section {
  background: var(--bg);  /* #0F172A Slate 900 */
}

/* Five African Minerals Accents */
.mineral-cobalt    { color: var(--mineral-cobalt); }    /* #00B0FF - CTAs, links, education */
.mineral-tanzanite { color: var(--mineral-tanzanite); } /* #B388FF - Social, premium */
.mineral-malachite { color: var(--mineral-malachite); } /* #64FFDA - Success, travel */
.mineral-gold      { color: var(--mineral-gold); }      /* #FFD740 - Rewards, warmth */
.mineral-terracotta { color: var(--mineral-terracotta); } /* #D4A574 - Community, Ubuntu */
```

### Icon Usage (Lucide)

**Import and use:**
```astro
---
import { BookOpen, Users, Settings, Menu, X } from 'lucide-astro';
---

<!-- Standard icon usage -->
<BookOpen class="icon" size={48} strokeWidth={1.5} />

<!-- Icon with color -->
<Users size={40} strokeWidth={2} style="color: var(--primary);" />

<!-- Touch-friendly mobile icon -->
<Menu size={28} strokeWidth={2} />  <!-- Hamburger menu -->
```

**Icon sizing guidelines:**
- **Desktop feature icons**: 48-56px
- **Mobile feature icons**: 40px
- **Navigation icons**: 24-28px
- **Button icons**: 20-24px
- **Stroke width**: 1.5-2 (consistent)

**Common icons mapping:**
| Icon | Use Case |
|------|----------|
| `BookOpen` | Education, learning, reading |
| `Globe` | Universal access, worldwide |
| `Smartphone` | Mobile-first |
| `Users` | Community, collaboration |
| `Settings` | Technology, configuration |
| `BarChart` | Analytics, data |
| `TrendingUp` | Growth, improvement |
| `Lightbulb` | Ideas, innovation |
| `DollarSign` | Cost, budget |
| `Menu` | Mobile hamburger menu |
| `X` | Close mobile menu |
| `GraduationCap` | Education |
| `Target` | Goals, mission |

---

## Component Patterns

### BaseLayout Component

**All pages MUST use BaseLayout:**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Page Title"
  description="Page description for SEO"
  keywords="keyword1, keyword2, keyword3"
  image="/og-image.png"
  type="website"
>
  <!-- Page content here -->
</BaseLayout>
```

**BaseLayout provides:**
- ✅ Minerals Strip (5 African minerals, automatic, desktop only)
- ✅ Header with navigation (desktop + mobile)
- ✅ Footer with links and Ubuntu tagline (lowercase branding)
- ✅ SEO meta tags via SEO component
- ✅ Google Analytics tracking
- ✅ Global CSS variables (Five African Minerals palette, Slate theme)
- ✅ Mobile menu toggle script
- ✅ Header scroll effects (transparent → solid)
- ✅ Animation system (Intersection Observer)

### SEO Component

**Used automatically by BaseLayout**, but can be used standalone:

```astro
---
import SEO from '../components/SEO.astro';
---

<SEO
  title="Page Title"
  description="Page description"
  keywords="keyword1, keyword2"
  image="/custom-og-image.png"
  url="https://learning.nyuchi.com/page"
  type="article"
  article={{
    publishedTime: '2025-11-01',
    modifiedTime: '2025-11-15',
    section: 'Blog',
    tags: ['education', 'technology']
  }}
/>
```

**SEO component includes:**
- Primary meta tags (title, description, keywords)
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Structured data (JSON-LD): Organization, Website, LearningResource
- Mobile app meta tags
- Geographic meta tags (Zimbabwe)
- Robot crawlers configuration

### Logo Component

**Usage:**

```astro
---
import Logo from '../components/Logo.astro';
---

<!-- Default: main variant, medium size -->
<Logo />

<!-- Horizontal variant, large size -->
<Logo variant="horizontal" size="lg" />

<!-- Compact variant, small size (for mobile) -->
<Logo variant="compact" size="sm" />

<!-- Custom class -->
<Logo variant="main" size="md" className="custom-logo" />
```

**Variants:**
- `main`: Stacked layout (icon + text)
- `horizontal`: Side-by-side layout
- `compact`: Icon with "N" initial only

**Sizes:**
- `sm`: Small (120x36 main, 180x30 horizontal, 48x24 compact)
- `md`: Medium (200x60 main, 300x50 horizontal, 80x40 compact)
- `lg`: Large (280x84 main, 420x70 horizontal, 112x56 compact)

---

## Page Development

### Creating a New Page

**Step 1: Create page file**
```bash
# Pages go in src/pages/
touch src/pages/my-new-page.astro
```

**Step 2: Page template**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { BookOpen, Users } from 'lucide-astro';

// Page-specific data
const pageTitle = 'My New Page';
const pageDescription = 'Description for SEO';
---

<BaseLayout
  title={pageTitle}
  description={pageDescription}
  keywords="relevant, keywords, here"
>
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <h1>{pageTitle}</h1>
      <p class="subtitle">{pageDescription}</p>
    </div>
  </section>

  <!-- Content Sections -->
  <section class="content">
    <div class="container">
      <h2>Section Title</h2>
      <p>Content here...</p>
    </div>
  </section>
</BaseLayout>

<style>
  .hero {
    padding: 6rem 2rem 4rem;
    background: var(--bg);
    margin-top: 64px; /* Account for fixed header */
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  h1 {
    font-family: 'Noto Serif', Georgia, serif;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    color: var(--text);
    margin-bottom: 1.5rem;
  }

  .subtitle {
    font-size: clamp(1.1rem, 2.5vw, 1.25rem);
    color: var(--text-secondary);
    max-width: 800px;
  }

  .content {
    padding: 4rem 2rem;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .hero {
      padding: 4rem 1.5rem 3rem;
    }

    .content {
      padding: 3rem 1.5rem;
    }
  }
</style>
```

**Step 3: Add to navigation**

Edit `src/layouts/BaseLayout.astro`:

```astro
<!-- Desktop Navigation -->
<ul class="nav-links nav-desktop">
  <li><a href="/">Home</a></li>
  <li><a href="/frameworks">Frameworks</a></li>
  <li><a href="/my-new-page">My New Page</a></li>  <!-- ADD HERE -->
  <!-- ... -->
</ul>

<!-- Mobile Navigation -->
<div class="nav-mobile" id="mobileMenu">
  <ul class="nav-mobile-links">
    <li><a href="/">Home</a></li>
    <li><a href="/frameworks">Frameworks</a></li>
    <li><a href="/my-new-page">My New Page</a></li>  <!-- ADD HERE -->
    <!-- ... -->
  </ul>
</div>
```

### Common Page Patterns

**Hero section with CTA:**
```astro
<section class="hero">
  <div class="container">
    <p class="ubuntu-tagline">Ubuntu: I am because we are</p>
    <h1>Page Title</h1>
    <p class="subtitle">Compelling subtitle</p>
    <div class="cta-group">
      <a href="/action" class="btn btn-primary">Primary Action</a>
      <a href="/learn" class="btn btn-secondary">Learn More</a>
    </div>
  </div>
</section>
```

**Feature grid (3 columns, responsive):**
```astro
<section class="features">
  <div class="container">
    <h2>Features</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <BookOpen size={48} strokeWidth={1.5} />
        <h3>Feature Title</h3>
        <p>Feature description</p>
      </div>
      <!-- Repeat for more features -->
    </div>
  </div>
</section>

<style>
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .feature-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Stats section:**
```astro
<section class="stats">
  <div class="container">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">60-80%</div>
        <div class="stat-label">Cost Savings</div>
      </div>
      <!-- More stats -->
    </div>
  </div>
</section>
```

---

## Common Tasks

### Task 1: Update Color Scheme

**All colors defined in:** `src/layouts/BaseLayout.astro` (`:root` CSS variables)

```css
:root {
  /* Five African Minerals - Dark Mode (Education Theme) */
  --mineral-cobalt: #00B0FF;      /* Primary - CTAs, links, education */
  --mineral-tanzanite: #B388FF;   /* Social, premium tiers */
  --mineral-malachite: #64FFDA;   /* Success, travel, nature */
  --mineral-gold: #FFD740;        /* Rewards, honey, warmth */
  --mineral-terracotta: #D4A574;  /* Community, Ubuntu */

  /* Education Theme (Slate surfaces) */
  --primary: #00B0FF;             /* Cobalt - main interactive color */
  --bg: #0F172A;                  /* Slate 900 - base background */
  --bg-surface: #1E293B;          /* Slate 800 - card backgrounds */
  --text: #F8FAFC;                /* Slate 50 - primary text */

  /* Design Tokens */
  --radius-button: 12px;
  --radius-card: 16px;
}
```

### Task 2: Add New Framework Page

1. Create markdown file: `public/frameworks/new-framework.md`
2. Create page: `src/pages/new-framework.astro`
3. Add to frameworks index: `src/pages/frameworks.astro`
4. Add download link in navigation

### Task 3: Update Footer

**Edit:** `src/layouts/BaseLayout.astro` (footer section)

The footer has a **hero section** with global mission messaging, followed by a **link grid** and **bottom section**.

```astro
<footer>
  <!-- Footer Hero - Brown Background -->
  <div class="footer-hero">
    <h2 class="footer-main-text">Leapfrog Traditional Education.<br />Build for 2050.</h2>
    <p class="footer-ubuntu-large">Ubuntu: I am because we are</p>
    <p class="footer-geographic">Serving schools across Africa • Asia • Latin America • Pacific</p>
  </div>

  <!-- Footer Grid - 4 Columns -->
  <div class="footer-grid">
    <div class="footer-column">
      <h3>Frameworks</h3>
      <ul>
        <li><a href="/frameworks">All Frameworks</a></li>
        <li><a href="/framework">K-12 Digital Campus</a></li>
        <li><a href="/digital-literacy-framework">Digital Literacy Framework</a></li>
        <li><a href="/support-framework">K-12 Support Process</a></li>
      </ul>
    </div>
    <!-- Resources, Community, About columns... -->
  </div>

  <!-- Footer Bottom -->
  <div class="footer-bottom">
    <div class="footer-branding">
      <p class="footer-brand-name">nyuchi learning</p>  <!-- lowercase wordmark -->
      <p class="footer-brand-org">K-12 Digital Campus Framework</p>
      <p class="footer-division">A division of nyuchi africa</p>  <!-- lowercase wordmark -->
    </div>
    <div class="footer-principles">
      <p>Digital Access • Digital Literacy • Mobile-First</p>
      <p>AI-Driven • Community-Centered • Education First</p>
    </div>
    <p class="footer-copyright">&copy; 2025 Nyuchi Learning. Open framework, freely shareable.</p>
  </div>
</footer>
```

**Footer Columns (4 total):**
1. **Frameworks** - Links to all framework pages
2. **Resources** - Resources Hub, Pricing, Blog, Consultation
3. **Community** - Community page, GitHub links
4. **About** - Mission & Impact, Global Reach, Our Team

### Task 4: Add Blog Post

1. Create file: `src/pages/blog/my-post-slug.astro`
2. Update blog index: `src/pages/blog/index.astro` (add to posts array)
3. Update homepage: `src/pages/index.astro` (latest posts section)

**Blog post template:**
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = 'My Blog Post Title';
const publishedDate = '2025-11-16';
const author = 'Framework Team';
---

<BaseLayout
  title={title}
  description="Blog post description"
  type="article"
  article={{
    publishedTime: publishedDate,
    section: 'Blog',
    tags: ['education', 'technology']
  }}
>
  <article class="blog-post">
    <header>
      <h1>{title}</h1>
      <div class="meta">
        <time>{publishedDate}</time>
        <span>{author}</span>
      </div>
    </header>
    <div class="content">
      <!-- Blog content -->
    </div>
  </article>
</BaseLayout>
```

### Task 5: Optimize for Mobile

**Checklist:**
- [ ] Test on mobile viewport (375px width minimum)
- [ ] Verify touch targets (44x44px minimum)
- [ ] Check button heights (48px minimum)
- [ ] Test horizontal scrolling (tables, long navigation)
- [ ] Verify hamburger menu works
- [ ] Verify Minerals Strip is hidden on mobile (<480px)
- [ ] Test typography readability (16px minimum body)
- [ ] Verify images scale properly

---

## Git Workflows

### Branch Naming Convention

```bash
# Feature branches
git checkout -b feature/add-new-framework-page
git checkout -b feature/update-pricing-tiers

# Bug fixes
git checkout -b fix/mobile-menu-toggle
git checkout -b fix/broken-link-about-page

# Content updates
git checkout -b content/update-blog-post
git checkout -b content/add-framework-documentation

# Design updates
git checkout -b design/update-color-scheme
git checkout -b design/improve-mobile-nav
```

### Commit Message Format

**Use conventional commits:**

```bash
# Feature
git commit -m "feat: add digital literacy framework page"
git commit -m "feat(blog): add new blog post about open source"

# Fix
git commit -m "fix: resolve mobile menu toggle issue"
git commit -m "fix(seo): correct Open Graph image path"

# Content
git commit -m "content: update pricing tier descriptions"
git commit -m "content(blog): fix typos in blog post"

# Style/Design
git commit -m "style: update button border-radius to 10px"
git commit -m "style(hero): improve mobile spacing"

# Refactor
git commit -m "refactor: extract SEO component from BaseLayout"

# Docs
git commit -m "docs: update CLAUDE.md with new conventions"

# Chore
git commit -m "chore: update dependencies"
```

### Typical Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes
# ... edit files ...

# 3. Test locally
npm run build  # Must pass!

# 4. Stage and commit
git add .
git commit -m "feat: add my feature"

# 5. Push to remote
git push -u origin feature/my-feature

# 6. Create Pull Request on GitHub
# Include description, screenshots (if visual changes)

# 7. After PR approval and merge
git checkout main
git pull origin main
git branch -d feature/my-feature  # Delete local branch
```

### Pre-Commit Checklist

- [ ] `npm run build` passes without errors
- [ ] TypeScript errors resolved
- [ ] No console errors in browser
- [ ] Mobile responsive (test in DevTools)
- [ ] Minerals Strip present on desktop, hidden on mobile (<480px)
- [ ] Accessibility: WCAG AAA (7:1+) color contrast, keyboard nav
- [ ] No emojis used (Lucide icons only)
- [ ] Design tokens used (CSS variables, not hard-coded colors)
- [ ] Lowercase wordmarks for brand names (nyuchi, bundu, etc.)

---

## Testing & Quality

### Manual Testing Checklist

**Visual Testing:**
- [ ] Test in Chrome, Firefox, Safari
- [ ] Mobile view (iPhone SE 375px, Pixel 5 393px, iPhone 12 Pro 390px)
- [ ] Tablet view (iPad 768px, iPad Pro 1024px)
- [ ] Desktop (1280px, 1440px, 1920px)

**Accessibility Testing:**
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader compatibility (test with VoiceOver or NVDA)
- [ ] Color contrast (4.5:1 for normal text, 3:1 for large text)
- [ ] Touch targets (44x44px minimum, 48px for buttons)
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] ARIA labels where needed

**Performance Testing:**
- [ ] Lighthouse score (aim for 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO)
- [ ] Page load time < 3 seconds
- [ ] Images optimized (WebP when possible)
- [ ] No render-blocking resources

**SEO Testing:**
- [ ] Meta tags present (title, description, keywords)
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Cards
- [ ] Structured data (JSON-LD)
- [ ] Sitemap includes new pages
- [ ] robots.txt allows crawling

### Accessibility Validation

**Color contrast checker:**
```
WCAG 2.1 AAA Requirements (7:1+):
- All Five African Minerals achieve WCAG AAA
- All text colors on Slate surfaces achieve 7:1+ contrast

Test combinations (Education Theme):
- var(--mineral-cobalt) #00B0FF on Slate 900 #0F172A: ✅ Passes (7:1+)
- var(--text) #F8FAFC on Slate 900 #0F172A: ✅ Passes (16:1+)
- var(--mineral-malachite) #64FFDA on Slate 900: ✅ Passes (7:1+)
- var(--mineral-gold) #FFD740 on Slate 900: ✅ Passes (7:1+)
```

**Keyboard navigation test:**
1. Tab through page (all interactive elements focusable)
2. Enter/Space activates buttons and links
3. Escape closes modals/menus
4. Arrow keys navigate dropdown menus
5. Focus indicators visible on all elements

### Build Validation

**Before every commit:**
```bash
# TypeScript check + build
npm run build

# Expected output:
# - No TypeScript errors
# - Build completes successfully
# - dist/ folder generated
```

**If build fails:**
1. Read error message carefully
2. Fix TypeScript errors (type mismatches, missing imports)
3. Check for syntax errors in `.astro` files
4. Verify imports are correct
5. Run `npm run build` again

---

## Deployment

### Vercel Deployment (Automatic)

**Production deployment:**
- **Trigger**: Push to `main` branch
- **URL**: https://learning.nyuchi.com
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Node version**: 18.x

**Preview deployments:**
- **Trigger**: Push to any branch or PR
- **URL**: Auto-generated preview URL (e.g., `learning-git-feature-xyz.vercel.app`)
- **Purpose**: Test changes before merging

### Manual Deployment

**For other platforms (Netlify, Cloudflare Pages, etc.):**

```bash
# Build for production
npm run build

# Upload dist/ folder to hosting provider
# - Netlify: Drag & drop dist/ folder
# - Cloudflare Pages: Connect GitHub repo
# - GitHub Pages: Deploy dist/ to gh-pages branch
```

### Environment Variables

**No environment variables currently used.**

If adding in future, use Vercel dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add key-value pairs
4. Redeploy

---

## Troubleshooting

### Common Issues & Solutions

**Issue: Build fails with TypeScript errors**
```bash
# Solution: Check error message, fix type issues
npm run build

# Common fixes:
# - Add missing interface properties
# - Import missing types
# - Use correct prop types in components
```

**Issue: Mobile menu doesn't toggle**
```bash
# Solution: Ensure IDs match in BaseLayout.astro
# - #mobileMenuBtn (button)
# - #mobileMenu (menu container)
# - #menuIcon (hamburger icon)
# - #closeIcon (X icon)
```

**Issue: Minerals Strip not showing**
```bash
# Solution: Verify in BaseLayout.astro
# 1. .minerals-strip element exists with 5 mineral divs
# 2. z-index: 9999
# 3. position: fixed
# 4. body { margin-left: 4px; } (desktop)
# 5. @media (max-width: 480px) { display: none; margin-left: 0; }
# 6. Colors: Cobalt, Tanzanite, Malachite, Gold, Terracotta (top to bottom)
```

**Issue: Icons not rendering**
```bash
# Solution:
# 1. Verify import: import { IconName } from 'lucide-astro';
# 2. Check icon exists in Lucide library
# 3. Use PascalCase for icon names
# 4. Example: <BookOpen size={48} strokeWidth={1.5} />
```

**Issue: CSS variables not working**
```bash
# Solution:
# 1. Ensure variables defined in BaseLayout.astro :root {}
# 2. Use correct syntax: var(--variable-name)
# 3. Check for typos in variable names
# 4. Verify BaseLayout wraps your page
```

**Issue: Page not found (404)**
```bash
# Solution:
# 1. Verify file exists in src/pages/
# 2. Check file extension (.astro)
# 3. Ensure file name matches route (kebab-case)
# 4. Restart dev server: npm run dev
```

**Issue: Fonts not loading**
```bash
# Solution: Check BaseLayout.astro <head>
# - Google Fonts link present
# - Noto+Serif:wght@400;700
# - Plus+Jakarta+Sans:wght@300;400;500;600;700;800
# - Font family in CSS: 'Noto Serif' for H1, 'Plus Jakarta Sans' for H2-H6/body
```

### Debug Checklist

When something breaks:
1. [ ] Check browser console for errors
2. [ ] Verify `npm run build` passes
3. [ ] Check file paths (case-sensitive)
4. [ ] Verify imports are correct
5. [ ] Check TypeScript types
6. [ ] Test in different browsers
7. [ ] Clear browser cache
8. [ ] Restart dev server
9. [ ] Check Vercel deployment logs

### Getting Help

If stuck:
1. Read error message carefully
2. Check this document (CLAUDE.md)
3. Review BRANDING.md and README.md
4. Check Astro documentation: https://docs.astro.build
5. Search GitHub issues: https://github.com/nyuchitech/learning/issues

---

# PART 2: DESIGN GUIDELINES

## Brand Identity

### nyuchi learning - Part of the Bundu Ecosystem

**nyuchi learning** (lowercase) is part of the Nyuchi brand family within the **Bundu Ecosystem** — technology that serves African communities with Ubuntu philosophy at its core.

**Shona:** nyuchi /njuːtʃi/ = "bee"

Nyuchi embodies the industrious spirit of the African bee — tireless workers who build together, pollinate ideas across communities, and create sweet results through collective effort.

**Brand System:**
- **Parent Ecosystem**: Bundu Family
- **Primary Mineral**: Cobalt (for education)
- **Mission**: To empower African communities through technology that feels like home

**Company Background:**
- **Nyuchi Africa**: Zimbabwe-registered company (2019)
- **Mission**: Education-first, built by educators for education
- **Values**: Commitment to local economy reinvestment, Africa-tested solutions
- **DNA**: Remote-first, built on dusty African roads, not just theory
- **Philosophy**: Ubuntu - "Ndiri nekuti tiri" (I am because we are)

### K-12 Digital Campus Framework

The **K-12 Digital Campus Framework** is the first framework released by Nyuchi Learning. It provides a comprehensive blueprint for digital transformation in K-12 schools across Africa. While Nyuchi Learning provides credibility and context, the framework itself is the hero—not the company.

**Additional Frameworks:**
- **K-12 Support Process Framework**: Three-tier support system (AI chatbot, EdTech team, IT Operations)
- More frameworks coming soon

### Open & Shareable Framework

**CRITICAL MISSION**: This framework is designed to be:
- **Open** - Free to use and access
- **Shareable** - Copy and distribute to other schools
- **Adaptable** - Modify to fit your school's unique needs
- **Community-driven** - Improve it and share your innovations back

The goal is to promote digital learning so that students and communities across Africa can adapt, copy, and improve this framework to fit into their schools.

---

## What's New in v4.0 (Education Theme, Five African Minerals)

This version implements the **Bundu Family brand system** with the **Five African Minerals** palette and **Education Theme** using Cobalt as the primary mineral.

### Key Changes from v3.x

**Brand System:**
- ❌ Old: Standalone brand → ✅ New: Part of Bundu Ecosystem
- ✅ New: Five African Minerals unified palette
- ✅ New: Cobalt as primary mineral for education
- ✅ New: Lowercase wordmarks (nyuchi, bundu, mukoko, shamwari)

**Color System Migration:**
- ❌ Old: Warm purple (#8B80E8) → ✅ New: Cobalt (#00B0FF dark mode)
- ❌ Old: Charcoal (#2B2B2B) → ✅ New: Slate (#0F172A / #1E293B)
- ❌ Old: Warm emerald/brown accents → ✅ New: Five African Minerals palette
- ✅ New: WCAG AAA (7:1+) contrast on all minerals

**Typography Migration:**
- ❌ Old: Newsreader → ✅ New: Noto Serif (for H1 only)
- ❌ Old: Inter → ✅ New: Plus Jakarta Sans (for H2-H6, body, UI)

**Visual Elements:**
- ❌ Old: Zimbabwe flag strip (4 colors, 8px/6px) → ✅ New: Minerals Strip (5 colors, 4px, hidden on mobile <480px)
- ❌ Old: 10px button radius → ✅ New: 12px button radius
- ❌ Old: 12px card radius → ✅ New: 16px card radius

### Why Five African Minerals?

The Bundu Ecosystem uses a unified palette of 5 African Minerals:
- **Cobalt** (DRC, Zambia) - Education, CTAs, links
- **Tanzanite** (Tanzania) - Social, premium tiers
- **Malachite** (Congo) - Success, travel, nature
- **Gold** (Ghana, South Africa) - Rewards, warmth
- **Terracotta** (Pan-African) - Community, Ubuntu

This connects our digital presence to Africa's rich mineral heritage while maintaining professional, accessible design.

---

## Visual Brand Elements

### Minerals Strip - Signature Brand Element

**The signature visual element of the Bundu Ecosystem.**

**Specification:**
- 4px vertical strip on the left edge of viewport
- Fixed position (z-index: 9999)
- Five equal sections with African Minerals colors (20% each)
- **Hidden on mobile** (< 480px) for better screen real estate

**Color Order (Top to Bottom):**
| Position | Mineral | Dark Mode Color |
|----------|---------|-----------------|
| 1 | Cobalt | `#00B0FF` |
| 2 | Tanzanite | `#B388FF` |
| 3 | Malachite | `#64FFDA` |
| 4 | Gold | `#FFD740` |
| 5 | Terracotta | `#D4A574` |

```css
.minerals-strip {
  position: fixed;
  left: 0;
  top: 0;
  width: 4px;
  height: 100vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.minerals-strip > div { flex: 1; } /* 20% each */

/* Dark mode colors (Education Theme) */
.mineral-cobalt    { background: #00B0FF; }
.mineral-tanzanite { background: #B388FF; }
.mineral-malachite { background: #64FFDA; }
.mineral-gold      { background: #FFD740; }
.mineral-terracotta { background: #D4A574; }

/* Hide on mobile */
@media (max-width: 480px) {
  .minerals-strip { display: none; }
  body { margin-left: 0; }
}
```

### Logo System

**nyuchi learning Logo** (always lowercase)

The nyuchi learning logo features a stylized open book symbol representing education and learning, with Africa-inspired accent elements.

**CRITICAL: Wordmark Rules**
- All brand wordmarks are **lowercase**: nyuchi, bundu, mukoko, shamwari
- ✅ `nyuchi learning` (correct)
- ❌ `Nyuchi Learning` (incorrect)

**Logo Variants:**
1. **Main (Vertical)**: Stacked layout with icon and "nyuchi learning" text
2. **Horizontal**: Side-by-side layout for headers and wide spaces
3. **Compact**: Icon with "n" initial for small spaces (favicons, mobile)

**Logo Files:**
- `/public/nyuchi-learning-logo-main.svg`
- `/public/nyuchi-learning-logo-horizontal.svg`
- `/public/nyuchi-learning-logo-compact.svg`
- `/public/favicon.svg` - Monochrome open book icon

**Logo Typography:**
- Wordmark: Plus Jakarta Sans, 600 weight, lowercase
- Use `text-transform: lowercase` in CSS for consistency

**Usage:**
```astro
---
import Logo from '../components/Logo.astro';
---

<!-- Main logo (default: medium size) -->
<Logo />

<!-- Horizontal logo, large size -->
<Logo variant="horizontal" size="lg" />

<!-- Compact logo, small size -->
<Logo variant="compact" size="sm" />
```

---

## Color System - Five African Minerals

### Design Philosophy

The Bundu Ecosystem uses **ONE unified palette of 5 African Minerals** shared across all brands. All colors achieve **WCAG AAA (7:1+)** contrast ratios. The site supports both **light and dark modes** via `prefers-color-scheme`, automatically adapting to the user's system preference.

### Theme Switching

The site uses `prefers-color-scheme` media query to automatically switch between light and dark themes:
- **Dark Mode** (default): Slate surfaces (#0F172A, #1E293B) with bright mineral colors
- **Light Mode**: White/light gray surfaces with deep mineral colors

No manual toggle is provided - the site respects the user's OS/browser preference.

### Five African Minerals Palette

| Mineral | Light Mode | Dark Mode | Origin | Use Case |
|---------|------------|-----------|--------|----------|
| **Cobalt** | `#0047AB` | `#00B0FF` | Katanga (DRC), Zambian Copperbelt | CTAs, links, **education** |
| **Tanzanite** | `#4B0082` | `#B388FF` | Merelani Hills, Tanzania | Social, premium tiers |
| **Malachite** | `#004D40` | `#64FFDA` | Congo Copper Belt | Success, travel, nature |
| **Gold** | `#5D4037` | `#FFD740` | Ghana, South Africa, Mali | Rewards, honey, warmth |
| **Terracotta** | `#8B4513` | `#D4A574` | Pan-African Earth | Community, Ubuntu |

### Education Theme (nyuchi learning)

**Primary Color: Cobalt**
| Mode | Value | Usage |
|------|-------|-------|
| Dark | `#00B0FF` | CTAs, links, buttons, interactive elements |
| Light | `#0047AB` | CTAs, links, buttons, interactive elements |

**Surface Colors (Dark Mode):**
| Surface | Value | Name |
|---------|-------|------|
| Base | `#0F172A` | Slate 900 |
| Surface | `#1E293B` | Slate 800 |
| Elevated | `#334155` | Slate 700 |

**Surface Colors (Light Mode):**
| Surface | Value | Name |
|---------|-------|------|
| Base | `#FFFFFF` | White |
| Surface | `#F8FAFC` | Slate 50 |
| Elevated | `#F1F5F9` | Slate 100 |

**Text Colors (Dark Mode):**
| Type | Value |
|------|-------|
| Primary | `#F8FAFC` (Slate 50) |
| Secondary | `#CBD5E1` (Slate 300) |
| Muted | `#94A3B8` (Slate 400) |

**Text Colors (Light Mode):**
| Type | Value |
|------|-------|
| Primary | `#0F172A` (Slate 900) |
| Secondary | `#475569` (Slate 600) |
| Muted | `#64748B` (Slate 500) |

### Semantic Colors

| Type | Dark Mode | Usage |
|------|-----------|-------|
| Success | `#64FFDA` (Malachite) | Confirmations, completed states |
| Error | `#F2B8B5` | Errors, destructive actions |
| Warning | `#FFD866` | Alerts, caution states |
| Info | `#00B0FF` (Cobalt) | Information, tips |

### CSS Variables (Education Theme)

```css
:root {
  /* Five African Minerals - Dark Mode */
  --mineral-cobalt: #00B0FF;
  --mineral-tanzanite: #B388FF;
  --mineral-malachite: #64FFDA;
  --mineral-gold: #FFD740;
  --mineral-terracotta: #D4A574;

  /* Primary Color - Cobalt (Education) */
  --primary: #00B0FF;

  /* Slate Dark Theme Surfaces */
  --bg: #0F172A;            /* Slate 900 - Base */
  --bg-surface: #1E293B;    /* Slate 800 - Cards */
  --bg-elevated: #334155;   /* Slate 700 - Elevated */

  /* Text Colors */
  --text: #F8FAFC;          /* Slate 50 - Primary */
  --text-secondary: #CBD5E1; /* Slate 300 */
  --text-muted: #94A3B8;    /* Slate 400 */

  /* Design Tokens */
  --radius-button: 12px;
  --radius-card: 16px;
  --radius-input: 8px;
  --minerals-strip-width: 4px;

  /* Semantic */
  --success: #64FFDA;       /* Malachite */
  --error: #F2B8B5;
  --warning: #FFD866;
  --info: #00B0FF;          /* Cobalt */
}
```

**Color Usage Guidelines (Education Theme):**
- **Cobalt (#00B0FF)**: Primary interactive color (buttons, links, CTAs)
- **Malachite (#64FFDA)**: Success states, confirmations
- **Gold (#FFD740)**: Rewards, highlights, warmth
- **Tanzanite (#B388FF)**: Premium features, social
- **Terracotta (#D4A574)**: Community, Ubuntu philosophy
- **Slate 900 (#0F172A)**: Primary page background
- **Slate 800 (#1E293B)**: Card backgrounds, surfaces

---

## Typography - Bundu Family Fonts

### Font Families

| Purpose | Font | Weights | Usage |
|---------|------|---------|-------|
| **Display/H1** | Noto Serif | 400, 700 | Hero titles, major headlines |
| **Headings H2-H6** | Plus Jakarta Sans | 600, 700, 800 | Section titles, card titles |
| **Body** | Plus Jakarta Sans | 300, 400, 500, 600 | Paragraphs, UI text |
| **Code** | JetBrains Mono | 400, 500 | Code blocks, technical content |
| **Wordmarks** | Plus Jakarta Sans | 600 | Brand names (always lowercase) |

### Font Loading

```html
<!-- From assets.nyuchi.com CDN (preferred) -->
<link rel="stylesheet" href="https://assets.nyuchi.com/fonts/all-fonts.css">

<!-- Or Google Fonts fallback -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Typography Scale

**Desktop:**

```css
/* H1 - Hero Title (Noto Serif) */
h1 {
  font-family: 'Noto Serif', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
}

/* H2 - Section Title (Plus Jakarta Sans) */
h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--text);
}

/* H3 - Subsection (Plus Jakarta Sans) */
h3 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text);
}

/* H4-H6, Body (Plus Jakarta Sans) */
h4, h5, h6, body, p {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--text);
}

/* Body (Default) */
body, p {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
}

/* Wordmarks - Always lowercase */
.brand-wordmark {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  text-transform: lowercase;
}
```

**Mobile:**

```css
@media (max-width: 768px) {
  h1 { font-size: clamp(2rem, 8vw, 2.5rem); }
  h2 { font-size: clamp(1.5rem, 6vw, 2rem); }
  h3 { font-size: 1.25rem; }
  body, p { font-size: 16px; } /* Keep readable */
}
```

**Responsive Typography:**
- Use `clamp()` for fluid sizing
- Example: `clamp(2.5rem, 6vw, 4rem)` for smooth scaling
- Maintain minimum 16px for body text (readability on mobile)

---

## Buttons - Education Theme

### Button Design Tokens

| Token | Value |
|-------|-------|
| **Button Radius** | 12px (NOT 8px or 10px) |
| **Card Radius** | 16px |
| **Input Radius** | 8px |

### Button Styles

**Primary Button (Cobalt):**
```css
.btn-primary {
  /* Colors - Cobalt */
  background: var(--primary);  /* #00B0FF Cobalt */
  color: white;

  /* Typography */
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;

  /* Spacing */
  padding: 10px 20px;
  min-height: 40px;

  /* Shape - 12px radius (critical!) */
  border-radius: 12px;
  border: none;

  /* Interaction */
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 176, 255, 0.3);
}

.btn-primary:active {
  filter: brightness(0.95);
  transform: translateY(0);
}

.btn-primary:focus-visible {
  outline: 3px solid var(--mineral-cobalt);
  outline-offset: 2px;
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: transparent;
  color: var(--primary);  /* #00B0FF Cobalt */
  padding: 10px 20px;
  border-radius: 12px;
  border: 1.5px solid var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;
  min-height: 40px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background: rgba(0, 176, 255, 0.1);
}

.btn-secondary:focus-visible {
  outline: 3px solid var(--mineral-cobalt);
  outline-offset: 2px;
}
```

### Button Sizes

```css
/* Small */
.btn-sm {
  height: 32px;
  padding: 6px 12px;
  font-size: 12px;
}

/* Default */
.btn-default {
  height: 40px;
  padding: 10px 20px;
  font-size: 14px;
}

/* Large */
.btn-lg {
  height: 48px;
  padding: 14px 28px;
  font-size: 16px;
}

/* Icon Button */
.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: 20px;
}
```

### Mobile Button Sizing

```css
@media (max-width: 768px) {
  .btn {
    width: 100%; /* Full width on mobile */
  }
}
```

---

## Icons - CRITICAL Rule

### NO EMOJIS - Use Lucide Icons ONLY

**ABSOLUTE RULE: NEVER use emojis anywhere in the codebase.**

**Required:**
- Use **Lucide icons** from `lucide-astro` package
- Icon size: 24-48px desktop, 40px mobile, 32-56px for feature icons
- Stroke width: 1.5-2 for consistency
- Color: `var(--primary)` (#00B0FF Cobalt) for primary icons, `var(--text-secondary)` for neutral icons

**Example Usage:**
```astro
---
import { BookOpen, Globe, Users, Menu, X } from 'lucide-astro';
---

<BookOpen class="icon" size={48} strokeWidth={1.5} />
<Menu class="mobile-menu-icon" size={28} strokeWidth={2} />
```

**Common Icons:**
- BookOpen - Education, learning
- Globe - Universal access, worldwide
- Smartphone - Mobile-first
- Users - Community, collaboration
- Settings - Technology, configuration
- BarChart - Analytics, data
- TrendingUp - Growth, improvement
- Lightbulb - Ideas, innovation
- DollarSign - Cost, budget
- Monitor - Technology
- GraduationCap - Education
- Target - Goals, mission
- Accessibility - Equity, inclusion
- Menu - Mobile hamburger menu
- X - Close mobile menu
- Download - Framework downloads
- Bot - AI chatbot
- Wrench - IT Operations

---

## Spacing System - Generous & Comfortable

### Base Unit: 4px

The Claude-aligned spacing system uses a 4px base unit (instead of 8px) for more granular control and better visual hierarchy.

```css
:root {
  --space-1: 4px;    /* Tight */
  --space-2: 8px;    /* Small */
  --space-3: 12px;   /* Medium */
  --space-4: 16px;   /* Default */
  --space-5: 20px;   /* Comfortable */
  --space-6: 24px;   /* Large */
  --space-8: 32px;   /* XL */
  --space-10: 40px;  /* 2XL */
  --space-12: 48px;  /* 3XL */
  --space-16: 64px;  /* 4XL */
  --space-20: 80px;  /* 5XL */
  --space-24: 96px;  /* Hero */
}
```

### Component Spacing

```css
/* Cards */
.card {
  padding: 24px;              /* Desktop */
  gap: 16px;                  /* Internal elements */
  margin-bottom: 24px;        /* Between cards */
}

@media (max-width: 768px) {
  .card {
    padding: 20px;            /* Mobile */
  }
}

/* Sections */
.section {
  padding: 80px 32px;         /* Desktop */
  margin-bottom: 80px;        /* Between sections */
}

@media (max-width: 768px) {
  .section {
    padding: 48px 20px;       /* Mobile */
  }
}

/* Containers */
.container {
  max-width: 1200px;
  padding: 0 32px;            /* Desktop */
  margin: 0 auto;
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;          /* Mobile */
  }
}
```

---

## Shadow System - Soft & Layered

### Claude-Style Shadows

The shadow system uses **layered shadows** (two values) to create more natural depth than single shadows. All shadows are soft and subtle.

```css
:root {
  /* Extra Small - Subtle elevation */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);

  /* Small - Default cards */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04),
               0 1px 2px rgba(0, 0, 0, 0.06);

  /* Medium - Hover states */
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06),
               0 2px 4px rgba(0, 0, 0, 0.08);

  /* Large - Dropdowns, modals */
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.08),
               0 4px 8px rgba(0, 0, 0, 0.06);

  /* Extra Large - Popovers */
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.1),
               0 8px 12px rgba(0, 0, 0, 0.08);
}
```

### Usage

```css
/* Default card */
.card {
  box-shadow: var(--shadow-sm);
}

/* Card hover */
.card:hover {
  box-shadow: var(--shadow-md);
}

/* Dropdown menu */
.dropdown {
  box-shadow: var(--shadow-lg);
}
```

---

## Card System - Education Theme

### Standard Card

```css
.card {
  /* Layout */
  background: var(--bg-surface);  /* Slate 800 */
  border-radius: 16px;  /* 16px for cards (NOT 12px) */
  padding: 24px;

  /* Border - subtle on dark */
  border: 1px solid rgba(255, 255, 255, 0.1);

  /* Shadow - soft and natural */
  box-shadow: var(--shadow-sm);

  /* Interaction */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--mineral-cobalt);  /* Cobalt accent on hover */
}
```

### Feature Card (with Icon)

```css
.card-feature {
  background: var(--bg-surface);  /* Slate 800 */
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.card-feature:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--mineral-cobalt);  /* Cobalt */
}

.card-icon {
  width: 56px;
  height: 56px;
  background: var(--mineral-cobalt);  /* Cobalt */
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 28px;
  color: white;
}
```

### Accent Card (Cobalt Border)

```css
.card-accent {
  background: var(--bg-surface);  /* Slate 800 */
  border-radius: 16px;
  padding: 24px;
  border-left: 4px solid var(--mineral-cobalt);  /* Cobalt accent */
  box-shadow: var(--shadow-sm);
}
```

---

## Animation System - Intersection Observer

The site uses an Intersection Observer-based animation system that triggers animations when elements scroll into view. This provides smooth, performant scroll animations that respect user preferences.

### Animation Classes

Add these classes to elements you want to animate on scroll:

```css
/* Fade In - Simple opacity transition */
.animate-fade-in { opacity: 0; }
.animate-fade-in.animated { opacity: 1; }

/* Slide Up - Fades in while sliding up 50px */
.animate-slide-up { transform: translateY(50px); opacity: 0; }
.animate-slide-up.animated { transform: translateY(0); opacity: 1; }

/* Slide From Left - Fades in while sliding from left */
.animate-slide-left { transform: translateX(-50px); opacity: 0; }
.animate-slide-left.animated { transform: translateX(0); opacity: 1; }

/* Slide From Right - Fades in while sliding from right */
.animate-slide-right { transform: translateX(50px); opacity: 0; }
.animate-slide-right.animated { transform: translateX(0); opacity: 1; }

/* Scale In - Fades in while scaling up from 90% */
.animate-scale-in { transform: scale(0.9); opacity: 0; }
.animate-scale-in.animated { transform: scale(1); opacity: 1; }
```

### Staggered Animations for Grids

Use `.animate-stagger` on a parent container to automatically stagger child animations:

```astro
<div class="features-grid animate-stagger">
  <div class="feature-card animate-slide-up">Card 1</div>  <!-- 0.1s delay -->
  <div class="feature-card animate-slide-up">Card 2</div>  <!-- 0.2s delay -->
  <div class="feature-card animate-slide-up">Card 3</div>  <!-- 0.3s delay -->
</div>
```

### Usage Example

```astro
<section class="hero">
  <h1 class="animate-fade-in">Welcome</h1>
  <p class="animate-slide-up">Description text</p>
</section>

<section class="features">
  <div class="cards-grid animate-stagger">
    <div class="card animate-slide-up">Feature 1</div>
    <div class="card animate-slide-up">Feature 2</div>
    <div class="card animate-slide-up">Feature 3</div>
  </div>
</section>
```

### Accessibility

The animation system automatically respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up,
  .animate-slide-left,
  .animate-slide-right,
  .animate-scale-in {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

## Navigation

### Desktop Navigation

Standard horizontal navigation with rounded hover states (10px border-radius, matching button style). Includes dropdown menu for "About" section.

**Navigation Structure:**
```
Home | Frameworks | Resources | Pricing | Blog | About (dropdown) | Book a Consultation (CTA)
                                                    ├── Mission & Impact
                                                    ├── Global Reach
                                                    ├── Our Team
                                                    └── Community
```

**Dropdown Menu Pattern:**
```astro
<li class="nav-dropdown">
  <a href="/about" class="dropdown-trigger">About</a>
  <ul class="dropdown-menu">
    <li><a href="/about">Mission & Impact</a></li>
    <li><a href="/global-reach">Global Reach</a></li>
    <li><a href="/team">Our Team</a></li>
    <li><a href="/community">Community</a></li>
  </ul>
</li>
```

**Header States:**
- **Transparent**: On page load when at top of page (hero sections)
- **Solid**: When scrolled past 50px (charcoal background with blur)
- **Hidden**: When scrolling down (auto-hides after 100px)
- **Visible**: When scrolling up (shows again)

### Mobile Navigation - CRITICAL

**Hamburger Menu (Required for mobile <768px):**

```astro
<!-- Mobile Menu Button -->
<button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu">
  <Menu id="menuIcon" size={28} strokeWidth={2} />
  <X id="closeIcon" size={28} strokeWidth={2} style="display: none;" />
</button>

<!-- Mobile Navigation -->
<div class="nav-mobile" id="mobileMenu">
  <ul class="nav-mobile-links">
    <li><a href="/">Home</a></li>
    <li><a href="/frameworks">Frameworks</a></li>
    <li><a href="/resources">Resources</a></li>
    <li><a href="/pricing">Pricing</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/about">Mission & Impact</a></li>
    <li><a href="/global-reach">Global Reach</a></li>
    <li><a href="/team">Our Team</a></li>
    <li><a href="/community">Community</a></li>
    <li><a href="/consultation" class="mobile-cta">Book a Consultation</a></li>
  </ul>
</div>
```

**Mobile Menu Styles:**
```css
.mobile-menu-btn {
  display: none; /* Show only on mobile */
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  padding: 0.5rem;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}

.nav-mobile {
  display: none;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
}

.nav-mobile.active {
  display: block;
  max-height: 400px;
  border-top: 1px solid var(--border);
  background: var(--bg);
}

.nav-mobile-links a {
  display: block;
  padding: 1rem 1.5rem;
  min-height: 48px; /* Touch target */
  font-size: 1.1rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none !important;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
```

---

## Ubuntu Philosophy

### Core Message

**Ubuntu: "I am because we are"**

This philosophy should be woven throughout the content:
- Community-centered language
- Collective success over individual achievement
- "We" and "our" instead of "I" and "my"
- Emphasis on collaboration and mutual support

### Usage

- Include subtly in headers/footers
- Use in mission statements
- Emphasize in founder story
- Apply in content tone and voice
- Display prominently in hero sections and CTAs

---

## Page Layout Principles

### Framework-First Approach

**CRITICAL: This is an open, shareable educational resource, not a marketing site.**

- **Primary focus**: The framework and its practical value for schools
- **Secondary focus**: Nyuchi Learning branding for credibility
- **Content hierarchy**: Implementation guides > Features > Brand story
- **Open framework messaging**: Emphasize that it's free to copy, adapt, and improve

### Content Placement

**Homepage:**
- Hero: Editorial framework value proposition + open/shareable messaging
- Features: Practical benefits for schools (6 core principles)
- Stats: Impact and data (warm background with subtle emerald accents)
- Benefits: What schools get (6 benefit cards with soft shadows)
- Implementation: 3-year roadmap
- CTA: Warm, inviting finale with Ubuntu messaging
- Credit: "Created by Nyuchi Learning, a division of Nyuchi Africa • Built by educators, for education"

**Frameworks Overview Page:**
- Hero: Introduction to all frameworks
- Framework cards: K-12 Digital Campus, Support Process
- Coming soon section

**Framework Detail Pages:**
- Header with download button
- Quick navigation (horizontal scroll on mobile)
- Comprehensive documentation sections
- Download CTA

**Pricing Page:**
- 4 pricing tiers (Free, Basic, Standard, Premium)
- Detailed cost breakdowns
- Savings strategies

**About Page:**
- Framework mission
- Founder journey and company story
- Nyuchi commitment to Zimbabwe and Africa

**Blog:**
- Blog index with post cards
- Individual blog posts

---

## Responsive Design - COMPREHENSIVE MOBILE OPTIMIZATION

### Mobile-First Philosophy

Given Africa's mobile-first reality:
- Design for mobile first, scale up
- **Touch-friendly targets: 44x44px minimum (WCAG 2.1 AA)**
- **Buttons: 48px height minimum**
- Readable font sizes (16px/1rem minimum for body)
- Simplified, hamburger navigation for small screens
- Horizontal scrolling for wide content (tables, long nav)

### Breakpoints

```css
/* Desktop/Tablet */
@media (max-width: 768px) {
  /* Mobile/tablet styles */
  /* Single-column grids */
  /* Full-width buttons */
  /* Horizontal scrolling tables */
}

/* Small phones */
@media (max-width: 480px) {
  /* Extra small screen styles */
  /* Further reduced padding */
  /* Smaller typography */
}
```

### Mobile Optimizations Applied

**Header:**
- Hamburger menu with Menu/X icon toggle
- Full-screen mobile navigation
- Auto-close menu on link click
- Logo size reduction (24px icon, hide subtext)
- Minerals Strip hidden on mobile (<480px)

**Typography:**
- H1 titles: 40px mobile (from 56px desktop)
- H2 titles: 32px mobile (from 40px desktop)
- H3 titles: 24px mobile (from 28px desktop)
- Body text: Minimum 16px for readability
- Use clamp() for fluid responsive scaling

**Layouts:**
- All grids: single column below 768px
- Full-width buttons in column layout
- Cards: reduced padding (1.5-1.75rem mobile)
- Icons: 40px mobile (from 48-56px desktop)

**Navigation:**
- Framework page nav: horizontal scroll (prevents wrapping)
- Tables: horizontal scroll with min-width 600px
- Touch-friendly scroll with -webkit-overflow-scrolling

**Spacing:**
- Section padding: 4rem mobile, 3rem extra-small (from 6-7rem desktop)
- Card gaps: 1.5-2rem mobile (from 2.5-3rem desktop)
- Border widths: 5px mobile (from 6-8px desktop)

**Performance:**
- background-attachment: scroll on mobile (better performance)
- Optimized image heights (200-250px mobile)

---

## File Structure

```
/
├── public/
│   ├── nyuchi-learning-logo-main.svg
│   ├── nyuchi-learning-logo-horizontal.svg
│   ├── nyuchi-learning-logo-compact.svg
│   ├── favicon.svg
│   ├── frameworks/
│   │   ├── README.md
│   │   ├── k12-digital-campus-framework.md
│   │   └── k12-support-process-framework.md
│   └── OG-IMAGE-README.md
├── src/
│   ├── components/
│   │   ├── Logo.astro
│   │   └── SEO.astro
│   ├── layouts/
│   │   └── BaseLayout.astro       # Header (auto-hide, dropdown menus), footer (global messaging), Minerals Strip, animation system
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── frameworks.astro       # Frameworks overview
│   │   ├── framework.astro        # K-12 Digital Campus Framework
│   │   ├── digital-literacy-framework.astro  # Digital Literacy Framework
│   │   ├── support-framework.astro # K-12 Support Process Framework
│   │   ├── pricing.astro          # Pricing tiers & breakdowns
│   │   ├── resources.astro        # Resources Hub - implementation guides
│   │   ├── about.astro            # Mission & Impact page
│   │   ├── global-reach.astro     # Global geographic scope
│   │   ├── team.astro             # Team page (founder profile)
│   │   ├── community.astro        # Community page (GitHub integration)
│   │   ├── consultation.astro     # Book a Consultation
│   │   └── blog/
│   │       ├── index.astro
│   │       ├── digital-literacy-importance.astro
│   │       ├── launching-the-framework.astro
│   │       ├── why-open-source.astro
│   │       └── developing-world-educational-advantage.astro
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── CLAUDE.md                       # This file - Comprehensive guidelines
├── BRANDING.md                     # Nyuchi branding guidelines
├── README.md                       # Project documentation
├── DEPLOYMENT.md                   # Deployment instructions
└── robots.txt                      # SEO & AI crawler access
```

---

## Do's and Don'ts

### DO:
✅ Use Minerals Strip on desktop (4px, 5 colors, left edge)
✅ Hide Minerals Strip on mobile (<480px)
✅ Use 12px button radius, 16px card radius
✅ Use Lucide icons for all visual icons
✅ **Use Slate dark theme** - Slate 900 (#0F172A) background with Slate 50 (#F8FAFC) text
✅ Use Cobalt (#00B0FF) for interactive elements (buttons, links, CTAs)
✅ Use Five African Minerals for semantic colors (Malachite=success, Gold=rewards, etc.)
✅ Use Noto Serif for H1 (display serif)
✅ Use Plus Jakarta Sans for H2-H6, body, UI
✅ **Use lowercase wordmarks** (nyuchi, bundu, mukoko, shamwari)
✅ Ensure WCAG AAA (7:1+) contrast on all colors
✅ Use clamp() for responsive typography
✅ Use hamburger menu on mobile (<768px)
✅ Use horizontal scrolling for wide content on mobile
✅ Use full-width buttons on mobile
✅ Ensure 44x44px minimum touch targets (48px for buttons)
✅ Use single-column layouts on mobile
✅ Focus on framework value for schools
✅ Emphasize open, shareable, adaptable framework nature
✅ Emphasize Ubuntu philosophy ("Ndiri nekuti tiri")
✅ Design mobile-first
✅ Use animation classes (animate-fade-in, animate-slide-up) for scroll animations
✅ Use auto-hide header with transparent/solid states
✅ Use dropdown menus for navigation sections
✅ Include global mission messaging ("Leapfrog Traditional Education. Build for 2050.")
✅ Create editorial, sophisticated feel (not aggressive/bold)

### DON'T:
❌ Use pill-shaped buttons (9999px border-radius)
❌ Use 10px button radius (use 12px)
❌ Use 12px card radius (use 16px)
❌ Use emojis anywhere
❌ Use Charcoal (#2B2B2B) for backgrounds (use Slate #0F172A)
❌ Use warm purple (#8B80E8) (use Cobalt #00B0FF)
❌ Use Zimbabwe flag strip (use Minerals Strip)
❌ Use capitalized brand names ("Nyuchi" - use "nyuchi")
❌ Use old fonts (Newsreader, Inter, Playfair Display, Roboto)
❌ Use old colors outside the Five African Minerals palette
❌ Use single, sharp shadows
❌ Make nyuchi branding the hero (framework is the hero)
❌ Hide that the framework is open and shareable
❌ Use "Ubuntu" as a brand name (philosophy only)
❌ Ignore mobile experience
❌ Use fonts other than Noto Serif and Plus Jakarta Sans
❌ Use small touch targets (<44px)
❌ Allow content to wrap/overflow on mobile (use horizontal scroll)
❌ Use aggressive, overly bold design
❌ Forget animation accessibility (prefers-reduced-motion)
❌ Show Minerals Strip on mobile (<480px)

---

## Technical Stack

- **Framework**: Astro 4.15+
- **Icons**: lucide-astro
- **Typography**: Google Fonts (Noto Serif, Plus Jakarta Sans)
- **Brand System**: Bundu Family - Five African Minerals
- **Primary Mineral**: Cobalt (Education Theme)
- **Dark Theme**: Slate surfaces (#0F172A, #1E293B)
- **Deployment**: Vercel
- **Analytics**: Google Analytics (G-BNHM29F8W5)
- **Sitemap**: @astrojs/sitemap (automatic generation)
- **SEO**: Comprehensive meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **AI Crawlers**: Allowed (GPTBot, Claude-Web, CCBot, PerplexityBot)
- **Accessibility**: WCAG AAA (7:1+ contrast)

---

## Accessibility

### WCAG 2.1 AAA Compliance

- **Color contrast**: 7:1+ for all text (AAA standard)
- **Five African Minerals**: All colors achieve WCAG AAA in both modes
- **Touch targets**: 44x44px minimum, 48px for primary buttons
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **ARIA labels**: Where appropriate (e.g., mobile menu button)
- **Keyboard navigation**: Full keyboard support
- **Screen reader**: Compatible with screen readers
- **Focus indicators**: Visible focus states (Cobalt outline)
- **Responsive text**: Readable at all sizes (minimum 16px/1rem)
- **Reduced motion**: Animation system respects prefers-reduced-motion

### Multilingual Support

The framework is designed to support multiple languages to serve diverse African communities:

**Supported Languages:**
- African languages (based on country/region)
- English
- French
- Chinese

**Implementation Approach:**
- Content adaptable to local languages
- Culturally responsive design
- Community-driven translation efforts
- Language selection based on school/region needs

---

## Content Tone & Voice

### Tone
- **Professional but accessible**: Educational authority without being intimidating
- **Editorial and sophisticated**: Like reading a well-crafted article, not a sales pitch
- **Warm and approachable**: Friendly, inviting, human
- **Educational, not promotional**: Focus on value and implementation
- **Practical and actionable**: Concrete steps, not vague promises
- **Community-centered**: Ubuntu philosophy throughout
- **Encouraging and empowering**: Positive, optimistic, realistic

### Voice
- **First-person plural** ("we", "our") - Ubuntu philosophy
- **Direct and clear**: No jargon unless necessary
- **Evidence-based**: Data, examples, case studies
- **Solutions-oriented**: Focus on what works
- **Realistic about challenges, optimistic about outcomes**
- **Calm and confident**: Matches the editorial, warm visual design (not aggressive)

### Writing Guidelines
- Use active voice
- Keep sentences concise
- Break up long paragraphs
- Use bullet points and lists
- Include specific examples
- Cite sources when making claims
- Emphasize community and collaboration

---

## SEO & Discoverability

### Meta Tags (SEO.astro component)

```astro
<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="description" content={description} />
<meta name="keywords" content={keywords} />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />

<!-- AI Crawlers -->
<meta name="robots" content="index, follow, max-image-preview:large" />
```

### Structured Data

```javascript
// Organization
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Nyuchi Learning",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Nyuchi Africa"
  }
}

// Learning Resource
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "K-12 Digital Campus Framework",
  "educationalLevel": "K-12",
  "isAccessibleForFree": true
}
```

### robots.txt

```
User-agent: *
Allow: /

# AI Crawlers (AIO - AI Optimization)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://learning.nyuchi.com/sitemap.xml
```

---

## Updates and Maintenance

This document should be updated whenever:
- Brand guidelines change
- New design patterns are established
- Technical requirements evolve
- User feedback indicates needed clarifications
- New frameworks are added
- Mobile optimization improvements are made

### Version History

**Version 4.0** (December 2025) - Current (Education Theme, Five African Minerals, Bundu Family)
- **Brand System**: Part of Bundu Ecosystem with Five African Minerals palette
- **Primary Mineral**: Cobalt (#00B0FF dark mode) for education
- **Theme**: Slate dark surfaces (#0F172A base, #1E293B surface)
- **Typography**: Noto Serif for H1, Plus Jakarta Sans for H2-H6/body/UI
- **Wordmarks**: Always lowercase (nyuchi, bundu, mukoko, shamwari)
- **Minerals Strip**: 4px, 5 colors (Cobalt, Tanzanite, Malachite, Gold, Terracotta)
  - Hidden on mobile (<480px)
  - Replaces Zimbabwe flag strip
- **Design Tokens**: 12px button radius, 16px card radius
- **Accessibility**: WCAG AAA (7:1+ contrast) on all minerals
- **Animation System**: Retained from v3.1

**Version 3.1** (December 2025) - Dark Theme, Animation System, Global Mission
- **Theme**: Dark mode with charcoal (#2B2B2B) backgrounds
- **Text**: Off-white (#FAFAFA) primary text on dark backgrounds
- **Animation System**: Intersection Observer-based scroll animations
  - animate-fade-in, animate-slide-up, animate-slide-left, animate-slide-right, animate-scale-in
  - Staggered grid animations with animate-stagger
  - Respects prefers-reduced-motion
- **Header**: Auto-hide on scroll down, show on scroll up
  - Transparent/solid state transitions
  - Dropdown menus for navigation sections
- **Navigation**: Updated structure with Resources, Global Reach, Team, Community, Consultation
- **Footer**: Global mission messaging ("Leapfrog Traditional Education. Build for 2050.")
  - Brown (#A67557) hero background
  - Geographic scope messaging (Africa, Asia, Latin America, Pacific)
  - 4-column link grid
- **New Pages**: /resources, /global-reach, /team, /community, /consultation

**Version 3.0** (November 2025) - Claude-Aligned
- **Typography**: Newsreader for H1/H2, Inter for H3-H6/body/UI
- **Colors**: Warm earth tones (emerald, purple, brown, charcoal)
- **Buttons**: Rounded (10px) instead of pill-shaped
- **Shadows**: Layered, soft shadows (Claude-style)
- **Spacing**: 4px base unit (more granular)
- **Design philosophy**: Editorial, warm, accessible (like Claude)
- **Cards**: 12px border-radius, soft shadows
- **Overall feel**: Sophisticated, approachable, professional

**Version 2.0** (October 2025)
- Bold design with dramatic typography
- Comprehensive mobile optimization
- Hamburger menu navigation
- Multiple frameworks support
- Enhanced accessibility (WCAG 2.1 AA)
- Horizontal scrolling for wide content
- Uppercase styling for major headings
- Pill-shaped buttons (9999px)
- Section title underlines
- Playfair Display + Roboto fonts
- Monochrome color scheme

**Version 1.0** (October 2025)
- Initial design guidelines
- Monochrome color scheme
- Zimbabwe flag strip
- Basic responsive design

---

**For specific branding guidelines, see [BRANDING.md](BRANDING.md)**
