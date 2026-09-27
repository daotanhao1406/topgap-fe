"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Card, Chip, Link } from "@heroui/react";
import { ArrowLeftRight, Check, ChevronRight, Clock3, Flame, Moon, Shield, Sun, Swords, X, Zap } from "lucide-react";
import { useLocale } from "next-intl";

export type MatchupDifficulty = 'EASY' | 'SKILL' | 'HARD' | 'NIGHTMARE';
export type EarlyWaveStrategy = 'SLOW_PUSH' | 'CRASH_WAVE_3' | 'FREEZE' | 'GIVE_PRIO';
export type SummonerSpell = 'TELEPORT' | 'IGNITE' | 'GHOST';

export interface KeyCooldown {
  abilityKey: 'Q' | 'W' | 'E' | 'R';
  abilityName: string;
  cooldownRank1: number; // in seconds
  punishWindowTip: string;
}

export interface PowerSpikes {
  level1to3: string;
  level6: string;
  firstBase: string;
  firstItem: string;
}

export interface MatchupDetail {
  id: string;
  championId: string;        // 'fiora'
  championName: string;      // 'Fiora'
  opponentId: string;        // 'aatrox'
  opponentName: string;      // 'Aatrox'
  difficulty: MatchupDifficulty;
  difficultyNote: string;
  waveStrategy: EarlyWaveStrategy;
  waveInstruction: string;
  jungleGankWarningTime: string;
  dos: string[];
  donts: string[];
  keyCooldowns: KeyCooldown[];
  spikes: PowerSpikes;
  spellAdaptation: {
    againstSpell: SummonerSpell;
    adjustmentTip: string;
  };
}

// Route modules cannot export arbitrary values, so this fixture stays local.
const mockFioraVsAatrox: MatchupDetail = {
  id: 'fiora-vs-aatrox',
  championId: 'fiora',
  championName: 'Fiora',
  opponentId: 'aatrox',
  opponentName: 'Aatrox',
  difficulty: 'SKILL',
  difficultyNote: 'Totally relies on parrying (W) his Q3 or W.',
  waveStrategy: 'SLOW_PUSH',
  waveInstruction: 'Slow push wave 1-2, crash wave 3 at 2:45. Force him to use Q on waves.',
  jungleGankWarningTime: '3:15 - 3:30',
  dos: [
    'Q diagonally into Q1/Q2 sweetspots to hit vitals and dodge knockup.',
    'Hold W for his Q3 or to block W pull back.',
    'Walk back to reset bad vital positions.'
  ],
  donts: [
    'Do not use W randomly before he uses E or Q3.',
    'Do not all-in level 1 if he has Ignite and you miss first vital.',
    'Watch out for E+Q combos changing sweetspot location instantly.'
  ],
  keyCooldowns: [
    { abilityKey: 'Q', abilityName: 'The Darkin Blade', cooldownRank1: 14, punishWindowTip: '14s window after he uses all 3 Qs or let them expire.' },
    { abilityKey: 'W', abilityName: 'Infernal Chains', cooldownRank1: 20, punishWindowTip: '20s cooldown. If dodged, you control the lane c space.' }
  ],
  spikes: {
    level1to3: 'Even. Fiora wins on vitals; Aatrox wins on spacing.',
    level6: 'Fiora favored if R proc < 2.5s. Aatrox better teamfight extended drain tanking.',
    firstBase: 'Tiamat for Fiora (wave clear); Phage/Kindlegem for Aatrox (HP/CDR).',
    firstItem: 'Trinity/Hydra: Fiora begins to out-scale hard in 1v1.'
  },
  spellAdaptation: { againstSpell: 'IGNITE', adjustmentTip: 'He wants early kill. Concede prio wave 1-2, stay >70% HP.' }
};

const vietnameseMatchup: MatchupDetail = {
  ...mockFioraVsAatrox,
  difficultyNote: 'Phụ thuộc vào việc dùng W phản đòn Q3 hoặc W của Aatrox.',
  waveInstruction: 'Đẩy chậm đợt 1–2, đưa đợt 3 vào trụ lúc 2:45. Ép Aatrox dùng Q dọn lính.',
  dos: ['Q chéo qua vùng sát thương mạnh Q1/Q2 để đánh điểm yếu và né hất tung.', 'Giữ W để chặn Q3 hoặc cú kéo về của W.', 'Lùi lại để đổi vị trí điểm yếu bất lợi.'],
  donts: ['Không dùng W tùy tiện trước khi Aatrox dùng E hoặc Q3.', 'Không đánh đến cùng cấp 1 nếu Aatrox có Thiêu Đốt và bạn hụt điểm yếu đầu.', 'Cẩn thận combo E+Q đổi vị trí vùng sát thương mạnh ngay lập tức.'],
  keyCooldowns: [
    { abilityKey: 'Q', abilityName: 'Quỷ Kiếm Darkin', cooldownRank1: 14, punishWindowTip: 'Có 14 giây sau khi Aatrox dùng cả 3 Q hoặc để chuỗi Q hết hạn.' },
    { abilityKey: 'W', abilityName: 'Xiềng Xích Địa Ngục', cooldownRank1: 20, punishWindowTip: 'Hồi chiêu 20 giây. Né được W giúp bạn kiểm soát khoảng trống trên đường.' }
  ],
  spikes: {
    level1to3: 'Cân bằng. Fiora thắng nhờ điểm yếu; Aatrox thắng nhờ giữ khoảng cách.',
    level6: 'Fiora có lợi nếu kích hoạt hết R trong < 2,5 giây. Aatrox mạnh hơn trong giao tranh kéo dài.',
    firstBase: 'Fiora: Tiamat (dọn lính). Aatrox: Búa Gỗ/Hỏa Ngọc (máu/hồi chiêu).',
    firstItem: 'Tam Hợp/Rìu Mãng Xà: Fiora bắt đầu vượt trội trong đấu tay đôi.'
  },
  spellAdaptation: { againstSpell: 'IGNITE', adjustmentTip: 'Aatrox muốn hạ gục sớm. Nhường quyền đẩy đợt 1–2, giữ trên 70% máu.' }
};

type DisplayDifficulty = MatchupDifficulty | 'UNKNOWN';
const difficultyStyles: Record<DisplayDifficulty, string> = {
  EASY: 'difficulty-easy',
  SKILL: 'difficulty-skill',
  HARD: 'difficulty-hard',
  NIGHTMARE: 'difficulty-nightmare',
  UNKNOWN: 'difficulty-unknown'
};
const panel = 'tactical-panel p-5 sm:p-6';

export default function MatchupPocPage() {
  const locale = useLocale();
  const vi = locale === 'vi';
  const [swapped, setSwapped] = useState(false);
  const [spell, setSpell] = useState<'TELEPORT' | 'IGNITE'>('TELEPORT');
  const [dark, setDark] = useState(true);
  const data = vi ? vietnameseMatchup : mockFioraVsAatrox;
  const copy = (en: string, vn: string) => vi ? vn : en;
  const champion = swapped ? data.opponentName : data.championName;
  const opponent = swapped ? data.championName : data.opponentName;
  const difficulty: DisplayDifficulty = swapped ? 'UNKNOWN' : data.difficulty;
  const ignite = spell === data.spellAdaptation.againstSpell;
  const waveLabels: Record<EarlyWaveStrategy, string> = {
    SLOW_PUSH: copy('Slow push', 'Đẩy chậm'),
    CRASH_WAVE_3: copy('Crash wave 3', 'Đưa đợt 3 vào trụ'),
    FREEZE: copy('Freeze', 'Đóng băng lính'),
    GIVE_PRIO: copy('Give priority', 'Nhường quyền đẩy')
  };
  const stages: { key: keyof PowerSpikes; label: string }[] = [
    { key: 'level1to3', label: copy('Levels 1–3', 'Cấp 1–3') },
    { key: 'level6', label: copy('Level 6', 'Cấp 6') },
    { key: 'firstBase', label: copy('First base', 'Lần về đầu') },
    { key: 'firstItem', label: copy('First item', 'Trang bị đầu') }
  ];

  return (
    <div className="matchup-shell" data-theme={dark ? 'dark' : 'light'}>
      <meta name="robots" content="noindex, follow" />
      <main className="min-h-dvh px-4 pb-8 pt-4 sm:px-8 sm:pt-6">
        <div className="mx-auto max-w-6xl">
          <Link href="#quick-title" className="tactical-skip">{copy('Skip to lane plan', 'Đến kế hoạch đi đường')}</Link>
          <nav aria-label={copy('Page navigation', 'Điều hướng trang')} className="tactical-nav flex items-center justify-between gap-3 pb-4">
            <div className="flex items-center gap-5">
              <Link href={`/${locale}`} className="tactical-brand">TOPGAP</Link>
              <span className="tactical-muted hidden border-l border-current/20 pl-5 text-xs sm:block">{copy('Top lane companion', 'Trợ lý đường trên')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Link href={`/${vi ? 'en' : 'vi'}/matchup-poc`} lang={vi ? 'en' : 'vi'} hrefLang={vi ? 'en' : 'vi'} className="tactical-link px-3 py-3 text-xs">{vi ? 'English' : 'Tiếng Việt'}</Link>
              <Button isIconOnly variant="tertiary" className="tactical-button size-11" aria-label={copy('Toggle color theme', 'Đổi giao diện sáng tối')} onPress={() => setDark(value => !value)}>
                {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
              </Button>
            </div>
          </nav>
          <header className="tactical-matchup my-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-3 py-5 sm:my-8 sm:gap-8 sm:px-8 sm:py-7">
            <div className="flex min-w-0 flex-col items-center gap-3 sm:flex-row sm:gap-5">
              <div className="champion-frame champion-frame-ally">
                <Image src={`/images/matchup/${swapped ? data.opponentId : data.championId}.webp`} alt={copy(`${champion} champion portrait`, `Chân dung tướng ${champion}`)} width={308} height={560} preload sizes="(max-width: 639px) 72px, 100px" className="champion-image" />
              </div>
              <div className="min-w-0 text-center sm:text-left">
                <p className="tactical-cyan mb-1 text-[10px] font-semibold uppercase tracking-[0.18em]">{copy('Your champion', 'Tướng của bạn')}</p>
                <p className="tactical-display text-2xl sm:text-4xl">{champion}</p>
                <p className="tactical-muted mt-2 hidden text-xs lg:block">{champion === 'Fiora' ? copy('The Grand Duelist', 'Nữ Kiếm Sư') : copy('The Darkin Blade', 'Quỷ Kiếm Darkin')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Swords size={17} className="tactical-gold" aria-hidden="true" />
              <span aria-hidden="true" className="tactical-versus">VS</span>
              <span className="tactical-muted whitespace-nowrap text-[10px] uppercase tracking-widest">{copy('Top lane', 'Đường trên')}</span>
            </div>
            <div className="flex min-w-0 flex-col items-center gap-3 sm:flex-row-reverse sm:gap-5">
              <div className="champion-frame champion-frame-enemy">
                <Image src={`/images/matchup/${swapped ? data.championId : data.opponentId}.webp`} alt={copy(`${opponent} champion portrait`, `Chân dung tướng ${opponent}`)} width={308} height={560} preload sizes="(max-width: 639px) 72px, 100px" className="champion-image" />
              </div>
              <div className="min-w-0 text-center sm:text-right">
                <p className="tactical-red mb-1 text-[10px] font-semibold uppercase tracking-[0.18em]">{copy('Opponent', 'Đối thủ')}</p>
                <p className="tactical-display text-2xl sm:text-4xl">{opponent}</p>
                <p className="tactical-muted mt-2 hidden text-xs lg:block">{opponent === 'Aatrox' ? copy('The Darkin Blade', 'Quỷ Kiếm Darkin') : copy('The Grand Duelist', 'Nữ Kiếm Sư')}</p>
              </div>
            </div>
            <h1 className="sr-only" aria-live="polite">{champion} vs {opponent}: {copy('matchup copilot', 'trợ lý kèo đấu')}</h1>
            <div className="col-span-3 mt-1 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
              <p className="tactical-muted text-xs">{copy('Matchup', 'Kèo đấu')} <span className="tactical-gold mx-1">/</span> <code className="text-[11px]">{data.id}</code></p>
              <Button variant="secondary" className="tactical-button min-h-11 px-4 text-xs" aria-pressed={swapped} onPress={() => setSwapped(value => !value)}><ArrowLeftRight size={15} aria-hidden="true" />{copy('Swap sides', 'Đổi bên')}</Button>
            </div>
          </header>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <section aria-labelledby="quick-title" className="min-w-0 space-y-4">
              <div className="flex items-center gap-3 pb-1">
                <span className="tactical-diamond"><Zap size={17} aria-hidden="true" /></span>
                <div><p className="tactical-muted mb-1 text-[10px] uppercase tracking-[0.18em]">{copy('Before the first wave', 'Trước đợt lính đầu')}</p><h2 id="quick-title" tabIndex={-1} className="tactical-display text-xl sm:text-2xl">{copy('30-second quick card', 'Thẻ nhanh 30 giây')}</h2></div>
              </div>
              <Card className={panel}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="tactical-section-title"><Shield size={16} aria-hidden="true" />{copy('Lane plan', 'Kế hoạch đi đường')}</h3>
                  <Chip className={`tactical-badge border font-semibold ${difficultyStyles[difficulty]}`}><Chip.Label>{difficulty}</Chip.Label></Chip>
                </div>
                <p className="mt-3 text-sm leading-6">{swapped ? copy('Reverse matchup data is not available.', 'Chưa có dữ liệu cho kèo đấu đảo chiều.') : data.difficultyNote}</p>
                {!swapped && <>
                  <div className="mt-5 border-l-2 border-[var(--cyan)] py-1 pl-4">
                    <Chip className="tactical-badge tactical-wave-badge"><Chip.Label>{waveLabels[ignite ? 'GIVE_PRIO' : data.waveStrategy]}</Chip.Label></Chip>
                    <p className="mt-2 text-sm leading-6" aria-live="polite">{ignite ? data.spellAdaptation.adjustmentTip : data.waveInstruction}</p>
                  </div>
                  <div className="gank-warning mt-5 flex items-center gap-3 px-3 py-3">
                    <Clock3 size={19} className="shrink-0" aria-hidden="true" /><div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-1"><span className="text-xs">{copy('Jungle gank window', 'Cảnh giác rừng gank')}</span><strong className="font-mono text-sm tabular-nums">{data.jungleGankWarningTime}</strong></div>
                  </div>
                </>}
              </Card>
              {swapped ? (
                <Card className={panel}><p role="status" className="tactical-muted text-sm leading-6">{copy('Only Fiora → Aatrox advice is loaded. Swap back to view the quick card, cooldowns and power spikes. The URL has not changed.', 'Chỉ có hướng dẫn Fiora → Aatrox. Đổi lại để xem thẻ nhanh, hồi chiêu và ngưỡng sức mạnh. URL không thay đổi.')}</p></Card>
              ) : <>
                <Card className={panel}>
                  {[{ title: copy('Things you MUST do', 'Những điều PHẢI làm'), items: data.dos, positive: true }, { title: copy('Things to AVOID', 'Những điều cần TRÁNH'), items: data.donts, positive: false }].map(({ title, items, positive }) => (
                    <div key={title} className="rule-group">
                      <h3 className={`tactical-section-title ${positive ? 'tactical-green' : 'tactical-red'}`}>{positive ? <Check size={17} aria-hidden="true" /> : <X size={17} aria-hidden="true" />}{title}</h3>
                      <ul className="mt-3 space-y-3">
                        {items.map(item => <li key={item} className="flex gap-3 text-sm leading-6">{positive ? <Check size={16} className="tactical-green mt-1 shrink-0" aria-hidden="true" /> : <X size={16} className="tactical-red mt-1 shrink-0" aria-hidden="true" />}<span>{item}</span></li>)}
                      </ul>
                    </div>
                  ))}
                </Card>
                <Card className={panel}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 id="spell-label" className="tactical-section-title"><Flame size={16} aria-hidden="true" />{opponent} · {copy('Summoner spell', 'Phép bổ trợ')}</h3>
                    <div role="group" aria-labelledby="spell-label" className="flex gap-2">
                      <Button variant="secondary" className="tactical-button spell-button min-h-11 px-3 text-xs" aria-pressed={spell === 'TELEPORT'} onPress={() => setSpell('TELEPORT')}><Zap size={16} aria-hidden="true" />{copy('TP', 'Dịch Chuyển')}</Button>
                      <Button variant="secondary" className="tactical-button spell-button min-h-11 px-3 text-xs" aria-pressed={spell === 'IGNITE'} onPress={() => setSpell('IGNITE')}><Flame size={16} aria-hidden="true" />{copy('Ignite', 'Thiêu Đốt')}</Button>
                    </div>
                  </div>
                  <p aria-live="polite" className="tactical-muted mt-3 text-sm leading-6">{ignite ? data.spellAdaptation.adjustmentTip : copy('Teleport selected. Follow the default slow-push plan above.', 'Đã chọn Dịch Chuyển. Theo kế hoạch đẩy chậm ở trên.')}</p>
                </Card>
              </>}
            </section>
            {!swapped && <aside aria-label={copy('Matchup reference', 'Tra cứu kèo đấu')} className="min-w-0 space-y-6 lg:pt-[61px]">
              <section aria-labelledby="cooldown-title">
                <Card className={panel}>
                  <h2 id="cooldown-title" className="tactical-section-title"><Clock3 size={17} aria-hidden="true" />{copy('Cooldown cheat-sheet', 'Ghi nhớ hồi chiêu')}</h2>
                  <p className="tactical-muted mt-2 text-xs">{opponent} · {copy('Rank 1 · base cooldowns', 'Cấp kỹ năng 1 · hồi chiêu cơ bản')}</p>
                  <ul className="mt-5 space-y-5">
                    {data.keyCooldowns.map(ability => (
                      <li key={ability.abilityKey}>
                        <div className="flex items-center gap-3">
                          <span className="ability-key">{ability.abilityKey}</span>
                          <h3 className="min-w-0 flex-1 text-sm font-semibold">{ability.abilityName}</h3>
                          <span className="tactical-gold shrink-0 font-mono text-2xl tabular-nums">{ability.cooldownRank1}<span className="ml-0.5 text-xs">s</span></span>
                        </div>
                        <p className="tactical-muted mt-2 text-sm leading-6">{ability.punishWindowTip}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>
              <section aria-labelledby="spike-title">
                <Card className={panel}>
                  <h2 id="spike-title" className="tactical-section-title"><Swords size={17} aria-hidden="true" />{copy('Power spike comparison', 'Ngưỡng sức mạnh')}</h2>
                  <dl className="spike-timeline mt-5">
                    {stages.map(stage => <div key={stage.key} className="spike-stage"><dt className="tactical-gold mb-1 text-xs font-semibold">{stage.label}</dt><dd className="tactical-muted text-sm leading-6">{data.spikes[stage.key]}</dd></div>)}
                  </dl>
                </Card>
              </section>
            </aside>}
          </div>
          <footer className="tactical-muted mt-8 space-y-3 border-t border-[var(--line)] pt-5 text-[11px] leading-5">
            <p>{copy('POC · Supplied gameplay fixture, not live patch data.', 'POC · Dữ liệu lối chơi mẫu, không cập nhật theo phiên bản.')}</p>
            <p className="break-words">{copy('Proposed dynamic route', 'Đường dẫn động dự kiến')}: <code>/{locale}/matchups/[matchupId]</code> <ChevronRight size={11} className="inline" aria-hidden="true" /> <code>/{locale}/matchups/{data.id}</code></p>
            <p>{copy('Champion artwork', 'Ảnh tướng')}: <Link className="tactical-link inline text-[11px]" href="https://developer.riotgames.com/docs/lol#data-dragon">Riot Games / Data Dragon</Link></p>
          </footer>
        </div>
      </main>
      <style jsx global>{`
        .matchup-shell {
          --page: #071017; --surface: #0d1a23; --surface-raised: #12242e;
          --text: #dce4e5; --muted: #a0b1b9; --gold: #d2b879;
          --line: #34413e; --gold-line: #796744; --cyan: #77ccd1;
          --red: #efa2a2; --green: #93c9a7;
          color: var(--text); background: var(--page); color-scheme: dark;
          background-image: radial-gradient(ellipse at 50% 0%, #15333c 0, transparent 38rem);
        }
        .matchup-shell[data-theme='light'] {
          --page: #eaf0ef; --surface: #f8faf7; --surface-raised: #e2eae7;
          --text: #1b3038; --muted: #50636a; --gold: #795b21;
          --line: #c7d1cb; --gold-line: #a18b60; --cyan: #1e6873;
          --red: #9e343c; --green: #276642;
          color-scheme: light;
          background-image: radial-gradient(ellipse at 50% 0%, #d4e3de 0, transparent 38rem);
        }
        .matchup-shell .tactical-muted { color: var(--muted); }
        .matchup-shell .tactical-gold { color: var(--gold); }
        .matchup-shell .tactical-cyan { color: var(--cyan); }
        .matchup-shell .tactical-red { color: var(--red); }
        .matchup-shell .tactical-green { color: var(--green); }
        .matchup-shell .tactical-display, .matchup-shell .tactical-brand, .matchup-shell .tactical-versus {
          font-family: Georgia, 'Times New Roman', serif; color: var(--gold);
          font-weight: 600; letter-spacing: .025em;
        }
        .matchup-shell .tactical-brand { font-size: 1.2rem; letter-spacing: .13em; text-decoration: none; }
        .matchup-shell .tactical-nav { border-bottom: 1px solid var(--line); }
        .matchup-shell .tactical-link { color: var(--muted); }
        .matchup-shell .tactical-link:hover { color: var(--gold); }
        .matchup-shell .tactical-matchup {
          position: relative; border: 1px solid var(--gold-line); border-top: 2px solid var(--gold);
          background: var(--surface); box-shadow: inset 0 0 0 5px var(--page);
        }
        .matchup-shell .champion-frame {
          width: 72px; height: 90px; flex-shrink: 0; padding: 3px;
          border: 1px solid var(--gold-line); background: var(--page);
        }
        .matchup-shell .champion-frame-ally { border-bottom: 2px solid var(--cyan); }
        .matchup-shell .champion-frame-enemy { border-bottom: 2px solid var(--red); }
        .matchup-shell .champion-image { width: 100%; height: 100%; object-fit: cover; object-position: center 22%; }
        .matchup-shell .tactical-versus { font-size: 1.3rem; font-style: italic; }
        .matchup-shell .tactical-diamond {
          width: 38px; height: 38px; display: grid; place-items: center; flex-shrink: 0;
          border: 1px solid var(--gold-line); color: var(--gold); background: var(--surface);
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }
        .matchup-shell .tactical-panel {
          border-radius: 0; border: 1px solid var(--line); background: var(--surface);
          color: var(--text); box-shadow: none; gap: 0;
        }
        .matchup-shell .tactical-section-title { display: flex; align-items: center; gap: .5rem; font-size: .875rem; font-weight: 600; }
        .matchup-shell .tactical-button {
          border-radius: 0; border: 1px solid var(--gold-line); background: var(--surface-raised);
          color: var(--gold); font-weight: 600; white-space: nowrap;
          transition: background-color 150ms, border-color 150ms;
        }
        .matchup-shell .tactical-button:hover { background: var(--line); border-color: var(--gold); }
        .matchup-shell .tactical-button:active { background: var(--surface); }
        .matchup-shell :is(a, button):focus-visible, .matchup-shell [data-focus-visible='true'] { outline: 2px solid var(--cyan); outline-offset: 4px; }
        .matchup-shell .spell-button[aria-pressed='true'] { background: var(--gold); border-color: var(--gold); color: var(--page); }
        .matchup-shell .tactical-badge { border-radius: 0; height: auto; padding: .3rem .55rem; font-size: .65rem; letter-spacing: .06em; }
        .matchup-shell .tactical-wave-badge { border: 1px solid var(--cyan); background: transparent; color: var(--cyan); }
        .matchup-shell .difficulty-easy { color: var(--green); }
        .matchup-shell .difficulty-skill { color: var(--gold); }
        .matchup-shell .difficulty-hard { color: var(--red); }
        .matchup-shell .difficulty-nightmare { color: #c7a6ef; }
        .matchup-shell[data-theme='light'] .difficulty-nightmare { color: #6e3594; }
        .matchup-shell .difficulty-unknown { color: var(--muted); }
        .matchup-shell [class*='difficulty-'] { border-color: currentColor; background: transparent; }
        .matchup-shell .gank-warning { color: var(--gold); background: var(--surface-raised); border: 1px solid var(--line); }
        .matchup-shell .rule-group + .rule-group { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
        .matchup-shell .ability-key {
          width: 42px; height: 42px; display: grid; place-items: center; flex-shrink: 0;
          color: var(--gold); background: var(--page); border: 1px solid var(--gold-line);
          box-shadow: inset 0 0 0 3px var(--surface); font-family: Georgia, serif; font-size: 1.45rem;
        }
        .matchup-shell .spike-timeline { margin-left: 4px; border-left: 1px solid var(--gold-line); }
        .matchup-shell .spike-stage { position: relative; padding: 0 0 1.25rem 1.1rem; }
        .matchup-shell .spike-stage:last-child { padding-bottom: 0; }
        .matchup-shell .spike-stage::before { content: ''; position: absolute; left: -4px; top: 4px; width: 7px; height: 7px; background: var(--gold); transform: rotate(45deg); }
        .matchup-shell .tactical-skip { position: absolute; top: -100px; left: 1rem; padding: .75rem; background: var(--surface); color: var(--gold); }
        .matchup-shell .tactical-skip:focus { top: 1rem; z-index: 10; }
        @media (min-width: 640px) { .matchup-shell .champion-frame { width: 100px; height: 114px; } .matchup-shell .tactical-versus { font-size: 1.65rem; } }
        @media (prefers-reduced-motion: reduce) { .matchup-shell .tactical-button { transition: none; } }
      `}</style>
    </div>
  );
}
