'use client'

// Client half of the Sentry verification page: clicking the button throws a
// deliberate error that should appear as an issue in
// free-for-charity/javascript-nextjs within moments.
import * as Sentry from '@sentry/nextjs'
import { useState } from 'react'

class SentryExampleFrontendError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SentryExampleFrontendError'
  }
}

export default function SentryTestButton() {
  const [thrown, setThrown] = useState(false)

  return (
    <>
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
    </>
  )
}
