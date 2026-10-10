"use client";

import { useState } from "react";
import type { MatchupDetail } from "./types";

export function useMatchup(data: MatchupDetail) {
  const [swapped, setSwapped] = useState(false);

  return {
    swapped,
    swap: () => setSwapped((value) => !value),
    champion: swapped ? data.opponentName : data.championName,
    opponent: swapped ? data.championName : data.opponentName,
  };
}
