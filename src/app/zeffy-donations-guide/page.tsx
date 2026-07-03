import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fee-Free Donations with Zeffy',
  description:
    'Stop losing 3-5% of every gift: how FFC charities accept online donations with Zeffy — signup, embedding on your site, receipts, and payouts.',
  alternates: { canonical: '/zeffy-donations-guide/' },
}

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function ZeffyDonationsGuide() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Fee-Free Donations with Zeffy
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Typical donation processors keep 3–5% of every gift (a $100 donation arrives as $95–97).{' '}
            <strong>Zeffy charges nonprofits nothing</strong> — 100% of each donation reaches you,
            including card fees. Zeffy is funded by optional tips donors add at checkout. Free For
            Charity uses Zeffy for its own fundraising (you can see it live on our{' '}
            <Link href="/donate/">donate page</Link>), and we recommend it to every charity we
            support.
          </p>

          <h2 className={h2}>Is the model legit?</h2>
          <p>
            The honest trade-off: your donors see a pre-filled &ldquo;contribution to Zeffy&rdquo;
            field at checkout, which they can set to zero. Some donors find it surprising, so tell
            them 100% of their gift reaches you. FFC has processed real donations on Zeffy since
            2024 — payouts arrive as promised, with no fees withheld.
          </p>

          <h2 className={h2}>Step 1 — Create your account</h2>
          <ol>
            <li>
              Sign up at{' '}
              <a href="https://www.zeffy.com/" target="_blank" rel="noopener noreferrer">
                zeffy.com
              </a>{' '}
              using an email at your domain (<Link href="/m365-email-guide/">get one free</Link>).
            </li>
            <li>Verify your nonprofit (EIN + bank details for payouts).</li>
            <li>
              Create your first form: a simple donation form with suggested amounts, monthly giving
              on, and your logo.
            </li>
          </ol>

          <h2 className={h2}>Step 2 — Put it on your FFC-hosted site</h2>
          <p>
            Zeffy forms work perfectly on the static sites FFC builds. Two patterns (your FFC
            volunteer can add either — just send us the form link):
          </p>
          <ul>
            <li>
              <strong>Embedded form:</strong> the donation form renders directly on your donate
              page.
            </li>
            <li>
              <strong>Pop-up button:</strong> a &ldquo;Donate&rdquo; button that opens the form in a
              modal — this is what freeforcharity.org uses site-wide.
            </li>
          </ul>

          <h2 className={h2}>Step 3 — Receipts, payouts, and records</h2>
          <ul>
            <li>
              Zeffy issues <strong>automatic tax receipts</strong> to donors (configure your EIN and
              signature once).
            </li>
            <li>Payouts land in your bank account; no minimums that matter in practice.</li>
            <li>
              Export donor data anytime (CSV) — it&rsquo;s your donor list, keep a copy with your
              records.
            </li>
          </ul>

          <h2 className={h2}>Beyond the basic form</h2>
          <p>
            Zeffy also does event tickets, raffles (where legal), memberships, peer-to-peer
            campaigns, and e-commerce — all at 0% fees. Start with one donation form; add the rest
            when a real need appears.
          </p>

          <p className="mt-8">
            Want help setting it up or embedding it? <Link href="/contact-us/">Contact us</Link> —
            it&rsquo;s usually a same-week volunteer task.
          </p>
        </div>
      </div>
    </div>
  )
}
