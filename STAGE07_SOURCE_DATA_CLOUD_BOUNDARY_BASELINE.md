# Stage 07 — AI Source, Data & Cloud Boundary Baseline

## Baseline metadata

```yaml
record_type: source-data-cloud-boundary-baseline
stage_id: stage.skillcertify.07
task_id: task.skillcertify.07.002
task_title: Inventariar fontes e classificar dados
workstream_id: workstream.skillcertify.07.02
workstream_title: Source, Data & Cloud Boundaries
source_stage_manifest_version: "1.7.0"
source_repository_revision: 9c0e3d543c9ca30d42a836a88a670c84bb243c73
issue_ref: https://github.com/misaelalves99/skill-certify-hub/issues/135
human_source_authorization_ref: https://github.com/misaelalves99/skill-certify-hub/issues/135#issuecomment-5442710663
human_provider_runtime_authorization_ref: https://github.com/misaelalves99/skill-certify-hub/issues/135#issuecomment-5442945796
status: ready
human_reviewed: true
ai_required: false
provider_selected: true
model_selected: true
cloud_selected: false
external_ai_call_authorized: true
external_embedding_generation_authorized: true
external_upload_or_indexing_authorized: false
production_ai_authorized: false
gp7_performed: false
```

## 1. Purpose and decision boundary

This record materializes the final source/data/provider-runtime boundary for `task.skillcertify.07.002`.

Two explicit human decisions govern this record:

```text
07.002 source authorization: AUTHORIZE catalog-only
07.002 provider/runtime authorization: AUTHORIZE OpenAI embeddings POC-only
```

These decisions authorize only a bounded comparative semantic-retrieval POC.

They do **not** establish that AI is required, do not authorize production AI, do not authorize a general chatbot/RAG system, do not authorize Files/File Search/vector stores, and do not pass G-P7.

`status: ready` means only that the canonical `07.002` source/data/runtime contract has enough authority to hand a bounded POC boundary forward.

## 2. Canonical contract binding

The Stage 07 control plane defines `AI Source, Data & Cloud Boundary Baseline` in:

```text
00-control/contracts/ai-source-data-cloud-baseline.schema.json
```

The required values are:

```json
{
  "baseline_id": "baseline.skillcertify.07.002.source-data-cloud-v1",
  "stage_id": "stage.skillcertify.07",
  "source_refs": [
    "source.skillcertify.07.002.catalog",
    "source.skillcertify.07.002.search-surface",
    "source.skillcertify.07.002.use-case-adr"
  ],
  "authorized_source_refs": [
    "source.skillcertify.07.002.catalog"
  ],
  "license_or_use_refs": [
    "use-review.skillcertify.07.002.repository-license-not-found",
    "use-review.skillcertify.07.002.human-catalog-authorization"
  ],
  "freshness_refs": [
    "freshness.skillcertify.07.002.catalog",
    "freshness.skillcertify.07.002.search-surface",
    "freshness.skillcertify.07.002.use-case-adr",
    "freshness.skillcertify.07.002.openai-provider-policy"
  ],
  "allowed_data_classes": [
    "publico"
  ],
  "restricted_or_secret_data_used": false,
  "provider_runtime_ref": "provider-runtime.skillcertify.07.002.openai-embeddings-poc-v1",
  "provider_selection_authority_ref": "https://github.com/misaelalves99/skill-certify-hub/issues/135#issuecomment-5442945796",
  "fallback_without_ai_ref": "STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline",
  "secret_values_present": false,
  "status": "ready",
  "human_reviewed": true
}
```

The `source.*`, `freshness.*`, `use-review.*`, and `provider-runtime.*` identifiers are operational stable identifiers for repository evidence. They are not claimed to be canonical IDs recovered from the Stage 07 source package.

## 3. Evidence source revision

```yaml
repository: misaelalves99/skill-certify-hub
repository_visibility: public
source_revision: 9c0e3d543c9ca30d42a836a88a670c84bb243c73
source_revision_role: merged_main_after_task_skillcertify_07_001
```

The source revision is the merge commit of PR #134. It establishes the immutable repository state from which the source hashes below were collected.

## 4. Source inventory and disposition

### 4.1 Authorized source — synthetic certification catalog

```yaml
source_id: source.skillcertify.07.002.catalog
path: app/certifications/catalog.ts
role: bounded-semantic-poc-content
origin: repository-controlled-file
repository_visibility: public
blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
last_change_commit: bbf254109bfb70fa29115dfa02ee79052787d137
last_change_time: 2026-08-23T19:03:25-03:00
data_class: publico
contains_live_official_certification_data: false
contains_synthetic_records: true
contains_observed_restricted_or_secret_data: false
human_source_authorized: true
human_source_authorization_ref: https://github.com/misaelalves99/skill-certify-hub/issues/135#issuecomment-5442710663
provider_runtime_authorized: true
external_runtime_use_authorized_for_poc: true
production_use_authorized: false
```

Authorized fields are limited to:

```text
id
title
issuer
level
summary
```

The authorization is bound to the exact blob SHA above. A blob change requires revalidation before another external POC call.

### 4.2 Local-only source — current search surface

```yaml
source_id: source.skillcertify.07.002.search-surface
path: app/certifications/page.tsx
role: local-behavior-and-fallback-evidence
blob_sha: 30da88f78a416619302f09f4cbd4398afa961ca7
data_class: publico
external_payload_authorized: false
external_payload_needed: false
```

This remains local-only comparator/fallback evidence and is not an authorized external payload.

### 4.3 Local-only source — Stage 07 use-case ADR

```yaml
source_id: source.skillcertify.07.002.use-case-adr
path: STAGE07_AI_USE_CASE_BASELINE_ADR.md
role: governance-and-evaluation-boundary
blob_sha: 5adf0b148750d7eeb0ebe44f103171c6ddafecbf
data_class: publico
external_payload_authorized: false
external_payload_needed: false
```

This remains local-only governance evidence and is not an authorized external payload.

## 5. Source lifecycle state

Canonical lifecycle:

```text
discovered
→ origin verified
→ rights/license reviewed
→ data class assigned
→ allowed use defined
→ version/freshness known
→ runtime authorization
→ use
→ review/remove
```

Current state:

| Source | Origin | Rights/use | Class | Hash known | Human source authority | Runtime authority | Disposition |
|---|---:|---:|---|---:|---:|---:|---|
| catalog | verified | bounded human authority | publico | yes | yes | POC-only | authorized POC source |
| search surface | verified | local-only | publico | yes | external payload not authorized | not required | local-only |
| use-case ADR | verified | local-only | publico | yes | external payload not authorized | not required | local-only |

`authorized_source_refs` contains only:

```text
source.skillcertify.07.002.catalog
```

## 6. Rights, license, and use basis

Repository search found no tracked `LICENSE` file at the baseline point.

```yaml
explicit_repository_license_file: NOT_FOUND
broad_external_reuse_license_inferred: false
```

Public visibility is not treated as broad external-processing permission.

The bounded use basis is the explicit human source authorization:

```yaml
use-review.skillcertify.07.002.human-catalog-authorization:
  decision: AUTHORIZE catalog-only
  source_id: source.skillcertify.07.002.catalog
  blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
  scope: bounded semantic POC input only
  authority_ref: https://github.com/misaelalves99/skill-certify-hub/issues/135#issuecomment-5442710663
```

## 7. Data classification and secret boundary

```yaml
allowed_data_classes:
  - publico
restricted_or_secret_data_used: false
secret_values_present: false
```

No `interno`, private, confidential, restricted, personal, or secret data is required for this POC.

The authorized payload must not contain:

- API keys or tokens;
- environment values;
- user accounts/profiles/messages;
- private evidence links;
- production logs;
- repository history;
- unrelated source files or documentation.

## 8. Provider/runtime identity

Operational provider runtime:

```yaml
provider_runtime_ref: provider-runtime.skillcertify.07.002.openai-embeddings-poc-v1
provider: OpenAI API
endpoint: /v1/embeddings
model: text-embedding-3-small
purpose: bounded semantic retrieval comparison
runtime_scope: POC_ONLY
provider_selected: true
model_selected: true
cloud_selected: false
production_runtime_selected: false
```

`cloud_selected: false` means this task does not select a deployment cloud, hosting platform, database, vector database, or production environment. It authorizes only the hosted OpenAI API endpoint as the external POC runtime.

## 9. Provider policy review — 2026-08-27

Official review refs:

```text
https://developers.openai.com/api/docs/guides/your-data
https://developers.openai.com/api/docs/models/text-embedding-3-small
https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
```

Observed official provider facts at review time:

```yaml
provider_policy_reviewed: true
provider_policy_review_date: 2026-08-27
endpoint: /v1/embeddings
data_used_for_training: false
abuse_monitoring_retention: up_to_30_days
application_state_retention: none
zero_data_retention_eligible: true
zero_data_retention_configured_for_this_account: NOT_ESTABLISHED
data_residency_configured_for_this_account: NOT_ESTABLISHED
model: text-embedding-3-small
model_role: embedding-model
listed_input_price_per_1m_tokens_usd: 0.02
actual_poc_cost: NOT_MEASURED
```

The provider documentation states that `/v1/embeddings` is not used for training, has 30-day abuse-monitoring retention under the documented default controls, no application-state retention, and is ZDR-eligible. Eligibility is not treated as proof that ZDR is configured for this account/project.

The model documentation describes embeddings as numerical text representations useful for measuring relatedness and search, matching the bounded retrieval question.

Pricing is recorded only as the provider's current listed unit price. It is not evidence of actual POC cost; actual usage/cost belongs to later measured evidence.

## 10. Authentication and API-key boundary

OpenAI API authentication requires a secret API key or equivalent authorized project credential.

For this repository:

```yaml
api_key_value_present_in_repo: false
api_key_value_requested_in_issue_or_docs: false
client_side_key_use_authorized: false
committed_key_use_authorized: false
secure_environment_or_secret_handling_required: true
```

The provider guidance explicitly warns against browser/client exposure and repository commits and recommends environment-variable or secret-management handling.

The existing Stage 06 config/secret guard remains applicable. No secret value may be pasted into GitHub issues, PRs, ADRs, logs, prompts, or tracked files.

## 11. External action boundary

The human provider/runtime authorization permits only bounded embedding requests needed to execute the comparative POC.

```yaml
external_ai_call_authorized: true
external_embedding_generation_authorized: true
external_file_upload_authorized: false
external_upload_or_indexing_authorized: false
external_vector_store_authorized: false
external_file_search_authorized: false
external_responses_or_chat_runtime_authorized: false
external_raw_payload_logging_authorized: false
production_ai_authorized: false
```

Important semantic distinction:

```text
AUTHORIZED:
transient request body to POST /v1/embeddings containing only the authorized synthetic catalog/probe text

NOT AUTHORIZED:
Files API upload, File Search, vector-store indexing, persistent external corpus, raw payload logging, general chat/Responses use, production integration
```

No external API call is claimed to have been executed by this document.

## 12. POC payload minimization

The maximum authorized catalog payload is derived from the exact authorized blob and only these fields:

```text
id
title
issuer
level
summary
```

The POC may also send the bounded synthetic evaluation probe text required to generate query embeddings.

Do not send the whole repository, `page.tsx`, the Stage 07 ADR, CI logs, credentials, environment state, user/private data, or unrelated documentation.

## 13. No-AI fallback and reversibility

Fallback reference:

```text
STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline
```

The strengthened deterministic comparator remains:

```text
title + issuer + level + summary
```

Reversibility rule:

```text
provider unavailable
OR credential unavailable
OR policy changes materially
OR source authorization becomes stale/withdrawn
OR POC produces insufficient or unsafe gain
→ stop external semantic path
→ retain deterministic no-AI comparator
→ no production AI dependency
```

## 14. Allowed/prohibited matrix

| Material/action | Local use | OpenAI embeddings POC | Persistent external indexing | Production |
|---|---:|---:|---:|---:|
| exact authorized catalog blob | allowed | allowed | prohibited | not authorized |
| synthetic evaluation probes | allowed | allowed | prohibited | not authorized |
| search surface source | allowed | prohibited payload | prohibited | not authorized |
| 07.001 ADR | governance-only | prohibited payload | prohibited | not authorized |
| private/internal/restricted data | not required | prohibited | prohibited | not authorized |
| API key | secure local/runtime secret only | authentication only, never payload | n/a | production not authorized |
| Files/File Search/vector store | not required | prohibited | prohibited | not authorized |
| raw payload logging | not required | prohibited | prohibited | prohibited |

## 15. Freshness and revalidation

### Source freshness

```yaml
freshness.skillcertify.07.002.catalog:
  blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
  revalidate_when: blob changes before POC request

freshness.skillcertify.07.002.search-surface:
  blob_sha: 30da88f78a416619302f09f4cbd4398afa961ca7
  revalidate_when: deterministic comparator behavior changes

freshness.skillcertify.07.002.use-case-adr:
  blob_sha: 5adf0b148750d7eeb0ebe44f103171c6ddafecbf
  revalidate_when: product question, non-use criteria, or human decision changes
```

### Provider freshness

```yaml
freshness.skillcertify.07.002.openai-provider-policy:
  reviewed_on: 2026-08-27
  revalidate_when:
    - /v1/embeddings retention/training policy changes
    - text-embedding-3-small availability or pricing changes materially
    - authentication policy changes
    - data class expands beyond publico
    - ZDR/data-residency becomes a requirement
    - provider/model changes
```

The scheduled policy monitor may detect changes, but detected changes must still be reviewed before this evidence is updated.

## 16. Hard-stop evaluation

```yaml
source_discovered_treated_as_authorized: false
rights_or_license_fabricated: false
human_source_authorization_missing: false
restricted_or_secret_data_required: false
secret_value_detected_in_payload: false
provider_selected_without_authority: false
provider_runtime_ref_missing: false
provider_selection_authority_ref_missing: false
provider_policy_unreviewed: false
raw_payload_logging_planned: false
persistent_external_indexing_planned: false
fallback_missing: false
human_reviewed: true
```

No current `07.002` hard stop prevents the bounded embeddings POC from being handed forward.

This does not remove downstream Stage 07 obligations for prompt/grounding, evaluation, safety, observability, cost evidence, fallback behavior, or G-P7.

## 17. Human authority semantics

Source authority:

```yaml
decision: AUTHORIZE catalog-only
authority: HUMAN
ref: https://github.com/misaelalves99/skill-certify-hub/issues/135#issuecomment-5442710663
```

Provider/runtime authority:

```yaml
decision: AUTHORIZE OpenAI embeddings POC-only
authority: HUMAN
ref: https://github.com/misaelalves99/skill-certify-hub/issues/135#issuecomment-5442945796
```

AI/tooling did not choose either authorization.

Neither decision constitutes broad residual-risk acceptance, AI adoption, production approval, or G-P7 PASS.

## 18. Ready semantics and handoff

The canonical contract allows `status: ready` because all required readiness predicates for this task are now established:

```yaml
at_least_one_authorized_source: true
provider_runtime_identified: true
provider_selection_authority_identified: true
human_reviewed: true
restricted_or_secret_data_used: false
secret_values_present: false
fallback_without_ai_present: true
```

Current handoff state:

```yaml
baseline_id: baseline.skillcertify.07.002.source-data-cloud-v1
status: ready
human_reviewed: true
authorized_source_refs:
  - source.skillcertify.07.002.catalog
allowed_data_classes:
  - publico
restricted_or_secret_data_used: false
provider_runtime_ref: provider-runtime.skillcertify.07.002.openai-embeddings-poc-v1
provider_selection_authority_ref: https://github.com/misaelalves99/skill-certify-hub/issues/135#issuecomment-5442945796
fallback_without_ai_ref: STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline
secret_values_present: false
external_ai_call_authorized: true
external_embedding_generation_authorized: true
external_upload_or_indexing_authorized: false
production_ai_authorized: false
ai_required: false
gp7: NOT_PERFORMED
```

Final disposition:

```text
CATALOG_SOURCE_AUTHORIZED / OPENAI_EMBEDDINGS_POC_RUNTIME_AUTHORIZED / STATUS_READY_FOR_BOUNDED_POC_ONLY / PRODUCTION_BLOCKED / AI_REQUIRED_NOT_ESTABLISHED / GP7_NOT_PERFORMED
```
