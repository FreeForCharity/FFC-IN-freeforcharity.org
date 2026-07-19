'use client'

// Sentry verification page (see the Sentry onboarding "Verify" step):
// clicking the button throws a deliberate error that should appear as an
// issue in free-for-charity/javascript-nextjs within moments.
import * as Sentry from '@sentry/nextjs'
import { useState } from 'react'

class SentryExampleFrontendError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SentryExampleFrontendError'
  }
}

export default function SentryExamplePage() {
  const [thrown, setThrown] = useState(false)

  return (
    <main style={{ padding: '4rem 1rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Sentry Test Page</h1>
      <p>
        Click the button to send a test error to Sentry. If an issue appears in the free-for-charity
        project, monitoring is working.
      </p>
      <button
        type="button"
        style={{ padding: '0.5rem 1.25rem', marginTop: '1rem', cursor: 'pointer' }}
        onClick={() => {
          setThrown(true)
          Sentry.startSpan({ op: 'test', name: 'Sentry Example Frontend Span' }, () => {
            throw new SentryExampleFrontendError(
              'This error was thrown on purpose from sentry-example-page.'
            )
          })
        }}
      >
        Throw test error
      </button>
      {thrown && <p style={{ marginTop: '1rem' }}>Error thrown — check Sentry Issues.</p>}
    </main>
  )
}
