"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { pocRoutes, type PocVariant } from "../routes";

export function PocSwitcher({
  current,
  className = "",
}: {
  current?: PocVariant;
  className?: string;
}) {
  const t = useTranslations("Matchup");
  return (
    <nav aria-label={t("chooseDesign")} className={`flex flex-wrap gap-2 ${className}`}>
      {(
        [
          ["arena", "Arena"],
          ["reference", "Legends"],
        ] as const
      ).map(([key, label]) => (
        <Link
          key={key}
          href={pocRoutes[key]}
          aria-current={current === key ? "page" : undefined}
          className="min-h-11 border border-current/30 px-3 py-2 text-xs font-semibold text-inherit no-underline transition-colors hover:bg-current/10 aria-[current=page]:border-current aria-[current=page]:underline aria-[current=page]:underline-offset-4"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
