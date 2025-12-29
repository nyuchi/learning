# K-12 Digital Campus Framework - Technical & Design Guidelines

**Last Updated**: December 2025
**Version**: 3.1 (Dark Theme, Animation System, Global Mission)
**Maintained By**: Nyuchi Learning Development Team

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
  "fonts": ["Newsreader", "Inter"],
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
| **src/layouts/BaseLayout.astro** | Main layout wrapper - includes header (with auto-hide, transparent/solid states, dropdown menus), footer (with global mission messaging), Zimbabwe flag strip, mobile menu, SEO, Google Analytics, global styles, animation system |
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
3. **Check accessibility** - Verify WCAG 2.1 AA compliance (color contrast, keyboard nav)
4. **Validate Zimbabwe flag strip** - Must appear on all pages (8px desktop, 6px mobile)
5. **No emojis** - Use Lucide icons only
6. **Use design tokens** - CSS variables defined in BaseLayout.astro

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
    font-family: 'Newsreader', serif;
    font-size: clamp(2.5rem, 5vw, 3.5rem);
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

**Color usage rules:**
```css
/* PRIMARY UI COLOR: Warm Purple (#8B80E8) */
h1, h2, h3, a, .icon {
  color: var(--primary);  /* #8B80E8 warm purple */
}

/* Backgrounds: Charcoal only */
body, .dark-section {
  background: var(--bg);  /* #2B2B2B charcoal */
}

/* Secondary actions: Warm Emerald */
.btn-secondary {
  background: var(--emerald);  /* #18A877 */
}

/* Accents: Warm Brown */
.featured-badge {
  background: var(--brown);  /* #A67557 */
}
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
- ✅ Zimbabwe flag strip (automatic)
- ✅ Header with navigation (desktop + mobile)
- ✅ Footer with links and Ubuntu tagline
- ✅ SEO meta tags via SEO component
- ✅ Google Analytics tracking
- ✅ Global CSS variables and styles
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
    font-family: 'Newsreader', serif;
    font-size: clamp(2.5rem, 5vw, 3.5rem);
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
  /* Update these values */
  --primary: #8B80E8;          /* Warm purple */
  --emerald: #18A877;          /* Warm emerald */
  --brown: #A67557;            /* Warm brown */
  --charcoal: #2B2B2B;         /* Charcoal */
  /* ... */
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
      <p class="footer-brand-name">Nyuchi Learning</p>
      <p class="footer-brand-org">K-12 Digital Campus Framework</p>
      <p class="footer-division">A division of Nyuchi Africa</p>
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
- [ ] Check Zimbabwe flag strip (6px on mobile)
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
- [ ] Zimbabwe flag strip present on new pages
- [ ] Accessibility: color contrast, keyboard nav
- [ ] No emojis used (Lucide icons only)
- [ ] Design tokens used (CSS variables, not hard-coded colors)

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
WCAG 2.1 AA Requirements:
- Normal text (< 18px): 4.5:1 contrast ratio
- Large text (≥ 18px or ≥ 14px bold): 3:1 contrast ratio
- UI components & graphics: 3:1 contrast ratio

Test combinations:
- var(--primary) #8B80E8 on white: ✅ Passes (4.6:1)
- var(--text) #FAFAFA on var(--bg) #2B2B2B: ✅ Passes (14.8:1)
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

**Issue: Zimbabwe flag strip not showing**
```bash
# Solution: Verify in BaseLayout.astro
# 1. .zimbabwe-flag-strip element exists
# 2. z-index: 9999
# 3. position: fixed
# 4. body { margin-left: 8px; } (desktop)
# 5. @media (max-width: 768px) { margin-left: 6px; }
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
# - Newsreader:wght@400;600;700
# - Inter:wght@400;500;600;700
# - Font family in CSS matches exactly
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

### Nyuchi Learning - Parent Brand

**Nyuchi Learning** is a division of Nyuchi Africa focused on educational frameworks and digital transformation for schools. Nyuchi Learning will release multiple frameworks for education across Africa.

**Company Background:**
- **Nyuchi Africa**: Zimbabwe-registered company (2019)
- **Mission**: Education-first, built by educators for education
- **Values**: Commitment to local economy reinvestment, Africa-tested solutions
- **DNA**: Remote-first, built on dusty African roads, not just theory

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

## What's New in v3.0 (Claude-Aligned)

This version aligns our design with Claude's warm, editorial design language while maintaining our unique African identity.

### Key Changes from v2.0

**Typography Migration:**
- ❌ Old: Playfair Display → ✅ New: Newsreader (for H1, H2)
- ❌ Old: Roboto → ✅ New: Inter (for H3-H6, body, UI)

**Color System Migration:**
- ❌ Old: Monochrome only (charcoal #2C2C2C) → ✅ New: Warm earth tones
- ❌ Old: Green only in flag (#00A651) → ✅ New: Warm emerald throughout (#18A877)
- ✅ New: Warm purple (#8B80E8) for platform features
- ✅ New: Warm brown (#A67557) for accents

**Button Style Migration:**
- ❌ Old: Pill-shaped (border-radius: 9999px) → ✅ New: Rounded (border-radius: 10px)
- ❌ Old: Uppercase text-transform → ✅ New: Normal case (Inter font)
- ❌ Old: Aggressive hover effects → ✅ New: Subtle lift and shadow

**Visual System Updates:**
- ✅ New: Layered shadows (Claude-style soft shadows)
- ✅ New: 4px base spacing unit (from 8px)
- ✅ New: 12px card border-radius
- ❌ Old: Bold, dramatic feel → ✅ New: Editorial, warm, sophisticated feel
- ❌ Old: Hero background images → ✅ New: Minimalist hero sections with solid colors
- ✅ New: Optimized spacing for 13" laptop screens (not just large monitors)

### Why Claude-Aligned?

Claude's design language is:
- **Editorial & Sophisticated**: Uses serif titles for trust and authority
- **Warm & Approachable**: Earth tones create a friendly, inviting feel
- **Modern & Accessible**: Clean sans-serif for readability
- **Professional**: Soft shadows, generous spacing, thoughtful hierarchy

This aligns perfectly with our educational mission and Ubuntu philosophy.

---

## Visual Brand Elements

### Zimbabwe Flag Strip - CRITICAL Brand Element

**REQUIRED on all pages:**
- 8px vertical strip on the left edge of viewport (desktop)
- 6px vertical strip on mobile (<768px)
- Fixed position (z-index: 9999)
- Four equal sections with Zimbabwe flag colors:
  - Warm Emerald: `#18A877` (adapted from traditional green)
  - Yellow: `#FDD116`
  - Red: `#EF3340`
  - Warm Charcoal: `#2B2B2B` (adapted from black)

**This element is NON-NEGOTIABLE and must appear on every page.**

```css
.zimbabwe-flag-strip {
  position: fixed;
  left: 0;
  top: 0;
  width: 8px; /* 6px on mobile */
  height: 100vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.flag-green  { flex: 1; background: #18A877; } /* Warm emerald */
.flag-yellow { flex: 1; background: #FDD116; }
.flag-red    { flex: 1; background: #EF3340; }
.flag-black  { flex: 1; background: #2B2B2B; } /* Warm charcoal */
```

### Logo System

**Nyuchi Learning Logo**

The Nyuchi Learning logo features a stylized open book symbol representing education and learning, with Africa-inspired accent elements.

**Logo Variants:**
1. **Main (Vertical)**: Stacked layout with icon and "Nyuchi Learning" text
2. **Horizontal**: Side-by-side layout for headers and wide spaces
3. **Compact**: Icon with "N" initial for small spaces (favicons, mobile)

**Logo Files:**
- `/public/nyuchi-learning-logo-main.svg`
- `/public/nyuchi-learning-logo-horizontal.svg`
- `/public/nyuchi-learning-logo-compact.svg`
- `/public/favicon.svg` - Monochrome open book icon

**Logo Colors:**
- Icon: `#2B2B2B` (Warm Charcoal)
- "Nyuchi" text: `#2B2B2B` (Newsreader, Bold)
- "Learning" text: `#6B7280` (Inter, Medium)

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

## Color System - Dark Theme with Warm Accents

### Design Philosophy

The color system uses a **dark charcoal background** with **off-white text** for readability and visual hierarchy. **Warm accent colors** (purple, emerald, brown) provide emphasis and interactivity. This creates a sophisticated, professional, and modern feel while maintaining accessibility.

### Current Theme: Dark Mode (Charcoal Background)

**CRITICAL**: The site now uses a **dark theme** with charcoal backgrounds. This is a significant change from v3.0.

### Primary Palette

**Charcoal (Primary Background)**
- Primary: `#2B2B2B` - **Main page background, header, footer**
- Light: `#3D3D3D` - Card backgrounds on dark sections
- Lighter: `#4F4F4F` - Borders, hover states on dark backgrounds

**Off-White (Primary Text)**
- Primary: `#FAFAFA` - **Main text color on dark backgrounds**
- Secondary: `#D1D5DB` - Secondary text, descriptions
- Muted: `#9CA3AF` - Tertiary text, captions

**Warm Purple (Accent & Interactive)**
- Primary: `#8B80E8` - **Buttons, CTAs, links, accent highlights**
- Hover: `#A199EE` - Hover states
- Active: `#7569D9` - Active/pressed states
- Light: `#EBE8FC` - Light accent backgrounds
- Subtle: `#F6F5FE` - Very subtle accent backgrounds

**Warm Emerald (Secondary Actions & Logo)**
- Primary: `#18A877` - Logo icon, secondary buttons, success states
- Hover: `#20C088` - Hover states
- Active: `#139F68` - Active states
- Light: `#D8F3EA` - Light emerald backgrounds

**Warm Brown (Feature Sections)**
- Primary: `#A67557` - **Footer hero background**, featured sections
- Hover: `#BA8668` - Hover states
- Dark: `#8B5E42` - Darker brown accents
- Light: `#F5EDE8` - Light brown backgrounds

### Semantic Colors

- **Success**: `#18A877` (Same as warm emerald)
- **Warning**: `#E8A040` (Warm amber)
- **Error**: `#E8574E` (Warm red)
- **Info**: `#5B9FE3` (Warm blue)

### CSS Variables (Current Implementation)

```css
:root {
  /* Zimbabwe Flag Colors - for flag strip only */
  --nyuchi-green: #18A877;    /* Warm emerald */
  --nyuchi-yellow: #FDD116;
  --nyuchi-red: #EF3340;
  --nyuchi-black: #2B2B2B;    /* Warm charcoal */

  /* WARM PURPLE - Accent Color for Interactive Elements */
  --primary: #8B80E8;          /* Buttons, CTAs, links, highlights */
  --primary-hover: #A199EE;    /* Hover states */
  --primary-active: #7569D9;   /* Active/pressed states */
  --primary-light: #EBE8FC;    /* Light accent backgrounds */
  --primary-subtle: #F6F5FE;   /* Very light accent backgrounds */

  /* Warm Emerald - Secondary Actions & Logo */
  --emerald: #18A877;          /* Logo icon, secondary buttons */
  --emerald-hover: #20C088;
  --emerald-active: #139F68;
  --emerald-light: #D8F3EA;

  /* Warm Brown - Feature Sections */
  --brown: #A67557;            /* Footer hero, featured sections */
  --brown-hover: #BA8668;
  --brown-dark: #8B5E42;
  --brown-light: #F5EDE8;

  /* Charcoal - Primary Background */
  --charcoal: #2B2B2B;          /* Main page background */
  --charcoal-light: #3D3D3D;    /* Card backgrounds */
  --charcoal-lighter: #4F4F4F;  /* Borders, hover states */

  /* Text Colors - For Dark Backgrounds */
  --text: #FAFAFA;              /* Primary text - OFF-WHITE */
  --text-secondary: #D1D5DB;    /* Secondary text - Light gray */
  --text-muted: #9CA3AF;        /* Muted text - Medium gray */

  /* Background Colors */
  --bg: #2B2B2B;                /* Primary background - CHARCOAL */
  --bg-brown: #A67557;          /* Brown section backgrounds */
  --bg-card: #3D3D3D;           /* Card backgrounds on dark */
  --border: #4F4F4F;            /* Borders on dark backgrounds */

  /* Gray Scale */
  --gray-50: #FAFAFA;
  --gray-100: #F7F7F7;
  --gray-200: #E0E0E0;
  --gray-300: #D1D5DB;
  --gray-400: #9B9B9B;
  --gray-500: #6B6B6B;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #2B2B2B;
  --gray-900: #1A1A1A;

  /* Semantic */
  --success: #18A877;
  --warning: #E8A040;
  --error: #E8574E;
  --info: #5B9FE3;
}
```

**Color Usage Guidelines (Dark Theme):**
- **Off-White (#FAFAFA)**: Primary text color on dark backgrounds
- **Warm Purple (#8B80E8)**: Interactive elements (buttons, links, CTAs)
- **Warm Emerald (#18A877)**: Logo icon, secondary actions, success states
- **Warm Brown (#A67557)**: Feature section backgrounds (footer hero)
- **Charcoal (#2B2B2B)**: Primary page background, header, footer

---

## Typography - Editorial & Warm (Claude-Aligned)

### Font Families

**Newsreader (Editorial Serif for Titles)**
- Usage: H1, H2, hero sections, major headlines
- Weights: 400, 600, 700
- Google Fonts: `Newsreader:wght@400;600;700`
- Feel: Editorial, sophisticated, trusted (like Claude's marketing)
- Backup: Georgia, 'Times New Roman', serif

**Inter (Sans-Serif for Body & UI)**
- Usage: H3-H6, body text, UI elements, buttons, navigation
- Weights: 400, 500, 600, 700
- Google Fonts: `Inter:wght@400;500;600;700`
- Feel: Clean, modern, accessible (like Claude's interface)
- Backup: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Typography Scale - Editorial Design

**Desktop:**

```css
/* H1 - Hero Title */
h1 {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);  /* Warm purple #8B80E8 */
}

/* H2 - Section Title */
h2 {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--text);  /* Warm purple #8B80E8 */
}

/* H3 - Subsection */
h3 {
  font-family: 'Inter', sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--text);  /* Warm purple #8B80E8 */
}

/* H4 - Component Title */
h4 {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: normal;
  color: var(--text);  /* Warm purple #8B80E8 */
}

/* Body Large */
.body-large {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text);  /* Warm purple #8B80E8 */
}

/* Body (Default) */
body, p {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text);  /* Warm purple #8B80E8 */
}

/* Body Small */
.body-small {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);  /* Charcoal #6B6B6B */
}
```

**Mobile:**

```css
@media (max-width: 768px) {
  h1 { font-size: 40px; }
  h2 { font-size: 32px; }
  h3 { font-size: 24px; }
  h4 { font-size: 18px; }
  body, p { font-size: 16px; } /* Keep readable */
}
```

**Responsive Typography:**
- Use `clamp()` for fluid sizing when appropriate
- Example: `clamp(2.5rem, 5vw, 3.5rem)` for smooth scaling
- Maintain minimum 16px for body text (readability on mobile)

---

## Buttons - Claude-Style Rounded Buttons

### Button Style Philosophy

**Rounded buttons (10px border-radius)** - Not pills, not sharp. The Claude-aligned approach uses moderately rounded corners that are modern and friendly without being overly playful.

### Button Styles

**Primary Button:**
```css
.btn-primary {
  /* Colors */
  background: var(--primary);  /* #8B80E8 warm purple */
  color: white;

  /* Typography */
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;

  /* Spacing */
  padding: 12px 24px;
  min-height: 48px;

  /* Shape - Claude style */
  border-radius: 10px;   /* Slightly rounded, not too much */
  border: none;

  /* Interaction */
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  background: var(--primary-hover);  /* #A199EE */
  transform: translateY(-1px);  /* Subtle lift */
  box-shadow: 0 4px 12px rgba(139, 128, 232, 0.3);
}

.btn-primary:active {
  background: var(--primary-active);  /* #7569D9 */
  transform: translateY(0);
}

.btn-primary:focus-visible {
  outline: 3px solid var(--primary-light);  /* #EBE8FC */
  outline-offset: 2px;
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: transparent;
  color: var(--primary);  /* #8B80E8 warm purple */
  padding: 12px 24px;
  border-radius: 10px;
  border: 1.5px solid var(--primary);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  min-height: 48px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background: var(--primary-subtle);  /* #F6F5FE */
  border-color: var(--primary-hover);
  color: var(--primary-active);
}

.btn-secondary:focus-visible {
  outline: 3px solid var(--primary-light);
  outline-offset: 2px;
}
```

**Tertiary Button (Text Only):**
```css
.btn-tertiary {
  background: transparent;
  color: var(--primary);  /* #8B80E8 warm purple */
  padding: 8px 12px;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-tertiary:hover {
  color: var(--primary-hover);  /* #A199EE */
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}
```

### Button Sizes

```css
/* Large */
.btn-lg {
  padding: 16px 32px;
  font-size: 18px;
  min-height: 52px;
  border-radius: 12px;
}

/* Medium (default) */
.btn-md {
  padding: 12px 24px;
  font-size: 16px;
  min-height: 48px;
  border-radius: 10px;
}

/* Small */
.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
  min-height: 36px;
  border-radius: 8px;
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
- Color: `var(--primary)` (#8B80E8 warm purple) for primary icons, `var(--text-secondary)` for neutral icons

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

## Card System - Soft & Inviting

### Standard Card

```css
.card {
  /* Layout */
  background: white;
  border-radius: 12px;
  padding: 24px;

  /* Border - very subtle */
  border: 1px solid #F0F0F0;

  /* Shadow - soft and natural */
  box-shadow: var(--shadow-sm);

  /* Interaction */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: #E0E0E0;
}
```

### Feature Card (with Icon)

```css
.card-feature {
  background: white;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  border: 1px solid #F0F0F0;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.card-feature:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);  /* Warm purple */
}

.card-icon {
  width: 56px;
  height: 56px;
  background: var(--primary);  /* Warm purple */
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 28px;
  color: white;
}
```

### Accent Card (Purple Border)

```css
.card-accent {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid var(--primary);  /* Warm purple accent */
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
- 6px flag strip (from 8px desktop)

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
│   │   └── BaseLayout.astro       # Header (auto-hide, dropdown menus), footer (global messaging), Zimbabwe flag strip, animation system
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
✅ Use Zimbabwe flag strip on every page (8px desktop, 6px mobile)
✅ Use rounded buttons (border-radius: 10px for medium, 12px for large)
✅ Use Lucide icons for all visual icons
✅ **Use dark theme** - Charcoal (#2B2B2B) background with off-white (#FAFAFA) text
✅ Use warm purple (#8B80E8) for interactive elements (buttons, links, CTAs)
✅ Use warm emerald (#18A877) for logo icon and secondary actions
✅ Use warm brown (#A67557) for feature section backgrounds (footer hero)
✅ Use Newsreader for H1, H2 (editorial serif)
✅ Use Inter for H3-H6, body, UI (clean sans-serif)
✅ Use layered shadows (Claude-style soft shadows)
✅ Use 4px base spacing unit
✅ Use 12px border-radius for cards
✅ Use clamp() for responsive typography
✅ Use hamburger menu on mobile (<768px)
✅ Use horizontal scrolling for wide content on mobile
✅ Use full-width buttons on mobile
✅ Ensure 44x44px minimum touch targets (48px for buttons)
✅ Use single-column layouts on mobile
✅ Focus on framework value for schools
✅ Include Nyuchi Learning branding for credibility
✅ Emphasize open, shareable, adaptable framework nature
✅ Mention multilingual support (African languages + English, French, Chinese)
✅ Emphasize Ubuntu philosophy
✅ Design mobile-first
✅ Use animation classes (animate-fade-in, animate-slide-up) for scroll animations
✅ Use auto-hide header with transparent/solid states
✅ Use dropdown menus for navigation sections
✅ Include global mission messaging ("Leapfrog Traditional Education. Build for 2050.")
✅ Create editorial, sophisticated feel (not aggressive/bold)
✅ Optimize spacing for 13" laptop screens

### DON'T:
❌ Use pill-shaped buttons (9999px border-radius)
❌ Use square buttons (0px border-radius)
❌ Use emojis anywhere
❌ Use harsh black (#000) for backgrounds (use #2B2B2B charcoal)
❌ Use pure white (#FFF) for text (use #FAFAFA off-white)
❌ Use light/white backgrounds for main pages (dark theme is standard)
❌ Use old fonts (Playfair Display, Roboto - these are deprecated)
❌ Use single, sharp shadows
❌ Use 8px spacing base (use 4px instead)
❌ Use uppercase text-transform everywhere (only when appropriate)
❌ Make Nyuchi branding the hero (framework is the hero)
❌ Hide that the framework is open and shareable
❌ Use "Ubuntu" as a brand name (philosophy only)
❌ Ignore mobile experience
❌ Use fonts other than Newsreader and Inter
❌ Use small touch targets (<44px)
❌ Allow content to wrap/overflow on mobile (use horizontal scroll)
❌ Use aggressive, overly bold design
❌ Use cold colors (old green #00A651)
❌ Use excessive spacing that doesn't work on 13" screens
❌ Forget animation accessibility (prefers-reduced-motion)

---

## Technical Stack

- **Framework**: Astro 4.15+
- **Icons**: lucide-astro
- **Typography**: Google Fonts (Newsreader, Inter)
- **Design Language**: Claude-aligned (warm, editorial, accessible)
- **Deployment**: Vercel
- **Analytics**: Google Analytics (G-BNHM29F8W5)
- **Sitemap**: @astrojs/sitemap (automatic generation)
- **SEO**: Comprehensive meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **AI Crawlers**: Allowed (GPTBot, Claude-Web, CCBot, PerplexityBot)

---

## Accessibility

### WCAG 2.1 AA Compliance

- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Touch targets**: 44x44px minimum, 48px for primary buttons
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **ARIA labels**: Where appropriate (e.g., mobile menu button)
- **Keyboard navigation**: Full keyboard support
- **Screen reader**: Compatible with screen readers
- **Focus indicators**: Visible focus states for all interactive elements
- **Responsive text**: Readable at all sizes (minimum 16px/1rem)

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

**Version 3.1** (December 2025) - Current (Dark Theme, Animation System, Global Mission)
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
