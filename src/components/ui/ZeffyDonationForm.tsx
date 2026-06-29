import React, { CSSProperties, FC, IframeHTMLAttributes } from 'react'

// Zeffy iframes accept `allowpaymentrequest` / `allowtransparency`, which
// aren't in React's typed iframe props — mirror the shape the endowment and
// homepage embeds already use.
interface ExtendedIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  allowpaymentrequest?: string
  allowtransparency?: string
}

interface ZeffyDonationFormProps {
  /** Full Zeffy embed URL, e.g. https://www.zeffy.com/embed/donation-form/<slug> */
  src: string
  /** Accessible iframe title. */
  title?: string
  /** Min height in px — Zeffy donation forms are tall. */
  minHeight?: number
}

/**
 * Standardized inline Zeffy donation-form embed. Encapsulates the iframe markup
 * that was duplicated across the endowment and homepage support sections so
 * every embed shares the same accessible title and sizing. The src comes from
 * `src/data/donation-campaigns.ts` (single source of truth for Zeffy URLs).
 */
const ZeffyDonationForm: FC<ZeffyDonationFormProps> = ({
  src,
  title = 'Donation form powered by Zeffy',
  minHeight = 1200,
}) => {
  const iframeProps: ExtendedIframeProps = {
    title,
    src,
    allowpaymentrequest: '',
    allowtransparency: 'true',
    style: {
      position: 'absolute',
      border: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
    } as CSSProperties,
  }

  return (
    <div className="bg-white" style={{ minHeight }}>
      <div className="relative w-full" style={{ height: minHeight }}>
        <iframe {...iframeProps}></iframe>
      </div>
    </div>
  )
}

export default ZeffyDonationForm
