"use client";

import { useMatchup } from "../model/use-matchup";
import type { MatchupDetail } from "../model/types";
import { MatchupCards } from "./matchup-cards";

export function InteractiveMatchupCards({ data }: { data: MatchupDetail }) {
  const { spell, setSpell } = useMatchup(data);
  return <MatchupCards variant="full" data={data} spell={spell} onSpellChange={setSpell} />;
}
