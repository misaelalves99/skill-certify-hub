# Stage 07 — Evaluation Dataset & CI Baseline

## Metadata

```yaml
record_type: ai-evaluation-baseline
stage_id: stage.skillcertify.07
task_id: task.skillcertify.07.006
task_title: Criar dataset e eval no CI
workstream_id: workstream.skillcertify.07.05
workstream_title: Evaluation, Cost & Evidence
issue_ref: https://github.com/misaelalves99/skill-certify-hub/issues/143
source_stage_manifest_version: "1.7.0"
entry_main_revision: 8f747eee24e530afaf558d233e62970b42118a4a
status: candidate
human_reviewed: false
dataset_id: evalset.skillcertify.07.006.semantic-retrieval-v1
dataset_version: "1.0.0"
eval_runner: scripts/stage07-eval.mjs
ci_entrypoint: npm run quality
external_eval_tool_selected: false
historical_tool_hint: Promptfoo
material_semantic_quality_threshold: NOT_ESTABLISHED
adoption_threshold: NOT_ESTABLISHED
llm_as_judge: false
ai_required: false
production_ai_authorized: false
gp7_performed: false
```

`status: candidate` means the repo-native dataset/runner/report contract has been materialized but has not yet received the required human review for this task. It does **not** mean the eval has been accepted as sufficient evidence for adoption/removal.

## 1. Control question

`07.006` addresses the bounded question:

> Can the current Stage 07 POC be evaluated through a versioned, reproducible, CI-executed dataset/report path that preserves both positive and negative evidence without allowing a green CI run to decide adoption by itself?

The task does not decide whether AI should be kept, reduced, or removed.

## 2. Tooling disposition

The source package carries `Promptfoo` only as a historical `select-at-execution` hint. Current repository evidence already provides:

- Node 22;
- native `node --test`;
- `npm run quality`;
- GitHub Actions `Quality` on pull requests and pushes to `main`;
- deterministic repo-native Stage 07 harnesses from `07.004` and `07.005`.

Therefore the smallest candidate implementation is:

```yaml
tooling_mode: repo-native-node
external_eval_product: none
external_dependency_added: false
workflow_yaml_changed: false
ci_integration: npm run quality -> npm run eval:stage07
```

This is a candidate tooling disposition pending human review. It is not a claim that Promptfoo is unsuitable in general.

## 3. Versioned dataset

Dataset:

```text
evals/stage07-semantic-retrieval.eval.v1.json
```

The dataset is bound to the existing governed evidence and source/runtime boundaries:

```yaml
authorized_source_ref: source.skillcertify.07.002.catalog
authorized_catalog_blob_sha: 3a95f044198c443e4ce073fecdfea62f7f8ce396
prompt_library_blob_sha: 674cdec4b1c343bb71822f1f0dd2c3513e24008d
grounded_runtime_evidence_blob_sha: 0d6883eb4fd9859686d492a2f56ba50e194db087
prompt_grounding_baseline_blob_sha: 42a7b244207f7ae1cdda0fecce67eb70e1c68577
runtime_safety_baseline_blob_sha: b9eae6361df97fc4f578ded48810d6ad65510cd7
provider_endpoint: /v1/embeddings
provider_model: text-embedding-3-small
```

The eval runner validates these bindings from Git-tracked blob SHAs so stale evidence does not silently pass.

## 4. Coverage model

The dataset contains 15 bounded cases:

```yaml
recorded_external_semantic_observations: 3
deterministic_ci_cases: 12
total_cases: 15
```

Coverage categories include:

- common task;
- semantic observation;
- unknown/no-source;
- injection/adversarial;
- safety-sensitive secret request;
- unsupported citation;
- conflicting source;
- authorized citation support;
- outdated/stale source authority;
- refusal/fallback through kill switch;
- timeout/runtime failure;
- provider HTTP failure;
- invalid payload / format violation.

This intentionally extends beyond happy-path semantic retrieval.

## 5. Preserved external semantic evidence

The three real `07.004` observations remain frozen as evidence rather than re-executed in CI:

| Query | Target | Observed top-1 | Target rank | Observation |
|---|---|---|---:|---|
| `web standards` | `cert-web-platform` | `cert-web-platform` | 1 | target top-1 observed |
| `strong typing` | `cert-typescript-practice` | `cert-typescript-practice` | 1 | target top-1 observed |
| `core website skills` | `cert-frontend-foundations` | `cert-web-platform` | 2 | target top-1 miss preserved |

Recorded aggregate:

```yaml
semantic_cases: 3
target_top1_matches: 2
target_top1_misses: 1
observed_match_rate: 2/3
semantic_miss_preserved: true
```

For the miss:

```yaml
query: core website skills
observed_top1: cert-web-platform
observed_top1_score: 0.464248118835
target: cert-frontend-foundations
target_rank: 2
target_score: 0.42249907457
```

A future green CI run must preserve this negative observation. It must not rewrite the target or observed result to manufacture `3/3`.

## 6. CI eval semantics

Runner:

```text
scripts/stage07-eval.mjs
```

Command:

```text
npm run eval:stage07
```

The command is included inside `npm run quality`, which the existing GitHub Actions `Quality` workflow already runs on pull requests and pushes to `main`.

The runner performs no provider network call and requires no API credential. Provider-failure cases use bounded synthetic fetch implementations only.

The deterministic report emitted to stdout includes:

```yaml
execution_mode: ci-deterministic-no-network
external_provider_network_call_performed: false
external_eval_tool_selected: false
deterministic_contract_cases: 12
recorded_semantic_evidence_cases: 3
material_semantic_quality_threshold: NOT_ESTABLISHED
adoption_threshold: NOT_ESTABLISHED
ci_contract_status: pass|fail
```

`ci_contract_status: pass` has a deliberately narrow meaning:

> dataset/evidence integrity and deterministic grounding/safety contracts are reproducible.

It does **not** mean:

- semantic quality is sufficient;
- AI value is established;
- AI is required;
- adoption is approved;
- production is ready;
- G-P7 has passed.

## 7. Threshold / rubric boundary

No material numeric semantic threshold is invented in this task.

```yaml
material_semantic_quality_threshold: NOT_ESTABLISHED
adoption_threshold: NOT_ESTABLISHED
threshold_owner: HUMAN_REQUIRED_IF_LATER_DEFINED
llm_as_judge: false
```

The external `2/3` observation is evidence, not an adoption threshold.

A later threshold, if needed, requires an explicit metric definition, rationale, dataset/version, owner, failure meaning and human decision reference.

## 8. LLM-as-a-judge boundary

No LLM-as-a-judge is used by the repo-native eval. All CI gating in this task is deterministic.

An auxiliary LLM judge may be evaluated later only if separately selected and may not become the sole evaluator for a material decision.

## 9. Expected post-materialization validation

Before this candidate can be reviewed, human-local validation must establish the actual branch behavior. Minimum commands include:

```text
npm run quality
npm run eval:stage07
node --test tests/stage07-eval.test.mjs
```

The expected structural outcome is:

```yaml
repository_quality: PASS_OR_FAIL_FROM_EXECUTION
stage07_eval_tests: PASS_OR_FAIL_FROM_EXECUTION
ci_eval_report: PASS_OR_FAIL_FROM_EXECUTION
external_provider_network_call_performed: false
credential_required: false
working_tree: CLEAN_OR_DIRTY_FROM_EXECUTION
```

No PASS is asserted here before that execution evidence exists.

## 10. Human review still required

Human review is required before this baseline can be promoted from `candidate`.

The bounded review should decide whether:

- repo-native Node tooling is sufficient for this task instead of adding Promptfoo;
- the 15-case dataset is proportionally representative for the current POC scope;
- preserving `2/3` as evidence while leaving a material semantic threshold `NOT_ESTABLISHED` is acceptable;
- CI-green semantics are correctly limited to reproducibility/integrity rather than adoption truth.

This review is not production authorization, residual-risk acceptance or an AI-adoption decision.

## 11. Current disposition

```text
VERSIONED_EVAL_DATASET_MATERIALIZED /
REPO_NATIVE_CI_EVAL_PATH_MATERIALIZED /
NO_EXTERNAL_EVAL_TOOL_SELECTED /
NO_LLM_AS_JUDGE /
SEMANTIC_2_OF_3_EVIDENCE_PRESERVED /
MATERIAL_SEMANTIC_THRESHOLD_NOT_ESTABLISHED /
HUMAN_REVIEW_PENDING /
AI_REQUIRED_FALSE /
PRODUCTION_AI_NOT_AUTHORIZED /
G-P7_NOT_PERFORMED
```
