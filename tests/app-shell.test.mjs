import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [shellSource, shellStyles] = await Promise.all([
  readFile(new URL("../app/_components/AppShell.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/_components/AppShell.module.css", import.meta.url), "utf8"),
]);

const pageSources = await Promise.all(
  [
    "../app/page.tsx",
    "../app/certifications/page.tsx",
    "../app/practices/page.tsx",
    "../app/evidence/page.tsx",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
);

const normalizedShellSource = shellSource.replace(/\s+/g, " ");
const normalizedShellStyles = shellStyles.replace(/\s+/g, " ");

test("shared application shell owns repeated navigation semantics", () => {
  assert.match(normalizedShellSource, /function AppShell/);
  assert.match(normalizedShellSource, /Skip to main content/);
  assert.match(normalizedShellSource, /aria-label="Mobile navigation"/);
  assert.match(normalizedShellSource, /aria-label="Primary navigation"/);
  assert.match(normalizedShellSource, /aria-current=\{activePath === item\.href \? "page" : undefined\}/);
  assert.match(normalizedShellSource, /id="main-content"/);
});

test("shared shell keeps navigation notes on the stronger text token", () => {
  assert.match(
    normalizedShellStyles,
    /\.navLink small \{[^}]*color: var\(--color-text-secondary\)/,
  );
  assert.doesNotMatch(
    normalizedShellStyles,
    /\.navLink small \{[^}]*color: var\(--color-text-subtle\)/,
  );
});

test("dashboard and core frontend surfaces consume the shared shell", () => {
  const expectedPaths = ["/", "/certifications", "/practices", "/evidence"];

  pageSources.forEach((source, index) => {
    const normalized = source.replace(/\s+/g, " ");
    assert.match(normalized, /AppShell/);
    assert.match(normalized, new RegExp(`activePath="${expectedPaths[index].replace("/", "\\/")}"`));
    assert.doesNotMatch(normalized, /aria-label="Primary navigation"/);
    assert.doesNotMatch(normalized, /aria-label="Mobile navigation"/);
  });
});
