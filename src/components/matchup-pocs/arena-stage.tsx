"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Link, Popover } from "@heroui/react";
import { ArrowDown, ArrowLeftRight, ChevronsUpDown, Swords } from "lucide-react";
import styles from "./arena-stage.module.css";

type Props = {
  champion: string;
  opponent: string;
  swapped: boolean;
  spell: 'TELEPORT' | 'IGNITE';
  copy: (en: string, vi: string) => string;
  onSwap: () => void;
  onSpellChange: (spell: 'TELEPORT' | 'IGNITE') => void;
};

export function ArenaStage({ champion, opponent, swapped, spell, copy, onSwap, onSpellChange }: Props) {
  const [isSpellPickerOpen, setIsSpellPickerOpen] = useState(false);
  const spells = {
    TELEPORT: {
      name: copy('Teleport', 'Dịch Chuyển'),
      description: copy('After channeling, teleport to an allied structure. Upgrades later in the match.', 'Sau khi niệm, dịch chuyển đến một công trình đồng minh. Phép được nâng cấp về cuối trận.'),
      cooldown: copy('Base cooldown: 360 seconds.', 'Hồi chiêu cơ bản: 360 giây.'),
    },
    IGNITE: {
      name: copy('Ignite', 'Thiêu Đốt'),
      description: copy('Deals true damage over time to an enemy champion and reduces healing while active.', 'Gây sát thương chuẩn theo thời gian lên một tướng địch và giảm hiệu quả hồi máu trong thời gian tác dụng.'),
      cooldown: copy('Base cooldown: 180 seconds.', 'Hồi chiêu cơ bản: 180 giây.'),
    },
  } as const;
  const selectedSpell = spells[spell];

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
        {!swapped && (index === 0 ? <div className={styles.loadout}>
          <span className={styles.iconFrame}><Image src="/images/matchup/abilities/fiora-w.webp" alt="" width={36} height={36} /><small>W</small></span>
          <span><small>{copy('KEY ABILITY', 'KỸ NĂNG CHỦ CHỐT')}</small><strong>{copy('Riposte', 'Phản Đòn')}</strong></span>
        </div> : <div className={`${styles.loadout} ${styles.enemySpellPicker}`}>
          <Popover isOpen={isSpellPickerOpen} onOpenChange={setIsSpellPickerOpen}>
            <Popover.Trigger className={styles.spellTrigger} aria-label={copy('Choose opponent summoner spell', 'Chọn phép bổ trợ của đối thủ')}>
              <span className={styles.selectedSpellIcon}><Image src={`/images/matchup/abilities/${spell.toLowerCase()}.webp`} alt="" width={36} height={36} /></span>
              <span className={styles.selectedSpellText}><small>{copy('ENEMY SPELL', 'PHÉP ĐỐI THỦ')}</small><strong>{selectedSpell.name}</strong></span>
              <ChevronsUpDown size={14} aria-hidden="true" />
            </Popover.Trigger>
            <Popover.Content placement="bottom end" offset={12} className={styles.spellPopover}>
              <Popover.Dialog className={styles.spellDialog}>
                <Popover.Heading className={styles.spellHeading}>{selectedSpell.name}</Popover.Heading>
                <p className={styles.spellDescription}>{selectedSpell.description}</p>
                <p className={styles.spellCooldown}>{selectedSpell.cooldown}</p>
                <div className={styles.spellDivider} aria-hidden="true" />
                <div role="group" aria-label={copy('Summoner spells', 'Phép bổ trợ')} className={styles.spellGrid}>
                  {(['TELEPORT', 'IGNITE'] as const).map(value => <Button key={value} isIconOnly variant="tertiary" className={styles.spellChoice} aria-label={spells[value].name} aria-pressed={spell === value} onPress={() => { onSpellChange(value); setIsSpellPickerOpen(false); }}>
                    <span className={styles.spellChoiceIcon}><Image src={`/images/matchup/abilities/${value.toLowerCase()}.webp`} alt="" width={48} height={48} /></span>
                  </Button>)}
                </div>
              </Popover.Dialog>
            </Popover.Content>
          </Popover>
        </div>)}
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
