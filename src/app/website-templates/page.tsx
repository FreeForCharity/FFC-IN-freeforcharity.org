import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import { templateOptions } from '@/data/templates'

export const metadata = pageMetadata({
  title: 'Website Templates & the FFC Footer, Explained',
  description:
    'Which of the two open-source FFC templates fits your charity, every feature they ship, and why each item in the FFC footer exists — from the Candid profile link grant seekers rely on to the donation pathway, policy pages, and consent banner.',
  canonical: '/website-templates/',
  // 1200x630 social-card render (source: public/Images/website-templates-og.svg,
  // rendered by scripts/render-og-image.mjs website-templates-og).
  image: {
    path: '/Images/website-templates-og.png',
    width: 1200,
    height: 630,
    alt: 'Two FFC website templates, Single Page and Footer-Only, converging on the FFC footer standard with its Candid profile, EIN, donate, policy, consent, and Supported by Free For Charity items',
  },
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

/**
 * The item-by-item rationale for the FFC footer standard. The template FACTS
 * (names, descriptions, repos) come from the shared src/data/templates.ts
 * module; only this page's explanatory prose lives here.
 */
interface FooterItem {
  name: string
  what: string
  why: string
}

const footerItems: FooterItem[] = [
  {
    name: 'The Candid (GuideStar) seal, profile link, and EIN',
    what: 'A transparency-seal badge linking to the charity’s public Candid profile, a direct profile-link button, and the charity’s legal name with its EIN.',
    why: 'Before a foundation writes a grant check or a donor gives, they verify the charity — and Candid (formerly GuideStar) is where they look first. A working profile link on every page turns “we are a real 501(c)(3)” from a claim into something anyone can check in one click, and grant seekers get a ready-to-cite profile link for every application. The EIN lets anyone independently confirm the organization in the IRS Tax Exempt Organization Search. These items only render once they are true — see the two levels below.',
  },
  {
    name: 'The donate pathway',
    what: 'A Donate link in the footer’s quick links, so every page ends with a route to give. Sites built from the Single Page template ship a built-in Zeffy donation form — a zero-fee processor, so donations arrive whole.',
    why: 'A visitor moved to give should never have to hunt for how. Because the footer renders on every page, the giving pathway is always one scroll away — and our post-deploy monitoring treats a site that loses its donation capability as a failure, not a cosmetic issue.',
  },
  {
    name: 'Two donation policies — on purpose',
    what: 'The charity’s own Donation Policy (tax-deductibility, receipts, refund terms) and, beside it, the Free For Charity Donation Policy covering FFC’s own gift acceptance.',
    why: 'Donors deserve to know how a gift is handled before they give — by the charity they are giving to and by the organization supporting its website. The FFC policy link keeps Free For Charity’s name even on a fully customized charity site, because that page documents our policy, not the charity’s.',
  },
  {
    name: 'Privacy policy, cookie policy, and consent that means something',
    what: 'A privacy policy with real data-rights language (access, correction, erasure, withdrawal of consent), a cookie policy explaining every cookie category, and a consent banner with Accept All, Decline All, and Customize.',
    why: 'The templates are built to the strictest common bar our visitors browse under — the opt-in consent expected in the UK and EU, and the do-not-sell posture California expects. Analytics and marketing scripts stay off until a visitor opts in, and withdrawing consent actually deletes the tracking cookies rather than just hiding the banner. A two-person charity gets the privacy posture of a far larger organization, by default.',
  },
  {
    name: 'Terms of service',
    what: 'Plain-language terms covering eligibility, acceptable use, and governing law.',
    why: 'Every site needs a stated legal basis for the visitor relationship. Shipping it in the template means no charity launches without one.',
  },
  {
    name: 'Vulnerability disclosure policy and security acknowledgements',
    what: 'A coordinated-disclosure policy with safe-harbor language for good-faith security researchers, plus a public acknowledgements page — both wired into the machine-readable security.txt standard (RFC 9116).',
    why: 'Charities hold donor data, and security researchers who find a problem need a safe, obvious way to report it. Publishing the policy signals stewardship; the safe harbor makes reporting safe; security.txt makes it discoverable by the tools researchers actually use.',
  },
  {
    name: 'Real-world contact details',
    what: 'An email address, a phone number, and physical addresses that open in Google Maps.',
    why: 'Verifiable contact details are the legitimacy signals grant applications, nonprofit technology programs, and payment processors check — and they let a donor, journalist, or partner reach a human. An organization that publishes where it is and how to call it is measurably more trustworthy than one that hides behind a form.',
  },
  {
    name: '“Supported by Free For Charity” and the charity login',
    what: 'A permanent attribution linking to freeforcharity.org, and a Supported Charity Login link into the FFC hub.',
    why: 'The attribution is the one element of the footer that never changes when a charity customizes its site: it records the provenance of the free stack the site runs on, and it is how the next charity discovers that all of this is available for free. The login link gives every supported charity a path from its own site into the FFC hub that manages its services.',
  },
  {
    name: 'A copyright line that only claims what is true',
    what: 'A copyright with the year computed at build time — never a stale hand-typed year — and, where it applies, the “a US 501c3 Non Profit” status line.',
    why: 'The footer standard has two passing levels. A charity still working toward its IRS determination runs Level 1: the full footer minus the 501(c)(3) status line and the Candid link, because on a pre-501(c)(3) site those would be false claims. The day the determination letter arrives, a small change adds both and the site is at Level 2. The footer never says more than the charity can prove.',
  },
]

export default function WebsiteTemplates() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Our website templates — and why the footer matters so much
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Every website Free For Charity builds or validates starts from one of two open-source
            templates, and both converge on the same thing: the <strong>FFC footer standard</strong>
            , a compliance and trust layer that renders on every page of every supported site. This
            page explains which template fits which charity, what the templates ship, and — item by
            item — why everything in the footer is there.
          </p>

          <h2 className={h2}>Two templates, one standard</h2>
          <p>
            The choice between templates comes down to one question:{' '}
            <em>does your charity already have a website design it loves?</em>
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {templateOptions.map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-6">
              <p className="font-[var(--font-lato)] text-[14px] leading-[20px] font-[700] uppercase tracking-[0.08em] text-[#0567B1] mb-2">
                {template.eyebrow}
              </p>
              <h3 className="font-[var(--font-faustina)] text-[26px] leading-[34px] mb-3">
                {template.title}
              </h3>
              <p className="font-[var(--font-lato)] text-[16px] leading-[25px] mb-3">
                {template.description}
              </p>
              <ul className="space-y-2 mb-4">
                {template.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-[10px] font-[var(--font-lato)] text-[15px] leading-[23px]"
                  >
                    <span
                      className="mt-[8px] w-[7px] h-[7px] shrink-0 rounded-full bg-[#0567B1]"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={template.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[var(--font-lato)] text-[15px] font-[700] text-[#0567B1] hover:underline"
              >
                {template.repoLabel}
              </a>
            </div>
          ))}
        </div>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px] mt-6">
          <p>
            Not sure? Choose the Single Page Site Template — it is the fastest path to a validated
            site. Whichever template a site starts from, it launches on its free GitHub Pages
            address first and must be validated live there against the FFC standard; passing
            validation is what unlocks the free .org domain, which in turn unlocks free nonprofit
            email. The full sequence is on the{' '}
            <Link href="/why-website-first/">why website first</Link> and{' '}
            <Link href="/charity-onboarding-journey/">onboarding journey</Link> pages.
          </p>

          <h2 className={h2}>What both templates ship</h2>
          <p>
            Beyond their different starting points, the two templates deliver the same
            infrastructure: seven legal and policy pages, a consent banner that gates analytics and
            marketing until a visitor opts in, Google Tag Manager wiring, a team section, search
            engine metadata with a sitemap, an accessibility bar (skip links, labeled landmarks,
            WCAG contrast targets), security.txt, and static hosting that runs for free on GitHub
            Pages. A charity edits one configuration file — name, EIN, contact details, social
            links, policies — and every page, the footer, and the site metadata update together.
          </p>

          <h2 className={h2}>Why the footer is the heart of the standard</h2>
          <p>
            A footer seems like the least glamorous part of a website. It is also the only part that
            appears on <em>every</em> page — which makes it the one place a donor, grant maker, or
            regulator is guaranteed to find what they need, no matter where a search engine dropped
            them. That is why FFC validation checks the footer on every page of a site before any
            money is spent on a domain. Here is every item, and why it earns its place:
          </p>
        </div>

        <ol className="mt-4 space-y-6">
          {footerItems.map((item) => (
            <li key={item.name} className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-[var(--font-faustina)] text-[26px] leading-[34px] mb-2">
                {item.name}
              </h3>
              {/* #A85400 on white is 5.34:1 (WCAG AA). */}
              <p className="font-[var(--font-lato)] text-[15px] leading-[23px] font-[700] text-[#A85400] mb-3">
                {item.what}
              </p>
              <p className="font-[var(--font-lato)] text-[17px] leading-[27px]">{item.why}</p>
            </li>
          ))}
        </ol>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px] mt-10">
          <h2 className={h2}>Enforced, not just written down</h2>
          <p>
            A standard that lives only in a document decays. The FFC footer standard is enforced by
            machines: automated tests in every template pin the footer’s required content, drift
            checks stop a customized fork from accidentally shipping FFC’s identity while protecting
            the permanent attribution, and post-deploy monitoring checks every live site for its
            footer, policy links, and donation capability. We even maintain a dedicated canary site
            that we deliberately break, one failure class at a time, to prove the monitoring catches
            what it claims to catch. When you see the FFC footer on a charity’s site, it is not
            decoration — it is a continuously verified statement that the site meets the standard.
          </p>

          <h2 className={h2}>For volunteers and site builders</h2>
          <p>
            The operational guides live on our admin site: how to{' '}
            <a
              href="https://ffcadmin.org/guides/build-charity-site-from-template/"
              target="_blank"
              rel="noopener noreferrer"
            >
              build a charity site from the template
            </a>{' '}
            and how to{' '}
            <a
              href="https://ffcadmin.org/guides/adopt-ffc-footer-on-existing-site/"
              target="_blank"
              rel="noopener noreferrer"
            >
              adopt the FFC footer on an existing website
            </a>
            . Both templates are open source — read them, fork them, or contribute on{' '}
            <Link href="/contribute/">GitHub</Link>.
          </p>

          <h2 className={h2}>Ready to start?</h2>
          <p>
            The whole journey — application, website, domain, email, and ongoing support — is free
            for verified 501(c)(3) organizations, and pre-501(c)(3) organizations can start at Level
            1 today.
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
