"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  formatGardenZone,
  type InsightTile,
} from "@/lib/types/garden";

function formatInsightDate(createdAt: string) {
  return new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function InsightDetailPanel({
  tile,
  onClose,
}: {
  tile: InsightTile | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {tile ? (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="pointer-events-auto relative w-full max-w-[34rem] rounded-[30px] border border-white/45 bg-[linear-gradient(180deg,rgba(255,252,246,0.96)_0%,rgba(242,235,220,0.95)_100%)] p-5 text-[#52463b] shadow-[0_24px_60px_rgba(77,61,48,0.25)] backdrop-blur-xl sm:p-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#8a7869]">
                  Detail
                </p>
                <p className="mt-2 rounded-[20px] bg-white/55 px-4 py-3 text-[1.02rem] leading-relaxed text-[#4e4238] shadow-[inset_0_1px_0_rgba(255,255,255,0.42)] sm:text-[1.08rem]">
                  {tile.content}
                </p>
              </div>

              <button
                type="button"
                className="rounded-full border border-white/55 bg-white/50 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7b6b5f] transition hover:bg-white/70"
                onClick={onClose}
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-[#847467]">
              <span className="rounded-full border border-white/50 bg-white/45 px-3 py-1.5">
                {formatGardenZone(tile.zone)}
              </span>
              <span className="rounded-full border border-white/50 bg-white/45 px-3 py-1.5">
                {formatInsightDate(tile.createdAt)}
              </span>
            </div>

            {tile.rawInput ? (
              <div className="mt-4 rounded-[24px] border border-white/45 bg-white/42 px-4 py-3 text-sm leading-relaxed text-[#6f6155]">
                {tile.rawInput}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
