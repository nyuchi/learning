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
  updated: "2026-10-07",
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

/** The date above as people write it: "7 October 2026". */
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
      "The student sidebar, with where they are now and today's timetable",
      "The class view, a class's teachers to email at once, and message buttons into Toddle's chat",
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
 * Which versions of the extension the legal pages describe.
 *
 * How the extension is released: patches (0.8.3, 0.8.4, …) are GitHub
 * releases, for testing, and never go to the Chrome Web Store; each minor
 * (0.9.0, …) is released from the extension's `main` branch and published to
 * the store. Teachers get minors.
 *
 * `current` is what teachers have from the Chrome Web Store: 0.9.0, published
 * on 7 October 2026. `previous` is the store release before it, named only
 * where something it did still matters to a teacher updating from it (flags
 * it hid stay concealed), said as history. What changed in the test builds
 * between the two (0.8.3 carried 0.8.2's code) is said as "versions before
 * `current`": the old licence host and the old flags storage key. There is no `next` while no minor is reviewed and waiting for the
 * store. When one is, add `next` here, say "from version <next>" and what
 * `current` does wherever the two differ, so each claim stays true on both
 * sides of the release; when it ships, move it to `current` and drop that
 * wording again.
 */
export const extensionVersions = {
  current: "0.9.0",
  previous: "0.8.2",
  /** The oldest version security reports are accepted for. */
  supportedFrom: "0.8.2",
} as const;

const { current, previous } = extensionVersions;

/**
 * The licence key and Chrome sync, said once. Since 0.9.0 the key alone is
 * also kept in chrome.storage.sync, so it follows the teacher's own Chrome
 * account. That is Chrome's sync, not Nyuchi's: the extension never sends the
 * key to Nyuchi. Checked against the extension's SECURITY.md and
 * docs/data-schema.md (the `licence` key).
 */
export const licenceSync = {
  /** One sentence, for summaries. */
  short: `Your licence key also follows your own Chrome account to your other computers, through Chrome's sync; it is never sent to Nyuchi.`,
  /** The full account, for the data pages. */
  detail: `The licence key, and nothing else, is also kept in Chrome's synced storage for the extension, so Chrome carries it to the other computers signed in to the same Chrome account, unless sync, or a school's Chrome policy, turns that off. That is Chrome's own sync, through your Google account; the extension never sends the key to Nyuchi. A key carries the buyer's email address, so that travels with it. The newest key wins on every computer, and removing it on one removes it on all of them. Who a key is for, and the result of the check for cancelled keys, stay on each computer.`,
  /** For "what leaves the device". */
  leaves: `One thing more leaves your device, and not to us: with Chrome sync on, Chrome carries your licence key to your other computers through your own Chrome account. The extension itself never sends the key anywhere, Nyuchi included.`,
} as const;

/**
 * The upgrade from an individual licence to the school's, said once: the
 * product page and llms.txt. The code is shown in the shipped extension
 * (0.9.0) to individual licence holders, and works on the organisation
 * licence only.
 */
const upgradeCode = "BXXF20VA";
const upgradeOff = "US$7";
export const upgrade = {
  code: upgradeCode,
  off: upgradeOff,
  text: `Already have an individual licence? Bring your whole school in. The extension's licence page shows individual licence holders the upgrade, with the code ${upgradeCode}, which takes ${upgradeOff} off the organisation licence (it works on that licence only). Your school's key then replaces yours on every computer.`,
} as const;

/**
 * Student flags, said once. Since 0.9.0 the extension never hides Toddle's own
 * flags: a teacher can conceal them for a shared screen. The wording is
 * "conceal" and "flag visibility", never "hide", and it promises no more than
 * the extension does: how a concealed flag looks is still being refined, so
 * this says only that what a flag says cannot be read from across a room.
 * Checked against the extension's SECURITY.md and docs/data-schema.md.
 */
export const flags = {
  summary: `The extension never hides Toddle's own student flags: they show as Toddle shows them. When your screen is shown to a class, a parent or a visitor, one free switch conceals them across Toddle, so what a flag says cannot be read from across the room.`,
  reveal:
    'In the student sidebar, "Show flags" shows one student\'s flags when you need them.',
  limit:
    "Concealing is a screen, not a lock. A concealed flag can still show that a student has a flag. Concealing changes only what is drawn on the screen, never Toddle's data, and does not stop anyone at the computer opening a student's flags in Toddle.",
} as const;

/**
 * What the extension does with data. Each of these is a claim that can be
 * checked against the source (the extension's docs/data-schema.md, formerly
 * docs/toddle-data-fields.md, is the full schema, checked against its code on
 * every change), and each maps to an answer on the Chrome Web Store privacy
 * form.
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
      "Toddle answers with what the signed-in teacher's own account may see, and no more. The gradebook tools, when a teacher expands an assessment: its assessment tools as Toddle defines them (rubric criteria, descriptors and levels, grade scales and their colours, checklist items, scores, standards and learning goals), and each assigned student's name, email, student ID, submission status and results, including written responses and comments. No descriptor or level is written in the extension. The home page: each class's staff, to show its primary teacher and the My classes filter. A student's profile page: the teachers of each of the student's classes. The Attendance dashboard: each student's year group and the names of the periods, from Toddle's own request, and the primary teacher of the class each student is in now, for the “Now: class · teacher” line. The student sidebar, when a teacher opens a student or a class: the student's name, photo, year group and age (the date of birth is used to work out the age and is never shown), email, student ID and enrolment date; their family accounts and contacts, with names, relationships, phone numbers and emails; their homeroom advisor; the school's additional profile fields, of which only Student Group and Room number are ever shown; today's timetable and attendance marks; their active flags (see the next point); and the teachers of each class, of today's blocks and of the homeroom, with their display titles, roles and emails, and their photos where Toddle gives them, which the sidebar's staff view shows when a teacher's name is clicked (it asks Toddle for nothing more).",
  },
  {
    claim:
      "Student flags: Toddle's own are never hidden, and a teacher can conceal them for a shared screen.",
    detail: `The extension does not hide Toddle's own student flags: they show as Toddle shows them, including in Toddle's student popover, with their links and documents. A teacher can choose to conceal flags, for a screen a class or a visitor can see, with the free flag switch in Toddle's top bar or the extension's menu. A new install starts with flags shown. A teacher who updated from version ${previous}, where flags were hidden by default, or who had hidden them, has them concealed after the update until they choose to show them. A concealed flag is a faint grey smudge with no colour, and its words cannot be read from across a room, though it can still show that a student has a flag. Nothing on the page brings a concealed flag back. ${flags.reveal} The sidebar asks Toddle for a student's active flags each time it opens, and keeps them only while that student's sidebar is open. Concealing changes only what is drawn on the screen, never Toddle's data. The flag switch is free and always will be.`,
  },
  {
    claim: "Your Toddle sign-in stays with Toddle.",
    detail:
      "The extension never asks for your password and never stores it. To ask Toddle as you, it notes the sign-in headers from Toddle's own requests, and the academic year Toddle is showing. The headers are held in the tab's memory, in one script inside Toddle's page: the extension's other parts never see them, they are never stored, and they are sent nowhere but Toddle's own interface. The academic year number is kept in Toddle's site storage (see below) so the sidebar asks for the right year, and is sent nowhere but Toddle.",
  },
  {
    claim: "Exactly what leaves your device.",
    detail: `Nothing it reads from Toddle goes anywhere but back to Toddle. There is no account, no analytics, no telemetry, no tracking, no advertising and no remote code. The extension makes these requests and no others: read-only requests to Toddle's own interface, with your Toddle session; student photos, loaded from the address Toddle gives for each one, wherever Toddle serves them, as Toddle's own page does; the feedback form, only when you press Send; and, only while a licence key is entered, the daily check for cancelled keys, which carries nothing. The last two are described next. Anything else happens only when you do it: saving a CSV file, opening an email or phone link, or sending a message in Toddle's own chat. Like any web request, each one lets the server that receives it see your IP address and browser type. ${licenceSync.leaves}`,
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
    detail: `In Chrome's storage for the extension, on your device: your switches (the extension on or off, student flags, the student sidebar, My classes, primary teacher names, gradebook tools, and student details on the Attendance dashboard); your licence key, if you entered one; the result of the last check for cancelled keys (whether your key is on the list, the list's date and when the check was made, never the list itself); and the email address of the Toddle account last seen signed in, with the time, so the extension can check who a licence is for. That email is read on every Toddle page, with or without a licence key, and stays on the device. ${licenceSync.detail} In the browser's storage for Toddle's own site: tee-settings, a copy of your switches and of which features the licence allows (no key and no email); tee-blur-flags (gbx-hide-flags in versions before ${current}), whether flags are concealed, so they are concealed before the page is drawn; tee-course-view, whether you chose My classes in the home page filter; and tee-academic-year, the number of the academic year Toddle last asked for. Nothing it reads about students, classes, results or attendance is ever written to storage.`,
  },
  {
    claim: "What it holds in memory, and for how long.",
    detail:
      "Answers from Toddle are held in the Toddle tab's memory, never written to storage, until the tab is closed or reloaded or the browser quits. Moving between Toddle pages without a reload does not clear them. A student's or a class's details are reused for at most 5 minutes, and a student's day for at most 2, before Toddle is asked again. A student's flags are never reused, and are kept only while that student's sidebar is open.",
  },
  {
    claim: "Your licence is checked on your machine, not by asking us.",
    detail:
      "A licence key is a signed statement that the extension verifies locally. It carries the buyer's email address. A key may also name who it is for: the buyer's email, or for an organisation licence the school's email domain. Where it does, the extension compares that with the Toddle account signed in, inside the browser only, and sends it nowhere. Activating a key contacts nothing, which is why it works without a connection, and the extension never sends the key to Nyuchi.",
  },
  {
    claim:
      "Outside connection two, only while a licence is entered: a daily check for cancelled keys.",
    detail: `At most once a day, and only while a licence key is entered, the extension's background worker makes one plain request to https://licenses.nyuchi.com/v1/revocations (versions before ${current} asked licences.nyuchi.dev, the same server); a key just entered is checked within 5 minutes. It sends no licence key, no identifiers, no cookies and no Toddle data. It downloads a list, signed by Nyuchi, of the fingerprints (SHA-256 hashes) of cancelled keys, checks its own key against that list on your machine, and keeps only the result. Cloudflare, which runs the server, sees your IP address as with any web request; Nyuchi does not log it. If the list cannot be fetched, the last result stands, so a network outage never switches a licence off.`,
  },
  {
    claim: "Exports are local.",
    detail:
      "The CSV export is generated in your browser and saved by your browser, to wherever your downloads go. It does not pass through any service of ours. Once saved, the file is yours, under your school's own rules for files.",
  },
  {
    claim: "Removing it removes what it stored.",
    detail: `Uninstalling the extension deletes everything in its own storage on that computer. The four small values on Toddle's site stay until the browser's data for web.toddleapp.com is cleared; none of them is about a student. Removing a licence key deletes the key (on every computer signed in to the same Chrome account, so remove the licence before uninstalling if you want it gone from your Chrome account too); the last check's result and the Toddle account's email stay until the extension is uninstalled.`,
  },
] as const;

/**
 * The extension's security posture, for the Security page. Each line is a
 * claim about the published build (`current`) that can be checked against the extension's source, tests,
 * SECURITY.md and docs/security-review.md; when the extension changes, this
 * changes with it.
 */
export const security = {
  /** The published version these statements describe. */
  version: extensionVersions.current,
  supportedFrom: extensionVersions.supportedFrom,
  /** The adversarial reviews, oldest first. */
  reviews: [
    {
      date: "2026-10-01",
      label: "1 October 2026",
      /** Fixed: review history does not move when `current` does. */
      version: "0.8.2",
      findings: "1 to 12",
    },
    {
      date: "2026-10-06",
      label: "6 October 2026",
      /** The code reviewed: the 0.8.4 patch, the rebuild's first steps. Its
          fixes are in every later release, and in 0.9.0. */
      version: "0.8.4",
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

/**
 * Who owns the extension, said once: the terms, the product page and
 * llms.txt. The extension is proprietary. Schools may read its code to check
 * what it does (their privacy reviews depend on it), but a licence grants
 * use, not ownership, and the code may not be reused elsewhere.
 */
export const ownership = {
  owner: `${legal.operator}, part of ${legal.entity}`,
  statement: `The Toddle Enhancement Extension and its code belong to ${legal.operator}, part of ${legal.entity}. All rights reserved. It is not open source.`,
  licence:
    "A licence lets you use the extension. It does not give you ownership of it, or of any part of its code.",
  noReuse:
    "You may not copy, modify, reuse or redistribute its code, in whole or in part, in another product or service, without our written permission.",
  reading:
    "Reading the code to check what it does is fine, and we encourage it: a school should be able to see for itself what software does with its data.",
} as const;

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
