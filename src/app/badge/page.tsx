import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import { assetPath } from '@/lib/assetPath'

export const metadata = pageMetadata({
  title: 'Powered by Free For Charity Badge',
  description:
    'Show your supporters your site runs on donated infrastructure — copy the Powered by Free For Charity badge embed for your nonprofit website.',
  canonical: '/badge/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

// Served from the production host (not assetPath) so the snippet works on any
// charity site and design refreshes propagate to every embedder — the same
// live-embed principle as the Candid seal.
const LIGHT = 'https://www.freeforcharity.org/badges/powered-by-ffc.svg'
const DARK = 'https://www.freeforcharity.org/badges/powered-by-ffc-dark.svg'

const snippet = `<a href="https://www.freeforcharity.org/" title="Free websites, domains, and email for nonprofits">
  <img src="${LIGHT}" alt="Powered by Free For Charity" width="220" height="44" />
</a>`

export default function BadgePage() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          The &ldquo;Powered by Free For Charity&rdquo; Badge
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            If FFC hosts your charity&rsquo;s site, this badge tells your supporters their donations
            aren&rsquo;t paying hosting bills — and it points the next charity that needs help
            toward us. Every badge link also strengthens the search authority of the whole network
            of supported charities, including yours.
          </p>

          <h2 className={h2}>The badge</h2>
          <p className="flex flex-wrap items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element -- displaying the literal badge asset */}
            <img
              src={assetPath('/badges/powered-by-ffc.svg')}
              alt="Powered by Free For Charity (light variant)"
              width={220}
              height={44}
            />
            <span className="inline-block rounded bg-[#1a1a1a] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- displaying the literal badge asset */}
              <img
                src={assetPath('/badges/powered-by-ffc-dark.svg')}
                alt="Powered by Free For Charity (dark variant)"
                width={220}
                height={44}
              />
            </span>
          </p>

          <h2 className={h2}>Copy the embed</h2>
          <p>
            Paste this anywhere in your site&rsquo;s footer. The image is served from
            freeforcharity.org, so if the design is refreshed your badge updates automatically — no
            maintenance on your side. (If FFC built your site, just ask and we&rsquo;ll add it for
            you.)
          </p>
          <pre className="whitespace-pre-wrap break-all bg-[#f5f5f5] text-left text-[13px] leading-[20px] p-4 rounded border border-gray-200">
            {snippet}
          </pre>
          <p>
            Dark background? Swap the image URL for <code>{DARK}</code>.
          </p>

          <h2 className={h2}>Usage terms (short version)</h2>
          <ul>
            <li>
              Use it if Free For Charity provides your organization&rsquo;s hosting, domain, email,
              or site support.
            </li>
            <li>
              Don&rsquo;t alter the artwork or imply endorsement of products/services we don&rsquo;t
              provide.
            </li>
            <li>
              Not supported by us yet?{' '}
              <Link href="/eligibility-check/">Check your eligibility</Link> — the badge comes with
              the program.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
