'use client'

import { useCookieConsent } from './use-cookie-consent'
import { CookieBanner } from './cookie-banner'
import { CookiePreferencesModal } from './cookie-preferences-modal'

export default function CookieConsent() {
  const {
    showBanner,
    showPreferences,
    preferences,
    setPreferences,
    handleAcceptAll,
    handleDeclineAll,
    handleSavePreferences,
    handleCancelPreferences,
    handleShowPreferences,
  } = useCookieConsent()

  if (!showBanner) {
    return null
  }

  if (showPreferences) {
    return (
      <CookiePreferencesModal
        preferences={preferences}
        setPreferences={setPreferences}
        onSave={handleSavePreferences}
        onCancel={handleCancelPreferences}
        showPreferences={showPreferences}
      />
    )
  }

  return (
    <CookieBanner
      onDeclineAll={handleDeclineAll}
      onShowPreferences={handleShowPreferences}
      onAcceptAll={handleAcceptAll}
    />
  )
}
