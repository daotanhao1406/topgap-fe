import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Heading, Paragraph } from "@heroui/react";
import { linkVariants } from "@heroui/styles";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <Heading level={1} className="text-3xl font-semibold">{t("title")}</Heading>
      <Paragraph color="muted">{t("description")}</Paragraph>
      <Link href="/" className={linkVariants().base({ className: "underline underline-offset-4" })}>
        {t("back")}
      </Link>
    </main>
  );
}
