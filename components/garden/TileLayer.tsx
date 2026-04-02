"use client";

import { PathTile } from "./PathTile";
import { getZonePlacementPoint } from "@/lib/garden/zonePoints";
import type { InsightTile } from "@/lib/types/garden";

const selfTileVisualSize = {
  widthPercent: 104 / 700,
  heightPercent: 62 / 420,
} as const;

export function TileLayer({
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
        const point = getZonePlacementPoint("self", index);

        return (
          <div
            key={tile.id}
            className="absolute"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${selfTileVisualSize.widthPercent * 100}%`,
              height: `${selfTileVisualSize.heightPercent * 100}%`,
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
