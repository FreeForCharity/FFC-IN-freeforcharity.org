# Intake-funnel beacon (form starts vs submissions)

Tracks how many charities _open_ each WHMCS order form vs how many _complete_ an
order — the "filter rate" of the deliberately hard intake forms (epic
FreeForCharity/FFC-Cloudflare-Automation#676, issue #684).

## How it works

1. The WHMCS hub's `six_ffc` theme fires a `navigator.sendBeacon()` from
   `cart.php` pages (no cookies, no identifiers, nothing personal):
   - `?s=view&p=<pid>` when an order form is opened (`cart.php?a=add&pid=N`)
   - `?s=complete` on the order-complete page (`cart.php?a=complete`)
2. [`public/api/funnel-beacon.php`](../public/api/funnel-beacon.php) increments
   a daily counter — `date → pid → step → count` — in
   `~/ffc_funnel_counts.json`, **outside the web root** (sibling of
   `public_html`, unreachable over HTTP).
3. Because nothing user-identifying is stored, no consent banner is needed.

## Reading the numbers

- Open `~/ffc_funnel_counts.json` via cPanel File Manager (it sits next to
  `public_html`, not inside it).
- `view` counts per product id: 16 pre-501c3 / 33 501c3 onboarding, 40 website,
  39 domain register, 41 domain transfer, 42/43 email.
- For submissions, WHMCS order reports are authoritative — the beacon's
  `complete` count is a same-day sanity check, not the source of truth.
- Filter rate per product ≈ WHMCS submitted orders ÷ beacon `view` count.

## Pulling a report locally (operator)

[`scripts/funnel-report.mjs`](../scripts/funnel-report.mjs) fetches
`ffc_funnel_counts.json` over FTPS and renders a markdown funnel table (per
product id: views, completes) with the WHMCS caveat above. Node stdlib only —
no dependencies to install.

```bash
FTP_HOST=<host> FTP_USER=<user> FTP_PASS=<pass> node scripts/funnel-report.mjs
```

- Credentials come from the environment (`FTP_HOST`, `FTP_USER`, `FTP_PASS`,
  optional `FTP_PORT`, default 21 / explicit AUTH TLS). **Never hardcode or
  commit them** — pull them from your password manager per the security rules.
- The counts file lives in the FTP home directory itself (a sibling of
  `public_html`, outside the web root), so the script fetches the path
  `ffc_funnel_counts.json` relative to the FTP home.
- If the file does not exist yet (no beacon hits recorded), the script says so
  and exits cleanly.
- Offline mode for a previously downloaded file:
  `node scripts/funnel-report.mjs --file <path>`.

## Live contract test

[`tests/funnel-beacon.spec.ts`](../tests/funnel-beacon.spec.ts) verifies the
production endpoint's contract (204 on valid **and** invalid params — the
storefront must never see an error — and no `Set-Cookie`, the consent-free
guarantee). Like the Zeffy link check it is gated off normal CI; run it with
`FUNNEL_LIVE=1 npx playwright test tests/funnel-beacon.spec.ts`. It uses the
unused test pid `999` so real counters are not polluted.

## Notes

- Client-side beacons undercount (ad blockers, JS off) — treat trends, not
  absolutes.
- The theme-side snippet lives in `six_ffc/header.tpl` on the server (the theme
  is managed over FTPS, not in this repo).
