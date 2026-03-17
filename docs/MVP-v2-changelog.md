# Self-Light — MVP Spec v2 Implementation Record

> Based on: MVP Spec v2
> Status: In progress
> Reviewed on: 2026-03-17
> Scope captured in this record: Fountain input flow, modal integration, and current V2 progress state
> Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + Framer Motion

---

## 1. Current V2 Goal

V2 is intended to turn the static V1 garden into a functional product loop:

Reflection -> AI Insight -> Review -> Place -> Garden Growth

At the time of this record, only the first implementation slice has been completed:

- Click fountain
- Open input modal
- Enter a thought
- Submit the thought into local UI state

The downstream V2 steps are not yet implemented.

---

## 2. What Has Been Implemented So Far

### 2.1 Fountain input modal

A new `FountainInputModal` component has been added.

Location:

- `components/garden/FountainInputModal.tsx`

Implemented behavior:

- Opens as a centered overlay
- Uses a multi-line textarea
- Uses the required placeholder: `"What has been on your mind lately?"`
- Provides a primary submit button: `"Shape my thought"`
- Disables submit when the input is empty after trimming
- Supports Enter to submit
- Supports Shift+Enter for a new line
- Supports Escape to close
- Supports backdrop click to close
- Applies focus to the textarea on open
- Locks page scrolling while the modal is open

This component is visually aligned with the existing garden style rather than introducing a new product shell.

### 2.2 Fountain click integration

The central fountain is now interactive.

Location:

- `components/garden/CentralFountain.tsx`

Implemented behavior:

- Accepts an `onOpen` callback from the parent
- Stops event propagation so garden deselection does not interfere with the click
- Opens the fountain input flow when clicked

### 2.3 Garden page state integration

The garden page now owns the first layer of V2 flow state.

Location:

- `components/garden/GardenPage.tsx`

Implemented state:

- `inputOpen`
- `draftInput`

Implemented behavior:

- Opens the modal from the fountain
- Clears tile selection before opening the modal
- Passes the current draft value into the modal
- Updates the draft as the user types
- Stores the submitted draft in local React state
- Closes the modal after submit

### 2.4 Data ownership preparation

`GardenPage` now also instantiates `insights` and `tiles` from local state rather than reading directly from static imports in render flow.

This is an important preparation step for the next V2 slices because it creates the parent state layer that will later receive:

- generated insights
- dynamically placed tiles
- review/confirm/discard transitions

At this stage, the `insights` and `tiles` arrays are still effectively static because no mutation flow has been implemented yet.

---

## 3. Current Runtime Behavior

The current user experience is:

1. User enters the garden
2. User clicks the central fountain
3. The fountain input modal opens
4. User types a thought
5. User submits
6. The modal closes
7. The submitted text remains stored in `draftInput`

Important limitation:

The submitted thought does not yet trigger any insight generation, review card, tile creation, tile placement, or persistence.

In other words, the current submit action captures input into local UI state only.

---

## 4. What Is Not Yet Implemented

The following MVP Spec v2 requirements remain unfinished:

- `generateInsightMock(input: string): Promise<Insight>`
- Submitting/loading/error state for mock generation
- `draftInsight` state
- `reviewOpen` state
- `InsightReviewModal`
- Edit flow from review back to input
- Discard flow
- Confirm and place flow
- Dynamic `insights` insertion
- Dynamic `tiles` insertion
- Zone-based tile placement logic
- Tile appearance update after placement

No real API, backend, database, or authentication has been added.

---

## 5. Files Added or Changed in This V2 Slice

### Added

- `components/garden/FountainInputModal.tsx`
- `docs/MVP-v2-implementation-record.md`

### Modified

- `components/garden/CentralFountain.tsx`
- `components/garden/GardenPage.tsx`

No other product logic files were changed in this slice.

---

## 6. Acceptance Status Against MVP Spec v2

| Requirement | Status | Notes |
| --- | --- | --- |
| Click fountain to start flow | Implemented | Fountain now opens modal |
| Show input modal with textarea | Implemented | Modal is centered overlay |
| Placeholder text matches spec | Implemented | Exact required placeholder used |
| Submit button matches spec | Implemented | Exact required label used |
| Empty input disabled | Implemented | Trim-aware disable state |
| Enter submits | Implemented | Shift+Enter inserts newline |
| Mock insight generation | Not implemented | No `generateInsightMock` yet |
| Insight review card | Not implemented | No review modal yet |
| Edit / Discard / Place actions | Not implemented | No downstream transitions yet |
| Create new insight object | Not implemented | Submit stores only `draftInput` |
| Create new path tile | Not implemented | `tiles` are unchanged |
| Insert tile into garden | Not implemented | Garden remains sample-data driven |

---

## 7. Verification

The current implementation passes:

- `npm run lint`
- `npm run build`

This confirms that the first V2 slice is integrated cleanly into the existing app.

---

## 8. Recommended Next Implementation Step

The next correct step is not more input UI polish.

The next correct step is to complete the second V2 slice:

1. Add `generateInsightMock`
2. Add `draftInsight`
3. Add `InsightReviewModal`
4. Route submit -> mock generation -> review

Only after that should tile placement logic be added.
