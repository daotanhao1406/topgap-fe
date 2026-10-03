import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPageLocale, type LocalePageProps } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { Providers } from "../providers";
import "../globals.css";

const chakraPetch = Chakra_Petch({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-chakra-petch",
});

type Props = LocalePageProps & {
  children: React.ReactNode;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getPageLocale(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await getPageLocale(params);

  return (
    <html lang={locale} className={chakraPetch.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
