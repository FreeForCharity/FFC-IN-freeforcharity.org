import React from 'react'
import Link from 'next/link'
import { FFC_TEL_HREF, FFC_TEXT_NUMBER } from '@/data/charity-terms'
import { linkClass, sectionH2 } from './styles'

/** Section 9 of an application page. No response-time promise: we're all volunteers. */
const TrackContact: React.FC = () => (
  <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-[120px]">
    <h2 id="contact-heading" className={sectionH2} data-font="lato-font">
      Questions?
    </h2>
    <p className="text-[17px] leading-[27px] text-[#333]">
      Text or call{' '}
      <a href={FFC_TEL_HREF} className={linkClass}>
        {FFC_TEXT_NUMBER}
      </a>
      , or use our{' '}
      <Link href="/contact-us/" className={linkClass}>
        contact page
      </Link>
      . We’re all volunteers, so we answer as soon as we can.
    </p>
  </section>
)

export default TrackContact
