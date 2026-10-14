import React from 'react'
import TrackCards from '@/components/application-guide/TrackCards'

/** "Ready to apply?": go-to-your-application-page cards, no direct Apply buttons. */
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
          Go to the application page that matches your organization. It explains who qualifies, what
          you commit to and every field, with its Apply button at the end.
        </p>
        <TrackCards />
      </div>
    </div>
  )
}

export default index
