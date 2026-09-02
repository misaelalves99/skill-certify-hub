# Stage 07 — Prompt Library & Grounding Baseline

## Baseline metadata

```yaml
record_type: prompt-grounding-baseline
stage_id: stage.skillcertify.07
origin_task_id: task.skillcertify.07.003
last_evidence_task_id: task.skillcertify.07.004
workstream_id: workstream.skillcertify.07.03
workstream_title: Prompt & Grounded Experience
source_stage_manifest_version: "1.7.0"
issue_ref_origin: https://github.com/misaelalves99/skill-certify-hub/issues/137
issue_ref_runtime: https://github.com/misaelalves99/skill-certify-hub/issues/139
human_tooling_decision_ref: https://github.com/misaelalves99/skill-certify-hub/issues/137#issuecomment-5446574085
human_citation_support_review_ref: https://github.com/misaelalves99/skill-certify-hub/issues/139#issuecomment-5512928118
status: ready
human_reviewed: true
repo_native_prompt_library: true
external_prompt_manager_selected: false
external_api_call_performed: true
ai_required: false
production_ai_authorized: false
gp7_performed: false
```

## 1. Purpose

This is the shared Stage 07 prompt/grounding contract. `07.003` created the repository-native versioned prompt/output layer; `07.004` supplied real bounded runtime evidence, deterministic citation/support validation, abstention/fallback tests and explicit human citation/support review.

`status: ready` means the **bounded grounding contract** satisfies the canonical schema. It does not mean AI has proven product value, semantic ranking is perfect, production is authorized, or G-P7 has passed.

## 2. Canonical contract state

```json
{
  "baseline_id": "baseline.skillcertify.07.003.prompt-grounding-v1",
  "stage_id": "stage.skillcertify.07",
  "prompt_version_refs": [
    "prompt.skillcertify.07.003.query-embedding@1.0.0",
    "prompt.skillcertify.07.003.catalog-document-embedding@1.0.0",
    "prompt.skillcertify.07.003.grounded-result-contract@1.0.0"
  ],
  "schema_or_output_contract_ref": "prompts/semantic-retrieval-poc.v1.json#output_contracts/semantic_retrieval_result",
  "grounded_response_refs": [
    "STAGE07_GROUNDED_ASSISTANT_RUNTIME_EVIDENCE.md#4-semantic-ranking-observations"
  ],
  "citation_validation_ref": "STAGE07_GROUNDED_ASSISTANT_RUNTIME_EVIDENCE.md#6-human-citationsupport-decision",
  "abstention_or_no_source_ref": "tests/stage07-grounded-poc.test.mjs",
  "prompt_injection_test_ref": "tests/stage07-grounded-poc.test.mjs",
  "unsupported_claims_open": 0,
  "status": "ready",
  "human_reviewed": true
}
```

All ready fields above are bound to explicit repository/runtime/human evidence. None is promoted by inference.

## 3. Governed immutable inputs

```yaml
use_case_adr:
  path: STAGE07_AI_USE_CASE_BASELINE_ADR.md
  blob_sha: 5adf0b148750d7eeb0ebe44f103171c6ddafecbf

source_data_runtime_boundary:
  path: STAGE07_SOURCE_DATA_CLOUD_BOUNDARY_BASELINE.md
  blob_sha: 052f2764e2f205c69aed57564f7d57d6c3f90c9f

authorized_catalog:
  source_ref: source.skillcertify.07.002.catalog
  path: app/certifications/catalog.ts
  blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396

provider_runtime:
  ref: provider-runtime.skillcertify.07.002.openai-embeddings-poc-v1
  endpoint: /v1/embeddings
  model: text-embedding-3-small
  scope: POC_ONLY
```

No broader runtime is authorized.

## 4. Versioned prompt library

Artifact:

```text
prompts/semantic-retrieval-poc.v1.json
```

Library ref/version:

```text
prompt-library.skillcertify.07.003.semantic-retrieval-v1
1.0.0
```

Tooling remains:

```yaml
mode: repo-native-source-control
external_prompt_manager: null
external_tool_selected: false
historical_hint: Langfuse
historical_hint_authority: derived-hint-only
```

The prompt-library JSON remains the historical `07.003` candidate/configuration artifact; this shared baseline advances to `ready` only after downstream `07.004` evidence.

## 5. Provider-bound input contract

Query input is limited to the bounded synthetic evaluation query.

Catalog-document representation remains deterministic and limited to the five authorized fields:

```text
id: {{id}}
title: {{title}}
issuer: {{issuer}}
level: {{level}}
summary: {{summary}}
```

Prohibited context remains:

- secrets or credentials;
- private/restricted/user data;
- unrelated repository content;
- external web knowledge;
- instructions that broaden the authorized source boundary.

## 6. Output and support contract

Allowed states:

```text
ranked_candidates | abstain
```

Every ranked candidate must use:

```text
source_ref = source.skillcertify.07.002.catalog
```

and a governed catalog id. Citation fields are resolved from the exact authorized catalog record.

The human review approved citation/support while preserving the ranking miss:

```text
07.004 citation/support review: APPROVE with semantic ranking miss preserved
```

Decision ref:

```text
https://github.com/misaelalves99/skill-certify-hub/issues/139#issuecomment-5512928118
```

## 7. Real runtime evidence

Artifact:

```text
STAGE07_GROUNDED_ASSISTANT_RUNTIME_EVIDENCE.md
```

Observed real external execution:

```yaml
external_api_call_performed: true
provider_endpoint: /v1/embeddings
provider_model: text-embedding-3-small
source_ref: source.skillcertify.07.002.catalog
source_blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
raw_payload_logged: false
embedding_values_persisted: false
```

Semantic ranking result:

| Query | Expected | Observed top-1 | Result |
|---|---|---|---|
| `web standards` | `cert-web-platform` | `cert-web-platform` | match |
| `strong typing` | `cert-typescript-practice` | `cert-typescript-practice` | match |
| `core website skills` | `cert-frontend-foundations` | `cert-web-platform` | **miss** |

```yaml
expected_top1_matches: 2
expected_top1_misses: 1
expected_top1_match_rate: 2/3
semantic_ranking_miss_preserved: true
```

The miss remains negative semantic-quality evidence and is not rewritten as success.

## 8. Citation validation

Runtime observations established that returned candidates:

- used the governed source ref;
- used governed certification ids;
- carried exact source-backed `title`, `issuer`, `level` and `summary` fields;
- did not invent an external source id or unknown certification id.

Human citation/support review approved this bounded behavior.

Therefore:

```yaml
citation_validation: ESTABLISHED
unsupported_claims_open: 0
```

`unsupported_claims_open: 0` does not mean semantic relevance is perfect. The `core website skills` result remains a ranking miss.

## 9. Abstention/no-source and fallback evidence

Deterministic harness evidence:

```text
tests/stage07-grounded-poc.test.mjs
```

establishes:

- adversarial and unknown queries abstain before provider calls;
- stale source authority abstains before provider calls;
- runtime failure abstains;
- strengthened no-AI fallback is preserved;
- invented certification ids fail support validation;
- the query boundary is closed to the versioned POC set.

Fallback ref:

```text
STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline
```

## 10. Prompt/adversarial boundary evidence

Versioned adversarial cases attempt to:

- broaden source scope to external internet knowledge;
- inject credentials/API keys into provider input;
- demand invented source references.

The harness rejects/abstains before provider execution. Sending hostile prohibited input to the external provider is not required to establish this boundary.

Evidence refs:

```text
prompts/semantic-retrieval-poc.v1.json
tests/prompt-library.test.mjs
tests/stage07-grounded-poc.test.mjs
```

## 11. Human decisions

Tooling decision:

```text
07.003 tooling decision: APPROVE repo-native / no external prompt manager
```

Citation/support decision:

```text
07.004 citation/support review: APPROVE with semantic ranking miss preserved
```

Both are human decisions. AI/tooling only recorded/materialized them.

## 12. Ready-condition evaluation

```yaml
grounded_response_ref_present: true
citation_validation_ref_present: true
abstention_or_no_source_ref_present: true
prompt_injection_test_ref_present: true
unsupported_claims_open: 0
human_reviewed: true
status: ready
```

No canonical grounding hard stop remains:

```yaml
citation_not_verifiable: false
abstention_or_fallback_missing: false
material_unsupported_claim_open: false
unauthorized_source_promoted: false
raw_secret_or_pii_in_evidence: false
behavior_without_test_eval_linkage: false
```

## 13. Known limitations preserved

1. Real-user demand for semantic search remains not established.
2. Bounded semantic ranking achieved only `2/3` expected top-1 matches.
3. `core website skills` remains an explicit ranking miss.
4. No similarity/materiality threshold is established.
5. AI value over simpler deterministic alternatives remains not established.
6. `ai_required` remains `false`.
7. No external prompt manager is selected.
8. Production AI remains unauthorized.
9. Broader OpenAI runtime, Files/File Search, vector stores and persistent indexing remain unauthorized.
10. G-P7 has not been performed.

## 14. Current disposition

```text
VERSIONED_REPO_NATIVE_PROMPT_LIBRARY_PRESERVED /
REAL_BOUNDED_EMBEDDINGS_RUNTIME_OBSERVED /
CITATION_SUPPORT_HUMAN_REVIEW_APPROVED /
ABSTENTION_FALLBACK_AND_ADVERSARIAL_BOUNDARIES_ESTABLISHED /
SHARED_GROUNDING_CONTRACT_READY /
2_OF_3_SEMANTIC_TOP1_MATCHES_WITH_ONE_MISS_PRESERVED /
AI_VALUE_NOT_ESTABLISHED /
AI_REQUIRED_FALSE /
PRODUCTION_AI_NOT_AUTHORIZED /
G-P7_NOT_PERFORMED
```
