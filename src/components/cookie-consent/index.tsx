'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  GA_MEASUREMENT_ID,
  META_PIXEL_ID,
  CLARITY_PROJECT_ID,
  GTM_CONTAINER_ID,
  TAWK_TO_PROPERTY,
  CROSS_DOMAIN_DOMAINS,
  GA_DELIVERY,
  isAutomatedBrowser,
} from '@/lib/analytics-config'
import { updateGoogleConsent, type ConsentPreferences } from '@/lib/consent-mode'

// The Window globals (dataLayer, gtag, openCookiePreferences) are declared
// once in @/lib/analytics-events so every caller shares one typed queue.

type CookiePreferences = ConsentPreferences

const CONSENT_KEY = 'cookie-consent'

/**
 * `; domain=.<apex>` for the consent cookie, or '' where that would be
 * invalid.
 *
 * A domain attribute is rejected outright for `localhost` and bare IP
 * hosts — which is exactly what the dev server and the Playwright suite
 * run on, so getting this wrong would silently stop consent persisting
 * anywhere except production. Returning '' there keeps the cookie
 * host-only, which is correct when there are no sibling hosts to share
 * it with.
 */
function consentCookieDomain(): string {
  if (typeof window === 'undefined') return ''
  const host = window.location.hostname

  // IPv6 arrives bracketed or colon-separated; IPv4 is four dotted octets.
  if (host.includes(':') || /^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return ''
  // Single-label hosts (localhost, a container name) cannot take a domain.
  if (!host.includes('.')) return ''

  return `; domain=.${host.replace(/^www\./, '')}`
}

/**
 * Read the stored consent choice, preferring localStorage and falling
 * back to the `cookie-consent` cookie.
 *
 * Both are written on every choice, but only localStorage was ever read.
 * Where localStorage is unavailable — Safari private mode, storage
 * disabled, quota exhausted — the write silently no-ops (the callers
 * catch and carry on, noting the cookie is "the source of truth"), so on
 * the next page load the visitor looked undecided and the banner
 * reappeared. Their choice was sitting in the cookie the whole time,
 * unread.
 *
 * The cookie is also the only path that carries a choice between
 * `freeforcharity.org` and `www.freeforcharity.org`, since localStorage
 * is origin-scoped and both hosts serve this site.
 */
function readConsentCookie(): string | null {
  if (typeof document === 'undefined') return null

  // There can legitimately be more than one cookie of this name in
  // flight — a host-only copy left by a build that predates domain
  // scoping, alongside the shared one. Take the first that actually
  // parses, rather than assuming position implies freshness.
  const pattern = new RegExp(`(?:^|;\\s*)${CONSENT_KEY}=([^;]*)`, 'g')
  const jar = document.cookie
  let match: RegExpExecArray | null
  while ((match = pattern.exec(jar)) !== null) {
    try {
      const value = decodeURIComponent(match[1])
      JSON.parse(value)
      return value
    } catch {
      // Malformed or truncated copy — try the next one.
    }
  }
  return null
}

function readStoredConsent(): string | null {
  // COOKIE FIRST, localStorage only as a fallback.
  //
  // localStorage is per-ORIGIN, so `freeforcharity.org` and
  // `www.freeforcharity.org` keep separate copies that never sync. If it
  // were preferred, this would happen: accept on the apex, later decline
  // on www (cookie updated, shared), then return to the apex — whose
  // localStorage still says accepted, and wins. The site would run
  // analytics against a decline the visitor had already made, on a host
  // they had already made it on.
  //
  // The cookie is the only copy both hosts share and the only one that
  // reflects the most recent choice wherever it was made, so it is
  // authoritative. localStorage remains a fallback for the case the
  // cookie cannot be read at all.
  const fromCookie = readConsentCookie()
  if (fromCookie) return fromCookie

  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

/**
 * Serialises a value for embedding inside an inline `<script>` body.
 *
 * `JSON.stringify` supplies the surrounding quotes and escapes quotes and
 * newlines, but it does NOT escape `<` — so a value containing `</script>`
 * would still close the element early and let the remainder be parsed as
 * markup. Escaping `<` closes that. U+2028/U+2029 are escaped too: they are
 * legal inside a JSON string but were illegal in a JS string literal before
 * ES2019.
 *
 * The IDs these wrap are build-time values set by a maintainer, not by a
 * visitor, so this is defence in depth rather than a live hole. It matters
 * because the only guard in front of these loaders is a non-empty check
 * (`if (!GA_MEASUREMENT_ID) return`): an unset ID is rejected, but a set one
 * is used as-is, with neither a placeholder nor a shape check. So nothing
 * examines what actually reaches the script body.
 */
export function scriptString(value: string): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be changed
    functional: true, // Always true, cannot be changed - includes Zeffy donation forms
    analytics: false,
    marketing: false,
  })
  const [savedPreferencesBackup, setSavedPreferencesBackup] =
    useState<CookiePreferences>(preferences)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const loadGoogleAnalytics = useCallback(() => {
    if (!GA_MEASUREMENT_ID) return
    // Under 'gtm' delivery, GTM's Google tag loads gtag.js and configures
    // GA4. Loading it here as well would configure the same measurement
    // ID twice and double-count every pageview — invisibly, since both
    // hits are individually valid. See GA_DELIVERY.
    if (GA_DELIVERY !== 'direct') return
    if (
      typeof window !== 'undefined' &&
      !document.querySelector('script[src*="googletagmanager.com/gtag"]')
    ) {
      const gaScript = document.createElement('script')
      gaScript.async = true
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(gaScript)

      const gaConfigScript = document.createElement('script')
      const secureFlag =
        typeof window !== 'undefined' && window.location.protocol === 'https:' ? ';Secure' : ''
      gaConfigScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ${scriptString(GA_MEASUREMENT_ID)}, {
          'anonymize_ip': true,
          'cookie_flags': 'SameSite=Lax${secureFlag}',
          'linker': { 'domains': ${JSON.stringify(CROSS_DOMAIN_DOMAINS)} }
        });
      `
      document.head.appendChild(gaConfigScript)
    }
  }, [])

  const loadMetaPixel = useCallback(() => {
    if (!META_PIXEL_ID) return
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="fbevents.js"]')) {
      const fbScript = document.createElement('script')
      fbScript.textContent = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', ${scriptString(META_PIXEL_ID)});
        fbq('track', 'PageView');
      `
      document.head.appendChild(fbScript)

      const fbNoScript = document.createElement('noscript')
      const img = document.createElement('img')
      img.height = 1
      img.width = 1
      img.style.display = 'none'
      img.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`
      fbNoScript.appendChild(img)
      document.body.appendChild(fbNoScript)
    }
  }, [])

  const loadGoogleTagManager = useCallback(() => {
    if (!GTM_CONTAINER_ID) return
    if (
      typeof window !== 'undefined' &&
      !document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`)
    ) {
      // Standard GTM snippet, escaped for textContent. Loads the GTM
      // container, which can itself fire GA4, Meta Pixel, Clarity, etc.
      // via tag configuration in the GTM dashboard.
      //
      // Whether GA4 comes from GTM or from this file is decided by
      // GA_DELIVERY — NOT by blanking NEXT_PUBLIC_GA_MEASUREMENT_ID, as
      // an earlier version of this comment suggested. Clearing the ID
      // would stop the loader here while leaving trackConversion() still
      // calling gtag('event', …) under 'direct', queueing conversions
      // into a dataLayer with no GA4 configured to receive them. Set
      // GA_DELIVERY to match where GA4 is actually configured.
      const gtmScript = document.createElement('script')
      gtmScript.textContent = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',${scriptString(GTM_CONTAINER_ID)});
      `
      document.head.appendChild(gtmScript)
    }
  }, [])

  const loadMicrosoftClarity = useCallback(() => {
    if (!CLARITY_PROJECT_ID) return
    if (typeof window === 'undefined') return

    // Already present? Re-injecting is a no-op, so an explicit restart is
    // the only thing that revives it. A visitor can decline analytics
    // (which calls clarity('stop')) and then change their mind in the
    // same session — without this, the recorder would stay stopped until
    // a full page reload, so the preferences dialog would show analytics
    // ON while nothing was recording.
    const w = window as Window & { clarity?: (...args: unknown[]) => void }
    if (document.querySelector('script[src*="clarity.ms"]') || w.clarity) {
      try {
        w.clarity?.('start')
      } catch {
        // Clarity present but not ready to take commands — the next
        // page load injects cleanly.
      }
      return
    }

    {
      const clarityScript = document.createElement('script')
      clarityScript.textContent = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", ${scriptString(CLARITY_PROJECT_ID)});
      `
      document.head.appendChild(clarityScript)
    }
  }, [])

  const loadTawkTo = useCallback(() => {
    if (!TAWK_TO_PROPERTY) return
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="embed.tawk.to"]')) {
      // Tawk.to's standard async-embed snippet, escaped for textContent.
      // Property/widget format is "<32-char hex>/<10-char alnum>" as
      // shown in the Tawk.to dashboard.
      const tawkScript = document.createElement('script')
      tawkScript.textContent = `
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/${TAWK_TO_PROPERTY}';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
        })();
      `
      document.head.appendChild(tawkScript)
    }
  }, [])

  /**
   * Load the measurement tags that run for every visitor.
   *
   * Under Consent Mode v2 the GOOGLE tags are not the thing consent gates
   * — storage is. GA4 and GTM therefore load on every pageview, and the
   * consent state (set as a default before they ever run, then updated on
   * any banner choice) decides whether they may use cookies. An EEA
   * visitor who never touches the banner is measured via cookieless
   * pings; a visitor who declines is measured the same way.
   *
   * Two tags do NOT get that treatment, because Consent Mode is a Google
   * protocol and neither of them speaks it:
   *
   *   - Microsoft Clarity records session replays and sets _clck/_clsk.
   *     It requires EXPLICIT analytics consent — not merely the absence
   *     of a decline.
   *   - The Meta Pixel stays gated on marketing consent for the same
   *     reason — loading it unconsented is a real disclosure, not a
   *     modelled one.
   *
   * Clarity is not Google's, and Consent Mode gives it no cookieless
   * fallback, so an undecided visitor would be fully session-recorded
   * rather than modelled. That was the argument when the default was
   * permissive outside the EEA; the default is denied everywhere now, and
   * the conclusion is unchanged — Consent Mode cannot gate a tag that does
   * not speak it, so Clarity has to be gated here or not at all. It would also make the UI dishonest — the
   * preferences dialog shows analytics unchecked until a visitor opts in,
   * while the recorder ran regardless.
   *
   * The cost is nil against what this site actually needs to measure:
   * Clarity is a heatmap/replay tool and contributes nothing to the three
   * conversion events. GA4 and GTM, which do, keep sending cookieless
   * pings while consent is denied, so those events are still counted in
   * aggregate before anyone opts in.
   *
   * @param includeClarity true only once the visitor has explicitly
   *        granted analytics consent.
   */
  const loadDefaultTags = useCallback(
    (includeClarity: boolean) => {
      // Load nothing for automated browsers. See isAutomatedBrowser —
      // one crawl of the sitemap otherwise produces ~100 sessions against
      // a site that sees ~950 a month, and it looks like real growth.
      // Placed here rather than in each loader so a future tag cannot be
      // added past the guard by accident.
      if (isAutomatedBrowser()) return

      loadGoogleTagManager()
      loadGoogleAnalytics()
      if (includeClarity) loadMicrosoftClarity()
      loadTawkTo()
    },
    [loadGoogleTagManager, loadGoogleAnalytics, loadMicrosoftClarity, loadTawkTo]
  )

  /**
   * Halt Clarity mid-session. Tags now load before the first banner
   * interaction, so a visitor can be part-way through a recorded session
   * when they decline — deleting the cookies is not enough on its own,
   * the recorder has to be told to stop.
   */
  const stopClarity = useCallback(() => {
    if (typeof window === 'undefined') return
    const w = window as Window & { clarity?: (...args: unknown[]) => void }
    try {
      w.clarity?.('stop')
    } catch {
      // Clarity not loaded, or already stopped — nothing to do.
    }
  }, [])

  const expireCookies = useCallback((names: string[]) => {
    // A cookie can only be deleted by a request whose domain attribute
    // MATCHES the one it was set with. GA4 scopes `_ga` to the
    // registrable domain (`.freeforcharity.org`) so it is readable across
    // subdomains — so on `www.freeforcharity.org`, expiring it with
    // `domain=www.freeforcharity.org` silently does nothing and the
    // visitor keeps the identifier they just asked us to drop.
    //
    // Try every scope the cookie could plausibly hold: host-only, the
    // exact hostname, and the apex with and without a leading dot.
    const hostname = window.location.hostname
    const apex = hostname.replace(/^www\./, '')
    const domains = Array.from(new Set([hostname, `.${hostname}`, apex, `.${apex}`]))

    names.forEach((name) => {
      const expiry = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      // Host-only (no domain attribute).
      document.cookie = expiry
      domains.forEach((domain) => {
        document.cookie = `${expiry} domain=${domain};`
      })
    })
  }, [])

  /**
   * Analytics cookies only — GA4 (`_ga`, `_gid`, `_ga_<stream>`) and
   * Clarity (`_clck`, `_clsk`).
   *
   * Kept strictly separate from the marketing set. These used to be one
   * list, which was harmless when deletion only ran on an actual
   * withdrawal, but this component now re-applies stored consent on EVERY
   * page load: a visitor who accepts analytics and declines marketing
   * would have had their `_ga` client id wiped on every pageview,
   * resetting visitor identity continuously and inflating new-user counts
   * — the precise opposite of what their choice asked for.
   */
  const deleteAnalyticsCookies = useCallback(() => {
    expireCookies(['_ga', '_gid', '_clck', '_clsk'])

    // Dynamically delete all cookies matching _ga_* (e.g., _ga_G-XXXXXXXXXX)
    if (typeof document !== 'undefined') {
      const regex = /(?:^|;\s*)(_ga_[^=;\s]*)/g
      let match: RegExpExecArray | null
      const cookieStr = document.cookie
      const found: string[] = []
      while ((match = regex.exec(cookieStr)) !== null) {
        found.push(match[1])
      }
      expireCookies(found)
    }
  }, [expireCookies])

  /** Meta Pixel cookies only. */
  const deleteMarketingCookies = useCallback(() => {
    expireCookies(['_fbp', 'fr'])
  }, [expireCookies])

  const applyConsent = useCallback(
    (prefs: CookiePreferences) => {
      // Set a cookie to indicate consent status with Secure flag (only on HTTPS)
      const cookieValue = JSON.stringify(prefs)
      const secureFlag =
        typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : ''
      // Scope the choice to the registrable domain so it is shared across
      // hosts. Both `freeforcharity.org` and `www.freeforcharity.org`
      // serve the site (verified: each returns 200 with no redirect), and
      // a host-only cookie is not visible to the other one. That is not
      // just a repeated banner — a visitor who DECLINED on www would be
      // treated as undecided on the apex, and analytics would run again
      // against their stated choice. localStorage cannot fix this: it is
      // origin-scoped, so the shared cookie is the only mechanism, which
      // is what readStoredConsent() falls back to on the other host.
      const domainAttr = consentCookieDomain()
      if (domainAttr) {
        // Drop any pre-existing host-only copy first, or it shadows the
        // shared one and keeps serving a stale choice.
        document.cookie = `${CONSENT_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      }
      document.cookie = `${CONSENT_KEY}=${encodeURIComponent(cookieValue)}; path=/; max-age=31536000; SameSite=Lax${secureFlag}${domainAttr}`

      // Clear third-party cookies whenever the resulting state denies a
      // category — NOT only when it differs from a previous choice, and
      // strictly per category.
      //
      // This used to be gated on a `previousPrefs` argument, which was
      // safe while nothing loaded before an explicit opt-in: with no
      // tags, there were no cookies to clear. Now that tags load on the
      // first pageview, a first-time visitor can already hold _ga/_clck
      // cookies when they open preferences and switch analytics off, and
      // that path passed a previousPrefs whose analytics was already
      // false — so the old condition found "no withdrawal" and left the
      // cookies in place. The resulting state is the only thing that
      // matters now.
      if (!prefs.analytics) {
        deleteAnalyticsCookies()
        stopClarity()
      }
      if (!prefs.marketing) {
        deleteMarketingCookies()
      }

      // Tell the Google tags what the visitor actually chose. This must happen
      // before (or alongside) loading them: for a visitor who accepts it is
      // what lifts the denied-by-default state, and for one who declines it is
      // what pins storage to denied. Tags that are already loaded pick it up
      // immediately.
      //
      // Queued BEFORE the custom `consent_update` event pushed below: both
      // writes land in the same dataLayer queue and GTM processes it in order,
      // so a container trigger keyed on that event would otherwise evaluate
      // consent state before this choice had been applied. Locked by
      // __tests__/components/CookieConsent.consent-order.test.tsx — swapping
      // these two lines fails that suite.
      updateGoogleConsent(prefs)

      // Push consent update to GTM dataLayer
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'consent_update',
          functional_consent: prefs.functional ? 'granted' : 'denied',
          analytics_consent: prefs.analytics ? 'granted' : 'denied',
          marketing_consent: prefs.marketing ? 'granted' : 'denied',
        })
      }

      // GTM rides alongside GA4. Which of the two actually configures
      // GA4 is decided by GA_DELIVERY — never by blanking a measurement
      // ID, which would leave trackConversion() still emitting events
      // with nothing configured to receive them.
      loadDefaultTags(prefs.analytics)

      if (prefs.marketing && !isAutomatedBrowser()) {
        loadMetaPixel()
      }
    },
    [deleteAnalyticsCookies, deleteMarketingCookies, loadDefaultTags, loadMetaPixel, stopClarity]
  )

  // Apply the visitor's stored choice, or the denied-by-default state if
  // they have not made one. Reads via readStoredConsent(), which prefers
  // localStorage and falls back to the cookie-consent cookie — the name
  // below is kept for call-site stability, but storage is not the only
  // source.
  const loadPreferencesFromLocalStorage = useCallback(
    (showBannerIfMissing = true) => {
      // No stored choice (or an unreadable one): show the banner AND load the
      // tags. The Consent Mode defaults already in the dataLayer decide what
      // those tags may store — nothing, anywhere, until the visitor accepts —
      // so an ignored banner still produces cookieless measurement instead of
      // silence.
      const fallBackToDefaults = () => {
        if (showBannerIfMissing) setShowBanner(true)
        // Undecided: Google tags load (Consent Mode governs their
        // storage), Clarity does not. See loadDefaultTags.
        loadDefaultTags(false)
      }

      try {
        const consent = readStoredConsent()
        if (!consent) {
          fallBackToDefaults()
          return
        }
        let savedPreferences: CookiePreferences
        try {
          savedPreferences = JSON.parse(consent)
        } catch {
          fallBackToDefaults()
          return
        }

        // Validate the structure (functional is optional for backward compatibility)
        if (
          typeof savedPreferences === 'object' &&
          savedPreferences !== null &&
          typeof savedPreferences.necessary === 'boolean' &&
          typeof savedPreferences.analytics === 'boolean' &&
          typeof savedPreferences.marketing === 'boolean'
        ) {
          // Ensure functional is always true (for backward compatibility with old saved preferences)
          // Create a new object to avoid mutation
          const updatedPreferences: CookiePreferences = {
            ...savedPreferences,
            functional: true,
          }
          setPreferences(updatedPreferences)
          setSavedPreferencesBackup(updatedPreferences)
          applyConsent(updatedPreferences)
        } else {
          // Invalid data, show banner again
          fallBackToDefaults()
        }
      } catch {
        // If localStorage is unavailable or data is corrupted, show banner
        fallBackToDefaults()
      }
    },
    [applyConsent, loadDefaultTags]
  )

  const handleCancelPreferences = useCallback(() => {
    // Restore the backed-up preferences
    setPreferences(savedPreferencesBackup)
    setShowPreferences(false)
  }, [savedPreferencesBackup])

  useEffect(() => {
    // Expose method to window for reopening preferences from other components
    window.openCookiePreferences = () => {
      setShowBanner(true)
      setShowPreferences(true)
      loadPreferencesFromLocalStorage(false)
    }

    // Check if user has already made a choice with error handling
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must read persisted consent from localStorage on the client after hydration; a lazy useState initializer runs during static prerender where localStorage is undefined, so it can never load saved prefs
    loadPreferencesFromLocalStorage(true)

    // Cleanup function to remove the window method
    return () => {
      delete window.openCookiePreferences
    }
  }, [loadPreferencesFromLocalStorage])

  // Focus management for modal
  useEffect(() => {
    if (showPreferences && modalRef.current) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement

      // Focus the first focusable element in the modal
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length > 0) {
        ;(focusableElements[0] as HTMLElement).focus()
      }

      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleCancelPreferences()
        }
      }
      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('keydown', handleEscape)
        // Restore focus when modal closes
        if (previousFocusRef.current) {
          previousFocusRef.current.focus()
        }
      }
    }
  }, [showPreferences, handleCancelPreferences])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    setPreferences(allAccepted)
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    } catch {
      // If localStorage is unavailable (Safari private mode, quota
      // exceeded, disabled storage), continue anyway — the consent
      // cookie set by applyConsent() is the source of truth.
    }
    applyConsent(allAccepted)
    setSavedPreferencesBackup(allAccepted)
    setShowBanner(false)
  }

  const handleDeclineAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      functional: true, // Functional cookies (Zeffy) are always enabled for donations
      analytics: false,
      marketing: false,
    }
    setPreferences(onlyNecessary)
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary))
    } catch {
      // If localStorage is unavailable (Safari private mode, quota
      // exceeded, disabled storage), continue anyway — the consent
      // cookie set by applyConsent() is the source of truth.
    }

    // Cookie clearing lives in applyConsent, which now handles BOTH
    // categories from the resulting state. Calling it here as well would
    // only have covered analytics, leaving the marketing cookies a
    // "Decline All" is most obviously meant to remove.
    applyConsent(onlyNecessary)
    setSavedPreferencesBackup(onlyNecessary)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    } catch {
      // If localStorage is unavailable (Safari private mode, quota
      // exceeded, disabled storage), continue anyway — the consent
      // cookie set by applyConsent() is the source of truth.
    }
    applyConsent(preferences)
    setSavedPreferencesBackup(preferences)
    setShowBanner(false)
    setShowPreferences(false)
  }

  const handleShowPreferences = () => {
    // Backup current preferences in case user cancels
    setSavedPreferencesBackup(preferences)
    setShowPreferences(true)
  }

  if (!showBanner) {
    return null
  }

  if (showPreferences) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        onClick={(e) => {
          // Only close if clicking the overlay itself, not the modal content
          if (e.target === e.currentTarget) {
            handleCancelPreferences()
          }
        }}
      >
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <h2 id="cookie-preferences-title" className="text-2xl font-bold text-gray-900 mb-4">
              Cookie Preferences
            </h2>
            <p className="text-gray-600 mb-6">
              We use cookies to enhance your browsing experience and analyze our traffic. You can
              choose which types of cookies you allow. For full details, see our{' '}
              <Link href="/cookie-policy" className="text-blue-600 hover:underline">
                Cookie Policy
              </Link>
              .
            </p>

            {/* Necessary Cookies */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Necessary Cookies</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-5 h-5 text-blue-600 bg-gray-300 rounded cursor-not-allowed"
                  />
                  <span className="ml-2 text-sm text-gray-500">Always Active</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                These cookies are essential for the website to function properly. They enable basic
                features like page navigation and access to secure areas. The website cannot
                function properly without these cookies.
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    disabled
                    className="w-5 h-5 text-blue-600 bg-gray-300 rounded cursor-not-allowed"
                  />
                  <span className="ml-2 text-sm text-gray-500">Always Active</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                These cookies enable enhanced functionality and features that are essential for our
                core services. This includes our donation processing system which requires cookies
                to function properly.
              </p>
              <p className="text-xs text-gray-500">Services: Zeffy (Donation Processing)</p>
            </div>

            {/* Analytics Cookies */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="sr-only peer"
                    aria-label="Enable analytics cookies"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                These cookies help us understand how visitors interact with our website by
                collecting and reporting information anonymously. We use Google Analytics and
                Microsoft Clarity.
              </p>
              {/* The toggle alone would misrepresent the starting state: until
                  a visitor chooses, Google Analytics already uses cookies
                  outside the EEA/UK/Switzerland, while Clarity is off
                  everywhere. Region can't be detected here — Consent Mode
                  applies it inside Google's tag — so the honest thing is to
                  state both rules plainly rather than pre-tick a box that
                  would be wrong for one group or the other. */}
              <p className="text-sm text-gray-600 mb-2">
                <strong>Before you choose:</strong> Google Analytics is already running. In the EEA,
                the UK, and Switzerland it sets no cookies and cannot identify you until you switch
                this on. Elsewhere it uses cookies until you switch it off. Microsoft Clarity, which
                records screen activity, stays off everywhere until you switch this on.
              </p>
              <p className="text-xs text-gray-500">Services: Google Analytics, Microsoft Clarity</p>
            </div>

            {/* Marketing Cookies */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="sr-only peer"
                    aria-label="Enable marketing cookies"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                These cookies are used to track visitors across websites. The intention is to
                display ads that are relevant and engaging for the individual user.
              </p>
              <p className="text-xs text-gray-500">Services: Meta Pixel (Facebook)</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={handleCancelPreferences}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl"
      role="region"
      aria-label="Cookie consent notice"
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">We Value Your Privacy</h3>
            <p className="text-sm text-gray-600 mb-3">
              We use cookies to improve your experience on our site, analyze traffic, and enable
              certain features. By clicking &quot;Accept All&quot;, you consent to our use of
              cookies for analytics and marketing purposes. You can manage your preferences or
              decline non-essential cookies.
            </p>
            {/* Says plainly what happens if the visitor does nothing, rather
                than implying nothing runs until they click. */}
            {/* Says what is actually true before a choice. Avoid claiming
                marketing "cookies" are off: outside the EEA/UK/CH the
                Consent Mode default GRANTS ad storage. What is true is
                that no advertising or screen-recording tag runs at all
                until the visitor turns it on. */}
            <p className="text-sm text-gray-600 mb-3">
              If you make no choice, basic analytics still measures this visit — without cookies and
              without identifying you in the EEA, the UK, and Switzerland. No screen-recording or
              advertising tools run at all until you turn them on.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link href="/privacy-policy/" className="text-blue-600 underline">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy/" className="text-blue-600 underline">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={handleDeclineAll}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm whitespace-nowrap"
            >
              Decline All
            </button>
            <button
              onClick={handleShowPreferences}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm whitespace-nowrap"
            >
              Customize
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
