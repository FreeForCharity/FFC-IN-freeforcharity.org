import React from 'react'
import Transparentbtn from '@/components/ui/Transparentbtn'
import HelpMeChoose from '@/components/ui/HelpMeChoose'
import { hubAddProduct, ONBOARDING_PID } from '@/lib/config'

const FFCOnboardingNotice = () => {
  return (
    <section id="apply" className="pt-[20px] pb-[40px] bg-white scroll-mt-[120px]">
      <div className="py-[20px] w-[90%] md:w-[80%] mx-auto max-w-[1080px] text-center">
        {/* Main Heading */}
        <h2
          className="font-[700] text-[30px] md:text-[35px] leading-[45px] mb-[16px] pb-[10px] text-[#0567B1]"
          data-font="cantata-font"
        >
          How the free domain program works
        </h2>

        <p
          className="font-[500] text-[20px] leading-[32px] mb-[16px] md:w-[75%] mx-auto"
          data-font="raleway-font"
        >
          You don&apos;t buy a domain, wrangle a registrar, or run DNS. When your charity joins Free
          For Charity, we register (or transfer in) your <b>.org</b> name, hold and manage it in our
          Cloudflare account, and pay the renewal every year. You and your team simply get added as
          domain admins so you always have access.
        </p>

        <p
          className="font-[600] text-[20px] md:text-[24px] leading-[34px] w-[85%] mx-auto mt-[24px]"
          data-font="raleway-font"
        >
          The first step is always the same: complete FFC onboarding. Then your website is built and
          validated on free GitHub Pages hosting — and only after your site is proven do we buy your
          domain and set up email.
        </p>
      </div>

      <div className="w-[90%] md:w-[80%] mx-auto text-center">
        <h3
          className="text-[22px] sm:text-[24px] md:text-[26px] font-medium text-[#333] pb-[10px]"
          data-font="aria-font"
        >
          Ready to get started?
        </h3>

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
    </section>
  )
}

export default FFCOnboardingNotice
