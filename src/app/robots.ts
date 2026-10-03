import type { MetadataRoute } from "next";
import { getProductionOrigin } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const origin = getProductionOrigin();
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(origin && { sitemap: new URL("/sitemap.xml", origin).href }),
  };
}
