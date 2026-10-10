import { abilityAssets } from "../model/assets";
import Image from "next/image";
import { Card } from "@heroui/react";
import { useTranslations } from "next-intl";
import type { MatchupDetail } from "../model/types";
import { matchupPanelClasses, matchupPanelHeadingClasses } from "./matchup-classes";

export function KeyCooldowns({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");
  return (
    <Card className={matchupPanelClasses} id="cooldowns">
      <div className={matchupPanelHeadingClasses}>
        <h2 className="group-[&]/reference-arenaCards:text-[14px]!">{t("keyCooldowns")}</h2>
        <span>AATROX</span>
      </div>
      <div className="pt-3.25 pb-4.25 px-3.5 max-[950px]:px-4.5">
        <p className="text-[8px] text-[color:var(--muted)] max-[480px]:text-[9px]">
          {t("rank1BaseCooldowns")}
        </p>
        {data.keyCooldowns.map((ability) => (
          <div
            key={ability.abilityKey}
            className="mt-4.5 [&+&]:border-t [&+&]:[border-top-style:solid] [&+&]:border-t-[color:var(--line)] [&+&]:pt-4.25 [&>p]:mt-2.75 [&>p]:text-[color:var(--muted)] [&>p]:text-[10px] [&>p]:leading-[1.9] max-[480px]:[&>p]:text-[12px] group-[&]/reference-arenaCards:[&>p]:text-[14px]!"
          >
            <div className="flex items-center gap-2.5 [&_h3]:flex-1 [&_h3]:min-w-0 [&_h3]:text-[color:var(--gold-bright)] [&_h3]:not-italic [&_h3]:font-bold [&_h3]:text-[14px] [&_h3]:leading-[1.4] [&_h3]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&_strong]:not-italic [&_strong]:font-bold [&_strong]:text-[20px] [&_strong]:leading-[1.2] [&_strong]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&_strong]:text-[color:var(--text)] [&_strong]:whitespace-nowrap [&_strong]:tabular-nums [&_small]:text-[12px] [&_small]:font-normal max-[480px]:[&_h3]:text-[16px]">
              <div className="relative border border-solid border-[color:var(--gold-line)] bg-[color:var(--nav)] shrink-0 p-0.5 [&>span]:absolute [&>span]:-right-1 [&>span]:-bottom-1 [&>span]:min-w-4 [&>span]:h-4.25 [&>span]:text-center [&>span]:border [&>span]:border-solid [&>span]:border-[color:var(--gold-line)] [&>span]:bg-[color:var(--nav)] [&>span]:text-[color:var(--gold-bright)] [&>span]:text-[9px] [&>span]:leading-3.75">
                <Image src={abilityAssets[ability.assetId]} alt="" width={38} height={38} />
                <span>{ability.abilityKey}</span>
              </div>
              <h3>{ability.abilityName}</h3>
              <strong>
                {ability.cooldownRank1}
                <small>s</small>
              </strong>
            </div>
            <p>{ability.punishWindowTip}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
