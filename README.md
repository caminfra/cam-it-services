# CamGotIt IT Services

A modern IT services website and hands-on portfolio project built to showcase practical IT support, endpoint management, cloud technologies, automation, and real-world technical skills.

## 🌐 Project Overview

**CamGotIt IT Services** is a professional IT services brand and portfolio environment focused on providing straightforward technology support while documenting the development of real-world IT skills and projects.

The website serves as the public-facing foundation of the CamGotIt project and highlights services such as:

* PC optimization
* Security setup
* File backup
* Remote support
* New device setup
* Pop-up and unwanted software cleanup

The project will continue to expand beyond the website into hands-on technical environments involving cloud infrastructure, endpoint management, automation, and security.

---

## 🚀 Phase 1 — Website Foundation

Phase 1 focused on building and refining the public-facing CamGotIt IT Services website.

### Completed

* ✅ CamGotIt branding and logo implementation
* ✅ GitHub Pages website
* ✅ Responsive navigation
* ✅ Hero section
* ✅ About section
* ✅ IT services section
* ✅ Contact and business information
* ✅ Remote support information
* ✅ Mobile optimization
* ✅ Responsive service cards
* ✅ CG branding consistency

---

## 🖥️ Website Features

Live site: **https://caminfra.github.io/cam-it-services/**

The site uses the CamGotIT **black / chrome / orange** brand and the CG slash logo.

### Core Services

* **Computer Support** — troubleshooting, repairs, virus removal, and performance optimization
* **Network & Wi-Fi** — setup, configuration, troubleshooting, and better coverage
* **Device Setup** — computers, printers, phones, smart devices, and new equipment
* **Security & Backup** — virus protection, data backup, and account security
* **Software Support** — installation, updates, troubleshooting, and license management

### Page sections

Hero · trust bar · core services · Why choose CamGotIT (About) · How it works · service area (Pearl, Florence, Jackson, Richland) · Request a Quote form · footer

### Responsive design

* Desktop, tablet, and phone layouts (tested at 1440px, 768px, and 375px)
* Slide-in mobile menu with a Services submenu
* Service cards become tappable list rows on phones
* Sticky mobile **Get a Quote / Call** bar
* Keyboard accessible, with skip link, visible focus states, and reduced-motion support

### Quote form

GitHub Pages is static hosting, so the quote form has no server. When someone submits the form, their email app opens with the request pre-filled and addressed to the CamGotIT inbox. The email address is set in `assets/js/main.js` (`CONTACT_EMAIL`). To receive submissions directly instead, point the form at a service such as Formspree.

---

## 🛠️ Technologies Used

* HTML5, CSS3, and vanilla JavaScript (no build step)
* Google Fonts (Montserrat, Inter, Michroma)
* GitHub Pages (deployed from the `main` branch root)

---

## 📂 Project Structure

```text
cam-it-services/
├── index.html              # Business website (single page)
├── 404.html                # Branded not-found page
├── site.webmanifest        # App icon / home-screen metadata
├── robots.txt
├── sitemap.xml
├── .nojekyll               # Serve files as-is (skip Jekyll)
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── img/
│   │   ├── cg-mark.png               # CG slash mark (transparent)
│   │   ├── camgotit-logo.png         # Full lockup (transparent)
│   │   ├── camgotit-hero-logo.jpg    # Hero artwork
│   │   ├── favicon.png / apple-touch-icon.png / icon-512.png
│   │   └── og-image.jpg              # Social share preview
│   ├── cglogo.png / cglogo2.png      # Earlier logo versions
│   └── screenshots/
├── docs/                   # Portfolio documentation
└── README.md
```

### Deploying

Pages publishes from `main` at the repo root. Merge the website branch into `main`, and GitHub Pages rebuilds automatically within a minute or two.

> If you move to a custom domain, add a `CNAME` file, update the canonical/OG URLs in `index.html`, `sitemap.xml`, and `robots.txt`, and change the `/cam-it-services/` paths in `404.html` to `/`.

---

# 🗺️ Project Roadmap

CamGotIt is being developed as a long-term IT services and technical portfolio environment.

### Phase 1 — Website Foundation ✅

* Branding
* Website
* Services
* About section
* Contact information
* Mobile optimization
* Documentation

### Phase 2 — Client Environment Lab 🔄

Build a fictional client environment to simulate real-world IT administration.

Planned areas include:

* Users and identities
* Device management
* Endpoint configuration
* Security policies
* Documentation

### Phase 3 — Microsoft Intune

Develop a hands-on Intune environment.

Planned areas include:

* Device enrollment
* Configuration profiles
* Compliance policies
* Application deployment
* Endpoint security
* Autopilot

### Phase 4 — Cloud Infrastructure

Expand the environment into cloud technologies.

Potential technologies include:

* Microsoft Azure
* Azure networking
* Virtual machines
* Identity management
* Role-Based Access Control
* Cloud security

### Phase 5 — Automation

Develop automation solutions to improve IT workflows.

Planned technologies include:

* PowerShell
* Microsoft Graph
* Automation workflows
* Endpoint automation

---

# 📸 Project Documentation

Each phase of the CamGotIt project will include:

* Clear objectives
* Implementation steps
* Screenshots and evidence
* Technical documentation
* Troubleshooting notes
* GitHub updates

The goal is to treat the project like a real IT environment rather than simply completing isolated labs.

---

# 🎯 Project Goal

The long-term goal of CamGotIt is to build a documented portfolio demonstrating practical experience across:

* IT Support
* Endpoint Management
* Microsoft Intune
* Microsoft Entra ID
* Microsoft Azure
* Cloud Infrastructure
* Security
* PowerShell
* Automation

---

## 📌 Current Status

**Phase 1: Website Foundation — In Progress**

Next steps:

* Capture final website screenshots
* Document Phase 1 implementation
* Finalize GitHub repository updates
* Begin the Client Environment Lab

---

## 👨‍💻 Author

**Cameron Sims**

CamGotIt IT Services

---

## 📸 Website Preview

### Homepage

![CamGotIt Homepage](assets/screenshots/homepage.png)

### About

![CamGotIt About Section](assets/screenshots/about.png)

### Services

![CamGotIt Services](assets/screenshots/services.png)

### Why CamGotIt

![Why CamGotIt](assets/screenshots/why-camgotit.png)

### Contact

![CamGotIt Contact](assets/screenshots/contact.png)

### Mobile Experience

![CamGotIt Mobile](assets/screenshots/mobile.png)

> This project is continuously evolving as new technologies, labs, and real-world IT scenarios are added.
