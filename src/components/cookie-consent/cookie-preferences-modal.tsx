import { useRef, useEffect } from 'react'
import { CookiePreferences } from './types'

interface CookiePreferencesModalProps {
  preferences: CookiePreferences
  setPreferences: (prefs: CookiePreferences) => void
  onSave: () => void
  onCancel: () => void
  showPreferences: boolean
}

export function CookiePreferencesModal({
  preferences,
  setPreferences,
  onSave,
  onCancel,
  showPreferences,
}: CookiePreferencesModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

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
          onCancel()
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
  }, [showPreferences, onCancel])

  if (!showPreferences) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-preferences-title"
      onClick={(e) => {
        // Only close if clicking the overlay itself, not the modal content
        if (e.target === e.currentTarget) {
          onCancel()
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
            choose which types of cookies you allow.
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
              features like page navigation and access to secure areas. The website cannot function
              properly without these cookies.
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
              core services. This includes our donation processing system which requires cookies to
              function properly.
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
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="sr-only peer"
                  aria-label="Enable analytics cookies"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              These cookies help us understand how visitors interact with our website by collecting
              and reporting information anonymously. We use Google Analytics and Microsoft Clarity.
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
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="sr-only peer"
                  aria-label="Enable marketing cookies"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              These cookies are used to track visitors across websites. The intention is to display
              ads that are relevant and engaging for the individual user.
            </p>
            <p className="text-xs text-gray-500">Services: Meta Pixel (Facebook)</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={onSave}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Save Preferences
            </button>
            <button
              onClick={onCancel}
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
