import React from 'react'
import Transparentbtn from '@/components/ui/Transparentbtn'
import HelpMeChoose from '@/components/ui/HelpMeChoose'
import { hubAddProduct, ONBOARDING_PID } from '@/lib/config'

const index = () => {
  return (
    <div id="apply" className="py-[50px] scroll-mt-[120px]">
      <div className="w-[90%] md:w-[80%] max-w-[1000px] mx-auto text-center">
        <h2
          className="text-[24px] sm:text-[26px] md:text-[28px] font-[600] text-[#333] pb-[6px]"
          data-font="aria-font"
        >
          Ready to apply?
        </h2>
        <p
          className="mb-[24px] text-[17px] font-[500] leading-[27px] text-[#555]"
          data-font="raleway-font"
        >
          Pick the option that matches your organization and start your onboarding application.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <Transparentbtn
            text="501(c)3 Charities — Apply Here"
            href={hubAddProduct(ONBOARDING_PID.full501c3)}
          />
          <Transparentbtn
            text="Pre-501(c)3 Charities — Apply Here"
            href={hubAddProduct(ONBOARDING_PID.pre501c3)}
          />
        </div>

        <div className="mt-[24px] flex justify-center">
          <HelpMeChoose />
        </div>
      </div>
    </div>
  )
}

export default index
