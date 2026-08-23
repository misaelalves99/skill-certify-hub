import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(
  new URL("../app/evidence/page.tsx", import.meta.url),
  "utf8",
);

const packageSource = await readFile(
  new URL("../package.json", import.meta.url),
  "utf8",
);

const normalizedPageSource = pageSource.replace(/\s+/g, " ");

test("evidence surface exposes an accessible local link workflow", () => {
  assert.match(normalizedPageSource, /Register local evidence/);
  assert.match(normalizedPageSource, /htmlFor="evidence-url"/);
  assert.match(normalizedPageSource, /type="url"/);
  assert.match(normalizedPageSource, /aria-describedby="evidence-help"/);
  assert.match(normalizedPageSource, /Add local evidence/);
  assert.match(normalizedPageSource, /Clear local evidence/);
  assert.match(normalizedPageSource, /aria-live="polite"/);
});

test("evidence surface preserves frontend-only non-persistent boundaries", () => {
  assert.match(normalizedPageSource, /Nothing entered here is uploaded, persisted or synced/);
  assert.match(normalizedPageSource, /Refreshing the page intentionally clears the list/);
  assert.match(normalizedPageSource, /no upload, remote storage, account association, API, database or persistence/);
  assert.doesNotMatch(normalizedPageSource, /fetch\s*\(/);
  assert.doesNotMatch(normalizedPageSource, /localStorage|sessionStorage|indexedDB/i);
  assert.doesNotMatch(normalizedPageSource, /\bFormData\b|multipart\/form-data|type=["']file["']/i);
});

test("repository exposes a reproducible axe scan for the evidence route", () => {
  const packageJson = JSON.parse(packageSource);
  assert.equal(
    packageJson.scripts["a11y:axe"],
    "npx --yes @axe-core/cli@4.10.2 http://127.0.0.1:3000/evidence --exit",
  );
});
