import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { getSampleMatchup } from "../src/features/matchup/model/sample-matchup.ts";
import {
  abilityAssets,
  championAssets,
  summonerAssets,
} from "../src/features/matchup/model/assets.ts";

test("both locale fixtures describe the same matchup and mechanics", () => {
  const vi = getSampleMatchup("vi"),
    en = getSampleMatchup("en");
  assert.equal(vi.id, en.id);
  assert.equal(vi.championId, en.championId);
  assert.equal(vi.opponentId, en.opponentId);
  assert.notEqual(vi.waveInstruction, en.waveInstruction);
  for (const data of [vi, en]) {
    assert.equal(data.dos.length, 3);
    assert.equal(data.donts.length, 3);
    assert.equal(data.spellAdaptation.againstSpell, "IGNITE");
    assert.ok(data.spellAdaptation.adjustmentTip);
    assert.ok(
      data.spikes.level1to3 && data.spikes.level6 && data.spikes.firstBase && data.spikes.firstItem,
    );
    for (const ability of data.keyCooldowns) {
      assert.ok(abilityAssets[ability.assetId], `Missing icon for ${ability.assetId}`);
      assert.ok(ability.cooldownRank1 > 0);
      assert.equal(
        ability.cooldownRank1,
        en.keyCooldowns.find((item) => item.abilityKey === ability.abilityKey).cooldownRank1,
      );
    }
  }
});

test("every referenced champion, ability and spell mirror exists", () => {
  const files = [
    ...Object.values(championAssets).flatMap((champion) => [champion.portrait, champion.splash]),
    ...Object.values(abilityAssets),
    ...Object.values(summonerAssets).map((spell) => spell.icon),
  ];
  for (const file of files)
    assert.ok(existsSync(new URL(`../public${file}`, import.meta.url)), file);
});

test("Vietnamese and English message trees keep the same keys", () => {
  const messages = (locale) =>
    JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));
  const keys = (object, prefix = "") =>
    Object.entries(object)
      .flatMap(([key, value]) =>
        typeof value === "string" ? [`${prefix}${key}`] : keys(value, `${prefix}${key}.`),
      )
      .sort();
  assert.deepEqual(keys(messages("vi")), keys(messages("en")));
});
