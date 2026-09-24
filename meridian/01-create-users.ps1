<#
Bulk-creates Entra ID users from docs/phase-02-client-environment/users.csv via Microsoft Graph.
Safe to re-run: existing users (matched by UserPrincipalName) are skipped, not duplicated.

Prerequisites:
  Install-Module Microsoft.Graph -Scope CurrentUser
  Connect-MgGraph -Scopes "User.ReadWrite.All"

Before running: replace "yourtenant.onmicrosoft.com" in users.csv with your actual
M365 tenant domain.
#>

param(
    [string]$CsvPath = "$PSScriptRoot/../docs/phase-02-client-environment/users.csv"
)

if (-not (Get-MgContext)) {
    throw "Not connected to Microsoft Graph. Run: Connect-MgGraph -Scopes 'User.ReadWrite.All'"
}

$users = Import-Csv -Path $CsvPath

foreach ($user in $users) {
    $existing = Get-MgUser -Filter "userPrincipalName eq '$($user.UserPrincipalName)'" -ErrorAction SilentlyContinue

    if ($existing) {
        Write-Host "Skipping (already exists): $($user.UserPrincipalName)" -ForegroundColor Yellow
        continue
    }

    $mailNickname = $user.UserPrincipalName.Split('@')[0].Replace('.', '')
    $tempPassword = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 16 | ForEach-Object { [char]$_ })

    $passwordProfile = @{
        Password                      = $tempPassword
        ForceChangePasswordNextSignIn = $true
    }

    New-MgUser `
        -DisplayName $user.DisplayName `
        -UserPrincipalName $user.UserPrincipalName `
        -MailNickname $mailNickname `
        -AccountEnabled `
        -PasswordProfile $passwordProfile `
        -JobTitle $user.JobTitle `
        -Department $user.Department `
        -UsageLocation $user.UsageLocation `
        -GivenName $user.FirstName `
        -Surname $user.LastName

    Write-Host "Created: $($user.UserPrincipalName) (temp password: $tempPassword)" -ForegroundColor Green
}
