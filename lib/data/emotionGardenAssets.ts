import emotionGardenBaseImage from "@/lib/assets/emotion-garden/base-transparent.png";
import emotionStone1Image from "@/lib/assets/emotion-garden/river-stone-1.png";
import emotionStone2Image from "@/lib/assets/emotion-garden/river-stone-2.png";
import emotionStone3Image from "@/lib/assets/emotion-garden/river-stone-3.png";
import type { StonePlacementSlot } from "@/lib/garden/emotionRiverStonePath";

export const emotionGardenImageAspectRatio = 2914 / 1440;
export const emotionGardenBaseAsset = emotionGardenBaseImage;
export const emotionStoneAssetKeys = [
  "stone-1",
  "stone-2",
  "stone-3",
] as const;
export const emotionStoneAssets = {
  "stone-1": emotionStone1Image,
  "stone-2": emotionStone2Image,
  "stone-3": emotionStone3Image,
} as const;
export type EmotionStoneAssetKey = keyof typeof emotionStoneAssets;
export const emotionStoneSlotWidthPercent = 11.2;

const emotionGardenBluePointSequence = [
  [0.14, 0.76],
  [0.20, 0.70],
  [0.26, 0.67],
  [0.2, 0.68],
  [0.24, 0.6],
  [0.28, 0.52],
  [0.32, 0.46],
  [0.36, 0.5],
  [0.4, 0.58],
  [0.44, 0.64],
  [0.5, 0.6],
  [0.56, 0.54],
  [0.62, 0.5],
  [0.68, 0.52],
  [0.74, 0.56],
  [0.8, 0.6],
  [0.86, 0.64],
  [0.92, 0.66],
] as const;

function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

function buildBluePointSlots(
  points: readonly (readonly [number, number])[],
): StonePlacementSlot[] {
  return points.map(([x, y], index) => {
    const current = { x, y };
    const nextPoint =
      index < points.length - 1 ? points[index + 1] : points[index - 1];
    const angle = toDegrees(
      Math.atan2(nextPoint[1] - current.y, nextPoint[0] - current.x),
    );

    return {
      index,
      x: current.x,
      y: current.y,
      rotation: angle,
      scale: 0.92,
    };
  });
}

export const emotionGardenRiverStoneSlots = buildBluePointSlots(
  emotionGardenBluePointSequence,
);

export function getEmotionStoneAssetByKey(key: EmotionStoneAssetKey) {
  return emotionStoneAssets[key];
}

export function getEmotionStoneAspectRatio(key: EmotionStoneAssetKey) {
  const asset = emotionStoneAssets[key];

  return asset.width / asset.height;
}
