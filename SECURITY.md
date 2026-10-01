# Security policy

This repository is `learning.nyuchi.com`: a static Astro site, served by
Vercel, and the home of the Toddle Enhancement Extension.

The extension's own security model, how it is tested, its independent
adversarial review and its vulnerability policy are published for schools at
[learning.nyuchi.com/legal/security](https://learning.nyuchi.com/legal/security)
(`src/pages/legal/security.astro`). The extension's repository is private, so
that page carries the policy in full; this file covers the website.

## Reporting a vulnerability

Email <support@nyuchi.com> with the subject **Security**. Include the URL, a
reproduction, and the impact you observed. Please do not include real student
data. We acknowledge within 3 working days.

Do not file public GitHub issues for security reports.

## Scope

In scope:

- Code in this repository, and the site it builds.
- The Toddle Enhancement Extension (see the Security page above).

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
