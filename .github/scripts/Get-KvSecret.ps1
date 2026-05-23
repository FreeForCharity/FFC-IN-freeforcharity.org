<#
.SYNOPSIS
    Defines Get-KvSecret. Dot-source from a GitHub Actions step to use.

.DESCRIPTION
    Shared helper for workflow steps that pull secrets from Azure Key Vault
    via az CLI (assumes the caller has already azure/login@v2'd via OIDC).
    Mirrors scripts/keyvault/Get-KvSecret.ps1 in FFC-IN-ClarkeMoyerAdmin.
#>

function Get-KvSecret {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][string]$VaultName,
        [Parameter(Mandatory = $true)][string]$Name
    )

    $value = az keyvault secret show --vault-name $VaultName --name $Name --query value -o tsv
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to read Key Vault secret '$Name' from '$VaultName'."
    }
    $value = [string]$value
    if ([string]::IsNullOrWhiteSpace($value)) {
        throw "Key Vault secret '$Name' is empty in '$VaultName'."
    }
    return $value.Trim()
}
