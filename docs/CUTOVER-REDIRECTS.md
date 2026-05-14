# Cutover Redirect Plan

URL changes between the WordPress site (`wordpress-static-export-2026-02-16` tag,
60 pages) and the Next.js redesign (~36 routes). Source for Cloudflare
[Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/).

**Status:** Source data prepared (`docs/cutover-redirects.csv`). Cloudflare
upload requires a human with zone access — see Operator Steps below.

---

## URL inventory deltas

### Matches (no redirect needed)

These 28 WordPress slugs are preserved verbatim in Next.js and require no
action:

`/`, `/501c3/`, `/about-us/`, `/blog/`, `/charity-and-nonprofit-service-and-consultant-directory/`,
`/charity-and-nonprofit-technology-directory/`, `/charity-validation-guide-…-validation-processes/`,
`/consulting/`, `/contact-us/`, `/domains/`, `/donate/`,
`/ffc-volunteer-proving-ground-core-competencies/`, `/ffcadmin/`,
`/free-charity-web-hosting/`, `/free-for-charity-donation-policy/`,
`/free-for-charity-endowment-fund/`, `/free-for-charity-ffc-service-delivery-stages/`,
`/free-for-charity-ffc-web-developer-training-guide/`,
`/free-for-charitys-tools-for-success/`, `/free-training-programs/`,
`/guidestar-guide/`, `/help-for-charities/`, `/online-impacts-onboarding-guide/`,
`/pre501c3/`, `/privacy-policy/`, `/security-acknowledgements/`,
`/techstack/`, `/volunteer/`, `/vulnerability-disclosure-policy/`,
`/workforce-development/`.

### Slug changes (301)

| WordPress | Next.js |
|-----------|---------|
| `/free-for-charity-terms-of-service/` | `/terms-of-service/` |
| `/charity-and-nonprofit-case-studies-to-help-your-organization-succeed/` | `/charity-and-nonprofit-case-studies/` |

### PayPal callback URLs (302, preserve query string)

PayPal hosted button `9ZKQ23YC3G2J2` (see `src/components/donate-components/measurable-impact/index.tsx`)
returns donors to these paths after payment. They must not 404 on cutover day.

| WordPress | Next.js | Reason |
|-----------|---------|--------|
| `/donation-confirmation/` | `/donate/` | Preserve `?tx=...&st=...` PayPal params |
| `/donation-failed/` | `/donate/` | Preserve PayPal cancel params |

> **Follow-up:** the WP versions had dedicated "Thank You" / "Try Again"
> pages. Filed as a separate issue for design review before cutover.

### Content consolidation (301)

| WordPress | Next.js | Reason |
|-----------|---------|--------|
| `/free-for-charity-just-earned-the-platinum-seal-of-transparency/` | `/blog/` | Legacy blog post |
| `/our-organization-earned-a-2021-platinum-seal-of-transparency/` | `/blog/` | Legacy blog post |
| `/we-just-updated-for-the-2022-guidestar-platinum-seal/` | `/blog/` | Legacy blog post |
| `/using-a-registered-agent-service-northwest-registered-agent/` | `/blog/` | Legacy blog post |
| `/podio-sponsorship-program/` | `/help-for-charities/` | Closest content match |
| `/what-is-the-cost/` | `/help-for-charities/` | Pricing FAQ rolled into help page |
| `/testimonial/american-legion-ahwatukee-post-64/` | `/#testimonials` | Inlined on homepage |
| `/testimonial/keith-ray/` | `/#testimonials` | Inlined on homepage |
| `/testimonial/pardhasaradhi-namburi/` | `/#testimonials` | Inlined on homepage |
| `/testimonial/tashonda-payne/` | `/#testimonials` | Inlined on homepage |
| `/donor-dashboard/` | `/donate/` | WP-only logged-in dashboard removed |
| `/submit-information/` | `/contact-us/` | WP "Coming Soon" Forminator page dropped |

### Dropped archives / WP plumbing (301 → home)

WordPress generates author, category, and Divi-builder taxonomy archives that
have no Next.js equivalent. Redirect to home to avoid 404s on stray external
inbound links.

`/author/{adagraves,admin,clarkemoyer,globaladmin,joel,tempmigrationadmin}/`,
`/category/uncategorized/`, `/layout_type/{row,section}/`,
`/module_width/regular/`, `/scope/not_global/`, `/sample-page/`,
`/codetest/`, `/__qs/`.

---

## Operator Steps (Cloudflare Bulk Redirects)

1. Sign in to [dash.cloudflare.com](https://dash.cloudflare.com) → account
   level (not zone) → **Bulk Redirects**.
2. Create a new **Bulk Redirect List** named `ffc-wp-to-next-cutover`.
3. **Import URLs** → upload `docs/cutover-redirects.csv`.
   - Verify "Status code" maps to the third column (301 for slug/content,
     302 for the two PayPal return URLs).
   - For the two PayPal rows, ensure **Preserve query string = enabled** so
     `?tx=...&st=...` reach `/donate/`.
4. Create a **Bulk Redirect Rule** that references the list. Scope: HTTP
   requests to `freeforcharity.org` and `www.freeforcharity.org`.
5. **Do NOT enable** the rule yet — keep it staged until DNS is flipped.
   When the cutover deploy goes live, enable the rule in the same maintenance
   window.
6. After enabling, smoke-test 5 sample URLs from each category in an
   incognito browser:
   - `/free-for-charity-terms-of-service/` → `/terms-of-service/`
   - `/charity-and-nonprofit-case-studies-…-succeed/` → `/charity-and-nonprofit-case-studies/`
   - `/testimonial/keith-ray/` → `/#testimonials`
   - `/donation-confirmation/?tx=ABC123` → `/donate/?tx=ABC123`
   - `/sample-page/` → `/`

---

## Rollback

If a redirect misroutes high-traffic content, disable the Bulk Redirect rule
in Cloudflare (single toggle). The list can stay imported — only the rule
attachment determines whether redirects fire.

---

_Last updated: 2026-05-12_
