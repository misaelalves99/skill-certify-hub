import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [dashboardCss, certificationsCss, practicesCss] = await Promise.all([
  readFile(new URL("../app/page.module.css", import.meta.url), "utf8"),
  readFile(new URL("../app/certifications/page.module.css", import.meta.url), "utf8"),
  readFile(new URL("../app/practices/page.module.css", import.meta.url), "utf8"),
]);

const normalize = (source) => source.replace(/\s+/g, " ");

const dashboard = normalize(dashboardCss);
const certifications = normalize(certificationsCss);
const practices = normalize(practicesCss);

test("axe-reported auxiliary text uses the stronger secondary text token", () => {
  assert.match(
    dashboard,
    /\.nextStep span, \.nextStep small \{[^}]*color: var\(--color-text-secondary\)/,
  );

  assert.match(
    certifications,
    /\.resultsHeader > span \{[^}]*color: var\(--color-text-secondary\)/,
  );
  assert.match(
    certifications,
    /\.cardMeta span \{[^}]*color: var\(--color-text-secondary\)/,
  );
  assert.match(
    certifications,
    /\.boundaryNote \{[^}]*color: var\(--color-text-secondary\)/,
  );

  assert.match(
    practices,
    /\.resultsHeader > span \{[^}]*color: var\(--color-text-secondary\)/,
  );
  assert.match(
    practices,
    /\.cardStatus \{[^}]*color: var\(--color-text-secondary\)/,
  );
  assert.match(
    practices,
    /\.boundaryNote \{[^}]*color: var\(--color-text-secondary\)/,
  );
});
