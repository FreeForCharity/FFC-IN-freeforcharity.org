import React from 'react'
import { zeffyHostedUrl } from '@/data/donation-campaigns'

interface ZeffyPopupButtonProps {
  /** Zeffy pop-up embed link, e.g. https://www.zeffy.com/embed/<type>/<slug>?modal=true */
  formLink: string
  /** Button label. */
  label: string
  /** 'primary' = filled brand button; 'secondary' = outlined. */
  variant?: 'primary' | 'secondary'
  className?: string
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
      className={`inline-block cursor-pointer rounded-[10px] text-center font-[600] text-[16px] px-[24px] py-[14px] ${styles} ${className}`}
      data-font="lato-font"
    >
      {label}
    </a>
  )
}

export default ZeffyPopupButton
