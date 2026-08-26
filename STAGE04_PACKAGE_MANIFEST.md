# Stage 04 — G-P4 Package Manifest

## Purpose

This document materializes `task.skillcertify.04.014` and freezes the exact package/version/digest procedure that the human `04.015` decision must consume.

It does not decide G-P4, authorize Stage 05, implement a backend, or convert documentation/package coherence into runtime verification.

## 1. Package identity

- package id: `skillcertify-stage04-gp4`
- package version: `stage04-gp4-v1`
- source revision: `14a63df920808967a7ebc07ae1753f7f26d3a09c`
- digest algorithm: `SHA-256`
- payload files: `12`
- canonical payload bytes: `173134`
- canonical SHA-256: `a839e59a027d2aa8ad35b7f7f08ff0c3dc556f621154033de52bf4adc7c8e8e8`
- digest scope: canonical package payload bytes only
- manifest inclusion in digest: **excluded** to avoid self-reference

The source revision is the merge commit for `04.013` and is the immutable Stage 04 state assessed as package-ready.

## 2. Canonical payload

The package payload is the following ordered list, read exactly from the source revision above:

1. `DOMAIN_MODEL.md`
2. `DOMAIN_MODEL_CONTRACT.md`
3. `DOMAIN_INVARIANTS_INVENTORY.md`
4. `API_SERVICE_CONTRACT_BASELINE.md`
5. `SERVICE_BEHAVIOR_ERROR_CONTRACT.md`
6. `TRANSACTION_IDENTITY_AUTHORIZATION_BASELINE.md`
7. `AUTHORIZATION_SECURITY_CONTRACT.md`
8. `SERVICE_IMPLEMENTATION_READINESS.md`
9. `VERIFICATION_RELEASE_EVIDENCE_BASELINE.md`
10. `VERIFICATION_EXECUTION_REVIEW_CONTRACT.md`
11. `STAGE04_EVIDENCE_GATE_DECISION.md`
12. `STAGE04_ASSESSMENT.md`

The file order is normative. Adding, removing, renaming, reordering or changing any payload file requires a new package version/digest.

## 3. Exclusions

The following are intentionally outside the package digest:

- this manifest file;
- `.git` metadata;
- source code and frontend assets not listed above;
- `node_modules` and generated build output;
- historical Stage 03 evidence artifacts;
- issue/PR prose and conversation history;
- local terminal output not committed as payload;
- future `04.015` human decision artifact.

These exclusions prevent the package identity from depending on mutable review prose, generated output or self-referential metadata.

## 4. Canonical byte construction

The canonical package byte stream is constructed directly from Git object bytes at the frozen source revision.

For each payload path, in the exact order listed in Section 2:

1. resolve the file at source revision `14a63df920808967a7ebc07ae1753f7f26d3a09c`;
2. append the UTF-8 ASCII header bytes:
   `FILE:<path>\nSIZE:<decimal-byte-length>\n\n`
3. append the exact file bytes returned by `git show <revision>:<path>`;
4. append one LF byte (`0x0A`).

No newline normalization, whitespace trimming, Markdown rendering, archive metadata, timestamps, filesystem ordering or platform-specific path rewriting is permitted.

The explicit header plus byte length and fixed ordered file list prevents concatenation ambiguity.

## 5. Reproducible PowerShell construction and digest

Run from a clean clone containing the frozen source revision:

```powershell
$ErrorActionPreference = 'Stop'

$revision = '14a63df920808967a7ebc07ae1753f7f26d3a09c'
$packageVersion = 'stage04-gp4-v1'
$payload = @(
  'DOMAIN_MODEL.md',
  'DOMAIN_MODEL_CONTRACT.md',
  'DOMAIN_INVARIANTS_INVENTORY.md',
  'API_SERVICE_CONTRACT_BASELINE.md',
  'SERVICE_BEHAVIOR_ERROR_CONTRACT.md',
  'TRANSACTION_IDENTITY_AUTHORIZATION_BASELINE.md',
  'AUTHORIZATION_SECURITY_CONTRACT.md',
  'SERVICE_IMPLEMENTATION_READINESS.md',
  'VERIFICATION_RELEASE_EVIDENCE_BASELINE.md',
  'VERIFICATION_EXECUTION_REVIEW_CONTRACT.md',
  'STAGE04_EVIDENCE_GATE_DECISION.md',
  'STAGE04_ASSESSMENT.md'
)

$utf8 = [System.Text.UTF8Encoding]::new($false)
$stream = [System.IO.MemoryStream]::new()

foreach ($path in $payload) {
  $tmp = [System.IO.Path]::GetTempFileName()
  try {
    cmd /c "git show $revision`:$path > `"$tmp`""
    if ($LASTEXITCODE -ne 0) { throw "git show failed for $path" }

    $bytes = [System.IO.File]::ReadAllBytes($tmp)
    $header = $utf8.GetBytes("FILE:$path`nSIZE:$($bytes.Length)`n`n")
    $stream.Write($header, 0, $header.Length)
    $stream.Write($bytes, 0, $bytes.Length)
    $stream.WriteByte(10)
  }
  finally {
    Remove-Item $tmp -Force -ErrorAction SilentlyContinue
  }
}

$packageBytes = $stream.ToArray()
$sha256 = [System.Security.Cryptography.SHA256]::Create()
$digest = ([System.BitConverter]::ToString($sha256.ComputeHash($packageBytes))).Replace('-', '').ToLowerInvariant()

"package_id=skillcertify-stage04-gp4"
"package_version=$packageVersion"
"source_revision=$revision"
"payload_files=$($payload.Count)"
"payload_bytes=$($packageBytes.Length)"
"sha256=$digest"
```

Expected canonical output:

```text
package_id=skillcertify-stage04-gp4
package_version=stage04-gp4-v1
source_revision=14a63df920808967a7ebc07ae1753f7f26d3a09c
payload_files=12
payload_bytes=173134
sha256=a839e59a027d2aa8ad35b7f7f08ff0c3dc556f621154033de52bf4adc7c8e8e8
```

## 6. Digest verification rule

A reviewer must independently rerun the Section 5 procedure against the exact source revision and compare:

- package id;
- package version;
- source revision;
- payload file count;
- payload byte count;
- SHA-256 digest.

A mismatch in any of these fields invalidates the package identity for G-P4 review.

The digest must never be copied from narrative without reproduction.

## 7. Source revision versus manifest revision

Three identities are intentionally distinct:

1. **source revision** — `14a63df920808967a7ebc07ae1753f7f26d3a09c`, whose payload bytes are hashed;
2. **manifest revision** — the commit that records this file and canonical digest on the `04.014` branch;
3. **package digest** — `a839e59a027d2aa8ad35b7f7f08ff0c3dc556f621154033de52bf4adc7c8e8e8`, SHA-256 of the canonical payload stream built from the source revision.

The manifest commit is not part of the payload digest. This allows the manifest to record the externally reproduced digest without changing the bytes being hashed.

## 8. Residual risks and non-claims carried into the package

The package preserves the `04.013` conclusions and does not alter them:

- Stage 04 package coherence: package-ready;
- backend/runtime completion: not established;
- Certification collection read: implementation-ready, not runtime-verified;
- Certification exact-identity read: implementation-ready, not runtime-verified;
- remote Certification filtering/search: conditionally ready;
- Practice read: conditionally ready;
- Practice mutation: blocked;
- durable Evidence operations: blocked;
- User/Account/Progress service surfaces: blocked;
- concrete API transport: absent;
- concrete persistence/database/ORM: unselected/unimplemented;
- auth provider/principal model: absent for future protected capabilities;
- backend contract-test execution: future-required;
- controlled backend `service_failure` evidence: future-required;
- dedicated SAST/DAST/penetration-test evidence: not established;
- production deployment/runtime health: not established.

A valid digest proves package-byte identity only. It does **not** prove runtime correctness, security, deployment readiness or G-P4 PASS.

## 9. Mutation/invalidation rule

After the canonical digest is recorded, any change to:

- source revision;
- payload list;
- payload order;
- package construction algorithm;
- payload file bytes;
- package version semantics;

invalidates the previous package identity and requires a new package version and digest.

Changes only to review commentary outside the payload do not change this digest, but they also cannot change what the package proves.

## 10. 04.014 completion boundary

`04.014` is complete only when:

1. this manifest is versioned;
2. repository quality remains green after the documentation change;
3. the Section 5 command is executed against the frozen source revision;
4. the exact payload byte count and SHA-256 digest are supplied as execution evidence;
5. an independent rerun reproduces the same identity or the discrepancy is resolved;
6. the final recorded package identity is handed to `04.015`.

The current recorded package identity is:

- package id: `skillcertify-stage04-gp4`;
- package version: `stage04-gp4-v1`;
- source revision: `14a63df920808967a7ebc07ae1753f7f26d3a09c`;
- payload files: `12`;
- payload bytes: `173134`;
- SHA-256: `a839e59a027d2aa8ad35b7f7f08ff0c3dc556f621154033de52bf4adc7c8e8e8`.

## 11. Human G-P4 boundary

This manifest creates package identity, not gate authority.

Only the human decision in `04.015`, explicitly bound to the reproduced `stage04-gp4-v1` digest and source revision, may issue the final G-P4 PASS/FAIL decision and any bounded authorization for `05.001`.
