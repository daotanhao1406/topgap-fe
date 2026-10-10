import { Card } from "@heroui/react";
import { Clock3 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { MatchupDetail } from "../model/types";
import {
  matchupPanelClasses,
  matchupPanelHeadingClasses,
  matchupPlanBodyClasses,
} from "./matchup-classes";

export function LanePlan({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");
  return (
    <Card className={matchupPanelClasses} id="lane-plan">
      <div className={matchupPanelHeadingClasses}>
        <h2>{t("lanePlan")}</h2>
        <Clock3 size={13} aria-hidden="true" />
      </div>
      <div className={matchupPlanBodyClasses}>
        <div className="min-h-28.25 [&_h3]:text-[color:var(--gold-bright)] [&_h3]:not-italic [&_h3]:font-bold [&_h3]:text-[24px] [&_h3]:leading-[1.35] [&_h3]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&_h3]:mb-2 [&_p]:text-[11px] [&_p]:leading-[1.9] max-[950px]:min-h-22.5 max-[700px]:min-h-0 max-[700px]:[&_p]:text-[12px] max-[700px]:[&_h3]:text-[25px]">
          <h3>{t("slowPush")}</h3>
          <p>{data.waveInstruction}</p>
        </div>
        <ol
          className="grid grid-cols-3 mt-4.5 mb-5.5 list-none relative p-0 mx-0 before:content-[''] before:absolute before:h-0.25 before:bg-[color:var(--gold-line)] before:top-3.5 before:left-[16%] before:right-[16%] [&_li]:relative [&_li]:text-center [&_li_>_span]:relative [&_li_>_span]:grid [&_li_>_span]:place-items-center [&_li_>_span]:w-7.25 [&_li_>_span]:h-7.25 [&_li_>_span]:border [&_li_>_span]:border-solid [&_li_>_span]:border-[color:var(--gold-line)] [&_li_>_span]:text-[color:var(--gold-bright)] [&_li_>_span]:bg-[color:var(--page)] [&_li_>_span]:rounded-full [&_li_>_span]:mt-0 [&_li_>_span]:mb-2 [&_li_>_span]:not-italic [&_li_>_span]:font-normal [&_li_>_span]:text-[12px] [&_li_>_span]:leading-[normal] [&_li_>_span]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&_li_>_span]:mx-auto [&_li:last-child_>_span]:border-[color:var(--gold)] [&_strong]:block [&_strong]:text-[color:var(--gold)] [&_strong]:text-[10px] [&_strong]:font-normal [&_p]:text-[9px] [&_p]:mt-0.5 [&_p]:text-[color:var(--muted)] max-[700px]:my-5.75 max-[700px]:[&_p]:text-[11px] max-[700px]:[&_strong]:text-[11px] max-[700px]:[&_li_>_span]:w-8 max-[700px]:[&_li_>_span]:h-8 max-[700px]:before:top-4"
          aria-label={t("earlyWaveSequence")}
        >
          {[1, 2, 3].map((wave) => (
            <li key={wave}>
              <span>{wave}</span>
              <strong>
                {t("wave")} {wave}
              </strong>
              <p>{wave === 3 ? t("crash245") : t("slowPush")}</p>
            </li>
          ))}
        </ol>
        <div className="flex items-center gap-2 border-t [border-top-style:solid] border-t-[color:var(--line)] pt-3.25 text-[9px] text-[color:var(--muted)] [&_svg]:text-[color:var(--gold)] [&_svg]:shrink-0 [&_strong]:font-normal [&_strong]:text-[color:var(--gold-bright)] [&_strong]:text-[11px] [&_strong]:ml-auto [&_strong]:whitespace-nowrap [&_strong]:tabular-nums max-[1150px]:flex-wrap max-[700px]:text-[10px] max-[700px]:[&_strong]:text-[12px]">
          <Clock3 size={15} aria-hidden="true" />
          <span>{t("jungleGankWindow")}</span>
          <strong>{data.jungleGankWarningTime}</strong>
        </div>
      </div>
    </Card>
  );
}
