import type { Metadata } from 'next'
import React from 'react'
import Hero from '@/components/free-for-charity-ffc-service-delivery-stages-components/Hero'

export const metadata: Metadata = {
  title: 'Service Delivery Stages',
  description:
    'How Free For Charity delivers a free nonprofit website—a fast, secure GitHub Pages static site built with AI—through our charity validation, onboarding, and launch stages, with the legacy WordPress build retained as an option.',
  alternates: { canonical: '/free-for-charity-ffc-service-delivery-stages/' },
}

const index = () => {
  return (
    <div>
      <Hero />
    </div>
  )
}

export default index
