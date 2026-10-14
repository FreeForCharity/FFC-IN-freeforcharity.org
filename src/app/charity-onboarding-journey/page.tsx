import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import JourneyDiagram from '@/components/journey/JourneyDiagram'
import HowItWorks from '@/components/application-guide/HowItWorks'
import { GATE_SENTENCE, journeyStages } from '@/data/journey'

export const metadata = pageMetadata({
  title: 'Your Onboarding Journey',
  description:
    'What happens after your charity applies to Free For Charity: the five stages, who does what, how long each takes, and what to prepare.',
  canonical: '/charity-onboarding-journey/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

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
            what at each one, and honest durations. The order matters: {GATE_SENTENCE} Volunteers do
            this work, so timelines are typical rather than guaranteed. Your application includes
            your website content, so a complete application is the biggest factor in how fast a site
            launches. Curious about the reasoning behind this order?{' '}
            <Link href="/why-website-first/">
              Read why we build your website before buying your domain
            </Link>
            .
          </p>
        </div>

        <div className="mt-8">
          <JourneyDiagram />
        </div>

        <div className="mt-10">
          <HowItWorks heading="How it works, step by step" />
        </div>

        <h2 className="font-[var(--font-faustina)] text-[32px] leading-[40px] mt-12 mb-2">
          The five stages in detail
        </h2>

        <ol className="mt-8 space-y-6">
          {journeyStages.map((stage) => (
            <li key={stage.id} className="border border-gray-200 rounded-lg p-6">
              <h2 className="font-[var(--font-faustina)] text-[26px] leading-[34px] mb-2">
                {stage.name}
              </h2>
              {/* The gate relationship, from the shared journey module —
                  #A85400 on white is 5.34:1 (WCAG AA). */}
              <p className="font-[var(--font-lato)] text-[15px] leading-[23px] font-[700] text-[#A85400] mb-3">
                {stage.gateNote}
              </p>
              <dl className="font-[var(--font-lato)] text-[17px] leading-[27px] space-y-2">
                <div>
                  <dt className="font-[700] inline">You: </dt>
                  <dd className="inline">{stage.youDo}</dd>
                </div>
                <div>
                  <dt className="font-[700] inline">FFC: </dt>
                  <dd className="inline">{stage.ffcDoes}</dd>
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
            Stuck on a specific application item — mission statement, board requirements, public
            contact info, getting to 501(c)(3), or fiscal sponsorship? Every field on each
            application has a step-by-step entry, with in-depth help pages, on its application page:
            the <Link href="/501c3/#field-guide">501(c)(3) application</Link> or the{' '}
            <Link href="/pre501c3/#field-guide">pre-501(c)(3) application</Link>. Demand for our
            free services is high, so we need every required field completed to review applications
            fairly and quickly.
          </p>

          <h2 className={h2}>How we communicate</h2>
          <p>
            Support happens over email and text with real volunteers. We’re all volunteers, so there
            is no guaranteed response time; if a message seems to have fallen through, please nudge
            us rather than wait. Everything you can prepare is on the{' '}
            <Link href="/getting-started-checklist/">getting-started checklist</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
