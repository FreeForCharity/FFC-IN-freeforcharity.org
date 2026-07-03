import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'Google for Nonprofits & Ad Grants',
  description:
    'Claim Google for Nonprofits with your FFC-hosted site: eligibility, verification, the $10,000/month Ad Grant, and the rules that keep it active.',
  canonical: '/google-for-nonprofits-guide/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function GoogleForNonprofitsGuide() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Google for Nonprofits &amp; the $10,000/Month Ad Grant
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Most charities we support qualify for Google for Nonprofits and never claim it. The
            program is free and includes <strong>Google Ad Grants</strong> — up to{' '}
            <strong>$10,000 per month of in-kind search advertising</strong> — plus the YouTube
            Nonprofit Program and discounted Workspace. If FFC hosts your site, you already meet the
            website-quality requirements the Ad Grant demands.
          </p>

          <h2 className={h2}>Eligibility</h2>
          <ul>
            <li>Registered 501(c)(3) in good standing (verified via Goodstack/Percent).</li>
            <li>
              Not a hospital/healthcare org, school, or government entity (those have separate
              programs).
            </li>
            <li>A working website that describes your mission — your FFC site.</li>
          </ul>

          <h2 className={h2}>Step 1 — Request the account</h2>
          <ol>
            <li>
              Go to{' '}
              <a
                href="https://www.google.com/nonprofits/"
                target="_blank"
                rel="noopener noreferrer"
              >
                google.com/nonprofits
              </a>{' '}
              and click <strong>Get started</strong>.
            </li>
            <li>
              Verify your nonprofit through Google&rsquo;s validation partner (you&rsquo;ll need
              your EIN and an email at your domain —{' '}
              <Link href="/m365-email-guide/">set that up first</Link> if you haven&rsquo;t).
            </li>
            <li>Activation usually takes 2–5 business days.</li>
          </ol>

          <h2 className={h2}>Step 2 — Activate Ad Grants</h2>
          <ol>
            <li>
              In the Google for Nonprofits console, activate <strong>Ad Grants</strong>.
            </li>
            <li>
              Follow the guided setup (Google&rsquo;s &ldquo;Smart Campaigns&rdquo; path is the
              low-maintenance option for small teams).
            </li>
            <li>
              Point ads at the pages on your site that ask for something specific — volunteer
              signup, donations, program enrollment.
            </li>
          </ol>

          <h2 className={h2}>The rules that keep the grant alive</h2>
          <p>Google cancels inactive or low-quality grant accounts. The essentials:</p>
          <ul>
            <li>Log in at least monthly and keep campaigns running.</li>
            <li>Maintain a 5%+ click-through rate (Smart Campaigns mostly handle this).</li>
            <li>No single-word or overly generic keywords.</li>
            <li>Ads must land on your verified website (your FFC-hosted domain).</li>
          </ul>
          <p>
            If an account does get paused, it can be reinstated after fixing the flagged issue — ask
            us for help before abandoning it.
          </p>

          <h2 className={h2}>Also included (often overlooked)</h2>
          <ul>
            <li>
              <strong>YouTube Nonprofit Program</strong> — donation buttons and link cards on your
              videos.
            </li>
            <li>
              <strong>Google Workspace for Nonprofits</strong> — free tier if you prefer Google
              mail/docs over Microsoft 365 (most FFC charities use the{' '}
              <Link href="/m365-email-guide/">Microsoft grant</Link>; don&rsquo;t run both for
              email).
            </li>
            <li>
              <strong>Maps Platform credits</strong> — useful if your site shows service locations.
            </li>
          </ul>

          <p className="mt-8">
            Questions or a rejected verification? <Link href="/contact-us/">Contact us</Link> and a
            volunteer will walk it through with you.
          </p>
        </div>
      </div>
    </div>
  )
}
