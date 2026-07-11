'use client'

import React, { useId, useState } from 'react'
import Link from 'next/link'
import { ApplyButton } from '@/components/ui/apply-buttons'
import { ffcAdminUrl, adminLinks } from '@/data/admin-links'

/**
 * Inline "Help me choose" guide — a native <details> disclosure with native
 * radio inputs, so a visitor unsure of the IRS jargon can find, on the page,
 * which onboarding application fits (or that they're too early / not eligible).
 * No separate eligibility-wizard page to bounce out to. Drop it under the clear
 * apply buttons on any charity funnel page; the radio group name is scoped with
 * useId so multiple instances never collide.
 */

interface ChoiceOutcome {
  /** Plain-language answer shown as the option label. */
  label: string
  /** What we tell them, rendered inline. */
  result: React.ReactNode
}

const choices: ChoiceOutcome[] = [
  {
    label: 'We have our IRS 501(c)(3) determination letter',
    result: (
      <div>
        <p className="mb-[16px]">
          You&apos;re a <b>501(c)(3)</b> — use this application. Have your EIN handy.
        </p>
        <ApplyButton kind="full501c3" />
      </div>
    ),
  },
  {
    label: 'We applied for 501(c)(3) but aren’t approved yet',
    result: (
      <div>
        <p className="mb-[16px]">
          You&apos;re a <b>pre-501(c)(3)</b> organization — start here, and we&apos;ll guide you to
          full status.
        </p>
        <ApplyButton kind="pre501c3" />
      </div>
    ),
  },
  {
    label: 'We’re formed (articles of incorporation + EIN) but haven’t applied yet',
    result: (
      <div>
        <p className="mb-[16px]">
          You&apos;re a <b>pre-501(c)(3)</b> organization — start here, and we&apos;ll guide you to
          full status.
        </p>
        <ApplyButton kind="pre501c3" />
      </div>
    ),
  },
  {
    label: 'We’re a veterans post or another 501(c) type — like a 501(c)(19) or 501(c)(9)',
    result: (
      <div>
        <p className="mb-[16px]">
          US veterans organizations and other 501(c) types are welcome — veterans missions are one
          of our priority categories. Use the <b>501(c)(3) application</b> and pick the organization
          type that matches on the form (for example <i>US State Recognized Nonprofit</i>,{' '}
          <i>US Not-For-Profit</i>, or <i>Other Charitable Organization</i>).
        </p>
        <ApplyButton kind="full501c3" />
      </div>
    ),
  },
  {
    label: 'We’re a project under a fiscal sponsor (another organization’s 501(c)(3))',
    result: (
      <div>
        <p className="mb-[16px]">
          Fiscally sponsored projects join through their sponsor: the <b>sponsoring 501(c)(3)</b>{' '}
          must apply and approve your project as officially one of theirs. That step is required
          because the Microsoft 365 and Google Workspace nonprofit email grants attach to the
          sponsor&apos;s 501(c)(3) — without it we can&apos;t set up your charity email later.
        </p>
        <p className="mb-[16px]">
          <b>Your sponsor</b> uses this application (send them this link):
        </p>
        <ApplyButton kind="full501c3" />
        <p className="mt-[16px] mb-[16px]">
          Pursuing your own 501(c)(3) as well? Then <b>your project</b> also applies here:
        </p>
        <ApplyButton kind="pre501c3" />
        <p className="mt-[16px]">
          Sponsored by a corporate fiscal sponsor (Tides, Open Collective, Players Philanthropy
          Fund)? Talk with us first — those arrangements score differently.{' '}
          <a
            href={ffcAdminUrl(adminLinks['fiscal-sponsorship'].newModel)}
            className="text-[#0567B1] font-[600] underline"
          >
            How we evaluate fiscal sponsorship
          </a>
        </p>
      </div>
    ),
  },
  {
    label: 'Our annual revenue is $1 million or more',
    result: (
      <p>
        Free For Charity&apos;s free program is reserved for charities with annual revenue under{' '}
        <b>$1&nbsp;million</b> — it&apos;s a hard gate, so we focus our volunteers where the need is
        greatest. Organizations your size typically fund commercial web services directly, and{' '}
        <a href="https://www.techsoup.org/" className="text-[#0567B1] font-[600] underline">
          TechSoup
        </a>{' '}
        offers deeply discounted software. If you&apos;d like to help smaller charities, you can{' '}
        <Link href="/volunteer/" className="text-[#0567B1] font-[600] underline">
          volunteer
        </Link>{' '}
        or{' '}
        <Link href="/donate/" className="text-[#0567B1] font-[600] underline">
          support the mission
        </Link>
        .
      </p>
    ),
  },
  {
    label: 'We’re based outside the United States',
    result: (
      <p>
        Free For Charity supports nonprofits registered in the <b>United States</b> (US territories
        such as Puerto Rico, the US Virgin Islands, and Guam count). If your organization is
        registered elsewhere, the best next step is{' '}
        <a href="https://www.techsoup.org/" className="text-[#0567B1] font-[600] underline">
          TechSoup
        </a>
        , which supports nonprofits internationally through its global partner network — wishing you
        and your team all the best with your mission.
      </p>
    ),
  },
  {
    label: 'We haven’t formed an organization yet',
    result: (
      <p>
        Form your nonprofit first — you&apos;ll need articles of incorporation and an EIN. Once you
        have those, come back and apply as a pre-501(c)(3) organization. Our{' '}
        <Link href="/consulting/" className="text-[#0567B1] font-[600] underline">
          consulting resources
        </Link>{' '}
        can point you to help with formation.
      </p>
    ),
  },
  {
    label: 'We’re a for-profit business or individual',
    result: (
      <p>
        Free For Charity&apos;s free programs are for 501(c)(3) and pre-501(c)(3) nonprofits. If
        you&apos;d like to help, you can{' '}
        <Link href="/volunteer/" className="text-[#0567B1] font-[600] underline">
          volunteer
        </Link>{' '}
        or{' '}
        <Link href="/donate/" className="text-[#0567B1] font-[600] underline">
          support the mission
        </Link>
        .
      </p>
    ),
  },
]

const HelpMeChoose: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [choice, setChoice] = useState<number | null>(null)
  const groupName = useId()

  return (
    <details className={`text-left max-w-[720px] mx-auto ${className}`}>
      <summary className="inline-flex items-center gap-[8px] rounded-[10px] border-2 border-[#0567B1] px-[24px] py-[12px] text-[16px] font-[700] text-[#0567B1] transition-colors hover:bg-[#0567B1]/5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span data-font="lato-font">Help me choose</span>
      </summary>

      <div className="mt-[20px] bg-[#F5F8FB] rounded-[12px] border border-[#e6edf3] p-[24px]">
        <fieldset>
          <legend className="text-[17px] font-[700] text-[#1a2e35] mb-[14px]" data-font="lato-font">
            Which best describes your organization?
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
            {choices[choice].result}
          </div>
        ) : null}
      </div>
    </details>
  )
}

export default HelpMeChoose
