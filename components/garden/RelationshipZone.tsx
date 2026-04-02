"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RelationshipGardenCanvas } from "./RelationshipGardenCanvas";
import { relationshipGardenImageAspectRatio } from "@/lib/data/relationshipGardenAssets";
import { ZONE_CONFIG } from "@/lib/types/garden";
import type { InsightTile } from "@/lib/types/garden";

export function RelationshipZone({
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
  const relationshipStyle = {
    ...ZONE_CONFIG.relationship.style,
    height: undefined,
  };

  return (
    <motion.section
      className={`absolute ${debugPathMode ? "cursor-default" : "cursor-pointer"}`}
      data-relationship-zone
      style={{
        ...relationshipStyle,
        aspectRatio: `${relationshipGardenImageAspectRatio}`,
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
          router.push("/garden/relationship");
        }
      }}
      aria-label="Relationship zone"
    >
      <RelationshipGardenCanvas
        tiles={tiles}
        onTileSelect={onTileSelect}
        selectedTileId={selectedTileId}
      />
    </motion.section>
  );
}
