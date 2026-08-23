import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(
  new URL("../app/certifications/page.tsx", import.meta.url),
  "utf8",
);

const normalizedPageSource = pageSource.replace(/\s+/g, " ");

test("certifications surface exposes synthetic responsive list and filter", () => {
  assert.match(normalizedPageSource, /Browse the synthetic catalog/);
  assert.match(normalizedPageSource, /Search synthetic certifications/);
  assert.match(normalizedPageSource, /Synthetic Learning Institute/);
  assert.match(normalizedPageSource, /Demo Standards Academy/);
  assert.match(normalizedPageSource, /Sample Developer Guild/);
  assert.match(normalizedPageSource, /No matching certifications/);
  assert.match(normalizedPageSource, /Clear filter/);
});

test("certifications surface preserves governed boundaries", () => {
  assert.match(normalizedPageSource, /These entries are not live or official/);
  assert.match(normalizedPageSource, /Detail view is deferred to the next governed task/);
  assert.match(normalizedPageSource, /no asynchronous data source or backend/);
  assert.doesNotMatch(normalizedPageSource, /href="\/certifications\//);
});
