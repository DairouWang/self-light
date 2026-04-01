"use client";

import { PathTile } from "./PathTile";
import {
  relationshipFlowerBrickAspectRatio,
  relationshipTileSlotWidthPercent,
} from "@/lib/data/relationshipGardenAssets";
import { ZONE_CONFIG } from "@/lib/types/garden";
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
  const { pathOrigin, pathVector } = ZONE_CONFIG.relationship;

  return (
    <div className="absolute inset-0 z-20">
      {tiles.map((tile, index) => {
        const left = pathOrigin.x + index * pathVector.x;
        const top = pathOrigin.y + index * pathVector.y;

        return (
          <div
            key={tile.id}
            className="absolute"
            data-relationship-tile={tile.id}
            data-relationship-tile-index={index}
            style={{
              left: `${left}%`,
              top: `${top}%`,
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
