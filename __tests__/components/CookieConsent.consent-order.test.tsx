/**
 * Ordering contract: the Consent Mode update must be queued BEFORE the
 * custom `consent_update` event.
 *
 * Both writes reach the same `window.dataLayer` queue and GTM processes it
 * in order, so a container trigger keyed on `consent_update` would otherwise
 * evaluate consent state from before the visitor's choice — granting itself
 * permission the visitor had just withdrawn. The two calls sit adjacent in
 * `applyConsent` with nothing but a comment holding them in order, which is
 * precisely the kind of constraint a later edit reverses without noticing.
 *
 * What this asserts is the CALL order that produces the queue order.
 * `updateGoogleConsent` reaches the queue through `window.gtag`, which is a
 * mock here, so the Consent Mode call never actually lands in `dataLayer`
 * during the test. That is enough to discriminate the defect — swapping the
 * two makes this fail — but it is not a direct assertion about dataLayer
 * contents, and saying so is cheaper than implying a stronger guarantee.
 *
 * `updateGoogleConsent` returns early unless `window.gtag` is a function, so
 * installing the mock is load-bearing rather than incidental: without it the
 * observation point never runs and every case here would pass vacuously.
 */
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import CookieConsent from '../../src/components/cookie-consent'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock, configurable: true })

const STORED_DECLINE = JSON.stringify({
  necessary: true,
  functional: true,
  analytics: false,
  marketing: false,
})

describe('CookieConsent consent-update ordering', () => {
  /** Whether the custom event was already queued, sampled at each consent update. */
  let customEventPresentAtUpdate: boolean[]
  let gtagMock: jest.Mock

  const hasCustomEvent = () =>
    (window.dataLayer ?? []).some(
      (entry) => (entry as { event?: string } | undefined)?.event === 'consent_update'
    )

  beforeEach(() => {
    localStorageMock.clear()
    window.dataLayer = []
    customEventPresentAtUpdate = []
    gtagMock = jest.fn((...args: unknown[]) => {
      if (args[0] === 'consent' && args[1] === 'update') {
        customEventPresentAtUpdate.push(hasCustomEvent())
      }
    })
    window.gtag = gtagMock as unknown as typeof window.gtag
  })

  afterEach(() => {
    // The injected GA config script declares `function gtag()`, which lands on
    // window as non-configurable but writable — so reset by assignment.
    window.gtag = undefined
  })

  it('queues the Consent Mode update before the custom consent_update event', async () => {
    localStorageMock.setItem('cookie-consent', STORED_DECLINE)
    render(<CookieConsent />)

    await waitFor(() => {
      expect(customEventPresentAtUpdate.length).toBeGreaterThanOrEqual(1)
    })
    // At every consent update, the custom event had not been pushed yet.
    expect(customEventPresentAtUpdate.every((present) => present === false)).toBe(true)
  })

  it('still pushes the custom event, so the ordering case is not vacuous', async () => {
    // Without this, the case above would also pass if the custom event were
    // never pushed at all — which is a bug, not a fix.
    localStorageMock.setItem('cookie-consent', STORED_DECLINE)
    render(<CookieConsent />)

    await waitFor(() => {
      expect(hasCustomEvent()).toBe(true)
    })
  })

  it('carries the stored choice into the consent update', async () => {
    // Ordering is worthless if the update queued first holds the wrong value.
    localStorageMock.setItem('cookie-consent', STORED_DECLINE)
    render(<CookieConsent />)

    await waitFor(() => {
      expect(gtagMock).toHaveBeenCalledWith(
        'consent',
        'update',
        expect.objectContaining({ analytics_storage: 'denied', ad_storage: 'denied' })
      )
    })
  })
})
