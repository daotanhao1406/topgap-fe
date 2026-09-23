"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@heroui/react";
import { useLocale } from "next-intl";
import type { ReactNode } from "react";
import { getQueryClient } from "@/lib/query-client";

export function Providers({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
