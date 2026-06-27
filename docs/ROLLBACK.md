# Rollback Procedure: Production Apex (cPanel mirror-in-place)

Roll back freeforcharity.org when a deploy ships a broken build to the
live apex.

> **Architecture (read this first).** The apex cutover mirrored the
> Next.js static export **straight into `~/public_html`** — the document
> root was **never swapped** to a sibling directory. Every production
> deploy (`.github/workflows/deploy-cpanel.yml`) does an `lftp` mirror of
> `out/` into `~/public_html` with `--delete`, **excluding** the proven
> keeper set so it never touches WHMCS, the parked domain, or the cPanel
> system files. Consequences for rollback:
>
> - There is **no document-root swap** to undo. The old DNS-flip /
>   doc-root-swap rollbacks no longer apply.
> - `~/public_html` no longer contains the old WordPress install — it
>   holds the Next.js static files. You roll back by **re-mirroring a
>   known-good build**, not by pointing the doc root elsewhere.
> - **WHMCS at `~/public_html/hub/` is never modified** by any deploy
>   (it is excluded from the mirror). A bad apex deploy does **not** take
>   billing down, and rollback must likewise leave `/hub/` untouched.
> - `~/public_html_next` is the **staging** docroot (a separate cPanel
>   account / URL), not production. Don't deploy production there.

**Estimated rollback time: 5–10 minutes** (one revert + the auto-deploy
that follows, or a single manual `workflow_dispatch`). No DNS
propagation is involved.

---

## Decision: which rollback do I need?

| Situation                                                 | Use          |
| --------------------------------------------------------- | ------------ |
| A bad commit shipped; the previous commit was good        | **Option A** |
| You need the site good _right now_, can't wait for CI     | **Option B** |
| The mirror was interrupted / files on disk look corrupted | **Option C** |
| `/hub/` (WHMCS) itself is down                            | **See note** |

> **Note on WHMCS.** Deploys exclude `~/public_html/hub`, so an apex
> deploy cannot break `/hub/`. If `/hub/` is down, it is **not** an apex
> deploy regression — do not roll back the apex. Treat it as a WHMCS /
> cPanel / Cloudflare incident: check InterServer cPanel and the WHMCS
> admin at `freeforcharity.org/hub/globaladmin`, and the escalation
> contacts below.

---

## Option A — Revert the bad commit (preferred)

Main auto-deploys: reverting on `main` re-mirrors the previous-good
static export automatically.

```bash
git switch main && git pull
git revert --no-edit <bad-commit-sha>   # or a range: <oldest>^..<newest>
git push origin main
```

Then watch it ship:

1. **CI — Build and Test** runs on the revert commit.
2. On green, **Deploy to InterServer cPanel (production)** fires via
   `workflow_run` and mirrors the reverted (good) `out/` into
   `~/public_html`.
3. The post-deploy smoke suite + the "Verify WHMCS /hub survived"
   step confirm the apex and billing are healthy.

This is the cleanest path: the rolled-back state is a real commit on
`main`, so history and production stay in sync.

---

## Option B — Redeploy a known-good commit now (fastest)

Skips the revert/CI round-trip — deploy a prior good commit directly.

1. GitHub repo → **Actions → Deploy to InterServer cPanel (production)**
   → **Run workflow**.
2. Set **Use workflow from** to the **known-good ref** (a tag or commit;
   pick the last commit whose deploy was green).
3. Leave `delete_remote = true` (clean mirror) and set
   `run_smoke = true` so the live checks run after upload.
4. Run it. The CI-green gate requires that ref to have passed CI, and
   the freshness guard is bypassed on manual dispatch (operator intent).

> Follow up with **Option A** afterward so `main` reflects the
> rolled-back state — otherwise the next merge re-ships the bad commit.

---

## Option C — Restore `~/public_html` from a cPanel backup (last resort)

Only if the mirror left the apex files corrupted in a way a redeploy
can't fix (e.g. a half-finished upload plus an unrelated disk issue).

1. Log in to **InterServer cPanel** for the freeforcharity.org account.
2. **Files → Backup / File Manager** → restore `~/public_html` from the
   most recent good backup (the pre-flight backup from
   `docs/CUTOVER-HANDOFF.md` → "Pre-flight" step 1, or a nightly).
3. **Do not** restore over `~/public_html/hub` unless WHMCS itself is
   the problem — keep billing's live state.
4. Once stable, run **Option A or B** to get a clean, known-good static
   export back in place from CI.

---

## Bust the Cloudflare cache (after any option)

Cloudflare caches HTML aggressively. After the files are good, force a
refresh so visitors stop seeing the broken version:

1. Cloudflare dashboard → `freeforcharity.org` zone →
   **Caching → Configuration**.
2. **Purge Everything**. Confirm.

The deploy/smoke steps send `Cache-Control: no-cache`, but visitor
traffic still hits the edge cache until it's purged.

---

## Verify production is healthy

```bash
curl -I https://freeforcharity.org/
# Expect: HTTP/2 200 — the Next.js apex

curl -sS https://freeforcharity.org/hub/ | grep -iE 'whmcs|clientarea|cart\.php'
# Expect: a WHMCS marker — billing still works (it never moved)

BASE_URL=https://freeforcharity.org npm run smoke-test
# Full live suite: every sitemap URL, the WP->Next redirects, /hub, assets.
```

Also check visually in an incognito browser. If you still see the broken
version, the Cloudflare cache hasn't purged yet — wait 1–2 minutes and
retry.

---

## Stop further auto-deploys while investigating (optional)

If you need to freeze production while you dig in:

1. GitHub repo → **Actions** tab → **Deploy to InterServer cPanel
   (production)** → **⋯ → Disable workflow**, or
2. Add `if: false` to the job in `.github/workflows/deploy-cpanel.yml`
   and push (this also stops the auto-deploy on the revert — re-enable
   before using Option A).

Re-enable once you're ready to ship the fix.

---

## Open a post-mortem issue

After stabilizing, open a GitHub issue documenting:

- What broke (specific pages, features, or infra).
- When it was detected and how long the degradation lasted.
- Root cause.
- The guard/test that should have caught it (so we close the gap).

The deploy workflow auto-opens a `🚨 HIGH … deploy/smoke FAILED`
incident issue on failure — fold the post-mortem into that issue if one
exists.

---

## Reference

| Item                  | Detail                                                                                               |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| `~/public_html/`      | **Live apex docroot.** Holds the Next.js static export; re-mirrored on every production deploy.      |
| `~/public_html/hub/`  | **WHMCS billing.** Excluded from every deploy mirror — never modified by an apex deploy or rollback. |
| `~/public_html_next/` | **Staging** docroot (separate cPanel account / URL). Not production; not a rollback target.          |
| Cloudflare role       | Proxies the apex — purge the cache after a rollback so visitors leave the broken edge copy.          |
| Deploy workflow       | `.github/workflows/deploy-cpanel.yml` (auto on merge to `main` after CI; manual dispatch for B).     |

---

## Escalation Contacts

| Role                          | Contact                                             |
| ----------------------------- | --------------------------------------------------- |
| InterServer cPanel            | InterServer hosting panel + account                 |
| DNS / Cloudflare              | FFC Cloudflare admin account                        |
| GitHub deploy workflow / repo | FreeForCharity GitHub org owner                     |
| WHMCS billing                 | WHMCS admin at `freeforcharity.org/hub/globaladmin` |

---

_Last updated: 2026-06-27 (rewritten for the mirror-in-place apex model;
the previous version described a `public_html_next` document-root swap
that never reflected how the cutover actually deployed)._
