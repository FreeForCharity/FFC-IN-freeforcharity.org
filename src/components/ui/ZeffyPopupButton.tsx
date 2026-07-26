import React from 'react'
import { zeffyHostedUrl } from '@/data/donation-campaigns'
import { conversionAttrs, CONVERSION_EVENTS } from '@/lib/analytics-events'

interface ZeffyPopupButtonProps {
  /** Zeffy pop-up embed link, e.g. https://www.zeffy.com/embed/<type>/<slug>?modal=true */
  formLink: string
  /** Button label. */
  label: string
  /** 'primary' = filled brand button; 'secondary' = outlined. */
  variant?: 'primary' | 'secondary'
  className?: string
  /**
   * Optional overrides for the `donate_open` conversion. Nothing passes
   * them today: the campaign slug is derived from the Zeffy URL and the
   * label falls back to the button text, which is accurate for every
   * current CTA.
   *
   * They exist for the case where a component knows something the URL
   * does not — e.g. surfacing a readable appeal name against a campaign
   * whose Zeffy slug is an opaque UUID (several are; see
   * src/data/donation-campaigns.ts). Passing only one is fine: the
   * conversion merges these over the URL-derived values field by field.
   */
  campaignName?: string
  /** Stable campaign key (DonationCampaign.key) for the conversion id. */
  campaignKey?: string
}

/**
 * Zeffy pop-up trigger. The embed script (rendered once via ZeffyEmbedScript)
 * attaches a click handler to any element carrying `zeffy-form-link`, opening
 * the campaign form in a modal. We render an <a> whose href is the hosted Zeffy
 * form so it degrades gracefully: with JS the modal opens; without JS (or if the
 * script fails) the link still navigates to the form in a new tab.
 *
 * `zeffy-form-link` is a custom attribute React doesn't type on intrinsic
 * elements, so it's applied via spread to satisfy TS.
 */
const ZeffyPopupButton: React.FC<ZeffyPopupButtonProps> = ({
  formLink,
  label,
  variant = 'primary',
  className = '',
  campaignName,
  campaignKey,
}) => {
  const styles =
    variant === 'primary'
      ? 'bg-[#2A6682] text-white border-[2px] border-[#2A6682]'
      : 'border-[2px] border-[#2A6682] text-[#2A6682]'
  return (
    <a
      href={zeffyHostedUrl(formLink)}
      target="_blank"
      rel="noopener noreferrer"
      {...{ 'zeffy-form-link': formLink }}
      {...conversionAttrs(CONVERSION_EVENTS.DONATE_OPEN, {
        conversion_label: campaignName ?? label,
        conversion_id: campaignKey,
      })}
      className={`inline-block cursor-pointer rounded-[10px] text-center font-[600] text-[16px] px-[24px] py-[14px] ${styles} ${className}`}
      data-font="lato-font"
    >
      {label}
    </a>
  )
}

export default ZeffyPopupButton
