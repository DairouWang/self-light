"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { emotionGardenBaseAsset } from "@/lib/data/emotionGardenAssets";

export function EmotionGardenLayeredScene({
  imageClassName,
}: {
  imageClassName?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      <div className="absolute inset-0">
        <Image
          src={emotionGardenBaseAsset}
          alt=""
          aria-hidden="true"
          fill
          className={cn(
            "object-contain drop-shadow-[0_16px_24px_rgba(88,79,62,0.18)]",
            imageClassName,
          )}
          sizes="(max-width: 768px) 78vw, 38vw"
        />
      </div>
    </div>
  );
}
