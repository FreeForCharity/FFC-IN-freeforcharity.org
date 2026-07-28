import React from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/assetPath'

const Index = () => {
  return (
    <div className="w-full pt-[27px] pb-[54px] bg-[#FCFCFC]">
      <div className="w-full max-w-[90%] mx-auto">
        {/* Red Divider Line */}
        <div className="h-px bg-[#2D7F87] w-full mb-10"></div>

        {/* Candid Instruction Text */}
        <p
          className="text-[14px] text-[#666] font-semibold leading-relaxed mb-8"
          data-font="aria-font"
          aria-describedby="A Candid profile is required for onboarding verification"
        >
          Your Candid nonprofit profile — the service most people still know as GuideStar — is the
          main tool for helping you gather the information to complete our onboarding form. Profiles
          are now claimed and edited at{' '}
          <a href="https://app.candid.org/" className="text-[#0567B1]">
            app.candid.org
          </a>
          , not on guidestar.org. Your goal should be to reach the highest level of completion
          (Candid Platinum). Get the highest level you can with the data you have. It takes roughly
          2–3 hours to fully reach Platinum the first time and then 30 minutes a year to keep it
          updated.{' '}
          <strong>
            To be supported by Free For Charity, we require organizations to be at least Gold
          </strong>{' '}
          and to upload info for your board and IRS Designation Documents. See the highlighted areas
          below.
        </p>

        {/* Seals expire — Candid's own best-practice guidance */}
        <p
          className="text-[14px] text-[#666] font-semibold leading-relaxed mb-8"
          data-font="aria-font"
        >
          Two things worth knowing before you start: seals must be earned in order (you cannot skip
          to Gold), and{' '}
          <strong>
            a seal expires if the profile is not updated each year — you lose the seal and its
            benefits along with it
          </strong>
          . Renewing is quick: sign in, review each field for accuracy, add current-year data, and
          click Publish.
        </p>

        {/* Where the checklist lives in the current editor */}
        <p
          className="text-[14px] text-[#666] font-semibold leading-relaxed mb-8"
          data-font="aria-font"
        >
          You do not have to track any of this by hand. The profile editor carries a{' '}
          <strong>“Fields required to earn a 2026 Seal of Transparency”</strong> panel down the
          right-hand side: each seal level shows a percent-complete bar and a green check against
          every field you have satisfied, and a <strong>Refresh checklist status</strong> button at
          the bottom re-scores it after you save. Individual fields in the form are tagged with the
          level they unlock, so a field marked “Bronze” is one standing between you and your Bronze
          seal. Work the panel top to bottom and you cannot miss a requirement.
        </p>

        {/* Responsive Image with Proper Dimensions */}
        <div className="relative w-full h-auto">
          <Image
            src={assetPath('/Images/free-for-charity.webp')}
            alt="Free For Charity Candid profile seal checklist with the fields FFC requires highlighted"
            width={780}
            height={100}
            className="w-[780px] h-auto object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Index
