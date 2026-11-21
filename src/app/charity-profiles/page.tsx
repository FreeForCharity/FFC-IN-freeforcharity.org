import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import {
  charityProfiles,
  categoryHeadings,
  FFC_EIN,
  PROFILES_LAST_CHECKED,
  type ProfileCategory,
} from '@/data/charity-profiles'

export const metadata = pageMetadata({
  title: 'Charity Profiles',
  description:
    "Free For Charity's profile pages at independent charity-profile and giving platforms: verify our 501(c)(3) status, give through your workplace or donor-advised fund, or volunteer.",
  canonical: '/charity-profiles/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-12 mb-3'
const order: ProfileCategory[] = ['status', 'giving', 'volunteer']

export default function CharityProfiles() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-6">
          Charity Profiles
        </h1>

        <div className="font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Free For Charity is a 501(c)(3) public charity, EIN <strong>{FFC_EIN}</strong>. Donors,
            employers and grant makers often check a charity on an outside platform before they
            give. These are our own pages on those platforms, so you can check us out in the place
            you already trust.
          </p>

          {order.map((cat) => {
            const items = charityProfiles.filter((p) => p.category === cat)
            if (items.length === 0) return null
            const { heading, intro } = categoryHeadings[cat]
            return (
              <section key={cat} aria-labelledby={`profiles-${cat}`}>
                <h2 id={`profiles-${cat}`} className={h2}>
                  {heading}
                </h2>
                <p className="mb-6 text-gray-700">{intro}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((p) => (
                    <li
                      key={p.provider}
                      className="border border-gray-200 rounded-lg p-6 flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-[22px] leading-[30px] font-semibold">{p.provider}</h3>
                        {p.badge && (
                          // eslint-disable-next-line @next/next/no-img-element -- provider-served dynamic badge, not a local asset
                          <img
                            src={p.badge.src}
                            alt={p.badge.alt}
                            width={p.badge.width}
                            height={p.badge.height}
                            className="shrink-0"
                          />
                        )}
                      </div>
                      <p className="text-[16px] leading-[24px] text-gray-700 flex-1">{p.shows}</p>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0567B1] underline font-medium"
                      >
                        View our {p.provider} page
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}

          <h2 className={h2}>Prefer to give directly?</h2>
          <p>
            Every platform above routes money to us in its own way, and some take a fee. Our{' '}
            <Link href="/donate/" className="text-[#0567B1] underline">
              donate page
            </Link>{' '}
            uses Zeffy, which charges us no fees, so your whole gift reaches Free For Charity.
          </p>

          <p className="mt-10 text-[14px] leading-[20px] text-gray-600">
            Each link was last checked on {PROFILES_LAST_CHECKED}. If one stops working, please{' '}
            <Link href="/contact-us/" className="underline">
              let us know
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
