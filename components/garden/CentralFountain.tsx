"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const fountainAssetPath = "/fountain-transparent.png";

const sparklePositions = [
  { top: "18%", left: "30%", delay: 0.2 },
  { top: "22%", left: "70%", delay: 0.9 },
  { top: "44%", left: "19%", delay: 1.4 },
  { top: "56%", left: "78%", delay: 0.6 },
  { top: "70%", left: "32%", delay: 1.8 },
];

const fountainMaskStyle: CSSProperties = {
  WebkitMaskImage: `url(${fountainAssetPath})`,
  maskImage: `url(${fountainAssetPath})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

export function CentralFountain({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[-4.8rem] w-[13.5rem] -translate-x-1/2 rounded-[24px] border border-white/40 bg-white/46 px-4 py-2.5 text-center text-[#5f5146] shadow-[0_14px_28px_rgba(92,77,63,0.12)] backdrop-blur-md"
        animate={{ y: [0, -5, 0], opacity: [0.92, 1, 0.92] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-display text-[1.05rem] leading-none tracking-[0.02em]">
          Turn a thought
        </p>
        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#857467]">
          into one clear tile
        </p>
      </motion.div>

      <motion.button
        type="button"
        aria-label="Offer a thought at the fountain"
        className="group relative block h-[clamp(12.25rem,19vw,15.25rem)] w-[clamp(12.25rem,19vw,15.25rem)] cursor-pointer"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          onOpen();
        }}
        whileHover={{
          y: -4,
          scale: 1.02,
          transition: { type: "spring", stiffness: 220, damping: 18 },
        }}
        whileTap={{ scale: 0.985 }}
      >
        <motion.span
          className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(187,227,220,0.62)_0%,rgba(187,227,220,0.28)_42%,transparent_76%)] blur-3xl transition-opacity duration-300 group-hover:opacity-100"
          animate={{ scale: [0.94, 1.06, 0.94], opacity: [0.42, 0.68, 0.42] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute bottom-[11%] left-1/2 h-[17%] w-[62%] -translate-x-1/2 rounded-full bg-[rgba(56,46,35,0.28)] blur-[13px]"
          animate={{ scaleX: [0.94, 1.04, 0.94], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute left-1/2 top-[63%] h-[28%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.34)_0%,rgba(190,236,240,0.18)_42%,transparent_76%)] blur-xl"
          animate={{ scale: [0.96, 1.08, 0.96], opacity: [0.18, 0.34, 0.18] }}
          transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
        />
        {[0, 1].map((index) => (
          <motion.span
            key={index}
            className="absolute left-1/2 top-[63%] rounded-full border border-white/18"
            initial={{ width: "30%", height: "10%", opacity: 0.18 }}
            animate={{
              width: ["30%", "54%", "30%"],
              height: ["10%", "16%", "10%"],
              opacity: [0.1, 0.22, 0.1],
            }}
            transition={{
              duration: 4,
              delay: index * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ translateX: "-50%", translateY: "-50%" }}
          />
        ))}
        <motion.span
          className="absolute inset-[12%] rounded-full border border-white/24 opacity-0 transition-opacity duration-250 group-hover:opacity-100"
          animate={{ scale: [0.985, 1.015, 0.985] }}
          transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-[3%]">
          <motion.span
            className="absolute inset-0 bg-[linear-gradient(104deg,transparent_12%,rgba(255,255,255,0.12)_32%,rgba(222,247,248,0.4)_48%,rgba(255,255,255,0.12)_62%,transparent_82%)] mix-blend-screen"
            style={fountainMaskStyle}
            animate={{
              opacity: [0.18, 0.28, 0.18],
              x: [-10, 18, -4],
              y: [2, -3, 1],
            }}
            transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute inset-0 bg-[radial-gradient(circle_at_52%_68%,rgba(255,255,255,0.34)_0%,rgba(203,240,241,0.22)_22%,transparent_52%)] mix-blend-screen"
            style={fountainMaskStyle}
            animate={{ opacity: [0.16, 0.32, 0.16], scale: [0.99, 1.03, 0.99] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute inset-0 bg-[radial-gradient(circle_at_38%_30%,rgba(255,255,255,0.28)_0%,transparent_40%)] mix-blend-screen"
            style={fountainMaskStyle}
            animate={{ opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 4.9, repeat: Infinity, ease: "easeInOut" }}
          />

          <Image
            src={fountainAssetPath}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="(max-width: 640px) 196px, (max-width: 1200px) 236px, 252px"
            className="pointer-events-none scale-[1.08] object-contain drop-shadow-[0_18px_24px_rgba(76,63,48,0.2)] sm:scale-[1.1]"
          />
        </div>

        {sparklePositions.map((sparkle, index) => (
          <motion.span
            key={`${sparkle.left}-${sparkle.top}-${index}`}
            className="absolute h-2 w-2 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.9)]"
            style={{ top: sparkle.top, left: sparkle.left }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.span
          className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_0%,transparent_72%)] opacity-0 group-hover:opacity-100"
          whileTap={{ opacity: 0.6, scale: 1.08 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        />

      </motion.button>

      <motion.div
        className="pointer-events-none absolute bottom-[-2.2rem] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/38 bg-white/40 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-[#7c6c60] shadow-[0_12px_28px_rgba(92,77,63,0.1)] backdrop-blur-md"
        animate={{ y: [0, -3, 0], opacity: [0.88, 1, 0.88] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      >
        Inspiration Fountain
      </motion.div>
    </div>
  );
}
