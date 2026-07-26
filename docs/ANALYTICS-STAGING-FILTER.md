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
page with a fresh client id.

**Sessions** by hostname, from the GA4 Data API (`sessions` metric,
`hostName` dimension). Every figure below is a session count, not
pageviews or events — the same unit the "sessions a day" comparisons
after the table use. `—` means the host reported no sessions that day at
all, i.e. the row is absent from the API response rather than zero-valued.

| Date     | `www.freeforcharity.org` | `freeforcharity.org` | `localhost` |
| -------- | ------------------------ | -------------------- | ----------- |
| 20260720 | 17                       | 7                    | 2           |
| 20260721 | 12                       | 5                    | —           |
| 20260722 | 22                       | 5                    | —           |
| 20260723 | 19                       | 5                    | —           |
| 20260724 | 9                        | 5                    | 4           |
| 20260725 | 13                       | 9                    | **1,019**   |
| 20260726 | 1                        | 2                    | —           |
| **Sum**  | **93**                   | **38**               | **1,025**   |

Real traffic runs ~15–25 sessions a day across both production hosts. A
single day of local test runs produced **1,019** — roughly half the
property's entire 28-day session count, and about 45× that day's real
traffic. Nothing in GA4 marks it as synthetic: the pages are real and
the events are well-formed, so it reads as a traffic surge.

Note the split between the two production hosts, because the filters
below depend on it: `www.` carries about 70% of real sessions and the
apex about 30%. **Both are ordinary production traffic** — the apex is
not a rounding error, and on 20260726 it actually outran `www.`. Any
filter or trigger condition that names only one host is wrong.

Two things follow. First, the code-level guard is the actual fix and it
has landed (PR #512): `isAutomatedBrowser()` in
`src/lib/analytics-config.ts` is the predicate — it reports whether
`navigator.webdriver` is set — and the early return that acts on it lives
in `loadDefaultTags()` in `src/components/cookie-consent/index.tsx`,
which returns before injecting anything. Between them that covers
Playwright, Puppeteer, and Lighthouse — i.e. every automated source this
repo runs. Second, the filters below are still needed, both
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
2. Build a comparison: **Dimension = `Hostname`**, **Match type = matches regex**, **Value = `^(www\.)?freeforcharity\.org$`**
3. Apply. For ad-hoc analysis, do the same in **Explore** → add a filter on the `Hostname` dimension.

**Match both hosts.** The hostname table above shows `www.` at ~70% of
real sessions and the apex at ~30%, so a comparison naming either one
alone silently discards a large slice of genuine traffic while looking
like it worked.

### Option B — Stop collection entirely (superseded — see [GTM](#gtm))

The original plan here was for **this site** to send
`traffic_type: 'internal'` on its GA4 config call whenever
`location.hostname !== 'freeforcharity.org'`, paired with the built-in
_Internal Traffic_ data filter set to **Exclude**.

That is no longer the right place for it **while `GA_DELIVERY = 'gtm'`**,
which is the default and what production has run since the issue #510
cutover. Under that mode the site emits no GA4 config of its own — the
config belongs to GTM's Google tag — so the equivalent change is a GTM
field or, better, the hostname **trigger exception** in the GTM section
below. Adding `traffic_type` to this codebase would have nothing to
attach to.

The qualifier is deliberate: `NEXT_PUBLIC_GA_DELIVERY=direct` restores
the self-contained gtag path (the documented rollback, and what a local
`direct` build exercises), and in _that_ mode this site does emit its own
config and a `traffic_type` field there would work. So if you are reading
this during a rollback, Option B is live again and the GTM section below
is the part that does not apply. Check which mode the build under
investigation actually used before trusting either.

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

Add **trigger exceptions** so the GA4 tags only fire on production
hostnames. You need **two** blocking triggers, not one — see the warning
below.

Both use the same condition: built-in **Page Hostname** → **does not
match RegEx** → `^(www\.)?freeforcharity\.org$`.

1. **Read the Google tag's own trigger first.** GTM → **Tags** → the
   Google tag → note what is listed under _Triggering_. It is one of the
   built-ins — _All Pages_, _Initialization – All Pages_, or _Consent
   Initialization – All Pages_ — and **you must match it**, because an
   exception of a different type is never evaluated (see the warning).
   Don't assume: the two FFC containers genuinely differ here.
   `GTM-NJ4DXH9` (freeforcharity.org) fires its Google tag on built-in
   trigger `2147479553`, while `GTM-WMZH965Q` (ffcadmin.org) uses
   `2147479573`. The Tag Manager API returns only these numeric ids and
   does not expose their names, so the UI is the authority — go look.
2. GTM → **Triggers** → New → the **same type** you just read → add the
   condition. Name it `Block — non-production hostname (page)`.
3. GTM → **Triggers** → New → _Custom Event_ → **Event name** `.*` with
   **use regex matching** checked → add the same condition. Name it
   `Block — non-production hostname (custom event)`.
4. On the **Google tag**, add the blocker from step 2 as an **Exception**.
5. On each of the **four conversion event tags** (`donate_open`,
   `donate_form_view`, `volunteer_apply`, `service_application_start`),
   add the _Custom Event_ blocker as an Exception.
6. Publish a new container version.

> **One blocking trigger will not cover both.** GTM evaluates an
> exception only on the event type its own trigger listens for. A page-
> level blocker (_All Pages_ / _Initialization_) is never evaluated when a
> tag fires on a Custom Event, and vice versa — so a single exception
> silently protects only half the tags while appearing to be applied
> everywhere. This step originally described picking _Page View_ **or**
> _Custom Event_ as though they were interchangeable; they are not.
>
> It then went too far the other way and asserted the Google tag fires on
> _Initialization – All Pages_, naming trigger `2147479553` as that
> trigger. That mapping is unverified — the API exposes the id but not its
> name — so the instruction is now "read the tag's actual trigger and
> match it" rather than a guess dressed as a fact. Step 1 is the check.

**Match both apex and `www.`, and anchor the pattern.** The hostname
table above is the reason: real traffic is split ~70/30 between `www.`
and the apex, so a condition allowing only one host blocks a large share
of legitimate production traffic — the exact opposite of the intent, and
silent, since a tag that never fires looks identical to a site with no
visitors. The `^…$` anchors matter too: an unanchored
`freeforcharity.org` would also allow `freeforcharity.org.example.com`.

Verify before publishing, in GTM **Preview**. Both failure modes this
step has already been written wrong for are invisible without it, so
check all four cells:

| Preview on                        | Google tag | Conversion event tags               |
| --------------------------------- | ---------- | ----------------------------------- |
| `https://freeforcharity.org/`     | fired      | fired (click a donate / apply link) |
| `https://www.freeforcharity.org/` | fired      | fired                               |
| `http://localhost:3000/`          | not fired  | not fired                           |

On localhost both rows must show the tags under **Blocked** with the
exception named. Checking only the Google tag is how you ship a container
that still records every synthetic conversion event.

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
