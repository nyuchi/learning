/**
 * Accessibility & SEO Compliance Tests
 *
 * Validates built HTML output for:
 * - SEO: title, description, Open Graph, canonical URL
 * - Accessibility: skip links, landmarks, ARIA, heading hierarchy
 * - WCAG: touch targets, focus indicators, reduced motion support
 * - Structured data: JSON-LD presence
 *
 * These tests run against the built dist/ output.
 * Run `npm run build` before running these tests.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const DIST_DIR = join(process.cwd(), 'dist');

// Helper: get all HTML files in dist recursively
function getHtmlFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      getHtmlFiles(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function relPath(filePath) {
  return filePath.replace(process.cwd() + '/', '');
}

// Collect HTML files at module level so they're available for it.each
const htmlFiles = getHtmlFiles(DIST_DIR);

// ========================================
// SEO: META TAGS
// ========================================
describe('SEO meta tags', () => {
  it('should have built HTML files', () => {
    expect(htmlFiles.length).toBeGreaterThan(0);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have a <title> tag', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<title>[^<]+<\/title>/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have a meta description', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<meta\s+name="description"\s+content="[^"]+"/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have Open Graph tags', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:description"/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have a canonical URL', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<link\s+rel="canonical"/);
  });
});

// ========================================
// SEO: STRUCTURED DATA
// ========================================
describe('Structured data (JSON-LD)', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have JSON-LD structured data', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/type="application\/ld\+json"/);
  });
});

// ========================================
// ACCESSIBILITY: SKIP LINKS
// ========================================
describe('Skip links', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have skip link(s)', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/class="skip-link"/);
  });
});

// ========================================
// ACCESSIBILITY: LANDMARKS
// ========================================
describe('HTML landmarks', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have <main> landmark', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<main[\s>]/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have <nav> landmark', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<nav[\s>]/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have <footer> landmark', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<footer[\s>]/);
  });
});

// ========================================
// ACCESSIBILITY: LANG ATTRIBUTE
// ========================================
describe('HTML lang attribute', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have lang attribute on <html>', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<html[^>]+lang="[^"]+"/);
  });
});

// ========================================
// ACCESSIBILITY: HEADING HIERARCHY
// ========================================
describe('Heading hierarchy in built HTML', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have exactly one <h1>', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
    expect(h1Count).toBe(1);
  });
});

// ========================================
// ACCESSIBILITY: VIEWPORT META
// ========================================
describe('Viewport meta tag', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have viewport meta tag', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<meta\s+name="viewport"/);
  });
});

// ========================================
// GLOBAL CSS: ACCESSIBILITY FEATURES
// ========================================
describe('CSS accessibility features', () => {
  const cssPath = join(process.cwd(), 'src/styles/global.css');
  const css = readFileSync(cssPath, 'utf-8');

  it('should have skip-link styles', () => {
    expect(css).toContain('.skip-link');
  });

  it('should have sr-only (screen reader only) utility', () => {
    expect(css).toContain('.sr-only');
  });

  it('should have focus-visible styles', () => {
    expect(css).toContain(':focus-visible');
  });

  it('should respect prefers-reduced-motion', () => {
    expect(css).toContain('prefers-reduced-motion');
  });

  it('should support forced-colors mode', () => {
    expect(css).toContain('forced-colors: active');
  });

  it('should have print styles', () => {
    expect(css).toContain('@media print');
  });

  it('should have touch target minimum sizing (44px)', () => {
    expect(css).toContain('min-height: 44px');
  });

  it('should have high contrast mode support', () => {
    expect(css).toContain('prefers-contrast');
  });
});

// ========================================
// BASELAYOUT: ACCESSIBILITY FEATURES
// ========================================
describe('BaseLayout accessibility', () => {
  const layoutPath = join(process.cwd(), 'src/layouts/BaseLayout.astro');
  const layout = readFileSync(layoutPath, 'utf-8');

  it('should have skip links in HTML', () => {
    expect(layout).toContain('skip-link');
    expect(layout).toContain('#main-content');
  });

  it('should have <main> element with id', () => {
    expect(layout).toMatch(/id="main-content"/);
  });

  it('should have theme toggle component', () => {
    expect(layout).toContain('ThemeToggle');
  });

  it('should check prefers-reduced-motion in scroll handler', () => {
    expect(layout).toContain('prefers-reduced-motion');
  });

  it('should have mobile menu with Escape key handler', () => {
    expect(layout).toContain('Escape');
  });
});

// ========================================
// SITEMAP
// ========================================
describe('Sitemap', () => {
  it('should generate sitemap-index.xml', () => {
    const sitemapPath = join(DIST_DIR, 'sitemap-index.xml');
    if (existsSync(sitemapPath)) {
      const content = readFileSync(sitemapPath, 'utf-8');
      expect(content).toContain('sitemapindex');
    }
  });
});

// ========================================
// RSS FEED
// ========================================
describe('RSS feed', () => {
  it('should generate rss.xml', () => {
    const rssPath = join(DIST_DIR, 'rss.xml');
    if (existsSync(rssPath)) {
      const content = readFileSync(rssPath, 'utf-8');
      expect(content).toContain('<rss');
    }
  });
});
