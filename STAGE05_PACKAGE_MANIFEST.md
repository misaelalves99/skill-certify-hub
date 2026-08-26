# Stage 05 — G-P5 Exact Package Manifest

## Purpose

This document materializes `task.skillcertify.05.011`.

It defines the exact Stage 05 evidence package that may later be presented to the human G-P5 decision in `05.012`.

This package does **not** pass G-P5.

```text
can_pass_gate=false
```

`05.011 package != G-P5 decision`.

## 1. Package identity

```yaml
package_id: package.skillcertify.stage05.gp5
package_version: "1.0.0"
record_type: stage05-gp5-package-manifest
stage: stage.skillcertify.05
producer_task: task.skillcertify.05.011
source_revision: 58e2ff9650eb9cfb33af7b9b28ce17027d7628d3
source_ref_role: fixed_merged_main_revision
hash_algorithm: SHA-256
serialization: git-blob-bytes-with-length-prefix-v1
can_pass_gate: false
gate_decision_task: task.skillcertify.05.012
next_stage_authorized: false
```

The authoritative source revision is the merged `main` commit for `05.010`:

`58e2ff9650eb9cfb33af7b9b28ce17027d7628d3`

A moving branch head is **not** an admissible substitute for this revision.

## 2. Exact payload membership

The payload is the following ordered list. Order is authoritative.

1. `STAGE05_QA_EXECUTION_BASELINE.md`
2. `STAGE05_CRITICAL_CASE_MATRIX.md`
3. `STAGE05_AI_TEST_REVIEW_POC.md`
4. `STAGE05_MINIMAL_CRITICAL_TEST_SUITE.md`
5. `tests/certification-catalog.test.mjs`
6. `STAGE05_CRITICAL_FLOW_FORM_VALIDATION.md`
7. `STAGE05_API_CONTRACT_VALIDATION.md`
8. `STAGE05_STATIC_QUALITY_GATE.md`
9. `STAGE05_SECURITY_SCAN_EVIDENCE.md`
10. `STAGE05_REVIEW_ADR_RESIDUAL_RISK.md`
11. `STAGE05_QUALITY_ASSURANCE_ASSESSMENT.md`

Payload file count:

```text
11
```

`STAGE05_PACKAGE_MANIFEST.md` itself is metadata describing the package and is intentionally **not** part of the hashed payload. This avoids self-referential hashing.

No file may be added, removed, reordered, normalized, rewritten, or substituted when recomputing the package digest.

## 3. Preserved assurance boundaries

The package preserves the evidence states already established through `05.010`:

- repository-native lint/typecheck/test/build: PASS within current repository scope;
- current tests: 26/26 PASS;
- browser E2E harness/trace: NOT ESTABLISHED;
- concrete API transport/runtime: NOT ESTABLISHED;
- API contract tests: BLOCKED AT RUNTIME BOUNDARY;
- dependency audit: PASS within current npm-audit scope;
- SAST: NOT ESTABLISHED;
- secret scanning: NOT ESTABLISHED;
- residual-risk acceptance: HUMAN ONLY;
- comprehensive G-P5 PASS: NOT CLAIMED;
- `can_pass_gate=false`.

The package construction must not alter these states.

## 4. Canonical serialization

The digest input is constructed from the payload in the exact order above.

For each payload file:

1. read the **raw Git blob bytes** from `source_revision` using `git show <source_revision>:<path>`;
2. encode the path itself as UTF-8 without BOM;
3. append an ASCII header with exact grammar:

```text
FILE <path-byte-length> <content-byte-length>\n
```

4. append the UTF-8 path bytes;
5. append a single LF byte (`0A`);
6. append the raw Git blob bytes;
7. append a single LF byte (`0A`).

The package byte stream is the direct concatenation of all 11 framed entries.

No CRLF conversion, Unicode normalization, trailing-whitespace cleanup, Markdown rendering, JSON conversion, ZIP packaging, filesystem metadata, timestamps, branch names or local working-tree bytes participate in the digest.

Serialization identifier:

```text
git-blob-bytes-with-length-prefix-v1
```

## 5. Verified computed fields

The following values were produced by an actual local recomputation against the fixed `source_revision` and supplied as execution evidence for this task:

```yaml
payload_file_count: 11
payload_content_bytes: 116273
serialized_package_bytes: 116820
sha256: 50152217fb968a33dd67a239e6dad8f1158ff0427f3dfd5904ab7913f9f561c3
verification_status: VERIFIED_LOCAL_RECOMPUTATION
```

No digest value was inferred from narrative or branch state.

## 6. Reproducible PowerShell verification procedure

Run from the repository root on any branch after fetching the fixed revision.

```powershell
$ErrorActionPreference = 'Stop'

$sourceRevision = '58e2ff9650eb9cfb33af7b9b28ce17027d7628d3'
$payload = @(
  'STAGE05_QA_EXECUTION_BASELINE.md',
  'STAGE05_CRITICAL_CASE_MATRIX.md',
  'STAGE05_AI_TEST_REVIEW_POC.md',
  'STAGE05_MINIMAL_CRITICAL_TEST_SUITE.md',
  'tests/certification-catalog.test.mjs',
  'STAGE05_CRITICAL_FLOW_FORM_VALIDATION.md',
  'STAGE05_API_CONTRACT_VALIDATION.md',
  'STAGE05_STATIC_QUALITY_GATE.md',
  'STAGE05_SECURITY_SCAN_EVIDENCE.md',
  'STAGE05_REVIEW_ADR_RESIDUAL_RISK.md',
  'STAGE05_QUALITY_ASSURANCE_ASSESSMENT.md'
)

$utf8 = New-Object System.Text.UTF8Encoding($false)
$ascii = [System.Text.Encoding]::ASCII
$stream = New-Object System.IO.MemoryStream
$contentBytesTotal = [int64]0

try {
  foreach ($path in $payload) {
    $temp = [System.IO.Path]::GetTempFileName()
    try {
      cmd /c "git show $sourceRevision`:$path > `"$temp`""
      if ($LASTEXITCODE -ne 0) { throw "git show failed for $path" }

      $contentBytes = [System.IO.File]::ReadAllBytes($temp)
      $pathBytes = $utf8.GetBytes($path)
      $header = $ascii.GetBytes("FILE $($pathBytes.Length) $($contentBytes.Length)`n")

      $stream.Write($header, 0, $header.Length)
      $stream.Write($pathBytes, 0, $pathBytes.Length)
      $stream.WriteByte(10)
      $stream.Write($contentBytes, 0, $contentBytes.Length)
      $stream.WriteByte(10)

      $contentBytesTotal += $contentBytes.Length
    }
    finally {
      Remove-Item $temp -Force -ErrorAction SilentlyContinue
    }
  }

  $serializedBytes = $stream.ToArray()
  $sha256 = [System.Security.Cryptography.SHA256]::Create()
  try {
    $hashBytes = $sha256.ComputeHash($serializedBytes)
  }
  finally {
    $sha256.Dispose()
  }

  $digest = (($hashBytes | ForEach-Object { $_.ToString('x2') }) -join '')

  [pscustomobject]@{
    SourceRevision = $sourceRevision
    PayloadFileCount = $payload.Count
    PayloadContentBytes = $contentBytesTotal
    SerializedPackageBytes = $serializedBytes.Length
    SHA256 = $digest
  } | Format-List
}
finally {
  $stream.Dispose()
}
```

Expected authoritative output:

```text
SourceRevision         : 58e2ff9650eb9cfb33af7b9b28ce17027d7628d3
PayloadFileCount       : 11
PayloadContentBytes    : 116273
SerializedPackageBytes : 116820
SHA256                 : 50152217fb968a33dd67a239e6dad8f1158ff0427f3dfd5904ab7913f9f561c3
```

## 7. Verification rules

A recomputation is valid only if:

- `git cat-file -e 58e2ff9650eb9cfb33af7b9b28ce17027d7628d3^{commit}` succeeds;
- every listed payload path exists at that exact revision;
- payload order is unchanged;
- `PayloadFileCount` equals `11`;
- `PayloadContentBytes` equals `116273`;
- `SerializedPackageBytes` equals `116820`;
- SHA-256 equals `50152217fb968a33dd67a239e6dad8f1158ff0427f3dfd5904ab7913f9f561c3`;
- a second execution produces identical byte counts and identical digest.

A mismatch activates the package/digest hard stop.

## 8. Binding contract for 05.012

The human decision in `05.012` must refer to all of the following fields together:

- `package_id = package.skillcertify.stage05.gp5`;
- `package_version = 1.0.0`;
- `source_revision = 58e2ff9650eb9cfb33af7b9b28ce17027d7628d3`;
- serialization identifier `git-blob-bytes-with-length-prefix-v1`;
- exact 11-file payload list;
- `payload_content_bytes = 116273`;
- `serialized_package_bytes = 116820`;
- `sha256 = 50152217fb968a33dd67a239e6dad8f1158ff0427f3dfd5904ab7913f9f561c3`.

A decision referring only to “latest”, `main`, a branch head, a PR number, or mutable narrative is insufficient package binding.

## 9. Hard-stop evaluation after digest verification

- ambiguous source revision: `NO`;
- mutable branch-head-only binding: `NO`;
- payload membership ambiguous: `NO`;
- payload order ambiguous: `NO`;
- digest reproducibility established: `YES — LOCAL RECOMPUTATION`;
- package/digest match established: `YES`;
- evidence states rewritten for package convenience: `NO`;
- G-P5 decision attempted: `NO`;
- Stage 06 authorized: `NO`.

## 10. Current 05.011 disposition

```yaml
package_manifest: COMPLETE
source_revision_fixed: true
payload_membership_explicit: true
payload_order_fixed: true
serialization_defined: true
payload_file_count: 11
payload_content_bytes: 116273
serialized_package_bytes: 116820
sha256: 50152217fb968a33dd67a239e6dad8f1158ff0427f3dfd5904ab7913f9f561c3
verification_status: verified_local_recomputation
can_pass_gate: false
gp5_decision: not_performed
stage06_authorized: false
```

Therefore `05.011` is **PACKAGE_DIGEST_VERIFIED / GATE_DECISION_PENDING**.

It does not pass G-P5. Only the human decision in `05.012`, bound to this exact package identity and digest, may decide the gate.
