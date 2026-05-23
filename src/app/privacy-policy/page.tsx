import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Free For Charity privacy policy describing how we collect, use, and protect your personal information.',
  alternates: { canonical: '/privacy-policy' },
}

import { Introduction } from './components/Introduction'
import { WhoWeAre } from './components/WhoWeAre'
import { InformationWeCollect } from './components/InformationWeCollect'
import { HowWeUseYourInformation } from './components/HowWeUseYourInformation'
import { WhoWeShareYourDataWith } from './components/WhoWeShareYourDataWith'
import { DataRetention } from './components/DataRetention'
import { YourRights } from './components/YourRights'
import { SecurityMeasures } from './components/SecurityMeasures'
import { ThirdPartyLinks } from './components/ThirdPartyLinks'
import { ChildrensPrivacy } from './components/ChildrensPrivacy'
import { InternationalDataTransfers } from './components/InternationalDataTransfers'
import { ChangesToPrivacyPolicy } from './components/ChangesToPrivacyPolicy'
import { ContactUs } from './components/ContactUs'
import { AdditionalInformation } from './components/AdditionalInformation'

export default function PrivacyPolicy() {
  return (
    <div className="pt-[140px] pb-[54px]">
      <div className="py-[27px] w-[90%] md:w-[80%] mx-auto">
        <div id="aria-font">
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]"></p>
          <h1 className="text-[30px] text-[#333] pb-[10px] leading-[1em] font-[500]">
            <strong>Privacy Policy</strong>
          </h1>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            <em>Effective Date: 11-20-2024</em>
          </p>

          <Introduction />
          <WhoWeAre />
          <InformationWeCollect />
          <HowWeUseYourInformation />
          <WhoWeShareYourDataWith />
          <DataRetention />
          <YourRights />
          <SecurityMeasures />
          <ThirdPartyLinks />
          <ChildrensPrivacy />
          <InternationalDataTransfers />
          <ChangesToPrivacyPolicy />
          <ContactUs />
          <AdditionalInformation />
        </div>
      </div>
    </div>
  )
}
