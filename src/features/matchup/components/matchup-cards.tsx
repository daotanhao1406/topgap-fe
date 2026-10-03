import { useTranslations } from "next-intl";
import type { MatchupDetail, SupportedSummonerSpell } from "../model/types";
import { ChampionLoadout } from "./champion-loadout";
import { KeyCooldowns } from "./key-cooldowns";
import { LanePlan } from "./lane-plan";
import { MatchupRules } from "./matchup-rules";
import { PowerSpikes } from "./power-spikes";
import styles from "./reference-matchup.module.css";

type Props = { data: MatchupDetail } & (
  | { variant: "quick" }
  | {
      variant: "full";
      spell: SupportedSummonerSpell;
      onSpellChange: (spell: SupportedSummonerSpell) => void;
    }
);

export function MatchupCards(props: Props) {
  const t = useTranslations("Matchup");
  const { data, variant } = props;

  return (
    <div
      className={`${styles.contentGrid} ${variant === "quick" ? styles.contentGridWithoutLoadout : ""}`}
    >
      {props.variant === "full" && (
        <ChampionLoadout data={data} spell={props.spell} onSpellChange={props.onSpellChange} />
      )}
      <div className={styles.mainColumn}>
        {props.variant === "full" && <LanePlan data={data} spell={props.spell} />}
        <MatchupRules data={data} />
      </div>
      <aside
        className={styles.details}
        aria-label={variant === "full" ? t("cooldownsAndPowerSpikes") : t("keyCooldowns")}
      >
        <KeyCooldowns data={data} />
        {variant === "full" && <PowerSpikes data={data} />}
      </aside>
    </div>
  );
}
