import { CookiePreferences } from './types'

// Environment variables for tracking IDs (replace with actual values)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || 'XXXXXXXXXXXXXXX'
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'XXXXXXXXXX'

export const loadGoogleAnalytics = () => {
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
      gtag('config', '${GA_MEASUREMENT_ID}', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=Lax${secureFlag}'
      });
    `
    document.head.appendChild(gaConfigScript)
  }
}

export const loadMetaPixel = () => {
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
      fbq('init', '${META_PIXEL_ID}');
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
}

export const loadMicrosoftClarity = () => {
  if (typeof window !== 'undefined' && !document.querySelector('script[src*="clarity.ms"]')) {
    const clarityScript = document.createElement('script')
    clarityScript.textContent = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
    `
    document.head.appendChild(clarityScript)
  }
}

export const deleteAnalyticsCookies = () => {
  // List of static cookie names to delete
  const cookiesToDelete = ['_ga', '_gid', '_fbp', 'fr', '_clck', '_clsk']

  // Delete static cookies
  cookiesToDelete.forEach((name) => {
    // Delete for current domain
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    // Also try to delete with domain specification
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`
  })

  // Dynamically delete all cookies matching _ga_* (e.g., _ga_G-XXXXXXXXXX)
  if (typeof document !== 'undefined') {
    document.cookie.split(';').forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim()
      if (cookieName.startsWith('_ga_')) {
        // Delete for current domain
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        // Also try to delete with domain specification
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`
      }
    })
  }
}

export const applyConsent = (prefs: CookiePreferences, previousPrefs?: CookiePreferences) => {
  // Set a cookie to indicate consent status with Secure flag (only on HTTPS)
  const cookieValue = JSON.stringify(prefs)
  const secureFlag =
    typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `cookie-consent=${encodeURIComponent(cookieValue)}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`

  // Check if consent was withdrawn and delete cookies if needed
  if (previousPrefs) {
    if (
      (previousPrefs.analytics && !prefs.analytics) ||
      (previousPrefs.marketing && !prefs.marketing)
    ) {
      deleteAnalyticsCookies()
    }
  }

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

  // Load scripts based on consent independently
  if (prefs.analytics) {
    loadGoogleAnalytics()
    loadMicrosoftClarity()
  }
  if (prefs.marketing) {
    loadMetaPixel()
  }
}
