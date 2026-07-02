<!-- GENERATED FILE — do not edit by hand. -->
<!-- Regenerate: node scripts/candid-update.mjs   Verify: node scripts/candid-update.mjs --check -->

# Candid (GuideStar) Platinum update — paste sheet

Generated from `impact.json` (generatedAt 2026-07-02, reporting year 2026), `text-metrics.json` (v2026-07-01), `volunteer-hours-model.json` (v2026-06-30) and `whmcs-members.json` (v2026-07-02).

How to use: sign in to the Candid nonprofit profile for Free For Charity, open
**Progress & results (Platinum)**, and enter each metric below with its per-year values.
Definitions/methodology text is written to paste into each metric description. After
submitting, update `verifiedAt` on the touched metrics in `impact.json`.

## Profile & seal status

- **Profile:** https://app.candid.org/profile/9326392/ (nonprofit_id 9326392, EIN 46-2471893)
- **Current seal:** 2024 Platinum (verified 2026-07-01 via the Candid MCP). Candid profiles **expire two years after the last published update**.
- **Last published:** 2026-07-02 — the member/domain series below and the per-year text metrics were entered on the profile that day.
- **Renewal checklist (per Candid Help):** Bronze/Silver prerequisites (basics + program
  info), Gold (2024-or-2025 financials — a Form 990/990-N upload suffices — plus leader
  demographics), then Platinum: goals & strategies, board demographics, and **at least one
  impact metric from 2025** — the per-year table below satisfies that requirement.

## Per-year metrics (Progress & results)

Classified calendar years: 2023, 2024, 2025. Candid takes one value per year.

| Metric | 2023 | 2024 | 2025 |
| --- | ---: | ---: | ---: |
| Nonprofit support interactions handled (text channel) | 159 | 132 | 410 |
| New nonprofit organizations reaching out (text channel) | 21 | 5 | 16 |
| New volunteers engaged (text channel) | 19 | 5 | 21 |
| Active volunteers engaged (text channel) | 24 | 20 | 41 |
| Active nonprofit organizations engaged (text channel) | 24 | 32 | 61 |
| Volunteer hours contributed — text-based nonprofit support | 35 | 36 | 86 |

### Nonprofit support interactions handled (text channel)

- **Definition:** Text-message conversation threads with nonprofit organizations (new inquiries + existing partners) handled by Free For Charity volunteers, per calendar year.
- **Methodology:** Full census of the FFC Google Voice line: every thread individually classified by party; charity-org threads = newCharity + existingCharity. See text-metrics.json.

### New nonprofit organizations reaching out (text channel)

- **Definition:** Distinct nonprofit organizations making first contact with Free For Charity by text message, per calendar year.
- **Methodology:** Distinct first-contact senders, deduplicated across all classified years by first appearance (an organization first seen in an earlier year is not recounted).

### New volunteers engaged (text channel)

- **Definition:** Distinct volunteers making first contact with Free For Charity by text message, per calendar year.
- **Methodology:** Same distinct first-contact enumeration as the nonprofit series.

### Active volunteers engaged (text channel)

- **Definition:** Distinct volunteers with at least one FFC coordination thread during the calendar year (active that year, regardless of when first engaged).
- **Methodology:** Distinct contacts per year from the full Google Voice census, merged across phone numbers; excludes contractors and non-FFC traffic.

### Active nonprofit organizations engaged (text channel)

- **Definition:** Distinct nonprofit organizations with at least one charity-service thread during the calendar year (an organization active in multiple years counts in each).
- **Methodology:** Distinct organizations per year from the full Google Voice census; multiple contacts from one organization are merged and counted once.

### Volunteer hours contributed — text-based nonprofit support

- **Definition:** Volunteer hours spent supporting nonprofits over the text channel, per calendar year.
- **Methodology:** Modeled from the full thread census x per-category minutes (volunteer-hours-model.json v2026-06-30, pending org ratification): each charity thread costed by product category, volunteer-coordination threads at 8 min.

## WHMCS membership series — CANONICAL (ratified + published 2026-07-02)

Source: FFC-Cloudflare-Automation workflow '220. WHMCS - Served-Per-Year Metrics (span evidence, no PII)', run 28563543349 (2026-07-02); values transcribed from the run log table. All-time nonprofit members: 352.

**"Nonprofit organizations served" is the profile's member series.** Methodology to
paste with it: counted from dated WHMCS records — a nonprofit is served in year Y when
a charity service or registered domain was in force during Y (span from registration
date to next-due/expiry; active services run through today). Derived programmatically
from the full 2014–present dataset; replaces earlier point-in-time dashboard reads.
The legacy 2022 value (104) is validated by span-served 99; the legacy 2023 value (221)
was a 2024 read of the TOTAL client counter and was overwritten with 108. Domains under
management merges 79 sites-list-only organizations into the current year.

| Year | Nonprofits served | New members | Cumulative | Domains under mgmt |
| --- | ---: | ---: | ---: | ---: |
| 2014 | 1 | 1 | 1 | 3 |
| 2015 | 4 | 3 | 4 | 10 |
| 2016 | 17 | 13 | 17 | 35 |
| 2017 | 51 | 35 | 52 | 82 |
| 2018 | 67 | 17 | 69 | 109 |
| 2019 | 79 | 15 | 84 | 127 |
| 2020 | 93 | 17 | 101 | 131 |
| 2021 | 102 | 12 | 113 | 148 |
| 2022 | 99 | 4 | 117 | 149 |
| 2023 | 108 | 9 | 126 | 164 |
| 2024 | 155 | 49 | 175 | 194 |
| 2025 | 248 | 106 | 281 | 224 |
| 2026 (YTD) | 254 | 71 | 352 | 270 |

Superseded series (do NOT paste; kept in `whmcs-members.json` for reconciliation):
the billing-active series (invoice/order-dated — undercounts free service delivery;
~85–90% of FFC invoices are $0) and the workflow-214 signup-year × current-status
client series (current status has no history).

## Reporting-year snapshot metrics

| Candid metric | Value | Year | Source (paste as methodology) |
| --- | ---: | --- | --- |
| Nonprofit organizations supported (total) | 200 | 2026 | Free For Charity Domain Program (ffcadmin.org/sites-list); corroborated by WHMCS span evidence: 254 nonprofits served 2026 YTD, 352 all-time, 200 with a currently-active service (workflow 220 run 28563543349, whmcs-members.json served series — published to Candid 2026-07-02) |
| Nonprofit domains managed | 376 | 2026 | ffcadmin.org/sites-list (FFC-Cloudflare-Automation: sites_list.json) |
| Nonprofit websites built (cumulative) | 41 | 2026 | GitHub FreeForCharity FFC-EX-* repositories (active, non-archived) |
| Legacy nonprofit sites migrated to stable hosting | 6 | 2026 | ffcadmin.org/sites-list tier 4 |
| Program cost per nonprofit per year (USD) | 16.5 | 2026 | eNom .org domain cost |
| Support text threads handled (3-year total) | 1153 | 2026 | Gmail Google Voice FULL CENSUS 2026-07-01: every thread in CY2023-2025 individually classified (5,951 total threads: 1,999 + 1,874 + 2,078). Charity/volunteer = 701 charity-org + 452 volunteer-coordination = 1,153 threads (~19% of traffic; the rest is personal/day-job noise). Threads, not individual messages. Per-year splits in text-metrics.json. Supersedes the earlier ~45%-of-6,193 sample estimate (2,780). |

## Not yet Candid-attributable (do NOT paste)

- **Total modeled volunteer hours (per engagement)** — volunteer-hours-model.json coefficients are proposed but pending org ratification; m365Email/onboarding lines also lack authoritative unit counts.
- **Uncaptured charity leads (discovery pipeline)** — confidence "low" — manual sample only, pending the automated M365 discovery run.
