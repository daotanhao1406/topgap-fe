import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getProductionOrigin } from "./site";

type PageMetadata = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  index?: boolean;
};

export function createPageMetadata({
  locale,
  pathname,
  title,
  description,
  index = true,
}: PageMetadata): Metadata {
  const origin = getProductionOrigin();
  const localizedPath = (language: Locale) => `/${language}${pathname === "/" ? "" : pathname}`;
  const url = origin ? new URL(localizedPath(locale), origin).href : undefined;

  return {
    title,
    description,
    robots: { index, follow: true },
    ...(origin && {
      metadataBase: origin,
      alternates: {
        canonical: url,
        languages: {
          vi: new URL(localizedPath("vi"), origin).href,
          en: new URL(localizedPath("en"), origin).href,
        },
      },
    }),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Topgap",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? "en_US" : "vi_VN",
      ...(url && { url }),
    },
    twitter: { card: "summary", title, description },
  };
}
