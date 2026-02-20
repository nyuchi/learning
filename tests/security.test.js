/**
 * Security Compliance Tests
 *
 * Validates security practices for the static site:
 * - No hardcoded secrets or API keys in source files
 * - External links use rel="noopener noreferrer"
 * - robots.txt and llms.txt correctness
 * - Security meta tags in HTML output
 * - No inline event handlers (XSS prevention)
 * - Referrer policy
 * - Content type protection
 * - SECURITY.md existence
 *
 * Tests both source files and built output.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const SRC_DIR = join(process.cwd(), 'src');
const DIST_DIR = join(process.cwd(), 'dist');
const PUBLIC_DIR = join(process.cwd(), 'public');

function getAllSourceFiles(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllSourceFiles(fullPath, files);
    } else if (/\.(astro|ts|tsx|js|jsx|css)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

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

const sourceFiles = getAllSourceFiles(SRC_DIR);
const htmlFiles = getHtmlFiles(DIST_DIR);

// ========================================
// NO HARDCODED SECRETS
// ========================================
describe('No hardcoded secrets in source', () => {
  const secretPatterns = [
    { name: 'AWS Access Key', pattern: /AKIA[0-9A-Z]{16}/ },
    { name: 'Generic API Key', pattern: /(?:api[_-]?key|apikey)\s*[:=]\s*['"][A-Za-z0-9_\-]{20,}['"]/i },
    { name: 'Generic Secret', pattern: /(?:secret|password|passwd|token)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/i },
    { name: 'Private Key', pattern: /-----BEGIN (?:RSA |EC |DSA )?PRIVATE KEY-----/ },
    { name: 'JWT Token', pattern: /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/ },
  ];

  it.each(
    sourceFiles.map((f) => [relPath(f), f])
  )('%s should not contain hardcoded secrets', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    for (const { name: patternName, pattern } of secretPatterns) {
      const match = content.match(pattern);
      expect(match, `Found potential ${patternName}`).toBeNull();
    }
  });
});

// ========================================
// NO SENSITIVE FILES TRACKED
// ========================================
describe('No sensitive files in project', () => {
  const sensitiveFiles = ['.env', '.env.local', '.env.production', 'credentials.json', 'service-account.json'];

  it.each(sensitiveFiles)('%s should not exist in project root', (filename) => {
    expect(existsSync(join(process.cwd(), filename))).toBe(false);
  });
});

// ========================================
// EXTERNAL LINKS SECURITY
// ========================================
describe('External link security in built HTML', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s external links with target="_blank" should have rel="noopener"', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    // Find all <a> tags with target="_blank"
    const blankLinks = html.match(/<a\s[^>]*target="_blank"[^>]*>/gi) || [];
    const violations = blankLinks.filter((link) => !link.includes('noopener'));
    expect(violations).toEqual([]);
  });
});

// ========================================
// SECURITY META TAGS
// ========================================
describe('Security meta tags in HTML', () => {
  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have referrer policy meta tag', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/name="referrer"\s+content="strict-origin-when-cross-origin"/);
  });

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should have X-Content-Type-Options meta tag', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    expect(html).toMatch(/content="nosniff"/i);
  });
});

// ========================================
// ROBOTS.TXT VALIDATION
// ========================================
describe('robots.txt', () => {
  const robotsPath = join(PUBLIC_DIR, 'robots.txt');

  it('should exist', () => {
    expect(existsSync(robotsPath)).toBe(true);
  });

  it('should allow all crawlers by default', () => {
    const content = readFileSync(robotsPath, 'utf-8');
    expect(content).toMatch(/User-agent:\s*\*[\s\S]*?Allow:\s*\//);
  });

  it('should disallow /api/ and /_astro/', () => {
    const content = readFileSync(robotsPath, 'utf-8');
    expect(content).toContain('Disallow: /api/');
    expect(content).toContain('Disallow: /_astro/');
  });

  it('should disallow /404', () => {
    const content = readFileSync(robotsPath, 'utf-8');
    expect(content).toContain('Disallow: /404');
  });

  it('should reference the sitemap', () => {
    const content = readFileSync(robotsPath, 'utf-8');
    expect(content).toMatch(/Sitemap:\s*https:\/\/learning\.nyuchi\.com\/sitemap-index\.xml/);
  });

  it('should allow AI/LLM crawlers', () => {
    const content = readFileSync(robotsPath, 'utf-8');
    expect(content).toContain('GPTBot');
    expect(content).toContain('Claude-Web');
    expect(content).toContain('CCBot');
    expect(content).toContain('PerplexityBot');
  });

  it('should allow social media crawlers', () => {
    const content = readFileSync(robotsPath, 'utf-8');
    expect(content).toContain('Twitterbot');
    expect(content).toContain('LinkedInBot');
    expect(content).toContain('facebookexternalhit');
    expect(content).toContain('WhatsApp');
  });
});

// ========================================
// LLMS.TXT VALIDATION
// ========================================
describe('llms.txt', () => {
  const llmsPath = join(PUBLIC_DIR, 'llms.txt');

  it('should exist', () => {
    expect(existsSync(llmsPath)).toBe(true);
  });

  it('should contain site description', () => {
    const content = readFileSync(llmsPath, 'utf-8');
    expect(content).toMatch(/Nyuchi Learning/i);
  });

  it('should list available resources', () => {
    const content = readFileSync(llmsPath, 'utf-8');
    expect(content).toContain('/framework');
    expect(content).toContain('/digital-literacy-framework');
    expect(content).toContain('/resources');
    expect(content).toContain('/blog');
  });

  it('should include contact information', () => {
    const content = readFileSync(llmsPath, 'utf-8');
    expect(content).toContain('hello@nyuchi.com');
  });

  it('should include licensing information', () => {
    const content = readFileSync(llmsPath, 'utf-8');
    expect(content).toMatch(/CC BY-SA 4\.0/);
  });
});

// ========================================
// SECURITY.MD EXISTS
// ========================================
describe('Security documentation', () => {
  it('SECURITY.md should exist', () => {
    expect(existsSync(join(process.cwd(), 'SECURITY.md'))).toBe(true);
  });
});

// ========================================
// NO INLINE EVENT HANDLERS (XSS Prevention)
// ========================================
describe('No inline event handlers in HTML (XSS prevention)', () => {
  const dangerousHandlers = ['onclick', 'onerror', 'onload', 'onmouseover', 'onfocus', 'onblur'];

  it.each(
    htmlFiles.map((f) => [relPath(f), f])
  )('%s should not use inline event handlers (except safe Astro patterns)', (name, filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const violations = [];

    for (const handler of dangerousHandlers) {
      // Match handler in HTML attributes, excluding script blocks
      const regex = new RegExp(`<[^>]*\\s${handler}="[^"]*"[^>]*>`, 'gi');
      const matches = html.match(regex) || [];
      // Filter out safe img onerror patterns (used for avatar fallback)
      const unsafe = matches.filter((m) => {
        // Allow onerror on img tags (common fallback pattern)
        if (handler === 'onerror' && /<img\s/.test(m)) return false;
        return true;
      });
      violations.push(...unsafe.map((m) => `${handler}: ${m.substring(0, 100)}`));
    }

    expect(violations).toEqual([]);
  });
});
