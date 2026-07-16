# Ruby's Table — Website

A custom, softly editorial website for **Ruby's Table**, family-style catering in Charleston, SC. Built as a fast, zero-build static site — plain HTML, custom CSS, and vanilla JavaScript, ready to deploy on Netlify with no backend required. No CSS framework is used anywhere; every layout and spacing value is hand-built for Ruby's Table specifically.

---

## 1. What's in this project

```
rubys-table-site/
├── index.html          Home
├── about.html           About Ruby
├── menu.html            Menu & pricing
├── delivery.html        Delivery, pickup, payment, allergy info
├── contact.html          Catering request form + contact info + social links
├── 404.html               Custom "page not found"
├── css/style.css          All site styling (one file, fully commented)
├── js/main.js              Mobile nav, scroll animations, form handling
├── images/                 Placeholder photography (SVG) — see section 5
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── _redirects              Old /catering.html and /gallery.html URLs → new pages
├── netlify.toml            Netlify build & header config
└── .gitignore
```

Five pages, on purpose. Earlier drafts had a separate Catering page and a Gallery page; both were folded in or removed so the site only contains what was actually asked for: Home, About, Menu, Delivery & Ordering, and a Contact page that doubles as the catering request form, contact info, and social links.

---

## 2. Design approach — a lifestyle brand, not a business site

The brief here was to feel less like a catering company's website and more like a beautifully designed personal invitation — European summer, Charleston charm, garden party, homemade food. Concretely, that meant:

**What was removed.** No newsletter sign-up, no Instagram feed grid, no testimonial cards, no stats/highlights band, no repeated calls-to-action, no icon-badge feature grids. Every closing section is a single quiet `.closing-note` — a heading, one line, one button — instead of a bold colored "marketing band." If a section didn't directly serve one of the requested pages, it isn't there.

**Softer palette.** Cream and warm ivory backgrounds throughout; butter yellow, soft olive, and blush used as accents; warm brown (not black) for text; terracotta reserved for small, purposeful moments (a button, a pull-quote, a stamp icon) rather than large saturated section backgrounds. The one deliberately darker moment on the site is the footer — everything else stays light and airy.

**Graceful, not bold, typography.** Headlines are set in Fraunces at a lighter weight (400, not 600) for a softer, more delicate feel; body copy in Jost; a handwritten Caveat accent used in exactly two places per page at most (a tilted "postcard note" on a hero photo, a signature line).

**Editorial, asymmetric layout — still.** The split-screen sections, layered/overlapping photo compositions, offset two-column "cookbook spread" layouts, and drop-cap opening paragraphs from the previous version are kept, because they're what makes the site feel designed rather than templated. What changed is pacing and color, not structure: sections are calmer, whitespace is more generous, and every layout choice is in service of one of the five core pages rather than being a bonus "feature section."

**An organic architectural detail.** The About page portrait uses a soft arched top (`.photo-frame.arch`) — a quiet nod to the tiled niche/archway imagery in the inspiration boards, used exactly once so it reads as a considered detail rather than a motif.

**Photography-first.** Every placeholder image is now shaped for the exact spot a real photo will occupy — tall portraits for split-screens, layered offset pairs for the story sections — so photography, once added, becomes the dominant visual element on every page.

---

## 3. Previewing the site locally

```bash
cd rubys-table-site
python3 -m http.server 8000
# then open http://localhost:8000
```

Or, if you have Node installed: `npx serve .`

---

## 4. Deploying with GitHub + Netlify

1. Push this folder to a GitHub repository (see earlier chat messages for the exact `git` steps, or use GitHub Desktop).
2. In Netlify: **Add new site → Import an existing project** → select your repo. Build command: blank. Publish directory: `.` (already set in `netlify.toml`).
3. Every push to your main branch auto-deploys.

### Custom domain

1. In Netlify: **Site settings → Domain management → Add a domain**, then point your DNS as instructed.
2. Netlify provisions free HTTPS automatically once DNS verifies.
3. Once live, replace every placeholder `https://rubystable.com` URL (canonical tags, Open Graph/Twitter tags, `sitemap.xml`, `robots.txt`, the JSON-LD in `index.html`/`menu.html`) with your real domain — a project-wide find-and-replace for `rubystable.com` handles it.

---

## 5. Replacing placeholder photos with real photography

Every placeholder lives in `/images`, named for what it represents (e.g. `hero-home.jpg.svg`, `about-ruby.jpg.svg`, `dish-caramel-cake.jpg.svg`).

1. Export your photo (JPG or WebP, compressed for web — aim under 300KB).
2. Name it to match the existing filename but with your real extension, e.g. `hero-home.jpg.svg` → `hero-home.jpg`.
3. Update the `src` in the relevant HTML file to the new extension, and write real `alt` text describing the photo.
4. Save, commit, push — Netlify redeploys automatically. No layout or CSS changes are ever required.

**Recommended shot list for the highest impact first:** the home page hero (tall/portrait crop), the About page portrait, and the three "tonight's table" dishes on the home page.

---

## 6. Updating the menu & pricing

Open `menu.html`. Each dish lives inside a `<div class="menu-item">` block — edit the `<h3>` name, the `<p>` description, or the price in `.menu-item-price` / `.price-tiers`. There's a matching JSON-LD `Menu` schema block near the top of the file — update it alongside the visible menu. The home page's shorter "Tonight's Table" list (`index.html`, `<ul class="today-list">`) is separate — update it too if what's featured changes.

---

## 7. Editing Ruby's story

Open `about.html` and edit the text inside the `<p>` tags. The home page's shorter version lives in `index.html`'s story section.

---

## 8. Updating contact info & social links

Search-and-replace across all `.html` files for:

- **Phone/text:** `828.772.4255` (and `sms:+18287724255` in hrefs)
- **Instagram/TikTok:** `@rubys.table` / the full profile URLs
- **Service area:** "Charleston, SC & the surrounding Lowcountry"

Contact info and social links live in two places by design: the footer (every page) and the "Contact Information / Social Media" section at the bottom of `contact.html`.

---

## 9. Connecting Formspree (the catering request form)

1. Create a free account at [formspree.io](https://formspree.io) and create a new form; copy your Form ID.
2. In `contact.html`, replace `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"` with your real ID.
3. Set your notification email in the Formspree dashboard, then submit a test inquiry from the live site.

Until connected, the form shows a friendly message instead of failing silently. A hidden honeypot field (`_gotcha`) is built in for spam protection.

---

## 10. Accessibility & performance notes

- Semantic HTML, single `<h1>` per page, visible focus states, a skip-to-content link.
- All images have descriptive `alt` text; decorative-only images are marked appropriately.
- Animations respect `prefers-reduced-motion`.
- Color contrast checked against WCAG AA across every text/background pairing used — all pass at 4.5:1 or better.
- No JS frameworks; compress real photos on import (e.g. via [squoosh.app](https://squoosh.app)) and keep `loading="lazy"` on everything except the home page hero.

---

## 11. What's still a placeholder

- All food and lifestyle photography.
- A specific delivery radius/ZIP list and order minimum (currently "Charleston, SC & the surrounding Lowcountry," no strict minimum).
- A registered domain (currently placeholder `rubystable.com`).
- The Formspree form ID.
