import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { createPageMetadata } from "../src/lib/metadata.ts";
import { getProductionOrigin } from "../src/lib/site.ts";

const originalOrigin = process.env.NEXT_PUBLIC_SITE_URL;
afterEach(() => {
  if (originalOrigin === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = originalOrigin;
});

for (const locale of ["vi", "en"]) {
  test(`${locale}: canonical and reciprocal translations use the same content path`, () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://topgap.test";
    for (const pathname of ["/", "/matchup-arena", "/matchup-reference"]) {
      const metadata = createPageMetadata({
        locale,
        pathname,
        title: "Matchup",
        description: "Lane plan",
        index: pathname === "/",
      });
      const suffix = pathname === "/" ? "" : pathname;
      assert.equal(metadata.alternates.canonical, `https://topgap.test/${locale}${suffix}`);
      assert.deepEqual(metadata.alternates.languages, {
        vi: `https://topgap.test/vi${suffix}`,
        en: `https://topgap.test/en${suffix}`,
      });
      assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
      assert.equal(metadata.robots.index, pathname === "/");
      assert.equal(metadata.robots.follow, true);
    }
  });
}

test("an unconfigured origin never emits an invented production URL", () => {
  delete process.env.NEXT_PUBLIC_SITE_URL;
  const metadata = createPageMetadata({
    locale: "vi",
    pathname: "/",
    title: "Topgap",
    description: "Matchups",
  });
  assert.equal(getProductionOrigin(), undefined);
  assert.equal(metadata.alternates, undefined);
  assert.equal(metadata.openGraph.url, undefined);
});

test("invalid origins fail before metadata can generate inconsistent URLs", () => {
  for (const value of [
    "invalid",
    "ftp://topgap.test",
    "https://topgap.test/base",
    "https://user:secret@topgap.test",
    "https://topgap.test?sort=1",
    "https://topgap.test#section",
  ]) {
    process.env.NEXT_PUBLIC_SITE_URL = value;
    assert.throws(() => getProductionOrigin());
  }
  process.env.NEXT_PUBLIC_SITE_URL = " https://topgap.test/ ";
  assert.equal(getProductionOrigin().href, "https://topgap.test/");
});
