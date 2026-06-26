# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Old Naples Passport — Claude Code Project Brief
> John Kean · Peachy Kean DevOps LLC · Asheville, NC
> Last updated: June 26, 2026

## What This Is
Old Naples Passport is a mobile-first digital walking passport
for Old Naples, FL. 10 core stops, Design District to Naples Bay.
Users walk the corridor north to south, weaving between
Fifth Avenue South and Third Street South, stamp each stop,
and finish at the Naples Pier. No auth, no login,
localStorage only.

## Commands

```bash
npm run dev        # Start local dev server at localhost:3000
npm run build      # Production build
npm run lint       # ESLint (Next.js config)
npx tsc --noEmit   # Type-check without emitting (required before finishing any task)
```

No test suite exists. Manual review at localhost:3000 is the test process.

## Live URLs
- Production: old-naples-passport.vercel.app (TBD)
- Repo: github.com/juanitok94/old-naples-passport (TBD)
- Local: localhost:3000 (npm run dev in C:\naples-pass)

## Tech Stack
- Next.js 16 App Router
- TypeScript (strict)
- Tailwind CSS 4
- localStorage for all user state
- Vercel for deployment (auto-deploy on git push)

## Design Principles — Non-Negotiable
1. Hygge — warmth, slowness, belonging
2. Camino — journey, earned progress, north to south
3. Krug — don't make me think, clarity first
4. Mobile-first — primary user is walking the corridor
   holding a phone. Desktop is graceful enhancement only.
5. Human first — if it feels like a generic app,
   it's wrong. It should feel like Old Naples.

## Color System — Do Not Change
- Cream background: #f5f0e8
- Deep navy: #0d1f3c
- Navy mid: #1a3560
- Brushed gold accent: #c9a060
- Gold light: #e8c98a
- Body text: #0d1f3c

## Typography — Do Not Change
- Playfair Display — headings (font-serif)
- Crimson Pro — body text (font-serif)
- IBM Plex Mono — labels, UI elements (font-mono)

## Two ICPs
1. TOURISTS — visiting Naples, want authentic local
   experiences beyond the chain restaurants.
   Respond to discovery, walking, feeling like an insider.
2. BUSINESS OWNERS — independent shop owners on 5th and 3rd
   who want foot traffic and to feel proud of being
   featured, not marketed at.

## Journey Direction
North to south — Design District (Forever Fiore) to
Naples Bay (Cove Inn), then walk to Naples Pier.
The Pier is NOT a stamp stop — it is the destination.
Completion screen fires at stop 10 with copy:
"You walked the corridor. Now walk to the end of the pier.
You've earned the sunset."

## The Naples Pier
Symbol of Naples. Built 1888. Pelicans on the pilings.
The pier silhouette is the passport's visual hero mark.
5-minute walk from Cove Inn (stop 10).

## The 10 Core Stops (north to south)
| # | Shop | Zone | Address |
|---|------|------|---------|
| 1 | Forever Fiore Tea Lounge | design | 950 5th Ave N |
| 2 | Brambles English Tea Room | fifth | 340 5th Ave S #102 |
| 3 | 5th Avenue Coffee Company | fifth | 599 5th Ave S |
| 4 | The Brick Coffee & Bar | fifth | 531 5th Ave S |
| 5 | Bontà Bakery | fifth | 490 5th Ave S (est.) |
| 6 | Kunjani Craft Coffee & Gallery | fifth | ⚠ NEEDS FIELD VERIFICATION |
| 7 | Tony's Off Third | third | 1300 3rd St S |
| 8 | Books on Third | third | 1300 3rd St S Suite 201 |
| 9 | Jane's Cafe on 3rd | third | 1209 3rd St S |
| 10 | Cove Inn Coffee Shoppe | bay | 900 Broad Ave S |

## ⚠ Kunjani Location Warning
Some sources place Kunjani Craft Coffee & Gallery near
Waterside Shops (North Naples, not walkable). Confirm
the exact walkable downtown address before launch.
If not walkable, replace with another stop. The shop
in shops.json uses a placeholder coordinate and is
marked status: "needs-verification".

## Bonus/Directory Stops
- Three Sixteen Coffee & Bakery (13500 Tamiami Trail N)
  4.8 stars, excellent croissants — too far to walk, good bonus stop
- Narrative Coffee Roasters Mercato (9106 Strada Pl)
  NOTE: Central Ave location CLOSED as of May 2026

## Zone Field Values
| Zone | Description |
|------|-------------|
| `"design"` | Naples Design District (north of downtown) |
| `"fifth"` | Fifth Avenue South corridor |
| `"third"` | Third Street South corridor |
| `"bay"` | Naples Bay / waterfront approach |

## File Structure
src/
  app/
    page.tsx          — homepage
    map/page.tsx      — interactive map
    passport/         — stamp collection
    stop/[slug]/      — individual stop pages
  data/
    shops.json        — canonical data, source of truth
    layers.json       — map filter layers
    badges.json       — achievement badges
    trivia.json       — trivia questions per stop
  lib/
    stamps.ts         — localStorage stamp logic

## shops.json Data Shape

Key fields on each shop object:

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | kebab-case slug, used in URL and image paths |
| `passportType` | `"core"` \| `"bonus"` \| absent | core = numbered passport stop |
| `passportStop` | number | 1–10, north-to-south order |
| `zone` | `"design"` \| `"fifth"` \| `"third"` \| `"bay"` | which corridor |
| `coordinates` | `[lon, lat]` | longitude first (not lat/lon) |
| `selloColor` | hex | per-shop accent color for stamp circles and headers |
| `layers` | string[] | e.g. `["coffee"]` — used for map filter visibility |
| `hygge` | boolean | hygge-quality stop — do not modify without confirmation |
| `hours` | `{ mon–sun: string, note?: string }` | `"Closed"` for closed days |
| `stamp` | `{ welcomeLine, subLine }` | Shown after stamping on stop page |
| `story` | `{ headline, body, insiderTip?, parkingNote? }` | Editorial content |
| `status` | string | `"confirmed-open"` or `"needs-verification"` |

## Client vs. Server components

- `app/page.tsx` — server component (no `'use client'`, no localStorage)
- `app/map/page.tsx` — `'use client'` (uses stamps, useState)
- `app/passport/page.tsx` — `'use client'` (uses stamps, useState)
- `app/stop/[slug]/page.tsx` — `'use client'` (uses stamps, useState)

All stamp reads must be guarded: `lib/stamps.ts` returns `{}` during SSR.
Never call stamp functions outside `useEffect` or client components.

## Standing Rules for Claude Code
1. Always check TypeScript compiles before finishing
   (npx tsc --noEmit)
2. Never modify shops.json stop numbers or core/bonus
   status without explicit confirmation from John
3. Never change colors, fonts, or design tokens
4. Mobile-first — test layout at 390px width thinking
5. Always localhost review before git push
6. Commit message format:
   feat: for new features
   fix: for corrections
   refactor: for restructuring
7. Data mapping — when mapping values to shops or stops,
   always verify against the source table above; never
   assume geographic order
8. Truncated messages — if a message appears cut off,
   complete the task based on available context

## Current Build Status (June 26, 2026)
- ✅ Cloned from wavl-guide
- ✅ shops.json rebuilt with 10 Naples stops
- ✅ layers.json updated for Naples
- ✅ badges.json updated for Old Naples Passport
- ✅ globals.css updated with navy/cream/gold palette
- ✅ layout.tsx updated with new title/description
- ✅ package.json renamed to naples-pass
- ⬜ Homepage copy (Haywood references need removing)
- ⬜ Passport page copy
- ⬜ Map page
- ⬜ Stop pages
- ⬜ trivia.json (Naples-specific)
- ⬜ Kunjani location field verification
- ⬜ Shop photos (after photo walk)
- ⬜ GitHub repo creation
- ⬜ Vercel deployment

## Photo Library
Photos location: public/images/shops/
Naming convention: {shop-id}-exterior.jpg, {shop-id}-interior.jpg

## Lab Notes Protocol
When you make a mistake or take a wrong approach, automatically
append a lab note under ## Lab Notes without being asked.
Format: [date] - what failed - why - what to do instead.

## Lab Notes
- 2026-06-26 - Kunjani Craft Coffee & Gallery address unconfirmed —
  some sources place it near Waterside Shops (North Naples), not
  walkable from Old Naples corridor. Marked needs-verification in
  shops.json. Verify before launch and replace if not walkable.
