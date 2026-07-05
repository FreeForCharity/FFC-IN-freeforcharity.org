import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'Publicity & Story Consent Policy',
  description:
    'How Free For Charity obtains and honors consent before featuring a supported charity in case studies, testimonials, or the homepage spotlight — and how to opt out at any time.',
  canonical: '/publicity-consent-policy/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function PublicityConsentPolicy() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Publicity &amp; Story Consent Policy
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Free For Charity exists to put supported charities in front of donors and volunteers —
            and the most powerful way to do that is to tell their stories. This policy explains
            exactly what we may publish about a supported organization, how consent is granted, and
            how any organization can opt out at any time.
          </p>

          <h2 className={h2}>What we may publish</h2>
          <p>With consent, Free For Charity may feature a supported organization in:</p>
          <ul>
            <li>
              <strong>Case studies</strong> — a before/after story of the services FFC provided
              (domain, website, email), on the{' '}
              <Link href="/charity-and-nonprofit-case-studies/">case studies page</Link>
            </li>
            <li>
              <strong>Testimonials</strong> — quotes from the organization&rsquo;s representatives,
              with name, role, and organization, in the homepage rotation
            </li>
            <li>
              <strong>Charity spotlight</strong> — a rotating monthly homepage feature linking to
              the organization&rsquo;s site
            </li>
            <li>
              <strong>Directory listings</strong> — the organization&rsquo;s domain on the{' '}
              <Link href="/charities-we-support/">charities we support</Link> page
            </li>
          </ul>
          <p>
            Featured content is limited to: the organization&rsquo;s name and logo, its public
            website address, a short description of its mission, a factual account of the services
            FFC provided, and quotes its representatives gave us. We never publish personal contact
            details, financial information beyond what the organization already publishes, or
            anything about the individuals the charity serves.
          </p>

          <h2 className={h2}>How consent is granted</h2>
          <ul>
            <li>
              <strong>At signup:</strong> publicity consent is presented alongside the other Free
              For Charity policies (terms of service, privacy policy) when an organization orders
              services through our management system. Accepting the policies at checkout grants FFC
              permission to feature the organization as described above.
            </li>
            <li>
              <strong>For organizations onboarded before this policy existed:</strong> features
              built strictly from material the organization already provided for publication (such
              as its testimonials) and from its own public website may be published on FFC
              leadership&rsquo;s designation; anything beyond that is confirmed with the
              organization individually first. Testimonials an organization has already given
              publicly remain published unless they ask otherwise.
            </li>
            <li>
              <strong>For quotes of individuals:</strong> we attribute quotes only to people who
              provided them for publication (for example through our testimonial form), and we
              identify them only by name, role, and organization.
            </li>
            <li>
              <strong>For photos and logos:</strong> published only with explicit permission — the
              testimonial form asks about photo/logo use as a separate question, and it is never
              implied by any other consent.
            </li>
          </ul>

          <h2 className={h2}>Opting out — anytime, no questions asked</h2>
          <p>
            Any organization can withdraw publicity consent at any time, even after accepting it at
            signup. <Link href="/contact-us/">Contact us</Link> and we will remove the requested
            content in the next site update, normally within a few business days. Opting out never
            affects the free services an organization receives from FFC.
          </p>

          <h2 className={h2}>Review before publication</h2>
          <p>
            Every case study and spotlight entry is reviewed by FFC leadership before it goes live,
            and each entry&rsquo;s documented consent basis is recorded in the public change history
            of this website&rsquo;s repository. If we drafted a story from your organization&rsquo;s
            public information and you&rsquo;d like it corrected, tell us and we&rsquo;ll fix it in
            the next update.
          </p>

          <p className="mt-8">
            Questions about this policy? <Link href="/contact-us/">Contact us</Link> — we&rsquo;re
            glad to walk through exactly what would and wouldn&rsquo;t be published before you
            decide.
          </p>
        </div>
      </div>
    </div>
  )
}
