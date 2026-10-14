'use client'

import React, { useId, useState } from 'react'
import Link from 'next/link'
import { TRACKS, type Track } from '@/data/application-fields'
import { FFC_TEL_HREF, FFC_TEXT_NUMBER } from '@/data/charity-terms'

/**
 * "Help me choose": native radio inputs that tell a visitor, on the page,
 * which application fits (or that they're too early / not eligible).
 *
 * It never renders an Apply button. Every recommendation routes to the
 * application page for that form (/501c3/ or /pre501c3/), where the single
 * Apply button lives under the wrong-application warning.
 *
 * - Default: a "Help me choose" disclosure for funnel pages.
 * - `embedded`: always open, for the "Is this the right application?" box on
 *   an application page. With `currentTrack`, a matching answer says "you're
 *   in the right place" and a mismatch says STOP and links the other page.
 */

const linkClass = 'text-[#0567B1] font-[600] underline'

interface Ctx {
  currentTrack?: Track
}

function Verdict({ recommended, currentTrack }: { recommended: Track; currentTrack?: Track }) {
  const target = TRACKS[recommended]
  if (!currentTrack) {
    return (
      <Link
        href={target.pagePath}
        className="mt-[4px] inline-flex items-center gap-[8px] rounded-[10px] border-2 border-[#0567B1] px-[20px] py-[10px] font-[700] text-[#0567B1] hover:bg-[#0567B1]/5"
      >
        Go to the {target.pageTitle} page <span aria-hidden="true">→</span>
      </Link>
    )
  }
  if (currentTrack === recommended) {
    return (
      <p className="font-[700] text-[#166534]">
        You’re in the right place. Read on, then use the Apply button near the end of this page.
      </p>
    )
  }
  return (
    <p className="font-[700] text-[#7f1d1d]">
      STOP: do not click Apply on this page. Use the{' '}
      <Link href={target.pagePath} className="underline">
        {target.pageTitle}
      </Link>{' '}
      instead, or text <a href={FFC_TEL_HREF}>{FFC_TEXT_NUMBER}</a>.
    </p>
  )
}

interface ChoiceOutcome {
  /** Plain-language answer shown as the option label. */
  label: string
  /** What we tell them, rendered inline. */
  result: (ctx: Ctx) => React.ReactNode
}

const choices: ChoiceOutcome[] = [
  {
    label: 'We have our IRS 501(c)(3) determination letter',
    result: ({ currentTrack }) => (
      <div className="space-y-[12px]">
        <p>
          You’re a <b>501(c)(3)</b>: the 501(c)(3) application is yours. Have your EIN handy.
        </p>
        <Verdict recommended="501c3" currentTrack={currentTrack} />
      </div>
    ),
  },
  {
    label: 'We applied for 501(c)(3) but aren’t approved yet',
    result: ({ currentTrack }) => (
      <div className="space-y-[12px]">
        <p>
          You’re a <b>pre-501(c)(3)</b> organization: start on the pre-501(c)(3) application, and
          we’ll guide you to full status.
        </p>
        <Verdict recommended="pre501c3" currentTrack={currentTrack} />
      </div>
    ),
  },
  {
    label: 'We’re formed (articles of incorporation + EIN) but haven’t applied yet',
    result: ({ currentTrack }) => (
      <div className="space-y-[12px]">
        <p>
          You’re a <b>pre-501(c)(3)</b> organization: start on the pre-501(c)(3) application, and
          we’ll guide you to full status.
        </p>
        <Verdict recommended="pre501c3" currentTrack={currentTrack} />
      </div>
    ),
  },
  {
    label: 'We’re a veterans post or another 501(c) type — like a 501(c)(19) or 501(c)(9)',
    result: ({ currentTrack }) => (
      <div className="space-y-[12px]">
        <p>
          US veterans organizations and other 501(c) types are welcome — veterans missions are one
          of our priority categories. Use the <b>501(c)(3) application</b> and pick the organization
          type that matches on the form (for example <i>US State Recognized Nonprofit</i>,{' '}
          <i>US Not-For-Profit</i>, or <i>Other Charitable Organization</i>).
        </p>
        <Verdict recommended="501c3" currentTrack={currentTrack} />
      </div>
    ),
  },
  {
    label: 'We’re a project under a fiscal sponsor (another organization’s 501(c)(3))',
    result: () => (
      <div className="space-y-[12px]">
        <p>
          Fiscally sponsored projects join through their sponsor: the <b>sponsoring 501(c)(3)</b>{' '}
          must apply and approve your project as officially one of theirs. That step is required
          because the Microsoft 365 and Google Workspace nonprofit email grants attach to the
          sponsor’s 501(c)(3) — without it we can’t set up your charity email later.
        </p>
        <p>
          <b>Your sponsor</b> applies on the{' '}
          <Link href={TRACKS['501c3'].pagePath} className={linkClass}>
            501(c)(3) Application
          </Link>{' '}
          page (send them the link). Pursuing your own 501(c)(3) as well? Then <b>your project</b>{' '}
          uses the{' '}
          <Link href={TRACKS.pre501c3.pagePath} className={linkClass}>
            Pre-501(c)(3) Application
          </Link>{' '}
          page.
        </p>
        <p>
          Sponsored by a corporate fiscal sponsor (Tides, Open Collective, Players Philanthropy
          Fund)? Talk with us first — text <a href={FFC_TEL_HREF}>{FFC_TEXT_NUMBER}</a>.{' '}
          <Link href="/pre501c3/help/getting-501c3/#fiscal-sponsorship" className={linkClass}>
            How we work with fiscal sponsorship
          </Link>
        </p>
      </div>
    ),
  },
  {
    label: 'Our annual revenue is $1 million or more',
    result: () => (
      <p>
        Free For Charity’s free program is reserved for charities with annual revenue under{' '}
        <b>$1 million</b> — it’s a hard gate, so we focus our volunteers where the need is greatest.
        Please don’t apply. Organizations your size typically fund commercial web services directly,
        and{' '}
        <a href="https://www.techsoup.org/" className={linkClass}>
          TechSoup
        </a>{' '}
        offers deeply discounted software. If you’d like to help smaller charities, you can{' '}
        <Link href="/volunteer/" className={linkClass}>
          volunteer
        </Link>{' '}
        or{' '}
        <Link href="/donate/" className={linkClass}>
          support the mission
        </Link>
        .
      </p>
    ),
  },
  {
    label: 'Most of our funding comes from federal grants or contracts',
    result: () => (
      <p>
        Our free program is for charities that aren’t primarily federally funded. Please don’t apply
        yet: text <a href={FFC_TEL_HREF}>{FFC_TEXT_NUMBER}</a> so we can talk it through first.
      </p>
    ),
  },
  {
    label: 'We’re based outside the United States',
    result: () => (
      <p>
        Free For Charity supports nonprofits registered in the <b>United States</b> (US territories
        such as Puerto Rico, the US Virgin Islands, and Guam count). If your organization is
        registered elsewhere, the best next step is{' '}
        <a href="https://www.techsoup.org/" className={linkClass}>
          TechSoup
        </a>
        , which supports nonprofits internationally through its global partner network — wishing you
        and your team all the best with your mission.
      </p>
    ),
  },
  {
    label: 'We haven’t formed an organization yet',
    result: () => (
      <p>
        Form your nonprofit first — you’ll need articles of incorporation. Once you have them, come
        back and use the{' '}
        <Link href={TRACKS.pre501c3.pagePath} className={linkClass}>
          Pre-501(c)(3) Application
        </Link>{' '}
        page. Our{' '}
        <Link href="/consulting/" className={linkClass}>
          consulting resources
        </Link>{' '}
        can point you to help with formation.
      </p>
    ),
  },
  {
    label: 'We’re a for-profit business or individual',
    result: () => (
      <p>
        Free For Charity’s free programs are for 501(c)(3) and pre-501(c)(3) nonprofits. If you’d
        like to help, you can{' '}
        <Link href="/volunteer/" className={linkClass}>
          volunteer
        </Link>{' '}
        or{' '}
        <Link href="/donate/" className={linkClass}>
          support the mission
        </Link>
        .
      </p>
    ),
  },
]

interface HelpMeChooseProps {
  className?: string
  /** Always open, without the "Help me choose" disclosure button. */
  embedded?: boolean
  /** The application page this picker sits on, if any. */
  currentTrack?: Track
}

const HelpMeChoose: React.FC<HelpMeChooseProps> = ({
  className = '',
  embedded = false,
  currentTrack,
}) => {
  const [choice, setChoice] = useState<number | null>(null)
  const groupName = useId()

  const picker = (
    <div
      className={`${embedded ? '' : 'mt-[20px]'} bg-[#F5F8FB] rounded-[12px] border border-[#e6edf3] p-[20px] sm:p-[24px]`}
      data-testid="help-me-choose"
    >
      <fieldset>
        <legend className="text-[17px] font-[700] text-[#1a2e35] mb-[14px]" data-font="lato-font">
          {embedded ? 'Help me choose: which' : 'Which'} best describes your organization?
        </legend>
        <div className="space-y-[10px]">
          {choices.map((c, i) => (
            <label
              key={c.label}
              className={`block w-full rounded-[8px] border px-[16px] py-[12px] text-[16px] cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[#0567B1] focus-within:ring-offset-1 ${
                choice === i
                  ? 'border-[#0567B1] bg-white text-[#0567B1] font-[700]'
                  : 'border-[#d7e0e8] bg-white text-[#333] hover:border-[#0567B1]'
              }`}
              data-font="lato-font"
            >
              <input
                type="radio"
                name={groupName}
                className="sr-only"
                checked={choice === i}
                onChange={() => setChoice(i)}
              />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      {choice !== null ? (
        <div
          className="mt-[18px] rounded-[10px] bg-white border border-[#cfe0ee] p-[20px] text-[16px] leading-[25px] text-[#333]"
          data-font="lato-font"
          aria-live="polite"
        >
          {choices[choice].result({ currentTrack })}
        </div>
      ) : null}
    </div>
  )

  if (embedded) return <div className={`text-left ${className}`}>{picker}</div>

  return (
    <details className={`text-left max-w-[720px] mx-auto ${className}`}>
      <summary className="inline-flex items-center gap-[8px] rounded-[10px] border-2 border-[#0567B1] px-[24px] py-[12px] text-[16px] font-[700] text-[#0567B1] transition-colors hover:bg-[#0567B1]/5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span data-font="lato-font">Help me choose</span>
      </summary>
      {picker}
    </details>
  )
}

export default HelpMeChoose
