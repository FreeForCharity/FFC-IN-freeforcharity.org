# FreeForCharity.org WordPress-to-Next.js Migration Plan

> **Last updated:** 2026-02-17
> **Permanent WordPress snapshot:** Tag [`wordpress-static-export-2026-02-16`](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/tree/wordpress-static-export-2026-02-16) (5,198 files, protected by GitHub ruleset)

---

## Overview

Migrate freeforcharity.org from WordPress/Divi (hosted on WPMUDEV cPanel at `66.45.234.13`) to a fully static Next.js site deployed via GitHub Pages. Cloudflare provides DNS and DDoS protection only (no CDN caching, Workers, or Page Rules).

### Key Decisions

1. **Repo:** `FFC-IN-freeforcharity.org` (FFC naming convention, `FFC-IN-` = internal/platform)
2. **Source:** Based on `freeforcharity-web` content (29 pages), upgraded to `FFC_Single_Page_Template` standards
3. **No CMS:** All content hardcoded in components (no Decap CMS)
4. **Homepage:** Uses the Figma redesign from `freeforcharity-web`, not the WordPress/Divi layout
5. **Footer & Team:** Mandatory FFC-wide standards, enforced on all charity sites

---

## Progress Tracker

### Phase 1 - Content Audit & Simply Static Export --- COMPLETE

| Issue | Title | Status |
|-------|-------|--------|
| [#32](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/32) | WordPress content audit via REST API | Closed |
| [#33](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/33) | Simply Static export from WordPress | Closed |
| [#34](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/34) | URL mapping - WordPress to Next.js routes | Closed |
| [#35](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/35) | Media asset inventory | Closed |
| [#36](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/36) | Content ownership matrix | Closed |

**Deliverables:**
- 60 WordPress pages inventoried
- 5,198-file static export preserved as protected Git tag
- URL mapping: 24 pages already in Next.js, ~9 needing builds, ~23 droppable
- 2,358 images + 67 fonts cataloged
- Azure Bot Direct Line tokens redacted from 56 HTML files

---

### Phase 2 - Architecture & New Repo --- IN PROGRESS

| Issue | Title | Status | PR |
|-------|-------|--------|-----|
| [#14](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/14) | Add CLAUDE.md, AGENTS.md, and AI tooling configs | PR ready | [#1](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/pull/1) |
| [#10](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/10) | Fix mandatory Footer component issues | PR ready | [#2](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/pull/2) |
| [#11](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/11) | Fix mandatory Team section issues | PR ready | [#3](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/pull/3) |
| [#13](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/13) | Add SEO metadata to all pages | PR ready | [#4](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/pull/4) |
| [#5](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/5) | Upgrade to Next.js 16 + Tailwind CSS 4 | Not started | |
| [#6](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/6) | Add CI/CD pipeline (4 workflows) | Not started | |
| [#7](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/7) | Add testing infrastructure (Jest, Playwright, axe-core) | Not started | |
| [#8](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/8) | Add code quality tooling (Husky, commitlint, Prettier, ESLint) | Not started | |
| [#9](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/9) | Add assetPath() helper for GitHub Pages | Not started | |
| [#12](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/12) | Build missing WordPress pages (~9 pages) | Not started | |

---

### Phase 3 - Content Migration --- NOT STARTED

| Issue | Title | Status |
|-------|-------|--------|
| [#15](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/15) | Migrate WordPress images to public/ and convert to WebP | Not started |
| [#16](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/16) | Verify and update data files (team, FAQ, testimonials) | Not started |
| [#17](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/17) | Page-by-page content verification against WordPress | Not started |
| [#18](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/18) | Add Google Tag Manager and Cookie Consent components | Not started |

---

### Phase 4 - Testing --- NOT STARTED

| Issue | Title | Status |
|-------|-------|--------|
| [#19](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/19) | Add Jest unit tests for all page components | Not started |
| [#20](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/20) | Add Playwright E2E tests for navigation and core flows | Not started |
| [#21](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/21) | Configure and run Lighthouse CI benchmarks | Not started |
| [#22](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/22) | Accessibility audit (WCAG 2.1 AA compliance) | Not started |
| [#23](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/23) | Run broken link check with Linkinator | Not started |
| [#24](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/24) | Visual regression comparison (WordPress vs Next.js) | Not started |
| [#25](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/25) | SEO preservation verification | Not started |

---

### Phase 5 - Deployment --- NOT STARTED

| Issue | Title | Status |
|-------|-------|--------|
| [#26](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/26) | Configure GitHub Pages on FFC-IN-freeforcharity.org | Not started |
| [#27](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/27) | Configure Cloudflare Bulk Redirects for changed URLs | Not started |
| [#28](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/28) | Staging deployment and pre-cutover verification | Not started |
| [#29](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/29) | Execute DNS cutover from WordPress to GitHub Pages | Not started |
| [#30](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/30) | Document rollback procedure | Not started |

---

### Phase 6 - Documentation --- NOT STARTED

| Issue | Title | Status |
|-------|-------|--------|
| [#31](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/31) | Update FFC-IN-freeforcharity.org README with architecture docs | Not started |

Additional Phase 6 work (to be tracked in `FFC-IN-ffcadmin.org`):
- WordPress-to-Next.js Conversion Guide page on ffcadmin.org
- Update ffcadmin.org navigation with guide link

---

## Architecture

### Current Stack (WordPress)

```
User -> Cloudflare (DNS + DDoS) -> cPanel 66.45.234.13 -> WordPress/Divi
```

### Target Stack (Next.js)

```
User -> Cloudflare (DNS + DDoS) -> GitHub Pages -> Next.js static export
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (currently 15.5.2, upgrading to 16) |
| Styling | Tailwind CSS (upgrading to v4) |
| Hosting | GitHub Pages |
| DNS/Security | Cloudflare (DNS-only mode + DDoS) |
| CI/CD | GitHub Actions (CI, CodeQL, Deploy, Lighthouse) |
| Testing | Jest, Playwright, jest-axe, Lighthouse CI |
| Code Quality | ESLint, Prettier, Husky, commitlint, Linkinator |

### Build Configuration

```js
// next.config.ts
{
  output: 'export',           // Static HTML export
  images: { unoptimized: true }, // GitHub Pages can't optimize
  trailingSlash: true          // /about-us/ not /about-us
}
```

---

## Mandatory FFC Standards

### Footer - 3-Column Layout

Every FFC charity site must include:

| Column | Contents |
|--------|----------|
| **Endorsements** | GuideStar Platinum Seal (linked), EIN display |
| **Quick Links** | All page links + 6 mandatory policies (Donation, Privacy, Cookie, Terms, Vulnerability Disclosure, Security Acknowledgements) |
| **Contact Us** | Email, Phone, Address(es) with map links, Social media icons (Facebook, X, LinkedIn, GitHub) |
| **Bottom Bar** | Copyright with year, org name, 501(c)(3) status, FFC attribution |

### Team Section - Grid Layout

Every FFC charity site must include a Team section with:
- Circular photos (300x300px, ring-4 white border, shadow)
- Full name, title/role, LinkedIn link
- Responsive grid: 3 cols desktop, 2 tablet, 1 mobile
- Reusable `TeamMemberCard` component

---

## Homepage Section Order (Figma Redesign)

The homepage follows the Figma redesign, not the WordPress/Divi layout or template default:

1. Hero
2. Mission
3. SupportFreeForCharity
4. Endowment Features
5. Our Programs
6. Volunteer with Us
7. Results 2023
8. VoicesofGratitude (Testimonials)
9. TheFreeForCharityTeam
10. FrequentlyAskedQuestions

Notable: No Events section (removed in redesign).

---

## DNS Cutover Procedure

1. Cloudflare: Change `freeforcharity.org` A record (`66.45.234.13`) to CNAME `freeforcharity.github.io`
2. Configure GitHub Pages custom domain on this repo
3. Wait for GitHub HTTPS certificate provisioning
4. Verify all pages at `https://freeforcharity.org`
5. Keep WordPress running 2+ weeks post-cutover for rollback safety

### Rollback

Revert Cloudflare DNS A record to `66.45.234.13`. WordPress remains untouched until verified.

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Content drift after audit | Medium | Freeze WordPress edits after Phase 1 |
| URL changes breaking SEO | High | Cloudflare Bulk Redirects + Google Search Console |
| Downtime during cutover | High | Staging test first, rollback plan ready |
| Forms/dynamic features lost | Medium | Contact forms via external service, donations via Zeffy |
| WordPress decommissioned too early | High | Keep running 2+ weeks post-cutover |

---

## Verification Checklist

- [ ] `pnpm build` completes with zero errors
- [ ] `pnpm test` and `pnpm test:e2e` all pass
- [ ] CI/CD: push to main triggers CI -> CodeQL -> Deploy -> Lighthouse
- [ ] All pages load at `https://freeforcharity.org`
- [ ] Lighthouse: Performance >= 90, Accessibility >= 95, Best Practices >= 90, SEO >= 90
- [ ] Changed URLs return 301 redirects
- [ ] Google Search Console clean, sitemap accepted
- [ ] Footer: all 3 columns with all mandatory elements
- [ ] Team: all members displayed with photos, titles, LinkedIn links
- [ ] Rollback verified: DNS revert restores WordPress
