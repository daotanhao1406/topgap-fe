"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Button, Link } from "@heroui/react";
import { ArrowUpRight, ChevronRight, Moon, Shield, Sun, Swords } from "lucide-react";
import { mockFioraVsAatrox, vietnameseMatchup } from "./data";
import { MatchupCards } from "./matchup-cards";
import { PocSwitcher } from "./poc-switcher";
import styles from "./reference-matchup.module.css";

export function ReferenceMatchup() {
  const locale = useLocale();
  const copy = (en: string, vi: string) => locale === "vi" ? vi : en;
  const data = locale === "vi" ? vietnameseMatchup : mockFioraVsAatrox;
  const [dark, setDark] = useState(true);
  const [ignite, setIgnite] = useState(false);
  const [section, setSection] = useState("overview");
  const sections = [
    ["overview", copy("Overview", "Tổng quan")],
    ["lane-plan", copy("Lane plan", "Kế hoạch đi đường")],
    ["cooldowns", copy("Cooldowns", "Hồi chiêu")],
    ["power-spikes", copy("Power spikes", "Ngưỡng sức mạnh")],
  ];

  return <div className={styles.root} data-theme={dark ? "dark" : "light"}>
    <Link href="#lane-plan" className={styles.skip}>{copy("Skip to lane plan", "Đến kế hoạch đi đường")}</Link>
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label={copy("Main navigation", "Điều hướng chính")}>
        <Link href={`/${locale}`} className={styles.brand}><Swords size={24} strokeWidth={1.5} aria-hidden="true" /><span>TOPGAP</span></Link>
        <div className={styles.navLinks}>
          <Link href={`/${locale}`}>{copy("Dashboard", "Trang chủ")}</Link>
          <Link href={`/${locale}/matchup-reference`} aria-current="page">{copy("Matchups", "Kèo đấu")}</Link>
          <Link href={`/${locale}/matchup-arena`}>Arena</Link>
        </div>
        <div className={styles.tools}>
          <span className={styles.prototype}>POC</span>
          <Link href={`/${locale === "vi" ? "en" : "vi"}/matchup-reference`} hrefLang={locale === "vi" ? "en" : "vi"} lang={locale === "vi" ? "en" : "vi"}>{locale === "vi" ? "EN" : "VI"}</Link>
          <Button isIconOnly variant="tertiary" className={styles.iconButton} aria-label={copy("Toggle light or dark theme", "Đổi giao diện sáng hoặc tối")} onPress={() => setDark(value => !value)}>{dark ? <Sun size={16} /> : <Moon size={16} />}</Button>
        </div>
      </nav>
      <main id="overview">
        <header className={styles.hero}>
          <div className={styles.splashLeft}><Image src="/images/matchup/fiora-splash.webp" alt="" fill sizes="(max-width: 600px) 100vw, 640px" preload /></div>
          <div className={styles.splashRight}><Image src="/images/matchup/aatrox-splash.webp" alt="" fill sizes="(max-width: 600px) 100vw, 640px" preload /></div>
          <div className={styles.heroShade} />
          <div className={styles.heroIdentity}>
            <div className={styles.avatar}><Image src="/images/matchup/fiora.webp" alt={copy("Fiora portrait", "Chân dung Fiora")} width={80} height={80} /></div>
            <div><p className={styles.championLabel}>{copy("THE GRAND DUELIST", "NỮ KIẾM SƯ")}</p><h1>Fiora <span>vs</span> Aatrox</h1><p className={styles.heroSubtitle}><Swords size={13} aria-hidden="true" />{copy("Top lane", "Đường trên")}<span>·</span>{copy("Matchup guide", "Cẩm nang kèo đấu")}</p></div>
          </div>
          <div className={styles.heroOpponent}><div className={styles.avatar}><Image src="/images/matchup/aatrox.webp" alt={copy("Aatrox portrait", "Chân dung Aatrox")} width={62} height={62} /></div><span>{copy("THE DARKIN BLADE", "QUỶ KIẾM DARKIN")}</span></div>
        </header>
        <nav className={styles.sectionNav} aria-label={copy("Matchup sections", "Nội dung kèo đấu")}>
          {sections.map(([id, label]) => <Link key={id} href={`#${id}`} aria-current={section === id ? "location" : undefined} onPress={() => setSection(id)}>{label}</Link>)}
          <span className={styles.laneTag}><Shield size={12} aria-hidden="true" />{copy("Skill matchup", "Kèo kỹ năng")}</span>
        </nav>
        <div className={styles.content}>
          <div className={styles.breadcrumb}><Link href={`/${locale}`}>Topgap</Link><ChevronRight size={11} aria-hidden="true" /><span>{copy("Matchups", "Kèo đấu")}</span><ChevronRight size={11} aria-hidden="true" /><span>Fiora vs Aatrox</span><span className={styles.fixture}>{copy("Sample matchup data", "Dữ liệu kèo đấu mẫu")}</span></div>
          <MatchupCards data={data} copy={copy} ignite={ignite} onIgniteChange={setIgnite} />
          <footer className={styles.footer}>
            <div className={styles.footerTop}><Link href={`/${locale}`} className={styles.brand}><Swords size={18} aria-hidden="true" />TOPGAP</Link><div className={styles.footerLine} /><PocSwitcher current="reference" className={styles.switcher} /></div>
            <div className={styles.credits}><p>{copy("POC · Sample gameplay data, not live patch advice.", "POC · Dữ liệu lối chơi mẫu, không theo phiên bản hiện tại.")}</p><Link href="https://developer.riotgames.com/docs/lol#data-dragon">{copy("Champion artwork: Riot Games", "Ảnh tướng: Riot Games")}<ArrowUpRight size={11} aria-hidden="true" /></Link></div>
          </footer>
        </div>
      </main>
    </div>
  </div>;
}
