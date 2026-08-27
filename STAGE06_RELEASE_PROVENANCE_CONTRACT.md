# Stage 06 — Release Provenance Contract Baseline

## Purpose

This document materializes `task.skillcertify.06.008` for Stage 06 — DevOps & Delivery.

The individual canonical display title for `06.008` is not available in the recovered source. The operational title used for this task is therefore non-canonical and derived from the next explicit Stage 06 delivery concern after promotion eligibility: release provenance.

This task establishes a versioned release-provenance contract only. It does **not** create a release, tag, deployment, package, artifact publication, signing identity, attestation, SBOM, registry, provider integration, credential, G-P6 decision, or Stage 07 authorization.

## 1. Dependency and source-backed entry state

`task.skillcertify.06.007` completed through PR #122.

Post-merge `main` evidence:

```yaml
merge_commit: c21b62cd8002b2334c7659157eb8447d0fe70a24
workflow: Quality
run_number: 19
run_id: 33075843553
event: push
conclusion: success
```

The completed promotion-eligibility work establishes only pre-action evaluation states:

```text
ELIGIBLE
INELIGIBLE
BLOCKED
```

and explicitly does not equate any of them with `PROMOTED` or `RELEASED`.

## 2. Human-executed baseline entering 06.008

Branch:

```text
task/skillcertify-06-008-release-provenance-contract
```

Entry revision:

```text
c21b62cd8002b2334c7659157eb8447d0fe70a24
```

Observed local runtime:

```text
Node.js: v22.22.2
npm: 11.13.0
```

Observed dependency/quality state:

```yaml
npm_ci: pass
packages_added: 344
packages_audited: 345
reported_vulnerabilities_in_current_npm_audit_scope: 0
config_secret_guard: pass
lint: pass
typecheck: pass
tests: 44/44_pass
build: pass
static_ssg_generation: 10/10_pass
working_tree: clean
```

Known non-failing diagnostics remain visible and are not reclassified by this task:

- `eslint@9.39.5` deprecation warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning for `app/certifications/catalog.ts`.

## 3. Release/provenance surface inspection entering 06.008

Human inspection executed:

```text
git tag --list
git ls-remote --tags origin
```

Both produced no tag entries.

The repository release page was independently queried through the GitHub connector and returned an empty release collection.

The post-merge Quality run #19 was queried for workflow artifacts and returned no artifacts.

Repository workflow inspection observed:

```text
.github/workflows/quality.yml
```

No release, publish, artifact-upload, provenance, SBOM, attestation, or signing mechanism was observed in the inspected workflow/package/script surface.

One grep result contained:

```text
tests/config-secret-guard.test.mjs:48: fixture.trackedFiles.push("config/signing.key");
```

This is a synthetic negative fixture used to prove that tracked key material is rejected. It is not a release-signing implementation, signing identity, signing key, or release credential.

Current bounded release surface:

```yaml
local_tags: none_observed
remote_tags: none_observed
github_releases: none_observed
post_merge_quality_run_artifacts: none_observed
release_workflow: not_established
publish_script: not_established
release_script: not_established
artifact_publication: not_established
artifact_identity_model: not_established
artifact_digest_model: not_established
sbom: not_established
attestation: not_established
signing_identity: not_established
release_provider: not_established
release_credentials: not_established
```

Important limitation:

Absence of artifacts on Quality run #19 is evidence about that run. It is not by itself a historical proof that no artifact has ever existed through any external mechanism. This contract therefore uses `not_established` rather than inventing broader historical claims.

## 4. Governed objective

Define the minimum evidence required before any future statement of the form:

```text
revision X was released as release identity Y
```

can be considered evidence-backed.

Release provenance must bind release identity to exact immutable source identity and all applicable execution evidence.

## 5. Release identity is distinct from repository activity

None of the following independently proves a release:

```text
branch exists
commit exists
PR merged
CI green
promotion candidate ELIGIBLE
promotion performed
deployment successful
version field exists in package.json
tag-shaped string exists
```

A release is a separately evidenced delivery outcome.

Therefore:

```text
merge != release
CI green != release
ELIGIBLE != release
PROMOTED != release
deployed != release
package version != release
```

## 6. Release provenance states

This contract defines four provenance states:

```text
NOT_ESTABLISHED
CANDIDATE
INVALID
RELEASED
```

### NOT_ESTABLISHED

Use when no governed release record exists or required prerequisites are absent/unresolved.

### CANDIDATE

Use when a structured release record exists and is under validation, but direct release outcome evidence is not yet complete.

### INVALID

Use when supplied release evidence is contradictory, malformed, ambiguously bound, or demonstrably mismatched.

Examples include:

- short/ambiguous source SHA;
- quality evidence for another SHA;
- required artifact digest mismatch;
- tag/version ambiguity;
- release outcome bound to another source;
- claimed released state without required authority/outcome evidence.

### RELEASED

Use only when direct release evidence exists and all applicable provenance bindings are satisfied.

This task does not produce `RELEASED` for the current repository.

## 7. Exact source identity requirement

Every future release claim must bind to an exact immutable source revision.

Minimum source identity:

```yaml
source:
  repository: <repository identity>
  sha: <full 40-hex commit SHA>
```

Rules:

- branch name alone is insufficient;
- PR number alone is insufficient;
- short SHA is insufficient for final provenance;
- source SHA must be immutable and exact;
- release evidence referring to a different SHA is invalid.

## 8. Task and PR traceability

Where governed task/PR traceability applies, the release record must preserve it explicitly:

```yaml
traceability:
  task: task.skillcertify.xx.xxx
  pr: <positive integer>
```

Traceability identifies the governed change path. It does not replace source SHA identity.

## 9. Quality evidence binding

A future release record must reference deterministic quality evidence for the exact source SHA.

Minimum concept:

```yaml
quality:
  sourceSha: <same exact source SHA>
  conclusion: success
  runId: <authoritative execution reference>
```

Rules:

- missing quality evidence -> release provenance not established;
- failed quality evidence -> invalid/release blocked;
- mismatched quality/source SHA -> invalid;
- local PASS cannot be relabeled as remote CI PASS;
- AI narrative cannot replace execution evidence.

## 10. Version and tag identity

A future release may use a version and/or tag only when the release mechanism establishes them explicitly.

Minimum fields when applicable:

```yaml
releaseIdentity:
  version: <explicit version or not_applicable>
  tag: <exact tag or not_applicable>
```

Rules:

- no concrete version is invented by this task;
- no tag is invented by this task;
- a package manifest version alone does not prove release identity;
- a tag-shaped string in documentation is not release evidence;
- ambiguous or conflicting version/tag bindings invalidate provenance;
- if a tag exists, its target source identity must be verifiable.

## 11. Artifact applicability

Artifact provenance is conditional on the eventual release architecture.

Two valid high-level cases exist:

```text
artifact_required
artifact_not_applicable
```

Applicability must be explicit; it cannot be silently inferred.

## 12. Artifact identity and digest binding

When an immutable release artifact is required, provenance must bind:

```text
source SHA
↕
artifact identity
↕
artifact digest
↕
release identity
```

Minimum conceptual record:

```yaml
artifact:
  applicability: required
  id: <artifact identity>
  digestAlgorithm: <explicit algorithm>
  digest: <exact digest>
  sourceSha: <exact source SHA>
```

Rules:

- no artifact digest is invented by this task;
- missing required digest -> provenance not established;
- digest/source mismatch -> invalid;
- mutable location/filename alone is not sufficient immutable identity;
- release claim must reference the exact artifact actually released.

## 13. Artifact not-applicable path

If the eventual release architecture legitimately has no separately published immutable artifact, provenance may record:

```yaml
artifact:
  applicability: not_applicable
  basis: <explicit architectural basis>
```

The basis is required so artifact provenance is not omitted accidentally.

This task does not decide which path applies to the repository.

## 14. Promotion evidence applicability

Promotion evidence is conditional.

If the release architecture requires a promotion action before release, the record should reference:

```yaml
promotion:
  applicability: required
  sourceSha: <exact source SHA>
  mechanism: <promotion mechanism identity>
  runId: <execution evidence>
  outcome: success
```

If no promotion concept applies:

```yaml
promotion:
  applicability: not_applicable
  basis: <explicit basis>
```

The `06.006–06.007` promotion contract/evaluator does not itself prove any live promotion occurred.

## 15. Deployment evidence applicability

Deployment evidence is also conditional.

If release semantics require deployment:

```yaml
deployment:
  applicability: required
  target: <exact target identity>
  mechanism: <deployment mechanism identity>
  runId: <execution evidence>
  sourceSha: <exact source SHA>
  outcome: success
```

If deployment is not part of release semantics:

```yaml
deployment:
  applicability: not_applicable
  basis: <explicit basis>
```

This task creates no deployment target or provider.

## 16. Release mechanism evidence

A `RELEASED` claim requires direct evidence of the mechanism that caused the release outcome.

Minimum concept:

```yaml
releaseMechanism:
  id: <mechanism identity>
  runId: <execution or release record identity>
  outcome: success
```

A mechanism cannot be silently replaced with:

- merge completion;
- CI completion;
- promotion eligibility;
- documentation statement.

## 17. Release authority

Release authority remains explicit and human/governed under the current project contract.

Minimum future evidence:

```yaml
authority:
  status: approved
  actor: <authorized actor>
  basis: <approval/release authority basis>
```

Rules:

- missing authority -> provenance not established;
- denied authority -> invalid/release blocked;
- AI/Codex cannot autonomously assert release authority;
- CI success does not imply release approval.

## 18. Release timestamps

A release record should preserve execution timestamps when a release occurs:

```yaml
timestamps:
  requestedAt: <timestamp when applicable>
  startedAt: <timestamp when applicable>
  completedAt: <timestamp>
```

The exact required timestamp model may depend on the future release mechanism.

No timestamp is fabricated by this task for a release that did not occur.

## 19. Future minimum release evidence schema

A future governed release record should support at least:

```yaml
recordType: stage06-release-provenance
state: NOT_ESTABLISHED | CANDIDATE | INVALID | RELEASED
source:
  repository: <repository identity>
  sha: <full 40-hex SHA>
traceability:
  task: <task ID when applicable>
  pr: <PR number when applicable>
quality:
  sourceSha: <same full SHA>
  conclusion: <execution conclusion>
  runId: <run identity>
releaseIdentity:
  version: <version or not_applicable>
  tag: <tag or not_applicable>
artifact:
  applicability: required | not_applicable | unresolved
  id: <artifact id when required>
  digestAlgorithm: <algorithm when required>
  digest: <digest when required>
  sourceSha: <same source SHA when required>
  basis: <basis when not_applicable>
promotion:
  applicability: required | not_applicable | unresolved
  mechanism: <mechanism when required>
  runId: <execution identity when required>
  sourceSha: <same source SHA when required>
  outcome: <outcome when required>
  basis: <basis when not_applicable>
deployment:
  applicability: required | not_applicable | unresolved
  target: <target when required>
  mechanism: <mechanism when required>
  runId: <execution identity when required>
  sourceSha: <same source SHA when required>
  outcome: <outcome when required>
  basis: <basis when not_applicable>
releaseMechanism:
  id: <mechanism identity>
  runId: <release execution identity>
  outcome: <outcome>
authority:
  status: approved | denied | required
  actor: <actor when approved>
  basis: <authority basis>
timestamps:
  requestedAt: <timestamp when available>
  startedAt: <timestamp when available>
  completedAt: <timestamp when released>
notes:
  warnings: []
  limitations: []
```

The schema is a future evidence contract, not a claim that all fields currently exist.

## 20. Provenance validation matrix

| Condition | Provenance outcome |
| --- | --- |
| no governed release record | `NOT_ESTABLISHED` |
| structured record exists but required evidence unresolved | `CANDIDATE` or `NOT_ESTABLISHED` depending on workflow stage |
| malformed/short source SHA | `INVALID` |
| quality SHA differs from source SHA | `INVALID` |
| quality conclusion is not success | release blocked / `INVALID` for a success claim |
| required artifact lacks immutable digest | provenance not established |
| artifact digest/source binding conflicts | `INVALID` |
| tag/version binding ambiguous | `INVALID` |
| release authority missing | provenance not established |
| direct release outcome missing | cannot be `RELEASED` |
| applicable bindings valid + direct release outcome + authority | may qualify as `RELEASED` |

## 21. Current repository classification

The current repository must be classified as:

```text
NOT_ESTABLISHED
```

for live release provenance.

Reasons include:

```text
no release identity established
no tag established
no release mechanism established
no release execution evidence
artifact applicability unresolved
artifact identity/digest model not established
release authority evidence for a live action not established
```

Existing CI evidence remains valid CI evidence only.

## 22. Relationship to package.json version

The repository currently declares:

```json
"version": "0.1.0"
```

That field is package metadata.

This contract does **not** treat it as evidence that release `0.1.0` occurred.

Without direct release provenance:

```text
package.json version 0.1.0 != released version 0.1.0
```

## 23. Relationship to tags

At task entry, no local or remote tag was observed.

Even if a tag appears in the future, provenance must still establish:

- exact tag target;
- exact source SHA;
- release mechanism/outcome;
- applicable artifact binding;
- authority.

Tag existence alone is insufficient.

## 24. Relationship to GitHub Releases

At task entry, the repository release collection was empty.

A future GitHub Release object may become part of release evidence if that mechanism is selected, but its existence alone would still need exact source/tag/artifact/authority binding according to the applicable architecture.

This task does not create a GitHub Release.

## 25. Relationship to workflow artifacts

Quality run #19 exposed no workflow artifacts.

No `upload-artifact`/publication mechanism was observed in the current workflow surface inspected for this task.

Therefore artifact provenance remains `NOT_ESTABLISHED`.

This contract does not claim that the application must eventually use GitHub Actions artifacts. Artifact architecture remains unresolved.

## 26. Signing, attestations, and SBOM

This task does not establish:

```text
artifact signing
commit signing as release proof
release signing
provenance attestation
SLSA attestation
SBOM generation
SBOM publication
signing key identity
certificate identity
registry attestation
```

If future architecture requires any of these, their exact evidence and verification semantics must be explicitly established in a later governed task.

## 27. Security boundary

This task:

- creates no signing key;
- creates no credential;
- reads no hosted secret inventory;
- creates no `secrets.*` workflow use;
- adds no write/release/deploy permission;
- publishes no artifact;
- publishes no package;
- creates no tag;
- creates no release;
- does not bypass `guard:config-secrets`.

`06.004–06.005` remain authoritative for configuration/secret handling.

## 28. Human authority boundary

Human governance remains authoritative for:

- actual release approval;
- actual PR merge;
- gate decisions;
- residual-risk acceptance.

AI/Codex may assist with deterministic analysis and documentation but cannot convert absent evidence into `RELEASED`.

## 29. Relationship to G-P6

Release provenance is not G-P6.

Even a future valid `RELEASED` record would not automatically mean:

```text
G-P6: PASS
```

G-P6 remains a separate human-only gate at `task.skillcertify.06.012`.

## 30. Relationship to Stage 07

Stage 07 remains unauthorized.

Only the governed Stage 06 completion sequence and human G-P6 PASS may authorize advancement.

## 31. Claim boundaries

Allowed after successful validation of this task:

- a versioned release-provenance contract exists;
- release identity is explicitly separated from merge/CI/promotion/deployment;
- exact source SHA binding is required;
- future artifact digest binding is defined when artifact applicability requires it;
- future release authority/evidence fields are defined;
- current live release provenance is `NOT_ESTABLISHED`.

Prohibited:

- a release occurred;
- version `0.1.0` was released;
- a tag exists;
- an artifact was published;
- an artifact digest exists;
- signing/attestation/SBOM exists;
- a deployment occurred;
- G-P6 passed;
- Stage 07 is authorized.

## 32. Post-materialization validation status

Human post-materialization validation was supplied for materialization revision:

```text
94b98df28aeeab37a70624eee5913038a20c1ff9
```

Observed local validation:

```yaml
config_secret_guard: pass
lint: pass
typecheck: pass
tests: 44/44_pass
build: pass
static_ssg_generation: 10/10_pass
local_tags: none_observed
remote_tags: none_observed
working_tree: clean
```

The following commands produced no tag entries:

```text
git tag --list
git ls-remote --tags origin
```

Therefore the bounded live release classification remains:

```text
NOT_ESTABLISHED
```

The validation proves the contract did not break the existing deterministic quality path and did not create local or remote tags. It does not prove a release, artifact publication, signing, attestation, SBOM, deployment, or G-P6 outcome.

Remote GitHub Actions validation remains pending until the governed PR exists and executes.

## 33. Current disposition

```yaml
record_type: stage06-release-provenance-contract
stage: stage.skillcertify.06
task: task.skillcertify.06.008
title_status: operational_non_canonical
entry_revision: c21b62cd8002b2334c7659157eb8447d0fe70a24
entry_quality_run: 33075843553
entry_local_quality: pass
entry_local_tests: 44/44_pass
entry_build: pass
entry_static_generation: 10/10_pass
materialization_revision: 94b98df28aeeab37a70624eee5913038a20c1ff9
local_tags_at_entry: none_observed
remote_tags_at_entry: none_observed
github_releases_at_entry: none_observed
entry_quality_run_artifacts: none_observed
release_provenance_contract: established
release_provenance_state: NOT_ESTABLISHED
release_identity: not_established
release_mechanism: not_established
artifact_provenance: not_established
artifact_digest: not_established
signing: not_established
attestation: not_established
sbom: not_established
post_materialization_local_validation: pass
post_materialization_local_tests: 44/44_pass
post_materialization_build: pass
post_materialization_static_generation: 10/10_pass
post_materialization_local_tags: none_observed
post_materialization_remote_tags: none_observed
post_materialization_working_tree: clean
remote_ci_validation: pending
live_release: false
gp6_decision: not_performed
stage07_authorized: false
```

Current bounded disposition:

```text
RELEASE_PROVENANCE_CONTRACT_ESTABLISHED / LOCAL_VALIDATION_ESTABLISHED / REMOTE_CI_PENDING / LIVE_RELEASE_NOT_ESTABLISHED
```
