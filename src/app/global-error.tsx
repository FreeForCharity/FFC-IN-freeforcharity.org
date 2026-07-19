'use client'

// Root-level error boundary: reports any unhandled render error to Sentry
// and shows a minimal recovery UI. Required for App Router error capture.
import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div style={{ padding: '4rem 1rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2>Something went wrong</h2>
          <p>The error has been reported and we&apos;ll look into it.</p>
          <button
            onClick={() => reset()}
            style={{ padding: '0.5rem 1.25rem', marginTop: '1rem', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
