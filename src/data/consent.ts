/**
 * What this site asks consent for, declared once.
 *
 * Two laws set the standard (legal.ts, dataProtection): Zimbabwe's Act,
 * because Nyuchi is Zimbabwean, and the EU and UK GDPR, the most widely used,
 * applied to everyone. They agree on more than they differ:
 *
 *   UK/EU GDPR              consent must be freely given, specific, informed
 *                           and unambiguous; granular per purpose, not bundled;
 *                           refusing as easy as agreeing; withdrawable at any
 *                           time; the controller must be able to demonstrate it
 *   Zimbabwe CDPA 12:07     "freely given specific and informed indication";
 *                           withdrawal; the controller must be able to show
 *                           consent was obtained
 *
 * The shared requirements drive the design, so one implementation serves both: nothing optional is on until it is chosen, each purpose is chosen
 * separately, refusing everything is one press, and the record carries a
 * timestamp and a version so it can be produced later.
 *
 * ONE RULE for this file: a category exists here only if something on the site
 * actually does it. Offering a "Marketing" toggle that controls nothing would
 * be theatre, and an inaccurate notice is a worse compliance position than a
 * short one. Today there are two optional purposes because there are exactly
 * two third parties.
 *
 * This is the engineering, not legal advice. Someone qualified should read the
 * privacy policy before it is relied on. Zimbabwe's licensing regulations for
 * data controllers also expect a data protection officer to be appointed — a
 * person to appoint, not a thing to code.
 */

export type ConsentCategory = {
  id: "necessary" | "analytics" | "support";
  name: string;
  /** Shown under the name in the panel. Says what it does, plainly. */
  detail: string;
  /** What it actually loads or stores, named. Vagueness fails "informed". */
  used: string;
  /** Required categories cannot be switched off and are never third-party. */
  required: boolean;
};

export const CONSENT_CATEGORIES: ConsentCategory[] = [
  {
    id: "necessary",
    name: "Strictly necessary",
    detail:
      "Remembers your light or dark theme, and remembers this choice so you are not asked again. Nothing here is shared with anyone.",
    used: "Two values in your own browser's storage. No cookies, no third party.",
    required: true,
  },
  {
    id: "analytics",
    name: "Analytics",
    detail:
      "Lets us see which pages are read, so we know what is worth writing. Declining changes nothing about how the site works.",
    used: "Google Analytics. Sets cookies and records the pages you view, your approximate location and your device.",
    required: false,
  },
  {
    id: "support",
    name: "Support messenger",
    detail:
      "The chat window for asking us a question. Off unless you want it — and you can still email us either way.",
    used: "Intercom. Loads when you open the chat, sets its own cookies, and can see which pages you have open while you use it.",
    required: false,
  },
];

/** localStorage key holding the record. Versioned in the value, not the key. */
export const CONSENT_KEY = "nyuchi-consent";

/**
 * The key the first version of this banner used, holding "granted" | "denied"
 * for analytics alone. Read once and migrated, so that someone who already
 * answered is not asked a second time — being re-prompted after you have
 * decided is its own kind of dark pattern.
 */
export const LEGACY_CONSENT_KEY = "analytics-consent";

/** Bump when the categories change meaning, which re-asks everyone. */
export const CONSENT_VERSION = 1;

export const OPTIONAL_CATEGORIES = CONSENT_CATEGORIES.filter(
  (category) => !category.required,
);
