"use client";

import {
  useEffect,
  useRef,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FountainInputModalProps = {
  open: boolean;
  value: string;
  isSubmitting?: boolean;
  errorMessage?: string;
  onValueChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (input: string) => void;
};

export function FountainInputModal({
  open,
  value,
  isSubmitting = false,
  errorMessage,
  onValueChange,
  onClose,
  onSubmit,
}: FountainInputModalProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const trimmedValue = value.trim();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(value.length, value.length);
    }, 120);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSubmitting, onClose, open, value.length]);

  function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (!trimmedValue || isSubmitting) {
      return;
    }

    onSubmit(trimmedValue);
  }

  function handleTextareaKeyDown(
    event: ReactKeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close fountain input"
            className="absolute inset-0 cursor-default bg-[rgba(70,57,45,0.2)] backdrop-blur-md"
            onClick={() => {
              if (!isSubmitting) {
                onClose();
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="fountain-input-title"
            className="relative z-10 w-full max-w-[34rem] overflow-hidden rounded-[32px] border border-white/45 bg-[linear-gradient(180deg,rgba(255,251,243,0.92)_0%,rgba(245,239,225,0.9)_100%)] p-5 text-[#52463b] shadow-[0_28px_70px_rgba(77,61,48,0.22)] backdrop-blur-xl sm:p-6"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-[16%] top-[-18%] h-40 rounded-full bg-white/55 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#8a7869]">
                    Inspiration Fountain
                  </p>
                  <h2
                    id="fountain-input-title"
                    className="mt-2 font-display text-[2rem] leading-none tracking-[0.02em] text-[#4f4338] sm:text-[2.2rem]"
                  >
                    Pour a thought into the garden
                  </h2>
                </div>

                <button
                  type="button"
                  className="rounded-full border border-white/55 bg-white/50 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7b6b5f] transition hover:bg-white/70"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Close
                </button>
              </div>

              <p className="mt-4 max-w-[28rem] text-sm leading-relaxed text-[#6d5e52] sm:text-[0.96rem]">
                Keep it simple. The garden will turn the thought into one clear
                realization.
              </p>

              <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <div className="rounded-[28px] border border-white/45 bg-white/55 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                  <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(event) => onValueChange(event.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                    placeholder="What did you just realize?"
                    className={cn(
                      "min-h-40 w-full resize-none rounded-[22px] border border-transparent bg-[rgba(255,252,247,0.72)] px-4 py-3 text-[0.98rem] leading-relaxed text-[#4d4037] shadow-[inset_0_1px_0_rgba(255,255,255,0.34)] outline-none transition placeholder:text-[#9a8a7e] focus:border-[#d7c8b4] focus:bg-white",
                      errorMessage && "border-[#c98b7c]/70",
                    )}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-h-5 text-[0.78rem] text-[#8a7869]">
                    {errorMessage ? (
                      <span className="text-[#a76457]">{errorMessage}</span>
                    ) : (
                      "Press Enter to refine it, or Shift+Enter for a new line."
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={!trimmedValue || isSubmitting}
                    className="h-11 rounded-full border border-[#728563]/20 bg-[#6f8561] px-5 text-sm font-semibold text-[#fcf8ef] shadow-[0_16px_28px_rgba(111,133,97,0.28)] transition hover:bg-[#637956] disabled:bg-[#92a189]"
                  >
                    {isSubmitting ? "Refining..." : "Refine it"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
