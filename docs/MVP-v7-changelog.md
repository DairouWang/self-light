# Self-Light — MVP v7 Changelog

> Based on: `MVP-specv7.md`
> Reviewed on: 2026-03-31
> Scope: Relationship Garden single-material correction, bottom-right anchored flower-brick tiles, shared standalone route, and verification
> Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + Framer Motion

## 1. What Was Implemented

### 1.1 Relationship Garden asset wiring

Implemented:

- added a dedicated Relationship asset module for `base-transparent.png` and `flower-brick.png`
- kept the decorative base and interactive tile asset separate inside the same shared canvas
- preserved the single required Relationship material with no variant generation, no random selection, and no per-tile styling differences
- used the provided cut-out Relationship asset directly with no automated background-removal step in the app implementation

### 1.2 Reusable Relationship canvas

Implemented:

- added `RelationshipGardenCanvas` to compose the decorative base and tile layer in one relative container
- added `RelationshipTileLayer` so Relationship tiles render in the same coordinate space as the base art
- kept the tile layer absolute over the base art to prevent transform mismatch between the decorative layer and the interactive layer
- increased the shared Relationship canvas art scale so the base reads larger inside the available frame

### 1.3 Relationship tile rendering rule

Implemented:

- updated `PathTile` so Relationship tiles use only `flower-brick.png`
- Relationship tile wrappers now fill their positioned slot while the image itself is rendered as a separate visual layer
- the flower brick image is anchored with `absolute bottom-0 right-0`
- the image preserves its aspect ratio and is scaled with a controlled width instead of stretched to fill the wrapper
- hover and selection behavior remain intact without adding any random visual variation
- reduced the Relationship tile slot and image width so the bricks sit smaller against the enlarged base

### 1.4 Deterministic Relationship placement

Implemented:

- Relationship tiles now follow a fixed ordered path based on the existing Relationship zone path origin and vector
- tile order remains append-only because placement uses the current zone tile order without randomization
- existing Relationship sample tiles now remain stable in both overview and standalone views
- the current Relationship path now starts from the lower-left area of the base and steps upward-right with tighter spacing between bricks

### 1.5 Overview and standalone route support

Implemented:

- clicking the Relationship zone from the main overview now routes to `/garden/relationship`
- added a dedicated standalone Relationship Garden page
- reused the shared garden state provider so Relationship tiles remain consistent across the overview and standalone route in the same session

## 2. Files Added Or Modified

### Added

- `app/garden/relationship/page.tsx`
- `components/garden/RelationshipGardenCanvas.tsx`
- `components/garden/RelationshipGardenShowcasePage.tsx`
- `components/garden/RelationshipTileLayer.tsx`
- `components/garden/RelationshipZone.tsx`
- `docs/MVP-v7-changelog.md`
- `lib/data/relationshipGardenAssets.ts`

### Modified

- `components/garden/GardenZone.tsx`
- `components/garden/PathTile.tsx`
- `lib/assets/relationship-garden/flower-brick.png`

### Existing assets used in this round

- `lib/assets/relationship-garden/base-transparent.png`
- `lib/assets/relationship-garden/flower-brick.png`

## 3. What Is Still Not Implemented

Not implemented by design:

- backend or persistence for garden tiles
- standalone page support for the Direction zone
- any redesign outside the v7 Relationship Garden scope
- any Relationship tile variation system, because v7 explicitly forbids it

## 4. Match Against The Spec

Status: Matches the v7 Relationship Garden scope.

Matched:

- Relationship Garden uses only one `flower-brick.png`
- no random rotation, scaling, flipping, offset, or asset variation was added
- Relationship tiles render with a strict bottom-right anchor
- the Relationship image keeps its aspect ratio and is not stretched with `width: 100%; height: 100%`
- the decorative base and tile layer share one parent coordinate space
- Relationship tile placement remains deterministic and append-only
- `/garden/relationship` is implemented
- the Relationship overview zone routes to the standalone page
- no Chinese characters were introduced into code or markdown files

## 5. Verification Status

Completed:

- `npm run lint`
- `rg -n "[\\p{Han}]" app components lib docs --glob '!package-lock.json'`
- live route request verification through local dev server logs for `/garden/relationship`
- headless Chrome screenshot review of `/garden/relationship`
- manual code review of the Relationship routing and tile-layer alignment

Results:

- lint passed
- no Han characters were found in `app`, `components`, `lib`, or `docs`
- the standalone Relationship route rendered successfully and returned `200` in local dev-server logs
- the updated Relationship asset is already transparent and now renders directly as the tile visual with no additional cutout processing
- the final rendered Relationship page visually matches the intended layered-canvas structure and fixed diagonal tile path for the current sample tiles
- the latest proportion pass makes the base read larger and the flower bricks read smaller in the live route render
- the latest placement pass starts the brick path from the base's lower-left side and brings the three current bricks closer together

Blocked or partial:

- `npm run build` consistently reaches successful compilation and the TypeScript phase, but the process does not exit cleanly in this environment, so I could not record a clean completed build result
- live click automation inside Safari was blocked because `Allow JavaScript from Apple Events` is disabled locally, so overview navigation was verified by implementation review and route rendering rather than scripted browser clicks

Current implementation note:

- no automatic background-removal code was found in the current application source
- the updated Relationship asset was supplied as `flower-block.png` and was renamed to `flower-brick.png` so the implementation matches the v7 spec filename while still using your provided image directly
