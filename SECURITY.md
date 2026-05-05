# Security policy

`learning.nyuchi.com` is a private SvelteKit one-pager. It serves a static
landing page that links visitors to three sister sites; it has no
authentication, no forms, no user data, and no API endpoints.

## Scope

In scope:

- Code in this repository.
- Build pipeline (`vite build`, `@sveltejs/adapter-vercel`).
- Any hosted Vercel function the adapter generates (currently zero — the
  app is fully static).

Out of scope:

- The destination sites (`bundu.org/education`, `nyuchi.com/learning`,
  `mukoko.com/lingo`). Each has its own security policy.
- Vercel infrastructure, GitHub infrastructure, browser/CDN behaviour.

## Reporting a vulnerability

Email <security@nyuchi.com>. Include the URL, a reproduction, and the
impact you observed. Initial acknowledgement within 48 hours.

Do not file public GitHub issues for security reports.

## What we ship

- HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`,
  `X-XSS-Protection`) configured in `vercel.json`.
- No analytics, cookies, or tracking on the page itself.
- Outbound links go to first-party Bundu Family domains only.
