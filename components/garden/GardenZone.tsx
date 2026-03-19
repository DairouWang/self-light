"use client";

import { motion } from "framer-motion";
import { PathTile } from "./PathTile";
import { SelfZone } from "./SelfZone";
import { cn } from "@/lib/utils";
import { ZONE_CONFIG } from "@/lib/types/garden";
import type {
  GardenDecoration,
  GardenZone as GardenZoneType,
  InsightTile,
} from "@/lib/types/garden";

function decorationStyle(decoration: GardenDecoration) {
  const scale = decoration.scale ?? 1;
  const rotate = decoration.rotate ?? 0;

  return {
    left: `${decoration.x}%`,
    top: `${decoration.y}%`,
    transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
  };
}

function ZoneDecoration({ decoration }: { decoration: GardenDecoration }) {
  const style = decorationStyle(decoration);

  switch (decoration.kind) {
    case "tree":
      return (
        <div className="pointer-events-none absolute z-10" style={style}>
          <div className="relative h-20 w-16">
            <div className="absolute left-1/2 top-8 h-10 w-3 -translate-x-1/2 rounded-full bg-[#6f5232]" />
            <div className="absolute left-1 top-5 h-12 w-12 rounded-full bg-[#617a54] shadow-[0_8px_12px_rgba(55,72,44,0.18)]" />
            <div className="absolute left-6 top-0 h-11 w-11 rounded-full bg-[#7f9b6f]" />
            <div className="absolute right-0 top-6 h-10 w-10 rounded-full bg-[#547247]" />
          </div>
        </div>
      );
    case "log":
      return (
        <div className="pointer-events-none absolute z-20" style={style}>
          <div className="h-4 w-16 rounded-full bg-[#8b6441] shadow-[0_6px_10px_rgba(68,45,24,0.2)]">
            <div className="h-full w-full rounded-full border border-white/15 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_2px,transparent_2px,transparent_8px)]" />
          </div>
        </div>
      );
    case "moss":
      return (
        <div className="pointer-events-none absolute z-20" style={style}>
          <div className="relative h-10 w-16">
            <div className="absolute bottom-0 left-0 h-6 w-7 rounded-full bg-[#7f9568]" />
            <div className="absolute bottom-1 left-4 h-7 w-8 rounded-full bg-[#95ab7a]" />
            <div className="absolute bottom-0 right-0 h-5 w-6 rounded-full bg-[#70885d]" />
          </div>
        </div>
      );
    case "stream":
      return (
        <div className="pointer-events-none absolute z-0" style={style}>
          <div
            className="rounded-full border border-white/35 bg-[linear-gradient(180deg,rgba(205,236,237,0.92)_0%,rgba(151,196,202,0.92)_44%,rgba(115,163,176,0.96)_100%)] shadow-[inset_0_6px_16px_rgba(255,255,255,0.3),0_12px_18px_rgba(90,118,122,0.15)]"
            style={{
              width: `${decoration.width ?? 58}%`,
              height: `${decoration.height ?? 18}%`,
            }}
          >
            <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_26%_34%,rgba(255,255,255,0.38)_0%,transparent_22%),radial-gradient(circle_at_72%_60%,rgba(255,255,255,0.26)_0%,transparent_18%)]" />
          </div>
        </div>
      );
    case "reeds":
      return (
        <div className="pointer-events-none absolute z-20" style={style}>
          <div className="relative h-14 w-12">
            {[0, 1, 2, 3].map((index) => (
              <span
                key={index}
                className="absolute bottom-0 w-[2px] rounded-full bg-[#6f8e67]"
                style={{
                  left: `${8 + index * 8}px`,
                  height: `${28 + index * 6}px`,
                  transform: `rotate(${index % 2 === 0 ? -8 : 8}deg)`,
                }}
              />
            ))}
            <div className="absolute bottom-0 left-0 h-4 w-12 rounded-full bg-[#95aa7b]/70 blur-[1px]" />
          </div>
        </div>
      );
    case "stone":
      return (
        <div className="pointer-events-none absolute z-20" style={style}>
          <div className="relative h-8 w-14">
            <div className="absolute bottom-0 left-0 h-5 w-7 rounded-full bg-[#9f9d90]" />
            <div className="absolute left-4 top-1 h-4 w-6 rounded-full bg-[#bcb7aa]" />
            <div className="absolute bottom-1 right-0 h-5 w-6 rounded-full bg-[#858377]" />
          </div>
        </div>
      );
    case "flower-bed":
      return (
        <div className="pointer-events-none absolute z-20" style={style}>
          <div className="relative h-12 w-16">
            <div className="absolute bottom-0 left-1 h-7 w-14 rounded-full bg-[#8da170]" />
            {[
              "bg-[#d9877b]",
              "bg-[#f0b59e]",
              "bg-[#e2c5b8]",
              "bg-[#c96d67]",
              "bg-[#f3d4af]",
            ].map((className, index) => (
              <span
                key={className + index}
                className={cn(
                  "absolute h-3.5 w-3.5 rounded-full shadow-[0_2px_6px_rgba(255,255,255,0.25)]",
                  className,
                )}
                style={{
                  left: `${6 + (index % 3) * 12}px`,
                  top: `${4 + Math.floor(index / 2) * 8}px`,
                }}
              />
            ))}
          </div>
        </div>
      );
    case "lantern":
      return (
        <div className="pointer-events-none absolute z-20" style={style}>
          <div className="relative h-14 w-10">
            <div className="absolute left-1/2 top-1 h-5 w-5 -translate-x-1/2 rounded-[35%] border border-white/45 bg-[#f5e8be] shadow-[0_0_14px_rgba(246,230,181,0.6)]" />
            <div className="absolute left-1/2 top-5 h-8 w-[3px] -translate-x-1/2 rounded-full bg-[#7f6a55]" />
            <div className="absolute bottom-0 left-1/2 h-2.5 w-7 -translate-x-1/2 rounded-full bg-[#8d765c]/65 blur-[1px]" />
          </div>
        </div>
      );
    case "hedge":
      return (
        <div className="pointer-events-none absolute z-20" style={style}>
          <div
            className="rounded-[999px] border border-white/16 bg-[linear-gradient(180deg,rgba(122,147,99,0.96)_0%,rgba(90,116,75,0.98)_100%)] shadow-[0_8px_14px_rgba(60,78,49,0.16)]"
            style={{
              width: `${decoration.width ?? 24}%`,
              height: `${decoration.height ?? 12}%`,
            }}
          />
        </div>
      );
    case "topiary":
      return (
        <div className="pointer-events-none absolute z-20" style={style}>
          <div className="relative h-16 w-12">
            <div className="absolute left-1/2 top-1 h-9 w-9 -translate-x-1/2 rounded-full bg-[#7f9a6b]" />
            <div className="absolute left-1/2 top-7 h-7 w-[3px] -translate-x-1/2 rounded-full bg-[#6f5b47]" />
            <div className="absolute bottom-0 left-1/2 h-3.5 w-8 -translate-x-1/2 rounded-[10px] bg-[#a99277]" />
          </div>
        </div>
      );
    case "pillar":
      return (
        <div className="pointer-events-none absolute z-10" style={style}>
          <div className="relative h-16 w-10">
            <div className="absolute inset-x-2 top-0 h-3 rounded-[8px] bg-[#d8d4c8]" />
            <div className="absolute inset-x-3 top-3 h-10 rounded-[8px] bg-[#c1beb2]" />
            <div className="absolute inset-x-1 bottom-0 h-3 rounded-[8px] bg-[#a8a396]" />
          </div>
        </div>
      );
  }
}

export function GardenZone({
  zone,
  tiles,
  onTileSelect,
  selectedTileId,
}: {
  zone: GardenZoneType;
  tiles: InsightTile[];
  onTileSelect: (id: string | null) => void;
  selectedTileId: string | null;
}) {
  const config = ZONE_CONFIG[zone];
  const isSelfZone = zone === "self";

  if (isSelfZone) {
    return (
      <SelfZone
        tiles={tiles}
        onTileSelect={onTileSelect}
        selectedTileId={selectedTileId}
      />
    );
  }

  const backDecorations = config.decorations.filter(
    (decoration) => decoration.layer !== "front",
  );
  const frontDecorations = config.decorations.filter(
    (decoration) => decoration.layer === "front",
  );

  return (
    <motion.section
      className="absolute"
      style={config.style}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0 rounded-[2.75rem] bg-black/10 blur-xl"
        style={{
          clipPath: config.clipPath,
          transform: "translateY(12px) scale(0.97)",
        }}
      />
      <div
        className="absolute inset-0 border border-white/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
        style={{
          background: config.surface,
          clipPath: config.clipPath,
        }}
      />
      <div
        className="absolute inset-[1%] border border-white/20"
        style={{
          clipPath: config.clipPath,
          background: config.mist,
        }}
      />
      <div
        className="absolute inset-[4%] border border-dashed border-white/18"
        style={{ clipPath: config.clipPath }}
      />

      {backDecorations.map((decoration, index) => (
        <ZoneDecoration key={`${zone}-back-${index}`} decoration={decoration} />
      ))}

      <div className="absolute inset-0 z-20">
        {tiles.map((tile, index) => {
          const left = config.pathOrigin.x + index * config.pathVector.x;
          const top = config.pathOrigin.y + index * config.pathVector.y;

          return (
            <div
              key={tile.id}
              className="absolute"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <PathTile
                tile={tile}
                isSelected={selectedTileId === tile.id}
                onSelect={onTileSelect}
              />
            </div>
          );
        })}
      </div>

      {frontDecorations.map((decoration, index) => (
        <ZoneDecoration
          key={`${zone}-front-${index}`}
          decoration={decoration}
        />
      ))}
    </motion.section>
  );
}
