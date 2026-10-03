"use client";

import { Label, ListBox, Select } from "@heroui/react";
import { Languages } from "lucide-react";
import { hasLocale, useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={locale}
        isDisabled={isPending}
        aria-label={t("label")}
        aria-busy={isPending}
        className="w-40"
        onChange={(nextLocale) => {
          if (typeof nextLocale !== "string" || !hasLocale(routing.locales, nextLocale)) return;

          const href = `${pathname}${window.location.search}${window.location.hash}`;
          startTransition(() => {
            router.replace(href, { locale: nextLocale, scroll: false });
          });
        }}
      >
        <Select.Trigger>
          <Languages size={18} className="shrink-0" aria-hidden="true" />
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {routing.locales.map((value) => (
              <ListBox.Item key={value} id={value} textValue={t(value)} lang={value}>
                <Label>{t(value)}</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      <nav aria-label={t("label")} className="flex gap-2 text-xs">
        {routing.locales.map((value) => (
          <Link
            key={value}
            href={pathname}
            locale={value}
            hrefLang={value}
            lang={value}
            aria-current={value === locale ? "page" : undefined}
            className="inline-flex min-h-11 items-center px-2 underline-offset-4 hover:underline aria-[current=page]:font-semibold"
          >
            {value.toUpperCase()}
          </Link>
        ))}
      </nav>
    </div>
  );
}
