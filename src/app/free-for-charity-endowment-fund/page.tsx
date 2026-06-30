import type { Metadata } from 'next'
import React from 'react'
import Hero from '@/components/free-for-charity-endowment-fund-components/Hero'
import TextSection from '@/components/free-for-charity-endowment-fund-components/Text-Section'
import OurMission from '@/components/free-for-charity-endowment-fund-components/Our-Mission'
import EndowmentFeatures from '@/components/free-for-charity-endowment-fund-components/Endowment-Features'
import EmpoweringCharities from '@/components/free-for-charity-endowment-fund-components/Empowering-Charities'
import SupportOurMission from '@/components/free-for-charity-endowment-fund-components/Support-Our-Mission'
import VoicesofGratitude from '@/components/free-for-charity-endowment-fund-components/Voices-of-Gratitude'
import EmpowerCharities from '@/components/free-for-charity-endowment-fund-components/Empower-Charities'

export const metadata: Metadata = {
  title: 'Endowment Fund',
  description:
    'Support the Free For Charity Endowment Fund to sustain free domain and hosting services for nonprofits long-term.',
  alternates: { canonical: '/free-for-charity-endowment-fund/' },
}

const index = () => {
  return (
    <div>
      <div className="">
        <Hero />
        <TextSection />
        <OurMission />
        <EndowmentFeatures />
        <EmpoweringCharities />
        <SupportOurMission />
        <VoicesofGratitude />
        <EmpowerCharities />
      </div>
    </div>
  )
}

export default index
