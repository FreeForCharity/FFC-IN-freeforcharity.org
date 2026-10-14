import React from 'react'
import Link from 'next/link'
import { type Track } from '@/data/application-fields'
import { POLICY_PAGES_SENTENCE } from '@/data/charity-terms'
import { linkClass, sectionH2 } from './styles'

const cardClass = 'rounded-[10px] border border-[#e5e7eb] bg-white p-[16px]'
const h3Class = 'mb-[6px] text-[19px] font-[700] text-[#111]'
const pClass = 'text-[16px] leading-[25px] text-[#444]'

interface AfterYouApplyProps {
  track: Track
  /** Extra, form-specific content (e.g. what pre-501(c)(3) groups get). */
  children?: React.ReactNode
}

/** Section 8 of an application page: website, domain and email, condensed. */
const AfterYouApply: React.FC<AfterYouApplyProps> = ({ track, children }) => (
  <section
    id="after-you-apply"
    aria-labelledby="after-you-apply-heading"
    className="scroll-mt-[120px]"
  >
    <h2 id="after-you-apply-heading" className={sectionH2} data-font="lato-font">
      After you apply
    </h2>
    <div className="grid grid-cols-1 gap-[14px] md:grid-cols-3">
      <div className={cardClass}>
        <h3 className={h3Class}>Your website</h3>
        <p className={pClass}>
          A volunteer builds your site from the content on your application; there is nothing else
          to send. Your maintainer accepts the GitHub invitation, and if you didn’t include a logo
          link, uploads your logo through the first “Add your logo” GitHub issue.{' '}
          {POLICY_PAGES_SENTENCE}
        </p>
      </div>
      <div className={cardClass}>
        <h3 className={h3Class}>Your domain</h3>
        <p className={pClass}>
          Once you approve your preview, order your free .org (or a transfer) with the coupon from
          your acceptance email. Checkout shows a $1 verification charge, and the coupon brings it
          to $0. We register the domain, pay the renewals and handle all DNS: you never edit DNS.
        </p>
      </div>
      <div className={cardClass}>
        <h3 className={h3Class}>Your email</h3>
        {track === '501c3' ? (
          <p className={pClass}>
            Free Microsoft 365 Business Basic or Google Workspace through the nonprofit programs,
            once your domain is live. You register with Microsoft or Google; we add the DNS records.
          </p>
        ) : (
          <p className={pClass}>
            Charity email comes only after the IRS approves your 501(c)(3). Until then, use a free
            yourcharityname@gmail.com or yourcharityname@outlook.com address, owned by the
            organization rather than one person.
          </p>
        )}
      </div>
    </div>
    {children}
    <ul className="mt-[16px] space-y-[6px] text-[16px]">
      <li>
        <a
          href="https://ffcadmin.org/site-owner/"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Site owner hub: editing and caring for your website
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
      <li>
        <a
          href="https://ffcadmin.org/roadmap/"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Public roadmap: where every charity site stands
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
      <li>
        <Link href="/charity-onboarding-journey/" className={linkClass}>
          The full onboarding journey, stage by stage
        </Link>
      </li>
    </ul>
  </section>
)

export default AfterYouApply
