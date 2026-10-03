export type MatchupDifficulty = "EASY" | "SKILL" | "HARD" | "NIGHTMARE";
export type EarlyWaveStrategy = "SLOW_PUSH" | "CRASH_WAVE_3" | "FREEZE" | "GIVE_PRIO";
export type SummonerSpell = "TELEPORT" | "IGNITE" | "GHOST";

export interface KeyCooldown {
  assetId: "AatroxQ" | "AatroxW";
  abilityKey: "Q" | "W" | "E" | "R";
  abilityName: string;
  cooldownRank1: number; // in seconds
  punishWindowTip: string;
}

export interface PowerSpikes {
  level1to3: string;
  level6: string;
  firstBase: string;
  firstItem: string;
}

export interface MatchupDetail {
  id: string;
  championId: string; // 'fiora'
  championName: string; // 'Fiora'
  opponentId: string; // 'aatrox'
  opponentName: string; // 'Aatrox'
  difficulty: MatchupDifficulty;
  difficultyNote: string;
  waveStrategy: EarlyWaveStrategy;
  waveInstruction: string;
  jungleGankWarningTime: string;
  dos: readonly string[];
  donts: readonly string[];
  keyCooldowns: readonly KeyCooldown[];
  spikes: PowerSpikes;
  spellAdaptation: {
    againstSpell: SummonerSpell;
    adjustmentTip: string;
  };
}

export type SupportedSummonerSpell = Extract<SummonerSpell, "TELEPORT" | "IGNITE">;
