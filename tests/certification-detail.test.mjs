import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [detailSource, notFoundSource, catalogSource] = await Promise.all([
  readFile(new URL("../app/certifications/[id]/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/certifications/[id]/not-found.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/certifications/catalog.ts", import.meta.url), "utf8"),
]);

const detail = detailSource.replace(/\s+/g, " ");
const notFound = notFoundSource.replace(/\s+/g, " ");
const catalog = catalogSource.replace(/\s+/g, " ");

test("certification detail renders approved synthetic certification and issuer concepts", () => {
  assert.match(detail, /Certification detail/);
  assert.match(detail, /Synthetic data/);
  assert.match(detail, /Issuer/);
  assert.match(detail, /Level/);
  assert.match(detail, /Frontend-only synthetic record/);
  assert.match(detail, /Back to certifications/);
  assert.match(detail, /findCertification/);
  assert.match(catalog, /cert-frontend-foundations/);
  assert.match(catalog, /cert-web-platform/);
  assert.match(catalog, /cert-typescript-practice/);
});

test("certification detail preserves non-goals and honest not-found behavior", () => {
  assert.match(
    detail,
    /does not represent official certification requirements, pricing, prerequisites, renewal rules, live issuer data, saved progress, or a connected backend/,
  );
  assert.match(detail, /notFound\(\)/);
  assert.match(notFound, /Synthetic certification not found/);
  assert.match(notFound, /No live catalog or backend lookup was attempted/);
  assert.match(notFound, /Back to certifications/);
  assert.doesNotMatch(detail, /Sign in|Log in|Purchase|Enroll|Upload evidence/i);
});
