import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

test("foundation quality scripts are present and deterministic", () => {
  assert.equal(packageJson.scripts.lint, "eslint");
  assert.equal(packageJson.scripts.typecheck, "tsc --noEmit");
  assert.equal(packageJson.scripts.test, "node --test tests/*.test.mjs");
  assert.equal(
    packageJson.scripts.quality,
    "npm run lint && npm run typecheck && npm run test && npm run build",
  );
});

test("foundation remains on the approved core product baseline", () => {
  assert.equal(packageJson.dependencies.next, "16.3.2");
  assert.equal(packageJson.dependencies.react, "19.2.8");
  assert.equal(packageJson.dependencies["react-dom"], "19.2.8");
});
