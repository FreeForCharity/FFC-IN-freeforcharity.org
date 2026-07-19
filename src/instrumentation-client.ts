// Sentry client-side instrumentation (loaded automatically by Next.js).
// This site is a static export (output: 'export'), so client-side error
// monitoring is the whole Sentry story here - there is no server runtime.
// The DSN is a public, client-side identifier (not a secret); it is baked
// into the bundle and visible in page source by design.
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://9475e69902cf8622dff931bb1f7bf2a9@o4511764182269952.ingest.us.sentry.io/4511764187643904',

  // Low-traffic charity site: capture all traces rather than sampling.
  tracesSampleRate: 1.0,

  // Session Replay: record nothing routinely, but capture the full session
  // when an error occurs.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()],

  // Setting this option to true will print useful information to the console
  // while setting up Sentry.
  debug: false,
})

// Instruments App Router navigations for tracing.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
