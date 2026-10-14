import React from 'react'
import TrackCards from '@/components/application-guide/TrackCards'
import HowItWorks from '@/components/application-guide/HowItWorks'

/**
 * Ready to get started: go-to-your-application-page cards (no direct Apply
 * button) and the shared, canonical step list.
 */
const index = () => {
  return (
    <div className="bg-white">
      <div className="w-full max-w-[90%] mx-auto">
        <div className="flex items-center flex-col text-center pb-[40px]">
          <h2 className="text-[26px] font-[500] text-[#333] pb-[10px]" data-font="aria-font">
            Ready to Get Started Now?
          </h2>
          <p className="mb-[20px] max-w-[720px] text-[18px] text-[#555]" data-font="lato-font">
            Go to the application page that matches your organization. Most Online Impacts charities
            are IRS-recognized 501(c)(3)s and use the 501(c)(3) application.
          </p>
          <TrackCards className="w-full max-w-[1000px]" />
        </div>
        <div className="mx-auto max-w-[880px] pb-[40px]">
          <HowItWorks />
        </div>
      </div>
    </div>
  )
}

export default index
