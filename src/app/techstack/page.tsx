import type { Metadata } from 'next'
import React from 'react'
import Hero from '@/components/techstack-components/Hero'

export const metadata: Metadata = {
  title: 'Tech Stack',
  description:
    'The Free For Charity tech stack: free GitHub Pages static-site hosting, Next.js, AI-built sites (Claude and GitHub Copilot), GitHub Actions CI/CD, Cloudflare, and Microsoft 365—with the legacy WordPress architecture retained for existing sites.',
  alternates: { canonical: '/techstack/' },
}

const index = () => {
  return <Hero />
}

export default index
