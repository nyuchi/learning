import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

/**
 * RSS Feed for Nyuchi Learning Blog
 *
 * Provides an RSS 2.0 feed of all blog posts for feed readers and aggregators.
 * Supports AIO (AI Optimization) by making content easily accessible to AI systems.
 *
 * @see https://docs.astro.build/en/guides/rss/
 */

// Static blog posts (same as blog index)
const blogPosts = [
  {
    slug: 'developing-world-educational-advantage',
    title: "The Developing World's Educational Advantage: Building Digital Campuses That Close Skills Gaps",
    description: "Africa and the developing world can leapfrog traditional educational models by building digital-first learning environments optimized for the 2050 workplace from day one.",
    pubDate: new Date('2025-11-16'),
    author: 'Framework Team',
    categories: ['education', 'digital transformation', 'skills gap', 'developing countries', 'innovation']
  },
  {
    slug: 'launching-the-framework',
    title: 'Launching the African Education Digital Framework',
    description: "Introducing a comprehensive blueprint for digital transformation in K-12 schools across Africa. Learn about the framework's vision, principles, and implementation strategies for preparing students for 2050.",
    pubDate: new Date('2025-10-26'),
    author: 'Framework Team',
    categories: ['digital transformation', 'K-12 education', 'Africa', 'educational technology', 'framework launch']
  },
  {
    slug: 'why-open-source',
    title: 'Why Open-Source Matters for African Schools',
    description: 'Discover how open-source software can save African schools 60-80% on infrastructure costs while providing world-class educational technology. A guide to cost-effective digital transformation.',
    pubDate: new Date('2025-10-25'),
    author: 'Framework Team',
    categories: ['open source', 'cost savings', 'educational technology', 'Africa', 'school infrastructure']
  },
  {
    slug: 'digital-literacy-importance',
    title: 'Digital Literacy: More Than Just Using Technology',
    description: 'True digital literacy goes beyond teaching tools—it develops critical thinking skills for navigating evolving technology. Learn how to prepare students for a future of constant technological change.',
    pubDate: new Date('2025-10-24'),
    author: 'Framework Team',
    categories: ['digital literacy', 'critical thinking', 'education technology', 'future skills', 'digital citizenship']
  }
];

export async function GET(context: APIContext) {
  return rss({
    // Channel metadata
    title: 'Nyuchi Learning - Framework Insights & Updates',
    description: 'Insights on digital transformation in African education. Implementation strategies, success stories, digital literacy best practices, and open-source technology for schools.',
    site: context.site?.toString() || 'https://learning.nyuchi.com',

    // Feed items
    items: blogPosts.map((post) => ({
      title: post.title,
      pubDate: post.pubDate,
      description: post.description,
      link: `/blog/${post.slug}/`,
      author: `hello@nyuchi.com (${post.author})`,
      categories: post.categories,
      customData: `
        <language>en</language>
        <dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">${post.author}</dc:creator>
      `
    })),

    // Custom XML for enhanced compatibility
    customData: `
      <language>en</language>
      <copyright>Copyright ${new Date().getFullYear()} Nyuchi Learning. Open framework, freely shareable under CC BY-SA 4.0.</copyright>
      <managingEditor>hello@nyuchi.com (Nyuchi Learning Team)</managingEditor>
      <webMaster>hello@nyuchi.com (Nyuchi Learning Team)</webMaster>
      <category>Education</category>
      <category>Educational Technology</category>
      <category>Digital Transformation</category>
      <category>Africa</category>
      <generator>Astro</generator>
      <docs>https://www.rssboard.org/rss-specification</docs>
      <ttl>60</ttl>
      <image>
        <url>https://learning.nyuchi.com/og-image.png</url>
        <title>Nyuchi Learning</title>
        <link>https://learning.nyuchi.com</link>
        <width>144</width>
        <height>144</height>
        <description>K-12 Digital Campus Framework</description>
      </image>
      <atom:link href="https://learning.nyuchi.com/rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom"/>
    `,

    // XML stylesheet for browser viewing
    stylesheet: '/rss-styles.xsl',
  });
}
