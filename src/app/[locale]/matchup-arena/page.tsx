import { getLocale, getTranslations } from "next-intl/server";
import { ArenaMatchup } from "@/features/matchup/components/arena-matchup";
import { getSampleMatchup } from "@/features/matchup/model/sample-matchup";
import { pocRoutes } from "@/features/matchup/routes";
import { getPageLocale, type LocalePageProps } from "@/i18n/locale";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await getPageLocale(params);
  const t = await getTranslations({ locale, namespace: "PocMetadata" });
  return createPageMetadata({
    locale,
    pathname: pocRoutes.arena,
    title: t("arenaTitle"),
    description: t("arenaDescription"),
    index: false,
  });
}

export default async function ArenaPage() {
  const data = getSampleMatchup(await getLocale());
  return <ArenaMatchup data={data} />;
}
