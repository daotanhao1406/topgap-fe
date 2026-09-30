"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Button, Card, Chip, Link } from "@heroui/react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Clock3, Crosshair, Flame, Layers, Moon, Shield, Sun, Swords, X } from "lucide-react";
import { ArenaStage } from "./arena-stage";
import { mockFioraVsAatrox, vietnameseMatchup, type MatchupDetail, type PowerSpikes } from "./data";
import { PocSwitcher, pocRoutes } from "./poc-switcher";
import styles from "./pocs.module.css";

const PocMotion = dynamic(() => import("./motion"), { ssr: false });
type Copy = (en: string, vi: string) => string;
function Rules({ data, copy, positive }: { data: MatchupDetail; copy: Copy; positive: boolean }) {
  return <section className={styles.ruleBlock} aria-labelledby={positive ? "do-title" : "avoid-title"}>
    <h3 id={positive ? "do-title" : "avoid-title"} className={positive ? styles.green : styles.red}>
      {positive ? <Check size={17} aria-hidden="true" /> : <X size={17} aria-hidden="true" />}
      {positive ? copy('Play to win', 'Việc cần làm') : copy('Do not give him', 'Tránh mắc lỗi')}
    </h3>
    <ul>{(positive ? data.dos : data.donts).map(item => <li key={item}>
      {positive ? <Check size={15} className={styles.green} aria-hidden="true" /> : <X size={15} className={styles.red} aria-hidden="true" />}<span>{item}</span>
    </li>)}</ul>
  </section>;
}

function Cooldowns({ data, copy, illustrated = false }: { data: MatchupDetail; copy: Copy; illustrated?: boolean }) {
  return <section aria-labelledby="cooldown-title" className={styles.cooldowns}>
    <div className={styles.blockHeading}><h2 id="cooldown-title"><Crosshair size={18} aria-hidden="true" />{copy('Punish windows', 'Cửa sổ trừng phạt')}</h2><span>{copy('Rank 1', 'Cấp kỹ năng 1')}</span></div>
    <ul>{data.keyCooldowns.map(ability => <li key={ability.abilityKey}>
      <div className={styles.abilityRow}><span className={`${styles.abilityKey} ${illustrated ? styles.illustratedAbility : ''}`}>{illustrated && <Image src={`/images/matchup/abilities/aatrox-${ability.abilityKey.toLowerCase()}.webp`} alt="" width={56} height={56} />}<span>{ability.abilityKey}</span></span><h3>{ability.abilityName}</h3><strong>{ability.cooldownRank1}<small>s</small></strong></div>
      <p>{ability.punishWindowTip}</p>
    </li>)}</ul>
  </section>;
}

function SpikeCarousel({ data, copy }: { data: MatchupDetail; copy: Copy }) {
  const [stage, setStage] = useState(0);
  const stages: { key: keyof PowerSpikes; label: string; short: string }[] = [
    { key: 'level1to3', label: copy('Levels 1–3', 'Cấp 1–3'), short: '1–3' },
    { key: 'level6', label: copy('Level 6', 'Cấp 6'), short: '6' },
    { key: 'firstBase', label: copy('First base', 'Lần về đầu'), short: copy('Base', 'Về') },
    { key: 'firstItem', label: copy('First item', 'Trang bị đầu'), short: copy('Item', 'Đồ') },
  ];
  return <section className={styles.spikes} aria-labelledby="spike-title">
    <div className={styles.blockHeading}><h2 id="spike-title"><Layers size={18} aria-hidden="true" />{copy('Power spikes', 'Ngưỡng sức mạnh')}</h2>
      <div className="flex gap-1"><Button isIconOnly variant="tertiary" className={styles.iconButton} aria-label={copy('Previous stage', 'Mốc trước')} onPress={() => setStage(value => (value + 3) % 4)}><ChevronLeft size={17} /></Button><Button isIconOnly variant="tertiary" className={styles.iconButton} aria-label={copy('Next stage', 'Mốc tiếp theo')} onPress={() => setStage(value => (value + 1) % 4)}><ChevronRight size={17} /></Button></div>
    </div>
    <div role="group" aria-label={copy('Choose power spike', 'Chọn ngưỡng sức mạnh')} className={styles.stageButtons}>
      {stages.map((item, index) => <Button key={item.key} className={styles.stageButton} aria-pressed={stage === index} onPress={() => setStage(index)}>{item.short}</Button>)}
    </div>
    <div className={styles.stageContent} aria-live="polite"><span className={styles.muted}>{stages[stage].label}</span><p>{data.spikes[stages[stage].key]}</p></div>
    <dl className={styles.spikeList}>{stages.map((item, index) => <div key={item.key} data-active={stage === index}><dt>{item.label}</dt><dd>{data.spikes[item.key]}</dd></div>)}</dl>
  </section>;
}

export function MatchupExperience() {
  const locale = useLocale();
  const copy: Copy = (en, vi) => locale === 'vi' ? vi : en;
  const data = locale === 'vi' ? vietnameseMatchup : mockFioraVsAatrox;
  const [swapped, setSwapped] = useState(false);
  const [spell, setSpell] = useState<'TELEPORT' | 'IGNITE'>('TELEPORT');
  const [dark, setDark] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const champion = swapped ? data.opponentName : data.championName;
  const opponent = swapped ? data.championName : data.opponentName;
  const ignite = spell === data.spellAdaptation.againstSpell;

  return <div ref={root} className={`${styles.root} ${styles.arena}`} data-theme={dark ? 'dark' : 'light'}>
    <PocMotion root={root} swapped={swapped} />
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
        <ArenaStage champion={champion} opponent={opponent} swapped={swapped} spell={spell} copy={copy} onSwap={() => setSwapped(value => !value)} />

        <div className={styles.matchStrip}>
                      <span><Swords size={16} aria-hidden="true" /><span><small>{copy('DIFFICULTY', 'ĐỘ KHÓ')}</small><strong>{swapped ? 'UNKNOWN' : data.difficulty}</strong></span></span>
            <span><Layers size={16} aria-hidden="true" /><span><small>{copy('WAVE PLAN', 'KẾ HOẠCH LÍNH')}</small><strong>{swapped ? '—' : ignite ? copy('Give priority', 'Nhường quyền đẩy') : copy('Slow push', 'Đẩy chậm')}</strong></span></span>
            <span><Clock3 size={16} aria-hidden="true" /><span><small>{copy('JUNGLE ALERT', 'CẢNH GIÁC GANK')}</small><strong>{swapped ? '—' : data.jungleGankWarningTime}</strong></span></span>
        </div>

        <section id="quick-card" aria-labelledby="quick-title" className={styles.quickSection}>
          <div className={styles.quickHeading}><h2 id="quick-title" tabIndex={-1}><Swords className={styles.headingEmblem} size={21} aria-hidden="true" />{copy('Your next 30 seconds.', '30 giây trước trận.')}</h2><span className={styles.muted}>{copy('Read. Remember. Play.', 'Đọc. Ghi nhớ. Vào trận.')}</span></div>
          <div className={`${styles.board} grid-flow-dense`}>
            <Card className={`${styles.panel} ${styles.lanePanel}`}>
              <div className={styles.panelTop}><h3><Swords size={17} aria-hidden="true" />{copy('The matchup', 'Thế trận')}</h3><Chip className={styles.difficulty}><Chip.Label>{swapped ? 'UNKNOWN' : data.difficulty}</Chip.Label></Chip></div>
              <p className={styles.difficultyNote}>{swapped ? copy('Reverse matchup data is not available.', 'Chưa có dữ liệu cho kèo đảo chiều.') : data.difficultyNote}</p>
              {!swapped && <><div className={styles.waveBox}><span className={styles.label}>{copy('WAVE PLAN', 'KẾ HOẠCH LÍNH')}</span><strong>{ignite ? copy('Give priority', 'Nhường quyền đẩy') : copy('Slow push', 'Đẩy chậm')}</strong><p aria-live="polite">{ignite ? data.spellAdaptation.adjustmentTip : data.waveInstruction}</p>
                <ol className={styles.waveTrack} aria-label={copy('Early wave sequence', 'Trình tự đợt lính đầu')}>
                  {[1, 2, 3].map(wave => <li key={wave}><span>{wave}</span><small>{ignite ? (wave < 3 ? copy('Concede', 'Nhường') : copy('Stay safe', 'Giữ máu')) : wave < 3 ? copy('Slow push', 'Đẩy chậm') : copy('Crash · 2:45', 'Vào trụ · 2:45')}</small></li>)}
                </ol>
              </div>
                <div className={styles.gankBox}><Clock3 size={20} aria-hidden="true" /><div><span>{copy('JUNGLE ALERT', 'CẢNH GIÁC GANK')}</span><strong>{data.jungleGankWarningTime}</strong></div></div>
              </>}
            </Card>
            {swapped ? <Card className={`${styles.panel} ${styles.emptyState}`}><Shield size={28} aria-hidden="true" /><h3>{copy('A new perspective. No invented advice.', 'Đã đổi góc nhìn. Chưa có hướng dẫn.')}</h3><p role="status">{copy('Only Fiora → Aatrox is available. Swap back to restore the lane plan, spells and cooldowns.', 'Hiện chỉ có dữ liệu Fiora → Aatrox. Đổi lại để xem kế hoạch lính, phép bổ trợ và hồi chiêu.')}</p></Card> : <>
              <Card className={`${styles.panel} ${styles.rulesPanel}`}><Rules data={data} copy={copy} positive /><Rules data={data} copy={copy} positive={false} /></Card>
              <Card className={`${styles.panel} ${styles.spellPanel}`}>
                <h3 id="spell-label"><Flame size={17} aria-hidden="true" />{opponent} · {copy('Summoner spell', 'Phép bổ trợ')}</h3>
                <div role="group" aria-labelledby="spell-label" className={styles.spellGroup}>
                  <Button aria-pressed={spell === 'TELEPORT'} onPress={() => setSpell('TELEPORT')} className={styles.spellButton}><Image src="/images/matchup/abilities/teleport.webp" alt="" width={40} height={40} /><span>{copy('Teleport', 'Dịch Chuyển')}<small>TP</small></span>{spell === 'TELEPORT' && <Check className={styles.selectionMark} size={13} aria-hidden="true" />}</Button>
                  <Button aria-pressed={spell === 'IGNITE'} onPress={() => setSpell('IGNITE')} className={styles.spellButton}><Image src="/images/matchup/abilities/ignite.webp" alt="" width={40} height={40} /><span>{copy('Ignite', 'Thiêu Đốt')}<small>IGN</small></span>{spell === 'IGNITE' && <Check className={styles.selectionMark} size={13} aria-hidden="true" />}</Button>
                </div><p aria-live="polite" className={styles.spellTip}>{ignite ? data.spellAdaptation.adjustmentTip : copy('Follow the default slow-push plan. No extra adjustment in this mock.', 'Theo kế hoạch đẩy chậm mặc định. Bản mẫu không có điều chỉnh thêm.')}</p>
              </Card>
            </>}
          </div>
        </section>

        {!swapped && <section className={styles.deepDive} aria-labelledby="detail-title">
          <div className={styles.detailIntro}><span className={styles.label}>{copy('WHEN YOU HAVE MORE TIME', 'KHI CÒN THỜI GIAN')}</span><h2 id="detail-title">{copy('Win the small moments.', 'Thắng từ từng nhịp nhỏ.')}</h2><p>{copy('Know what to punish and when your advantage changes.', 'Biết khi nào có thể trừng phạt và lúc nào lợi thế đổi chiều.')}</p><p className={styles.revealLine}>{data.difficultyNote.split(' ').map((word, index) => <span key={index} data-reveal-word>{word} </span>)}</p></div>
          <div className={styles.detailCards}>
            <Card className={styles.panel} data-stack-card><Cooldowns data={data} copy={copy} illustrated /></Card>
            <Card className={styles.panel} data-stack-card><SpikeCarousel data={data} copy={copy} /></Card>
          </div>
        </section>}

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
