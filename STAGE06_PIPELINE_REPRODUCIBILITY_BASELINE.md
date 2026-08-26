# Stage 06 — Pipeline Reproducibility Baseline

## Purpose

This document materializes `task.skillcertify.06.001` for Stage 06 — DevOps & Delivery.

It establishes the factual local clean-checkout/runtime/dependency baseline that precedes CI implementation and later delivery controls.

This document does **not** claim CI execution, failure-path proof, deployment readiness, G-P6, or Stage 07 authorization.

## 1. Governed objective

Establish a factual reproducibility baseline answering the workstream control question:

> Can a clean checkout, with the correct runtime and dependencies, execute the relevant checks reproducibly — including demonstrating a failure when a regression exists?

For `06.001`, the currently evidenced answer is split deliberately:

- clean checkout + dependency installation + repository quality execution: `ESTABLISHED LOCALLY`;
- exact runtime version contract: `NOT EXPLICITLY PINNED IN REPOSITORY`;
- CI workflow execution: `NOT ESTABLISHED`;
- failure-path demonstration in a governed CI/pipeline context: `NOT ESTABLISHED`.

No broader PASS is inferred from the local success path.

## 2. Stage-entry authority

Stage 06 entry is authorized by the human G-P5 PASS recorded in `STAGE05_GP5_DECISION.md` and merged through PR #106.

That prior gate permits Stage 06 execution only. It does not pre-approve any Stage 06 pipeline, CI, deployment or G-P6 claim.

## 3. Repository-supported command contract

Current `package.json` defines these relevant scripts:

```text
lint      = eslint
typecheck = tsc --noEmit
test      = node --test tests/*.test.mjs
build     = next build
quality   = npm run lint && npm run typecheck && npm run test && npm run build
```

Current dependency baseline:

```text
next      = 16.3.2
react     = 19.2.8
react-dom = 19.2.8
```

Current dev dependency ranges include:

```text
@types/node       = ^20
eslint            = ^9
typescript        = ^5
eslint-config-next = 16.3.2
```

These package versions/ranges are repository evidence. They are not equivalent to an explicit Node runtime pin.

## 4. Runtime input status

The repository evidence inspected for `06.001` does not establish a dedicated runtime-version contract such as an explicit `engines.node`, `.nvmrc`, `.node-version`, or equivalent Stage 06 runtime pin.

Therefore:

```text
runtime_family: Node.js / npm
exact_node_version: NOT ESTABLISHED BY REPOSITORY CONTRACT
package_manager: npm
lockfile_based_install: ESTABLISHED THROUGH npm ci
```

The successful local run proves compatibility with the human execution environment used for this task, but this document does not infer that every Node/npm version is supported.

A later Stage 06 task may govern runtime pinning if the canonical scope requires it.

## 5. Clean-checkout reproducibility procedure

The repository-level baseline procedure is:

```powershell
git fetch origin
git switch main
git pull
git switch task/skillcertify-06-001-pipeline-reproducibility-baseline
git pull

npm ci
npm run quality
git status
```

Expected semantics:

1. Git branch is synchronized with its remote tracking branch;
2. `npm ci` installs the dependency graph from the versioned lockfile rather than mutating dependency intent;
3. `npm run quality` executes lint → typecheck → tests → production build in deterministic order;
4. `git status` verifies that the validation path does not leave uncommitted repository changes.

## 6. Human-executed local evidence entering 06.001

The supplied local execution produced:

### Dependency installation

```text
added 344 packages
345 packages audited
0 vulnerabilities reported
```

A non-failing diagnostic remained visible:

```text
eslint@9.39.5 deprecated / no longer supported
```

Disposition: `OPEN / NON-BLOCKING MAINTENANCE WARNING`.

This task does not suppress or modernize ESLint merely to remove the warning.

### Lint

```text
npm run lint: PASS
```

### Typecheck

```text
npm run typecheck: PASS
```

### Tests

```text
26 tests
26 pass
0 fail
```

A known non-failing Node diagnostic remained visible:

```text
MODULE_TYPELESS_PACKAGE_JSON
```

Disposition: `OPEN / NON-BLOCKING MODULE-CONFIG WARNING`.

No `package.json` module-type mutation is authorized by `06.001` solely to silence this warning.

### Production build

```text
Next.js 16.3.2
production build: PASS
static/SSG generation: 10/10 pages
```

Generated routes include:

- `/`;
- `/_not-found`;
- `/certifications`;
- three governed `/certifications/[id]` static identities;
- `/evidence`;
- `/practices`.

### Repository state

```text
branch: task/skillcertify-06-001-pipeline-reproducibility-baseline
remote tracking: up to date
working tree: clean
```

## 7. Current local baseline disposition

| Control | Evidence state |
| --- | --- |
| repository synchronization procedure | ESTABLISHED |
| lockfile-based dependency install via `npm ci` | ESTABLISHED |
| dependency install succeeds in supplied local environment | PASS |
| current npm audit scope | PASS — 0 vulnerabilities reported |
| lint | PASS |
| typecheck | PASS |
| tests | PASS — 26/26 |
| production build | PASS |
| static generation | PASS — 10/10 |
| working tree remains clean | PASS |
| exact Node runtime pin | NOT ESTABLISHED |
| versioned CI workflow | NOT ESTABLISHED BY CURRENT REPOSITORY SEARCH |
| actual CI run | NOT ESTABLISHED |
| failure-path demonstration | NOT ESTABLISHED |
| G-P6 | NOT PERFORMED |

## 8. CI evidence boundary

Repository search performed for common CI/runtime markers did not return a versioned workflow/configuration result for `.github/workflows`, CI configuration, Node-version pinning or equivalent terms.

This supports only the bounded statement:

> No versioned CI/runtime configuration was established by the repository evidence/search used in `06.001`.

It does **not** prove that every GitHub-hosted repository setting or external pipeline is disabled or absent.

Accordingly:

```text
ci_workflow_source: NOT ESTABLISHED
ci_execution: NOT ESTABLISHED
ci_pass: NOT CLAIMED
```

Local `npm run quality` PASS must not be relabeled as CI PASS.

## 9. Failure-path evidence boundary

The Stage 06 workstream control question includes whether the pipeline demonstrably fails when a regression exists.

`06.001` has not introduced a deliberate regression, mutated production code, or created a CI workflow solely to manufacture that evidence.

Therefore:

```text
failure_path_capability: NOT ESTABLISHED
negative_pipeline_execution: NOT PERFORMED
regression_rejection_claim: NOT CLAIMED
```

Future CI work must produce direct failure-path evidence before claiming that the pipeline reliably rejects regressions.

## 10. Reproducibility strengths already established

The current repository has useful deterministic foundations:

1. `package-lock.json` supports `npm ci`-style lockfile installation;
2. one top-level `quality` command executes the primary repository checks in fixed order;
3. the current test suite has deterministic pass/fail exit semantics;
4. Next production build exits non-zero on build failure;
5. local verification leaves the tracked working tree clean;
6. Stage 05 evidence already requires claims to remain bounded by execution evidence.

These strengths make later CI wiring straightforward, but they do not substitute for an actual pipeline run.

## 11. Reproducibility gaps entering later Stage 06 work

### G-06-001 — Exact runtime pin absent

State: `OPEN / NOT ESTABLISHED`.

Risk:

A clean checkout may behave differently across unsupported or incompatible Node/npm versions because the repository does not currently expose an explicit exact runtime contract in the evidence reviewed here.

### G-06-002 — Versioned CI source absent/not established

State: `OPEN / NOT ESTABLISHED`.

Risk:

No versioned pipeline currently proves that the repository quality chain is enforced on remote change events.

### G-06-003 — CI execution evidence absent

State: `OPEN / NOT ESTABLISHED`.

Risk:

No remote run proves runner provisioning, dependency installation, command execution or status reporting.

### G-06-004 — Failure-path proof absent

State: `OPEN / NOT ESTABLISHED`.

Risk:

A green-only local run does not prove that a future CI definition rejects regressions as intended.

### G-06-005 — Existing diagnostics remain

State: `OPEN / NON-BLOCKING`.

Diagnostics:

- ESLint 9.39.5 deprecation warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning.

They remain explicit and unsuppressed.

## 12. Claim-to-evidence map

| Claim | Evidence | Allowed state |
| --- | --- | --- |
| clean synchronized task branch can install dependencies | supplied `npm ci` execution | PASS — local environment |
| current dependency audit reports 0 vulnerabilities | supplied `npm ci` output | PASS — current npm audit scope |
| repository quality chain passes | supplied `npm run quality` | PASS — local environment |
| 26 repository tests pass | supplied Node test output | PASS |
| production build succeeds | supplied Next build output | PASS |
| 10/10 pages generate | supplied Next build output | PASS |
| verification leaves no local diff | supplied `git status` | PASS |
| exact Node runtime is governed | no explicit repository pin established | NOT ESTABLISHED |
| CI passes | no CI run evidence | CLAIM PROHIBITED |
| pipeline rejects regression | no negative run evidence | CLAIM PROHIBITED |
| repository is universally reproducible | runtime/CI/failure-path evidence incomplete | CLAIM PROHIBITED |

## 13. Hard-stop evaluation

- mutable/ambiguous local branch baseline: `NO`;
- dependency installation failure: `NO`;
- repository quality failure: `NO`;
- material warning suppressed: `NO`;
- hidden runtime assumption converted to certainty: `NO`;
- CI PASS inferred from local run: `NO`;
- failure-path PASS inferred without execution: `NO`;
- G-P6 attempted: `NO`;
- Stage 07 authorization attempted: `NO`.

## 14. Handoff constraints

Downstream Stage 06 work must preserve these boundaries:

- `local quality PASS != CI PASS`;
- `CI green != failure-path proof` unless a direct negative execution exists;
- `npm audit 0 != comprehensive supply-chain/security PASS`;
- `successful local runtime != exact runtime contract`;
- warnings remain visible until separately governed;
- no AI/tool may infer G-P6 from pipeline/build/deploy status.

## 15. 06.001 disposition

```yaml
record_type: stage06-pipeline-reproducibility-baseline
stage: stage.skillcertify.06
task: task.skillcertify.06.001
workstream: pipeline-baseline-ai-poc-ci
local_clean_checkout_baseline: established
lockfile_install: established
local_quality: pass
local_tests: 26/26_pass
local_build: pass
static_generation: 10/10_pass
exact_runtime_pin: not_established
versioned_ci: not_established
ci_execution: not_established
failure_path_evidence: not_established
gp6_decision: not_performed
stage07_authorized: false
```

Therefore `06.001` is **BASELINE_ESTABLISHED / CI_AND_FAILURE_PATH_NOT_ESTABLISHED**.
