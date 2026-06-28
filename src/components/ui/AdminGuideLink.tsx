import React from 'react'

interface AdminGuideLinkProps {
  /** Absolute ffcadmin.org URL — build with `ffcAdminUrl()` from src/data/admin-links. */
  href: string
  /** Link text. Defaults depend on variant. */
  label?: string
  /** Optional one-line context shown above the link. */
  description?: string
  /** 'primary' = current GitHub Pages + AI guide; 'legacy' = WordPress option. */
  variant?: 'primary' | 'legacy'
}

/**
 * Standardized call-to-action that deep-links a marketing page on
 * freeforcharity.org to its detailed, canonical guide on the FFC Admin portal
 * (ffcadmin.org). Used across every repositioned product/guide page so the
 * "see the full steps on FFC Admin" affordance is consistent and the external
 * URLs live in one place (src/data/admin-links.ts).
 */
const AdminGuideLink: React.FC<AdminGuideLinkProps> = ({
  href,
  label,
  description,
  variant = 'primary',
}) => {
  const isLegacy = variant === 'legacy'
  const text =
    label ??
    (isLegacy ? 'Legacy WordPress guide on FFC Admin' : 'Full step-by-step guide on FFC Admin')

  return (
    <div
      className={`rounded-[10px] border px-[20px] py-[16px] ${
        isLegacy ? 'border-[#e5e5e5] bg-[#fafafa]' : 'border-[#f47c20]/40 bg-[#fff7f0]'
      }`}
    >
      {description ? (
        <p className="mb-[8px] text-[14px] leading-[22px] text-[#555]">{description}</p>
      ) : null}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-[8px] text-[16px] font-[600] underline-offset-4 hover:underline ${
          isLegacy ? 'text-[#555]' : 'text-[#f47c20]'
        }`}
      >
        <span>{text}</span>
        <span aria-hidden="true">&rarr;</span>
        <span className="sr-only">(opens FFC Admin in a new tab)</span>
      </a>
    </div>
  )
}

export default AdminGuideLink
