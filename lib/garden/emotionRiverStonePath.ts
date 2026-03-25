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

  const visibleCount = Math.min(insights.length, placementSlots.length);

  return Array.from({ length: visibleCount }, (_, index) => {
    const insight = insights[index];
    const slot = placementSlots[index];

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
