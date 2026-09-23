"use client";

import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("ThemeToggle");

  return (
    <Button
      variant="secondary"
      aria-label={t("ariaLabel")}
      onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Moon size={18} className="dark:hidden" aria-hidden="true" />
      <Sun size={18} className="hidden dark:block" aria-hidden="true" />
      {t("label")}
    </Button>
  );
}
