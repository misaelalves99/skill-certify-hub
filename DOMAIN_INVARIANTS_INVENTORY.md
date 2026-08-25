# Stage 04 — Domain Invariants Inventory

## Purpose

This artifact records only domain concepts, relationships, constraints and boundaries that are demonstrable from the merged Stage 03 product slice and the recovered Stage 04 `Domain Invariants & Data Model` workstream context.

It is an analysis input for subsequent governed modeling work. It is **not** a database schema, ORM model, API contract, migration plan or authorization model.

## Evidence posture

The inventory uses three classifications:

- **Demonstrated** — directly represented or enforced by the current code/product behavior.
- **Candidate invariant** — strongly suggested by current behavior, but still requires explicit domain-model confirmation before becoming a backend/data constraint.
- **Not demonstrated / deferred** — unsupported by the current frontend slice and therefore must not be invented in this task.

## 1. Certification

### Demonstrated representation

A certification record currently carries:

- `id`
- `title`
- `issuer`
- `level`
- `summary`

The catalog is a finite synthetic collection. Certification detail resolution is performed by exact `id`, and static detail routes are generated from those catalog identifiers.

### Demonstrated behaviors

- A certification can be resolved by its `id`.
- A missing certification identifier produces the governed not-found path rather than fabricated data.
- The certification detail exposes issuer and level as descriptive values.
- Current certification records are explicitly synthetic/frontend-only.

### Candidate invariants for later confirmation

- Certification identifiers should be stable and unique within the certification catalog/domain.
- A persisted certification should require an identifier and user-facing title.
- Unknown identifiers should not resolve to a synthetic/fallback certification.

These are candidates because the frontend relies on them operationally, but Stage 04 has not yet established the authoritative persisted model.

### Explicit non-claims

The current slice does not establish:

- official issuer ownership;
- certification pricing;
- prerequisites;
- renewal rules;
- live issuer data;
- saved user progress;
- authoritative external certification data.

## 2. Issuer

### Demonstrated representation

`issuer` exists today as a text value embedded in a certification record.

### Modeling boundary

The current product does **not** prove that Issuer is an independently addressable aggregate/entity with its own identifier, lifecycle, ownership, metadata or persistence needs.

Therefore Stage 04 must not automatically create an `issuers` table/entity merely because the UI displays an issuer name.

### Candidate question for 04.002

Does the backend need an independently governed Issuer concept, or is issuer attribution initially a value owned by Certification?

This requires source/domain authority beyond the current frontend evidence.

## 3. Practice

### Demonstrated representation

A practice record currently carries:

- `id`
- `title`
- `description`
- `status`

The frontend defines exactly three canonical status values:

- `now`
- `next`
- `quarantine`

### Demonstrated behaviors

- Every represented practice has exactly one of those three statuses.
- The current view filters practices by status.
- Changing the selected status changes only local browser UI state.
- No practice status change is persisted, synchronized, personalized or backed by an API/database.

### Candidate invariants for later confirmation

- A persisted practice status, if Stage 04 introduces one, should use a closed governed status vocabulary rather than arbitrary free text.
- Unsupported status values should be rejected rather than silently mapped to a known state.

The exact persistence semantics, transitions and ownership rules are not yet established.

### Important distinction

The current `activeStatus` is a UI filter state. It must not be mistaken for a persisted transition of a Practice record. The source does not currently provide a mutation workflow that changes a practice's stored status.

## 4. Evidence

### Demonstrated representation

The current Evidence surface models a session-local item with:

- a locally generated numeric `id` based on `Date.now()`;
- a `url` string entered by the user.

### Demonstrated behaviors

- Empty input is not added.
- The field uses HTML `type="url"` and is required.
- Added evidence exists only in component/browser-session state.
- Refreshing clears the evidence list.
- The user may clear the whole local evidence list.
- Evidence is not uploaded, persisted, synchronized or associated with an account.

### Boundary on identifiers

The local `Date.now()` value is a rendering/session key. It is **not evidence** for a durable backend identifier strategy and must not be copied into the Stage 04 data model by default.

### Boundary on URL rules

The UI help text asks for a valid HTTP(S) link, but the application code does not implement an explicit backend/domain HTTP(S)-only validator. Therefore `http/https only` is not yet a proven backend invariant.

### Candidate invariants for later confirmation

- Persisted evidence should not accept an empty reference/value.
- If Evidence remains URL-based in the backend contract, URL normalization and accepted schemes must be specified explicitly rather than inferred from browser validation.

### Not demonstrated

The current slice does not establish:

- evidence ownership by a user/account;
- evidence ownership by a certification;
- evidence ownership by a practice;
- file uploads;
- evidence type taxonomy;
- remote object storage;
- verification status;
- moderation/review state;
- provenance/audit metadata.

## 5. User, Account and Progress

### Current finding

No persisted User, Account, Profile, Enrollment, Progress or Completion model is demonstrated by Stage 03.

The dashboard explicitly avoids inventing connected-account history, saved progress or analytics. Evidence also has no account association.

### Stage 04 constraint

Authentication tables, user ownership foreign keys, enrollment/progress records and authorization relationships must not be introduced merely because they are common in certification products.

They require an authoritative Stage 04/product contract.

## 6. Relationships currently proven vs unproven

### Proven

- Certification detail consumes one certification record selected by certification `id`.
- Practice UI groups/filter-selects practices by the canonical status value.
- Evidence UI owns a transient in-memory list of local evidence links for the current rendered session.

### Not proven as backend domain relationships

- Certification → Issuer entity/reference.
- User → Certification.
- User → Practice.
- User → Evidence.
- Certification → Practice.
- Certification → Evidence.
- Practice → Evidence.
- Evidence → reviewer/verifier.

No foreign-key cardinality should be inferred from the current UI.

## 7. Invariants currently enforced by code

The following are actual code-level constraints/behaviors rather than proposed schema rules:

1. Certification lookup is exact by `id`.
2. Missing certification lookup returns no record and invokes the not-found experience.
3. Practice status is type-constrained to `now | next | quarantine` in the frontend source.
4. Practice filtering compares exact status equality.
5. Evidence submissions with a trimmed empty value are ignored.
6. Evidence state exists only in client memory and can be cleared.

These facts are strong inputs to modeling, but their translation into database constraints still belongs to the governed data-model task.

## 8. Candidate questions for `04.002`

Before schema implementation, the next modeling task should resolve at least:

1. Which demonstrated concepts become durable domain entities versus embedded/value objects?
2. Is Issuer independently addressable or owned as certification metadata?
3. Is Practice a global catalog object, user-specific object, or another bounded concept?
4. What is Evidence evidence **of**, and who/what owns it?
5. Which relationships and cardinalities are authoritative?
6. Which identifiers must be globally stable and which are implementation-local?
7. Which status vocabularies/transitions are domain state versus presentation/filter state?
8. What persistence behavior is intentionally introduced in Stage 04 versus deferred?
9. Which invariants belong in domain/service logic versus database constraints?
10. What data must remain synthetic until an authoritative external source is defined?

## 9. Technology-neutral modeling rule

Until those questions are answered from the authoritative Stage 04 source or explicit human authority, do not derive architecture by prematurely choosing:

- SQL versus NoSQL;
- a database engine;
- ORM/data mapper;
- migration framework;
- API style;
- authentication provider;
- storage provider;
- identifier implementation such as UUID, auto-increment or timestamp-derived IDs.

The model must follow domain behavior; storage technology must not define the domain by convenience.

## 10. 04.001 conclusion

The Stage 03 frontend provides enough evidence to identify an initial domain vocabulary and several behavioral constraints, but not enough evidence to define a final persisted schema.

The safe handoff posture is:

- retain **Certification**, **Practice** and **Evidence** as demonstrated concepts;
- retain `issuer` as demonstrated certification attribution without prematurely promoting it to an entity;
- preserve the closed practice status vocabulary as a strong candidate domain constraint while distinguishing it from UI filter state;
- preserve Evidence as an intentionally unresolved ownership/persistence concept;
- reject speculative User/Account/Progress relationships until authorized;
- move to `04.002` only after human review of this baseline/inventory and with the expectation that the exact current-master contract must still be reconciled before physical schema implementation.
