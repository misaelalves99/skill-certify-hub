# Stage 08 — Technical Case

## Metadata

```yaml
record_type: technical-case
stage_id: stage.skillcertify.08
task_id: task.skillcertify.08.004
task_title: Escrever Case técnico source-backed
workstream_id: workstream.skillcertify.08.02
workstream_title: README & Technical Case
source_commit: 73fecf91876ce3747c3a53b2c5fd095995b8caa6
issue_number: 161
status: HUMAN_REVIEW_APPROVED
data_class: interno
human_review_required: true
validation_contract: evidence_map
publication_authorized: false
public_case_status: NOT_AUTHORIZED
production_claim_authorized: false
gp8_performed: false
job_search_authorized: false
```

## 1. Case purpose

Skill Certify Hub is documented here as a governed software-engineering case built from recoverable repository evidence rather than from retrospective marketing claims.

The case describes what the repository demonstrates across its governed stages, the engineering decisions that were recorded, the validation that was actually performed, and the boundaries that remain not established.

This record is internal. It is not a publication decision and does not convert candidate-public evidence into a public portfolio asset.

## 2. Problem and engineering context

The project evolved from a bounded frontend product slice into a repository with explicit architecture, quality, delivery and AI-evaluation governance.

The engineering problem was not only to implement product-facing functionality, but also to make claims about that functionality recoverable and bounded by versioned evidence.

The repository therefore separates implementation evidence, assessment evidence, exact gate decisions, limitations and later portfolio claims instead of treating a green build or gate PASS as proof of production readiness.

## 3. Governed scope demonstrated by the repository

### 3.1 Frontend product slice

Stage 03 established a governed frontend-only product slice using synthetic/mock data.

The demonstrated surface includes the certification catalog and related frontend flows recorded in the repository evidence and now summarized by the governed README.

This evidence does not establish a production backend, durable persistence, authentication, live external data or production AI.

Evidence: `CL-08-001` in `STAGE08_EVIDENCE_PACK.md`.

### 3.2 Architecture and service-readiness boundary

Stage 04 established bounded architecture and service-readiness distinctions.

The recorded scope kept practice mutation and durable Evidence, User, Account and Progress capabilities blocked rather than upgrading them from design/readiness evidence into implemented runtime capability.

Evidence: `CL-08-003` and `CL-08-004` in `STAGE08_EVIDENCE_PACK.md`.

### 3.3 Repository quality contract

Stage 05 established reproducible repository-level quality evidence while preserving explicit gaps.

The current governed repository quality chain is:

```text
guard:config-secrets
-> lint
-> typecheck
-> test
-> eval:stage07
-> build
```

The README revision merged by task `08.003` records the currently verified local environment as Node.js `v22.22.2` and npm `11.13.0`.

Repository quality evidence does not establish comprehensive browser E2E coverage, executable API-runtime coverage where the runtime is absent, or comprehensive security assurance.

Evidence: `CL-08-005` in `STAGE08_EVIDENCE_PACK.md` and the governed `README.md`.

### 3.4 CI and delivery governance

Stage 06 established governed CI and delivery contracts.

That evidence demonstrates delivery governance and reproducible checks, not a live production deployment.

Live promotion, release execution, production health observation and rollback execution remain outside the facts established by the recorded Stage 06 evidence.

Evidence: `CL-08-007` and `CL-08-008` in `STAGE08_EVIDENCE_PACK.md`.

## 4. Bounded AI engineering case

Stage 07 introduced and evaluated a bounded grounded semantic-retrieval POC.

The POC produced versioned prompt/output contracts, source-authorization boundaries, deterministic citation/support validation, runtime guardrails, fallback behavior, CI evaluation and repository-native telemetry.

The semantic observation contained three evaluated cases:

| Query | Expected target | Observed top-1 | Result |
| --- | --- | --- | --- |
| web standards | cert-web-platform | cert-web-platform | top-1 match |
| strong typing | cert-typescript-practice | cert-typescript-practice | top-1 match |
| core website skills | cert-frontend-foundations | cert-web-platform | top-1 miss; expected target ranked 2 |

Observed result:

```yaml
semantic_cases: 3
target_top1_matches: 2
target_top1_misses: 1
observed_match_rate: 2/3
```

The preserved miss is part of the evidence rather than being removed from the case.

The human-approved Stage 07 disposition was `KEEP_BOUNDED_POC_EVIDENCE_ONLY` for `CURRENT_POC_ONLY`.

This means the POC is retained as engineering evidence while broader AI adoption and production AI remain unapproved.

Evidence: `CL-08-009`, `CL-08-010` and `CL-08-011` in `STAGE08_EVIDENCE_PACK.md`, plus `STAGE07_AI_DECISION_CASE_CANDIDATE.md`.

## 5. Engineering decisions

### Decision A — preserve factual boundaries

Implemented, governed, observed and not-established states are kept distinct.

A later successful gate does not retrospectively transform an earlier blocked or not-established capability into an implemented one.

### Decision B — use evidence-first portfolio construction

Stage 08 begins from a claim-to-evidence matrix instead of drafting a narrative first and searching for support afterward.

The evidence pack requires positive claims to have direct evidence and explicitly prevents supporting context from upgrading a GAP or UNKNOWN by itself.

### Decision C — prefer manual/deterministic evidence handling

The Stage 08 tooling evaluation concluded `MANUAL_DETERMINISTIC_PREFERRED` for the current factual evidence job.

No new external tool adoption is required for this Technical Case, and AI-generated text is not evidence authority.

### Decision D — keep the AI POC bounded

The Stage 07 POC is useful as engineering evidence but the available evidence does not justify broader adoption or production authorization.

The preserved 2/3 semantic result and unresolved thresholds are material parts of that decision.

## 6. Validation and observed results

The repository demonstrates a repeatable quality contract combining secret/config guarding, linting, type checking, automated tests, the Stage 07 deterministic evaluation and production build.

The README synchronization task immediately preceding this case recorded:

- `git diff --check`: PASS;
- repository quality contract: PASS;
- automated tests: 83/83 PASS;
- Stage 07 deterministic evaluation: 12/12 PASS;
- production build: PASS;
- static generation: 10/10 PASS.

Evidence provenance for these observations:

- task `task.skillcertify.08.003`;
- PR `#160`;
- task commit `d197b3a574e821bf9ca311364b7f67dafa03eaa4`;
- PR Quality `#56`, completed with `success` on the exact task commit;
- merge commit `73fecf91876ce3747c3a53b2c5fd095995b8caa6`;
- post-merge main Quality `#57`, completed with `success` on the exact merge commit;
- governed README blob `c10446a33e24406030151342f9fcd338794ca4f4`.

These observations establish repository-level reproducibility for the bounded checked scope.

They do not establish live production operation, business outcomes or comprehensive security.

## 7. Evidence traceability

| Case claim | Evidence reference | Evidence status |
| --- | --- | --- |
| Governed frontend-only product slice with synthetic/mock data | `CL-08-001` | ESTABLISHED_BOUNDED |
| Architecture/service-readiness distinctions with blocked durable capabilities preserved | `CL-08-003` | ESTABLISHED_BOUNDED |
| Reproducible repository-level QA with browser/API/security gaps preserved | `CL-08-005` | ESTABLISHED_BOUNDED |
| Governed CI/delivery contracts without live-production inference | `CL-08-007` | ESTABLISHED_BOUNDED |
| Bounded Stage 07 AI POC retained as engineering evidence | `CL-08-009` | ESTABLISHED_BOUNDED |
| Human G-P7 decision preserved within its bounded scope | `CL-08-010` | ESTABLISHED |
| AI candidate case may enter later sanitized publication review | `CL-08-011` | ESTABLISHED_BOUNDED |
| Public README lifecycle drift identified in 08.001 | `CL-08-012` / `GAP-08-001` | historical GAP at 08.001 |
| README synchronized by downstream governed task | `README.md` at source commit of this case | current governed surface |

## 8. Material limitations

The following limitations remain material and must survive any downstream transformation of this case:

1. production deployment and production operational readiness are not established;
2. comprehensive browser E2E coverage is not established;
3. comprehensive security assurance is not established;
4. durable backend/account/progress capability is not established where historical evidence keeps it blocked or absent;
5. production AI authorization is not established;
6. broader AI adoption is not approved;
7. AI necessity is not established;
8. semantic retrieval is not perfect; the observed sample is 2/3 top-1;
9. material semantic-quality threshold is not established;
10. AI adoption threshold is not established;
11. actual provider-billed cost is not established;
12. a material production AI budget is not established;
13. production latency SLO compliance is not established;
14. demonstrated business ROI is not established;
15. production residual-risk acceptance is not established;
16. public portfolio publication approval is not established.

## 9. Explicit non-claims

This Technical Case does not claim that:

- the application is production deployed;
- the repository is production operationally ready;
- browser E2E coverage is comprehensive;
- security assurance is comprehensive;
- a production backend or durable account/progress runtime exists where evidence does not establish it;
- AI is required by the product;
- broader AI adoption has been approved;
- production AI is authorized;
- semantic retrieval is perfect;
- provider cost has been established from actual billing;
- production latency SLOs have been met;
- business ROI has been demonstrated;
- gate PASS is equivalent to production readiness;
- the case is approved for public publication.

## 10. Portfolio and publication boundary

This document is an internal Technical Case input to later governed Stage 08 work.

It may support downstream media, career-channel and publication-review tasks only after those tasks apply their own evidence, sanitization, public-safety and human-authority contracts.

No screenshot, GIF, video, release, LinkedIn asset, resume mutation, public publication, G-P8 decision or Job Search action is performed here.

## 11. Current task disposition

```yaml
technical_case_materialized: true
evidence_first_structure: true
claim_to_evidence_traceability_present: true
implemented_governed_observed_not_established_separated: true
prohibited_inference_introduced: false
new_external_tool_adopted: false
ai_used_as_evidence_authority: false
publication_authorized: false
human_review_pending: false
human_review_status: APPROVED
human_decision_authority: HUMAN
human_review_source: issue-161-comment-5526697245
human_review_decision: TECHNICAL_CASE_SOURCE_BACKED_CURRENT_SCOPE
gp8_performed: false
job_search_authorized: false
```

The Technical Case received material human approval for the bounded current scope recorded in `issue-161-comment-5526697245`. This approval does not authorize publication, production claims, production AI, broader AI adoption, residual-risk acceptance, G-P8, career assets or Job Search.
