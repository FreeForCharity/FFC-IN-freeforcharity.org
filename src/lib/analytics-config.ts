// Public analytics / widget IDs.
//
// These are NOT secrets. Every one of them is emitted into the client
// HTML/JS of any site that uses them and is trivially visible in page
// source — GA4 measurement IDs, GTM container IDs, Clarity project IDs,
// and Tawk.to property IDs are all public by design. Treating them as
// GitHub Actions "secrets" gave no security benefit and had a real cost:
// only the production deploy workflow injected them, so CI builds, local
// builds, and Playwright runs all built with empty IDs — meaning the
// analytics integration was untestable and only worked in production.
//
// Committing the real production values here as defaults makes the
// integration identical across every build (local, CI, production) and
// testable in Playwright. Each value is still overridable via its
// NEXT_PUBLIC_* env var, so a staging deploy can point at different
// properties by setting the env var at build time.
//
// Anything genuinely secret (FTP creds, API tokens) stays in GitHub
// Actions secrets and never appears here.
//
// `??` (not `||`) so a build can DISABLE an integration by setting its
// env var to an empty string — e.g. a staging build with
// `NEXT_PUBLIC_GA_MEASUREMENT_ID=""` gets an empty ID (loader no-ops),
// whereas `||` would treat "" as falsy and fall back to the default,
// making it impossible to turn off. An unset var is `undefined`, which
// `??` correctly resolves to the default.

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-541Y8JRDLX'

export const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? 'GTM-NJ4DXH9'

/**
 * How GA4 is delivered. This is the cutover switch, and getting it wrong
 * in either direction is silent, so it is a single named value rather
 * than an inference from what happens to be on `window`.
 *
 *   'gtm'    — GTM's Google tag loads gtag.js and configures GA4, and the
 *              conversion events reach GA4 through GTM tags listening on
 *              the dataLayer. This site must NOT load gtag.js itself and
 *              must NOT call gtag('event', …): the GTM event tags fire
 *              from the same dataLayer push, so doing both double-counts
 *              every conversion.
 *   'direct' — this site loads gtag.js and calls gtag('event', …) itself.
 *              GTM may still load, but carries no GA4 tag.
 *
 * The two modes must never overlap. Both send to the same measurement ID,
 * and double-counted pageviews look entirely plausible in GA4 — there is
 * no error, no warning, and no way to separate them afterwards.
 *
 * DEFAULT IS 'gtm' as of the cutover (issue #510) — which means THIS REPO
 * ALONE DOES NOT DELIVER GA4. Under 'gtm' the site emits nothing itself;
 * measurement exists only while GTM container version 2 is published, a
 * state nothing here can assert. A green build is not evidence that
 * anything is being measured.
 *
 * This value briefly defaulted to 'direct' so that merging could not
 * silently disable GA4 before anyone had decided to switch — an
 * accidental cutover is the dangerous one, because a forgotten GTM
 * publish leaves zero measurement. That decision has since been made
 * deliberately, so the default reflects the intended production setup.
 *
 * It is set here rather than as a deploy-only env var on purpose: the
 * tests assert behaviour against this constant, so a build-time override
 * in production alone would leave every test exercising the mode
 * production does NOT run. Keeping them identical is the point.
 *
 * Under 'gtm' this site emits no GA4 itself — measurement depends
 * entirely on GTM container version 2 being published. Order of
 * operations, once more: deploy this, THEN publish. Publishing first
 * means both paths fire GA4 until the deploy lands.
 *
 * ROLLBACK: build with NEXT_PUBLIC_GA_DELIVERY=direct and redeploy, which
 * restores the self-contained gtag path including the verified `linker`.
 * Unpublishing the GTM version alone would leave no GA4 at all.
 */
export const GA_DELIVERY: 'gtm' | 'direct' =
  process.env.NEXT_PUBLIC_GA_DELIVERY === 'direct' ? 'direct' : 'gtm'

export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? 'nzldyj4h3k'

export const TAWK_TO_PROPERTY =
  process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY ?? '65bf15eb0ff6374032c915d9/1hlp6r8hc'

// Domains that share a measurement session with this site.
//
// Zeffy hosts every donation form, and once Zeffy fires this property's
// measurement ID on their pages (requested via their Google Analytics
// set-up form), an undecorated hop from here to there starts a NEW
// session attributed to freeforcharity.org as a referral — double-counting
// sessions and detaching donations from the campaign that drove them.
//
// The gtag `linker` below decorates outbound ANCHOR clicks with `_gl`,
// which covers the pop-up buttons and hosted-form links. Two caveats,
// deliberately recorded rather than papered over:
//
//  1. It does NOT cover the embedded iframe on /donate — a linker
//     decorates links, not iframe `src` attributes. Continuity for the
//     embed would need `_gl` appended to the src explicitly.
//  2. For GA4, the authoritative cross-domain setting lives in the Admin
//     UI (Data Streams -> Configure tag settings -> Configure your
//     domains). It is exposed by NO API: verified against the
//     analyticsadmin v1beta and v1alpha discovery documents (no
//     domain/tag-settings resource), and the Tag Manager `gtag_config`
//     endpoint only governs tags fired through a GTM container, which
//     this property's tag is not. The UI step is still required.
//
// APPLIES ONLY IN 'direct' DELIVERY. The linker rides on the gtag config
// this site emits, and under GA_DELIVERY = 'gtm' that config is GTM's,
// not ours — cross-domain then comes from the `linker_domains` entry on
// the Google tag in container version 2. That entry is stored but
// UNVERIFIED (the Tag Manager API accepts arbitrary config keys, which
// proves storage and nothing else), so confirm decoration with Tag
// Assistant at cutover: click a donate link and check the Zeffy URL
// carries a `_gl` parameter. If it does not, cross-domain is silently
// off and donations detach from the campaign that drove them.
//
// Both apex and `www.` hosts are listed explicitly. Every campaign link
// this site renders is built from ZEFFY_BASE, which is
// `https://www.zeffy.com` — so listing only the apex would rely on the
// linker's host matching being suffix-based, and a mismatch fails
// silently: links go undecorated, sessions split on the hop, and nothing
// in the UI or the logs says so. Naming the exact hosts we link to costs
// nothing and removes the assumption.
//
// ffcadmin.org is deliberately absent: it reports to a separate GA4
// property, and cross-domain linking only joins sessions within one.
export const CROSS_DOMAIN_DOMAINS = [
  'freeforcharity.org',
  'www.freeforcharity.org',
  'zeffy.com',
  'www.zeffy.com',
]

// No Meta Pixel configured yet — stays empty until an operator sets the
// env var (or adds a default here once a real ID exists). Empty = the
// corresponding loader is a no-op.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''
