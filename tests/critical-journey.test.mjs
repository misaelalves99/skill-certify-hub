import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [dashboardSource, certificationsSource, detailSource, catalogSource] =
  await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/certifications/page.tsx", import.meta.url), "utf8"),
    readFile(
      new URL("../app/certifications/[id]/page.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/certifications/catalog.ts", import.meta.url), "utf8"),
  ]);

const normalize = (source) => source.replace(/\s+/g, " ");

const dashboard = normalize(dashboardSource);
const certifications = normalize(certificationsSource);
const detail = normalize(detailSource);
const catalog = normalize(catalogSource);

test("critical journey connects dashboard to the certification catalog", () => {
  assert.match(dashboard, /href="\/certifications"/);
  assert.match(dashboard, /Browse synthetic catalog/);
  assert.match(certifications, /Browse the synthetic catalog/);
});

test("critical journey preserves the deterministic local catalog filter", () => {
  assert.match(certifications, /const \[query, setQuery\] = useState\(""\)/);
  assert.match(certifications, /query\.trim\(\)\.toLowerCase\(\)/);
  assert.match(
    certifications,
    /certification\.title, certification\.issuer, certification\.level/,
  );
  assert.match(certifications, /onChange=\{\(event\) => setQuery\(event\.target\.value\)\}/);
  assert.match(certifications, /No matching certifications/);
  assert.match(certifications, /onClick=\{\(\) => setQuery\(""\)\}/);
});

test("critical journey reaches a governed synthetic detail and returns to catalog", () => {
  assert.match(catalog, /id: "cert-typescript-practice"/);
  assert.match(certifications, /href=\{`\/certifications\/\$\{certification\.id\}`\}/);
  assert.match(certifications, /View synthetic detail/);
  assert.match(detail, /findCertification\(id\)/);
  assert.match(detail, /href="\/certifications"/);
  assert.match(detail, /Back to certifications/);
  assert.match(detail, /Frontend-only synthetic record/);
});
