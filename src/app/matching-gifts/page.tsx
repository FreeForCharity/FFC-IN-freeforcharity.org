import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import HoursReportCallout from '@/components/volunteer/HoursReportCallout'

export const metadata = pageMetadata({
  title: 'Matching Gifts & Volunteer Grants',
  description:
    "Double your donation for free: check your employer's matching-gift program, and turn volunteer hours into employer grants. FFC's details for the forms are here.",
  canonical: '/matching-gifts/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function MatchingGifts() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Double Your Gift — Without Spending Another Dollar
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Most large employers (and many mid-size ones) will{' '}
            <strong>match charitable donations</strong> their employees make — often
            dollar-for-dollar — and many also pay <strong>volunteer grants</strong>: a donation to
            the nonprofit for every hour you volunteer. Billions of matching dollars go unclaimed
            every year simply because nobody submits the form. Two minutes of paperwork can double
            what your gift does for the charities we serve.
          </p>

          <h2 className={h2}>Step 1 — Check whether your employer matches</h2>
          <ul>
            <li>
              Search your company intranet or benefits portal for &ldquo;matching gifts.&rdquo;
            </li>
            <li>
              Ask HR — the programs are usually run through platforms like Benevity, YourCause, or
              Bright Funds.
            </li>
            <li>Retirees and employees&rsquo; spouses are often eligible too — worth asking.</li>
          </ul>

          <h2 className={h2}>Step 2 — Submit FFC&rsquo;s details</h2>
          <p>Everything a matching-gift or volunteer-grant form asks for:</p>
          <div className="border border-gray-200 rounded-lg p-6 not-prose font-[var(--font-lato)] text-[17px] leading-[28px]">
            <dl>
              <div>
                <dt className="font-[700] inline">Legal name: </dt>
                <dd className="inline">Free For Charity</dd>
              </div>
              <div>
                <dt className="font-[700] inline">EIN (tax ID): </dt>
                <dd className="inline">46-2471893</dd>
              </div>
              <div>
                <dt className="font-[700] inline">Status: </dt>
                <dd className="inline">501(c)(3) public charity (IRS designation since 2014)</dd>
              </div>
              <div>
                <dt className="font-[700] inline">Mailing address: </dt>
                <dd className="inline">4030 Wake Forrest Road, Suite 349, Raleigh, NC</dd>
              </div>
              <div>
                <dt className="font-[700] inline">Website: </dt>
                <dd className="inline">https://www.freeforcharity.org</dd>
              </div>
              <div>
                <dt className="font-[700] inline">Verification: </dt>
                <dd className="inline">
                  Candid (GuideStar) profile —{' '}
                  <a
                    href="https://app.candid.org/profile/9326392/free-for-charity-46-2471893"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0567B1] underline"
                  >
                    Platinum Seal of Transparency
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <h2 className={h2}>Volunteer grants: your hours are worth money</h2>
          <p>
            If you volunteer with FFC — as a webmaster, project manager, designer, or M365 admin —
            your employer may donate for every hour you log (commonly $10–25/hour). A volunteer
            giving 4 hours a week can generate <em>thousands</em> of dollars a year for the program
            without donating a cent. Check the same benefits portal for &ldquo;volunteer
            grants&rdquo; or &ldquo;dollars for doers,&rdquo; and we&rsquo;ll gladly verify your
            hours. Not volunteering yet? <Link href="/volunteer-quiz/">Find your role</Link>.
          </p>

          <HoursReportCallout />

          <h2 className={h2}>What your matched dollars do</h2>
          <p>
            Every ${String(16.5)} keeps one charity&rsquo;s domain, email, and website alive for a
            year — see the full <Link href="/cost-transparency/">unit economics</Link>. A $100 gift
            matched to $200 covers <strong>twelve charities</strong>.
          </p>

          <p className="mt-8">
            Looking for DAF grants, stock gifts, bequests, or IRA distributions? See{' '}
            <Link href="/other-ways-to-give/">other ways to give</Link>. Questions, or a form that
            needs something we didn&rsquo;t list? <Link href="/contact-us/">Contact us</Link> and
            we&rsquo;ll turn it around quickly — matched money is the best kind of money.
          </p>
        </div>
      </div>
    </div>
  )
}
