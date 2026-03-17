# Self-Light — MVP Spec v1 Implementation Record

> Based on: MVP Product Spec v1
> Scope: Garden Page — static frontend only (no API, no AI, no backend)
> Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + shadcn/ui

---

## 1. What Was Implemented

The Garden Page — the main visual surface of Self-Light.

Users can see a top-view thought garden with four zones, a central fountain, sample path tiles, and interact via hover/click to explore insights.

---

## 2. Garden Layout

Top-view cross layout with the fountain at the center.

```
              [ Self Growth ]
                    |
[ Emotion ] — [ Fountain ] — [ Direction ]
                    |
             [ Relationship ]
```

| Zone         | Position | Path Material | Tile Count |
| ------------ | -------- | ------------- | ---------- |
| Self Growth  | top      | wooden planks | 3          |
| Emotion      | left     | river stones  | 2          |
| Direction    | right    | stone bricks  | 2          |
| Relationship | bottom   | flower bricks | 3          |

Each zone extends outward from the fountain. Oldest tiles sit closest to the fountain.

---

## 3. Core Data Entities

Defined in `lib/types/garden.ts`:

```ts
type GardenZone = "self" | "emotion" | "relationship" | "direction";

type PathMaterial = "wood" | "river-stone" | "flower-brick" | "stone-brick";

type Insight = {
  id: string;
  rawInput: string;
  scene: string;
  emotion: string;
  insight: string;
  action: string;
  zone: GardenZone;
  createdAt: string;
};

type PathTile = {
  id: string;
  insightId: string;
  zone: GardenZone;
  x: number;
  y: number;
  material: PathMaterial;
};
```

Zone configuration constant `ZONE_CONFIG` maps each zone to its label, material, and layout direction.

---

## 4. Sample Data

Defined in `lib/data/sampleTiles.ts`:

- 10 sample insights covering all four zones
- 10 corresponding path tiles with zone-correct materials
- All data is static — no localStorage or API

---

## 5. UI Components

### 5.1 GardenPage

`components/garden/GardenPage.tsx`

Main page component. Contains:

- Grass background (layered radial gradients)
- Vignette overlay for depth
- Decorative elements (CSS-drawn trees, bushes, flowers, rocks)
- Title overlay ("SELF-LIGHT / YOUR THOUGHT GARDEN")
- Cross layout assembling four zones + fountain
- Insight detail panel (slide-up on tile click)
- State management: `selectedTileId`

### 5.2 CentralFountain

`components/garden/CentralFountain.tsx`

- 110px circular element with radial gradient water surface
- 3 animated ripple rings (staggered CSS keyframes)
- Pulsing center light
- 4 animated sparkle particles
- Label: "INSPIRATION FOUNTAIN"

### 5.3 GardenZone

`components/garden/GardenZone.tsx`

- Container for one zone's tile path
- Configurable direction: vertical (Self/Relationship) or horizontal (Emotion/Direction)
- Handles tile ordering — label at outer end, tiles extending toward fountain
- Zone label: frosted glass pill

### 5.4 PathTile

`components/garden/PathTile.tsx`

Each tile has material-specific visuals:

| Material     | Visual Style                                       |
| ------------ | -------------------------------------------------- |
| wood         | Warm brown, horizontal grain lines, rounded rect   |
| river-stone  | Blue-gray, organic rounded shape (42%/48% radius)  |
| flower-brick | Terracotta/coral, radial highlight spots           |
| stone-brick  | Gray, diagonal crack pattern                        |

Interactions:

- **Hover**: scale 1.15×, glow shadow, tooltip with insight text + zone name
- **Click**: outline highlight, opens detail panel

### 5.5 InsightDetailPanel

Embedded in `GardenPage.tsx`. Slide-up panel showing:

- Scene
- Emotion
- **Insight** (highlighted in amber)
- Action
- Created date

Backdrop blur overlay. Close via × button or backdrop click.

---

## 6. Animations

Defined as `@keyframes` in `app/globals.css`:

| Animation        | Duration | Used By              |
| ---------------- | -------- | -------------------- |
| fountain-ripple  | 3.5s     | Fountain ripple rings |
| fountain-pulse   | 2.5s     | Fountain center light |
| sparkle          | 2.4s     | Fountain sparkles     |
| tooltip-enter    | 0.2s     | Tile hover tooltip    |
| panel-slide-up   | 0.35s    | Detail panel          |

Tile hover uses inline CSS transition: `0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`.

---

## 7. Files Changed

### Created

| File                                  | Purpose                          |
| ------------------------------------- | -------------------------------- |
| `lib/types/garden.ts`                 | Type definitions + zone config   |
| `lib/data/sampleTiles.ts`            | 10 sample insights + 10 tiles   |
| `components/garden/PathTile.tsx`      | Path tile with material styles   |
| `components/garden/CentralFountain.tsx` | Animated fountain              |
| `components/garden/GardenZone.tsx`    | Zone container with direction    |
| `components/garden/GardenPage.tsx`    | Main garden page                 |
| `docs/MVP-v1-changelog.md`           | This file                        |

### Modified

| File              | Change                                    |
| ----------------- | ----------------------------------------- |
| `app/page.tsx`    | Replaced template with `<GardenPage />`   |
| `app/layout.tsx`  | Updated title and description metadata    |
| `app/globals.css` | Added 5 keyframe animations               |

### Deleted

15 duplicate macOS copy files (`* 2.*`) across root, `app/`, and `public/`.

---

## 8. Spec v1 Acceptance — Status

| Criteria                       | Status |
| ------------------------------ | ------ |
| Enter the garden               | ✅      |
| See four zones                 | ✅      |
| See different path materials   | ✅      |
| Hover tile → summary           | ✅      |
| Click tile → detail            | ✅      |
| Central fountain visible       | ✅      |
| Click fountain → input overlay | ❌ (not in scope) |
| AI generates insight           | ❌ (not in scope) |
| Confirm insight → place tile   | ❌ (not in scope) |

---

## 9. Not Implemented (deferred)

Per user requirement — no API, no AI, no backend:

- Fountain Input Overlay (click fountain → textarea)
- AI insight generation
- Insight Review Card (edit / discard / place)
- localStorage persistence
- Dynamic tile placement
