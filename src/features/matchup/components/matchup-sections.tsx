"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Shield } from "lucide-react";
import { Link } from "@/i18n/navigation";

const sections = [
  { id: "overview", label: "overview" },
  { id: "lane-plan", label: "lanePlan" },
  { id: "cooldowns", label: "cooldowns" },
  { id: "power-spikes", label: "powerSpikes" },
] as const;

export function MatchupSections() {
  const t = useTranslations("Matchup");
  const [section, setSection] = useState<string>("overview");
  return (
    <nav
      className="flex items-center min-h-12 gap-6.25 border-b [border-bottom-style:solid] border-b-[color:var(--line)] bg-[color:var(--nav)] px-10 [&_a]:inline-flex [&_a]:items-center [&_a]:relative [&_a]:self-stretch [&_a]:min-h-11 [&_a]:text-[11px] [&_a]:text-[color:var(--muted)] [&_a]:whitespace-nowrap [&_a[aria-current]]:text-[color:var(--gold-bright)] [&_a[aria-current]::after]:content-[''] [&_a[aria-current]::after]:h-0.5 [&_a[aria-current]::after]:absolute [&_a[aria-current]::after]:inset-[auto_0_0] [&_a[aria-current]::after]:bg-[color:var(--gold-bright)] max-[1150px]:px-6.5 max-[950px]:gap-6.25 max-[700px]:gap-6 max-[700px]:overflow-x-auto max-[700px]:px-5 max-[700px]:[&_a]:text-[10px] max-[480px]:gap-5.25 max-[480px]:px-4.5 max-[480px]:[&_a]:text-[10px]"
      aria-label={t("matchupSections")}
    >
      {sections.map(({ id, label }) => (
        <Link
          key={id}
          href={`#${id}`}
          aria-current={section === id ? "location" : undefined}
          onClick={() => setSection(id)}
        >
          {t(label)}
        </Link>
      ))}
      <span className="inline-flex items-center gap-1.75 ml-auto text-[color:var(--gold)] text-[10px] whitespace-nowrap max-[950px]:hidden">
        <Shield size={12} aria-hidden="true" />
        {t("skillMatchup")}
      </span>
    </nav>
  );
}
