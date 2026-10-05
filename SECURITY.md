# Security policy

This repository is `learning.nyuchi.com`: a static Astro site, served by
Vercel, and the home of the Toddle Enhancement Extension.

The extension's own security model, how it is tested, and its adversarial
reviews of 1 October 2026 (0.8.2) and 6 October 2026 (0.8.4, before it is
published), with their findings and the limits of code that runs in Toddle's
page, are published for schools at
[learning.nyuchi.com/legal/security](https://learning.nyuchi.com/legal/security).
The vulnerability disclosure policy, covering this site, the extension and the
licence server, is at
[learning.nyuchi.com/legal/vulnerability-disclosure](https://learning.nyuchi.com/legal/vulnerability-disclosure),
and `public/.well-known/security.txt` points to it.

## Reporting a vulnerability

Email <security@nyuchi.com> with the subject **Security**. Include the URL, a
reproduction, and the impact you observed. Please do not include real student
data. We acknowledge within 3 working days; the disclosure policy above has the
full commitments and safe harbour.

Do not file public GitHub issues for security reports.

## Scope

In scope:

- Code in this repository, and the site it builds.
- The Toddle Enhancement Extension, and the licence server at
  `licences.nyuchi.dev` (see the disclosure policy above).

Out of scope:

- Toddle itself, which should be reported to Toddle.
- The destination sites (`bundu.org/education`, `nyuchi.com/learning`,
  `mukoko.com/lingo`). Each has its own security policy.
- Third-party services named in the privacy policy (Vercel, Formspree,
  Intercom, Google), and browser or CDN behaviour.

## What the site ships

- Fully static output: no authentication, no API endpoints, no server
  functions.
- HTTP security headers in `vercel.json`, including a Content-Security-Policy
  whose inline-script hashes are verified on every build
  (`scripts/check-csp.mjs`).
- Analytics only with consent, through the consent banner; the support
  messenger loads only when a visitor asks for it.
- One form, the feedback form, which posts to Formspree.
