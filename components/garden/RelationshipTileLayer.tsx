"use client";

import { PathTile } from "./PathTile";
import {
  relationshipFlowerBrickAspectRatio,
  relationshipTileSlotWidthPercent,
} from "@/lib/data/relationshipGardenAssets";
import { getZonePlacementPoint } from "@/lib/garden/zonePoints";
import type { InsightTile } from "@/lib/types/garden";

export function RelationshipTileLayer({
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
        const point = getZonePlacementPoint("relationship", index);

        return (
          <div
            key={tile.id}
            className="absolute"
            data-relationship-tile={tile.id}
            data-relationship-tile-index={index}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${relationshipTileSlotWidthPercent}%`,
              height: `${relationshipTileSlotWidthPercent / relationshipFlowerBrickAspectRatio}%`,
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
