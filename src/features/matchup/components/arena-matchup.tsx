"use client";

import type { MatchupDetail } from "../model/types";
import { useTranslations } from "next-intl";
import { Card } from "@heroui/react";
import { Link } from "@/i18n/navigation";
import { ThemeButton } from "@/components/theme-button";
import { LocaleLink } from "@/components/locale-link";
import { useMatchup } from "../model/use-matchup";
import { ArrowRight, Shield, Swords } from "lucide-react";
import { ArenaStage } from "./arena-stage";
import { PocSwitcher } from "./poc-switcher";
import { pocRoutes } from "../routes";
import { MatchupCards } from "./matchup-cards";
import { LevelTrades } from "./level-trades";
import { KeyAbilityCard } from "./key-ability-card";
import {
  matchupPanelClasses,
  matchupPanelHeadingClasses,
  matchupPlanBodyClasses,
} from "./matchup-classes";

export function ArenaMatchup({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");
  const { swapped, swap, champion, opponent } = useMatchup(data);

  return (
    <div className="[--bg:#100f10] [--surface:#191719] [--raised:#242123] [--text:#efece6] [--muted:#b7b0ad] [--line:#494042] [--accent:#e9ba75] [--accent-ink:#19120a] [--red:#efa4a0] [--green:#a5d8b3] min-h-[100dvh] text-[color:var(--text)] bg-[color:var(--bg)] font-sans [color-scheme:dark] [--arena-metal:#a18051] [--arena-edge:#66513b] [--arena-inset:#322820] bg-[radial-gradient(ellipse_at_50%_0%,_#41271b50,_transparent_780px)] [html.light_&]:[--bg:#f1ede6] [html.light_&]:[--surface:#fffdf9] [html.light_&]:[--raised:#e9e1d5] [html.light_&]:[--text:#302b29] [html.light_&]:[--muted:#655951] [html.light_&]:[--line:#c5b7a7] [html.light_&]:[--accent:#80511d] [html.light_&]:[--accent-ink:#ffffff] [html.light_&]:[--red:#a03935] [html.light_&]:[--green:#29613c] [html.light_&]:[color-scheme:light] [html.light_&]:[--arena-metal:#8f6d37] [html.light_&]:[--arena-edge:#b4a080] [html.light_&]:[--arena-inset:#e9e1d5] [:where(&)_a]:[transition:background-color_0.18s,_color_0.18s,_border-color_0.18s] [:where(&)_button]:[transition:background-color_0.18s,_color_0.18s,_border-color_0.18s] [:where(&)_:is(a,_button):focus-visible]:[outline:2px_solid_var(--accent)] [:where(&)_:is(a,_button):focus-visible]:outline-offset-5 [:where(&)_[data-focus-visible='true']]:[outline:2px_solid_var(--accent)] [:where(&)_[data-focus-visible='true']]:outline-offset-5 motion-reduce:[:where(&)_*]:animate-none! motion-reduce:[:where(&)_*]:transition-none! motion-reduce:[:where(&)_*::before]:animate-none! motion-reduce:[:where(&)_*::before]:transition-none! motion-reduce:[:where(&)_*::after]:animate-none! motion-reduce:[:where(&)_*::after]:transition-none!">
      <Link
        href="#quick-card"
        className="absolute -top-25 left-5 bg-[color:var(--surface)] text-[color:var(--accent)] p-3 [&:focus]:top-2.5 [&:focus]:z-[5]"
      >
        {t("skipToQuickCard")}
      </Link>
      <div className="max-w-360 px-10 py-0 mx-auto max-[900px]:px-6 max-[700px]:px-4">
        <nav
          className="flex items-center gap-7 min-h-16.5 border-b [border-bottom-style:solid] border-b-[color:var(--arena-edge)] relative max-[700px]:min-h-16.5 max-[700px]:gap-3 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-22.5 after:h-0.75 after:bg-[linear-gradient(90deg,_var(--accent),_var(--arena-edge))]"
          aria-label={t("mainNavigation")}
        >
          <Link
            href="/"
            className="text-[color:var(--text)] font-bold text-[22px] tracking-[-0.05em] no-underline [&_span]:text-[color:var(--accent)] [&_span]:ml-1"
          >
            TOPGAP<span>/</span>
          </Link>
          <span className="text-[color:var(--accent)] text-[10px] tracking-[0.08em] font-sans max-[700px]:hidden">
            {t("matchupLab")}
          </span>
          <div className="ml-auto flex gap-2 items-center">
            <LocaleLink
              href={pocRoutes.arena}
              className="text-[color:var(--text)] text-[11px] p-3.5"
            />
            <ThemeButton className="w-11 h-11 min-w-11 border border-solid border-[color:var(--arena-edge)] rounded-none text-[color:var(--text)] bg-[linear-gradient(var(--raised),_var(--surface))] shadow-[inset_0_0_0_2px_var(--bg)] [&:hover]:text-[color:var(--accent)] [&:hover]:border-[color:var(--accent)]" />
          </div>
        </nav>
        <div className="flex justify-between items-center gap-3 text-[color:var(--muted)] px-0 py-3.25 [&>span]:text-[11px] [&_nav_a[aria-current='page']]:text-[color:var(--accent)] [&_nav_a[aria-current='page']]:bg-[color:var(--raised)] [&_nav_a[aria-current='page']]:no-underline [&_nav_a[aria-current='page']]:border-[color:var(--accent)] [&_nav_a[aria-current='page']]:shadow-[inset_0_-3px_var(--arena-metal),_inset_0_0_0_2px_var(--bg)] max-[700px]:[&>span]:hidden max-[700px]:[&_nav]:w-full max-[700px]:[&_nav_a]:flex-1 max-[700px]:[&_nav_a]:justify-center max-[700px]:[&_nav_a]:px-2 [&_nav_a]:border [&_nav_a]:border-solid [&_nav_a]:border-[color:var(--arena-edge)] [&_nav_a]:bg-[linear-gradient(var(--raised),_var(--surface))] [&_nav_a]:shadow-[inset_0_0_0_2px_var(--bg)] [&_nav_a]:px-5 max-[699px]:[&_nav_a]:px-2">
          <PocSwitcher current="arena" />
          <span>{t("designStudy")} / Arena</span>
        </div>

        <main id="main-content" className="w-full max-w-full overflow-x-clip">
          <ArenaStage champion={champion} opponent={opponent} swapped={swapped} onSwap={swap} />

          <section
            id="quick-card"
            aria-label={t("matchupGuide")}
            className="group/reference-arenaCards [--page:var(--bg)] [--nav:var(--bg)] [--surface:inherit] [--heading:var(--raised)] [--text:inherit] [--muted:inherit] [--gold:var(--accent)] [--gold-bright:var(--accent)] [--gold-line:var(--arena-metal)] [--line:inherit] [--green:inherit] [--red:inherit] min-h-0 bg-[color:var(--page)] text-[color:var(--text)] text-[1rem] leading-[1.65] [color-scheme:dark] w-full scroll-mt-5 p-0 mx-auto my-7.5 [html.light_&]:[color-scheme:light] font-sans! [:where(&)_a]:text-inherit [:where(&)_a]:no-underline [:where(&)_a:hover]:text-[color:var(--gold-bright)] [:where(&)_:is(a,_button):focus-visible]:[outline:2px_solid_var(--gold-bright)] [:where(&)_:is(a,_button):focus-visible]:outline-offset-3 [:where(&)_[data-focus-visible='true']]:[outline:2px_solid_var(--gold-bright)] [:where(&)_[data-focus-visible='true']]:outline-offset-3 motion-reduce:[:where(&)_*]:transition-none! motion-reduce:[:where(&)_*]:animate-none! motion-reduce:[:where(&)_*]:scroll-auto! motion-reduce:[:where(&)_*::before]:transition-none! motion-reduce:[:where(&)_*::before]:animate-none! motion-reduce:[:where(&)_*::before]:scroll-auto! motion-reduce:[:where(&)_*::after]:transition-none! motion-reduce:[:where(&)_*::after]:animate-none! motion-reduce:[:where(&)_*::after]:scroll-auto! [&_*]:font-sans!"
            data-matchup-cards
          >
            {swapped ? (
              <Card className={matchupPanelClasses}>
                <div className={matchupPanelHeadingClasses}>
                  <h2>{t("reverseMatchup")}</h2>
                  <Shield size={14} aria-hidden="true" />
                </div>
                <div className={matchupPlanBodyClasses}>
                  <p role="status">{t("onlyFioraAatroxIsAvailableSwapBackTo")}</p>
                </div>
              </Card>
            ) : (
              <MatchupCards
                variant="quick"
                data={data}
                afterRules={<KeyAbilityCard description={data.difficultyNote} />}
              />
            )}
          </section>

          {!swapped ? <LevelTrades /> : null}

          <div
            className="flex justify-center items-center gap-5 text-[color:var(--accent)] before:content-[''] before:h-0.25 before:flex-1 before:bg-[linear-gradient(90deg,_transparent,_var(--arena-metal))] after:content-[''] after:h-0.25 after:flex-1 after:bg-[linear-gradient(90deg,_transparent,_var(--arena-metal))] after:[transform:rotate(180deg)]"
            aria-hidden="true"
          >
            <Swords size={21} strokeWidth={1.4} />
          </div>
          <footer className="group/arena-footer flex flex-wrap items-center justify-between gap-5.5 pt-11.25 pb-7 px-0 [&_h2]:mt-2.5 [&_h2]:font-sans [&_h2]:text-[24px] [&_h2]:leading-[1.2] [&_h2]:text-[color:var(--accent)] [&_h2]:font-semibold max-[700px]:pt-8 max-[699px]:[&_h2]:text-[21px]">
            <div>
              <p className="block text-[10px] font-semibold tracking-[0.12em] text-[color:var(--muted)]">
                {t("pickYourView")}
              </p>
              <h2>{t("exploreLegends")}</h2>
            </div>
            <Link
              href={pocRoutes.reference}
              className="inline-flex items-center justify-center gap-3.5 min-h-11.5 bg-[color:var(--accent)] border border-solid border-[color:var(--accent)] text-[color:var(--accent-ink)] text-[12px] font-bold no-underline whitespace-nowrap px-4.5 py-3 [&:hover]:[filter:brightness(1.1)] group-[&]/arena-footer:border group-[&]/arena-footer:border-solid group-[&]/arena-footer:border-[color:var(--arena-metal)] group-[&]/arena-footer:shadow-[inset_0_0_0_2px_var(--bg)] group-[&]/arena-footer:text-[color:var(--accent)] group-[&]/arena-footer:bg-[linear-gradient(var(--raised),_var(--surface))]"
            >
              Legends
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <p className="basis-full pt-5 border-t [border-top-style:solid] border-t-[color:var(--line)] text-[10px] leading-[1.8] text-[color:var(--muted)] mt-2.5!">
              <span>{data.id} · </span>
              {t("prototypeGameplayDataChampionArtworkRiotGamesData")}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
