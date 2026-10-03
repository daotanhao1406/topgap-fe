import { Card } from "@heroui/react";
import { Check, Swords, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { MatchupDetail } from "../model/types";
import styles from "./reference-matchup.module.css";

export function MatchupRules({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");
  return (
    <>
      <div className={styles.rules}>
        {[true, false].map((positive) => (
          <Card key={String(positive)} className={styles.panel}>
            <div className={styles.panelHeading}>
              <h2>{positive ? t("do") : t("avoid")}</h2>
              {positive ? (
                <Check size={14} className={styles.positive} aria-hidden="true" />
              ) : (
                <X size={14} className={styles.negative} aria-hidden="true" />
              )}
            </div>
            <ul className={styles.ruleList}>
              {(positive ? data.dos : data.donts).map((tip) => (
                <li key={tip}>
                  {positive ? (
                    <Check size={12} className={styles.positive} aria-hidden="true" />
                  ) : (
                    <X size={12} className={styles.negative} aria-hidden="true" />
                  )}
                  <p>{tip}</p>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <div className={styles.duelNote}>
        <div className={styles.goldRule} aria-hidden="true" />
        <Swords size={18} aria-hidden="true" />
        <p>{t("shortTradesPlayAroundVitalsSaveYourParry")}</p>
        <div className={styles.goldRule} aria-hidden="true" />
      </div>
    </>
  );
}
