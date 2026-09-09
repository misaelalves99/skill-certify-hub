# ADR — Scope Cuts, Deferred Debt, Risks and Return Conditions

Task: task.skillcertify.10.008
Stage: stage.skillcertify.10
Status: draft
Evidence type: ADR
Human review: required

## 1. Decision scope

This ADR records the current-cycle scope cut, deferred measurement/evidence debt, bounded risks and return conditions supported by the human-approved Task 10.008 classification.

It does not authorize product-direction change, WIP mutation, a new cycle, publication, external data ingestion, external tool execution, Git staging, commit, push, pull request or merge.

## 2. Human-approved classification basis

Human approval:

APROVO A CLASSIFICAÇÃO FACTUAL DE CORTES + DÍVIDA ADIADA + RISCOS + CONDIÇÕES DE RETORNO DO 10.008

Approved classification checkpoint:

CP10-008-C

## 3. Scope cut

### scope-cut.10.008.001

Decision:

DEFER_DORA_POC_CURRENT_CYCLE

Rationale:

Verified operational data is inadequate for all four DORA metrics. Task 10.007 established zero adequate DORA metrics, data adequacy was not established, POC execution was not allowed, and metric calculation was not allowed.

Source:

- stage10-evidence/10-007/DORA_POC_DEFER_REPORT.md

Disposition:

The DORA POC remains outside the executable scope of the current cycle.

Return condition:

See return.10.008.001.

## 4. Deferred debt

### debt.10.008.001

Type: measurement_operational_data_debt

Decision:

Operational DORA data remains unavailable or inadequate.

Source:

- stage10-evidence/10-007/DORA_POC_DEFER_REPORT.md

Critical: false

Owner: unassigned

Condition:

Directly verifiable deployment, change-failure, incident and restoration data become available.

Boundary:

This debt is not classified as critical. No critical-debt owner is invented.

### debt.10.008.002

Type: measurement_evidence_debt

Decision:

Comparable coverage series is unavailable.

Source:

- stage10-evidence/10-006/CODE_QUALITY_TREND_REPORT.md

Critical: false

### debt.10.008.003

Type: measurement_evidence_debt

Decision:

Comparable defect-density series is unavailable.

Source:

- stage10-evidence/10-006/CODE_QUALITY_TREND_REPORT.md

Critical: false

### debt.10.008.004

Type: measurement_evidence_debt

Decision:

Qualified vendor quality-score series is unavailable.

Source:

- stage10-evidence/10-006/CODE_QUALITY_TREND_REPORT.md

Critical: false

## 5. Risks

### risk.10.008.001

Decision:

Do not manufacture DORA metrics from non-equivalent repository signals.

Source:

- stage10-evidence/10-007/DORA_POC_DEFER_REPORT.md

Prohibited substitutions include treating merge count as deployment frequency or treating a CI run as a production deployment.

### risk.10.008.002

Decision:

Do not generalize the approximately six-hour code-quality comparison window into a long-term quality trend.

Source:

- stage10-evidence/10-006/CODE_QUALITY_TREND_REPORT.md

The available evidence supports a bounded chronology, not a numeric or causal long-term code-quality trend.

## 6. Return condition

### return.10.008.001

Decision:

Reassess DORA POC only when directly verifiable deployment, change-failure, incident and restoration data become available.

Source:

- stage10-evidence/10-007/DORA_POC_DEFER_REPORT.md

This is an eligibility condition for later reassessment. It does not authorize automatic POC execution.

## 7. Epistemic guardrails

### guardrail.10.008.001

Pre-baseline historical activity remains unknown unless separately verified evidence is admitted.

Source:

- stage10-evidence/10-004/RETROSPECTIVE_90_DAY_REPORT.md

### guardrail.10.008.002

Future execution-performance claims remain bounded to evidence explicitly promoted for the relevant claim type.

Source:

- stage10-evidence/10-004/RETROSPECTIVE_90_DAY_REPORT.md

These guardrails are not themselves classified as scope cuts or deferred debt.

## 8. Contextual tool selection

Governing contract:

C:\Users\misae\Desktop\execution-core\00-contracts\shared\ai-tool-selection.schema.json

Contract SHA-256:

504a50d9cc38f57586a1903d31279118564b5ecc0ba00bd52367e6f9ea765aef

Selected:

No external tool; repository-native Git and Markdown evidence review.

Role:

Evidence review and ADR materialization.

Fit:

100 / 100 contextual heuristic fit for the present execution scope.

This fit value is a task-selection heuristic used to satisfy the contextual selection contract. It is not an empirically measured product-quality or tool-performance score.

Legacy alternative:

GitHub Projects + Insights.

Legacy authority:

derived-hint-only.

Alternative fit:

35 / 100 contextual heuristic fit for the present execution scope.

This value represents relative suitability for this bounded ADR task only and must not be generalized into an objective rating of GitHub Projects + Insights.

Rationale:

The current task requires a source-backed ADR rather than a Project dashboard or chart. Frozen repository evidence already supports the approved classification. GitHub Projects + Insights remains appropriate for planning/tracking and visualization when Project-item data is needed, but it adds no required evidence to this ADR.

Official sources consulted:

- https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects
- https://docs.github.com/en/issues/planning-and-tracking-with-projects/viewing-insights-from-your-project

Selected external tool:

false

External tool connected:

false

External tool executed:

false

External action performed:

false

Review condition:

Reassess this selection if Task 10.008 later requires Project-item aggregation, Project charts or another execution environment.

## 9. Explicit non-classifications

SonarQube Cloud is not classified as scope debt.

Apache DevLake is not classified as scope debt.

Absence of a vendor score is not proof of poor intrinsic code quality.

Absence of historical evidence is not automatically failure.

Repository presence is not proof of execution.

## 10. Stop-condition compliance

### corte sem rationale/source

Assessment:

NOT TRIGGERED.

Reason:

scope-cut.10.008.001 contains both rationale and source.

### dívida crítica sem owner/condition

Assessment:

NOT TRIGGERED.

Reason:

No debt in the approved classification is critical. The operational DORA-data debt nevertheless records an explicit return condition and retains owner as unassigned rather than inventing one.

## 11. Current disposition

SCOPE_CUT_COUNT: 1
DEFERRED_DEBT_COUNT: 4
CRITICAL_DEBT_COUNT: 0
RISK_COUNT: 2
RETURN_CONDITION_COUNT: 1

ADR_STATUS: DRAFT
HUMAN_CLASSIFICATION_APPROVED: true
FINAL_ADR_HUMAN_REVIEW_REQUIRED: true

STRATEGY_CHANGE_EXECUTED: false
WIP_MUTATION_PERFORMED: false
NEW_CYCLE_STARTED: false

GIT_STAGING_AUTHORIZED: false
COMMIT_AUTHORIZED: false
PUSH_AUTHORIZED: false
PULL_REQUEST_AUTHORIZED: false
MERGE_AUTHORIZED: false
PUBLICATION_AUTHORIZED: false
EXTERNAL_ACTION_AUTHORIZED: false

