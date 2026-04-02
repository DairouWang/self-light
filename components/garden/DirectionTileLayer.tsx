"use client";

import { PathTile } from "./PathTile";
import {
  directionStoneBrickAspectRatio,
  directionTileSlotWidthPercent,
} from "@/lib/data/directionGardenAssets";
import { getZonePlacementPoint } from "@/lib/garden/zonePoints";
import type { InsightTile } from "@/lib/types/garden";

export function DirectionTileLayer({
  tiles,
  onTileSelect,
  selectedTileId,
}: {
  tiles: InsightTile[];
  onTileSelect: (id: string | null) => void;
  selectedTileId: string | null;
}) {
  return (
    <div className="absolute inset-0 z-20">
      {tiles.map((tile, index) => {
        const point = getZonePlacementPoint("direction", index);

        return (
          <div
            key={tile.id}
            className="absolute"
            data-direction-tile={tile.id}
            data-direction-tile-index={index}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${directionTileSlotWidthPercent}%`,
              height: `${directionTileSlotWidthPercent / directionStoneBrickAspectRatio}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <PathTile
              tile={tile}
              isSelected={selectedTileId === tile.id}
              onSelect={onTileSelect}
            />
          </div>
        );
      })}
    </div>
  );
}
