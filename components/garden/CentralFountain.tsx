"use client";

import { motion } from "framer-motion";

const sparklePositions = [
  { top: "18%", left: "34%", delay: 0.1 },
  { top: "24%", left: "68%", delay: 0.8 },
  { top: "52%", left: "26%", delay: 1.2 },
  { top: "60%", left: "70%", delay: 0.5 },
  { top: "42%", left: "54%", delay: 1.6 },
];

export function CentralFountain() {
  return (
    <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[-4.4rem] w-[14rem] -translate-x-1/2 rounded-[26px] border border-white/45 bg-white/55 px-4 py-3 text-center text-[#5f5146] shadow-[0_16px_34px_rgba(92,77,63,0.18)] backdrop-blur-lg"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-display text-[1.2rem] leading-none tracking-[0.02em]">
          Pour a thought
        </p>
        <p className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-[#857467]">
          each insight becomes a path tile
        </p>
      </motion.div>

      <motion.button
        type="button"
        aria-label="Open the inspiration fountain"
        className="group relative block h-[clamp(8.8rem,13.5vw,10.8rem)] w-[clamp(8.8rem,13.5vw,10.8rem)] cursor-pointer"
        onClick={(event) => event.stopPropagation()}
        whileHover={{
          y: -4,
          scale: 1.02,
          transition: { type: "spring", stiffness: 220, damping: 18 },
        }}
      >
        <motion.span
          className="absolute inset-[-10%] rounded-full bg-[#a6d6d1]/35 blur-3xl"
          animate={{ scale: [0.94, 1.08, 0.94], opacity: [0.55, 0.92, 0.55] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.62)_0%,rgba(214,223,213,0.42)_48%,rgba(182,179,166,0.9)_100%)] shadow-[0_22px_36px_rgba(82,70,55,0.18)]" />
        <div className="absolute inset-[16%] rounded-full border border-white/40 bg-[radial-gradient(circle_at_44%_34%,rgba(205,245,248,0.94)_0%,rgba(118,189,198,0.94)_42%,rgba(82,146,160,0.98)_100%)] shadow-[inset_0_10px_18px_rgba(255,255,255,0.25),0_12px_20px_rgba(78,128,140,0.18)]" />
        <div className="absolute inset-[26%] rounded-full border border-white/35 bg-[radial-gradient(circle_at_44%_34%,rgba(241,253,255,0.98)_0%,rgba(184,229,239,0.96)_44%,rgba(126,188,208,0.98)_100%)]">
          <motion.span
            className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.95)]"
            animate={{ scale: [0.86, 1.2, 0.86], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="absolute left-1/2 top-1/2 rounded-full border border-white/28"
            initial={{ width: 52, height: 52, opacity: 0.46 }}
            animate={{ width: 132, height: 132, opacity: 0 }}
            transition={{
              duration: 3.4,
              delay: index * 0.9,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{ translateX: "-50%", translateY: "-50%" }}
          />
        ))}

        {sparklePositions.map((sparkle, index) => (
          <motion.span
            key={`${sparkle.left}-${sparkle.top}-${index}`}
            className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.95)]"
            style={{ top: sparkle.top, left: sparkle.left }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.6,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute bottom-[-10%] left-1/2 h-[20%] w-[76%] -translate-x-1/2 rounded-full bg-black/18 blur-[10px]" />
      </motion.button>

      <motion.div
        className="pointer-events-none absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/35 bg-white/40 px-4 py-2 text-[0.72rem] uppercase tracking-[0.24em] text-[#7c6c60] backdrop-blur-md"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Inspiration Fountain
      </motion.div>
    </div>
  );
}
