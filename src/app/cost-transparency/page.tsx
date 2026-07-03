import type { Metadata } from 'next'
import Link from 'next/link'
import { metric } from '@/data/impact'

export const metadata: Metadata = {
  title: 'What $16.50 Per Charity Per Year Buys',
  description:
    "Free For Charity's unit economics: what one charity's full digital presence costs us, what it would cost commercially, and how far a donation multiplies.",
  alternates: { canonical: '/cost-transparency/' },
}

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function CostTransparency() {
  const costPerCharity = Number(metric('costPerCharityUsdPerYear').value)
  const orgsSupported = metric('organizationsSupported').value

  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          What ${costPerCharity} Per Charity Per Year Buys
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Free For Charity&rsquo;s core program keeps a nonprofit&rsquo;s entire digital presence
            alive for about <strong>${costPerCharity} per year</strong> — our actual hard cost,
            dominated by the .org domain registration. Everything else is engineered to be free.
          </p>

          <h2 className={h2}>The unit economics</h2>
          <ul>
            <li>
              <strong>Domain registration (~${costPerCharity}/yr):</strong> the one thing that
              always costs real money — so we pay it.
            </li>
            <li>
              <strong>Hosting ($0):</strong> charity sites are fast, secure static sites on free
              static-hosting infrastructure — no servers to rent or patch.
            </li>
            <li>
              <strong>Email ($0):</strong> Microsoft&rsquo;s nonprofit grant (
              <Link href="/m365-email-guide/">we help charities claim it</Link>).
            </li>
            <li>
              <strong>DNS &amp; security ($0):</strong> free-tier enterprise DNS with our volunteers
              holding the configuration.
            </li>
            <li>
              <strong>Labor ($0 in dollars):</strong> volunteer webmasters, IT project managers, and
              designers — the real engine of the program.
            </li>
          </ul>

          <h2 className={h2}>The commercial comparison</h2>
          <p>
            A small nonprofit buying the same stack commercially typically pays{' '}
            <strong>$300–$1,500+ per year</strong>: $10–20 domain, $100–400 shared hosting or
            website builder, $70+/user email, plus setup and maintenance labor billed at market
            rates. The difference — a couple hundred to over a thousand dollars per charity per year
            — is money that stays in soup kitchens, animal shelters, and scholarship funds.
          </p>

          <h2 className={h2}>The multiplication story</h2>
          <p>
            With {String(orgsSupported)}+ organizations supported, small gifts scale strangely well:
          </p>
          <ul>
            <li>
              <strong>${costPerCharity}</strong> keeps one charity&rsquo;s domain alive for a year.
            </li>
            <li>
              <strong>$100</strong> covers six charities for a year.
            </li>
            <li>
              <strong>$1,000</strong> covers sixty.
            </li>
          </ul>
          <p>
            That&rsquo;s the thinking behind our endowment: at scale, investment income alone can
            keep every supported charity&rsquo;s digital presence funded permanently. See the{' '}
            <Link href="/free-for-charity-endowment-fund/">endowment fund</Link> or{' '}
            <Link href="/donate/">give directly</Link> — the footer&rsquo;s &ldquo;Fund Free
            Domains&rdquo; campaign routes 100% of your gift to exactly this cost (Zeffy charges us
            no fees).
          </p>

          <h2 className={h2}>Where the numbers come from</h2>
          <p>
            The cost figure is our registrar&rsquo;s .org price; supported-organization counts are
            derived from dated records as described in{' '}
            <Link href="/how-we-count/">how we count</Link>. We publish the same figures to our{' '}
            Candid profile.
          </p>
        </div>
      </div>
    </div>
  )
}
