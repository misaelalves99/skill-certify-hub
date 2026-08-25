# Stage 04 — Migration & Persistence Baseline

## Purpose

This document materializes the governed execution baseline for `task.skillcertify.04.003` within the Stage 04 workstream **Migrations, Seeds & Data Integrity**.

It defines what must be true before a physical schema, migration or seed implementation is introduced. It does not select a database, ORM, migration framework, API style, authentication mechanism or storage provider.

The baseline is derived from the merged `DOMAIN_MODEL_CONTRACT.md` and preserves its unresolved ownership, relationship, lifecycle and identifier questions rather than converting them into storage assumptions.

## Workstream control question

Can the database be created and evolved reproducibly without depending on real data, implicit destructive actions or blind trust in a tool?

The baseline therefore treats reproducibility, reversibility/recovery, deterministic synthetic seeds, integrity validation and evidence as first-class requirements.

## 1. Readiness for physical persistence

A domain element is ready for physical persistence only when all of the following are true:

1. Its domain meaning is source-backed and reviewable.
2. Its required identity/attributes are sufficiently defined for the intended persistence scope.
3. Any relationship required by the physical model has an explicit governed decision.
4. Lifecycle behavior needed by the migration is known or intentionally excluded.
5. The proposed physical representation does not silently introduce new product concepts.
6. The implementation choice can be justified independently of storage convenience.

### Current readiness classification

#### Certification

**Conditionally ready for a minimal isolated persistence representation.**

Source-backed contract currently establishes:

- stable logical identity requirement;
- unique identity within the certification domain;
- exact lookup semantics;
- user-facing title requirement;
- descriptive issuer attribution, level and summary fields.

Not authorized by this baseline:

- independent Issuer relation;
- external/live source synchronization;
- pricing/prerequisites/renewal metadata;
- user progress relationships;
- lifecycle state beyond the demonstrated record shape.

A future physical model may persist only the bounded fields justified by the domain contract unless a later governed decision expands them.

#### Practice

**Conditionally ready for a minimal isolated persistence representation, with ownership/lifecycle unresolved.**

Source-backed contract currently establishes:

- logical identity;
- title;
- description;
- closed `now | next | quarantine` value set.

The physical model must not infer that Practice is user-owned, globally shared, assigned, completed, scheduled or related to Certification/Evidence.

#### Evidence

**Not ready for durable persistence implementation.**

Only a non-blank evidence reference value is currently justified. Durable identity, ownership, subject, relationship, URL policy, lifecycle and storage semantics remain unresolved.

Therefore `04.003` must not create an Evidence table/collection merely because the frontend contains session-local evidence links.

#### User / Account / Progress and related concepts

**Not authorized.**

These concepts remain outside the current domain model contract and must not appear in physical schema or seed design.

## 2. Migration reproducibility requirements

Any future migration implementation must satisfy all of the following:

### Deterministic source

- Migration definitions MUST be versioned in the repository.
- The same repository revision and supported environment inputs MUST produce the same intended schema state.
- Required environment variables/configuration MUST be explicit and documented.
- Migration order MUST be deterministic and reviewable.

### Clean-environment creation

There MUST be a documented path to create the governed schema from an empty disposable database/environment without relying on hidden manual steps.

A reviewer must be able to identify:

- command(s) used;
- migration sequence applied;
- resulting schema/version state;
- whether seed execution is separate from schema creation.

### Existing-state evolution

Where a migration upgrades a prior schema state, the starting state and expected resulting state MUST be explicit.

No migration may rely on an undocumented local database history.

### No hidden destructive behavior

A migration command MUST NOT silently:

- drop data-bearing structures;
- reset a database;
- truncate records;
- overwrite an environment;
- rewrite migration history;
- bypass integrity checks.

If a tool can perform such operations, the workflow must expose them as explicit, separately reviewed actions.

## 3. Destructive-operation guardrails

### Default posture

Destructive data/schema operations are **deny-by-default** for governed execution.

### Explicit review requirement

Any future migration involving destructive potential must document before execution:

- what is destructive;
- why it is necessary;
- which environment is targeted;
- whether data is disposable;
- backup/recovery posture;
- exact human authorization boundary.

### Production/live prohibition for this workstream baseline

`04.003` does not authorize migration execution against production, live user data, external customer environments or any non-disposable remote database.

### Tool prompts are not governance

A migration framework asking for confirmation does not replace repository governance or human review. Tool-generated SQL/plans must still be inspected when material to safety or integrity.

## 4. Rollback and recovery baseline

Not every migration framework supports symmetric down-migrations safely. Therefore this baseline distinguishes **rollback** from **recovery**.

A future migration strategy MUST define at least one tested recovery posture per migration class:

- reversible migration with verified rollback; or
- forward-fix migration with a documented previous-state restore strategy; or
- disposable-environment recreation from versioned migrations/seeds.

The strategy MUST NOT claim recoverability solely because a framework exposes a `rollback` command.

### Minimum recovery evidence

For the first physical migration set, evidence must show one of:

- migration up + verified down + up again on a disposable database; or
- clean database creation, migration to target state, destructive test/reset only in disposable environment, and deterministic recreation to the same target state.

The exact evidence mechanism depends on the selected technology and must be defined in the later implementation task.

## 5. Seed-data baseline

Seeds exist to make local/test environments reproducible, not to mirror real customer data.

### Mandatory rules

- Seed data MUST be synthetic.
- Seeds MUST NOT contain real personal data, credentials, secrets, access tokens or copied production records.
- Seed values MUST be deterministic or generated from a fixed deterministic specification.
- Re-running the governed seed workflow MUST have a defined behavior: idempotent update/upsert, controlled reset on disposable environment, or explicit duplicate-prevention rule.
- Seed identifiers MUST NOT accidentally become the authoritative production identifier strategy.

### Source alignment

Synthetic seed content may derive from the existing synthetic Certification/Practice concepts only within the fields authorized by `DOMAIN_MODEL_CONTRACT.md`.

Seeds MUST NOT invent:

- User/Account/Progress;
- Certification↔Practice relationships;
- Evidence ownership;
- independent Issuer records;
- unsupported lifecycle states.

## 6. Data integrity requirements

The physical persistence implementation must preserve, at minimum, the currently approved technology-neutral invariants where applicable.

### Certification integrity

The implementation must be capable of enforcing or verifying:

- identity presence;
- identity uniqueness in the governed certification domain;
- required user-facing title;
- deterministic exact lookup semantics.

The precise enforcement layer (database constraint, application/domain logic or both) remains a later justified decision.

### Practice integrity

The implementation must be capable of enforcing or verifying:

- identity presence;
- required title;
- status restricted to exactly `now | next | quarantine`.

Unsupported Practice status values must not silently map to a valid state.

### Evidence integrity

No durable Evidence integrity rules are implemented in this task because the concept is not ready for persistence. If later authorized, the non-blank reference rule and explicit URL policy must be handled deliberately.

## 7. Migration evidence requirements

Before any future physical migration PR is considered complete, it should provide reproducible evidence covering the selected technology's equivalent of:

1. clean install/dependency setup;
2. empty disposable persistence environment creation;
3. migration apply from zero to current target;
4. schema/version inspection or equivalent verification;
5. deterministic synthetic seed execution when seeds are in scope;
6. integrity checks for approved invariants;
7. rollback/recovery demonstration appropriate to the migration class;
8. current application quality baseline;
9. clean working tree;
10. explicit confirmation that no real/private data was used.

Exact commands must be versioned or documented in the implementation task rather than left as tribal knowledge.

## 8. Technology-selection decision criteria

`04.003` does not select a database or ORM. A later technology decision must be justified against the actual bounded needs, including at least:

- compatibility with the current Next.js/TypeScript project and intended deployment model;
- migration reproducibility;
- ability to inspect generated schema/migrations;
- deterministic local/test workflow;
- integrity constraint support;
- recovery/backup ergonomics relevant to the intended environment;
- operational complexity appropriate to the project;
- security/update posture;
- avoidance of unnecessary infrastructure.

Popularity or framework convention alone is insufficient justification.

## 9. Tool trust boundary

Generated migrations, schema diffs and ORM output are implementation aids, not authorities.

Future execution must verify material generated output rather than assuming:

- generated migration is non-destructive;
- inferred relation/cardinality matches the domain contract;
- default identifier strategy is acceptable;
- seed behavior is idempotent;
- rollback is safe;
- schema diff is complete.

Human review remains authoritative at merge boundaries.

## 10. Environment boundary

Initial migration implementation, when authorized, should target a **disposable local/test environment** first.

This baseline does not authorize:

- production database creation;
- cloud database provisioning;
- remote production migration;
- secret distribution;
- production backup policy;
- live-data transformation.

Those require later explicit scope and review.

## 11. Decisions intentionally deferred

The following remain unresolved after `04.003` and must not be treated as implicit choices:

- relational versus document storage;
- database vendor/engine;
- ORM/data mapper or direct driver;
- migration framework;
- physical identifier representation;
- table/collection naming;
- indexes beyond proven integrity/performance needs;
- independent Issuer persistence;
- Practice ownership model;
- Evidence persistence/ownership;
- User/Account/Progress models;
- API/auth/storage architecture.

## 12. Handoff posture to `04.004`

`04.003` establishes the safety and evidence contract for the first physical persistence/migration work.

The next governed task may choose and implement a bounded persistence/migration approach only if it can:

- trace the physical model to `DOMAIN_MODEL_CONTRACT.md`;
- restrict initial persistence to concepts actually ready for it;
- use only synthetic deterministic seed data;
- demonstrate clean creation/evolution on a disposable environment;
- expose destructive behavior rather than hiding it;
- demonstrate rollback or credible recovery;
- validate the approved invariants;
- preserve all unresolved domain questions without schema-by-convention.

Any implementation exceeding those boundaries requires a new source-backed or human-governed decision.