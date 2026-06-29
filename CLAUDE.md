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
5th Avenue first (west end at Brambles, east to The Cafe),
then cross to 3rd Street South (Bad Ass Coffee through Jane's),
then south to Naples Bay (Cove Inn). Walk to the pier after.
The Pier is NOT a stamp stop — it is the destination.
Completion screen fires at stop 10 with copy:
"You walked the corridor. Now walk to the end of the pier.
You've earned the sunset."

## The Naples Pier
Symbol of Naples. Built 1888. Pelicans on the pilings.
The pier silhouette is the passport's visual hero mark.
5-minute walk from Cove Inn (stop 10).

## The 10 Core Stops (5th Ave west→east, then 3rd St, then bay)
| # | Shop | Zone | Address |
|---|------|------|---------|
| 1 | Brambles English Tea Room | fifth | 340 5th Ave S |
| 2 | 5th Avenue Coffee Company | fifth | 599 5th Ave S |
| 3 | The Brick Coffee & Bar | fifth | 531 5th Ave S |
| 4 | Bontà Bakery | fifth | 824 5th Ave S #2 |
| 5 | The Cafe | fifth | 821 5th Ave S |
| 6 | Bad Ass Coffee of Hawaii | third | 1307 3rd St S |
| 7 | Tony's Off Third | third | 1300 3rd St S |
| 8 | Books on Third | third | 1300 3rd St S Suite 201 |
| 9 | Jane's Cafe on 3rd | third | 1209 3rd St S |
| 10 | Cove Inn Coffee Shoppe | bay | 900 Broad Ave S |

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
- ✅ Kunjani replaced with The Cafe (confirmed-open, 821 5th Ave S)
- ✅ Bontà address corrected to 824 5th Ave S #2
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
- 2026-06-26 - Kunjani Craft Coffee & Gallery removed from passport. Verified permanently closed (Apr 13, 2026 per their Facebook) AND former address (780 Seagate Dr) was never walkable from Old Naples corridor. Replaced with The Cafe (821 5th Ave S). Bontà address corrected from estimated 490 5th Ave S to confirmed 824 5th Ave S #2.
- 2026-06-26 - Revision 2 polish for client demo (M.A. Vadini). Renamed homepage from "Old Naples Passport" to "Naples, Florida" with tagline-only hero; "Passport" now lives only on CTA. Replaced emoji line with custom SVG pier silhouette (navy + gold sun, Option 3). Added Peachy Kean DevOps footer attribution with mailto. Fixed map projection (route-position by passportStop, not latitude) — Forever Fiore no longer isolated. Filter pills now work exclusively (single selectedLayer state, radio-button behavior). Hidden Collection spacing fixed with defensive inline-style gap and full shop names. Verified Forever Fiore address (970 5th Ave N, was 950) and dropped Brambles suite. Cove Inn insider tip updated with cash-only detail.
- 2026-06-26 - Revision 2.4: Voice pass on all 10 stop story bodies. Removed em dashes throughout, cut filler phrases and clichés, tightened copy to read as a knowledgeable friend's recommendation rather than generated travel writing. Cove Inn copy kept as-is (strongest on the site). trivia.json replaced entirely: 14 Asheville/Haywood Road entries removed, 10 Naples-specific entries written from scratch, one per core stop. Topics: preserved florals, high tea etymology, 5th Ave South naming history, Lavazza founding, Italian bonta meaning, Scandinavian fika, 3rd Street vs 5th Ave development history, indie bookstore revival, British breakfast tradition, Naples Bay marine life.
- 2026-06-26 - Revision 2.3: Dynamic OG images via Next.js ImageResponse API. Two new files: src/app/opengraph-image.tsx (homepage card — navy bg, gold pier silhouette, "Naples, Florida" title) and src/app/stop/[slug]/opengraph-image.tsx (per-stop card — stop number circle in selloColor, stop name, address, story headline, zone label, Peachy Kean footer). layout.tsx had no hardcoded OG image reference — no edit needed. Per-stop cards pre-rendered as SSG at build time. Implementation notes: pilings expanded from .map() to individual rect elements; border uses explicit borderTopWidth/Style/Color (not shorthand) for Satori compatibility.
- 2026-06-26 - Revision 2.2: Five surgical fixes. Cove Inn "Walk to the pier" nav link → "Walk to the water". Cove Inn hours note pier reference removed. Site metadata updated from "Old Naples Passport" to "Naples, Florida — A Walking Guide". Third Street South Farmers Market added as bonus stop (Saturday only, 7:30–11:30 AM, 60 vendors, since 1994). The Cafe updated with website, Instagram, Scandinavian-roots story detail, TripAdvisor credibility line. Note: website values stored without https:// protocol — stop page template-strings it on; brief-supplied full URLs were stripped to avoid double-protocol.
- 2026-06-26 - Revision 2.1: Discovered Naples Pier is fully closed — Hurricane Ian (Sept 2022) damage, rebuild groundbreaking Jan 2026, estimated completion Nov 2026. Updated all pier-ending copy to acknowledge the rebuild honestly rather than promise a walk that isn't available. Tagline rewritten ("Naples without the pier wouldn't be Naples. The sixth rebuild is in progress. We'll walk the corridor in the meantime."). Cove Inn story updated with redirect to 13th Ave S beach end + construction note. Stamp 10 completion message updated. Founder note description polished to "streets worth walking." Naples Est. 1885 history line added to intro.
- 2026-06-27 - Revision 3A: Five delight features (commit 356b188). Time-of-day greeting (Good morning/afternoon/evening, Naples) as 'use client' component replacing static eyebrow. Saturday farmers market banner — appears only Saturday before 11:30 AM, client component returns null otherwise. Last-stamped date written to localStorage on each stamp (recordStampDate in stamps.ts), shown on passport page when stampCount > 0. Gold route line segments on map — 9 individual divs replace single line, each fills gold when both neighboring stops are stamped (0.8s transition). Completion certificate on passport page when all 10 stamped — pier SVG, completion date stored in walk-complete-date localStorage key, all 10 stop names, share prompt. Existing COMPOSTELA block preserved below stamp grid.
- 2026-06-27 - Revision 2.2 (stop swap + route reorder): Forever Fiore removed — no answer on phone verification calls. Replaced with Bad Ass Coffee of Hawaii (1307 3rd St S) per local recommendation from Ariana at Brambles. Route reordered: passport now runs 5th Avenue first (Brambles→The Cafe, stops 1–5) then crosses to 3rd Street South (Bad Ass Coffee→Jane's, stops 6–9) then bay finish (Cove Inn, stop 10). Brambles is now stop 1. OG image was already code-based (fixed in Rev 2.3) — no change needed. trivia.json: forever-fiore entry replaced with bad-ass-coffee Kona coffee question. nearbyPassportStops updated throughout to reflect new adjacency. Future dining layer candidates from Ariana: Del Mar (494 5th Ave S), Osteria Tulia (466 5th Ave S), Ocean Prime (699 5th Ave S), La Trattoria (878 5th Ave S), Gelato&Co (483 5th Ave S Unit 2), 3rd Street Farmers Market (Saturdays 7:30–11:30 AM).
- 2026-06-28 - Revision 2.5: metadataBase fixed (old-naples-passport.vercel.app → naples-pass.vercel.app). Homepage copy: pier reference removed from body paragraph and footer tagline — kept only in hero subtitle. Second body paragraph ("Start in the Design District...") removed entirely. Footer note simplified to "Naples, FL · Est. 1885 · Ten stops. Two streets." Quiet Six → Quiet Five (only 5 core stops have hygge:true — brambles, the-cafe, tonys-off-third, books-on-third, janes-cafe-on-3rd). hyggeStops filter updated to exclude passportType:"directory" stops. Brambles address: website returned 403, could not verify externally; keeping 340 5th Ave S per existing verified data. Bad Ass Coffee website: provided URL (badassco.com) redirects to domain-parking page, badassoffhawaii.com also unresolvable — website field left blank. mealtime field added to all 10 core stops (all: morning+lunch). Five directory stops added: Del Mar, Osteria Tulia, Ocean Prime, La Trattoria, Gelato&Co — all zone fifth, passportType directory, with mealtime as lunch/dinner/dessert as appropriate. RouteFilter.tsx client component added: mealtime filter pills (Morning/Lunch/Dinner/Dessert), time-based default (dinner if hour >= 18, else morning), shows Dining section for non-Morning filters. README replaced: Haywood Hoppers → Naples content.
