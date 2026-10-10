"use client";

import { Button } from "@heroui/react";
import { ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { championAssets } from "../model/assets";

type Props = {
  champion: string;
  opponent: string;
  swapped: boolean;
  onSwap: () => void;
};

export function ArenaStage({ champion, opponent, swapped, onSwap }: Props) {
  const t = useTranslations("Matchup");

  return (
    <header
      aria-labelledby="arena-matchup-title"
      className="relative isolate flex h-95 flex-col justify-end overflow-hidden rounded-xl border border-[color:var(--arena-metal)] bg-[#0b0d12] sm:h-100 lg:h-110"
    >
      {/* Overlapping masked splash artwork creates the poster's soft central blend. */}
      {[champion, opponent].map((name, index) => (
        <div
          key={`${index}-${name}`}
          data-enemy={index === 1 || undefined}
          className="pointer-events-none absolute inset-y-0 left-0 w-[62%] overflow-hidden [mask-image:linear-gradient(90deg,#000_65%,transparent)] data-[enemy]:right-0 data-[enemy]:left-auto data-[enemy]:w-[68%] data-[enemy]:[mask-image:linear-gradient(90deg,transparent,#000_30%)]"
        >
          <Image
            src={name === "Fiora" ? championAssets.fiora.splash : championAssets.aatrox.splash}
            alt={name}
            fill
            sizes={
              index === 0
                ? "(max-width: 700px) 62vw, (max-width: 1440px) 60vw, 844px"
                : "(max-width: 700px) 68vw, (max-width: 1440px) 66vw, 925px"
            }
            preload
            className={
              index === 0
                ? "origin-top-right scale-[1.3] object-cover object-[70%_20%] max-sm:scale-100 max-sm:object-[70%_top]"
                : "origin-center scale-[1.2] object-cover object-[70%_20%] max-sm:scale-100 max-sm:object-[70%_top]"
            }
          />
        </div>
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#090b1210_0%,transparent_35%,#090b124d_60%,#090b12c4_85%,#090b12e6_100%)]"
      />
      <div className="relative z-10 flex w-full flex-col items-start justify-between gap-5 p-5 sm:flex-row sm:items-end sm:gap-6 sm:p-7 lg:p-9">
        <h1
          id="arena-matchup-title"
          aria-label={`${champion} vs ${opponent}`}
          className="min-w-0 leading-none font-bold tracking-[-0.045em] uppercase"
        >
          <span className="block text-[clamp(28px,7vw,42px)] text-[#edf3fb] sm:text-[clamp(40px,5.2vw,72px)]">
            {champion}
          </span>
          <span className="mt-3 flex items-center gap-3 sm:mt-4 sm:gap-6">
            <span className="flex shrink-0 items-center gap-2 text-[16px] font-medium tracking-[0.02em] text-[#dab177] before:h-px before:w-4 before:bg-[linear-gradient(90deg,transparent,#dab177)] after:h-px after:w-4 after:bg-[linear-gradient(90deg,#dab177,transparent)] sm:gap-3 sm:text-[28px] sm:before:w-6 sm:after:w-6 lg:text-[36px]">
              VS
            </span>
            <span className="text-[clamp(36px,10vw,56px)] text-[#f1e9dc] sm:text-[clamp(48px,7.4vw,104px)]">
              {opponent}
            </span>
          </span>
        </h1>
        <Button
          variant="secondary"
          aria-pressed={swapped}
          onPress={onSwap}
          className="min-h-11 shrink-0 self-end gap-2 rounded-full border border-[#b88a50] bg-[linear-gradient(180deg,#e4bd82,#b58044)] px-5 text-[14px] font-semibold text-[#1d170f] shadow-[inset_0_1px_0_#ffe5b366] hover:brightness-110 focus-visible:outline-[#f1d2a3]! data-[focus-visible=true]:outline-[#f1d2a3]!"
        >
          <ArrowLeftRight size={18} aria-hidden="true" />
          {t("swapSides")}
        </Button>
      </div>
    </header>
  );
}
