import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getProductionOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getProductionOrigin();
  if (!origin) return [];

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, new URL(`/${locale}`, origin).href]),
  );
  // The matchup study routes carry noindex and are intentionally excluded.
  return routing.locales.map((locale) => ({
    url: languages[locale],
    alternates: { languages },
  }));
}
