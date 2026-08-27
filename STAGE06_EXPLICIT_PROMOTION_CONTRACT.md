# Stage 06 — Explicit Promotion Contract Baseline

## Purpose

This document materializes `task.skillcertify.06.006` for Stage 06 — DevOps & Delivery.

The individual canonical display title for `06.006` is not available in the recovered source. The operational title used for this task is therefore non-canonical and derived from the Stage 06 mission concern of explicit promotion.

This task establishes a versioned promotion contract only. It does **not** deploy the application, select a deployment provider, create an environment, create credentials, publish an artifact, create a tag/release, perform promotion, pass G-P6, or authorize Stage 07.

## 1. Governed objective

Define promotion as a separately governed delivery action that is bound to an exact source revision and explicit evidence, rather than treating merge or CI success as automatic promotion.

The control question is:

> What must be true, known, authorized, and recorded before a validated source revision can become eligible for a future promotion action?

## 2. Stage-entry evidence

`task.skillcertify.06.005` completed through PR #118.

Post-merge `main` evidence:

```yaml
merge_commit: 2a3d923a115fbfe5a63bc2532d2e4b2a14cbe777
workflow: Quality
run_number: 15
run_id: 33069216967
event: push
conclusion: success
```

This establishes that the current governed quality path passed after the 06.005 merge. It does not establish promotion, deployment, release, or G-P6.

## 3. Human-executed local baseline entering 06.006

Branch:

```text
task/skillcertify-06-006-explicit-promotion-contract
```

Base revision:

```text
2a3d923 — Merge pull request #118 from misaelalves99/task/skillcertify-06-005-config-secret-enforcement
```

Observed local runtime:

```text
Node.js: v22.22.2
npm:     11.13.0
```

Dependency installation:

```text
npm ci: PASS
344 packages added
345 packages audited
0 vulnerabilities reported in current npm audit scope
```

Repository quality execution:

```text
config/secret policy guard: PASS
lint: PASS
typecheck: PASS
tests: 34/34 PASS
build: PASS
static/SSG generation: 10/10 PASS
```

Known non-blocking diagnostics remain visible:

- `eslint@9.39.5` deprecation warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning for `app/certifications/catalog.ts`.

They are not suppressed or reclassified by this task.

Working tree after validation:

```text
clean
```

## 4. Current delivery/promotion surface inspection

The human baseline inspected the current repository using:

```powershell
Get-ChildItem .github/workflows | Select-Object Name
Get-Content package.json
git grep -n -I -E 'workflow_dispatch|deployment|deploy|promote|promotion|release|publish' -- .github/workflows package.json
git tag --list
```

Observed workflow inventory:

```text
quality.yml
```

Observed grep result:

```text
no matches returned
```

Observed tag inventory:

```text
no tags returned
```

Bounded conclusion:

```yaml
versioned_workflow_count_observed: 1
versioned_workflow_observed: quality.yml
manual_promotion_trigger_in_inspected_paths: not_observed
deployment_logic_in_inspected_paths: not_observed
promotion_logic_in_inspected_paths: not_observed
release_logic_in_inspected_paths: not_observed
publish_logic_in_inspected_paths: not_observed
repository_tags_observed: none
```

These are current-revision repository observations only. They do not prove the absence of external systems or manual processes outside the repository.

## 5. Current promotion infrastructure status

Current source-backed state:

```yaml
deployment_provider: not_established
production_runtime_environment: not_established
promotion_environment_model: not_established
promotion_workflow: not_established
deployment_workflow: not_established
release_workflow: not_established
secret_store: not_established
deploy_credentials: not_created
production_url: not_established
release_tag_policy: not_established
```

No downstream state is invented by this contract.

## 6. Promotion definition

For Stage 06 governance, promotion means:

> an explicit, traceable decision/action that advances one exact validated source revision or artifact identity toward one explicitly established target environment or delivery stage under defined authority.

Promotion is therefore **not** synonymous with any of the following:

- a commit existing;
- a task branch existing;
- a pull request opening;
- a pull request merging;
- `main` being green;
- a successful `npm run quality`;
- a successful GitHub Actions run;
- a build succeeding;
- a tag existing;
- a release existing;
- a deployment succeeding;
- G-P6 passing.

Those may become promotion preconditions or downstream evidence in later tasks, but they are distinct concepts.

## 7. Promotion source identity contract

Every future promotion decision must bind to one exact immutable source identity.

Minimum source identity:

```yaml
source_repository: misaelalves99/skill-certify-hub
source_sha: <full commit SHA>
source_branch_context: <branch or main context when applicable>
source_task: <task.skillcertify.xx.xxx>
source_pr: <PR number when applicable>
```

Rules:

1. short SHA alone is insufficient for the authoritative record when the full SHA is available;
2. ambiguous branch names without an exact SHA are insufficient;
3. a promotion action must not silently follow a moving branch head;
4. if an artifact is introduced later, artifact identity must be bound back to the exact source SHA;
5. if source identity changes, prior eligibility evidence does not automatically transfer to the new revision.

## 8. Promotion eligibility states

The promotion contract uses three pre-action states:

| State | Meaning |
| --- | --- |
| `ELIGIBLE` | all currently required preconditions are satisfied for the exact source identity, but no promotion action is implied to have occurred |
| `INELIGIBLE` | one or more mandatory preconditions are known to have failed |
| `BLOCKED` | promotion cannot be evaluated or executed because required information, infrastructure, authority, or evidence is not established |

A fourth post-action state may be used later only when actual promotion exists:

| State | Meaning |
| --- | --- |
| `PROMOTED` | an actual promotion action completed and direct evidence binds it to source, target, authority, and outcome |

This task cannot produce `PROMOTED` because no promotion mechanism or target environment is established.

## 9. Minimum promotion eligibility matrix

| Precondition | Required future state | Current 06.006 state |
| --- | --- | --- |
| exact source SHA identified | required | concept established |
| governed task/PR traceability | required when applicable | contract established |
| governed quality evidence for exact source | required | evidence pattern established |
| unresolved hard stops | must be none | contract established |
| source/config policy guard | must pass when applicable | current guard established by 06.005 |
| promotion target | must be explicitly established | `BLOCKED / NOT ESTABLISHED` |
| target environment identity | must be explicit | `BLOCKED / NOT ESTABLISHED` |
| provider/platform | must be source-backed when required | `BLOCKED / NOT ESTABLISHED` |
| promotion mechanism/workflow | must be explicit | `BLOCKED / NOT ESTABLISHED` |
| required credentials/secret mechanism | must be governed before use | `BLOCKED / NOT ESTABLISHED` |
| promotion authority | must be explicit | human authority required by current governance |
| promotion evidence destination | must be defined before live promotion | contract schema defined here; runtime destination not established |

Therefore no current revision is declared promotion-eligible for a live environment by this task.

## 10. Human authority boundary

Current project governance preserves human authority over promotion decisions where promotion affects delivery state.

Therefore:

```yaml
ai_autonomous_promotion_authority: none
ai_autonomous_merge_authority: none
ai_autonomous_gate_authority: none
human_promotion_authority: required_for_future_live_promotion
human_gp6_authority: exclusive
```

AI tooling may assist with evidence gathering, drafting, deterministic checks, and validation, but must not convert those activities into an autonomous promotion decision.

## 11. Required future promotion evidence schema

When promotion becomes executable, the promotion record must include at least:

```yaml
record_type: stage06-promotion-evidence
stage: stage.skillcertify.06
task: <governed task id>
source_repository: misaelalves99/skill-certify-hub
source_sha: <full source SHA>
source_pr: <PR number or null if legitimately not applicable>
source_quality_run_id: <run id or equivalent deterministic evidence>
source_quality_conclusion: <success/failure>
artifact_identity: <digest/id when an artifact model exists; otherwise explicit not_established>
target_environment: <explicit environment identity>
promotion_mechanism: <workflow/manual governed mechanism>
promotion_run_id: <run/action id when available>
authority_actor: <human/authorized actor identity>
authority_basis: <approval/decision reference>
started_at: <timestamp>
completed_at: <timestamp>
outcome: <success|failure|cancelled|blocked>
rollback_reference: <reference when rollback model exists>
notes: <bounded operational notes>
```

Fields that do not yet exist must be recorded as `not_established` or `not_applicable` only when semantically valid; they must not be fabricated.

## 12. Promotion decision algorithm

A future promotion decision should evaluate in this order:

```text
1. Resolve exact source identity
2. Resolve governed task/PR traceability
3. Verify required deterministic quality evidence
4. Verify no unresolved hard stop
5. Resolve explicit target environment
6. Resolve provider/mechanism when required
7. Resolve credential/secret handling when required
8. Verify human authorization
9. Bind evidence record to exact source + target + authority
10. Execute promotion only through the governed mechanism
11. Record direct outcome evidence
```

If any mandatory step before execution cannot be satisfied:

```text
promotion = BLOCKED or INELIGIBLE
```

No inference from CI green may bypass a missing step.

## 13. Failure semantics

Promotion must be `INELIGIBLE` when direct evidence shows, for example:

- governed quality failed for the exact source revision;
- required policy guard failed;
- the source revision is known not to be the approved revision;
- an unresolved hard stop remains;
- required review/approval was explicitly denied.

Promotion must be `BLOCKED` when, for example:

- exact source identity cannot be resolved;
- target environment is not established;
- provider/mechanism required for the target is not established;
- required credential/secret handling is not established;
- required authority evidence is missing;
- promotion evidence cannot be bound to an immutable source.

`BLOCKED` is not equivalent to failure of the product. It means required delivery information or capability is not yet established.

## 14. Promotion versus deployment

Promotion and deployment are related but not equivalent.

A future architecture may implement promotion by triggering a deployment, approving a deployment, moving an immutable artifact between environments, changing a release channel, or another explicitly governed mechanism.

Until such architecture is selected:

```yaml
promotion_mechanism: not_established
deployment_mechanism: not_established
promotion_equals_deployment: not_assumed
```

A successful deployment, when one eventually exists, must not retroactively prove that promotion preconditions were satisfied unless the promotion evidence explicitly records them.

## 15. Promotion versus release

Release provenance is a downstream Stage 06 concern and remains distinct.

Therefore:

```text
promotion != release
release != G-P6
release != Stage 07 authorization
```

A future release tag or GitHub Release must be traceably bound to source/artifact provenance. This task creates neither.

## 16. Promotion versus CI

CI establishes validation evidence only.

Current Quality success may establish:

```text
exact revision passed the governed quality chain
```

It does not establish:

```text
revision was promoted
revision was deployed
revision was released
G-P6 passed
Stage 07 was authorized
```

This distinction is mandatory for all later delivery evidence.

## 17. Promotion versus PR merge

PR merge establishes repository integration into the target branch.

It does not establish promotion.

Therefore the following implication is prohibited:

```text
PR merged -> promoted
```

A merge may become a prerequisite for promotion when downstream architecture requires it, but the relationship must be explicit.

## 18. No automatic promotion from `main`

Current `main` is governed by the Quality workflow, but there is no deployment/promotion workflow.

The contract therefore states:

```yaml
main_push_auto_promotion: false
quality_green_auto_promotion: false
pr_merge_auto_promotion: false
```

No workflow or external integration is introduced by this task to change those values.

## 19. Future target-environment contract

When downstream source establishes environments, each target must define at least:

- stable environment identifier;
- purpose;
- trust boundary;
- source/artifact admission rule;
- required approvals;
- secret/configuration scope;
- deployment/promotion mechanism;
- observable success criteria;
- rollback relationship;
- evidence retention location.

Until then:

```yaml
staging_environment: not_established
production_environment: not_established
preview_environment: not_established
other_promotion_targets: not_established
```

The familiar names above are not asserted to exist; they are listed only as classes that future architecture may or may not choose.

## 20. Future artifact binding

If Stage 06 later introduces an immutable build artifact, promotion eligibility must bind both:

```text
source SHA <-> artifact identity/digest
```

Promotion must never assume that two independently rebuilt outputs are identical merely because they came from the same branch name.

Current state:

```yaml
immutable_release_artifact: not_established
artifact_digest_model: not_established
artifact_registry: not_established
```

Release provenance tasks may establish these later.

## 21. Evidence authority hierarchy

For future promotion claims, preferred evidence order is:

1. immutable source/artifact identity;
2. deterministic CI/build/policy execution evidence;
3. explicit human authorization record where required;
4. promotion/deployment system run evidence;
5. repository traceability to task/PR;
6. narrative documentation.

Narrative alone must not be used to prove that promotion occurred.

## 22. Current claim boundaries

Allowed claims after this task:

- the repository has a versioned explicit-promotion contract;
- current source inspection found only `quality.yml` in the workflow directory;
- current inspected workflow/package surfaces did not expose deploy/promote/release/publish/manual promotion logic;
- no repository tags were observed in the human baseline;
- promotion must bind to an exact source identity and explicit authority/evidence;
- merge and CI green are not automatic promotion;
- current target environment/provider/mechanism remain not established.

Prohibited claims:

- promotion exists operationally;
- any revision was promoted;
- a staging or production environment exists;
- a provider has been selected;
- a deployment occurred;
- a release exists;
- an artifact has release provenance;
- G-P6 has passed;
- Stage 07 is authorized.

## 23. Hard-stop evaluation

- live promotion executed: `NO`;
- deployment executed: `NO`;
- provider selected: `NO`;
- environment created: `NO`;
- deploy credential created: `NO`;
- workflow write/deploy permission introduced: `NO`;
- `workflow_dispatch` promotion trigger introduced: `NO`;
- tag created: `NO`;
- release created: `NO`;
- merge relabeled as promotion: `NO`;
- CI green relabeled as promotion: `NO`;
- AI autonomous promotion authority introduced: `NO`;
- G-P6 attempted: `NO`;
- Stage 07 authorization attempted: `NO`.

## 24. Downstream prerequisites

Before live promotion can be established, downstream governed work must source-back and implement the required subset of:

- promotion target/environment model;
- deployment/provider choice when needed;
- immutable artifact/provenance model when needed;
- credential/secret mechanism when needed;
- promotion workflow/mechanism;
- human approval interaction;
- deployment health evidence;
- rollback semantics;
- release provenance;
- audit/evidence retention.

This list is a prerequisite inventory, not a claim that all items must be implemented in exactly one technology or task.

## 25. 06.006 disposition

```yaml
record_type: stage06-explicit-promotion-contract
stage: stage.skillcertify.06
task: task.skillcertify.06.006
title_status: operational_non_canonical
source_revision_at_entry: 2a3d923a115fbfe5a63bc2532d2e4b2a14cbe777
local_runtime: node_22.22.2_npm_11.13.0
local_quality: pass
local_tests: 34/34_pass
local_build: pass
static_generation: 10/10_pass
workflow_inventory: quality_only
promotion_logic_in_inspected_paths: not_observed
repository_tags_observed: none
promotion_contract: established
promotion_source_identity_contract: established
promotion_eligibility_matrix: established
promotion_evidence_schema: established
promotion_human_authority_boundary: established
live_promotion_mechanism: not_established
target_environment: not_established
deployment_provider: not_established
secret_store: not_established
release_provenance: not_established
live_promotion_performed: false
gp6_decision: not_performed
stage07_authorized: false
```

Therefore `06.006` is **PROMOTION_CONTRACT_ESTABLISHED / LIVE_PROMOTION_BLOCKED_BY_NOT_ESTABLISHED_TARGET_AND_MECHANISM**.
