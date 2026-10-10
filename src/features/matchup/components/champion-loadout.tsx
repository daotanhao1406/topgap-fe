import { championAssets } from "../model/assets";
import Image from "next/image";
import { Card } from "@heroui/react";
import { useTranslations } from "next-intl";
import type { MatchupDetail } from "../model/types";
import { matchupPanelClasses, matchupPanelHeadingClasses } from "./matchup-classes";

export function ChampionLoadout({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");
  return (
    <aside
      className="min-w-0 grid gap-4 max-[700px]:grid-cols-[1fr_1fr] max-[700px]:items-start max-[700px]:group-[&]/reference-arenaCards:grid-cols-[1fr] max-[480px]:grid-cols-[1fr_1fr] max-[480px]:gap-3 max-[359px]:grid-cols-[1fr]"
      aria-label={t("champions")}
    >
      <Card className={matchupPanelClasses}>
        <div className={matchupPanelHeadingClasses}>
          <h2>{t("yourChampion2")}</h2>
          <span>TOP</span>
        </div>
        <div className="relative h-40.75 isolate overflow-hidden [&>img]:object-cover [&>img]:object-[67%_35%] [&>img]:z-[-2] after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(transparent_30%,_#151922e6_90%)] after:z-[-1] [&>div]:absolute [&>div]:inset-[auto_14px_12px] [&_h3]:text-[#dbbd7a] [&_h3]:not-italic [&_h3]:font-bold [&_h3]:text-[23px] [&_h3]:leading-[1.2] [&_h3]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&_span]:text-[#cbc9cf] [&_span]:text-[9px] max-[700px]:h-36.25 max-[480px]:h-30 max-[480px]:[&_h3]:text-[20px] max-[359px]:h-37.5 group-[&]/reference-arenaCards:after:bg-[linear-gradient(transparent_30%,_#191719e6_90%)] group-[&]/reference-arenaCards:[&_h3]:text-[#e9ba75] group-[&]/reference-arenaCards:[&_span]:text-[#efece6]">
          <Image
            src={championAssets.fiora.splash}
            alt=""
            fill
            sizes="(max-width: 700px) 90vw, 210px"
          />
          <div>
            <h3>Fiora</h3>
            <span>{t("theGrandDuelist")}</span>
          </div>
        </div>
        <div className="pt-0 pb-4.25 px-3.5 max-[700px]:pb-3.5">
          <div
            className="h-0.25 bg-[linear-gradient(90deg,_var(--gold-line),_var(--gold),_var(--gold-line))] relative mt-2 mb-4 mx-0.75 before:content-[''] before:absolute before:w-1 before:h-1 before:border before:border-solid before:border-[color:var(--gold)] before:bg-[color:var(--surface)] before:[transform:rotate(45deg)] before:top-[-1.5px] before:-left-0.75 after:content-[''] after:absolute after:w-1 after:h-1 after:border after:border-solid after:border-[color:var(--gold)] after:bg-[color:var(--surface)] after:[transform:rotate(45deg)] after:top-[-1.5px] after:-right-0.75 group-[&]/reference-duelNote:opacity-[0.65] group-[&]/reference-duelNote:mt-2 group-[&]/reference-duelNote:mb-3.5"
            aria-hidden="true"
          />
          <h3 className="text-[9px] font-semibold tracking-[0.035em] uppercase mb-3.25! max-[480px]:text-[8px]">
            {t("keyAbility2")}
          </h3>
          <div className="flex items-center gap-2.75 [&_h4]:text-[color:var(--gold-bright)] [&_h4]:not-italic [&_h4]:font-bold [&_h4]:text-[15px] [&_h4]:leading-[1.4] [&_h4]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&_p]:text-[color:var(--muted)] [&_p]:text-[9px] [&_p]:mt-0.75 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-2.5 max-[359px]:flex-row">
            <div className="relative border border-solid border-[color:var(--gold-line)] bg-[color:var(--nav)] shrink-0 p-0.5 [&>span]:absolute [&>span]:-right-1 [&>span]:-bottom-1 [&>span]:min-w-4 [&>span]:h-4.25 [&>span]:text-center [&>span]:border [&>span]:border-solid [&>span]:border-[color:var(--gold-line)] [&>span]:bg-[color:var(--nav)] [&>span]:text-[color:var(--gold-bright)] [&>span]:text-[9px] [&>span]:leading-3.75">
              <Image src={championAssets.fiora.abilities.W} alt="" width={40} height={40} />
              <span>W</span>
            </div>
            <div>
              <h4>{t("riposte")}</h4>
              <p>{t("holdForQ3OrW")}</p>
            </div>
          </div>
          <p className="text-[color:var(--muted)] text-[10px] leading-[1.85] mt-3.25! max-[700px]:text-[11px] max-[480px]:text-[10px]">
            {data.difficultyNote}
          </p>
        </div>
      </Card>
      <Card className={matchupPanelClasses}>
        <div className={matchupPanelHeadingClasses}>
          <h2>{t("opponent2")}</h2>
          <span>AATROX</span>
        </div>
        <div className="p-3.5 max-[480px]:p-3">
          <div className="flex gap-2.75 items-center [&_h3]:text-[color:var(--gold-bright)] [&_h3]:not-italic [&_h3]:font-bold [&_h3]:text-[17px] [&_h3]:leading-[1.4] [&_h3]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&_p]:text-[color:var(--muted)] [&_p]:text-[9px] max-[480px]:gap-2 max-[480px]:[&_h3]:text-[15px] max-[480px]:[&_p]:text-[8px]">
            <div className="w-10.5 h-10.5 border border-solid border-[color:var(--gold)] rounded-full shrink-0 p-0.5 [&_img]:w-full [&_img]:h-full [&_img]:rounded-full [&_img]:object-cover [&_img]:object-[center_17%] max-[480px]:w-8 max-[480px]:h-8">
              <Image src={championAssets.aatrox.portrait} alt="" width={42} height={42} />
            </div>
            <div>
              <h3>Aatrox</h3>
              <p>{t("theDarkinBlade")}</p>
            </div>
          </div>
        </div>
      </Card>
    </aside>
  );
}
