/**
 * The Toddle Enhancement Extension's release notes, for teachers.
 *
 * The public home of the extension's releases. Its source repository is
 * private, and the releases there are internal test builds; teachers install
 * and update from the Chrome Web Store. So nothing here links to GitHub or to
 * a download.
 *
 * Adding a release is one edit: put a new entry at the top of `releases`.
 * Each is written from the extension's CHANGELOG.md, in plain words, about
 * what changed for a teacher rather than how it was built. The page gives
 * each one the id `v<version>` (e.g. `#v0.9.0`), which the extension's
 * toolbar menu links to: keep `version` exactly as the extension's manifest
 * has it. `alsoIds` gives older or test versions an anchor of their own, so
 * a link from any version's menu lands somewhere sensible.
 *
 * Prices are not repeated here; they live in `pricing` (src/data/legal.ts).
 */

/** coming: not yet on the store; store: on the Chrome Web Store; early: before it. */
export type ReleaseStatus = "coming" | "store" | "early";

export interface ReleaseSection {
  heading: string;
  items: string[];
}

export interface Release {
  /** As in the extension's manifest, e.g. "0.9.0". The page's anchor is `v` + this. */
  version: string;
  /** A heading when one entry covers several versions, e.g. "0.7.1 and 0.7.0". */
  label?: string;
  status: ReleaseStatus;
  /** ISO date it reached the Chrome Web Store; absent while coming. */
  date?: string;
  /** One or two sentences: what this release is about. */
  summary: string;
  sections: ReleaseSection[];
  /** Further versions this entry stands for, each given its own anchor. */
  alsoIds?: string[];
}

/** The test builds between 0.8.2 and 0.9.0, said once on the page. */
export const testBuilds = {
  from: "0.8.3",
  to: "0.8.13",
  /** Every version in the range, so each has an anchor on the page. */
  versions: [
    "0.8.3",
    "0.8.4",
    "0.8.5",
    "0.8.6",
    "0.8.7",
    "0.8.8",
    "0.8.9",
    "0.8.10",
    "0.8.11",
    "0.8.12",
    "0.8.13",
  ],
  /** Where their changes land. */
  arriveIn: "0.9.0",
} as const;

/** Newest first. */
export const releases: Release[] = [
  {
    version: "0.9.0",
    status: "coming",
    summary:
      "Everything since 0.8.2, in one release: student flags you control with one switch, a sidebar that tells you more about the people around a student, a licence that follows your Chrome account, and the extension rebuilt so that Toddle's own page can't reach into it.",
    sections: [
      {
        heading: "Student flags: shown, or concealed",
        items: [
          "The switch is now “Show student flags”. On, Toddle's flags look exactly as Toddle shows them: the extension leaves them alone.",
          "Off, for when your screen is shown to a class, a parent or a visitor, every flag across Toddle is concealed: a faint grey smudge with no colour, and no title, icon or count anyone can read from across the room.",
          "Nothing on the page brings a flag back: not hovering, not clicking. The one way to see them is “Show flags” in the student sidebar, which shows that one student's flags until you close the sidebar or move to another student. It is never saved.",
          "If you are updating from 0.8.2, where flags were hidden by default, or you had hidden them yourself, they stay concealed after the update, so nothing appears on a shared screen that you had covered. A new install starts with flags shown.",
        ],
      },
      {
        heading: "The student sidebar",
        items: [
          "Click a teacher's name anywhere in the sidebar to see who they are: their photo where Toddle has one, their title and role, their email and a button to message them in Toddle. Opened from a student, it also shows the classes they teach that student and today's lessons together.",
          "A class now always names its course, and its subjects and grades where Toddle gives them.",
          "Email the primary teachers of a student's classes at once: “Primary teachers of today's classes” and “Primary teachers of all classes” list each teacher once, all ticked, ready to email or copy.",
          "A class's teachers sit beside every class, to email together or copy their addresses.",
          "Today's timetable is its own part, with “No classes today” or a Retry button when it can't load, and the rest of the panel never waits for it. The student's email sits under their name: click to copy it.",
          "In School setup, Toddle's admin portal, the sidebar steps aside, so a click on a student does what Toddle does.",
          "Clearer buttons (“Message the family”, “Not marked”), Toddle's own icons, quick tooltips, and email links that copy the address when no email app opens.",
        ],
      },
      {
        heading: "My classes, the gradebook and the Attendance dashboard",
        items: [
          "My classes switches on and off at once, and stays right at schools with long course lists.",
          "The gradebook tools and the Attendance dashboard's details are rebuilt, and look and work as before. Grade scale colours from your school's Toddle now show in the expanded columns.",
          "The Attendance dashboard's Excusals tab gets the same details as the Students tab: each student's year group and, today, the class they are in right now with its primary teacher. A new “Time out” column, its header lined up over its values, says how long each excusal keeps a student out: “1 day”, the school days, or the real times from the day's timetable.",
          "A switch for every feature in the toolbar menu, grouped by where it works, with a master switch that turns everything off.",
        ],
      },
      {
        heading: "Easier to read",
        items: [
          "Text and icons are the right size again. Toddle sets its page's base font size to 10px, which shrank everything the extension drew on Toddle to 62.5% of its size: 7.5px text and 10px icons. They now match Toddle's own text.",
          "A flag's text keeps the shape it was written in: paragraphs, line breaks, headings, lists, bold, italic, code and links (https only), instead of running together as one long paragraph. It is built as page elements, never inserted as HTML.",
        ],
      },
      {
        heading: "Your licence, and buying one",
        items: [
          "Your licence follows your Chrome account. Enter a key once and Chrome's own sync carries it to every computer signed in to the same Chrome account. The newest key wins, and removing it on one computer removes it on all of them. The key is never sent to Nyuchi.",
          "Both plans are in the extension: the welcome page and the licence page show Individual and Organisation, each with its own checkout, and your key arrives by email. “See plans” in the toolbar menu opens them.",
          "If you have an individual licence, the extension offers the upgrade to your school's licence instead, with a code that takes money off the organisation licence. Your school's key then replaces yours on every computer.",
          "For IT teams who load the extension unpacked: each release's unpacked copy now carries the Chrome Web Store's extension ID, so a synced licence reaches it too. The first time you load it, it replaces an older unpacked copy's ID, so a licence entered there needs entering once more.",
        ],
      },
      {
        heading: "Built to keep Toddle's page out",
        items: [
          "The flags switch, the student sidebar, My classes and teacher names, the gradebook's toolbar and controls, and the Attendance dashboard's details now run in the extension's own part of the browser, inside closed shadow roots that no script on Toddle's page can read or click into. Whether each one runs is decided by your switches and licence, never by Toddle's page.",
          "Each rebuilt part was given its own security review on 6 October 2026, as were flag visibility and the sidebar's new staff and class views. Everything they found is fixed, each with a test. The Security page has the details.",
          "Nothing new is read from Toddle, and the extension sends nothing new anywhere. The one change is Chrome's: it now syncs your licence key through your own Chrome account, never to Nyuchi.",
        ],
      },
    ],
  },
  {
    version: "0.8.2",
    status: "store",
    date: "2026-10-01",
    summary:
      "The student sidebar from anywhere in Toddle, with where a student is right now and their day at a glance.",
    sections: [
      {
        heading: "What's new",
        items: [
          "Click any student, anywhere in Toddle (a photo, a name, the gradebook's student column, the class portfolio, the Attendance dashboard), and the sidebar opens at once.",
          "A “Now” card: the student's attendance code for the block happening now, and where they should be (block, class, room and teacher). Below it, their classes in two tabs: Today, in time order with each period's code, and All.",
          "Click a class for its block, room and course, and every teacher with their title and email. Message buttons open Toddle's own chat with a teacher, the student or the family.",
          "The homeroom advisor, the school's Student Group and Room number, and contacts with their relationship, phone and email.",
          "On the Attendance dashboard's Students tab, each student's year group and the class they are in right now, with the current block's column outlined.",
        ],
      },
      {
        heading: "Licences and security",
        items: [
          "A licence is for a person or a school, checked against the account signed in to Toddle. A cancelled key stops working after a daily check that sends nothing about you.",
          "Every finding of the security review of 1 October 2026 is fixed, each with a test.",
        ],
      },
    ],
  },
  {
    version: "0.8.1",
    status: "store",
    date: "2026-10-01",
    summary: "A welcome page, and feedback straight from the menu.",
    sections: [
      {
        heading: "What's new",
        items: [
          "A welcome page opens once, when you install: what the extension does, what is free and what needs a licence, your switches, and a place for a licence key.",
          "Send feedback from the toolbar menu. Only what you type, and the version number, is sent, and only when you press Send.",
          "The toolbar menu meets WCAG 2.2 AA: readable contrast, a visible focus ring, and switches that say in words when they need a licence.",
          "Fixes: expanded columns are no longer empty at schools that show student IDs, students without an email are included, and the sidebar shows a student's own grade.",
        ],
      },
    ],
  },
  {
    version: "0.8.0",
    status: "store",
    date: "2026-10-01",
    summary: "The Toddle home page, made about your own classes.",
    sections: [
      {
        heading: "What's new",
        items: [
          "My classes: a third option in the home page's course filter, for only the classes you teach.",
          "The primary teacher beside every class, on the home page and on a student's profile.",
          "The first student sidebar, and a toolbar menu with your licence and a switch for each feature.",
          "The gradebook opens one assessment tool at a time, and its type filter follows Toddle's own two levels.",
        ],
      },
    ],
  },
  {
    version: "0.7.1",
    label: "0.7.1 and 0.7.0",
    status: "store",
    date: "2026-09-30",
    summary:
      "The first version on the Chrome Web Store, and licences. The flag switch stayed free; the gradebook columns and CSV export were what a licence bought.",
    sections: [
      {
        heading: "What's new",
        items: [
          "Individual and organisation licences, checked on your own machine, so activating a key contacts nothing.",
        ],
      },
    ],
    alsoIds: ["0.7.0"],
  },
  {
    version: "0.6.0",
    label: "0.6.0 and earlier",
    status: "early",
    date: "2026-09-28",
    summary:
      "Where it started: the gradebook, expanded. These early builds came before the Chrome Web Store.",
    sections: [
      {
        heading: "What it did",
        items: [
          "Every assessment tool expands into one column per standard, criterion or item: rubrics of every kind, checklists, scores, comments, grade scales and learning goals.",
          "The flag switch, for a gradebook on a projector, leaving students' names alone. (An earlier “Present mode” that replaced names was dropped: a gradebook of anonymous rows is no use to a teacher.)",
          "CSV export, made in your browser. Write operations are blocked, so the extension can never change a gradebook.",
        ],
      },
    ],
    alsoIds: ["0.5.0", "0.4.3"],
  },
];

/** The newest release, for links such as "What's new in 0.9.0". */
export const latestRelease = releases[0];

/** "1 October 2026", as the legal pages write dates. */
export function releaseDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
