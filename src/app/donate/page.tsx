import type { Metadata } from 'next'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import Measurableimpact from '@/components/donate-components/measurable-impact'
import FreeForCharityDonationOptions from '@/components/donate-components/Free-for-Charity-Donation-Options'
import DonationCampaigns from '@/components/donate-components/Donation-Campaigns'

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support Free For Charity through Zeffy—100% of your gift reaches the mission (Zeffy charges 0% platform fees). Fund free, AI-built GitHub Pages websites, domains, and Microsoft 365 for nonprofits.',
  alternates: { canonical: '/donate/' },
}

const index = () => {
  return (
    <div>
      <div>
        <HeroSection
          heading="Be a Part in Donations"
          paragraph="Your support funds free, professionally built websites—fast, secure GitHub Pages sites built with AI—plus free domains and Microsoft 365 for nonprofits. Every gift is processed through Zeffy with 0% platform fees, so 100% reaches the mission."
          heroImg="/Images/donation.webp"
          imageContainerWidth="w-[100%]"
        />

        <Measurableimpact />
        <FreeForCharityDonationOptions />
        <DonationCampaigns />
      </div>
    </div>
  )
}

export default index
