"use client";

import Image from "next/image";
import baseImage from "@/lib/assets/self-garden/base-transparent.png";

export function SelfGardenLayeredScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      <div className="absolute inset-[-2%]">
        <Image
          src={baseImage}
          alt=""
          aria-hidden="true"
          fill
          className="object-contain opacity-98 saturate-115 drop-shadow-[0_18px_24px_rgba(48,60,34,0.24)]"
          sizes="(max-width: 768px) 42vw, 24vw"
        />
      </div>

      <div className="absolute inset-[4%] bg-[radial-gradient(circle_at_42%_18%,rgba(255,246,220,0.18)_0%,transparent_26%)]" />
    </div>
  );
}
