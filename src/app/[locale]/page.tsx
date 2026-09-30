import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { getLocale, getTranslations } from "next-intl/server";
import { Code, Heading, Link, Paragraph } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";

export default async function Home() {
  const [t, locale] = await Promise.all([getTranslations("Home"), getLocale()]);
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Paragraph size="sm" weight="medium" color="muted" className="tracking-widest">
            TOPGAP
          </Paragraph>
          <div className="flex flex-wrap items-center gap-3">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <Heading level={1} className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t("title")}
        </Heading>
        <Paragraph color="muted" className="mt-6 text-lg leading-8">
          {t("description")}
        </Paragraph>
        <Paragraph color="muted" className="mt-4">
          {t.rich("edit", {
            code: (chunks) => (
              <Code className="break-words">
                {chunks}
              </Code>
            ),
          })}
        </Paragraph>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${locale}/matchup-reference`} className={buttonVariants({ variant: "secondary", className: "no-underline" })}>
            {locale === "vi" ? "POC Legends · Mẫu tham chiếu" : "Legends POC · References"} →
          </Link>
          <Link href={`/${locale}/matchup-arena`} className={buttonVariants({ variant: "secondary", className: "no-underline" })}>
            {t("arenaPoc")} →
          </Link>
        </div>
      </div>
    </main>
  );
}
