"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Button, Card, Link } from "@heroui/react";
import { ArrowRight, Clock3, Layers, Moon, Shield, Sun, Swords } from "lucide-react";
import { ArenaStage } from "./arena-stage";
import { mockFioraVsAatrox, vietnameseMatchup } from "./data";
import { PocSwitcher, pocRoutes } from "./poc-switcher";
import styles from "./pocs.module.css";
import cardStyles from "./reference-matchup.module.css";
import { MatchupCards } from "./matchup-cards";

export function MatchupExperience() {
  const locale = useLocale();
  const copy = (en: string, vi: string) => locale === 'vi' ? vi : en;
  const data = locale === 'vi' ? vietnameseMatchup : mockFioraVsAatrox;
  const [swapped, setSwapped] = useState(false);
  const [spell, setSpell] = useState<'TELEPORT' | 'IGNITE'>('TELEPORT');
  const [dark, setDark] = useState(true);
  const champion = swapped ? data.opponentName : data.championName;
  const opponent = swapped ? data.championName : data.opponentName;
  const ignite = spell === data.spellAdaptation.againstSpell;

  return <div className={`${styles.root} ${styles.arena}`} data-theme={dark ? 'dark' : 'light'}>
    <Link href="#quick-card" className={styles.skip}>{copy('Skip to quick card', 'Đến thẻ nhanh')}</Link>
    <div className={styles.container}>
      <nav className={styles.topbar} aria-label={copy('Main navigation', 'Điều hướng chính')}>
        <Link href={`/${locale}`} className={styles.brand}>TOPGAP<span>/</span></Link>
        <span className={styles.navCaption}>{copy('MATCHUP LAB', 'PHÒNG CHIẾN THUẬT')}</span>
        <div className={styles.toolbar}><Link href={`/${locale === 'vi' ? 'en' : 'vi'}/${pocRoutes.arena}`} hrefLang={locale === 'vi' ? 'en' : 'vi'} className={styles.localeLink}>{locale === 'vi' ? 'EN' : 'VI'}</Link>
          <Button isIconOnly className={styles.iconButton} variant="tertiary" aria-label={copy('Toggle theme', 'Đổi sáng tối')} onPress={() => setDark(value => !value)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</Button></div>
      </nav>
      <div className={styles.designBar}><PocSwitcher current="arena" /><span>{copy('Design study', 'Bản thiết kế')} / Arena</span></div>

      <main id="main-content" className="w-full max-w-full overflow-x-clip">
        <ArenaStage champion={champion} opponent={opponent} swapped={swapped} spell={spell} copy={copy} onSwap={() => setSwapped(value => !value)} onSpellChange={setSpell} />

        <div className={styles.matchStrip}>
                      <span><Swords size={16} aria-hidden="true" /><span><small>{copy('DIFFICULTY', 'ĐỘ KHÓ')}</small><strong>{swapped ? 'UNKNOWN' : data.difficulty}</strong></span></span>
            <span><Layers size={16} aria-hidden="true" /><span><small>{copy('WAVE PLAN', 'KẾ HOẠCH LÍNH')}</small><strong>{swapped ? '—' : ignite ? copy('Give priority', 'Nhường quyền đẩy') : copy('Slow push', 'Đẩy chậm')}</strong></span></span>
            <span><Clock3 size={16} aria-hidden="true" /><span><small>{copy('JUNGLE ALERT', 'CẢNH GIÁC GANK')}</small><strong>{swapped ? '—' : data.jungleGankWarningTime}</strong></span></span>
        </div>

        <section id="quick-card" aria-label={copy('Matchup guide', 'Cẩm nang kèo đấu')} className={`${cardStyles.root} ${cardStyles.arenaCards}`} data-theme={dark ? 'dark' : 'light'} data-matchup-cards>
          {swapped ? <Card className={cardStyles.panel}>
            <div className={cardStyles.panelHeading}><h2>{copy('Reverse matchup', 'Kèo đảo chiều')}</h2><Shield size={14} aria-hidden="true" /></div>
            <div className={cardStyles.planBody}><p role="status">{copy('Only Fiora → Aatrox is available. Swap back to restore the lane plan, spells and cooldowns.', 'Hiện chỉ có dữ liệu Fiora → Aatrox. Đổi lại để xem kế hoạch lính, phép bổ trợ và hồi chiêu.')}</p></div>
          </Card> : <MatchupCards data={data} copy={copy} ignite={ignite} onIgniteChange={value => setSpell(value ? 'IGNITE' : 'TELEPORT')} showOpponent={false} />}
        </section>

        <div className={styles.arenaDivider} aria-hidden="true"><Swords size={21} strokeWidth={1.4} /></div>
        <footer className={styles.footer}>
          <div><p className={styles.label}>{copy('PICK YOUR VIEW', 'CHỌN GÓC NHÌN CỦA BẠN')}</p><h2>{copy('Explore Legends?', 'Khám phá Legends?')}</h2></div>
          <Link href={`/${locale}/${pocRoutes.reference}`} className={styles.primaryLink}>Legends<ArrowRight size={17} aria-hidden="true" /></Link>
          <p className={styles.credits}><span>{data.id} · </span>{copy('Prototype gameplay data. Champion artwork: Riot Games / Data Dragon. Environment: AI-generated.', 'Dữ liệu lối chơi mẫu. Ảnh tướng: Riot Games / Data Dragon. Phông cảnh: tạo bằng AI.')}</p>
        </footer>
      </main>
    </div>
  </div>;
}
