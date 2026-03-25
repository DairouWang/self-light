"use client";

import Image from "next/image";
import { emotionGardenBaseAsset } from "@/lib/data/emotionGardenAssets";

export function EmotionGardenLayeredScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      <div className="absolute inset-0">
        <Image
          src={emotionGardenBaseAsset}
          alt=""
          aria-hidden="true"
          fill
          className="object-contain drop-shadow-[0_16px_24px_rgba(88,79,62,0.18)]"
          sizes="(max-width: 768px) 78vw, 38vw"
        />
      </div>
    </div>
  );
}
