'use client'

import { useEffect } from 'react'
import {
  classifyConversionHref,
  isConversionEvent,
  trackConversion,
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

      // Classification runs for every conversion link, tagged or not.
      // Explicit attributes then override it FIELD BY FIELD rather than
      // wholesale: ZeffyPopupButton always tags `donate_open` but most
      // call sites pass no campaignKey, and a wholesale override would
      // replace a perfectly good URL-derived campaign slug with
      // undefined — silently emptying conversion_id for nearly every
      // donate CTA.
      const classified = anchor ? classifyConversionHref(anchor.href, window.location.href) : null

      const taggedEvent = tagged?.dataset.ffcConversion
      const explicitEvent = taggedEvent && isConversionEvent(taggedEvent) ? taggedEvent : undefined

      const event = explicitEvent ?? classified?.event
      if (!event) return

      const params: ConversionParams = {
        // The link text is the most honest label available when neither
        // the component nor the URL supplies one.
        conversion_label: anchor?.textContent?.trim().slice(0, 100) || undefined,
        ...classified?.params,
      }
      if (tagged?.dataset.ffcConversionLabel) {
        params.conversion_label = tagged.dataset.ffcConversionLabel
      }
      if (tagged?.dataset.ffcConversionId) {
        params.conversion_id = tagged.dataset.ffcConversionId
      }

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
