import assert from "node:assert/strict";

const base = process.env.TEST_BASE_URL ?? "http://localhost:3100";
const origin = process.env.NEXT_PUBLIC_SITE_URL;
const paths = ["", "/matchup-arena", "/matchup-reference"];

for (const locale of ["vi", "en"]) {
  for (const path of paths) {
    const route = `/${locale}${path}`;
    const response = await fetch(`${base}${route}`);
    const html = await response.text();
    assert.equal(response.status, 200, route);
    assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`), `${route}: document language`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: one main heading`);
    assert.match(html, /<main\b/, `${route}: semantic main`);
    assert.match(html, /<title>[^<]+<\/title>/, `${route}: title`);
    assert.match(html, /<meta name="description" content="[^"]+"/, `${route}: description`);
    assert.match(html, /<meta property="og:title"/, `${route}: social metadata`);
    assert.match(
      html,
      new RegExp(`<meta name="robots" content="${path ? "noindex" : "index"}, follow"`),
      `${route}: indexing policy`,
    );
    assert.ok(
      !html.includes("MISSING_MESSAGE") && !html.includes("INVALID_MESSAGE"),
      `${route}: translations`,
    );
    for (const language of ["vi", "en"]) {
      assert.ok(html.includes(`href="/${language}${path}"`), `${route}: discoverable locale link`);
    }
    if (origin) {
      assert.ok(
        html.includes(`rel="canonical" href="${new URL(route, origin).href}"`),
        `${route}: self canonical`,
      );
      for (const language of ["vi", "en"]) {
        assert.ok(
          html.includes(
            `hrefLang="${language}" href="${new URL(`/${language}${path}`, origin).href}"`,
          ),
          `${route}: hreflang ${language}`,
        );
      }
    }
    if (path) {
      assert.match(html, /Fiora/);
      assert.match(html, /Aatrox/);
      assert.ok(
        html.includes(locale === "vi" ? "Nên làm" : "Do"),
        `${route}: server rendered advice`,
      );
    }
    console.log(`PASS ${route}`);
  }
}

for (const path of ["/vi/nonexistent", "/en/nonexistent"]) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  assert.equal(response.status, 404, `${path}: missing route`);
  console.log(`PASS ${path}: 404`);
}
// The existing locale proxy redirects unsupported/unprefixed paths to the default locale.
assert.equal((await fetch(`${base}/fr/matchup-arena`)).status, 404);
console.log("PASS unsupported locale resolves to 404");
const sitemap = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
assert.ok(
  !xml.includes("matchup-arena") && !xml.includes("matchup-reference"),
  "Noindex studies excluded from sitemap",
);
if (origin)
  for (const locale of ["vi", "en"]) assert.ok(xml.includes(new URL(`/${locale}`, origin).href));
const robots = await fetch(`${base}/robots.txt`);
assert.equal(robots.status, 200);
const directives = await robots.text();
assert.match(directives, /Allow: \//);
if (origin) assert.ok(directives.includes(new URL("/sitemap.xml", origin).href));
console.log("PASS sitemap and robots");
