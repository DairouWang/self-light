"use client";

import { PathTile } from "./PathTile";
import type { InsightTile } from "@/lib/types/garden";

const selfTileCoordinateSpace = {
  width: 700,
  height: 420,
} as const;

const selfTileVisualSize = {
  width: 104,
  height: 62,
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
      {tiles.map((tile) => (
        <div
          key={tile.id}
          className="absolute"
          style={{
            left: `${(tile.x / selfTileCoordinateSpace.width) * 100}%`,
            top: `${(tile.y / selfTileCoordinateSpace.height) * 100}%`,
            width: `${(selfTileVisualSize.width / selfTileCoordinateSpace.width) * 100}%`,
            height: `${(selfTileVisualSize.height / selfTileCoordinateSpace.height) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <PathTile
            tile={tile}
            isSelected={selectedTileId === tile.id}
            onSelect={onTileSelect}
          />
        </div>
      ))}
    </div>
  );
}
