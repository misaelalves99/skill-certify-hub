import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

const packagePath = "gate/g-p3-package-v1.json";
const expectedSha256 = "6A6AA758A0E53FAF768DE166BDB315628365C3A698F694C932A4B67034E2767E";

const canonicalBytes = execFileSync("git", ["show", `HEAD:${packagePath}`]);
const actualSha256 = createHash("sha256").update(canonicalBytes).digest("hex").toUpperCase();

console.log(`Package: ${packagePath}`);
console.log(`Expected SHA256: ${expectedSha256}`);
console.log(`Actual SHA256:   ${actualSha256}`);

if (actualSha256 !== expectedSha256) {
  console.error("G-P3 package digest mismatch.");
  process.exit(1);
}

console.log("G-P3 package digest verified against committed Git bytes.");
