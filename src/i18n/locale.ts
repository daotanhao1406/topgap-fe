import { hasLocale, type Locale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export type LocalePageProps = { params: Promise<{ locale: string }> };

export async function getPageLocale(params: LocalePageProps["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}
