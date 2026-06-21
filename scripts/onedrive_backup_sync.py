#!/usr/bin/env python3
"""
Sync Softaculous app backups from cPanel -> OneDrive, with retention.

Softaculous already creates app-aware, *restorable* backups locally
(WHMCS daily, WordPress weekly) under ~/softaculous_backups, but the server
only keeps ~7 days. This pulls each new archive over FTPS and uploads it to
the matching OneDrive folder via Microsoft Graph, then prunes OneDrive to:

    keep ALL backups <= 90 days old, then ONE per calendar month up to 1 year,
    delete anything older than 1 year.

Stdlib only (no pip installs). Auth/secrets come from the environment:

  GRAPH_TOKEN   Microsoft Graph access token (delegated Files.ReadWrite.All)
  FTP_HOST      cPanel FTPS host
  FTP_USER      cPanel FTP username
  FTP_PASS      cPanel FTP password
  FTP_PORT      (optional, default 21)

Config has sensible defaults for this account; override via env if needed:
  SOFTA_DIR     remote dir (default /softaculous_backups, relative to FTP home)
  DRY_RUN       "1" to log actions without uploading/deleting
"""
import os, re, ssl, json, ftplib, tempfile, datetime
import urllib.request, urllib.error, urllib.parse

GRAPH = "https://graph.microsoft.com/v1.0"
TOKEN = os.environ["GRAPH_TOKEN"]
DRY_RUN = os.environ.get("DRY_RUN") == "1"
SOFTA_DIR = os.environ.get("SOFTA_DIR", "/softaculous_backups")

# Map a Softaculous filename prefix -> OneDrive destination folder (drive root relative).
DEST = {
    "whmcs.": "/1-Backups/1# freeforcharity.org Backups/FFC WHMCS/Softaculous Specific",
    "wp.": "/1-Backups/1# freeforcharity.org Backups/FFC Wordpress/Softaculous Specific",
}
KEEP_ALL_DAYS = 90
KEEP_MONTHLY_DAYS = 365
# Freshness thresholds (hours). The newest archive in each folder should be no
# older than this; otherwise Softaculous likely stopped producing backups even
# though the sync itself is green. WHMCS is daily, WordPress weekly.
FRESH_MAX_HOURS = {
    "whmcs.": int(os.environ.get("FRESH_WHMCS_MAX_H", "26")),
    "wp.": int(os.environ.get("FRESH_WP_MAX_H", "192")),  # 8 days
}
DATE_RE = re.compile(r"(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})")
# Strict allowlist for backup filenames. The names come from the REMOTE server's
# directory listing and are used to build local + OneDrive paths, so reject
# anything that isn't a bare, well-formed basename (no "/", "\", "..").
NAME_RE = re.compile(r"^(whmcs|wp)\.[A-Za-z0-9._-]+\.tar\.gz$")


def safe_name(n):
    return bool(NAME_RE.match(n)) and n == os.path.basename(n)


def log(*a):
    print(*a, flush=True)


# ----------------------------------------------------------------------------
# Microsoft Graph helpers
# ----------------------------------------------------------------------------
def graph(method, path, data=None, headers=None, raw_url=None):
    url = raw_url or (GRAPH + path)
    h = {"Authorization": "Bearer " + TOKEN}
    if headers:
        h.update(headers)
    if data is not None and not isinstance(data, (bytes, bytearray)):
        data = json.dumps(data).encode()
        h["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=h, method=method)
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            body = r.read()
            return r.status, (json.loads(body) if body else {})
    except urllib.error.HTTPError as e:
        body = e.read()
        try:
            return e.code, json.loads(body)
        except Exception:
            return e.code, {"raw": body[:500].decode("utf-8", "replace")}


def list_children(folder):
    """Return {name: item} for a OneDrive folder (drive-root relative path)."""
    items, url = {}, GRAPH + "/me/drive/root:" + urllib.parse.quote(folder) + ":/children?$select=name,id,size&$top=200"
    while url:
        st, d = graph("GET", None, raw_url=url)
        if st == 404:
            return {}
        if st >= 400:
            raise RuntimeError(f"list_children {folder}: {st} {d}")
        for it in d.get("value", []):
            items[it["name"]] = it
        url = d.get("@odata.nextLink")
    return items


def upload_large(local_path, folder, name):
    """Resumable upload of a (possibly ~1GB) file into a OneDrive folder."""
    item_path = urllib.parse.quote(folder + "/" + name)
    st, sess = graph(
        "POST",
        "/me/drive/root:" + item_path + ":/createUploadSession",
        {"item": {"@microsoft.graph.conflictBehavior": "replace"}},
    )
    if st >= 400:
        raise RuntimeError(f"createUploadSession {name}: {st} {sess}")
    upload_url = sess["uploadUrl"]
    size = os.path.getsize(local_path)
    chunk = 10 * 1024 * 1024  # 10 MiB (must be a multiple of 320 KiB)
    final = None
    with open(local_path, "rb") as f:
        start = 0
        while start < size:
            buf = f.read(chunk)
            end = start + len(buf) - 1
            h = {
                "Content-Length": str(len(buf)),
                "Content-Range": f"bytes {start}-{end}/{size}",
            }
            req = urllib.request.Request(upload_url, data=buf, headers=h, method="PUT")
            try:
                with urllib.request.urlopen(req, timeout=300) as r:
                    status, body = r.status, r.read()
            except urllib.error.HTTPError as e:
                raise RuntimeError(f"upload chunk {name} @{start}: {e.code} {e.read()[:300]}")
            # Only 2xx means the chunk was accepted; never advance otherwise
            # (e.g. a 3xx from a hijacked upload URL must not look like success).
            if status not in (200, 201, 202):
                raise RuntimeError(f"upload chunk {name} @{start}: unexpected status {status}")
            final = body
            start = end + 1
    # The final chunk returns the created DriveItem; verify the byte count so a
    # silently-truncated upload can't masquerade as a complete backup.
    try:
        item = json.loads(final) if final else {}
    except ValueError:
        item = {}
    if item.get("size") not in (None, size):
        raise RuntimeError(f"upload {name}: size mismatch (local {size}, remote {item.get('size')})")
    log(f"    uploaded {name} ({size/1e6:.1f} MB)")


def delete_item(item_id, name):
    if DRY_RUN:
        log(f"    [dry-run] would delete {name}")
        return
    st, d = graph("DELETE", "/me/drive/items/" + item_id)
    if st not in (200, 204):
        log(f"    WARN delete {name}: {st} {d}")
    else:
        log(f"    pruned {name}")


# ----------------------------------------------------------------------------
# Retention: keep all <=90d, then one-per-month up to 1y, delete older.
# ----------------------------------------------------------------------------
def file_date(name):
    m = DATE_RE.search(name)
    if not m:
        return None
    try:
        y, mo, d, H, M, S = map(int, m.groups())
        return datetime.datetime(y, mo, d, H, M, S, tzinfo=datetime.timezone.utc)
    except ValueError:
        return None  # malformed date (e.g. month 13) -> treat as undated, never delete


def apply_retention(folder, items):
    now = datetime.datetime.now(datetime.timezone.utc)
    dated = sorted(
        ((dt, n, it) for n, it in items.items() if (dt := file_date(n))),
        key=lambda x: x[0],
        reverse=True,
    )
    kept_months = set()
    for dt, name, it in dated:
        age = (now - dt).days
        if age <= KEEP_ALL_DAYS:
            continue  # keep every recent backup
        if age <= KEEP_MONTHLY_DAYS:
            key = (dt.year, dt.month)
            if key not in kept_months:
                kept_months.add(key)  # keep the newest in this month
                continue
            delete_item(it["id"], name)  # extra within an already-kept month
        else:
            delete_item(it["id"], name)  # older than a year


# ----------------------------------------------------------------------------
# FTPS
# ----------------------------------------------------------------------------
def ftps_connect():
    # TLS verification is ON by default (system trust store) so the FTP password
    # and backup data can't be MITM'd. If the cPanel host presents a self-signed
    # / shared cert, pin it via FTPS_CACERT (a PEM file path or inline PEM).
    # FTPS_INSECURE=1 is an explicit, loudly-logged escape hatch — not recommended.
    cacert = os.environ.get("FTPS_CACERT")
    if cacert and os.path.exists(cacert):
        ctx = ssl.create_default_context(cafile=cacert)
    elif cacert:
        ctx = ssl.create_default_context(cadata=cacert)
    elif os.environ.get("FTPS_INSECURE") == "1":
        log("WARNING: FTPS_INSECURE=1 -> FTPS certificate verification DISABLED (MITM risk).")
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
    else:
        ctx = ssl.create_default_context()  # verify against the system CA store
    ftp = ftplib.FTP_TLS(context=ctx)
    ftp.connect(os.environ["FTP_HOST"], int(os.environ.get("FTP_PORT", "21")), timeout=60)
    ftp.login(os.environ["FTP_USER"], os.environ["FTP_PASS"])
    ftp.prot_p()
    ftp.set_pasv(True)
    return ftp


def check_freshness():
    """Warn (don't fail) if the newest archive in a folder is older than its
    threshold -- a sign Softaculous stopped producing backups. Reuses the
    already-minted Graph token so it adds no second token consumer."""
    now = datetime.datetime.now(datetime.timezone.utc)
    stale = []
    for prefix, folder in DEST.items():
        dated = [dt for n, _ in list_children(folder).items() if (dt := file_date(n)) and n.startswith(prefix)]
        if not dated:
            log(f"Freshness: {folder}: NO dated archives found")
            stale.append((prefix, folder, None))
            continue
        newest = max(dated)
        age_h = (now - newest).total_seconds() / 3600.0
        limit = FRESH_MAX_HOURS.get(prefix, 26)
        flag = "STALE" if age_h > limit else "ok"
        log(f"Freshness: {folder}: newest {newest:%Y-%m-%d %H:%M}Z ({age_h:.1f}h old, limit {limit}h) -> {flag}")
        if age_h > limit:
            stale.append((prefix, folder, age_h))
    for prefix, folder, age_h in stale:
        msg = f"{folder}: no archive younger than {FRESH_MAX_HOURS.get(prefix, 26)}h" if age_h is None \
            else f"{folder}: newest archive is {age_h:.0f}h old (limit {FRESH_MAX_HOURS.get(prefix, 26)}h)"
        log(f"::warning::Backup freshness: {msg}")
    return stale


def main():
    log(f"== Softaculous -> OneDrive sync ({'DRY-RUN' if DRY_RUN else 'live'}) ==")
    ftp = ftps_connect()
    ftp.cwd(SOFTA_DIR)
    names = ftp.nlst()
    backups = [n for n in names if safe_name(n)]
    rejected = [n for n in names if n.endswith(".tar.gz") and not safe_name(n)]
    if rejected:
        log(f"WARNING: ignoring {len(rejected)} archive name(s) failing the safe-name allowlist")
    log(f"Found {len(backups)} Softaculous archive(s) in {SOFTA_DIR}")

    uploaded = 0
    for prefix, folder in DEST.items():
        existing = list_children(folder)
        mine = sorted(n for n in backups if n.startswith(prefix))
        for name in mine:
            if name in existing:
                continue
            log(f"  {folder}: new -> {name}")
            if DRY_RUN:
                continue
            # Unique local temp path (avoids collisions / interrupted-job
            # leftovers). `name` is allowlisted, but we still never build the
            # local path from it. OneDrive still uses the original `name`.
            fd, tmp = tempfile.mkstemp(prefix="ftpbk_", suffix=".tar.gz")
            try:
                with os.fdopen(fd, "wb") as fh:
                    ftp.retrbinary("RETR " + name, fh.write, blocksize=1024 * 1024)
                upload_large(tmp, folder, name)
                uploaded += 1
            finally:
                try:
                    os.remove(tmp)
                except OSError:
                    pass
    try:
        ftp.quit()
    except Exception:
        ftp.close()

    # Retention pass (refetch each folder after uploads).
    for folder in DEST.values():
        log(f"Retention: {folder}")
        apply_retention(folder, list_children(folder))

    # Freshness check (warning-only; the scheduled monitor workflow is the
    # hard alarm). Run after retention so it reflects the final folder state.
    check_freshness()

    log(f"Done. Uploaded {uploaded} new archive(s).")


if __name__ == "__main__":
    main()
