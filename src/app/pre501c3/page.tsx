import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import TrackPage from '@/components/application-guide/TrackPage'
import Faqs from '@/components/pre501c3-components/Faqs'

export const metadata = pageMetadata({
  title: 'Pre-501(c)(3) Application',
  description:
    'Apply to Free For Charity before your 501(c)(3) is approved: who qualifies, what you commit to, how it works, and every application field explained, with one Apply button.',
  canonical: '/pre501c3/',
})

/** The single page for the pre-501(c)(3) application (WHMCS pid 16). */
const index = () => {
  return (
    <div className="w-full">
      <HeroSection
        heading="Pre-501(c)(3) Application"
        paragraph="Even while your 501(c)(3) is pending, apply for a free, professionally built website (a fast, secure GitHub Pages site built with AI) and a free .org domain once your site is approved. Charity email comes after the IRS approves your 501(c)(3); until then, use a free yourcharityname@gmail.com or @outlook.com address."
        heroImg="/Images/volunteer.webp"
      />
      <TrackPage
        track="pre501c3"
        afterApply={
          <div className="mt-[24px]">
            <h3 className="mb-[10px] text-[21px] font-[700] text-[#111]" data-font="lato-font">
              What pre-501(c)(3) groups can get from us
            </h3>
            <Faqs />
          </div>
        }
      />
    </div>
  )
}

export default index
