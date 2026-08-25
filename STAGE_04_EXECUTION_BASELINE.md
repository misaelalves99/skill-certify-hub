# Stage 04 Execution Baseline

## Status

This document is a governed source-recovery and execution-baseline record for `task.skillcertify.04.001`.

It does not define implementation technology by inference and does not replace the current canonical `04-backend-data.zip` master package.

## Transition provenance

Stage 03 closed through a human G-P3 `PASS` recorded on `main`.

The Stage 03 gate package remains independently verifiable through:

```text
gate/g-p3-package-v1.json
gate/verify-g-p3-package.mjs
gate/g-p3-decision-v1.json
```

Stage 04 is therefore authorized to begin through its own governed task flow.

## Recovered Stage 04 identity

Project sources derived from an analyzed version of `04-backend-data.zip` establish the following Stage contract:

```text
stage: stage.skillcertify.04
title: Backend & Data
workstreams: 6
canonical tasks: 04.001–04.015
WIP baseline: 2
gate: gate.skillcertify.04 (G-P4)
next stage: stage.skillcertify.05
```

Recovered mission:

> Transform the approved frontend experience into a consistent, secure, testable and reproducible backend and data model, with clear contracts, verifiable evidence and a human G-P4 decision before Quality Assurance.

The closing sequence is fixed as:

```text
04.013 = assessment
04.014 = exact package/version/digest
04.015 = human decision / bounded handoff
```

Only a human PASS at `04.015`, bound to the exact package/digest frozen by `04.014`, may authorize `05.001`.

## Recovered workstream map

The analyzed master exposes these six Stage 04 workstreams:

```text
01-domain-invariants-data-model
02-migrations-seeds-data-integrity
03-api-service-contracts
04-transaction-auth-security
05-test-ai-governance-release-evidence
06-backend-data-assessment-gate-handoff
```

The first workstream contains:

```text
04.001
04.002
```

and is named **Domain Invariants & Data Model**.

Its recovered control question is:

> Does the model represent SkillCertify's real behavior, or merely the most convenient shape for generating tables?

Priority capability lenses recovered for this workstream are:

- domain/model analysis;
- schema/invariant validation;
- contract/ownership review;
- decision traceability.

## Epistemic classification

### Confirmed in merged runtime/repository

- Stage 03 G-P3 decision is `PASS`.
- Stage 04 is authorized.
- the current repository quality baseline passes.
- the current application remains the frontend-approved handoff state from Stage 03.

### Recovered from analyzed-master project sources

- Stage 04 identity is `Backend & Data`.
- Stage 04 has 6 workstreams and 15 tasks.
- `04.001–04.002` belong to Domain Invariants & Data Model.
- the workstream control question and capability lenses listed above.
- G-P4 closing sequence and human authority.

### Not yet confirmed from the current canonical master package

- exact canonical leaf wording for `04.001` and `04.002`;
- exact task outputs and acceptance criteria;
- exact domain entities and invariant list;
- database engine;
- ORM/query layer;
- schema format;
- migration framework;
- API protocol/style;
- authentication/authorization mechanism;
- runtime hosting or persistence provider;
- exact backend test stack.

These unknowns must not be filled by convention or preference.

## Execution boundary for 04.001

Permitted now:

- inspect the approved Stage 03 frontend/state model for domain concepts already represented;
- inventory synthetic certification, issuer, practice-status and evidence concepts without treating frontend shapes as canonical database tables;
- identify candidate domain invariants as hypotheses, clearly labeled;
- trace each candidate to existing approved behavior or evidence;
- prepare reconciliation against the current canonical Stage 04 master when available.

Not permitted without further authority/source:

- choosing a database or ORM;
- creating migrations;
- implementing persistence;
- adding authentication;
- inventing API contracts;
- converting frontend synthetic data structures directly into canonical tables;
- claiming an inferred domain model is approved.

## Source limitation

The recovered sources explicitly state that their Stage-specific content was derived from an analyzed version of `04-backend-data.zip` and must be reread against the current master package before execution.

Therefore:

```text
recovered analyzed-master contract
!= verified current-master leaf contract
```

This distinction is a governance requirement, not a documentation caveat.

## Next permitted action

The next bounded action is to derive a **domain-concept/invariant inventory from the already approved frontend experience**, labeling it as candidate analysis rather than accepted schema, while continuing to search/reconcile the current canonical Stage 04 master contract.

Implementation technology selection remains blocked until supported by source or explicit human authority.
