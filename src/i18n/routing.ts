import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "always",
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
});
