"use client";

import { PathDebugOverlay } from "@/components/debug/PathDebugOverlay";
import { DEBUG_PATH_MODE } from "@/lib/config/debug";
import { SELF_POINTS } from "@/lib/garden/selfPoints";
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
      {DEBUG_PATH_MODE ? (
        <PathDebugOverlay zone="self" points={SELF_POINTS} usedCount={tiles.length} />
      ) : null}
    </div>
  );
}
