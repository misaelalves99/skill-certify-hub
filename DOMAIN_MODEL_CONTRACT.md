# Stage 04 — Bounded Domain Model Contract

## Purpose

This document materializes the technology-neutral domain model contract for `task.skillcertify.04.002`.

It is derived from the merged `DOMAIN_INVARIANTS_INVENTORY.md` and the approved Stage 04 workstream **Domain Invariants & Data Model**. It deliberately stops before physical persistence design.

This is **not** a SQL schema, ORM model, migration plan, API contract, authentication model, storage design, or implementation of backend runtime behavior.

## Contract posture

The model uses four classifications:

- **Domain record** — a concept with evidence-backed identity and attributes sufficient to model independently at the domain-contract level.
- **Value concept** — an evidence-backed value owned by another concept, without independent lifecycle/identity proven.
- **Closed value set** — a finite vocabulary currently enforced strongly enough to preserve as a technology-neutral constraint.
- **Unresolved concept/relationship** — a design question that remains intentionally open because evidence is insufficient.

A classification in this document does not automatically imply a database table, collection, aggregate boundary, foreign key or network resource.

## 1. Certification

### Classification

**Domain record.**

The current product resolves certifications independently by identifier and renders a not-found path when no record exists. That is sufficient to preserve Certification as an independently identifiable domain record in the technology-neutral contract.

### Required contract fields

The currently justified fields are:

- `id` — stable domain identity token for certification lookup;
- `title` — user-facing certification name;
- `issuer` — issuer attribution value owned by the certification contract unless a later decision promotes Issuer to an independent concept;
- `level` — descriptive certification level;
- `summary` — user-facing descriptive summary.

### Field semantics

#### `id`

- MUST identify one certification record within the governed certification domain.
- MUST be unique within that domain.
- MUST be stable enough for deterministic lookup and route/reference use.
- The physical identifier representation remains unresolved. UUID, integer, slug, external ID or any other strategy is **not** selected here.

#### `title`

- MUST represent the user-facing certification name.
- The current evidence does not establish localization, uniqueness, maximum length or external canonical naming rules.

#### `issuer`

- MUST represent issuer attribution as a value associated with Certification.
- MUST NOT be interpreted as proof of an independent Issuer entity, identifier, lifecycle or persistence boundary.

#### `level`

- Represents descriptive certification level.
- The current evidence does not establish a closed level vocabulary. Therefore the values observed in synthetic data MUST NOT be converted into a domain enum by inference.

#### `summary`

- Represents descriptive certification summary text.
- The current evidence does not establish formatting, localization, length or rich-text semantics.

### Certification invariants

The domain contract preserves the following invariants:

1. A Certification MUST have a usable identity.
2. Certification identity MUST be unique within the certification domain.
3. Lookup by Certification identity MUST resolve exactly one certification or no certification.
4. An unknown Certification identity MUST NOT resolve to fabricated/fallback certification data.
5. A Certification MUST have a user-facing title.

### Explicitly unresolved

This task does not define:

- official/external source ownership;
- pricing;
- prerequisites;
- renewal rules;
- live issuer synchronization;
- certification-user progress;
- external catalog ingestion;
- certification lifecycle states.

## 2. Issuer Attribution

### Classification

**Value concept owned by Certification.**

`issuer` is currently modeled only as textual attribution on a Certification. No source-backed evidence establishes an independently addressable Issuer domain record.

### Contract

- Certification MAY carry issuer attribution.
- Issuer attribution is currently a descriptive value, not an independently identified record.
- No independent `issuerId`, issuer lifecycle, issuer metadata model, issuer ownership model or issuer repository is introduced here.

### Promotion rule

Issuer MAY be promoted to an independent domain record only after a governed decision establishes at least one of the following needs:

- independent issuer identity/addressability;
- shared issuer reference across records requiring normalized ownership;
- issuer-specific lifecycle/metadata;
- external issuer synchronization;
- issuer-level permissions or behavior.

Until then, normalization convenience alone is insufficient justification.

## 3. Practice

### Classification

**Domain record candidate with evidence-backed identity and descriptive attributes.**

The frontend represents distinct practice records by `id`, but the product does not yet establish whether Practice is a global catalog record, a user-owned item, an assignment, or another aggregate. Therefore the record shape is contractable while ownership/lifecycle remains unresolved.

### Required contract fields

- `id` — practice identity token;
- `title` — user-facing practice name;
- `description` — user-facing practice description;
- `status` — one value from the closed PracticeStatus set.

### PracticeStatus

**Closed value set:**

- `now`
- `next`
- `quarantine`

### Status semantics boundary

The frontend proves that every represented Practice has one of these three values. It does **not** prove that the user can mutate a persisted Practice between statuses.

Therefore:

- `Practice.status` MUST use the closed vocabulary when represented in the domain contract.
- Unsupported values MUST be rejected rather than silently mapped.
- Transition rules are unresolved.
- Mutation authority is unresolved.
- Persisted lifecycle semantics are unresolved.
- The currently selected UI filter status MUST NOT be treated as a domain mutation.

### Practice invariants

1. A represented Practice MUST have an identity.
2. A represented Practice MUST have a title.
3. `status` MUST be exactly one of `now | next | quarantine`.
4. Unsupported status values MUST NOT be silently accepted as equivalent to a known state.

### Explicitly unresolved

- whether Practice is globally shared or user-specific;
- ownership;
- assignment/enrollment relationships;
- persisted status transitions;
- ordering/prioritization rules;
- completion state;
- scheduling/deadlines;
- relationships with Certification;
- relationships with Evidence.

## 4. Evidence Reference

### Classification

**Unresolved domain record candidate.**

The frontend demonstrates a distinct local item containing a URL, but its durable identity, ownership and subject relationship are intentionally undefined.

### Evidence-backed value

The only domain-relevant value currently justified is:

- `url` — a non-empty submitted evidence reference value.

The current numeric `Date.now()` value is a UI/session key only and is explicitly excluded from the durable domain contract.

### Evidence invariants currently safe to preserve

1. An Evidence reference MUST NOT be accepted as an empty/blank submitted value.
2. Durable identity strategy is unresolved and MUST NOT be derived from the frontend timestamp key.
3. If URL remains the persisted evidence representation, URL syntax/scheme policy MUST be defined explicitly before backend enforcement.

### URL boundary

Browser `type="url"` behavior and UI copy mentioning HTTP(S) do not establish a complete backend validation rule. This contract therefore does not yet require a specific URL parser, scheme allowlist, normalization rule or canonicalization behavior.

### Explicitly unresolved

- what Evidence is evidence of;
- owner/subject;
- Certification relationship;
- Practice relationship;
- User/Account relationship;
- file/blob support;
- evidence taxonomy;
- verification/review status;
- provenance/audit metadata;
- lifecycle/deletion policy;
- remote storage.

## 5. Concepts explicitly excluded from the current model

The following concepts are **not part of the authorized Stage 04 domain model contract at this point** because the merged evidence does not establish them:

- User;
- Account;
- Profile;
- Enrollment;
- Progress;
- Completion;
- Authentication identity;
- Authorization role;
- Reviewer/Verifier;
- persisted analytics/history.

Their absence is deliberate. Common product patterns are not evidence.

## 6. Relationship contract

### Relationships currently safe to state

- Certification has issuer attribution as an owned value.
- Practice has one PracticeStatus value.

### Relationships explicitly unresolved

No persisted association/cardinality is defined for:

- Certification ↔ Practice;
- Certification ↔ Evidence;
- Practice ↔ Evidence;
- User/Account ↔ any concept;
- Evidence ↔ reviewer/verifier;
- Certification ↔ independent Issuer record.

No one-to-one, one-to-many, many-to-many, foreign-key or aggregate ownership rule may be inferred from this document.

## 7. Identity contract

The domain contract distinguishes **identity requirement** from **identifier implementation**.

### Required identity

Certification and Practice require stable logical identity because the current experience addresses distinct records by `id`.

### Unresolved physical representation

This contract does not choose:

- UUID;
- ULID;
- integer/autoincrement;
- slug;
- external provider identifier;
- composite key;
- timestamp-derived key.

Evidence does not yet have a durable identity strategy.

## 8. Validation boundary

Technology-neutral validation rules confirmed in this task are limited to:

- Certification identity presence/stability/uniqueness within its domain;
- Certification exact lookup semantics;
- Certification user-facing title requirement;
- Practice identity/title requirements;
- Practice closed status vocabulary;
- Evidence non-blank reference submission if Evidence becomes durable.

All other constraints require a later source-backed decision.

## 9. Lifecycle boundary

No complete lifecycle is currently proven for Certification, Practice or Evidence.

In particular, this task does not define:

- create/update/delete authority;
- archival rules;
- soft-delete semantics;
- versioning;
- timestamps;
- optimistic concurrency;
- status transition graphs;
- ownership transfer;
- retention policy.

Those concerns must follow the relevant later Backend & Data workstream rather than being introduced for storage convenience.

## 10. Persistence and API boundary

This model is intentionally persistence-neutral.

It MUST NOT be interpreted as choosing:

- relational versus document storage;
- SQL dialect/database vendor;
- table/collection names;
- ORM/data mapper;
- migration framework;
- indexes;
- foreign keys;
- API style or route structure;
- serialization schema;
- authentication/authorization technology;
- object storage provider.

A physical data model must trace each implementation choice back to this contract or to an explicit later governed decision.

## 11. Decision register for subsequent work

The following questions remain intentionally open and must be resolved before the relevant physical/runtime implementation:

1. Does Issuer remain Certification-owned metadata or become an independent domain record?
2. Is Practice a global catalog concept, user-specific concept, assignment, or another bounded record?
3. What subject/owner does Evidence belong to?
4. Which Certification/Practice/Evidence relationships are authoritative, and with what cardinality?
5. Which identifier representation should each durable concept use?
6. Which Practice status transitions, if any, are valid persisted domain transitions?
7. What URL validation/normalization policy applies to durable Evidence?
8. Which concepts are mutable and by whom?
9. Which external data remains synthetic versus becomes authoritative/live?
10. Which invariants must be enforced in domain/service logic, persistence constraints, or both?

## 12. Handoff posture

`04.002` establishes a bounded, reviewable domain contract without creating speculative infrastructure.

The safe handoff is:

- preserve Certification as an independently identifiable domain record;
- preserve issuer as Certification-owned attribution until an explicit promotion decision;
- preserve Practice as an identifiable record candidate with the closed `now | next | quarantine` status vocabulary;
- preserve Evidence as an unresolved durable concept with only a non-blank reference rule currently justified;
- exclude User/Account/Progress and unsupported relationships;
- defer physical schema, persistence, API, auth and storage decisions to later governed tasks.

Any downstream implementation that exceeds these boundaries requires new evidence or explicit governed authorization.