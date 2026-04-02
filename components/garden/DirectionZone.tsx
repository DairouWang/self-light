"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DirectionGardenCanvas } from "./DirectionGardenCanvas";
import { directionGardenImageAspectRatio } from "@/lib/data/directionGardenAssets";
import { ZONE_CONFIG } from "@/lib/types/garden";
import type { InsightTile } from "@/lib/types/garden";

export function DirectionZone({
  debugPathMode,
  tiles,
  onTileSelect,
  selectedTileId,
}: {
  debugPathMode: boolean;
  tiles: InsightTile[];
  onTileSelect: (id: string | null) => void;
  selectedTileId: string | null;
}) {
  const router = useRouter();
  const directionStyle = {
    ...ZONE_CONFIG.direction.style,
    height: undefined,
  };

  return (
    <motion.section
      className={`absolute ${debugPathMode ? "cursor-default" : "cursor-pointer"}`}
      data-direction-zone
      style={{
        ...directionStyle,
        aspectRatio: `${directionGardenImageAspectRatio}`,
      }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        debugPathMode
          ? undefined
          : {
              y: -4,
              scale: 1.02,
              transition: { type: "spring", stiffness: 220, damping: 18 },
            }
      }
      whileTap={debugPathMode ? undefined : { scale: 0.992 }}
      onClick={(event) => {
        event.stopPropagation();
        if (!debugPathMode) {
          router.push("/garden/direction");
        }
      }}
      aria-label="Direction zone"
    >
      <DirectionGardenCanvas
        tiles={tiles}
        onTileSelect={onTileSelect}
        selectedTileId={selectedTileId}
      />
    </motion.section>
  );
}
