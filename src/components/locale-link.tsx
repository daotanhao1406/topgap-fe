"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LocaleLink({ href, className }: { href: string; className?: string }) {
  const locale = useLocale() === "vi" ? "en" : "vi";

  return (
    <Link href={href} locale={locale} hrefLang={locale} lang={locale} className={className}>
      {locale.toUpperCase()}
    </Link>
  );
}
