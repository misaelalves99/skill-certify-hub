import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(
  new URL("../app/page.tsx", import.meta.url),
  "utf8",
);

test("dashboard exposes the approved empty-state experience", () => {
  assert.match(pageSource, /Your certification workspace/);
  assert.match(pageSource, /Nothing to track yet/);
  assert.match(pageSource, /Your dashboard is ready for the catalog/);
  assert.match(pageSource, /Synthetic preview/);
});

test("dashboard does not present deferred capabilities as implemented", () => {
  assert.match(pageSource, /No certifications or progress records are loaded/);
  assert.match(pageSource, /does not represent a connected account, saved progress, or live catalog data/);
  assert.match(pageSource, /Pending a governed implementation task/);
  assert.doesNotMatch(pageSource, /href="\/certifications"/);
});
