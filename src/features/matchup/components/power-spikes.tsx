"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Swords } from "lucide-react";
import type { PowerSpikes as PowerSpikeData } from "../model/types";
import { useTranslations } from "next-intl";
import type { MatchupDetail } from "../model/types";

export function PowerSpikes({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");
  const [stage, setStage] = useState<keyof PowerSpikeData>("level1to3");
  const stages: { key: keyof PowerSpikeData; label: string; short: string }[] = [
    { key: "level1to3", label: t("levels13"), short: "1–3" },
    { key: "level6", label: t("levelSix"), short: "6" },
    { key: "firstBase", label: t("firstRecall"), short: t("recall") },
    { key: "firstItem", label: t("firstItem"), short: t("item") },
  ];

  return (
    <section
      className="relative border border-solid border-[color:var(--gold-line)] rounded-[3px] mt-2 pt-5.75 pb-4 scroll-mt-6 px-3.5 [&>h2]:text-[color:var(--gold)] [&>h2]:not-italic [&>h2]:font-bold [&>h2]:text-[12px] [&>h2]:leading-[1.4] [&>h2]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&>h2]:uppercase [&>h2]:tracking-[0.03em] [&>h2]:bg-[color:var(--page)] [&>h2]:absolute [&>h2]:-top-2.25 [&>h2]:left-[50%] [&>h2]:[transform:translateX(-50%)] [&>h2]:whitespace-nowrap [&>h2]:px-2.5 [&>h2]:py-0 [&>h2::before]:content-[''] [&>h2::before]:w-0.75 [&>h2::before]:h-0.75 [&>h2::before]:border [&>h2::before]:border-solid [&>h2::before]:border-[color:var(--gold)] [&>h2::before]:[transform:rotate(45deg)] [&>h2::before]:absolute [&>h2::before]:top-1.75 [&>h2::before]:left-0 [&>h2::after]:content-[''] [&>h2::after]:w-0.75 [&>h2::after]:h-0.75 [&>h2::after]:border [&>h2::after]:border-solid [&>h2::after]:border-[color:var(--gold)] [&>h2::after]:[transform:rotate(45deg)] [&>h2::after]:absolute [&>h2::after]:top-1.75 [&>h2::after]:right-0 max-[950px]:mt-2"
      id="power-spikes"
      aria-labelledby="power-title"
    >
      <h2 id="power-title">{t("powerSpikes")}</h2>
      <div role="group" aria-label={t("matchStage")} className="grid grid-cols-4 gap-1.25">
        {stages.map((item) => (
          <Button
            key={item.key}
            variant="tertiary"
            className="min-w-0 min-h-8 h-auto border border-solid border-[color:var(--line)] rounded-[3px] bg-transparent text-[color:var(--muted)] text-[9px] font-normal px-0.5 py-1.5 [&[aria-pressed='true']]:border-[color:var(--gold-line)] [&[aria-pressed='true']]:text-[color:var(--gold-bright)] [&[aria-pressed='true']]:[background:color-mix(in_srgb,_var(--gold)_5%,_transparent)] max-[700px]:min-h-10 max-[480px]:text-[11px]"
            aria-label={item.label}
            aria-pressed={stage === item.key}
            onPress={() => setStage(item.key)}
          >
            {item.short}
          </Button>
        ))}
      </div>
      <div
        className="pt-4 pb-1.5 min-h-42.25 px-0.5 [&_h3]:not-italic [&_h3]:font-bold [&_h3]:text-[18px] [&_h3]:leading-[1.4] [&_h3]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&_h3]:text-[color:var(--gold-bright)] [&_p]:mt-2 [&_p]:text-[color:var(--muted)] [&_p]:text-[11px] [&_p]:leading-[1.9] max-[480px]:[&_p]:text-[12px] max-[480px]:min-h-32"
        aria-live="polite"
      >
        <h3>{stages.find((item) => item.key === stage)?.label}</h3>
        <p>{data.spikes[stage]}</p>
      </div>
      <div className="flex items-center justify-between border-t [border-top-style:solid] border-t-[color:var(--line)] pt-2.5 text-[color:var(--gold)] text-[9px] [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&>span]:text-[color:var(--muted)] [&_i]:w-1.25 [&_i]:h-1.25 [&_i]:bg-[#788fb5] [&_i]:rounded-full [&>span:last-child_i]:bg-[#b37479] group-[&]/reference-arenaCards:[&_i]:bg-[color:var(--accent)] group-[&]/reference-arenaCards:[&>span:last-child_i]:bg-[color:var(--red)]">
        <span>
          <i />
          {data.championName}
        </span>
        <Swords size={13} aria-hidden="true" />
        <span>
          {data.opponentName}
          <i />
        </span>
      </div>
    </section>
  );
}
