# Skin Solutions MD Clinic — demo website

A five-page static site for **Skin Solutions MD Clinic**, a dermatology clinic in Blue Area,
Islamabad. Hand-written HTML, CSS and JavaScript. No framework, no build step, no dependencies,
no third-party requests.

**Status:** design v3, awaiting approval. The content is limited to information the clinic has
published. Nothing is invented to fill a gap; where a fact is not public, the page says so or
leaves it out.

---

## Run it

```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

Any static host works: the site is plain files. Open `index.html` directly from disk if you like —
the only thing that needs a server is nothing at all, since fonts and images are relative.

---

## Pages

| File | What it holds |
| --- | --- |
| `index.html` | Hero, four-cell data strip, seven-area treatment table, how a consultation runs, booking form |
| `treatments.html` | The seven treatment areas as numbered sections, laser spec band, booking panel |
| `approach.html` | Consultation process, what to bring, six questions before booking |
| `visit.html` | Contact details, booking form, on-the-day notes, directions, booking questions |
| `404.html` | Not-found page with a route table |

Shared header (sticky), mobile drawer, mobile call/WhatsApp bar and footer on every page.

---

## Design system

The direction is **Swiss clinical**: the grid is visible, the type is small and precise, data is
labelled, corners are square, and one saturated accent is used on a paper-coloured ground.

**Type**

- `Archivo` variable (100–900) for display and text. Headings are 600 at negative tracking.
- `IBM Plex Mono` 400/500 for labels, indices, figures, buttons and captions.
- Both are self-hosted WOFF2 (SIL Open Font License), subset to Latin.

**Colour**

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#f3f3ee` | page ground |
| `--paper-2` | `#e9e9e1` | alternating sections |
| `--ink` | `#121413` | text and filled buttons |
| `--ink-2` / `--ink-3` | `#3f4440` / `#6d726c` | secondary text, labels |
| `--rule` / `--rule-2` | `#cfd0c7` / `#b7b9ae` | hairlines |
| `--accent` | `#b8340f` | indices, active nav, hover arrows, focus ring |

**Layout rules**

- 12-column grid (`--max: 1320px`, gutters `clamp(1rem, 3vw, 2.75rem)`).
- Sections are separated by 1px hairlines, not by shadows or cards.
- No rounded corners, no gradients, no scroll animations, no parallax.
- Numbers (`01 /`, `Fig. 03`, `Fig. 04`) are part of the system; they index sections and images.

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
| Favicon | "S" monogram drawn from Archivo 600 |

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
call instead.

If the browser blocks the new tab, an inline fallback link is offered.

---

## Accessibility

- Skip link, one `<h1>` per page, landmarks (`header`, `nav`, `main`, `footer`).
- The drawer uses `aria-expanded`, `aria-controls` and `aria-hidden`; Escape closes it and focus
  returns to the button; the page behind it does not scroll.
- `aria-current="page"` on the active navigation item.
- Form fields have real `<label>`s; feedback is announced with `role="status"`.
- Visible `:focus-visible` ring in the accent colour on every control.
- `prefers-reduced-motion` turns off the few transitions that exist.
- Colour contrast: ink on paper is about 15:1; accent on paper is about 5.4:1.

---

## Performance

Measured from the working tree:

| Asset | Size |
| --- | --- |
| CSS | 28,504 B (5,820 B gzipped) |
| JavaScript | 5,318 B (1,842 B gzipped) |
| Fonts (3 files) | 64,524 B |
| Images (2 files) | 63,517 B |
| Whole site | ≈ 270 KB |

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
│   │   ├── archivo-latin-wght-normal.woff2
│   │   ├── ibm-plex-mono-latin-400-normal.woff2
│   │   └── ibm-plex-mono-latin-500-normal.woff2
│   ├── img/
│   │   ├── room.jpg
│   │   └── laser.jpg
│   └── favicon.svg
└── README.md
```

---

## Before launch

1. Replace `room.jpg` and `laser.jpg` with photographs of the actual clinic, with consent from
   anyone visible.
2. Add the street address and opening hours once the clinic publishes them, and rebuild the
   "Visit" page around them.
3. Point a domain at the host and add `canonical`, absolute `og:image` and `sitemap.xml`
   (none exist yet because there is no domain).
4. Confirm fees, doctor names and any before/after photographs directly with the clinic before
   publishing them.
5. Re-test the booking form on an actual phone, including a phone with JavaScript disabled.
