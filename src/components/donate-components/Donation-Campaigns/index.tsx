import React from 'react'
import ZeffyPopupButton from '@/components/ui/ZeffyPopupButton'
import { campaigns, type DonationCampaign } from '@/data/donation-campaigns'

// A single campaign card: title, blurb, and a Zeffy pop-up button.
const CampaignCard = ({ campaign, cta }: { campaign: DonationCampaign; cta: string }) => (
  <div
    className="flex flex-col justify-between bg-white p-6 rounded-[10px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)]"
    data-font="lato-font"
  >
    <div>
      <h4 className="text-[22px] font-[700] leading-[28px] text-center pb-[10px]">
        {campaign.title}
      </h4>
      <p className="text-[16px] font-[500] leading-[24px] text-center text-[#666] pb-[20px]">
        {campaign.blurb}
      </p>
    </div>
    <div className="flex justify-center">
      <ZeffyPopupButton formLink={campaign.zeffyFormLink} label={cta} variant="secondary" />
    </div>
  </div>
)

/**
 * The /donate campaign hub. Driven entirely by `src/data/donation-campaigns.ts`:
 *   1. the general unrestricted fund as a prominent pop-up CTA,
 *   2. the two most-popular campaigns as featured cards,
 *   3. every remaining campaign as a directory card.
 * Each button is a Zeffy pop-up trigger (the form opens in a modal). The
 * endowment is excluded from the directory because the page already features it
 * via the Free-for-Charity-Donation-Options callout.
 */
const DonationCampaigns = () => {
  const general = campaigns.find((c) => c.primary)
  const featured = campaigns.filter((c) => c.featured && !c.primary)
  const directory = campaigns.filter((c) => !c.featured && !c.primary && c.key !== 'endowment')

  return (
    <div className="w-full pt-[40px] pb-[80px] bg-[#FCFCFC]">
      <div className="w-[90%] md:w-[80%] mx-auto">
        <div className="text-center pb-[30px]">
          <h2
            className="text-[30px] md:text-[40px] font-[700] leading-[44px] text-[#b35000] mb-[16px]"
            data-font="lato-font"
          >
            Choose a Campaign to Support
          </h2>
          <p
            className="text-[18px] font-[500] leading-[27px] text-[#333] max-w-[760px] mx-auto"
            data-font="lato-font"
          >
            Every gift is processed through Zeffy, which charges nonprofits 0% platform fees—so 100%
            of your donation supports Free For Charity&apos;s work building free, AI-built websites,
            domains, and Microsoft 365 for nonprofits. Give to the general fund, or choose a
            specific campaign.
          </p>
        </div>

        {general ? (
          <div className="bg-[#2D7F87] rounded-[10px] py-[32px] px-[24px] mb-[60px] text-center max-w-[760px] mx-auto">
            <h3
              className="text-[26px] font-[700] leading-[32px] text-white mb-[12px]"
              data-font="lato-font"
            >
              {general.title}
            </h3>
            <p className="text-[16px] font-[500] leading-[24px] text-white mb-[24px]">
              {general.blurb}
            </p>
            <ZeffyPopupButton
              formLink={general.zeffyFormLink}
              label="Donate Now"
              variant="primary"
            />
          </div>
        ) : null}

        {featured.length ? (
          <div className="mb-[60px]">
            <h3
              className="text-[24px] font-[700] leading-[30px] text-[#333] text-center mb-[24px]"
              data-font="lato-font"
            >
              Most Popular Campaigns
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px]">
              {featured.map((c) => (
                <CampaignCard key={c.key} campaign={c} cta="Support this campaign" />
              ))}
            </div>
          </div>
        ) : null}

        {directory.length ? (
          <div>
            <h3
              className="text-[24px] font-[700] leading-[30px] text-[#333] text-center mb-[24px]"
              data-font="lato-font"
            >
              All Campaigns
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
              {directory.map((c) => (
                <CampaignCard key={c.key} campaign={c} cta="Give" />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DonationCampaigns
