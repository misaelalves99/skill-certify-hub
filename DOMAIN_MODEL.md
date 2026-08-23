# Skill Certify Hub — Conceptual Domain Model

## Status

- Decision: approved by human authority for `task.skillcertify.02.007`.
- Stage: 02 — Product Foundation.
- Workstream: Module & Domain Architecture.
- Scope: conceptual domain language and relationships only.

## Objective

Define the smallest domain vocabulary needed to explain the current product direction and guide future module ownership without choosing a physical database model, ORM, API shape, backend runtime, or persistence strategy.

This document is a conceptual contract. It does not authorize implementation of the concepts as modules, tables, services, routes, or user-facing features.

## Core concepts

### `Certification`

Represents an official professional certification that Skill Certify Hub may catalog, present, or organize.

At the conceptual level, a certification has its own identity and is associated with the organization responsible for issuing it.

This concept does not yet define exam structure, prerequisites, renewal rules, pricing, delivery providers, preparation courses, or persistence fields.

### `Issuer`

Represents the official organization responsible for a certification.

An issuer may be associated with multiple certifications. The issuer concept exists to preserve provenance and ownership of the certification itself; it is not a generic company or partner model.

### `CertificationPath`

Represents a meaningful conceptual grouping or ordering of certifications when a progression relationship is justified.

A path may reference multiple certifications. A certification does not need to belong to a path, and the existence of this concept does not require the product to expose path-building or roadmap features now.

The model intentionally does not define ordering mechanics, prerequisites, recommendation logic, path ownership, or persistence representation.

### `UserProgress`

Represents a future user's relationship to a certification or certification path for the limited purpose of expressing progress/tracking conceptually.

This concept does not define authentication, a `User` persistence entity, progress percentages, completion states, evidence, achievements, dates, scoring, or synchronization behavior.

`UserProgress` remains conceptual until a later governed task supplies concrete product requirements for tracking behavior.

## Conceptual relationships

```text
Issuer
  └── offers / is responsible for ──> Certification

CertificationPath
  └── groups / orders ──> Certification

UserProgress
  └── may reference ──> Certification
  └── may reference ──> CertificationPath
```

These arrows express domain meaning only. They are not foreign keys, ownership/cascade rules, API dependencies, or storage relationships.

## Invariants and semantic rules

1. A `Certification` must be understood as an official certification rather than a generic course, skill, badge, tutorial, or learning resource.
2. A `Certification` is conceptually attributable to an `Issuer`; issuer provenance must not be replaced by an invented generic provider relationship.
3. `CertificationPath` is optional and exists only where a meaningful certification progression/grouping can be justified.
4. A certification must remain valid as a domain concept even when it is not part of a `CertificationPath`.
5. `UserProgress` describes a user's conceptual tracking relationship; it must not be treated as authorization to design identity, authentication, persistence, scoring, or evidence systems.
6. Conceptual relationships do not imply database cardinalities or implementation ownership.
7. None of these concepts creates a physical `modules/` boundary by itself. The criteria in `ARCHITECTURE.md` still govern module creation.
8. New domain concepts require current product evidence and review; they must not be added solely because they are plausible future features.

## Relationship to modular architecture

`ARCHITECTURE.md` establishes a lazy, capability-based modularization contract. This domain model complements that contract by providing approved vocabulary, not physical folders.

A future module may use one or more of these concepts only when implemented product scope justifies the module boundary. Concept names and module names are not required to match one-to-one.

For example, approval of `Certification` as a domain concept does not authorize creating `modules/certification/` today.

## Explicitly deferred concepts

The following concepts are intentionally not part of the approved core model in this task:

- `Skill`
- `Evidence`
- `Roadmap`
- `Portfolio`
- `Recommendation`
- `Exam`
- `Course`
- authentication/identity entities
- billing/subscription concepts
- AI-specific concepts

A later task may introduce one of them only when concrete requirements justify it.

## Physical data model is out of scope

This task does not decide or authorize:

- SQL/NoSQL tables or collections;
- primary/foreign keys;
- cardinality constraints at storage level;
- Prisma, Drizzle, TypeORM, Sequelize, or another ORM;
- migrations;
- database provider or hosting;
- API DTOs or transport schemas;
- backend services/repositories;
- authentication/user storage;
- seed data;
- persistence-specific IDs or timestamps.

Those decisions must be made by the governed task that owns persistence or feature implementation.

## Architecture decision record

### ADR-002 — Adopt a minimal conceptual certification domain vocabulary

**Context:** The repository has an approved modular growth contract but intentionally deferred domain entity modelling. Stage 02 now requires enough conceptual language to explain the product direction without prematurely selecting physical implementation boundaries.

**Decision:** Adopt `Certification`, `Issuer`, `CertificationPath`, and `UserProgress` as the minimum approved conceptual vocabulary. Treat their relationships as semantic only. Keep all physical persistence, service, API, authentication, and module decisions deferred.

**Consequences:**

- future tasks have a stable vocabulary for discussing certification-domain responsibilities;
- provenance through `Issuer` is explicit;
- path/progress concepts can be discussed without prematurely implementing roadmap or tracking features;
- conceptual entities cannot be used as automatic justification for folders or database tables;
- future domain expansion remains evidence-driven and human-reviewable.

## Review checklist

Before extending this model, verify:

- Is the new concept required by current approved product scope?
- Is it distinct from the four approved core concepts?
- Can its responsibility be explained without selecting storage or framework details?
- Does it avoid implying a future feature that has not been approved?
- Does it preserve the lazy module-creation rules in `ARCHITECTURE.md`?
- Has a human reviewed any material change to domain boundaries or terminology?
