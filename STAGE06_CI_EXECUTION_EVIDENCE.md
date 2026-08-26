# Stage 06 — CI Execution Evidence Baseline

## Purpose

This document materializes `task.skillcertify.06.003` for Stage 06 — DevOps & Delivery.

It records the versioned CI definition and the evidence states required before any CI PASS or failure-path claim is allowed.

This document does **not** claim deployment readiness, G-P6, or Stage 07 authorization.

## 1. Governed objective

Create a minimal, versioned CI baseline that executes the repository's deterministic quality chain on governed change events and produces direct evidence of both successful execution and regression/failure rejection.

## 2. Inputs inherited from 06.001 and 06.002

`06.001` established:
- local `npm ci` reproducibility;
- local `npm run quality` PASS;
- no explicit exact Node runtime pin;
- no versioned CI workflow;
- no CI execution evidence;
- no failure-path evidence.

`06.002` established:
- AI review assistance is bounded;
- deterministic/source-backed evidence remains authoritative;
- local green execution must not be relabeled as CI PASS;
- future CI green must not be relabeled as G-P6 PASS.

## 3. Versioned CI definition

Workflow path:

```text
.github/workflows/quality.yml
```

Workflow name:

```text
Quality
```

Governed events:
- `pull_request` targeting `main`;
- `push` to `main`.

Permissions:

```yaml
permissions:
  contents: read
```

No write, deployment, package publishing, environment, secret, issue or pull-request mutation permission is requested.

## 4. Runtime contract

The workflow uses:

```yaml
node-version: '20'
```

Rationale:
- repository dev dependencies already declare `@types/node: ^20`;
- current Next.js/React stack executes successfully under the existing local Node-compatible toolchain;
- Node 20 provides an explicit reproducible CI family instead of inheriting an unspecified runner default.

This task does not claim that Node 20 is the only supported runtime or a product-level support promise. It is the explicit CI runtime contract for this workflow.

## 5. Dependency installation contract

CI uses:

```text
npm ci
```

This preserves the versioned lockfile graph and avoids a mutable install intent.

## 6. Quality execution contract

CI executes the existing top-level repository command:

```text
npm run quality
```

which currently expands to:

```text
lint → typecheck → test → build
```

The workflow intentionally reuses the existing deterministic repository chain rather than maintaining a divergent duplicate check list.

## 7. Current evidence state immediately after workflow materialization

At workflow commit creation time:

```yaml
workflow_versioned: true
workflow_commit: 5c7a75500155a3ad1ab4cc81b98344baef4aadd4
ci_runtime: node_20
permissions: contents_read_only
ci_success_run: not_yet_observed
ci_failure_path_run: not_yet_observed
final_green_rerun: not_yet_observed
ci_pass_claim: prohibited_until_run_evidence
failure_path_claim: prohibited_until_negative_run_evidence
gp6_decision: not_performed
stage07_authorized: false
```

## 8. Required positive-path evidence

A CI PASS claim becomes admissible only after an actual GitHub Actions run is observed for a specific commit/PR and shows the `quality` job completed successfully.

Required evidence:
- workflow run ID/URL;
- event type;
- head SHA;
- job conclusion;
- step-level confirmation for checkout, Node setup, `npm ci`, and `npm run quality`;
- final run conclusion.

Until then:

```text
CI PASS: NOT CLAIMED
```

## 9. Required negative-path evidence

The Stage 06 workstream also requires proof that the pipeline can reject a deliberate failing revision/condition.

Required process:
1. start from a green branch/PR state;
2. introduce a deliberately governed, non-production failing condition on the task branch;
3. push that failing revision;
4. observe an actual non-green CI run bound to that failing SHA;
5. record the failed job/step evidence;
6. remove/revert the deliberate failing condition;
7. push the restored revision;
8. observe a final successful rerun/head;
9. never merge the deliberately failing revision to `main`.

Until a direct negative run exists:

```text
FAILURE-PATH / REGRESSION REJECTION: NOT CLAIMED
```

## 10. Safety boundary for the negative test

The deliberate failure must be:
- reversible;
- isolated to the task branch;
- obvious and traceable;
- not a secret, deployment, package publication, destructive script or production behavior change;
- removed before human merge review.

A temporary test-only assertion failure or equivalent deterministic check failure is acceptable if it is clearly marked and fully reverted before final review.

## 11. Diagnostics carried forward

The local baseline already observed these non-blocking warnings:
- ESLint 9.39.5 deprecation warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning.

This task does not suppress them merely to obtain green CI output.

## 12. Claim boundaries

| Claim | Current state |
| --- | --- |
| versioned CI workflow exists | ESTABLISHED |
| workflow runtime is explicit | ESTABLISHED — Node 20 |
| workflow permissions are read-only | ESTABLISHED |
| lockfile install in workflow | ESTABLISHED — `npm ci` |
| repository quality chain wired to CI | ESTABLISHED — `npm run quality` |
| GitHub Actions CI PASS | NOT YET ESTABLISHED |
| CI rejects deliberate regression | NOT YET ESTABLISHED |
| final restored head is green | NOT YET ESTABLISHED |
| deploy/release readiness | NOT CLAIMED |
| G-P6 | NOT PERFORMED |
| Stage 07 authorization | FALSE |

## 13. Hard-stop evaluation at materialization

- workflow absent: `NO`;
- runtime implicit: `NO`;
- dependency installation mutable: `NO`;
- CI PASS invented before run: `NO`;
- failure-path invented before negative run: `NO`;
- unnecessary write/deploy/secrets permission: `NO`;
- G-P6 attempted: `NO`;
- Stage 07 authorization attempted: `NO`.

## 14. Next evidence actions

After local post-materialization validation:
1. open the governed PR for `06.003`;
2. inspect the actual GitHub Actions run generated by that PR;
3. if successful, record the positive-path run identity;
4. perform the controlled negative-path revision on this same task branch;
5. record the failing run identity;
6. restore the branch and confirm a final green run;
7. update this evidence document with exact run references before human merge.

## 15. Disposition

`06.003` is currently:

```text
CI_WORKFLOW_VERSIONED / EXECUTION_EVIDENCE_PENDING
```

No CI PASS, failure-path PASS, G-P6 or Stage 07 claim is made at this point.
