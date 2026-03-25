"use client";

import { EmotionGardenLayeredScene } from "./EmotionGardenLayeredScene";
import { EmotionTileLayer } from "./EmotionTileLayer";
import type { InsightTile } from "@/lib/types/garden";

export function EmotionGardenCanvas({
  tiles,
  onTileSelect,
  selectedTileId,
}: {
  tiles: InsightTile[];
  onTileSelect: (id: string | null) => void;
  selectedTileId: string | null;
}) {
  return (
    <div
      className="relative h-full w-full overflow-visible"
      data-emotion-canvas
    >
      <div className="absolute inset-[-2%]">
        <EmotionGardenLayeredScene />
        <EmotionTileLayer
          tiles={tiles}
          onTileSelect={onTileSelect}
          selectedTileId={selectedTileId}
        />
      </div>
    </div>
  );
}
