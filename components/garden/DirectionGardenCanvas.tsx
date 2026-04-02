"use client";

import Image from "next/image";
import { PathDebugOverlay } from "@/components/debug/PathDebugOverlay";
import { DirectionTileLayer } from "./DirectionTileLayer";
import { DEBUG_PATH_MODE } from "@/lib/config/debug";
import {
  directionCanvasInsetPercent,
  directionGardenBaseAsset,
} from "@/lib/data/directionGardenAssets";
import { DIRECTION_POINTS } from "@/lib/garden/directionPoints";
import type { InsightTile } from "@/lib/types/garden";

export function DirectionGardenCanvas({
  tiles,
  onTileSelect,
  selectedTileId,
}: {
  tiles: InsightTile[];
  onTileSelect: (id: string | null) => void;
  selectedTileId: string | null;
}) {
  return (
    <div className="relative h-full w-full overflow-visible" data-direction-canvas>
      <div
        className="absolute"
        style={{ inset: `${directionCanvasInsetPercent}%` }}
      >
        <Image
          src={directionGardenBaseAsset}
          alt=""
          aria-hidden="true"
          fill
          className="pointer-events-none object-contain drop-shadow-[0_18px_30px_rgba(79,84,68,0.18)]"
          sizes="(max-width: 768px) 80vw, 40vw"
        />
        <DirectionTileLayer
          tiles={tiles}
          onTileSelect={onTileSelect}
          selectedTileId={selectedTileId}
        />
        {DEBUG_PATH_MODE ? (
          <PathDebugOverlay
            zone="direction"
            points={DIRECTION_POINTS}
            usedCount={tiles.length}
          />
        ) : null}
      </div>
    </div>
  );
}
