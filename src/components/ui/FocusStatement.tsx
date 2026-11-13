import React from 'react'
import {
  FOCUS_PRIORITY_PHRASE,
  FOCUS_STATEMENT,
  FOCUS_STATEMENT_PRE501C3,
  FOCUS_STATEMENT_SHORT,
} from '@/data/charity-terms'

const TEXT = {
  full: FOCUS_STATEMENT,
  pre501c3: FOCUS_STATEMENT_PRE501C3,
  short: FOCUS_STATEMENT_SHORT,
} as const

/**
 * The approved focus statement with "food, water or shelter" in bold.
 * Renders inline text only; the caller supplies the wrapping element.
 */
const FocusStatement: React.FC<{ variant?: keyof typeof TEXT }> = ({ variant = 'full' }) => {
  const [before, after] = TEXT[variant].split(FOCUS_PRIORITY_PHRASE)
  return (
    <>
      {before}
      <b>{FOCUS_PRIORITY_PHRASE}</b>
      {after}
    </>
  )
}

export default FocusStatement
