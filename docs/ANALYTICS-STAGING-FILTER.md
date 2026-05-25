# Keeping staging / dev traffic out of production analytics

**Context:** the GA4, GTM, and Clarity IDs are committed defaults
(`src/lib/analytics-config.ts`), so the same build fires analytics on
**every** hostname it's served from — production (`freeforcharity.org`),
the pre-flip staging subdomain, and `localhost` during dev. The IDs are
not domain-locked; GA4/Clarity accept hits from any origin.

That's intentional (it lets you validate analytics on staging before the
flip), but it means production reporting will include staging + dev hits
unless you filter them out. This doc is the operator runbook for that.

The volume is usually tiny (staging validation is a short window, dev
hits require a developer to accept the cookie banner on localhost), so
this is data-hygiene, not an emergency.

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

### Option B — Stop collection entirely (stronger, more setup)

If you'd rather staging hits never reach GA4 at all, use the
`traffic_type` parameter + Internal Traffic data filter:

1. The site would need to send `traffic_type: 'internal'` on the GA4
   config call when `location.hostname !== 'freeforcharity.org'`. That's
   a small code change — **ask and we'll add it**; it's deliberately not
   in the build today because you chose the report-filter approach.
2. GA4 → Admin → Data Settings → **Data Filters** → the built-in
   _Internal Traffic_ filter is set to **Exclude** `traffic_type = internal`.

Until that code change lands, Option A is the working path.

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

GTM itself doesn't "collect" — it just fires tags. If you later move GA4
_into_ GTM (instead of the current direct gtag), add a **trigger
exception** so the GA4 tag only fires when the built-in `Page Hostname`
variable equals `freeforcharity.org`. That's the cleanest "never collect
from staging" option and supersedes GA4 Option B. (Today GA4 fires
directly, not via GTM, so this doesn't apply yet.)

---

## After the flip

Once WordPress is retired and only `freeforcharity.org` serves the
Next.js export, staging stops existing and the only non-prod hits are
occasional localhost dev sessions. The Option A report filter keeps
those out indefinitely with no maintenance.
