"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { InsightDetailPanel } from "./InsightDetailPanel";
import { SelfGardenCanvas } from "./SelfGardenCanvas";
import { useGardenState } from "./GardenStateProvider";

export function SelfGardenShowcasePage() {
  const { tiles } = useGardenState();
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const selfTiles = tiles.filter((tile) => tile.zone === "self");
  const selectedTile =
    selfTiles.find((tile) => tile.id === selectedTileId) ?? null;

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-5 sm:px-6 lg:px-8"
      onClick={() => setSelectedTileId(null)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-[#fff3de]/80 blur-3xl" />
        <div className="absolute right-[-4%] top-[6%] h-[28rem] w-[28rem] rounded-full bg-[#dfe9cf]/70 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[22%] h-[22rem] w-[22rem] rounded-full bg-[#c5d4ab]/60 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[90rem] flex-col justify-center gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.76rem] uppercase tracking-[0.24em] text-[#817265]">
              Standalone View
            </p>
            <h1 className="mt-2 font-display text-[2.6rem] leading-none text-[#4e4339] sm:text-[3.2rem]">
              Self Garden
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
            className="relative aspect-[5/4] overflow-hidden rounded-[42px] border border-white/50 bg-[linear-gradient(180deg,#eef0de_0%,#dbe4c8_34%,#bcc89f_100%)] shadow-[0_30px_80px_rgba(92,77,63,0.16)]"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,247,228,0.9)_0%,transparent_38%),radial-gradient(circle_at_18%_68%,rgba(160,184,130,0.24)_0%,transparent_32%),radial-gradient(circle_at_86%_78%,rgba(154,179,138,0.2)_0%,transparent_28%)]" />
            <div className="garden-noise absolute inset-0 opacity-30" />
            <div className="pointer-events-none absolute inset-[1.3rem] rounded-[34px] border border-white/16" />
            <div className="pointer-events-none absolute inset-x-[20%] top-[9%] h-[18%] rounded-full bg-white/24 blur-3xl" />

            <div className="absolute inset-[7%]">
              <SelfGardenCanvas
                tiles={selfTiles}
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
              A focused view of the Self zone.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#6e6054]">
              This page is dedicated to the Self Garden only. The decorative
              PNG base remains unchanged, and the tiles keep their spatial
              positions.
            </p>
            <div className="mt-5 rounded-[24px] border border-white/45 bg-white/48 px-4 py-4">
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#8b7a6d]">
                Visible Tiles
              </p>
              <p className="mt-2 font-display text-[2rem] leading-none text-[#4f4338]">
                {selfTiles.length}
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
