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
  updated: "2026-10-06",
  entity: "Nyuchi Africa (Private) Limited",
  shortEntity: "Nyuchi",
  country: "Zimbabwe",
  supportEmail: "support@nyuchi.com",
  /** Privacy, data-subject and DPA requests. Support stays on
      supportEmail; security reports go to security.report.email. */
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

/**
 * The two data protection laws Nyuchi holds itself to, said once. Zimbabwe's
 * Act because Nyuchi is a Zimbabwean company; the EU and UK GDPR because they
 * are the most widely used standard, so we apply them to everyone, wherever
 * they are. Where the two differ, the stricter one wins (the breach deadline:
 * Zimbabwe's 24 hours to the regulator is shorter than the GDPR's 72).
 */
export const dataProtection = {
  home: {
    law: "Cyber and Data Protection Act [Chapter 12:07]",
    authority:
      "the Postal and Telecommunications Regulatory Authority of Zimbabwe (POTRAZ)",
    authorityShort: "POTRAZ",
    authorityUrl: "https://www.potraz.gov.zw",
    /** Notice to the regulator after a breach is discovered (s. 19). */
    breachHours: 24,
  },
  gdpr: {
    /** Notice to a supervisory authority, where a breach must be notified. */
    breachHours: 72,
    /** Time to answer a request about your data, free of charge. */
    answerWithin: "one month",
    ukAuthority: "the Information Commissioner's Office (ICO)",
    ukAuthorityUrl: "https://ico.org.uk/make-a-complaint/",
    /** Every EU and EEA supervisory authority, from the EDPB. */
    euAuthoritiesUrl:
      "https://www.edpb.europa.eu/about-edpb/about-edpb/members_en",
  },
} as const;

/** The date above as people write it: "6 October 2026". */
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
    price: "US$149.99",
    period: "per year",
    who: "A school. One key for your email domain: anyone signed in to Toddle with an address there is covered.",
    buy: "https://buymeacoffee.com/bryany/e/581738",
    includes: [
      "Everything in Individual, for your whole staff",
      "Managed rollout through the Google Admin console",
      "Invoice, and a named contact for support",
    ],
  },
] as const;

/**
 * Which versions of the extension the legal pages describe. `current` is what
 * teachers have from the Chrome Web Store (the v0.8.3 tag carries the same
 * code). `next` is the release under Unreleased in the extension's changelog:
 * reviewed, not yet published. Claims that differ between the two say "from
 * version 0.8.4", so they stay true on both sides of the release. When `next`
 * ships, move it to `current` and drop the "before" wording.
 */
export const extensionVersions = {
  current: "0.8.2",
  sameCodeAs: "0.8.3",
  next: "0.8.4",
  /** The oldest version security reports are accepted for. */
  supportedFrom: "0.8.2",
} as const;

const { next } = extensionVersions;

/**
 * What the extension does with data. Each of these is a claim that can be
 * checked against the source (the extension's docs/toddle-data-fields.md is
 * the full schema, checked against its code), and each maps to an answer on
 * the Chrome Web Store privacy form.
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
      "It reads what Toddle already lets you see, through Toddle's own interface, reusing the session you are already signed in with. Every request it may send is listed word for word in the extension, and anything else is refused. Write operations are blocked outright rather than merely avoided, so it cannot change your gradebook even by accident. On the home page and the Attendance dashboard it adds a few fields to Toddle's own request instead of sending a second one, and takes them out again before Toddle's page sees the answer. Its message buttons open Toddle's own chat window and send nothing themselves: a message is sent, if at all, by you, through Toddle, under your school's messaging rules.",
  },
  {
    claim: "What it reads, feature by feature.",
    detail:
      "Toddle answers with what the signed-in teacher's own account may see, and no more. The gradebook tools, when a teacher expands an assessment: its assessment tools as Toddle defines them (rubric criteria, descriptors and levels, grade scales and their colours, checklist items, scores, standards and learning goals), and each assigned student's name, email, student ID, submission status and results, including written responses and comments. No descriptor or level is written in the extension. The home page: each class's staff, to show its primary teacher and the My classes filter. A student's profile page: the teachers of each of the student's classes. The Attendance dashboard: each student's year group and the names of the periods, from Toddle's own request, and the primary teacher of the class each student is in now, for the “Now: class · teacher” line. The student sidebar, when a teacher opens a student or a class: the student's name, photo, year group and age (the date of birth is used to work out the age and is never shown), email, student ID and enrolment date; their family accounts and contacts, with names, relationships, phone numbers and emails; their homeroom advisor; the school's additional profile fields, of which only Student Group and Room number are ever shown; today's timetable and attendance marks; their active flags, when flags are shown; and each class's teachers, with their display titles and emails.",
  },
  {
    claim:
      "Student flags: shown as Toddle shows them, hidden with one free switch.",
    detail: `From version ${next}, flags are shown as Toddle shows them. A staff member can hide them everywhere in Toddle with the switch, in Toddle's top bar or the extension's menu; the eye button then shows one student's flags. Versions before ${next} hid flags by default. Unless flags are hidden, the sidebar asks Toddle for a student's active flags each time it opens; while they are hidden, it asks only when someone presses the eye button. It keeps them only while that student's sidebar is open. Hiding flags changes only what is drawn on the screen, never Toddle's data. The flag switch is free and always will be.`,
  },
  {
    claim: "Your Toddle sign-in stays with Toddle.",
    detail:
      "The extension never asks for your password and never stores it. To ask Toddle as you, it notes the sign-in headers from Toddle's own requests, and the academic year Toddle is showing. The headers are held in the tab's memory, in one script inside Toddle's page: the extension's other parts never see them, they are never stored, and they are sent nowhere but Toddle's own interface. The academic year number is kept in Toddle's site storage (see below) so the sidebar asks for the right year, and is sent nowhere but Toddle.",
  },
  {
    claim: "Exactly what leaves your device.",
    detail:
      "Nothing it reads from Toddle goes anywhere but back to Toddle. There is no account, no analytics, no telemetry, no tracking, no advertising and no remote code. The extension makes these requests and no others: read-only requests to Toddle's own interface, with your Toddle session; student photos, loaded from the address Toddle gives for each one, wherever Toddle serves them, as Toddle's own page does; the feedback form, only when you press Send; and, only while a licence key is entered, the daily check for cancelled keys, which carries nothing. The last two are described next. Anything else happens only when you do it: saving a CSV file, opening an email or phone link, or sending a message in Toddle's own chat. Like any web request, each one lets the server that receives it see your IP address and browser type.",
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
    claim: "What it stores: settings and licence details, and no student data.",
    detail: `In Chrome's storage for the extension, on your device: your switches (the extension on or off, student flags, the student sidebar, My classes, primary teacher names, gradebook tools, and student details on the Attendance dashboard); your licence key, if you entered one; the result of the last check for cancelled keys (whether your key is on the list, the list's date and when the check was made, never the list itself); and the email address of the Toddle account last seen signed in, with the time, so the extension can check who a licence is for. That email is read on every Toddle page, with or without a licence key, and stays on the device. In the browser's storage for Toddle's own site: tee-settings, a copy of your switches and of which features the licence allows (no key and no email); gbx-hide-flags, whether flags are hidden, so they are hidden before the page is drawn; tee-course-view, whether you chose My classes in the home page filter; and tee-academic-year, the number of the academic year Toddle last asked for. Nothing it reads about students, classes, results or attendance is ever written to storage. Versions before ${next} have three switches: student flags, the student sidebar and primary teacher names.`,
  },
  {
    claim: "What it holds in memory, and for how long.",
    detail:
      "Answers from Toddle are held in the Toddle tab's memory, never written to storage, until the tab is closed or reloaded or the browser quits. Moving between Toddle pages without a reload does not clear them. A student's or a class's details are reused for at most 5 minutes, and a student's day for at most 2, before Toddle is asked again. A student's flags are never reused, and are kept only while that student's sidebar is open.",
  },
  {
    claim: "Your licence is checked on your machine, not by asking us.",
    detail:
      "A licence key is a signed statement that the extension verifies locally. It carries the buyer's email address. A key may also name who it is for: the buyer's email, or for an organisation licence the school's email domain. Where it does, the extension compares that with the Toddle account signed in, inside the browser only, and sends it nowhere. Activating a key contacts nothing, which is why it works without a connection.",
  },
  {
    claim:
      "Outside connection two, only while a licence is entered: a daily check for cancelled keys.",
    detail:
      "At most once a day, and only while a licence key is entered, the extension's background worker makes one plain request to https://licences.nyuchi.dev/v1/revocations; a key just entered is checked within 5 minutes. It sends no licence key, no identifiers, no cookies and no Toddle data. It downloads a list, signed by Nyuchi, of the fingerprints (SHA-256 hashes) of cancelled keys, checks its own key against that list on your machine, and keeps only the result. Cloudflare, which runs the server, sees your IP address as with any web request; Nyuchi does not log it. If the list cannot be fetched, the last result stands, so a network outage never switches a licence off.",
  },
  {
    claim: "Exports are local.",
    detail:
      "The CSV export is generated in your browser and saved by your browser, to wherever your downloads go. It does not pass through any service of ours. Once saved, the file is yours, under your school's own rules for files.",
  },
  {
    claim: "Removing it removes what it stored.",
    detail:
      "Uninstalling the extension deletes everything in its own storage. The four small values on Toddle's site stay until the browser's data for web.toddleapp.com is cleared; none of them is about a student. Removing a licence key deletes the key; the last check's result and the Toddle account's email stay until the extension is uninstalled.",
  },
] as const;

/**
 * The extension's security posture, for the Security page. Each line is a
 * claim about the published build (`current`) or the reviewed next one
 * (`next`) that can be checked against the extension's source, tests,
 * SECURITY.md and docs/security-review.md; when the extension changes, this
 * changes with it.
 */
export const security = {
  /** The published version these statements describe. */
  version: extensionVersions.current,
  /** The reviewed version not yet published, which they also describe. */
  next: extensionVersions.next,
  supportedFrom: extensionVersions.supportedFrom,
  /** The adversarial reviews, oldest first. */
  reviews: [
    {
      date: "2026-10-01",
      label: "1 October 2026",
      version: extensionVersions.current,
      findings: "1 to 12",
    },
    {
      date: "2026-10-06",
      label: "6 October 2026",
      version: extensionVersions.next,
      findings: "13 to 16",
    },
  ],
  /** How to report a vulnerability. */
  report: {
    email: "security@nyuchi.com",
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
