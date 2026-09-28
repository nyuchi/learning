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
} as const;

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
    claim: "The only thing stored is one preference.",
    detail:
      "Whether you have turned the flag-hiding switch on. It is stored in your own browser and is never sent anywhere.",
  },
  {
    claim: "Exports are local.",
    detail:
      "The CSV export is generated in your browser and saved by your browser, to wherever your downloads go. It does not pass through any service of ours.",
  },
] as const;
