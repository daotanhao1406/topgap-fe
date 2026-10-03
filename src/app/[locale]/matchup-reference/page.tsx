import { getLocale, getTranslations } from "next-intl/server";
import { ReferenceMatchup } from "@/features/matchup/components/reference-matchup";
import { getSampleMatchup } from "@/features/matchup/model/sample-matchup";
import { pocRoutes } from "@/features/matchup/routes";
import { getPageLocale, type LocalePageProps } from "@/i18n/locale";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await getPageLocale(params);
  const t = await getTranslations({ locale, namespace: "PocMetadata" });
  return createPageMetadata({
    locale,
    pathname: pocRoutes.reference,
    title: t("referenceTitle"),
    description: t("referenceDescription"),
    index: false,
  });
}

export default async function ReferencePage() {
  const data = getSampleMatchup(await getLocale());
  return <ReferenceMatchup data={data} />;
}
