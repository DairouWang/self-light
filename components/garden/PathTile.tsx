"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type {
  GardenZone,
  PathTile as PathTileType,
  Insight,
  PathMaterial,
} from "@/lib/types/garden";

const materialConfig: Record<
  PathMaterial,
  {
    className: string;
    surface: string;
    edge: string;
    glow: string;
    detail: string;
  }
> = {
  wood: {
    className: "h-[clamp(2.6rem,3.5vw,3.1rem)] w-[clamp(4.5rem,6vw,5.2rem)]",
    surface:
      "linear-gradient(180deg, #d3b17a 0%, #b58a57 48%, #9f7245 100%)",
    edge:
      "linear-gradient(180deg, rgba(114, 75, 38, 0.95) 0%, rgba(90, 57, 27, 0.96) 100%)",
    glow: "rgba(212, 173, 108, 0.42)",
    detail:
      "repeating-linear-gradient(90deg, transparent 0px, transparent 11px, rgba(255,255,255,0.14) 11px, rgba(255,255,255,0.14) 12px)",
  },
  "river-stone": {
    className: "h-[clamp(2.7rem,3.6vw,3.2rem)] w-[clamp(4.25rem,5.7vw,4.95rem)]",
    surface:
      "linear-gradient(180deg, #bdd2d6 0%, #97afb4 45%, #7d9399 100%)",
    edge:
      "linear-gradient(180deg, rgba(83, 107, 111, 0.96) 0%, rgba(65, 87, 92, 0.96) 100%)",
    glow: "rgba(153, 201, 214, 0.36)",
    detail:
      "radial-gradient(circle at 28% 30%, rgba(255,255,255,0.28) 0%, transparent 26%), radial-gradient(circle at 74% 62%, rgba(255,255,255,0.15) 0%, transparent 22%)",
  },
  "flower-brick": {
    className: "h-[clamp(2.65rem,3.5vw,3.15rem)] w-[clamp(4.3rem,5.9vw,5.05rem)]",
    surface:
      "linear-gradient(180deg, #e2b09f 0%, #cb8d7f 45%, #b87063 100%)",
    edge:
      "linear-gradient(180deg, rgba(139, 79, 76, 0.96) 0%, rgba(113, 59, 57, 0.96) 100%)",
    glow: "rgba(220, 153, 141, 0.34)",
    detail:
      "radial-gradient(circle at 26% 36%, rgba(255,241,233,0.28) 0%, transparent 26%), radial-gradient(circle at 72% 60%, rgba(255,233,223,0.16) 0%, transparent 22%)",
  },
  "stone-brick": {
    className: "h-[clamp(2.8rem,3.7vw,3.2rem)] w-[clamp(4.35rem,5.8vw,5rem)]",
    surface:
      "linear-gradient(180deg, #d8d6c8 0%, #bcb9aa 48%, #a29e91 100%)",
    edge:
      "linear-gradient(180deg, rgba(110, 109, 99, 0.96) 0%, rgba(86, 85, 77, 0.96) 100%)",
    glow: "rgba(215, 214, 193, 0.32)",
    detail:
      "linear-gradient(90deg, transparent 0%, transparent 44%, rgba(90,90,84,0.12) 44%, rgba(90,90,84,0.12) 56%, transparent 56%), linear-gradient(180deg, transparent 0%, transparent 46%, rgba(90,90,84,0.1) 46%, rgba(90,90,84,0.1) 54%, transparent 54%)",
  },
};

const tooltipPlacement: Record<
  GardenZone,
  {
    cardClassName: string;
    arrowClassName: string;
    initialY: number;
  }
> = {
  self: {
    cardClassName: "top-[calc(100%+0.9rem)] left-1/2 -translate-x-1/2",
    arrowClassName:
      "-top-2 left-1/2 -translate-x-1/2 border-x-[9px] border-b-[11px] border-t-0 border-x-transparent border-b-white/65",
    initialY: -8,
  },
  emotion: {
    cardClassName: "top-[calc(100%+0.9rem)] left-1/2 -translate-x-1/2",
    arrowClassName:
      "-top-2 left-1/2 -translate-x-1/2 border-x-[9px] border-b-[11px] border-t-0 border-x-transparent border-b-white/65",
    initialY: -8,
  },
  relationship: {
    cardClassName: "bottom-[calc(100%+0.95rem)] left-1/2 -translate-x-1/2",
    arrowClassName:
      "-bottom-2 left-1/2 -translate-x-1/2 border-x-[9px] border-t-[11px] border-b-0 border-x-transparent border-t-white/65",
    initialY: 8,
  },
  direction: {
    cardClassName: "bottom-[calc(100%+0.95rem)] left-1/2 -translate-x-1/2",
    arrowClassName:
      "-bottom-2 left-1/2 -translate-x-1/2 border-x-[9px] border-t-[11px] border-b-0 border-x-transparent border-t-white/65",
    initialY: 8,
  },
};

function formatInsightDate(createdAt: string) {
  return new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function PathTile({
  tile,
  insight,
  isSelected,
  onSelect,
}: {
  tile: PathTileType;
  insight: Insight;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const config = materialConfig[tile.material];
  const tooltip = tooltipPlacement[tile.zone];
  const isOpen = isHovered || isSelected;

  return (
    <div
      className="relative isolate"
      onClick={(event) => event.stopPropagation()}
    >
      <motion.button
        type="button"
        aria-label={`Open insight from ${tile.zone}: ${insight.insight}`}
        className={cn("group relative block cursor-pointer", config.className)}
        onClick={() => onSelect(isSelected ? null : tile.id)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        animate={
          isSelected
            ? {
                y: -5,
                scale: 1.06,
              }
            : {
                y: 0,
                scale: 1,
              }
        }
        whileHover={{
          y: -6,
          scale: 1.08,
          transition: { type: "spring", stiffness: 280, damping: 20 },
        }}
        whileTap={{ scale: 1.02 }}
      >
        <span
          className="absolute inset-x-[12%] top-[8px] h-[28%] rounded-full blur-[7px]"
          style={{ background: config.glow }}
        />
        <span
          className="absolute inset-x-[4%] bottom-[-18%] h-[50%] rounded-full bg-black/22 blur-[8px]"
          style={{
            transform: isSelected ? "scale(0.95)" : "scale(0.88)",
          }}
        />
        <span
          className="absolute inset-x-[5%] bottom-0 h-[30%]"
          style={{
            background: config.edge,
            clipPath: "polygon(16% 0%, 100% 0%, 84% 100%, 0% 100%)",
            filter: "brightness(0.92)",
          }}
        />
        <span
          className={cn(
            "absolute inset-0 border border-white/20 shadow-[0_12px_20px_rgba(64,43,25,0.2)]",
            isSelected && "border-white/45",
          )}
          style={{
            background: `${config.detail}, ${config.surface}`,
            clipPath: "polygon(16% 0%, 100% 0%, 84% 100%, 0% 100%)",
            boxShadow: isSelected
              ? "0 0 0 2px rgba(255,255,255,0.28), inset 0 1px 0 rgba(255,255,255,0.32)"
              : "inset 0 1px 0 rgba(255,255,255,0.26)",
          }}
        />
        <span className="absolute left-[16%] right-[12%] top-[18%] h-[10%] rounded-full bg-white/18 blur-[2px]" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`${tile.id}-tooltip`}
            className={cn(
              "pointer-events-none absolute z-30 w-[min(17rem,44vw)] rounded-[24px] border border-white/45 bg-white/60 p-4 text-left text-[#4d4037] shadow-[0_20px_45px_rgba(91,76,63,0.22)] backdrop-blur-xl",
              tooltip.cardClassName,
            )}
            initial={{ opacity: 0, y: tooltip.initialY, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: tooltip.initialY, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <p className="text-[0.86rem] font-semibold leading-relaxed text-[#4a4036]">
              {insight.insight}
            </p>
            <p className="mt-2 text-[0.75rem] leading-relaxed text-[#6b5c52]">
              {insight.rawInput}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-[#8b7a6d]">
              <span>{formatInsightDate(insight.createdAt)}</span>
              <span>{tile.zone.replace("-", " ")}</span>
            </div>
            <span
              className={cn("absolute h-0 w-0 border-solid", tooltip.arrowClassName)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
