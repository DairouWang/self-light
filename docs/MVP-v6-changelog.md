# Self-Light — MVP v6 Changelog

> Based on: `MVP-specv6.md`
> Reviewed on: 2026-03-19
> Scope: Emotion Garden asset normalization, reusable layered canvas, fixed river-stone placement, and standalone route support
> Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + Framer Motion

## 1. What Was Implemented

### 1.1 Emotion asset normalization

Implemented:

- added a dedicated Emotion asset mapping module for the existing `base.png`, `stone1.png`, `stone2.png`, and `stone3.png` files
- kept the decorative Emotion base separate from the interactive tile assets
- normalized Emotion asset usage through local constants instead of hardcoding raw filenames throughout components
- preserved proportional scaling by using the shared Emotion source image aspect ratio for both the base and tile overlays
- generated saved transparent Emotion asset variants following the same asset pattern used by v5 Self Garden

### 1.2 Reusable Emotion Garden canvas

Implemented:

- added a reusable Emotion layered scene component for decorative base rendering only
- added a dedicated Emotion tile layer for interactive Emotion tiles
- added a shared `EmotionGardenCanvas` component that composes decorative base and tile rendering in one reusable surface
- kept the Emotion tile layer independent from the base art so interaction logic does not live in the decorative layer

### 1.3 Emotion tile material system

Implemented:

- Emotion tiles now use the processed stone PNG assets instead of the generic river-stone gradient tile surface
- stone selection is deterministic by ordered placement slot and cycles through `stone1`, `stone2`, and `stone3`
- Emotion tile placement now uses a fixed ordered 18-point blue-point sequence provided by the user
- the first three visible Emotion stones now map to the first three points in that sequence
- future Emotion stones append strictly to the next point in sequence without moving existing stones
- Emotion stones now keep their asset-default orientation while the visible tile frame remains horizontal
- added a third sample Emotion tile so the default Emotion Garden now shows three stones
- Emotion tile wrappers use a dedicated larger stone width so the stepping stones read more clearly inside the river

### 1.4 Overview and standalone Emotion route support

Implemented:

- clicking the Emotion zone from the main garden overview now opens `/garden/emotion`
- added a dedicated standalone Emotion Garden page with a back link to the main overview
- reused the shared garden state provider so Emotion tiles remain consistent between the overview and the standalone route during the same session
- kept Self Garden behavior unchanged and left Relationship and Direction zones on their existing implementation

## 2. Files Added Or Modified

### Added

- `app/garden/emotion/page.tsx`
- `components/garden/EmotionGardenCanvas.tsx`
- `components/garden/EmotionGardenLayeredScene.tsx`
- `components/garden/EmotionGardenShowcasePage.tsx`
- `components/garden/EmotionTileLayer.tsx`
- `components/garden/EmotionZone.tsx`
- `docs/MVP-v6-changelog.md`
- `docs/emotion-river-blue-points.png`
- `lib/data/emotionGardenAssets.ts`
- `lib/garden/emotionRiverStonePath.ts`
- `lib/assets/emotion-garden/base-transparent.png`
- `lib/assets/emotion-garden/river-stone-1.png`
- `lib/assets/emotion-garden/river-stone-2.png`
- `lib/assets/emotion-garden/river-stone-3.png`

### Modified

- `components/garden/GardenZone.tsx`
- `components/garden/PathTile.tsx`
- `lib/data/sampleTiles.ts`

### Removed

- `generate_river.js`
- `lib/data/emotionGardenRiver.ts`
- `lib/assets/.DS_Store`
- `lib/assets/emotion-garden/base.png`
- `lib/assets/emotion-garden/stone1.png`
- `lib/assets/emotion-garden/stone2.png`
- `lib/assets/emotion-garden/stone3.png`
- `lib/assets/garden-concepts/direction-garden.png`
- `lib/assets/garden-concepts/emotion-garden.png`
- `lib/assets/garden-concepts/fountian.png`
- `lib/assets/garden-concepts/relationship-garden.png`
- `lib/assets/garden-concepts/self-garden.png`

### Existing assets used in this round

- `lib/assets/emotion-garden/base-transparent.png`
- `lib/assets/emotion-garden/river-stone-1.png`
- `lib/assets/emotion-garden/river-stone-2.png`
- `lib/assets/emotion-garden/river-stone-3.png`

## 3. What Is Still Not Implemented

Not implemented by design:

- backend or persistence for garden tiles
- redesign of the main garden overview
- redesign of the Self Garden
- standalone pages for Relationship or Direction
- AI or insight-generation changes outside the existing mock flow

## 4. Match Against The Spec

Status: Matches the v6 structural scope.

Matched:

- Emotion assets are organized through a dedicated Emotion mapping layer
- the Emotion base renders as decorative-only art
- Emotion tiles use `stone1`, `stone2`, or `stone3`
- Emotion stone selection is deterministic and stable during the session
- Emotion stones grow along a predefined fixed blue-point sequence in placement order
- the Emotion Garden is available on a standalone page at `/garden/emotion`
- clicking the overview Emotion zone navigates to the standalone Emotion page
- Emotion river placements now follow a fixed ordered blue-point sequence from the user-provided guide image
- the current fixed ordered blue-point sequence was replaced with the latest user-provided 18-point coordinate list
- Emotion now renders from saved transparent asset variants instead of runtime background removal
- Self Garden behavior remains unchanged
- Relationship and Direction zones remain unchanged
- no Chinese characters were introduced into code or markdown files

## 5. Verification Status

Completed:

- `npm run lint`
- `npm run build`
- `rg -n "[\\p{Han}]" .`
- manual implementation review against the v5 canvas split pattern

Results:

- lint passed
- production build passed
- no Han characters were found in repository files
- unused Emotion spline files, generator scripts, source PNGs, concept PNGs, and `.DS_Store` files were removed from the working tree
- the Emotion implementation follows the same decorative-base plus separate tile-layer pattern used in v5 for the Self Garden
- saved transparent Emotion asset variants were generated and wired into the canvas so Emotion now matches the v5 transparent-asset pattern instead of relying on runtime keying
- `river-stone-2.png` and `river-stone-3.png` were re-cut and saved again to improve edge cleanliness
- `river-stone-1.png`, `river-stone-2.png`, and `river-stone-3.png` were later trimmed to their real alpha bounds so the visible stones align with the river slots instead of inheriting oversized transparent canvas padding
- Emotion tile placement now uses the fixed ordered blue points directly, so current and future stones append point-by-point without spline inference or path rebuilding
- each Emotion stone now maps one-to-one to a traced blue point without rotating the stone asset at render time
- Emotion stone wrappers now use each cropped PNG's real aspect ratio instead of a shared legacy box ratio, so the visible stones no longer shrink and drift inside oversized containers
- the Emotion decorative base layer and the Emotion tile layer now share the same enlarged artboard wrapper, eliminating the coordinate-space mismatch that caused river stones to drift off the visible water path
- Emotion stones are ordered by creation time before slot assignment, so new insights consistently unlock the next river placement
- Emotion stone slot width was reduced slightly so the stones sit more comfortably inside the traced river points
- the tile selection frame stays horizontal and the stone image also remains unrotated

Blocked:

- live browser screenshot capture was blocked by local screen-capture permissions
- Safari DOM inspection through Apple Events was blocked because Safari does not have `Allow JavaScript from Apple Events` enabled

Impact:

- structural verification is complete
- live rendered visual verification in-browser was attempted but remains partially blocked by local machine settings
