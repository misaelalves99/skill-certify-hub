import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(
  new URL("../app/practices/page.tsx", import.meta.url),
  "utf8",
);

const normalizedPageSource = pageSource.replace(/\s+/g, " ");

test("practices surface exposes only the canonical essential statuses", () => {
  assert.match(normalizedPageSource, /Practice by status/);
  assert.match(normalizedPageSource, /now, next and quarantine/);
  assert.match(normalizedPageSource, /Now/);
  assert.match(normalizedPageSource, /Next/);
  assert.match(normalizedPageSource, /Quarantine/);
  assert.match(normalizedPageSource, /Local synthetic state/);
});

test("practices status control exposes keyboard-operable tab semantics", () => {
  assert.match(normalizedPageSource, /role="tablist"/);
  assert.match(normalizedPageSource, /role="tab"/);
  assert.match(normalizedPageSource, /aria-selected/);
  assert.match(normalizedPageSource, /ArrowRight/);
  assert.match(normalizedPageSource, /ArrowLeft/);
  assert.match(normalizedPageSource, /ArrowDown/);
  assert.match(normalizedPageSource, /ArrowUp/);
  assert.match(normalizedPageSource, /Home/);
  assert.match(normalizedPageSource, /End/);
  assert.match(normalizedPageSource, /role="tabpanel"/);
});

test("practices surface preserves frontend-only state boundaries", () => {
  assert.match(
    normalizedPageSource,
    /Status changes exist only in this browser session/,
  );
  assert.match(
    normalizedPageSource,
    /They are not saved, synchronized, personalized or backed by an API\/database/,
  );
  assert.doesNotMatch(normalizedPageSource, /fetch\(|axios|localStorage|sessionStorage/);
  assert.doesNotMatch(normalizedPageSource, /Sign in|Log in|Upload evidence/i);
});
