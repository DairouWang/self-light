"use client";

import { useState, type PointerEvent } from "react";
import { useGardenState } from "./GardenStateProvider";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { CentralFountain } from "./CentralFountain";
import { FountainInputModal } from "./FountainInputModal";
import { GardenZone } from "./GardenZone";
import { InsightDetailPanel } from "./InsightDetailPanel";
import { InsightReviewModal } from "./InsightReviewModal";
import { getZonePlacementPoint } from "@/lib/garden/zonePoints";
import { generateInsightMock } from "@/lib/mock/generateInsightMock";
import { ZONE_CONFIG, type DraftInsight } from "@/lib/types/garden";
import type {
  GardenZone as GardenZoneType,
  InsightTile,
} from "@/lib/types/garden";

const floatingMotes = [
  { top: "18%", left: "20%", size: "0.9rem", delay: 0.3 },
  { top: "12%", left: "74%", size: "0.7rem", delay: 1.4 },
  { top: "70%", left: "16%", size: "0.8rem", delay: 0.8 },
  { top: "78%", left: "82%", size: "0.95rem", delay: 1.8 },
  { top: "32%", left: "86%", size: "0.65rem", delay: 1.1 },
];

const zoneMarkerPositions: Record<
  GardenZoneType,
  { className: string; align?: "left" | "right"; side: "left" | "right" }
> = {
  self: {
    className: "left-[0.2%] top-[24%] -translate-x-full -translate-y-1/2",
    align: "right",
    side: "left",
  },
  emotion: {
    className: "right-[0.2%] top-[24%] translate-x-full -translate-y-1/2",
    side: "right",
  },
  relationship: {
    className: "left-[0.2%] top-[74%] -translate-x-full -translate-y-1/2",
    align: "right",
    side: "left",
  },
  direction: {
    className: "right-[0.2%] top-[74%] translate-x-full -translate-y-1/2",
    side: "right",
  },
};

function OuterZoneMarker({
  zone,
  className,
  align = "left",
  side,
}: {
  zone: GardenZoneType;
  className: string;
  align?: "left" | "right";
  side: "left" | "right";
}) {
  const config = ZONE_CONFIG[zone];

  return (
    <motion.div
      className={`pointer-events-none absolute z-40 max-w-[15rem] rounded-[22px] border border-white/45 bg-white/62 px-4 py-2.5 text-[#5c4d42] shadow-[0_16px_34px_rgba(92,77,63,0.14)] backdrop-blur-lg ${className}`}
      initial={{ opacity: 0, x: side === "left" ? 10 : -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ textAlign: align }}
    >
      <p className="font-display text-[1rem] leading-none tracking-[0.03em]">
        {config.label}
      </p>
      <p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-[#7f6e62]">
        {config.subtitle}
      </p>
    </motion.div>
  );
}

function buildInsightTile(
  draftInput: string,
  draftOutput: DraftInsight,
  existingTiles: InsightTile[],
): InsightTile {
  const tilesInZone = existingTiles.filter((tile) => tile.zone === draftOutput.zone);
  const nextPosition = getZonePlacementPoint(draftOutput.zone, tilesInZone.length);

  return {
    id: `tile-${crypto.randomUUID()}`,
    content: draftOutput.content,
    zone: draftOutput.zone,
    createdAt: new Date().toISOString(),
    x: nextPosition.x,
    y: nextPosition.y,
    rawInput: draftInput.trim() || undefined,
  };
}

export function GardenPage() {
  const { tiles, setTiles } = useGardenState();
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [inputOpen, setInputOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [draftInput, setDraftInput] = useState("");
  const [draftOutput, setDraftOutput] = useState<DraftInsight | null>(null);
  const [isRefining, setIsRefining] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const farLayerX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [18, -18]),
    { stiffness: 110, damping: 18 },
  );
  const farLayerY = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [14, -14]),
    { stiffness: 110, damping: 18 },
  );
  const nearLayerX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [10, -10]),
    { stiffness: 140, damping: 22 },
  );
  const nearLayerY = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [8, -8]),
    { stiffness: 140, damping: 22 },
  );

  const selectedTile =
    tiles.find((tile) => tile.id === selectedTileId) ?? null;

  const tilesByZone = (zone: GardenZoneType) =>
    tiles.filter((tile) => tile.zone === zone);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(x);
    pointerY.set(y);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function handleOpenInput() {
    setSelectedTileId(null);
    setReviewOpen(false);
    setErrorMessage(undefined);
    setInputOpen(true);
  }

  function handleCloseInput() {
    if (isRefining) {
      return;
    }

    setInputOpen(false);
    setErrorMessage(undefined);
  }

  async function handleDraftSubmit(input: string) {
    setDraftInput(input);
    setErrorMessage(undefined);
    setIsRefining(true);

    try {
      const nextDraft = await generateInsightMock(input);
      setDraftOutput(nextDraft);
      setInputOpen(false);
      setReviewOpen(true);
    } catch {
      setErrorMessage("The thought could not be refined. Try again.");
    } finally {
      setIsRefining(false);
    }
  }

  function handleEditDraft() {
    setReviewOpen(false);
    setInputOpen(true);
  }

  function handleDiscardDraft() {
    setReviewOpen(false);
    setDraftOutput(null);
    setDraftInput("");
    setErrorMessage(undefined);
  }

  function handleConfirmDraft() {
    if (!draftOutput) {
      return;
    }

    const nextTile = buildInsightTile(draftInput, draftOutput, tiles);

    setTiles((currentTiles) => [...currentTiles, nextTile]);
    setSelectedTileId(nextTile.id);
    setReviewOpen(false);
    setDraftOutput(null);
    setDraftInput("");
    setErrorMessage(undefined);
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden px-2 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5"
      onClick={() => setSelectedTileId(null)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ x: farLayerX, y: farLayerY }}
      >
        <div className="absolute left-[-6%] top-[-12%] h-[38rem] w-[38rem] rounded-full bg-[#fff3de]/80 blur-3xl" />
        <div className="absolute right-[-8%] top-[8%] h-[30rem] w-[30rem] rounded-full bg-[#dfe9cf]/70 blur-3xl" />
        <div className="absolute bottom-[-14%] left-[16%] h-[26rem] w-[26rem] rounded-full bg-[#bfcfa6]/55 blur-3xl" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div
          className="relative aspect-[6/5]"
          style={{
            width: "min(97vw, calc((100svh - 1.5rem) * 1.18), 96rem)",
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <OuterZoneMarker zone="self" {...zoneMarkerPositions.self} />
          <OuterZoneMarker zone="emotion" {...zoneMarkerPositions.emotion} />
          <OuterZoneMarker
            zone="relationship"
            {...zoneMarkerPositions.relationship}
          />
          <OuterZoneMarker
            zone="direction"
            {...zoneMarkerPositions.direction}
          />

          <motion.div
            className="absolute inset-[2.1%] overflow-hidden rounded-[42px] border border-white/45 shadow-[0_30px_80px_rgba(92,77,63,0.16)]"
            style={{ x: nearLayerX, y: nearLayerY }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#eef0de_0%,#dbe4c8_34%,#bcc89f_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,247,228,0.9)_0%,transparent_38%),radial-gradient(circle_at_18%_68%,rgba(160,184,130,0.24)_0%,transparent_32%),radial-gradient(circle_at_86%_78%,rgba(154,179,138,0.2)_0%,transparent_28%)]" />
            <div className="garden-noise absolute inset-0 opacity-30" />
            <div className="pointer-events-none absolute inset-[1.3rem] rounded-[34px] border border-white/16" />
            <div className="pointer-events-none absolute inset-x-[16%] top-[11%] h-[18%] rounded-full bg-white/20 blur-3xl" />

            <motion.div
              className="pointer-events-none absolute inset-[6%]"
              style={{ x: farLayerX, y: farLayerY }}
            >
              {floatingMotes.map((mote) => (
                <motion.span
                  key={`${mote.left}-${mote.top}`}
                  className="absolute rounded-full bg-white/55 blur-[1px]"
                  style={{
                    top: mote.top,
                    left: mote.left,
                    width: mote.size,
                    height: mote.size,
                  }}
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0.15, 0.45, 0.15],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    delay: mote.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24%] w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(circle_at_50%_56%,rgba(107,91,68,0.2)_0%,rgba(132,116,89,0.08)_32%,transparent_72%)] blur-[2px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[19%] w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(255,248,234,0.54)_0%,rgba(228,226,208,0.26)_48%,transparent_100%)] blur-xl" />

            <GardenZone
              zone="self"
              tiles={tilesByZone("self")}
              onTileSelect={setSelectedTileId}
              selectedTileId={selectedTileId}
            />
            <GardenZone
              zone="emotion"
              tiles={tilesByZone("emotion")}
              onTileSelect={setSelectedTileId}
              selectedTileId={selectedTileId}
            />
            <GardenZone
              zone="relationship"
              tiles={tilesByZone("relationship")}
              onTileSelect={setSelectedTileId}
              selectedTileId={selectedTileId}
            />
            <GardenZone
              zone="direction"
              tiles={tilesByZone("direction")}
              onTileSelect={setSelectedTileId}
              selectedTileId={selectedTileId}
            />

            <CentralFountain onOpen={handleOpenInput} />
          </motion.div>
        </div>
      </div>

      <FountainInputModal
        open={inputOpen}
        value={draftInput}
        isSubmitting={isRefining}
        errorMessage={errorMessage}
        onValueChange={setDraftInput}
        onClose={handleCloseInput}
        onSubmit={handleDraftSubmit}
      />

      <InsightReviewModal
        open={reviewOpen}
        draft={draftOutput}
        onEdit={handleEditDraft}
        onDiscard={handleDiscardDraft}
        onConfirm={handleConfirmDraft}
      />

      <InsightDetailPanel
        tile={selectedTile}
        onClose={() => setSelectedTileId(null)}
      />
    </main>
  );
}
