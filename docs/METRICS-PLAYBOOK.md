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
5. **Candid sheet + cadence:** `candid-update.md` generator + monthly/annual schedule.

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
