import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { ffcAdminUrl } from '@/data/admin-links'

export const metadata = pageMetadata({
  title: 'Security Basics for Small Charities',
  description:
    'MFA, password managers, donation fraud, and domain safety — the security floor every small nonprofit should stand on, in plain language.',
  canonical: '/charity-security-guide/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function CharitySecurityGuide() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Security Basics for Small Charities
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Criminals target small nonprofits <em>because</em> they&rsquo;re small: one shared
            password, no IT staff, and a bank account that donors trust. A hacked charity can lose
            its email, its website, its donor list, and its reputation in one afternoon. The good
            news: four unglamorous habits prevent almost all of it.
          </p>

          <h2 className={h2}>1. Turn on multi-factor authentication (MFA) — everywhere, today</h2>
          <p>
            MFA (a code from your phone in addition to your password) stops the vast majority of
            account-takeover attacks, including ones where your password has already leaked.
            Priority order:
          </p>
          <ol>
            <li>Email accounts (Microsoft 365 / Google) — the keys to everything else</li>
            <li>Bank and payment accounts (including Zeffy/PayPal)</li>
            <li>Social media accounts</li>
            <li>Anything holding donor data</li>
          </ol>
          <p>
            In Microsoft 365, &ldquo;Security defaults&rdquo; turns MFA on tenant-wide — if FFC set
            up your <Link href="/m365-email-guide/">M365 email</Link>, ask us to confirm it&rsquo;s
            enabled.
          </p>

          <h2 className={h2}>2. Use a password manager — and stop sharing passwords by text</h2>
          <ul>
            <li>
              One strong, unique password per site, generated and remembered by the manager
              (Bitwarden has a free tier that fits most charities; 1Password offers nonprofit
              discounts).
            </li>
            <li>
              Shared accounts (the <em>info@</em> mailbox, social media) go in a shared vault — not
              in a spreadsheet, not in a group text.
            </li>
            <li>
              When a volunteer or staff member leaves, change the shared passwords they had. The
              vault makes this a ten-minute chore instead of a forgotten risk.
            </li>
          </ul>

          <AdminGuideLink
            href={ffcAdminUrl('/guides/multi-factor-authentication/')}
            description="Step-by-step MFA setup — plus companion FFC Admin guides for password managers and passkeys — live on the FFC Admin portal:"
          />

          <h2 className={h2}>3. Recognize the two frauds aimed at charities</h2>
          <ul>
            <li>
              <strong>Impersonation/BEC:</strong> an email that looks like your director asking the
              treasurer to &ldquo;quickly pay this invoice&rdquo; or buy gift cards. Rule:{' '}
              <em>any</em> money request gets verified by voice on a known number — no exceptions,
              including (especially) urgent ones.
            </li>
            <li>
              <strong>Overpayment &ldquo;donations&rdquo;:</strong> a stranger donates by check,
              then asks for a partial refund. The check bounces after you&rsquo;ve refunded. Never
              refund unclear payments; let your processor handle disputes.
            </li>
          </ul>

          <h2 className={h2}>4. Keep your domain and website out of hostage situations</h2>
          <p>
            Expired domains and lone-admin DNS accounts are how charities lose their web presence
            permanently. FFC&rsquo;s model removes this class of risk for supported charities: we
            keep registrations renewed, DNS locked down in Cloudflare, and sites on static hosting
            with no server to hack (see{' '}
            <Link href="/choosing-your-org-domain/">who controls the domain</Link>). If your domain
            is <em>not</em> with us yet and renewals depend on one person&rsquo;s memory and credit
            card, fix that this week.
          </p>

          <h2 className={h2}>If you think you&rsquo;ve been compromised — the first hour</h2>
          <ol>
            <li>
              <strong>Change the password + revoke sessions</strong> on the affected account from a
              known-clean device (in M365: admin center → user → sign out of all sessions).
            </li>
            <li>
              <strong>Check forwarding rules</strong> in the mailbox — attackers add silent forwards
              to keep reading your mail after you change the password.
            </li>
            <li>
              <strong>Tell your bank</strong> immediately if any payment info or invoice could have
              been touched.
            </li>
            <li>
              <strong>Tell FFC</strong> (<Link href="/contact-us/">contact page</Link>) — we can
              lock DNS, check the website, and help you assess what was reached.
            </li>
            <li>
              <strong>Tell the people affected</strong> honestly once you know the scope — donors
              forgive breaches; they don&rsquo;t forgive cover-ups.
            </li>
          </ol>

          <p className="mt-8">
            Want a volunteer to walk your org through this checklist?{' '}
            <Link href="/contact-us/">Ask us</Link> — a one-hour security session is one of the
            highest-value things we do with charities.
          </p>
        </div>
      </div>
    </div>
  )
}
