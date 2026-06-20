// Phase 1: the API Management instance itself.
//
// Deploy this FIRST, then grant the output managed identity Get+List secrets
// on the Key Vault, then deploy apis.bicep (which adds the KV-linked named
// values + cPanel API). APIM takes ~30-45 min to provision.
//
// Static IP note: only the classic Developer/Basic/Standard/Premium tiers get
// a dedicated STATIC public IP. Consumption and the v2 tiers (Basic v2 /
// Standard v2 / Premium v2) run on shared infra with NO deterministic IP, so
// they can't be whitelisted in Imunify360. Developer is the cheapest static-IP
// tier (no SLA -- fine for internal ops automation).

@description('Azure region for the APIM instance.')
param location string = resourceGroup().location

@description('APIM instance name (globally unique; forms <name>.azure-api.net).')
param apimName string

@description('Publisher email shown on the instance (required by Azure; receives service notices).')
param publisherEmail string

@description('Publisher / organization name.')
param publisherName string = 'Free For Charity'

@description('SKU. Must be a classic tier for a static IP. Developer = cheapest static IP, no SLA.')
@allowed([
  'Developer'
  'Basic'
  'Standard'
  'Premium'
])
param skuName string = 'Developer'

@description('Scale units.')
param skuCapacity int = 1

resource apim 'Microsoft.ApiManagement/service@2022-08-01' = {
  name: apimName
  location: location
  sku: {
    name: skuName
    capacity: skuCapacity
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    publisherEmail: publisherEmail
    publisherName: publisherName
  }
}

@description('System-assigned identity principal ID. Grant this Get+List secrets on the Key Vault before deploying apis.bicep.')
output apimPrincipalId string = apim.identity.principalId

@description('Static public IP the cPanel host / Imunify360 sees on outbound calls. Whitelist this single address.')
output apimStaticIp string = apim.properties.publicIPAddresses[0]

@description('Gateway base URL; callers hit https://<gatewayUrl>/cpanel/execute/<Module>/<func>.')
output gatewayUrl string = apim.properties.gatewayUrl

output apimName string = apim.name
