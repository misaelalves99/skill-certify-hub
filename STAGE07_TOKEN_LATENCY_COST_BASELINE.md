# Stage 07 — Token, Latency & Cost Baseline

## Metadata

```yaml
record_type: ai-runtime-telemetry-cost-baseline
stage_id: stage.skillcertify.07
task_id: task.skillcertify.07.008
task_title: Medir tokens, latência e custo por tarefa
workstream_id: workstream.skillcertify.07.04
workstream_title: Runtime Safety & Observability
issue_ref: https://github.com/misaelalves99/skill-certify-hub/issues/145
source_stage_manifest_version: "1.7.0"
entry_main_revision: 64b39562359532b04c00942e5696d44d3f18d52a
status: ready
human_reviewed: true
review_scope: CURRENT_POC_ONLY
external_observability_tool_selected: false
historical_tool_hint: Langfuse
telemetry_runner: scripts/stage07-telemetry.mjs
telemetry_test: tests/stage07-telemetry.test.mjs
provider_runtime_ref: provider-runtime.skillcertify.07.002.openai-embeddings-poc-v1
provider_endpoint: /v1/embeddings
provider_model: text-embedding-3-small
pricing_snapshot_date: "2026-09-02"
input_price_usd_per_million_tokens: 0.02
pricing_source: https://developers.openai.com/api/docs/models/text-embedding-3-small
provider_usage_contract_source: https://developers.openai.com/api/reference/resources/embeddings/methods/create
actual_billed_cost_status: NOT_ESTABLISHED
material_budget: NOT_ESTABLISHED
production_latency_slo: NOT_ESTABLISHED
p50_latency: 2372.906
p95_latency: NOT_REPORTED_SAMPLE_TOO_SMALL
ai_required: false
production_ai_authorized: false
gp7_performed: false
```

`status: ready` means the repo-native telemetry implementation passed deterministic validation, the three governed bounded external probes were measured successfully, and the human operator explicitly approved the evidence for `CURRENT_POC_ONLY`.

It does **not** mean production AI authorization, material-budget approval, production-SLO approval, semantic-quality approval, AI adoption approval, residual-risk acceptance, or G-P7 PASS.

## 1. Control question

`07.008` addresses the bounded question:

> Can the current OpenAI embeddings POC expose sanitized, source-backed token/usage metadata, end-to-end task latency and a clearly labeled price-based estimate per bounded run without exposing payloads or converting telemetry into product-quality truth?

## 2. Baseline audit

The entry repository already establishes:

- exact bounded source/runtime/model authority;
- a 5000 ms reversible POC timeout;
- kill switch and deterministic no-AI fallback;
- stable trace/correlation ID;
- sanitized reason/error classes;
- `raw_payload_logged: false`;
- `embedding_values_persisted: false`;
- deterministic eval/report path;
- recorded semantic result `2/3` with one miss preserved.

The entry repository does **not** establish:

- observed task latency per external run;
- provider-reported token/usage metadata in the sanitized trace;
- price-derived estimated cost per run;
- actual billed cost per run;
- p50/p95 latency distribution;
- material budget;
- production latency SLO.

The existing embeddings client reads the provider JSON response for vectors but discards the `usage` metadata, so a repo-native telemetry layer is necessary for this task.

## 3. Provider usage contract

The current OpenAI Embeddings API reference documents response usage metadata containing:

```text
usage.prompt_tokens
usage.total_tokens
```

Source:

```text
https://developers.openai.com/api/reference/resources/embeddings/methods/create
```

The telemetry layer captures only these bounded integer metadata fields plus the provider response model identifier. It does not retain or log the provider response body.

If the provider response does not expose valid integer usage metadata, the trace records:

```yaml
provider_usage_source: unavailable
prompt_tokens: null
total_tokens: null
estimated_input_cost_usd: null
```

No token count is reconstructed or invented.

## 4. Price source and estimate boundary

Official model documentation inspected for this task reports `text-embedding-3-small` input pricing as:

```yaml
price: 0.02
unit: USD_PER_1M_INPUT_TOKENS
snapshot_date: 2026-09-02
source: https://developers.openai.com/api/docs/models/text-embedding-3-small
```

The bounded estimate is:

```text
estimated_input_cost_usd = provider_reported_prompt_tokens × 0.02 / 1,000,000
```

This value is an **estimate derived from a documented price snapshot**. It is not evidence of the final amount invoiced or charged by the provider.

Therefore every telemetry event preserves:

```yaml
actual_billed_cost_usd: null
actual_billed_cost_status: NOT_ESTABLISHED
```

A future price change requires a new source snapshot/version before recomputing new evidence. Existing historical evidence must retain the price source used when it was measured.

## 5. Latency scope

The repo-native telemetry runner measures elapsed monotonic time around the complete bounded task execution:

```text
before safe grounded retrieval
→ provider call when permitted
→ bounded ranking / fallback normalization
→ sanitized result available
```

The field is:

```yaml
task_latency_ms: <observed finite non-negative number>
latency_scope: bounded_task_end_to_end
```

This is **not** a pure provider-network latency metric and is not a production SLO.

The existing 5000 ms provider timeout remains a safety cap only. It must not be reinterpreted as observed latency or an approved performance target.

## 6. Sanitized telemetry schema

The telemetry event allowlist contains only:

```text
event_type
trace_version
trace_id
state
reason_code
query_case_id
provider_runtime_ref
provider_endpoint
provider_model
provider_response_model
source_ref
source_blob_sha
execution_mode
external_call_performed
input_count
task_latency_ms
latency_scope
provider_usage_source
prompt_tokens
total_tokens
estimated_input_cost_usd
estimated_cost_basis
input_price_usd_per_million_tokens
pricing_unit
pricing_source
pricing_snapshot_date
actual_billed_cost_usd
actual_billed_cost_status
fallback_activated
kill_switch_active
timeout_ms
runtime_error_class
raw_payload_logged
embedding_values_persisted
```

The implementation continues to enforce:

```yaml
raw_payload_logged: false
embedding_values_persisted: false
```

No prompt text, serialized catalog body, API credential, provider raw response body or embedding vector belongs in the telemetry event.

## 7. Repo-native implementation

The task adds:

```text
scripts/stage07-telemetry.mjs
tests/stage07-telemetry.test.mjs
STAGE07_TOKEN_LATENCY_COST_BASELINE.md
```

No external observability dependency is introduced.

`Langfuse` remains a historical `select-at-execution` hint only. At this point, the current repo-native trace + deterministic tests are sufficient to establish the bounded measurement mechanism. External tracing has no demonstrated material need yet.

## 8. Deterministic validation design

The telemetry tests are designed to validate without network access:

1. bounded model and price snapshot are pinned;
2. provider usage normalization accepts only non-negative integer metadata;
3. cost formula is explicitly an estimate;
4. synthetic provider response records usage and end-to-end latency;
5. raw payload, embeddings and test credential are absent from telemetry output;
6. missing provider usage remains unavailable rather than invented;
7. disabled runtime performs no provider call and infers no cost;
8. invalid latency values fail closed.

The deterministic tests do not establish real OpenAI latency, token counts or cost. Those remain pending bounded external execution.

## 9. Bounded real-measurement evidence

The same three governed semantic probes already used in `07.004` were executed through the telemetry runner on 2026-09-02.

All three bounded executions used:

```yaml
provider_endpoint: /v1/embeddings
provider_model: text-embedding-3-small
execution_mode: external
external_call_performed: true
provider_usage_source: provider_reported
fallback_activated: false
kill_switch_active: false
runtime_error_class: null
raw_payload_logged: false
embedding_values_persisted: false
actual_billed_cost_status: NOT_ESTABLISHED
```

Observed evidence:

| Query case | Trace ID | Latency ms | Prompt tokens | Total tokens | Estimated input cost USD |
|---|---|---:|---:|---:|---:|
| `semantic-web-standards` | `f8db5421-8e8e-4f9a-bece-ae73e4ea03b3` | 2372.906 | 126 | 126 | 0.00000252 |
| `semantic-strong-typing` | `dd6b35ed-0ae3-4e68-83a9-d41ccff5e507` | 2888.685 | 126 | 126 | 0.00000252 |
| `semantic-core-website-skills` | `d272c085-6748-497c-935f-0fd6ead1fd8c` | 1444.046 | 127 | 127 | 0.00000254 |

The API credential remained ephemeral and was absent from the PowerShell session after execution.

No raw provider response body, embedding vector or credential is part of the evidence package.

## 10. Aggregated bounded evidence

```yaml
sample_size: 3
total_prompt_tokens: 379
total_tokens: 379
total_estimated_input_cost_usd: 0.00000758
p50_latency_ms: 2372.906
p95_latency: NOT_REPORTED_SAMPLE_TOO_SMALL
actual_billed_cost_status: NOT_ESTABLISHED
material_budget: NOT_ESTABLISHED
production_latency_slo: NOT_ESTABLISHED
```

The reported p50 is the median of the three observed bounded end-to-end task latencies.

Because the evidence package contains only three real probes, p95 is not reported.

The sample does not establish a production latency distribution, production SLO or material budget.

## 11. Actual vs estimated evidence

| Metric | Reviewed bounded evidence | Meaning |
|---|---|---|
| Provider prompt tokens | `379 total across n=3` | Provider-reported |
| Provider total tokens | `379 total across n=3` | Provider-reported |
| Task latency | `1444.046-2888.685 ms` | Observed bounded end-to-end runs |
| p50 latency | `2372.906 ms` | Median of n=3; bounded-sample limitation applies |
| p95 latency | `NOT_REPORTED_SAMPLE_TOO_SMALL` | n=3 is insufficient |
| Estimated input cost | `USD 0.00000758 total` | Derived from provider usage and pinned price snapshot |
| Actual billed cost | `NOT_ESTABLISHED` | Not inferred from the estimate |
| Material budget | `NOT_ESTABLISHED` | No authoritative budget was approved |
| Production SLO | `NOT_ESTABLISHED` | Outside current POC authority |

## 12. Relationship to eval and product quality

Telemetry does not repair or override the existing eval evidence:

```yaml
observed_semantic_match_rate: 2/3
semantic_miss_preserved: true
material_semantic_quality_threshold: NOT_ESTABLISHED
adoption_threshold: NOT_ESTABLISHED
```

A cheap or fast run can still be irrelevant. A slow or expensive run can still be semantically correct. Cost/latency evidence and quality evidence remain separate dimensions until a later governed decision explicitly combines them.

## 13. Human-review boundary

Human review for this bounded evidence package was completed by explicit human authority.

```yaml
human_reviewed: true
review_scope: CURRENT_POC_ONLY
repo_native_telemetry_sufficient_for_current_poc: true
three_run_measurement_sufficient_as_bounded_evidence: true
material_budget: NOT_ESTABLISHED
production_latency_slo: NOT_ESTABLISHED
production_ai_authorized: false
residual_risk_accepted: false
semantic_quality_approved: false
ai_adoption_approved: false
gp7_performed: false
```

The approval means only that the repo-native telemetry mechanism and the three governed real probes are sufficient as the `07.008` evidence baseline for `CURRENT_POC_ONLY`.

It does **not** authorize production AI, accept residual risk, approve semantic quality or AI adoption, establish a material budget or production SLO, or imply G-P7 PASS.

## 14. Hard-stop evaluation — reviewed ready state

```yaml
real_latency_invented: false
provider_usage_invented: false
actual_cost_invented: false
budget_invented: false
raw_payload_logged: false
embedding_values_persisted: false
external_observability_tool_adopted_by_hint: false
production_authority_inferred: false
ai_value_inferred: false
gp7_inferred: false
real_external_measurement_complete: true
human_review_complete: true
```

## 15. Current disposition

```text
REPO-NATIVE TELEMETRY LAYER MATERIALIZED /
PROVIDER USAGE CONTRACT SOURCE-BACKED /
PRICE SNAPSHOT SOURCE-BACKED /
COST FORMULA EXPLICITLY ESTIMATED /
ACTUAL BILLED COST NOT ESTABLISHED /
REAL TOKEN-LATENCY-COST MEASUREMENT COMPLETE /
HUMAN REVIEW COMPLETE - CURRENT_POC_ONLY /
AI_REQUIRED_FALSE /
PRODUCTION_AI_NOT_AUTHORIZED /
G-P7_NOT_PERFORMED
```
