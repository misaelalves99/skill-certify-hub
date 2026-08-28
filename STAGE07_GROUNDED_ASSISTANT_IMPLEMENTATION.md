# Stage 07 — Grounded Assistant Minimal Implementation Baseline

## Metadata

```yaml
record_type: grounded-assistant-implementation-baseline
stage_id: stage.skillcertify.07
task_id: task.skillcertify.07.004
task_title: Implementar assistente mínimo com fontes
workstream_id: workstream.skillcertify.07.03
issue_ref: https://github.com/misaelalves99/skill-certify-hub/issues/139
source_repository_revision: 03d8fcdb573409312eb67370e40aefcd75bd9f7b
status: candidate_implementation
human_reviewed: false
external_api_call_performed: false
runtime_grounding_established: false
production_ai_authorized: false
ai_required: false
gp7_performed: false
```

## 1. Purpose

This record binds the first executable `07.004` harness to the exact Stage 07 source, runtime and prompt contracts already authorized upstream.

The implementation is intentionally network-free by default. Its first objective is to prove the local mechanics before any external embedding request is executed:

```text
bounded query
→ exact source-boundary validation
→ deterministic catalog serialization
→ embedding interface
→ local cosine ranking
→ governed source/citation validation
→ ranked_candidates OR abstain
→ strengthened no-AI fallback
```

No runtime grounding claim is made by materializing this harness.

## 2. Immutable governed inputs

Repository baseline validated before materialization:

```yaml
repository_head: 03d8fcdb573409312eb67370e40aefcd75bd9f7b
authorized_catalog_blob: 3a95f044198c443e4ce073fecdfea62f7f8ce396
use_case_adr_blob: 5adf0b148750d7eeb0ebe44f103171c6ddafecbf
source_data_runtime_boundary_blob: 052f2764e2f205c69aed57564f7d57d6c3f90c9f
prompt_grounding_baseline_blob: 99574bdeed7fa8cf59c63f0589ae85b48734b3e4
prompt_library_blob: 674cdec4b1c343bb71822f1f0dd2c3513e24008d
```

The harness must stop before provider execution when the current catalog blob does not equal the authorized blob.

## 3. Provider/runtime boundary

Inherited authorized POC runtime:

```yaml
provider_runtime_ref: provider-runtime.skillcertify.07.002.openai-embeddings-poc-v1
provider: OpenAI API
endpoint: /v1/embeddings
model: text-embedding-3-small
scope: POC_ONLY
```

Still prohibited:

- Responses/chat generation;
- Files or File Search;
- vector stores;
- persistent indexing;
- persistent embedding storage;
- raw provider payload logging;
- production AI.

## 4. Local secret/config boundary

Pre-materialization human-local inspection established only the boolean state:

```yaml
OPENAI_API_KEY_present_in_current_shell: false
```

No credential value is recorded in this artifact, Issue #139 or source control.

The external client in `scripts/stage07-grounded-poc.mjs` requires a non-empty local credential only when explicitly invoked for external execution. Importing the module and running the repository tests do not make a provider request.

## 5. Harness artifacts

```text
scripts/stage07-grounded-poc.mjs
tests/stage07-grounded-poc.test.mjs
```

The harness consumes the versioned library directly:

```text
prompts/semantic-retrieval-poc.v1.json
```

so source/runtime identifiers and the bounded eval set are not silently redefined in loose code.

## 6. Query boundary

Only versioned allowed evaluation inputs may reach the embedding interface.

Current allowed bounded cases include:

```text
TypeScript
web standards
strong typing
core website skills
```

Versioned adversarial cases and unknown free-form inputs must abstain before provider invocation.

This is a deliberate POC boundary, not a production query policy.

## 7. Deterministic source serialization

Each catalog record is serialized using only the five fields authorized by `07.002`:

```text
id
title
issuer
level
summary
```

Stable representation:

```text
id: {{id}}
title: {{title}}
issuer: {{issuer}}
level: {{level}}
summary: {{summary}}
```

No repository history, page source, external web knowledge, credentials or other context is added.

## 8. Ranking semantics

The local ranking function uses cosine similarity over finite equal-dimension vectors.

No material semantic threshold is invented in `07.004` at this checkpoint. A ranking is therefore evidence of ordering only. It is not evidence that AI is necessary, that the top result is materially useful, or that a production answer should be generated.

## 9. Citation/support semantics

Every ranked candidate must resolve to an exact authorized catalog record and must use:

```text
source_ref = source.skillcertify.07.002.catalog
```

The harness attaches a deterministic citation object containing:

- source ref;
- governed certification id;
- exact source-backed `title`, `issuer`, `level` and `summary` fields.

An invented id or mismatched source ref fails support validation.

This deterministic structure enables later human citation/support review. It does not by itself promote the shared prompt-grounding baseline to `ready`.

## 10. Abstention and fallback

The harness must return `abstain` without provider execution when any pre-call boundary fails, including:

- query outside the versioned POC set;
- versioned adversarial input;
- stale catalog/source authority;
- missing embedding interface.

Provider/runtime failure after an attempted call also returns `abstain`.

Fallback remains the strengthened deterministic comparator from `07.001`:

```text
title + issuer + level + summary
```

with ref:

```text
STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline
```

## 11. Trace minimization

The structured result exposes only sanitized metadata needed for later evidence:

- query case id;
- provider runtime ref;
- endpoint/model identity;
- governed source ref/blob;
- input count;
- whether the execution mode was external;
- `raw_payload_logged: false`;
- `embedding_values_persisted: false`.

Raw vectors and raw provider payloads are not included in the result contract.

## 12. Deterministic test scope

`tests/stage07-grounded-poc.test.mjs` covers:

1. exact source/runtime pinning;
2. five-field stable serialization;
3. cosine similarity behavior;
4. synthetic expected-record ranking with injected fake vectors;
5. source-backed citation/support validation;
6. adversarial/unknown pre-call abstention;
7. stale-source pre-call abstention;
8. runtime-failure fallback;
9. no raw embedding vectors in ranked output;
10. governed `/v1/embeddings` request shape through an injected fake `fetch`;
11. refusal to create an external client without a credential;
12. closed query boundary.

The test suite performs no real network request.

The synthetic vector ranking tests prove harness mechanics only. They are not semantic-quality evidence for `text-embedding-3-small`.

## 13. Pre-materialization quality evidence

Human local baseline before this implementation:

```text
config/secret guard: PASS
lint: PASS
typecheck: PASS
repository tests: 49/49 PASS
prompt-library tests: 5/5 PASS
build: PASS
SSG: 10/10
working tree: clean
```

Post-materialization repository-wide quality remains pending human-local validation.

## 14. Current evidence state

```yaml
implementation_harness: MATERIALIZED_PENDING_LOCAL_VALIDATION
real_embedding_request: NOT_PERFORMED
real_grounded_response: NOT_ESTABLISHED
citation_structure: IMPLEMENTED_PENDING_LOCAL_VALIDATION
human_citation_support_review: PENDING
runtime_abstention_evidence: NOT_ESTABLISHED_EXTERNAL
runtime_prompt_injection_evidence: NOT_ESTABLISHED_EXTERNAL
unsupported_claims_open_runtime: NOT_ESTABLISHED
prompt_grounding_status: candidate
ai_value: NOT_ESTABLISHED
ai_required: false
production_ai: NOT_AUTHORIZED
gp7: NOT_PERFORMED
```

## 15. Next checkpoint

The next permitted sequence is:

```text
materialized harness
→ human-local npm run quality
→ human-local 07.004 harness tests
→ verify clean tree and no accidental network execution
→ configure credential locally without committing or disclosing it
→ execute the smallest bounded embeddings demo
→ capture sanitized trace only
→ human citation/support review
→ decide whether the shared prompt-grounding baseline can advance
```

No external call should occur before the materialized harness passes its local validation checkpoint.
