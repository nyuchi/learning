/**
 * Facts the legal pages are built from, in one place.
 *
 * The privacy policy and the Chrome Web Store privacy form have to agree with
 * each other and with the code, and the store explicitly certifies that they
 * do. Keeping the claims here means the two pages cannot drift apart, and
 * means a change to what the extension does is a change to one file.
 */

export const legal = {
  /** Last substantive change. Update when a claim below changes, not on typos. */
  updated: "2026-10-01",
  entity: "Nyuchi Africa (Private) Limited",
  shortEntity: "Nyuchi",
  country: "Zimbabwe",
  supportEmail: "support@nyuchi.com",
  privacyEmail: "support@nyuchi.com",
  helpCentre: "https://support.nyuchi.com",
  /* The support messenger's workspace id. Public by design — it is in the
     snippet on every site that uses Intercom, and identifies the workspace, not
     a person. It lives here rather than in the component because it is a fact
     about the same integration the privacy policy describes and the CSP allows. */
  support: { intercomAppId: "f1vga504" },
} as const;

/** The date above as people write it: "1 October 2026". */
export const updatedLabel = new Date(
  `${legal.updated}T00:00:00Z`,
).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Pricing. In one place because it appears on the product page, in the terms,
 * and in the help centre, and three copies of a price is how one of them ends
 * up wrong.
 */
export const pricing = [
  {
    name: "Individual",
    price: "US$5",
    period: "per year",
    who: "One teacher.",
    /** Checkout. Buy Me a Coffee for now; the key is issued by email. */
    buy: "https://buymeacoffee.com/bryany/e/581737",
    includes: [
      "Every assessment tool expanded into per-criterion columns",
      "CSV export",
      "The student sidebar",
      "Primary teacher names",
    ],
  },
  {
    name: "Organisation",
    price: "US$49.99",
    period: "per year",
    who: "A school. Keys issued per teacher.",
    buy: "https://buymeacoffee.com/bryany/e/581738",
    includes: [
      "Everything in Individual, for your whole staff",
      "Managed rollout through the Google Admin console",
      "Invoice, and a named contact for support",
    ],
  },
] as const;

/**
 * What the extension does with data. Each of these is a claim that can be
 * checked against the source, and each maps to an answer on the Chrome Web
 * Store privacy form.
 */
export const extensionDataFacts = [
  {
    claim: "It runs only on Toddle.",
    detail:
      "The extension is declared against https://web.toddleapp.com only. It has no access to any other website, and takes no action anywhere else.",
  },
  {
    claim: "It reads; it does not write.",
    detail:
      "It reads what Toddle already shows you — gradebook results, class staff, student details — through Toddle's own interface, reusing the session you are already signed in with. Write operations are blocked outright rather than merely avoided, so it cannot change your gradebook even by accident.",
  },
  {
    claim: "It never sees your password.",
    detail:
      "Authentication stays inside Toddle's own page. The part of the extension that draws the interface cannot read the authentication token, by design.",
  },
  {
    claim: "It sends nothing anywhere on its own.",
    detail:
      "There is no server, no account, no analytics, no telemetry, no tracking, no advertising and no remote code. No student data, no teacher data and no school data leaves your browser. It reads Toddle for the teacher at the screen, and for no one else.",
  },
  {
    claim: "One exception, and only when you choose it: feedback.",
    detail:
      "The toolbar menu has a Send feedback form. Press Send and it sends what you typed — a topic, your message, and an email address only if you enter one — plus the extension's version number, to our feedback form, processed by Formspree. Nothing from Toddle is ever included: no student data, no page address, no licence key. If you never press Send, nothing is ever sent. The detail is below.",
  },
  {
    claim: "The welcome page sends nothing.",
    detail:
      "When you first install it, the extension opens a welcome page. That page is part of the extension itself, not a website, and loading it contacts nothing.",
  },
  {
    claim: "The only things stored are your settings and your licence key.",
    detail:
      "Your switch preferences — student flags shown or hidden, the student sidebar, primary teacher names, the My classes filter — and the licence key if you have one. All of it is stored on your own machine, and none of it is sent anywhere.",
  },
  {
    claim: "Your licence is checked on your machine, not by asking us.",
    detail:
      "A licence key is a signed statement that the extension verifies locally. Activating one contacts nothing, which is why it works without a connection — and why buying a licence does not start the extension talking to us.",
  },
  {
    claim: "Exports are local.",
    detail:
      "The CSV export is generated in your browser and saved by your browser, to wherever your downloads go. It does not pass through any service of ours.",
  },
] as const;
