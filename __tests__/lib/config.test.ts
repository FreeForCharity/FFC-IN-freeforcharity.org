/**
 * src/lib/config — hub URL helpers
 *
 * Verifies the SITE_ORIGIN env wiring and the three /hub/ URL builders
 * that ship in every component link to the WHMCS billing portal. These
 * helpers are depended on by 11+ components — a regression here breaks
 * every hub link sitewide.
 */

describe('src/lib/config', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_ORIGIN
  let mod: typeof import('@/lib/config')

  // Use isolateModules + dynamic import alternative so each test gets a
  // fresh module evaluation (config.ts reads process.env at import time).
  // require() is forbidden by @typescript-eslint/no-require-imports;
  // jest.requireActual is the typed-friendly equivalent.
  function reloadModule() {
    jest.resetModules()
    mod = jest.requireActual('@/lib/config')
  }

  afterEach(() => {
    if (originalEnv === undefined) delete process.env.NEXT_PUBLIC_SITE_ORIGIN
    else process.env.NEXT_PUBLIC_SITE_ORIGIN = originalEnv
  })

  describe('SITE_ORIGIN', () => {
    it('defaults to production when env var is unset', () => {
      delete process.env.NEXT_PUBLIC_SITE_ORIGIN
      reloadModule()
      expect(mod.SITE_ORIGIN).toBe('https://freeforcharity.org')
    })

    it('honors NEXT_PUBLIC_SITE_ORIGIN when set', () => {
      process.env.NEXT_PUBLIC_SITE_ORIGIN = 'https://staging.freeforcharity.org'
      reloadModule()
      expect(mod.SITE_ORIGIN).toBe('https://staging.freeforcharity.org')
    })

    it('strips a single trailing slash from the env var', () => {
      process.env.NEXT_PUBLIC_SITE_ORIGIN = 'https://staging.freeforcharity.org/'
      reloadModule()
      expect(mod.SITE_ORIGIN).toBe('https://staging.freeforcharity.org')
    })

    it('strips multiple trailing slashes from the env var', () => {
      process.env.NEXT_PUBLIC_SITE_ORIGIN = 'https://staging.freeforcharity.org///'
      reloadModule()
      expect(mod.SITE_ORIGIN).toBe('https://staging.freeforcharity.org')
    })
  })

  describe('hubUrl()', () => {
    beforeEach(() => {
      delete process.env.NEXT_PUBLIC_SITE_ORIGIN
      reloadModule()
    })

    it('returns the hub root with trailing slash when called with no args', () => {
      expect(mod.hubUrl()).toBe('https://freeforcharity.org/hub/')
    })

    it('returns the hub root for an empty string', () => {
      expect(mod.hubUrl('')).toBe('https://freeforcharity.org/hub/')
    })

    it('returns the hub root for a single slash', () => {
      expect(mod.hubUrl('/')).toBe('https://freeforcharity.org/hub/')
    })

    it('appends a leading-slash subpath as-is', () => {
      expect(mod.hubUrl('/globaladmin')).toBe('https://freeforcharity.org/hub/globaladmin')
    })

    it('prepends a slash to a bare subpath', () => {
      expect(mod.hubUrl('globaladmin')).toBe('https://freeforcharity.org/hub/globaladmin')
    })
  })

  describe('hubCart()', () => {
    beforeEach(() => {
      delete process.env.NEXT_PUBLIC_SITE_ORIGIN
      reloadModule()
    })

    it('builds the cart URL for a numeric product ID', () => {
      expect(mod.hubCart(3)).toBe('https://freeforcharity.org/hub/cart.php?a=confproduct&i=3')
    })

    it('URL-encodes string product IDs', () => {
      expect(mod.hubCart('hello world')).toBe(
        'https://freeforcharity.org/hub/cart.php?a=confproduct&i=hello%20world'
      )
    })

    it('URL-encodes ampersands so they cannot break the query string', () => {
      expect(mod.hubCart('a&b')).toBe(
        'https://freeforcharity.org/hub/cart.php?a=confproduct&i=a%26b'
      )
    })
  })

  describe('hubStore()', () => {
    beforeEach(() => {
      delete process.env.NEXT_PUBLIC_SITE_ORIGIN
      reloadModule()
    })

    it('appends the slug under /hub/store/', () => {
      expect(mod.hubStore('ffc-consulting/nonprofit-charity-onboarding')).toBe(
        'https://freeforcharity.org/hub/store/ffc-consulting/nonprofit-charity-onboarding'
      )
    })

    it('strips a leading slash from the slug', () => {
      expect(mod.hubStore('/free-package')).toBe(
        'https://freeforcharity.org/hub/store/free-package'
      )
    })
  })

  describe('staging-origin override', () => {
    it('propagates NEXT_PUBLIC_SITE_ORIGIN through every helper', () => {
      process.env.NEXT_PUBLIC_SITE_ORIGIN = 'https://staging.freeforcharity.org/'
      reloadModule()
      expect(mod.hubUrl()).toBe('https://staging.freeforcharity.org/hub/')
      expect(mod.hubCart(8)).toBe(
        'https://staging.freeforcharity.org/hub/cart.php?a=confproduct&i=8'
      )
      expect(mod.hubStore('x/y')).toBe('https://staging.freeforcharity.org/hub/store/x/y')
    })
  })
})
