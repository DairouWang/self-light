# Self-Light — MVP Spec v3 Change Report

> Based on: `MVP -specv3.md`
> Status: Implemented
> Reviewed on: 2026-03-17
> Scope: Simplified insight loop, single-tile data model, mock polish/classify flow, linear zone placement
> Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + Framer Motion

---

## 1. Summary

MVP Spec v3 has been implemented as a simplification pass over the earlier V1/V2 garden.

The product loop now matches the v3 intent:

Input -> Polish -> Confirm -> Place -> Garden

The main change is structural:

- the app now uses a single `InsightTile` model
- mock AI does only two things: polish the thought and classify the zone
- review is a minimal confirmation step
- placing a tile appends it directly into the garden

This removes the heavier V1 data structure and the unfinished V2 split between `insights` and `tiles`.

---

## 2. What Changed

### 2.1 Data model simplified to v3

Location:

- `lib/types/garden.ts`
- `lib/data/sampleTiles.ts`

Implemented:

- replaced the older multi-field `Insight` model with:

```ts
type InsightTile = {
  id: string;
  content: string;
  zone: GardenZone;
  createdAt: string;
  rawInput?: string;
};
```

- removed the separate stored `PathTile` entity from runtime state
- converted sample garden content into `InsightTile[]`
- tile material is now derived from zone config instead of stored per tile

Result:

- runtime state matches the v3 spec more closely
- the garden is simpler to reason about

### 2.2 Mock AI added with only 2 responsibilities

Location:

- `lib/mock/generateInsightMock.ts`

Implemented:

- waits `800-1200ms`
- polishes raw input into one sentence
- classifies the sentence into one zone:
  - `self`
  - `emotion`
  - `relationship`
  - `direction`

Not implemented:

- no backend
- no real AI
- no persistence

### 2.3 Input modal updated to match v3 copy and flow

Location:

- `components/garden/FountainInputModal.tsx`

Implemented:

- placeholder updated to: `"What did you just realize?"`
- primary button updated to: `"Refine it"`
- loading label updated to: `"Refining..."`
- submit remains trim-aware
- Enter submits
- Shift+Enter inserts newline
- closing is blocked while mock refinement is running

### 2.4 Review step implemented

Location:

- `components/garden/InsightReviewModal.tsx`
- `components/garden/GardenPage.tsx`

Implemented:

- after submit, mock polish/classify runs
- result opens a minimal review card showing:
  - polished sentence
  - zone
- actions:
  - `Edit`
  - `Discard`
  - `Place in Garden`

Behavior:

- `Edit` reopens the input modal with the draft preserved
- `Discard` clears the draft flow
- `Place in Garden` creates a new `InsightTile` and inserts it into state

### 2.5 Linear placement implemented

Location:

- `components/garden/GardenZone.tsx`

Implemented:

- tiles now place linearly within each zone
- placement uses the tile's index within its zone
- each new confirmed tile extends the existing zone path outward

This is the v3 simplification of placement logic and removes the earlier multi-axis stored coordinates from app state.

### 2.6 Tile display rules updated

Location:

- `components/garden/PathTile.tsx`
- `components/garden/InsightDetailPanel.tsx`
- `components/garden/GardenPage.tsx`

Implemented:

- default tile view shows material only
- hover shows:
  - content, clamped to two lines
  - small date
- click/select opens detail panel showing:
  - content
  - zone
  - created date
  - raw input when present

This matches the v3 three-level display intent more closely than the older V1 detail structure.

---

## 3. Files Added or Changed

### Added

- `components/garden/InsightDetailPanel.tsx`
- `components/garden/InsightReviewModal.tsx`
- `lib/mock/generateInsightMock.ts`
- `docs/MVP-v3-change-report.md`

### Modified

- `components/garden/CentralFountain.tsx`
- `components/garden/FountainInputModal.tsx`
- `components/garden/GardenPage.tsx`
- `components/garden/GardenZone.tsx`
- `components/garden/PathTile.tsx`
- `lib/data/sampleTiles.ts`
- `lib/types/garden.ts`

---

## 4. Acceptance Status Against Spec v3

| Requirement | Status | Notes |
| --- | --- | --- |
| User sees existing garden first | Implemented | Existing garden still loads with sample tiles |
| Click fountain | Implemented | Opens input modal |
| Textarea placeholder matches spec | Implemented | Exact v3 placeholder used |
| Primary button matches spec | Implemented | Exact v3 label used |
| Show loading for mock AI | Implemented | `800-1200ms` delay |
| Mock AI polishes into one realization | Implemented | Single-sentence output |
| Mock AI classifies into one zone | Implemented | One zone returned per draft |
| Review step exists | Implemented | Minimal review modal |
| Edit / Discard / Place actions exist | Implemented | Full flow wired |
| Confirm creates `InsightTile` | Implemented | Single-model state |
| Confirm inserts tile into garden | Implemented | Appends into zone path |
| Default tile shows no text | Implemented | Material-only surface |
| Hover shows content + date | Implemented | Two-line clamp + date |
| Detail shows content + zone + date + raw input | Implemented | Raw input shown when available |
| No backend / no real AI | Implemented | Local mock only |

---

## 5. State Shape Now Used

`GardenPage` now owns the v3-style local state:

```ts
const [tiles, setTiles] = useState<InsightTile[]>([]);
const [inputOpen, setInputOpen] = useState(false);
const [reviewOpen, setReviewOpen] = useState(false);
const [draftInput, setDraftInput] = useState("");
const [draftOutput, setDraftOutput] = useState<{
  content: string;
  zone: GardenZone;
} | null>(null);
```

The shipped implementation also includes:

- `selectedTileId`
- `isRefining`
- `errorMessage`

These are UI-state additions, not feature expansion.

---

## 6. Verification

Verified on 2026-03-17 with:

- `npm run lint`
- `npm run build`

Both commands completed successfully.

---

## 7. Final Assessment

The v3 implementation is complete for the intended MVP scope.

It now follows the product direction more closely than V1/V2:

- less structure
- less cognitive load
- one clear realization per tile
- no dead-end flow between input and placement

The result is still visually rich, but the product logic is now meaningfully simpler.
