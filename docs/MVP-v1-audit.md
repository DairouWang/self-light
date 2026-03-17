# Self-Light — MVP v1 Audit

> Audit basis: current implementation in this repo and the MVP v1 scope/acceptance criteria previously documented in the project docs.
> Reviewed on: 2026-03-16

## 1. Implementation Coverage

### Fully implemented

- The app opens directly into a distinctive garden surface with a strong visual identity.
- Four thematic zones are present and visually differentiated with unique materials, labels, and decoration systems.
- A central fountain exists as the visual anchor of the experience.
- Static sample insight data and static tile placement are implemented across all four zones.
- Hovering a tile reveals a short insight preview.
- Clicking a tile creates a persistent selected state until the user clicks elsewhere.
- The codebase currently passes `eslint` and a production `next build`.

### Partially implemented

- The "enter the garden" concept is implemented, but it is closer to a polished visual scene than a complete reflection workflow.
- The top-view cross layout is communicated, but the current composition reads more like four shaped quadrants around a center than a clear path system radiating from the fountain.
- "Click tile -> detail" is only partially implemented. The selected state reuses the hover tooltip and shows only `insight`, `rawInput`, and date. The richer detail experience is not present.
- The idea that older tiles sit closer to the fountain is represented in static coordinates, but this is manual, not a rule enforced by placement logic.
- Responsive behavior is present through scaling, but key UI elements are absolutely positioned and likely degrade on smaller screens.

### Missing

- Fountain input overlay or any capture flow for entering a new thought.
- AI generation or any substitute insight-generation step.
- Review flow for confirming, editing, discarding, or placing an insight.
- Dynamic tile placement logic.
- Persistence of any kind.
- Clear empty, loading, submitting, success, or error states.
- Any onboarding that explains what the four zones mean or how to use the product.
- Any evidence of analytics, experiment hooks, or behavioral instrumentation for learning from MVP usage.

## 2. Product Experience Evaluation

### Clarity of user flow

The current flow is visually legible but product-wise incomplete. A user can look around and inspect sample tiles, but they cannot perform the core action implied by the product story: turn a thought into a placed insight. The fountain reads as the primary CTA, but it does not advance the journey.

### Emotional experience

The visual direction is the strongest part of the MVP. It feels intentional, soft, and contemplative. The garden metaphor lands aesthetically. What is missing is the emotional arc. There is no moment of expression, reflection, refinement, or reward, so it feels more like a beautiful static diorama than a living "garden of thoughts."

### Cognitive load

Moderate.

- Users must infer what each zone means.
- Users must infer what clicking the fountain should do.
- It is unclear whether current tiles are examples or personal history.
- The product does not clearly define what success looks like.

The decorative richness helps mood, but without guidance it also competes with the functional layer.

### Intuitiveness

Partially intuitive. Users will understand that tiles are interactive and that the fountain is important. They are less likely to understand the overall system behavior, the purpose of each zone, or why the fountain does nothing.

## 3. UX / UI Issues

### Layout issues

- Zone labels are positioned outside the main garden canvas with absolute translated placement. On smaller viewports they are at risk of clipping because the page uses `overflow-hidden`.
- Tooltips use fixed directional placement by zone rather than viewport-aware placement, so they can overflow or feel cramped near edges.
- The composition is visually dense near the center. Decorative forms, zone surfaces, tiles, and fountain all compete in the same focal area.
- The layout scales as one artwork, which preserves composition but reduces legibility of labels and details on mobile.

### Interaction friction

- The fountain is the clearest CTA, but clicking it does nothing except stop propagation. This is the biggest product mismatch.
- Hover is doing too much of the discovery work. On touch devices, preview and selection become less clear.
- Clicking a selected tile does not open a richer detail state; it only pins the same lightweight tooltip.
- The only dismissal pattern is clicking elsewhere. There is no explicit progression model.

### Unclear states

- There is no distinction between demo/sample content and user-created content.
- There is no empty state explaining what happens before the first thought is added.
- There is no cue that the fountain is inactive in V1, so the product appears broken rather than intentionally scoped.
- Selected state is visually subtle relative to the amount of decoration on screen.

### Missing feedback

- No acknowledgement after fountain interaction.
- No onboarding cues for first use.
- No feedback for why a tile belongs to a specific zone.
- No transition from exploration to action because the action path is missing.

## 4. Technical Architecture Review

### Component structure

The visual split is sensible for V1:

- `GardenPage` owns scene composition and selection state.
- `GardenZone` handles zone rendering and tile positioning.
- `PathTile` owns tile visuals and preview behavior.
- `CentralFountain` isolates the fountain presentation.

This is clean enough for a static prototype, but not yet structured for a real product flow.

### State management

State management is minimal and appropriate only for a static demo. The app stores a single `selectedTileId` in `GardenPage`. There is no model for thoughts, generation status, draft insight review, persistence, or placement history.

### Scalability

Scalability is currently low.

- Tile placement depends on hard-coded percentages and vectors.
- Zone definitions mix domain meaning, layout geometry, and presentation styling in one config object.
- `GardenZone` resolves insights by repeatedly searching arrays during render.
- The architecture is optimized for one handcrafted scene, not for dynamic growth or alternative views.

### Coupling between UI and logic

Coupling is high.

- Zone semantics are embedded directly in visual config.
- Placement logic depends on presentational coordinates.
- Interaction behavior is encoded inside visual components.

This is efficient for a static MVP, but it will make V2 harder once creation, persistence, personalization, and multiple garden states are introduced.

## 5. Critical Issues (P0 / P1 / P2)

### P0: must fix before V2

- The primary product promise is not executable. Users cannot add a thought, generate an insight, review it, or place it.
- The fountain behaves like a CTA but has no outcome. This creates a broken-feeling first impression.
- Tile selection does not expose a richer insight detail state.
- The mobile and small-screen experience is likely fragile because key markers and overlays depend on absolute off-canvas placement.

### P1: important improvements

- Clarify whether the current tiles are sample content, history, or a user's personal reflections.
- Add first-run guidance that explains the four zones and the intended loop.
- Reduce dependence on hover for understanding core interactions.
- Separate view-layer config from domain and state logic before adding dynamic creation.
- Add accessibility work: focus behavior, reduced-motion support, and stronger selected-state affordances.

### P2: nice to have

- Improve the emotional ritual around reflection submission and placement.
- Add deeper narrative meaning to zone transitions and path growth over time.
- Introduce lightweight progress cues only if they support reflection rather than gamification.

## 6. V2 Recommendations

### Product improvement

- Implement the actual reflection loop: fountain input -> generated insight -> review/edit -> confirm placement.
- Make the first created tile the hero moment of the product.
- Distinguish clearly between sample/demo mode and personal garden mode.
- Add persistence early so the product can validate longitudinal value, not just first-session aesthetics.

### UX enhancement

- Replace the inactive fountain with a real modal or bottom sheet flow.
- Add concise onboarding copy that explains the four zones in plain language.
- Replace tooltip-only tile detail with a proper detail panel or drawer showing scene, emotion, insight, action, and timestamp.
- Rework responsive behavior so labels, tooltips, and detail views are mobile-safe.
- Add explicit feedback states for submit, generate, confirm, and place.

### Technical evolution

- Introduce a small domain layer for thoughts, insights, tiles, placement rules, and status transitions.
- Normalize insight lookup instead of repeated array search in render paths.
- Separate visual zone presentation from semantic zone metadata.
- Move toward a reducer or state machine for the fountain/review/place flow.
- Add analytics hooks around submission, edit, discard, and placement so V2 decisions are evidence-based.

## 7. Final Verdict

This MVP is usable as a visual prototype and brand-expression artifact. It is not yet usable as a true MVP of the product proposition because the core reflection-to-insight loop is absent.

- Is this MVP usable? Yes as a clickable concept demo. No as a product that validates the main behavior.
- What is the biggest risk? The product promise currently exceeds the implemented interaction, which can make the experience feel broken rather than early.
- What is the strongest part? The visual language is memorable and differentiated. The garden metaphor has real product potential if V2 turns it into a working ritual instead of a static scene.
