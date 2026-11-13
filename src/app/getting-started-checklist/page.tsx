import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import { GATE_SENTENCE } from '@/data/journey'

export const metadata = pageMetadata({
  title: 'Getting Started Checklist',
  description:
    'The printable one-page checklist for charities joining Free For Charity: what to gather before applying, during onboarding, and after launch.',
  canonical: '/getting-started-checklist/',
})

const h2 =
  'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4 print:text-[22px] print:leading-[28px] print:mt-4 print:mb-2'
const listItem = 'flex gap-3 items-start'
const box =
  'mt-[6px] inline-block h-[14px] w-[14px] shrink-0 border-2 border-[#333] print:border-black'

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className={listItem}>
      <span className={box} aria-hidden="true" />
      <span>{children}</span>
    </li>
  )
}

export default function GettingStartedChecklist() {
  return (
    <div className="ffc-container py-16 print:py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4 print:hidden">
          <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4">
            Getting Started Checklist
          </h1>
        </div>
        <h1 className="hidden print:block font-[var(--font-faustina)] text-[28px] leading-[34px] mb-2">
          Free For Charity — Getting Started Checklist
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px] print:text-[13px] print:leading-[19px]">
          <p className="print:hidden">
            One page, three phases — everything a new charity gathers and does on the way to a free
            website, domain, and email (in that order). Print it (this page is print-formatted) or
            work through it on screen; each item links to the guide that explains it.
          </p>

          <h2 className={h2}>Before you apply</h2>
          <p className="print:text-[11px]">
            These are the items the application requires. The full list, field by field, is the
            application worksheet: <Link href="/501c3/#worksheet">501(c)(3) worksheet</Link> or{' '}
            <Link href="/pre501c3/#worksheet">pre-501(c)(3) worksheet</Link>.
          </p>
          <ul className="space-y-2 list-none pl-0">
            <Item>
              EIN and IRS determination letter located (pre-501(c)(3): formation documents).{' '}
              <Link href="/irs-990n-filing-guide/">Confirm your 990 filings are current.</Link>
            </Item>
            <Item>
              501(c)(3) track: Candid (GuideStar) profile claimed, with at least the Gold Seal of
              Transparency. <Link href="/guidestar-guide/">GuideStar guide</Link>
            </Item>
            <Item>Charity Facebook Page and LinkedIn Page (organization Pages, not profiles).</Item>
            <Item>
              Chair, Secretary and Treasurer named, each with a working LinkedIn profile (501(c)(3)
              track: their own phone and email too; pre-501(c)(3) track: at least three team members
              with their roles).
            </Item>
            <Item>
              A free GitHub account for your website maintainer, and its username.{' '}
              <a href="https://ffcadmin.org/guides/github-account/">GitHub account guide</a>
            </Item>
            <Item>
              Public phone, public email, and city and state for your website footer (a public
              street address is optional).
            </Item>
            <Item>
              501(c)(3) track: Zeffy donation form and Idealist page created (optional on the
              pre-501(c)(3) track). <Link href="/zeffy-donations-guide/">Zeffy guide</Link>
            </Item>
            <Item>
              Website content: tagline, descriptions, at least one program, and the domain you want.{' '}
              <Link href="/domains/#check-your-domain">Domain guide</Link>
            </Item>
            <Item>Details of any existing domain, website, or email accounts written down.</Item>
            <Item>
              Recommended, not required: registered and verified with Goodstack (formerly Percent)
              using your EIN and determination letter — the validator Google for Nonprofits, Canva,
              and many other tools use to confirm nonprofit status.{' '}
              <Link href="/google-for-nonprofits-guide/">Google for Nonprofits guide</Link>
            </Item>
          </ul>

          <h2 className={h2}>During onboarding</h2>
          <p className="print:text-[11px]">
            {GATE_SENTENCE} That order exists because the nonprofit email programs (Microsoft 365 /
            Google Workspace) expect your organization to have an established web presence.
          </p>
          <ul className="space-y-2 list-none pl-0">
            <Item>
              Application submitted via <Link href="/help-for-charities/">Help for Charities</Link>{' '}
              and approved. <Link href="/charity-onboarding-journey/">What happens next</Link>
            </Item>
            <Item>
              Website content included in your application (template, tagline, descriptions, first
              program), so your site is built right after approval and you get a preview link.
            </Item>
            <Item>
              Site draft reviewed and validated live on its GitHub Pages address — this unlocks the
              domain purchase.
            </Item>
            <Item>
              Domain registered (or transferred) by FFC and pointed at your validated site.{' '}
              <Link href="/domains/#check-your-domain">Domain guide</Link>
            </Item>
            <Item>
              Microsoft for Nonprofits or Google Workspace registration started (after the site is
              live). <Link href="/m365-email-guide/">M365 email guide</Link>
            </Item>
            <Item>DNS verification codes sent to FFC when Microsoft or Google displays them.</Item>
            <Item>
              MFA turned on for every new mailbox.{' '}
              <Link href="/charity-security-guide/">Security guide</Link>
            </Item>
          </ul>

          <h2 className={h2}>After launch</h2>
          <ul className="space-y-2 list-none pl-0">
            <Item>
              Candid profile kept current (about 30 minutes once a year).{' '}
              <Link href="/guidestar-guide/">GuideStar guide</Link>
            </Item>
            <Item>
              Google for Nonprofits + Ad Grants claimed.{' '}
              <Link href="/google-for-nonprofits-guide/">Guide</Link>
            </Item>
            <Item>Each person&rsquo;s own login in a password manager; leaver process agreed.</Item>
            <Item>Annual 990 deadline on the organization&rsquo;s calendar.</Item>
          </ul>

          <p className="mt-8 print:mt-4 print:text-[11px]">
            Free For Charity · freeforcharity.org · EIN 46-2471893 — questions?{' '}
            <Link href="/contact-us/">freeforcharity.org/contact-us</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
