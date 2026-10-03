import { Card } from "@heroui/react";
import { Clock3 } from "lucide-react";
import type { SupportedSummonerSpell } from "../model/types";
import { useTranslations } from "next-intl";
import type { MatchupDetail } from "../model/types";
import styles from "./reference-matchup.module.css";

export function LanePlan({ data, spell }: { data: MatchupDetail; spell: SupportedSummonerSpell }) {
  const t = useTranslations("Matchup");
  const ignite = spell === data.spellAdaptation.againstSpell;
  return (
    <Card className={styles.panel} id="lane-plan">
      <div className={styles.panelHeading}>
        <h2>{t("lanePlan")}</h2>
        <Clock3 size={13} aria-hidden="true" />
      </div>
      <div className={styles.planBody}>
        <div className={styles.planCopy} aria-live="polite">
          <h3>{ignite ? t("givePriority") : t("slowPush")}</h3>
          <p>{ignite ? data.spellAdaptation.adjustmentTip : data.waveInstruction}</p>
        </div>
        <ol className={styles.waveTrack} aria-label={t("earlyWaveSequence")}>
          {[1, 2, 3].map((wave) => (
            <li key={wave}>
              <span>{wave}</span>
              <strong>
                {t("wave")} {wave}
              </strong>
              <p>{ignite ? t("playSafe") : wave === 3 ? t("crash245") : t("slowPush")}</p>
            </li>
          ))}
        </ol>
        <div className={styles.jungleAlert}>
          <Clock3 size={15} aria-hidden="true" />
          <span>{t("jungleGankWindow")}</span>
          <strong>{data.jungleGankWarningTime}</strong>
        </div>
      </div>
    </Card>
  );
}
