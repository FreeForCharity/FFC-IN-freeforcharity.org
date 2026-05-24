'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/browser'

// Client-only Sentry initializer. Sits in the root layout as a sibling
// of CookieConsent so it loads as early as possible without depending
// on consent (errors and CSP violations are functional/necessary, not
// analytics — capturing them is required to keep the site running).
//
// No-op when NEXT_PUBLIC_SENTRY_DSN is unset, so the import + bundle
// cost is the only overhead until an operator wires Sentry up.
//
// We use @sentry/browser rather than @sentry/nextjs because this is a
// pure static export — there's no Next.js server runtime to integrate
// with, and @sentry/browser is significantly smaller.
const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || ''
const SENTRY_ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || 'production'

export default function SentryInit() {
  useEffect(() => {
    if (!SENTRY_DSN) return
    // Guard against double-init across React StrictMode double-effects
    // and Fast Refresh in dev.
    if ((window as unknown as { __sentry_inited?: boolean }).__sentry_inited) return
    ;(window as unknown as { __sentry_inited?: boolean }).__sentry_inited = true

    Sentry.init({
      dsn: SENTRY_DSN,
      environment: SENTRY_ENVIRONMENT,
      // Error capture only by default. Performance + session replay
      // are configurable cost surfaces; leave them off until the
      // operator opts in via dashboard quotas.
      tracesSampleRate: 0,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      // Skip the breadcrumb noise from extension-injected scripts —
      // those produce a flood of "ResizeObserver loop limit exceeded"
      // noise on this site (Cloudflare Email Obfuscation legacy, before
      // we disabled it; safer to belt-and-suspenders the filter).
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'ResizeObserver loop completed with undelivered notifications',
        // Network-noise from third-party widgets that we can't act on
        'NetworkError',
        'Failed to fetch',
      ],
    })
  }, [])

  return null
}
