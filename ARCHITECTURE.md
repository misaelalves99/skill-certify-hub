# Skill Certify Hub — Modular Architecture

## Status

- Decision: approved by human authority for `task.skillcertify.02.004`.
- Stage: 02 — Product Foundation.
- Scope: define proportionate module and folder boundaries without anticipating future product features.

## Objective

Keep the current Next.js foundation simple while establishing an explicit rule for how product code may grow. Physical folders are created only when concrete code and responsibility justify them.

## Current physical structure

```text
skill-certify-hub/
├── app/                 # Next.js routing and route composition
├── public/              # public/static assets
├── tests/               # repository-level automated checks
├── ARCHITECTURE.md      # architecture contract and decision record
└── root configuration   # package, TypeScript, Next.js and lint configuration
```

`modules/` and `shared/` are intentionally not created while empty.

## Target growth model

When concrete product code requires these boundaries, the repository may evolve to:

```text
skill-certify-hub/
├── app/                 # framework routing and composition
├── modules/             # concrete product capabilities only
│   └── <module>/
├── shared/              # proven cross-module reuse only
├── tests/               # repository-level automated checks
├── public/              # public/static assets
└── ARCHITECTURE.md
```

This is a growth contract, not authorization to pre-create speculative modules.

## Responsibilities

### `app/`

Owns Next.js framework concerns: routes, layouts, route-level composition, global application wiring and framework-required files.

It may compose product modules once those modules exist. Business/domain logic should not accumulate here merely because a route needs it.

### `modules/<module>/`

A module represents a concrete product capability with a coherent responsibility that exists in implemented scope.

A module is created only when current code justifies the boundary. It must not be introduced for roadmap-only features, aesthetics, symmetry or hypothetical reuse.

Each module owns its internal implementation. Other modules should consume an intentional public surface rather than import another module's internals.

### `shared/`

Contains code whose reuse across real boundaries is demonstrated. It is not a default home for generic `utils`, future abstractions or code with unclear ownership.

Code should remain close to its owning module until reuse is proven.

### `tests/`

Contains repository-level checks and tests that are not naturally colocated with a future module. The current foundation quality tests remain here.

### `public/`

Contains assets exposed through the framework's public/static asset mechanism. It does not own application or domain logic.

## Dependency rules

The intended dependency direction is:

```text
app
 ↓ may compose/import
modules
 ↓ may use proven shared code
shared
```

Rules:

1. `app/` may depend on module public surfaces and `shared/` code.
2. A module may depend on `shared/` when the shared abstraction is already justified.
3. `shared/` must not depend on product modules or `app/`.
4. Product modules must not depend on `app/`.
5. One module must not import another module's private/internal implementation.
6. Cross-module dependencies must be explicit and reviewed when they first become necessary.
7. Circular dependencies are not accepted.

## Boundary creation criteria

Create a new product module only when all of the following are true:

- the capability exists in the current implementation scope;
- its responsibility can be stated clearly;
- there is enough concrete code or ownership pressure to justify separation;
- the boundary improves change isolation or comprehension now;
- its dependency direction can be described without inventing future infrastructure.

Create or move code into `shared/` only when reuse is demonstrated across real consumers and ownership no longer belongs naturally to one module.

## Out of scope for this decision

This task does not authorize:

- certification, roadmap, progress, portfolio, evidence or other future product modules merely because they are plausible;
- database schemas, ORM setup, migrations or persistence boundaries;
- domain entity modelling;
- authentication or authorization architecture;
- API/service architecture;
- state-management libraries;
- design-system extraction;
- a `src/` migration;
- dependency additions;
- broad refactors of the existing scaffold.

Those decisions require the task/stage that owns them and fresh evidence at that time.

## Deferred decisions / unknowns

The following remain intentionally open:

- the first concrete product module and its name;
- internal module folder conventions;
- whether module tests should be colocated or centralized as the suite grows;
- whether a dedicated application/service layer becomes necessary;
- persistence and external integration boundaries;
- enforcement tooling for dependency boundaries;
- whether scale eventually justifies moving runtime code under `src/`.

A deferred decision must not be resolved simply to make the tree look complete.

## Architecture decision record

### ADR-001 — Adopt lazy, capability-based modularization

**Context:** The repository currently contains a minimal Next.js + TypeScript product foundation. Stage 02 requires a modular folder architecture, but concrete product capabilities have not yet been implemented. Pre-creating domain folders would encode assumptions from future work.

**Decision:** Keep `app/` as the current physical runtime boundary. Establish `modules/` as the future home for concrete product capabilities and `shared/` as the future home for proven cross-boundary reuse, but do not create either directory while empty. Materialize boundaries only when current implementation evidence justifies them.

**Consequences:**

- the repository remains small and honest about its current state;
- future capabilities have a defined destination and dependency direction;
- speculative architecture is avoided;
- each new material module boundary remains reviewable when introduced;
- some structural decisions intentionally remain deferred until real code exists.

## Review checklist

Before accepting a structural change, verify:

- Is the boundary required by current scope rather than future speculation?
- Is ownership/responsibility explicit?
- Are dependencies one-directional and understandable?
- Is shared code proven to be shared?
- Does the change avoid schema/migration work owned elsewhere?
- Does the existing quality baseline still pass?
- Has a human reviewed any material architectural decision?
