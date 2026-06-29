# Naples, Florida — A Strolling Guide

Ten stops. Two streets. Stroll the corridor.

## What this is

A warmly narrated strolling guide and passport game for Fifth Avenue South
and Third Street South in Old Naples, Florida. Collect stamps at each of
the 10 core stops — coffee, tea, pastries, books, a garden cafe, and a
diner on the bay. Built by Peachy Kean DevOps, LLC.

## Stack

- Next.js 16 (Turbopack)
- TypeScript
- Tailwind CSS 4
- Static JSON data layer
- localStorage for stamp state

## Run locally

```bash
git clone https://github.com/juanitok94/naples-pass.git
cd naples-pass
npm install
npm run dev
```

Open http://localhost:3000

## Data

All business data lives in `/src/data/`
- `shops.json` — 10 core stops + directory stops, full data model
- `layers.json` — layer definitions
- `badges.json` — badge tiers
- `trivia.json` — per-stop trivia

Community corrections welcome via PR to the JSON files.

## Design principles

- Steve Krug: Don't Make Me Think
- Camino de Santiago: personal, directional, earned
- Hygge: warmth without friction

## Hashtags

#NaplesFlorida #NaplesPier #OldNaples #5thAvenueSouth
