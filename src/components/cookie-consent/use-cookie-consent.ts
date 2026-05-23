import { useState, useEffect, useCallback } from 'react'
import { CookiePreferences } from './types'
import { applyConsent, deleteAnalyticsCookies } from './analytics'

export function useCookieConsent() {
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

  // Helper to load preferences from localStorage and update state
  const loadPreferencesFromLocalStorage = useCallback((showBannerIfMissing = true) => {
    try {
      const consent = localStorage.getItem('cookie-consent')
      if (!consent) {
        if (showBannerIfMissing) setShowBanner(true)
        return
      }
      let savedPreferences: CookiePreferences
      try {
        savedPreferences = JSON.parse(consent)
      } catch {
        if (showBannerIfMissing) setShowBanner(true)
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
        if (showBannerIfMissing) setShowBanner(true)
      }
    } catch {
      // If localStorage is unavailable or data is corrupted, show banner
      if (showBannerIfMissing) setShowBanner(true)
    }
  }, [])

  useEffect(() => {
    // Expose method to window for reopening preferences from other components
    window.openCookiePreferences = () => {
      setShowBanner(true)
      setShowPreferences(true)
      loadPreferencesFromLocalStorage(false)
    }

    // Check if user has already made a choice with error handling
    loadPreferencesFromLocalStorage(true)

    // Cleanup function to remove the window method
    return () => {
      delete window.openCookiePreferences
    }
  }, [loadPreferencesFromLocalStorage])

  const handleCancelPreferences = useCallback(() => {
    // Restore the backed-up preferences
    setPreferences(savedPreferencesBackup)
    setShowPreferences(false)
  }, [savedPreferencesBackup])

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
    } catch (e) {
      // If localStorage is unavailable, continue anyway
      console.warn('Unable to save preferences to localStorage:', e)
    }
    applyConsent(allAccepted, savedPreferencesBackup)
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
    } catch (e) {
      // If localStorage is unavailable, continue anyway
      console.warn('Unable to save preferences to localStorage:', e)
    }

    // Delete third-party cookies when consent is withdrawn
    deleteAnalyticsCookies()

    applyConsent(onlyNecessary, savedPreferencesBackup)
    setSavedPreferencesBackup(onlyNecessary)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    } catch (e) {
      // If localStorage is unavailable, continue anyway
      console.warn('Unable to save preferences to localStorage:', e)
    }
    applyConsent(preferences, savedPreferencesBackup)
    setSavedPreferencesBackup(preferences)
    setShowBanner(false)
    setShowPreferences(false)
  }

  const handleShowPreferences = () => {
    // Backup current preferences in case user cancels
    setSavedPreferencesBackup(preferences)
    setShowPreferences(true)
  }

  return {
    showBanner,
    showPreferences,
    preferences,
    setPreferences,
    handleAcceptAll,
    handleDeclineAll,
    handleSavePreferences,
    handleCancelPreferences,
    handleShowPreferences,
  }
}
