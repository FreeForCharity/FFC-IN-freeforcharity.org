// Phase 2: the cPanel UAPI proxy on an existing APIM instance.
//
// Adds:
//   - two SECRET named values sourced from Key Vault (cpanel token + user),
//     resolved by APIM's managed identity -- the secret value never transits
//     this pipeline or the repo;
//   - a backend pointing at the cPanel UAPI with TLS validation disabled
//     (cPanel presents a shared/self-signed cert);
//   - an API (path /cpanel) with GET/POST /execute/{module}/{function}
//     operations and a subscription so callers authenticate with a key;
//   - an API policy that injects "Authorization: cpanel {{user}}:{{token}}"
//     and Accept: application/json, then forwards to the backend.
//
// PREREQUISITE: APIM's managed identity (apim.bicep output apimPrincipalId)
// must already have Get+List secrets on the Key Vault, or the named values
// fail to resolve.

@description('Name of the existing APIM instance (from apim.bicep).')
param apimName string

@description('Key Vault name holding the cPanel secrets.')
param keyVaultName string = 'kv-ffc-admin-prod-cbm'

@description('KV secret name for the cPanel API token.')
param tokenSecretName string = 'wr-all-cbm-cpanel-ffc-interserver-api-token'

@description('KV secret name for the cPanel account username.')
param userSecretName string = 'wr-all-cbm-cpanel-ffc-interserver-user'

@description('cPanel UAPI base URL incl. port, e.g. https://hostname.example.net:2083 (the hostname is in KV secret wr-all-cbm-cpanel-ffc-interserver-server).')
param cpanelApiBaseUrl string

// Versionless KV secret identifiers => APIM auto-refreshes on rotation.
var tokenSecretId = 'https://${keyVaultName}${environment().suffixes.keyvaultDns}/secrets/${tokenSecretName}'
var userSecretId = 'https://${keyVaultName}${environment().suffixes.keyvaultDns}/secrets/${userSecretName}'

resource apim 'Microsoft.ApiManagement/service@2022-08-01' existing = {
  name: apimName
}

resource nvToken 'Microsoft.ApiManagement/service/namedValues@2022-08-01' = {
  parent: apim
  name: 'cpanel-api-token'
  properties: {
    displayName: 'cpanel-api-token'
    secret: true
    keyVault: {
      secretIdentifier: tokenSecretId
    }
  }
}

resource nvUser 'Microsoft.ApiManagement/service/namedValues@2022-08-01' = {
  parent: apim
  name: 'cpanel-user'
  properties: {
    displayName: 'cpanel-user'
    secret: true
    keyVault: {
      secretIdentifier: userSecretId
    }
  }
}

resource backend 'Microsoft.ApiManagement/service/backends@2022-08-01' = {
  parent: apim
  name: 'cpanel'
  properties: {
    url: cpanelApiBaseUrl
    protocol: 'http'
    tls: {
      validateCertificateChain: false
      validateCertificateName: false
    }
  }
}

resource api 'Microsoft.ApiManagement/service/apis@2022-08-01' = {
  parent: apim
  name: 'cpanel'
  properties: {
    displayName: 'cPanel UAPI proxy'
    path: 'cpanel'
    protocols: [
      'https'
    ]
    subscriptionRequired: true
    serviceUrl: cpanelApiBaseUrl
  }
}

resource opGet 'Microsoft.ApiManagement/service/apis/operations@2022-08-01' = {
  parent: api
  name: 'uapi-get'
  properties: {
    displayName: 'UAPI GET'
    method: 'GET'
    urlTemplate: '/execute/{module}/{function}'
    templateParameters: [
      {
        name: 'module'
        type: 'string'
        required: true
      }
      {
        name: 'function'
        type: 'string'
        required: true
      }
    ]
  }
}

resource opPost 'Microsoft.ApiManagement/service/apis/operations@2022-08-01' = {
  parent: api
  name: 'uapi-post'
  properties: {
    displayName: 'UAPI POST'
    method: 'POST'
    urlTemplate: '/execute/{module}/{function}'
    templateParameters: [
      {
        name: 'module'
        type: 'string'
        required: true
      }
      {
        name: 'function'
        type: 'string'
        required: true
      }
    ]
  }
}

resource apiPolicy 'Microsoft.ApiManagement/service/apis/policies@2022-08-01' = {
  parent: api
  name: 'policy'
  properties: {
    format: 'rawxml'
    value: loadTextContent('./policies/cpanel-api.xml')
  }
  dependsOn: [
    nvToken
    nvUser
    backend
  ]
}

// Subscription scoped to this API => the caller (CI) authenticates with its key.
resource sub 'Microsoft.ApiManagement/service/subscriptions@2022-08-01' = {
  parent: apim
  name: 'cpanel-ops'
  properties: {
    displayName: 'cPanel ops (CI)'
    scope: api.id
    state: 'active'
  }
}

@description('Call this base path: https://<gateway>/cpanel/execute/<Module>/<func>')
output cpanelApiPath string = '${apim.properties.gatewayUrl}/cpanel/execute'

@description('Retrieve the subscription key with: az apim subscription show ... or the REST listSecrets on this subscription id.')
output subscriptionResourceId string = sub.id
