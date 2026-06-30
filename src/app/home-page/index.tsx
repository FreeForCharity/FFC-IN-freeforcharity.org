import React from 'react'
import Hero from '@/components/home-page/Hero'
import Mission from '@/components/home-page/Mission'
import SupportFreeForCharity from '@/components/home-page/SupportFreeForCharity'
import EndowmentFeatures from '@/components/home-page/Endowment-Features'
import OurPrograms from '@/components/home-page/Our-Programs'
import VolunteerwithUs from '@/components/home-page/Volunteer-with-Us'
import Results from '@/components/home-page/Results'
import Testimonials from '@/components/home/Testimonials'
import TheFreeForCharityTeam from '@/components/home-page/TheFreeForCharityTeam'
import FrequentlyAskedQuestions from '@/components/home-page/FrequentlyAskedQuestions'

const index = () => {
  return (
    <div>
      <Hero />
      <Mission />
      <SupportFreeForCharity />
      <EndowmentFeatures />
      <OurPrograms />
      <VolunteerwithUs />
      <Results />
      <Testimonials />
      <TheFreeForCharityTeam />
      <FrequentlyAskedQuestions />
    </div>
  )
}

export default index
