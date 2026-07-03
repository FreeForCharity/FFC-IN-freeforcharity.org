import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'Accessibility Statement',
  description:
    'Free For Charity is committed to WCAG 2.1 AA accessibility. How we test, what we enforce in CI, and how to report a barrier.',
  canonical: '/accessibility-statement/',
})

const heading2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function AccessibilityStatement() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Accessibility Statement
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Free For Charity exists to serve nonprofits and the communities they reach — including
            people with disabilities. We are committed to making freeforcharity.org accessible to
            the widest possible audience, and to modeling the accessibility standard we want every
            charity website we build to meet.
          </p>

          <h2 className={heading2}>Our conformance target</h2>
          <p>
            We aim to conform to the{' '}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
            </a>
            . Semantic HTML, keyboard operability, sufficient color contrast, text alternatives for
            images, and screen-reader-friendly navigation are requirements in our development
            standards, not afterthoughts.
          </p>

          <h2 className={heading2}>How we test — on every change</h2>
          <p>
            Accessibility checks are enforced in our continuous-integration pipeline, so a change
            that introduces a violation cannot be merged:
          </p>
          <ul>
            <li>
              <strong>Automated component testing</strong> — every component test suite runs{' '}
              <code>jest-axe</code>, which fails the build on WCAG violations at the component
              level.
            </li>
            <li>
              <strong>Full-page scans</strong> — our end-to-end test suite runs axe-based WCAG 2.1
              AA scans across the site&rsquo;s public routes in a real browser before each release.
            </li>
            <li>
              <strong>Lighthouse monitoring</strong> — accessibility scores are tracked in CI on
              every pull request.
            </li>
          </ul>
          <p>
            Automated testing catches many but not all barriers. We treat human reports as the most
            valuable signal we have.
          </p>

          <h2 className={heading2}>Known limitations</h2>
          <ul>
            <li>
              Some third-party embeds (for example, donation forms and the Candid transparency seal)
              are served by external providers; we choose providers with accessible widgets but
              cannot fully control their markup.
            </li>
            <li>
              Older documents and legacy content migrated from the previous site may not yet meet
              our current standard. We remediate these as they are identified.
            </li>
          </ul>

          <h2 className={heading2}>Report a barrier</h2>
          <p>
            If any part of this site is difficult or impossible for you to use, please tell us — you
            will be helping every visitor who comes after you. Contact us through the details on our{' '}
            <Link href="/contact-us/">Contact Us</Link> page and include the page address and a
            short description of the problem. We prioritize accessibility reports and will respond
            as quickly as we are able.
          </p>

          <h2 className={heading2}>For the charities we host</h2>
          <p>
            The same standards apply to the website templates Free For Charity provides to
            nonprofits. If your organization&rsquo;s FFC-built site has an accessibility problem,
            report it the same way — fixes to shared templates benefit every charity on the
            platform.
          </p>
        </div>
      </div>
    </div>
  )
}
