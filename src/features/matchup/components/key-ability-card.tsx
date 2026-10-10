import { Card } from "@heroui/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { championAssets } from "../model/assets";
import { matchupPanelClasses, matchupPanelHeadingClasses } from "./matchup-classes";

export function KeyAbilityCard({ description }: { description: string }) {
  const t = useTranslations("Matchup");

  return (
    <Card className={`${matchupPanelClasses} col-span-2 max-[700px]:col-auto`}>
      <div className={matchupPanelHeadingClasses}>
        <h2 className="group-[&]/reference-arenaCards:text-[14px]!">{t("keyAbility")}</h2>
        <span>FIORA</span>
      </div>
      <div className="flex items-start gap-3 p-4">
        <div className="relative shrink-0 border border-solid border-[color:var(--arena-metal)] bg-[color:var(--bg)] p-0.5">
          <Image src={championAssets.fiora.abilities.W} alt="" width={40} height={40} />
          <span className="absolute -right-1 -bottom-1 border border-solid border-[color:var(--arena-metal)] bg-[color:var(--bg)] px-1 text-[10px] text-[color:var(--accent)]">
            W
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold text-[color:var(--accent)]">{t("riposte")}</h3>
          <p className="mt-1 text-[14px] leading-[1.9] text-[color:var(--muted)]">{description}</p>
        </div>
      </div>
    </Card>
  );
}
