import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { MatchupDetail } from "../model/types";
import { ChampionLoadout } from "./champion-loadout";
import { KeyCooldowns } from "./key-cooldowns";
import { LanePlan } from "./lane-plan";
import { MatchupRules } from "./matchup-rules";
import { PowerSpikes } from "./power-spikes";

type Props = { data: MatchupDetail } & (
  { variant: "quick"; afterRules?: ReactNode } | { variant: "full" }
);

export function MatchupCards(props: Props) {
  const t = useTranslations("Matchup");
  const { data, variant } = props;

  return (
    <div
      className={
        variant === "quick"
          ? "group/reference-quickContentGrid grid grid-cols-3 items-stretch gap-4 max-[1150px]:gap-3.25 max-[700px]:grid-cols-[minmax(0,_1fr)] max-[700px]:gap-4"
          : "grid grid-cols-[210px_minmax(0,_1fr)_270px] items-start gap-4 max-[1150px]:grid-cols-[190px_minmax(0,_1fr)_245px] max-[1150px]:gap-3.25 max-[950px]:grid-cols-[190px_minmax(0,_1fr)] max-[950px]:gap-4 max-[700px]:grid-cols-[1fr]"
      }
    >
      {props.variant === "full" && <ChampionLoadout data={data} />}
      <div className="min-w-0 grid gap-4 group-[&]/reference-quickContentGrid:col-span-2 group-[&]/reference-quickContentGrid:grid-cols-2 max-[700px]:row-start-1 max-[700px]:group-[&]/reference-quickContentGrid:col-auto max-[700px]:group-[&]/reference-quickContentGrid:grid-cols-1">
        {props.variant === "full" && <LanePlan data={data} />}
        <MatchupRules data={data} />
        {props.variant === "quick" ? props.afterRules : null}
      </div>
      <aside
        className="min-w-0 grid gap-4 group-[&]/reference-quickContentGrid:contents max-[950px]:col-span-full max-[950px]:grid-cols-[1fr_1fr] max-[950px]:items-start max-[700px]:col-auto max-[480px]:grid-cols-[1fr] max-[480px]:gap-5.5"
        aria-label={variant === "full" ? t("cooldownsAndPowerSpikes") : t("keyCooldowns")}
      >
        <KeyCooldowns data={data} />
        {variant === "full" && <PowerSpikes data={data} />}
      </aside>
    </div>
  );
}
