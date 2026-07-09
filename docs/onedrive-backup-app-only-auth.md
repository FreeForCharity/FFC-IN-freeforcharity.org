# OneDrive backup — app-only (unattended) auth

## Why
`cpanel-softaculous-backup-sync.yml` used to authenticate to OneDrive as a **user**
(delegated device-code flow → refresh token in Key Vault). A Conditional Access
**sign-in-frequency** policy invalidates that refresh token roughly monthly
(`AADSTS50078`), silently breaking every daily backup until someone re-runs the
device-code login by hand.

This change switches the job to **app-only** Microsoft Graph auth, minted from the
workflow's existing GitHub-OIDC Azure login. There is **no refresh token, no stored
secret, and no interactive MFA** — nothing a CA policy can expire. The code is done;
the steps below are the one-time **tenant-admin** setup (they require Application
Administrator / Privileged Role Admin + the ability to consent Graph app permissions,
which is why they aren't automated here).

## What the code now expects
- The workflow mints the token with `az account get-access-token --resource https://graph.microsoft.com`
  using the **`AZURE_DEPLOY_CLIENT_ID`** identity (the same OIDC SP it already uses for Key Vault).
- The destination drive comes from a repo/environment **variable** `ONEDRIVE_DRIVE_BASE`
  (app-only tokens have no `/me`). The run fails fast with a clear message if it's unset.

## Pick a permission model
| | Files.ReadWrite.All (drop-in) | **Sites.Selected (recommended)** |
|---|---|---|
| Scope | Tenant-wide read/write to all OneDrive + SharePoint | Write to **only** the one backup library |
| Where backups live | Keep them in the current user's OneDrive → `ONEDRIVE_DRIVE_BASE=/users/<upn>/drive` | A SharePoint doc library → `ONEDRIVE_DRIVE_BASE=/sites/<site-id>/drive` |
| Trade-off | No data move; broad grant needs admin comfort | Least privilege; requires the backups to live in SharePoint |

## Setup steps

### 0. Identify the OIDC service principal
```bash
# AZURE_DEPLOY_CLIENT_ID is the app (client) id used by the workflow's azure/login.
# View it (get the value from the repo/environment secret), then:
az ad sp show --id <AZURE_DEPLOY_CLIENT_ID> --query '{name:displayName, id:id, appId:appId}'
```

### 1a. Option Files.ReadWrite.All
```bash
GRAPH=00000003-0000-0000-c000-000000000000
# Files.ReadWrite.All (application) role id = 75359482-378d-4052-8f01-80520e7db3cd
az ad app permission add --id <AZURE_DEPLOY_CLIENT_ID> --api $GRAPH \
  --api-permissions 75359482-378d-4052-8f01-80520e7db3cd=Role
az ad app permission admin-consent --id <AZURE_DEPLOY_CLIENT_ID>
# Find the OneDrive owner's user id/upn and set the variable (see step 2).
```

### 1b. Option Sites.Selected  ⭐
```bash
GRAPH=00000003-0000-0000-c000-000000000000
# Sites.Selected (application) role id = 883ea226-0bf2-4a8f-9f9d-92c9162a727d
az ad app permission add --id <AZURE_DEPLOY_CLIENT_ID> --api $GRAPH \
  --api-permissions 883ea226-0bf2-4a8f-9f9d-92c9162a727d=Role
az ad app permission admin-consent --id <AZURE_DEPLOY_CLIENT_ID>

# Grant write to ONLY the backup site (needs a Graph token with Sites.FullControl.All,
# e.g. run as an admin). site-id: GET /sites/<host>:/sites/<path>
#   POST https://graph.microsoft.com/v1.0/sites/<site-id>/permissions
#   { "roles": ["write"],
#     "grantedToIdentities": [ { "application": { "id": "<AZURE_DEPLOY_CLIENT_ID>", "displayName": "ffc-cpanel-deploy" } } ] }
```

### 2. Set the destination variable
```bash
# Repo-level (or scope to the cpanel-apim-deploy environment):
gh variable set ONEDRIVE_DRIVE_BASE --repo FreeForCharity/FFC-IN-freeforcharity.org \
  --body "/users/<upn-or-id>/drive"        # Files.ReadWrite.All
# or
gh variable set ONEDRIVE_DRIVE_BASE --repo FreeForCharity/FFC-IN-freeforcharity.org \
  --body "/sites/<site-id>/drive"          # Sites.Selected
```
Make sure the `DEST` folder paths in `scripts/onedrive_backup_sync.py` exist under that drive
(they're the same `/1-Backups/...` paths used today — move/recreate them if you switch drives).

### 3. Test, then cut over
```bash
# Dry run first (lists actions, no writes):
gh workflow run cpanel-softaculous-backup-sync.yml --repo FreeForCharity/FFC-IN-freeforcharity.org -f dry_run=true
# Then a real run; confirm it uploads and the freshness monitor stays green.
gh workflow run cpanel-softaculous-backup-sync.yml --repo FreeForCharity/FFC-IN-freeforcharity.org
```

### 4. Clean up (after a successful real run)
- Delete the now-unused Key Vault secret `wr-all-ffc-onedrive-backup-refresh-token`
  (and optionally `read-all-ffc-onedrive-backup-{client-id,tenant-id}`).
- Retire the delegated app registration `ffc-onedrive-backup` (`0b7ead96-…`).
- No more monthly device-code re-auth. 🎉
