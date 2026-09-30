"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Button, Card, Link } from "@heroui/react";
import { ArrowUpRight, Check, ChevronRight, Clock3, Moon, Shield, Sun, Swords, X } from "lucide-react";
import { mockFioraVsAatrox, vietnameseMatchup, type PowerSpikes } from "./data";
import { PocSwitcher } from "./poc-switcher";
import styles from "./reference-matchup.module.css";

export function ReferenceMatchup() {
  const locale = useLocale();
  const copy = (en: string, vi: string) => locale === "vi" ? vi : en;
  const data = locale === "vi" ? vietnameseMatchup : mockFioraVsAatrox;
  const [dark, setDark] = useState(true);
  const [ignite, setIgnite] = useState(false);
  const [stage, setStage] = useState<keyof PowerSpikes>("level1to3");
  const [section, setSection] = useState("overview");
  const stages: { key: keyof PowerSpikes; label: string; short: string }[] = [
    { key: "level1to3", label: copy("Levels 1–3", "Cấp 1–3"), short: "1–3" },
    { key: "level6", label: copy("Level six", "Cấp sáu"), short: "6" },
    { key: "firstBase", label: copy("First recall", "Lần về đầu"), short: copy("Recall", "Về nhà") },
    { key: "firstItem", label: copy("First item", "Trang bị đầu"), short: copy("Item", "Trang bị") },
  ];
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
          <div className={styles.contentGrid}>
            <aside className={styles.loadout} aria-label={copy("Champions and summoner spells", "Tướng và phép bổ trợ")}>
              <Card className={styles.panel}>
                <div className={styles.panelHeading}><h2>{copy("Your champion", "Tướng của bạn")}</h2><span>TOP</span></div>
                <div className={styles.profileArt}><Image src="/images/matchup/fiora-splash.webp" alt="" fill sizes="(max-width: 700px) 90vw, 210px" /><div><h3>Fiora</h3><span>{copy("The Grand Duelist", "Nữ Kiếm Sư")}</span></div></div>
                <div className={styles.profileBody}>
                  <div className={styles.goldRule} aria-hidden="true" />
                  <h3 className={styles.smallHeading}>{copy("Key ability", "Kỹ năng quyết định")}</h3>
                  <div className={styles.keyAbility}><div className={styles.abilityIcon}><Image src="/images/matchup/abilities/fiora-w.webp" alt="" width={40} height={40} /><span>W</span></div><div><h4>{copy("Riposte", "Phản Đòn")}</h4><p>{copy("Hold for Q3 or W.", "Giữ để chặn Q3 hoặc W.")}</p></div></div>
                  <p className={styles.profileTip}>{data.difficultyNote}</p>
                </div>
              </Card>
              <Card className={styles.panel}>
                <div className={styles.panelHeading}><h2>{copy("Opponent", "Đối thủ")}</h2><span>AATROX</span></div>
                <div className={styles.opponentBody}>
                  <div className={styles.opponentIdentity}><div className={styles.smallAvatar}><Image src="/images/matchup/aatrox.webp" alt="" width={42} height={42} /></div><div><h3>Aatrox</h3><p>{copy("The Darkin Blade", "Quỷ Kiếm Darkin")}</p></div></div>
                  <div className={styles.goldRule} aria-hidden="true" />
                  <h3 className={styles.smallHeading}>{copy("Summoner spell", "Phép bổ trợ")}</h3>
                  <div role="group" aria-label={copy("Opponent summoner spell", "Phép bổ trợ của đối thủ")} className={styles.spells}>{[false, true].map(value => <Button key={String(value)} variant="tertiary" className={styles.spellButton} aria-pressed={ignite === value} onPress={() => setIgnite(value)}><span className={styles.spellImage}><Image src={`/images/matchup/abilities/${value ? "ignite" : "teleport"}.webp`} width={36} height={36} alt="" />{ignite === value && <Check size={12} aria-hidden="true" />}</span><span>{value ? copy("Ignite", "Thiêu Đốt") : copy("Teleport", "Dịch Chuyển")}</span></Button>)}</div>
                  <p className={styles.spellNote}>{copy("Select a spell to adapt your lane plan.", "Chọn phép để điều chỉnh kế hoạch lính.")}</p>
                </div>
              </Card>
            </aside>
            <div className={styles.mainColumn}>
              <Card className={styles.panel} id="lane-plan">
                <div className={styles.panelHeading}><h2>{copy("Lane plan", "Kế hoạch đi đường")}</h2><Clock3 size={13} aria-hidden="true" /></div>
                <div className={styles.planBody}>
                  <div className={styles.planCopy} aria-live="polite"><h3>{ignite ? copy("Give priority", "Nhường quyền đẩy") : copy("Slow push", "Đẩy chậm")}</h3><p>{ignite ? data.spellAdaptation.adjustmentTip : data.waveInstruction}</p></div>
                  <ol className={styles.waveTrack} aria-label={copy("Early wave sequence", "Trình tự đợt lính đầu")}>{[1, 2, 3].map(wave => <li key={wave}><span>{wave}</span><strong>{copy("Wave", "Đợt")} {wave}</strong><p>{ignite ? copy("Play safe", "Giữ máu") : wave === 3 ? copy("Crash · 2:45", "Vào trụ · 2:45") : copy("Slow push", "Đẩy chậm")}</p></li>)}</ol>
                  <div className={styles.jungleAlert}><Clock3 size={15} aria-hidden="true" /><span>{copy("Jungle gank window", "Cảnh giác rừng gank")}</span><strong>{data.jungleGankWarningTime}</strong></div>
                </div>
              </Card>
              <div className={styles.rules}>{[true, false].map(positive => <Card key={String(positive)} className={styles.panel}>
                <div className={styles.panelHeading}><h2>{positive ? copy("Do", "Nên làm") : copy("Avoid", "Cần tránh")}</h2>{positive ? <Check size={14} className={styles.positive} aria-hidden="true" /> : <X size={14} className={styles.negative} aria-hidden="true" />}</div>
                <ul className={styles.ruleList}>{(positive ? data.dos : data.donts).map(tip => <li key={tip}>{positive ? <Check size={12} className={styles.positive} aria-hidden="true" /> : <X size={12} className={styles.negative} aria-hidden="true" />}<p>{tip}</p></li>)}</ul>
              </Card>)}</div>
              <div className={styles.duelNote}><div className={styles.goldRule} aria-hidden="true" /><Swords size={18} aria-hidden="true" /><p>{copy("Short trades. Play around vitals. Save your parry.", "Trao đổi ngắn. Đánh điểm yếu. Giữ Phản Đòn.")}</p><div className={styles.goldRule} aria-hidden="true" /></div>
            </div>
            <aside className={styles.details} aria-label={copy("Cooldowns and power spikes", "Hồi chiêu và ngưỡng sức mạnh")}>
              <Card className={styles.panel} id="cooldowns">
                <div className={styles.panelHeading}><h2>{copy("Key cooldowns", "Hồi chiêu quan trọng")}</h2><span>AATROX</span></div>
                <div className={styles.cooldownBody}><p className={styles.smallNote}>{copy("Rank 1 · Base cooldowns", "Kỹ năng cấp 1 · Hồi chiêu cơ bản")}</p>
                  {data.keyCooldowns.map(ability => <div key={ability.abilityKey} className={styles.cooldown}><div className={styles.abilityRow}><div className={styles.abilityIcon}><Image src={`/images/matchup/abilities/aatrox-${ability.abilityKey.toLowerCase()}.webp`} alt="" width={38} height={38} /><span>{ability.abilityKey}</span></div><h3>{ability.abilityName}</h3><strong>{ability.cooldownRank1}<small>s</small></strong></div><p>{ability.punishWindowTip}</p></div>)}
                </div>
              </Card>
              <section className={styles.power} id="power-spikes" aria-labelledby="power-title">
                <h2 id="power-title">{copy("Power spikes", "Ngưỡng sức mạnh")}</h2>
                <div role="group" aria-label={copy("Match stage", "Giai đoạn trận đấu")} className={styles.stageButtons}>{stages.map(item => <Button key={item.key} variant="tertiary" className={styles.stageButton} aria-label={item.label} aria-pressed={stage === item.key} onPress={() => setStage(item.key)}>{item.short}</Button>)}</div>
                <div className={styles.stageText} aria-live="polite"><h3>{stages.find(item => item.key === stage)?.label}</h3><p>{data.spikes[stage]}</p></div>
                <div className={styles.stageLegend}><span><i />Fiora</span><Swords size={13} aria-hidden="true" /><span>Aatrox<i /></span></div>
              </section>
            </aside>
          </div>
          <footer className={styles.footer}>
            <div className={styles.footerTop}><Link href={`/${locale}`} className={styles.brand}><Swords size={18} aria-hidden="true" />TOPGAP</Link><div className={styles.footerLine} /><PocSwitcher current="reference" className={styles.switcher} /></div>
            <div className={styles.credits}><p>{copy("POC · Sample gameplay data, not live patch advice.", "POC · Dữ liệu lối chơi mẫu, không theo phiên bản hiện tại.")}</p><Link href="https://developer.riotgames.com/docs/lol#data-dragon">{copy("Champion artwork: Riot Games", "Ảnh tướng: Riot Games")}<ArrowUpRight size={11} aria-hidden="true" /></Link></div>
          </footer>
        </div>
      </main>
    </div>
  </div>;
}
