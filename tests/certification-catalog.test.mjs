import assert from "node:assert/strict";
import test from "node:test";

const { certifications, findCertification } = await import(
  "../app/certifications/catalog.ts"
);

const expectedIds = [
  "cert-frontend-foundations",
  "cert-web-platform",
  "cert-typescript-practice",
];

test("certification catalog exposes the governed canonical synthetic identities", () => {
  assert.deepEqual(
    certifications.map((certification) => certification.id),
    expectedIds,
  );
  assert.equal(new Set(expectedIds).size, expectedIds.length);
});

test("certification lookup resolves each exact governed identity", () => {
  for (const certification of certifications) {
    assert.equal(findCertification(certification.id), certification);
  }
});

test("certification lookup does not fall back for unknown identity", () => {
  assert.equal(findCertification("cert-does-not-exist"), undefined);
  assert.equal(findCertification("CERT-WEB-PLATFORM"), undefined);
  assert.equal(findCertification("cert-web-platform "), undefined);
});

test("certification records expose only the approved frontend contract fields", () => {
  for (const certification of certifications) {
    assert.deepEqual(Object.keys(certification), [
      "id",
      "title",
      "issuer",
      "level",
      "summary",
    ]);
  }
});
