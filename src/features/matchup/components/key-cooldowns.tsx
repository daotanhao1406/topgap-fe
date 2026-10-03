import { abilityAssets } from "../model/assets";
import Image from "next/image";
import { Card } from "@heroui/react";
import { useTranslations } from "next-intl";
import type { MatchupDetail } from "../model/types";
import styles from "./reference-matchup.module.css";

export function KeyCooldowns({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");
  return (
    <Card className={styles.panel} id="cooldowns">
      <div className={styles.panelHeading}>
        <h2>{t("keyCooldowns")}</h2>
        <span>AATROX</span>
      </div>
      <div className={styles.cooldownBody}>
        <p className={styles.smallNote}>{t("rank1BaseCooldowns")}</p>
        {data.keyCooldowns.map((ability) => (
          <div key={ability.abilityKey} className={styles.cooldown}>
            <div className={styles.abilityRow}>
              <div className={styles.abilityIcon}>
                <Image src={abilityAssets[ability.assetId]} alt="" width={38} height={38} />
                <span>{ability.abilityKey}</span>
              </div>
              <h3>{ability.abilityName}</h3>
              <strong>
                {ability.cooldownRank1}
                <small>s</small>
              </strong>
            </div>
            <p>{ability.punishWindowTip}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
