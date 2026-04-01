"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { InsightDetailPanel } from "./InsightDetailPanel";
import { RelationshipGardenCanvas } from "./RelationshipGardenCanvas";
import { relationshipGardenImageAspectRatio } from "@/lib/data/relationshipGardenAssets";
import { useGardenState } from "./GardenStateProvider";

export function RelationshipGardenShowcasePage() {
  const { tiles } = useGardenState();
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const relationshipTiles = tiles.filter((tile) => tile.zone === "relationship");
  const selectedTile =
    relationshipTiles.find((tile) => tile.id === selectedTileId) ?? null;

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-5 sm:px-6 lg:px-8"
      onClick={() => setSelectedTileId(null)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-10%] h-[33rem] w-[33rem] rounded-full bg-[#fff1ea]/82 blur-3xl" />
        <div className="absolute right-[-5%] top-[12%] h-[28rem] w-[28rem] rounded-full bg-[#f3d3cb]/56 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[24%] h-[24rem] w-[24rem] rounded-full bg-[#f7e4c2]/52 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[94rem] flex-col justify-center gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.76rem] uppercase tracking-[0.24em] text-[#817265]">
              Standalone View
            </p>
            <h1 className="mt-2 font-display text-[2.6rem] leading-none text-[#4e4339] sm:text-[3.2rem]">
              Relationship Garden
            </h1>
          </div>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/55 bg-white/58 px-5 text-[0.78rem] uppercase tracking-[0.18em] text-[#6f6155] shadow-[0_12px_28px_rgba(92,77,63,0.12)] backdrop-blur-lg transition hover:bg-white/74"
            onClick={(event) => event.stopPropagation()}
          >
            Back to Garden Map
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <motion.section
            className="relative overflow-visible"
            data-relationship-showcase
            style={{ aspectRatio: `${relationshipGardenImageAspectRatio}` }}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0">
              <RelationshipGardenCanvas
                tiles={relationshipTiles}
                onTileSelect={setSelectedTileId}
                selectedTileId={selectedTileId}
              />
            </div>
          </motion.section>

          <aside className="rounded-[34px] border border-white/45 bg-white/56 p-5 text-[#5a4c40] shadow-[0_18px_40px_rgba(92,77,63,0.12)] backdrop-blur-lg">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#857467]">
              Garden Notes
            </p>
            <p className="mt-3 font-display text-[1.45rem] leading-none">
              A focused view of the Relationship zone.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#6e6054]">
              The decorative base and the interactive flower bricks share the
              same canvas, so tile placement stays aligned between the overview
              and the standalone route.
            </p>
            <div className="mt-5 rounded-[24px] border border-white/45 bg-white/48 px-4 py-4">
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#8b7a6d]">
                Visible Tiles
              </p>
              <p className="mt-2 font-display text-[2rem] leading-none text-[#4f4338]">
                {relationshipTiles.length}
              </p>
            </div>
          </aside>
        </div>
      </div>

      <InsightDetailPanel
        tile={selectedTile}
        onClose={() => setSelectedTileId(null)}
      />
    </main>
  );
}
