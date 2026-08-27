import assert from "node:assert/strict";
import test from "node:test";

import { evaluateConfigSecretPolicy } from "../scripts/config-secret-guard.mjs";

function baselineFixture() {
  return {
    trackedFiles: [
      "app/page.tsx",
      "next.config.ts",
      ".github/workflows/quality.yml",
    ],
    gitignore: [".env*", "*.pem", "*.key", "*.p12", "*.pfx"].join("\n"),
    applicationFiles: {
      "app/page.tsx": "export default function Page() { return null; }",
      "next.config.ts": "const nextConfig = {}; export default nextConfig;",
    },
    workflowFiles: {
      ".github/workflows/quality.yml": [
        "name: Quality",
        "permissions:",
        "  contents: read",
      ].join("\n"),
    },
  };
}

function assertViolationContains(fixture, expectedFragment) {
  const violations = evaluateConfigSecretPolicy(fixture);
  assert.ok(
    violations.some((violation) => violation.includes(expectedFragment)),
    `expected violation containing: ${expectedFragment}\n${violations.join("\n")}`,
  );
}

test("config/secret guard accepts the governed baseline fixture", () => {
  assert.deepEqual(evaluateConfigSecretPolicy(baselineFixture()), []);
});

test("config/secret guard rejects tracked environment files", () => {
  const fixture = baselineFixture();
  fixture.trackedFiles.push(".env.local");
  assertViolationContains(fixture, "tracked environment file");
});

test("config/secret guard rejects tracked key material", () => {
  const fixture = baselineFixture();
  fixture.trackedFiles.push("config/signing.key");
  assertViolationContains(fixture, "tracked key/certificate material");
});

test("config/secret guard rejects missing ignore protections", () => {
  const fixture = baselineFixture();
  fixture.gitignore = fixture.gitignore.replace(".env*\n", "");
  assertViolationContains(fixture, "missing required .gitignore rule: .env*");
});

test("config/secret guard requires review for process.env introduction", () => {
  const fixture = baselineFixture();
  fixture.applicationFiles["app/page.tsx"] =
    "const value = process.env.GOVERNED_TEST_VALUE; export default value;";
  assertViolationContains(fixture, "process.env usage requires explicit policy review");
});

test("config/secret guard requires review for NEXT_PUBLIC_ introduction", () => {
  const fixture = baselineFixture();
  fixture.applicationFiles["app/page.tsx"] =
    "const value = 'NEXT_PUBLIC_GOVERNED_TEST_VALUE'; export default value;";
  assertViolationContains(fixture, "NEXT_PUBLIC_ usage requires explicit policy review");
});

test("config/secret guard requires review for workflow secrets context", () => {
  const fixture = baselineFixture();
  fixture.workflowFiles[".github/workflows/quality.yml"] =
    "token: ${{ secrets.GOVERNED_TEST_TOKEN }}";
  assertViolationContains(fixture, "GitHub Actions secrets context");
});

test("config/secret guard requires review for workflow environment binding", () => {
  const fixture = baselineFixture();
  fixture.workflowFiles[".github/workflows/quality.yml"] =
    "jobs:\n  quality:\n    environment: governed-test";
  assertViolationContains(fixture, "GitHub Actions environment binding");
});
