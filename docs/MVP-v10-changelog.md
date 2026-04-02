# Self-Light — MVP v10 Changelog

> Based on: `MVP-specv10.md`
> Reviewed on: 2026-04-01
> Scope: Path Debug Mode, unified predefined point placement, smarter deterministic mock AI, and verification
> Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + Framer Motion

## 1. What Was Implemented

### 1.1 Path Debug Mode

Implemented:

- added `DEBUG_PATH_MODE` in `lib/config/debug.ts` as the single switch for all debug visuals
- added explicit predefined point arrays for Self, Relationship, and Direction, and normalized Emotion onto the same point-based structure
- added a shared `PathDebugOverlay` that renders all predefined points for the active zone canvas
- rendered point markers with used versus unused styling, index labels, and hover scale feedback
- added debug click logging for both point clicks and canvas clicks using zone-relative coordinates

### 1.2 Unified point-based placement

Implemented:

- added a shared zone point registry in `lib/garden/zonePoints.ts`
- updated Self, Relationship, and Direction tile layers to place tiles from predefined point arrays instead of scattered local formulas
- updated new tile creation in `GardenPage` to use the same point source of truth
- preserved overflow placement by extending from the last predefined point with a zone-specific offset
- updated Emotion overflow handling so tiles beyond the predefined stone path continue rendering instead of disappearing

### 1.3 Debug-mode interaction containment

Implemented:

- disabled overview zone route navigation while debug mode is enabled so path calibration clicks do not trigger page changes
- disabled tile pointer interaction while debug mode is enabled so the overlay can own debug clicks consistently
- kept standalone garden routes intact for direct access

### 1.4 Smarter deterministic mock AI

Implemented:

- replaced the previous broad regex classification with grouped keyword scoring by zone
- made classification deterministic with explicit tie behavior and `self` fallback
- replaced lightly cleaned transcript output with rule-based reflection sentences
- kept output to one sentence only
- kept artificial delay in the 800–1200ms range by deriving the delay deterministically from the input text

## 2. Files Added Or Modified

### Added

- `components/debug/PathDebugOverlay.tsx`
- `docs/MVP-v10-changelog.md`
- `lib/config/debug.ts`
- `lib/garden/directionPoints.ts`
- `lib/garden/relationshipPoints.ts`
- `lib/garden/selfPoints.ts`
- `lib/garden/zonePoints.ts`

### Modified

- `components/garden/DirectionGardenCanvas.tsx`
- `components/garden/DirectionTileLayer.tsx`
- `components/garden/DirectionZone.tsx`
- `components/garden/EmotionGardenCanvas.tsx`
- `components/garden/EmotionZone.tsx`
- `components/garden/GardenPage.tsx`
- `components/garden/GardenZone.tsx`
- `components/garden/PathTile.tsx`
- `components/garden/RelationshipGardenCanvas.tsx`
- `components/garden/RelationshipTileLayer.tsx`
- `components/garden/RelationshipZone.tsx`
- `components/garden/SelfGardenCanvas.tsx`
- `components/garden/SelfZone.tsx`
- `components/garden/TileLayer.tsx`
- `lib/data/emotionGardenAssets.ts`
- `lib/garden/emotionRiverStonePath.ts`
- `lib/mock/generateInsightMock.ts`
- `lib/types/garden.ts`

## 3. What Is Still Not Implemented

Not implemented by design:

- real AI or external API integration
- persistence or backend storage
- layout redesign
- new animation systems
- sub-gardens, zoom, or new product surfaces

Not completed in this round:

- automated browser clicking to capture and assert `console.log` output was not added; debug logging was verified by implementation review and live rendered overlay presence instead

## 4. Match Against The Spec

Status: Matches the v10 scope with one debug-only interaction tradeoff.

Matched:

- all four zones now have explicit predefined path points available to the rendering system
- debug mode is controlled by a single boolean flag
- all predefined points render when debug mode is enabled
- used and unused points are visually distinct
- index labels render next to points
- point clicks and canvas clicks are wired to log coordinates
- placement remains index-based with overflow continuation
- smarter mock AI is deterministic, rule-based, one-sentence, and has stable fallback behavior
- no Chinese characters were introduced into code or markdown files

Debug-only tradeoff:

- while `DEBUG_PATH_MODE` is enabled, overview zone navigation and tile interaction are intentionally suppressed so calibration clicks stay reliable

## 5. Verification Status

Completed:

- `npm run lint`
- `npm run build`
- `rg -n "[\\p{Han}]" app components lib docs public --glob '!package-lock.json'`
- local route verification for `/`
- local route verification for `/garden/self`
- local route verification for `/garden/emotion`
- local route verification for `/garden/relationship`
- local route verification for `/garden/direction`
- local headless Chrome screenshot review for overview and all standalone garden routes
- hydrated DOM inspection confirming debug overlay markup is present in the rendered client output

Results:

- lint passed
- build passed
- no Han characters were found in `app`, `components`, `lib`, `docs`, or `public`
- all reviewed routes returned `200` from the local production server on port `3001`
- screenshot review confirmed point markers and index labels render on the overview and standalone pages for all four zones
- screenshot review confirmed the overlay follows the existing zone path geometry without changing the underlying garden layouts
- implementation review confirmed debug logging is present for both point clicks and canvas clicks
- implementation review confirmed the mock AI now uses deterministic keyword scoring and deterministic delay selection

## 6. Blocked Or Partial Items

Partial:

- console logging behavior was verified through code review rather than a scripted browser click harness

## 7. Final Implementation Notes

- the debug point system now gives every zone one placement source of truth instead of mixing stored coordinates, vectors, and ad hoc slot helpers
- Emotion path overflow no longer truncates extra tiles after the predefined path length
- the new mock AI is still intentionally simple, but it now reads like a rule-based reflection engine instead of a lightly cleaned raw input transformer
