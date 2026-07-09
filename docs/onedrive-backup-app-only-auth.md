# OneDrive backup — app-only (unattended) auth

## Why

`cpanel-softaculous-backup-sync.yml` used to authenticate to OneDrive as a **user**
(delegated device-code flow → refresh token in Key Vault). A Conditional Access
**sign-in-frequency** policy invalidated that refresh token roughly monthly
(`AADSTS50078`), silently breaking every daily backup until someone re-ran the
device-code login by hand.

The job now uses **app-only** Microsoft Graph auth from a dedicated identity via
GitHub OIDC. **No refresh token, no stored user credential, no interactive MFA** —
nothing a Conditional Access policy can expire.

## As-built configuration (done 2026-07-08)

Two GitHub-OIDC identities, split by duty:

| Purpose                   | Identity                                                          | Grants                                                                      |
| ------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Key Vault (FTP creds)     | `ffc-admin-kv-writer` (env secret `AZURE_DEPLOY_CLIENT_ID`)       | KV Secrets User — unchanged                                                 |
| OneDrive Graph (app-only) | **`ffc-onedrive-backup`** (env secret `AZURE_ONEDRIVE_CLIENT_ID`) | **Graph `Files.ReadWrite.All` (application) only** — no subscription, no KV |

The concrete client-id, drive-id, and account are not repeated here (this repo is
public) — they live in the GitHub env secret `AZURE_ONEDRIVE_CLIENT_ID` and the
variable `ONEDRIVE_DRIVE_BASE`.

- **Federated credential** on `ffc-onedrive-backup`: subject
  `repo:FreeForCharity/FFC-IN-freeforcharity.org:environment:cpanel-apim-deploy`,
  issuer `https://token.actions.githubusercontent.com`, audience `api://AzureADTokenExchange`.
- **App-role assignment** grants _only_ `Files.ReadWrite.All` (well-known Graph role
  `75359482-378d-4052-8f01-80520e7db3cd`) on the Microsoft Graph SP — a targeted
  consent, not a blanket `admin-consent`.
- **Why `Files.ReadWrite.All` (tenant-wide)?** The backups live in a _personal_
  OneDrive for Business, which cannot be scoped with `Sites.Selected`. The broad
  grant is isolated to this single-purpose app.
- **Destination pinned, folder unchanged:** the variable `ONEDRIVE_DRIVE_BASE` holds
  `/drives/<drive-id>` for the exact drive used before, so the `/1-Backups/…` folders
  are untouched.

Validated 2026-07-08 by dispatching the workflow from its branch (dry-run + real
run both green; lists/retention against the same folders).

## Operating notes

- **Rotate nothing routinely.** App-only via OIDC has no secret or token to expire.
  (The FIC and app-role assignment don't lapse.)
- **Re-verify / re-create** the setup with `az`:
  ```bash
  APP=<value of env secret AZURE_ONEDRIVE_CLIENT_ID>
  # app-role assignments (expect Files.ReadWrite.All on Microsoft Graph):
  sp=$(az ad sp show --id $APP --query id -o tsv)
  az rest --method GET --url "https://graph.microsoft.com/v1.0/servicePrincipals/$sp/appRoleAssignments"
  # federated credentials:
  az ad app federated-credential list --id $APP --query "[].subject"
  ```
- **⚠️ Setting `ONEDRIVE_DRIVE_BASE` from Windows Git-Bash** mangles the leading
  `/drives/...` into `C:/Program Files/Git/drives/...` (MSYS path conversion). Set it
  with `MSYS_NO_PATHCONV=1 gh variable set …` or from a non-MSYS shell.
- **Freshness** monitor (`cpanel-backup-freshness.yml`) remains the safety net.

## Retiring the old delegated path (optional cleanup — now safe)

The app-only path is live and validated, so the delegated fallback can go:

- Delete Key Vault secret `wr-all-ffc-onedrive-backup-refresh-token` (and
  `read-all-ffc-onedrive-backup-{client-id,tenant-id}` if unused elsewhere).
- Remove the delegated Graph scopes from `ffc-onedrive-backup` (keep the app — it now
  carries the application permission). No more monthly device-code re-auth. 🎉
