// Jest stub for @sentry/nextjs — unit tests require() App Router pages
// (e.g. the og-metadata sweep), and the real SDK's export map doesn't
// resolve under jest's CommonJS resolver. Only the APIs our code touches.
module.exports = {
  init: () => {},
  captureException: () => {},
  startSpan: (_opts, fn) => fn(),
  captureRouterTransitionStart: () => {},
  replayIntegration: () => ({}),
}
