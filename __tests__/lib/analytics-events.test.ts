import {
  CONVERSION_EVENTS,
  classifyConversionHref,
  conversionAttrs,
  isConversionEvent,
} from '@/lib/analytics-events'

/**
 * The conversion classifier decides, from a URL alone, whether a click is
 * one of the three primary conversions. It runs on every link the site
 * renders, so both directions matter: missing a real donate link loses a
 * conversion, and matching an unrelated link invents one.
 *
 * The false-positive direction is the easier one to get wrong. The site
 * links to Zeffy's own marketing and privacy pages as well as to nine
 * campaigns, and to ffcadmin.org for far more than volunteer roles.
 */
describe('classifyConversionHref', () => {
  describe('donations', () => {
    it.each([
      [
        'embed pop-up link',
        'https://www.zeffy.com/embed/donation-form/abc-123?modal=true',
        'abc-123',
      ],
      ['hosted form link', 'https://www.zeffy.com/donation-form/abc-123', 'abc-123'],
      [
        'ticketing campaign',
        'https://www.zeffy.com/ticketing/free-for-charity-annual-gala',
        'free-for-charity-annual-gala',
      ],
      ['membership campaign', 'https://www.zeffy.com/membership/global-admins', 'global-admins'],
      [
        'shop campaign',
        'https://www.zeffy.com/shop/free-for-charitys-shop',
        'free-for-charitys-shop',
      ],
      ['locale-prefixed', 'https://www.zeffy.com/en-US/donation-form/abc-123', 'abc-123'],
      ['apex host', 'https://zeffy.com/donation-form/abc-123', 'abc-123'],
    ])('classifies a %s as donate_open', (_label, href, expectedId) => {
      const result = classifyConversionHref(href)
      expect(result?.event).toBe(CONVERSION_EVENTS.DONATE_OPEN)
      expect(result?.params.conversion_id).toBe(expectedId)
    })

    // These are all links the site actually renders.
    it.each([
      [
        "Zeffy's legal page on their support subdomain (linked from /cookie-policy/)",
        'https://support.zeffy.com/legal-data-privacy-security',
      ],
      ['the Zeffy homepage with a trailing slash', 'https://www.zeffy.com/'],
      ['the Zeffy homepage without one', 'https://www.zeffy.com'],
      ['a lookalike domain', 'https://evilzeffy.com/donation-form/abc-123'],
    ])('does NOT classify %s as a donation', (_label, href) => {
      expect(classifyConversionHref(href)).toBeNull()
    })
  })

  describe('volunteering', () => {
    it('classifies an Idealist posting', () => {
      const result = classifyConversionHref('https://www.idealist.org/en/volop/abc')
      expect(result?.event).toBe(CONVERSION_EVENTS.VOLUNTEER_APPLY)
    })

    it('classifies an ffcadmin volunteer role and captures the role', () => {
      const result = classifyConversionHref('https://ffcadmin.org/volunteer/web-developer/')
      expect(result?.event).toBe(CONVERSION_EVENTS.VOLUNTEER_APPLY)
      expect(result?.params.conversion_id).toBe('web-developer')
    })

    it('does not classify other ffcadmin pages', () => {
      expect(classifyConversionHref('https://ffcadmin.org/continuing-education/')).toBeNull()
    })
  })

  describe('service applications', () => {
    it.each([
      ['a=add&pid', 'https://freeforcharity.org/hub/cart.php?a=add&pid=16', '16'],
      ['a=confproduct&i', 'https://freeforcharity.org/hub/cart.php?a=confproduct&i=3', '3'],
      ['www host', 'https://www.freeforcharity.org/hub/cart.php?a=add&pid=33', '33'],
    ])('classifies %s as service_application_start', (_label, href, expectedId) => {
      const result = classifyConversionHref(href)
      expect(result?.event).toBe(CONVERSION_EVENTS.SERVICE_APPLICATION_START)
      expect(result?.params.conversion_id).toBe(expectedId)
    })

    it('ignores a cart on somebody else’s host', () => {
      expect(
        classifyConversionHref('https://attacker.example/hub/cart.php?a=add&pid=16')
      ).toBeNull()
    })

    it('ignores the hub cart with no product', () => {
      expect(classifyConversionHref('https://freeforcharity.org/hub/cart.php')).toBeNull()
    })
  })

  describe('everything else', () => {
    it.each([
      ['an internal page', '/about-us/'],
      ['the hub root', 'https://freeforcharity.org/hub/'],
      ['an unrelated external site', 'https://example.com/donate'],
      ['a mailto link', 'mailto:someone@freeforcharity.org'],
      ['a malformed href', 'ht!tp://['],
    ])('returns null for %s', (_label, href) => {
      expect(classifyConversionHref(href)).toBeNull()
    })
  })
})

describe('isConversionEvent', () => {
  it('accepts every declared event', () => {
    Object.values(CONVERSION_EVENTS).forEach((event) => {
      expect(isConversionEvent(event)).toBe(true)
    })
  })

  it('rejects anything else', () => {
    expect(isConversionEvent('page_view')).toBe(false)
    expect(isConversionEvent('')).toBe(false)
  })
})

describe('conversionAttrs', () => {
  it('emits the event attribute alone when no params are given', () => {
    expect(conversionAttrs(CONVERSION_EVENTS.DONATE_OPEN)).toEqual({
      'data-ffc-conversion': 'donate_open',
    })
  })

  it('omits empty optional params rather than emitting blank attributes', () => {
    expect(
      conversionAttrs(CONVERSION_EVENTS.DONATE_OPEN, { conversion_label: '', conversion_id: '' })
    ).toEqual({ 'data-ffc-conversion': 'donate_open' })
  })

  it('includes params that are supplied', () => {
    expect(
      conversionAttrs(CONVERSION_EVENTS.SERVICE_APPLICATION_START, {
        conversion_label: 'Apply as a 501(c)(3) charity',
        conversion_id: '33',
      })
    ).toEqual({
      'data-ffc-conversion': 'service_application_start',
      'data-ffc-conversion-label': 'Apply as a 501(c)(3) charity',
      'data-ffc-conversion-id': '33',
    })
  })
})
