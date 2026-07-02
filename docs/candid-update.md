<!-- GENERATED FILE — do not edit by hand. -->
<!-- Regenerate: node scripts/candid-update.mjs   Verify: node scripts/candid-update.mjs --check -->

# Candid (GuideStar) Platinum update — paste sheet

Generated from `impact.json` (generatedAt 2026-06-30, reporting year 2026), `text-metrics.json` (v2026-07-01), `volunteer-hours-model.json` (v2026-06-30) and `whmcs-members.json` (v2026-07-02).

How to use: sign in to the Candid nonprofit profile for Free For Charity, open
**Progress & results (Platinum)**, and enter each metric below with its per-year values.
Definitions/methodology text is written to paste into each metric description. After
submitting, update `verifiedAt` on the touched metrics in `impact.json`.

## Profile & seal status

- **Profile:** https://app.candid.org/profile/9326392/ (nonprofit_id 9326392, EIN 46-2471893)
- **Current seal:** 2024 Platinum (verified 2026-07-01 via the Candid MCP). Candid profiles **expire two years after the last published update**,
  so a 2024 seal is at the expiration cliff — publish promptly.
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

### Volunteer hours contributed — text-based nonprofit support

- **Definition:** Volunteer hours spent supporting nonprofits over the text channel, per calendar year.
- **Methodology:** Modeled from the full thread census x per-category minutes (volunteer-hours-model.json v2026-06-30, pending org ratification): each charity thread costed by product category, volunteer-coordination threads at 8 min.

## WHMCS membership series (nonprofit member accounts)

Source: Workflow 214 run 1 (2026-07-02, run 28558629802): GetClients full pagination, 418 clients; values transcribed by the operator from the run step summary (v2026-07-02; total clients 418).

**Use `activeCumulativeByYearEnd` to continue the profile's "active members" series.**
IMPORTANT methodology note to paste with it: the pre-2024 values on the profile
(2021: 76, 2022: 104, 2023: 221) came from a different counting method and do not
reconstruct from WHMCS (221 exceeds the 183 total clients existing by end-2023); from
2024 the series counts WHMCS member accounts signed up by year-end and Active today,
which is a conservative floor.

| Year | New members | Cumulative by year-end | Active cumulative (floor) |
| --- | ---: | ---: | ---: |
| 2015 | 5 | 5 | 4 |
| 2016 | 16 | 21 | 13 |
| 2017 | 41 | 62 | 42 |
| 2018 | 21 | 83 | 54 |
| 2019 | 21 | 104 | 66 |
| 2020 | 32 | 136 | 81 |
| 2021 | 23 | 159 | 90 |
| 2022 | 6 | 165 | 94 |
| 2023 | 18 | 183 | 110 |
| 2024 | 49 | 232 | 127 |
| 2025 | 109 | 341 | 194 |
| 2026 (YTD) | 77 | 418 | 211 |

## Reporting-year snapshot metrics

| Candid metric | Value | Year | Source (paste as methodology) |
| --- | ---: | --- | --- |
| Nonprofit organizations supported (total) | 200 | 2026 | Free For Charity Domain Program (ffcadmin.org/sites-list); corroborated by WHMCS: 211 currently-active member accounts of 418 all-time (workflow 214, 2026-07-02, whmcs-members.json) |
| Nonprofit domains managed | 376 | 2026 | ffcadmin.org/sites-list (FFC-Cloudflare-Automation: sites_list.json) |
| Nonprofit websites built (cumulative) | 41 | 2026 | GitHub FreeForCharity FFC-EX-* repositories (active, non-archived) |
| Legacy nonprofit sites migrated to stable hosting | 6 | 2026 | ffcadmin.org/sites-list tier 4 |
| Program cost per nonprofit per year (USD) | 16.5 | 2026 | eNom .org domain cost |
| Support text threads handled (3-year total) | 1153 | 2026 | Gmail Google Voice FULL CENSUS 2026-07-01: every thread in CY2023-2025 individually classified (5,951 total threads: 1,999 + 1,874 + 2,078). Charity/volunteer = 701 charity-org + 452 volunteer-coordination = 1,153 threads (~19% of traffic; the rest is personal/day-job noise). Threads, not individual messages. Per-year splits in text-metrics.json. Supersedes the earlier ~45%-of-6,193 sample estimate (2,780). |

## Not yet Candid-attributable (do NOT paste)

- **Total modeled volunteer hours (per engagement)** — volunteer-hours-model.json coefficients are proposed but pending org ratification; m365Email/onboarding lines also lack authoritative unit counts.
- **Uncaptured charity leads (discovery pipeline)** — confidence "low" — manual sample only, pending the automated M365 discovery run.
