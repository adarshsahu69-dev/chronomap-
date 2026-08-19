# Chronomap — Interactive Historical Atlas (MVP Plan)

## 1. Goal
Build a free, static, map-first historical atlas of the Indian subcontinent (like BharatRajya):
a full-screen map + time slider where the user scrubs through history and sees which dynasty
ruled each region, with a side panel showing the ruling dynasty, its ruler(s), and active wars.
Bilingual (English + Hindi) toggle. All data hand-curated in JSON.

## 2. Locked Decisions
- **Stack:** Jekyll + GitHub Pages (already configured via `.gitignore`). No backend, no DB.
- **Scope:** Indian subcontinent, EN + Hindi.
- **Data:** Hand-curated seed JSON in `_data/`.

## 3. Information Architecture
- `/` — **Home (core experience):** full-screen Leaflet map + time slider + side panel.
- `/dynasties/` — list of all dynasties (Jekyll Liquid loop over data).
- `/rulers/` — list of all rulers.
- `/wars/` — list of all wars.
- Detail views (dynasty/ruler/war) — **single template page rendered client-side from JSON**
  via `?type=&id=` (avoids GitHub Pages' no-custom-plugin limit for data→page generation).

## 4. Data Model (`_data/`)
Store both languages per field (`_en` / `_hi`).
- `regions.geojson` — FeatureCollection of modern Indian states (region id = state name), used as
  a proxy for historical territories (label as "approximate").
- `dynasties.json`:
  `{ id, name_en, name_hi, color, start, end, region_ids[], summary_en, summary_hi, ruler_ids[], war_ids[] }`
- `rulers.json`:
  `{ id, name_en, name_hi, dynasty_id, start, end, bio_en, bio_hi }`
- `wars.json`:
  `{ id, name_en, name_hi, start, end, belligerent_ids[], region_ids[], summary_en, summary_hi }`
- `eras.json` (optional helpers): `{ label_en, label_hi, year }` for slider snap points
  (Maurya, Gupta, Delhi Sultanate, Mughal, British, Independent…).

## 5. Architecture & Approach
- **Layout:** Jekyll `default.html` shell; one CSS file; modular JS (`assets/js/`):
  - `map.js` — init Leaflet, load `regions.geojson`, recolor regions by dynasty for a year.
  - `timeline.js` — range slider → current year; era labels.
  - `panel.js` — given year, find active dynasties/rulers/wars, render side panel.
  - `i18n.js` — global `lang` (persisted in `localStorage`), re-render from `*_en`/`*_hi`.
  - `detail.js` — parse `?type=&id=`, render detail page from JSON.
- **Core logic (year → view):** for selected `year`, for each region pick the dynasty whose
  `[start,end]` contains `year` (tie-break by latest start). Color region via dynasty `color`.
  Side panel lists dynasties active that year + their rulers + wars overlapping the year.
- **i18n:** all visible strings driven by data fields; toggle swaps `lang` and re-renders.
  Static UI labels (buttons, headings) kept in a small `strings_{en,hi}` map.
- **Map data:** obtain an India-states GeoJSON (~36 features) from a public source; commit locally
  under `assets/geo/`. Leaflet + GeoJSON loaded from repo (no external API at runtime).

## 6. MVP vs Full Version
**MVP (validate the concept):**
- Home map + time slider + side panel; EN/HI toggle.
- ~15 seed dynasties spanning major eras; rulers + wars linked.
- List pages + client-side detail pages.
- Mobile-responsive, no console errors, deploys to GitHub Pages.

**Full version (later):**
- Hundreds of polities; historical-boundary map layers (not just modern states).
- Search + filters; deep relationship graphs; images/media; sourced citations.
- Optional Wikidata sync; community submissions; more languages; "compare eras" / embeddable widget.

## 7. Build Phases (solo dev, relative size S/M/L)
1. **Scaffold Jekyll site + GitHub Pages deploy** (S) — config, layout, CSS, placeholder home.
2. **Acquire & integrate India-states GeoJSON + Leaflet map** (S).
3. **Author seed data JSON** (~15 dynasties + rulers + wars, EN+Hindi) (L — dominant cost).
4. **Time slider + year→region recolor + side panel** (M).
5. **EN/HI i18n toggle + strings** (M).
6. **List pages + client-side detail pages** (M).
7. **Polish: responsive, SEO metadata, validation** (S).

> Note: per planning guidelines I'm not assigning hard hour/day numbers. Indicatively, phases 1–2
> and 4–7 are straightforward engineering; **phase 3 (curating accurate bilingual data) is the
> real bottleneck** and dominates total effort. A credible MVP is reachable over a handful of
> focused sessions once the seed dataset is assembled.

## 8. Risks / Tricky Points
- **Historical accuracy:** modern states ≠ historical boundaries → use as labeled "approximate" proxy.
- **GitHub Pages limits:** no custom plugins → detail pages rendered client-side from JSON (already planned).
- **Data curation effort** is the main risk to "is it worth building" — start small (15 dynasties) to test.
- **Bilingual content** doubles writing; keep summaries short in seed data.
- **Overlapping dynasties** in same region/year → define explicit tie-break rule (latest start).

## 9. Validation
- `bundle exec jekyll serve` → preview locally.
- Map renders; slider scrubs years and recolors regions; side panel updates live.
- EN/HI toggle swaps all visible content and persists on reload.
- List + detail pages render from JSON; no console errors.
- Deploys to GitHub Pages; works on mobile viewport.

## 10. Assumptions / Open Questions
- **Map-first** interaction (like the reference) is the intended primary UX — confirm if list-first preferred.
- Region proxy = modern Indian states is acceptable for MVP.
- No backend/CMS: data edited by editing JSON files (consistent with chosen stack).
- Recommend proceeding to implementation with the 7 phases above.
