# Phase 2 — Client Environment Lab
## Fictional Client: Meridian Law & Advisory

> A fictional client organization used to simulate real-world IT administration, identity management, endpoint control, and compliance work. This is the sandbox that Phases 3–5 (Intune, Azure, Automation) are built on top of.

---

## 1. Why this client exists

Managing a live business's real users is risky and slow to learn on. **Meridian Law & Advisory** is a realistic stand-in: a small professional-services firm with exactly the traits that make identity and security work *interesting* — confidential data, role-based access needs, a mix of device types, and real compliance pressure — without the volume of a 500-person enterprise.

Everything CamGotIT does for Meridian mirrors what a real MSP does for a real client. That's the point: the portfolio should read like client work, not lab exercises.

---

## 2. Company profile

| | |
|---|---|
| **Name** | Meridian Law & Advisory |
| **Type** | Small law firm with an in-house accounting/advisory practice |
| **Location** | Single office, Jackson, MS metro |
| **Headcount** | 14 staff + 1 shared resource account |
| **IT model** | No internal IT department — outsourced to **CamGotIT IT Services** (managed services) |
| **Cloud tenant** | `meridianlaw.onmicrosoft.com` |
| **Vanity domain** | `meridian-law.com` (used for user sign-in / email) |

**The business in one line:** Meridian handles legal casework *and* client financials under one roof, which means two different kinds of highly sensitive data (privileged legal files + financial/tax records) living in the same tenant. That is the whole reason access control matters here.

---

## 3. Compliance & security drivers

This is what makes a law/accounting firm the richest sandbox — every one of these maps to a real Azure/Intune feature you'll configure later:

| Business reality | The IT control it forces you to learn |
|---|---|
| Attorney–client privilege | Least-privilege access, data segmentation between departments |
| Financial & tax records (IRS, PII) | Data Loss Prevention (DLP), encryption, retention policies |
| Partners see everything; receptionist sees almost nothing | **Role-Based Access Control (RBAC)** and security groups |
| Staff work late / take laptops home | **Conditional Access**, MFA, device compliance |
| A lost laptop = a data breach | Disk encryption (BitLocker), remote wipe via Intune |
| Auditors may ask "who accessed what?" | Sign-in logs, audit logs, access reviews |

> **Takeaway for the portfolio:** you're not turning on features because a lab told you to — you're turning them on because *Meridian's business requires it.* That "why" is exactly what separates a junior from a mid-level engineer in interviews.

---

## 4. Org structure

```
                    ┌─────────────────────────┐
                    │   Meridian Law & Advisory │
                    └────────────┬────────────┘
                                 │
        ┌───────────────┬────────┴────────┬───────────────┬──────────┐
        │               │                 │               │          │
   ┌────▼────┐     ┌────▼────┐       ┌────▼─────┐    ┌────▼────┐  ┌──▼───┐
   │ Partners│     │  Legal  │       │Accounting│    │  Admin  │  │  IT  │
   │  (2)    │     │  (5)    │       │   (3)    │    │  (3)    │  │ (1)  │
   └─────────┘     └─────────┘       └──────────┘    └─────────┘  └──────┘
   Managing        Attorneys (3)     Acct Manager    Office Mgr   CamGotIT
   + Senior        Paralegals (2)    Staff Acct      Legal Sec.   (MSP seat)
   Partner                           Bookkeeper      Reception
```

### Department breakdown

| Department | Count | Roles |
|---|---|---|
| **Partners** | 2 | Managing Partner, Senior Partner |
| **Legal** | 5 | 2 Attorneys, 1 Associate Attorney, 1 Senior Paralegal, 1 Paralegal |
| **Accounting** | 3 | Accounting Manager, Staff Accountant, Bookkeeper |
| **Administration** | 3 | Office Manager, Legal Secretary, Receptionist |
| **IT** | 1 | CamGotIT (external consultant, admin access) |
| *Shared* | — | Conference Room (resource/room mailbox) |

---

## 5. Group strategy (security & M365 groups)

Groups are how you *stop assigning permissions one user at a time*. Meridian uses a layered model — assign access to a group once, and membership drives everything.

### Functional groups (by what you do)
| Group | Members | Used for |
|---|---|---|
| `SG-Partners` | 2 | Full access to all matters + firm financials |
| `SG-Attorneys` | 3 | Legal case files, court systems |
| `SG-Paralegals` | 2 | Legal files (read/limited write), no financials |
| `SG-Accounting` | 3 | Financial systems, tax software, no legal case files |
| `SG-Admin` | 3 | Scheduling, front-office tools, general docs |
| `SG-IT-Admins` | 1 | Tenant admin, Intune, security config |

### Scope groups (broad, for policy targeting)
| Group | Members | Used for |
|---|---|---|
| `SG-AllStaff` | 14 | Company-wide policies: MFA, baseline compliance, Office apps |
| `SG-Leadership` | 3 | Partners + Office Manager — sensitive dashboards, approvals |
| `SG-Legal` | 5 | Everyone touching legal matters (attorneys + paralegals) |
| `SG-Finance` | 3 | Everyone touching money (accounting dept) |

> **Design principle:** *functional groups* control access to systems; *scope groups* control which policies apply. Keeping them separate is a real enterprise pattern — it prevents the "one giant group that does everything" mess that's impossible to audit later.

### Naming convention
```
SG-<Function>      Security Group  → e.g. SG-Attorneys
DL-<Name>          Distribution List (email) → e.g. DL-AllStaff
M365-<Name>        Microsoft 365 Group (Teams/SharePoint) → e.g. M365-CaseFiles
```
Consistent prefixes make groups sortable, searchable, and obvious at a glance — a small habit that scales.

---

## 6. Device fleet

| Device type | Count | Assigned to | Why |
|---|---|---|---|
| **Laptops** | 6 | Partners, Attorneys, IT | Mobile roles, work from court/home → need encryption + Conditional Access |
| **Desktops** | 8 | Paralegals, Accounting, Admin | Fixed office roles → simpler, stay on-site |

**Fleet security baseline (configured in Phase 3 – Intune):**
- BitLocker disk encryption on all Windows devices
- Compliance policy: min OS version, firewall on, antivirus on, encryption required
- Conditional Access: block sign-in from non-compliant devices
- Laptops get stricter policy (auto-lock, remote wipe enabled)

### Naming convention
```
MER-<TYPE>-<DEPT>-<##>

MER-LT-PAR-01     Meridian, Laptop, Partners, #01
MER-DT-ACC-03     Meridian, Desktop, Accounting, #03
MER-LT-IT-01      Meridian, Laptop, IT, #01
```
Device name alone tells you the company, form factor, department, and unit — no lookup needed.

---

## 7. Identity & naming standards

| Standard | Format | Example |
|---|---|---|
| **UPN / sign-in** | `<first-initial><lastname>@meridian-law.com` | `pnair@meridian-law.com` |
| **Display name** | `First Last` | `Priya Nair` |
| **Usage location** | `US` (required before license assignment) | — |

> **Common beginner mistake:** assigning licenses before setting Usage Location — Microsoft blocks it and the error message doesn't make the cause obvious. Setting `UsageLocation = US` up front (it's already in the CSV) avoids the trap.

---

## 8. How this feeds the later phases

| Phase | What Meridian gives it |
|---|---|
| **Phase 3 – Intune** | 14 users + 14 devices to enroll, group-target policies, and secure |
| **Phase 4 – Azure** | Entra ID identities to extend into RBAC, Conditional Access, hybrid scenarios |
| **Phase 5 – Automation** | A real roster to script against with PowerShell + Microsoft Graph (bulk user creation, offboarding, reporting) |

The `users.csv` in this folder is built for **bulk import into Entra ID** — it's not just documentation, it's the actual seed data for the whole environment.

---

## 9. Files in this phase

| File | Purpose |
|---|---|
| `README.md` | This document — the client environment design |
| `users.csv` | Bulk-import-ready user roster (Entra ID format) |
| `groups.md` | Group membership matrix (who's in what) |
| *(coming)* `onboarding-runbook.md` | Step-by-step: stand up the tenant and import users |

---

<sub>Meridian Law & Advisory is a fictional organization created for training and portfolio purposes. Any resemblance to a real firm is coincidental.</sub>
