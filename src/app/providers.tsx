"use client";

import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@heroui/react";
import { useLocale } from "next-intl";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </ThemeProvider>
  );
}
