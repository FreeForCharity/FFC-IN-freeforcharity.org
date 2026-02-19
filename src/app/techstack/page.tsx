import type { Metadata } from 'next'
import React from 'react'
import Hero from '@/components/techstack-components/Hero'

export const metadata: Metadata = {
  title: 'Tech Stack',
  description:
    'Understanding the Free For Charity WordPress hosting architecture, including Cloudflare, DirectAdmin, and Microsoft 365 integration layers.',
  alternates: { canonical: '/techstack' },
}

const index = () => {
  return <Hero />
}

export default index
