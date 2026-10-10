import { championAssets } from "../model/assets";
import type { MatchupDetail } from "../model/types";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeButton } from "@/components/theme-button";
import { LocaleLink } from "@/components/locale-link";
import { ArrowUpRight, ChevronRight, Swords } from "lucide-react";
import { MatchupCards } from "./matchup-cards";
import { MatchupSections } from "./matchup-sections";
import { PocSwitcher } from "./poc-switcher";

export function ReferenceMatchup({ data }: { data: MatchupDetail }) {
  const t = useTranslations("Matchup");

  return (
    <div className="[--page:#0c1017] [--nav:#04070b] [--surface:#151922] [--heading:#1d212b] [--text:#d7d8dd] [--muted:#a2a3ae] [--gold:#b79b60] [--gold-bright:#d3b77c] [--gold-line:#77613c] [--line:#292d36] [--green:#85b995] [--red:#d28f8b] min-h-[100dvh] pt-15.5 pb-11.5 [background:#0a1735_url('/images/matchup/legends-wallpaper.webp')_center_top_/_max(1536px,_100vw)_auto_no-repeat_fixed] text-[color:var(--text)] text-[1rem] leading-[1.65] [color-scheme:dark] px-7.5 [html.light_&]:[--page:#e8e9ec] [html.light_&]:[--nav:#f4f3f0] [html.light_&]:[--surface:#f7f7f8] [html.light_&]:[--heading:#dedfe5] [html.light_&]:[--text:#30323b] [html.light_&]:[--muted:#5b5e69] [html.light_&]:[--gold:#79602e] [html.light_&]:[--gold-bright:#694f22] [html.light_&]:[--gold-line:#a88e5b] [html.light_&]:[--line:#c6c8d0] [html.light_&]:[--green:#347149] [html.light_&]:[--red:#9c4041] [html.light_&]:[color-scheme:light] [:where(&)_a]:text-inherit [:where(&)_a]:no-underline [:where(&)_a:hover]:text-[color:var(--gold-bright)] [:where(&)_:is(a,_button):focus-visible]:[outline:2px_solid_var(--gold-bright)] [:where(&)_:is(a,_button):focus-visible]:outline-offset-3 [:where(&)_[data-focus-visible='true']]:[outline:2px_solid_var(--gold-bright)] [:where(&)_[data-focus-visible='true']]:outline-offset-3 max-[1150px]:px-5.5 max-[1150px]:py-7 max-[700px]:bg-none max-[700px]:p-0 motion-reduce:[:where(&)_*]:transition-none! motion-reduce:[:where(&)_*]:animate-none! motion-reduce:[:where(&)_*]:scroll-auto! motion-reduce:[:where(&)_*::before]:transition-none! motion-reduce:[:where(&)_*::before]:animate-none! motion-reduce:[:where(&)_*::before]:scroll-auto! motion-reduce:[:where(&)_*::after]:transition-none! motion-reduce:[:where(&)_*::after]:animate-none! motion-reduce:[:where(&)_*::after]:scroll-auto!">
      <Link
        href="#lane-plan"
        className="absolute left-5 -top-25 bg-[color:var(--surface)] z-[10] p-3 [&:focus]:top-2.5"
      >
        {t("skipToLanePlan")}
      </Link>
      <div className="max-w-280 bg-[color:var(--page)] shadow-[0_0_36px_#03071355] mx-auto">
        <nav
          className="group/reference-nav flex items-center gap-10 min-h-14 bg-[color:var(--nav)] border-b [border-bottom-style:solid] border-b-[#2e303744] px-9.5 max-[1150px]:px-6.5 max-[700px]:min-h-14 max-[700px]:gap-5.5 max-[700px]:flex-wrap max-[700px]:px-4.5 max-[480px]:gap-3.75 max-[359px]:pt-2 max-[359px]:gap-y-[0]"
          aria-label={t("mainNavigation")}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.25 text-[color:var(--gold-bright)] not-italic font-bold text-[19px] leading-[1] font-[family-name:Georgia,_'Times_New_Roman',_serif] tracking-[0.09em] whitespace-nowrap [&_svg]:text-[color:var(--gold)] [&_svg]:shrink-0 group-[&]/reference-footer:text-[14px] max-[700px]:group-[&]/reference-nav:text-[16px] max-[700px]:[&_svg]:w-5 max-[480px]:group-[&]/reference-nav:text-[15px] max-[480px]:group-[&]/reference-nav:gap-1.25 max-[480px]:group-[&]/reference-footer:text-[12px] max-[359px]:group-[&]/reference-nav:text-[17px]"
          >
            <Swords size={24} strokeWidth={1.5} aria-hidden="true" />
            <span>TOPGAP</span>
          </Link>
          <div className="self-stretch flex gap-6.25 [&_a]:relative [&_a]:inline-flex [&_a]:items-center [&_a]:min-h-11 [&_a]:text-[color:var(--gold)] [&_a]:not-italic [&_a]:font-bold [&_a]:text-[12px] [&_a]:leading-[1.3] [&_a]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&_a]:uppercase [&_a]:tracking-[0.035em] [&_a[aria-current]]:text-[color:var(--gold-bright)] [&_a[aria-current]::after]:content-[''] [&_a[aria-current]::after]:absolute [&_a[aria-current]::after]:inset-[auto_0_0] [&_a[aria-current]::after]:h-0.25 [&_a[aria-current]::after]:bg-[color:var(--gold)] [&_a[aria-current]::after]:shadow-[0_-3px_10px_#c4a05a30] max-[700px]:gap-4.25 max-[700px]:[&_a]:text-[10px] max-[480px]:gap-3 max-[480px]:[&_a]:text-[9px] max-[359px]:order-[3] max-[359px]:w-full max-[359px]:justify-between max-[359px]:[&_a]:min-h-9">
            <Link href="/">{t("dashboard")}</Link>
            <Link href="/matchup-reference" aria-current="page">
              {t("matchups")}
            </Link>
            <Link href="/matchup-arena">Arena</Link>
          </div>
          <div className="ml-auto flex items-center gap-3.5 text-[color:var(--gold)] text-[10px] [&>a]:grid [&>a]:place-items-center [&>a]:min-h-11 [&>a]:min-w-7 max-[700px]:gap-1.25 max-[480px]:gap-0">
            <span className="text-[color:var(--muted)] text-[8px] tracking-[0.06em] border border-solid border-[color:var(--line)] rounded-[2px] px-1 py-0.25 max-[700px]:hidden">
              POC
            </span>
            <LocaleLink href="/matchup-reference" />
            <ThemeButton className="min-w-8.5 w-8.5 h-8.5 border border-solid border-[color:var(--line)] rounded-full bg-transparent text-[color:var(--gold)] max-[480px]:w-7.25 max-[480px]:min-w-7.25 max-[480px]:h-7.25" />
          </div>
        </nav>
        <main id="overview">
          <header className="h-50.5 relative overflow-hidden isolate bg-[#0c1119] text-[#e3e0d9] [&_h1]:text-[#ddbf80] [&_h1]:not-italic [&_h1]:font-bold [&_h1]:text-[32px] [&_h1]:leading-[1.3] [&_h1]:font-[family-name:Georgia,_'Times_New_Roman',_serif] [&_h1]:tracking-[0.01em] [&_h1_span]:text-[#baa67d] [&_h1_span]:text-[17px] [&_h1_span]:font-normal [&_h1_span]:mx-1.5 max-[700px]:h-47.5 max-[700px]:[&_h1]:text-[29px] max-[480px]:[&_h1]:text-[27px] max-[480px]:[&_h1_span]:text-[14px] max-[480px]:[&_h1_span]:mx-0.75">
            <div className="absolute inset-[0_auto_0_0] w-[60%] z-[-3] [mask-image:linear-gradient(90deg,_#000_55%,_transparent)] [&_img]:object-cover [&_img]:object-[68%_32%] max-[480px]:w-[80%]">
              <Image
                src={championAssets.fiora.splash}
                alt=""
                fill
                sizes="(max-width: 600px) 100vw, 640px"
                preload
              />
            </div>
            <div className="absolute inset-[0_0_0_auto] w-[59%] z-[-3] [mask-image:linear-gradient(270deg,_#000_70%,_transparent)] [&_img]:object-cover [&_img]:object-[58%_35%] max-[480px]:w-[65%]">
              <Image
                src={championAssets.aatrox.splash}
                alt=""
                fill
                sizes="(max-width: 600px) 100vw, 640px"
                preload
              />
            </div>
            <div className="absolute inset-0 z-[-1] bg-[linear-gradient(0deg,_#0c1017_0%,_#0c10179e_25%,_#0c101745_80%),_linear-gradient(90deg,_#0c1017a3,_transparent_65%,_#0c101733)] max-[700px]:bg-[linear-gradient(0deg,_#0c1017,_#0c101780_40%,_#0c101722),_linear-gradient(90deg,_#0c101799,_transparent)]" />
            <div className="flex absolute left-10 bottom-9.25 items-center gap-4.5 max-[1150px]:left-7 max-[700px]:left-5 max-[700px]:bottom-7 max-[700px]:gap-3.25 max-[480px]:left-4.5">
              <div className="border-2 border-solid border-[#b9a266] bg-[#0a1017] rounded-full w-20 h-20 shrink-0 shadow-[0_0_0_2px_#070b1099] p-0.75 [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:object-[center_17%] [&_img]:rounded-full group-[&]/reference-heroOpponent:w-15.5 group-[&]/reference-heroOpponent:h-15.5 max-[700px]:w-15.5 max-[700px]:h-15.5 max-[700px]:group-[&]/reference-heroOpponent:w-11.25 max-[700px]:group-[&]/reference-heroOpponent:h-11.25 max-[480px]:w-14 max-[480px]:h-14">
                <Image
                  src={championAssets.fiora.portrait}
                  alt={t("fioraPortrait")}
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <p className="text-[9px] tracking-[0.08em] text-[#d3b77c] mb-0.75! max-[700px]:text-[8px]">
                  {t("theGrandDuelist2")}
                </p>
                <h1>
                  Fiora <span>vs</span> Aatrox
                </h1>
                <p className="flex items-center gap-2.25 text-[10px] text-[#d4d4d9] mt-1.75! [&_svg]:text-[#c4ac76] max-[700px]:text-[9px]">
                  <Swords size={13} aria-hidden="true" />
                  {t("topLane2")}
                  <span>·</span>
                  {t("matchupGuide")}
                </p>
              </div>
            </div>
            <div className="group/reference-heroOpponent absolute bottom-9 right-10.5 flex items-center gap-3.25 [&>span]:max-w-21.25 [&>span]:text-[9px] [&>span]:tracking-[0.06em] [&>span]:leading-[1.7] [&>span]:text-[#d0b477] max-[1150px]:right-7 max-[950px]:[&>span]:hidden max-[700px]:right-5.5 max-[700px]:bottom-7.5 max-[480px]:hidden">
              <div className="border-2 border-solid border-[#b9a266] bg-[#0a1017] rounded-full w-20 h-20 shrink-0 shadow-[0_0_0_2px_#070b1099] p-0.75 [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:object-[center_17%] [&_img]:rounded-full group-[&]/reference-heroOpponent:w-15.5 group-[&]/reference-heroOpponent:h-15.5 max-[700px]:w-15.5 max-[700px]:h-15.5 max-[700px]:group-[&]/reference-heroOpponent:w-11.25 max-[700px]:group-[&]/reference-heroOpponent:h-11.25 max-[480px]:w-14 max-[480px]:h-14">
                <Image
                  src={championAssets.aatrox.portrait}
                  alt={t("aatroxPortrait")}
                  width={62}
                  height={62}
                />
              </div>
              <span>{t("theDarkinBlade2")}</span>
            </div>
          </header>
          <MatchupSections />
          <div className="pt-0 pb-5 px-9.5 max-[1150px]:px-6.5 max-[700px]:px-4.5">
            <div className="flex items-center gap-2 text-[color:var(--muted)] min-h-11.75 text-[9px] [&_a]:text-[color:var(--gold)] [&_svg]:text-[color:var(--gold)] max-[700px]:text-[8px]">
              <Link href="/">Topgap</Link>
              <ChevronRight size={11} aria-hidden="true" />
              <span>{t("matchups")}</span>
              <ChevronRight size={11} aria-hidden="true" />
              <span>Fiora vs Aatrox</span>
              <span className="ml-auto text-[color:var(--muted)] text-[8px] max-[700px]:hidden">
                {t("sampleMatchupData")}
              </span>
            </div>
            <MatchupCards variant="full" data={data} />
            <footer className="group/reference-footer mt-7 pt-5.25 border-t [border-top-style:solid] border-t-[color:var(--line)]">
              <div className="flex items-center gap-5.5 max-[480px]:gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2.25 text-[color:var(--gold-bright)] not-italic font-bold text-[19px] leading-[1] font-[family-name:Georgia,_'Times_New_Roman',_serif] tracking-[0.09em] whitespace-nowrap [&_svg]:text-[color:var(--gold)] [&_svg]:shrink-0 group-[&]/reference-footer:text-[14px] max-[700px]:group-[&]/reference-nav:text-[16px] max-[700px]:[&_svg]:w-5 max-[480px]:group-[&]/reference-nav:text-[15px] max-[480px]:group-[&]/reference-nav:gap-1.25 max-[480px]:group-[&]/reference-footer:text-[12px] max-[359px]:group-[&]/reference-nav:text-[17px]"
                >
                  <Swords size={18} aria-hidden="true" />
                  TOPGAP
                </Link>
                <div className="h-0.25 bg-[color:var(--line)] flex-1" />
                <PocSwitcher
                  current="reference"
                  className="flex gap-2.25 text-[color:var(--gold)] [&_a]:text-[9px] [&_a]:font-normal [&_a]:min-h-7.25 [&_a]:rounded-[15px] [&_a]:border [&_a]:border-solid [&_a]:border-[color:var(--line)] [&_a]:px-3.75 [&_a]:py-1 [&_a[aria-current]]:border-[color:var(--gold-line)] [&_a[aria-current]]:text-[color:var(--gold-bright)] [&_a[aria-current]]:no-underline max-[480px]:[&_a]:px-3"
                />
              </div>
              <div className="flex justify-between [align-items:baseline] gap-5 mt-4 text-[8px] text-[color:var(--muted)] [&_a]:inline-flex [&_a]:items-center [&_a]:gap-1 max-[700px]:flex-col max-[700px]:gap-1.25 max-[700px]:text-[9px]">
                <p>{t("pocSampleGameplayDataNotLivePatchAdvice")}</p>
                <Link href="https://developer.riotgames.com/docs/lol#data-dragon">
                  {t("championArtworkRiotGames")}
                  <ArrowUpRight size={11} aria-hidden="true" />
                </Link>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
