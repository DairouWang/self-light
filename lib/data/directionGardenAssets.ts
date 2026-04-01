import directionGardenBaseImage from "@/lib/assets/direction-garden/base-transparent.png";
import directionStoneBrickImage from "@/lib/assets/direction-garden/stone-brick.png";

type DirectionTileSlot = {
  x: number;
  y: number;
};

const directionTilePathSlots: DirectionTileSlot[] = [
  { x: 74, y:65 },
  { x: 68, y: 60 },
  { x: 63, y: 55 },
  { x: 53, y: 60 },
  { x: 44, y: 56 },
  { x: 36, y: 53 },
  { x: 29, y: 50 },
  { x: 23, y: 47 },
];

export const directionGardenBaseAsset = directionGardenBaseImage;
export const directionStoneBrickAsset = directionStoneBrickImage;
export const directionGardenImageAspectRatio =
  directionGardenBaseAsset.width / directionGardenBaseAsset.height;
export const directionStoneBrickAspectRatio =
  directionStoneBrickAsset.width / directionStoneBrickAsset.height;
export const directionCanvasInsetPercent = -4;
export const directionTileSlotWidthPercent = 13.6;
export const directionTileImageWidthPercent = 92;

export function getDirectionTileSlot(index: number): DirectionTileSlot {
  const cappedIndex = Math.min(index, directionTilePathSlots.length - 1);
  const slot = directionTilePathSlots[cappedIndex];

  if (index < directionTilePathSlots.length) {
    return slot;
  }

  const lastSlot = directionTilePathSlots[directionTilePathSlots.length - 1];
  const previousSlot = directionTilePathSlots[directionTilePathSlots.length - 2];
  const stepX = lastSlot.x - previousSlot.x;
  const stepY = lastSlot.y - previousSlot.y;
  const overflowSteps = index - (directionTilePathSlots.length - 1);

  return {
    x: lastSlot.x + stepX * overflowSteps,
    y: lastSlot.y + stepY * overflowSteps,
  };
}
