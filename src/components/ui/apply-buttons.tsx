import React from 'react'
import { hubAddProduct, ONBOARDING_PID } from '@/lib/config'

/**
 * The two charity onboarding "Apply" buttons, kept in a plain (non-client)
 * module so they stay server-rendered wherever they're used — both the client
 * `HelpMeChoose` guide and the server `ApplyOptions` block import from here.
 */

export type ApplyKind = 'full501c3' | 'pre501c3'

export const APPLY = {
  full501c3: {
    label: 'Apply as a 501(c)(3) charity',
    href: hubAddProduct(ONBOARDING_PID.full501c3),
  },
  pre501c3: {
    label: 'Apply as a pre-501(c)(3) organization',
    href: hubAddProduct(ONBOARDING_PID.pre501c3),
  },
} as const

export const ApplyButton = ({ kind, className = '' }: { kind: ApplyKind; className?: string }) => (
  <a
    href={APPLY[kind].href}
    className={`inline-flex items-center justify-center rounded-[10px] bg-[#0567B1] px-[26px] py-[14px] text-[17px] font-[700] text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[#045a9b] ${className}`}
    data-font="lato-font"
  >
    {APPLY[kind].label}
  </a>
)
