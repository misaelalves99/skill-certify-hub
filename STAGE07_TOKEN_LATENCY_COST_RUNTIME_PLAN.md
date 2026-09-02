# Stage 07 — Token, Latency & Cost Runtime Measurement Plan

This plan is intentionally separate from the baseline so the later real measurements can be appended as observed evidence without rewriting the candidate implementation history.

## Current status

```yaml
task_id: task.skillcertify.07.008
status: planned_measurement
real_external_measurement_complete: false
sample_size_planned: 3
provider_model: text-embedding-3-small
provider_endpoint: /v1/embeddings
raw_payload_logged: false
embedding_values_persisted: false
actual_billed_cost_status: NOT_ESTABLISHED
material_budget: NOT_ESTABLISHED
production_latency_slo: NOT_ESTABLISHED
```

## Governed probes

```text
web standards
strong typing
core website skills
```

Each probe must execute through `scripts/stage07-telemetry.mjs` with the already-authorized OpenAI embeddings POC credential loaded only in the current shell session.

## Evidence fields per run

Record only the sanitized telemetry event emitted by the runner:

- trace ID;
- query case ID;
- state and reason code;
- source/runtime/model refs;
- input count;
- bounded end-to-end task latency;
- provider-reported prompt/total tokens when exposed;
- price-snapshot-based estimated input cost;
- actual billed cost status (`NOT_ESTABLISHED`);
- fallback / timeout / error class;
- `raw_payload_logged: false`;
- `embedding_values_persisted: false`.

Do not record API credentials, raw provider payloads, prompt/catalog bodies, or embedding values.

## Aggregation after all three runs

Allowed:

- sample size;
- individual latency values;
- total provider-reported prompt tokens if all three runs expose them;
- total provider-reported total tokens if all three runs expose them;
- total estimated input cost using the same pinned price snapshot;
- median latency with an explicit `n=3` limitation.

Not allowed from this sample:

- production p95;
- production SLO;
- material budget;
- actual billed cost inference;
- semantic quality/adoption PASS;
- G-P7 PASS.

`p95` must remain `NOT_REPORTED_SAMPLE_TOO_SMALL` for this bounded three-run package.
