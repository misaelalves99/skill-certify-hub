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
status: candidate
human_reviewed: false
repo_native_prompt_library: true
external_prompt_manager_selected: false
external_api_call_performed: false
ai_required: false
production_ai_authorized: false
gp7_performed: false
```

## 1. Purpose

This record materializes the first versioned behavioral contract for the bounded Stage 07 semantic-retrieval POC.

The artifact is deliberately repository-native. It treats prompt/context behavior as source-controlled configuration and does not require Langfuse or another external prompt-management service to establish the baseline.

This task does not execute the OpenAI API. It does not claim grounded runtime behavior, citation integrity, semantic quality, adoption value, or G-P7 PASS.

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

The schema requires:

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
  "human_reviewed": false
}
```

`unsupported_claims_open: 0` means there are no grounded runtime responses in this task from which unsupported claims are currently open. It is **not** a quality PASS and is not evidence of citation correctness.

## 3. Why status is candidate

The canonical schema permits `ready` only when all of the following are established:

- at least one grounded response ref;
- citation validation ref;
- abstention/no-source evidence ref;
- prompt-injection test ref;
- `unsupported_claims_open = 0`;
- `human_reviewed = true`.

`07.003` establishes the versioned design/configuration layer only.

Current downstream evidence state:

```yaml
grounded_response_refs: []
citation_validation_ref: null
runtime_abstention_evidence: NOT_ESTABLISHED
runtime_prompt_injection_evidence: NOT_ESTABLISHED
human_reviewed: false
```

Therefore:

```text
status: candidate
```

is the correct state. `task.skillcertify.07.004` is the canonical downstream implementation task that may produce the missing grounded-runtime evidence.

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

## 5. Tool-selection disposition

Historical Stage 07 hint:

```yaml
legacy_recommendation: Langfuse
legacy_role: prompt management
authority: derived-hint-only
selection_required_at_execution: true
```

Observed repository state at task entry:

- no Langfuse dependency;
- no prompt-management runtime/configuration;
- no OpenAI SDK dependency;
- no existing prompt library;
- no need for external synchronization to create versioned prompt contracts.

Current disposition:

```yaml
tool_selection_mode: repo-native-source-control
external_prompt_manager: null
external_tool_selected: false
selection_status: candidate_pending_human_review
```

This is a repository-native candidate, not an adoption decision for or against Langfuse.

A future external prompt-management service requires a separate source-backed selection decision under the shared tool-selection contract if it becomes materially necessary.

## 6. Versioned prompt library

Artifact:

```text
prompts/semantic-retrieval-poc.v1.json
```

Library ref:

```text
prompt-library.skillcertify.07.003.semantic-retrieval-v1
```

Version:

```text
1.0.0
```

Owner role:

```text
human-coordinator
```

Material prompt/version refs:

```text
prompt.skillcertify.07.003.query-embedding@1.0.0
prompt.skillcertify.07.003.catalog-document-embedding@1.0.0
prompt.skillcertify.07.003.grounded-result-contract@1.0.0
```

The third ref is a local deterministic behavior contract and is not sent to the provider.

## 7. Query-embedding input contract

Purpose:

> serialize one bounded synthetic evaluation query without adding external knowledge or instruction prose.

Provider-bound content is intentionally minimal:

```text
{{query}}
```

Allowed context:

- bounded synthetic evaluation query text;
- evaluation case identifier.

Prohibited context includes:

- credentials/secrets;
- private/restricted/user data;
- unrelated repository content;
- external web knowledge;
- instructions that broaden the authorized source boundary.

No natural-language system prompt is added because the selected POC runtime is `/v1/embeddings`, not a chat/Responses runtime.

## 8. Catalog-document embedding contract

The deterministic representation is:

```text
id: {{id}}
title: {{title}}
issuer: {{issuer}}
level: {{level}}
summary: {{summary}}
```

Only these five fields are allowed because they are the fields authorized by `07.002`.

The document contract is tied to:

```text
source.skillcertify.07.002.catalog
blob 3a95f044198c443e4ce073fecdfea62f7f8ce396
```

If the source blob changes, the provider payload must stop until source authorization is revalidated.

## 9. Output contract

Output contract ref:

```text
output.skillcertify.07.003.semantic-retrieval-result-v1
```

The local POC result state is limited to:

```text
ranked_candidates | abstain
```

A ranked candidate is not automatically a product answer, supported claim, or adoption decision.

Candidate records must use governed catalog ids and:

```text
source_ref = source.skillcertify.07.002.catalog
```

No material similarity threshold is invented in `07.003`.

Current threshold state:

```yaml
material_match_or_adoption_threshold: NOT_ESTABLISHED
citation_claim_semantics: NOT_ESTABLISHED_UNTIL_07_004
```

## 10. Abstention and fallback contract

Abstention is required when any material boundary is not satisfied, including:

- request outside the bounded evaluation scope;
- authorized source absent or stale;
- source/runtime authority unavailable;
- prohibited context would be required;
- downstream support cannot be established.

Allowed reason codes are versioned in the library.

Fallback remains:

```text
STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline
```

using the strengthened deterministic comparator:

```text
title + issuer + level + summary
```

## 11. Eval linkage

The library links to established Stage 07 evaluation refs:

```text
evaluation.skillcertify.07.001.current-lexical
evaluation.skillcertify.07.001.strengthened-lexical
evaluation.skillcertify.07.001.semantic-paraphrase-poc
```

Residual semantic probes:

| Query | Expected governed record |
|---|---|
| `web standards` | `cert-web-platform` |
| `strong typing` | `cert-typescript-practice` |
| `core website skills` | `cert-frontend-foundations` |

These remain synthetic probes, not evidence of real-user demand.

## 12. Static adversarial cases

The prompt library includes a static eval set:

```text
evalset.skillcertify.07.003.prompt-boundary-v1
```

It includes cases that attempt to:

- broaden source scope to internet knowledge;
- inject credentials/API keys into provider input;
- demand invented source references.

Expected contract behavior is reject/abstain.

These are **design/static contract cases only**. They do not establish runtime prompt-injection resistance because no provider/runtime execution is performed in `07.003`.

## 13. Deterministic tests

Artifact:

```text
tests/prompt-library.test.mjs
```

The tests verify:

- every material prompt has version, owner, purpose, input contract, allowed/prohibited context, output ref, abstention/fallback rule, eval linkage, limitations and change rationale;
- only the authorized catalog source/blob is provider-bound;
- prohibited source/context categories remain excluded;
- the output contract preserves explicit abstention and no-AI fallback;
- adversarial cases are versioned and expected to reject/abstain;
- the Stage 07 baseline remains `candidate` and does not claim runtime grounding.

No provider API call is made by these tests.

## 14. Secret and public-repository boundary

The task source class is `interno`, while this repository is public.

Therefore committed artifacts contain only public-safe behavioral/configuration metadata.

They must not contain:

- API key values;
- environment values;
- private prompts or restricted source text;
- user data;
- raw external payload logs;
- private provider/account metadata.

The prompt library references source ids/hashes and allowed field names rather than embedding private material.

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
human_review_missing_for_completion: true
```

The remaining human-review stop is intentional at candidate materialization.

## 16. Known limitations

1. No external embedding request has been executed by this task.
2. No grounded response exists yet.
3. Citation-support behavior is not yet validated.
4. Runtime abstention behavior is not yet observed.
5. Runtime prompt-injection resistance is not yet observed.
6. No similarity/materiality threshold has been established.
7. Real-user demand for semantic search remains not established.
8. AI value and AI requirement remain not established.
9. No external prompt-management tool is selected.
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
STATIC_SCHEMA_AND_ADVERSARIAL_CONTRACT_ESTABLISHED /
RUNTIME_GROUNDING_NOT_PERFORMED /
HUMAN_REVIEW_PENDING /
STATUS_CANDIDATE
```
