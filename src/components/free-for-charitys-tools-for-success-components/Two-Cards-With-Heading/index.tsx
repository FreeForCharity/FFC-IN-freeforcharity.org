import React from 'react'
import Link from 'next/link'
import SlidingCard from '@/components/ui/SlidingCard'

const index = () => {
  return (
    <div>
      <div className="py-[54px] ">
        <div className="">
          <div className="w-[80%] mx-auto pt-[27px] pb-[35px] ">
            <h1
              className="mb-[11px] pb-[10px] text-[40px] font-[700] leading-[44px] text-center text-[#333] tracking-[1px]"
              data-font="faustina-font"
            >
              Tools for <span className="text-[#b35000]">Non-Profits</span>
            </h1>
            <div className="w-[18%] mx-auto h-[5px] bg-[#b35000]"></div>
          </div>

          <SlidingCard
            direction="left"
            subtitle="Candid, formerly GuideStar (free with paid options)"
            description={
              <>
                This charity provides profiles of nearly every charity in the world. It also
                provides an API that lets others check on the nonprofit status of any charity by
                name, EIN, or other metrics. Many of the charity for charity sites as well as
                indirect sites that provide discounts to nonprofits require a completed Candid
                profile before giving free or discounted items to your organization. Claim your
                profile and have it validated at the highest level possible here before seeking the
                other services — our{' '}
                {/* next/link, not a raw <a>: the GitHub Pages staging deploy builds with
                    NEXT_PUBLIC_BASE_PATH=/FFC-IN-freeforcharity.org, and only Link applies
                    that prefix. A root-absolute href would 404 there. */}
                <Link href="/guidestar-guide/" className="underline">
                  Candid guide
                </Link>{' '}
                walks you through it.
              </>
            }
            buttonText="Available Here"
            buttonLink="https://candid.org/claim-nonprofit-profile/"
            imageSrc="/Images/guidestar.webp" // 👈 image passed as prop
          />
          <SlidingCard
            direction="left"
            subtitle="Techsoup (Free to join, admin fees for most items offered)"
            description={
              <>
                My personal charity focused on bridging the gaps between the big players in the
                charity for charities section. Focus is on IT Project Management support and other
                business level support. Free For Charity leverages and simplifies the plethora of
                options each charity has to provide what is needed most by the individual
                organization.
              </>
            }
            buttonText="Available Here"
            buttonLink="https://www.techsoup.org/"
            imageSrc="/Images/TechSouplogo.webp" // 👈 image passed as prop
          />
          <SlidingCard
            direction="left"
            subtitle="Goodstack, formerly Percent (free verification)"
            description={
              <>
                The nonprofit-status validator that Google for Nonprofits relies on — including the
                $10,000/month Google Ad Grant — and that Canva, Zoom, OpenAI and many other
                technology companies use before granting nonprofit pricing. Register once with your
                EIN and IRS determination letter, alongside Candid and TechSoup, and your charity is
                already verified when those programs check — our{' '}
                <Link href="/google-for-nonprofits-guide/" className="underline">
                  Google for Nonprofits guide
                </Link>{' '}
                explains how it fits together.
              </>
            }
            buttonText="Available Here"
            buttonLink="https://goodstack.org/"
            imageSrc="/Images/goodstack-logo.webp" // 👈 image passed as prop
          />

          <div className="py-[6px] w-[80%] mx-auto">
            <div className="bg-[#E48B32] h-[3px] w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
