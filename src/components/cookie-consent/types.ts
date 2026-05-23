// Define type for GTM dataLayer events
export interface DataLayerEvent {
  event: string
  [key: string]: string | number | boolean | undefined
}

// Extend Window interface to include dataLayer and openCookiePreferences
declare global {
  interface Window {
    dataLayer: DataLayerEvent[]
    openCookiePreferences?: () => void
  }
}

export interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}
