/**
 * Everything the chrome needs to know about this site, in one place.
 *
 * The wordmark is capitalised throughout — "Nyuchi Learning" — to match
 * nyuchi.com and the rest of the ecosystem. A lowercase spelling anywhere in
 * src/ fails tests/branding.test.ts.
 */

export const site = {
  name: "Nyuchi Learning",
  wordmark: "Nyuchi Learning",
  url: "https://learning.nyuchi.com",
  parent: { name: "Nyuchi Africa", url: "https://nyuchi.com" },
  description:
    "The Nyuchi Learning surface: training programmes, the open Bundu Education frameworks, and the classroom tools Nyuchi Web Services builds for schools.",
} as const;

export type NavLink = { label: string; href: string; external?: boolean };

export const primaryNav: NavLink[] = [
  { label: "Tools", href: "/toddle-enhancement-extension" },
  { label: "Programmes", href: "https://nyuchi.com/learning", external: true },
  { label: "Frameworks", href: "https://bundu.org/education", external: true },
  { label: "Languages", href: "https://mukoko.com/lingo", external: true },
];

export const headerCta: NavLink = {
  label: "Talk to us",
  href: "https://nyuchi.com/contact",
  external: true,
};

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Learning",
    links: [
      {
        label: "Programmes",
        href: "https://nyuchi.com/learning",
        external: true,
      },
      {
        label: "Frameworks",
        href: "https://bundu.org/education",
        external: true,
      },
      { label: "Languages", href: "https://mukoko.com/lingo", external: true },
    ],
  },
  {
    title: "Tools",
    links: [
      {
        label: "Toddle Enhancement Extension",
        href: "/toddle-enhancement-extension",
      },
      {
        label: "Deploy to a school",
        href: "/toddle-enhancement-extension#install",
      },
      { label: "Get in touch", href: "mailto:support@nyuchi.com" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Nyuchi Africa", href: "https://nyuchi.com", external: true },
      {
        label: "Web Services",
        href: "https://nyuchi.com/products/web-services",
        external: true,
      },
      { label: "Contact", href: "https://nyuchi.com/contact", external: true },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Bundu Foundation", href: "https://bundu.org", external: true },
      {
        label: "Bundu Education",
        href: "https://bundu.org/education",
        external: true,
      },
      { label: "Mukoko", href: "https://mukoko.com", external: true },
    ],
  },
];

export const legalLinks: NavLink[] = [
  {
    label: "Privacy",
    href: "https://nyuchi.com/legal/privacy",
    external: true,
  },
  { label: "Terms", href: "https://nyuchi.com/legal/terms", external: true },
  { label: "Sitemap", href: "/sitemap-index.xml" },
];

/** The seven African minerals, in the canonical strip order. */
export const MINERALS = [
  "cobalt",
  "tanzanite",
  "malachite",
  "gold",
  "terracotta",
  "sodalite",
  "copper",
] as const;

/**
 * The Toddle Enhancement Extension, described once.
 *
 * The source repository is private, so nothing here links to GitHub — a
 * private repo returns 404 to the public, and a dead "Download" is worse than
 * an honest "not yet".
 *
 * `webStore` is the single switch. While it is null the page offers to put
 * people on the list; set it to the listing URL and the same page becomes a
 * download page, with no other edit needed.
 */
export const toddleExtension = {
  name: "Toddle Enhancement Extension",
  tagline:
    "The Toddle gradebook, with the views it is missing — and a way to project it.",
  /** Set to the Chrome Web Store listing URL once it is live. */
  webStore: null as string | null,
  supportEmail: "support@nyuchi.com",
  /** Mailto used while there is no store listing, and for school enquiries. */
  enquiry: "mailto:support@nyuchi.com?subject=Toddle%20Enhancement%20Extension",
} as const;
