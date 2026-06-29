import React from 'react'
import GeneralDonationCard from '@/components/ui/General-Donation-Card'
import ZeffyDonationForm from '@/components/ui/ZeffyDonationForm'
import { campaigns } from '@/data/donation-campaigns'

/**
 * The /donate campaign hub. Driven entirely by `src/data/donation-campaigns.ts`:
 *   1. the general unrestricted fund embedded inline for instant giving,
 *   2. the two most-popular campaigns as prominent cards,
 *   3. every remaining campaign as a directory card linking to its Zeffy page.
 * The endowment is excluded from the directory because the page already
 * features it via the Free-for-Charity-Donation-Options callout.
 */
const DonationCampaigns = () => {
  const general = campaigns.find((c) => c.embed)
  const featured = campaigns.filter((c) => c.featured && !c.embed)
  const directory = campaigns.filter((c) => !c.featured && !c.embed && c.key !== 'endowment')

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
            domains, and Microsoft 365 for nonprofits. Give to the general fund below, or choose a
            specific campaign.
          </p>
        </div>

        {general ? (
          <div className="mb-[60px]">
            <h3
              className="text-[24px] font-[700] leading-[30px] text-[#333] text-center mb-[20px]"
              data-font="lato-font"
            >
              General Fund — Give Now
            </h3>
            <ZeffyDonationForm
              src={general.embedUrl ?? general.formUrl}
              title={`${general.title} — donation form powered by Zeffy`}
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
                <GeneralDonationCard
                  key={c.key}
                  title={c.title}
                  description={c.blurb}
                  img="/Images/payment.gif"
                  href={c.formUrl}
                />
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
                <GeneralDonationCard
                  key={c.key}
                  title={c.title}
                  description={c.blurb}
                  img="/Images/payment.gif"
                  href={c.formUrl}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DonationCampaigns
