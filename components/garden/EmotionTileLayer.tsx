"use client";

import { useMemo } from "react";
import { PathTile } from "./PathTile";
import {
  emotionGardenRiverStoneSlots,
  getEmotionStoneAspectRatio,
  emotionStoneAssetKeys,
  emotionStoneSlotWidthPercent,
} from "@/lib/data/emotionGardenAssets";
import { mapInsightsToRiverStones } from "@/lib/garden/emotionRiverStonePath";
import type { InsightTile } from "@/lib/types/garden";

export function EmotionTileLayer({
  tiles,
  onTileSelect,
  selectedTileId,
}: {
  tiles: InsightTile[];
  onTileSelect: (id: string | null) => void;
  selectedTileId: string | null;
}) {
  const orderedTiles = useMemo(
    () =>
      [...tiles].sort((left, right) => {
        const createdAtOrder =
          new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();

        if (createdAtOrder !== 0) {
          return createdAtOrder;
        }

        return left.id.localeCompare(right.id);
      }),
    [tiles],
  );
  const placedStones = useMemo(
    () =>
      mapInsightsToRiverStones(
        orderedTiles,
        emotionGardenRiverStoneSlots,
        emotionStoneAssetKeys,
      ),
    [orderedTiles],
  );

  return (
    <div className="absolute inset-0 z-20">
      {placedStones.map((stone, index) => {
        const tile = orderedTiles[index];
        const stoneAspectRatio = getEmotionStoneAspectRatio(stone.assetKey);

        return (
          <div
            key={stone.id}
            className="absolute"
            data-emotion-tile={stone.id}
            data-emotion-tile-index={index}
            style={{
              left: `${stone.x * 100}%`,
              top: `${stone.y * 100}%`,
              width: `${emotionStoneSlotWidthPercent}%`,
              height: `${emotionStoneSlotWidthPercent / stoneAspectRatio}%`,
              transform: `translate(-50%, -50%) scale(${stone.scale})`,
            }}
          >
            <PathTile
              tile={tile}
              isSelected={selectedTileId === tile.id}
              onSelect={onTileSelect}
              emotionStoneAssetKey={stone.assetKey}
            />
          </div>
        );
      })}
    </div>
  );
}
