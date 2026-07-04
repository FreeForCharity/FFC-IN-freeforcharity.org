import React from 'react'
import Link from 'next/link'
import testimonialForm from '@/data/testimonial-form.json'

/**
 * "Share your experience" testimonial collection callout (issue #379).
 * Renders the Microsoft 365 Forms link once `formUrl` is set in
 * src/data/testimonial-form.json; until then it degrades to the operator
 * email so stories are never blocked on the form's creation. Publication
 * consent is part of the form itself — see /publicity-consent-policy/.
 */

const { formUrl, fallbackEmail, fallbackSubject } = testimonialForm as {
  formUrl: string
  fallbackEmail: string
  fallbackSubject: string
}

export default function ShareExperienceCallout() {
  const mailto = `mailto:${fallbackEmail}?subject=${encodeURIComponent(fallbackSubject)}`
  return (
    <div className="rounded-[10px] border border-[#0567B1]/30 bg-[#f4f9fd] px-5 py-4 my-6">
      <p
        className="font-[var(--font-lato)] text-[17px] font-[600] text-[#333]"
        data-font="lato-font"
      >
        Did FFC help your charity? Share your experience
      </p>
      <p className="font-[var(--font-lato)] text-[15px] leading-[24px] text-[#555] mt-1">
        A few sentences from you helps the next charity trust us with their website — and helps
        donors see the mission working.{' '}
        {formUrl ? (
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0567B1] underline font-[600]"
          >
            Share your story (Microsoft Forms) →
          </a>
        ) : (
          <>
            Email your story — name, role, organization, and whether we may publish it — to{' '}
            <a href={mailto} className="text-[#0567B1] underline font-[600]">
              {fallbackEmail}
            </a>{' '}
            (a one-click Microsoft Form is coming).
          </>
        )}{' '}
        We only publish with your consent, per our{' '}
        <Link href="/publicity-consent-policy/" className="text-[#0567B1] underline">
          consent policy
        </Link>
        .
      </p>
    </div>
  )
}
