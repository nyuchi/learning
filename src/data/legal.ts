/**
 * Facts the legal pages are built from, in one place.
 *
 * The privacy policy and the Chrome Web Store privacy form have to agree with
 * each other and with the code, and the store explicitly certifies that they
 * do. Keeping the claims here means the two pages cannot drift apart, and
 * means a change to what the extension does is a change to one file.
 */

export const legal = {
  /** Last substantive change, for every legal page. Update when a claim
      changes, not on typos. */
  updated: "2026-10-01",
  entity: "Nyuchi Africa (Private) Limited",
  shortEntity: "Nyuchi",
  country: "Zimbabwe",
  supportEmail: "support@nyuchi.com",
  /** Privacy, data-subject and DPA requests. Support and security reports
      stay on supportEmail. */
  privacyEmail: "privacy@nyuchi.com",
  /** Who runs the site and the extension, day to day. */
  operator: "Nyuchi Web Services",
  /** As given in the company's published shop policies. */
  address: "4 Browning Drive, Strathaven, 3 Straven Court, Harare, Zimbabwe",
  city: "Harare",
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
      "The student sidebar, with where they are now and today's classes",
      "The class view, and message buttons into Toddle's chat",
      "Primary teacher names, and the Attendance dashboard's Now line",
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
      "It reads what Toddle already lets you see — gradebook results, class staff, student details — through Toddle's own interface, reusing the session you are already signed in with. Every request it may send is listed word for word in the extension, and anything else is refused; write operations are blocked outright rather than merely avoided, so it cannot change your gradebook even by accident. Its message buttons open Toddle's own chat window and send nothing themselves: a message is sent, if at all, by you, through Toddle, under your school's messaging rules.",
  },
  {
    claim: "What it reads for the student sidebar, and when.",
    detail:
      "Only when a teacher opens a student or a class, and only for the teacher at the screen: the student's name, photo, year group and age (the date of birth itself is never shown), email, student ID and enrolment date; their contacts' names, relationships, phone numbers and emails; their homeroom advisor; the school's Student Group and Room number fields (other additional fields are never shown); today's timetable and attendance marks; and each class's teachers with their display titles and emails. Toddle answers with what that teacher's own account is allowed to see. Nothing is written to disk: answers are held in the page's memory for a few minutes, then discarded, and are gone when the tab closes.",
  },
  {
    claim: "Student flags stay hidden until someone chooses to show them.",
    detail:
      "Flags are hidden by default across Toddle, on a new install and for anyone who never touched the switch; a staff member shows them deliberately, with the switch or with the eye button for one student. The extension's own sidebar fetches a student's flags from Toddle only when someone chooses to show them, and forgets them when the sidebar closes. The flag switch is free and always will be.",
  },
  {
    claim: "It never sees your password.",
    detail:
      "Authentication stays inside Toddle's own page. The part of the extension that draws the interface cannot read the authentication token, by design.",
  },
  {
    claim: "Nothing it reads leaves your browser.",
    detail:
      "There is no account, no analytics, no telemetry, no tracking, no advertising and no remote code. No student data, no teacher data and no school data leaves your browser: what it reads from Toddle goes back to Toddle's own screen and nowhere else. It reads Toddle for the teacher at the screen, and for no one else. It makes two connections outside Toddle, described next, and neither carries anything from Toddle.",
  },
  {
    claim: "Outside connection one, only when you choose it: feedback.",
    detail:
      "The toolbar menu has a Send feedback form. Press Send and it sends what you typed — a topic, your message, and an email address only if you enter one — plus the extension's version number, to our feedback form, processed by Formspree. Nothing from Toddle is ever included: no student data, no page address, no licence key. If you never press Send, nothing is ever sent. The detail is below.",
  },
  {
    claim: "The welcome page sends nothing.",
    detail:
      "When you first install it, the extension opens a welcome page. That page is part of the extension itself, not a website, and loading it contacts nothing.",
  },
  {
    claim: "The only things it stores are your settings and your licence key.",
    detail:
      "Your switch preferences — student flags shown or hidden, the student sidebar, primary teacher names, the My classes filter — and the licence key if you have one. All of it is stored on your own machine, and none of it is sent anywhere. No student data is stored on the device at all.",
  },
  {
    claim: "Your licence is checked on your machine, not by asking us.",
    detail:
      "A licence key is a signed statement that the extension verifies locally. An individual key carries the buyer's email address, and an organisation key the school's email domain; the extension compares that with the Toddle account signed in, inside the browser only, and sends it nowhere. Activating a key contacts nothing, which is why it works without a connection.",
  },
  {
    claim:
      "Outside connection two, only while a licence is entered: a daily check for cancelled keys.",
    detail:
      "Once a day, and only while a licence key is entered, the extension's background worker makes one plain request to https://licences.nyuchi.dev/v1/revocations. It sends no licence key, no identifiers, no cookies and no Toddle data. It downloads a list, signed by Nyuchi, of the fingerprints (SHA-256 hashes) of cancelled keys, and checks its own key against that list on your machine. Cloudflare, which runs the server, sees your IP address as with any web request; Nyuchi does not log it. If the check fails, the extension keeps working.",
  },
  {
    claim: "Exports are local.",
    detail:
      "The CSV export is generated in your browser and saved by your browser, to wherever your downloads go. It does not pass through any service of ours.",
  },
] as const;

/**
 * The extension's security posture, for the Security page. Each line is a
 * claim about the 0.8.2 build that can be checked against its source and
 * tests; when the extension changes, this changes with it.
 */
export const security = {
  /** The extension version these statements describe. */
  version: "0.8.2",
  /** The independent adversarial review. */
  review: {
    date: "2026-10-01",
    label: "1 October 2026",
  },
  /** How to report a vulnerability. */
  report: {
    email: "support@nyuchi.com",
    subject: "Security",
    acknowledge: "within 3 working days",
  },
} as const;

/** The security report address as a ready mailto. */
export const securityMailto = `mailto:${security.report.email}?subject=${encodeURIComponent(
  security.report.subject,
)}`;

/** Toddle is not ours. Said in the footer, the terms and the product page. */
export const toddleNotice =
  "Toddle is a trademark of its owner. Nyuchi and the Toddle Enhancement Extension are not affiliated with, endorsed by or sponsored by Toddle.";

/**
 * The refund rule, said once. It appears in the terms, on the extension page,
 * on the data handling page and in llms.txt.
 */
export const refunds = {
  rule: "A full refund within 30 days of purchase, for any reason related to the product.",
  how: "Ask by emailing support@nyuchi.com from the address you bought with, or through Buy Me a Coffee.",
  key: "A refunded licence key is cancelled, and stops working after the extension's next daily check for cancelled keys.",
} as const;
