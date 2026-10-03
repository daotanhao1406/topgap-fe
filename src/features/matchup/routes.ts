export const pocRoutes = {
  arena: "/matchup-arena",
  reference: "/matchup-reference",
} as const;

export type PocVariant = keyof typeof pocRoutes;
