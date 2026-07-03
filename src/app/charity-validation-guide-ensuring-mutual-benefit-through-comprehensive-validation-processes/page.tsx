import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import Hero from '@/components/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes-components/Hero'

export const metadata = pageMetadata({
  title: 'Charity Validation Guide',
  description:
    'Comprehensive guide for validating charitable entities, ensuring credibility and mutual benefit through GuideStar verification and due diligence processes.',
  canonical:
    '/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes/',
})

const index = () => {
  return (
    <div>
      <Hero />
    </div>
  )
}

export default index
