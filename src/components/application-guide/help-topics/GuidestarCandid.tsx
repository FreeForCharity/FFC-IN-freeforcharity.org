import React from 'react'
import Link from 'next/link'
import Ext from './Ext'

/** 501(c)(3) only. */
const GuidestarCandid: React.FC = () => (
  <>
    <p>
      Candid (formerly GuideStar) is where donors and grantmakers check whether a charity is
      transparent. A Candid profile is free. The 501(c)(3) application requires your profile at the{' '}
      <strong>Gold Seal of Transparency</strong> or higher, and two links to it.
    </p>

    <h2>Seals of Transparency</h2>
    <p>
      Candid awards Bronze, Silver, Gold and Platinum seals as you complete more of your profile.{' '}
      <strong>Gold is FFC’s minimum for 501(c)(3) charities.</strong> It asks for your basic
      organization details, mission, programs, leadership and key financial information: things a
      healthy charity already has, and the same work makes you more fundable everywhere else.
      Platinum is welcome but not required. Candid’s{' '}
      <Ext href="https://cdn.candid.org/seals-of-transparency/2026/candid-seals-guide-2026.pdf">
        seals guide (PDF)
      </Ext>{' '}
      lists exactly what each seal needs.
    </p>

    <h2>Claim your profile</h2>
    <ol>
      <li>
        Create a free account at{' '}
        <Ext href="https://candid.org/claim-nonprofit-profile/">candid.org</Ext>.
      </li>
      <li>
        Find your organization by its EIN. Candid builds a starter profile for every IRS-recognized
        501(c)(3).
      </li>
      <li>
        Ask to be linked to it. Candid checks that you are authorized to update the profile, which
        can take a few business days, so start early.
      </li>
      <li>
        Fill in each section the Gold seal needs, then submit your updates. The seal appears once
        Candid processes them.
      </li>
    </ol>

    <h2>The two links the application asks for</h2>
    <ul>
      <li>
        <strong>Public profile link:</strong> your profile’s permanent address on{' '}
        <code>app.candid.org</code>, the one anyone finds by searching Candid.
      </li>
      <li>
        <strong>Full-profile (sharable) link:</strong> from{' '}
        <strong>Benefits › Get your sharable link</strong>. It ends in <code>?pkId=</code> followed
        by a code that unlocks your full profile for anyone who clicks, without a Candid login. That
        is how we check your seal-level details. Copy the whole address, including everything after
        the question mark.
      </li>
    </ul>
    <p>
      Our <Link href="/guidestar-guide/">GuideStar (Candid) profile guide</Link> shows real examples
      of both links and walks through each profile section.
    </p>

    <h2>Not IRS-recognized yet?</h2>
    <p>
      Candid builds profiles from IRS 501(c)(3) records, so new groups usually can’t have one yet.
      That is one reason the Pre-501(c)(3) application exists; there, Candid is optional (see{' '}
      <Link href="/pre501c3/#candid">its Candid section</Link>).
    </p>
  </>
)

export default GuidestarCandid
