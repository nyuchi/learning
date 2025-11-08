# K-12 Digital Campus Framework - Design Guidelines

**Last Updated**: November 2025
**Version**: 3.0 (Claude-Aligned: Warm, Editorial, Accessible)
**Maintained By**: Nyuchi Learning Development Team

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

## Color System - Warm Earth Tones (Claude-Aligned)

### Design Philosophy

The color system uses **warm earth tones** inspired by Claude's design language, creating a sophisticated, approachable, and professional feel while maintaining African heritage through the Zimbabwe flag strip.

### Primary Palette

**Warm Emerald (Primary Actions)**
- Primary: `#18A877` - Main CTA buttons, primary links, active states, important highlights
- Hover: `#20C088` - Bright on hover
- Active: `#139F68` - Deep on press
- Light: `#D8F3EA` - Soft background
- Subtle: `#F0FAF6` - Very light background

**Warm Purple (PRIMARY UI COLOR)**
- Primary: `#8B80E8` - **Primary UI color for headings, text, links, icons** (replaces old charcoal #2C2C2C)
- Hover: `#A199EE` - Light on hover
- Active: `#7569D9` - Deep on press
- Light: `#EBE8FC` - Soft background
- Subtle: `#F6F5FE` - Very light background

**CRITICAL**: Use warm purple (#8B80E8) as the primary color for all UI elements (headings, text, links, buttons, icons). Charcoal is reserved for backgrounds only.

**Warm Brown (Accents)**
- Primary: `#A67557` - Featured content, premium badges, warm highlights, special callouts
- Hover: `#BA8668` - Warm on hover
- Active: `#925F47` - Deep on press
- Light: `#F5EDE8` - Soft background
- Subtle: `#FAF7F5` - Very light background

**Charcoal (Backgrounds & Neutrals)**
- Primary: `#2B2B2B` - Dark backgrounds, footer
- Secondary: `#6B6B6B` - Secondary text, captions
- Tertiary: `#9B9B9B` - Disabled text
- Border: `#E0E0E0` - Subtle borders
- Background: `#F7F7F7` - Light backgrounds
- White: `#FAFAFA` - Off-white backgrounds

**CRITICAL**: Charcoal is used for backgrounds and neutral elements only. Use warm purple (#8B80E8) for primary UI elements.

### Semantic Colors

- **Success**: `#18A877` (Same as warm emerald)
- **Warning**: `#E8A040` (Warm amber)
- **Error**: `#E8574E` (Warm red)
- **Info**: `#5B9FE3` (Warm blue)

### CSS Variables

```css
:root {
  /* WARM PURPLE - PRIMARY UI COLOR */
  --primary: #8B80E8;          /* Main color for headings, text, links, buttons, icons */
  --primary-hover: #A199EE;    /* Hover states */
  --primary-active: #7569D9;   /* Active/pressed states */
  --primary-light: #EBE8FC;    /* Light backgrounds */
  --primary-subtle: #F6F5FE;   /* Very light backgrounds */

  /* Warm Emerald - Secondary Actions */
  --emerald-primary: #18A877;
  --emerald-hover: #20C088;
  --emerald-active: #139F68;
  --emerald-light: #D8F3EA;
  --emerald-subtle: #F0FAF6;

  /* Warm Brown - Accents */
  --brown-primary: #A67557;
  --brown-hover: #BA8668;
  --brown-active: #925F47;
  --brown-light: #F5EDE8;
  --brown-subtle: #FAF7F5;

  /* Charcoal - Backgrounds & Neutrals ONLY */
  --charcoal-bg-dark: #2B2B2B;   /* Dark backgrounds, footer */
  --charcoal-secondary: #6B6B6B;  /* Secondary text */
  --charcoal-tertiary: #9B9B9B;   /* Disabled text */
  --charcoal-border: #E0E0E0;     /* Borders */
  --charcoal-bg: #F7F7F7;         /* Light backgrounds */
  --charcoal-white: #FAFAFA;      /* Off-white */

  /* Text Colors */
  --text: #8B80E8;           /* Primary text - WARM PURPLE */
  --text-secondary: #6B6B6B; /* Secondary text - Charcoal */
  --text-light: #9B9B9B;     /* Light text - Charcoal */

  /* Background Colors */
  --bg: #FAFAFA;              /* Off-white */
  --bg-gray: #F7F7F7;         /* Light gray */
  --bg-dark: #2B2B2B;         /* Dark background */

  /* Semantic */
  --success: #18A877;
  --warning: #E8A040;
  --error: #E8574E;
  --info: #5B9FE3;
}
```

**Color Usage Guidelines:**
- **Warm Purple (#8B80E8)**: Primary UI color for headings, body text, links, buttons, icons
- **Warm Emerald (#18A877)**: Secondary CTAs, success states, highlights
- **Warm Brown (#A67557)**: Special accents, featured content
- **Charcoal (#2B2B2B)**: Backgrounds, footer, dark sections ONLY

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

## Navigation

### Desktop Navigation

Standard horizontal navigation with rounded hover states (10px border-radius, matching button style).

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
    <li><a href="/pricing">Pricing</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/about">About</a></li>
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
│   │   ├── k12-digital-campus-framework.pdf (to be generated)
│   │   └── k12-support-process-framework.pdf (to be generated)
│   └── OG-IMAGE-README.md
├── src/
│   ├── components/
│   │   ├── Logo.astro
│   │   └── SEO.astro
│   ├── layouts/
│   │   └── BaseLayout.astro       # Zimbabwe flag strip, navigation, footer
│   ├── pages/
│   │   ├── index.astro            # Homepage (Claude-aligned design)
│   │   ├── frameworks.astro       # Frameworks overview
│   │   ├── framework.astro        # K-12 Digital Campus Framework
│   │   ├── support-framework.astro # K-12 Support Process Framework
│   │   ├── pricing.astro          # Pricing tiers & breakdowns
│   │   ├── about.astro            # Mission & founder story
│   │   └── blog/
│   │       ├── index.astro
│   │       ├── digital-literacy-importance.astro
│   │       ├── launching-the-framework.astro
│   │       └── why-open-source.astro
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── CLAUDE.md                       # This file - Design guidelines
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
✅ Use warm color system (purple PRIMARY, emerald, brown, charcoal for backgrounds)
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
✅ **Use warm purple (#8B80E8) as PRIMARY UI color** for headings, text, links, buttons, icons
✅ Use warm emerald (#18A877) for secondary CTAs and highlights
✅ Use warm brown (#A67557) for accents
✅ Use charcoal (#2B2B2B) ONLY for backgrounds and dark sections
✅ Create editorial, sophisticated feel (not aggressive/bold)
✅ Optimize spacing for 13" laptop screens

### DON'T:
❌ Use pill-shaped buttons (9999px border-radius)
❌ Use square buttons (0px border-radius)
❌ Use emojis anywhere
❌ Use harsh black (#000) or pure white (#FFF) for backgrounds
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
❌ Use cold colors (old green #00A651, old charcoal #2C2C2C as primary)
❌ Use charcoal (#2B2B2B) for primary UI elements (use purple instead)
❌ Use excessive spacing that doesn't work on 13" screens

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

**Version 3.0** (November 2025) - Current (Claude-Aligned)
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
