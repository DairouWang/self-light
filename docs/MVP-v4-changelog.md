# Self-Light — MVP Spec v4 Change Report

> Based on: `MVP-specv4.md`
> Status: Implemented as a scoped Self-zone UI update
> Reviewed on: 2026-03-18
> Scope: Self Garden visual treatment inside the existing garden layout, transparent asset handling, shape-preserving base rendering, English-only audit
> Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + Framer Motion

---

## 1. Summary

The v4 work was applied only to the Self section of the existing garden screen.

The overall layout, fountain flow, zone structure, and non-self zones remain in place. The change is limited to the Self zone visual treatment:

- base-shaped Self Garden art
- transparent-background asset handling
- self-specific tile styling
- ordered plank placement for the Self zone path

---

## 2. What Changed

### 2.1 Existing page layout was preserved

Location:

- `components/garden/GardenPage.tsx`

Implemented:

- restored the original page structure
- kept the existing fountain, modal, detail panel, and four-zone composition
- avoided changing non-self zone behavior

### 2.2 Self zone now uses layered art assets

Location:

- `components/garden/GardenZone.tsx`
- `components/garden/SelfGardenLayeredScene.tsx`
- `lib/data/selfGardenLayers.ts`

Implemented:

- only the Self zone renders the v4 extracted base artwork
- the current render intentionally excludes decorative tree overlays
- existing non-self zone decoration rendering is unchanged

### 2.3 Self tiles now use the provided wood-tile art

Location:

- `components/garden/PathTile.tsx`
- `components/garden/GardenZone.tsx`
- `lib/data/selfGardenLayers.ts`

Implemented:

- only self-zone tiles use the provided wood-tile asset
- self-zone tiles now place in a fixed ordered sequence to form a visible path
- newly added self tiles continue along that path instead of overlapping the first few positions
- other zone tiles keep their prior visual treatment
- hover, select, and tooltip behavior remain intact

### 2.4 Asset background is now treated as transparent

Location:

- `lib/assets/self-garden/base-transparent.png`
- `lib/assets/self-garden/wood-tile-transparent.png`

Implemented:

- generated transparent-background versions of the provided self-garden assets
- removed the visible dark matte from the self visuals
- used the transparent variants in the Self zone UI

### 2.5 Shape handling note for future passes

Location:

- `components/garden/GardenZone.tsx`
- `components/garden/SelfGardenLayeredScene.tsx`

Implemented:

- removed the polygon treatment for the Self zone
- let the extracted base image define the visible garden shape

Result:

- the Self garden now reads as the original asset silhouette instead of a clipped panel

### 2.6 Asset-processing notes for future use

Recorded lessons:

- edge-connected gray matte removal worked better than the earlier loose threshold pass
- the extraction should be applied to the source art before styling tweaks
- when the supplied base image already defines the garden silhouette, avoid adding a separate polygon container
- for future iterations, providing assets with real transparency from the start is preferred over reconstructing transparency in code or preprocessing
- if transparent assets are provided next time, the extraction step can be skipped entirely and the renderer can use them directly

### 2.7 English-only sweep completed

Location:

- whole repository scan with `rg -n "[\\p{Han}]" .`

Implemented:

- scanned the codebase for Han characters
- verified no Mandarin characters are present in source files

---

## 3. Files Added or Changed

### Added

- `components/garden/SelfGardenLayeredScene.tsx`
- `lib/data/selfGardenLayers.ts`
- `docs/MVP-v4-changelog.md`
- `lib/assets/self-garden/base-transparent.png`
- `lib/assets/self-garden/wood-tile-transparent.png`

### Modified

- `components/garden/GardenPage.tsx`
- `components/garden/GardenZone.tsx`
- `components/garden/PathTile.tsx`

---

## 4. Verification

Verified on 2026-03-18 with:

- `npm run lint`
- `npm run build`
- `rg -n "[\\p{Han}]" .`

Both commands completed successfully.
