/**
 * GA4 delivery mode: exactly one path may reach the property.
 *
 * Under GA_DELIVERY='gtm', GTM's GA4 Event tags fire from the dataLayer
 * push, so trackConversion() must NOT also call gtag('event', …). Doing
 * both sends every conversion twice — and because both hits are
 * individually valid, GA4 reports no error and the inflated numbers look
 * entirely plausible. Nothing surfaces the mistake except reading the
 * code or noticing conversions have suspiciously doubled, so it is worth
 * a test that fails loudly instead.
 *
 * GA_DELIVERY is resolved from the environment at module load, so each
 * case re-imports the module inside jest.isolateModules with the env set.
 */

type GtagMock = jest.Mock

function loadWith(delivery: string | undefined): {
  track: typeof import('@/lib/analytics-events').trackConversion
  events: typeof import('@/lib/analytics-events').CONVERSION_EVENTS
  gtag: GtagMock
} {
  const previous = process.env.NEXT_PUBLIC_GA_DELIVERY
  if (delivery === undefined) delete process.env.NEXT_PUBLIC_GA_DELIVERY
  else process.env.NEXT_PUBLIC_GA_DELIVERY = delivery

  const gtag: GtagMock = jest.fn()
  ;(window as unknown as { gtag: GtagMock }).gtag = gtag
  ;(window as unknown as { dataLayer: unknown[] }).dataLayer = []

  let mod!: typeof import('@/lib/analytics-events')
  jest.isolateModules(() => {
    // jest.isolateModules runs synchronously, so this has to be require()
    // rather than a dynamic import — the point is to re-evaluate the
    // module with a different env value, which an ESM import cannot do.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    mod = require('@/lib/analytics-events')
  })

  if (previous === undefined) delete process.env.NEXT_PUBLIC_GA_DELIVERY
  else process.env.NEXT_PUBLIC_GA_DELIVERY = previous

  return { track: mod.trackConversion, events: mod.CONVERSION_EVENTS, gtag }
}

function dataLayerEvents(): { event?: string }[] {
  return (window as unknown as { dataLayer: { event?: string }[] }).dataLayer.filter(
    (e) => typeof e?.event === 'string'
  )
}

describe('GA4 delivery mode', () => {
  it("does NOT call gtag under 'gtm' delivery — GTM forwards the dataLayer push", () => {
    const { track, events, gtag } = loadWith('gtm')
    track(events.DONATE_OPEN, { conversion_id: 'abc' })

    expect(gtag).not.toHaveBeenCalled()
    expect(dataLayerEvents()).toHaveLength(1)
    expect(dataLayerEvents()[0]).toMatchObject({ event: 'donate_open', conversion_id: 'abc' })
  })

  it("calls gtag exactly once under 'direct' delivery, and still pushes to the dataLayer", () => {
    const { track, events, gtag } = loadWith('direct')
    track(events.DONATE_OPEN, { conversion_id: 'abc' })

    expect(gtag).toHaveBeenCalledTimes(1)
    expect(gtag).toHaveBeenCalledWith('event', 'donate_open', { conversion_id: 'abc' })
    expect(dataLayerEvents()).toHaveLength(1)
  })

  // The default must be the mode that MEASURES. Under 'gtm' this site
  // emits no GA4 itself, so defaulting there would mean a deploy that
  // preceded the GTM publish silently measured nothing at all.
  it("defaults to 'direct' when the env var is unset", () => {
    const { track, events, gtag } = loadWith(undefined)
    track(events.VOLUNTEER_APPLY)
    expect(gtag).toHaveBeenCalledTimes(1)
  })

  it("treats any unrecognised value as 'direct' rather than guessing", () => {
    const { track, events, gtag } = loadWith('GTM')
    track(events.VOLUNTEER_APPLY)
    expect(gtag).toHaveBeenCalledTimes(1)
  })
})
