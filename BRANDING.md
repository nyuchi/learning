# Nyuchi Learning - Brand Guidelines

**Version**: 6.0 (Education Theme)
**Last Updated**: December 2025
**Brand System**: Bundu Family - Five African Minerals
**Maintained By**: Nyuchi Learning Development Team

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [The Bundu Ecosystem](#the-bundu-ecosystem)
3. [Five African Minerals Palette](#five-african-minerals-palette)
4. [Education Theme](#education-theme)
5. [Typography](#typography)
6. [Design Tokens](#design-tokens)
7. [Minerals Strip](#minerals-strip)
8. [Voice & Messaging](#voice--messaging)
9. [Usage Guidelines](#usage-guidelines)

---

## Brand Identity

### Who We Are

**Nyuchi Learning** is part of the Nyuchi brand family within the Bundu Ecosystem — technology that serves African communities with Ubuntu philosophy at its core.

**Shona:** nyuchi /njuːtʃi/ = "bee"

Nyuchi embodies the industrious spirit of the African bee — tireless workers who build together, pollinate ideas across communities, and create sweet results through collective effort.

**Parent Ecosystem:** Bundu Family
**Primary Mineral:** Cobalt (for education)
**Mission:** To empower African communities through technology that feels like home

### Our Philosophy

**Ubuntu: "Ndiri nekuti tiri" - I am because we are**

This African philosophy is at the heart of everything we do:
- Community success over individual achievement
- Collaboration and mutual support
- Collective growth and shared knowledge
- Open, shareable resources for all

### Ubuntu Five Pillars

| Pillar | Shona | Application |
|--------|-------|-------------|
| Family | Mhuri | User accounts, personal data |
| Community | Nharaunda | Social features, collaboration |
| Society | Vanhu | Platform ecosystem, public features |
| Environment | Zvakatipoteredza | Digital footprint, sustainability |
| Spirituality | Mweya | Mission, values, cultural preservation |

---

## The Bundu Ecosystem

**Bundu** is the Shona word for wilderness — the untamed, natural space where life flourishes according to its own rhythm. The Bundu Ecosystem is our vision for technology: a digital wilderness where African innovation can grow naturally, where community comes before commerce, and where Ubuntu philosophy guides every decision.

### Brand Family

| Brand | Primary Mineral | Role | Purpose |
|-------|----------------|------|---------|
| **Bundu** | Terracotta | Parent Ecosystem | Technology that serves African communities |
| **Nyuchi** | Gold/Cobalt | Action Layer | Commerce, learning, travel, community |
| **Mukoko** | Tanzanite | Structure Layer | Identity, news, social, events |
| **Shamwari** | Malachite | Intelligence Layer | AI companion across all platforms |

### Nyuchi Products

| Category | Mineral | Products | Description |
|----------|---------|----------|-------------|
| **Education** | Cobalt | Nyuchi Learning, Nyuchi Lingo | Skills and language for modern Africa |
| Services | Gold | Nyuchi Platform, Tukmart, Nyuchi Honey | Core commerce and rewards |
| Travel | Malachite | Zimbabwe Travel, Iconic Expeditions | Authentic exploration guided by locals |
| Community | Terracotta | Foundation, Technology Leaders of Africa | Ubuntu in action |

---

## Five African Minerals Palette

The Bundu Family brand ecosystem uses **ONE unified palette of 5 African Minerals** shared across all brands. All colors achieve **WCAG AAA (7:1+)** contrast ratios.

| Mineral | Light Mode | Dark Mode | Origin | Use Case |
|---------|------------|-----------|--------|----------|
| **Cobalt** | `#0047AB` | `#00B0FF` | Katanga (DRC), Zambian Copperbelt | CTAs, links, **education** |
| **Tanzanite** | `#4B0082` | `#B388FF` | Merelani Hills, Tanzania | Social, premium tiers |
| **Malachite** | `#004D40` | `#64FFDA` | Congo Copper Belt | Success, travel, nature |
| **Gold** | `#5D4037` | `#FFD740` | Ghana, South Africa, Mali | Rewards, honey, warmth |
| **Terracotta** | `#8B4513` | `#D4A574` | Pan-African Earth | Community, Ubuntu |

### CSS Variables

```css
:root {
  /* Five African Minerals - Light Mode */
  --mineral-cobalt: #0047AB;
  --mineral-tanzanite: #4B0082;
  --mineral-malachite: #004D40;
  --mineral-gold: #5D4037;
  --mineral-terracotta: #8B4513;
}

[data-theme="dark"] {
  /* Five African Minerals - Dark Mode */
  --mineral-cobalt: #00B0FF;
  --mineral-tanzanite: #B388FF;
  --mineral-malachite: #64FFDA;
  --mineral-gold: #FFD740;
  --mineral-terracotta: #D4A574;
}
```

---

## Education Theme

Nyuchi Learning uses the **Education Theme** variant with Cobalt as the primary mineral and Slate dark surfaces.

### Primary Color: Cobalt

| Mode | Value | Usage |
|------|-------|-------|
| Light | `#0047AB` | CTAs, links, buttons, interactive elements |
| Dark | `#00B0FF` | CTAs, links, buttons, interactive elements |

### Surface Colors

**Light Mode:**
| Surface | Value | Name |
|---------|-------|------|
| Base | `#FAF9F5` | Warm Cream |
| Surface | `#FFFFFF` | White |
| Surface Dim | `#F3F2EE` | Subtle Gray |

**Dark Mode (Education Slate Variant):**
| Surface | Value | Name |
|---------|-------|------|
| Base | `#0F172A` | Slate 900 |
| Surface | `#1E293B` | Slate 800 |
| Elevated | `#334155` | Slate 700 |

### Text Colors

**Light Mode:**
| Type | Value |
|------|-------|
| Primary | `#1A1A1A` |
| Secondary | `#4B5563` |
| Muted | `#6B7280` |

**Dark Mode:**
| Type | Value |
|------|-------|
| Primary | `#F8FAFC` |
| Secondary | `#CBD5E1` |
| Muted | `#94A3B8` |

### Semantic Colors

| Type | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| Success | `#004D40` | `#64FFDA` | Confirmations, completed states |
| Error | `#B3261E` | `#F2B8B5` | Errors, destructive actions |
| Warning | `#7A5C00` | `#FFD866` | Alerts, caution states |
| Info | `#0047AB` | `#00B0FF` | Information, tips (same as Cobalt) |

---

## Typography

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
<!-- From assets.nyuchi.com CDN -->
<link rel="stylesheet" href="https://assets.nyuchi.com/fonts/all-fonts.css">

<!-- Or Google Fonts fallback -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Typography Scale

```css
/* H1 - Hero Title (Noto Serif) */
h1 {
  font-family: 'Noto Serif', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* H2 - Section Title (Plus Jakarta Sans) */
h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
}

/* H3-H6, Body (Plus Jakarta Sans) */
h3, h4, h5, h6, body, p {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
```

---

## Design Tokens

### Border Radii

| Token | Value | Usage |
|-------|-------|-------|
| **Button** | 12px | All buttons (NOT 8px or 10px) |
| **Card** | 16px | Cards, containers |
| **Input** | 8px | Form fields |
| **Badge** | 9999px | Pill-shaped badges |
| **App Icon** | 24px | Application icons |

### Button Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | 32px | 6px 12px | 12px |
| default | 40px | 10px 20px | 14px |
| lg | 48px | 14px 28px | 16px |
| icon | 40px × 40px | - | 20px |

### Spacing

| Token | Value |
|-------|-------|
| --space-1 | 4px |
| --space-2 | 8px |
| --space-3 | 12px |
| --space-4 | 16px |
| --space-6 | 24px |
| --space-8 | 32px |
| --space-12 | 48px |
| --space-16 | 64px |

---

## Minerals Strip

**The signature visual element replacing the Zimbabwe flag strip.**

### Specification

| Property | Value |
|----------|-------|
| Width | 4px |
| Position | Fixed, left edge |
| Direction | Vertical |
| Colors | 5 African Minerals (20% each) |
| z-index | 9999 |
| Mobile | Hidden (< 480px) |

### Color Order (Top to Bottom)

| Mineral | Light Mode | Dark Mode |
|---------|------------|-----------|
| 1. Cobalt | `#0047AB` | `#00B0FF` |
| 2. Tanzanite | `#4B0082` | `#B388FF` |
| 3. Malachite | `#004D40` | `#64FFDA` |
| 4. Gold | `#5D4037` | `#FFD740` |
| 5. Terracotta | `#8B4513` | `#D4A574` |

### CSS Implementation

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

.minerals-strip > div {
  flex: 1; /* 20% each */
}

/* Dark mode colors */
.mineral-cobalt    { background: #00B0FF; }
.mineral-tanzanite { background: #B388FF; }
.mineral-malachite { background: #64FFDA; }
.mineral-gold      { background: #FFD740; }
.mineral-terracotta { background: #D4A574; }

/* Hide on mobile */
@media (max-width: 480px) {
  .minerals-strip {
    display: none;
  }

  body {
    margin-left: 0;
  }
}
```

---

## Voice & Messaging

### Brand Voice

**Characteristics:**
- Professional but accessible
- Educational, not promotional
- Practical and actionable
- Community-centered (Ubuntu)
- Encouraging and empowering

### Key Messages

1. **Ubuntu Philosophy**
   - "I am because we are"
   - Community success over individual achievement

2. **Open & Shareable**
   - "Copy it. Adapt it. Improve it. Share it."
   - Free to use and distribute

3. **Built for Africa**
   - Africa-tested solutions
   - Understanding of local realities

4. **Education-First**
   - Built by educators, for educators
   - Focus on student success

### Wordmark Rules

**CRITICAL:** All brand wordmarks are **lowercase**:
- ✅ `nyuchi` (not "Nyuchi")
- ✅ `bundu` (not "Bundu")
- ✅ `mukoko` (not "Mukoko")
- ✅ `shamwari` (not "Shamwari")

---

## Usage Guidelines

### Critical Rules

1. **One Palette**: Use only the 5 African Minerals — never mix in other colors

2. **All AAA**: Every mineral achieves WCAG AAA (7:1+) in both modes

3. **Minerals Strip**: 4px VERTICAL stripe on LEFT edge (not horizontal, not top)

4. **Button Radius = 12px**: Always. Not 8px or 10px.

5. **Card Radius = 16px**: Generous, modern.

6. **Education Theme**: Use Cobalt primary + Slate dark surfaces

7. **Wordmarks**: Always lowercase

8. **Accessibility**: 7:1+ contrast minimum, 44x44px touch targets

### Do's

✅ Use Cobalt (`#0047AB` / `#00B0FF`) as primary color for education
✅ Use Slate dark theme (`#0F172A` base, `#1E293B` surface)
✅ Use Noto Serif for H1, Plus Jakarta Sans for H2-H6 and body
✅ Use 12px button radius, 16px card radius
✅ Use Minerals Strip (4px, 5 colors, left edge)
✅ Use lowercase wordmarks
✅ Ensure AAA contrast (7:1+)
✅ Hide Minerals Strip on mobile (< 480px)

### Don'ts

❌ Use colors outside the 5 African Minerals palette
❌ Use old fonts (Newsreader, Inter, Playfair Display, Roboto)
❌ Use old button radius (10px or pill-shaped)
❌ Use Zimbabwe flag colors (legacy v1-v5)
❌ Use capitalized brand names ("Nyuchi" instead of "nyuchi")
❌ Use charcoal backgrounds (use Slate instead for education)

---

## Resources

### CDN Assets

| Type | URL |
|------|-----|
| All CSS | `https://assets.nyuchi.com/css/v6/all.css` |
| All Fonts | `https://assets.nyuchi.com/fonts/all-fonts.css` |
| Education CSS | `https://assets.nyuchi.com/css/v6/nyuchi-lingo.css` |
| Logos | `https://assets.nyuchi.com/logos/nyuchi/` |

### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v6/brand-system` | Complete brand system |
| `/api/v6/minerals` | Five African Minerals palette |
| `/api/v6/colors` | Full color system |
| `/api/v6/typography` | Typography configuration |
| `/api/v6/ubuntu` | Ubuntu philosophy |

### Brand Documentation

- **Brand Site:** https://assets.nyuchi.com
- **API Status:** https://assets.nyuchi.com/status
- **Guidelines:** https://assets.nyuchi.com/guidelines

---

**Remember:** Our brand is built on Ubuntu — "I am because we are." Technology that serves African communities, with community before commerce.
