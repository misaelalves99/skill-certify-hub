# Stage 07 — AI Use Case & No-AI Baseline ADR

## ADR metadata

```yaml
record_type: architecture-decision-record
stage_id: stage.skillcertify.07
task_id: task.skillcertify.07.001
task_title: Definir caso de uso e baseline sem IA
workstream_id: workstream.skillcertify.07.01
workstream_title: AI Value & Baseline
source_stage_manifest_version: "1.7.0"
source_repository_revision: 23a926b9bbd2fd45253fe9b1627bc09213ebda5c
issue_ref: https://github.com/misaelalves99/skill-certify-hub/issues/133
human_decision_comment_ref: https://github.com/misaelalves99/skill-certify-hub/issues/133#issuecomment-5442323735
human_decision: evaluate
human_reviewed: true
ai_required: false
provider_selected: false
model_selected: false
cloud_selected: false
production_ai_authorized: false
gp7_performed: false
```

## 1. Decision

The human coordinator explicitly selected:

```text
07.001 decision: evaluate
```

For this task, `evaluate` means only:

> execute the smallest comparative proof needed to determine whether a residual semantic/paraphrase retrieval gap produces material value over a reasonable no-AI baseline.

It does **not** mean:

- AI is required;
- AI has been adopted;
- a provider or model has been selected;
- cloud use has been authorized;
- source/data use has been authorized;
- production AI behavior may be shipped;
- G-P7 has passed.

The engineering outcome `no_ai` remains valid and successful if the comparison does not establish material value.

## 2. Canonical contract binding

The current Stage 07 control plane defines the `AI Use Case & No-AI Baseline` contract in `00-control/contracts/ai-use-case-baseline.schema.json`.

This ADR materializes its required values as follows:

```json
{
  "baseline_id": "baseline.skillcertify.07.001.no-ai-search-v1",
  "stage_id": "stage.skillcertify.07",
  "product_question": "Does a bounded semantic retrieval approach materially improve discovery of relevant certification concepts for paraphrased or intention-based queries that remain unmatched after a reasonable no-AI lexical baseline?",
  "no_ai_baseline_ref": "STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline",
  "ai_hypothesis": "A bounded semantic retrieval approach may recover relevant catalog items for paraphrased or intention-based queries that remain unmatched after reasonable deterministic lexical strengthening, but AI is not required unless the improvement is material, reproducible, and not adequately achieved by a simpler deterministic alternative.",
  "evaluation_task_refs": [
    "evaluation.skillcertify.07.001.current-lexical",
    "evaluation.skillcertify.07.001.strengthened-lexical",
    "evaluation.skillcertify.07.001.semantic-paraphrase-poc"
  ],
  "non_use_criteria": [
    "A deterministic search approach achieves materially equivalent retrieval for the bounded evaluation task.",
    "The semantic POC does not materially improve the residual paraphrase cases over the strengthened no-AI baseline.",
    "There is no source-backed product or user need for intent/paraphrase discovery beyond the synthetic probes.",
    "The improvement requires disproportionate complexity, latency, cost, reliability burden, or operational risk for the value demonstrated.",
    "Required source/data/runtime authority is not established by downstream governance.",
    "The approach cannot remain grounded, bounded, observable, and safely fall back under later Stage 07 controls.",
    "The evidence remains too weak or ambiguous to justify AI over a simpler solution."
  ],
  "adoption_authority_ref": "https://github.com/misaelalves99/skill-certify-hub/issues/133#issuecomment-5442323735",
  "ai_required": false,
  "decision": "evaluate",
  "human_reviewed": true
}
```

`baseline_id` and the `evaluation.*` identifiers above are operational stable identifiers created for this repository evidence record. They are not claimed to be canonical IDs recovered from the Stage 07 source package.

## 3. Product problem boundary

### 3.1 Current product surface

The current certification experience is a small frontend-only synthetic catalog.

The repository currently exposes three governed synthetic records in:

- `app/certifications/catalog.ts`

The list experience is implemented in:

- `app/certifications/page.tsx`

The current user-facing search control is deterministic and local.

### 3.2 Current search behavior

The production-source filter normalizes the query using:

```text
query.trim().toLowerCase()
```

and performs substring matching over:

```text
title + issuer + level
```

It does not currently include `summary` in its searchable surface.

The critical journey test intentionally protects this deterministic behavior in:

- `tests/critical-journey.test.mjs`

Therefore the current filter is not being relabeled as defective merely because it is lexical. It is the established no-AI behavior entering Stage 07.

## 4. No-AI baseline

### 4.1 Baseline identity

```yaml
baseline_id: baseline.skillcertify.07.001.no-ai-search-v1
baseline_type: deterministic-local-search
source_revision: 23a926b9bbd2fd45253fe9b1627bc09213ebda5c
repository_mutation_required_for_observation: false
```

### 4.2 Baseline A — current lexical behavior

Operational evaluation ref:

```text
evaluation.skillcertify.07.001.current-lexical
```

Search fields:

```text
title + issuer + level
```

Direct local human execution observed:

| Query | Expected governed record | Current lexical result |
|---|---|---|
| `TypeScript` | `cert-typescript-practice` | HIT |
| `Foundational` | `cert-frontend-foundations` | HIT |
| `browser` | `cert-web-platform` | MISS |
| `typed frontend` | `cert-typescript-practice` | MISS |

The last two misses are not sufficient evidence for AI because both phrases occur literally in record summaries that the current filter does not index.

### 4.3 Baseline B — strengthened lexical behavior

Operational evaluation ref:

```text
evaluation.skillcertify.07.001.strengthened-lexical
```

A temporary in-memory no-AI comparison added `summary` to the lexical search fields without changing repository files:

```text
title + issuer + level + summary
```

Direct local human execution observed:

| Query | Expected governed record | Strengthened lexical result |
|---|---|---|
| `TypeScript` | `cert-typescript-practice` | HIT |
| `Foundational` | `cert-frontend-foundations` | HIT |
| `browser` | `cert-web-platform` | HIT |
| `typed frontend` | `cert-typescript-practice` | HIT |
| `web standards` | `cert-web-platform` | MISS |
| `strong typing` | `cert-typescript-practice` | MISS |
| `core website skills` | `cert-frontend-foundations` | MISS |

This proves that the literal-summary gap is addressable without AI.

It also leaves a bounded residual semantic/paraphrase gap in the synthetic evaluation probes.

### 4.4 Baseline integrity

After the no-AI experiments:

```yaml
critical_journey_tests: 3/3 PASS
working_tree: clean
repository_files_modified_by_probe: false
```

The repository-wide baseline entering the task was also green:

```yaml
config_secret_guard: PASS
lint: PASS
typecheck: PASS
repository_tests: 44/44 PASS
production_build: PASS
static_generation: 10/10 PASS
working_tree: clean
```

Known existing non-failing diagnostics remain visible:

- ESLint 9.39.5 deprecation/unsupported-version warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning.

Neither warning is evidence for or against AI adoption.

## 5. Facts, findings, hypotheses, and unknowns

### 5.1 Facts

The following are directly supported by source or executed evidence:

1. the catalog currently contains three governed synthetic certification records;
2. the current filter is local, deterministic, and lexical;
3. the current filter searches `title`, `issuer`, and `level`;
4. `summary` is not part of the current filter;
5. including `summary` resolves the tested literal-summary misses without AI;
6. the three tested paraphrase queries remain unmatched by the strengthened lexical baseline;
7. the critical journey remains green after the experiments;
8. no repository mutation was required for either baseline experiment;
9. the human coordinator selected `evaluate`;
10. no provider, model, cloud runtime, source permission, or production AI boundary has been authorized by `07.001`.

### 5.2 Engineering finding

A fair AI comparison must **not** use the weaker current lexical field coverage as the only comparator.

The minimum defensible no-AI comparator for the residual question includes `summary`.

Therefore:

```text
AI POC comparator = strengthened no-AI baseline
not merely = current title/issuer/level filter
```

### 5.3 AI hypothesis

The hypothesis is intentionally narrow:

> A bounded semantic retrieval approach may recover the intended governed certification record for paraphrased or intention-based queries that do not share sufficient literal vocabulary with the strengthened no-AI catalog representation.

This is a hypothesis, not an established product requirement or AI-value claim.

### 5.4 Unknowns

The following remain materially unknown:

- whether real users actually use paraphrased/intention-based queries in this product;
- whether the three synthetic paraphrase probes represent realistic demand;
- whether a deterministic alternative such as curated aliases, controlled synonym mapping, token-based ranking, or another non-AI technique would solve the bounded task adequately;
- what comparison metric and materiality threshold should govern the POC;
- what source/data classifications would be admissible for any AI implementation;
- what provider/model/runtime, if any, would be appropriate;
- latency, token, cost, reliability, privacy, observability, grounding, and fallback characteristics;
- whether an AI-assisted approach can improve retrieval without introducing misleading or fabricated associations.

Those unknowns must not be silently converted into assumptions.

## 6. Evaluation cases

### 6.1 Current lexical control

```yaml
evaluation_ref: evaluation.skillcertify.07.001.current-lexical
role: observed-control
method: deterministic substring
fields:
  - title
  - issuer
  - level
ai_used: false
```

### 6.2 Strengthened no-AI control

```yaml
evaluation_ref: evaluation.skillcertify.07.001.strengthened-lexical
role: required-comparator
method: deterministic substring
fields:
  - title
  - issuer
  - level
  - summary
ai_used: false
```

### 6.3 Residual semantic POC

```yaml
evaluation_ref: evaluation.skillcertify.07.001.semantic-paraphrase-poc
role: bounded-hypothesis-test
status: AUTHORIZED_FOR_EVALUATION_ONLY
production_use_authorized: false
provider_selection_authorized: false
model_selection_authorized: false
cloud_selection_authorized: false
```

The initial residual probes are:

| Query | Expected record | Current lexical | Strengthened lexical |
|---|---|---:|---:|
| `web standards` | `cert-web-platform` | MISS | MISS |
| `strong typing` | `cert-typescript-practice` | MISS | MISS |
| `core website skills` | `cert-frontend-foundations` | MISS | MISS |

These probes are synthetic evaluation cases only.

They do **not** establish real-user demand.

## 7. POC scope boundary

The authorized POC question is:

> Can a bounded semantic approach improve retrieval on the residual paraphrase cases relative to the strengthened no-AI baseline, while preserving correct behavior for exact/literal cases and without introducing unsupported associations?

The POC must remain smaller than that question.

It must not become a general chatbot, recommender, RAG platform, cloud migration, provider bake-off, or production AI subsystem.

A POC implementation is justified only when it reduces a material uncertainty required by the comparison.

## 8. Non-use criteria

The Stage 07 source explicitly requires criteria for not using AI.

For this bounded use case, AI should **not** be adopted when any of the following holds:

1. **Deterministic equivalence** — a simpler deterministic approach reaches materially equivalent retrieval quality for the bounded task.
2. **No material semantic gain** — the POC does not materially outperform the strengthened lexical baseline on the residual evaluation cases.
3. **No product need** — no source-backed user/product evidence supports intent/paraphrase discovery as a material problem.
4. **Weak evidence** — observed gains depend on hand-selected examples and do not survive a reproducible evaluation set.
5. **Disproportionate complexity** — implementation/maintenance burden is not justified by the demonstrated value.
6. **Disproportionate runtime cost** — latency, token usage, monetary cost, rate limits, or availability burden exceed justified value.
7. **Unsafe association behavior** — the approach introduces unsupported, misleading, or unstable matches that cannot be bounded adequately.
8. **Governance boundary missing** — required source/data/runtime authority is not established downstream.
9. **Grounding/fallback boundary missing** — later Stage 07 controls cannot establish adequate grounding, abstention/fallback, observability, or reversibility.
10. **Human decision rejects adoption** — human authority determines that the evidence does not justify continued AI use.

Any one material criterion may support a later `no_ai`, `revise`, or `blocked` outcome depending on the evidence state.

## 9. Human authority

Canonical Stage 07 source requires human review for `07.001`.

The explicit human source for this ADR is:

```text
https://github.com/misaelalves99/skill-certify-hub/issues/133#issuecomment-5442323735
```

Recorded human outcome:

```text
07.001 decision: evaluate
```

Authority semantics:

```yaml
decision_authority: HUMAN
ai_decision_authority: NONE
ai_required: false
decision: evaluate
human_reviewed: true
```

AI/tooling may execute bounded analysis and preserve evidence, but it may not reinterpret `evaluate` as adoption.

## 10. Why `use_bounded` is not selected

The schema allows `use_bounded` only when:

```text
human_reviewed = true
ai_required = true
```

The first condition is satisfied.

The second is not.

Current evidence establishes only a residual uncertainty worthy of evaluation.

Therefore:

```yaml
human_reviewed: true
ai_required: false
decision: evaluate
use_bounded_admissible_now: false
```

## 11. Why `no_ai` is not selected yet

The strengthened lexical baseline solved the literal-summary gap, which is evidence in favor of restraint.

However, a residual semantic/paraphrase gap remains in the bounded synthetic probes.

The human coordinator chose to reduce that uncertainty through a minimal comparison rather than terminate evaluation now.

Therefore `no_ai` remains an admissible future outcome, but it is not the current decision.

## 12. Handoff boundary to downstream Stage 07 work

Completion of `07.001` may hand forward only:

- the bounded product question;
- the observed current no-AI baseline;
- the strengthened no-AI comparator;
- the residual semantic hypothesis;
- the synthetic evaluation probes;
- the non-use criteria;
- explicit unknowns;
- the human `evaluate` decision source.

It does not hand forward:

- provider approval;
- model approval;
- cloud approval;
- source/data permission;
- production permission;
- prompt contract approval;
- runtime safety approval;
- quality threshold approval;
- cost budget approval;
- publication approval;
- G-P7 PASS.

Source/data/cloud authority belongs to `task.skillcertify.07.002` and later controls.

## 13. Hard-stop evaluation

```yaml
no_ai_baseline_absent: false
hypothesis_without_non_use_criteria: false
adoption_decided_by_ai: false
real_product_surface_undefined: false
baseline_invented: false
metric_without_definition: not_applicable_yet
poc_larger_than_question: false
provider_selected_before_data_classification: false
ai_required_inferred: false
production_ai_inferred: false
```

No current hard stop prevents a bounded evaluation decision.

A metric/materiality threshold remains an explicit design item for the comparative POC rather than an invented universal threshold in this ADR.

## 14. Disposition

```yaml
baseline_status: ESTABLISHED
current_lexical_baseline: OBSERVED
strengthened_no_ai_baseline: OBSERVED
residual_semantic_gap: OBSERVED_IN_SYNTHETIC_PROBES
real_user_demand_for_semantic_search: NOT_ESTABLISHED
ai_value: NOT_ESTABLISHED
ai_required: false
human_reviewed: true
decision: evaluate
provider_model_cloud_authority: NONE
production_ai_authority: NONE
gp7: NOT_PERFORMED
```

Final task disposition at ADR materialization:

```text
NO_AI_BASELINE_ESTABLISHED / BOUNDED_SEMANTIC_POC_EVALUATION_AUTHORIZED
```

This is an evidence-first evaluation state, not an AI-adoption state.
