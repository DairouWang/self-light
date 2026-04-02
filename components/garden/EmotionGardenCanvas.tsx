"use client";

import { PathDebugOverlay } from "@/components/debug/PathDebugOverlay";
import { EmotionGardenLayeredScene } from "./EmotionGardenLayeredScene";
import { EmotionTileLayer } from "./EmotionTileLayer";
import { DEBUG_PATH_MODE } from "@/lib/config/debug";
import { EMOTION_POINTS } from "@/lib/data/emotionGardenAssets";
import type { InsightTile } from "@/lib/types/garden";

export function EmotionGardenCanvas({
  tiles,
  onTileSelect,
  selectedTileId,
  baseImageClassName,
}: {
  tiles: InsightTile[];
  onTileSelect: (id: string | null) => void;
  selectedTileId: string | null;
  baseImageClassName?: string;
}) {
  return (
    <div
      className="relative h-full w-full overflow-visible"
      data-emotion-canvas
    >
      <div className="absolute inset-[-2%]">
        <EmotionGardenLayeredScene imageClassName={baseImageClassName} />
        <EmotionTileLayer
          tiles={tiles}
          onTileSelect={onTileSelect}
          selectedTileId={selectedTileId}
        />
        {DEBUG_PATH_MODE ? (
          <PathDebugOverlay
            zone="emotion"
            points={EMOTION_POINTS}
            usedCount={tiles.length}
          />
        ) : null}
      </div>
    </div>
  );
}
