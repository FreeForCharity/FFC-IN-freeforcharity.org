import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import JourneyDiagram from '@/components/journey/JourneyDiagram'
import { journeyStages, type JourneyStage } from '@/data/journey'

export const metadata = pageMetadata({
  title: 'Why We Build Your Website Before Buying Your Domain',
  description:
    'The gated FFC onboarding journey explained: donor trust, no sunk costs, and the four gates that make sure money is only spent on charities whose sites are already proven live.',
  canonical: '/why-website-first/',
  // 1200x630 social-card render of the journey diagram (source:
  // public/Images/journey-og.svg, rendered by scripts/render-og-image.mjs).
  image: {
    path: '/Images/journey-og.png',
    width: 1200,
    height: 630,
    alt: 'The five-stage Free For Charity onboarding journey, with the funding gate between the Website and Domain stages',
  },
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

/**
 * The four gates derive from the shared journey module (src/data/journey.ts)
 * so the stage/gate FACTS — which stage each gate belongs to, its name, and
 * its gateNote — cannot drift from the journey page. Only the page-specific
 * prose (gate label + plain-language explanation) lives here, keyed by the
 * canonical stage id.
 */
interface GateProse {
  stageId: string
  name: string
  plain: string
}

const gateProse: GateProse[] = [
  {
    stageId: 'application',
    name: 'Gate 1 — Validation',
    plain:
      'Before anything is built, we verify your organization: IRS status, Candid profile, and program fit. Every later stage requires this approval, so nobody invests effort in an organization that cannot qualify.',
  },
  {
    stageId: 'website',
    name: 'Gate 2 — Website',
    plain:
      'The website application only opens after validation. A volunteer builds your site from an FFC template and you prove the partnership works by getting us your content. The site goes live on its free GitHub Pages address — which costs nothing.',
  },
  {
    stageId: 'domain',
    name: 'Gate 3 — Funding',
    plain:
      'This is the money gate. We only spend funds on your free .org domain once your website is validated live. The domain order form literally asks for your live GitHub Pages address — that is what unlocks the purchase.',
  },
  {
    stageId: 'email',
    name: 'Gate 4 — Email',
    plain:
      'Microsoft and Google both require a live website before they approve a nonprofit for free email. Because your site is already proven and your domain is live, your free Microsoft 365 or Google Workspace mailboxes sail through.',
  },
]

interface Gate extends GateProse {
  stage: JourneyStage
}

const gates: Gate[] = gateProse.map((gate) => {
  const stage = journeyStages.find((s) => s.id === gate.stageId)
  if (!stage) {
    throw new Error(`why-website-first: no journey stage with id "${gate.stageId}"`)
  }
  return { ...gate, stage }
})

export default function WhyWebsiteFirst() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Why we build your website before buying your domain
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Most web programs start by selling you a domain. Free For Charity deliberately does the
            opposite: your website is built and validated <em>first</em>, live on its free GitHub
            Pages address, and only then do we spend a single donated dollar on your .org domain.
            That order is not an accident — it is how we protect donors, charities, and volunteers
            at the same time.
          </p>
        </div>

        <div className="mt-8" data-testid="journey-diagram-wrapper">
          <JourneyDiagram />
        </div>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <h2 className={h2}>Donor trust: every dollar buys something proven</h2>
          <p>
            FFC runs on donations and volunteer time. When we register a domain, that is real money
            leaving a charity&rsquo;s ecosystem — so we only spend it on organizations whose site is
            already live, validated, and ready to point a domain at. Donors can see exactly what
            their support bought: a working website, not a parked name.
          </p>

          <h2 className={h2}>No sunk costs: free until it works</h2>
          <p>
            Everything before the funding gate is free. GitHub Pages hosting costs nothing, the
            templates are open source, and volunteer time is donated. If an organization stalls,
            changes direction, or never sends content, nothing has been wasted — there is no annual
            domain renewal quietly billing for a site that never launched. The build phase has zero
            sunk cost by design.
          </p>

          <h2 className={h2}>A competence filter that protects everyone</h2>
          <p>
            Getting a site validated takes a small amount of real engagement from your charity:
            sending your logo, mission text, and photos, and reviewing the result. That engagement
            is the best predictor we have that a partnership will last. Organizations that clear the
            website stage almost always thrive with their domain and email; asking for that proof{' '}
            <em>before</em> money moves filters kindly but firmly, with no penalty for anyone who is
            not ready yet.
          </p>

          <h2 className={h2}>The four gates, in plain language</h2>
        </div>

        <ol className="mt-4 space-y-6">
          {gates.map((gate) => (
            <li key={gate.name} className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-[var(--font-faustina)] text-[26px] leading-[34px] mb-2">
                {gate.name}
              </h3>
              {/* Stage name + gate fact from the shared journey module —
                  #A85400 on white is 5.34:1 (WCAG AA). */}
              <p className="font-[var(--font-lato)] text-[15px] leading-[23px] font-[700] text-[#A85400] mb-3">
                {gate.stage.name}: {gate.stage.gateNote}
              </p>
              <p className="font-[var(--font-lato)] text-[17px] leading-[27px]">{gate.plain}</p>
            </li>
          ))}
        </ol>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px] mt-10">
          <h2 className={h2}>Two templates, one standard</h2>
          <p>
            Every FFC build starts from one of two open-source templates. The{' '}
            <strong>Single Page Site Template</strong> is the starting point for charities without a
            site: a complete, professionally structured one-page site with every section a charity
            needs — mission, programs, team, donate, contact — plus the full FFC footer. The{' '}
            <strong>Footer-Only Template</strong> is the FFC footer and compliance layer for
            charities whose site is already designed: it adds the FFC footer, legal pages, cookie
            consent, and analytics to your existing design instead of replacing it.
          </p>
          <p>
            Whichever template a site starts from, it must meet the same standard — the FFC footer
            with your validated organization details, the legal pages, and an accessible build — and
            both paths converge at Gate 3: your site validated live on GitHub Pages, which unlocks
            your free .org domain. Compare the two side by side in the{' '}
            <Link href="/free-charity-web-hosting/#choose-your-template">
              template chooser on the free charity web hosting page
            </Link>
            , or inspect the templates themselves on GitHub:{' '}
            <a
              href="https://github.com/FreeForCharity/FFC-IN-FFC_Single_Page_Template"
              target="_blank"
              rel="noopener noreferrer"
            >
              Single Page Site Template
            </a>{' '}
            and{' '}
            <a
              href="https://github.com/FreeForCharity/FFC-IN-Footer_Only_Template"
              target="_blank"
              rel="noopener noreferrer"
            >
              Footer-Only Template
            </a>
            .
          </p>

          <h2 className={h2}>Ready to start?</h2>
          <p>
            The whole journey — application, website, domain, email, and ongoing support — is free
            for verified 501(c)(3) organizations. See the full stage-by-stage walkthrough on the{' '}
            <Link href="/charity-onboarding-journey/">charity onboarding journey page</Link>, or
            jump straight in:
          </p>
        </div>

        <p className="mt-6">
          <Link
            href="/help-for-charities/"
            className="inline-block rounded bg-[#0567B1] px-8 py-3 font-[var(--font-lato)] text-[18px] font-[700] text-white transition-colors hover:bg-[#045a9b]"
          >
            Apply for your free website
          </Link>
        </p>
      </div>
    </div>
  )
}
