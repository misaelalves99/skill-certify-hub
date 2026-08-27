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
status: candidate
human_reviewed: false
provider_selected: false
model_selected: false
cloud_selected: false
external_ai_call_authorized: false
external_upload_or_indexing_authorized: false
production_ai_authorized: false
gp7_performed: false
```

## 1. Purpose

This record materializes the candidate source/data/cloud boundary for `task.skillcertify.07.002`.

It is intentionally conservative.

The task is not allowed to convert repository presence, public visibility, administrative control, or the previous `07.001 decision: evaluate` into source authorization, provider approval, external upload permission, or production AI authority.

The governing question is:

> Can the intended sources, data, and runtime be used with sufficient authority, privacy, freshness, and reversibility?

At this materialization point, the answer is not yet `ready` because human source authorization and provider/runtime authority are not established.

## 2. Canonical contract binding

The current Stage 07 control plane defines `AI Source, Data & Cloud Boundary Baseline` in:

```text
00-control/contracts/ai-source-data-cloud-baseline.schema.json
```

The required contract values are materialized as follows:

```json
{
  "baseline_id": "baseline.skillcertify.07.002.source-data-cloud-v1",
  "stage_id": "stage.skillcertify.07",
  "source_refs": [
    "source.skillcertify.07.002.catalog",
    "source.skillcertify.07.002.search-surface",
    "source.skillcertify.07.002.use-case-adr"
  ],
  "authorized_source_refs": [],
  "license_or_use_refs": [
    "use-review.skillcertify.07.002.repository-license-not-found",
    "use-review.skillcertify.07.002.human-source-authorization-required"
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
  "human_reviewed": false
}
```

The `source.*`, `freshness.*`, and `use-review.*` identifiers above are operational stable identifiers created for this repository evidence record. They are not claimed to be canonical IDs recovered from the Stage 07 source package.

## 3. Evidence source revision

The candidate inventory is bound to:

```yaml
repository: misaelalves99/skill-certify-hub
repository_visibility: public
source_revision: 9c0e3d543c9ca30d42a836a88a670c84bb243c73
source_revision_role: merged_main_after_task_skillcertify_07_001
```

The source revision is the merge commit of PR #134.

Issue #133 is closed/completed and post-merge Quality #31 (`33095853497`) succeeded on this revision.

This establishes the repository state used to discover and hash the candidate sources. It does not itself authorize external processing.

## 4. Candidate source inventory

### 4.1 Source A — synthetic certification catalog

```yaml
source_id: source.skillcertify.07.002.catalog
path: app/certifications/catalog.ts
role: candidate-semantic-poc-content
origin: repository-controlled-file
repository_visibility: public
blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
last_change_commit: bbf254109bfb70fa29115dfa02ee79052787d137
last_change_time: 2026-08-23T19:03:25-03:00
data_class: publico
contains_live_official_certification_data: false
contains_synthetic_records: true
contains_observed_restricted_or_secret_data: false
external_runtime_use_authorized: false
```

Observed content consists of three synthetic certification records with bounded fields:

- `id`;
- `title`;
- `issuer`;
- `level`;
- `summary`.

The catalog explicitly describes its records as synthetic concepts. The current product UI also describes the dataset as synthetic and not live/official.

This is the only candidate source whose content could plausibly be required as semantic POC input.

Even so, repository visibility is not equivalent to permission to send the content to an external AI provider. Human authorization remains required.

### 4.2 Source B — current search surface

```yaml
source_id: source.skillcertify.07.002.search-surface
path: app/certifications/page.tsx
role: local-behavior-and-fallback-evidence
origin: repository-controlled-file
repository_visibility: public
blob_sha: 30da88f78a416619302f09f4cbd4398afa961ca7
last_change_commit: b70d9013fb421175012a1757992892bcf641f1b9
last_change_time: 2026-08-24T08:57:21-03:00
data_class: publico
contains_observed_restricted_or_secret_data: false
external_runtime_use_authorized: false
external_payload_needed_for_bounded_poc: false
```

This file establishes the current deterministic search behavior:

```text
title + issuer + level
```

It is evidence for comparison and fallback behavior.

It does not need to be sent to an external AI runtime for the bounded semantic POC.

Preferred treatment:

```text
LOCAL-ONLY GOVERNANCE/COMPARATOR SOURCE
```

### 4.3 Source C — Stage 07 use-case ADR

```yaml
source_id: source.skillcertify.07.002.use-case-adr
path: STAGE07_AI_USE_CASE_BASELINE_ADR.md
role: governance-and-evaluation-boundary
origin: repository-controlled-file
repository_visibility: public
blob_sha: 5adf0b148750d7eeb0ebe44f103171c6ddafecbf
last_change_commit: 8c21caa460b7238cec4cb56c98713cd205376071
last_change_time: 2026-08-27T13:48:18-03:00
data_class: publico
contains_observed_restricted_or_secret_data: false
external_runtime_use_authorized: false
external_payload_needed_for_bounded_poc: false
```

This ADR provides:

- product question;
- strengthened no-AI comparator;
- residual semantic probes;
- non-use criteria;
- human `evaluate` decision;
- explicit `ai_required: false` state.

It is governance evidence and does not need to be uploaded as POC corpus.

Preferred treatment:

```text
LOCAL-ONLY GOVERNANCE SOURCE
```

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

Current state per source:

| Source | Discovered | Origin verified | Rights/use reviewed | Data class | Version/hash known | Runtime authorization | Current disposition |
|---|---|---|---|---|---|---|---|
| catalog | yes | yes | pending human authority | publico | yes | no | candidate |
| search surface | yes | yes | local-only use basis sufficient for repository analysis; external use not required | publico | yes | not required yet | local-only candidate |
| use-case ADR | yes | yes | local-only governance use; external use not required | publico | yes | not required yet | local-only candidate |

No source is promoted to `authorized_source_refs` in this candidate record.

## 6. Rights, license, and use basis

### 6.1 Repository license observation

A repository code search for `LICENSE` returned no matching tracked license file at this baseline point.

Therefore:

```yaml
explicit_repository_license_file: NOT_FOUND
external_reuse_license_inferred: false
```

This does not mean use is prohibited in every context.

It means this task will not fabricate a license or infer external processing permission from public visibility.

### 6.2 Repository control observation

The linked GitHub account has administrative repository permissions and the repository is public.

Administrative control is operational evidence of repository control, but it is not treated as universal copyright/license provenance for every possible external use.

Therefore human authorization remains the required authority for the bounded candidate source use.

### 6.3 Use-review refs

```yaml
use-review.skillcertify.07.002.repository-license-not-found:
  result: no tracked LICENSE file found
  consequence: do not infer broad external reuse license

use-review.skillcertify.07.002.human-source-authorization-required:
  result: pending
  consequence: catalog cannot enter authorized_source_refs until explicit human authorization
```

## 7. Data classification

The canonical contract accepts:

```text
publico | interno
```

The current candidate sources are versioned in a public GitHub repository and contain synthetic product/test content.

For this bounded record they are classified:

```yaml
allowed_data_classes:
  - publico
```

Important semantic boundary:

```text
publico != externally authorized
```

Public data still requires origin/rights/use review under the Stage 07 source lifecycle.

No `interno` content is required for the current candidate POC.

## 8. Restricted, confidential, PII, and secret boundary

The candidate semantic POC does not require:

- user accounts;
- user messages;
- personal profiles;
- private evidence links;
- authentication data;
- credentials;
- tokens;
- API keys;
- environment values;
- production logs;
- private datasets;
- restricted corpus.

Observed repository secret/config evidence includes:

- config/secret guard is present and green in the validated baseline;
- repository grep found `process.env`, `NEXT_PUBLIC_`, workflow `secrets.*`, and `environment:` only in guard/test policy fixtures within the inspected execution surface;
- no AI provider credential consumption is established;
- no real AI provider runtime configuration is established.

Contract values therefore remain:

```yaml
restricted_or_secret_data_used: false
secret_values_present: false
```

This is bounded to the candidate POC/source inventory and is not claimed as a comprehensive enterprise DLP or secret-scanning certification.

## 9. Minimum external payload principle

If a later human/provider decision authorizes an external semantic POC, the minimum candidate payload is the synthetic catalog representation only.

Do not send:

- repository history;
- whole source tree;
- ADR corpus;
- search implementation source;
- unrelated documentation;
- CI logs;
- secret/config files;
- raw local environment;
- user-entered evidence URLs;
- any restricted/private data.

Candidate external payload fields:

```text
id
title
issuer
level
summary
```

Even this minimum payload remains unauthorized until explicit human and provider/runtime authority exists.

## 10. Freshness and immutable identity

### 10.1 Catalog freshness

```yaml
freshness_id: freshness.skillcertify.07.002.catalog
path: app/certifications/catalog.ts
blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
last_change_commit: bbf254109bfb70fa29115dfa02ee79052787d137
last_change_time: 2026-08-23T19:03:25-03:00
freshness_condition: revalidate when blob SHA changes before any POC rerun or provider upload
```

### 10.2 Search surface freshness

```yaml
freshness_id: freshness.skillcertify.07.002.search-surface
path: app/certifications/page.tsx
blob_sha: 30da88f78a416619302f09f4cbd4398afa961ca7
last_change_commit: b70d9013fb421175012a1757992892bcf641f1b9
last_change_time: 2026-08-24T08:57:21-03:00
freshness_condition: revalidate when search behavior or blob SHA changes before comparison
```

### 10.3 Use-case ADR freshness

```yaml
freshness_id: freshness.skillcertify.07.002.use-case-adr
path: STAGE07_AI_USE_CASE_BASELINE_ADR.md
blob_sha: 5adf0b148750d7eeb0ebe44f103171c6ddafecbf
last_change_commit: 8c21caa460b7238cec4cb56c98713cd205376071
last_change_time: 2026-08-27T13:48:18-03:00
freshness_condition: revalidate if human decision, evaluation boundary, non-use criteria, or source file changes
```

## 11. Provider, model, cloud, and runtime state

Current state:

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

These `false` states do not mean a provider has failed review.

They mean no provider/runtime has been selected, so provider-specific review is not yet applicable as completed evidence.

No provider may be selected merely because `07.001` chose `evaluate`.

## 12. External action boundary

At this candidate state:

```yaml
external_ai_call_authorized: false
external_upload_or_indexing_authorized: false
external_embedding_generation_authorized: false
external_vector_store_authorized: false
external_raw_payload_logging_authorized: false
production_ai_authorized: false
```

No external AI/cloud action is required to complete the current candidate inventory.

## 13. No-AI fallback

Fallback reference:

```text
STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline
```

The strengthened no-AI comparator is:

```text
title + issuer + level + summary
```

It already resolves the literal-summary cases that the original UI filter misses.

Therefore the POC remains reversible:

```text
semantic evaluation fails or is not authorized
→ retain deterministic no-AI behavior/comparator
→ no production AI dependency is created
```

## 14. Allowed and prohibited use matrix

| Material | Local inspection | Local deterministic comparison | External AI payload now | Future bounded external POC | Production use |
|---|---:|---:|---:|---:|---:|
| synthetic catalog | allowed | allowed | prohibited | pending human + provider authority | not authorized |
| search surface source | allowed | allowed | prohibited | not required | not authorized as AI payload |
| 07.001 ADR | allowed | allowed as governance reference | prohibited | not required | not authorized as AI payload |
| user/private data | not required | not required | prohibited | prohibited unless separately governed | not authorized |
| secrets/credentials | policy-only handling | not required | prohibited | prohibited as payload | prohibited as payload |

## 15. Revalidation triggers

Revalidate this boundary when any of the following changes:

1. `app/certifications/catalog.ts` blob SHA changes;
2. catalog fields or data class changes;
3. source becomes live/official/external rather than synthetic repository content;
4. `app/certifications/page.tsx` search behavior changes materially;
5. the `07.001` product question, non-use criteria, or human decision changes;
6. a provider/model/runtime becomes a material candidate;
7. a provider retention/training/region policy is required;
8. authentication/credential use is introduced;
9. logs/traces would include raw payload;
10. any PII, internal, confidential, restricted, or secret data is proposed;
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
```

Current material stops to `ready` are:

```yaml
human_source_authorization_missing: true
provider_runtime_ref_missing: true
provider_selection_authority_ref_missing: true
human_reviewed: false
```

Those conditions do not make source inventory impossible.

They correctly keep the schema status at `candidate` rather than `ready`.

## 17. Human decision boundary

Human review is required before this record can authorize source use.

The proposed minimal authorization question is intentionally narrow:

> May `source.skillcertify.07.002.catalog` — the exact synthetic catalog at blob `3a95f044198c443e4ce073fecdfea62f7f8ce396` — be authorized as candidate input for a future bounded semantic POC, subject to a separate provider/runtime review before any external call or upload?

This question does **not** ask the human to:

- select a provider;
- select a model;
- approve cloud production use;
- accept provider policy risk;
- upload anything now;
- authorize private/restricted data;
- pass G-P7.

The search surface and ADR should remain local-only references unless a later source-backed need proves otherwise.

## 18. Candidate handoff state

Until explicit human review:

```yaml
baseline_id: baseline.skillcertify.07.002.source-data-cloud-v1
status: candidate
human_reviewed: false
authorized_source_refs: []
allowed_data_classes:
  - publico
restricted_or_secret_data_used: false
provider_runtime_ref: null
provider_selection_authority_ref: null
fallback_without_ai_ref: STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline
secret_values_present: false
external_action_authorized: false
gp7: NOT_PERFORMED
```

Final disposition at candidate materialization:

```text
SOURCE_INVENTORY_ESTABLISHED / RIGHTS_AND_HUMAN_AUTHORIZATION_PENDING / PROVIDER_RUNTIME_UNSELECTED / EXTERNAL_ACTION_BLOCKED
```
