# Phase 2 — Employee Identity & Group Design

## Purpose

This document defines the initial user identities and department structure for the fictional client environment managed by CamGotIT IT Services.

The environment is designed to simulate a small organization with multiple departments, allowing identity, endpoint, security, and automation workflows to be tested throughout the lab.

---

# User Naming Convention

The environment will use the following username convention:

```text
firstname.lastname@<tenant-domain>
```

Example:

```text
john.smith@contoso.onmicrosoft.com
```

The `<tenant-domain>` will be replaced with the Microsoft Entra tenant domain used in the lab.

---

# Organizational Users

## Executive Department

| Name            | Job Title               | Department |
| --------------- | ----------------------- | ---------- |
| Marcus Thompson | Chief Executive Officer | Executive  |
| Olivia Carter   | Executive Assistant     | Executive  |

---

## IT Department

| Name            | Job Title            | Department |
| --------------- | -------------------- | ---------- |
| Cameron Brooks  | IT Administrator     | IT         |
| Jordan Mitchell | Help Desk Technician | IT         |

---

## Finance Department

| Name            | Job Title       | Department |
| --------------- | --------------- | ---------- |
| Daniel Roberts  | Finance Manager | Finance    |
| Sophia Williams | Accountant      | Finance    |

---

## Human Resources Department

| Name           | Job Title     | Department      |
| -------------- | ------------- | --------------- |
| Ashley Johnson | HR Manager    | Human Resources |
| Michael Davis  | HR Specialist | Human Resources |

---

## Operations Department

| Name            | Job Title              | Department |
| --------------- | ---------------------- | ---------- |
| Robert Wilson   | Operations Manager     | Operations |
| Taylor Anderson | Operations Coordinator | Operations |
| Kevin Martinez  | Operations Specialist  | Operations |
| Emily Brown     | Operations Associate   | Operations |

---

# Department Groups

The following Microsoft Entra security groups will be created:

| Group Name    | Purpose                           |
| ------------- | --------------------------------- |
| SG-Executive  | Executive department access       |
| SG-IT         | IT department access              |
| SG-Finance    | Finance department access         |
| SG-HR         | Human Resources department access |
| SG-Operations | Operations department access      |

---

# Future Groups

Additional groups will be created as the environment expands.

Examples include:

* SG-Intune-Managed-Devices
* SG-Conditional-Access-Users
* SG-HelpDesk-Administrators
* SG-Privileged-IT-Admins
* SG-VPN-Users

---

# Identity Management Goals

The user and group structure will support:

* Department-based access
* Microsoft Intune assignments
* Conditional Access targeting
* Role-Based Access Control (RBAC)
* Application access
* Onboarding automation
* Offboarding automation

---

# Next Steps

1. Identify the Microsoft Entra tenant domain
2. Connect to Microsoft Graph
3. Create users through automation
4. Create Microsoft Entra security groups
5. Assign users to department groups
6. Validate identities and memberships
7. Capture screenshots and implementation evidence

