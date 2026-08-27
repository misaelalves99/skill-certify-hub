# Stage 06 — G-P6 Exact Package Manifest

## Purpose

This document materializes `task.skillcertify.06.011` for Stage 06 — DevOps & Delivery.

It freezes the exact Stage 06 evidence package that may later be presented to the human-only G-P6 decision in `task.skillcertify.06.012`.

This package does **not** pass G-P6, accept residual risk, authorize Stage 07, deploy, promote, publish a release, create a tag, establish runtime health, or perform rollback.

```text
can_pass_gate=false
```

`06.011 package != G-P6 decision`.

The individual canonical display title for `06.011` was not recovered from the available Stage 06 source. The task title and package identity below are therefore governed operational identifiers, not falsely described as recovered canonical wording.

## 1. Package identity

```yaml
package_id: package.skillcertify.stage06.gp6
package_id_status: governed_operational_identity_noncanonical
package_version: "1.0.0"
record_type: stage06-gp6-package-manifest
stage: stage.skillcertify.06
producer_task: task.skillcertify.06.011
source_revision: 6cffccfd8998724ee6a2a10bf2fc0215b3c6cde3
source_ref_role: fixed_merged_main_revision_after_06_010
hash_algorithm: SHA-256
serialization: git-blob-bytes-with-length-prefix-v1
payload_file_count: 18
payload_content_bytes: 392939
serialized_package_bytes: 393810
sha256: 4f4629ae55b888883bd8f07e591eca649468f985f9e5e58bcfeab382e7db2cd9
verification_status: VERIFIED_IDENTICAL_DOUBLE_LOCAL_RECOMPUTATION
can_pass_gate: false
gate_id: gate.skillcertify.06
gate_decision_task: task.skillcertify.06.012
next_stage_authorized: false
```

The authoritative source revision is the immutable merged `main` revision produced by PR #128 after `06.010`:

`6cffccfd8998724ee6a2a10bf2fc0215b3c6cde3`

A moving branch head, mutable `main`, PR number, local working tree, or later commit is **not** an admissible substitute for this package source revision.

## 2. Source-revision execution evidence

Direct GitHub evidence for the package source revision:

```yaml
source_pr: 128
source_pr_state: merged
source_merge_commit: 6cffccfd8998724ee6a2a10bf2fc0215b3c6cde3
post_merge_quality_run_number: 25
post_merge_quality_run_id: 33083638700
post_merge_quality_event: push
post_merge_quality_branch: main
post_merge_quality_conclusion: success
```

This establishes a successful repository Quality execution at the fixed source revision.

It does **not** establish deployment, promotion, release publication, runtime health, production monitoring, or rollback capability.

## 3. Exact payload membership

The package payload is the following ordered list. **Order is authoritative.**

1. `STAGE06_PIPELINE_REPRODUCIBILITY_BASELINE.md`
2. `STAGE06_AI_PIPELINE_REVIEW_POC.md`
3. `STAGE06_CI_EXECUTION_EVIDENCE.md`
4. `STAGE06_CONFIG_SECRETS_BASELINE.md`
5. `STAGE06_CONFIG_SECRET_ENFORCEMENT.md`
6. `STAGE06_EXPLICIT_PROMOTION_CONTRACT.md`
7. `STAGE06_PROMOTION_ELIGIBILITY_ENFORCEMENT.md`
8. `STAGE06_RELEASE_PROVENANCE_CONTRACT.md`
9. `STAGE06_HEALTH_ROLLBACK_CONTRACT.md`
10. `STAGE06_DELIVERY_READINESS_ASSESSMENT.md`
11. `.github/workflows/quality.yml`
12. `package.json`
13. `package-lock.json`
14. `scripts/config-secret-guard.mjs`
15. `scripts/promotion-eligibility.mjs`
16. `tests/config-secret-guard.test.mjs`
17. `tests/promotion-eligibility.test.mjs`
18. `tests/foundation.test.mjs`

Payload file count:

```text
18
```

The inventory exactly matches the minimum package content required by the merged `06.010` delivery-readiness assessment. No listed member was excluded and no additional member was inserted.

`STAGE06_PACKAGE_MANIFEST.md` itself is metadata describing the package and is intentionally **not** part of the hashed payload. This avoids self-referential hashing.

No payload file may be added, removed, renamed, reordered, normalized, rewritten, or substituted when recomputing package version `1.0.0`.

## 4. Package scope and preserved evidence boundaries

The package preserves the Stage 06 evidence state rather than upgrading contracts into live capabilities.

Established and bounded evidence includes:

- reproducible repository quality baseline;
- versioned GitHub Actions Quality workflow;
- successful CI execution evidence;
- direct deliberate CI negative-path evidence and restored-green evidence;
- deterministic config/secret policy guard and tests;
- explicit promotion contract;
- deterministic promotion-eligibility evaluator and tests;
- release-provenance contract;
- health/rollback contract;
- Stage 06 delivery-readiness assessment with disposition `READY_FOR_PACKAGE`.

The following remain explicitly **NOT ESTABLISHED** as live capabilities:

- deployment target/provider;
- live deployment;
- live promotion;
- live release/tag/artifact publication;
- runtime health/monitoring;
- known-good production revision;
- live rollback mechanism.

Inherited bounded gaps remain visible where materially relevant, including earlier limitations around comprehensive browser E2E evidence, concrete API runtime evidence, comprehensive SAST, and comprehensive secret scanning.

No package construction step accepts those limitations as residual risk. Residual-risk acceptance remains human-only.

## 5. Evidence precedence

For current-state claims in G-P6 review, use the following precedence:

```text
current versioned source at package source_revision
→ direct GitHub execution/merge evidence
→ final task evidence document
→ historical PR/issue narrative
→ AI narrative
```

Historical records are not erased.

This precedence exists so stale narrative cannot override the source and execution evidence actually bound into this package. For example, the current versioned workflow at the package revision governs the current CI runtime contract even if an older PR description contains stale runtime wording.

## 6. Canonical serialization

The package digest input is constructed from the 18 payload files in the exact order specified in Section 3.

For each payload file:

1. read the **raw Git blob bytes** from `source_revision` using `git show <source_revision>:<path>`;
2. encode the path as UTF-8 without BOM;
3. append an ASCII header with exact grammar:

```text
FILE <path-byte-length> <content-byte-length>\n
```

4. append the UTF-8 path bytes;
5. append a single LF byte (`0A`);
6. append the raw Git blob bytes;
7. append a single LF byte (`0A`).

The serialized package byte stream is the direct concatenation of all 18 framed entries.

No CRLF conversion, Unicode normalization, whitespace cleanup, Markdown rendering, JSON transformation, ZIP/archive metadata, filesystem timestamps, branch names, local working-tree bytes, generated build output, or GitHub UI representation participates in the digest.

Serialization identifier:

```text
git-blob-bytes-with-length-prefix-v1
```

## 7. Verified computed fields

The following values were produced by two direct local recomputations against the exact fixed source revision. Both executions returned identical results.

```yaml
source_revision: 6cffccfd8998724ee6a2a10bf2fc0215b3c6cde3
payload_file_count: 18
payload_content_bytes: 392939
serialized_package_bytes: 393810
sha256: 4f4629ae55b888883bd8f07e591eca649468f985f9e5e58bcfeab382e7db2cd9
first_recomputation: identical
second_recomputation: identical
verification_status: VERIFIED_IDENTICAL_DOUBLE_LOCAL_RECOMPUTATION
```

No byte count or digest value was inferred from narrative, GitHub metadata, a moving branch, or AI output.

## 8. Local quality validation supplied for 06.011

Before package recomputation, the governed task branch was synchronized with the package source revision and locally validated.

Observed local environment and results:

```yaml
node: v22.22.2
npm: 11.13.0
npm_ci: PASS
config_secret_guard: PASS
lint: PASS
typecheck: PASS
tests: 44/44 PASS
build: PASS
static_ssg_generation: 10/10 PASS
working_tree_after_quality: clean
working_tree_after_double_recomputation: clean
```

Known non-failing diagnostics remained visible:

- ESLint `9.39.5` deprecation/unsupported-version warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning for `app/certifications/catalog.ts`.

These warnings are not silently converted into failures or erased from the evidence surface.

Local PASS is not relabeled as remote PR CI PASS. The future PR head for this manifest must independently pass GitHub Actions before human merge.

## 9. Reproducible PowerShell verification procedure

Run from the repository root after fetching the fixed source revision.

```powershell
$ErrorActionPreference = 'Stop'

$sourceRevision = '6cffccfd8998724ee6a2a10bf2fc0215b3c6cde3'

$payload = @(
  'STAGE06_PIPELINE_REPRODUCIBILITY_BASELINE.md',
  'STAGE06_AI_PIPELINE_REVIEW_POC.md',
  'STAGE06_CI_EXECUTION_EVIDENCE.md',
  'STAGE06_CONFIG_SECRETS_BASELINE.md',
  'STAGE06_CONFIG_SECRET_ENFORCEMENT.md',
  'STAGE06_EXPLICIT_PROMOTION_CONTRACT.md',
  'STAGE06_PROMOTION_ELIGIBILITY_ENFORCEMENT.md',
  'STAGE06_RELEASE_PROVENANCE_CONTRACT.md',
  'STAGE06_HEALTH_ROLLBACK_CONTRACT.md',
  'STAGE06_DELIVERY_READINESS_ASSESSMENT.md',
  '.github/workflows/quality.yml',
  'package.json',
  'package-lock.json',
  'scripts/config-secret-guard.mjs',
  'scripts/promotion-eligibility.mjs',
  'tests/config-secret-guard.test.mjs',
  'tests/promotion-eligibility.test.mjs',
  'tests/foundation.test.mjs'
)

git cat-file -e "$sourceRevision^{commit}"
if ($LASTEXITCODE -ne 0) {
  throw 'Source revision does not exist'
}

foreach ($path in $payload) {
  git cat-file -e "$sourceRevision`:$path"
  if ($LASTEXITCODE -ne 0) {
    throw "Missing payload member at source revision: $path"
  }
}

function Get-Stage06PackageDigest {
  $utf8 = New-Object System.Text.UTF8Encoding($false)
  $ascii = [System.Text.Encoding]::ASCII
  $stream = New-Object System.IO.MemoryStream
  $contentBytesTotal = [int64]0

  try {
    foreach ($path in $payload) {
      $temp = [System.IO.Path]::GetTempFileName()

      try {
        cmd /d /c "git show $sourceRevision`:$path > `"$temp`""
        if ($LASTEXITCODE -ne 0) {
          throw "git show failed for $path"
        }

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
      SourceRevision         = $sourceRevision
      PayloadFileCount       = $payload.Count
      PayloadContentBytes    = $contentBytesTotal
      SerializedPackageBytes = $serializedBytes.Length
      SHA256                 = $digest
    }
  }
  finally {
    $stream.Dispose()
  }
}

$first = Get-Stage06PackageDigest
$second = Get-Stage06PackageDigest

$first | Format-List
$second | Format-List

if (
  $first.SourceRevision         -ne $second.SourceRevision -or
  $first.PayloadFileCount       -ne $second.PayloadFileCount -or
  $first.PayloadContentBytes    -ne $second.PayloadContentBytes -or
  $first.SerializedPackageBytes -ne $second.SerializedPackageBytes -or
  $first.SHA256                 -ne $second.SHA256
) {
  throw 'PACKAGE RECOMPUTATION MISMATCH'
}

'PACKAGE RECOMPUTATION: IDENTICAL'
```

Expected authoritative output for package version `1.0.0`:

```text
SourceRevision         : 6cffccfd8998724ee6a2a10bf2fc0215b3c6cde3
PayloadFileCount       : 18
PayloadContentBytes    : 392939
SerializedPackageBytes : 393810
SHA256                 : 4f4629ae55b888883bd8f07e591eca649468f985f9e5e58bcfeab382e7db2cd9
```

The first and second recomputations must be identical.

## 10. Verification rules

A recomputation is valid only if all of the following hold:

- `git cat-file -e 6cffccfd8998724ee6a2a10bf2fc0215b3c6cde3^{commit}` succeeds;
- every listed payload path exists at that exact revision;
- payload order is unchanged;
- payload file count equals `18`;
- raw payload content bytes equal `392939`;
- serialized package bytes equal `393810`;
- SHA-256 equals `4f4629ae55b888883bd8f07e591eca649468f985f9e5e58bcfeab382e7db2cd9`;
- a second execution returns identical revision, counts and digest.

Any mismatch activates the package/digest hard stop. A mismatched package must not be presented as the package bound to G-P6.

## 11. Exclusions from the digest

The following are intentionally outside the package digest:

- `STAGE06_PACKAGE_MANIFEST.md` itself;
- the future `STAGE06_GP6_DECISION.md` or equivalent `06.012` human decision artifact;
- GitHub Issue/PR descriptions and comments;
- `.git` metadata;
- local terminal transcript files;
- generated `.next`, `node_modules`, coverage or build output;
- GitHub Actions runner metadata not committed in payload files;
- tags, Releases, deployment objects and runtime artifacts that do not currently exist as established Stage 06 capabilities.

Exclusion does not mean irrelevant. Direct GitHub execution and merge evidence may be consulted by the human gate reviewer under the evidence-precedence rules; it simply does not participate in the package byte digest.

## 12. Binding contract for 06.012

The human decision in `task.skillcertify.06.012` must refer to the following fields **together**:

- `package_id = package.skillcertify.stage06.gp6`;
- `package_id_status = governed_operational_identity_noncanonical`;
- `package_version = 1.0.0`;
- `source_revision = 6cffccfd8998724ee6a2a10bf2fc0215b3c6cde3`;
- serialization `git-blob-bytes-with-length-prefix-v1`;
- the exact ordered 18-file payload in Section 3;
- `payload_content_bytes = 392939`;
- `serialized_package_bytes = 393810`;
- `sha256 = 4f4629ae55b888883bd8f07e591eca649468f985f9e5e58bcfeab382e7db2cd9`.

A gate decision referring only to `latest`, `main`, a task branch, a PR number, a mutable UI state, or narrative without the exact package binding is insufficient.

`06.012` remains responsible for the human G-P6 decision. This manifest contains no autonomous decision authority.

## 13. Residual-risk and limitation inventory for human review

The package carries forward, without accepting, at least the following decision-relevant limitations:

| Area | Package state | G-P6 implication |
|---|---|---|
| deployment target/provider | NOT ESTABLISHED | no production-target proof |
| live deployment | NOT ESTABLISHED | no deployment execution proof |
| live promotion | NOT ESTABLISHED | promotion governance exists, execution does not |
| live release/tag/artifact publication | NOT ESTABLISHED | provenance contract exists, live release does not |
| runtime health/monitoring | NOT ESTABLISHED | no live health/telemetry proof |
| known-good production revision | NOT ESTABLISHED | no production revision available for rollback binding |
| live rollback mechanism | NOT ESTABLISHED | rollback contract exists, live mechanism does not |
| comprehensive SAST | NOT ESTABLISHED / inherited bounded gap | must not be relabeled as established |
| comprehensive secret scanning | NOT ESTABLISHED / inherited bounded gap | config/secret guard is bounded policy enforcement, not comprehensive scanning |
| stale historical PR metadata | PRESENT / bounded | current source and direct evidence take precedence |
| ESLint version warning | PRESENT / non-failing maintenance finding | visible, not a gate result by itself |
| module-type warning | PRESENT / non-failing maintenance finding | visible, not a gate result by itself |

Only the human gate authority may decide whether the complete package is sufficient for G-P6 or whether any residual risk is acceptable.

## 14. Hard-stop evaluation

```yaml
ambiguous_source_revision: false
moving_branch_only_binding: false
payload_membership_ambiguous: false
payload_order_ambiguous: false
manifest_self_hashing: false
working_tree_bytes_used_for_digest: false
digest_inferred_without_execution: false
double_recomputation_match: true
package_digest_verified: true
live_deployment_invented: false
live_promotion_invented: false
live_release_invented: false
runtime_health_invented: false
rollback_readiness_invented: false
residual_risk_accepted_by_ai: false
gp6_performed: false
stage07_authorized: false
```

## 15. Current 06.011 disposition

```yaml
package_manifest: COMPLETE
package_id: package.skillcertify.stage06.gp6
package_id_status: governed_operational_identity_noncanonical
package_version: "1.0.0"
source_revision_fixed: true
payload_membership_explicit: true
payload_order_fixed: true
serialization_defined: true
payload_file_count: 18
payload_content_bytes: 392939
serialized_package_bytes: 393810
sha256: 4f4629ae55b888883bd8f07e591eca649468f985f9e5e58bcfeab382e7db2cd9
verification_status: verified_identical_double_local_recomputation
can_pass_gate: false
gp6_decision: not_performed
stage07_authorized: false
```

Therefore the current `06.011` package state is:

```text
PACKAGE_DIGEST_VERIFIED / GATE_DECISION_PENDING
```

This state does **not** pass G-P6.

Before human merge of the `06.011` PR, the manifest branch must receive fresh local post-materialization validation and a successful remote GitHub Actions Quality run. Only after the merged `06.011` package is itself verified on `main` may `task.skillcertify.06.012` present this exact package identity to the human G-P6 decision.