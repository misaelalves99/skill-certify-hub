import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(
  new URL("../app/page.tsx", import.meta.url),
  "utf8",
);

const normalizedPageSource = pageSource.replace(/\s+/g, " ");

test("dashboard exposes the approved empty-state experience", () => {
  assert.match(normalizedPageSource, /Your certification workspace/);
  assert.match(normalizedPageSource, /Nothing to track yet/);
  assert.match(normalizedPageSource, /Your dashboard is ready for the catalog/);
  assert.match(normalizedPageSource, /Synthetic preview/);
});

test("dashboard exposes catalog navigation without implying deferred capabilities", () => {
  assert.match(normalizedPageSource, /No certifications or progress records are loaded/);
  assert.match(
    normalizedPageSource,
    /does not represent a connected account, saved progress, or live catalog data/,
  );
  assert.match(normalizedPageSource, /synthetic catalog/i);
  assert.match(normalizedPageSource, /href="\/certifications"/);
  assert.match(normalizedPageSource, /Browse synthetic catalog/);
  assert.match(
    normalizedPageSource,
    /remains intentionally empty rather than inventing user history, analytics, or backend state/,
  );
  assert.doesNotMatch(normalizedPageSource, />\s*(Sign in|Log in)\s*</i);
  assert.doesNotMatch(normalizedPageSource, /aria-label="(?:Saved progress|Live catalog)"/i);
});
