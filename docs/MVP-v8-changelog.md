# Self-Light — MVP v8 Changelog

> Based on: `MVP-specv8.md`
> Reviewed on: 2026-04-01
> Scope: Direction Garden standalone implementation, stone-brick path rendering, overview route integration, and verification
> Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + Framer Motion

## 1. What Was Implemented

### 1.1 Direction Garden asset wiring

Implemented:

- added a dedicated Direction asset module for `base-transparent.png` and `stone-brick.png`
- used the provided pre-cut Direction assets directly with no runtime cleanup, masking, or generated tile variants
- kept the decorative base and the interactive stone-brick image as separate layers inside the same shared canvas system

### 1.2 Direction standalone canvas and page

Implemented:

- added `DirectionGardenCanvas` so the decorative base and Direction tiles render in one shared relative container
- added `DirectionTileLayer` to position Direction tiles in the same coordinate space as the base art
- added `DirectionGardenShowcasePage` and the `/garden/direction` route
- tuned the canvas inset and standalone page framing so the Direction base reads clearly in the live page

### 1.3 Direction tile rendering rule

Implemented:

- updated `PathTile` so Direction tiles use only the provided `stone-brick.png`
- kept the tile wrapper separate from the tile image so the asset preserves its aspect ratio
- rendered the Direction tile image with controlled width rather than stretching it with `width: 100%; height: 100%`
- preserved existing hover, selection, and tooltip behavior for Direction tiles
- added no random rotation, flipping, scaling, or alternate asset selection

### 1.4 Deterministic append-only Direction path

Implemented:

- added a fixed ordered slot sequence for Direction Garden placement
- kept placement deterministic and append-only by mapping the current Direction tile order onto that fixed path
- tuned the path to run through the open sand area so the first tiles read as a guided route rather than disappearing into existing baked-in stone details
- added a fixed overflow step so future Direction tiles continue extending the route without reshuffling existing tiles

### 1.5 Overview integration

Implemented:

- added `DirectionZone` so the overview Direction zone now uses the dedicated Direction canvas instead of the generic fallback
- wired overview click-through from the Direction zone to `/garden/direction`
- kept overview and standalone Direction tiles consistent by reusing the shared garden state provider

## 2. Files Added Or Modified

### Added

- `app/garden/direction/page.tsx`
- `components/garden/DirectionGardenCanvas.tsx`
- `components/garden/DirectionGardenShowcasePage.tsx`
- `components/garden/DirectionTileLayer.tsx`
- `components/garden/DirectionZone.tsx`
- `docs/MVP-v8-changelog.md`
- `lib/data/directionGardenAssets.ts`

### Modified

- `components/garden/GardenZone.tsx`
- `components/garden/PathTile.tsx`

### Existing assets used in this round

- `lib/assets/direction-garden/base-transparent.png`
- `lib/assets/direction-garden/stone-brick.png`

## 3. What Is Still Not Implemented

Not implemented by design:

- backend or persistence for garden tiles
- AI logic changes or data model redesign
- new input or review flow changes
- overview map redesign outside the Direction zone integration
- multi-material Direction tile variation
- automated asset extraction, segmentation, or background removal

## 4. Match Against The Spec

Status: Matches the v8 Direction Garden scope.

Matched:

- a dedicated Direction asset module exists
- the Direction standalone page exists at `/garden/direction`
- the decorative base and tile layer share one parent coordinate space
- Direction uses only the provided `stone-brick.png`
- the stone-brick image keeps its aspect ratio and is not stretched to fill the slot
- Direction placement is deterministic and append-only
- the Direction overview zone routes to the standalone page
- overview and standalone reuse the same session state
- no Chinese characters were introduced into code or markdown files

## 5. Verification Status

Completed:

- `npm run lint`
- `rg -n "[\\p{Han}]" app components lib docs --glob '!package-lock.json'`
- local route verification for `/garden/direction`
- local visual review of the standalone Direction page
- manual code review of overview routing and tile-layer alignment

Results:

- lint passed
- no Han characters were found in `app`, `components`, `lib`, or `docs`
- `HEAD /garden/direction` returned `200` in the local unrestricted dev server on port `3001`
- the local dev server logs also recorded repeated `GET /garden/direction 200` responses during live page review
- the final live screenshot review showed the Direction base aligned with the tile layer and the first visible stone bricks reading as a structured route through the open sand area
- the Direction overview route integration was confirmed in code through `DirectionZone` pushing to `/garden/direction`
- the current sample data now renders three Direction stone bricks in a bottom-right-origin sequence

## 6. Blocked Or Partial Items

Partial:

- overview click-through was verified by implementation review rather than scripted browser-click automation
- `npm run build` was not part of the required v8 verification set and was not run in this round

## 7. Final Implementation Notes

- the provided Direction assets were used directly without renaming or generating alternates
- the final Direction path uses a fixed slot sequence instead of random offsets so the route stays stable across renders
- the current Direction sequence starts from the bottom-right of the base and progresses inward as an ordered three-stone route in the sample state
