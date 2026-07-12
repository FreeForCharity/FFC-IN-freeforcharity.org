import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import JourneyDiagram from '@/components/journey/JourneyDiagram'

export const metadata = pageMetadata({
  title: 'Your Onboarding Journey',
  description:
    'What happens after your charity applies to Free For Charity: the five stages, who does what, how long each takes, and what to prepare.',
  canonical: '/charity-onboarding-journey/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

interface Stage {
  name: string
  you: string
  ffc: string
  duration: string
  links?: { href: string; label: string }[]
}

const stages: Stage[] = [
  {
    name: '1. Application & validation',
    you: 'Submit the onboarding form with your EIN, legal name, charity Facebook and LinkedIn pages, and what you need. Have your IRS determination letter handy (pre-501c3 orgs: your formation documents).',
    ffc: 'We validate your organization (IRS status, Candid profile) and confirm program fit. Every later stage requires this approval first.',
    duration: 'A few days',
    links: [{ href: '/help-for-charities/', label: 'Start here: Help for Charities' }],
  },
  {
    name: '2. Website — built and proven first',
    you: 'Submit the website application (it requires your approved onboarding), then send your logo, photos, mission text, and program descriptions. A one-page outline is enough — we help with the rest.',
    ffc: 'A volunteer builds your site from the FFC template (fast, secure static hosting), with the full FFC footer generated from your validated application data. Your site goes live on its free GitHub Pages address — no custom domain yet — and we validate it end to end with you.',
    duration: '2–6 weeks, mostly depending on content readiness',
    links: [
      {
        href: 'https://ffcadmin.org/sites-list/',
        label: 'How FFC delivers services',
      },
    ],
  },
  {
    name: '3. Domain — only after your site is proven',
    you: 'Send us your top three .org name choices — or the details of a domain you already own — along with your live GitHub Pages address. You can check name availability any time; we buy once your site is validated.',
    ffc: 'Once your website is validated, we spend the funds: we register (and pay for) the best available name, or take over management of your existing domain, set up DNS and security, and point it at your live site.',
    duration: 'Same week (after website validation)',
    links: [{ href: '/domains/#check-your-domain', label: 'Guide: choosing your .org domain' }],
  },
  {
    name: '4. Email',
    you: 'Choose Microsoft 365 or Google Workspace, then register with Microsoft for Nonprofits or Google for Nonprofits and tell us when the DNS verification codes appear. Both nonprofit email programs require a live website before they approve your 501(c)(3) — which is exactly why your website comes first.',
    ffc: 'We add the DNS records so your free Microsoft 365 or Google Workspace mailboxes go live, and confirm MFA is on.',
    duration: '2–5 business days (Microsoft or Google validation)',
    links: [
      { href: '/m365-email-guide/', label: 'Guide: free Microsoft 365 email' },
      { href: '/google-for-nonprofits-guide/', label: 'Guide: free Google Workspace email' },
    ],
  },
  {
    name: '5. Handoff & ongoing support',
    you: 'Learn where to send changes and questions; add the trust-builders (Candid seal, donation form) when ready.',
    ffc: 'We keep the domain renewed, DNS secure, and hosting healthy — and stay reachable for changes and fixes.',
    duration: 'Ongoing',
    links: [{ href: '/guides/', label: 'All guides' }],
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
            what at each one, and honest durations. The order matters: your website is built and
            validated on free GitHub Pages hosting <em>first</em>, and we only spend money on your
            domain once your site is proven. Volunteers do this work, so timelines are typical
            rather than guaranteed; content readiness on your side is the biggest factor in how fast
            a site launches. Curious about the reasoning behind this order?{' '}
            <Link href="/why-website-first/">
              Read why we build your website before buying your domain
            </Link>
            .
          </p>
        </div>

        <div className="mt-8">
          <JourneyDiagram />
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
              {stage.links?.map((link) => (
                <p key={link.href} className="mt-3">
                  <Link
                    href={link.href}
                    className="font-[var(--font-lato)] text-[16px] text-[#0567B1] underline"
                  >
                    {link.label} →
                  </Link>
                </p>
              ))}
            </li>
          ))}
        </ol>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px] mt-10">
          <h2 className={h2}>Deep dives for every prerequisite</h2>
          <p>
            Stuck on a specific intake item — mission statement, board requirements, public contact
            info, the 501c3 application itself, or fiscal sponsorship? Each has a dedicated
            walkthrough in the{' '}
            <a href="https://ffcadmin.org/intake-help/" target="_blank" rel="noopener noreferrer">
              intake help section on FFC Admin
            </a>
            , our operational portal.
          </p>

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
