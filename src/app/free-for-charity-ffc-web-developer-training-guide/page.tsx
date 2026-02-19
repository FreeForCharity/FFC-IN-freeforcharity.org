import type { Metadata } from 'next'
import React from 'react'
import Hero from '@/components/free-for-charity-ffc-web-developer-training-guide-components/Hero'

export const metadata: Metadata = {
  title: 'Web Developer Training Guide',
  description:
    'Comprehensive FFC training guide for setting up and managing WHMCS, Cloudflare, Microsoft 365, WordPress, and other nonprofit technology tools.',
  alternates: { canonical: '/free-for-charity-ffc-web-developer-training-guide' },
}

const index = () => {
  return (
    <div>
      <div className="" id="segoe-font">
        <Hero />
      </div>
    </div>
  )
}

export default index
