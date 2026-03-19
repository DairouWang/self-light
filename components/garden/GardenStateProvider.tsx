"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { sampleInsightTiles } from "@/lib/data/sampleTiles";
import type { InsightTile } from "@/lib/types/garden";

type GardenStateValue = {
  tiles: InsightTile[];
  setTiles: React.Dispatch<React.SetStateAction<InsightTile[]>>;
};

const GardenStateContext = createContext<GardenStateValue | null>(null);

export function GardenStateProvider({ children }: { children: ReactNode }) {
  const [tiles, setTiles] = useState<InsightTile[]>(sampleInsightTiles);
  const value = useMemo(() => ({ tiles, setTiles }), [tiles]);

  return (
    <GardenStateContext.Provider value={value}>
      {children}
    </GardenStateContext.Provider>
  );
}

export function useGardenState() {
  const context = useContext(GardenStateContext);

  if (!context) {
    throw new Error("useGardenState must be used within GardenStateProvider.");
  }

  return context;
}
