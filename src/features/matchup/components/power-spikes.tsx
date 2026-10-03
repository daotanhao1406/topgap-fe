"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Swords } from "lucide-react";
import type { PowerSpikes as PowerSpikeData } from "../model/types";
import { useTranslations } from "next-intl";
import type { MatchupDetail } from "../model/types";
import styles from "./reference-matchup.module.css";

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
    <section className={styles.power} id="power-spikes" aria-labelledby="power-title">
      <h2 id="power-title">{t("powerSpikes")}</h2>
      <div role="group" aria-label={t("matchStage")} className={styles.stageButtons}>
        {stages.map((item) => (
          <Button
            key={item.key}
            variant="tertiary"
            className={styles.stageButton}
            aria-label={item.label}
            aria-pressed={stage === item.key}
            onPress={() => setStage(item.key)}
          >
            {item.short}
          </Button>
        ))}
      </div>
      <div className={styles.stageText} aria-live="polite">
        <h3>{stages.find((item) => item.key === stage)?.label}</h3>
        <p>{data.spikes[stage]}</p>
      </div>
      <div className={styles.stageLegend}>
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
