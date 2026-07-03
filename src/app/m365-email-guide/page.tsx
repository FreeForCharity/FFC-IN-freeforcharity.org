import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Microsoft 365 Email for Your Charity',
  description:
    'Step-by-step: get free Microsoft 365 nonprofit email at your charity domain — eligibility, tenant signup, DNS verification, mailboxes, and MFA.',
  alternates: { canonical: '/m365-email-guide/' },
}

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function M365EmailGuide() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Free Microsoft 365 Email at Your Charity&rsquo;s Domain
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            An email address at your own domain (<em>you@yourcharity.org</em> instead of a personal
            Gmail) is the single biggest credibility upgrade a small nonprofit can make — donors,
            grantmakers, and platforms like Google and Candid all treat it as a trust signal.
            Microsoft grants qualified nonprofits{' '}
            <strong>Microsoft 365 Business Basic for free (up to 300 users)</strong>, and Free For
            Charity helps you claim it. This is the most common thing charities ask us for, so here
            is the whole path.
          </p>

          <h2 className={h2}>Step 1 — Check eligibility</h2>
          <p>
            Microsoft&rsquo;s nonprofit grant covers 501(c)(3) organizations (and equivalents).
            You&rsquo;ll need your EIN and legal organization details. If you&rsquo;re pre-501c3,
            start with our <Link href="/pre501c3/">Pre-501c3 onboarding</Link> — you can still get a
            domain and prepare everything else while your determination is pending.
          </p>

          <h2 className={h2}>Step 2 — Have a domain ready</h2>
          <p>
            Your email lives at your domain, so the domain comes first. FFC buys and manages .org
            domains for supported charities at no cost — see{' '}
            <Link href="/choosing-your-org-domain/">choosing your .org domain</Link> if you
            don&rsquo;t have one yet.
          </p>

          <h2 className={h2}>Step 3 — Register with Microsoft for Nonprofits</h2>
          <ol>
            <li>
              Go to{' '}
              <a
                href="https://www.microsoft.com/en-us/nonprofits"
                target="_blank"
                rel="noopener noreferrer"
              >
                microsoft.com/nonprofits
              </a>{' '}
              and select <strong>Register now</strong>.
            </li>
            <li>
              Provide your organization details (legal name exactly as on your IRS letter, EIN,
              address, and your new domain-based contact if you have one).
            </li>
            <li>
              Microsoft validates your nonprofit status through its verification partner — this
              usually takes from a few hours to a few business days.
            </li>
            <li>
              Once approved, activate the <strong>Microsoft 365 Business Basic (Nonprofit)</strong>{' '}
              grant licenses in the Microsoft 365 admin center.
            </li>
          </ol>

          <h2 className={h2}>Step 4 — Connect your domain (DNS)</h2>
          <p>
            Microsoft asks you to prove you own your domain and then add a handful of DNS records
            (MX, CNAME, TXT for SPF). <strong>This is the step FFC does for you.</strong> Our
            volunteers manage supported charities&rsquo; DNS in Cloudflare, so when the admin center
            shows you the records:
          </p>
          <ul>
            <li>Send us the verification code / record values Microsoft displays.</li>
            <li>We add them, usually the same day.</li>
            <li>
              You click <strong>Verify</strong>, and mail starts flowing to Microsoft.
            </li>
          </ul>
          <p>
            If you manage your own DNS, add each record exactly as shown and allow up to an hour for
            propagation before verifying.
          </p>

          <h2 className={h2}>Step 5 — Create mailboxes and turn on MFA</h2>
          <ul>
            <li>
              Create a mailbox per person, plus shared addresses like <em>info@</em> and{' '}
              <em>donations@</em> (shared mailboxes are free and don&rsquo;t use a license).
            </li>
            <li>
              Turn on <strong>multi-factor authentication for every account</strong> before you do
              anything else — nonprofit accounts are heavily targeted by fraudsters. Our{' '}
              <Link href="/charity-security-guide/">security guide</Link> covers this in five
              minutes.
            </li>
          </ul>

          <h2 className={h2}>Common problems</h2>
          <ul>
            <li>
              <strong>Verification rejected:</strong> the legal name or EIN didn&rsquo;t match IRS
              records. Re-submit with the name exactly as it appears on your determination letter.
            </li>
            <li>
              <strong>Mail not arriving:</strong> MX record missing or still pointing at the old
              provider. Contact us — it&rsquo;s a two-minute DNS fix.
            </li>
            <li>
              <strong>&ldquo;Domain already in use&rdquo;:</strong> someone previously created a
              Microsoft tenant with your domain. Microsoft support can release it; we can help you
              request that.
            </li>
          </ul>

          <h2 className={h2}>What this unlocks next</h2>
          <p>
            With domain email in place you can claim{' '}
            <Link href="/google-for-nonprofits-guide/">Google for Nonprofits</Link> (Ad Grants),
            register for a <Link href="/guidestar-guide/">Candid Seal of Transparency</Link>, and
            accept <Link href="/zeffy-donations-guide/">fee-free online donations</Link> — each one
            asks for an email at your domain.
          </p>

          <p className="mt-8">
            Stuck at any step? <Link href="/contact-us/">Contact us</Link> — helping charities
            through exactly this is what our volunteers do.
          </p>
        </div>
      </div>
    </div>
  )
}
