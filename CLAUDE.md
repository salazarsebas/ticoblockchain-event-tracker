@AGENTS.md

# TicoBlockchain Event Tracker

Live event tracker for TicoBlockchain 2026 (May 14, 2026 — Hotel Barcelo San Jose, Costa Rica). Real-time session status, agenda, map, and speakers — no backend, no CMS.

## Stack
- **Next.js 16.2.3** (App Router) — see `AGENTS.md` warning above; verify against `node_modules/next/dist/docs/` before adopting unfamiliar patterns
- **React 19.2.4** + **TypeScript 5** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — theme defined inline with `@theme` in `app/globals.css`, **no** `tailwind.config.js`
- **Vitest 4** for tests
- Path alias: `@/*` → repo root

## Commands
```bash
npm run dev          # next dev
npm run build        # next build  — must pass before declaring task done
npm run lint         # eslint
npm test             # vitest run
npm run test:watch   # vitest watch
```

## Structure
```
app/
  page.tsx, layout.tsx, error.tsx, not-found.tsx
  agenda/  exponentes/  mapa/  sponsors/    # route segments
  components/   # shared UI (NavBar, Footer, LiveRefresh, StatusBadge, ...)
  data/         # event content as typed const arrays (sessions, speakers, sponsors, venue, types)
  lib/          # small client helpers (nav-links, stagger)
  opengraph-image.tsx  robots.ts  sitemap.ts
docs/
  design-system/   # design-system.md + color-tokens.json — read before new UI work
  venue/           # venue assets / reference
  AUDIT_FINDINGS.md  STRESS_TEST_PLAN.md
plans/             # in-progress implementation plans
public/            # static assets
```

## Conventions

### Data & time
- All event data is **static TypeScript** in `app/data/` — no API routes, no DB.
- Session status (`scheduled`/`live`/`next`/`past`) is **computed from wall-clock time** in `America/Costa_Rica` (UTC-6, no DST). Never store status; always derive.
- Time-zone-sensitive code must handle the offset explicitly — do not rely on the host TZ.
- `LiveRefresh` schedules **exact-boundary** refreshes at session transitions; do not replace it with polling.
- `?now=<ISO-8601>` query param enables time-travel in dev for QA — preserve this hook.

### Design system ("Horizonte Cobalt")
- Reference `docs/design-system/design-system.md` and `color-tokens.json` for any new page or component.
- House rules: **zero border-radius**, **no shadows**, **no gradients**. Crimson is reserved for LIVE/active states only.

### Code style
- Server Components by default; add `"use client"` only when a component needs hooks, browser APIs, or event handlers.
- Keep components small and colocated under `app/components/` (or a route's local folder when single-use).
- TypeScript strict — no `any` escapes; extend types in `app/data/types.ts` when adding new content shapes.
- Don't introduce new top-level dirs without reason — prefer `app/<segment>/` or `app/components/`.

### Git
- Feature branches; conventional commits (`feat:`/`fix:`/`refactor:`/...). Never force-push `main`.

## Before declaring a task done
1. Real code changes are in (not just a plan).
2. `npm run build` passes.
3. `npm run lint` is clean for files you touched.
4. For UI work, manually verify in `npm run dev` (golden path + an edge case).
5. Brief summary of what changed and which files were touched.

## Browser Automation

Use `agent-browser` for web automation. Run `agent-browser --help` for all commands.

Core workflow:
1. `agent-browser open <url>` - Navigate to page
2. `agent-browser snapshot -i` - Get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` - Interact using refs
4. Re-snapshot after page changes
