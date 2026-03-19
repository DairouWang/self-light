"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SelfGardenCanvas } from "./SelfGardenCanvas";
import { ZONE_CONFIG } from "@/lib/types/garden";
import type { InsightTile } from "@/lib/types/garden";

export function SelfZone({
  tiles,
  onTileSelect,
  selectedTileId,
}: {
  tiles: InsightTile[];
  onTileSelect: (id: string | null) => void;
  selectedTileId: string | null;
}) {
  const router = useRouter();

  return (
    <motion.section
      className="absolute cursor-pointer"
      style={ZONE_CONFIG.self.style}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={(event) => {
        event.stopPropagation();
        router.push("/garden/self");
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
