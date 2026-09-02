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
implementation_commit: 7b60ca976fc26b0c6a0ee29ab48388337acda1f6
execution_date: 2026-09-02
status: observed_pending_human_review
human_reviewed: false
external_api_call_performed: true
production_ai_authorized: false
ai_required: false
gp7_performed: false
```

## 1. Purpose

This artifact records the first real external execution of the bounded Stage 07 grounded-retrieval POC after the network-free harness passed local validation.

It records observed runtime evidence only. It does not declare AI value, AI requirement, production readiness, broader provider authority, or G-P7 PASS.

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

## 3. Observed real execution traces

Every supplied runtime trace recorded:

```yaml
external_call_performed: true
execution_mode: external
raw_payload_logged: false
embedding_values_persisted: false
```

No raw embedding vector, raw provider payload, API credential value, or unrelated repository content is recorded in this evidence.

## 4. Semantic ranking observations

The versioned evaluation probes and expected governed records were established before the real runtime execution.

| Query | Expected governed record | Observed top-1 | Top-1 score | Expected-record rank | Result |
|---|---|---|---:|---:|---|
| `web standards` | `cert-web-platform` | `cert-web-platform` | `0.426090826914` | 1 | expected top-1 observed |
| `strong typing` | `cert-typescript-practice` | `cert-typescript-practice` | `0.308720958862` | 1 | expected top-1 observed |
| `core website skills` | `cert-frontend-foundations` | `cert-web-platform` | `0.464248118835` | 2 | expected top-1 **not** observed |

For `core website skills`, the expected record `cert-frontend-foundations` ranked second with score:

```text
0.42249907457
```

Therefore the bounded real runtime result is:

```yaml
expected_top1_cases: 3
expected_top1_matches: 2
expected_top1_misses: 1
expected_top1_match_rate: 2/3
```

The third case is preserved as negative semantic-quality evidence. It must not be rewritten as a success merely because the expected record appeared in second place.

## 5. Full observed ordering

### `web standards`

```text
1. cert-web-platform          0.426090826914
2. cert-frontend-foundations  0.314272168446
3. cert-typescript-practice   0.247323931531
```

### `strong typing`

```text
1. cert-typescript-practice   0.308720958862
2. cert-frontend-foundations  0.17988634689
3. cert-web-platform          0.172339028812
```

### `core website skills`

```text
1. cert-web-platform          0.464248118835
2. cert-frontend-foundations  0.42249907457
3. cert-typescript-practice   0.317070434365
```

No material similarity threshold is inferred from these values.

## 6. Citation/support observations

Every candidate emitted by the observed runs used:

```text
source_ref = source.skillcertify.07.002.catalog
```

and deterministic citation ids of the form:

```text
source.skillcertify.07.002.catalog:<certification_id>
```

The citation object carried only source-backed fields resolved from the exact authorized catalog record:

- `title`;
- `issuer`;
- `level`;
- `summary`.

Observed runtime output did not invent an external source ref or unknown certification id.

Important semantic distinction:

```text
ranking relevance
!=
claim/source support
```

The `core website skills` top-1 mismatch is a semantic-ranking miss. It is not automatically an unsupported factual claim because the returned `cert-web-platform` citation still resolves to the authorized catalog and its displayed fields remain source-backed.

Human citation/support review is still required before this evidence can satisfy the shared grounding ready conditions.

## 7. Abstention, adversarial and fallback evidence boundary

The real external execution was intentionally limited to the three positive semantic probes.

Abstention, source-staleness, adversarial scope broadening, invented-source requests and runtime-failure fallback were already exercised by the deterministic local harness tests without external requests.

This artifact does not falsely claim that a live external adversarial provider call was necessary or performed. The implementation boundary intentionally rejects those inputs before provider invocation.

## 8. Secret and repository hygiene

Human-local post-run evidence establishes:

```yaml
OPENAI_API_KEY_present_after_cleanup: false
working_tree: clean
```

No credential value was supplied as evidence, written to this artifact, committed to the repository, or included in the Issue comment.

## 9. What this evidence establishes

```yaml
real_embeddings_execution: ESTABLISHED
sanitized_external_trace: ESTABLISHED
authorized_source_used: ESTABLISHED
authorized_provider_endpoint_model_used: ESTABLISHED
source_backed_candidate_citations_observed: true
expected_top1_semantic_matches: 2_of_3
semantic_ranking_miss_observed: true
raw_payload_logged: false
embedding_values_persisted: false
credential_removed_after_execution: true
```

## 10. What this evidence does not establish

```yaml
real_user_demand_for_semantic_search: NOT_ESTABLISHED
material_ai_value_over_simpler_alternatives: NOT_ESTABLISHED
ai_required: false
material_similarity_threshold: NOT_ESTABLISHED
production_ai_authorized: false
broader_openai_runtime_authorized: false
gp7: NOT_PERFORMED
```

A 2/3 expected top-1 result is evidence to evaluate, not a success threshold invented after observation.

## 11. Human review checkpoint

Human review must now evaluate whether the observed runtime candidates and citation/support structures are acceptable as grounded evidence for the bounded POC.

The review must explicitly preserve the semantic-ranking miss and must not convert it into a hidden PASS.

Until that review is recorded:

```yaml
human_citation_support_review: PENDING
shared_prompt_grounding_baseline_status: candidate
runtime_evidence_status: observed_pending_human_review
```

## 12. Current disposition

```text
REAL_EMBEDDINGS_EXECUTION_ESTABLISHED /
SOURCE_BOUND_RUNTIME_TRACE_ESTABLISHED /
2_OF_3_EXPECTED_TOP1_MATCHES_OBSERVED /
ONE_SEMANTIC_RANKING_MISS_PRESERVED /
CITATION_SUPPORT_REVIEW_PENDING /
AI_VALUE_NOT_ESTABLISHED /
AI_REQUIRED_FALSE /
PRODUCTION_AI_NOT_AUTHORIZED /
G-P7_NOT_PERFORMED
```
