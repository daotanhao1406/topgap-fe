"use client";

import { championAssets } from "../model/assets";
import Image from "next/image";
import { Button, Card } from "@heroui/react";
import { Check } from "lucide-react";
import { summonerAssets } from "../model/assets";
import type { SupportedSummonerSpell } from "../model/types";
import { useTranslations } from "next-intl";
import type { MatchupDetail } from "../model/types";
import styles from "./reference-matchup.module.css";

type Props = {
  data: MatchupDetail;
  spell: SupportedSummonerSpell;
  onSpellChange: (spell: SupportedSummonerSpell) => void;
};

export function ChampionLoadout({ data, spell, onSpellChange }: Props) {
  const t = useTranslations("Matchup");
  return (
    <aside className={styles.loadout} aria-label={t("championsAndSummonerSpells")}>
      <Card className={styles.panel}>
        <div className={styles.panelHeading}>
          <h2>{t("yourChampion2")}</h2>
          <span>TOP</span>
        </div>
        <div className={styles.profileArt}>
          <Image
            src={championAssets.fiora.splash}
            alt=""
            fill
            sizes="(max-width: 700px) 90vw, 210px"
          />
          <div>
            <h3>Fiora</h3>
            <span>{t("theGrandDuelist")}</span>
          </div>
        </div>
        <div className={styles.profileBody}>
          <div className={styles.goldRule} aria-hidden="true" />
          <h3 className={styles.smallHeading}>{t("keyAbility2")}</h3>
          <div className={styles.keyAbility}>
            <div className={styles.abilityIcon}>
              <Image src={championAssets.fiora.abilities.W} alt="" width={40} height={40} />
              <span>W</span>
            </div>
            <div>
              <h4>{t("riposte")}</h4>
              <p>{t("holdForQ3OrW")}</p>
            </div>
          </div>
          <p className={styles.profileTip}>{data.difficultyNote}</p>
        </div>
      </Card>
      <Card className={styles.panel}>
        <div className={styles.panelHeading}>
          <h2>{t("opponent2")}</h2>
          <span>AATROX</span>
        </div>
        <div className={styles.opponentBody}>
          <div className={styles.opponentIdentity}>
            <div className={styles.smallAvatar}>
              <Image src={championAssets.aatrox.portrait} alt="" width={42} height={42} />
            </div>
            <div>
              <h3>Aatrox</h3>
              <p>{t("theDarkinBlade")}</p>
            </div>
          </div>
          <div className={styles.goldRule} aria-hidden="true" />
          <h3 className={styles.smallHeading}>{t("summonerSpell")}</h3>
          <div role="group" aria-label={t("opponentSummonerSpell")} className={styles.spells}>
            {(["TELEPORT", "IGNITE"] as const).map((value) => (
              <Button
                key={String(value)}
                variant="tertiary"
                className={styles.spellButton}
                aria-pressed={spell === value}
                onPress={() => onSpellChange(value)}
              >
                <span className={styles.spellImage}>
                  <Image src={summonerAssets[value].icon} width={36} height={36} alt="" />
                  {spell === value && <Check size={12} aria-hidden="true" />}
                </span>
                <span>{value === "IGNITE" ? t("ignite") : t("teleport")}</span>
              </Button>
            ))}
          </div>
          <p className={styles.spellNote}>{t("selectASpellToAdaptYourLanePlan")}</p>
        </div>
      </Card>
    </aside>
  );
}
