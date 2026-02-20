import type { Metadata } from 'next'
import React from 'react'
// import HomePage from './Home/page'
import FigmaHomePage from '@/app/home-page'

export const metadata: Metadata = {
  title: { absolute: 'Free For Charity | Reduce Costs, Increase Impact' },
  description:
    'Free For Charity connects students, professionals, and businesses with nonprofits to reduce costs and increase revenues—putting more resources back into their missions.',
  alternates: { canonical: '/' },
}

const page = () => {
  return (
    <div>
      {/* <HomePage /> */}
      <FigmaHomePage />
    </div>
  )
}

export default page
