// Sentry verification page (see the Sentry onboarding "Verify" step).
// Server component so it can export route metadata (site standard: every
// page carries matching openGraph/twitter fields); the error-throwing
// button lives in the client half.
import type { Metadata } from 'next'
import SentryTestButton from './sentry-test-button'

const title = 'Sentry Test Page'
const description =
  'Internal verification page for Sentry error monitoring. Clicking the button sends a deliberate test error.'

export const metadata: Metadata = {
  title,
  description,
  // Internal tooling page - keep it out of search engines and the sitemap.
  robots: { index: false, follow: false },
  openGraph: { title, description },
  twitter: { title, description },
}

export default function SentryExamplePage() {
  return (
    <main style={{ padding: '4rem 1rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>{title}</h1>
      <p>
        Click the button to send a test error to Sentry. If an issue appears in the free-for-charity
        project, monitoring is working.
      </p>
      <SentryTestButton />
    </main>
  )
}
