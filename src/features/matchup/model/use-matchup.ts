"use client";

import { useState } from "react";
import type { MatchupDetail, SupportedSummonerSpell } from "./types";

export function useMatchup(data: MatchupDetail) {
  const [swapped, setSwapped] = useState(false);
  const [spell, setSpell] = useState<SupportedSummonerSpell>("TELEPORT");

  return {
    swapped,
    spell,
    setSpell,
    swap: () => setSwapped((value) => !value),
    champion: swapped ? data.opponentName : data.championName,
    opponent: swapped ? data.championName : data.opponentName,
  };
}
