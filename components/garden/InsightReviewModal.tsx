"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  formatGardenZone,
  type DraftInsight,
} from "@/lib/types/garden";

type InsightReviewModalProps = {
  open: boolean;
  draft: DraftInsight | null;
  onEdit: () => void;
  onDiscard: () => void;
  onConfirm: () => void;
};

export function InsightReviewModal({
  open,
  draft,
  onEdit,
  onDiscard,
  onConfirm,
}: InsightReviewModalProps) {
  return (
    <AnimatePresence>
      {open && draft ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[rgba(70,57,45,0.18)] backdrop-blur-md" />

          <motion.div
            className="relative z-10 w-full max-w-[30rem] rounded-[32px] border border-white/45 bg-[linear-gradient(180deg,rgba(255,252,246,0.95)_0%,rgba(244,237,224,0.94)_100%)] p-5 text-[#52463b] shadow-[0_28px_70px_rgba(77,61,48,0.22)] sm:p-6"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-[18%] top-[-16%] h-32 rounded-full bg-white/55 blur-3xl" />

            <div className="relative">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#8a7869]">
                Review
              </p>

              <div className="mt-4 rounded-[28px] border border-white/55 bg-white/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                <p className="text-[1.2rem] leading-relaxed text-[#4e4238] sm:text-[1.34rem]">
                  {draft.content}
                </p>
                <p className="mt-4 text-[0.8rem] uppercase tracking-[0.2em] text-[#8b7a6d]">
                  Zone: {formatGardenZone(draft.zone)}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-full border-white/50 bg-white/45 px-5 text-[#66584c] hover:bg-white/70"
                  onClick={onEdit}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-full border-[#caa79a]/40 bg-[#f2e3dc] px-5 text-[#8f5f56] hover:bg-[#edd8d0]"
                  onClick={onDiscard}
                >
                  Discard
                </Button>
                <Button
                  type="button"
                  className="h-11 rounded-full border border-[#728563]/20 bg-[#6f8561] px-5 text-[#fcf8ef] shadow-[0_16px_28px_rgba(111,133,97,0.28)] hover:bg-[#637956]"
                  onClick={onConfirm}
                >
                  Place in Garden
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
