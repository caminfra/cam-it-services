<div align="center">

# CamGotIT IT Services

**We handle IT. You focus on what matters.**

A real IT services business **and** the cloud engineering portfolio behind it — one brand, one repo, the full arc from infrastructure to identity.

`Reliable` • `Secure` • `Efficient`

</div>

---

## What this repo is

CamGotIT is two things at once, told as one story:

1. **A real local IT business** serving the Greater Jackson, MS metro — computer repair, Wi-Fi, security, backups, device setup, with flat, upfront pricing.
2. **A hands-on cloud portfolio** that documents CamGotIT building its own Azure footprint and then onboarding a compliance-sensitive client — a law firm — provisioning their identities, securing their devices, and automating their lifecycle.

> **The narrative:** *CamGotIT is a real MSP. Here is the actual cloud engineering behind it — infrastructure, identity, endpoint management, and automation, done the way a real managed-services provider would.*

This is built to read like client work, not isolated labs. Every technical decision has a business reason behind it.

---

## The three tracks

| Track | What it covers | Tooling | Status |
|---|---|---|---|
| **Business** | Website, branding, services, pricing, marketing | HTML/CSS/JS, GitHub Pages | ✅ Built |
| **Azure footprint** | Light, realistic cloud backbone (resource group, Key Vault, storage) to support automation | Azure CLI / Terraform | 🔜 Planned |
| **Meridian client** | The main technical work: M365 tenant, Entra ID users & groups, licensing, MFA, Intune, Conditional Access, PowerShell/Graph automation | PowerShell + Microsoft Graph, Intune | 🔜 Planned |

> Azure is intentionally **light and realistic** — a genuine footprint that supports the client work, not an enterprise landing zone for its own sake. The weight of the portfolio is on **identity + endpoint management**, which is where the strongest real-job and AZ-104 relevance lives.

---

## The client: Meridian Law & Advisory

A fictional 14-person law firm (with an in-house accounting practice) in the Jackson metro, managed by CamGotIT. A compliance-heavy firm is the richest possible sandbox: attorney–client privilege and financial records in one tenant force real least-privilege access, data segmentation, MFA, device compliance, and audit logging.

Full design, roster, and group matrix: [`docs/phase-02-client-environment/`](docs/phase-02-client-environment/)

---

## Repository structure

```
cam-it-services/
├── index.html                         # Business website
├── services-pricing.html              # Print-ready services & pricing sheet
├── business-card.html                 # Print-ready business card
│
├── marketing/
│   ├── google-business-profile.md     # GBP setup guide
│   └── facebook-starter-kit.md        # FB page bio + first posts
│
├── docs/
│   ├── PROJECT-PLAN.md                # Milestones, board, issues, sprints
│   ├── phase-02-client-environment/   # Meridian org design
│   │   ├── README.md                  #   company profile, org, compliance drivers
│   │   ├── users.csv                  #   bulk-import-ready roster (Entra ID)
│   │   └── groups.md                  #   group membership matrix
│   └── diagrams/                      # architecture diagrams (coming)
│
├── azure/                             # Light Azure footprint (coming)
├── meridian/                          # M365/Graph/Intune automation (coming)
├── scripts/                           # shared helpers (coming)
│
└── README.md                          # you are here
```

---

## Brand kit

| Token | Hex |
|-------|-----|
| Jet Black | `#0A0A0A` |
| Graphite | `#1A1D22` |
| Silver | `#C0C4CC` |
| Electric Blue | `#0078FF` |
| Steel Blue | `#0D47A1` |
| White | `#FFFFFF` |

**Type:** Exo 2 (logo / display) · Inter (body / UI)
**Tagline:** *We handle IT. You focus on what matters.*

---

## Roadmap

| Milestone | Focus | Status |
|---|---|---|
| **Phase 1** | Business foundation — site, brand, marketing | ✅ Done |
| **M0** | Project & toolchain setup | 🔜 Next |
| **M1** | Light Azure footprint (RG, Key Vault, storage) | 🔜 Planned |
| **M2** | Meridian tenant provisioning (users, groups, licensing) | 🔜 Planned |
| **M3** | Identity security (MFA, least-privilege, break-glass) | 🔜 Planned |
| **M4** | Endpoint management (Intune compliance, config, Conditional Access) | 🔜 Planned |
| **M5** | Automation & documentation (offboarding, reporting, diagrams) | 🔜 Planned |

Full detail — exit criteria, board, labels, and copy-paste issues — in [`docs/PROJECT-PLAN.md`](docs/PROJECT-PLAN.md).

---

## Tech stack

**Business site:** HTML5 · CSS3 · JavaScript · GitHub Pages
**Cloud & identity:** Microsoft Azure · Entra ID · Microsoft 365 · Intune · PowerShell · Microsoft Graph · Terraform

---

## Services

| Service | Flat price |
|---|---|
| PC Tune-Up & Repair | $79 |
| Wi-Fi & Network Fixes | $89 |
| Security Setup | $99 |
| File Backup | $69 |
| New Device Setup | $89 |
| Pop-Up & Ad Cleanup | $59 |

Remote and on-site. Small-business support and monthly care plans available. No fix, no fee.

---

## Contact

**Cameron Sims** — Founder & IT Consultant
📞 (769) 208-7034
📧 support@camgotit.com
📍 Serving the Greater Jackson Metro, MS

---

<div align="center">
<sub>Meridian Law & Advisory is a fictional client created for portfolio purposes. This project is continuously evolving as new labs and real-world IT scenarios are added.</sub>
</div>
