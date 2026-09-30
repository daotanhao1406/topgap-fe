"use client";

import { Link } from "@heroui/react";
import { useLocale } from "next-intl";

export type PocVariant = "arena" | "reference";
export const pocRoutes = {
  arena: "matchup-arena",
  reference: "matchup-reference",
} as const;

export function PocSwitcher({ current, className = "" }: { current?: PocVariant; className?: string }) {
  const locale = useLocale();
  return (
    <nav aria-label={locale === "vi" ? "Chọn thiết kế POC" : "Choose POC design"} className={`flex flex-wrap gap-2 ${className}`}>
      {([['arena', 'Arena'], ['reference', 'Legends']] as const).map(([key, label]) => (
        <Link key={key} href={`/${locale}/${pocRoutes[key]}`} aria-current={current === key ? "page" : undefined}
          className="min-h-11 border border-current/30 px-3 py-2 text-xs font-semibold text-inherit no-underline transition-colors hover:bg-current/10 aria-[current=page]:border-current aria-[current=page]:underline aria-[current=page]:underline-offset-4">
          {label}
        </Link>
      ))}
    </nav>
  );
}
