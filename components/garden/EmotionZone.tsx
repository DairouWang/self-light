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
  const emotionStyle = { ...ZONE_CONFIG.emotion.style, height: undefined };

  return (
    <motion.section
      className="absolute cursor-pointer"
      data-emotion-zone
      style={{
        ...emotionStyle,
        aspectRatio: "2914 / 1440",
      }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={(event) => {
        event.stopPropagation();
        router.push("/garden/emotion");
      }}
      aria-label="Emotion zone"
    >
      <EmotionGardenCanvas
        tiles={tiles}
        onTileSelect={onTileSelect}
        selectedTileId={selectedTileId}
      />
    </motion.section>
  );
}
