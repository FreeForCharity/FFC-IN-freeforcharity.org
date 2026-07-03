import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Your Onboarding Journey',
  description:
    'What happens after your charity applies to Free For Charity: the five stages, who does what, how long each takes, and what to prepare.',
  alternates: { canonical: '/charity-onboarding-journey/' },
}

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

interface Stage {
  name: string
  you: string
  ffc: string
  duration: string
  link?: { href: string; label: string }
}

const stages: Stage[] = [
  {
    name: '1. Application & validation',
    you: 'Submit the onboarding form with your EIN, legal name, and what you need. Have your IRS determination letter handy (pre-501c3 orgs: your formation documents).',
    ffc: 'We validate your organization (IRS status, Candid profile) and confirm program fit.',
    duration: 'A few days',
    link: { href: '/help-for-charities/', label: 'Start here: Help for Charities' },
  },
  {
    name: '2. Domain',
    you: 'Send us your top three .org name choices — or the details of a domain you already own.',
    ffc: 'We register (and pay for) the best available name, or take over management of your existing domain, and set up DNS and security.',
    duration: 'Same week',
    link: { href: '/choosing-your-org-domain/', label: 'Guide: choosing your .org domain' },
  },
  {
    name: '3. Email',
    you: 'Register with Microsoft for Nonprofits and tell us when the DNS verification codes appear.',
    ffc: 'We add the DNS records so your free Microsoft 365 mailboxes go live, and confirm MFA is on.',
    duration: '2–5 business days (Microsoft validation)',
    link: { href: '/m365-email-guide/', label: 'Guide: free Microsoft 365 email' },
  },
  {
    name: '4. Website',
    you: 'Send your logo, photos, mission text, and program descriptions. A one-page outline is enough — we help with the rest.',
    ffc: 'A volunteer builds your site from the FFC template (fast, secure static hosting), reviews it with you, and launches it at your domain.',
    duration: '2–6 weeks, mostly depending on content readiness',
    link: {
      href: '/free-for-charity-ffc-service-delivery-stages/',
      label: 'How FFC delivers services',
    },
  },
  {
    name: '5. Handoff & ongoing support',
    you: 'Learn where to send changes and questions; add the trust-builders (Candid seal, donation form) when ready.',
    ffc: 'We keep the domain renewed, DNS secure, and hosting healthy — and stay reachable for changes and fixes.',
    duration: 'Ongoing',
    link: { href: '/guides/', label: 'All guides' },
  },
]

export default function CharityOnboardingJourney() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Your Onboarding Journey
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Here&rsquo;s exactly what happens after your charity applies — the five stages, who does
            what at each one, and honest durations. Volunteers do this work, so timelines are
            typical rather than guaranteed; content readiness on your side is the biggest factor in
            how fast a site launches.
          </p>
        </div>

        <ol className="mt-8 space-y-6">
          {stages.map((stage) => (
            <li key={stage.name} className="border border-gray-200 rounded-lg p-6">
              <h2 className="font-[var(--font-faustina)] text-[26px] leading-[34px] mb-3">
                {stage.name}
              </h2>
              <dl className="font-[var(--font-lato)] text-[17px] leading-[27px] space-y-2">
                <div>
                  <dt className="font-[700] inline">You: </dt>
                  <dd className="inline">{stage.you}</dd>
                </div>
                <div>
                  <dt className="font-[700] inline">FFC: </dt>
                  <dd className="inline">{stage.ffc}</dd>
                </div>
                <div>
                  <dt className="font-[700] inline">Typical duration: </dt>
                  <dd className="inline">{stage.duration}</dd>
                </div>
              </dl>
              {stage.link ? (
                <p className="mt-3">
                  <Link
                    href={stage.link.href}
                    className="font-[var(--font-lato)] text-[16px] text-[#0567B1] underline"
                  >
                    {stage.link.label} →
                  </Link>
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px] mt-10">
          <h2 className={h2}>How we communicate</h2>
          <p>
            Support happens over email and text with real volunteers. We aim to respond within a
            couple of business days; a silent week means a message fell through — please nudge us
            rather than wait. Everything you can prepare is on the{' '}
            <Link href="/getting-started-checklist/">getting-started checklist</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
