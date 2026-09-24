<#
Creates the department security groups from docs/phase-02-client-environment/users-and-groups.md
and populates each from users.csv (matched by Department). Safe to re-run: existing groups and
memberships are skipped, not duplicated.

Prerequisites:
  Install-Module Microsoft.Graph -Scope CurrentUser
  Connect-MgGraph -Scopes "User.ReadWrite.All","Group.ReadWrite.All"
#>

param(
    [string]$CsvPath = "$PSScriptRoot/../docs/phase-02-client-environment/users.csv"
)

if (-not (Get-MgContext)) {
    throw "Not connected to Microsoft Graph. Run: Connect-MgGraph -Scopes 'User.ReadWrite.All','Group.ReadWrite.All'"
}

$departmentGroups = @{
    "Executive"        = "SG-Executive"
    "IT"               = "SG-IT"
    "Finance"          = "SG-Finance"
    "Human Resources"  = "SG-HR"
    "Operations"       = "SG-Operations"
}

$users = Import-Csv -Path $CsvPath

foreach ($groupName in $departmentGroups.Values) {
    $existingGroup = Get-MgGroup -Filter "displayName eq '$groupName'" -ErrorAction SilentlyContinue

    if ($existingGroup) {
        Write-Host "Group already exists: $groupName" -ForegroundColor Yellow
    } else {
        $existingGroup = New-MgGroup `
            -DisplayName $groupName `
            -MailNickname $groupName `
            -MailEnabled:$false `
            -SecurityEnabled:$true `
            -GroupTypes @()

        Write-Host "Created group: $groupName" -ForegroundColor Green
    }

    $groupId = $existingGroup.Id
    $currentMemberIds = (Get-MgGroupMember -GroupId $groupId -All).Id

    $department = ($departmentGroups.GetEnumerator() | Where-Object { $_.Value -eq $groupName }).Key
    $departmentUsers = $users | Where-Object { $_.Department -eq $department }

    foreach ($deptUser in $departmentUsers) {
        $graphUser = Get-MgUser -Filter "userPrincipalName eq '$($deptUser.UserPrincipalName)'" -ErrorAction SilentlyContinue

        if (-not $graphUser) {
            Write-Host "  Skipping $($deptUser.UserPrincipalName): user not found (create users first)" -ForegroundColor Red
            continue
        }

        if ($currentMemberIds -contains $graphUser.Id) {
            Write-Host "  Already a member: $($deptUser.UserPrincipalName)" -ForegroundColor Yellow
            continue
        }

        New-MgGroupMember -GroupId $groupId -DirectoryObjectId $graphUser.Id
        Write-Host "  Added to ${groupName}: $($deptUser.UserPrincipalName)" -ForegroundColor Green
    }
}
