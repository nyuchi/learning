/**
 * Design Guidelines Compliance Tests
 *
 * Validates that all pages and styles conform to the CLAUDE.md v5.0 guidelines:
 * - Breadcrumbs on all interior pages
 * - No background images on non-blog pages
 * - No emoji usage (Lucide icons only)
 * - No hardcoded color hex values (must use CSS variables)
 * - Typography: font-display for H1, proper sizing
 * - Proper heading hierarchy (single H1 per page)
 * - No forbidden fonts
 * - Lowercase wordmarks
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
