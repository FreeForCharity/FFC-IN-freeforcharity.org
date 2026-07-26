# Keeping staging / dev traffic out of production analytics

**Context:** the GA4, GTM, and Clarity IDs are committed defaults
(`src/lib/analytics-config.ts`), so the same build fires analytics on
**every** hostname it's served from — production (`freeforcharity.org`),
the pre-flip staging subdomain, and `localhost` during dev. The IDs are
not domain-locked; GA4/Clarity accept hits from any origin.

That's intentional (it lets you validate analytics on staging before the
flip), but it means production reporting will include staging + dev hits
unless you filter them out. This doc is the operator runbook for that.

**This was originally filed as data-hygiene rather than an emergency, on
the reasoning that "the volume is usually tiny — dev hits require a
developer to accept the cookie banner on localhost." That reasoning was
wrong on both halves, and measured production data now contradicts it.**

Consent Mode removed the banner gate (tags load on the first pageview,
storage is what consent governs), so nothing has to be clicked for a
localhost hit to be recorded. And automated runs are not one-at-a-time:
each Playwright pass over the ~58-page sitemap produces a session per
page with a fresh client id. Hostname breakdown from the GA4 Data API:

| Date     | Hostname                 | Sessions  | Pageviews |
| -------- | ------------------------ | --------- | --------- |
| 20260723 | `www.freeforcharity.org` | 19        | 21        |
| 20260724 | `www.freeforcharity.org` | 9         | 8         |
| 20260724 | `localhost`              | 4         | 4         |
| 20260725 | `localhost`              | **1,019** | **1,318** |
| 20260725 | `www.freeforcharity.org` | 13        | 17        |
| 20260726 | `freeforcharity.org`     | 2         | 2         |

Real traffic runs ~10–20 sessions a day. A single day of local test runs
produced **1,019** — roughly half the property's entire 28-day session
count, and about 50× that day's real traffic. Nothing in GA4 marks it as
synthetic: the pages are real and the events are well-formed, so it
reads as a traffic surge.

Two things follow. First, the code-level guard is the actual fix and it
has landed: `isAutomatedBrowser()` in `src/lib/analytics-config.ts`
(PR #512) skips all tag loading when `navigator.webdriver` is set, which
covers Playwright, Puppeteer, and Lighthouse — i.e. every automated
source this repo runs. Second, the filters below are still needed, both
to exclude the ~1,000 sessions already collected (nothing here is
retroactive at the collection layer — only report filters can hide
history) and to catch hits from a hand-driven `npm run dev` browser,
which sets no `webdriver` flag and is therefore invisible to the guard.

---

## GA4 — exclude by hostname

GA4's built-in **Data Filters** (Admin → Data Settings → Data Filters)
only cover _Internal Traffic_ (by IP) and _Developer Traffic_ — there is
no one-click "hostname" data filter. Two realistic paths:

### Option A — Report-level hostname filter (simplest, recommended)

Collection still happens, but every report shows production only. Zero
risk of accidentally dropping real production data.

1. GA4 → **Reports** → any report → **Add comparison / Edit comparisons**
2. Build a comparison: **Dimension = `Hostname`**, **Match type = exactly matches**, **Value = `freeforcharity.org`**
3. Apply. For ad-hoc analysis, do the same in **Explore** → add a filter on the `Hostname` dimension.

You can also add `www.freeforcharity.org` with an "OR" condition if the
www host ever serves pages directly.

### Option B — Stop collection entirely (superseded — see [GTM](#gtm))

The original plan here was for **this site** to send
`traffic_type: 'internal'` on its GA4 config call whenever
`location.hostname !== 'freeforcharity.org'`, paired with the built-in
_Internal Traffic_ data filter set to **Exclude**.

That is no longer the right place for it. Since the issue #510 cutover
this site emits no GA4 config of its own (`GA_DELIVERY = 'gtm'`) — the
config belongs to GTM's Google tag, so the equivalent change is a GTM
field or, better, the hostname **trigger exception** in the GTM section
below. Don't add `traffic_type` to this codebase; it would have nothing
to attach to.

The data-filter half still applies if you go the GTM-field route: GA4 →
Admin → Data Settings → **Data Filters** → _Internal Traffic_ →
**Exclude** `traffic_type = internal`.

### Option C — IP-based Internal Traffic filter

If you always access staging from a known office/home IP:

1. GA4 → Admin → Data Streams → Web → **Configure tag settings** →
   **Define internal traffic** → add a rule matching your IP.
2. Admin → Data Settings → **Data Filters** → _Internal Traffic_ →
   set to **Exclude** and **Active**.

Catches staging _and_ your own dev hits in one rule, but only from the
listed IPs.

---

## Microsoft Clarity — staging noise

Clarity has no hostname data-filter either. Options, in order of effort:

- **Easiest:** ignore it. Clarity sessions are recordings/heatmaps;
  a handful of staging sessions during the validation window are obvious
  and harmless to skim past.
- **IP masking / blocking:** Clarity → Settings → **Setup** has an
  option to ignore specific IPs — add your dev/office IP if staging
  sessions are noisy.

---

## GTM

GTM itself doesn't "collect" — it just fires tags. **This section used to
say "today GA4 fires directly, not via GTM, so this doesn't apply yet."
That is no longer true:** GA4 delivery moved into GTM at the issue #510
cutover (`GA_DELIVERY = 'gtm'`, container version 2 published), so the
GTM path below is now live and is the strongest available fix.

Add a **trigger exception** so the GA4 tags only fire on production
hostnames:

1. GTM → **Triggers** → New → _Page View_ (or _Custom Event_ matching
   `.*` with regex, to cover the conversion events too)
2. Condition: built-in **Page Hostname** → **does not equal**
   `freeforcharity.org` — this is the blocking trigger
3. Add it as an **Exception** on the Google tag and on each of the four
   conversion event tags
4. Publish a new container version

This supersedes GA4 Option B, which is now obsolete as written: under
GTM delivery the GA4 config call is GTM's, not this site's, so
`traffic_type` would be a field on the GTM Google tag rather than a code
change here.

Unlike the code-level `navigator.webdriver` guard, a hostname exception
catches _every_ non-production hit — including a developer clicking
around a hand-run `npm run dev` server, which the guard cannot see. The
two are complementary, not redundant: the guard stops the hits before
they leave the browser (so they never cost anything), and the exception
is the catch-all for whatever the guard misses.

---

## After the flip

Once WordPress is retired and only `freeforcharity.org` serves the
Next.js export, staging stops existing and the only non-prod hits are
localhost dev sessions.

Do not read that as "so this stops mattering" — the 2026-07-25 figures
above are localhost dev/test hits **after** staging had already stopped
being the concern, and they were the largest single source of traffic in
the property. The `navigator.webdriver` guard plus the Option A report
comparison keep them out with no ongoing maintenance; the GTM hostname
exception closes the remaining hand-driven-`npm run dev` gap if you want
collection stopped rather than filtered.
