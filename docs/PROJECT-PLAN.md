# CamGotIT — Cloud Portfolio Project Plan

**Repo:** `cam-it-services` (the single home for CamGotIT — the business *and* the Azure/identity portfolio)
**This initiative:** Provision and manage a real client tenant — **Meridian Law & Advisory** — using Microsoft 365, Entra ID, Intune, and PowerShell/Graph automation, backed by a light Azure footprint.
**Deploys to:** Free Microsoft 365 developer tenant + a small Azure PAYG footprint.
**Status:** Planning

---

## How this fits the bigger picture

CamGotIT tells one story across the whole repo:

> *CamGotIT is a real IT services business — and here is the actual cloud engineering behind it. The business onboards a compliance-sensitive client (a law firm), provisions their identities, secures their devices, and automates their lifecycle.*

Everything lives in one repo under the CamGotIT brand: the business (site + marketing), a light-but-real Azure footprint, and the Meridian client tenant (M365/Entra/Intune + PowerShell/Graph automation). One repo, one brand, the full arc — infrastructure *and* identity.

**Scope principle (important):** Azure infrastructure here is deliberately **light and realistic** — a small, genuine footprint that supports the Meridian work, not an enterprise landing zone built for its own sake. The weight of this project is on **identity + endpoint management**, which is where the Meridian story lives and where the strongest AZ-104 / real-job relevance is. If the Azure layer ever starts sprawling into a full networking build, that's scope creep — pull it back.

---

## The two layers (rebalanced)

| Layer | Weight | What it is | Tooling |
|---|---|---|---|
| **Layer 1 — Light Azure footprint** | Supporting | One resource group, Key Vault (secrets for scripts), a storage account (script logs/exports). Just enough to be real — **no networking build here.** | Azure CLI (+ optional small Terraform) |
| **Layer 2 — Meridian client tenant** | **The main event** | Users, groups, licensing, MFA, Intune compliance + config, Conditional Access, lifecycle automation | **PowerShell + Microsoft Graph** |

> Layer 1 exists only to support Layer 2 (a safe place to store secrets and script output). Keep it minimal — if it starts growing into a full networking build, that's scope creep for this project. We can always expand it deliberately later if a real need appears.

---

## Suggested repo structure

```
cam-it-services/
├── index.html                         # the business (Phase 1 — done)
├── services-pricing.html
├── business-card.html
├── marketing/
│   ├── google-business-profile.md
│   └── facebook-starter-kit.md
│
├── docs/
│   ├── phase-02-client-environment/   # Meridian org design (done)
│   │   ├── README.md
│   │   ├── users.csv
│   │   └── groups.md
│   ├── azure-footprint.md
│   └── diagrams/
│
├── azure/                             # Layer 1 — light footprint
│   └── (RG + Key Vault + storage; CLI script or small TF)
│
├── meridian/                          # Layer 2 — the main work
│   ├── 01-create-users.ps1
│   ├── 02-create-groups.ps1
│   ├── 03-assign-licenses.ps1
│   ├── 04-mfa-baseline.ps1
│   ├── intune/
│   └── automation/
│       ├── offboard-user.ps1
│       └── report-access.ps1
│
└── scripts/                           # shared helpers
```

---

## Milestones

Five milestones, dependency-ordered. Layer 1 shrank to a single lightweight milestone; the weight is on Meridian.

### M0 — Project & Toolchain Setup
- [ ] `docs/`, `azure/`, `meridian/`, `scripts/` folders added to `cam-it-services`
- [ ] `.gitignore` covers PowerShell + Terraform + secrets (`*.tfstate*`, `.env`, `*.publishsettings`)
- [ ] Project board + labels + milestones created
- [ ] Azure budget alert ($5 / $10) set
- [ ] Toolchain installed: `az`, PowerShell 7, `Microsoft.Graph` module
- **Exit:** `az account show` and `Connect-MgGraph` both succeed; board is live.

### M1 — Light Azure Footprint
Just enough Azure to support the automation — no networking.
- [ ] One resource group (e.g. `rg-camgotit-shared`)
- [ ] Key Vault for script secrets/credentials
- [ ] Storage account for script logs + CSV exports
- [ ] Tagging + naming applied
- **Exit:** Secrets live in Key Vault (none in code); storage ready for exports.

### M2 — Meridian Tenant Provisioning  (core)
- [ ] Free M365 dev tenant created; domain confirmed
- [ ] `users.csv` UPNs updated to the real tenant domain
- [ ] 14 users bulk-created via Graph (idempotent)
- [ ] Functional + scope security groups created and populated (matches `groups.md`)
- [ ] Licenses assigned (Usage Location handled)
- **Exit:** All 14 users + groups exist; membership matches the matrix; everyone can sign in.

### M3 — Identity Security  (core)
- [ ] MFA enforced for all staff (`SG-AllStaff`) via Security Defaults or a CA policy
- [ ] RBAC / admin roles least-privilege (only CamGotIT seat is admin)
- [ ] Break-glass admin account documented
- [ ] Sign-in + audit logs reviewed once, screenshotted
- **Exit:** MFA required for a test user; no over-privileged accounts.

### M4 — Endpoint Management (Intune)  (core)
- [ ] Compliance policy: encryption, min OS, firewall, AV → target `SG-AllStaff`
- [ ] Config profiles: baseline for all, stricter for laptops
- [ ] Conditional Access: block non-compliant devices
- **Exit:** A test device enrolls, gets policy, and a non-compliant sign-in is blocked.

### M5 — Automation & Documentation
- [ ] `offboard-user.ps1` (disable, revoke sessions, remove from groups, reclaim license)
- [ ] `report-access.ps1` (group membership + license usage → CSV in the storage account)
- [ ] Identity + endpoint architecture diagram
- [ ] Per-milestone docs with screenshots; README ties business <-> technical
- **Exit:** Onboarding + offboarding run from scripts; repo reads like real client work.

---

## Project board

GitHub Projects Kanban:

```
Backlog  |  To Do (this sprint)  |  In Progress (WIP <= 2)  |  In Review (self-QA)  |  Done
```
Rules: WIP <= 2 - every card is an issue - "In Review" = verify exit criteria + screenshot before closing.
Custom fields: Layer (Azure/Meridian/Meta) - Effort (S/M/L) - Sprint.

---

## Labels

| Label | Color | Meaning |
|---|---|---|
| `layer:azure` | `#0078FF` | Layer 1 — light Azure footprint |
| `layer:meridian` | `#0D47A1` | Layer 2 — M365/Graph/Intune |
| `layer:meta` | `#6E7681` | Repo/docs/project setup |
| `type:infra` | `#1A7F37` | Provisioning |
| `type:security` | `#D1242F` | Identity, RBAC, CA, compliance |
| `type:automation` | `#8250DF` | Scripts |
| `type:docs` | `#BF8700` | Documentation |
| `effort:S` / `effort:M` / `effort:L` | grey | Rough size |
| `blocked` | `#000000` | Waiting on a dependency |

---

## Issues (copy-paste ready)

### M0 — Project & Toolchain Setup

**Issue: Add project folders + `.gitignore` to `cam-it-services`**
Labels: `layer:meta`, `type:docs`, `effort:S` - Milestone: M0
- [ ] Add `azure/`, `meridian/`, `scripts/`, `docs/diagrams/`
- [ ] `.gitignore`: `*.tfstate*`, `.terraform/`, `.env`, `*.publishsettings`, `*.log`
- [ ] Move `marketing/` docs + Phase 2 files into place
**Acceptance:** structure matches the plan; no secrets tracked.

**Issue: Create board, labels, milestones**
Labels: `layer:meta`, `effort:S` - Milestone: M0
- [ ] Milestones M0–M5
- [ ] All labels
- [ ] Kanban board + custom fields (Layer, Effort, Sprint)
**Acceptance:** board live; milestones + labels available.

**Issue: Set Azure cost guardrails**
Labels: `layer:azure`, `type:infra`, `effort:S` - Milestone: M0
- [ ] `az account show` confirms subscription
- [ ] Budget with alerts at $5 and $10
**Acceptance:** budget + alerts active.

**Issue: Install + authenticate toolchain**
Labels: `layer:meta`, `type:infra`, `effort:M` - Milestone: M0
- [ ] Azure CLI → `az login`
- [ ] PowerShell 7 + `Microsoft.Graph` → `Connect-MgGraph`
- [ ] Record versions in `docs/toolchain.md`
**Acceptance:** both auth commands succeed.

### M1 — Light Azure Footprint

**Issue: Create shared resource group**
Labels: `layer:azure`, `type:infra`, `effort:S` - Milestone: M1
- [ ] `rg-camgotit-shared` with tags (`owner`, `project=cam-it-services`)
**Acceptance:** RG exists, tagged.

**Issue: Add Key Vault for script secrets**
Labels: `layer:azure`, `type:security`, `effort:M` - Milestone: M1
- [ ] Key Vault in the shared RG
- [ ] Store any Graph app credential / secret there
**Acceptance:** no secret ever committed to the repo.

**Issue: Add storage account for logs + exports**
Labels: `layer:azure`, `type:infra`, `effort:S` - Milestone: M1
- [ ] Storage account, secure defaults (no public blob, TLS 1.2)
- [ ] Container for report CSVs
**Acceptance:** scripts can write exports here.

### M2 — Meridian Tenant Provisioning

**Issue: Create free M365 dev tenant + confirm domain**
Labels: `layer:meridian`, `type:infra`, `effort:M` - Milestone: M2
- [ ] Sign up for M365 developer tenant
- [ ] Confirm `<name>.onmicrosoft.com`
- [ ] Update `users.csv` UPNs to match
**Acceptance:** tenant live; admin signs in; domain confirmed.

**Issue: Bulk-create 14 users via Graph (`01-create-users.ps1`)**
Labels: `layer:meridian`, `type:automation`, `effort:L` - Milestone: M2
- [ ] Read `docs/phase-02-client-environment/users.csv`
- [ ] Create users: UPN, display name, Usage Location = US, force password change
- [ ] Idempotent (safe re-run)
**Acceptance:** 14 users exist; re-run makes no duplicates.

**Issue: Create + populate groups (`02-create-groups.ps1`)**
Labels: `layer:meridian`, `type:security`, `effort:M` - Milestone: M2
- [ ] Functional groups (`SG-Partners`, `SG-Attorneys`, …)
- [ ] Scope groups (`SG-AllStaff`, `SG-Legal`, `SG-Finance`, …)
- [ ] Populate from `groups.md`
**Acceptance:** membership matches the matrix exactly.

**Issue: Assign licenses (`03-assign-licenses.ps1`)**
Labels: `layer:meridian`, `type:infra`, `effort:S` - Milestone: M2
- [ ] Map license column from CSV; prefer group-based licensing
**Acceptance:** correct license per user; no usage-location errors.

### M3 — Identity Security

**Issue: Enforce MFA baseline (`04-mfa-baseline.ps1` or CA)**
Labels: `layer:meridian`, `type:security`, `effort:M` - Milestone: M3
- [ ] Security Defaults or CA MFA policy targeting `SG-AllStaff`
- [ ] Test with one account
**Acceptance:** MFA required for a test user.

**Issue: Least-privilege admin roles + break-glass**
Labels: `layer:meridian`, `type:security`, `effort:M` - Milestone: M3
- [ ] Only the CamGotIT seat holds admin
- [ ] Document a break-glass account (excluded from CA), stored in Key Vault
**Acceptance:** no over-privileged users; break-glass documented.

### M4 — Endpoint Management (Intune)

**Issue: Device compliance policy**
Labels: `layer:meridian`, `type:security`, `effort:L` - Milestone: M4
- [ ] Encryption required, min OS, firewall on, AV on → target `SG-AllStaff`
**Acceptance:** a test device reports compliance correctly.

**Issue: Config profiles (laptop vs desktop)**
Labels: `layer:meridian`, `type:security`, `effort:M` - Milestone: M4
- [ ] Baseline for all; stricter for laptops (auto-lock, BitLocker, remote wipe)
**Acceptance:** laptops verifiably stricter than desktops.

**Issue: Conditional Access — block non-compliant devices**
Labels: `layer:meridian`, `type:security`, `effort:M` - Milestone: M4
- [ ] CA: require compliant device for M365 apps; test the block
**Acceptance:** non-compliant sign-in denied; compliant succeeds.

### M5 — Automation & Documentation

**Issue: Offboarding script (`offboard-user.ps1`)**
Labels: `layer:meridian`, `type:automation`, `effort:M` - Milestone: M5
- [ ] Disable account, revoke sessions, remove from groups, reclaim license, log actions
**Acceptance:** one command fully offboards a test user.

**Issue: Access report (`report-access.ps1`)**
Labels: `layer:meridian`, `type:automation`, `type:docs`, `effort:M` - Milestone: M5
- [ ] Group membership + license usage → CSV to the storage account
**Acceptance:** report matches tenant reality.

**Issue: Architecture diagram (identity + endpoint)**
Labels: `layer:meta`, `type:docs`, `effort:M` - Milestone: M5
- [ ] Diagram the Meridian tenant, groups, policies, and light Azure footprint
**Acceptance:** diagram reflects what's deployed.

**Issue: Final documentation pass**
Labels: `layer:meta`, `type:docs`, `effort:M` - Milestone: M5
- [ ] Each milestone doc has steps + screenshots
- [ ] Root README ties the business to the technical work
- [ ] Cross-link the board
**Acceptance:** a stranger understands what you built and why.

---

## First three sprints

| Sprint | Focus | Issues |
|---|---|---|
| **Sprint 1** | Project + tooling ready | All of M0 |
| **Sprint 2** | Meridian tenant exists | Create tenant → import users → groups → licenses (M2) |
| **Sprint 3** | Lock it down | MFA + least-privilege (M3), start Intune (M4) |

> Layer 1 (M1) is small — slot it in wherever; it's not on the critical path to the Meridian story. Keep sprints to ~1-hour blocks, one issue to Done per session, screenshot as you go.

---

_Meridian Law & Advisory is a fictional client created for portfolio purposes._
