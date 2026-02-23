# Pharaoh Chirchir — Portfolio

A professional, neutral, production-grade portfolio for a Data Analyst & BI Specialist.  
Vanilla HTML · CSS · JS · No build tools required · GitHub Pages ready.

---

## Quick Start (local dev)

```bash
# Clone
git clone https://github.com/Chirchirp/Chirchirp.github.io.git
cd Chirchirp.github.io

# Serve locally (any of these work)
npx serve .                        # Node
python -m http.server 8000         # Python 3
php -S localhost:8000              # PHP
# Then open http://localhost:8000
```

---

## Deploy to GitHub Pages

1. Push this repo to `github.com/USERNAME/USERNAME.github.io`  
   (or any repo → Settings → Pages → Deploy from branch → `main` / `/ (root)`)
2. GitHub Actions (`.github/workflows/ci.yml`) handles lint → Lighthouse → deploy automatically on every push to `main`.
3. Site live at `https://USERNAME.github.io` within ~2 minutes.

---

## File Structure

```
/
├── index.html              ← Main page (edit content here)
├── styles/
│   └── styles.css          ← All styles (neutral, mobile-first)
├── scripts/
│   └── main.js             ← Nav, scroll animations, form logic
├── assets/
│   ├── resume.pdf          ← REPLACE with your actual CV PDF
│   └── og-image.png        ← Social share image (1200×630px recommended)
├── images/
│   └── pharaoh-photo.jpg   ← Profile photo (keep this name or update src in HTML)
├── .github/
│   └── workflows/
│       └── ci.yml          ← CI: lint → Lighthouse → deploy
└── README.md
```

---

## Where to Edit Content

| What to change | Where |
|---|---|
| **Name** | `index.html` → `<title>`, `.logo`, `.hero-name`, footer, JSON-LD |
| **Role / tagline** | `index.html` → `.hero-eyebrow`, `.hero-tagline` |
| **About paragraphs** | `index.html` → `.about-text` section |
| **Stats (numbers)** | `index.html` → `.stat-item` blocks |
| **Skills** | `index.html` → `.skill-list` under each `.skill-group` |
| **Projects** | `index.html` → each `<article class="project-card">` |
| **Experience / Education** | `index.html` → `.timeline-item` entries |
| **Contact email** | `index.html` → `mailto:` links + `form-note`; `scripts/main.js` → Formspree URL |
| **CV / Resume** | Replace `assets/resume.pdf` with your actual file (keep the filename) |
| **Profile photo** | Replace `images/pharaoh-photo.jpg` |
| **Social links** | `index.html` → hero, footer social `<a href="...">` tags |
| **OG / SEO meta** | `index.html` → `<head>` meta tags and JSON-LD block |

---

## Contact Form — Formspree Setup

The form currently simulates submission. To go live:

1. Sign up at [formspree.io](https://formspree.io) (free tier: 50 msgs/month)
2. Create a new form → copy your Form ID (e.g. `xoqkpvgb`)
3. In `scripts/main.js`, uncomment the Formspree fetch block and update:
   ```js
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
4. Remove the simulation `setTimeout` above it
5. Done — Formspree handles email delivery, spam filtering, and a dashboard

**Anti-spam:** A honeypot field (hidden from real users, visible to bots) is already included. Formspree also rate-limits submissions automatically.

---

## CI / CD Pipeline

`.github/workflows/ci.yml` runs on every push to `main`:

1. **HTML lint** — `html-validate`  
2. **CSS lint** — `stylelint`  
3. **JS lint** — `eslint`  
4. **Lighthouse CI** — targets ≥ 90 Performance, Accessibility, SEO  
5. **Deploy** — pushes to GitHub Pages on success

To run Lighthouse locally:
```bash
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage
```

---

## Customisation Guide (Quick Reference)

```
Change colour of dots/accents:      styles/styles.css → search for --grey-5
Change font:                        styles/styles.css → --font-display / --font-body
Add a project card:                 Copy an <article class="project-card"> block in index.html
Add a timeline entry:               Copy a <article class="timeline-item"> block
Change spacing:                     styles/styles.css → :root --space-* variables
```

---

## Suggested Commit Message

```
feat: professional, neutral, responsive portfolio — production ready
```

## Suggested PR Description

> Full rewrite to a neutral, accessible, production-grade portfolio.  
> Includes CI (lint, lighthouse), deploy workflow, and all project entries.  
> Vanilla HTML/CSS/JS with Formspree contact and full customisation guide.
