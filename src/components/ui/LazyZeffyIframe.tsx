'use client'

import React, { useEffect, useRef, useState, IframeHTMLAttributes } from 'react'
import { zeffyHostedUrl } from '@/data/donation-campaigns'

export interface ZeffyIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  allowpaymentrequest?: string
  allowtransparency?: string
}

/**
 * Scroll-primed Zeffy iframe. Zeffy's embed app pulls ~8MB of script, which
 * used to download eagerly on every page view. The iframe now mounts when
 * the visitor scrolls within PRELOAD_MARGIN_PX of the section — far enough
 * ahead that the form is typically loaded before it enters the viewport,
 * while visitors who never scroll this far download nothing.
 *
 * The parent must be the same `relative`, fixed-size box that previously
 * held the iframe directly; the reserved box means mounting causes no
 * layout shift.
 *
 * Margin sizing: the homepage #donate section sits ~1100px below the fold
 * on desktop (~1400px on mobile), so the margin must stay under that or
 * the observer fires at load and eager loading is effectively back
 * (donation-flows.spec.ts locks this in). 800px still gives a full
 * viewport-plus of scroll lead for the form to load before arrival.
 */
const PRELOAD_MARGIN_PX = 800

const LazyZeffyIframe = (props: ZeffyIframeProps) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    // No IntersectionObserver (very old browsers): load immediately rather
    // than never. (Async so the effect doesn't set state synchronously.)
    if (typeof IntersectionObserver === 'undefined') {
      const t = setTimeout(() => setMounted(true), 0)
      return () => clearTimeout(t)
    }
    // Margin on top AND bottom so the preload lead also applies when
    // approaching from below (e.g. after following an anchor further down
    // the page). The top margin extends the window upward off-screen at
    // load time, so it cannot re-trigger eager loading.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: `${PRELOAD_MARGIN_PX}px 0px` }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Before mount the reserved box simply stays empty — the same thing
  // visitors saw while the Zeffy app booted when the iframe was eager.
  // Without JavaScript the observer never fires, so <noscript> keeps a
  // donation path alive: a link to the Zeffy-hosted page (same form,
  // full page), matching ZeffyPopupButton's no-JS fallback pattern.
  return (
    <div ref={hostRef} className="absolute inset-0">
      {mounted && <iframe {...props}></iframe>}
      {props.src && (
        <noscript>
          <a
            href={zeffyHostedUrl(props.src)}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span
              className="bg-white text-[#0567B1] underline px-4 py-2 rounded shadow"
              data-font="lato-font"
            >
              {props.title ?? 'Open the donation form'}
            </span>
          </a>
        </noscript>
      )}
    </div>
  )
}

export default LazyZeffyIframe
