import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [pageSource, catalogSource] = await Promise.all([
  readFile(new URL("../app/certifications/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/certifications/catalog.ts", import.meta.url), "utf8"),
]);

const normalizedPageSource = pageSource.replace(/\s+/g, " ");
const normalizedCatalogSource = catalogSource.replace(/\s+/g, " ");

test("certifications surface exposes synthetic responsive list and filter", () => {
  assert.match(normalizedPageSource, /Browse the synthetic catalog/);
  assert.match(normalizedPageSource, /Search synthetic certifications/);
  assert.match(normalizedCatalogSource, /Synthetic Learning Institute/);
  assert.match(normalizedCatalogSource, /Demo Standards Academy/);
  assert.match(normalizedCatalogSource, /Sample Developer Guild/);
  assert.match(normalizedPageSource, /No matching certifications/);
  assert.match(normalizedPageSource, /Clear filter/);
});

test("certifications surface links to governed synthetic detail without backend claims", () => {
  assert.match(normalizedPageSource, /These entries are not live or official/);
  assert.match(normalizedPageSource, /View synthetic detail/);
  assert.match(normalizedPageSource, /href={`\/certifications\/\$\{certification\.id\}`}/);
  assert.match(normalizedPageSource, /no asynchronous data source or backend/);
  assert.doesNotMatch(normalizedPageSource, /official certification|live issuer/i);
});
