# Stage 07 — Runtime Safety & Observability Baseline

## Metadata

```yaml
record_type: runtime-safety-observability-baseline
stage_id: stage.skillcertify.07
task_id: task.skillcertify.07.005
task_title: Implementar guardrails, fallback e logs seguros
workstream_id: workstream.skillcertify.07.04
workstream_title: Runtime Safety & Observability
issue_ref: https://github.com/misaelalves99/skill-certify-hub/issues/141
source_stage_manifest_version: "1.7.0"
entry_main_revision: b172c11da25eb64872673ce5cd75e18c0977cf86
human_safety_review_ref: https://github.com/misaelalves99/skill-certify-hub/issues/141#issuecomment-5513559794
status: ready
human_reviewed: true
review_scope: CURRENT_POC_ONLY
production_authorization_included: false
production_residual_risk_acceptance_included: false
repo_native_guardrails: true
external_guardrail_product_selected: false
external_api_call_performed_by_07_005_materialization: false
ai_required: false
production_ai_authorized: false
gp7_performed: false
```

`status: ready` is intentionally narrow. It means the bounded runtime-safety baseline for the current local Stage 07 embeddings POC has deterministic evidence and explicit human review. It does **not** mean production AI is authorized, production residual risk is accepted, AI value is established, or G-P7 has passed.

## 1. Control question

`07.005` evaluates the bounded question:

> Can the already-authorized embeddings POC fail in a safe, limited, observable and reversible way without exposing secrets/raw provider payloads or creating irreversible operation?

The objective is not to improve semantic ranking. The observed `07.004` semantic result remains `2/3` expected top-1 matches with one ranking miss preserved.

## 2. Inherited governed boundary

The safety layer does not broaden the already-approved runtime/source boundary:

```yaml
source_ref: source.skillcertify.07.002.catalog
source_path: app/certifications/catalog.ts
source_blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
provider_runtime_ref: provider-runtime.skillcertify.07.002.openai-embeddings-poc-v1
provider: OpenAI API
endpoint: /v1/embeddings
model: text-embedding-3-small
scope: POC_ONLY
```

Still not authorized:

- production AI;
- broader Responses/chat runtime;
- Files / File Search;
- vector stores or persistent indexing;
- persistent embedding storage;
- external guardrail SaaS/product;
- inference that AI is required;
- G-P7 inference.

## 3. Tooling disposition

Historical source hint: `Guardrails AI` / role `guardrail` / select-at-execution.

Current bounded implementation uses **repo-native controls only**:

```text
scripts/stage07-runtime-safety.mjs
```

Reason: the current POC is a local CLI with a single embeddings endpoint, fixed synthetic evaluation inputs and no production route. Adding a third-party guardrail dependency would expand operational surface without evidence that the existing repo-native controls are insufficient.

The human review recorded for `07.005` approves this bounded safety approach only for the current POC scope. It is not a production tooling/adoption decision.

## 4. Safety applicability matrix

| Safety layer | 07.005 disposition | Evidence / rationale |
|---|---|---|
| Input validation | ESTABLISHED / inherited | query boundary is closed to the versioned evaluation set |
| Source allowlist | ESTABLISHED / inherited | exact source ref + catalog blob pinning |
| Output support/citation validation | ESTABLISHED / inherited | candidate must exist in authorized catalog and carries source-backed citation |
| Abstention | ESTABLISHED / inherited | out-of-scope, stale source and runtime failures abstain |
| Deterministic no-AI fallback | ESTABLISHED / inherited | strengthened lexical fallback remains available |
| Raw provider payload logging | PROHIBITED / enforced | trace records `raw_payload_logged: false`; 07.005 trace output is allowlist-only |
| Embedding persistence | PROHIBITED / enforced | `embedding_values_persisted: false` |
| Credential required for external execution | ESTABLISHED / inherited | OpenAI client rejects empty credential |
| Prompt/source injection resistance | ESTABLISHED for bounded cases | adversarial cases abstain before provider execution |
| Explicit kill switch | ESTABLISHED by 07.005 | `--disable-runtime` prevents provider execution and activates fallback |
| Provider timeout | ESTABLISHED by 07.005 | abortable bounded fetch, 5000 ms operational POC default |
| Correlation/trace ID | ESTABLISHED by 07.005 | each safe run receives `trace_id`; tests may inject stable IDs |
| Runtime error classification | ESTABLISHED by 07.005 | timeout / HTTP / invalid-response classes map to sanitized reason codes |
| Safe logging / redaction | ESTABLISHED by 07.005 | metadata-only event is built from a strict allowlist, not arbitrary object serialization |
| Rate limiting | NOT APPLICABLE to current CLI POC | no public/multi-request application route exists in the authorized scope |
| Multi-user auth/authorization | NOT APPLICABLE to current CLI POC | no user-facing AI runtime exists; provider key remains local operator credential |
| Moderation | NOT APPLICABLE to current fixed synthetic catalog/query set | no open user-generated content or generative chat output is authorized |
| Persistent trace retention | NOT ESTABLISHED / intentionally absent | no persistent logging backend is selected; 07.005 emits ephemeral sanitized metadata only |
| Production incident response | NOT APPLICABLE / NOT AUTHORIZED | production AI is not authorized |

`NOT APPLICABLE` does not mean universally unnecessary. It means the control has no current execution surface inside the bounded local POC. A later production or user-facing runtime must reassess applicability.

## 5. Explicit kill switch

The safety wrapper defines:

```text
--disable-runtime
```

When active for an allowed bounded query:

```text
provider call: not performed
state: abstain
reason_code: runtime_disabled
fallback: strengthened-no-ai
trace.kill_switch_active: true
```

The switch is explicit, reversible and local. It does not require a new environment variable or tracked configuration secret.

Human-local deterministic validation observed:

```yaml
state: abstain
reason_code: runtime_disabled
external_call_performed: false
fallback_activated: true
kill_switch_active: true
timeout_ms: 5000
raw_payload_logged: false
embedding_values_persisted: false
controlled_cli_exit_code: 2
```

The exit code `2` represents controlled abstention, not provider execution failure.

## 6. Bounded timeout

The wrapper applies an abortable timeout around the provider fetch:

```yaml
timeout_ms: 5000
scope: POC operational default
mechanism: AbortController
```

A timeout is converted to:

```text
state: abstain
reason_code: runtime_timeout
runtime_error_class: RuntimeTimeoutError
fallback activated: true
```

The raw exception message is not copied into the trace. The 5000 ms value is not a production SLO, budget or latency claim; it is a reversible local safety cap for this POC.

## 7. Safe error classes

The wrapper normalizes provider/runtime failures without logging raw bodies or arbitrary exception text:

| Runtime condition | Sanitized result |
|---|---|
| timeout / abort | `runtime_timeout` / `RuntimeTimeoutError` |
| non-success provider HTTP | `provider_http_error` / `ProviderHttpError` |
| malformed provider response | `provider_response_invalid` / `ProviderResponseError` |
| other runtime failure | `runtime_unavailable` / bounded error class only |

Provider response bodies are not read for logging on non-success HTTP responses.

## 8. Metadata-first sanitized trace

The safe trace event contains only an explicit allowlist:

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
source_ref
source_blob_sha
execution_mode
external_call_performed
input_count
fallback_activated
kill_switch_active
timeout_ms
runtime_error_class
raw_payload_logged
embedding_values_persisted
```

It intentionally excludes:

- API key or environment values;
- Authorization headers;
- raw provider request/response body;
- raw embedding values;
- arbitrary exception messages;
- private provider/account metadata;
- unrelated repository content;
- candidate payloads and query text from the operational trace event.

The allowlist approach provides redaction by omission rather than attempting to regex-scrub arbitrary raw log payload after the fact.

No persistent logging backend is selected. Therefore `ready` does not authorize or define a production trace-retention policy.

## 9. Red-team and deterministic evidence

`tests/stage07-runtime-safety.test.mjs` covers, without network access:

1. inherited source/provider boundary remains unchanged;
2. explicit kill switch prevents provider execution;
3. fallback remains active when the runtime is disabled;
4. fetch receives an abort signal;
5. timeout is classified and secret-bearing exception text is not leaked;
6. provider HTTP failure is classified without reading/logging raw response body;
7. malformed provider payload is classified and falls back;
8. prompt/source-injection and unregistered inputs remain blocked before provider execution;
9. sanitized trace output excludes injected secret/raw payload/private metadata fields;
10. invalid timeout/trace identifiers fail closed.

Human-local validation checkpoint before review:

```yaml
repository_quality: PASS
repository_tests: 70/70 PASS
runtime_safety_tests: 9/9 PASS
grounded_07_004_tests: 12/12 PASS
prompt_library_tests: 5/5 PASS
build: PASS
ssg_static_generation: 10/10
openai_api_key_present: false
working_tree: clean
```

These results establish deterministic behavior of the repo-native safety layer. They do not prove production robustness, adversarial completeness, AI value or residual-risk acceptance.

## 10. Existing 07.004 controls preserved

`07.005` deliberately wraps rather than rewrites the grounded POC. The following approved behavior remains owned by:

```text
scripts/stage07-grounded-poc.mjs
tests/stage07-grounded-poc.test.mjs
```

Preserved properties include:

- exact authorized catalog/source runtime boundary;
- deterministic serialization of five catalog fields;
- local ranking and citation support;
- versioned query allowlist;
- abstention for prohibited/out-of-scope context;
- stale-source refusal;
- runtime-unavailable fallback;
- no raw embedding output;
- no persistent vector storage.

The previous semantic ranking limitation remains evidence, not erased by the safety review.

## 11. External execution boundary

No new OpenAI request was required to validate the `07.005` materialization or human safety review.

The safety properties added here were validated using deterministic fake provider transports. This avoids spending credits or exposing a credential merely to prove timeout/error/kill-switch behavior.

Any later real-provider execution must remain inside the already-authorized embeddings POC boundary and should use the safety wrapper rather than bypassing it.

## 12. Human bounded safety review

Human authority is recorded at:

```text
https://github.com/misaelalves99/skill-certify-hub/issues/141#issuecomment-5513559794
```

Explicit decision:

```text
07.005 bounded runtime safety review: APPROVE for current POC scope; production authorization and residual-risk acceptance remain excluded
```

The approved bounded proposition is:

> The repo-native POC safety layer provides sufficient fail-closed behavior, fallback, kill-switch semantics and sanitized observability for the current Stage 07 evaluation scope, while preserving the documented non-applicable controls and limitations.

This review establishes only the current POC safety baseline. It does not expand authority.

The following remain outside this decision:

- AI adoption/value decision;
- production authorization;
- production SLO/latency budget;
- production rate limits;
- persistent trace-retention policy;
- residual-risk acceptance for production;
- production incident-response approval;
- G-P7 PASS.

## 13. Hard-stop evaluation after human review

Observed bounded state:

```yaml
production_use_without_authority: false
secret_or_pii_in_logs: false
fallback_missing: false
material_known_injection_failure: false
invented_cost_or_latency_claim: false
raw_payload_retention: false
kill_switch_missing_for_current_poc: false
telemetry_treated_as_quality_proof: false
human_review_complete: true
human_review_scope: CURRENT_POC_ONLY
production_authorization: false
production_residual_risk_acceptance: false
```

No material hard stop remains for closing **this bounded `07.005` POC task** after final repository validation and normal PR/CI/manual-merge governance.

This statement must not be reused as production residual-risk acceptance.

## 14. Current disposition

```text
07.004 SAFETY CONTROLS REUSED /
REPO-NATIVE RUNTIME SAFETY WRAPPER MATERIALIZED /
EXPLICIT KILL SWITCH ESTABLISHED /
BOUNDED TIMEOUT ESTABLISHED /
SANITIZED METADATA TRACE ESTABLISHED /
RED-TEAM TESTS GREEN /
NO NEW EXTERNAL RUNTIME CALL REQUIRED /
HUMAN SAFETY REVIEW APPROVED_FOR_CURRENT_POC_ONLY /
PRODUCTION_AUTHORIZATION_EXCLUDED /
PRODUCTION_RESIDUAL_RISK_ACCEPTANCE_EXCLUDED /
AI_REQUIRED_FALSE /
PRODUCTION_AI_NOT_AUTHORIZED /
G-P7_NOT_PERFORMED /
STATUS_READY
```
