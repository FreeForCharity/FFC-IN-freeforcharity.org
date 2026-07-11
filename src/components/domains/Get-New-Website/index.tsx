import React from 'react'
import Transparentbtn from '@/components/ui/Transparentbtn'
import { hubAddProduct, ONBOARDING_PID } from '@/lib/config'

const index = () => {
  return (
    <div className="pb-[30px]">
      <div>
        <div className="py-[41px]">
          <div className="pt-[24px] pb-[3px] w-[90%] md:w-[80%] mx-auto max-w-[1080px]">
            <h2
              className="mt-[2px] mb-[12px] pb-[10px] text-[30px] md:text-[35px] font-[700] leading-[46px] text-[#0567B1] text-center"
              data-font="cantata-font"
            >
              AND A WEBSITE TO GO WITH IT
            </h2>
            <p
              className="mb-[13px] w-[85%] mx-auto font-[500] text-[20px] leading-[30px] text-center"
              data-font="raleway-font"
            >
              Your domain and email come with a website. Free For Charity builds each charity a
              fast, secure static website on GitHub Pages from the FFC template, and a volunteer
              sets it up and launches it on your Cloudflare-managed domain. New builds run on a
              backlog — we aim to support 100 charities a year — and how quickly your site goes live
              depends mainly on how ready your content is.
            </p>
          </div>
        </div>

        <div className="w-[90%] md:w-[80%] mx-auto text-center pb-[54px]">
          <h3
            className="text-[22px] sm:text-[24px] md:text-[26px] font-medium text-[#333] pt-[22px] pb-[10px]"
            data-font="aria-font"
          >
            Ready to apply?
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
        </div>
      </div>
    </div>
  )
}

export default index
