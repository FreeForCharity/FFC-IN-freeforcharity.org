import { zeffyHostedUrl } from '../../src/data/donation-campaigns'

describe('donation-campaigns data', () => {
  describe('zeffyHostedUrl', () => {
    it('replaces /embed/ with / and removes the modal parameter', () => {
      const input = 'https://www.zeffy.com/embed/donation-form/1234?modal=true'
      const expected = 'https://www.zeffy.com/donation-form/1234'
      expect(zeffyHostedUrl(input)).toBe(expected)
    })

    it('preserves other query parameters while removing modal', () => {
      const input =
        'https://www.zeffy.com/embed/donation-form/1234?modal=true&lang=en&utm_source=twitter'
      const expected = 'https://www.zeffy.com/donation-form/1234?lang=en&utm_source=twitter'
      expect(zeffyHostedUrl(input)).toBe(expected)
    })

    it('works correctly if modal parameter is not present', () => {
      const input = 'https://www.zeffy.com/embed/donation-form/1234?lang=fr'
      const expected = 'https://www.zeffy.com/donation-form/1234?lang=fr'
      expect(zeffyHostedUrl(input)).toBe(expected)
    })

    it('works correctly if /embed/ is not present (only removes modal)', () => {
      const input = 'https://www.zeffy.com/donation-form/1234?modal=true&lang=en'
      const expected = 'https://www.zeffy.com/donation-form/1234?lang=en'
      expect(zeffyHostedUrl(input)).toBe(expected)
    })

    it('throws an error if the URL is invalid', () => {
      const input = 'not-a-valid-url'
      expect(() => zeffyHostedUrl(input)).toThrow()
    })
  })
})
