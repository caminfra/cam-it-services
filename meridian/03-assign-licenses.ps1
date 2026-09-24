<#
Assigns a license SKU to every user in docs/phase-02-client-environment/users.csv.
Safe to re-run: users who already hold the SKU are skipped, not re-assigned.

Prerequisites:
  Install-Module Microsoft.Graph -Scope CurrentUser
  Connect-MgGraph -Scopes "User.ReadWrite.All","Organization.Read.All"

Find your tenant's available SKU part numbers first:
  Get-MgSubscribedSku | Select-Object SkuPartNumber, ConsumedUnits, PrepaidUnits
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$SkuPartNumber,

    [string]$CsvPath = "$PSScriptRoot/../docs/phase-02-client-environment/users.csv"
)

if (-not (Get-MgContext)) {
    throw "Not connected to Microsoft Graph. Run: Connect-MgGraph -Scopes 'User.ReadWrite.All','Organization.Read.All'"
}

$sku = Get-MgSubscribedSku | Where-Object { $_.SkuPartNumber -eq $SkuPartNumber }

if (-not $sku) {
    throw "No SKU named '$SkuPartNumber' found in this tenant. Run Get-MgSubscribedSku to see available SKUs."
}

$available = $sku.PrepaidUnits.Enabled - $sku.ConsumedUnits
Write-Host "SKU '$SkuPartNumber': $available seat(s) available" -ForegroundColor Cyan

$users = Import-Csv -Path $CsvPath

foreach ($user in $users) {
    $graphUser = Get-MgUser -Filter "userPrincipalName eq '$($user.UserPrincipalName)'" -Property "id,usageLocation" -ErrorAction SilentlyContinue

    if (-not $graphUser) {
        Write-Host "Skipping $($user.UserPrincipalName): user not found (create users first)" -ForegroundColor Red
        continue
    }

    if (-not $graphUser.UsageLocation) {
        Write-Host "Skipping $($user.UserPrincipalName): no UsageLocation set (required before licensing)" -ForegroundColor Red
        continue
    }

    $existingLicenses = Get-MgUserLicenseDetail -UserId $graphUser.Id

    if ($existingLicenses.SkuPartNumber -contains $SkuPartNumber) {
        Write-Host "Already licensed: $($user.UserPrincipalName)" -ForegroundColor Yellow
        continue
    }

    Set-MgUserLicense `
        -UserId $graphUser.Id `
        -AddLicenses @{ SkuId = $sku.SkuId } `
        -RemoveLicenses @()

    Write-Host "Licensed: $($user.UserPrincipalName) -> $SkuPartNumber" -ForegroundColor Green
}
