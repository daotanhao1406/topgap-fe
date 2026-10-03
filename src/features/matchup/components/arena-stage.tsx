"use client";

import { championAssets, arenaEnvironment, summonerAssets } from "../model/assets";
import { useTranslations } from "next-intl";

import type { SupportedSummonerSpell } from "../model/types";
import { useState } from "react";
import Image from "next/image";
import { Button, Popover } from "@heroui/react";
import { ArrowLeftRight, ChevronsUpDown, Swords } from "lucide-react";
import styles from "./arena-stage.module.css";

type Props = {
  champion: string;
  opponent: string;
  swapped: boolean;
  spell: SupportedSummonerSpell;
  keyAbilityDescription: string;
  onSwap: () => void;
  onSpellChange: (spell: SupportedSummonerSpell) => void;
};

export function ArenaStage({
  champion,
  opponent,
  swapped,
  spell,
  keyAbilityDescription,
  onSwap,
  onSpellChange,
}: Props) {
  const t = useTranslations("Matchup");
  const [isSpellPickerOpen, setIsSpellPickerOpen] = useState(false);
  const spells = {
    TELEPORT: {
      name: t("teleport"),
      description: t("afterChannelingTeleportToAnAlliedStructureUpgrades"),
      cooldown: t("baseCooldown360Seconds"),
    },
    IGNITE: {
      name: t("ignite"),
      description: t("dealsTrueDamageOverTimeToAnEnemy"),
      cooldown: t("baseCooldown180Seconds"),
    },
  } as const;
  const selectedSpell = spells[spell];

  return (
    <header className={styles.stage}>
      <Image
        src={arenaEnvironment}
        alt=""
        fill
        sizes="(max-width: 1279px) 100vw, 1200px"
        preload
        className={styles.backdrop}
      />
      <div className={styles.shade} />
      <div className={styles.heading}>
        <span>{t("topLane")}</span>
        <h1 aria-live="polite">
          {champion} <span>vs</span> {opponent}
        </h1>
        <p>{t("knowTheDuelOwnTheLane")}</p>
      </div>
      <div className={styles.duel}>
        {[champion, opponent].map((name, index) => (
          <article
            key={`${index}-${name}`}
            className={`${styles.champion} ${index === 1 ? styles.enemy : ""}`}
          >
            <span className={styles.sideLabel}>
              {index === 0 ? t("yourChampion") : t("opponent")}
            </span>
            <div className={styles.portraitFrame}>
              <Image
                src={
                  name === "Fiora" ? championAssets.fiora.portrait : championAssets.aatrox.portrait
                }
                alt={name}
                width={308}
                height={560}
                loading="eager"
                sizes="(max-width: 699px) 120px, 192px"
                className={styles.portrait}
              />
              <div className={styles.portraitWash} />
              <div className={styles.nameplate}>
                <strong>{name}</strong>
                <span>{name === "Fiora" ? t("theGrandDuelist") : t("theDarkinBlade")}</span>
              </div>
            </div>
            {!swapped &&
              (index === 0 ? (
                <div className={styles.loadout}>
                  <span className={styles.iconFrame}>
                    <Image src={championAssets.fiora.abilities.W} alt="" width={36} height={36} />
                    <small>W</small>
                  </span>
                  <span className={styles.abilityCopy}>
                    <small>{t("keyAbility")}</small>
                    <strong>{t("riposte")}</strong>
                    <span>{keyAbilityDescription}</span>
                  </span>
                </div>
              ) : (
                <div className={`${styles.loadout} ${styles.enemySpellPicker}`}>
                  <Popover isOpen={isSpellPickerOpen} onOpenChange={setIsSpellPickerOpen}>
                    <Popover.Trigger
                      className={styles.spellTrigger}
                      aria-label={t("chooseOpponentSummonerSpell")}
                    >
                      <span className={styles.selectedSpellIcon}>
                        <Image src={summonerAssets[spell].icon} alt="" width={36} height={36} />
                      </span>
                      <span className={styles.selectedSpellText}>
                        <small>{t("enemySpell")}</small>
                        <strong>{selectedSpell.name}</strong>
                      </span>
                      <ChevronsUpDown size={14} aria-hidden="true" />
                    </Popover.Trigger>
                    <Popover.Content
                      placement="bottom end"
                      offset={12}
                      className={styles.spellPopover}
                    >
                      <Popover.Dialog className={styles.spellDialog}>
                        <Popover.Heading className={styles.spellHeading}>
                          {selectedSpell.name}
                        </Popover.Heading>
                        <p className={styles.spellDescription}>{selectedSpell.description}</p>
                        <p className={styles.spellCooldown}>{selectedSpell.cooldown}</p>
                        <div className={styles.spellDivider} aria-hidden="true" />
                        <div
                          role="group"
                          aria-label={t("summonerSpells")}
                          className={styles.spellGrid}
                        >
                          {(["TELEPORT", "IGNITE"] as const).map((value) => (
                            <Button
                              key={value}
                              isIconOnly
                              variant="tertiary"
                              className={styles.spellChoice}
                              aria-label={spells[value].name}
                              aria-pressed={spell === value}
                              onPress={() => {
                                onSpellChange(value);
                                setIsSpellPickerOpen(false);
                              }}
                            >
                              <span className={styles.spellChoiceIcon}>
                                <Image
                                  src={summonerAssets[value].icon}
                                  alt=""
                                  width={48}
                                  height={48}
                                />
                              </span>
                            </Button>
                          ))}
                        </div>
                      </Popover.Dialog>
                    </Popover.Content>
                  </Popover>
                </div>
              ))}
          </article>
        ))}
        <div className={styles.center}>
          <div className={styles.crest} aria-hidden="true">
            <Swords size={29} strokeWidth={1.2} />
            <span>VS</span>
          </div>
          <Button
            className={styles.swap}
            variant="secondary"
            aria-pressed={swapped}
            onPress={onSwap}
          >
            <ArrowLeftRight size={15} aria-hidden="true" />
            {t("swapSides")}
          </Button>
        </div>
      </div>
    </header>
  );
}
