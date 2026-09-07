import type { Metadata } from 'next'
import React from 'react'
import FigmaHomePage from '@/app/home-page'

export const metadata: Metadata = {
  title: { absolute: 'Free For Charity | Reduce Costs, Increase Impact' },
  description:
    'Free For Charity connects students, professionals, and businesses with nonprofits to reduce costs and increase revenues—putting more resources back into their missions.',
  alternates: { canonical: '/' },
}

const index = () => {
  return (
    <div>
      <FigmaHomePage />
    </div>
  )
}

export default index
