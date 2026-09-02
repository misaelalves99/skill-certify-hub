# Stage 07 — AI Decision, Limitations & Candidate Case

## Metadata

```yaml
record_type: ai-decision-case-baseline
stage_id: stage.skillcertify.07
task_id: task.skillcertify.07.009
task_title: Registrar decisão, limitações e candidate case factual
workstream_id: workstream.skillcertify.07.05
workstream_title: Evaluation, Cost & Evidence
issue_ref: https://github.com/misaelalves99/skill-certify-hub/issues/147
source_stage_manifest_version: "1.7.0"
status: human_decision_recorded
decision_scope: CURRENT_POC_ONLY
decision_authority: HUMAN
recommended_disposition: KEEP_BOUNDED_POC_EVIDENCE_ONLY
ai_required: false
ai_adoption_approved: false
production_ai_authorized: false
production_residual_risk_accepted: false
gp7_performed: false
stage08_authorized: false
material_semantic_quality_threshold: NOT_ESTABLISHED
adoption_threshold: NOT_ESTABLISHED
actual_billed_cost_status: NOT_ESTABLISHED
material_budget: NOT_ESTABLISHED
production_latency_slo: NOT_ESTABLISHED
```

## 1. Control question

Given the factual Stage 07 evidence collected so far, should the AI component be kept, reduced or removed, and what claims are safe to carry forward as a candidate public case?

This record does not perform G-P7, authorize production, accept residual production risk or enable Stage 08.

## 2. Evidence reconciled

### 2.1 AI value and baseline

The Stage 07 baseline preserves:

```yaml
ai_required: false
```

The Stage is explicitly allowed to succeed without concluding that AI is required.

### 2.2 Prompt, grounding and relevance

The shared grounding contract is ready for its bounded grounding scope.

No standalone 07.007 artifact or branch was found. Its grounding/relevance obligation is reconciled from the reviewed Stage 07 evidence already present.

```yaml
reconciliation_status: 07.007_RECONCILED_FROM_EXISTING_REVIEWED_EVIDENCE
standalone_07_007_artifact_claimed: false
```

Observed semantic evidence:

| Query | Expected target | Observed top-1 | Result |
|---|---|---|---|
| web standards | cert-web-platform | cert-web-platform | top-1 match |
| strong typing | cert-typescript-practice | cert-typescript-practice | top-1 match |
| core website skills | cert-frontend-foundations | cert-web-platform | top-1 miss; expected target ranked 2 |

```yaml
semantic_cases: 3
target_top1_matches: 2
target_top1_misses: 1
observed_match_rate: 2/3
semantic_miss_preserved: true
```

The preserved miss is a ranking/relevance error. The returned citation remains source-backed within the authorized catalog boundary.

### 2.3 Evaluation boundary

```yaml
ci_green_semantics: INTEGRITY_AND_REPRODUCIBILITY_ONLY
material_semantic_quality_threshold: NOT_ESTABLISHED
adoption_threshold: NOT_ESTABLISHED
```

CI green does not establish semantic sufficiency, AI value, adoption approval, production readiness or G-P7 PASS.

### 2.4 Runtime safety and telemetry

Safety and telemetry evidence applies only to the bounded POC.

```yaml
sample_size: 3
total_prompt_tokens: 379
total_tokens: 379
total_estimated_input_cost_usd: 0.00000758
p50_task_latency_ms: 2372.906
p95_task_latency_ms: NOT_REPORTED_SAMPLE_TOO_SMALL
actual_billed_cost_status: NOT_ESTABLISHED
material_budget: NOT_ESTABLISHED
production_latency_slo: NOT_ESTABLISHED
```

## 3. Factual decision candidate

Current evidence supports the following candidate disposition:

```yaml
recommended_disposition: KEEP_BOUNDED_POC_EVIDENCE_ONLY
keep_poc_evidence: true
expand_ai_adoption: false
authorize_production_ai: false
remove_existing_poc_evidence: false
```

Meaning:

> Preserve the bounded Stage 07 AI POC and its artifacts as technical evidence, but do not promote the AI component to product adoption or production on the evidence currently available.

This recommendation is based on:

- reproducible implementation, eval and safety evidence;
- grounded citations within the authorized source boundary;
- one preserved ranking/relevance miss in three semantic observations;
- material semantic-quality threshold not established;
- adoption threshold not established;
- ai_required false;
- actual billed cost not established;
- material budget not established;
- production latency SLO not established;
- production AI not authorized;
- G-P7 not performed.

This recommendation was subsequently explicitly human-approved within the bounded scope recorded below.

## 4. Alternatives considered

### KEEP / EXPAND

Not currently supported for broader adoption.

The project has useful bounded technical evidence, but no established adoption threshold or material semantic-quality threshold and the preserved semantic sample includes a miss.

### REDUCE

The current recommendation effectively keeps the AI surface constrained to its existing bounded evidence scope.

No broader runtime or product commitment should be inferred.

### REMOVE

Full removal is not required by the current evidence because the POC generated useful reproducible engineering, safety, grounding, evaluation and telemetry evidence.

Preserving that evidence does not imply product adoption.

## 5. Material limitations

The following limitations must remain visible:

1. semantic evidence contains only three real observations;
2. one of the three observations is a top-1 relevance miss;
3. material semantic-quality threshold is not established;
4. adoption threshold is not established;
5. actual provider-billed cost is not established;
6. material budget is not established;
7. production latency SLO is not established;
8. p95 latency is not reported because the sample is too small;
9. current approvals are bounded to the current POC where explicitly stated;
10. production AI is not authorized;
11. residual production risk has not been accepted;
12. G-P7 has not been performed;
13. Stage 08 is not authorized by this record.

## 6. Candidate factual case

A future sanitized public case may factually state that the project implemented and evaluated a bounded grounded semantic-retrieval POC with:

- versioned prompt/output contracts;
- source authorization boundaries;
- deterministic citation/support validation;
- runtime guardrails and fallback behavior;
- versioned CI evaluation;
- preserved positive and negative semantic evidence;
- repo-native telemetry for token, latency and estimated input cost;
- explicit separation between technical evidence and adoption/production authority.

A candidate case must disclose material limitations where relevant, including the preserved 2/3 semantic observation and the absence of production authorization.

It must not claim:

- perfect semantic retrieval;
- proven production quality;
- demonstrated business ROI;
- actual billed provider cost;
- production SLO compliance;
- AI necessity;
- production adoption;
- G-P7 PASS.

## 7. Publication boundary

```yaml
public_case_status: CANDIDATE_ONLY
sanitization_required: true
human_publication_decision_required: true
secret_values_allowed: false
raw_provider_payload_allowed: false
embedding_values_allowed: false
restricted_source_payload_allowed: false
```

Any later README, portfolio or case-study publication must remain factual and sanitized.

## 8. Human decision

The material decision for 07.009 was explicitly human-approved.

Approved decision text:

> Approve KEEP_BOUNDED_POC_EVIDENCE_ONLY for CURRENT_POC_ONLY: preserve the Stage 07 AI POC as factual engineering evidence, do not approve broader AI adoption or production, preserve the semantic 2/3 result and all unresolved thresholds, budget and SLO limitations, and allow only a sanitized candidate case for later publication review. This decision does not accept residual production risk, does not perform G-P7 and does not authorize Stage 08.

Recorded decision state:

```yaml
status: human_decision_recorded
human_decision_complete: true
```

## 9. Downstream boundary

After an explicit 07.009 human decision, this artifact may become an input to:

```text
07.010 six-dimension assessment
-> 07.011 exact G-P7 package + digest
-> 07.012 human G-P7 decision
```

None of those decisions is performed here.

## 10. Current disposition

```text
07.007_RECONCILED_FROM_EXISTING_REVIEWED_EVIDENCE /
GROUNDING_CONTRACT_READY_FOR_BOUNDED_SCOPE /
SEMANTIC_2_OF_3_EVIDENCE_PRESERVED /
MATERIAL_SEMANTIC_THRESHOLD_NOT_ESTABLISHED /
ADOPTION_THRESHOLD_NOT_ESTABLISHED /
ACTUAL_BILLED_COST_NOT_ESTABLISHED /
MATERIAL_BUDGET_NOT_ESTABLISHED /
PRODUCTION_LATENCY_SLO_NOT_ESTABLISHED /
AI_REQUIRED_FALSE /
AI_ADOPTION_NOT_APPROVED /
PRODUCTION_AI_NOT_AUTHORIZED /
RESIDUAL_PRODUCTION_RISK_NOT_ACCEPTED /
CANDIDATE_CASE_ONLY /
HUMAN_07_009_DECISION_APPROVED /
G-P7_NOT_PERFORMED /
STAGE08_NOT_AUTHORIZED
```


## 11. Human decision record

```yaml
human_decision: APPROVED
approved_disposition: KEEP_BOUNDED_POC_EVIDENCE_ONLY
approved_scope: CURRENT_POC_ONLY
broader_ai_adoption_approved: false
production_ai_authorized: false
production_residual_risk_accepted: false
semantic_2_of_3_preserved: true
candidate_public_case_allowed: true
candidate_public_case_requires_sanitization: true
gp7_performed: false
stage08_authorized: false
issue_ref: https://github.com/misaelalves99/skill-certify-hub/issues/147
issue_comment_id: 5518098306
```

Human-approved decision:

> KEEP_BOUNDED_POC_EVIDENCE_ONLY for CURRENT_POC_ONLY. Preserve the Stage 07 AI POC as factual engineering evidence without approving broader AI adoption or production. Preserve the semantic 2/3 result and all unresolved semantic threshold, adoption threshold, billed-cost, budget and SLO limitations. Permit only a sanitized candidate case for later publication review. This approval does not accept residual production risk, does not perform G-P7 and does not authorize Stage 08.
