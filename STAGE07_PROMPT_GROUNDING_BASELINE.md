# Stage 07 — Prompt Library & Grounding Baseline

## Baseline metadata

```yaml
record_type: prompt-grounding-baseline
stage_id: stage.skillcertify.07
task_id: task.skillcertify.07.003
task_title: Criar prompt library versionada
workstream_id: workstream.skillcertify.07.03
workstream_title: Prompt & Grounded Experience
source_stage_manifest_version: "1.7.0"
source_repository_revision: d2c564b10f993e83a78b6a0d2c55a7a3751012c1
issue_ref: https://github.com/misaelalves99/skill-certify-hub/issues/137
human_tooling_decision_ref: https://github.com/misaelalves99/skill-certify-hub/issues/137#issuecomment-5446574085
status: candidate
human_reviewed: true
repo_native_prompt_library: true
external_prompt_manager_selected: false
external_api_call_performed: false
ai_required: false
production_ai_authorized: false
gp7_performed: false
```

## 1. Purpose

This record materializes the versioned behavioral/configuration layer for the bounded Stage 07 semantic-retrieval POC.

The prompt library is repository-native and source-controlled. Human review explicitly approved this tooling disposition for `07.003`; no external prompt-management service is selected.

This task does not execute the OpenAI API and does not claim grounded runtime behavior, citation integrity, semantic quality, AI value, production readiness, or G-P7 PASS.

## 2. Canonical task and contract

Canonical task:

```text
task.skillcertify.07.003 — Criar prompt library versionada
```

Canonical objective:

> Versionar prompts, outputs esperados, refusal behavior e testes de mudança com source control.

Canonical workstream control question:

> o comportamento está versionado e a resposta consegue sustentar claims por fonte ou recusar de forma correta?

The Stage 07 source package defines `AI Prompt & Grounded Experience Baseline` in:

```text
00-control/contracts/ai-prompt-grounding-baseline.schema.json
```

Current contract state:

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
  "grounded_response_refs": [],
  "citation_validation_ref": null,
  "abstention_or_no_source_ref": "prompts/semantic-retrieval-poc.v1.json#prompt_versions/2/abstention_fallback_rule",
  "prompt_injection_test_ref": "tests/prompt-library.test.mjs#static-adversarial-boundary",
  "unsupported_claims_open": 0,
  "status": "candidate",
  "human_reviewed": true
}
```

`unsupported_claims_open: 0` means there are no grounded runtime responses in this task from which unsupported claims are currently open. It is not evidence of citation correctness or runtime quality.

## 3. Why the baseline remains candidate

Human review of tooling is complete, but the shared grounding contract still lacks runtime evidence.

Current downstream evidence state:

```yaml
grounded_response_refs: []
citation_validation_ref: null
runtime_abstention_evidence: NOT_ESTABLISHED
runtime_prompt_injection_evidence: NOT_ESTABLISHED
human_reviewed: true
```

Therefore the correct state remains:

```text
status: candidate
```

`task.skillcertify.07.004` is the canonical downstream implementation task expected to produce the missing grounded-response/citation/runtime evidence.

## 4. Governed immutable inputs

The prompt library is bound to repository state after the `07.002` merge:

```yaml
source_revision: d2c564b10f993e83a78b6a0d2c55a7a3751012c1
```

Pinned inputs:

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
```

The catalog authorization remains limited to the exact blob above.

## 5. Human tooling decision

Human decision source:

```text
https://github.com/misaelalves99/skill-certify-hub/issues/137#issuecomment-5446574085
```

Recorded decision:

```text
07.003 tooling decision: APPROVE repo-native / no external prompt manager
```

Decision semantics:

```yaml
decision_authority: HUMAN
tool_selection_mode: repo-native-source-control
external_prompt_manager: null
external_tool_selected: false
selection_status: approved_repo_native_no_external_manager
human_reviewed: true
```

Historical Stage 07 hint remains:

```yaml
legacy_recommendation: Langfuse
legacy_role: prompt management
authority: derived-hint-only
```

The historical hint is not executable authority. A future external prompt-management service would require a new source-backed human decision if it becomes materially necessary.

## 6. Versioned prompt library

Artifact:

```text
prompts/semantic-retrieval-poc.v1.json
```

Library ref/version:

```text
prompt-library.skillcertify.07.003.semantic-retrieval-v1
1.0.0
```

Owner role:

```text
human-coordinator
```

Material refs:

```text
prompt.skillcertify.07.003.query-embedding@1.0.0
prompt.skillcertify.07.003.catalog-document-embedding@1.0.0
prompt.skillcertify.07.003.grounded-result-contract@1.0.0
```

The third ref is a local deterministic behavior contract and is not sent to the provider.

## 7. Query-embedding input contract

Provider-bound content is intentionally minimal:

```text
{{query}}
```

Allowed context:

- bounded synthetic evaluation query text;
- evaluation case identifier.

Prohibited context includes:

- secrets or credentials;
- private/restricted/user data;
- unrelated repository content;
- external web knowledge;
- instructions that broaden the authorized source boundary.

No natural-language system prompt is added because the selected POC runtime is `/v1/embeddings`, not a chat/Responses runtime.

## 8. Catalog-document embedding contract

Deterministic representation:

```text
id: {{id}}
title: {{title}}
issuer: {{issuer}}
level: {{level}}
summary: {{summary}}
```

Only these five fields are allowed because they were authorized by `07.002`.

Provider-bound source identity:

```text
source.skillcertify.07.002.catalog
blob 3a95f044198c443e4ce073fecdfea62f7f8ce396
```

A source blob change requires source-boundary revalidation before another provider request.

## 9. Output contract

Output contract ref:

```text
output.skillcertify.07.003.semantic-retrieval-result-v1
```

Allowed result states:

```text
ranked_candidates | abstain
```

A ranked candidate is not automatically a supported product claim or AI-adoption decision.

Candidate records must use governed catalog IDs and:

```text
source_ref = source.skillcertify.07.002.catalog
```

No similarity/materiality threshold is invented in `07.003`.

```yaml
material_match_or_adoption_threshold: NOT_ESTABLISHED
citation_claim_semantics: NOT_ESTABLISHED_UNTIL_07_004
```

## 10. Abstention and fallback contract

Abstention is required when a material boundary is unavailable or violated, including:

- request outside bounded evaluation scope;
- authorized source absent or stale;
- source/runtime authority unavailable;
- prohibited context required;
- downstream support cannot be established.

Fallback remains:

```text
STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline
```

using the strengthened deterministic comparator:

```text
title + issuer + level + summary
```

## 11. Eval linkage

Established evaluation refs:

```text
evaluation.skillcertify.07.001.current-lexical
evaluation.skillcertify.07.001.strengthened-lexical
evaluation.skillcertify.07.001.semantic-paraphrase-poc
```

Residual semantic probes remain synthetic only:

| Query | Expected governed record |
|---|---|
| `web standards` | `cert-web-platform` |
| `strong typing` | `cert-typescript-practice` |
| `core website skills` | `cert-frontend-foundations` |

They do not establish real-user demand.

## 12. Static adversarial cases

Static eval set:

```text
evalset.skillcertify.07.003.prompt-boundary-v1
```

Cases attempt to:

- broaden source scope to internet knowledge;
- inject credentials/API keys into provider input;
- demand invented source references.

Expected contract behavior is reject/abstain.

These are static design/contract cases only and do not establish runtime prompt-injection resistance.

## 13. Deterministic tests

Artifact:

```text
tests/prompt-library.test.mjs
```

The tests protect:

- prompt version/owner/purpose/input/output metadata;
- exact authorized catalog source/blob;
- prohibited context boundaries;
- explicit abstention and no-AI fallback;
- adversarial cases;
- approved repo-native/no-external-manager disposition;
- candidate grounding status without runtime claims.

No provider API call is made by these tests.

## 14. Secret and public-repository boundary

Committed artifacts contain only public-safe behavioral/configuration metadata.

They must not contain:

- API key values;
- environment values;
- private prompts or restricted source text;
- user data;
- raw external payload logs;
- private provider/account metadata.

## 15. Hard-stop evaluation

```yaml
prompt_without_version_or_owner: false
output_contract_missing: false
prompt_contains_prohibited_data: false
critical_prompt_only_in_loose_chat: false
unauthorized_source_promoted: false
fallback_or_abstention_missing: false
behavior_without_eval_link: false
external_prompt_tool_selected_without_authority: false
runtime_grounding_claimed_without_evidence: false
citation_correctness_claimed_without_evidence: false
secret_or_pii_in_prompt_artifact: false
human_review_missing_for_completion: false
```

No `07.003` design/tooling hard stop remains after the explicit human review. Runtime grounding obligations are intentionally downstream.

## 16. Known limitations

1. No external embedding request has been executed by this task.
2. No grounded response exists yet.
3. Citation-support behavior is not yet validated.
4. Runtime abstention behavior is not yet observed.
5. Runtime prompt-injection resistance is not yet observed.
6. No similarity/materiality threshold has been established.
7. Real-user demand for semantic search remains not established.
8. AI value and AI requirement remain not established.
9. Repo-native source control is approved for `07.003`; no external prompt manager is selected.
10. Production AI remains unauthorized.

## 17. Handoff to 07.004

`07.003` may hand forward:

- prompt library ref/version;
- immutable source/data/runtime refs;
- query/document serialization contracts;
- output schema;
- abstention/fallback contract;
- deterministic tests;
- adversarial/static cases;
- human tooling decision ref;
- known limitations.

It does not hand forward:

- grounded-response evidence;
- citation validation;
- runtime injection PASS;
- production approval;
- AI-required decision;
- G-P7 PASS.

Current disposition:

```text
VERSIONED_REPO_NATIVE_PROMPT_LIBRARY_MATERIALIZED /
HUMAN_TOOLING_REVIEW_COMPLETE /
NO_EXTERNAL_PROMPT_MANAGER_SELECTED /
STATIC_SCHEMA_AND_ADVERSARIAL_CONTRACT_ESTABLISHED /
RUNTIME_GROUNDING_NOT_PERFORMED /
STATUS_CANDIDATE
```
