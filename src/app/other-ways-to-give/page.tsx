import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'Other Ways to Give',
  description:
    'Donor-advised funds, appreciated stock, bequests, IRA qualified charitable distributions, and employer matching — every way to support Free For Charity beyond the donate button.',
  canonical: '/other-ways-to-give/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

// Larger gift vehicles carry legal/financial detail that must be confirmed
// person-to-person before funds move — so every option below that involves a
// transfer instruction routes through this confirm-first contact block
// (published at the operator's direction).
function ConfirmContact({ what }: { what: string }) {
  return (
    <p className="not-prose rounded border border-[#0567B1]/30 bg-[#f4f9fd] px-4 py-3 font-[var(--font-lato)] text-[15px] leading-[24px] text-[#333]">
      <strong>Before initiating:</strong> confirm the exact {what} with Clarke Moyer —{' '}
      <a href="mailto:clarkemoyer@freeforcharity.org" className="text-[#0567B1] underline">
        clarkemoyer@freeforcharity.org
      </a>{' '}
      or{' '}
      <a href="tel:+15202228104" className="text-[#0567B1] underline">
        (520) 222-8104
      </a>
      . We reply quickly — large gifts get same-day attention.
    </p>
  )
}

export default function OtherWaysToGive() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Other Ways to Give
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            The <Link href="/donate/">donate button</Link> is the fast path — but larger and
            tax-smarter vehicles often do more for you <em>and</em> for the charities we keep
            online. All of these are welcome. The identity details every form asks for:
          </p>
          <div className="border border-gray-200 rounded-lg p-6 not-prose font-[var(--font-lato)] text-[17px] leading-[28px]">
            <dl>
              <div>
                <dt className="font-[700] inline">Legal name: </dt>
                <dd className="inline">Free For Charity</dd>
              </div>
              <div>
                <dt className="font-[700] inline">EIN (tax ID): </dt>
                <dd className="inline">46-2471893 — 501(c)(3) public charity</dd>
              </div>
              <div>
                <dt className="font-[700] inline">Mailing address: </dt>
                <dd className="inline">4030 Wake Forrest Road, Suite 349, Raleigh, NC</dd>
              </div>
              <div>
                <dt className="font-[700] inline">Verification: </dt>
                <dd className="inline">
                  <a
                    href="https://www.guidestar.org/profile/46-2471893"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0567B1] underline"
                  >
                    Candid profile — Platinum Seal of Transparency
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <h2 className={h2}>Donor-advised funds (DAF)</h2>
          <p>
            Recommend a grant to Free For Charity from Fidelity Charitable, Schwab Charitable,
            Vanguard Charitable, or any DAF sponsor — search by our EIN above. DAF grants are among
            the most efficient ways to fund the endowment.
          </p>
          <ConfirmContact what="grant designation and delivery details" />

          <h2 className={h2}>Appreciated stock &amp; securities</h2>
          <p>
            Donating appreciated shares held over a year typically avoids capital-gains tax and
            deducts the full market value — often 20%+ more impact than selling and giving cash. We
            accept securities gifts; transfers are arranged individually.
          </p>
          <ConfirmContact what="brokerage transfer instructions (account and DTC details)" />

          <h2 className={h2}>Bequests &amp; planned gifts</h2>
          <p>
            A sentence in your will can fund charities&rsquo; digital presence permanently through
            the <Link href="/free-for-charity-endowment-fund/">endowment</Link>. Your attorney will
            want our exact legal name and EIN (above). We&rsquo;re glad to discuss designation
            language and how your gift will be recognized.
          </p>
          <ConfirmContact what="designation language for your estate documents" />

          <h2 className={h2}>IRA qualified charitable distributions (QCD)</h2>
          <p>
            If you&rsquo;re 70½ or older, a QCD from your IRA counts toward required minimum
            distributions without increasing taxable income. Your IRA custodian sends the check
            directly to the charity.
          </p>
          <ConfirmContact what="payee and mailing details for your custodian" />

          <h2 className={h2}>Employer matching &amp; volunteer grants</h2>
          <p>
            Free money you may already have: most large employers match donations and many pay
            grants for volunteer hours. Everything you need is on the{' '}
            <Link href="/matching-gifts/">matching gifts page</Link>.
          </p>

          <p className="mt-8">
            Not tax advice — consult your advisor for your situation. For what your gift
            accomplishes per dollar, see <Link href="/cost-transparency/">the unit economics</Link>:
            $16.50 keeps one charity&rsquo;s entire digital presence alive for a year.
          </p>
        </div>
      </div>
    </div>
  )
}
