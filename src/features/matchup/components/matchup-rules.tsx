import { Card } from "@heroui/react";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { MatchupDetail } from "../model/types";
import { matchupPanelClasses, matchupPanelHeadingClasses } from "./matchup-classes";

export function MatchupRules({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");
  return (
    <>
      <div className="grid grid-cols-2 gap-3.25 group-[&]/reference-quickContentGrid:contents max-[1150px]:gap-2.5 max-[480px]:grid-cols-[1fr] max-[480px]:gap-3">
        {[true, false].map((positive) => (
          <Card key={String(positive)} className={matchupPanelClasses}>
            <div className={matchupPanelHeadingClasses}>
              <h2 className="group-[&]/reference-arenaCards:text-[14px]!">
                {positive ? t("do") : t("avoid")}
              </h2>
              {positive ? (
                <Check size={14} className="text-[color:var(--green)]!" aria-hidden="true" />
              ) : (
                <X size={14} className="text-[color:var(--red)]!" aria-hidden="true" />
              )}
            </div>
            <ul className="pt-3.75 pb-4.25 list-none grid gap-4 px-3 m-0 [&_li]:flex [&_li]:gap-2 [&_li]:items-start [&_li_svg]:mt-1 [&_li_svg]:shrink-0 [&_li_svg]:border [&_li_svg]:border-solid [&_li_svg]:border-[currentColor] [&_li_svg]:p-0.25 [&_p]:text-[10px] [&_p]:leading-[1.9] [&_p]:text-[color:var(--text)] max-[1150px]:px-2.5 max-[950px]:[&_p]:text-[11px] max-[700px]:px-3.5 max-[700px]:py-4 max-[700px]:[&_p]:text-[11px] max-[480px]:gap-3 max-[480px]:[&_p]:text-[12px] group-[&]/reference-arenaCards:[&_p]:text-[14px]!">
              {(positive ? data.dos : data.donts).map((tip) => (
                <li key={tip}>
                  {positive ? (
                    <Check size={12} className="text-[color:var(--green)]!" aria-hidden="true" />
                  ) : (
                    <X size={12} className="text-[color:var(--red)]!" aria-hidden="true" />
                  )}
                  <p>{tip}</p>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
}
