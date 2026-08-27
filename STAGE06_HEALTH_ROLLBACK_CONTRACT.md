# Stage 06 — Health and Rollback Contract Baseline

## Purpose

This document materializes `task.skillcertify.06.009` for Stage 06 — DevOps & Delivery.

The individual canonical display title for `06.009` is not available in the recovered source. The operational title used for this task is therefore non-canonical and derived from the next explicit Stage 06 delivery concern after release provenance: health and rollback.

This task establishes a versioned health-and-rollback contract only. It does **not** create a health endpoint, deployment target, monitoring provider, telemetry pipeline, alert, rollback command, deployment workflow, credential, live rollback, G-P6 decision, or Stage 07 authorization.

## 1. Dependency and entry state

`task.skillcertify.06.008` completed through PR #124.

Post-merge `main` evidence:

```yaml
merge_commit: 7afb2cdf5cd220b3b9ce262c2c016bbbceaebe58
workflow: Quality
run_number: 21
run_id: 33077617040
event: push
conclusion: success
```

That evidence proves the governed repository quality chain passed for the merge revision. It does **not** prove runtime health, deployment health, release health, or rollback readiness.

## 2. Human-executed baseline entering 06.009

Branch:

```text
task/skillcertify-06-009-health-rollback-contract
```

Entry revision:

```text
7afb2cdf5cd220b3b9ce262c2c016bbbceaebe58
```

Observed local runtime:

```text
Node.js: v22.22.2
npm: 11.13.0
```

Observed local validation:

```yaml
npm_ci: pass
packages_added: 344
packages_audited: 345
reported_vulnerabilities_in_current_npm_audit_scope: 0
config_secret_guard: pass
lint: pass
typecheck: pass
tests: 44/44_pass
build: pass
static_ssg_generation: 10/10_pass
working_tree: clean
```

Known non-failing diagnostics remain visible and are not reclassified by this task:

- `eslint@9.39.5` deprecation warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning for `app/certifications/catalog.ts`.

## 3. Health/rollback surface inspection entering 06.009

The human inspection searched for:

```text
health
readiness
liveness
rollback
monitor
telemetry
alert
smoke
deployment
deploy
```

across:

```text
app
scripts
tests
.github/workflows
package.json
```

No matches were returned.

The application file tree contains no route identified as an established health, readiness, or liveness endpoint.

The workflow surface contains only:

```text
.github/workflows/quality.yml
```

No local tag was observed.

Current bounded health/rollback surface:

```yaml
health_endpoint: not_established
readiness_probe: not_established
liveness_probe: not_established
runtime_smoke_probe: not_established
monitoring_provider: not_established
telemetry_pipeline: not_established
alerting: not_established
deployment_target: not_established
deployment_provider: not_established
deployment_identity: not_established
known_good_runtime_revision: not_established
rollback_mechanism: not_established
rollback_command: not_established
rollback_workflow: not_established
rollback_credentials: not_established
live_rollback_capability: not_established
```

Absence of a health endpoint is not itself a defect in this task because no live runtime/deployment architecture has yet been selected. This contract defines the evidence required when such a runtime exists.

## 4. Governed objective

Define the minimum evidence required before any future statement of the form:

```text
revision X is healthy on target Y
```

or:

```text
revision X was safely rolled back to revision Z
```

can be considered evidence-backed.

Health and rollback claims must bind to exact runtime/deployment identity and direct execution evidence.

## 5. Health is distinct from repository quality

None of the following independently proves runtime health:

```text
branch exists
commit exists
PR merged
CI green
build green
release provenance valid
release exists
promotion eligibility ELIGIBLE
promotion executed
deployment command completed
```

Therefore:

```text
CI green != runtime health
build green != runtime health
release != runtime health
deployment completion != runtime health
```

Runtime health requires separately observed runtime evidence.

## 6. Health states

This contract defines the following health states:

```text
NOT_ESTABLISHED
HEALTHY
DEGRADED
UNHEALTHY
UNKNOWN
BLOCKED
```

### NOT_ESTABLISHED

Use when no governed runtime health mechanism or record exists.

### HEALTHY

Use only when required health signals for the exact runtime identity and observation window pass according to the governed health policy.

### DEGRADED

Use when the runtime remains available but one or more governed signals indicate material impairment or reduced capability.

### UNHEALTHY

Use when governed health criteria fail sufficiently to classify the runtime as not acceptable for continued operation.

### UNKNOWN

Use when a runtime exists but available evidence is insufficient, stale, contradictory, or outside the governed observation window.

### BLOCKED

Use when health evaluation cannot be performed because required target identity, observation mechanism, access, or policy is unresolved.

## 7. Exact source and runtime identity binding

Every future health claim must bind to the exact source and runtime/deployment identity being observed.

Minimum concept:

```yaml
source:
  repository: <repository identity>
  sha: <full 40-hex commit SHA>
runtime:
  target: <exact target identity>
  deploymentId: <exact deployment identity when applicable>
  releaseId: <release identity when applicable>
```

Rules:

- branch name is insufficient;
- short SHA is insufficient for final evidence;
- target labels such as `prod` or `staging` are insufficient if ambiguous;
- health evidence for another source SHA cannot prove the current revision healthy;
- health evidence for another deployment/target cannot be reused silently.

## 8. Health signal applicability

The eventual runtime architecture must explicitly define which checks are applicable.

Potential classes include:

```text
liveness
readiness
critical journey
smoke
external dependency reachability
error-rate signal
latency signal
resource saturation signal
business-critical functional signal
```

This task does not declare any specific endpoint, threshold, service, provider, or telemetry product as established.

Applicability must be explicit rather than inferred.

## 9. Liveness semantics

If liveness applies, it should answer a bounded question such as:

```text
is the runtime process/service able to respond at all?
```

Liveness alone does not prove readiness or full product health.

## 10. Readiness semantics

If readiness applies, it should answer whether the runtime is prepared to serve its intended traffic or function with required dependencies available.

Readiness evidence must not be silently replaced with successful process startup.

## 11. Smoke/critical-journey semantics

If a runtime smoke or critical-journey check applies, it should validate a governed minimum user/system path against the deployed revision.

A local test suite is not a substitute for a runtime smoke check.

## 12. Observation windows

Health evidence must include observation timing.

Minimum concept:

```yaml
observation:
  startedAt: <timestamp>
  completedAt: <timestamp>
  windowSeconds: <positive duration>
```

Rules:

- stale evidence cannot be treated as current health;
- observation timing must correspond to the deployment/release being evaluated;
- a one-time probe may be insufficient where the eventual architecture requires a stability window.

No threshold or duration is invented by this task.

## 13. Future minimum health evidence schema

A future governed health record should support at least:

```yaml
recordType: stage06-runtime-health
state: NOT_ESTABLISHED | HEALTHY | DEGRADED | UNHEALTHY | UNKNOWN | BLOCKED
source:
  repository: <repository identity>
  sha: <full 40-hex SHA>
runtime:
  target: <target identity>
  deploymentId: <deployment identity when applicable>
  releaseId: <release identity when applicable>
observation:
  mechanism: <health observation mechanism>
  startedAt: <timestamp>
  completedAt: <timestamp>
  windowSeconds: <duration>
checks:
  - id: <check identity>
    applicability: required | not_applicable
    outcome: pass | fail | unknown
    evidence: <execution reference>
outcome:
  state: <health state>
  basis: <deterministic basis>
authority:
  actor: <actor when required>
  basis: <authority basis when required>
notes:
  warnings: []
  limitations: []
```

This is a future evidence schema, not a claim that these fields currently exist.

## 14. Health classification matrix

| Condition | Health outcome |
| --- | --- |
| no governed runtime/target exists | `NOT_ESTABLISHED` |
| runtime exists but observation mechanism unresolved | `BLOCKED` |
| evidence missing/stale/contradictory | `UNKNOWN` |
| all required checks pass for exact runtime identity | may qualify as `HEALTHY` |
| material non-terminal degradation observed | `DEGRADED` |
| governed failure criteria met | `UNHEALTHY` |
| source/deployment binding mismatch | evidence invalid for the target claim |

## 15. Rollback is a separately evidenced action

Rollback is not equivalent to:

```text
reverting a Git commit
closing a PR
changing a branch pointer
re-running CI
restarting a process
redeploying an unspecified prior version
```

A rollback claim requires direct evidence that the runtime was changed from an identified bad/current deployment to an exact governed rollback target.

## 16. Rollback decision states

This contract defines the following rollback states:

```text
ROLLBACK_NOT_ESTABLISHED
ROLLBACK_REQUIRED
ROLLBACK_BLOCKED
ROLLBACK_EXECUTED
ROLLBACK_VERIFIED
ROLLBACK_FAILED
```

### ROLLBACK_NOT_ESTABLISHED

Use when no live rollback architecture/mechanism exists.

### ROLLBACK_REQUIRED

Use when governed policy and direct evidence determine rollback is required.

### ROLLBACK_BLOCKED

Use when rollback is required or considered but cannot proceed because required identity, authority, mechanism, artifact, target, or access is unresolved.

### ROLLBACK_EXECUTED

Use only when direct execution evidence proves that a rollback action was performed.

This state does not yet prove rollback success.

### ROLLBACK_VERIFIED

Use only when rollback execution is directly evidenced **and** post-rollback health verification succeeds for the exact rollback target.

### ROLLBACK_FAILED

Use when rollback execution fails or post-rollback verification proves the rollback target is not acceptable.

## 17. Rollback triggers

A future rollback policy may consider signals such as:

```text
UNHEALTHY runtime state
critical journey failure
material error-rate regression
material availability regression
security incident requiring withdrawal
invalid release/deployment binding
operator-governed emergency decision
```

The exact thresholds and trigger policy are not established by this task.

## 18. Rollback target identity

Rollback must target an exact prior known-good identity.

Minimum concept:

```yaml
rollbackTarget:
  sourceSha: <full 40-hex SHA>
  releaseId: <release identity when applicable>
  artifactId: <artifact identity when applicable>
  artifactDigest: <digest when applicable>
  deploymentBasis: <known-good evidence>
```

Rules:

- `previous version` is insufficient if ambiguous;
- branch name is insufficient;
- tag alone is insufficient unless its exact target and provenance are known;
- known-good status must be evidence-backed;
- no prior production revision is invented by this task.

## 19. Rollback authority

Actual rollback authority remains explicit and human/governed under the current project contract.

Minimum future concept:

```yaml
authority:
  status: approved
  actor: <authorized actor>
  basis: <approval or emergency authority basis>
```

Rules:

- AI/Codex cannot autonomously authorize live rollback;
- CI cannot authorize rollback by implication;
- missing authority can produce `ROLLBACK_BLOCKED` where approval is required.

## 20. Rollback execution evidence

A future `ROLLBACK_EXECUTED` record must identify the exact execution mechanism and outcome.

Minimum concept:

```yaml
execution:
  mechanism: <rollback mechanism identity>
  runId: <execution identity>
  fromDeployment: <current/bad deployment identity>
  toTarget: <exact rollback target identity>
  startedAt: <timestamp>
  completedAt: <timestamp>
  outcome: success | failure
```

A documentation statement is not execution evidence.

## 21. Mandatory post-rollback verification

A rollback cannot be classified as successfully completed merely because the rollback command returned success.

Required sequence:

```text
rollback decision
→ exact rollback target selected
→ authority satisfied
→ rollback execution
→ exact new runtime identity confirmed
→ health observation performed
→ required health checks pass
→ ROLLBACK_VERIFIED
```

Therefore:

```text
ROLLBACK_EXECUTED != ROLLBACK_VERIFIED
```

This distinction is mandatory.

## 22. Future minimum rollback evidence schema

A future governed rollback record should support at least:

```yaml
recordType: stage06-runtime-rollback
state: ROLLBACK_NOT_ESTABLISHED | ROLLBACK_REQUIRED | ROLLBACK_BLOCKED | ROLLBACK_EXECUTED | ROLLBACK_VERIFIED | ROLLBACK_FAILED
trigger:
  healthState: <state when applicable>
  evidence: <trigger evidence>
from:
  sourceSha: <full SHA>
  deploymentId: <deployment identity>
  releaseId: <release identity when applicable>
to:
  sourceSha: <full SHA>
  releaseId: <release identity when applicable>
  artifactId: <artifact identity when applicable>
  artifactDigest: <digest when applicable>
  knownGoodBasis: <evidence>
authority:
  status: approved | denied | required
  actor: <actor when approved>
  basis: <authority basis>
execution:
  mechanism: <mechanism identity>
  runId: <execution identity>
  startedAt: <timestamp>
  completedAt: <timestamp>
  outcome: success | failure
verification:
  healthRecord: <post-rollback health evidence>
  outcome: pass | fail | unknown
notes:
  warnings: []
  limitations: []
```

## 23. Rollback validation matrix

| Condition | Rollback outcome |
| --- | --- |
| no rollback architecture exists | `ROLLBACK_NOT_ESTABLISHED` |
| rollback required but target unknown | `ROLLBACK_BLOCKED` |
| rollback required but authority missing | `ROLLBACK_BLOCKED` |
| exact target exists but known-good evidence missing | `ROLLBACK_BLOCKED` |
| execution fails | `ROLLBACK_FAILED` |
| execution succeeds but no post-check exists | `ROLLBACK_EXECUTED`, not verified |
| execution succeeds but post-check fails | `ROLLBACK_FAILED` or unresolved according to policy |
| execution succeeds and governed post-health passes | may qualify as `ROLLBACK_VERIFIED` |

## 24. Relationship to release provenance

The `06.008` release-provenance contract remains authoritative for release identity.

Health evidence may reference a release when a release architecture exists, but:

```text
valid release provenance != runtime health
```

Likewise, rollback target evidence should reuse exact release/artifact identities when applicable rather than inventing parallel identities.

## 25. Relationship to promotion eligibility

`ELIGIBLE` from `06.007` is a pre-action promotion decision state.

It does not imply:

```text
deployed
healthy
released
rollback-ready
known-good
```

## 26. Relationship to CI

The repository Quality workflow validates the source repository.

It does not currently observe a deployed target.

Therefore:

```text
Quality success -> source quality evidence
Quality success -/-> runtime health evidence
```

## 27. Health endpoint decision boundary

A future governed task may decide to implement a health/readiness/liveness endpoint if the selected runtime architecture requires it.

This task deliberately does not create one because:

- no deployment target is established;
- no provider/runtime architecture is established;
- no health consumer/probe mechanism is established;
- endpoint semantics would otherwise be speculative.

## 28. Monitoring/telemetry decision boundary

This task does not select or establish:

```text
monitoring vendor
logs backend
metrics backend
tracing backend
alert manager
uptime monitor
APM provider
SLO platform
```

Future selection must be source-backed and governed.

## 29. Security boundary

This task:

- adds no credential;
- reads no secret inventory;
- adds no deployment permission;
- adds no rollback permission;
- adds no `secrets.*` usage;
- adds no external webhook;
- executes no live runtime action;
- creates no provider integration.

`06.004–06.005` remain authoritative for configuration/secret handling.

## 30. Human authority boundary

Human governance remains authoritative for:

- live deployment approval;
- live rollback approval;
- release approval;
- PR merge;
- G-P6 decision;
- residual-risk acceptance.

AI/Codex may assist with evidence analysis and deterministic documentation but cannot convert absent evidence into `HEALTHY`, `ROLLBACK_EXECUTED`, or `ROLLBACK_VERIFIED`.

## 31. Relationship to G-P6

Health/rollback contract completion is not G-P6.

Even future runtime health or a verified rollback would not automatically mean:

```text
G-P6: PASS
```

G-P6 remains human-only at `task.skillcertify.06.012`.

## 32. Relationship to Stage 07

Stage 07 remains unauthorized.

Only the governed Stage 06 completion sequence and an explicit human G-P6 PASS may authorize advancement.

## 33. Current repository classification

Current bounded classification:

```yaml
runtime_health: NOT_ESTABLISHED
health_endpoint: not_established
health_observation_mechanism: not_established
deployment_target: not_established
deployment_identity: not_established
known_good_runtime_revision: not_established
rollback_mechanism: not_established
rollback_target: not_established
live_rollback: false
rollback_verification: not_established
```

Existing local and CI quality evidence remains valid quality evidence only.

## 34. Claim boundaries

Allowed after successful validation of this task:

- a versioned health/rollback contract exists;
- runtime health is explicitly separated from CI/build/release/deployment completion;
- future health evidence must bind to exact source/runtime identity;
- rollback requires an exact prior known-good target;
- rollback authority and direct execution evidence are required;
- post-rollback health verification is mandatory before `ROLLBACK_VERIFIED`;
- current live runtime health and rollback capability remain `NOT_ESTABLISHED`.

Prohibited:

- production is healthy;
- a health endpoint exists;
- monitoring exists;
- telemetry exists;
- a deployment target exists;
- a known-good production revision exists;
- rollback is available;
- rollback was executed;
- rollback was verified;
- G-P6 passed;
- Stage 07 is authorized.

## 35. Post-materialization validation status

At materialization time, human post-materialization validation has not yet been supplied.

Required local validation:

```text
npm run quality
git grep -n -I -E 'health|readiness|liveness|rollback|monitor|telemetry|alert|smoke|deployment|deploy' -- app scripts tests .github/workflows package.json
git status
```

Expected repository tests:

```text
44/44 PASS
```

Expected build/static generation:

```text
build PASS
10/10 static generation PASS
```

Remote GitHub Actions validation remains pending until the governed PR exists.

## 36. Current disposition

```yaml
record_type: stage06-health-rollback-contract
stage: stage.skillcertify.06
task: task.skillcertify.06.009
title_status: operational_non_canonical
entry_revision: 7afb2cdf5cd220b3b9ce262c2c016bbbceaebe58
entry_quality_run: 33077617040
entry_local_quality: pass
entry_local_tests: 44/44_pass
entry_build: pass
entry_static_generation: 10/10_pass
health_rollback_contract: established
runtime_health_state: NOT_ESTABLISHED
health_endpoint: not_established
monitoring: not_established
telemetry: not_established
deployment_target: not_established
known_good_runtime_revision: not_established
rollback_mechanism: not_established
rollback_target: not_established
post_rollback_verification: not_established
post_materialization_local_validation: pending
remote_ci_validation: pending
live_rollback: false
gp6_decision: not_performed
stage07_authorized: false
```

Current bounded disposition:

```text
HEALTH_ROLLBACK_CONTRACT_ESTABLISHED / POST_MATERIALIZATION_VALIDATION_PENDING / LIVE_HEALTH_AND_ROLLBACK_NOT_ESTABLISHED
```
