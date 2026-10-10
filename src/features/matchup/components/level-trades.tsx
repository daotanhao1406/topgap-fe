import { championAssets } from "../model/assets";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card } from "@heroui/react";

function Ability({ label, parry = false }: { label: string; parry?: boolean }) {
  return (
    <span className="inline whitespace-nowrap text-[color:var(--text)] [&_img]:inline-block [&_img]:mr-0.75 [&_img]:border [&_img]:border-solid [&_img]:border-[color:var(--arena-metal)] [&_img]:rounded-[2px] [&_img]:align-[-4px] [&_strong]:font-[650]">
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
        <>{t("reassessAfterEachTrade")}</>,
      ],
    },
  ];

  return (
    <section className="mt-9 mb-10 mx-0 max-[699px]:mt-7" aria-labelledby="level-trades-title">
      <h2
        id="level-trades-title"
        className="font-bold mb-4.5 text-[color:var(--accent)] text-[22px] leading-[1.4] max-[699px]:text-[20px]"
      >
        {t("tradingByLevel")}
      </h2>
      <div className="grid grid-cols-3 gap-4.5 items-stretch max-[950px]:gap-3 max-[699px]:grid-cols-[minmax(0,_1fr)] max-[699px]:gap-4">
        {stages.map((stage) => (
          <Card
            key={stage.level}
            className="block min-w-0 border border-solid border-[color:var(--arena-edge)] rounded-[3px] bg-[linear-gradient(135deg,_var(--raised),_var(--surface)_60%)] text-[color:var(--text)] shadow-none p-5.5 [&_h3]:pb-3.75 [&_h3]:border-b [&_h3]:[border-bottom-style:solid] [&_h3]:border-b-[color:var(--line)] [&_h3]:text-[color:var(--accent)] [&_h3]:text-[25px] [&_h3]:font-bold [&_h3]:leading-[1.2] [&_ul]:mt-3.5 [&_ul]:mb-0 [&_ul]:pl-4.5 [&_ul]:mx-0 [&_li]:pl-0.5 [&_li]:text-[color:var(--muted)] [&_li]:text-[14px] [&_li]:leading-[1.85] [&_li+li]:mt-3 [&_li::marker]:text-[color:var(--accent)] max-[950px]:p-4.25 max-[950px]:[&_li]:text-[13px] max-[699px]:p-5.5 max-[699px]:[&_li]:text-[14px]"
          >
            <h3>
              {t("level")} {stage.level}
            </h3>
            <p className="mt-4.5 text-[14px] leading-[1.7] font-[650] max-[950px]:text-[13px] max-[699px]:text-[14px]">
              {stage.summary}
            </p>
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
