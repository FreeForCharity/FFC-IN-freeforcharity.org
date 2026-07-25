// Conversion event contract for freeforcharity.org.
//
// Three primary conversions carry the mission, and every one of them ends
// at a boundary GA4 cannot observe on its own:
//
//   Donations  → Zeffy (cross-origin iframe or zeffy.com in a new tab)
//   Volunteer  → Idealist postings and ffcadmin.org (separate origins)
//   Services   → /hub/cart.php (WHMCS, a different app on the same host)
//
// So the site measures the last thing it CAN see — the visitor committing
// to the handoff — and names it explicitly. Completion tracking on the far
// side of each boundary is tracked separately (see
// docs/CONVERSION-TRACKING.md); these intent events are what make the
// funnels visible at all, and they are what get marked as Key Events in
// GA4 Admin.
//
// Events are emitted TWICE, deliberately:
//   1. `gtag('event', …)` — reaches GA4 directly, with no GTM tag to
//      configure. Without this, nothing lands in GA4 until someone builds
//      a tag by hand in the container, which is precisely the gap that
//      left keyEvents at 0.
//   2. `dataLayer.push({event: …})` — makes the same conversion available
//      as a GTM trigger for Google Ads conversions, Meta, or anything else
//      wired up later.
//
// DO NOT also build a GTM tag that sends these same events to the SAME GA4
// property — that double-counts. Use the dataLayer copy for other
// destinations only.

import { SITE_ORIGIN } from '@/lib/config'

/** The three primary conversions, plus the supporting funnel steps. */
export const CONVERSION_EVENTS = {
  /** Donor opened a Zeffy campaign form (pop-up button or hosted link). */
  DONATE_OPEN: 'donate_open',
  /** A Zeffy donation form was actually rendered on screen (iframe embed). */
  DONATE_FORM_VIEW: 'donate_form_view',
  /** Visitor followed a volunteer role application link off-site. */
  VOLUNTEER_APPLY: 'volunteer_apply',
  /** Charity opened a WHMCS onboarding/service application form. */
  SERVICE_APPLICATION_START: 'service_application_start',
} as const

export type ConversionEvent = (typeof CONVERSION_EVENTS)[keyof typeof CONVERSION_EVENTS]

/** Every value CONVERSION_EVENTS can produce, for runtime validation. */
const VALID_EVENTS: readonly string[] = Object.values(CONVERSION_EVENTS)

export function isConversionEvent(value: string): value is ConversionEvent {
  return VALID_EVENTS.includes(value)
}

/**
 * Parameters carried on a conversion. Kept deliberately small and
 * non-identifying: what was clicked and where from, never who clicked it.
 */
export interface ConversionParams {
  /** Human-readable thing being converted on, e.g. a campaign or role name. */
  conversion_label?: string
  /** Stable id where one exists — Zeffy campaign key, WHMCS product id. */
  conversion_id?: string
  /** Where the click happened, e.g. '/donate/'. */
  conversion_source?: string
  /** Destination host for handoffs, e.g. 'www.zeffy.com'. */
  conversion_destination?: string
}

interface DataLayerEvent {
  event: string
  [key: string]: string | number | boolean | undefined
}

declare global {
  interface Window {
    // Two shapes share this queue: plain objects pushed directly (the
    // `{event: …}` records GTM triggers on) and the `arguments` objects
    // gtag pushes for its own commands. Typing it as DataLayerEvent[]
    // alone would let a reader assume every entry has an `event` field,
    // which is false for every consent/config call.
    dataLayer: (DataLayerEvent | IArguments)[]
    // gtag's real signature is variadic and untyped by design (it proxies
    // straight into dataLayer as an arguments object).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void
    openCookiePreferences?: () => void
  }
}

/**
 * Emit a conversion. Safe to call during SSR (no-ops) and safe to call
 * before the Google tag has loaded — gtag calls queue in dataLayer and are
 * replayed once GA4 initialises, so a conversion on the very first
 * interaction is not lost.
 *
 * GA4's transport uses `sendBeacon`/keepalive, so events survive the
 * navigation they were triggered by — which matters for the WHMCS apply
 * links, since those replace the page rather than opening a new tab.
 */
export function trackConversion(event: ConversionEvent, params: ConversionParams = {}): void {
  if (typeof window === 'undefined') return

  // Drop undefined values so GA4 doesn't receive empty parameters.
  const clean: Record<string, string> = {}
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string' && value.length > 0) clean[key] = value
  }

  window.gtag?.('event', event, clean)

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...clean })
}

/**
 * True when `host` is exactly `domain` or a subdomain of it.
 *
 * A bare `host.endsWith('zeffy.com')` also matches `evilzeffy.com` and
 * `notzeffy.com`, which would let an unrelated (or hostile) link be
 * counted as a donation. The leading dot is what makes it a real
 * subdomain check rather than a substring one.
 */
function isHost(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`)
}

/**
 * Zeffy campaign path types. Mirrors the `<type>` segment of the links in
 * src/data/donation-campaigns.ts — note the type does NOT track the
 * campaign's category (the "Website Design and Development" appeal is a
 * `ticketing` URL), so this list is about URL shape, not semantics.
 */
const ZEFFY_CAMPAIGN_TYPES = new Set(['donation-form', 'ticketing', 'membership', 'shop'])

/**
 * Registrable host of the configured site origin, `www.` stripped so both
 * apex and `www.` links match. WHMCS is deployed as a sibling directory
 * of the export on this same host.
 */
const HUB_HOST = (() => {
  try {
    return new URL(SITE_ORIGIN).host.toLowerCase().replace(/^www\./, '')
  } catch {
    return 'freeforcharity.org'
  }
})()

/**
 * Classify a link by where it GOES, so conversions are tracked without
 * every call site having to remember to tag itself.
 *
 * The three funnels each leave for a small, stable set of destinations —
 * Zeffy for donations, Idealist / ffcadmin.org for volunteering, WHMCS
 * `/hub/cart.php` for service applications — and those destinations are
 * reached from ~20 components (every `Transparentbtn` apply pair, the
 * footer donate button, the campaign cards). Hand-tagging each one
 * guarantees the next new CTA is silently untracked, which is how the
 * site ended up at zero conversions in the first place.
 *
 * Explicit `data-ffc-conversion` attributes still win where a component
 * knows something the URL does not — a campaign name, a product label.
 *
 * Returns null for links that aren't conversions.
 */
export function classifyConversionHref(
  href: string,
  base?: string
): { event: ConversionEvent; params: ConversionParams } | null {
  let url: URL
  try {
    url = new URL(href, base ?? SITE_ORIGIN)
  } catch {
    return null
  }

  const host = url.host.toLowerCase()
  const path = url.pathname.toLowerCase()

  // Donations: Zeffy CAMPAIGN links only.
  //
  // Not every zeffy.com link is a donation. The site also links to
  // Zeffy's own marketing pages — `zeffy.com/` from the donations guide,
  // and their privacy policy from our cookie policy. Matching the host
  // alone counted those as donation intent and handed GA4 a
  // conversion_id of "privacy-policy".
  //
  // Campaign URLs are `/<type>/<slug>`, optionally prefixed with a
  // locale and/or `embed` (the pop-up form of the same link):
  //   /embed/donation-form/<uuid>?modal=true
  //   /ticketing/free-for-charity-annual-gala
  //   /en-US/donation-form/<uuid>
  if (isHost(host, 'zeffy.com')) {
    const segments = url.pathname.split('/').filter(Boolean)
    let i = 0
    // Optional locale segment, e.g. `en-US`. No campaign type is two
    // letters, so this cannot swallow one.
    if (segments[i] && /^[a-z]{2}(-[a-zA-Z]{2})?$/.test(segments[i])) i++
    if (segments[i] === 'embed') i++

    const type = segments[i]
    const slug = segments[i + 1]
    if (type && ZEFFY_CAMPAIGN_TYPES.has(type) && slug) {
      return {
        event: CONVERSION_EVENTS.DONATE_OPEN,
        params: { conversion_id: slug },
      }
    }
    // A Zeffy link that isn't a campaign is not a conversion.
    return null
  }

  // Volunteering: Idealist postings and the ffcadmin role pages, which
  // are where an application is actually started.
  if (isHost(host, 'idealist.org')) {
    return { event: CONVERSION_EVENTS.VOLUNTEER_APPLY, params: {} }
  }
  if (isHost(host, 'ffcadmin.org') && path.startsWith('/volunteer/')) {
    const role = path.split('/').filter(Boolean)[1]
    return {
      event: CONVERSION_EVENTS.VOLUNTEER_APPLY,
      params: { conversion_id: role },
    }
  }

  // Service applications: any WHMCS product order form. Both link shapes
  // are in use — `a=add&pid=N` (preferred, stable product id) and the
  // older `a=confproduct&i=N` cart-index form.
  //
  // Constrained to our own origin: WHMCS is deployed as a sibling
  // directory of the export on the same host, so an off-site
  // `/hub/cart.php` is somebody else's cart, not an FFC application.
  // Checked against SITE_ORIGIN — the origin these links are generated
  // from — rather than the page host, so it stays correct both on staging
  // and in local/CI builds where the page is served from localhost but
  // the hub links still point at the configured origin.
  if (isHost(host, HUB_HOST) && path.endsWith('/hub/cart.php')) {
    const pid = url.searchParams.get('pid') ?? url.searchParams.get('i')
    if (pid) {
      return {
        event: CONVERSION_EVENTS.SERVICE_APPLICATION_START,
        params: { conversion_id: pid },
      }
    }
  }

  return null
}

/**
 * Data attributes that turn any anchor into a tracked conversion without
 * making its component a client component. The delegated listener in
 * <ConversionTracking /> reads these on click, so server-rendered CTAs
 * (the apply buttons, the Zeffy pop-up buttons) stay server-rendered.
 *
 *   <a {...conversionAttrs(CONVERSION_EVENTS.DONATE_OPEN, {conversion_label: 'General Fund'})} …>
 */
export function conversionAttrs(
  event: ConversionEvent,
  params: Pick<ConversionParams, 'conversion_label' | 'conversion_id'> = {}
): Record<string, string> {
  const attrs: Record<string, string> = { 'data-ffc-conversion': event }
  if (params.conversion_label) attrs['data-ffc-conversion-label'] = params.conversion_label
  if (params.conversion_id) attrs['data-ffc-conversion-id'] = params.conversion_id
  return attrs
}
