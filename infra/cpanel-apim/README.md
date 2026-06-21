# cPanel API gateway on Azure API Management

Fronts the InterServer **cPanel UAPI** with an **Azure API Management (APIM)**
instance that has a **static public IP**. GitHub Actions calls APIM (with a
subscription key); APIM injects the cPanel token auth and forwards the request
from its static IP, which is whitelisted once in Imunify360. No secret ever
leaves Key Vault into the pipeline, and there is no VM/runner to maintain.

```
GitHub Actions ──(subscription key)──▶ APIM (static IP) ──(cpanel token)──▶ cPanel UAPI :2083
                                         │                                    ▲
                                         └─ token+user pulled from Key Vault   └─ Imunify360 whitelists the APIM static IP
```

This APIM instance is a **shared FFC gateway**, not cPanel-specific. cPanel is the
first API onboarded (path `/cpanel`); future backends are added as additional APIs
on the same instance and share its static egress IP(s). Classic APIM exposes a
single IP on the Developer tier (currently `20.231.116.111`) but can present more
than one — `apim.bicep` outputs the full array, so **whitelist every address it
lists**, not just the first.

## Deployed instance (prod)

| Thing                 | Value                                               |
| --------------------- | --------------------------------------------------- |
| APIM instance         | `apim-ffc-gateway-prod` (Developer tier, eastus)    |
| Resource group        | `rg-ffc-admin-apim`                                 |
| Gateway URL           | `https://apim-ffc-gateway-prod.azure-api.net`       |
| cPanel API base       | `…/cpanel/execute/<Module>/<function>`              |
| **Static egress IP**  | **`20.231.116.111`** (whitelist this in Imunify360) |
| Subscription          | `cpanel-ops`                                        |
| Subscription key (KV) | `read-all-ffc-apim-gateway-subscription-key`        |

The IP is stable for the life of the instance but changes if APIM is deleted and
recreated. Confirm it from the deployment outputs after any rebuild.

## Why this design

- **Imunify360 blocks datacenter traffic, including Azure.** GitHub-hosted
  runners egress from Azure IP ranges, and direct cPanel API calls from them are
  blocked. A single **static, whitelistable IP** is the fix.
- **Only the classic APIM tiers have a static IP.** Developer / Basic / Standard
  / Premium get a dedicated static public IP. **Consumption and all v2 tiers
  (Basic v2 / Standard v2 / Premium v2) run on shared infra with no deterministic
  IP** — they can't be whitelisted (Microsoft's only guidance is "allowlist the
  whole Azure region," which is impractical and insecure).
  [MS Learn: IP addresses in APIM](https://learn.microsoft.com/azure/api-management/api-management-howto-ip-addresses)
- **"When a request is sent from API Management to a public backend, a public IP
  address will always be visible as the origin"** — that public IP is the static
  one you whitelist. (Same doc.)

## Cost (US list, approximate)

| Tier                    | Monthly                | Static IP | SLA     | Use here               |
| ----------------------- | ---------------------- | --------- | ------- | ---------------------- |
| Consumption             | ~$3.50 / million calls | ❌        | ✔️      | ❌ no static IP        |
| **Developer** (default) | **~$40–50**            | ✔️        | ❌ none | ✅ cheapest that works |
| Basic                   | ~$150                  | ✔️        | ✔️      | if you need an SLA     |
| Basic v2                | ~$145                  | ❌        | ✔️      | ❌ no static IP        |
| Standard v2             | ~$700/unit             | ❌        | ✔️      | ❌ no static IP        |

`apim.bicep` defaults to **Developer** (no SLA — fine for internal ops
automation). A self-managed Azure VM with a static IP (~$10/mo) is cheaper
overall but is not a managed gateway.

## Files

| File                                              | Purpose                                                                                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apim.bicep`                                      | Phase 1 — the APIM service (Developer tier, system-assigned identity). Outputs the static IP + identity principal ID.                                                     |
| `apis.bicep`                                      | Phase 2 — KV-linked secret named values, the cPanel backend (TLS validation off), the `/cpanel` API + GET/POST operations, the auth-injection policy, and a subscription. |
| `policies/cpanel-api.xml`                         | API policy: routes to the `cpanel` backend and injects `Authorization: cpanel {{user}}:{{token}}`.                                                                        |
| `../../.github/workflows/cpanel-apim-deploy.yml`  | Orchestrates phase 1 → grant KV access → phase 2.                                                                                                                         |
| `../../.github/workflows/cpanel-ops-via-apim.yml` | Calls cPanel UAPI through the gateway (also a connectivity check).                                                                                                        |

## Prerequisites (one-time, admin)

1. **Azure deploy identity** — a service principal with a federated credential
   for this repo's `cpanel-apim-deploy` environment, holding:
   - **Contributor** on the target resource group, and
   - rights to grant Key Vault access (**User Access Administrator** on the KV if
     it uses RBAC, or Key Vault access-policy admin).
2. **Environment `cpanel-apim-deploy` secrets:** `AZURE_DEPLOY_CLIENT_ID`,
   `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`.
3. **Target resource group** already created.
4. **Key Vault secrets** present (already are): `wr-all-cbm-cpanel-ffc-interserver-api-token`,
   `wr-all-cbm-cpanel-ffc-interserver-user`, `wr-all-cbm-cpanel-ffc-interserver-server`.

## Deploy

Run the **Deploy cPanel APIM gateway** workflow (Actions → manual dispatch) with:

| Input                      | Example                                                               |
| -------------------------- | --------------------------------------------------------------------- |
| `resource_group`           | `rg-ffc-cpanel-gateway`                                               |
| `location`                 | `eastus`                                                              |
| `apim_name`                | `apim-ffc-cpanel` (globally unique)                                   |
| `publisher_email`          | an address that should receive APIM notices                           |
| `cpanel_api_base_url`      | `https://<hostname>:2083` (hostname is in the `...-server` KV secret) |
| `key_vault_name`           | `kv-ffc-admin-prod-cbm`                                               |
| `key_vault_resource_group` | the KV's resource group                                               |

The workflow:

1. Deploys `apim.bicep` (**~30–45 min** — APIM provisioning is slow).
2. Grants APIM's managed identity **Get + List secrets** on the Key Vault
   (auto-detects RBAC vs access-policy model).
3. Deploys `apis.bicep` (named values, backend, API, policy, subscription).
4. Prints the **static IP to whitelist** and the gateway URL in the run summary.

### Manual equivalent (Azure CLI)

```bash
# Phase 1
az deployment group create -g rg-ffc-cpanel-gateway \
  --template-file infra/cpanel-apim/apim.bicep \
  --parameters location=eastus apimName=apim-ffc-cpanel publisherEmail=you@ffc.org
PID=$(az deployment group show -g rg-ffc-cpanel-gateway -n <deployment> --query properties.outputs.apimPrincipalId.value -o tsv)

# Grant KV access (RBAC model shown)
KVID=$(az keyvault show -n kv-ffc-admin-prod-cbm --query id -o tsv)
az role assignment create --assignee-object-id "$PID" --assignee-principal-type ServicePrincipal \
  --role "Key Vault Secrets User" --scope "$KVID"

# Phase 2
az deployment group create -g rg-ffc-cpanel-gateway \
  --template-file infra/cpanel-apim/apis.bicep \
  --parameters apimName=apim-ffc-cpanel keyVaultName=kv-ffc-admin-prod-cbm \
               cpanelApiBaseUrl=https://<hostname>:2083
```

## Post-deploy

1. **Whitelist the static IP in Imunify360.** On a **shared host** (our case,
   InterServer `webhosting1900.is.cc`) the end-user cPanel Imunify360 panel only
   exposes _Malware Scanner_ and _Proactive Defense_ — there is **no Firewall /
   Whitelist tab**; that lives in WHM at the root/server level. So you must **open
   a support ticket asking the host to whitelist the IP** server-side in
   Imunify360's firewall/bot-protection allowlist. On a VPS/reseller plan where you
   control WHM, do it yourself: WHM → Imunify360 → Firewall → Whitelist.
   Until the IP is whitelisted, calls return HTTP 200 with body
   `{"message":"Access denied by Imunify360 bot-protection..."}` — that response
   coming back _through the gateway_ confirms auth + routing already work.
2. **Subscription key.** The primary key is kept in Key Vault as
   `read-all-ffc-apim-gateway-subscription-key` (the rotation source of truth).
   The **cPanel ops via APIM** verify workflow consumes it as the GitHub Actions
   secret `APIM_SUBSCRIPTION_KEY` (and the gateway URL as `APIM_GATEWAY_URL`), so
   populate those two secrets from the KV value once. Unlike the cPanel token —
   which never leaves Key Vault — this lower-sensitivity gateway key is surfaced to
   CI as an Actions secret; rotating it means regenerating the APIM key and
   refreshing both the KV secret and `APIM_SUBSCRIPTION_KEY`. To re-read it at the
   source:
   ```bash
   az rest --method post --uri \
     "https://management.azure.com/subscriptions/<sub>/resourceGroups/rg-ffc-admin-apim/providers/Microsoft.ApiManagement/service/apim-ffc-gateway-prod/subscriptions/cpanel-ops/listSecrets?api-version=2022-08-01" \
     --query primaryKey -o tsv
   ```
3. **Verify** with the **cPanel ops via APIM** workflow (defaults to a read-only
   `DomainInfo/list_domains` call). Real JSON (not the Imunify block message) ⇒
   whitelist + auth injection work end-to-end.

## Security notes

- The cPanel token and username live only in Key Vault; APIM pulls them via its
  managed identity as **secret named values** (versionless URIs ⇒ auto-rotate).
  They are never committed, logged, or passed through the pipeline.
- Callers authenticate to APIM with a **subscription key** and never see the
  cPanel token. The policy **strips `Ocp-Apim-Subscription-Key`** before
  forwarding, so the gateway key never reaches cPanel or the host's logs.
  Rotate the key with `az apim subscription regenerate-key`.
- The policy applies a **rate limit** (300 calls / 60 s per subscription) as a
  safety net, so a leaked key cannot be used to hammer the UAPI from the
  whitelisted IP.
- The gateway **refuses legacy TLS** (1.0/1.1, SSL3) and 3DES on both the
  client and backend sides (`customProperties` in `apim.bicep`).
- Deploy-workflow inputs are passed through `env` (never interpolated directly
  into `run:`) to avoid GitHub Actions script injection.
- Backend TLS validation is disabled because cPanel presents a shared/self-signed
  cert on :2083; the connection is still HTTPS-encrypted but the backend's
  identity is not verified. **Residual risk:** an attacker able to MITM the
  APIM→cPanel hop could read the injected token. If the cPanel hostname presents
  a valid CA-signed cert, re-enable `validateCertificateName` in `apis.bicep`.
- **Blast-radius control — operation allowlist.** On shared cPanel the API
  token is unavoidably **full-access**: the user-level _Manage API Tokens_ UI
  only supports rename/revoke — it cannot scope a token's privileges or
  restrict it by IP (those are WHM/root features we don't have). So the gateway
  policy enforces an **allowlist** of the exact UAPI `{module}/{function}` calls
  our automation uses (backup/list/restore + the read-only `list_*` views) and
  returns **403** for anything else. Extend the list in
  `policies/cpanel-api.xml` as new operations are needed.
- **De-facto IP restriction.** Because Imunify360 blocks port 2083 from any
  non-whitelisted IP, a leaked cPanel token cannot be used over the API from an
  arbitrary IP anyway — only from the gateway's static IP (and operator IPs the
  host already trusts). This compensates for the missing per-token IP allowlist.
- **Rotation** is the primary token hygiene: revoke + recreate the cPanel token,
  update the KV secret, and APIM auto-refreshes the named value (no redeploy).

## Scope / limits

- APIM is **HTTP(S) only** — it fronts the cPanel **UAPI**, not SSH. UAPI covers
  most automation (DomainInfo, Fileman, Cron, Mysql, Backup, etc.). SSH-only
  runbook steps still need a separate path.
- The `/cpanel/execute/{module}/{function}` operations map 1:1 to UAPI calls;
  query/body params pass through unchanged.
