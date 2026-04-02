import emotionGardenBaseImage from "@/lib/assets/emotion-garden/base-transparent.png";
import emotionStone1Image from "@/lib/assets/emotion-garden/river-stone-1.png";
import emotionStone2Image from "@/lib/assets/emotion-garden/river-stone-2.png";
import emotionStone3Image from "@/lib/assets/emotion-garden/river-stone-3.png";
import type { StonePlacementSlot } from "@/lib/garden/emotionRiverStonePath";
import type { Point } from "@/lib/types/garden";

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

export const EMOTION_POINTS: Point[] = [
  { x: 14, y: 76 },
  { x: 18.4, y: 70.8 },
  { x: 25.3, y: 67.4 },
  { x: 30.5, y: 63 },
  { x: 34.5, y: 59 },
  { x: 36.8, y: 52.5 },
  { x: 32.1, y: 45.3 },
  { x: 30.9, y: 38.4 },
  { x: 34.9, y: 32.4 },
  { x: 38.7, y: 26.3 },
  { x: 42.7, y: 51.9 },
  { x: 47.9, y: 48.6 },
  { x: 55.4, y: 47.6 },
  { x: 61.8, y: 49.5 },
  { x: 67.8, y: 52.5 },
];

export const EMOTION_OVERFLOW_OFFSET: Point = {
  x: 6,
  y: 2,
};

function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

function buildBluePointSlots(
  points: readonly Point[],
): StonePlacementSlot[] {
  return points.map((point, index) => {
    const current = {
      x: point.x / 100,
      y: point.y / 100,
    };
    const nextPoint =
      index < points.length - 1
        ? {
            x: points[index + 1].x / 100,
            y: points[index + 1].y / 100,
          }
        : {
            x: points[index - 1].x / 100,
            y: points[index - 1].y / 100,
          };
    const angle = toDegrees(
      Math.atan2(nextPoint.y - current.y, nextPoint.x - current.x),
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
  EMOTION_POINTS,
);

export function getEmotionStoneAssetByKey(key: EmotionStoneAssetKey) {
  return emotionStoneAssets[key];
}

export function getEmotionStoneAspectRatio(key: EmotionStoneAssetKey) {
  const asset = emotionStoneAssets[key];

  return asset.width / asset.height;
}
