# Rollback Procedure

Use this procedure to revert production traffic back to the WordPress server if the
GitHub Pages cutover causes critical issues.

**Rollback target:** WordPress at `66.45.234.13`

---

## When to Roll Back

Roll back immediately if any of the following occur within 30 minutes of cutover:

- Homepage returns non-200 or shows a broken layout
- Donation forms on `/donate` or `/free-for-charity-endowment-fund` are non-functional
- More than 3 consecutive failed health checks (auto-created incident GitHub Issues)
- Critical content is missing or images are completely broken site-wide

---

## Step 1 — Revert DNS in Cloudflare

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) and select the
   `freeforcharity.org` zone.
2. Go to **DNS → Records**.
3. Update the `A` record for `@` (root) to point back to `66.45.234.13`.
4. Update the `CNAME` for `www` to point back to `66.45.234.13` (or revert to the
   previous WordPress A record, whichever was in use).
5. Set TTL to **Auto** (or 300s) so propagation is fast.
6. Confirm records are saved.

DNS propagation will be near-instant due to the lowered TTL set before cutover.

---

## Step 2 — Verify WordPress is Serving Traffic

1. Check `https://freeforcharity.org` — confirm it shows the WordPress site.
2. Check `https://www.freeforcharity.org` — confirm redirect/resolution is correct.
3. Verify the donation forms work on the WordPress site.

---

## Step 3 — Post-Rollback Actions

- [ ] Create a GitHub Issue labeled `incident` with details of what failed.
- [ ] Notify the FFC team via Microsoft Teams/email that rollback occurred.
- [ ] Document the root cause before attempting cutover again.
- [ ] Do not re-attempt cutover until the root cause is resolved and verified in staging.

---

_Last updated: 2026-02-20_
