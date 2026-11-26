# Skin Solutions MD Clinic — demo website

A five-page static site for **Skin Solutions MD Clinic**, a dermatology clinic in Blue Area,
Islamabad. Hand-written HTML, CSS and JavaScript. No framework, no build step, no dependencies,
no third-party requests.

**Status:** design v4, awaiting approval. The content is limited to information the clinic has
published. Nothing is invented to fill a gap; where a fact is not public, the page says so or
leaves it out.

---

## Run it

```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

Any static host works: the site is plain files. Fonts and images are relative, so the pages also
open directly from disk, though a server is closer to production.

---

## Pages

| File | What it holds |
| --- | --- |
| `index.html` | Split hero with treatment-room figure and a three-part fact strip, cobalt statement band, seven-row treatment index, three-step mosaic, ink booking block, oversized footer wordmark |
| `treatments.html` | Seven treatment areas as numbered rows (number, lead, scope list), laser figure band, cobalt panel |
| `approach.html` | Status line and four steps, what to bring, six questions, cobalt panel |
| `visit.html` | Contact block with the booking form on ink, on-the-day list, directions figure band, booking questions |
| `404.html` | Not-found page with a numbered route list |

Shared: a mono top bar, sticky header with a wordmark and `MD` badge, mobile drawer with numbered
links, mobile call/WhatsApp bar, and a footer that ends in a full-bleed wordmark.

---

## Design system

The direction is **editorial clinical**: a warm paper ground, one saturated cobalt field used as a
real surface (band, panel, caption plate, badges), a grotesk display face at large sizes, and mono
only for labels and numbers. Sections alternate paper / paper-deep / ink rather than sitting on a
single flat background, and the footer ends on a wordmark that spans the page.

**Type**

- `Schibsted Grotesk` variable (400–900) for display and text. Headings are 700 at −0.035em.
- `IBM Plex Mono` 400/500 for labels, indices, figures, buttons and captions.
- Both self-hosted WOFF2 (SIL Open Font License), Latin subset.

**Colour**

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#f6f4ee` | page ground |
| `--paper-deep` | `#ece9df` | alternating sections |
| `--surface` | `#fffefb` | tiles, form card |
| `--ink` | `#101211` | text, ink sections, filled buttons |
| `--ink-2` / `--ink-3` | `#3d423d` / `#6a6f68` | secondary text, labels |
| `--line` / `--line-strong` | hairline / darker hairline | rules, list dividers |
| `--cobalt` / `--cobalt-deep` | `#1c34d4` / `#1324a0` | accent field, numbers, caption plates, buttons |

**Layout rules**

- 12-column grid, `--wrap: 1280px`, gutter `clamp(1.25rem, 4vw, 3.5rem)`.
- Hero: 6 columns of copy, 5 columns of figure (4:5) that spans two rows, full-width fact strip below.
- Treatment index: number / name / description / arrow on one baseline, hairline between rows.
- Breakpoints at 1180, 980 and 640. Below 980 the hero stacks (copy, figure, facts), the mosaic
  becomes two columns and the booking grid becomes one.
- Numbers (`01`, `Fig. 03`, `04 / Booking`) index sections and images; they are part of the system.
- No rounded corners, no gradients, no shadows, no scroll animations.

---

## Content policy

**Verified and used**

- Clinic name: Skin Solutions MD Clinic.
- Area: Blue Area, Islamabad.
- Phone and WhatsApp: +92 327 8749613.
- Email: SkinSolutionsMd.pk@gmail.com.
- Facebook page: `facebook.com/p/Skin-Solutions-MD-Clinic-61559044864273`.
- The seven treatment areas: general dermatology, cosmetic dermatology, laser hair removal,
  acne treatment, skin whitening & pigmentation, anti-ageing, consultations.
- "FCPS-qualified dermatologist" — supplied by the clinic.

**Deliberately absent**

- Opening hours. They are not published, so there is no hours table and no live "open now"
  indicator (the previous draft had both, invented).
- Fees, packages and payment methods.
- Doctor names, photographs of staff, years of experience.
- Reviews, testimonials and ratings. The Facebook page reads "Not yet rated (0 reviews)", so no
  rating is shown anywhere.
- Exact street address, parking, insurance. The site says the address is shared when an
  appointment is confirmed, which is true rather than guessed.
- Before/after images and any claim of results, permanence or "guaranteed" clearance.

Process copy ("history, examination, plan") describes how a dermatology consultation generally
runs. It makes no outcome promises and quotes no numbers.

---

## Real vs. placeholder

| Element | Status |
| --- | --- |
| Clinic name, phone, WhatsApp, email, Facebook, area | Real, published by the clinic |
| Service list and "FCPS-qualified" | Real, supplied by the clinic |
| Treatment descriptions | Written for this demo from the service list; no claims of results |
| Photographs | **Placeholder.** Free-licence Pexels photographs, not the clinic. Replace with the clinic's own photography before launch |
| Figure captions ("Fig. 01 / Treatment room") | Describe the photograph, not the premises |
| Address | "Blue Area" is real; the building and street are not published and are not invented |
| Map link | Google Maps search for Blue Area, not a dropped pin |
| Booking form | Opens WhatsApp with a prepared message. Nothing is stored, no backend |
| Favicon | "S" monogram in cobalt on paper |
| `preview/*.jpg` | Screenshots of the v4 pages at 1440 px (390 px for mobile). Gitignored |

Replace the photographs with real ones and delete this paragraph before going live. The images are
stock, so no patient has been photographed or identified.

### Image credits

| File | Source | Licence |
| --- | --- | --- |
| `assets/img/room.jpg` | [pexels.com/photo/7016405](https://www.pexels.com/photo/interior-design-of-a-medical-clinic-7016405/) | Pexels licence, free to use |
| `assets/img/laser.jpg` | [pexels.com/photo/4586726](https://www.pexels.com/photo/4586726/) | Pexels licence, free to use |

Only these two photographs are in use. Rejected during review: Unsplash+ images (watermarked),
iStock/Adobe/Dreamstime previews (not licensed for reuse), and any photograph containing readable
branding or invented clinical detail.

---

## How the booking form works

1. The visitor fills in name, phone, treatment, preferred time and optional notes.
2. `assets/js/main.js` validates name and phone client-side.
3. It builds a message and opens
   `https://wa.me/923278749613?text=<encoded message>` in a new tab.
4. The visitor sends the message from their own WhatsApp. The clinic replies there.

There is no server, no database, no email service and no analytics. If JavaScript is off, the form
still posts to `wa.me` (without the typed details), and the `noscript` block tells the visitor to
call instead. Appointments are confirmed by the clinic; nothing on the site says a booking is
confirmed automatically.

If the browser blocks the new tab, an inline fallback link is offered.

---

## Accessibility

- Skip link, one `<h1>` per page, landmarks (`header`, `nav`, `main`, `footer`).
- The drawer uses `aria-expanded`, `aria-controls` and `aria-hidden`; Escape closes it and focus
  returns to the button; the page behind it does not scroll.
- `aria-current="page"` on the active navigation item.
- Form fields have real `<label>`s; feedback is announced with `role="status"`.
- Visible `:focus-visible` ring in cobalt on every control.
- `prefers-reduced-motion` turns off the few transitions that exist.
- Colour contrast: ink on paper is about 17:1; cobalt on paper about 7.5:1; white on cobalt
  about 7.5:1; footer text on ink at least 4.6:1.

---

## Performance

Measured from the working tree:

| Asset | Size |
| --- | --- |
| CSS | 32,960 B (6,651 B gzipped) |
| JavaScript | 5,315 B (1,842 B gzipped) |
| Fonts (3 files) | 76,348 B |
| Images (2 files) | 63,517 B |
| Whole site | ≈ 262 KB |

- Two web fonts preloaded; the mono is used sparingly.
- Images are 500 px wide JPEGs at quality 82, stripped of metadata, with `width`/`height` set to
  reserve space. The hero image is not lazy-loaded, the rest are.
- No external requests at runtime. No cookies. No JS framework.

---

## Files

```
.
├── index.html
├── treatments.html
├── approach.html
├── visit.html
├── 404.html
├── assets
│   ├── css/styles.css
│   ├── js/main.js
│   ├── fonts/
│   │   ├── schibsted-grotesk-latin-wght-normal.woff2
│   │   ├── ibm-plex-mono-latin-400-normal.woff2
│   │   └── ibm-plex-mono-latin-500-normal.woff2
│   ├── img/
│   │   ├── room.jpg
│   │   └── laser.jpg
│   └── favicon.svg
├── preview/            (gitignored screenshots)
└── README.md
```

---

## Before launch

1. Replace `room.jpg` and `laser.jpg` with photographs of the actual clinic, with consent from
   anyone visible.
2. Add the street address and opening hours once the clinic publishes them, and rebuild the
   "Visit" page around them.
3. Confirm the "FCPS-qualified" line, fees, doctor names and any before/after photographs directly
   with the clinic before publishing them.
4. Point a domain at the host and add `canonical`, absolute `og:image` and `sitemap.xml`
   (none exist yet because there is no domain).
5. Re-test the booking form on an actual phone, including a phone with JavaScript disabled.
