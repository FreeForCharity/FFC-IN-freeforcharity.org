# Cutover Redirect Plan

URL changes between the WordPress site (`wordpress-static-export-2026-02-16`
tag, 60 pages) and the Next.js redesign (~36 routes).

**Primary implementation:** [`public/.htaccess`](../public/.htaccess)
ships with the static export and handles every redirect listed below at
the InterServer Apache origin. No Cloudflare changes are required for
the redirects to fire.

**Cloudflare Bulk Redirects: DO NOT enable by default.** The same
redirects are available as a Cloudflare [Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/)
import file at [`docs/cutover-redirects.csv`](cutover-redirects.csv).
`.htaccess` is the single source of truth. Enabling the Cloudflare
rule on top would double-source the redirect map and force every
edit to happen in two places.

**Enable the Cloudflare rule only if:**

- `.htaccess` is ever removed (e.g. migrating off cPanel to a static
  host without `.htaccess` semantics), or
- you specifically want to preempt the origin hop for crawler traffic
  during heavy 301 storms.

The CSV is otherwise dead-weight kept in sync as a backup. Don't
touch the toggle without updating this doc.

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

| WordPress                                                                | Next.js                                |
| ------------------------------------------------------------------------ | -------------------------------------- |
| `/free-for-charity-terms-of-service/`                                    | `/terms-of-service/`                   |
| `/charity-and-nonprofit-case-studies-to-help-your-organization-succeed/` | `/charity-and-nonprofit-case-studies/` |

### PayPal callback URLs (302, preserve query string)

PayPal hosted buttons `9ZKQ23YC3G2J2` (Monthly / One Time donations and
the "Donate Today" CTA) and `243G37NHXSRY8` (Large Donations card on
`/donate`) return donors to these paths after payment. They must not
404 on cutover day.

| WordPress                 | Next.js    | Reason                                  |
| ------------------------- | ---------- | --------------------------------------- |
| `/donation-confirmation/` | `/donate/` | Preserve `?tx=...&st=...` PayPal params |
| `/donation-failed/`       | `/donate/` | Preserve PayPal cancel params           |

> **Follow-up:** the WP versions had dedicated "Thank You" / "Try Again"
> pages. Filed as a separate issue for design review before cutover.

### Content consolidation (301)

| WordPress                                                          | Next.js                | Reason                                   |
| ------------------------------------------------------------------ | ---------------------- | ---------------------------------------- |
| `/free-for-charity-just-earned-the-platinum-seal-of-transparency/` | `/blog/`               | Legacy blog post                         |
| `/our-organization-earned-a-2021-platinum-seal-of-transparency/`   | `/blog/`               | Legacy blog post                         |
| `/we-just-updated-for-the-2022-guidestar-platinum-seal/`           | `/blog/`               | Legacy blog post                         |
| `/using-a-registered-agent-service-northwest-registered-agent/`    | `/blog/`               | Legacy blog post                         |
| `/podio-sponsorship-program/`                                      | `/help-for-charities/` | Closest content match                    |
| `/what-is-the-cost/`                                               | `/help-for-charities/` | Pricing FAQ rolled into help page        |
| `/testimonial/american-legion-ahwatukee-post-64/`                  | `/#testimonials`       | Inlined on homepage                      |
| `/testimonial/keith-ray/`                                          | `/#testimonials`       | Inlined on homepage                      |
| `/testimonial/pardhasaradhi-namburi/`                              | `/#testimonials`       | Inlined on homepage                      |
| `/testimonial/tashonda-payne/`                                     | `/#testimonials`       | Inlined on homepage                      |
| `/donor-dashboard/`                                                | `/donate/`             | WP-only logged-in dashboard removed      |
| `/submit-information/`                                             | `/contact-us/`         | WP "Coming Soon" Forminator page dropped |

### Dropped archives / WP plumbing (301 → home)

WordPress generates author, category, and Divi-builder taxonomy archives that
have no Next.js equivalent. Redirect to home to avoid 404s on stray external
inbound links.

`/author/{adagraves,admin,clarkemoyer,globaladmin,joel,tempmigrationadmin}/`,
`/category/uncategorized/`, `/layout_type/{row,section}/`,
`/module_width/regular/`, `/scope/not_global/`, `/sample-page/`,
`/codetest/`, `/__qs/`.

---

## Primary Operator Steps (Apache `.htaccess`)

No action required at cutover. The rules are part of
[`public/.htaccess`](../public/.htaccess), which is included in
`out/.htaccess` after `next build` and uploaded as part of the cPanel
deploy. They activate the moment the document root is swapped to
`public_html_next` (see `docs/CUTOVER-HANDOFF.md`).

After cutover, smoke-test 5 sample URLs in an incognito browser:

- `/free-for-charity-terms-of-service/` → `/terms-of-service`
- `/charity-and-nonprofit-case-studies-to-help-your-organization-succeed/` → `/charity-and-nonprofit-case-studies`
- `/testimonial/keith-ray/` → `/#testimonials`
- `/donation-confirmation/?tx=ABC123` → `/donate?tx=ABC123` (query preserved)
- `/sample-page/` → `/`

---

## Cloudflare Bulk Redirects (do NOT enable by default — see top of file)

The intro section at the top of this document is the authoritative
guidance: **skip this by default**. The CSV is shipped as a backup,
not as something to flip on alongside `.htaccess`. The steps below
exist so that, if the day comes when `.htaccess` is removed (e.g.
migrating off cPanel) or you need edge-side preemption for a 301
storm, you have a documented path to enable the rule without
guessing. Until then, don't.

1. Sign in to [dash.cloudflare.com](https://dash.cloudflare.com) →
   account level (not zone) → **Bulk Redirects**.
2. Create a **Bulk Redirect List** named `ffc-wp-to-next-cutover`.
3. **Import URLs** → upload `docs/cutover-redirects.csv`. Verify status
   codes (301 for slug/content, 302 for the two PayPal callbacks) and
   query-string preservation for the PayPal rows.
4. Create a **Bulk Redirect Rule** that references the list. Scope:
   `freeforcharity.org` and `www.freeforcharity.org`.
5. Enable the rule whenever you like — the `.htaccess` already covers
   the same URLs at the origin.

---

## Rollback

The cutover rollback (cPanel document-root swap from `public_html_next`
back to `public_html`) automatically deactivates all `.htaccess`
redirects, because the old `public_html/.htaccess` (WordPress) takes
over. No separate redirect-rollback step needed.

If Cloudflare Bulk Redirects are enabled, disable that rule in
Cloudflare with a single toggle.

---

_Last updated: 2026-05-15 (pivoted from Cloudflare-primary to Apache-primary after the cPanel target was confirmed)._
