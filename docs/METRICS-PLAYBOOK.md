# Metrics & GuideStar/Candid Update Playbook

A repeatable plan for refreshing the impact metrics shown on freeforcharity.org
and the matching figures on Free For Charity's Candid (GuideStar) Platinum
profile — built on the data pipelines FFC **already operates**, and closing the
two gaps that keep the real numbers from being knowable today.

> **Why this exists.** Every metric on the site is hardcoded in components (no
> CMS). Numbers were typed by hand and drifted — the homepage **used to show** a
> hardcoded **"Results – 2023"** section (replaced by a data-driven section in
> this change). The same figures feed the Candid Platinum profile, which is
> touched once a year. The goal: derive each number from an authoritative system
> on a schedule, review it in a PR, and reuse it for the annual Candid update.

---

## 1. Pre-refactor state — the metrics audit

> The file paths in the table below describe the **pre-refactor** layout (the
> audit that motivated this work). The homepage section is now
> `src/components/home-page/Results/` driven by `src/data/impact.json`; the
> `Results-2023` paths no longer exist.

### 1.1 Impact / mission metrics (in scope for automation)

| #   | Metric (as shown on site)               | Current value | Location                                             | Note                |
| --- | --------------------------------------- | ------------- | ---------------------------------------------------- | ------------------- |
| 1   | "Results – **2023**" header             | 2023          | `src/components/home-page/Results-2023/index.tsx:12` | 3 years stale       |
| 2   | Organizational partners                 | 221           | `…/Results-2023/index.tsx:15`                        | stale + ill-defined |
| 3   | Total volunteers                        | 3             | `…/Results-2023/index.tsx:16`                        | stale               |
| 4   | Orgs accessing technical assistance     | 221           | `…/Results-2023/index.tsx:19`                        | stale               |
| 5   | Volunteer hours contributed             | 25            | `…/Results-2023/index.tsx:21`                        | stale               |
| 6   | "over **200** charitable organizations" | 200+          | `…/Empowering-Charities/index.tsx:37`                | stale               |
| 7   | "**100** new charities annually"        | 100           | `…/Empowering-Charities/index.tsx:40`                | aspirational target |
| 8   | Progress bars (95% / 85% / 75%)         | 95/85/75      | `…/Empowering-Charities/index.tsx:44-46`             | decorative          |
| 9   | "$**1,000,000** endowment goal"         | $1M           | endowment components (3 files)                       | goal, not progress  |
| 10  | "~$**16.50** per charity per year"      | $16.50        | `src/data/faqs.ts:12` + home FAQ                     | verify vs. actual   |
| 11  | "IRS designation **since 2014**"        | 2014          | `src/data/faqs/are-you-really-a-charity.json`        | static fact (OK)    |

### 1.2 Out of scope (policy/legal constants)

Cookie/privacy retention durations, training-program salary ranges, and policy
"last updated" dates are **not** impact metrics and must not be on an automated
refresh. They change only when the underlying policy changes.

---

## 2. What already exists natively (do not rebuild)

FFC already runs a multi-source reconciliation pipeline. The metrics work should
**consume** it, not duplicate it.

### 2.1 `FFC-Cloudflare-Automation` — the data backbone

A large set of numbered GitHub Actions already export every source the metrics
need (outputs are CSV/JSON artifacts or committed files):

| Workflow                      | Source                                      | Produces                                     |
| ----------------------------- | ------------------------------------------- | -------------------------------------------- |
| `04-domain-export-inventory`  | Cloudflare + M365 + WHMCS + WPMUDEV         | Combined domain inventory CSV                |
| `4-export-summary` / `08` DNS | Cloudflare zones                            | Zone summary CSV                             |
| `7-whmcs-export-domains`      | WHMCS                                       | Domain list                                  |
| `8-whmcs-export-products`     | WHMCS                                       | Hosting/products catalog                     |
| `13-wpmudev-export-sites`     | **WPMUDEV Hub API**                         | **Legacy WordPress sites** inventory         |
| `5/6/7-m365-*`                | Microsoft 365                               | Tenant domains, DKIM status                  |
| `34-whmcs-charity-onboard`    | WHMCS                                       | Onboarding                                   |
| `37/38-whmcs-tickets-*`       | WHMCS                                       | Support tickets export + triage              |
| `41/42-whmcs-orders-*`        | WHMCS                                       | Orders triage                                |
| `44/45/46-zeffy-*`            | Zeffy API                                   | Campaigns / payments / contacts (PII-masked) |
| `sites-list-generate`         | WHMCS + Cloudflare + WPMUDEV + health probe | **`sites-list/sites_list.json` + `.csv`**    |

### 2.2 `sites_list.json` — the existing authoritative inventory

`sites-list-generate.yml` merges WHMCS + Cloudflare + WPMUDEV + per-domain HTTP
health checks into **`sites-list/sites_list.json`**, opened as a PR (protected
branch), **weekly on Mondays 08:00 UTC**, and rendered at
[ffcadmin.org/sites-list](https://ffcadmin.org/sites-list).

As of the last snapshot it tracks **376 domains** across five work tiers, each
with health (live/redirect/error/unreachable), hosting server (GitHub Pages,
HostPapa, Hostinger, InterServer, Krystal.io, Cloudflare Proxy), status, and a
migration-progress score (0–4 from Cloudflare + GitHub repo + deployment):

| Tier | Meaning                                 | Count (last snapshot) |
| ---- | --------------------------------------- | --------------------- |
| 1    | Active development                      | 35                    |
| 2    | Stalled                                 | 1                     |
| 3    | **Needs migration from legacy hosting** | **64**                |
| 4    | Fully migrated & stable                 | 6                     |
| 5    | Triage / inactive                       | remainder             |

> **This is the key realization:** the "domains managed / legacy vs. migrated"
> reconciliation is already built and already layers WPMUDEV (legacy WP) and
> Cloudflare on top of the incomplete WHMCS data. freeforcharity.org should read
> figures derived from `sites_list.json`, not re-query the APIs.

### 2.3 Other relevant repos

- **`FFC-Static-Site-Capture-Tools`** (Python) — captures legacy WordPress / Wix
  / Wayback sites for migration. Operational tooling; keeps no registry.
- **`FFC-IN-AI-Management`** — org-wide AI-agent config only; no business data.
- **`FFC-IN-ffcadmin.org`** — renders the sites-list page; `repos.json` there is
  just a 21-entry internal-repo list (not the charity data).

---

## 3. Why these numbers are hard (the real constraints)

1. **WHMCS is not a complete source of truth.** Many charities are still on
   legacy WordPress hosting and are not fully represented in WHMCS. Coverage only
   becomes accurate after layering WPMUDEV + Cloudflare + health probes — which
   `sites_list.json` already does.
2. **"Charity partner" is not yet a defined field in WHMCS.** There is no clean
   flag to count. Any "partners" number today is therefore a derived estimate,
   not a direct query (see §5 for the interim definition and the fix).
3. **Communications live outside WHMCS.** Charity inquiries arrive by email
   (M365 + Gmail) and text message, and many never become WHMCS records — so the
   true reach (and the onboarding pipeline) is undercounted (see §6).
4. **Sync lag.** The live sites-list snapshot was ~22 days behind the weekly
   generator (the PR likely sat unmerged). Freshness needs a guard.

---

## 4. Architecture — consume the reconciled inventory, two consumers

```
FFC-Cloudflare-Automation  ──►  sites_list.json  ──►  metrics derivation  ──►  src/data/impact.json ──┬─► website
  (+ email/text discovery, §6)   (+ pipeline.json)                                                     └─► candid-update.md
```

- **`src/data/impact.json`** = single source of truth the site reads (replacing
  hardcoded numbers). Each metric carries value **+ provenance + confidence +
  verifiedAt**, so a reviewer can see where it came from and an unverified
  precise figure never ships as if it were current (fall back to "200+" phrasing).
- **`candid-update.md`** = generated paste-sheet for the annual Candid Platinum
  update (Candid has no public _write_ API; the profile is a manual web form).

### 4.1 `impact.json` (illustrative)

```jsonc
{
  "generatedAt": "2026-06-30T00:00:00Z",
  "reportingYear": 2026,
  "metrics": {
    "domainsManaged": {
      "value": 376,
      "source": "sites_list.json",
      "verifiedAt": "2026-06-08",
      "confidence": "high",
    },
    "legacyToMigrate": { "value": 64, "source": "sites_list.json (tier 3)", "confidence": "high" },
    "migratedStable": { "value": 6, "source": "sites_list.json (tier 4)", "confidence": "high" },
    "sitesBuilt": { "value": 41, "source": "github (FFC-EX-*)", "confidence": "high" },
    "charityPartners": {
      "value": null,
      "source": "derived",
      "confidence": "low",
      "note": "no WHMCS partner flag yet — see §5",
    },
    "volunteers": { "value": null, "source": "github+manual", "confidence": "low" },
    "volunteerHours": { "value": null, "source": "manual", "confidence": "low" },
    "uncapturedLeads": { "value": null, "source": "email/text discovery", "confidence": "low" },
    "endowmentGoalUsd": { "value": 1000000, "source": "static" },
    "endowmentRaisedUsd": { "value": null, "source": "zeffy export", "confidence": "low" },
  },
}
```

---

## 5. Gap A — defining "charity partner" in WHMCS

Until there is a real field, "partners" is an estimate. Two-part fix:

- **Interim (now):** derive a defensible number from `sites_list.json` — e.g.
  distinct charity domains that are live and not internal/test (`FFC-IN-*`, the
  `.com` towing/test sites). Publish it with `confidence: "medium"` and the
  derivation noted, rather than a precise-but-unfounded "221."
- **Permanent (process):** add a **WHMCS client group or custom field**
  (e.g. `FFC Charity Partner = yes/no`, plus `partner_stage`). Once that exists,
  `7-whmcs-export-domains` (or a small companion export) yields a clean partner
  count, and `sites_list.json` can carry a `partnerStatus` column. This is an
  org-process decision, not a code change to this repo — flagged here so the
  metric can graduate from "derived" to "high confidence."

---

## 6. Gap B — email/text discovery (the net-new piece)

**Goal:** surface FFC charity communications that are **not yet in WHMCS**, so we
(a) feed the onboarding pipeline and (b) stop undercounting reach.

No existing workflow mines mailboxes or SMS for this. Proposed design:

| Step | Source                                                                                 | Method                                                                                |
| ---- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1    | **Microsoft 365** shared mailboxes (`contact@`, `support@`, `info@freeforcharity.org`) | Graph `messages` search over a window; extract sender domain, org name, intent        |
| 2    | **Gmail** (FFC inbox + **SMS-to-email** forwards from Google Voice)                    | Gmail API search by the texting sender/label; count threads, extract phone + org      |
| 3    | **Onboarding form** submissions                                                        | Wherever they land (email/sheet) — normalize to the same shape                        |
| 4    | **Reconcile**                                                                          | Diff candidate orgs/domains against `sites_list.json` + WHMCS export                  |
| 5    | **Output**                                                                             | `pipeline.json` (leads not in the system) + `uncapturedLeads` count for `impact.json` |

Notes:

- **Privacy:** treat inbound contact data like the Zeffy exports already do —
  PII-masked in any committed artifact; raw lists stay in retention-capped Action
  artifacts, never in the repo, an issue body, or a PR description.
- **The SMS detail you flagged:** texting is tracked via Gmail. The collector
  needs the exact **sender address or label** those forwards arrive under to
  count them — that is the one input required to wire step 2.
- This belongs alongside the other exports in **`FFC-Cloudflare-Automation`**
  (it already holds the M365/WHMCS/Zeffy credentials and export patterns), with
  the masked summary count flowing into freeforcharity.org's `impact.json`.

---

## 7. Reconciliation & confidence

Cross-check reach across independent systems every run; large divergence is a
data-quality signal to surface in the PR body, not silently overwrite:

```
sites_list.json domains (376)  ≥  Cloudflare zones  ≥  GitHub FFC-EX sites (~41)
WHMCS clients  <  true reach    (the deficit ≈ legacy WP + uncaptured comms)
```

---

## 8. Cadence

- **Weekly** — `sites-list-generate` already runs Mondays 08:00 UTC. Add a
  freshness guard so a stale (unmerged) snapshot is flagged, not silently shown.
- **Monthly** — derive `impact.json` from the latest `sites_list.json` +
  email/text discovery; open a review PR against freeforcharity.org.
- **Annually** — run the derivation, open `candid-update.md`, paste into the
  Candid Platinum form (the "30 minutes a year").

---

## 9. Phased rollout

1. **Refactor (no credentials):** introduce `src/data/impact.json`; rename
   `Results-2023` → year-driven `Results`; wire endowment text + FAQ to read it.
   Fixes the "2023" staleness without inventing data (honest provenance/confidence).
2. **Derive from existing data:** map `sites_list.json` (+ GitHub FFC-EX count)
   into `impact.json` — domains managed, legacy-to-migrate, migrated, sites built.
3. **Gap A:** adopt a WHMCS partner field; graduate `charityPartners` to a clean count.
4. **Gap B:** build the email/text discovery export in `FFC-Cloudflare-Automation`;
   feed `uncapturedLeads` + a pipeline list.
5. **Candid sheet + cadence:** `candid-update.md` generator (✅ shipped —
   `scripts/candid-update.mjs`, see §13) + monthly/annual schedule (open).

---

## 10. Open items / decisions needed

- The **Gmail sender/label** for SMS-to-email forwards (unblocks Gmail/text counting).
- The **definition of "charity partner"** and whether to add the WHMCS field/group.
- Ratify the **volunteer-hours model** coefficients (§11) and wire the pending
  engagement counts (M365 email, onboarding) once their WHMCS/M365 exports land.
- Which mailboxes to mine for discovery, and the reporting window.
- Confirm `endowmentRaisedUsd` comes from the Zeffy export (vs. manual figure).
- Whether metric derivation lives in `FFC-Cloudflare-Automation` (next to the
  data) or in this repo (next to the consumer). Recommendation: derive next to
  the data, commit only the small `impact.json` here.

---

## 11. Volunteer hours — modeled per engagement, not per person

Per-person hour logging is ineffective and, in practice, no more valid than a
structured assumption. So volunteer hours are **estimated per engagement /
product type**: `hours = hoursPerUnit × unit count`, summed across engagements.
The coefficients live in `src/data/volunteer-hours-model.json` and are computed
in `src/data/impact.ts` (`volunteerHours`, `volunteerHoursBreakdown`,
`volunteerHoursPending`); the unit counts come from the same `impact.json`
metrics, so the estimate refreshes automatically as those numbers do.

**Proposed coefficients (pending org ratification):**

| Engagement / product                        | Hours/unit | Unit count source       |
| ------------------------------------------- | ---------: | ----------------------- |
| Charity website built (GitHub Pages)        |         20 | `sitesBuilt`            |
| Legacy WordPress → static migration         |         12 | `migratedStable`        |
| Domain registration + Cloudflare DNS        |          1 | `domainsManaged`        |
| Ongoing hosting & maintenance (per site/yr) |          3 | `sitesBuilt`            |
| Microsoft 365 email + grant assistance      |          4 | _pending_ (M365/WHMCS)  |
| 501c3 / Pre-501c3 onboarding + Candid       |          3 | _pending_ (WHMCS gid-6) |

With the current counts (41 sites, 6 migrations, 376 domains) the resolved lines
total **≈ 1,391 volunteer hours**; the two _pending_ engagements are excluded
from the total until their counts are wired, and are reported via
`volunteerHoursPending` so the figure is never silently undercounted.

**Why this is defensible:** each coefficient is a transparent, reviewable
assumption tied to a concrete deliverable (not a guess about individuals), and
the estimate is reproducible from committed data. Ratify or adjust the
coefficients in one place (`volunteer-hours-model.json`, bump `version`); the
total and the Candid figure follow.

---

## 12. Text-derived metrics system (per calendar year)

Text messages are not just counted — they are a managed metrics source. Each
Google Voice thread (a personal account; pulled **human-in-the-loop**, see the
FFC-Cloudflare-Automation runbook) is classified along three dimensions and
bucketed by **calendar year** in `src/data/text-metrics.json`:

- **Party** — `volunteer` · `newCharity` · `existingCharity` · `noise`
  (`existingCharity` = matches an `FFC-EX-*` repo; `newCharity` = a nonprofit
  with no repo yet). `charityThreads` = newCharity + existingCharity.
- **Product category** (charity-org threads) — website · domain · m365 ·
  onboarding · migration · maintenance · general.
- **Net-new reach-out** — a sender's first-ever contact, split volunteer vs
  new-charity → the **reach-out velocity** per year.

### Derived metrics (computed in `impact.ts`)

1. **Volume** per year: `totalThreads`, `charityThreads`, `byParty`.
2. **Reach-out velocity** per year: `reachoutVelocityByYear` (net-new volunteer
   vs new-charity contacts) — the cadence of new reach into the community.
3. **Texts → volunteer hours**: `textSupport` in `volunteer-hours-model.json`
   gives per-category minutes for charity-org texts plus a flat rate for
   volunteer-coordination texts; `textSupportHoursByYear` /`textSupportHours`
   compute the implied hours (separate from the §11 engagement total, since text
   support is per-year rather than cumulative).

### 2023–2025 (full census)

Every thread in 2023, 2024, and 2025 was **individually classified** — no
sampling, no ratio extrapolation, no template-shaping. Totals are exact (full
pagination); every charity-org thread was individually assigned one category; and
net-new reach-outs are distinct first-contact senders deduped **across all three
years** by first appearance.

| Year | Total threads | Charity threads | Party (vol / new / existing / noise) | Net-new reach-outs (vol / new) | Implied text-support hrs |
| ---- | ------------- | --------------- | ------------------------------------ | ------------------------------ | ------------------------ |
| 2023 | 1,999         | 159             | 121 / 88 / 71 / 1,719                | 19 / 21                        | ≈ 35 hrs                 |
| 2024 | 1,874         | 132             | 126 / 40 / 92 / 1,616                | 5 / 5                          | ≈ 36 hrs                 |
| 2025 | 2,078         | 410             | 205 / 225 / 185 / 1,463              | 21 / 16                        | ≈ 86 hrs                 |

Category counts (charity-org threads only):

| Year | website | domain | m365 | onboarding | migration | maintenance | general |
| ---- | ------- | ------ | ---- | ---------- | --------- | ----------- | ------- |
| 2023 | 16      | 13     | 15   | 9          | 2         | 2           | 102     |
| 2024 | 28      | 17     | 15   | 10         | 5         | 18          | 39      |
| 2025 | 110     | 31     | 17   | 37         | 6         | 5           | 204     |

Notes: ~70–86% of all traffic is noise (the line doubles as a personal + day-job
phone). The census **superseded an earlier sample-based pass** whose ratio
extrapolation had overstated charity volume and badly overstated `migration`
(e.g. 2025 migration 94 → **6**, general 95 → **204**); this is why the full
census matters. `general` (charity-related but not category-specific
coordination) dominates every year. 2024 net-new is small because most 2024
charity contacts first appeared in 2023; 2026-YTD remains
`pending-classification` (null splits — never fabricated).

To re-run for a new year: exhaust pagination for the exact total, classify
**every** thread by party + category (deep-read only the ambiguous ones),
enumerate distinct first-contact senders across the full window for velocity, and
drop the numbers into `text-metrics.json`; the derived metrics and Candid figures
follow automatically.

---

## 13. Candid crosswalk — the generated paste sheet

`docs/candid-update.md` is the **generated, paste-ready sheet** for the annual
Candid Platinum update (rollout item 5). Candid has no public write API — the
profile is a manual web form — so the sheet is the bridge: per-year values plus
definition/methodology text written to be pasted directly into each Platinum
"Progress & results" metric.

```bash
node scripts/candid-update.mjs           # regenerate docs/candid-update.md
node scripts/candid-update.mjs --check   # exit 1 if the committed sheet is stale
```

Design rules (enforced, not aspirational):

- **Same sources as the site.** The generator reads only `impact.json`,
  `text-metrics.json`, and `volunteer-hours-model.json` — one source of truth
  for the website AND Candid.
- **Publication gate.** A metric is pasteable only with a concrete value and
  high/medium confidence; per-year series only from `classified` years.
  Everything else lands in a "Not yet Candid-attributable (do NOT paste)"
  section with the reason. Values are never fabricated.
- **Deterministic + CI-guarded.** Output is versioned by the data files' own
  stamps (no wall clock), and `__tests__/scripts/candid-update.test.ts` runs
  `--check` plus a cross-check that the sheet's hour figures equal the
  `impact.ts` derivation — so a data change without a regenerated sheet, or a
  drift between the script and the loader, fails `npm test`.
- The file is in `.prettierignore` (byte-exact staleness comparison).

Annual procedure: regenerate → open the sheet → paste into the Candid Platinum
form → bump `verifiedAt` on the touched metrics in `impact.json` → commit both.

### FFC's profile (verified live via the Candid MCP, 2026-07-01)

- **Profile:** <https://app.candid.org/profile/9326392/> — nonprofit_id
  `9326392`, EIN `46-2471893`, AKA FFCHosting / FFCdomains / FFCadmin.
- **Seal: 2024 Platinum — at the expiration cliff.** Candid profiles expire two
  years after the last published update, and losing the seal means losing the
  badge everywhere it's displayed. Renewing to the current-year Platinum needs:
  Gold prerequisites (2024-or-2025 financials — a Form 990/990-N upload is
  enough — plus leader demographics), then goals & strategies, board
  demographics, and **at least one impact metric from 2025** — which the paste
  sheet's per-year table now provides.
- **PCS codes on file** (subjects: information & communications, ICT, economic
  development, job training, community service; populations: adults, students,
  military, veterans) already match the mission — no taxonomy changes needed.

### Candid MCP server (read/research assist)

A Candid MCP connector exists for Claude sessions (OAuth-protected; re-authorize
via claude.ai connector settings when it shows disconnected). It is
**read-only** — it does not write to the profile, so the paste sheet above stays
the update mechanism — but it directly supports this playbook:

| Tool                               | What it does for this playbook                                                                                                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `search_organizations`             | Look up FFC's own profile (confirm what Candid currently shows vs `impact.json`) and verify each partner charity → EIN + 501(c)(3) status, turning `organizationsSupported` into a verifiable roster |
| `identify_mentioned_organizations` | Resolve org names surfaced by the Gap B email/text discovery into real Candid orgs — uncaptured leads get an EIN before onboarding                                                                   |
| `identify_locations`               | Normalize partner locations for geographic-reach reporting                                                                                                                                           |
| `taxonomy_terms`                   | Map FFC programs to Candid's Philanthropy Classification System so profile text uses Candid's own vocabulary                                                                                         |
| `knowledge_resources`              | Candid's KB — e.g. current Platinum seal requirements — straight from the source                                                                                                                     |
