"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import selfWoodTileImage from "@/lib/assets/self-garden/wood-tile-transparent.png";
import {
  emotionStoneAssets,
  emotionStoneAssetKeys,
  getEmotionStoneAspectRatio,
  type EmotionStoneAssetKey,
  emotionStoneSlotWidthPercent,
} from "@/lib/data/emotionGardenAssets";
import {
  directionStoneBrickAsset,
  directionStoneBrickAspectRatio,
  directionTileImageWidthPercent,
  directionTileSlotWidthPercent,
} from "@/lib/data/directionGardenAssets";
import {
  relationshipFlowerBrickAsset,
  relationshipFlowerBrickAspectRatio,
  relationshipTileImageWidthPercent,
  relationshipTileSlotWidthPercent,
} from "@/lib/data/relationshipGardenAssets";
import type { GardenZone, Point } from "@/lib/types/garden";

const LABEL_STYLE: Record<GardenZone, string> = {
  self: "text-[#fff9de]/92 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]",
  emotion: "text-[#effaf7]/92 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]",
  relationship: "text-[#fff0ea]/92 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]",
  direction: "text-[#f4f7e7]/92 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]",
};

type PreviewSize = {
  widthPercent: number;
  heightPercent: number;
};

function roundCoordinate(value: number) {
  return Number(value.toFixed(1));
}

function getEmotionDebugAssetKey(index: number): EmotionStoneAssetKey {
  return emotionStoneAssetKeys[(index * 7 + 1) % emotionStoneAssetKeys.length];
}

function getPreviewSize(zone: GardenZone, index: number): PreviewSize {
  if (zone === "self") {
    return {
      widthPercent: (104 / 700) * 100,
      heightPercent: (62 / 420) * 100,
    };
  }

  if (zone === "emotion") {
    const assetKey = getEmotionDebugAssetKey(index);
    const aspectRatio = getEmotionStoneAspectRatio(assetKey);
    const debugEmotionWidthPercent = emotionStoneSlotWidthPercent - 1.2;

    return {
      widthPercent: debugEmotionWidthPercent,
      heightPercent: debugEmotionWidthPercent / aspectRatio,
    };
  }

  if (zone === "relationship") {
    return {
      widthPercent: relationshipTileSlotWidthPercent,
      heightPercent:
        relationshipTileSlotWidthPercent / relationshipFlowerBrickAspectRatio,
    };
  }

  const debugDirectionWidthPercent = directionTileSlotWidthPercent - 1.2;

  return {
    widthPercent: debugDirectionWidthPercent,
    heightPercent: debugDirectionWidthPercent / directionStoneBrickAspectRatio,
  };
}

function DebugTileVisual({
  zone,
  index,
  isUsedPoint,
}: {
  zone: GardenZone;
  index: number;
  isUsedPoint: boolean;
}) {
  const wrapperOpacity = isUsedPoint ? "opacity-100" : "opacity-45";
  const ringOpacity = isUsedPoint
    ? "border-white/46 opacity-100"
    : "border-white/18 opacity-70";

  if (zone === "self") {
    return (
      <>
        <span className="absolute inset-x-[16%] top-[16%] h-[18%] rounded-full bg-[#f6e0ae]/40 blur-[10px]" />
        <span className="absolute inset-x-[10%] bottom-[-10%] h-[28%] rounded-full bg-black/22 blur-[8px]" />
        <span
          className={`absolute inset-[-5%] rounded-full border transition-opacity ${ringOpacity}`}
        />
        <span className={`absolute inset-[-10%] ${wrapperOpacity}`}>
          <Image
            src={selfWoodTileImage}
            alt=""
            aria-hidden="true"
            fill
            className="object-contain drop-shadow-[0_8px_16px_rgba(69,46,23,0.16)]"
            sizes="(max-width: 768px) 14vw, 7vw"
          />
        </span>
      </>
    );
  }

  if (zone === "emotion") {
    const assetKey = getEmotionDebugAssetKey(index);

    return (
      <>
        <span className="absolute inset-x-[16%] top-[18%] h-[18%] rounded-full bg-[#f6efe1]/34 blur-[10px]" />
        <span className="absolute inset-x-[14%] bottom-[-10%] h-[26%] rounded-full bg-black/18 blur-[8px]" />
        <span
          className={`absolute inset-[-5%] rounded-full border transition-opacity ${ringOpacity}`}
        />
        <span className={`absolute inset-0 overflow-visible ${wrapperOpacity}`}>
          <Image
            src={emotionStoneAssets[assetKey]}
            alt=""
            aria-hidden="true"
            fill
            className="object-contain drop-shadow-[0_10px_18px_rgba(85,75,58,0.2)]"
            sizes="(max-width: 768px) 16vw, 9vw"
          />
        </span>
      </>
    );
  }

  if (zone === "relationship") {
    return (
      <>
        <span className="absolute inset-0 rounded-[1.6rem] border border-white/18" />
        <span className="absolute bottom-[2%] right-[4%] h-[16%] w-[72%] rounded-full bg-black/18 blur-[8px]" />
        <span
          className={`absolute inset-[4%] rounded-[1.7rem] border transition-opacity ${ringOpacity}`}
        />
        <span className={`absolute inset-0 overflow-visible ${wrapperOpacity}`}>
          <Image
            src={relationshipFlowerBrickAsset}
            alt=""
            aria-hidden="true"
            width={relationshipFlowerBrickAsset.width}
            height={relationshipFlowerBrickAsset.height}
            className="h-auto w-full drop-shadow-[0_10px_18px_rgba(102,67,60,0.18)]"
            style={{
              width: `${relationshipTileImageWidthPercent}%`,
              margin: "0 auto",
            }}
          />
        </span>
      </>
    );
  }

  return (
    <>
      <span className="absolute bottom-[2%] right-[4%] h-[16%] w-[72%] rounded-full bg-black/18 blur-[8px]" />
      <span
        className={`absolute inset-[4%] rounded-[1.5rem] border transition-opacity ${ringOpacity}`}
      />
      <span className={`absolute inset-0 overflow-visible ${wrapperOpacity}`}>
        <Image
          src={directionStoneBrickAsset}
          alt=""
          aria-hidden="true"
          width={directionStoneBrickAsset.width}
          height={directionStoneBrickAsset.height}
          className="h-auto w-full drop-shadow-[0_10px_18px_rgba(79,84,68,0.18)]"
          style={{
            width: `${directionTileImageWidthPercent}%`,
            margin: "0 auto",
          }}
        />
      </span>
    </>
  );
}

export function PathDebugOverlay({
  zone,
  points,
  usedCount,
}: {
  zone: GardenZone;
  points: readonly Point[];
  usedCount: number;
}) {
  return (
    <div
      className="absolute inset-0 z-30 overflow-visible cursor-crosshair"
      data-path-debug-overlay={zone}
      onClick={(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }

        event.stopPropagation();

        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        console.log({
          x: roundCoordinate(x),
          y: roundCoordinate(y),
          zone,
        });
      }}
    >
      {points.map((point, index) => {
        const isUsedPoint = index < usedCount;
        const previewSize = getPreviewSize(zone, index);

        return (
          <motion.button
            key={`${zone}-point-${index}`}
            type="button"
            className="absolute transition-opacity"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${previewSize.widthPercent}%`,
              height: `${previewSize.heightPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={(event) => {
              event.stopPropagation();

              console.log({
                x: roundCoordinate(point.x),
                y: roundCoordinate(point.y),
                index,
                zone,
              });
            }}
            aria-label={`Debug tile ${index} for ${zone}`}
          >
            <div className="relative h-full w-full">
              <DebugTileVisual
                zone={zone}
                index={index}
                isUsedPoint={isUsedPoint}
              />
              <span
                className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.6rem] font-medium tracking-[0.08em] ${LABEL_STYLE[zone]}`}
              >
                <span className="px-1 text-[0.56rem] leading-none">
                  #{index}
                </span>
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
