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
status: candidate
human_reviewed: true
provider_selected: false
model_selected: false
cloud_selected: false
external_ai_call_authorized: false
external_upload_or_indexing_authorized: false
production_ai_authorized: false
gp7_performed: false
```

## 1. Purpose

This record materializes the governed source/data/cloud boundary for `task.skillcertify.07.002` after explicit human source authorization.

The human coordinator selected:

```text
07.002 source authorization: AUTHORIZE catalog-only
```

This authorizes only the exact synthetic catalog source identified below as candidate input for a future bounded semantic POC. It does not authorize provider/model/cloud selection, external calls, upload/indexing, production AI, restricted/private data, or G-P7.

The governing question remains:

> Can the intended sources, data, and runtime be used with sufficient authority, privacy, freshness, and reversibility?

The current answer remains `candidate`, not `ready`, because provider/runtime and provider-selection authority are not yet established.

## 2. Canonical contract binding

The current Stage 07 control plane defines `AI Source, Data & Cloud Boundary Baseline` in:

```text
00-control/contracts/ai-source-data-cloud-baseline.schema.json
```

The required contract values are now:

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
    "freshness.skillcertify.07.002.use-case-adr"
  ],
  "allowed_data_classes": [
    "publico"
  ],
  "restricted_or_secret_data_used": false,
  "provider_runtime_ref": null,
  "provider_selection_authority_ref": null,
  "fallback_without_ai_ref": "STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline",
  "secret_values_present": false,
  "status": "candidate",
  "human_reviewed": true
}
```

The `source.*`, `freshness.*`, and `use-review.*` identifiers are operational stable identifiers created for this repository evidence record. They are not claimed to be canonical IDs recovered from the Stage 07 source package.

## 3. Evidence source revision

The inventory is bound to:

```yaml
repository: misaelalves99/skill-certify-hub
repository_visibility: public
source_revision: 9c0e3d543c9ca30d42a836a88a670c84bb243c73
source_revision_role: merged_main_after_task_skillcertify_07_001
```

This is the merge commit of PR #134. Issue #133 is closed/completed and post-merge Quality #31 (`33095853497`) succeeded on this revision.

That revision establishes source identity. The human authorization below establishes permitted source scope. Neither one establishes provider/runtime authority.

## 4. Source inventory and disposition

### 4.1 Source A — synthetic certification catalog

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
provider_runtime_authorized: false
external_runtime_use_authorized_now: false
```

Observed content consists of three synthetic certification records with bounded fields:

- `id`;
- `title`;
- `issuer`;
- `level`;
- `summary`.

The human authorization applies only to this exact blob. If the blob changes, the authorization must be revalidated before any future provider payload is assembled.

### 4.2 Source B — current search surface

```yaml
source_id: source.skillcertify.07.002.search-surface
path: app/certifications/page.tsx
role: local-behavior-and-fallback-evidence
blob_sha: 30da88f78a416619302f09f4cbd4398afa961ca7
data_class: publico
human_external_payload_authorized: false
external_payload_needed_for_bounded_poc: false
```

This source remains local-only evidence for deterministic comparison and fallback behavior. It is not promoted to `authorized_source_refs`.

### 4.3 Source C — Stage 07 use-case ADR

```yaml
source_id: source.skillcertify.07.002.use-case-adr
path: STAGE07_AI_USE_CASE_BASELINE_ADR.md
role: governance-and-evaluation-boundary
blob_sha: 5adf0b148750d7eeb0ebe44f103171c6ddafecbf
data_class: publico
human_external_payload_authorized: false
external_payload_needed_for_bounded_poc: false
```

This source remains local-only governance evidence and is not promoted to `authorized_source_refs`.

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

| Source | Origin verified | Rights/use reviewed | Data class | Version/hash known | Human source authorization | Runtime authorization | Disposition |
|---|---:|---:|---|---:|---:|---:|---|
| catalog | yes | yes, bounded human authority | publico | yes | yes | no | authorized source / external action blocked |
| search surface | yes | local-only sufficient | publico | yes | external payload not authorized | not required | local-only |
| use-case ADR | yes | local-only sufficient | publico | yes | external payload not authorized | not required | local-only |

`authorized_source_refs` therefore contains only:

```text
source.skillcertify.07.002.catalog
```

## 6. Rights, license, and use basis

### 6.1 Repository license observation

Repository search found no tracked `LICENSE` file at the baseline point.

```yaml
explicit_repository_license_file: NOT_FOUND
broad_external_reuse_license_inferred: false
```

The absence of a tracked license is not rewritten as a prohibition, nor is public visibility treated as broad external-processing permission.

### 6.2 Human bounded-use authorization

The source-use basis for the catalog is the explicit human decision recorded at:

```text
https://github.com/misaelalves99/skill-certify-hub/issues/135#issuecomment-5442710663
```

Operational use-review refs:

```yaml
use-review.skillcertify.07.002.repository-license-not-found:
  result: no tracked LICENSE file found
  consequence: do not infer broad reuse terms

use-review.skillcertify.07.002.human-catalog-authorization:
  result: AUTHORIZE catalog-only
  source_id: source.skillcertify.07.002.catalog
  blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
  scope: future bounded semantic POC input only
  provider_runtime_authorized: false
  external_action_authorized_now: false
```

## 7. Data classification

The canonical contract accepts:

```text
publico | interno
```

Current permitted source class:

```yaml
allowed_data_classes:
  - publico
```

Important boundaries:

```text
publico != provider-authorized
source-authorized != external-call-authorized
```

No `interno`, private, restricted, confidential, or secret data is required for this bounded POC candidate.

## 8. Restricted, PII, and secret boundary

The bounded candidate POC does not require:

- user accounts or profiles;
- user messages;
- private evidence links;
- credentials, tokens, API keys, or environment values;
- production logs;
- private datasets;
- restricted corpus.

Contract values remain:

```yaml
restricted_or_secret_data_used: false
secret_values_present: false
```

The validated repository baseline also keeps the config/secret guard green. This does not claim comprehensive enterprise DLP coverage.

## 9. Minimum external payload principle

If a later provider/runtime decision authorizes an external semantic POC, the maximum currently source-authorized payload is derived only from the exact authorized catalog blob.

Candidate fields:

```text
id
title
issuer
level
summary
```

Do not send:

- repository history;
- whole source tree;
- `page.tsx` source;
- ADR corpus;
- unrelated documentation;
- CI logs;
- secret/config files;
- local environment;
- user/private data.

Even the authorized catalog fields may not be transmitted until provider/runtime and external-action authority are established.

## 10. Freshness and immutable identity

### Catalog

```yaml
freshness_id: freshness.skillcertify.07.002.catalog
blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
freshness_condition: revalidate authorization when blob SHA changes before any POC rerun or provider payload
```

### Search surface

```yaml
freshness_id: freshness.skillcertify.07.002.search-surface
blob_sha: 30da88f78a416619302f09f4cbd4398afa961ca7
freshness_condition: revalidate when deterministic search behavior changes before comparison
```

### Use-case ADR

```yaml
freshness_id: freshness.skillcertify.07.002.use-case-adr
blob_sha: 5adf0b148750d7eeb0ebe44f103171c6ddafecbf
freshness_condition: revalidate if product question, non-use criteria, or human decision changes
```

## 11. Provider, model, cloud, and runtime state

No provider/runtime has been selected or reviewed yet:

```yaml
provider_runtime_ref: null
provider_selection_authority_ref: null
provider_selected: false
model_selected: false
cloud_selected: false
provider_policy_reviewed: false
region_reviewed: false
retention_reviewed: false
training_use_reviewed: false
authentication_iam_reviewed: false
deletion_export_reviewed: false
cost_reviewed: false
```

These are unresolved/not-yet-applicable states, not provider failures.

## 12. External action boundary

The human source authorization does not authorize transmission.

Current state:

```yaml
external_ai_call_authorized: false
external_upload_or_indexing_authorized: false
external_embedding_generation_authorized: false
external_vector_store_authorized: false
external_raw_payload_logging_authorized: false
production_ai_authorized: false
```

No external action has been performed or authorized by `07.002 source authorization: AUTHORIZE catalog-only`.

## 13. No-AI fallback

Fallback reference:

```text
STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline
```

The strengthened deterministic comparator remains:

```text
title + issuer + level + summary
```

Reversibility remains intact:

```text
provider/runtime not authorized OR semantic POC fails
→ retain deterministic no-AI comparator/behavior
→ no production AI dependency
```

## 14. Allowed and prohibited use matrix

| Material | Local inspection | Local deterministic comparison | External AI payload now | Future bounded external POC | Production use |
|---|---:|---:|---:|---:|---:|
| exact synthetic catalog blob | allowed | allowed | prohibited now | source-authorized; still requires provider/runtime authority | not authorized |
| search surface source | allowed | allowed | prohibited | not required | not authorized as AI payload |
| 07.001 ADR | allowed | governance reference | prohibited | not required | not authorized as AI payload |
| user/private/restricted data | not required | not required | prohibited | not authorized | not authorized |
| secrets/credentials | policy-only handling | not required | prohibited | prohibited as payload | prohibited as payload |

## 15. Revalidation triggers

Revalidate this boundary when any of the following changes:

1. `app/certifications/catalog.ts` blob SHA changes;
2. catalog fields or data class changes;
3. catalog becomes live/official/external rather than synthetic repository content;
4. `app/certifications/page.tsx` search behavior changes materially;
5. the `07.001` product question or human decision changes;
6. a provider/model/runtime becomes a material candidate;
7. provider retention/training/region policy becomes relevant;
8. credentials or environment configuration are introduced;
9. logs/traces would contain raw payload;
10. PII/internal/restricted/secret data is proposed;
11. human source authorization is withdrawn or narrowed.

## 16. Hard-stop evaluation

```yaml
source_discovered_treated_as_authorized: false
rights_or_license_fabricated: false
restricted_or_secret_data_required: false
secret_value_detected_in_candidate_payload: false
provider_selected_without_authority: false
raw_payload_logging_planned: false
stale_source_without_revalidation_rule: false
external_action_started_before_classification: false
human_source_authorization_missing: false
provider_runtime_ref_missing: true
provider_selection_authority_ref_missing: true
human_reviewed: true
```

The source-authorization hard stop has been resolved for the exact catalog blob only.

The remaining material stops to `ready` are provider/runtime identity and provider-selection authority.

## 17. Human authority semantics

Recorded human source decision:

```text
07.002 source authorization: AUTHORIZE catalog-only
```

Authority semantics:

```yaml
decision_authority: HUMAN
ai_decision_authority: NONE
human_reviewed: true
authorized_source_refs:
  - source.skillcertify.07.002.catalog
provider_authority: NONE
external_action_authority: NONE
```

AI/tooling may preserve and evaluate this boundary, but it may not reinterpret source authorization as provider or runtime authorization.

## 18. Current handoff state

```yaml
baseline_id: baseline.skillcertify.07.002.source-data-cloud-v1
status: candidate
human_reviewed: true
authorized_source_refs:
  - source.skillcertify.07.002.catalog
allowed_data_classes:
  - publico
restricted_or_secret_data_used: false
provider_runtime_ref: null
provider_selection_authority_ref: null
fallback_without_ai_ref: STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline
secret_values_present: false
external_ai_call_authorized: false
external_upload_or_indexing_authorized: false
production_ai_authorized: false
gp7: NOT_PERFORMED
```

Current disposition:

```text
CATALOG_SOURCE_AUTHORIZED / PROVIDER_RUNTIME_UNSELECTED / EXTERNAL_ACTION_BLOCKED / STATUS_CANDIDATE
```

This is the correct intermediate state before a separately governed provider/runtime review.