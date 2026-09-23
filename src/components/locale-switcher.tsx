"use client";

import { Label, ListBox, Select } from "@heroui/react";
import { Languages } from "lucide-react";
import { hasLocale, useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
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
  );
}
