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
// ffcadmin.org is deliberately absent: it reports to a separate GA4
// property, and cross-domain linking only joins sessions within one.
export const CROSS_DOMAIN_DOMAINS = ['freeforcharity.org', 'zeffy.com']

// No Meta Pixel configured yet — stays empty until an operator sets the
// env var (or adds a default here once a real ID exists). Empty = the
// corresponding loader is a no-op.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''
