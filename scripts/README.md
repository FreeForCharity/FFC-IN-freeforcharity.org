# Scripts

Operator + developer helper scripts. Run from the repo root.

| Script                          | Purpose                                                                                                                                                                        | Issue                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `cpanel-backup.sh`              | Trigger a full cPanel account backup via UAPI, wait for it to finish, and download the tarball locally with integrity check. Used for cutover step PRE1 and routine snapshots. | [#143](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/143) |
| `visual-regression/capture.mjs` | Capture WordPress origin vs Next.js staging screenshots for non-homepage pages and write a markdown report.                                                                    | [#24](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/24)   |

## `cpanel-backup.sh`

Bash script. Requires `curl` and (for downloads) `scp` or `curl --ftp-ssl`. Tested on Git Bash for Windows and stock Linux/macOS shells. No external dependencies beyond what cPanel and OpenSSH already ship.

### One-time setup

1. **Create a cPanel API token**:
   - cPanel → **Manage API Tokens** → **Create** → name it (e.g. `backup-script`).
   - No IP restriction unless your machine has a static IP.
   - Copy the token immediately — cPanel does not show it again.

2. **Set environment variables** (best: in a `.envrc` or shell rc file you do _not_ commit):
   ```bash
   export CPANEL_USER=your_cpanel_username
   export CPANEL_SERVER=your.cpanel.host
   export CPANEL_TOKEN=...               # treat like a password
   export NOTIFY_EMAIL=you@example.com
   ```

### Run

```bash
./scripts/cpanel-backup.sh
```

The script:

1. Calls `Backup::fullbackup_to_homedir` via UAPI to queue the backup.
2. Polls `Fileman::list_files` every 60 s (configurable via `POLL_INTERVAL`) for up to 1 h (`MAX_WAIT`) until a `backup-MM-DD-YYYY_HH-MM-SS_USER.tar.gz` file appears in your home directory.
3. Downloads that tarball via `scp` (falls back to FTPS if SSH is blocked) into `./cpanel-backups/`.
4. Verifies the tarball with `tar -tzf`.

Output ends with the local path and byte size, plus a reminder to copy it to durable storage and update issue [#143](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/143).

### Configuration knobs

| Variable          | Default                  | Purpose                                                    |
| ----------------- | ------------------------ | ---------------------------------------------------------- |
| `CPANEL_USER`     | _required_               | cPanel account username                                    |
| `CPANEL_SERVER`   | _required_               | cPanel hostname (no port, no scheme)                       |
| `CPANEL_TOKEN`    | _required_               | UAPI token                                                 |
| `CPANEL_PORT`     | `2083`                   | cPanel SSL port                                            |
| `NOTIFY_EMAIL`    | `noreply@$CPANEL_SERVER` | Email cPanel sends "backup complete" notice to             |
| `POLL_INTERVAL`   | `60`                     | Seconds between completion polls                           |
| `MAX_WAIT`        | `3600`                   | Max total wait (seconds) before giving up                  |
| `DOWNLOAD_DIR`    | `./cpanel-backups`       | Local destination directory                                |
| `DOWNLOAD_METHOD` | `scp`                    | `scp`, `ftps`, or `none` (skip download — leave on server) |
| `FTP_USER`        | `$CPANEL_USER`           | FTPS username if SCP unavailable                           |
| `FTP_PASSWORD`    | _none_                   | FTPS password if `DOWNLOAD_METHOD=ftps`                    |

### Exit codes

| Code | Meaning                                |
| ---- | -------------------------------------- |
| `0`  | Backup downloaded and verified         |
| `1`  | Missing required env var or bad config |
| `2`  | cPanel API rejected the backup request |
| `3`  | Timed out waiting for the backup file  |
| `4`  | Download failed                        |
| `5`  | Downloaded file failed integrity check |

### Caveats

- **Async by design**: the API queues the backup; the actual job runs in the background for 10–60 minutes depending on account size.
- **Some hosts disable the Backup module** for shared-tier accounts. If you see `"Function does not exist"` in the error, your host has it off and you must use the cPanel UI instead.
- **Token guarding**: the token has full account access. Rotate via cPanel → Manage API Tokens if exposed. Never commit it.
- **`/cpanel-backups/`** is in `.gitignore` (or should be — backups are huge and contain everything). Confirm before adding new backup directories.

## `visual-regression/capture.mjs`

See [`docs/visual-regression/README.md`](../docs/visual-regression/README.md).
