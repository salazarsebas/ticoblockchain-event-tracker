# Sala Greco Interactive Map — Implementation Plan

> **Feature branch**: `feat/map-feature`
> **Target route**: `/mapa`
> **Status**: Plan only. No code written yet.
> **Reference image**: `docs/venue/floorplan-reference.png`

---

## 1. Goal

Replace the placeholder map at `app/mapa/page.tsx` with a real, data-driven, interactive venue map for Tico Blockchain 2026 at Hotel Barceló San José. The map must show the actual venue (Sala Greco + Lobby), let attendees explore zones/stands/POIs, and respect the project's strict "Kinetic Editorial" design system.

## 2. Non-goals (explicitly out of scope)

- Installing any map library (no Leaflet, Mapbox, react-zoom-pan-pinch, etc.)
- Rendering the small adjacent room (will be added later — data model must allow it, but do not draw it)
- Real sponsor data for stands (stands 1–9 use placeholder data)
- Real agenda data for the stage (stage detail panel uses placeholder content)
- Zoom / pan behavior
- Rendering any of the "unused" doors from the original floorplan
- Keeping any reference to "Sala A / Sala B / Sala C" anywhere in the code — they do not exist

---

## 3. Tech constraints (from `CLAUDE.md` / `AGENTS.md` / design system)

- **Next.js 16.2.3** (App Router) — this is a breaking version. Before writing code, read the relevant guides in `node_modules/next/dist/docs/`. Do not rely on pre-15 patterns.
- **React 19.2.4**
- **Tailwind CSS v4** (PostCSS, not a JS config file)
- **TypeScript** strict
- **Zero new dependencies**. Use only what's already in `package.json`.
- **Design system** is in `docs/design-system/`. Must read `design-system.md` and `color-tokens.json` before styling anything.
  - **Border radius**: `0px` strictly (no rounded corners, ever)
  - **Colors**: `#000d33` / `#002060` (cobalt), `#ba002e` (crimson), `#fbf9f5` (warm white), plus surface variants
  - **Fonts**: Space Grotesk for headlines/labels (uppercase, tight tracking), JetBrains Mono for data only, Inter for body
  - **Icons**: Material Symbols (already loaded)
  - **Existing animations available**: `animate-reveal-up`, `animate-fade-up`, `animate-live-glow`, `animate-pin-bounce`

---

## 4. Venue model

The map renders **two connected zones** stacked vertically.

### Zone 1 — Sala Greco (main room, ~75% of the canvas)

| Feature | Position | Interactive? | Notes |
|---|---|---|---|
| Stage / Podium | Top wall, center | ✅ | Placeholder detail: "Current talk: TBD" |
| Mesas Regalo (swag tables) | Top-right corner | ✅ | Label + description |
| Mesas Transmisión (broadcast) | **Left wall, center** | ✅ | Moved from original PPT position per PM |
| Audience seating | Center grid | ❌ | Decorative only — drawn as faint rectangles for orientation |
| Check-in desk | **Bottom wall, between the two entry doors** | ✅ | INSIDE Sala Greco, not in the Lobby |
| Entry Door 1 (left) | Bottom wall, left of check-in | ✅ | Clickable — description: "Entrada Sala Greco" |
| Entry Door 2 (right) | Bottom wall, right of check-in | ✅ | Same |
| Stands 1–5 | Down the LEFT wall | ✅ | Each links to placeholder sponsor |
| Stands 6–9 | Down the RIGHT wall | ✅ | Each links to placeholder sponsor |

**Do not render**: any door shown in the original floorplan that is not one of the two bottom-wall entry doors. Specifically, ignore the right-wall door and any other exit markings. They are unused for the event.

### Zone 2 — Lobby / Foyer (strip below Sala Greco, ~25% of the canvas)

Horizontal layout, right → left:

| POI | Position | Category | Notes |
|---|---|---|---|
| Hotel Main Entrance | Bottom-right | `entrance` | Default "Estás aquí" location |
| Food & Coffee | Center (long strip) | `food` | Single label — no sub-sections |
| Toilets | Bottom-left | `toilet` | Label only |

### Attendee flow the map must support

```
Hotel Main Entrance (bottom-right of Lobby)
  → walk left through Food & Coffee
  → arrive at one of the two Sala Greco doors
  → pass Check-in (between the doors)
  → inside Greco: find stage, stands, mesas transmisión, mesas regalo
```

---

## 5. File structure to create

```
app/mapa/
├── page.tsx                         ← REPLACE (currently has Sala A/B/C placeholder)
├── data/
│   ├── zones.ts                     ← NEW — zone bounding boxes
│   ├── greco-features.ts            ← NEW — stage, mesas, check-in, audience, doors
│   ├── stands.ts                    ← NEW — stands 1–9 with placeholder sponsors
│   └── lobby-pois.ts                ← NEW — entrance, food, toilets
└── components/
    ├── FloorplanSVG.tsx             ← NEW — the single SVG rendering everything
    ├── MapLegend.tsx                ← NEW — left sidebar / mobile drawer
    ├── FilterChips.tsx              ← NEW — toggleable category filters
    └── FeatureDetailPanel.tsx       ← NEW — slide-in panel for selected feature
```

Plus a tiny shared types file:

```
app/mapa/types.ts                    ← NEW — TypeScript types shared across data + components
```

**Do not touch**:
- `app/components/NavBar.tsx` (unless the MAPA link label needs updating — it doesn't)
- `app/components/Footer.tsx`
- Any other page

---

## 6. TypeScript types (exact shapes)

```ts
// app/mapa/types.ts

export type BBox = { x: number; y: number; width: number; height: number };

export type POICategory =
  | 'stage'
  | 'stands'
  | 'food'
  | 'toilet'
  | 'checkin'
  | 'entrance'
  | 'tables';

export type Zone = {
  id: 'greco' | 'lobby';
  label: string;
  bbox: BBox;
};

export type GrecoFeature = {
  id: string;
  kind:
    | 'stage'
    | 'mesas-regalo'
    | 'mesas-transmision'
    | 'check-in'
    | 'audience'
    | 'entry-door';
  label: string;
  bbox: BBox;
  category: POICategory;
  interactive: boolean;   // `audience` is false; everything else true
  description?: string;
};

export type Stand = {
  id: `stand-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  wall: 'left' | 'right';
  bbox: BBox;
  sponsorName?: string;   // undefined → "Stand disponible"
  sponsorUrl?: string;
};

export type LobbyPOI = {
  id: 'hotel-entrance' | 'food-coffee' | 'toilets';
  label: string;
  category: POICategory;
  bbox: BBox;
  iconName: string;        // Material Symbols name, e.g. 'door_front', 'restaurant', 'wc'
  description?: string;
};

export type SelectableFeature = GrecoFeature | Stand | LobbyPOI;
```

---

## 7. SVG coordinate strategy

Use a **single inline `<svg>`** with a fixed `viewBox` — never hardcode pixel values anywhere inside it. The SVG scales responsively via `preserveAspectRatio="xMidYMid meet"`.

**Proposed viewBox**: `"0 0 1000 800"`

Rough zone layout inside the viewBox (implementor should fine-tune visually against `docs/venue/floorplan-reference.png`):

| Element | x | y | width | height |
|---|---|---|---|---|
| Sala Greco outline | 60 | 40 | 880 | 580 |
| Lobby outline | 60 | 660 | 880 | 120 |

Rough feature placement inside Sala Greco (viewBox coords):

| Feature | x | y | w | h |
|---|---|---|---|---|
| Stage / Podium | 360 | 60 | 280 | 90 |
| Mesas Regalo | 730 | 70 | 190 | 70 |
| Mesas Transmisión | 80 | 300 | 90 | 100 |
| Audience (decorative) | 260 | 180 | 480 | 380 |
| Check-in desk | 430 | 560 | 140 | 40 |
| Entry door left (red) | 340 | 600 | 80 | 20 |
| Entry door right (red) | 580 | 600 | 80 | 20 |
| Stand 1 (left wall) | 80 | 170 | 80 | 50 |
| Stand 2 | 80 | 230 | 80 | 50 |
| Stand 3 | 80 | 410 | 80 | 50 |
| Stand 4 | 80 | 470 | 80 | 50 |
| Stand 5 | 80 | 530 | 80 | 50 |
| Stand 6 (right wall) | 840 | 170 | 80 | 50 |
| Stand 7 | 840 | 240 | 80 | 50 |
| Stand 8 | 840 | 310 | 80 | 50 |
| Stand 9 | 840 | 380 | 80 | 50 |

Rough POI placement in Lobby:

| POI | x | y | w | h |
|---|---|---|---|---|
| Toilets | 80 | 690 | 140 | 70 |
| Food & Coffee | 280 | 690 | 440 | 70 |
| Hotel Main Entrance | 780 | 690 | 140 | 70 |

> **Note to implementor**: These numbers are starting points. After the first render, open `/mapa` in a browser and nudge values against the reference image. Don't spend more than 15 minutes perfecting placement — close enough is fine.

---

## 8. Component breakdown

### 8.1 `app/mapa/page.tsx` (client component)

- Add `"use client"` — this page now holds interactive state
- State:
  - `selectedFeatureId: string | null`
  - `activeFilters: Set<POICategory>` (starts with all categories enabled)
- Keep the existing `<h1>MAPA</h1>` treatment and "UBICACIÓN: HOTEL BARCELÓ SAN JOSÉ" subheader
- Layout grid: `grid grid-cols-1 lg:grid-cols-12`
  - `<MapLegend />` in `lg:col-span-3`
  - `<FloorplanSVG />` in `lg:col-span-9`
  - `<FilterChips />` above the SVG on desktop, below the header on mobile
- `<FeatureDetailPanel />` mounts as a slide-in aside on desktop, full-screen drawer on mobile
- Default `selectedFeatureId = null`; default `activeFilters = new Set<POICategory>(['stage', 'stands', 'food', 'toilet', 'checkin', 'entrance', 'tables'])`
- Move the `export const metadata` to a separate `app/mapa/layout.tsx` since a `"use client"` page can't export metadata

### 8.2 `app/mapa/layout.tsx` (server component, NEW — tiny)

Only exists to hold the metadata export, since `page.tsx` is now a client component. Just returns `{children}`.

### 8.3 `app/mapa/components/FloorplanSVG.tsx`

- Props: `{ selectedId, activeFilters, onSelect }`
- Renders a single `<svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet">`
- Draws in z-order:
  1. Sala Greco zone outline (thick cobalt border, white fill)
  2. Lobby zone outline (thick cobalt border, warm-white fill)
  3. Audience seating grid (faint gray rects — decorative, `pointer-events-none`)
  4. Greco features (stage, mesas regalo, mesas transmisión, check-in, entry doors)
  5. Stands (9 rects with numbers)
  6. Lobby POIs (colored rects with Material Symbols icons as `<text>` elements or `<foreignObject>`)
  7. "Estás aquí" pin anchored to Hotel Main Entrance — use `animate-pin-bounce`
  8. Zone labels as `<text>` — uppercase Space Grotesk
- Each interactive shape is wrapped in a `<g>` with:
  - `role="button"`
  - `tabIndex={0}`
  - `aria-label` with the feature's label
  - `onClick={() => onSelect(feature.id)}`
  - `onKeyDown` handler for Enter/Space
  - `className` that changes opacity based on whether its category is in `activeFilters`
- Selected feature gets a crimson stroke ring (4px, no radius)
- Hover: scale cursor to pointer, raise stroke width

### 8.4 `app/mapa/components/MapLegend.tsx`

- Desktop (`lg:block`): vertical legend in the left column — cobalt background, white text
  - Category swatches with label (MAIN STAGE, STANDS, FOOD & COFFEE, TOILETS, CHECK-IN, ENTRADA, MESAS)
  - "ESTÁS AQUÍ" indicator at the bottom using `animate-live-glow`
- Mobile (`lg:hidden`): collapsible bottom sheet triggered by a button
- Respects zero-radius rule — all squares, no pills

### 8.5 `app/mapa/components/FilterChips.tsx`

- Horizontal row of toggleable chips, one per POI category
- Each chip: uppercase Space Grotesk, Material Symbol icon, cobalt border
- Active state: cobalt background, white text
- Inactive state: transparent background, cobalt text
- Clicking a chip toggles that category in `activeFilters`
- Mobile: horizontally scrollable (`overflow-x-auto`), snap to items
- No border radius, no rounded pills

### 8.6 `app/mapa/components/FeatureDetailPanel.tsx`

- Renders nothing when `selectedFeatureId` is null
- Desktop: slide-in from right, `w-96`, full-height, cobalt border-left 4px
- Mobile: full-screen overlay from bottom
- Uses `role="dialog"` with `aria-labelledby` pointing to the panel title
- Escape key closes; focus returns to the triggering element
- Content layout:
  - Close button (top-right, crimson, Material Symbol `close`)
  - Category label (uppercase, mono)
  - Feature title (large, Space Grotesk, uppercase)
  - Description paragraph
  - Category-specific extras:
    - Stage → "PRÓXIMA CHARLA: TBD"
    - Stand → "Sponsor: Disponible" + placeholder CTA
    - Food & Coffee → simple description
    - Toilets → simple description
    - Check-in → "Presenta tu código QR"
    - Entry door → "Acceso a Sala Greco"

---

## 9. Data file contents (exact)

### 9.1 `app/mapa/data/zones.ts`

Exports a const array of two zones: `greco` and `lobby`, matching the coordinates in Section 7.

### 9.2 `app/mapa/data/greco-features.ts`

Exports a const array of all Greco interior features:
- `stage` (kind: stage, category: stage, interactive: true)
- `mesas-regalo` (kind: mesas-regalo, category: tables, interactive: true)
- `mesas-transmision` (kind: mesas-transmision, category: tables, interactive: true)
- `audience` (kind: audience, category: stage, interactive: **false**)
- `check-in` (kind: check-in, category: checkin, interactive: true)
- `entry-door-left` (kind: entry-door, category: entrance, interactive: true)
- `entry-door-right` (kind: entry-door, category: entrance, interactive: true)

### 9.3 `app/mapa/data/stands.ts`

Exports a const array of 9 stands:
- Stands 1–5 on `wall: 'left'`, stands 6–9 on `wall: 'right'`
- All with `sponsorName: undefined` (placeholder)
- IDs: `stand-1` through `stand-9`

### 9.4 `app/mapa/data/lobby-pois.ts`

Exports a const array of 3 POIs:
- `hotel-entrance` (category: entrance, icon: `door_front`)
- `food-coffee` (category: food, icon: `restaurant`)
- `toilets` (category: toilet, icon: `wc`)

---

## 10. Interaction flow

1. User lands on `/mapa`
2. Map renders with all filters active, `selectedFeatureId = null`
3. "Estás aquí" pin bounces over the Hotel Main Entrance
4. User clicks a filter chip → that category's features fade to `opacity-20`
5. User clicks an interactive shape → detail panel slides in, shape gets crimson selection ring
6. User presses Escape OR clicks the close button OR clicks another shape → panel closes/swaps
7. Tab key cycles through shapes in DOM order, Enter opens the detail panel

**State management**: Pure React `useState` + `useCallback` handlers. No Zustand, no context, no libraries.

---

## 11. Styling rules (non-negotiable)

- **Every rect, line, path, button, border, card**: zero border-radius
- **Colors**: only from the design system tokens
  - Zone borders: `#000d33` (primary)
  - Sala Greco fill: `#ffffff` (surface container lowest)
  - Lobby fill: `#f5f3ef` (surface container low)
  - Stage/podium fill: `#002060` (primary-container) with white text at 20% opacity (matches existing `animate-pin-bounce` treatment)
  - Stands fill: `#e4e2de` (surface variant), border cobalt
  - Stand number text: `#000d33` (primary), Space Grotesk bold
  - Audience rects: `#e4e2de` at 40% opacity
  - Check-in desk: `#ba002e` (secondary) fill, white text
  - Entry doors: `#ba002e` (secondary) fill — matches the red annotation
  - Toilets POI: surface variant fill, cobalt border, Material Symbol icon
  - Food POI: surface variant fill, cobalt border, Material Symbol icon
  - Hotel entrance POI: primary-container fill, white text
  - "Estás aquí" pin: secondary (`#ba002e`), uses existing `animate-pin-bounce`
  - Selected shape ring: `#ba002e`, 4px stroke, no radius
  - Focus ring: `#ba002e`, 2px stroke, 2px offset, no radius
- **Typography**:
  - Zone label (GRECO / LOBBY): Space Grotesk bold, uppercase, tracking-tight, `#000d33`
  - Stand numbers: Space Grotesk black, uppercase
  - POI labels: JetBrains Mono, uppercase, 10px
- **Spacing**: follow existing tokens in the Tailwind config
- **Animations**: reuse `animate-pin-bounce` and `animate-live-glow` — don't invent new keyframes

---

## 12. Accessibility requirements

- All interactive `<g>` elements: `role="button"`, `tabIndex={0}`, explicit `aria-label`
- Keyboard: Tab, Shift+Tab, Enter, Space (all must work)
- Detail panel: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, focus return on close
- Escape key closes detail panel
- Filter chips: `<button>` elements with `aria-pressed`
- Color contrast: verify white text on `#002060`, `#ba002e` meets WCAG AA (both already pass in the existing design system)
- Decorative elements (audience grid): `aria-hidden="true"`, `pointer-events-none`
- The SVG itself gets `role="img"` with `aria-labelledby` pointing to a visually-hidden title and description

---

## 13. Responsive strategy

| Breakpoint | Layout |
|---|---|
| `< md` | Stacked: header → filter chips (scroll-x) → SVG (full width) → legend button (opens bottom sheet). Detail panel = full-screen overlay. |
| `md` → `lg` | Header → filter chips → SVG + inline legend below. Detail panel = centered modal. |
| `≥ lg` | 12-col grid: legend (cols 1–3, cobalt bg) + SVG (cols 4–12). Filter chips above SVG. Detail panel = right slide-in aside, `w-96`. |

SVG maintains aspect ratio via `viewBox` + `preserveAspectRatio="xMidYMid meet"` — no manual media queries for sizing.

---

## 14. Implementation order (do in this sequence)

1. **Read context first**
   - Read `docs/venue/floorplan-reference.png` (view the image)
   - Read `docs/design-system/design-system.md`
   - Read `docs/design-system/color-tokens.json`
   - Read `node_modules/next/dist/docs/` guides relevant to App Router client components + metadata split
   - Read the current `app/mapa/page.tsx` (to understand what's being replaced)

2. **Scaffolding** — create all empty files listed in Section 5 (plus `layout.tsx` and `types.ts`) so imports don't break during development

3. **Types first** — write `app/mapa/types.ts` from Section 6 verbatim

4. **Data files** — write all 4 data files from Section 9 with the coordinates from Section 7

5. **FloorplanSVG component** — render static shapes only, no interactivity yet. Verify visually at `/mapa` that it roughly matches the reference image. Nudge coordinates as needed.

6. **page.tsx rewrite** — add `"use client"`, state, and wire in FloorplanSVG with dummy handlers. Move metadata to `layout.tsx`.

7. **FilterChips** — build and wire into state. Verify filtering fades categories correctly.

8. **MapLegend** — build desktop and mobile variants.

9. **FeatureDetailPanel** — build and wire into state. Handle Escape, focus trap, mobile full-screen.

10. **Accessibility pass** — add all ARIA labels, keyboard handlers, focus rings. Test with keyboard only.

11. **Responsive pass** — test at 375px, 768px, 1024px, 1440px. Fix any overflow or layout issues.

12. **Polish** — verify animations (`animate-pin-bounce` on pin), transitions, colors match design system exactly.

13. **Build verification** — run `npm run build` and fix any TypeScript or lint errors. Do NOT mark the task complete until the build passes.

14. **Manual smoke test** — run `npm run dev`, visit `/mapa`, click every interactive shape, toggle every filter, open/close the detail panel with mouse AND keyboard.

---

## 15. Acceptance criteria

A reviewer should be able to confirm ALL of these:

- [ ] `npm run build` passes with zero errors and zero warnings
- [ ] Zero new dependencies in `package.json`
- [ ] No references to "Sala A", "Sala B", "Sala C" anywhere in `app/`
- [ ] The `/mapa` route renders the Sala Greco main room + Lobby strip
- [ ] All 9 stands are visible and clickable, each opens a detail panel
- [ ] Stage, Mesas Regalo, Mesas Transmisión, Check-in, both entry doors are all clickable
- [ ] Toilets, Food & Coffee, Hotel Main Entrance are all visible in the Lobby strip
- [ ] Filter chips toggle category visibility (fade to opacity 20)
- [ ] Detail panel opens on click, closes on Escape, returns focus to trigger
- [ ] Tab navigation cycles through all interactive shapes
- [ ] "Estás aquí" pin bounces over the Hotel Main Entrance
- [ ] Audience seating is drawn but NOT clickable (pointer-events: none)
- [ ] None of the "unused" doors from the original floorplan are rendered
- [ ] Responsive at 375px (mobile), 768px (tablet), 1440px (desktop)
- [ ] Zero border-radius anywhere in the new code
- [ ] Only design system colors used
- [ ] Space Grotesk for headlines, JetBrains Mono for data, Material Symbols for icons

---

## 16. Things to defer to v2 (document but don't build)

- The small adjacent room (attaches somewhere to the bottom of the Lobby, purpose TBD)
- Real stand → sponsor mapping (read from the sponsors data file)
- Real stage → agenda mapping (show current and next talk)
- Live "what's happening now" indicator on the stage
- Pan/zoom for users with low-vision needs
- A shareable URL state (`/mapa?feature=stand-3`)
- Animated transitions between selected features
- A "toma un tour" guided walkthrough

---

## 17. Files referenced by this plan

| Path | Purpose |
|---|---|
| `docs/venue/floorplan-reference.png` | Source-of-truth floorplan (from organizer's PPT) |
| `docs/design-system/design-system.md` | Design philosophy, tokens, rules |
| `docs/design-system/color-tokens.json` | Exact color values |
| `app/mapa/page.tsx` | Current file to be replaced |
| `app/components/NavBar.tsx` | Already links to `/mapa` — no changes |
| `AGENTS.md` | Reminds to read Next.js 16 docs before coding |
| `CLAUDE.md` | Project instructions entry point |

---

## 18. One-line summary

Build an inline-SVG, data-driven interactive map of Sala Greco + Lobby at `/mapa`, replacing the Sala A/B/C placeholder, with clickable zones/stands/POIs, category filter chips, and a detail panel — all in strict compliance with the zero-radius "Kinetic Editorial" design system and no new dependencies.
