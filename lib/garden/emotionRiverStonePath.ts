export type StonePlacementSlot = {
  index: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

export type RenderedStone<TAssetKey extends string = string> = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  assetKey: TAssetKey;
};

type InsightLike = {
  id?: string | number;
};

function getStonePlacementSlot(
  index: number,
  placementSlots: readonly StonePlacementSlot[],
): StonePlacementSlot {
  const preset = placementSlots[index];

  if (preset) {
    return preset;
  }

  const last = placementSlots[placementSlots.length - 1];
  const previous = placementSlots[placementSlots.length - 2];

  if (!last || !previous) {
    return {
      index,
      x: 0.5,
      y: 0.5,
      rotation: 0,
      scale: 0.92,
    };
  }

  const overflowSteps = index - (placementSlots.length - 1);
  const stepX = last.x - previous.x;
  const stepY = last.y - previous.y;

  return {
    index,
    x: last.x + stepX * overflowSteps,
    y: last.y + stepY * overflowSteps,
    rotation: last.rotation,
    scale: last.scale,
  };
}

export function mapInsightsToRiverStones<
  TInsight extends InsightLike,
  TAssetKey extends string,
>(
  insights: readonly TInsight[],
  placementSlots: readonly StonePlacementSlot[],
  availableStoneAssetKeys: readonly TAssetKey[],
): RenderedStone<TAssetKey>[] {
  if (availableStoneAssetKeys.length === 0) {
    return [];
  }

  return Array.from({ length: insights.length }, (_, index) => {
    const insight = insights[index];
    const slot = getStonePlacementSlot(index, placementSlots);

    return {
      id: insight.id != null ? String(insight.id) : `emotion-stone-${index}`,
      x: slot.x,
      y: slot.y,
      rotation: slot.rotation,
      scale: slot.scale,
      assetKey: availableStoneAssetKeys[index % availableStoneAssetKeys.length],
    };
  });
}
