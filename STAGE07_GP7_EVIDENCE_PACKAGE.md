# Stage 07 — Exact G-P7 Evidence Package

## Metadata

```yaml
record_type: exact-gp7-evidence-package
stage_id: stage.skillcertify.07
task_id: task.skillcertify.07.011
package_id: gp7-package.skillcertify.07.011
package_version: 1.0.0
package_manifest: STAGE07_GP7_EVIDENCE_PACKAGE.txt
package_digest_algorithm: SHA-256
package_digest: 345b675da97db190ddfdcc4ce2f1f5aa8b77870ea0053938da29ef34c832e02e
source_commit: 44d26c8058dcd6c255ba1cd5453f6025b22d54a7
package_scope: CURRENT_POC_ONLY
package_frozen: true
human_package_review_complete: true
gp7_performed: false
gp7_passed: false
stage08_authorized: false
```

## Exact package rule

The G-P7 evidence package is defined exclusively by the canonical manifest STAGE07_GP7_EVIDENCE_PACKAGE.txt.

The manifest is serialized as UTF-8 without BOM with LF line endings. Its SHA-256 digest binds the exact package definition submitted downstream.

Changing any package identity, version, source commit, evidence path, blob SHA, byte size, preserved limitation, exclusion or decision boundary requires a different digest.

## Exact evidence refs

- STAGE07_AI_USE_CASE_BASELINE_ADR.md — blob 5adf0b148750d7eeb0ebe44f103171c6ddafecbf — 17154 bytes
- STAGE07_SOURCE_DATA_CLOUD_BOUNDARY_BASELINE.md — blob 052f2764e2f205c69aed57564f7d57d6c3f90c9f — 17878 bytes
- STAGE07_PROMPT_GROUNDING_BASELINE.md — blob 42a7b244207f7ae1cdda0fecce67eb70e1c68577 — 9696 bytes
- STAGE07_GROUNDED_ASSISTANT_IMPLEMENTATION.md — blob 9d1e88fa34ee3d53f49ef7eb2a93591c22911132 — 8435 bytes
- STAGE07_GROUNDED_ASSISTANT_RUNTIME_EVIDENCE.md — blob 0d6883eb4fd9859686d492a2f56ba50e194db087 — 7844 bytes
- STAGE07_RUNTIME_SAFETY_BASELINE.md — blob b9eae6361df97fc4f578ded48810d6ad65510cd7 — 13706 bytes
- STAGE07_EVAL_BASELINE.md — blob 5e883955e9de22a92a2f22866a875c5fa83fbe2f — 10177 bytes
- STAGE07_TOKEN_LATENCY_COST_BASELINE.md — blob 7da44851a4c1035975de061d37f4b48717f63fb5 — 12677 bytes
- STAGE07_AI_DECISION_CASE_CANDIDATE.md — blob 36136429ca862014e84bcee09e3a69760b409616 — 9949 bytes
- STAGE07_AI_CLOUD_ASSESSMENT.md — blob 254fd66224d931ee4451705bf70e0e1b2f8a8e70 — 13640 bytes

## Preserved unresolved boundaries

- AI is not required.
- Broader AI adoption is not approved.
- Production AI is not authorized.
- Production residual risk is not accepted.
- Semantic evidence remains 2 top-1 matches / 1 miss.
- Material semantic-quality threshold is NOT_ESTABLISHED.
- Adoption threshold is NOT_ESTABLISHED.
- Actual billed provider cost is NOT_ESTABLISHED.
- Material budget is NOT_ESTABLISHED.
- Production latency SLO is NOT_ESTABLISHED.
- G-P7 has not been performed.
- Stage 08 is not authorized.

## Explicit exclusions

- raw provider payloads;
- embedding vectors;
- credentials or secrets;
- unreviewed external material.

## Reproducible verification

A verifier must:

1. check out source commit 44d26c8058dcd6c255ba1cd5453f6025b22d54a7;
2. verify every listed file against its exact Git blob SHA and byte size;
3. verify that STAGE07_GP7_EVIDENCE_PACKAGE.txt is UTF-8 without BOM using LF line endings;
4. compute SHA-256 over the exact manifest bytes;
5. require the result to equal 345b675da97db190ddfdcc4ce2f1f5aa8b77870ea0053938da29ef34c832e02e.

## Decision boundary

This package preparation does not decide G-P7.

Only task.skillcertify.07.012 may bind a human G-P7 decision to this exact package ID, version and digest.

Until that occurs:

```yaml
human_package_review_complete: true
gp7_performed: false
gp7_passed: false
stage08_authorized: false
```
## Human package preparation review

```yaml
human_decision: APPROVED
human_package_review_complete: true
approved_scope: CURRENT_POC_ONLY
approved_package_id: gp7-package.skillcertify.07.011
approved_package_version: 1.0.0
approved_package_digest_algorithm: SHA-256
approved_package_digest: 345b675da97db190ddfdcc4ce2f1f5aa8b77870ea0053938da29ef34c832e02e
exact_evidence_refs_accepted: true
gaps_unknowns_preserved: true
explicit_exclusions_preserved: true
authority_boundary_preserved: true
gp7_performed: false
gp7_passed: false
production_ai_authorized: false
production_residual_risk_accepted: false
broader_ai_adoption_approved: false
stage08_authorized: false
authorized_next_task: task.skillcertify.07.012
issue_number: 151
issue_human_review_comment_id: 5518745109
```

This approval accepts only preparation and freezing of the exact package.

It does not constitute a G-P7 decision. The downstream human gate authority remains exclusively with task.skillcertify.07.012.
