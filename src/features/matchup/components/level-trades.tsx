import { championAssets } from "../model/assets";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card } from "@heroui/react";
import styles from "./level-trades.module.css";

function Ability({ label, parry = false }: { label: string; parry?: boolean }) {
  return (
    <span className={styles.ability}>
      <Image
        src={parry ? championAssets.fiora.abilities.W : championAssets.aatrox.abilities.Q}
        alt=""
        width={20}
        height={20}
      />
      <strong>{label}</strong>
    </span>
  );
}

export function LevelTrades() {
  const t = useTranslations("Matchup");
  const stages = [
    {
      level: "1–3",
      summary: t("shortTradesAroundAccessibleVitalsKeepAnEscape"),
      tips: [
        <>
          {t("stepBackToDodgeAatroxS")} <Ability label="Q1" /> {t("beforeMovingInForAVital")}
        </>,
        <>
          {t("useQDiagonallyToHitAVitalAnd")} <Ability label="Q2" />.
        </>,
        <>
          {t("onceLearnedSave")} <Ability label="W" parry /> {t("for")} <Ability label="Q3" />{" "}
          {t("orTheWPullDoNotParryAt")}
        </>,
        <>{t("resetAnUnfavorableVitalByBackingOffAvoid")}</>,
      ],
    },
    {
      level: "4–8",
      summary: t("waitOutHisQSequenceThenUseThe"),
      tips: [
        <>
          {t("bait")} <Ability label="Q1" /> {t("andWatchHisEItCanChangeThe")}
        </>,
        <>
          {t("after")} <Ability label="Q3" /> {t("orWhenTheChainExpiresUseQTo")}
        </>,
        <>
          {t("keep")} <Ability label="W" parry /> {t("untilYouSeeTheKnockupOrTheW")}
        </>,
        <>{t("fromLevel6LookForRWhenYou")}</>,
      ],
    },
    {
      level: "9+",
      summary: t("tradeAroundCooldownsAndVitalsThenChooseYour"),
      tips: [
        <>{t("chipAwayWithQAndAttacksOnVitals")}</>,
        <>
          {t("evenWithItemsRespect")} <Ability label="Q2" /> / <Ability label="Q3" />{" "}
          {t("sweetspotsKeepYourParryAvailable")}
        </>,
        <>{t("useRWithAClearPathBetweenVitals")}</>,
        <>{t("reassessAfterEachTradeHealthItemsAndSummoner")}</>,
      ],
    },
  ];

  return (
    <section className={styles.section} aria-labelledby="level-trades-title">
      <h2 id="level-trades-title" className={styles.title}>
        {t("tradingByLevel")}
      </h2>
      <div className={styles.grid}>
        {stages.map((stage) => (
          <Card key={stage.level} className={styles.card}>
            <h3>
              {t("level")} {stage.level}
            </h3>
            <p className={styles.summary}>{stage.summary}</p>
            <ul>
              {stage.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
