import {
  EMOTION_OVERFLOW_OFFSET,
  EMOTION_POINTS,
} from "@/lib/data/emotionGardenAssets";
import { DIRECTION_OVERFLOW_OFFSET, DIRECTION_POINTS } from "./directionPoints";
import {
  RELATIONSHIP_OVERFLOW_OFFSET,
  RELATIONSHIP_POINTS,
} from "./relationshipPoints";
import { SELF_OVERFLOW_OFFSET, SELF_POINTS } from "./selfPoints";
import type { GardenZone, Point } from "@/lib/types/garden";

const ZONE_POINTS: Record<GardenZone, readonly Point[]> = {
  self: SELF_POINTS,
  emotion: EMOTION_POINTS,
  relationship: RELATIONSHIP_POINTS,
  direction: DIRECTION_POINTS,
};

const ZONE_OVERFLOW_OFFSETS: Record<GardenZone, Point> = {
  self: SELF_OVERFLOW_OFFSET,
  emotion: EMOTION_OVERFLOW_OFFSET,
  relationship: RELATIONSHIP_OVERFLOW_OFFSET,
  direction: DIRECTION_OVERFLOW_OFFSET,
};

export function getPointAtIndex(
  points: readonly Point[],
  index: number,
  overflowOffset: Point,
): Point {
  const preset = points[index];

  if (preset) {
    return preset;
  }

  const last = points[points.length - 1];

  if (!last) {
    return { x: 50, y: 50 };
  }

  const overflowSteps = index - (points.length - 1);

  return {
    x: last.x + overflowOffset.x * overflowSteps,
    y: last.y + overflowOffset.y * overflowSteps,
  };
}

export function getZonePoints(zone: GardenZone) {
  return ZONE_POINTS[zone];
}

export function getZoneOverflowOffset(zone: GardenZone) {
  return ZONE_OVERFLOW_OFFSETS[zone];
}

export function getZonePlacementPoint(zone: GardenZone, index: number) {
  return getPointAtIndex(
    getZonePoints(zone),
    index,
    getZoneOverflowOffset(zone),
  );
}
