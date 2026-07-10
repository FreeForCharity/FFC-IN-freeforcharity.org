import React from 'react'
import Link from 'next/link'
import ZeffyPopupButton from '@/components/ui/ZeffyPopupButton'
import { hostingCampaign, generalCampaign } from '@/data/donation-campaigns'

/**
 * "Help us keep hosting free" support block for the hosting page.
 *
 * The page no longer sells an individual supporter package, so the support ask
 * is a direct donation to the "Free Charity Website Hosting and Maintenance"
 * Zeffy campaign (falls back to the general fund if that campaign is ever
 * removed). The second path routes people who want to give time to /volunteer.
 */
const SupportThisCampaign = () => {
  const campaign = hostingCampaign ?? generalCampaign

  return (
    <section className="py-[60px]">
      <div className="w-[90%] lg:w-[80%] max-w-[1100px] mx-auto">
        <div className="text-center max-w-[760px] mx-auto mb-[44px]">
          <h2
            className="mb-[14px] text-[31px] font-[700] leading-[38px] text-[#0567B1]"
            data-font="cantata-font"
          >
            Not a charity? Help us keep it free
          </h2>
          <p className="text-[18px] font-[500] leading-[29px] text-[#333]" data-font="raleway-font">
            Every website we host is paid for by donors and volunteers, not by the nonprofits we
            serve. Individuals and businesses can chip in directly — 100% of your gift goes to the
            mission through Zeffy, which charges us 0% platform fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
          {/* Donate to the hosting campaign */}
          <div className="flex flex-col items-center text-center bg-[#0567B1] rounded-[10px] p-[40px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.25)]">
            <h3
              className="mb-[12px] text-[24px] font-[700] leading-[30px] text-white"
              data-font="cantata-font"
            >
              Fund a charity&apos;s website
            </h3>
            <p
              className="mb-[26px] text-[16px] font-[500] leading-[26px] text-white/90"
              data-font="raleway-font"
            >
              Your donation goes straight to hosting and maintaining nonprofit websites. At checkout
              you can even name the specific charity you want to support.
            </p>
            <div className="mt-auto">
              <ZeffyPopupButton
                formLink={campaign.zeffyFormLink}
                label="Donate to this campaign"
                variant="primary"
                className="bg-white !text-[#0567B1] border-white"
              />
            </div>
          </div>

          {/* Volunteer */}
          <div className="flex flex-col items-center text-center bg-white rounded-[10px] p-[40px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.15)] border border-[#eef2f6]">
            <h3
              className="mb-[12px] text-[24px] font-[700] leading-[30px] text-[#0567B1]"
              data-font="cantata-font"
            >
              Give your time
            </h3>
            <p
              className="mb-[26px] text-[16px] font-[500] leading-[26px] text-[#555]"
              data-font="raleway-font"
            >
              Developers, designers, and organizers build and maintain these sites. Join the
              volunteer team and help more charities get online.
            </p>
            <div className="mt-auto">
              <Link
                href="/volunteer/"
                className="inline-flex items-center justify-center rounded-[10px] border-2 border-[#0567B1] px-[24px] py-[14px] text-[16px] font-[700] text-[#0567B1] transition-colors duration-200 hover:bg-[#0567B1]/5"
                data-font="raleway-font"
              >
                Become a volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportThisCampaign
