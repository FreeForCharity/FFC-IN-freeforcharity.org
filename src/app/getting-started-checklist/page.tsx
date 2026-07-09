import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

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
            domain, email, and website. Print it (this page is print-formatted) or work through it
            on screen; each item links to the guide that explains it.
          </p>

          <h2 className={h2}>Before you apply</h2>
          <ul className="space-y-2 list-none pl-0">
            <Item>
              EIN and IRS determination letter located (pre-501c3: formation documents).{' '}
              <Link href="/irs-990n-filing-guide/">Confirm your 990 filings are current.</Link>
            </Item>
            <Item>
              Three .org name ideas, in order of preference.{' '}
              <Link href="/choosing-your-org-domain/">Domain guide</Link>
            </Item>
            <Item>Board aware and one person named as FFC point of contact.</Item>
            <Item>Details of any existing domain, website, or email accounts written down.</Item>
          </ul>

          <h2 className={h2}>During onboarding</h2>
          <p className="print:text-[11px]">
            FFC builds your website first — email comes after the site is live, because it needs a
            working site to validate against.
          </p>
          <ul className="space-y-2 list-none pl-0">
            <Item>
              Application submitted via <Link href="/help-for-charities/">Help for Charities</Link>.{' '}
              <Link href="/charity-onboarding-journey/">What happens next</Link>
            </Item>
            <Item>
              Logo, photos, mission text, and program descriptions sent for the site build.
            </Item>
            <Item>Site draft reviewed and launch approved.</Item>
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
              Candid profile claimed and seal earned; live seal embed added to your site.{' '}
              <Link href="/guidestar-guide/">GuideStar guide</Link>
            </Item>
            <Item>
              Google for Nonprofits + Ad Grants claimed.{' '}
              <Link href="/google-for-nonprofits-guide/">Guide</Link>
            </Item>
            <Item>
              Fee-free donation form live. <Link href="/zeffy-donations-guide/">Zeffy guide</Link>
            </Item>
            <Item>Shared passwords in a password manager; leaver process agreed.</Item>
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
