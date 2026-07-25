'use client'

import { useEffect } from 'react'
import {
  classifyConversionHref,
  isConversionEvent,
  trackConversion,
  type ConversionEvent,
  type ConversionParams,
} from '@/lib/analytics-events'

/**
 * One delegated listener for every tracked CTA on the site.
 *
 * CTAs opt in with `data-ffc-conversion` attributes (see conversionAttrs in
 * @/lib/analytics-events) rather than an onClick handler, so the buttons
 * themselves stay server components — the apply buttons and Zeffy pop-up
 * triggers are plain server-rendered anchors and must remain so.
 *
 * Listening in the CAPTURE phase matters: Zeffy's embed script binds its
 * own click handler to `zeffy-form-link` elements to open the modal, and
 * capture runs before it, so the conversion is recorded whether or not
 * Zeffy's script has loaded or decides to swallow the event.
 *
 * `auxclick` covers middle-click / "open in new tab", which is a real
 * pattern for the WHMCS apply links and produces no `click` event.
 */
export default function ConversionTracking() {
  useEffect(() => {
    const handler = (rawEvent: Event) => {
      // Normalise to an Element before walking up. In practice mouse
      // events target elements, not text nodes, but composedPath() also
      // gets us the real target when a click originates inside a shadow
      // root — where `target` is retargeted to the host and `closest()`
      // would start from the wrong node.
      const path = typeof rawEvent.composedPath === 'function' ? rawEvent.composedPath() : []
      const fromPath = path.find((node): node is Element => node instanceof Element)
      const raw = rawEvent.target
      const target =
        fromPath ??
        (raw instanceof Element ? raw : raw instanceof Node ? (raw.parentElement ?? null) : null)
      if (!target) return

      // A middle-click that isn't a navigation (e.g. autoscroll) is noise.
      if (rawEvent instanceof MouseEvent && rawEvent.type === 'auxclick' && rawEvent.button !== 1) {
        return
      }

      const tagged = target.closest<HTMLElement>('[data-ffc-conversion]')
      const anchor = target.closest<HTMLAnchorElement>('a[href]')

      // An explicit tag wins; otherwise fall back to classifying the
      // destination, which is what covers the untagged apply/donate links.
      let event: ConversionEvent | undefined
      let params: ConversionParams = {}

      const taggedEvent = tagged?.dataset.ffcConversion
      if (taggedEvent && isConversionEvent(taggedEvent)) {
        event = taggedEvent
        params = {
          conversion_label: tagged?.dataset.ffcConversionLabel,
          conversion_id: tagged?.dataset.ffcConversionId,
        }
      } else if (anchor) {
        const classified = classifyConversionHref(anchor.href, window.location.href)
        if (classified) {
          event = classified.event
          params = {
            // The link text is the most honest label available when the
            // component didn't supply one.
            conversion_label: anchor.textContent?.trim().slice(0, 100) || undefined,
            ...classified.params,
          }
        }
      }

      if (!event) return

      let destination: string | undefined
      if (anchor?.href) {
        try {
          destination = new URL(anchor.href, window.location.href).host
        } catch {
          destination = undefined
        }
      }

      trackConversion(event, {
        ...params,
        conversion_source: window.location.pathname,
        conversion_destination: destination,
      })
    }

    document.addEventListener('click', handler, true)
    document.addEventListener('auxclick', handler, true)
    return () => {
      document.removeEventListener('click', handler, true)
      document.removeEventListener('auxclick', handler, true)
    }
  }, [])

  return null
}
