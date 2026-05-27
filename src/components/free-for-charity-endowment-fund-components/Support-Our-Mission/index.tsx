import React from 'react'
import Link from 'next/link'
import { assetPath } from '@/lib/assetPath'

interface SupportMissionSectionProps {
  title?: string
  description1?: string
  description2?: string
  ctaLabel?: string
  ctaHref?: string
}

const SupportMissionSection: React.FC<SupportMissionSectionProps> = ({
  title = 'Help Us Reach $1,000,000',
  description1 = 'A fully-funded $1M endowment lets Free For Charity cover free domains, hosting, and email for our 501(c)(3) partners from investment returns alone &mdash; with no annual fundraising scramble.',
  description2 = 'Every gift, of any size, moves us closer. Recurring monthly gifts are especially powerful: they compound into permanent capacity for the charities we serve.',
  ctaLabel = 'Give to the Endowment',
  ctaHref = '#donate',
}) => {
  return (
    <section
      className="pt-[90px] pb-[90px] bg-[#003566] md:min-h-screen flex items-center justify-center p-6
      sm:pt-[60px] sm:pb-[60px] sm:p-4"
      style={{
        backgroundImage: `
          linear-gradient(90deg, #003566 40%, rgba(0, 0, 0, 0.5) 100%),
          url('${assetPath('/Images/people-donating.webp')}')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="bg-white rounded-[6px] shadow-[0px_24px_72px_-12px_rgba(0,0,0,0.12)] p-[40px] max-w-[540px] text-center
      sm:p-[24px] sm:max-w-[540px] w-[100%]"
      >
        <h2
          className="text-[32px] font-[500] text-gray-900 mb-[10px] pb-[10px] sm:leading-[60px]
          sm:text-[50px] leading-[40px]"
          id="cinzel"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="sm:text-[16px] font-[500] text-[#000000a3] mb-6 sm:leading-[28px]
          text-[14px] leading-[24px]"
          id="fauna-font"
          dangerouslySetInnerHTML={{ __html: description1 }}
        />
        <p
          className="sm:text-[16px] font-[500] text-[#000000a3] mb-6 sm:leading-[28px]
          text-[14px] leading-[24px]"
          id="fauna-font"
          dangerouslySetInnerHTML={{ __html: description2 }}
        />
        <Link
          href={ctaHref}
          className="inline-block whitespace-nowrap px-[28px] py-[12px] bg-[#003566] text-white rounded-full text-[14px] font-[700] leading-[24px] shadow-lg hover:bg-[#002448] transition"
          id="fauna-font"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}

export default SupportMissionSection
