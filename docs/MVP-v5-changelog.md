# Self-Light — MVP v5 Changelog

> Based on: `MVP-specv5.md`
> Reviewed on: 2026-03-19
> Scope: Self-zone spatial tile placement plus standalone Self Garden page access
> Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + Framer Motion

## 1. What Was Implemented

### 1.1 Standalone Self Garden page

Implemented:

- clicking the Self zone from the main garden now opens a dedicated page at `/garden/self`
- visiting `/garden` now redirects to `/garden/self`
- the standalone page is focused on the Self Garden only
- the main overview page no longer uses self-zone zoom interaction
- the standalone page includes a back link to the main garden map

### 1.2 Shared tile state across routes

Implemented:

- added a client-side garden state provider so the main overview and the standalone Self Garden page read the same tile list
- newly created tiles remain visible after navigating from the overview page into the standalone Self Garden page during the same session

### 1.3 Self zone split into reusable visual layers

Implemented:

- extracted the reusable Self garden canvas into a shared component
- kept the PNG-based Self garden art as decoration only
- kept the interactive tile layer separate from the decorative base
- reused the same self-canvas structure in both the overview zone and the standalone page
- changed Self tile sizing to be proportional to the Self Garden container instead of fixed-size tiles
- increased the shared Self tile visual size so tiles read larger in both the overview zone and the standalone Self Garden page
- ensured the Self Garden base and Self tiles scale together with the same relative proportion in both views

### 1.4 Self tile system remains spatial

Implemented:

- `InsightTile` keeps explicit `x` and `y` coordinates
- sample self tiles keep coordinate-based placement
- newly created self tiles continue to use the simple coordinate expansion rule
- non-self zones remain unchanged in their existing path-based layout behavior

## 2. Files Added Or Modified

### Added

- `app/garden/page.tsx`
- `app/garden/self/page.tsx`
- `components/garden/GardenStateProvider.tsx`
- `components/garden/SelfGardenCanvas.tsx`
- `components/garden/SelfGardenShowcasePage.tsx`
- `components/garden/SelfZone.tsx`
- `components/garden/TileLayer.tsx`
- `docs/MVP-v5-changelog.md`

### Modified

- `app/layout.tsx`
- `components/garden/GardenPage.tsx`
- `components/garden/GardenZone.tsx`
- `components/garden/PathTile.tsx`
- `lib/data/sampleTiles.ts`
- `lib/types/garden.ts`

### Removed

- `components/garden/GardenWorld.tsx`

## 3. What Is Still Not Implemented

Not implemented by design:

- advanced self-path generation beyond the simple coordinate expansion
- standalone pages for emotion, relationship, or direction
- backend, persistence, or API work
- redesign of the overall garden UI

## 4. Match Against The Intended Behavior

Status: Matches the clarified interaction direction for this round.

Matched:

- the Self zone no longer zooms in place
- the Self zone now opens a standalone page instead
- both `/garden` and `/garden/self` reach the standalone Self Garden flow
- the standalone page is focused on displaying the Self Garden
- the Self Garden keeps the existing PNG-based visuals
- the Self tiles keep spatial placement and now scale proportionally with the Self Garden presentation
- other zones keep their existing behavior

## 5. Verification Status

Completed:

- `npm run lint`
- `npm run build`
- `rg -n "[\\p{Han}]" .`

Results:

- lint passed
- production build passed
- no Han characters were found in repository files
