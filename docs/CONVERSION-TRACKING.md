# Conversion tracking

How freeforcharity.org measures its three primary conversions, and the consent
model that decides what reaches Google.

Tracking issue:
[#505](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/505).
GA4 Admin side:
[FFC-Cloudflare-Automation#869](https://github.com/FreeForCharity/FFC-Cloudflare-Automation/issues/869).

## The three conversions

| Event                       | Fires when                                              | Where                                          |
| --------------------------- | ------------------------------------------------------- | ---------------------------------------------- |
| `donate_open`               | A Zeffy campaign form is opened (pop-up button or link) | `ZeffyPopupButton`, any Zeffy **campaign** URL |
| `volunteer_apply`           | A volunteer role application link is followed off-site  | Idealist postings, `ffcadmin.org/volunteer/*`  |
| `service_application_start` | A WHMCS product order form is opened                    | Any `/hub/cart.php` product link on our origin |

Plus one supporting funnel step:

| Event              | Fires when                                       |
| ------------------ | ------------------------------------------------ |
| `donate_form_view` | An embedded Zeffy form actually mounts on screen |

**All three primary events must be marked as Key Events in GA4 Admin.** Emitting
an event is not enough — an event that isn't a Key Event contributes nothing to
`keyEvents` and shows up nowhere in conversion reporting.

Done on property `386764754` on 2026-07-25, `ONCE_PER_SESSION` for all three
(a visitor who clicks three campaign buttons is one donation intent, not three):

| Key event                   | id            |
| --------------------------- | ------------- |
| `donate_open`               | `15324200900` |
| `volunteer_apply`           | `15324276068` |
| `service_application_start` | `15324231572` |

Worth knowing why the property read `keyEvents: 0` for its entire history: the
only key event configured was **`purchase`**, auto-created 2023-06-17, and this
site has never sent a `purchase` event. The single configured conversion was one
that could not fire.

Reproducing this on other FFC properties is FFC-Cloudflare-Automation#869
(workflow 506) — the container-per-charity model means every new GA4 property
starts in exactly the same state.

### Why these events and not "donations"

Every one of the three funnels leaves this site before it completes:

- **Donations** finish inside Zeffy — a cross-origin iframe on `/donate`, or
  `zeffy.com` in a new tab. The site cannot observe the submit.
- **Volunteering** finishes on Idealist or `ffcadmin.org`, which is a separate
  GA4 property with no cross-domain linking configured.
- **Service applications** finish in WHMCS at `/hub/cart.php?a=complete` — same
  hostname, different application, no Google tag on it.

So the site measures the last thing it genuinely observes: the visitor
committing to the handoff. These are **intent** conversions, and they should be
read that way — `donate_open` is not a donation. Completion-side tracking (a
Zeffy thank-you redirect, a tag on the WHMCS complete page) is follow-up work.

For service applications there is already an independent completion counter: the
WHMCS-side funnel beacon in [`funnel-beacon.md`](./funnel-beacon.md) records
`view` and `complete` per product id. Expect `service_application_start` to run
**lower** than the beacon's `view` count — the beacon fires server-side for
everyone, while GA4 needs consent-mode measurement and loses ad-blocked traffic.
A large divergence means something is broken; a modest one is normal.

## How events get emitted

`src/lib/analytics-events.ts` is the contract, and how an event reaches GA4
depends on **`GA_DELIVERY`** in `src/lib/analytics-config.ts`:

| Mode                  | What `trackConversion()` does               | Where GA4 is configured                     |
| --------------------- | ------------------------------------------- | ------------------------------------------- |
| `gtm` (default, live) | `dataLayer.push` **only**                   | GTM's Google tag in container `GTM-NJ4DXH9` |
| `direct`              | `gtag('event', …)` **and** `dataLayer.push` | this site's own `gtag('config', …)`         |

Under `gtm`, GTM's GA4 Event tags listen for these event names on the dataLayer
and forward them, so calling `gtag` as well would send each conversion twice.
Under `direct`, the dataLayer copy is still pushed so GTM can drive Google Ads,
Meta, or anything else off the same event.

> **Exactly one path may reach a given GA4 property.** Both are individually
> valid hits, so a double-count raises no error anywhere — it silently doubles
> the numbers the charity makes decisions on.
> `__tests__/lib/analytics-delivery.test.ts` asserts the gating in both modes,
> and `assertGaDeliveryIsExclusive()` in `tests/analytics-loading.spec.ts`
> asserts it end to end.

The mode is overridable at build time with `NEXT_PUBLIC_GA_DELIVERY`, so the
cutover can be reverted without a code change if GTM misbehaves in production.

### Cutover order (issue #510)

**`gtm` is the committed default, which means this repo alone cannot deliver
GA4.** Under `gtm` the site emits nothing itself, so measurement is live only
once GTM container version 2 has been **published** — a step that happens in Tag
Manager, not here, and that no test or build in this repo can verify. Deploying
and assuming measurement resumed is the mistake to avoid.

It was briefly defaulted to `direct` before the cutover so that merging could not
silently disable GA4 before anyone had decided to switch — an _accidental_
cutover is the dangerous one, since a forgotten publish leaves zero measurement.

GTM publishes are instant and decoupled from the site deploy, so the order is:

1. Deploy with `GA_DELIVERY = 'gtm'`. **A brief measurement gap starts here** —
   the site no longer fires GA4 and GTM has no live tag yet.
2. Publish GTM container version 2. Measurement resumes; the gap closes.
3. Verify in GA4 Realtime that pageviews and all four events arrive, and that
   counts are not doubled.
4. Verify in Tag Assistant that a donate link carries `_gl`. Under `gtm`,
   cross-domain comes from the `linker_domains` entry on the Google tag, which
   is stored but unverified.

Reversing 1 and 2 means both paths fire GA4 until the deploy lands, which
double-counts every pageview for consenting visitors.

**To roll back**, rebuild with `NEXT_PUBLIC_GA_DELIVERY=direct` and redeploy.
That restores the self-contained gtag path, including the verified `linker`.
Unpublishing the GTM version alone would leave no GA4 at all, since under `gtm`
the site emits none itself.

### Tagging a CTA

Most CTAs need nothing. `classifyConversionHref()` recognises the destination, so
new apply and donate buttons are tracked the moment they ship. This is
deliberate: the site reaches these destinations from ~20 components, and
hand-tagging each one guarantees the next new CTA is silently untracked.

What it matches, precisely:

| Destination  | Matches                                                                                                                                                        | Does NOT match                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Zeffy        | **campaign URLs only** — `/<type>/<slug>`, optionally prefixed by a locale and/or `embed`, where type is `donation-form`, `ticketing`, `membership`, or `shop` | Zeffy's own marketing, support, and legal pages, which this site links to as well |
| Idealist     | any `idealist.org` link                                                                                                                                        | —                                                                                 |
| ffcadmin.org | `/volunteer/*` only                                                                                                                                            | every other ffcadmin page                                                         |
| WHMCS        | `/hub/cart.php` with a `pid` or `i` product, **on our own origin**                                                                                             | the hub root, a cart with no product, an off-site `cart.php`                      |

The Zeffy narrowing is not incidental. Matching the host alone counted the link
to Zeffy's legal page — which [`/cookie-policy/`](../src/app/cookie-policy/page.tsx)
renders — as donation intent, filed under a `conversion_id` taken from the policy
URL. Host matching is exact-or-subdomain throughout, so a lookalike domain cannot
mint conversions either. `__tests__/lib/analytics-events.test.ts` pins both
directions.

Add explicit attributes only when the component knows something the URL does
not, such as a campaign name:

```tsx
import { conversionAttrs, CONVERSION_EVENTS } from '@/lib/analytics-events'

<a href={…} {...conversionAttrs(CONVERSION_EVENTS.DONATE_OPEN, {
  conversion_label: 'Website Design and Development',
  conversion_id: 'web-design',
})}>
```

Explicit attributes win over classification. Both paths run through one
delegated listener (`src/components/analytics/ConversionTracking.tsx`) in the
capture phase, so tracked buttons stay **server components** and Zeffy's own
click handler can't swallow the event.

### Parameters

`conversion_label`, `conversion_id`, `conversion_source` (the page path), and
`conversion_destination` (the destination host). Nothing identifying: what was
clicked and where from, never who clicked it.

To report on these in GA4 they must be registered as **custom dimensions**
(Admin → Custom definitions), event-scoped, matching the parameter names above —
otherwise they are collected but not queryable. All four were registered on
property `386764754` on 2026-07-25, alongside the pre-existing `event_category`
and `event_label`.

## Consent model

Policy: **the most permissive configuration Google allows.**

Google's EU User Consent Policy binds FFC as a Google Analytics/Ads customer and
requires opt-in consent before setting cookies or reading identifiers for
visitors in the EEA, the UK, and Switzerland. No equivalent Google-imposed gate
exists elsewhere. So `src/lib/consent-mode.ts` sets **Consent Mode v2** defaults:

| Visitor location     | Default storage state | What GA4 does before a choice           |
| -------------------- | --------------------- | --------------------------------------- |
| EEA, UK, Switzerland | denied                | cookieless pings (modelled, no cookies) |
| Everywhere else      | granted               | full cookie-based measurement           |

`wait_for_update: 500` holds tags briefly so a returning visitor's stored choice
applies before the first hit. `url_passthrough` and `ads_data_redaction` keep
click ids usable and ad identifiers stripped while storage is denied.

### What changed, and why it collects more

Previously the GA4, GTM, and Clarity **scripts did not load at all** until a
visitor clicked "Accept All" (`analytics` defaulted to `false`). Every visitor
who ignored the banner was invisible — worldwide, not just in the EEA. That was
strictly more restrictive than Google requires.

Now the tags load on every pageview and consent controls _storage_ rather than
_loading_:

- Ignoring the banner outside the EEA/UK/CH → fully measured.
- Ignoring it inside the EEA/UK/CH → measured cookielessly.
- **Declining** anywhere → still measured cookielessly, rather than vanishing.

Two tags are excluded from that permissive default, because Consent Mode is a
Google protocol and neither speaks it:

- **Microsoft Clarity** requires explicit analytics consent, not merely the
  absence of a decline. It records session replays and has no cookieless mode to
  degrade to, so an undecided EEA visitor would be fully recorded rather than
  modelled — and the preferences dialog, which shows analytics unchecked until
  opt-in, would be misrepresenting what is running. The cost is nil against what
  this site needs to measure: Clarity is a heatmap/replay tool and contributes
  nothing to the three conversion events.
- **The Meta Pixel** stays gated on marketing consent for the same reason —
  loading it unconsented is a real disclosure rather than a modelled one.

The bootstrap is an inline `<head>` script in `src/app/layout.tsx`, not a
`next/script` — the consent state must already be in the dataLayer when the
Google tags initialise, and nothing else guarantees that ordering.

## Verifying

- `tests/analytics-loading.spec.ts` — tags load for an undecided visitor,
  consent defaults are present before any Google tag, declining flips storage to
  denied.
- `tests/conversion-events.spec.ts` — each CTA pushes the right event with the
  right parameters.
- GA4 **Realtime → Event count by Event name** shows the events within minutes
  of a click on production.
- `keyEvents` in the daily workflow 502 report
  (`FFC-IN-ffcadmin.org/public/data/google-analytics/freeforcharity.org.json`)
  goes non-zero once the events are marked as Key Events — that file is the
  scoreboard for whether this actually worked.
