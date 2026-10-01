"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Card } from "@heroui/react";
import { Check, Clock3, Swords, X } from "lucide-react";
import type { MatchupDetail, PowerSpikes } from "./data";
import styles from "./reference-matchup.module.css";

type Props = {
  data: MatchupDetail;
  copy: (en: string, vi: string) => string;
  ignite: boolean;
  onIgniteChange: (ignite: boolean) => void;
  showOpponent?: boolean;
};

export function MatchupCards({ data, copy, ignite, onIgniteChange, showOpponent = true }: Props) {
  const [stage, setStage] = useState<keyof PowerSpikes>("level1to3");
  const stages: { key: keyof PowerSpikes; label: string; short: string }[] = [
    { key: "level1to3", label: copy("Levels 1–3", "Cấp 1–3"), short: "1–3" },
    { key: "level6", label: copy("Level six", "Cấp sáu"), short: "6" },
    { key: "firstBase", label: copy("First recall", "Lần về đầu"), short: copy("Recall", "Về nhà") },
    { key: "firstItem", label: copy("First item", "Trang bị đầu"), short: copy("Item", "Trang bị") },
  ];

  return <div className={styles.contentGrid}>
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
      {showOpponent ? <Card className={styles.panel}>
        <div className={styles.panelHeading}><h2>{copy("Opponent", "Đối thủ")}</h2><span>AATROX</span></div>
        <div className={styles.opponentBody}>
          <div className={styles.opponentIdentity}><div className={styles.smallAvatar}><Image src="/images/matchup/aatrox.webp" alt="" width={42} height={42} /></div><div><h3>Aatrox</h3><p>{copy("The Darkin Blade", "Quỷ Kiếm Darkin")}</p></div></div>
          <div className={styles.goldRule} aria-hidden="true" />
          <h3 className={styles.smallHeading}>{copy("Summoner spell", "Phép bổ trợ")}</h3>
          <div role="group" aria-label={copy("Opponent summoner spell", "Phép bổ trợ của đối thủ")} className={styles.spells}>{[false, true].map(value => <Button key={String(value)} variant="tertiary" className={styles.spellButton} aria-pressed={ignite === value} onPress={() => onIgniteChange(value)}><span className={styles.spellImage}><Image src={`/images/matchup/abilities/${value ? "ignite" : "teleport"}.webp`} width={36} height={36} alt="" />{ignite === value && <Check size={12} aria-hidden="true" />}</span><span>{value ? copy("Ignite", "Thiêu Đốt") : copy("Teleport", "Dịch Chuyển")}</span></Button>)}</div>
          <p className={styles.spellNote}>{copy("Select a spell to adapt your lane plan.", "Chọn phép để điều chỉnh kế hoạch lính.")}</p>
        </div>
      </Card> : null}
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
  </div>;
}
