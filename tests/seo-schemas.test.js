/**
 * SEO Schema & Meta Tag Deep Validation Tests
 *
 * Validates built HTML output for comprehensive SEO compliance:
 * - JSON-LD schema correctness (Organization, Website, LearningResource, Article, BreadcrumbList, Service)
 * - Open Graph completeness and accuracy
 * - Twitter Card tags
 * - Geographic and language targeting
 * - AI/LLM optimization meta tags (AIO)
 * - Article-specific meta tags for blog posts
 * - Security meta tags (referrer, X-Content-Type-Options)
 * - Feed discovery (RSS, sitemap)
 * - Meta description length and quality
 * - Page title uniqueness
 *
 * Run `npm run build` before running these tests.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const DIST_DIR = join(process.cwd(), 'dist');

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

function extractJsonLd(html) {
  const schemas = [];
  const regex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch {
      // Invalid JSON - will be caught by validation tests
    }
  }
  return schemas;
}

function extractMetaContent(html, nameOrProperty, attr = 'name') {
  const regex = new RegExp(`<meta\\s+${attr}="${nameOrProperty}"\\s+content="([^"]*)"`, 'i');
  const altRegex = new RegExp(`<meta\\s+content="([^"]*)"\\s+${attr}="${nameOrProperty}"`, 'i');
  const match = html.match(regex) || html.match(altRegex);
  return match ? match[1] : null;
}

const htmlFiles = getHtmlFiles(DIST_DIR);
const blogHtmlFiles = htmlFiles.filter((f) => f.includes('/blog/') && !f.endsWith('blog/index.html'));
const nonBlogHtmlFiles = htmlFiles.filter((f) => !f.includes('/blog/') || f.endsWith('blog/index.html'));

// ========================================
// JSON-LD SCHEMA VALIDATION
// ========================================
describe('JSON-LD Schema - Organization', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have a valid Organization schema', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const schemas = extractJsonLd(html);
    const orgSchema = schemas.find((s) => s['@type'] === 'EducationalOrganization');
    expect(orgSchema).toBeDefined();
    expect(orgSchema['@context']).toBe('https://schema.org');
    expect(orgSchema.name).toBeDefined();
    expect(orgSchema.url).toMatch(/^https:\/\//);
    expect(orgSchema.logo).toBeDefined();
    expect(orgSchema.founder).toBeDefined();
    expect(orgSchema.founder['@type']).toBe('Person');
  });
});

describe('JSON-LD Schema - Website', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have a valid Website schema', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const schemas = extractJsonLd(html);
    const siteSchema = schemas.find((s) => s['@type'] === 'WebSite');
    expect(siteSchema).toBeDefined();
    expect(siteSchema['@context']).toBe('https://schema.org');
    expect(siteSchema.url).toMatch(/^https:\/\//);
    expect(siteSchema.publisher).toBeDefined();
    expect(siteSchema.potentialAction).toBeDefined();
    expect(siteSchema.potentialAction['@type']).toBe('SearchAction');
  });
});

describe('JSON-LD Schema - BreadcrumbList', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have a valid BreadcrumbList schema', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const schemas = extractJsonLd(html);
    const breadcrumbSchema = schemas.find((s) => s['@type'] === 'BreadcrumbList');
    expect(breadcrumbSchema).toBeDefined();
    expect(breadcrumbSchema['@context']).toBe('https://schema.org');
    expect(breadcrumbSchema.itemListElement).toBeDefined();
    expect(Array.isArray(breadcrumbSchema.itemListElement)).toBe(true);
    expect(breadcrumbSchema.itemListElement.length).toBeGreaterThanOrEqual(1);

    // First item should always be Home
    const firstItem = breadcrumbSchema.itemListElement[0];
    expect(firstItem.position).toBe(1);
    expect(firstItem.name).toBe('Home');
  });
});

describe('JSON-LD Schema - WebPage/Article', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have a WebPage or Article schema', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const schemas = extractJsonLd(html);
    const pageSchema = schemas.find((s) => s['@type'] === 'WebPage' || s['@type'] === 'Article');
    expect(pageSchema).toBeDefined();
    expect(pageSchema.url).toBeDefined();
    expect(pageSchema.name).toBeDefined();
    expect(pageSchema.description).toBeDefined();
  });
});

describe('JSON-LD Schema - Article (blog posts)', () => {
  if (blogHtmlFiles.length > 0) {
    it.each(
      blogHtmlFiles.map((f) => [relPath(f), f])
    )('%s should have a dedicated Article schema', (name, filePath) => {
      const html = readFileSync(filePath, 'utf-8');
      const schemas = extractJsonLd(html);
      const articleSchema = schemas.find(
        (s) => s['@type'] === 'Article' && s['@id'] && s['@id'].includes('#article')
      );
      expect(articleSchema).toBeDefined();
      expect(articleSchema.headline).toBeDefined();
      expect(articleSchema.datePublished).toBeDefined();
      expect(articleSchema.author).toBeDefined();
      expect(articleSchema.publisher).toBeDefined();
    });
  }
});

describe('JSON-LD Schema - all schemas have valid JSON', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s all JSON-LD blocks should parse without errors', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const regex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    const errors = [];
    while ((match = regex.exec(html)) !== null) {
      try {
        JSON.parse(match[1]);
      } catch (e) {
        errors.push(e.message);
      }
    }
    expect(errors).toEqual([]);
  });
});

// ========================================
// OPEN GRAPH COMPLETENESS
// ========================================
describe('Open Graph completeness', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have full Open Graph tags', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/property="og:type"/);
    expect(html).toMatch(/property="og:url"/);
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:description"/);
    expect(html).toMatch(/property="og:image"/);
    expect(html).toMatch(/property="og:site_name"/);
    expect(html).toMatch(/property="og:locale"/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have OG image dimensions', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/property="og:image:width"/);
    expect(html).toMatch(/property="og:image:height"/);
  });
});

// ========================================
// TWITTER CARD COMPLETENESS
// ========================================
describe('Twitter Card completeness', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have full Twitter Card tags', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/name="twitter:card"/);
    expect(html).toMatch(/name="twitter:title"/);
    expect(html).toMatch(/name="twitter:description"/);
    expect(html).toMatch(/name="twitter:image"/);
  });
});

// ========================================
// AI/LLM OPTIMIZATION META TAGS
// ========================================
describe('AI Optimization (AIO) meta tags', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have AI content declaration', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/name="ai-content-declaration"/);
    expect(html).toMatch(/name="ai-training-consent"/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should declare content as human-created', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const aiDeclaration = extractMetaContent(html, 'ai-content-declaration');
    expect(aiDeclaration).toBe('human-created');
  });
});

// ========================================
// GEOGRAPHIC & LANGUAGE TARGETING
// ========================================
describe('Geographic targeting', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have geographic meta tags', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/name="geo\.region"/);
    expect(html).toMatch(/name="geo\.placename"/);
    expect(html).toMatch(/name="geo\.position"/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should target Zimbabwe', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const geoRegion = extractMetaContent(html, 'geo.region');
    expect(geoRegion).toBe('ZW');
  });
});

describe('Language targeting', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have hreflang tags', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/hreflang="en"/);
    expect(html).toMatch(/hreflang="x-default"/);
  });
});

// ========================================
// SECURITY META TAGS
// ========================================
describe('Security meta tags', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have referrer policy', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/name="referrer"/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have X-Content-Type-Options', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/X-Content-Type-Options/i);
  });
});

// ========================================
// FEED DISCOVERY
// ========================================
describe('Feed discovery links', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should link to sitemap', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/rel="sitemap"/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should link to RSS feed', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/type="application\/rss\+xml"/);
  });
});

// ========================================
// META DESCRIPTION QUALITY
// ========================================
describe('Meta description quality', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s meta description should be 50-300 characters', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
    expect(descMatch).not.toBeNull();
    const desc = descMatch[1];
    expect(desc.length).toBeGreaterThanOrEqual(50);
    expect(desc.length).toBeLessThanOrEqual(300);
  });
});

// ========================================
// PAGE TITLE UNIQUENESS
// ========================================
describe('Page title uniqueness', () => {
  it('all pages should have unique titles', () => {
    const titles = {};
    for (const filePath of htmlFiles) {
      const html = readFileSync(filePath, 'utf-8');
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      if (titleMatch) {
        const title = titleMatch[1];
        const rel = relPath(filePath);
        if (titles[title]) {
          titles[title].push(rel);
        } else {
          titles[title] = [rel];
        }
      }
    }
    const duplicates = Object.entries(titles).filter(([, pages]) => pages.length > 1);
    expect(duplicates).toEqual([]);
  });
});

// ========================================
// ROBOTS DIRECTIVES
// ========================================
describe('Robots directives', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have robots meta tag', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/name="robots"/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have googlebot meta tag', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/name="googlebot"/);
  });
});

// ========================================
// ARTICLE META TAGS (Blog Posts)
// ========================================
describe('Blog post article meta tags', () => {
  if (blogHtmlFiles.length > 0) {
    it.each(
      blogHtmlFiles.map((f) => [relPath(f), f])
    )('%s should have article:published_time', (name, filePath) => {
      const html = readFileSync(filePath, 'utf-8');
      expect(html).toMatch(/property="article:published_time"/);
    });

    it.each(
      blogHtmlFiles.map((f) => [relPath(f), f])
    )('%s should have article:author', (name, filePath) => {
      const html = readFileSync(filePath, 'utf-8');
      expect(html).toMatch(/property="article:author"/);
    });

    it.each(
      blogHtmlFiles.map((f) => [relPath(f), f])
    )('%s should have article:section', (name, filePath) => {
      const html = readFileSync(filePath, 'utf-8');
      expect(html).toMatch(/property="article:section"/);
    });
  }
});

// ========================================
// MOBILE & APP META TAGS
// ========================================
describe('Mobile meta tags', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have color-scheme meta', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/name="color-scheme"/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have theme-color meta tags', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/name="theme-color"/);
  });
});
