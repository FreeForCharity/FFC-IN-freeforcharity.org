import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import Hero from '@/components/techstack-components/Hero'

export const metadata = pageMetadata({
  title: 'Tech Stack',
  description:
    'The Free For Charity tech stack: free GitHub Pages static-site hosting, Next.js, AI-built sites (Claude and GitHub Copilot), GitHub Actions CI/CD, Cloudflare, and Microsoft 365—with the legacy WordPress architecture retained for existing sites.',
  canonical: '/techstack/',
})

const index = () => {
  return <Hero />
}

export default index
