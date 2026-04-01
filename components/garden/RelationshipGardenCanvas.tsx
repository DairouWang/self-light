"use client";

import Image from "next/image";
import { RelationshipTileLayer } from "./RelationshipTileLayer";
import {
  relationshipCanvasInsetPercent,
  relationshipGardenBaseAsset,
} from "@/lib/data/relationshipGardenAssets";
import type { InsightTile } from "@/lib/types/garden";

export function RelationshipGardenCanvas({
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
      data-relationship-canvas
    >
      <div
        className="absolute"
        style={{ inset: `${relationshipCanvasInsetPercent}%` }}
      >
        <Image
          src={relationshipGardenBaseAsset}
          alt=""
          aria-hidden="true"
          fill
          className="pointer-events-none object-contain drop-shadow-[0_18px_30px_rgba(103,76,61,0.18)]"
          sizes="(max-width: 768px) 80vw, 40vw"
        />
        <RelationshipTileLayer
          tiles={tiles}
          onTileSelect={onTileSelect}
          selectedTileId={selectedTileId}
        />
      </div>
    </div>
  );
}
