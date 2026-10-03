"use client";

import type { MatchupDetail } from "../model/types";
import { useTranslations } from "next-intl";
import { Card } from "@heroui/react";
import { Link } from "@/i18n/navigation";
import { ThemeButton } from "@/components/theme-button";
import { LocaleLink } from "@/components/locale-link";
import { useMatchup } from "../model/use-matchup";
import { ArrowRight, Shield, Swords } from "lucide-react";
import { ArenaStage } from "./arena-stage";
import { PocSwitcher } from "./poc-switcher";
import { pocRoutes } from "../routes";
import styles from "./arena-shell.module.css";
import cardStyles from "./reference-matchup.module.css";
import { MatchupCards } from "./matchup-cards";
import { LevelTrades } from "./level-trades";

export function ArenaMatchup({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");
  const { swapped, spell, setSpell, swap, champion, opponent } = useMatchup(data);

  return (
    <div className={`${styles.root} ${styles.arena}`}>
      <Link href="#quick-card" className={styles.skip}>
        {t("skipToQuickCard")}
      </Link>
      <div className={styles.container}>
        <nav className={styles.topbar} aria-label={t("mainNavigation")}>
          <Link href="/" className={styles.brand}>
            TOPGAP<span>/</span>
          </Link>
          <span className={styles.navCaption}>{t("matchupLab")}</span>
          <div className={styles.toolbar}>
            <LocaleLink href={pocRoutes.arena} className={styles.localeLink} />
            <ThemeButton className={styles.iconButton} />
          </div>
        </nav>
        <div className={styles.designBar}>
          <PocSwitcher current="arena" />
          <span>{t("designStudy")} / Arena</span>
        </div>

        <main id="main-content" className="w-full max-w-full overflow-x-clip">
          <ArenaStage
            champion={champion}
            opponent={opponent}
            swapped={swapped}
            spell={spell}
            keyAbilityDescription={data.difficultyNote}
            onSwap={swap}
            onSpellChange={setSpell}
          />

          <section
            id="quick-card"
            aria-label={t("matchupGuide")}
            className={`${cardStyles.root} ${cardStyles.arenaCards}`}
            data-matchup-cards
          >
            {swapped ? (
              <Card className={cardStyles.panel}>
                <div className={cardStyles.panelHeading}>
                  <h2>{t("reverseMatchup")}</h2>
                  <Shield size={14} aria-hidden="true" />
                </div>
                <div className={cardStyles.planBody}>
                  <p role="status">{t("onlyFioraAatroxIsAvailableSwapBackTo")}</p>
                </div>
              </Card>
            ) : (
              <MatchupCards variant="quick" data={data} />
            )}
          </section>

          {!swapped ? <LevelTrades /> : null}

          <div className={styles.arenaDivider} aria-hidden="true">
            <Swords size={21} strokeWidth={1.4} />
          </div>
          <footer className={styles.footer}>
            <div>
              <p className={styles.label}>{t("pickYourView")}</p>
              <h2>{t("exploreLegends")}</h2>
            </div>
            <Link href={pocRoutes.reference} className={styles.primaryLink}>
              Legends
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <p className={styles.credits}>
              <span>{data.id} · </span>
              {t("prototypeGameplayDataChampionArtworkRiotGamesData")}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
