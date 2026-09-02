# Stage 07 — Grounded Assistant Runtime Evidence

## Metadata

```yaml
record_type: grounded-assistant-runtime-evidence
stage_id: stage.skillcertify.07
task_id: task.skillcertify.07.004
task_title: Implementar assistente mínimo com fontes
workstream_id: workstream.skillcertify.07.03
issue_ref: https://github.com/misaelalves99/skill-certify-hub/issues/139
runtime_evidence_comment_ref: https://github.com/misaelalves99/skill-certify-hub/issues/139#issuecomment-5512739083
human_citation_support_review_ref: https://github.com/misaelalves99/skill-certify-hub/issues/139#issuecomment-5512928118
implementation_commit: 7b60ca976fc26b0c6a0ee29ab48388337acda1f6
execution_date: 2026-09-02
status: reviewed_grounding_ready_with_semantic_miss
human_reviewed: true
external_api_call_performed: true
production_ai_authorized: false
ai_required: false
gp7_performed: false
```

## 1. Purpose

This artifact records the first real external execution of the bounded Stage 07 grounded-retrieval POC and the subsequent explicit human citation/support review.

It records grounding/runtime evidence only. It does not declare AI value, AI requirement, production readiness, broader provider authority, or G-P7 PASS.

## 2. Governed execution boundary

All three observed runs used the already human-authorized boundary:

```yaml
provider_runtime_ref: provider-runtime.skillcertify.07.002.openai-embeddings-poc-v1
provider: OpenAI API
endpoint: /v1/embeddings
model: text-embedding-3-small
runtime_scope: POC_ONLY
source_ref: source.skillcertify.07.002.catalog
source_blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
input_count_per_run: 4
```

Each external request consisted of one bounded synthetic evaluation query plus the three deterministic catalog representations authorized by `07.002`.

Still prohibited and not used:

- Responses/chat generation;
- Files / File Search;
- vector stores;
- persistent external indexing;
- persistent embedding storage;
- raw provider payload logging;
- production AI.

## 3. Observed trace hygiene

Every supplied runtime trace recorded:

```yaml
external_call_performed: true
execution_mode: external
raw_payload_logged: false
embedding_values_persisted: false
```

No raw embedding vector, raw provider payload, API credential value, or unrelated repository content is recorded in this evidence.

Human-local post-run evidence also established:

```yaml
OPENAI_API_KEY_present_after_cleanup: false
working_tree: clean
```

## 4. Semantic ranking observations

| Query | Expected governed record | Observed top-1 | Top-1 score | Expected-record rank | Result |
|---|---|---|---:|---:|---|
| `web standards` | `cert-web-platform` | `cert-web-platform` | `0.426090826914` | 1 | expected top-1 observed |
| `strong typing` | `cert-typescript-practice` | `cert-typescript-practice` | `0.308720958862` | 1 | expected top-1 observed |
| `core website skills` | `cert-frontend-foundations` | `cert-web-platform` | `0.464248118835` | 2 | expected top-1 **not** observed |

For `core website skills`, the expected record `cert-frontend-foundations` ranked second with score:

```text
0.42249907457
```

Bounded result:

```yaml
expected_top1_cases: 3
expected_top1_matches: 2
expected_top1_misses: 1
expected_top1_match_rate: 2/3
```

The third case remains negative semantic-quality evidence. Human review explicitly requires that this miss remain preserved.

## 5. Citation/support observations

Every candidate emitted by the observed runs used:

```text
source_ref = source.skillcertify.07.002.catalog
```

with deterministic citation ids:

```text
source.skillcertify.07.002.catalog:<certification_id>
```

Citation objects carried only exact source-backed catalog fields:

- `title`;
- `issuer`;
- `level`;
- `summary`.

No observed runtime output invented an external source ref or unknown certification id.

Critical distinction:

```text
ranking relevance
!=
claim/source support
```

The `core website skills` miss is a ranking/relevance error. The returned `cert-web-platform` citation still resolves to the authorized catalog and its displayed fields remain source-backed.

## 6. Human citation/support decision

Decision source:

```text
https://github.com/misaelalves99/skill-certify-hub/issues/139#issuecomment-5512928118
```

Recorded human decision:

```text
07.004 citation/support review: APPROVE with semantic ranking miss preserved
```

Decision semantics:

```yaml
decision_authority: HUMAN
citation_support_review: APPROVED
semantic_ranking_miss_preserved: true
unsupported_claims_open: 0
human_reviewed: true
```

This approval means the bounded runtime result/citation structures are accepted as source-grounded evidence. It does not mean the semantic ranking quality is sufficient for adoption.

## 7. Abstention, adversarial and fallback evidence

External provider calls were intentionally limited to the three positive semantic probes.

The deterministic harness tests establish the required safety behavior without unnecessary external calls:

```text
tests/stage07-grounded-poc.test.mjs
```

They cover:

- adversarial/unknown queries abstain before provider invocation;
- stale source authority abstains before provider invocation;
- runtime failure abstains and invokes the strengthened no-AI fallback;
- invented certification ids fail support validation;
- query scope is closed to the versioned evaluation set.

The prompt/adversarial contract is also versioned in:

```text
prompts/semantic-retrieval-poc.v1.json
```

This is valid grounding-control evidence; it is not a claim that hostile text was sent to the external provider.

## 8. Canonical ready-condition mapping

The shared `ai-prompt-grounding-baseline` ready conditions are now evidence-backed as follows:

```yaml
grounded_response_ref: STAGE07_GROUNDED_ASSISTANT_RUNTIME_EVIDENCE.md#4-semantic-ranking-observations
citation_validation_ref: STAGE07_GROUNDED_ASSISTANT_RUNTIME_EVIDENCE.md#6-human-citationsupport-decision
abstention_or_no_source_ref: tests/stage07-grounded-poc.test.mjs
prompt_injection_test_ref: tests/stage07-grounded-poc.test.mjs
unsupported_claims_open: 0
human_reviewed: true
```

Therefore the shared prompt-grounding baseline may be `ready` for its bounded grounding contract.

## 9. What this evidence establishes

```yaml
real_embeddings_execution: ESTABLISHED
sanitized_external_trace: ESTABLISHED
authorized_source_used: ESTABLISHED
authorized_provider_endpoint_model_used: ESTABLISHED
source_backed_candidate_citations_observed: true
citation_support_human_review: APPROVED
shared_prompt_grounding_contract: READY
expected_top1_semantic_matches: 2_of_3
semantic_ranking_miss_observed: true
semantic_ranking_miss_preserved: true
raw_payload_logged: false
embedding_values_persisted: false
credential_removed_after_execution: true
```

## 10. What remains not established

```yaml
real_user_demand_for_semantic_search: NOT_ESTABLISHED
material_ai_value_over_simpler_alternatives: NOT_ESTABLISHED
ai_required: false
material_similarity_threshold: NOT_ESTABLISHED
production_ai_authorized: false
broader_openai_runtime_authorized: false
gp7: NOT_PERFORMED
```

A `ready` grounding baseline is not an AI-value PASS and does not compensate for the observed 2/3 semantic ranking result.

## 11. Current disposition

```text
REAL_EMBEDDINGS_EXECUTION_ESTABLISHED /
SOURCE_BOUND_RUNTIME_TRACE_ESTABLISHED /
CITATION_SUPPORT_HUMAN_REVIEW_APPROVED /
GROUNDING_CONTRACT_READY /
2_OF_3_EXPECTED_TOP1_MATCHES_OBSERVED /
ONE_SEMANTIC_RANKING_MISS_PRESERVED /
AI_VALUE_NOT_ESTABLISHED /
AI_REQUIRED_FALSE /
PRODUCTION_AI_NOT_AUTHORIZED /
G-P7_NOT_PERFORMED
```
