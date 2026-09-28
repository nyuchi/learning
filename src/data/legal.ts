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
  updated: "2026-09-28",
  entity: "Nyuchi Africa (Private) Limited",
  shortEntity: "Nyuchi",
  country: "Zimbabwe",
  supportEmail: "support@nyuchi.com",
  privacyEmail: "support@nyuchi.com",
  helpCentre: "https://support.nyuchi.com",
} as const;

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
    includes: [
      "Every assessment tool expanded into columns",
      "CSV export",
      "Hiding student flags",
    ],
  },
  {
    name: "Organisation",
    price: "US$49.99",
    period: "per year",
    who: "A school. Keys issued per teacher.",
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
      "It reads gradebook data through Toddle's own interface, reusing the session you are already signed in with. Write operations are blocked outright rather than merely avoided, so it cannot change your gradebook even by accident.",
  },
  {
    claim: "It never sees your password.",
    detail:
      "Authentication stays inside Toddle's own page. The part of the extension that draws the interface cannot read the authentication token, by design.",
  },
  {
    claim: "Nothing is transmitted to us, or to anyone.",
    detail:
      "There is no server, no account, no analytics, no telemetry, no advertising and no remote code. No student data, no teacher data and no school data leaves your browser.",
  },
  {
    claim: "The only things stored are a preference and your licence key.",
    detail:
      "Whether you have turned the flag-hiding switch on, and the licence key if you have bought one. Both are stored in your own browser and neither is sent anywhere.",
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
