"use client";

import Image from "next/image";
import { Button, Link } from "@heroui/react";
import { ArrowDown, ArrowLeftRight, Swords } from "lucide-react";
import styles from "./arena-stage.module.css";

type Props = {
  champion: string;
  opponent: string;
  swapped: boolean;
  spell: 'TELEPORT' | 'IGNITE';
  copy: (en: string, vi: string) => string;
  onSwap: () => void;
};

export function ArenaStage({ champion, opponent, swapped, spell, copy, onSwap }: Props) {
  return <header className={styles.stage}>
    <Image src="/images/matchup/arena-environment.webp" alt="" fill sizes="(max-width: 1279px) 100vw, 1200px" preload className={styles.backdrop} />
    <div className={styles.shade} />
    <div className={styles.heading}>
      <span>{copy('TOP LANE', 'ĐƯỜNG TRÊN')}</span>
      <h1 aria-live="polite">{champion} <span>vs</span> {opponent}</h1>
      <p>{copy('Know the duel. Own the lane.', 'Hiểu kèo đấu. Làm chủ đường trên.')}</p>
    </div>
    <div className={styles.duel}>
      {[champion, opponent].map((name, index) => <article key={`${index}-${name}`} className={`${styles.champion} ${index === 1 ? styles.enemy : ''}`}>
        <span className={styles.sideLabel}>{index === 0 ? copy('YOUR CHAMPION', 'TƯỚNG CỦA BẠN') : copy('OPPONENT', 'ĐỐI THỦ')}</span>
        <div className={styles.portraitFrame}>
          <Image src={`/images/matchup/${name.toLowerCase()}.webp`} alt={name} width={308} height={560} loading="eager" sizes="(max-width: 699px) 120px, 192px" className={styles.portrait} />
          <div className={styles.portraitWash} />
          <div className={styles.nameplate}><strong>{name}</strong><span>{name === 'Fiora' ? copy('The Grand Duelist', 'Nữ Kiếm Sư') : copy('The Darkin Blade', 'Quỷ Kiếm Darkin')}</span></div>
        </div>
        {!swapped && <div className={styles.loadout}>
          <span className={styles.iconFrame}><Image src={`/images/matchup/abilities/${index === 0 ? 'fiora-w' : spell === 'IGNITE' ? 'ignite' : 'teleport'}.webp`} alt="" width={36} height={36} />{index === 0 && <small>W</small>}</span>
          <span><small>{index === 0 ? copy('KEY ABILITY', 'KỸ NĂNG CHỦ CHỐT') : copy('ENEMY SPELL', 'PHÉP ĐỐI THỦ')}</small><strong>{index === 0 ? copy('Riposte', 'Phản Đòn') : spell === 'IGNITE' ? copy('Ignite', 'Thiêu Đốt') : copy('Teleport', 'Dịch Chuyển')}</strong></span>
        </div>}
      </article>)}
      <div className={styles.center}>
        <div className={styles.crest} aria-hidden="true"><Swords size={29} strokeWidth={1.2} /><span>VS</span></div>
        <span className={styles.centerLabel}>{copy('THE DUEL', 'CUỘC ĐỐI ĐẦU')}</span>
        <p>{swapped ? copy('Reverse guide unavailable', 'Chưa có hướng dẫn đảo chiều') : copy('One parry. A different fight.', 'Một nhịp phản đòn. Đổi chiều thế trận.')}</p>
        <div className={styles.separator} aria-hidden="true"><span /></div>
        <span className={styles.centerHint}>{copy('Prepare before the first wave', 'Sẵn sàng trước đợt lính đầu')}</span>
      </div>
    </div>
    <div className={styles.actions}>
      <Link href="#quick-card" className={styles.primary}>{copy('Open lane plan', 'Mở kế hoạch đi đường')}<ArrowDown size={14} aria-hidden="true" /></Link>
      <Button className={styles.swap} variant="secondary" aria-pressed={swapped} onPress={onSwap}><ArrowLeftRight size={15} aria-hidden="true" />{copy('Swap sides', 'Đổi bên')}</Button>
    </div>
  </header>;
}
