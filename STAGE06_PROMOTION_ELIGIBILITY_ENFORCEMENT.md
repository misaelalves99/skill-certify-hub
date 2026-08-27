# Stage 06 — Promotion Eligibility Enforcement

## Purpose

This document materializes `task.skillcertify.06.007` for Stage 06 — DevOps & Delivery.

The individual canonical display title for `06.007` is not available in the recovered source. The operational title used for this task is therefore non-canonical and derived from the executable gap left by the `06.006` explicit-promotion contract.

This task establishes deterministic promotion-eligibility evaluation only. It does **not** perform promotion, deployment, release creation, tag creation, provider selection, environment mutation, credential creation, G-P6, or Stage 07 authorization.

## 1. Dependency and source-backed entry state

`task.skillcertify.06.006` completed through PR #120.

Post-merge `main` evidence:

```yaml
merge_commit: 1dd2e4f03f847618618ecca8b9963d09468f64d1
workflow: Quality
run_number: 17
run_id: 33071128970
event: push
conclusion: success
```

The `06.006` contract established the pre-action states:

```text
ELIGIBLE
INELIGIBLE
BLOCKED
```

and reserved `PROMOTED` for a later direct promotion action with source/target/authority/outcome evidence.

## 2. Human-executed baseline entering 06.007

Branch:

```text
task/skillcertify-06-007-promotion-eligibility-enforcement
```

Entry revision:

```text
1dd2e4f03f847618618ecca8b9963d09468f64d1
```

Observed local runtime:

```text
Node.js: v22.22.2
npm: 11.13.0
```

Observed dependency/quality state:

```yaml
npm_ci: pass
packages_added: 344
packages_audited: 345
reported_vulnerabilities_in_current_npm_audit_scope: 0
config_secret_guard: pass
lint: pass
typecheck: pass
tests: 34/34_pass
build: pass
static_ssg_generation: 10/10_pass
working_tree: clean
```

Known non-failing diagnostics remain visible and are not reclassified by this task:

- `eslint@9.39.5` deprecation warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning for `app/certifications/catalog.ts`.

## 3. Promotion surface inspection entering 06.007

The human baseline inspected `scripts/`, `tests/`, `package.json`, and `STAGE06_EXPLICIT_PROMOTION_CONTRACT.md`.

Observed executable scripts before materialization:

```text
config-secret-guard.mjs
```

Observed state:

```yaml
promotion_contract_document: established
promotion_states_in_contract: observed
promotion_evaluator_in_scripts: not_observed
promotion_eligibility_tests: not_observed
promotion_cli_in_package_scripts: not_observed
live_promotion_mechanism: not_established
target_environment: not_established
deployment_provider: not_established
```

Therefore the bounded gap entering this task is executable evaluation of the already-versioned contract.

## 4. Governed objective

Convert the `06.006` contract into a deterministic repository-native evaluator that classifies one structured candidate as:

```text
ELIGIBLE
INELIGIBLE
BLOCKED
```

without creating a promotion action.

The evaluator must never return `PROMOTED`.

## 5. Materialized implementation

This task introduces:

```text
scripts/promotion-eligibility.mjs
tests/promotion-eligibility.test.mjs
STAGE06_PROMOTION_ELIGIBILITY_ENFORCEMENT.md
```

and updates:

```text
package.json
tests/foundation.test.mjs
```

No dependency is added.

## 6. CLI contract

Repository script:

```text
npm run promotion:eligibility
```

maps to:

```text
node scripts/promotion-eligibility.mjs --baseline
```

Supported evaluator CLI modes:

```text
--baseline
--file <candidate.json>
--require-eligible
```

Default classification mode prints deterministic JSON and does not treat `BLOCKED` or `INELIGIBLE` as a process-execution error by itself.

When `--require-eligible` is supplied:

```yaml
ELIGIBLE_exit: 0
INELIGIBLE_exit: 1
BLOCKED_exit: 2
input_usage_error_exit: 64
```

These exit semantics allow downstream governed automation to require eligibility without turning ordinary classification into promotion execution.

## 7. Structured candidate contract

The evaluator consumes a structured object with the following governed concepts:

```yaml
source:
  repository: <non-empty repository identity>
  sha: <full 40-hex commit SHA>
traceability:
  required: <boolean>
  task: <task.skillcertify.xx.xxx when required>
  pr: <positive integer when required>
quality:
  sourceSha: <full 40-hex SHA>
  conclusion: success
  runId: <evidence reference when available>
hardStops: []
target:
  status: established
  id: <target identity>
provider:
  status: established | not_applicable
  id: <provider identity when established>
  basis: <required when not_applicable>
mechanism:
  status: established
  id: <promotion mechanism identity>
credentialPolicy:
  status: established | not_applicable
  id: <policy identity when established>
  basis: <required when not_applicable>
authority:
  status: approved
  actor: <authority actor>
  basis: <approval basis>
```

The structure is an evaluator input contract, not proof that the supplied facts are externally true.

## 8. Source identity semantics

Promotion eligibility must bind to an exact immutable source SHA.

Classification rules:

- missing source SHA -> `BLOCKED`;
- malformed or short SHA -> `INELIGIBLE`;
- full 40-hex SHA -> structurally valid for source identity;
- quality evidence bound to another SHA -> `INELIGIBLE`.

A branch name alone cannot satisfy the source identity requirement.

## 9. Quality evidence semantics

The evaluator requires structured quality evidence for the same exact source SHA.

Rules:

- missing quality evidence -> `BLOCKED`;
- missing quality conclusion -> `BLOCKED`;
- conclusion other than `success` -> `INELIGIBLE`;
- mismatched quality/source SHA -> `INELIGIBLE`.

Important limitation:

The evaluator does not call GitHub or independently verify a run ID. It validates the supplied structured evidence and SHA binding. Actual CI truth remains authoritative and must be sourced separately by the governed workflow/process.

## 10. Hard-stop semantics

A candidate must explicitly provide hard-stop evidence.

```yaml
hardStops: []
```

means no unresolved hard stop is asserted in the candidate record.

Rules:

- field absent -> `BLOCKED`;
- field not an array -> `INELIGIBLE`;
- non-empty array -> `INELIGIBLE`.

The evaluator does not invent or suppress hard stops.

## 11. Target semantics

A live promotion candidate cannot be eligible without an explicit target identity.

```yaml
target:
  status: established
  id: <non-empty identity>
```

Rules:

- target missing/not established -> `BLOCKED`;
- invalid established target identity -> `INELIGIBLE`.

No target environment is created by this task.

## 12. Provider semantics

Provider applicability must be resolved before eligibility.

Accepted forms:

```yaml
provider:
  status: established
  id: <provider identity>
```

or:

```yaml
provider:
  status: not_applicable
  basis: <explicit basis>
```

Rules:

- unresolved/not established provider applicability -> `BLOCKED`;
- malformed established/not-applicable declaration -> `INELIGIBLE`.

The `not_applicable` path exists so the evaluator does not invent a provider for an architecture that may legitimately not require one.

## 13. Promotion mechanism semantics

A live candidate cannot be eligible without an explicitly established promotion mechanism.

Rules:

- missing/not established mechanism -> `BLOCKED`;
- established mechanism without identity -> `INELIGIBLE`.

No promotion workflow or mechanism is created by this task.

## 14. Credential-policy semantics

Credential applicability must also be resolved before eligibility.

Accepted states are structurally analogous to provider handling:

```text
established
not_applicable with explicit basis
```

Unresolved credential-policy state produces `BLOCKED`.

This evaluator does not create, fetch, validate, print, or store credentials.

## 15. Authority semantics

Human/authorized authority evidence remains required for a live candidate under current governance.

Rules:

- missing/required/not-established authority -> `BLOCKED`;
- denied authority -> `INELIGIBLE`;
- approved authority without actor/basis -> `INELIGIBLE`;
- approved authority with actor + basis may satisfy this precondition.

AI/Codex has no autonomous promotion authority.

## 16. State precedence

The evaluator uses deterministic precedence:

```text
known failed precondition present -> INELIGIBLE
else missing/not-established prerequisite present -> BLOCKED
else -> ELIGIBLE
```

This prevents a known failure from being hidden behind an unrelated missing prerequisite.

## 17. Real entry-baseline candidate

The versioned baseline candidate is bound to the source-backed `06.006` completion evidence:

```yaml
source_repository: misaelalves99/skill-certify-hub
source_sha: 1dd2e4f03f847618618ecca8b9963d09468f64d1
source_task: task.skillcertify.06.006
source_pr: 120
source_quality_run_id: 33071128970
source_quality_conclusion: success
hard_stops: []
target: not_established
provider: not_established
mechanism: not_established
credential_policy: not_established
authority: required
```

Expected classification:

```text
BLOCKED
```

Expected blocking reasons include:

```text
target_not_established
provider_not_established
mechanism_not_established
credential_policy_not_established
authority_not_established
```

This snapshot intentionally refers to the governed entry evidence. It is not a moving alias for the current branch head.

## 18. Synthetic ELIGIBLE fixture

The test suite includes a completely synthetic candidate with:

- full synthetic source SHA;
- matching synthetic quality SHA;
- quality `success`;
- no hard stops;
- synthetic target;
- explicit provider `not_applicable` basis;
- synthetic mechanism;
- credential policy `not_applicable` basis;
- synthetic approved authority.

Expected classification:

```text
ELIGIBLE
```

The test explicitly asserts that the result is not `PROMOTED`.

No environment, deployment, provider, credential, tag, or release is created by this fixture.

## 19. Synthetic INELIGIBLE coverage

The test suite includes deterministic negative cases for:

- short/ambiguous source SHA;
- quality SHA mismatch;
- failed quality conclusion;
- unresolved hard stop.

Expected state:

```text
INELIGIBLE
```

## 20. Synthetic BLOCKED coverage

The test suite includes deterministic blocked cases for:

- target not established;
- promotion mechanism not established;
- human authority evidence missing;
- provider applicability unresolved.

The real entry-baseline fixture additionally keeps credential policy unresolved.

Expected state:

```text
BLOCKED
```

## 21. Test/quality integration

`package.json` gains:

```text
promotion:eligibility -> node scripts/promotion-eligibility.mjs --baseline
```

`tests/foundation.test.mjs` governs that exact script mapping.

The top-level quality command itself remains:

```text
npm run guard:config-secrets && npm run lint && npm run typecheck && npm run test && npm run build
```

Because repository tests are discovered through:

```text
node --test tests/*.test.mjs
```

`tests/promotion-eligibility.test.mjs` automatically enters both local `npm test` and CI `npm run quality` without adding a promotion execution step to the workflow.

## 22. Security and secret boundary

This task:

- introduces no real secret;
- reads no hosted secret inventory;
- adds no `secrets.*` workflow use;
- adds no environment binding;
- adds no write/deploy permission;
- does not bypass `guard:config-secrets`;
- does not log credential values.

`06.004–06.005` remain authoritative for the current configuration/secret-handling boundary.

## 23. Explicit limitations

The evaluator does **not** establish:

- live promotion;
- deployment;
- provider/environment existence;
- release provenance;
- artifact provenance;
- GitHub Actions run authenticity from a supplied run ID;
- external approval authenticity from a supplied authority object;
- credential validity;
- rollback capability;
- health checks;
- G-P6;
- Stage 07 authorization.

It is a deterministic contract evaluator, not a deployment control plane.

## 24. Claim boundaries

Allowed after successful validation:

- a repository-native promotion-eligibility evaluator exists;
- structured candidates can be deterministically classified as `ELIGIBLE`, `INELIGIBLE`, or `BLOCKED`;
- the entry baseline remains `BLOCKED` for live promotion;
- synthetic cases prove all three pre-action states;
- promotion-eligibility tests run through the repository test/quality path.

Prohibited:

- a revision was promoted;
- `ELIGIBLE` means `PROMOTED`;
- a production/staging environment exists;
- a provider was selected;
- a deployment/release occurred;
- release provenance exists;
- G-P6 passed;
- Stage 07 is authorized.

## 25. Post-materialization local validation evidence

Human execution after materialization was supplied for branch:

```text
task/skillcertify-06-007-promotion-eligibility-enforcement
```

Materialized implementation revision:

```text
f07ef3ecf0a32e27b9c1adb513a96063e063e1fd
```

Baseline evaluator execution:

```text
npm run promotion:eligibility
```

Observed deterministic result:

```yaml
state: BLOCKED
eligible: false
source_sha: 1dd2e4f03f847618618ecca8b9963d09468f64d1
failed: []
blocked:
  - target_not_established
  - provider_not_established
  - mechanism_not_established
  - credential_policy_not_established
  - authority_not_established
```

This is the intended real-entry classification and does not indicate product failure. It records that live-promotion prerequisites remain unestablished.

`--require-eligible` semantics were also directly exercised:

```text
node scripts/promotion-eligibility.mjs --baseline --require-eligible
```

The PowerShell assertion requiring `$LASTEXITCODE -eq 2` completed without throwing, directly confirming the governed `BLOCKED_exit: 2` behavior.

Focused synthetic evaluator suite:

```yaml
command: node --test tests/promotion-eligibility.test.mjs
tests: 10
pass: 10
fail: 0
```

Observed coverage included:

- real entry baseline -> `BLOCKED`;
- fully synthetic candidate -> `ELIGIBLE`;
- short/ambiguous source SHA -> rejected;
- mismatched quality SHA -> rejected;
- failed quality -> rejected;
- unresolved hard stop -> rejected;
- missing target -> `BLOCKED`;
- missing mechanism -> `BLOCKED`;
- missing authority -> `BLOCKED`;
- unresolved provider applicability -> `BLOCKED`.

Full repository test suite:

```yaml
command: npm test
tests: 44
pass: 44
fail: 0
cancelled: 0
skipped: 0
```

Full repository quality chain:

```yaml
command: npm run quality
config_secret_guard: pass
lint: pass
typecheck: pass
tests: 44/44_pass
build: pass
static_ssg_generation: 10/10_pass
```

Known non-failing diagnostic preserved during execution:

- Node `MODULE_TYPELESS_PACKAGE_JSON` warning for `app/certifications/catalog.ts`.

Working tree after validation:

```text
clean
```

Therefore local executable evidence establishes:

```text
PROMOTION_ELIGIBILITY_EVALUATOR_ESTABLISHED
SYNTHETIC_STATE_COVERAGE_ESTABLISHED
REAL_ENTRY_BASELINE_BLOCKED_AS_DESIGNED
LOCAL_QUALITY_PASS
```

Remote GitHub Actions validation remains pending until the governed PR executes for the current branch head.

## 26. Current disposition

```yaml
record_type: stage06-promotion-eligibility-enforcement
stage: stage.skillcertify.06
task: task.skillcertify.06.007
title_status: operational_non_canonical
entry_revision: 1dd2e4f03f847618618ecca8b9963d09468f64d1
entry_quality_run: 33071128970
entry_local_quality: pass
entry_local_tests: 34/34_pass
entry_build: pass
entry_static_generation: 10/10_pass
promotion_contract: established
promotion_evaluator: established
promotion_cli: established
promotion_synthetic_tests: 10/10_pass
post_materialization_local_validation: pass
post_materialization_repository_tests: 44/44_pass
post_materialization_quality: pass
post_materialization_build: pass
post_materialization_static_generation: 10/10_pass
baseline_require_eligible_exit_semantics: blocked_exit_2_confirmed
real_entry_baseline_state: blocked
remote_ci_validation: pending
live_promotion: false
target_environment: not_established
deployment_provider: not_established
promotion_mechanism: not_established
release_provenance: not_established
gp6_decision: not_performed
stage07_authorized: false
```

Current bounded disposition:

```text
LOCAL_ENFORCEMENT_ESTABLISHED / SYNTHETIC_ELIGIBILITY_STATE_COVERAGE_ESTABLISHED / REAL_LIVE_PROMOTION_BLOCKED / REMOTE_CI_PENDING
```
