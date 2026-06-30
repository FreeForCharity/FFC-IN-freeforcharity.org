# Metrics & GuideStar/Candid Update Playbook

A repeatable plan for refreshing the impact metrics shown on freeforcharity.org
and the matching figures on Free For Charity's Candid (GuideStar) Platinum
profile, by capturing each number programmatically from the system that is its
real source of truth.

> **Why this exists.** Every metric on the site is hardcoded in components (there
> is no CMS). Numbers were typed by hand in different places and drifted out of
> date — the homepage still says **"Results – 2023"**. The same figures feed the
> Candid Platinum profile, which only gets touched once a year. This playbook
> turns "remember to update the numbers" into "run the collector, review the PR."

---

## 1. Current state — the metrics audit

### 1.1 Impact / mission metrics (the ones this playbook automates)

| #   | Metric (as shown on site)               | Current value | Location                                                                         | Note                |
| --- | --------------------------------------- | ------------- | -------------------------------------------------------------------------------- | ------------------- |
| 1   | "Results – **2023**" header             | 2023          | `src/components/home-page/Results-2023/index.tsx:12`                             | 3 years stale       |
| 2   | Organizational partners                 | 221           | `…/Results-2023/index.tsx:15`                                                    | stale               |
| 3   | Total volunteers                        | 3             | `…/Results-2023/index.tsx:16`                                                    | stale               |
| 4   | Orgs accessing technical assistance     | 221           | `…/Results-2023/index.tsx:19`                                                    | stale               |
| 5   | Volunteer hours contributed             | 25            | `…/Results-2023/index.tsx:21`                                                    | stale               |
| 6   | "over **200** charitable organizations" | 200+          | `…/free-for-charity-endowment-fund-components/Empowering-Charities/index.tsx:37` | stale               |
| 7   | "**100** new charities annually"        | 100           | `…/Empowering-Charities/index.tsx:40`                                            | aspirational target |
| 8   | Progress bars (95% / 85% / 75%)         | 95/85/75      | `…/Empowering-Charities/index.tsx:44-46`                                         | decorative          |
| 9   | "$**1,000,000** endowment goal"         | $1M           | endowment components (3 files)                                                   | goal, not progress  |
| 10  | "~$**16.50** per charity per year"      | $16.50        | `src/data/faqs.ts:12` + home FAQ                                                 | verify vs. actual   |
| 11  | "IRS designation **since 2014**"        | 2014          | `src/data/faqs/are-you-really-a-charity.json` + FAQs                             | static fact (OK)    |

### 1.2 Non-impact numbers (intentionally OUT of scope)

These are policy/legal constants, not impact metrics, and must **not** be on an
automated refresh: cookie/privacy retention durations (`cookie-policy/page.tsx`,
`privacy-policy/page.tsx`), training-program salary ranges
(`free-training-programs/page.tsx`), and policy "last updated" dates. They change
only when the underlying policy changes.

### 1.3 Reality check from a live source

The GitHub org `FreeForCharity` currently has **~41 active `FFC-EX-*` repos**
(`FFC-EX-` = an external charity client site; `FFC-IN-` = internal infra). That
is far fewer than "221 partners" — which confirms **partners ≠ sites built**.
"Partners" is the broader WHMCS client base (domain-only + hosting + email
clients); "sites built" is the GitHub `FFC-EX` count. This playbook treats them
as **distinct metrics**, never conflated.

---

## 2. Architecture — one source of truth, two consumers

```
Authoritative systems ──► collector ──► src/data/impact.json ──┬─► website components
  (WHMCS, Cloudflare,                                          └─► candid-update.md
   GitHub, M365, Gmail,                                            (GuideStar paste-sheet)
   Zeffy)
```

- **`src/data/impact.json`** is the single source of truth. Components stop
  hardcoding numbers and read from it (same pattern the sister repo
  technologyadoptionbarriers.org already uses for `src/data/impact.json`).
- **Candid/GuideStar has no public _write_ API** — updating the Platinum profile
  is a manual web form (the documented "30 minutes a year"). So the collector
  also emits **`candid-update.md`**, a paste-ready sheet of exactly the impact
  figures Candid asks for, so the annual update is copy-paste, not re-research.

### 2.1 Proposed `impact.json` schema

Every metric carries its value **and its provenance** so reviewers can see where
it came from and when it was last confirmed.

```jsonc
{
  "generatedAt": "2026-06-30T00:00:00Z",
  "reportingYear": 2026,
  "metrics": {
    "charityPartners": {
      "value": 221,
      "source": "whmcs",
      "verifiedAt": "2026-06-30",
      "confidence": "high",
    },
    "sitesBuilt": {
      "value": 41,
      "source": "github",
      "verifiedAt": "2026-06-30",
      "confidence": "high",
    },
    "domainsManaged": {
      "value": 0,
      "source": "cloudflare",
      "verifiedAt": null,
      "confidence": "unknown",
    },
    "hostingAccounts": {
      "value": 0,
      "source": "whmcs",
      "verifiedAt": null,
      "confidence": "unknown",
    },
    "mailboxesProvisioned": {
      "value": 0,
      "source": "m365",
      "verifiedAt": null,
      "confidence": "unknown",
    },
    "volunteers": {
      "value": 3,
      "source": "github+manual",
      "verifiedAt": null,
      "confidence": "low",
    },
    "volunteerHours": { "value": 25, "source": "manual", "verifiedAt": null, "confidence": "low" },
    "textMessagesHandled": {
      "value": 0,
      "source": "gmail",
      "verifiedAt": null,
      "confidence": "unknown",
    },
    "endowmentGoalUsd": { "value": 1000000, "source": "static" },
    "endowmentRaisedUsd": {
      "value": 0,
      "source": "zeffy-manual",
      "verifiedAt": null,
      "confidence": "unknown",
    },
    "costPerCharityUsd": { "value": 16.5, "source": "whmcs-computed", "verifiedAt": null },
  },
}
```

> Display rule: if `confidence` is `low`/`unknown` or `verifiedAt` is stale, the
> component should fall back to a rounded "200+"-style phrasing rather than a
> precise number — never show an unverified precise figure as if it were current.

---

## 3. Metric → source map (the core of the plan)

| Metric                             | Primary source (system of record)                                                           | Cross-check with                | Capture method                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------- |
| **Charity partners**               | **WHMCS** clients (ffchosting.org/hub)                                                      | Cloudflare zones, GitHub FFC-EX | WHMCS API `GetClients` (active, by client group)   |
| **Sites built / live**             | **GitHub** `FFC-EX-*` repos (non-archived)                                                  | HTTP 200 liveness per domain    | GitHub API repo list, filter prefix, drop archived |
| **Domains / DNS managed**          | **Cloudflare** zones in the _Free For Charity_ account (`0fa33828a8a294ba7c3e945cec827f12`) | WHMCS domain list               | Cloudflare API list zones                          |
| **Hosting accounts**               | **WHMCS** products/services (cPanel)                                                        | —                               | WHMCS API `GetClientsProducts`                     |
| **Mailboxes provisioned**          | **Microsoft 365 / Graph** (nonprofit tenant)                                                | WHMCS email products            | Graph `GET /users` + license SKUs                  |
| **Volunteers / contributors**      | **GitHub** org members + unique commit authors                                              | WHMCS staff/admin list          | GitHub org members + contributor stats             |
| **Volunteer hours**                | Time log (Google Sheet / Calendar) — no clean API                                           | GitHub commit activity (proxy)  | Semi-manual (see §4)                               |
| **Text messages handled**          | **Gmail** (Google Voice / SMS-to-email trail)                                               | —                               | Gmail API search by sender/label, count in window  |
| **Donations / endowment progress** | **Zeffy** dashboard — no public API                                                         | bank statement                  | Manual CSV export → impact.json                    |
| **Cost per charity (~$16.50)**     | **WHMCS** domain billing ÷ domain count                                                     | Cloudflare registrar pricing    | Compute from WHMCS invoices                        |

---

## 4. Per-source capture notes (auth + gotchas)

- **GitHub** — _no new credentials_ (org is already reachable via the GitHub
  integration). Sites-built, contributors, members. The cleanest signal.
- **Cloudflare** — _no new credentials_ (Free For Charity account is in scope).
  Zone count = authoritative "domains/DNS managed." The existing
  `FFC-Cloudflare-Automation` (Terraform) repo is an alternate zone source.
- **WHMCS** — the real system of record for "partners." Needs an **API
  Identifier + Secret** (WHMCS admin → Setup → Staff Management → API
  Credentials) plus an IP allowlist. Highest-value credential: it unlocks
  partners, hosting, domains, and cost in one place. Store as GitHub Environment
  secrets — never in code.
- **Microsoft 365 / Graph** — app registration in the nonprofit tenant (client
  ID/secret, application permissions `User.Read.All`, `Reports.Read.All`).
  Unlocks mailboxes provisioned and email volume.
- **Gmail (texting)** — reachable via the Gmail integration. Needs the **sender
  address or label** under which SMS-to-email forwards arrive, to count them in a
  reporting window.
- **Zeffy** — no API; relies on a periodic dashboard CSV export. `impact.json`
  accepts a hand-dropped figure for `endowmentRaisedUsd`.
- **Candid / GuideStar** — a _read_ API exists (pull your own profile), but
  **writes are manual**. Output is the paste-sheet, not an API push.

---

## 5. Reconciliation & confidence

"Partners" should be sanity-checked across three independent systems each run:

```
WHMCS active clients  ≈  Cloudflare zones (domains)  ≥  GitHub FFC-EX sites
```

Large divergence (e.g. WHMCS says 221 but Cloudflare has 60 zones) is a data-
quality signal worth a note in the PR body, not a silent overwrite. The
collector reports all three raw counts plus the chosen headline figure.

---

## 6. Automation & cadence

- **Collector**: a script (TypeScript or Python, matching repo conventions) that
  reads each reachable source, writes `impact.json`, and renders
  `candid-update.md`. Degrades gracefully — missing credentials leave that
  metric's `confidence: "unknown"` and flag it in the run summary instead of
  failing the whole run.
- **Scheduled GitHub Action** (monthly cron + `workflow_dispatch`): runs the
  collector and opens a **PR** (numbers on a public charity site get a human
  review before going live). Secrets come from GitHub Environments.
- **Annual GuideStar job** (the "30 minutes a year"): run the collector, open
  `candid-update.md`, paste into the Candid Platinum form.

---

## 7. Phased rollout

1. **Refactor (no credentials):** introduce `src/data/impact.json`; rename
   `Results-2023` → year-driven `Results`; wire the endowment text and FAQ to
   read from it. Immediately fixes the "2023" staleness without inventing data
   (preserve current values, mark provenance/confidence honestly).
2. **Zero-credential collector:** GitHub + Cloudflare + Gmail → `impact.json`,
   behind the scheduled Action.
3. **Credentialed sources:** add WHMCS, then Microsoft 365, as their secrets
   are provisioned.
4. **Candid sheet + cadence:** `candid-update.md` generator + monthly/annual
   schedule.

---

## 8. Open items requiring a decision / input

- Which sources to wire first (recommended: GitHub + Cloudflare + Gmail, since
  they need no new credentials).
- WHMCS API credentials (Identifier/Secret) into a GitHub Environment.
- Microsoft 365 app registration for Graph.
- The Gmail **sender/label** that SMS-to-email forwards arrive under.
- The authoritative definition of a "partner" (any WHMCS client? active only?
  excludes internal/test accounts like the `.com` towing sites?).
- A lightweight method to log **volunteer hours** (the one metric with no clean
  API today).
