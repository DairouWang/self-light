"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EmotionGardenCanvas } from "./EmotionGardenCanvas";
import { ZONE_CONFIG } from "@/lib/types/garden";
import type { InsightTile } from "@/lib/types/garden";

export function EmotionZone({
  tiles,
  onTileSelect,
  selectedTileId,
}: {
  tiles: InsightTile[];
  onTileSelect: (id: string | null) => void;
  selectedTileId: string | null;
}) {
  const router = useRouter();
  const emotionStyle = {
    ...ZONE_CONFIG.emotion.style,
    top: "12.4%",
    height: "30.5%",
  };

  return (
    <motion.section
      className="absolute cursor-pointer"
      data-emotion-zone
      style={emotionStyle}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { type: "spring", stiffness: 220, damping: 18 },
      }}
      whileTap={{ scale: 0.992 }}
      onClick={(event) => {
        event.stopPropagation();
        router.push("/garden/emotion");
      }}
      aria-label="Emotion zone"
    >
      <EmotionGardenCanvas
        baseImageClassName="object-fill"
        tiles={tiles}
        onTileSelect={onTileSelect}
        selectedTileId={selectedTileId}
      />
    </motion.section>
  );
}
