# Haywood Hoppers

A digital coffee passport for Haywood Road — West Asheville's main street.

Ten coffee shops. One road. Walk it.

## What this is

A warmly narrated neighborhood guide and passport game built on the
Camino de Santiago pilgrim passport model. Collect stamps at each of
the 10 core coffee stops on Haywood Road. Earn your True Local badge.

Built with love by a seven-year West Asheville resident.

## Stack

- Next.js 16 (Turbopack)
- TypeScript
- Tailwind CSS 4
- Static JSON data layer
- localStorage for stamp state

## Run locally

git clone https://github.com/[yourusername]/wavl-guide.git
cd wavl-guide
npm install
npm run dev

Open http://localhost:3000

## Data

All business data lives in /src/data/
- shops.json — 49 stops, 9 layers, full data model
- layers.json — layer definitions
- badges.json — badge tiers
- trivia.json — per-stop trivia

Community corrections welcome via PR to the JSON files.

## Design principles

- Steve Krug: Don't Make Me Think
- Camino de Santiago: personal, directional, earned
- Hygge: warmth without friction

## Hashtags

#HaywoodHoppers #WestAVLCoffee #AVLLocal