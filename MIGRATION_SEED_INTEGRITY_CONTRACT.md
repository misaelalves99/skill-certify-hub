# Stage 04 — Reproducible Migration, Seed & Integrity Contract

## Purpose

This document materializes the implementation-facing contract for `task.skillcertify.04.004` within Stage 04 workstream **Migrations, Seeds & Data Integrity**.

It is derived from the merged `MIGRATION_PERSISTENCE_BASELINE.md` and converts that baseline into explicit lifecycle, seed, recovery and verification requirements for later physical persistence work.

This contract does **not** select a database, ORM, migration framework, API style, authentication mechanism or storage provider. It also does not authorize destructive execution or use of real/private data.

## 1. Migration lifecycle contract

Any future physical migration flow MUST be demonstrable as an explicit lifecycle:

1. **Prepare** — declare the disposable target environment, supported inputs and starting schema state.
2. **Plan** — materialize or inspect the intended schema change before applying it when the selected tooling supports such inspection.
3. **Apply** — apply the versioned migration sequence in deterministic order.
4. **Verify schema state** — confirm the resulting schema/version state by an inspectable mechanism.
5. **Seed when in scope** — run deterministic synthetic seeds as a separate, reviewable step unless the chosen technology provides a justified equivalent.
6. **Verify integrity** — run checks that prove the approved domain invariants hold in the persisted representation.
7. **Recover or recreate** — demonstrate rollback, forward recovery or deterministic disposable recreation appropriate to the migration class.
8. **Re-verify** — prove the target state can be reached again predictably after recovery/recreation.

A future implementation MUST document the exact commands or scripts for these steps. Hidden local actions or undocumented GUI-only steps are not sufficient evidence.

## 2. Starting-state contract

Each migration execution MUST identify its starting state explicitly.

For clean-environment validation, the starting state is an empty disposable persistence environment.

For upgrade validation, the starting state MUST identify the prior governed migration/schema revision being upgraded.

A migration MUST NOT depend on undocumented local database history, manually edited schema drift or unversioned state.

## 3. Versioning and ordering contract

Migration definitions MUST:

- live in version-controlled repository content;
- have deterministic ordering;
- remain reviewable as repository changes;
- avoid rewriting already-governed migration history except through an explicitly reviewed correction strategy;
- expose generated SQL/schema diffs when materially relevant to safety or integrity and when supported by the selected tooling.

Framework-generated output is not authoritative by itself. Material generated output must be reviewable against the domain contract.

## 4. Destructive-change classification

Every future schema change MUST be classified before execution as one of:

### Non-destructive

Examples may include additive structures or constraints that do not remove or overwrite governed data, subject to actual generated output inspection.

### Potentially destructive

Includes changes that may rewrite, coerce, rename, constrain or transform existing persisted values in ways that could lose or invalidate data.

### Destructive

Includes operations such as dropping data-bearing structures, truncation, uncontrolled reset, irreversible data deletion or equivalent loss of governed state.

The classification is based on effect, not on the command name used by a tool.

## 5. Destructive-operation approval boundary

Potentially destructive or destructive operations are **not authorized by this contract for non-disposable data**.

For disposable local/test environments, destructive reset/recreation MAY be used only when:

- the target is explicitly known to be disposable;
- no real/private data exists in the environment;
- the destructive action is visible in the documented command/workflow;
- recreation from versioned migrations/seeds is demonstrated afterward.

Any destructive action against persistent non-disposable data requires a later explicit human authorization and recovery posture outside this task.

## 6. Synthetic seed contract

Seeds MUST be synthetic, deterministic and bounded by the approved domain model.

### Allowed seed scope

Initial seeds MAY represent only fields already authorized for conditionally ready concepts:

- Certification: `id`, `title`, `issuer`, `level`, `summary`;
- Practice: `id`, `title`, `description`, `status` with exactly `now | next | quarantine`.

### Prohibited seed scope

Seeds MUST NOT invent or imply:

- User, Account, Profile, Enrollment, Progress or Completion;
- Certification↔Practice relationships;
- Evidence ownership or durable Evidence records;
- independent Issuer records;
- unsupported lifecycle states;
- credentials, access tokens, secrets or real personal data.

## 7. Seed determinism contract

A governed seed set MUST satisfy all of the following:

- the same repository revision and supported configuration produce the same logical seed dataset;
- source seed values are versioned or derived from a fixed deterministic specification;
- random generation, if ever introduced later, must use a fixed seed and documented algorithm/version;
- timestamps used only for runtime metadata must not alter the logical seeded domain dataset unless explicitly part of the contract;
- seed IDs must be deterministic for local/test reproducibility but MUST NOT silently become the final production identifier strategy.

## 8. Seed re-run behavior

The selected implementation MUST define one exact re-run behavior before seeds are executed repeatedly.

Acceptable patterns include:

- deterministic idempotent insert/upsert behavior;
- duplicate prevention with a verified no-op second run;
- explicit reset-and-reseed limited to a proven disposable environment.

Uncontrolled duplicate creation is not acceptable.

A future PR MUST demonstrate the selected behavior with evidence rather than merely claim it.

## 9. Integrity verification contract

The first physical persistence implementation MUST provide executable or otherwise reproducible checks for the currently approved persisted invariants.

### Certification

Verification MUST establish, where Certification is persisted:

- identity is present;
- identity is unique in the governed certification domain;
- title is present/usable;
- exact identity lookup returns one record or no record, never a fabricated fallback.

### Practice

Verification MUST establish, where Practice is persisted:

- identity is present;
- title is present/usable;
- `status` is restricted to exactly `now | next | quarantine`;
- unsupported status values are rejected rather than silently normalized to a valid state.

### Evidence

No durable Evidence verification is authorized because Evidence is not yet ready for physical persistence.

## 10. Pre-apply integrity checks

Before applying an upgrade migration to a non-empty disposable test state, the workflow SHOULD verify any preconditions required by the change.

Examples include verifying that values satisfy a new closed vocabulary or that a uniqueness constraint will not fail due to duplicate fixture data.

If the selected technology automatically applies destructive/coercive transformations to satisfy a migration, those effects MUST be inspected and documented rather than accepted by default.

## 11. Post-apply integrity checks

After migration and seed execution, the workflow MUST verify:

- expected migration/schema version is current;
- expected bounded persisted concepts exist;
- approved invariants pass;
- no unsupported domain relationships/concepts were introduced;
- seed repeatability contract is satisfied when seeds are in scope.

A successful migration command alone is not sufficient evidence of data integrity.

## 12. Recovery contract

Every implemented migration class MUST have one declared recovery mode:

### Verified rollback

The migration can be reversed on a disposable environment and the prior governed state is demonstrably restored.

### Forward-fix recovery

A direct rollback is unsafe/unavailable, so a versioned forward correction plus an independently documented restore/backup posture is required before use on non-disposable data.

### Disposable recreation

For local/test environments, the database can be destroyed and deterministically recreated from versioned migrations and synthetic seeds to the same governed state.

The initial Stage 04 implementation MAY rely on disposable recreation if it is limited to local/test data and is reproducibly demonstrated.

## 13. Minimum recovery evidence

Before a future physical migration task is accepted, evidence MUST show at least one complete cycle appropriate to the selected recovery mode.

For disposable recreation, the minimum cycle is:

1. create from empty;
2. apply all migrations;
3. seed deterministically if in scope;
4. verify integrity;
5. destroy/reset only the proven disposable environment;
6. recreate from empty;
7. re-run migrations/seeds;
8. confirm equivalent logical target state and integrity results.

For rollback-capable flows, equivalent `up → verify → down → verify prior state → up → verify` evidence may be used.

## 14. Evidence package for future physical migration PRs

A future implementation PR SHOULD contain or reference reproducible evidence for:

- dependency/bootstrap command;
- selected disposable persistence target;
- migration plan or generated material inspection where relevant;
- migration apply command;
- resulting schema/version inspection;
- seed command and source fixture revision;
- seed re-run behavior;
- integrity checks and results;
- rollback/recovery/recreation cycle;
- application `npm run quality` result;
- clean working tree;
- explicit statement that no real/private data was used.

## 15. Tool trust boundary

No migration/ORM tool may implicitly decide domain meaning.

The implementation MUST review generated behavior that could introduce:

- inferred foreign keys or relations;
- cascade deletion;
- implicit nullable/non-null constraints;
- default identifiers;
- destructive rename/drop behavior;
- enum/value coercion;
- migration history rewrites;
- uncontrolled seed duplication.

Tool defaults are implementation candidates, not domain authority.

## 16. Technology decision at 04.004

No concrete database, ORM or migration framework is selected by `04.004`.

### Reason

The repository now contains strong safety and evidence requirements, but still lacks source-backed decisions for several physical-design drivers, including:

- deployment persistence topology;
- intended production hosting/database constraints;
- final identifier representation;
- Practice ownership/lifecycle;
- Evidence ownership/persistence;
- relationship/cardinality requirements;
- expected query/load profile;
- operational backup/recovery target beyond disposable local/test execution.

Choosing a database or ORM now would therefore rely materially on convention rather than product/runtime evidence.

### Consequence

The next physical persistence task, when authorized by the Stage 04 source/workstream sequence, MUST make technology selection as an explicit reviewable decision against both `MIGRATION_PERSISTENCE_BASELINE.md` and this contract.

The decision should prefer the smallest approach that satisfies the bounded needs and can demonstrate the lifecycle/evidence requirements above.

## 17. Environment boundary

This contract authorizes only planning and later validation against disposable local/test persistence environments unless a later task explicitly expands scope.

It does not authorize:

- production/cloud database provisioning;
- remote live-data migrations;
- secret distribution;
- production backup policy;
- customer data import;
- destructive action against non-disposable data.

## 18. Handoff posture

`04.004` completes the **Migrations, Seeds & Data Integrity** workstream contract layer by establishing:

- deterministic migration lifecycle expectations;
- explicit destructive-change classification and approval boundaries;
- synthetic deterministic seed rules;
- repeatability/idempotency requirements;
- pre/post integrity checks;
- rollback/recovery/recreation acceptance conditions;
- minimum evidence requirements;
- an explicit decision to defer database/ORM/framework selection until it can be justified by the next source-backed physical persistence scope.

No physical schema is created by this task, and no unresolved domain concept is converted into persistence by convention.
