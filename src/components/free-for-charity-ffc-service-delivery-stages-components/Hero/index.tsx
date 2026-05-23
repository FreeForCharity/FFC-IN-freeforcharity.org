import React from 'react'
import OnboardingPhilosophy from './OnboardingPhilosophy'
import ServiceDeliveryStages from './ServiceDeliveryStages'
import ServiceExpansion from './ServiceExpansion'

const index = () => {
  return (
    <div className="pt-[135px] pb-[50px]">
      <div className="py-[24px] w-[90%] md:w-[80%] max-w-[1080px] mx-auto" id="aria-font">
        {/* header  */}
        <div
          className="bg-[#1f2937] text-white p-8 text-center shadow-lg shadow-black/20"
          id="aria-font"
        >
          <h1 className="text-[36px] font-[700] leading-[36px] mb-[8px] pb-[10px]">
            Free For Charity (FFC)
          </h1>
          <h2 className="text-[24px] font-[600] leading-[24px] pb-[10px]">
            Service Delivery Stages
          </h2>
        </div>

        {/* main full content  */}
        <div className="py-[32px] px-[0px] md:px-[16px] w-full max-w-[960px] mx-auto">
          {/* section 1  */}
          <OnboardingPhilosophy />

          {/* section 2  */}
          <ServiceDeliveryStages />

          {/* section 3  */}
          <ServiceExpansion />
        </div>

        {/* footer  */}
        <div className="text-center p-4 mt-8 text-[#6b7280] text-sm">
          <p className="text-center">Free For Charity | Operational Workflow</p>
        </div>
      </div>
    </div>
  )
}

export default index
