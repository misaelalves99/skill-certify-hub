# Stage 04 — Service Implementation Readiness

## Purpose

This document materializes the governed implementation-readiness contract for `task.skillcertify.04.009` within the Stage 04 workstream **API, Services & Contract Integrity**.

It reconciles the merged contracts:

- `API_SERVICE_CONTRACT_BASELINE.md`;
- `SERVICE_BEHAVIOR_ERROR_CONTRACT.md`;
- `TRANSACTION_IDENTITY_AUTHORIZATION_BASELINE.md`;
- `AUTHORIZATION_SECURITY_CONTRACT.md`.

The goal is to determine which service capabilities are ready for concrete runtime implementation, which remain conditional, which are blocked, and what verification evidence must exist before a transport/runtime choice is accepted.

This document does **not** implement routes/endpoints, select REST/GraphQL/RPC, choose hosting/backend runtime, choose persistence technology, select an authentication provider or create a User/Account model.

## 1. Readiness vocabulary

### `ready`

The capability has sufficient governed domain, service, error and security semantics to begin a bounded runtime implementation without inventing missing business meaning.

`ready` does not mean a transport, persistence provider or route shape has already been selected.

### `conditionally_ready`

The capability has enough semantics for further design or partial implementation preparation, but at least one material domain/ownership/security/runtime decision must be resolved before it can safely become an authoritative runtime behavior.

### `blocked`

The capability lacks required domain authority, ownership/lifecycle semantics, security rules or persistence meaning. Implementing it now would require invention rather than execution of an approved contract.

## 2. Capability readiness matrix

| Capability | Readiness | Rationale |
| --- | --- | --- |
| List Certifications | `ready` | Approved read semantics, approved representation, identity-neutral security posture, no mutation/transaction requirement |
| Get Certification by exact identity | `ready` | Exact-match lookup, deterministic `not_found`, approved representation, identity-neutral security posture |
| Remote Certification filtering/search | `conditionally_ready` | UI demonstrates local filtering only; remote query semantics, pagination/search grammar and ordering remain unresolved |
| Read Practices | `conditionally_ready` | Record shape/status vocabulary exist, but ownership/visibility policy is unresolved |
| Mutate Practice status | `blocked` | No mutation authority, ownership model, transition graph, authorization or transaction contract |
| Durable Evidence create/list/delete | `blocked` | No durable identity, ownership, lifecycle, storage or authorization contract |
| Evidence upload/attachment/review | `blocked` | No governed durable Evidence domain behavior or security policy |
| User/Account/Progress APIs | `blocked` | No governed domain model exists |

## 3. Minimum implementation-safe service surface

The smallest current runtime surface that can be implemented without inventing unsupported business semantics is:

1. list Certifications;
2. get Certification by exact identity.

No other capability is required to make these two reads valid.

A concrete implementation of this minimum surface MUST preserve:

- Certification fields: `id`, `title`, `issuer`, `level`, `summary`;
- `issuer` as Certification-owned attribution rather than an inferred standalone entity;
- exact identity lookup semantics;
- unknown identity → deterministic `not_found`;
- successful empty collection distinct from `service_failure`;
- no User/Account/Progress fields;
- no authentication requirement by convention;
- no Practice/Evidence mutation exposure.

## 4. What `ready` authorizes

For the two Certification reads, `ready` authorizes later governed work to select and implement the smallest concrete service/runtime boundary that preserves the merged contracts.

It does **not** by itself authorize:

- REST;
- GraphQL;
- RPC/tRPC;
- server actions as canonical service transport;
- physical URL/path design;
- OpenAPI/GraphQL schema tooling;
- database/ORM selection;
- remote/cloud deployment;
- cache semantics;
- external/live certification sources.

Those choices remain reviewable implementation decisions and must be justified by the repository/runtime needs rather than framework convention.

## 5. Runtime/transport selection criteria

A concrete transport/runtime candidate may be accepted only if it can demonstrate all applicable criteria below.

### Contract fidelity

It must preserve the semantic outcome vocabulary and current Certification representation without transport-specific distortion.

### Repository fit

It must integrate with the existing Next.js/Node application without requiring speculative platform complexity.

### Local reproducibility

A reviewer must be able to run and verify the bounded service behavior locally from the repository using documented commands.

### Deterministic testing

The selected approach must allow deterministic contract tests for success, `not_found` and `service_failure` distinctions.

### Compatibility visibility

Material request/response/error changes must be reviewable through schema diff, generated contract diff or an equivalent deterministic mechanism appropriate to the selected technology.

### Security compatibility

The approach must not force invented authentication/authorization requirements onto currently identity-neutral Certification reads.

### Failure transparency

The runtime must allow infrastructure/implementation failure to remain distinguishable from valid empty data and domain absence.

### Operational proportionality

The technology must be proportionate to the current two-read service surface. Additional infrastructure is not justified merely because it is common in larger systems.

## 6. Persistence boundary

The readiness of Certification reads does not automatically require a database.

Current governed data remains synthetic and repository-local. A concrete implementation may use an in-process/service module boundary first if that is the smallest faithful runtime implementation.

A persistence provider becomes justified only when a governed capability requires durable state or when explicit Stage 04 authority/source introduces that requirement.

Therefore `04.009` does not convert the earlier migration/persistence contracts into a mandate to select a database now.

## 7. Service-module boundary

Before transport is selected, the runtime design should preserve a service/domain boundary that can be tested independently of HTTP/GraphQL/RPC encoding.

For the minimum Certification surface, the conceptual operations remain:

- list governed Certifications;
- resolve one Certification by exact identity.

Transport adapters may later call these operations, but transport parsing/status-code/schema concerns must not become the only place where domain/service semantics exist.

## 8. Required contract tests for future implementation

A concrete runtime implementation of the minimum surface MUST provide deterministic evidence covering at least:

1. list Certifications succeeds and returns only approved contract fields;
2. empty list remains a successful empty collection when the governed source is empty;
3. known Certification identity resolves exactly one matching record;
4. unknown Certification identity resolves to `not_found`;
5. unknown identity never falls back to another record or synthetic placeholder;
6. infrastructure/service failure is distinguishable from `not_found`;
7. infrastructure/service failure is distinguishable from successful empty collection;
8. Certification reads do not require authentication under current governance;
9. no User/Account/Progress fields or relationships appear;
10. no Practice mutation or durable Evidence operation is accidentally exposed.

## 9. Compatibility evidence contract

When a concrete request/response schema exists, review evidence should include an explicit compatibility artifact or equivalent deterministic comparison.

At minimum, reviewers must be able to detect:

- removed/renamed Certification fields;
- changed identity semantics;
- changed unknown-identity behavior;
- newly mandatory identity/auth context;
- new business concepts added to the representation;
- error-category collapse;
- new remote filtering/search semantics.

An additive transport field is not automatically safe if it introduces a new domain concept.

## 10. Service-failure evidence contract

A concrete implementation must demonstrate at least one controlled failure path proving that implementation/infrastructure failure does not masquerade as:

- `not_found`;
- successful empty collection;
- stale/fabricated Certification success.

The mechanism used to induce the failure is implementation-specific, but the evidence must be deterministic and safe for local/test execution.

No production fault injection is authorized by this task.

## 11. Security readiness

### Certification reads

Security posture is `ready` for identity-neutral access because current governance establishes no principal requirement.

A concrete runtime must therefore avoid accidental coupling to an auth subsystem that would make these reads fail merely because authentication infrastructure is unavailable.

### Practice reads

Security posture remains `conditionally_ready` because the visibility/ownership model is unresolved.

### Practice/Evidence mutations

Security posture remains `blocked` because missing domain authority cannot be repaired by middleware, login state or generic roles.

## 12. Mutation readiness

No authoritative mutation is implementation-ready after `04.009`.

Consequences:

- no write transaction is required for the minimum runtime surface;
- no idempotency key/retry contract is needed yet;
- no concurrency policy is required yet;
- no role/permission matrix is required yet;
- no CSRF/cookie/token design is required yet for these reads.

These concerns become mandatory only when a governed mutation or protected capability is introduced.

## 13. Practice conditional-read boundary

Practice reads may be prepared only at the service-contract/design level until ownership/visibility is resolved.

A future decision must answer whether Practice is:

- global/public-like;
- user-specific;
- assigned;
- enrollment-scoped;
- otherwise owned.

Until then, exposing Practice records through a concrete service risks accidentally choosing an authorization policy by implementation convenience.

## 14. Evidence blocked boundary

Durable Evidence remains blocked because current governance still lacks:

- durable identity;
- owner/subject;
- lifecycle;
- URL/security policy;
- persistence/storage semantics;
- authorization policy;
- transaction behavior;
- deletion/review semantics.

The current browser-session `Date.now()` key must never be promoted into a durable identifier merely because a persistence layer is introduced.

## 15. Remote filtering/search boundary

The frontend demonstrates local Certification filtering, but this does not establish a remote query API.

Remote filtering/search remains `conditionally_ready` pending explicit decisions on:

- supported filter fields;
- exact versus fuzzy matching;
- case/normalization behavior;
- pagination;
- ordering;
- empty-query behavior;
- validation/errors;
- compatibility expectations.

A concrete transport should not expose arbitrary query parameters before these semantics are governed.

## 16. Hosting and deployment boundary

`04.009` does not select a hosting provider or external deployment topology.

A future runtime choice should prefer the smallest topology that:

- runs with the existing application;
- supports deterministic local verification;
- preserves service/error contracts;
- does not require production credentials for basic development/testing;
- does not introduce unnecessary remote dependencies.

Remote/cloud infrastructure requires separate explicit justification and evidence.

## 17. Implementation evidence package

Before a future concrete runtime implementation can be accepted, the task/PR evidence should include as applicable:

- selected transport/runtime and rationale against Section 5 criteria;
- exact files/modules added or changed;
- deterministic contract tests;
- compatibility/schema-diff evidence;
- controlled `service_failure` evidence;
- proof that Certification reads remain identity-neutral;
- proof that blocked Practice/Evidence mutations remain unavailable;
- current `npm run quality` PASS;
- successful production build;
- clean working tree;
- no real/private user data or production secrets.

## 18. Implementation sequence recommendation

The safest downstream sequence is:

1. choose the smallest service-module/runtime shape for Certification reads;
2. implement list/get behavior behind that boundary;
3. add deterministic contract tests before adding broader capabilities;
4. add a transport adapter only when its concrete need is justified;
5. preserve compatibility/error evidence;
6. avoid adding persistence/auth/mutations until separately governed.

This sequence is a bounded implementation posture, not a mandate for a particular architecture.

## 19. Decisions still unresolved after 04.009

The following remain unresolved and must not be filled by convention:

- transport/protocol selection;
- physical route/operation naming;
- schema tooling;
- service hosting topology;
- database/query layer;
- persistence provider;
- caching strategy;
- remote filtering/search semantics;
- Practice ownership/visibility;
- Practice mutation lifecycle;
- Evidence durable model;
- User/Account/principal model;
- authentication provider;
- authorization roles/permissions;
- external/live certification source integration;
- production deployment/secrets/observability stack.

## 20. Readiness decision

Stage 04 service-contract work now supports the following bounded conclusion:

- **READY:** Certification collection read;
- **READY:** Certification exact-identity detail read;
- **CONDITIONALLY READY:** remote Certification filtering/search;
- **CONDITIONALLY READY:** Practice read;
- **BLOCKED:** Practice mutation;
- **BLOCKED:** all durable Evidence operations;
- **BLOCKED:** User/Account/Progress service surfaces.

The smallest safe next runtime implementation is therefore a Certification-only read service boundary with deterministic contract tests and no invented auth/persistence/mutation behavior.

## 21. Handoff posture

`04.009` closes the current API/service contract-readiness layer without creating a speculative backend runtime.

Downstream work MUST:

- keep the initial runtime surface limited to the two `ready` Certification reads unless new governance expands it;
- preserve exact lookup and deterministic `not_found`;
- preserve `service_failure` distinction;
- keep Certification reads identity-neutral;
- keep Practice/Evidence mutations blocked;
- justify transport/runtime/persistence choices through evidence rather than convention;
- produce deterministic contract/compatibility/failure evidence when implementation begins.

Any runtime implementation beyond this readiness boundary requires new governed evidence or explicit human authorization.
