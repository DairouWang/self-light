import type { CSSProperties } from "react";

export type GardenZone = "self" | "emotion" | "relationship" | "direction";

export type PathMaterial =
  | "wood"
  | "river-stone"
  | "flower-brick"
  | "stone-brick";

export type DecorationKind =
  | "tree"
  | "log"
  | "moss"
  | "stream"
  | "reeds"
  | "stone"
  | "flower-bed"
  | "lantern"
  | "hedge"
  | "topiary"
  | "pillar";

export type Insight = {
  id: string;
  rawInput: string;
  scene: string;
  emotion: string;
  insight: string;
  action: string;
  zone: GardenZone;
  createdAt: string;
};

export type PathTile = {
  id: string;
  insightId: string;
  zone: GardenZone;
  x: number;
  y: number;
  material: PathMaterial;
};

export type GardenDecoration = {
  kind: DecorationKind;
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  width?: number;
  height?: number;
  layer?: "back" | "front";
};

export type ZoneConfig = {
  label: string;
  subtitle: string;
  material: PathMaterial;
  style: CSSProperties;
  labelStyle: CSSProperties;
  clipPath: string;
  surface: string;
  mist: string;
  pathOrigin: { x: number; y: number };
  pathVector: { x: number; y: number };
  rowVector: { x: number; y: number };
  decorations: GardenDecoration[];
};

export const ZONE_CONFIG: Record<GardenZone, ZoneConfig> = {
  self: {
    label: "Self-Growth Zone",
    subtitle: "forest path • wood planks • moss",
    material: "wood",
    style: {
      top: "8.5%",
      left: "2.8%",
      width: "42%",
      height: "35%",
      zIndex: 2,
    },
    labelStyle: {
      top: "6%",
      left: "10%",
    },
    clipPath: "polygon(10% 8%, 88% 2%, 100% 34%, 88% 90%, 24% 100%, 0% 52%)",
    surface:
      "radial-gradient(circle at 24% 22%, rgba(205, 226, 177, 0.45) 0%, transparent 32%), radial-gradient(circle at 68% 72%, rgba(86, 121, 76, 0.18) 0%, transparent 36%), linear-gradient(180deg, rgba(141, 164, 121, 0.92) 0%, rgba(105, 128, 92, 0.96) 100%)",
    mist:
      "radial-gradient(circle at 32% 18%, rgba(241, 247, 227, 0.4) 0%, transparent 48%), radial-gradient(circle at 78% 48%, rgba(91, 112, 76, 0.16) 0%, transparent 42%)",
    pathOrigin: { x: 61, y: 69 },
    pathVector: { x: -11, y: -13 },
    rowVector: { x: -5, y: 8 },
    decorations: [
      { kind: "tree", x: 18, y: 22, scale: 1.05, layer: "back" },
      { kind: "tree", x: 31, y: 14, scale: 0.82, layer: "back" },
      { kind: "tree", x: 84, y: 70, scale: 1.02, layer: "back" },
      { kind: "log", x: 74, y: 28, scale: 1, rotate: -14, layer: "front" },
      { kind: "moss", x: 44, y: 42, scale: 0.94, layer: "front" },
      { kind: "moss", x: 22, y: 76, scale: 1.08, layer: "front" },
      { kind: "stone", x: 64, y: 86, scale: 0.88, layer: "front" },
    ],
  },
  emotion: {
    label: "Emotion Zone",
    subtitle: "river stones • soft stream • calm plants",
    material: "river-stone",
    style: {
      top: "9%",
      right: "2.8%",
      width: "41%",
      height: "34%",
      zIndex: 2,
    },
    labelStyle: {
      top: "8%",
      right: "10%",
    },
    clipPath: "polygon(14% 6%, 92% 12%, 100% 54%, 86% 92%, 18% 100%, 4% 44%)",
    surface:
      "radial-gradient(circle at 32% 24%, rgba(236, 243, 233, 0.38) 0%, transparent 28%), radial-gradient(circle at 76% 62%, rgba(146, 178, 157, 0.2) 0%, transparent 32%), linear-gradient(180deg, rgba(174, 191, 171, 0.94) 0%, rgba(141, 162, 149, 0.96) 100%)",
    mist:
      "radial-gradient(circle at 50% 28%, rgba(243, 248, 243, 0.34) 0%, transparent 42%), radial-gradient(circle at 20% 70%, rgba(109, 144, 131, 0.16) 0%, transparent 36%)",
    pathOrigin: { x: 36, y: 72 },
    pathVector: { x: 12, y: -11 },
    rowVector: { x: 5, y: 7 },
    decorations: [
      {
        kind: "stream",
        x: 52,
        y: 56,
        width: 64,
        height: 20,
        rotate: -8,
        layer: "back",
      },
      { kind: "reeds", x: 20, y: 34, scale: 0.9, layer: "front" },
      { kind: "reeds", x: 76, y: 70, scale: 1.05, layer: "front" },
      { kind: "stone", x: 64, y: 24, scale: 1.12, layer: "front" },
      { kind: "stone", x: 82, y: 46, scale: 0.9, layer: "front" },
      { kind: "lantern", x: 90, y: 34, scale: 0.88, layer: "front" },
    ],
  },
  relationship: {
    label: "Relationship Zone",
    subtitle: "flower tiles • warm petals • shared warmth",
    material: "flower-brick",
    style: {
      bottom: "7.5%",
      left: "2.2%",
      width: "43%",
      height: "33%",
      zIndex: 3,
    },
    labelStyle: {
      bottom: "8%",
      left: "10%",
    },
    clipPath: "polygon(8% 18%, 78% 2%, 100% 44%, 88% 94%, 14% 100%, 0% 56%)",
    surface:
      "radial-gradient(circle at 22% 24%, rgba(251, 228, 214, 0.46) 0%, transparent 30%), radial-gradient(circle at 76% 66%, rgba(214, 149, 131, 0.2) 0%, transparent 32%), linear-gradient(180deg, rgba(220, 177, 156, 0.94) 0%, rgba(194, 142, 124, 0.96) 100%)",
    mist:
      "radial-gradient(circle at 62% 30%, rgba(255, 244, 237, 0.34) 0%, transparent 44%), radial-gradient(circle at 24% 76%, rgba(180, 98, 89, 0.14) 0%, transparent 38%)",
    pathOrigin: { x: 62, y: 36 },
    pathVector: { x: -11, y: 11 },
    rowVector: { x: -5, y: 8 },
    decorations: [
      { kind: "flower-bed", x: 20, y: 26, scale: 1, layer: "front" },
      { kind: "flower-bed", x: 76, y: 74, scale: 1.08, layer: "front" },
      { kind: "flower-bed", x: 84, y: 24, scale: 0.9, layer: "back" },
      { kind: "lantern", x: 54, y: 78, scale: 0.86, layer: "front" },
      { kind: "moss", x: 34, y: 72, scale: 0.92, layer: "front" },
      { kind: "stone", x: 66, y: 54, scale: 0.82, layer: "front" },
    ],
  },
  direction: {
    label: "Life Direction Zone",
    subtitle: "stone brick • clipped hedges • quiet order",
    material: "stone-brick",
    style: {
      right: "2.8%",
      bottom: "7%",
      width: "41.5%",
      height: "34%",
      zIndex: 3,
    },
    labelStyle: {
      bottom: "8%",
      right: "10%",
    },
    clipPath: "polygon(10% 10%, 92% 4%, 100% 48%, 90% 92%, 18% 100%, 2% 58%)",
    surface:
      "radial-gradient(circle at 28% 18%, rgba(227, 232, 214, 0.42) 0%, transparent 30%), radial-gradient(circle at 70% 76%, rgba(117, 136, 109, 0.18) 0%, transparent 30%), linear-gradient(180deg, rgba(182, 190, 166, 0.94) 0%, rgba(146, 156, 135, 0.96) 100%)",
    mist:
      "radial-gradient(circle at 58% 28%, rgba(245, 247, 238, 0.34) 0%, transparent 42%), radial-gradient(circle at 22% 70%, rgba(109, 121, 102, 0.12) 0%, transparent 36%)",
    pathOrigin: { x: 38, y: 34 },
    pathVector: { x: 12, y: 10 },
    rowVector: { x: 4, y: 8 },
    decorations: [
      {
        kind: "hedge",
        x: 20,
        y: 24,
        width: 28,
        height: 14,
        layer: "front",
      },
      {
        kind: "hedge",
        x: 78,
        y: 76,
        width: 24,
        height: 14,
        layer: "front",
      },
      { kind: "topiary", x: 82, y: 24, scale: 0.96, layer: "front" },
      { kind: "topiary", x: 20, y: 78, scale: 1.02, layer: "front" },
      { kind: "pillar", x: 70, y: 28, scale: 0.82, layer: "back" },
      { kind: "pillar", x: 30, y: 68, scale: 0.9, layer: "back" },
    ],
  },
};
