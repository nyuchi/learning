# TODO - Future Work

Tracked backlog of planned pages and features. Each item includes context on what needs to be built, referenced from existing pages that link to them.

---

## Priority 1: Help Page (Build First)

> **Status:** Not started
> **Current state:** No `/help` page exists. The consultation page (`/consultation`) serves as the only support entry point. A comprehensive help page is needed before the resources hub sub-pages are built.
> **Target route:** `/help`
> **Future PR**

### What needs to be built

A substantial Help page that serves as the primary self-service support destination. Should cover:

- **Frequently Asked Questions (FAQ)**
  - General questions about nyuchi learning and the frameworks
  - Implementation questions (getting started, timelines, costs)
  - Technical questions (platform requirements, integrations, connectivity)
  - Licensing questions (open-source, adaptation rights, CC BY-SA 4.0)

- **Getting Help**
  - How to use the community forums
  - How to file issues on GitHub
  - How to book a consultation
  - Support tier overview (link to `/resources#consultation` or `/pricing`)

- **Troubleshooting Guides**
  - Common implementation issues and solutions
  - Connectivity and offline access strategies
  - Device management basics
  - Platform-specific troubleshooting (Google Workspace, Moodle, Gibbon)

- **Contact & Support Channels**
  - Email support
  - GitHub Discussions link
  - Community forum link
  - Consultation booking link

- **Documentation Index**
  - Links to all frameworks with brief descriptions
  - Links to all downloadable resources
  - Links to blog posts organized by topic

### Design notes

- Use `BaseLayout`, `PageBreadcrumb`, `PageHero` (standard page pattern)
- FAQ section could use an accordion/disclosure pattern (consider `<details>/<summary>` for zero-JS)
- Add JSON-LD `FAQPage` schema for SEO
- Follow left-aligned, typography-led design (no images)

---

## Priority 2: Resources Hub Sub-Pages

> **Status:** Not started
> **Current state:** The resources hub page (`/resources`) exists with a "Coming Soon" overlay. It defines 25+ links to sub-pages that do not exist yet. The page structure and content descriptions are already written in `src/pages/resources.astro`.
> **Depends on:** Help page (Priority 1) should be built first
> **Future PR**

### Getting Started Resources

Referenced from `resources.astro` lines 16-54, section `#getting-started`.

| # | Page | Route | Type | Description |
|---|------|-------|------|-------------|
| 1 | **Self-Assessment Tool** | `/resources/self-assessment` | Interactive Tool | Evaluate school's digital readiness across infrastructure, staff capacity, and student access. Identify strengths and gaps before implementation. (30-45 minutes) |
| 2 | **Readiness Checklist** | `/frameworks/readiness-checklist.pdf` | PDF Download | Step-by-step checklist: stakeholder buy-in, budget planning, infrastructure audit, team preparation. Downloadable PDF with worksheets. (12 pages) |
| 3 | **Stakeholder Engagement Templates** | `/resources/stakeholder-templates` | Templates | Presentation templates for school boards, teacher meetings, parent info sessions. Customizable PowerPoint/Google Slides with talking points. (3 templates) |
| 4 | **Framework Overview Webinar** | `/resources/overview-webinar` | Video | 60-minute recorded webinar introducing all frameworks, implementation approach, success stories, Q&A. For school leadership teams. |

### Technical Documentation

Referenced from `resources.astro` lines 57-98, section `#technical`.

| # | Page | Route | Type | Description |
|---|------|-------|------|-------------|
| 5 | **Google Workspace Setup** | `/resources/google-workspace-setup` | Guide | Step-by-step guide for Google Workspace for Education setup. Screenshots and troubleshooting included. |
| 6 | **Moodle LMS Setup** | `/resources/moodle-setup` | Guide | Step-by-step Moodle LMS setup and configuration guide. |
| 7 | **Gibbon SIS Configuration** | `/resources/gibbon-sis-setup` | Guide | Gibbon Student Information System configuration guide. |
| 8 | **Nextcloud Storage** | `/resources/nextcloud-setup` | Guide | Nextcloud file storage and collaboration platform setup. |
| 9 | **SSO Integration** | `/resources/sso-integration` | Tutorial | Single Sign-On configuration connecting all school systems. Video walkthroughs and code samples. |
| 10 | **SIS-LMS Data Sync** | `/resources/sis-lms-integration` | Tutorial | API integration between Student Information System and Learning Management System. Data warehouse setup. |
| 11 | **Analytics & Reporting** | `/resources/analytics-setup` | Tutorial | Analytics pipelines and reporting dashboard setup. |
| 12 | **Troubleshooting Knowledge Base** | `/resources/knowledge-base` | Knowledge Base | Searchable database of common issues, error messages, solutions. Community-contributed fixes. (500+ articles planned) |
| 13 | **System Administration Manual** | `/frameworks/system-admin-manual.pdf` | PDF Download | IT admin guide: user management, backups, security, maintenance schedules, disaster recovery. (85 pages) |

### Pedagogical Resources

Referenced from `resources.astro` lines 101-143, section `#pedagogical`.

| # | Page | Route | Type | Description |
|---|------|-------|------|-------------|
| 14 | **Digital Literacy K-2** | `/resources/digital-literacy-k2` | Curriculum | K-2: Digital Citizenship Foundations. Lesson plans, activities, projects, assessments. |
| 15 | **Digital Literacy 3-5** | `/resources/digital-literacy-3-5` | Curriculum | 3-5: Digital Tools Mastery. Lesson plans, activities, projects, assessments. |
| 16 | **Digital Literacy 6-8** | `/resources/digital-literacy-6-8` | Curriculum | 6-8: Digital Competency & Coding. Lesson plans, activities, projects, assessments. |
| 17 | **Digital Literacy 9-12** | `/resources/digital-literacy-9-12` | Curriculum | 9-12: Advanced Digital & Career Skills. Lesson plans, activities, projects, assessments. |
| 18 | **PBL Templates** | `/resources/pbl-templates` | Templates | 25+ ready-to-use project-based learning templates. Rubrics, student worksheets, teacher facilitation guides. Mobile-optimized, offline-capable. |
| 19 | **Competency Rubrics** | `/frameworks/competency-rubrics.pdf` | PDF Download | Rubrics for grit, adaptability, collaboration, critical thinking, digital fluency. Portfolio assessment guides, badge/microcredential criteria. (30 pages) |
| 20 | **Teacher PD Module 1** | `/resources/teacher-pd-module1` | Training | Digital Pedagogy (10 hours). Workshop plans and facilitator guides. |
| 21 | **Teacher PD Module 2** | `/resources/teacher-pd-module2` | Training | Project-Based Learning (12 hours). Workshop plans and facilitator guides. |
| 22 | **Teacher PD Module 3** | `/resources/teacher-pd-module3` | Training | Competency Assessment (10 hours). Workshop plans and facilitator guides. |
| 23 | **Teacher PD Module 4** | `/resources/teacher-pd-module4` | Training | Technology Integration (8 hours). Workshop plans and facilitator guides. |

### Community & Support

Referenced from `resources.astro` lines 146-184, section `#community`.

| # | Page | Route | Type | Description |
|---|------|-------|------|-------------|
| 24 | **Office Hours** | `/resources/office-hours` | Registration | Monthly live Q&A sessions with nyuchi learning experts. Every second Tuesday, 2:00 PM CAT. Registration page with calendar integration. |
| 25 | **Peer Mentorship** | `/resources/peer-mentorship` | Program | Connect with schools 6-12 months ahead in implementation. Monthly check-ins, accountability partnerships. Application/request form. (3-6 month commitment) |
| 26 | **Success Stories** | `/resources/success-stories` | Case Studies | Case studies from schools across Africa, Asia, Latin America, Pacific. Lessons learned, timelines, results, challenges. (15+ schools profiled) |

### PDF Downloads (in `public/frameworks/`)

These are downloadable files referenced from the resources page, not Astro pages:

| # | File | Path | Status |
|---|------|------|--------|
| 27 | Readiness Checklist | `public/frameworks/readiness-checklist.pdf` | Not created |
| 28 | System Admin Manual | `public/frameworks/system-admin-manual.pdf` | Not created |
| 29 | Competency Rubrics | `public/frameworks/competency-rubrics.pdf` | Not created |

### External Links (no pages needed)

| Link | Destination | Notes |
|------|-------------|-------|
| Implementation Forums | `https://community.nyuchi.com` | External community platform (separate project) |

---

## Implementation Notes

### Suggested build order for resource sub-pages

1. **Getting Started** (items 1-4) - Highest value for new visitors
2. **Success Stories** (item 26) - Social proof, drives engagement
3. **Digital Literacy Curricula** (items 14-17) - Core educational content
4. **Technical Setup Guides** (items 5-8) - Practical implementation support
5. **Teacher PD Modules** (items 20-23) - Professional development
6. **Integration Tutorials** (items 9-11) - Advanced technical content
7. **Templates & Tools** (items 3, 18) - Supplementary materials
8. **Community Features** (items 24-25) - Requires backend/scheduling integration
9. **Knowledge Base** (item 12) - Large content effort, consider CMS integration
10. **PDF Downloads** (items 27-29) - Create alongside their parent features

### When resources are built, update:

- Remove the "Coming Soon" overlay from `src/pages/resources.astro` (lines 273-294)
- Remove the `/resources/[a-z]` skip rule from `tests/content-quality.test.js` (line 81)
- Remove the `href.includes('?')` skip for consultation tier links if those routes are defined (line 79)
- Add new pages to sitemap priorities in `astro.config.mjs`
- Update `CLAUDE.md` directory structure section

---

## Completed

_Items move here when their PR is merged._
