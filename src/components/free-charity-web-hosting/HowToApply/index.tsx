import React from 'react'
import Link from 'next/link'
import HowItWorks from '@/components/application-guide/HowItWorks'

/**
 * How to apply: the shared, canonical step list (src/data/journey.ts), so
 * this page can never drift from the application pages.
 */
const HowToApply = () => {
  return (
    <section id="how-to-apply" className="py-[60px] bg-[#F5F8FB] scroll-mt-[120px]">
      <div className="w-[90%] max-w-[880px] mx-auto">
        <p
          className="mb-[20px] text-[18px] font-[500] leading-[29px] text-[#333]"
          data-font="raleway-font"
        >
          The whole process is guided. You bring your mission and content on the application; we
          handle the technical work.
        </p>
        <HowItWorks heading="How to apply, step by step" id="how-to-apply-steps" />
        <div className="mt-[28px] flex flex-col sm:flex-row items-center justify-center gap-[16px]">
          <a
            href="#apply"
            className="inline-flex items-center justify-center rounded-[10px] bg-[#0567B1] px-[28px] py-[15px] text-[17px] font-[700] text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[#045a9b]"
            data-font="raleway-font"
          >
            Find your application
          </a>
          <Link
            href="/charity-onboarding-journey/"
            className="inline-flex items-center justify-center rounded-[10px] border-2 border-[#0567B1] px-[28px] py-[15px] text-[17px] font-[700] text-[#0567B1] transition-colors duration-200 hover:bg-[#0567B1]/5"
            data-font="raleway-font"
          >
            See the full onboarding journey
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HowToApply
