import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'FFC Admin',
  description: 'Free For Charity internal administration portal.',
  robots: { index: false, follow: false },
}

const index = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-[34px] w-full text-center">
      <h1 className="text-center">ffcadmin</h1>
    </div>
  )
}

export default index
