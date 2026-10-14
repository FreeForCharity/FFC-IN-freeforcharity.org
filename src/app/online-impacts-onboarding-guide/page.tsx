import { pageMetadata } from '@/lib/page-metadata'
import TrackCards from '@/components/application-guide/TrackCards'
import { FFC_TEL_HREF, FFC_TEXT_NUMBER } from '@/data/charity-terms'

export const metadata = pageMetadata({
  title: 'Online Impacts Charities',
  description:
    'Online Impacts has closed. Charities it supported can continue with Free For Charity: contact Clarke Moyer, or apply on the page for your type of organization.',
  canonical: '/online-impacts-onboarding-guide/',
})

const linkClass = 'text-[#0567B1] underline font-[600]'

/**
 * Online Impacts has shut down. This short page keeps its old URL working for
 * the charities it supported and points them to Free For Charity.
 */
export default function OnlineImpactsPage() {
  return (
    <div className="ffc-container pt-[120px] pb-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-[20px] font-[var(--font-faustina)] text-[40px] leading-[50px] sm:text-[48px] sm:leading-[60px]">
          Online Impacts charities
        </h1>
        <p className="mb-[16px] text-[19px] leading-[30px] text-[#333]">
          Online Impacts has closed. Charities that were supported by Online Impacts can continue
          with Free For Charity.
        </p>
        <p className="mb-[32px] text-[19px] leading-[30px] text-[#333]">
          For help, reach out directly to Clarke Moyer: text{' '}
          <a href={FFC_TEL_HREF} className={linkClass}>
            {FFC_TEXT_NUMBER}
          </a>
          , or email{' '}
          <a href="mailto:clarkemoyer@freeforcharity.org" className={linkClass}>
            clarkemoyer@freeforcharity.org
          </a>
          .
        </p>
        <h2 className="mb-[16px] text-[26px] font-[700] leading-[34px] text-[#111]">
          Haven’t applied yet?
        </h2>
        <p className="mb-[20px] text-[18px] leading-[28px] text-[#333]">
          Apply on the page for your type of organization.
        </p>
        <TrackCards withPicker={false} />
      </div>
    </div>
  )
}
