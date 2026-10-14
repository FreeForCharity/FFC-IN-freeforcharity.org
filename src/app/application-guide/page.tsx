import Link from 'next/link'
import { pageMetadata } from '@/lib/page-metadata'
import { TRACKS } from '@/data/application-fields'

export const metadata = pageMetadata({
  title: 'Application Field Guide',
  description:
    'Which Free For Charity application is yours? Pick the 501(c)(3) or pre-501(c)(3) application guide for every field, why we ask, and how to get it for free.',
  canonical: '/application-guide/',
})

const CHOICES = [
  {
    info: TRACKS['501c3'],
    who: 'Your organization is already IRS-recognized as a 501(c)(3) and has its determination letter.',
  },
  {
    info: TRACKS.pre501c3,
    who: 'Your organization is not IRS-recognized yet: still forming, or waiting on the IRS.',
  },
]

export default function ApplicationGuideChooser() {
  return (
    <div className="ffc-container pt-[120px] pb-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-[16px] font-[var(--font-faustina)] text-[40px] leading-[50px] sm:text-[48px] sm:leading-[60px]">
          Which application is yours?
        </h1>
        <p className="mb-[32px] text-[18px] leading-[28px] text-[#333]">
          Free For Charity has two application forms, each with its own field guide. How to tell: if
          your organization has an <strong>IRS determination letter</strong> recognizing it as a
          501(c)(3), use the 501(c)(3) application; if not, use the pre-501(c)(3) application.
        </p>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
          {CHOICES.map(({ info, who }) => (
            <Link
              key={info.track}
              href={info.guidePath}
              className="flex flex-col rounded-[14px] border-2 border-[#0567B1] bg-white p-[24px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#f2f8fd]"
            >
              <span
                className="mb-[8px] text-[24px] font-[800] leading-[32px] text-[#0567B1]"
                data-font="lato-font"
              >
                {info.guideTitle} →
              </span>
              <span className="text-[16px] leading-[25px] text-[#333]">{who}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
