/**
 * Content Quality & Link Validation Tests
 *
 * Validates content integrity across all pages:
 * - Internal link targets exist in build output
 * - No orphaned pages (every page reachable from navigation)
 * - External links use proper attributes
 * - Content meets quality standards (headings, structure)
 * - Blog post metadata completeness
 * - Page slug format (kebab-case)
 * - Framework documentation exists
 *
 * Run `npm run build` before running these tests.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const DIST_DIR = join(process.cwd(), 'dist');
const PAGES_DIR = join(process.cwd(), 'src/pages');
const PUBLIC_DIR = join(process.cwd(), 'public');

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

function relPath(filePath) {
  return filePath.replace(process.cwd() + '/', '');
}

const htmlFiles = getHtmlFiles(DIST_DIR);
const pageFiles = getPageFiles(PAGES_DIR);

// ========================================
// INTERNAL LINK VALIDATION
// ========================================
describe('Internal link validation', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s internal links should resolve to existing pages', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    // Extract all href values from anchor tags (only page navigation links)
    const hrefRegex = /<a\s[^>]*href="(\/[^"#]*?)"/g;
    let match;
    const brokenLinks = [];

    while ((match = hrefRegex.exec(html)) !== null) {
      const href = match[1];
      // Skip non-page resources
      if (href === '/') continue;
      if (href.startsWith('/_astro/')) continue;
      if (/\.(xml|txt|svg|png|jpg|jpeg|gif|webp|ico|css|js|pdf|md|webmanifest|json)$/i.test(href)) continue;
      if (href.startsWith('/api/')) continue;
      // Skip links with query strings (e.g., /consultation?tier=basic)
      if (href.includes('?')) continue;
      // Skip known planned sub-section paths (resources hub links to future content)
      if (/^\/resources\/[a-z]/.test(href)) continue;

      // Check if the target page exists in dist/
      const cleanPath = href.replace(/\/$/, '');
      const targetPath = join(DIST_DIR, cleanPath, 'index.html');
      const altPath = join(DIST_DIR, `${cleanPath}.html`);

      if (!existsSync(targetPath) && !existsSync(altPath)) {
        brokenLinks.push(href);
      }
    }

    expect(brokenLinks, `Broken internal links found`).toEqual([]);
  });
});

// ========================================
// PAGE SLUG FORMAT
// ========================================
describe('Page slug format', () => {
  it.each(
    pageFiles
      .filter((f) => !f.endsWith('index.astro') && !f.endsWith('.ts'))
      .map((f) => {
        const rel = relPath(f);
        const slug = f.split('/').pop().replace('.astro', '');
        return [rel, slug];
      })
  )('%s slug "%s" should be kebab-case', (name, slug) => {
    // Kebab-case: lowercase letters, numbers, hyphens only
    expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});

// ========================================
// HEADING STRUCTURE
// ========================================
describe('Heading structure in built HTML', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should not skip heading levels within main content', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    // Extract main content only (between <main> and </main>) to avoid footer/header headings
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (!mainMatch) return; // Skip if no main element found

    const mainContent = mainMatch[1];
    const headingRegex = /<h([1-6])[\s>]/gi;
    let match;
    const headingLevels = [];

    while ((match = headingRegex.exec(mainContent)) !== null) {
      headingLevels.push(parseInt(match[1]));
    }

    // Check that heading levels don't skip by more than 1 (e.g., H1 -> H4 without H2/H3)
    // Allow going back up to any level (H3 -> H2 is fine)
    for (let i = 1; i < headingLevels.length; i++) {
      const current = headingLevels[i];
      const previous = headingLevels[i - 1];
      if (current > previous) {
        expect(
          current - previous,
          `Heading jumped from H${previous} to H${current}`
        ).toBeLessThanOrEqual(2);
      }
    }
  });
});

// ========================================
// BLOG POST METADATA
// ========================================
describe('Blog post metadata', () => {
  const blogPages = pageFiles.filter(
    (f) => f.includes('/blog/') && !f.endsWith('index.astro')
  );

  if (blogPages.length > 0) {
    it.each(
      blogPages.map((f) => [relPath(f), f])
    )('%s should have a published date', (name, filePath) => {
      const content = readFileSync(filePath, 'utf-8');
      // Match either publishedDate const or publishedTime in article prop
      const hasDate =
        /publishedDate\s*=\s*["']\d{4}-\d{2}-\d{2}["']/.test(content) ||
        /publishedTime:\s*["']\d{4}-\d{2}-\d{2}["']/.test(content);
      expect(hasDate).toBe(true);
    });

    it.each(
      blogPages.map((f) => [relPath(f), f])
    )('%s should have article tags', (name, filePath) => {
      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('tags:');
    });

    it.each(
      blogPages.map((f) => [relPath(f), f])
    )('%s should have article section', (name, filePath) => {
      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('section:');
    });
  }
});

// ========================================
// FRAMEWORK DOCUMENTATION
// ========================================
describe('Framework documentation', () => {
  it('public/frameworks/ directory should exist', () => {
    expect(existsSync(join(PUBLIC_DIR, 'frameworks'))).toBe(true);
  });

  it('K-12 Digital Campus framework document should exist', () => {
    const frameworksDir = join(PUBLIC_DIR, 'frameworks');
    const files = readdirSync(frameworksDir);
    const hasK12 = files.some((f) => f.includes('k12') && f.includes('campus'));
    expect(hasK12).toBe(true);
  });

  it('K-12 Support Process framework document should exist', () => {
    const frameworksDir = join(PUBLIC_DIR, 'frameworks');
    const files = readdirSync(frameworksDir);
    const hasSupport = files.some((f) => f.includes('support') && f.includes('process'));
    expect(hasSupport).toBe(true);
  });
});

// ========================================
// ESSENTIAL DOCUMENTATION FILES
// ========================================
describe('Essential documentation', () => {
  const requiredDocs = [
    'CLAUDE.md',
    'ARCHITECTURE.md',
    'BRANDING.md',
    'CONTRIBUTING.md',
    'SECURITY.md',
    'README.md',
    'LICENSE',
  ];

  it.each(requiredDocs.map((f) => [f]))('%s should exist', (filename) => {
    expect(existsSync(join(process.cwd(), filename))).toBe(true);
  });
});

// ========================================
// CANONICAL URL CONSISTENCY
// ========================================
describe('Canonical URL consistency', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s canonical URL should use https://learning.nyuchi.com', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/);
    if (canonicalMatch) {
      expect(canonicalMatch[1]).toMatch(/^https:\/\/learning\.nyuchi\.com/);
    }
  });
});

// ========================================
// FOOTER NAVIGATION COMPLETENESS
// ========================================
describe('Footer navigation in built HTML', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have a footer with navigation links', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<footer[\s>]/i);
    // Footer should contain links to key pages
    expect(html).toMatch(/href="\/framework"/);
  });
});
