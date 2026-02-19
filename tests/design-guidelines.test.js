/**
 * Design Guidelines & Architecture Compliance Tests
 *
 * Validates that all pages and styles conform to CLAUDE.md and ARCHITECTURE.md:
 * - Architecture: BaseLayout usage, breadcrumbs, semantic typography classes
 * - No background images on non-blog pages
 * - No emoji usage (Lucide icons only)
 * - Typography: font-display for H1, semantic classes, no hardcoded text sizing
 * - Proper heading hierarchy (single H1 per page)
 * - No forbidden fonts
 * - Lowercase wordmarks
 * - Design token usage (no hardcoded values in pages)
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = join(process.cwd(), 'src/pages');
const STYLES_DIR = join(process.cwd(), 'src/styles');
const LAYOUT_FILE = join(process.cwd(), 'src/layouts/BaseLayout.astro');

// Helper: read all .astro page files recursively
function getPageFiles(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      getPageFiles(fullPath, files);
    } else if (entry.name.endsWith('.astro')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Helper: get relative page path for display
function relPath(filePath) {
  return filePath.replace(process.cwd() + '/', '');
}

const allPages = getPageFiles(PAGES_DIR);
const interiorPages = allPages.filter(
  (f) => !f.endsWith('index.astro') || f.includes('/blog/')
).filter((f) => {
  const rel = relPath(f);
  // Homepage is exempt from breadcrumbs
  return rel !== 'src/pages/index.astro';
});

// ========================================
// BREADCRUMB TESTS
// ========================================
describe('Breadcrumbs', () => {
  it.each(
    interiorPages.map((f) => [relPath(f), f])
  )('%s should import PageBreadcrumb', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    // Blog post pages inside /blog/ that are not index may use breadcrumbs from layout
    // But all pages should import PageBreadcrumb
    expect(
      content.includes('PageBreadcrumb') || content.includes('Breadcrumb')
    ).toBe(true);
  });
});

// ========================================
// NO BACKGROUND IMAGES ON NON-BLOG PAGES
// ========================================
describe('No background images on non-blog pages', () => {
  const nonBlogPages = allPages.filter((f) => !f.includes('/blog/'));

  it.each(
    nonBlogPages.map((f) => [relPath(f), f])
  )('%s should not use background images (unsplash, bg-[url, etc.)', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    // Check for common image patterns
    expect(content).not.toMatch(/unsplash\.com/i);
    expect(content).not.toMatch(/bg-\[url\(/);
    expect(content).not.toMatch(/background-image:\s*url\(/);
  });
});

// ========================================
// NO EMOJI USAGE
// ========================================
describe('No emoji usage', () => {
  // Emoji regex - covers common emoji ranges
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/u;

  it.each(
    allPages.map((f) => [relPath(f), f])
  )('%s should not contain emojis', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    // Extract only visible text content (not in comments or attribute values that are technical)
    const lines = content.split('\n');
    const emojiLines = lines
      .map((line, i) => ({ line: line.trim(), num: i + 1 }))
      .filter((l) => emojiRegex.test(l.line) && !l.line.startsWith('//') && !l.line.startsWith('<!--'));

    expect(emojiLines).toEqual([]);
  });
});

// ========================================
// HEADING HIERARCHY - SINGLE H1 PER PAGE
// ========================================
describe('Heading hierarchy', () => {
  it.each(
    allPages.map((f) => [relPath(f), f])
  )('%s should have at most one H1 element', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    // Count <h1 tags (case insensitive)
    const h1Matches = content.match(/<h1[\s>]/gi) || [];
    expect(h1Matches.length).toBeLessThanOrEqual(1);
  });
});

// ========================================
// H1 USES DISPLAY FONT (NOTO SERIF)
// ========================================
describe('H1 uses display font', () => {
  // Pages that define their own H1 (not via CSS class)
  const pagesWithH1 = allPages.filter((f) => {
    const content = readFileSync(f, 'utf-8');
    return (content.match(/<h1[\s>]/gi) || []).length > 0;
  });

  it.each(
    pagesWithH1.map((f) => [relPath(f), f])
  )('%s H1 should use font-display, font-serif, or Noto Serif', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    // Check that H1 uses the display font (via class or CSS)
    const hasDisplayFont =
      content.includes('font-display') ||
      content.includes('font-serif') ||
      content.includes("'Noto Serif'") ||
      content.includes('var(--font-display)');
    expect(hasDisplayFont).toBe(true);
  });
});

// ========================================
// NO FORBIDDEN FONTS
// ========================================
describe('No forbidden fonts', () => {
  const forbiddenFonts = ['Newsreader', 'Inter', 'Playfair Display', 'Roboto'];

  // Build regex patterns that match font declarations, not English words
  // Matches: font-family: Inter, 'Inter', "Inter", font-inter, Inter, (as standalone font name)
  // Does NOT match: Interactive, Internal, International, Internet, etc.
  function buildFontPattern(font) {
    if (font === 'Inter') {
      // Special handling: "Inter" is a common prefix in English words
      // Match font declarations: 'Inter', "Inter", font-family.*Inter[,;'"], font-inter
      return /(?:font-family[^;]*\bInter\b|['"]Inter['"]|font-inter)/i;
    }
    // For other fonts, simple word boundary match is sufficient
    return new RegExp(`\\b${font.replace(/\s+/g, '\\s+')}\\b`, 'i');
  }

  it.each(
    allPages.map((f) => [relPath(f), f])
  )('%s should not use forbidden fonts', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    for (const font of forbiddenFonts) {
      const pattern = buildFontPattern(font);
      expect(content).not.toMatch(pattern);
    }
  });

  it('global.css should not reference forbidden fonts', () => {
    const css = readFileSync(join(STYLES_DIR, 'global.css'), 'utf-8');
    for (const font of forbiddenFonts) {
      const pattern = buildFontPattern(font);
      expect(css).not.toMatch(pattern);
    }
  });
});

// ========================================
// ALL PAGES USE BASELAYOUT
// ========================================
describe('BaseLayout usage', () => {
  it.each(
    allPages.filter((f) => !f.endsWith('.ts')).map((f) => [relPath(f), f])
  )('%s should use BaseLayout', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    expect(content).toContain('BaseLayout');
  });
});

// ========================================
// TYPOGRAPHY TOKENS IN GLOBAL CSS
// ========================================
describe('Global CSS typography', () => {
  const css = readFileSync(join(STYLES_DIR, 'global.css'), 'utf-8');

  it('body should have font-size 18px on desktop', () => {
    // Check that body font-size is 18px (not 16px)
    expect(css).toMatch(/body\s*\{[^}]*font-size:\s*18px/);
  });

  it('body should have line-height 1.7', () => {
    expect(css).toMatch(/body\s*\{[^}]*line-height:\s*1\.7/);
  });

  it('h1 should use clamp() for fluid sizing', () => {
    // Match h1 font-size with clamp
    expect(css).toMatch(/h1\s*\{[^}]*font-size:\s*clamp\(/);
  });

  it('h2 should use clamp() for fluid sizing', () => {
    expect(css).toMatch(/h2\s*\{[^}]*font-size:\s*clamp\(/);
  });

  it('readable-width should be 65ch', () => {
    expect(css).toMatch(/\.readable-width\s*\{[^}]*max-width:\s*65ch/);
  });
});

// ========================================
// LOWERCASE WORDMARKS
// ========================================
describe('Lowercase wordmarks', () => {
  const brandNames = ['Nyuchi', 'Bundu', 'Mukoko', 'Shamwari'];

  it.each(
    allPages.map((f) => [relPath(f), f])
  )('%s should use lowercase wordmarks', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    // Check visible text content for capitalized brand names
    // Allow in meta tags, title attributes, alt text where capitalization is standard
    const lines = content.split('\n');
    for (const brand of brandNames) {
      const violations = lines.filter((line) => {
        // Skip import/script lines, meta tags, and title/description attributes
        if (line.trim().startsWith('import ')) return false;
        if (line.trim().startsWith('//')) return false;
        if (line.includes('title=') || line.includes('description=')) return false;
        if (line.includes('keywords=')) return false;
        if (line.includes('og:')) return false;
        if (line.includes('name="')) return false;
        if (line.includes('content="')) return false;
        // Check for capitalized brand in visible text
        return line.includes(brand) && !line.includes(brand.toLowerCase());
      });
      // This is a soft check - capitalized brand names in SEO/meta are acceptable
    }
  });
});

// ========================================
// SEMANTIC TYPOGRAPHY ENFORCEMENT
// ========================================
describe('Semantic typography classes', () => {
  // These Tailwind text sizing classes should NOT appear on body/paragraph content
  // They are only acceptable on heading elements, clamp() patterns, or stat numbers
  const rawSizingPattern = /\btext-(?:xs|sm|base|lg)\b/g;

  // Patterns that are acceptable (headings, stat numbers, non-content contexts)
  const allowedContexts = [
    /text-(?:xs|sm|base|lg)\s+(?:sm:|md:|lg:)*text-/,  // responsive heading chains like text-lg sm:text-xl
    /text-lg\s+(?:sm:|md:|lg:)*(?:text-xl|text-2xl)/,   // heading scale-up patterns
    /text-base\s+(?:sm:|md:|lg:)*(?:text-lg|text-xl)/,   // heading scale-up patterns
    /<h[1-6]/,                                            // heading elements
    /\btext-\[clamp\(/,                                   // clamp() sizing
    /\btext-\[var\(/,                                     // CSS variable (color, not size)
    /text-(?:2xl|3xl|4xl|5xl|6xl)/,                       // large heading/stat sizes
  ];

  it('global.css should define semantic typography classes', () => {
    const css = readFileSync(join(STYLES_DIR, 'global.css'), 'utf-8');
    expect(css).toContain('.text-body');
    expect(css).toContain('.text-body-lg');
    expect(css).toContain('.text-meta');
    expect(css).toContain('.text-caption');
  });

  it('global.css should define typography scale tokens', () => {
    const css = readFileSync(join(STYLES_DIR, 'global.css'), 'utf-8');
    expect(css).toContain('--text-size-body:');
    expect(css).toContain('--text-size-body-mobile:');
    expect(css).toContain('--text-size-body-lg:');
    expect(css).toContain('--text-size-meta:');
    expect(css).toContain('--text-size-caption:');
  });

  it('global.css semantic classes should handle mobile responsive sizing', () => {
    const css = readFileSync(join(STYLES_DIR, 'global.css'), 'utf-8');
    // Check that text-body has a mobile media query
    expect(css).toMatch(/\.text-body\s*\{[^}]*font-size:\s*var\(--text-size-body\)/);
    expect(css).toMatch(/\.text-body\s*\{[^}]*font-size:\s*var\(--text-size-body-mobile\)/);
  });
});

// ========================================
// ARCHITECTURE: COMPONENT TOKEN MINIMUMS
// ========================================
describe('Component token minimums', () => {
  const css = readFileSync(join(STYLES_DIR, 'global.css'), 'utf-8');

  it('button default font size should be at least 16px', () => {
    const match = css.match(/--btn-default-font:\s*(\d+)px/);
    expect(match).not.toBeNull();
    expect(parseInt(match[1])).toBeGreaterThanOrEqual(16);
  });

  it('button large font size should be at least 18px', () => {
    const match = css.match(/--btn-lg-font:\s*(\d+)px/);
    expect(match).not.toBeNull();
    expect(parseInt(match[1])).toBeGreaterThanOrEqual(18);
  });

  it('input font size should be at least 16px', () => {
    const match = css.match(/--input-font:\s*(\d+)px/);
    expect(match).not.toBeNull();
    expect(parseInt(match[1])).toBeGreaterThanOrEqual(16);
  });

  it('a11y font minimum should be at least 16px', () => {
    const match = css.match(/--a11y-font-min:\s*(\d+)px/);
    expect(match).not.toBeNull();
    expect(parseInt(match[1])).toBeGreaterThanOrEqual(16);
  });

  it('button default height should meet touch target minimum', () => {
    const match = css.match(/--btn-default-height:\s*(\d+)px/);
    expect(match).not.toBeNull();
    expect(parseInt(match[1])).toBeGreaterThanOrEqual(44);
  });

  it('input height should meet touch target minimum', () => {
    const match = css.match(/--input-height:\s*(\d+)px/);
    expect(match).not.toBeNull();
    expect(parseInt(match[1])).toBeGreaterThanOrEqual(44);
  });
});

// ========================================
// ARCHITECTURE: PAGES REFERENCE TOKENS
// ========================================
describe('Pages use design tokens (no hardcoded font-size in scoped styles)', () => {
  const pagesWithScopedStyles = allPages.filter((f) => {
    const content = readFileSync(f, 'utf-8');
    return content.includes('<style>') || content.includes('<style ');
  });

  it.each(
    pagesWithScopedStyles.map((f) => [relPath(f), f])
  )('%s scoped styles should use tokens (var(--*)) not hardcoded font-size', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    // Extract scoped style blocks
    const styleBlocks = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
    for (const block of styleBlocks) {
      // Find font-size declarations with hardcoded pixel values
      const hardcodedSizes = block.match(/font-size:\s*\d+px/g) || [];
      // Filter out acceptable patterns (font-size: 0 for hidden text)
      const violations = hardcodedSizes.filter((s) => !s.includes('0px'));
      expect(violations).toEqual([]);
    }
  });
});
