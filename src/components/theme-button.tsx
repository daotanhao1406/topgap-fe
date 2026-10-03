"use client";

import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function ThemeButton({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("ThemeToggle");

  return (
    <Button
      isIconOnly
      variant="tertiary"
      className={className}
      aria-label={t("ariaLabel")}
      onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun size={17} className="hidden dark:block" aria-hidden="true" />
      <Moon size={17} className="dark:hidden" aria-hidden="true" />
    </Button>
  );
}
