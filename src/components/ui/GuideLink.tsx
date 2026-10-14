import React from 'react'

interface GuideLinkProps {
  /** Absolute URL of the guide (usually built with `ffcAdminUrl()`). */
  href: string
  children: React.ReactNode
}

/**
 * Inline link to an external step-by-step guide (usually on ffcadmin.org),
 * styled like the other inline links on the onboarding pages and opened in a
 * new tab so applicants don't lose their place in the checklist.
 */
const GuideLink: React.FC<GuideLinkProps> = ({ href, children }) => (
  <a
    href={href}
    className="text-[#0567B1] underline font-medium"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
)

export default GuideLink
