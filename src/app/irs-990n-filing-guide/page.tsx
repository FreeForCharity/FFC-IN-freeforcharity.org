import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'IRS Form 990-N Filing Guide',
  description:
    'Keep your 501(c)(3) alive: who files the 990-N e-Postcard, the deadline, the 8-minute filing walkthrough, and what happens if you miss three years.',
  canonical: '/irs-990n-filing-guide/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function Irs990nFilingGuide() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          The 8-Minute Filing That Keeps Your 501(c)(3) Alive
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Every year, thousands of small charities lose their tax-exempt status — not for doing
            anything wrong, but for{' '}
            <strong>missing a free 8-minute online filing three years in a row</strong>. Automatic
            revocation ends your ability to receive tax-deductible donations and disqualifies you
            from Microsoft, Google, and Candid nonprofit programs. This guide keeps that from
            happening.
          </p>

          <h2 className={h2}>Which form is yours?</h2>
          <ul>
            <li>
              <strong>Form 990-N (e-Postcard)</strong> — gross receipts{' '}
              <strong>normally $50,000 or less</strong>. Free, online, ~8 minutes. Most
              FFC-supported charities file this.
            </li>
            <li>
              <strong>Form 990-EZ</strong> — gross receipts under $200,000 and assets under
              $500,000.
            </li>
            <li>
              <strong>Form 990</strong> — everything larger.
            </li>
          </ul>
          <p>
            If you&rsquo;re near a threshold, ask your bookkeeper or a tax professional — this page
            is orientation, not tax advice.
          </p>

          <h2 className={h2}>The deadline (write this down)</h2>
          <p>
            The 990-N is due by{' '}
            <strong>the 15th day of the 5th month after your fiscal year ends</strong>:
          </p>
          <ul>
            <li>
              Calendar-year org (Dec 31 year end) → due <strong>May 15</strong>.
            </li>
            <li>June 30 year end → due November 15.</li>
          </ul>
          <p>
            Put a recurring reminder on your organization&rsquo;s calendar today — that one action
            prevents the whole failure mode.
          </p>

          <h2 className={h2}>Filing walkthrough</h2>
          <ol>
            <li>
              Go to the IRS 990-N page:{' '}
              <a
                href="https://www.irs.gov/charities-non-profits/annual-electronic-filing-requirement-for-small-exempt-organizations-form-990-n-e-postcard"
                target="_blank"
                rel="noopener noreferrer"
              >
                irs.gov — Form 990-N
              </a>{' '}
              and sign in (ID.me account; the person filing needs their own login).
            </li>
            <li>Add your organization by EIN the first time.</li>
            <li>
              Answer the short questionnaire: tax year, legal name/address, website, principal
              officer, and confirmation that receipts are normally ≤ $50,000.
            </li>
            <li>Submit and save the acceptance confirmation PDF with your records.</li>
          </ol>

          <h2 className={h2}>Already missed filings?</h2>
          <ul>
            <li>
              <strong>Missed one or two years:</strong> just file the current year now — there is no
              penalty for a late 990-N, and filing resets the three-year clock.
            </li>
            <li>
              <strong>Revoked (missed three):</strong> your org appears on the IRS auto-revocation
              list. Reinstatement is a real process (Form 1023/1023-EZ again) — get help, and do it
              quickly; donations received while revoked are not deductible.
            </li>
          </ul>

          <h2 className={h2}>Why FFC cares</h2>
          <p>
            Your <Link href="/guidestar-guide/">Candid seal</Link>,{' '}
            <Link href="/m365-email-guide/">Microsoft 365 grant</Link>, and{' '}
            <Link href="/google-for-nonprofits-guide/">Google for Nonprofits</Link> all depend on an
            active 501(c)(3). Compliance is the foundation everything else in our program sits on.
            If you&rsquo;re unsure of your status, check your org on the IRS{' '}
            <a
              href="https://www.irs.gov/charities-non-profits/search-for-tax-exempt-organizations"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tax Exempt Organization Search
            </a>{' '}
            — and <Link href="/contact-us/">tell us</Link> if something looks wrong.
          </p>
        </div>
      </div>
    </div>
  )
}
