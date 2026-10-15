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
    "The Nyuchi Learning surface: training programmes, the open Bundu Education frameworks, Mukoko Lingo for languages, and the classroom tools Nyuchi Web Services builds for schools.",
} as const;

/**
 * Google Analytics. The id is not a secret — it ships in the page on every site
 * that uses GA — but it lives here rather than in the component so there is one
 * place to change it, and one place to turn it off.
 *
 * `cookieless: true` runs GA with client_storage: "none": no cookies, nothing
 * stored on the device, no consent banner needed. You keep pageviews and
 * events and lose returning-visitor attribution. See components/Analytics.astro.
 */
export const analytics = {
  measurementId: "G-BNHM29F8W5",
  cookieless: false,
} as const;

export type NavLink = { label: string; href: string; external?: boolean };

/**
 * Every legal page, in the order the footer's Legal group lists them.
 * tests/seo.test.ts fails if a built page is missing from the footer. Kept
 * free of function calls so client bundles that import this file can drop it.
 */
export const legalPages: NavLink[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Terms of use and service", href: "/legal/terms" },
  { label: "Data handling", href: "/legal/data" },
  { label: "Student privacy", href: "/legal/student-privacy" },
  { label: "Security", href: "/legal/security" },
  {
    label: "Vulnerability disclosure",
    href: "/legal/vulnerability-disclosure",
  },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Legal notice", href: "/legal/notice" },
];

/* The two products come first, side by side, so they read as Nyuchi
   Learning's own; the ecosystem destinations follow. */
export const primaryNav: NavLink[] = [
  { label: "Toddle extension", href: "/toddle-enhancement-extension" },
  { label: "Mukoko Lingo", href: "/mukoko-lingo" },
  { label: "Programmes", href: "https://nyuchi.com/learning", external: true },
  { label: "Frameworks", href: "https://bundu.org/education", external: true },
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
    ],
  },
  {
    title: "Products",
    links: [
      {
        label: "Toddle Enhancement Extension",
        href: "/toddle-enhancement-extension",
      },
      {
        label: "Deploy the extension",
        href: "/toddle-enhancement-extension#install",
      },
      {
        label: "Extension releases",
        href: "/toddle-enhancement-extension/releases",
      },
      { label: "Mukoko Lingo", href: "/mukoko-lingo" },
      { label: "Send feedback", href: "/feedback" },
      { label: "Get in touch", href: "mailto:support@nyuchi.com" },
    ],
  },
  {
    title: "Legal",
    links: legalPages,
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
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Terms", href: "/legal/terms" },
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
 * `webStore` is the single switch: the Chrome Web Store listing. With it set,
 * every call to action is "Add to Chrome". (Set it back to null and the pages
 * fall back to an enquiry, with no other edit.)
 */
/** A link that may not exist yet. Named so that every Prettier version
    formats the cast below the same way. */
type Url = string | null;

export const toddleExtension = {
  name: "Toddle Enhancement Extension",
  tagline:
    "The Toddle gradebook, with the views it is missing — and a way to project it.",
  /** The Chrome Web Store listing (live since version 0.7.1). */
  webStore:
    "https://chromewebstore.google.com/detail/ofliokikjmkkdkinbdnadbjjdmkjdjfi" as Url,
  /** The store item ID, which a school's IT uses to force-install it. */
  extensionId: "ofliokikjmkkdkinbdnadbjjdmkjdjfi",
  supportEmail: "support@nyuchi.com",
  /** Mailto used while there is no store listing, and for school enquiries. */
  enquiry: "mailto:support@nyuchi.com?subject=Toddle%20Enhancement%20Extension",
  /** "How to use the Toddle Enhancement Extension" in Nyuchi's help centre:
      the page the extension's own Help button opens. */
  help: "https://support.nyuchi.com/en/collections/19764027-how-to-use-the-toddle-enhancement-extension",
  /** The Chrome Web Store's update URL, for force-install policies set
      outside the Google Admin console. */
  storeUpdateUrl: "https://clients2.google.com/service/update2/crx",
  /** The licence server's host, which a school's network should allow. */
  licenceHost: "licenses.nyuchi.com",
} as const;

/**
 * Mukoko Lingo, described once: a partner app developed by Nyuchi Learning.
 * Part of Mukoko by Nyuchi.
 *
 * Every fact here comes from Lingo's own public repository
 * (mukoko-dev/mukoko-lingo on GitHub: README.md, app.json, BRANDING.md and
 * the app's own copy in lib/data/translations.ts). Nothing is added that the
 * repository does not say. In particular there is no app store link and no
 * school price here, because the repository has neither; add them when they
 * exist. The source link lives on the page itself (src/pages/mukoko-lingo.astro):
 * tests/links.test.ts keeps GitHub links out of this file, because the
 * extension's repository is private.
 *
 * Positioning (owner, 2026-10-15): Nyuchi Learning leads with organisations,
 * business (B2B) and government (B2G) as well as schools, so the page and
 * the enquiry are written for them first.
 */
export const mukokoLingo = {
  name: "Mukoko Lingo",
  tagline:
    "AI-assisted, skills-based language learning for individuals, schools, businesses and government across Africa.",
  /** The live app, as the repository's README names it. */
  url: "https://lingo.mukoko.com",
  /** The console for organisations: schools, businesses, government and admins. */
  console: "https://lingo.nyuchi.com/console",
  /** The four languages the repository calls canonical. */
  languages: ["Shona", "Ndebele", "English", "Chinese"],
  /** Languages in beta (owner, 2026-10-15): in the app, shown as beta. */
  betaLanguages: ["Swahili"],
  /** BCP 47 codes for the four supported languages, for structured data. */
  languageCodes: ["sn", "nd", "en", "zh"],
  /** Enquiries from schools, businesses and government. */
  enquiry: "mailto:support@nyuchi.com?subject=Mukoko%20Lingo",
} as const;

/**
 * The feedback form posts to Formspree, which emails each submission to Nyuchi.
 * The site stays static: there is no endpoint of ours to run or secure.
 *
 * `thanks` is where a visitor lands afterwards. With JavaScript the page sends
 * the form itself and moves there on success, which works on any Formspree
 * plan. Without JavaScript the browser posts directly, and Formspree honours
 * the `_next` redirect only on paid plans — on the free plan it shows its own
 * thank-you page instead.
 */
export const feedback = {
  endpoint: "https://formspree.io/f/xdekjwvj",
  subject: "Nyuchi Learning feedback",
  thanks: "/feedback/thanks",
  topics: [
    "Toddle Enhancement Extension",
    "An idea for the extension",
    "Something that is not working",
    "This website",
    "Something else",
  ],
  maxLength: 5000,
} as const;
