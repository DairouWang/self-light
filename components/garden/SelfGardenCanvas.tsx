"use client";

import { SelfGardenLayeredScene } from "./SelfGardenLayeredScene";
import { TileLayer } from "./TileLayer";
import type { InsightTile } from "@/lib/types/garden";

export function SelfGardenCanvas({
  tiles,
  onTileSelect,
  selectedTileId,
}: {
  tiles: InsightTile[];
  onTileSelect: (id: string | null) => void;
  selectedTileId: string | null;
}) {
  return (
    <div className="relative h-full w-full overflow-visible">
      <SelfGardenLayeredScene />
      <TileLayer
        tiles={tiles}
        onTileSelect={onTileSelect}
        selectedTileId={selectedTileId}
      />
    </div>
  );
}
