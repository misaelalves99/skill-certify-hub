# ADR — Product Direction Input

Task: task.skillcertify.10.009
Stage: stage.skillcertify.10
Status: draft
Evidence type: ADR
Human review: required

## 1. Decision

Product direction:

clinicflow_poc_candidate

Human source:

- stage10-evidence/10-009/HUMAN_PRODUCT_DIRECTION_DECISION.md

Human source SHA-256:

bb1679a228fdd362277d658b341e4784de0fef6be71a36204f348e2dde776afb

## 2. Meaning

ClinicFlow is recorded as a candidate for a future POC.

This is a cycle-review direction input only.

It is not authorization to start ClinicFlow, create a new cycle, modify Strategy, mutate WIP or execute a POC.

## 3. Dependency basis

Formal dependencies:

- task.skillcertify.10.004
- task.skillcertify.10.008

Evidence refs:

- stage10-evidence/10-004/RETROSPECTIVE_90_DAY_REPORT.md
- stage10-evidence/10-008/SCOPE_DEBT_DECISION_ADR.md

The retrospective evidence is temporally bounded and does not establish a comparative factual superiority of ClinicFlow over SkillCertify.

The scope/debt ADR records current-cycle measurement limitations and likewise does not establish comparative product superiority.

Therefore the selected direction is explicitly human-authored rather than inferred automatically from the dependency evidence.

## 4. Decision contract alignment

Governing contract:

C:\Users\misae\Desktop\execution-core\01-primary\01-skillcert\00-control\contracts\cycle-decision-next-cycle-baseline.schema.json

Contract SHA-256:

5adec8d941b991a7de113b4e1d5c03713beda03369eb486158f1c443f731d05c

Contract fields represented by this decision:

baseline_id: baseline.skillcertify.10.009.direction.v1
stage_id: stage.skillcertify.10
product_direction: clinicflow_poc_candidate
product_direction_human_source_ref: stage10-evidence/10-009/HUMAN_PRODUCT_DIRECTION_DECISION.md

strategy_change_executed: false
wip_mutation_performed: false
new_cycle_started: false

human_reviewed: true
status: draft

next_cycle_outcome_refs: []

Task 10.010 owns preparation of next-cycle outcome candidates. No next-cycle outcome reference exists yet.

stop_condition_refs:

- task.skillcertify.10.009: decisão humana/source ausente
- task.skillcertify.10.009: tentativa de iniciar ClinicFlow/novo ciclo automaticamente

scope_debt_decision_refs:

- stage10-evidence/10-008/SCOPE_DEBT_DECISION_ADR.md

## 5. Stop-condition compliance

### decisão humana/source ausente

Assessment:

NOT TRIGGERED.

Reason:

The explicit human decision is preserved in stage10-evidence/10-009/HUMAN_PRODUCT_DIRECTION_DECISION.md and referenced by this ADR.

### tentativa de iniciar ClinicFlow/novo ciclo automaticamente

Assessment:

NOT TRIGGERED.

Reason:

The decision records ClinicFlow only as a future POC candidate. No ClinicFlow execution, new cycle, Strategy change or WIP mutation is authorized or performed.

## 6. Contextual tool selection

Governing contract:

C:\Users\misae\Desktop\execution-core\00-contracts\shared\ai-tool-selection.schema.json

Contract SHA-256:

504a50d9cc38f57586a1903d31279118564b5ecc0ba00bd52367e6f9ea765aef

Selected:

No external tool; repository-native Markdown evidence review.

Role:

Human decision capture and ADR materialization.

Fit:

100 / 100 contextual heuristic fit for this bounded execution scope.

This value is a task-selection heuristic, not an empirical tool-performance score.

Legacy recommendation:

não usar

Legacy authority:

derived-hint-only

Selection rationale:

Task 10.009 requires preservation of an explicit human decision and its authority boundaries. No external tool is required to establish or execute that decision.

Official sources:

- No external tool documentation required for the selected no-external-tool path.

Internal contractual sources:

- 00-control/execution/registries/task-registry.json
- 00-control/contracts/cycle-decision-next-cycle-baseline.schema.json
- 00-contracts/shared/ai-tool-selection.schema.json

Human controls:

- product direction must originate from explicit human decision
- ClinicFlow must not start automatically
- no new cycle may start automatically
- Strategy/WIP must remain unchanged
- no remote or external action is authorized

## 7. Current disposition

PRODUCT_DIRECTION: clinicflow_poc_candidate
HUMAN_DIRECTION_DECISION_PRESENT: true
HUMAN_SOURCE_BOUND: true

CLINICFLOW_STARTED: false
CLINICFLOW_POC_EXECUTED: false
NEW_CYCLE_STARTED: false
STRATEGY_CHANGE_EXECUTED: false
WIP_MUTATION_PERFORMED: false

ADR_STATUS: DRAFT
FINAL_ADR_HUMAN_REVIEW_REQUIRED: true

GIT_STAGING_AUTHORIZED: false
COMMIT_AUTHORIZED: false
PUSH_AUTHORIZED: false
PULL_REQUEST_AUTHORIZED: false
MERGE_AUTHORIZED: false
PUBLICATION_AUTHORIZED: false
EXTERNAL_ACTION_AUTHORIZED: false

