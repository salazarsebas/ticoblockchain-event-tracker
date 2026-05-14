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
pnpm dev             # next dev
pnpm build           # next build  — must pass before declaring task done
pnpm lint            # eslint
pnpm test            # vitest run
pnpm test:watch      # vitest watch
```

> This project is committed to **pnpm** (pinned in `package.json` `packageManager`, enforced by a `preinstall` guard). Do not run `npm install` — it will fail by design.

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
- **All three live-data routes (`/`, `/agenda`, `/exponentes`) are statically prerendered** (ISR every 10s) so they feel instant on prefetch — same smoothness as `/mapa` / `/sponsors`. Each page body lives in a colocated view component (`app/_views/EnVivoView.tsx`, `app/_views/AgendaView.tsx`, `app/_views/ExponentesView.tsx`); the corresponding `page.tsx` files are thin static wrappers that call the view with `now = new Date()` and `simulated = null`.
- **QA time-travel** routes (`/dev`, `/dev/agenda`, `/dev/exponentes`) mount the same view components in dynamic contexts and read `?now=<ISO-8601>` for the simulated clock — e.g. `/dev/agenda?now=2026-05-14T10:15:00-06:00`. The override is honored in `pnpm dev` only — `resolveNow` ignores it in production (`app/data/now.ts:13`). Don't reintroduce `?now=` on the public routes themselves; that would force them back to dynamic rendering and bring back the loading-state flash.
- **`/agenda?stage=main|escenario-2` filter** is preserved as a shareable URL but applied **client-side** by `AgendaToolbar` (`app/agenda/_components/AgendaToolbar.tsx`) so the page can stay static. The toolbar's useEffect:
  - updates `data-stage-filter` on the `<main>` wrapper, which CSS rules in `app/globals.css` use to collapse `[data-row-grid]` / `[data-header-grid]` from 3 cols to 2;
  - hides the non-matching `[data-stage-header]` column header via `hidden`;
  - sets `display: none` on `[data-stage]` cells that don't match.
  - Rows tagged `data-stages="both"` always pass the filter. Don't reintroduce server-side stage filtering — it would force `/agenda` back to dynamic.

### Design system ("Horizonte Cobalt")
- Reference `docs/design-system/design-system.md` and `color-tokens.json` for any new page or component.
- House rules: **zero border-radius**, **no shadows**, **no gradients**. Crimson is reserved for LIVE/active states only.

### Code style
- Server Components by default; add `"use client"` only when a component needs hooks, browser APIs, or event handlers.
- Keep components small and colocated under `app/components/` (or a route's local folder when single-use).
- TypeScript strict — no `any` escapes; extend types in `app/data/types.ts` when adding new content shapes.
- Don't introduce new top-level dirs without reason — prefer `app/<segment>/` or `app/components/`.
- **Tailwind v4 / CSS-var pitfall**: Lightning CSS tree-shakes custom CSS variables that aren't registered as theme tokens, even when declared in `:root` or `@theme`. Don't try to centralize a layout literal (e.g. nav height) via `--my-var` and reference it from `h-[var(--my-var)]` — the variable definition gets stripped from the bundle and the utility resolves to nothing. Use a literal + documented multi-site contract instead (see the 4-site `72px` note in `app/components/NavBar.tsx`).
- **Brand hex outside browser CSS**: Edge-runtime surfaces (Next.js `ImageResponse` for `/opengraph-image`, the PWA `themeColor` viewport entry) can't read CSS vars. Source those values from `app/data/brand-colors.ts` (`BRAND.primary` / `BRAND.secondary` / `BRAND.surface`) and keep that file in sync with the `:root` tokens in `app/globals.css`.

### Git
- Feature branches; conventional commits (`feat:`/`fix:`/`refactor:`/...). Never force-push `main`.

## Updating the agenda or speakers as the event evolves

The agenda and speaker roster will keep changing in the run-up to May 14 (and may need hot-fixes during the event). Both are static TypeScript and sync into the live UI automatically as long as you follow these rules:

- **Client-published roster** is the **Speakers section at https://www.ticoblockchain.cr/** — that page is the canonical list of who's confirmed. When the client says "we updated the speakers," fetch that URL, diff against `app/data/speakers.ts`, and apply only the deltas (add/remove/rename, photo + LinkedIn updates).
- **In-app source of truth** lives in two files: `app/data/sessions.ts` (the agenda timeline) and `app/data/speakers.ts` (the cards on `/exponentes`).
- **Edit `sessions.ts`** for any time, title, description, or session-speaker change; for added/removed/relocated talks. The home hero, agenda timeline, and live status engine all read from this file.
- **Edit `speakers.ts`** for added/removed speakers or when a speaker's slot moves. Each speaker entry's `time` and `stage` should match a session entry in `sessions.ts` — that's what drives their live status on `/exponentes`.
- **Keep `time` strings in sync verbatim.** Use the canonical em-dash format `"HH:MM — HH:MM"` (e.g. `"10:00 — 10:25"`). Speakers and sessions match on literal string equality of the `time` field plus stage compatibility (`speaker.stage === session.stage` OR `session.stage === "both"`).
- **For TBD speakers**, set `time: "Por anunciar"`. They'll fall back to their literal `status` (typically `"scheduled"`) and won't break anything; they just won't auto-flip to live.
- **Multi-appearance speakers** (someone on more than one panel — e.g. Karla moderating Perspectivas at 10:55 *and* the closing CRTW panel at 17:30): each `Speaker` only has one `time`, so add a second entry with an `-cierre` (or analogous) suffix on the id and the second slot's `time`/`stage`. Name/org/photo/LinkedIn stay identical. Both cards render on `/exponentes`, each flipping live at the correct moment.
- **Photo URLs from the official site CDN can be mislabeled** (Webflow CMS quirk — the file named `Diego%20Perez.png` may be served for a different speaker, or two speakers may share one URL). Trust what the page actually renders, but spot-check `/exponentes` after edits and fall back to `IMG_TBA` for any portrait that's clearly the wrong face.
- **For "both"-stage sessions** (ceremonies, joint keynotes, breaks), leave `stage: "both"` in `sessions.ts` — speakers on either physical stage at that time inherit the status correctly.
- **No reseed needed.** The status field hard-coded in each entry is only a fallback for off-event-day rendering. On May 14, the live engine recomputes everything from `time` + the wall clock; you don't need to update `status` fields manually.
- **When new agenda PDFs / source docs arrive**, drop them in the repo root or `docs/venue/`. Read the PDF (use `pypdf` for hyperlink annotations if speakers carry LinkedIn / company URLs), diff against `sessions.ts` + `speakers.ts`, and apply only the deltas.
- **After any change**: `pnpm build` + `pnpm lint` + `pnpm test` (the speaker-status tests in `app/exponentes/_lib/speakerStatus.test.ts` and the session-engine tests in `app/data/sessions.test.ts` will catch most regressions). Spot-check via `?now=2026-05-14T<HH:MM>:00-06:00` on `/`, `/agenda`, and `/exponentes` for any moment that materially changed.

## Pending placeholder fills (client info still owed)

One `// TODO:` marker in `app/data/sessions.ts` is an intentional placeholder waiting on client info, and should be replaced before May 14:

- **`smart-cities-artemis-esc2`** (16:00 — 16:25 Esc-2) — `speakerName` is intentionally omitted (image marked "Falta" = TBD). Add when Artemis confirms a speaker.

Find it with: `grep -n "TODO: client" app/data/sessions.ts`.

## After the event: post-event reconciliation

Once May 14 ends, `phase === "after"` flips and `HeroAfter` renders. Most counts on the site derive from the data files automatically, but a handful of strings and labels are *pre-event* phrasing that needs a manual pass once the agenda is final and nothing else is going to change:

- **`HeroAfter` stat band labels** (`app/components/hero/HeroAfter.tsx`) — the "Charlas" stat is bound to `SESSIONS.length`, which includes breaks and ceremonies. Under the BIOS taxonomy, "Charla" is now a specific category (a handful of sessions), so the label reads as wrong. Either rename to `"Sesiones"` (count stays accurate) or break the band into category-specific stats (e.g. `Keynotes · Paneles · Charlas · Workshops · Pitches`) sourced from `SESSIONS.filter(s => s.category === "...")`.
- **Final `SESSIONS` / `SPEAKERS` delta** — apply cancellations, no-shows, last-minute substitutions, and any speaker-photo corrections (Webflow CDN mislabeling caveat above still applies).
- **Sponsor roster final pass** (`app/data/sponsors.ts`) — `aliados`, `media`, and `coctel` tiers tend to land late; confirm the final list (e.g. the Esencial Costa Rica seal under `aliados` was a same-week add).
- **SEO copy in past tense** — `app/layout.tsx` description and `app/opengraph-image.tsx` both say "en vivo" / "EN VIVO". Move them to past tense post-event so social shares and search snippets don't read like the event is still upcoming.
- **Pre-event hype strings** — `HERO_CONTENT.capacityLabel` in `app/data/home-content.ts` (e.g. "85% CAPACIDAD") is only rendered on `HeroBefore` / `HeroDuring`, so nothing visibly breaks post-event — but refresh it before reusing this codebase for a future edition.

Spot-check via `?now=2026-05-14T20:30:00-06:00` and `?now=2026-05-21T12:00:00-06:00` on `/`, `/agenda`, and `/exponentes` to confirm the post-event state reads correctly.

## Before declaring a task done
1. Real code changes are in (not just a plan).
2. `pnpm build` passes.
3. `pnpm lint` is clean for files you touched.
4. For UI work, manually verify in `pnpm dev` (golden path + an edge case).
5. Brief summary of what changed and which files were touched.

## Browser Automation

Use `agent-browser` for web automation. Run `agent-browser --help` for all commands.

Core workflow:
1. `agent-browser open <url>` - Navigate to page
2. `agent-browser snapshot -i` - Get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` - Interact using refs
4. Re-snapshot after page changes
