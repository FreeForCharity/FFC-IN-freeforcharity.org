# Rollback Procedure: GitHub Pages → WordPress

This document describes how to roll back the freeforcharity.org website from
GitHub Pages (Next.js) back to the WordPress server in the event of a
production issue after DNS cutover.

**Estimated rollback time: 5–30 minutes** (DNS propagation varies by TTL and
resolver)

---

## Prerequisites

You will need access to:

- **Cloudflare dashboard** — DNS management for freeforcharity.org
  - Account: FFC Cloudflare org
  - Zone: freeforcharity.org
- **GitHub** — to disable or reconfigure GitHub Pages if needed
  - Repo: FreeForCharity/FFC-IN-freeforcharity.org → Settings → Pages

The WordPress server is **never modified** during or after cutover. It remains
live and accessible at its origin IP for the duration of the monitoring window.

---

## Step 1 — Revert DNS in Cloudflare

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select the **freeforcharity.org** zone
3. Go to **DNS → Records**
4. Find the `A` record(s) for `@` (apex) pointing to GitHub Pages IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
5. Update each `A` record to point back to the WordPress origin IP
   (see InterServer control panel or private infra runbook for the current IP)
6. Ensure the record is set to **Proxied** (orange cloud) to maintain
   Cloudflare WAF and CDN protection
7. If a `CNAME` record for `www` exists pointing to
   `freeforcharity.github.io`, revert it to point to the origin server or
   remove it

> **Tip:** Cloudflare's default TTL is 300 seconds (5 min) for proxied records.
> If you previously lowered the TTL before cutover, propagation is fast.
> External resolvers may cache for longer depending on their own TTLs.

---

## Step 2 — Verify WordPress is Responding

Before declaring rollback complete, confirm the WordPress site is live:

```bash
curl -I https://freeforcharity.org
# Expect: HTTP/2 200. If Cloudflare is still proxying, you'll typically see
#   "server: cloudflare" and Cloudflare headers (e.g., "cf-ray"), not GitHub
#   Pages headers like "x-github-request-id".

curl -I https://www.freeforcharity.org
# Expect: HTTP/2 200 with the same origin content as the apex domain.
```

Also verify visually in a browser using an incognito window or a DNS resolver
that has picked up the change.

---

## Step 3 — Disable GitHub Pages Custom Domain (Optional)

If you want to prevent GitHub Pages from attempting to serve the custom domain:

1. Go to **FreeForCharity/FFC-IN-freeforcharity.org → Settings → Pages**
2. Under **Custom domain**, clear the field and save
3. The site will remain accessible at
   `https://freeforcharity.github.io/FFC-IN-freeforcharity.org/` for staging use

This step is optional — DNS changes alone are sufficient to route traffic back
to WordPress.

---

## Step 4 — Create a Post-Mortem Issue

After stabilizing, open a GitHub issue to document:

- What broke (specific pages, features, or infra)
- When it was detected
- How long the outage lasted
- Root cause
- Fix required before re-attempting cutover

---

## Important Notes

| Item                | Detail                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| WordPress origin IP | See private infra runbook or InterServer control panel for current origin IP; restrict origin to Cloudflare IPs |
| GitHub Pages IPs    | `185.199.108–111.153`                                                                                           |
| WordPress server    | InterServer VPS — do **not** stop or reprovision for at least 2 weeks post-cutover                              |
| Monitoring window   | Keep WordPress running for minimum 14 days after successful cutover before decommissioning                      |
| `public/CNAME` file | Leaving it in the repo is harmless — it only takes effect when DNS points to GitHub                             |

---

## Escalation Contacts

| Role                | Contact                         |
| ------------------- | ------------------------------- |
| DNS / Cloudflare    | FFC Cloudflare admin account    |
| GitHub Pages / repo | FreeForCharity GitHub org owner |
| WordPress server    | InterServer hosting panel       |

---

_Last updated: 2026-02-21_
