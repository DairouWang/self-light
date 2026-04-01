"use client";

import { PathTile } from "./PathTile";
import {
  directionStoneBrickAspectRatio,
  directionTileSlotWidthPercent,
  getDirectionTileSlot,
} from "@/lib/data/directionGardenAssets";
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
        const slot = getDirectionTileSlot(index);

        return (
          <div
            key={tile.id}
            className="absolute"
            data-direction-tile={tile.id}
            data-direction-tile-index={index}
            style={{
              left: `${slot.x}%`,
              top: `${slot.y}%`,
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
