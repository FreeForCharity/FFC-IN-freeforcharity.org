import React from 'react'
import { hubUrl } from '@/lib/config'
import { FFC_TEL_HREF, FFC_TEXT_NUMBER, SUPPORT_SENTENCE } from '@/data/charity-terms'

const HUB_TEXT = 'freeforcharity.org/hub'

/**
 * SUPPORT_SENTENCE with the client area and phone number linked. Renders
 * inline text only; the caller supplies the wrapping element and styles.
 */
const SupportStatement: React.FC<{ linkClassName?: string }> = ({ linkClassName }) => {
  const [beforeHub, rest] = SUPPORT_SENTENCE.split(HUB_TEXT)
  const [beforePhone, afterPhone] = rest.split(FFC_TEXT_NUMBER)
  return (
    <>
      {beforeHub}
      <a href={hubUrl()} className={linkClassName}>
        {HUB_TEXT}
      </a>
      {beforePhone}
      <a href={FFC_TEL_HREF} className={linkClassName}>
        {FFC_TEXT_NUMBER}
      </a>
      {afterPhone}
    </>
  )
}

export default SupportStatement
