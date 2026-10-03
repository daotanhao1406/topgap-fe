import { championAssets } from "../model/assets";
import type { MatchupDetail } from "../model/types";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeButton } from "@/components/theme-button";
import { LocaleLink } from "@/components/locale-link";
import { ArrowUpRight, ChevronRight, Swords } from "lucide-react";
import { InteractiveMatchupCards } from "./interactive-matchup-cards";
import { MatchupSections } from "./matchup-sections";
import { PocSwitcher } from "./poc-switcher";
import styles from "./reference-matchup.module.css";

export function ReferenceMatchup({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");

  return (
    <div className={styles.root}>
      <Link href="#lane-plan" className={styles.skip}>
        {t("skipToLanePlan")}
      </Link>
      <div className={styles.shell}>
        <nav className={styles.nav} aria-label={t("mainNavigation")}>
          <Link href="/" className={styles.brand}>
            <Swords size={24} strokeWidth={1.5} aria-hidden="true" />
            <span>TOPGAP</span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="/">{t("dashboard")}</Link>
            <Link href="/matchup-reference" aria-current="page">
              {t("matchups")}
            </Link>
            <Link href="/matchup-arena">Arena</Link>
          </div>
          <div className={styles.tools}>
            <span className={styles.prototype}>POC</span>
            <LocaleLink href="/matchup-reference" />
            <ThemeButton className={styles.iconButton} />
          </div>
        </nav>
        <main id="overview">
          <header className={styles.hero}>
            <div className={styles.splashLeft}>
              <Image
                src={championAssets.fiora.splash}
                alt=""
                fill
                sizes="(max-width: 600px) 100vw, 640px"
                preload
              />
            </div>
            <div className={styles.splashRight}>
              <Image
                src={championAssets.aatrox.splash}
                alt=""
                fill
                sizes="(max-width: 600px) 100vw, 640px"
                preload
              />
            </div>
            <div className={styles.heroShade} />
            <div className={styles.heroIdentity}>
              <div className={styles.avatar}>
                <Image
                  src={championAssets.fiora.portrait}
                  alt={t("fioraPortrait")}
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <p className={styles.championLabel}>{t("theGrandDuelist2")}</p>
                <h1>
                  Fiora <span>vs</span> Aatrox
                </h1>
                <p className={styles.heroSubtitle}>
                  <Swords size={13} aria-hidden="true" />
                  {t("topLane2")}
                  <span>·</span>
                  {t("matchupGuide")}
                </p>
              </div>
            </div>
            <div className={styles.heroOpponent}>
              <div className={styles.avatar}>
                <Image
                  src={championAssets.aatrox.portrait}
                  alt={t("aatroxPortrait")}
                  width={62}
                  height={62}
                />
              </div>
              <span>{t("theDarkinBlade2")}</span>
            </div>
          </header>
          <MatchupSections />
          <div className={styles.content}>
            <div className={styles.breadcrumb}>
              <Link href="/">Topgap</Link>
              <ChevronRight size={11} aria-hidden="true" />
              <span>{t("matchups")}</span>
              <ChevronRight size={11} aria-hidden="true" />
              <span>Fiora vs Aatrox</span>
              <span className={styles.fixture}>{t("sampleMatchupData")}</span>
            </div>
            <InteractiveMatchupCards data={data} />
            <footer className={styles.footer}>
              <div className={styles.footerTop}>
                <Link href="/" className={styles.brand}>
                  <Swords size={18} aria-hidden="true" />
                  TOPGAP
                </Link>
                <div className={styles.footerLine} />
                <PocSwitcher current="reference" className={styles.switcher} />
              </div>
              <div className={styles.credits}>
                <p>{t("pocSampleGameplayDataNotLivePatchAdvice")}</p>
                <Link href="https://developer.riotgames.com/docs/lol#data-dragon">
                  {t("championArtworkRiotGames")}
                  <ArrowUpRight size={11} aria-hidden="true" />
                </Link>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
