# Security Policy

## About This Project

Nyuchi Learning is an open-source educational framework website built with Astro. It serves static HTML content with no server-side processing, user authentication, or data collection beyond basic analytics.

## Scope

This security policy covers:
- The Nyuchi Learning website codebase
- Static site generation and build process
- Third-party dependencies

This policy does **not** cover:
- Schools' implementation of our frameworks
- Third-party tools recommended in our frameworks
- External hosting providers (Vercel, GitHub, etc.)

## Supported Versions

| Version | Supported |
|---------|-----------|
| 4.x     | Yes       |
| 3.x     | No        |
| < 3.0   | No        |

Only the latest major version receives security updates.

## Security Model

### Static Site Architecture

This project is a **static site generator** with no:
- User authentication or accounts
- Server-side code execution
- Database connections
- User-submitted content or forms
- API endpoints handling sensitive data

The attack surface is minimal by design.

### Third-Party Dependencies

We use the following main dependencies:
- **Astro**: Static site generator
- **Tailwind CSS**: Styling framework
- **Lucide Icons**: Icon library

Dependencies are regularly updated. We use `npm audit` to check for known vulnerabilities.

### Analytics

Google Analytics is used for usage tracking. No personally identifiable information (PII) is collected through our analytics implementation.

## Reporting a Vulnerability

### What to Report

- Security issues in the website codebase
- Vulnerabilities in our build process
- Exposed credentials or secrets (there should be none)
- Cross-site scripting (XSS) vulnerabilities
- Content injection issues

### How to Report

1. **Email**: security@nyuchi.com
2. **GitHub**: Open a [security advisory](https://github.com/nyuchitech/learning/security/advisories/new)

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Initial response**: Within 48 hours
- **Assessment**: Within 7 days
- **Resolution**: Depends on severity, typically within 30 days

### What to Expect

- We will acknowledge receipt of your report
- We will investigate and assess the vulnerability
- We will keep you informed of our progress
- We will credit you in our changelog (unless you prefer anonymity)

## Security Best Practices for Contributors

When contributing to this project:

1. **Never commit secrets**: No API keys, tokens, or credentials
2. **Review dependencies**: Check for known vulnerabilities before adding packages
3. **Sanitize content**: Ensure any dynamic content is properly escaped
4. **Follow CSP guidelines**: Respect Content Security Policy headers
5. **Test builds**: Run `npm run build` to verify no security warnings

## Content Security

The frameworks we publish are educational in nature. They contain:
- Implementation guidelines for digital campuses
- Budget estimates and planning guides
- Technical specifications

All content is reviewed before publication to ensure accuracy and safety.

## Third-Party Links

Our frameworks reference various third-party tools and services. We:
- Do not endorse specific vendors
- Recommend schools conduct their own security assessments
- Update recommendations when security issues are discovered

## Updates

This security policy was last updated in December 2025.

We review and update this policy:
- When major versions are released
- When significant security changes occur
- At minimum, annually

---

**Contact**: security@nyuchi.com

**Ubuntu**: Security is a shared responsibility. We protect our community together.
