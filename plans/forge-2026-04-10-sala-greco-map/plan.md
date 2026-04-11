# Forge Plan — Sala Greco Interactive Map

**Date**: 2026-04-10
**Branch**: `feat/map-feature`
**Mode**: SIMPLE
**Source spec**: `plan/sala-greco-map.md` (full 495-line spec — this forge plan is the condensed execution wrapper)

## What

Replace the `app/mapa/page.tsx` placeholder (currently shows fake Sala A/B/C) with a data-driven interactive SVG map of the real venue (Sala Greco + Lobby) at Tico Blockchain 2026.

### Acceptance criteria (from source spec §15, condensed)

- `npm run build` passes with zero errors/warnings
- Zero new dependencies in `package.json`
- No references to "Sala A/B/C" anywhere in `app/`
- Map renders Sala Greco + Lobby with: stage, 9 stands, mesas regalo, mesas transmisión, check-in, 2 entry doors, hotel entrance, food & coffee, toilets
- All interactive shapes open a detail panel on click
- Filter chips toggle POI category visibility
- Escape closes panel, Tab cycles shapes, focus returns on close
- "Estás aquí" pin bounces over Hotel Main Entrance
- Responsive at 375px / 768px / 1440px
- Zero border-radius anywhere
- Only design-system colors used

## How (files to create/modify, in order)

**Subtask 1 — Scaffold**
- Create `app/mapa/types.ts`
- Create `app/mapa/data/zones.ts`
- Create `app/mapa/data/greco-features.ts`
- Create `app/mapa/data/stands.ts`
- Create `app/mapa/data/lobby-pois.ts`
- Create `app/mapa/layout.tsx` (holds the `metadata` export since page becomes client)

**Subtask 2 — FloorplanSVG (static)**
- Create `app/mapa/components/FloorplanSVG.tsx` — renders all shapes, no click handlers yet

**Subtask 3 — Page + Legend + Filters**
- Rewrite `app/mapa/page.tsx` as `"use client"` with state
- Create `app/mapa/components/MapLegend.tsx`
- Create `app/mapa/components/FilterChips.tsx`

**Subtask 4 — Detail panel + interactivity**
- Create `app/mapa/components/FeatureDetailPanel.tsx`
- Add click/keyboard handlers to FloorplanSVG
- Wire selection state + focus management

**Subtask 5 — Verify**
- `npm run build` (must pass)
- `npm run lint`
- Fresh review agent with diff

## Tests

No automated tests exist in this repo (verified via `package.json` — no test runner configured). Verification is:
1. **Build passes** — `npm run build` catches TS + lint errors
2. **Manual smoke test** — described in source spec §14 step 14
3. **Fresh review agent** — security, bugs, quality, spec compliance

If any subtask's build fails, max 3 fix attempts before escalating.

## Design system notes captured from scan

- Color tokens available as Tailwind v4 classes: `bg-primary`, `bg-primary-container`, `bg-primary-fixed-dim`, `bg-secondary`, `bg-surface`, `bg-surface-container-low`, `bg-surface-container-lowest`, `bg-surface-variant`, etc.
- Fonts: `font-display` (Space Grotesk), `font-mono` (JetBrains Mono), `font-sans` (Inter)
- Animations already defined: `animate-pin-bounce`, `animate-live-glow`, `animate-reveal-up`, `animate-fade-up`
- **Flat Maps rule** (design-system.md §4): "Event maps must be rendered in flat vector shapes using only the `primary-fixed-dim` (#b4c5ff) and `surface-variant` (#e4e2de) tokens. No 3D, no shadows, no textures." — I'll use these as primary map fills, with `secondary` (#ba002e) reserved for CTAs (check-in, entry doors, "Estás aquí" pin).
- **No gray, no gradients, no rounded corners, no icons-for-everything** — use Spanish text labels prominently.

## Scope lock

Do exactly what `plan/sala-greco-map.md` specifies. Nothing more. No refactors of NavBar, no touching other pages, no "improvements" to globals.css.
