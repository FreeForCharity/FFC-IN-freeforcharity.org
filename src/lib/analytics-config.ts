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

// No Meta Pixel or Sentry project configured yet — these stay empty
// until an operator sets the env var (or adds a default here once a
// real ID exists). Empty = the corresponding loader is a no-op.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''

export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN ?? ''

export const SENTRY_ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? 'production'
