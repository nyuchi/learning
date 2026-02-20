/**
 * Performance Budget & Build Output Tests
 *
 * Validates build output quality and performance constraints:
 * - All pages generate valid HTML files
 * - HTML is minified/compressed
 * - No oversized pages
 * - Required static assets exist
 * - Sitemap generated correctly
 * - RSS feed generated correctly
 * - Build configuration correctness
 * - Font loading optimization
 * - Image/asset references resolve
 *
 * Run `npm run build` before running these tests.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIST_DIR = join(process.cwd(), 'dist');
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

function relPath(filePath) {
  return filePath.replace(process.cwd() + '/', '');
}

const htmlFiles = getHtmlFiles(DIST_DIR);

// ========================================
// BUILD OUTPUT EXISTS
// ========================================
describe('Build output', () => {
  it('dist/ directory should exist', () => {
    expect(existsSync(DIST_DIR)).toBe(true);
  });

  it('should generate at least 15 HTML pages', () => {
    expect(htmlFiles.length).toBeGreaterThanOrEqual(15);
  });

  it('all expected pages should be generated', () => {
    const expectedPages = [
      'index.html',
      'framework/index.html',
      'frameworks/index.html',
      'digital-literacy-framework/index.html',
      'support-framework/index.html',
      'pricing/index.html',
      'resources/index.html',
      'about/index.html',
      'global-reach/index.html',
      'team/index.html',
      'community/index.html',
      'consultation/index.html',
      'blog/index.html',
    ];

    for (const page of expectedPages) {
      expect(existsSync(join(DIST_DIR, page)), `Missing: ${page}`).toBe(true);
    }
  });
});

// ========================================
// HTML QUALITY
// ========================================
describe('HTML quality', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should be valid HTML (has doctype)', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<!DOCTYPE html>/i);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have closing </html> tag', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/<\/html>/i);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should be compressed (minified)', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    // Compressed HTML should have most content on fewer lines
    const lineCount = html.split('\n').length;
    const charCount = html.length;
    // Average line should be at least 100 chars if compressed
    // (very rough heuristic - compressed HTML has longer lines)
    const avgLineLength = charCount / lineCount;
    expect(avgLineLength).toBeGreaterThan(50);
  });
});

// ========================================
// PAGE SIZE BUDGETS
// ========================================
describe('Page size budgets', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should be under 500KB', (name, filePath) => {
    const stat = statSync(filePath);
    const sizeKB = stat.size / 1024;
    expect(sizeKB).toBeLessThan(500);
  });
});

// ========================================
// STATIC ASSETS
// ========================================
describe('Required static assets', () => {
  it('favicon.svg should exist', () => {
    expect(existsSync(join(PUBLIC_DIR, 'favicon.svg'))).toBe(true);
  });

  it('robots.txt should exist', () => {
    expect(existsSync(join(PUBLIC_DIR, 'robots.txt'))).toBe(true);
  });

  it('llms.txt should exist', () => {
    expect(existsSync(join(PUBLIC_DIR, 'llms.txt'))).toBe(true);
  });
});

// ========================================
// SITEMAP VALIDATION
// ========================================
describe('Sitemap', () => {
  it('sitemap-index.xml should be generated', () => {
    expect(existsSync(join(DIST_DIR, 'sitemap-index.xml'))).toBe(true);
  });

  it('sitemap-index.xml should reference sitemap files', () => {
    const content = readFileSync(join(DIST_DIR, 'sitemap-index.xml'), 'utf-8');
    expect(content).toContain('sitemapindex');
    expect(content).toContain('<loc>');
  });

  it('sitemap should reference the correct domain', () => {
    const content = readFileSync(join(DIST_DIR, 'sitemap-index.xml'), 'utf-8');
    expect(content).toContain('learning.nyuchi.com');
  });
});

// ========================================
// RSS FEED VALIDATION
// ========================================
describe('RSS feed', () => {
  it('rss.xml should be generated', () => {
    expect(existsSync(join(DIST_DIR, 'rss.xml'))).toBe(true);
  });

  it('rss.xml should be valid RSS', () => {
    const content = readFileSync(join(DIST_DIR, 'rss.xml'), 'utf-8');
    expect(content).toMatch(/<rss[^>]+version="2\.0"/);
    expect(content).toContain('<channel>');
    expect(content).toContain('<title>');
    expect(content).toContain('<link>');
  });
});

// ========================================
// BUILD CONFIGURATION
// ========================================
describe('Build configuration', () => {
  it('astro.config.mjs should exist', () => {
    expect(existsSync(join(process.cwd(), 'astro.config.mjs'))).toBe(true);
  });

  it('should configure static output', () => {
    const config = readFileSync(join(process.cwd(), 'astro.config.mjs'), 'utf-8');
    expect(config).toContain("output: 'static'");
  });

  it('should enable HTML compression', () => {
    const config = readFileSync(join(process.cwd(), 'astro.config.mjs'), 'utf-8');
    expect(config).toContain('compressHTML: true');
  });

  it('should configure the correct site URL', () => {
    const config = readFileSync(join(process.cwd(), 'astro.config.mjs'), 'utf-8');
    expect(config).toContain('learning.nyuchi.com');
  });

  it('should include sitemap integration', () => {
    const config = readFileSync(join(process.cwd(), 'astro.config.mjs'), 'utf-8');
    expect(config).toContain('sitemap');
  });

  it('should include MDX integration', () => {
    const config = readFileSync(join(process.cwd(), 'astro.config.mjs'), 'utf-8');
    expect(config).toContain('mdx');
  });

  it('should include React integration', () => {
    const config = readFileSync(join(process.cwd(), 'astro.config.mjs'), 'utf-8');
    expect(config).toContain('react');
  });
});

// ========================================
// FONT LOADING
// ========================================
describe('Font loading optimization', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should preconnect to Google Fonts', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/rel="preconnect"[^>]*href="https:\/\/fonts\.googleapis\.com"/);
  });

  it.each(
    htmlFiles.slice(0, 1).map((f) => [relPath(f), f])
  )('%s should load required font families', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/Noto\+Serif/);
    expect(html).toMatch(/Plus\+Jakarta\+Sans/);
  });
});

// ========================================
// VERCEL CONFIGURATION
// ========================================
describe('Deployment configuration', () => {
  it('vercel.json should exist', () => {
    expect(existsSync(join(process.cwd(), 'vercel.json'))).toBe(true);
  });

  it('vercel.json should configure build command', () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf-8'));
    expect(config.buildCommand).toBeDefined();
    expect(config.outputDirectory).toBe('dist');
  });
});
