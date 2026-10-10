// Optimized local mirrors of Riot Data Dragon artwork; see MATCHUP-POCS.md.
// Keep the upstream identifiers with the mirrors so an asset refresh has one source.
export const dataDragon = {
  version: "16.17.1",
  origin: "https://ddragon.leagueoflegends.com",
} as const;

export const championAssets = {
  fiora: {
    riotId: "Fiora",
    portrait: "/images/matchup/fiora.webp",
    splash: "/images/matchup/fiora-splash.webp",
    abilities: { W: "/images/matchup/abilities/fiora-w.webp" },
  },
  aatrox: {
    riotId: "Aatrox",
    portrait: "/images/matchup/aatrox.webp",
    splash: "/images/matchup/aatrox-splash.webp",
    abilities: {
      Q: "/images/matchup/abilities/aatrox-q.webp",
      W: "/images/matchup/abilities/aatrox-w.webp",
    },
  },
} as const;

export const abilityAssets = {
  FioraW: championAssets.fiora.abilities.W,
  AatroxQ: championAssets.aatrox.abilities.Q,
  AatroxW: championAssets.aatrox.abilities.W,
} as const;
