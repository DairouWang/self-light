"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ZONE_CONFIG } from "@/lib/types/garden";
import selfWoodTileImage from "@/lib/assets/self-garden/wood-tile-transparent.png";
import type {
  GardenZone,
  InsightTile,
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
  isSelected,
  onSelect,
}: {
  tile: InsightTile;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const config = materialConfig[ZONE_CONFIG[tile.zone].material];
  const tooltip = tooltipPlacement[tile.zone];
  const isSelfTile = tile.zone === "self";

  return (
    <div
      className={cn("relative isolate", isSelfTile && "h-full w-full")}
      onClick={(event) => event.stopPropagation()}
    >
      <motion.button
        type="button"
        aria-label={`Open insight in ${tile.zone}: ${tile.content}`}
        className={cn(
          "group relative block cursor-pointer",
          isSelfTile ? "h-full w-full" : config.className,
        )}
        onClick={() => onSelect(isSelected ? null : tile.id)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        animate={
          isSelected
            ? { y: -4, scale: 1.05 }
            : { y: 0, scale: 1, opacity: 0.9 }
        }
        whileHover={{
          y: -5,
          scale: 1.07,
          opacity: 1,
          transition: { type: "spring", stiffness: 280, damping: 20 },
        }}
        whileTap={{ scale: 1.02 }}
      >
        {isSelfTile ? (
          <>
            <span className="absolute inset-x-[16%] top-[16%] h-[18%] rounded-full bg-[#f6e0ae]/55 blur-[10px]" />
            <span
              className="absolute inset-x-[10%] bottom-[-10%] h-[28%] rounded-full bg-black/22 blur-[8px]"
              style={{
                transform: isSelected ? "scale(1)" : "scale(0.84)",
              }}
            />
            <span
              className={cn(
                "absolute inset-[-6%] rounded-full border transition-opacity",
                isSelected
                  ? "border-white/52 opacity-100"
                  : "border-white/0 opacity-0",
              )}
            />
            <span className="absolute inset-[-10%]">
              <Image
                src={selfWoodTileImage}
                alt=""
                aria-hidden="true"
                fill
                className="object-contain drop-shadow-[0_8px_16px_rgba(69,46,23,0.16)]"
                sizes="(max-width: 768px) 14vw, 7vw"
              />
            </span>
          </>
        ) : (
          <>
            <span
              className="absolute inset-x-[12%] top-[8px] h-[28%] rounded-full blur-[7px]"
              style={{ background: config.glow }}
            />
            <span
              className="absolute inset-x-[4%] bottom-[-18%] h-[50%] rounded-full bg-black/18 blur-[8px]"
              style={{
                transform: isSelected ? "scale(0.95)" : "scale(0.82)",
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
                "absolute inset-0 border border-white/18 shadow-[0_12px_20px_rgba(64,43,25,0.16)]",
                isSelected && "border-white/45",
              )}
              style={{
                background: `${config.detail}, ${config.surface}`,
                clipPath: "polygon(16% 0%, 100% 0%, 84% 100%, 0% 100%)",
                boxShadow: isSelected
                  ? "0 0 0 2px rgba(255,255,255,0.28), inset 0 1px 0 rgba(255,255,255,0.32)"
                  : "inset 0 1px 0 rgba(255,255,255,0.22)",
              }}
            />
            <span className="absolute left-[16%] right-[12%] top-[18%] h-[10%] rounded-full bg-white/15 blur-[2px]" />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isHovered ? (
          <motion.div
            key={`${tile.id}-tooltip`}
            className={cn(
              "pointer-events-none absolute z-30 w-[min(16rem,42vw)] rounded-[24px] border border-white/45 bg-white/60 p-4 text-left text-[#4d4037] shadow-[0_20px_45px_rgba(91,76,63,0.22)] backdrop-blur-xl",
              tooltip.cardClassName,
            )}
            initial={{ opacity: 0, y: tooltip.initialY, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: tooltip.initialY, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <p
              className="text-[0.86rem] font-semibold leading-relaxed text-[#4a4036]"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {tile.content}
            </p>
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-[#8b7a6d]">
              {formatInsightDate(tile.createdAt)}
            </p>
            <span
              className={cn(
                "absolute h-0 w-0 border-solid",
                tooltip.arrowClassName,
              )}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
