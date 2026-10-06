import { zeffyPopupLink, zeffyHostedUrl, ZEFFY_BASE } from '../../src/data/donation-campaigns'

describe('donation-campaigns', () => {
  describe('zeffyPopupLink', () => {
    it('builds a popup link with a normal path', () => {
      const result = zeffyPopupLink('donation-form/my-slug')
      expect(result).toBe(`${ZEFFY_BASE}/embed/donation-form/my-slug?modal=true`)
    })

    it('removes a leading slash from the path', () => {
      const result = zeffyPopupLink('/donation-form/my-slug')
      expect(result).toBe(`${ZEFFY_BASE}/embed/donation-form/my-slug?modal=true`)
    })
  })

  describe('zeffyHostedUrl', () => {
    it('converts an embed URL to a hosted URL by removing /embed/ and the modal parameter', () => {
      const embedUrl = `${ZEFFY_BASE}/embed/donation-form/my-slug?modal=true`
      const result = zeffyHostedUrl(embedUrl)
      expect(result).toBe(`${ZEFFY_BASE}/donation-form/my-slug`)
    })

    it('preserves other query parameters while removing modal', () => {
      const embedUrl = `${ZEFFY_BASE}/embed/donation-form/my-slug?modal=true&locale=en&utm_source=test`
      const result = zeffyHostedUrl(embedUrl)
      expect(result).toBe(`${ZEFFY_BASE}/donation-form/my-slug?locale=en&utm_source=test`)
    })

    it('works correctly if modal parameter is absent or has a different value', () => {
      const embedUrl1 = `${ZEFFY_BASE}/embed/donation-form/my-slug`
      expect(zeffyHostedUrl(embedUrl1)).toBe(`${ZEFFY_BASE}/donation-form/my-slug`)

      const embedUrl2 = `${ZEFFY_BASE}/embed/donation-form/my-slug?modal=false&foo=bar`
      expect(zeffyHostedUrl(embedUrl2)).toBe(`${ZEFFY_BASE}/donation-form/my-slug?foo=bar`)
    })
  })
})
