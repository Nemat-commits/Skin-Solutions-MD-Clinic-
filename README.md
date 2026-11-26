# Skin Solutions MD Clinic

A hand-built demo website for **Skin Solutions MD Clinic**, a dermatology practice in Blue Area, Islamabad.

Four pages, no framework, no build step. Plain HTML, one stylesheet, one small script.

---

## Run it

Any static server works:

```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

Or open `index.html` directly. Opening the file locally works, but a server is better for the font preloads.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, treatment index, clinic philosophy, laser feature, first-visit steps, location |
| `treatments.html` | Seven treatment areas in detail: what we treat / what to expect |
| `approach.html` | How the clinic works, what a consultation includes, standards, FAQ |
| `visit.html` | Practical details, illustrated map, booking form → WhatsApp, what to bring |
| `404.html` | Not-found page |

## Structure

```
assets/
  css/styles.css      all styles, ~30 KB unminified
  js/main.js          header state, drawer, live open/closed status, form → WhatsApp
  fonts/              Archivo + Karla (both variable), self-hosted, SIL OFL
  img/                optimised responsive JPEGs (560–1400 px wide)
  favicon.svg
images/               original, unoptimised image masters (not referenced by the site)
```

## How booking works

There is no backend. The booking form validates name and phone locally, then builds a pre-filled
message and opens `wa.me/923278749613`. The visitor presses send in WhatsApp. If the popup is
blocked, a fallback link appears inline. With JavaScript off, the form falls back to a plain
`wa.me` link and the page tells the visitor to call instead.

## Things that are real vs. placeholder

**From the business's public information:** name, services, phone/WhatsApp, email, Blue Area
location, Facebook page, FCPS-qualified dermatology.

**Placeholders to confirm with the clinic before this goes live:**

- **Opening hours** — the site assumes Mon–Sat, 11am–7pm (last appointment 6:30pm). Used in the
  copy and in `HOURS` in `assets/js/main.js` (which drives the live "Open now / Closed" chip).
- **Exact address and floor** — only "Blue Area, Islamabad" is public, so directions are described
  as being sent on booking. Update `visit.html` if they want the full address listed.
- **Fees** — no prices are shown. The site says fees are confirmed at booking, which is accurate
  and avoids stale price lists.
- **Doctor names, degrees and experience** — deliberately omitted. The public page gives no doctor
  names, and inventing them for a medical site would be wrong. Add real consultant details if supplied.
- **Patient reviews / before-and-after photos** — deliberately omitted. The public page has no
  reviews; fake testimonials and result photos would misrepresent a medical practice.
- **Domain** — no canonical URL or sitemap is set, because the clinic has no confirmed website.
  Add them once a domain exists (and update `og:image` to absolute URLs).

The map is a **stylised illustration**, not a real map, and is labelled as such on the page. It
avoids embedding Google Maps (which would add ~500 KB and third-party cookies) while still giving
a sense of the area. Swap in a real embed if the clinic prefers.

## Design notes

- Cool off-white paper, graphite ink, deep pine and a single clinical teal accent. Archivo — a
  grotesque with tight, confident letterforms — carries the headings, numbers and interface;
  Karla keeps long copy warm and readable. Both self-hosted — no Google Fonts request, no layout
  shift, and no third-party tracking on a health-related site.
- No romantic serif, no italic accent word, no cream-and-clay palette: the three shorthand
  signals of a generated site. The layout earns its character instead through an asymmetric hero
  with an overlapping hours plate, a numbered treatment index, and hairline rules in place of cards.
- Responsive from 320 px up. Mobile gets a full-screen menu and a persistent Call/WhatsApp bar.
- Accessibility: skip link, semantic landmarks, visible focus states, `aria-current` on nav,
  labelled form fields, reduced-motion support, and content remains visible without JavaScript.
- Performance: no libraries, ~68 KB of fonts, lazy-loaded images with width/height set, images
  served at three widths.

## Editing quickly

- **Phone / WhatsApp** — appears as `tel:` and `wa.me` links across all pages, `WHATSAPP` and
  `PHONE` constants in `assets/js/main.js`, and the `telephone` field in the JSON-LD on `index.html`.
- **Hours** — the visible copy (footer, home, visit page) and `HOURS` in `main.js`.
- **Colours and type** — the `:root` token block at the top of `styles.css` (`--display` is
  Archivo, `--sans` is Karla; swap the two `@font-face` sources to change either).

## Images

The photography is AI-generated for this demo (no stock licensing, no patient images). Keep actual
clinic or patient photography out of the repo unless the clinic has written consent for public use.
