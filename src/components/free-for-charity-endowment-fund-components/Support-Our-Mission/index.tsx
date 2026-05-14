import React, { CSSProperties, IframeHTMLAttributes } from 'react'
import { assetPath } from '@/lib/assetPath'

interface SupportMissionSectionProps {
  title?: string
  description1?: string
  description2?: string
}

interface ExtendedIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  allowpaymentrequest?: string
  allowtransparency?: string
}

const SupportMissionSection: React.FC<SupportMissionSectionProps> = ({
  title = 'Support Our Mission',
  description1 = 'Join us in reaching our $1,000,000 Endowment goal to ensure sustainable support for our US based 501c3 charities.',
  description2 = 'Your contribution will help provide free domain names and essential email services to nonprofits, enabling them to focus on their missions without the burden of digital costs. Every donation brings us closer to empowering more charities with the tools they need to succeed.',
}) => {
  const donationFormStyle: CSSProperties = {
    position: 'absolute',
    border: '0',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  }

  const donationFormProps: ExtendedIframeProps = {
    title: 'Donation form powered by Zeffy',
    style: donationFormStyle,
    src: 'https://www.zeffy.com/embed/donation-form/free-for-charity-endowment-fund',
    allowpaymentrequest: '',
    allowtransparency: 'true',
  }

  return (
    <section
      id="donate"
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
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-[40px] items-center">
        <div
          className="bg-white rounded-[6px] shadow-[0px_24px_72px_-12px_rgba(0,0,0,0.12)] p-[40px] max-w-[540px] text-center
        sm:p-[24px] sm:max-w-[540px] w-[100%]"
        >
          <h1
            className="text-[32px] font-[500] text-gray-900 mb-[10px] pb-[10px] sm:leading-[60px]
            sm:text-[50px] leading-[40px]"
            id="cinzel"
          >
            {title}
          </h1>
          <p
            className="sm:text-[16px] font-[500] text-[#000000a3] mb-6 sm:leading-[28px]
            text-[14px] leading-[24px]"
            id="fauna-font"
          >
            {description1}
          </p>
          <p
            className="sm:text-[16px] font-[500] text-[#000000a3] mb-6 sm:leading-[28px]
            text-[14px] leading-[24px]"
            id="fauna-font"
          >
            {description2}
          </p>
        </div>

        <div className="w-full lg:w-[50%] flex justify-center">
          <div
            className="relative w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-lg overflow-hidden"
            role="region"
            aria-label="Endowment fund donation form"
          >
            <iframe {...donationFormProps}></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportMissionSection
