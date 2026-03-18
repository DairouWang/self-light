type SelfGardenTilePosition = {
  id: string;
  label: string;
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  size?: number;
};

const selfGardenTilePath: SelfGardenTilePosition[] = [
  { id: "t1", label: "Tile 1", x: 18, y: 72, scale: 0.92, rotate: -6, size: 14 },
  { id: "t2", label: "Tile 2", x: 27, y: 69, scale: 0.94, rotate: -4, size: 14 },
  { id: "t3", label: "Tile 3", x: 36, y: 65, scale: 0.96, rotate: -1, size: 14 },
  { id: "t4", label: "Tile 4", x: 45, y: 60, scale: 0.98, rotate: 2, size: 13.8 },
  { id: "t5", label: "Tile 5", x: 53, y: 55, scale: 1, rotate: 4, size: 13.8 },
  { id: "t6", label: "Tile 6", x: 60, y: 49, scale: 1, rotate: 6, size: 13.6 },
  { id: "t7", label: "Tile 7", x: 66, y: 43, scale: 0.98, rotate: 7, size: 13.4 },
  { id: "t8", label: "Tile 8", x: 71, y: 36, scale: 0.97, rotate: 7, size: 13.2 },
  { id: "t9", label: "Tile 9", x: 74, y: 29, scale: 0.96, rotate: 5, size: 13 },
  { id: "t10", label: "Tile 10", x: 76, y: 23, scale: 0.95, rotate: 3, size: 12.8 },
];

export function getSelfGardenTilePosition(index: number): SelfGardenTilePosition {
  const preset = selfGardenTilePath[index];

  if (preset) {
    return preset;
  }

  const last = selfGardenTilePath[selfGardenTilePath.length - 1];
  const previous = selfGardenTilePath[selfGardenTilePath.length - 2];
  const overflow = index - selfGardenTilePath.length + 1;
  const stepX = last.x - previous.x;
  const stepY = last.y - previous.y;

  return {
    id: `t${index + 1}`,
    label: `Tile ${index + 1}`,
    x: Math.min(80, last.x + stepX * overflow),
    y: Math.max(12, last.y + stepY * overflow),
    scale: Math.max(0.88, (last.scale ?? 0.95) - overflow * 0.01),
    rotate: Math.max(-2, (last.rotate ?? 0) - overflow),
    size: Math.max(11.6, (last.size ?? 12.8) - overflow * 0.2),
  };
}
