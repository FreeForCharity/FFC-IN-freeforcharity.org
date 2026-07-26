import React from 'react'
import { hubAddProduct, ONBOARDING_PID } from '@/lib/config'
import { conversionAttrs, CONVERSION_EVENTS } from '@/lib/analytics-events'

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
    pid: String(ONBOARDING_PID.full501c3),
  },
  pre501c3: {
    label: 'Apply as a pre-501(c)(3) organization',
    href: hubAddProduct(ONBOARDING_PID.pre501c3),
    pid: String(ONBOARDING_PID.pre501c3),
  },
} as const

/**
 * These links leave the Next.js site for WHMCS in the SAME tab, so the
 * conversion has to survive the navigation — GA4's beacon transport is
 * what makes that work (see trackConversion). The WHMCS side counts the
 * same step independently via the funnel beacon (docs/funnel-beacon.md);
 * the two are expected to reconcile, with GA4 running lower because it
 * needs consent-mode measurement and the beacon does not.
 */
export const ApplyButton = ({ kind, className = '' }: { kind: ApplyKind; className?: string }) => (
  <a
    href={APPLY[kind].href}
    className={`inline-flex items-center justify-center rounded-[10px] bg-[#0567B1] px-[26px] py-[14px] text-[17px] font-[700] text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[#045a9b] ${className}`}
    data-font="lato-font"
    {...conversionAttrs(CONVERSION_EVENTS.SERVICE_APPLICATION_START, {
      conversion_label: APPLY[kind].label,
      conversion_id: APPLY[kind].pid,
    })}
  >
    {APPLY[kind].label}
  </a>
)
