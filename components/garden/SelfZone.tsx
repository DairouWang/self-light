"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SelfGardenCanvas } from "./SelfGardenCanvas";
import { ZONE_CONFIG } from "@/lib/types/garden";
import type { InsightTile } from "@/lib/types/garden";

export function SelfZone({
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

  return (
    <motion.section
      className={`absolute ${debugPathMode ? "cursor-default" : "cursor-pointer"}`}
      style={ZONE_CONFIG.self.style}
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
          router.push("/garden/self");
        }
      }}
      aria-label="Self zone"
    >
      <SelfGardenCanvas
        tiles={tiles}
        onTileSelect={onTileSelect}
        selectedTileId={selectedTileId}
      />
    </motion.section>
  );
}
