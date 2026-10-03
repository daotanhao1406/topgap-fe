import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { getTranslations } from "next-intl/server";
import { Heading, Paragraph } from "@heroui/react";
import { Link } from "@/i18n/navigation";
import { getPageLocale, type LocalePageProps } from "@/i18n/locale";
import { createPageMetadata } from "@/lib/metadata";
import { pocRoutes } from "@/features/matchup/routes";
import { buttonVariants } from "@heroui/styles";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await getPageLocale(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return createPageMetadata({
    locale,
    pathname: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Home() {
  const t = await getTranslations("Home");
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
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={pocRoutes.reference}
            className={buttonVariants({ variant: "secondary", className: "no-underline" })}
          >
            {t("referencePoc")} →
          </Link>
          <Link
            href={pocRoutes.arena}
            className={buttonVariants({ variant: "secondary", className: "no-underline" })}
          >
            {t("arenaPoc")} →
          </Link>
        </div>
      </div>
    </main>
  );
}
