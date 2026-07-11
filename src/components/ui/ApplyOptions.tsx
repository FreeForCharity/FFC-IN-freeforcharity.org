'use client'

import React, { useState } from 'react'
import { hubAddProduct, ONBOARDING_PID } from '@/lib/config'

/**
 * On-page apply block: the two clear application options for the people who
 * already know how to apply, plus an inline "Help me choose" guide for anyone
 * unsure of the IRS jargon. Everything happens on the page — no separate
 * eligibility-wizard page to bounce out to — and the WHMCS application forms do
 * the real screening. Reused across the charity funnel pages.
 */

type ApplyKind = 'full501c3' | 'pre501c3'

const APPLY = {
  full501c3: {
    label: 'Apply as a 501(c)(3) charity',
    href: hubAddProduct(ONBOARDING_PID.full501c3),
  },
  pre501c3: {
    label: 'Apply as a pre-501(c)(3) organization',
    href: hubAddProduct(ONBOARDING_PID.pre501c3),
  },
} as const

const ApplyButton = ({ kind, className = '' }: { kind: ApplyKind; className?: string }) => (
  <a
    href={APPLY[kind].href}
    className={`inline-flex items-center justify-center rounded-[10px] bg-[#0567B1] px-[26px] py-[14px] text-[17px] font-[700] text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[#045a9b] ${className}`}
    data-font="lato-font"
  >
    {APPLY[kind].label}
  </a>
)

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
    label: 'We haven’t formed an organization yet',
    result: (
      <p>
        Form your nonprofit first — you&apos;ll need articles of incorporation and an EIN. Once you
        have those, come back and apply as a pre-501(c)(3) organization. Our{' '}
        <a href="/consulting/" className="text-[#0567B1] font-[600] underline">
          consulting resources
        </a>{' '}
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
        <a href="/volunteer/" className="text-[#0567B1] font-[600] underline">
          volunteer
        </a>{' '}
        or{' '}
        <a href="/donate/" className="text-[#0567B1] font-[600] underline">
          support the mission
        </a>
        .
      </p>
    ),
  },
]

interface ApplyOptionsProps {
  /** Optional heading; pass '' to omit. */
  heading?: string
}

const ApplyOptions: React.FC<ApplyOptionsProps> = ({ heading = 'Ready to apply?' }) => {
  const [helpOpen, setHelpOpen] = useState(false)
  const [choice, setChoice] = useState<number | null>(null)

  return (
    <section id="apply" className="w-full py-[50px] scroll-mt-[120px]">
      <div className="w-[90%] md:w-[80%] max-w-[1000px] mx-auto text-center">
        {heading ? (
          <h2 className="text-[26px] md:text-[30px] font-[700] text-[#0567B1] mb-[10px]">
            {heading}
          </h2>
        ) : null}
        <p
          className="text-[17px] font-[500] leading-[27px] text-[#555] max-w-[720px] mx-auto mb-[30px]"
          data-font="lato-font"
        >
          Pick the option that matches your organization — the application itself walks you through
          what we need. Not sure which fits? Use <b>Help me choose</b>.
        </p>

        {/* The two clear apply options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] text-left">
          <div className="bg-white rounded-[12px] border border-[#e6edf3] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.1)] p-[28px] flex flex-col">
            <h3 className="text-[20px] font-[700] text-[#1a2e35] mb-[8px]" data-font="lato-font">
              501(c)(3) charities
            </h3>
            <p className="text-[16px] leading-[25px] text-[#555] mb-[22px]" data-font="lato-font">
              Your nonprofit already has its IRS 501(c)(3) determination letter. Have your EIN
              handy.
            </p>
            <div className="mt-auto">
              <ApplyButton kind="full501c3" className="w-full" />
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#e6edf3] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.1)] p-[28px] flex flex-col">
            <h3 className="text-[20px] font-[700] text-[#1a2e35] mb-[8px]" data-font="lato-font">
              Pre-501(c)(3) organizations
            </h3>
            <p className="text-[16px] leading-[25px] text-[#555] mb-[22px]" data-font="lato-font">
              You&apos;re formed (articles of incorporation + EIN) and still working toward IRS
              501(c)(3) determination.
            </p>
            <div className="mt-auto">
              <ApplyButton kind="pre501c3" className="w-full" />
            </div>
          </div>
        </div>

        {/* Help me choose — inline, no navigation */}
        <div className="mt-[28px]">
          <button
            type="button"
            onClick={() => setHelpOpen((v) => !v)}
            aria-expanded={helpOpen}
            aria-controls={helpOpen ? 'help-me-choose-panel' : undefined}
            className="inline-flex items-center gap-[8px] rounded-[10px] border-2 border-[#0567B1] px-[24px] py-[12px] text-[16px] font-[700] text-[#0567B1] transition-colors hover:bg-[#0567B1]/5 cursor-pointer"
            data-font="lato-font"
          >
            <span>Help me choose</span>
            <span aria-hidden="true">{helpOpen ? '▲' : '▼'}</span>
          </button>

          {helpOpen ? (
            <div
              id="help-me-choose-panel"
              className="mt-[20px] max-w-[720px] mx-auto text-left bg-[#F5F8FB] rounded-[12px] border border-[#e6edf3] p-[24px]"
            >
              <p
                id="help-me-choose-q"
                className="text-[17px] font-[700] text-[#1a2e35] mb-[14px]"
                data-font="lato-font"
              >
                Which best describes your organization?
              </p>
              <div role="radiogroup" aria-labelledby="help-me-choose-q" className="space-y-[10px]">
                {choices.map((c, i) => (
                  <button
                    key={c.label}
                    type="button"
                    role="radio"
                    aria-checked={choice === i}
                    onClick={() => setChoice(i)}
                    className={`block w-full text-left rounded-[8px] border px-[16px] py-[12px] text-[16px] transition-colors cursor-pointer ${
                      choice === i
                        ? 'border-[#0567B1] bg-white text-[#0567B1] font-[700]'
                        : 'border-[#d7e0e8] bg-white text-[#333] hover:border-[#0567B1]'
                    }`}
                    data-font="lato-font"
                  >
                    {c.label}
                  </button>
                ))}
              </div>

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
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default ApplyOptions
