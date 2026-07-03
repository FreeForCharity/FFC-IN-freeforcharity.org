import React from 'react'
import hoursForm from '@/data/volunteer-hours-form.json'

/**
 * Volunteer hours self-report callout (issue #394). Renders the Microsoft 365
 * Forms link once `formUrl` is set in src/data/volunteer-hours-form.json; until
 * then it degrades to the operator email so hour reports are never blocked on
 * the form's creation. Hours feed the published volunteer-hours metric (as an
 * additional evidence line on top of the census floor) and unlock employer
 * volunteer grants.
 */

const { formUrl, fallbackEmail, fallbackSubject } = hoursForm as {
  formUrl: string
  fallbackEmail: string
  fallbackSubject: string
}

export default function HoursReportCallout() {
  const mailto = `mailto:${fallbackEmail}?subject=${encodeURIComponent(fallbackSubject)}`
  return (
    <div className="rounded-[10px] border border-[#0567B1]/30 bg-[#f4f9fd] px-5 py-4 my-6">
      <p
        className="font-[var(--font-lato)] text-[17px] font-[600] text-[#333]"
        data-font="lato-font"
      >
        Log your volunteer hours — they count twice
      </p>
      <p className="font-[var(--font-lato)] text-[15px] leading-[24px] text-[#555] mt-1">
        A monthly minute of reporting makes your hours part of FFC&rsquo;s published impact{' '}
        <em>and</em> unlocks employer volunteer-grant programs that pay the nonprofit for every hour
        you serve.{' '}
        {formUrl ? (
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0567B1] underline font-[600]"
          >
            Report your hours (Microsoft Forms) →
          </a>
        ) : (
          <>
            Send your month, role, hours, and the charities you helped to{' '}
            <a href={mailto} className="text-[#0567B1] underline font-[600]">
              {fallbackEmail}
            </a>{' '}
            (a one-click Microsoft Form is coming).
          </>
        )}
      </p>
    </div>
  )
}
