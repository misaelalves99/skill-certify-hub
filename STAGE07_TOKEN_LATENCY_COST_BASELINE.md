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
status: candidate
human_reviewed: false
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
p50_latency: NOT_ESTABLISHED
p95_latency: NOT_ESTABLISHED
ai_required: false
production_ai_authorized: false
gp7_performed: false
```

`status: candidate` means the repo-native telemetry implementation and measurement plan are materialized, but the new implementation has not yet completed the local validation + bounded external measurement + required human review for this task.

It does **not** mean cost, latency, budget, production readiness, AI value, adoption, residual-risk acceptance, or G-P7 has been approved.

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

## 9. Bounded real-measurement plan

After deterministic local validation is green, the same three governed semantic probes already used in `07.004` should be executed through the telemetry runner:

```text
web standards
strong typing
core website skills
```

Each run must emit one sanitized telemetry event only.

The key must remain ephemeral in the current PowerShell session and must not be committed, printed or pasted into evidence.

For each real run, capture only:

- trace ID;
- query case ID;
- model/runtime/source refs;
- state/reason;
- input count;
- observed `task_latency_ms`;
- provider-reported `prompt_tokens` and `total_tokens` if available;
- estimated input cost using the pinned price snapshot;
- actual billed cost status as `NOT_ESTABLISHED`;
- fallback/error state;
- proof that raw payload/vectors were not logged.

## 10. Aggregation boundary

The initial real sample size is planned as:

```yaml
sample_size: 3
```

With only three bounded probes:

- individual observed latency may be reported;
- total observed prompt tokens may be summed if all runs expose provider usage;
- total estimated input cost may be summed from the same price snapshot;
- median/p50 may be reported only if the calculation and sample-size limitation are explicit;
- p95 must remain `NOT_REPORTED_SAMPLE_TOO_SMALL` for this bounded evidence package;
- no production SLO or material budget may be inferred.

## 11. Actual vs estimated evidence

The task must preserve these distinctions:

| Metric | Current status before real run | Meaning |
|---|---|---|
| Provider prompt tokens | `NOT_MEASURED` | Await real provider response |
| Provider total tokens | `NOT_MEASURED` | Await real provider response |
| Task latency | `NOT_MEASURED` | Await real telemetry run |
| Estimated input cost | `NOT_MEASURED` | Requires provider prompt tokens |
| Actual billed cost | `NOT_ESTABLISHED` | Not inferred from price formula |
| Material budget | `NOT_ESTABLISHED` | Requires human/source authority |
| Production SLO | `NOT_ESTABLISHED` | Outside current POC authority |
| p95 latency | `NOT_ESTABLISHED` | Insufficient current real sample |

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

Human review is still required before this baseline can become `ready`.

The later review may decide whether:

- repo-native telemetry is sufficient for the current POC scope;
- the three-run measurement is sufficient as bounded evidence;
- a material budget should remain `NOT_ESTABLISHED` or be defined from an authoritative source;
- any additional provider/tooling measurement is worth the cost.

The review must **not** be interpreted as:

- production AI authorization;
- residual-risk acceptance;
- AI adoption approval;
- semantic-quality PASS;
- G-P7 PASS.

## 14. Hard-stop evaluation — current candidate state

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
real_external_measurement_complete: false
human_review_complete: false
```

## 15. Current disposition

```text
REPO-NATIVE TELEMETRY LAYER MATERIALIZED /
PROVIDER USAGE CONTRACT SOURCE-BACKED /
PRICE SNAPSHOT SOURCE-BACKED /
COST FORMULA EXPLICITLY ESTIMATED /
ACTUAL BILLED COST NOT ESTABLISHED /
REAL TOKEN-LATENCY-COST MEASUREMENT PENDING /
HUMAN REVIEW PENDING /
AI_REQUIRED_FALSE /
PRODUCTION_AI_NOT_AUTHORIZED /
G-P7_NOT_PERFORMED
```
