import React from 'react'
import Link from 'next/link'
import { COMMITMENTS } from '@/data/charity-terms'
import { sectionH2 } from './styles'

/** Section 3 of an application page: the six-point plain summary of the terms. */
const CommitmentSummary: React.FC = () => (
  <section id="commitments" aria-labelledby="commitments-heading" className="scroll-mt-[120px]">
    <h2 id="commitments-heading" className={sectionH2} data-font="lato-font">
      What you’re committing to
    </h2>
    <p className="mb-[16px] text-[17px] leading-[27px] text-[#333]">
      Free For Charity is free, and it works because every charity we serve agrees to the same few
      things. In plain words:
    </p>
    <ol className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
      {COMMITMENTS.map((c, i) => (
        <li key={c.title} className="rounded-[10px] border border-[#e5e7eb] bg-white p-[16px]">
          <p className="mb-[4px] text-[17px] font-[700] text-[#111]">
            {i + 1}. {c.title}
          </p>
          <p className="text-[16px] leading-[25px] text-[#444]">{c.body}</p>
        </li>
      ))}
    </ol>
    <p className="mt-[14px] text-[16px]">
      The binding version is our{' '}
      <Link href="/terms-of-service/" className="text-[#0567B1] underline font-[600]">
        Terms of Service
      </Link>
      .
    </p>
  </section>
)

export default CommitmentSummary
