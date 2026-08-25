# Stage 04 — Service Behavior & Error Contract

## Purpose

This document materializes the governed contract for `task.skillcertify.04.006` within the Stage 04 workstream **API, Services & Contract Integrity**.

It refines the merged `API_SERVICE_CONTRACT_BASELINE.md` into deterministic service-operation semantics while remaining transport-neutral. It does not define REST, GraphQL, RPC, physical routes, authentication, authorization, persistence provider, deployment runtime or backend hosting topology.

## 1. Contract posture

The contract defines behavior in terms of **service operations** and **semantic outcomes** rather than endpoints or protocol details.

An operation is authorized only when its domain meaning is already supported by merged Stage 04 evidence.

Current operation classes are:

- authorized read behavior;
- bounded read candidate;
- blocked mutation;
- frontend-local behavior.

A future transport may encode these operations differently, but it must preserve their meaning and error distinctions.

## 2. Semantic outcome vocabulary

The following semantic outcomes are canonical at the service-contract level where applicable:

### `success`

The requested governed behavior completed and the returned representation satisfies the current contract.

### `not_found`

A valid lookup request addresses no existing record.

This is strongly governed for Certification detail lookup.

### `invalid_input`

The request fails an input rule that is actually defined by the governed contract.

Malformed transport syntax alone may be rejected by a future transport layer, but domain validation must not invent unsupported identifier grammars.

### `unsupported_operation`

The caller requests behavior that is not currently authorized by the domain/service contract.

### `unsupported_state`

The caller supplies or attempts to reach a state not permitted by a governed closed set or lifecycle.

### `service_failure`

The service could not complete due to implementation/infrastructure failure rather than domain absence or caller-invalid input.

### Reserved security outcomes

Authentication/authorization-specific outcomes remain reserved for `04.007–04.008` and are not defined here.

## 3. Operation: list Certifications

### Classification

**Authorized service-read contract candidate.**

### Input

No domain input is currently required by the approved behavior.

This contract does not authorize pagination, sorting, search, remote filtering or issuer-specific query parameters.

### Success semantics

A successful operation MUST return a collection containing zero or more Certification representations.

Each represented Certification MUST preserve the currently approved fields:

- `id`;
- `title`;
- `issuer` attribution;
- `level`;
- `summary`.

The service MUST NOT:

- invent User/Account/Progress fields;
- promote `issuer` into an independent entity by serialization convenience;
- fabricate relationships absent from the domain contract;
- replace an empty collection with a failure solely because no records exist.

### Failure semantics

Infrastructure or implementation failure MUST produce `service_failure` rather than successful empty data.

### Compatibility rules

Removing or renaming any approved field consumed by the frontend is potentially breaking and requires explicit review.

Changing `issuer` from an owned attribution value into a relationship/entity reference is a domain-model change, not a harmless representation change.

## 4. Operation: get Certification by identity

### Classification

**Authorized service-read contract candidate with deterministic not-found semantics.**

### Input

One Certification identity token.

Current domain evidence requires stable exact identity semantics but does not define UUID, integer, slug grammar, maximum length or normalization rules.

Therefore:

- future transport parsing MAY reject syntactically malformed transport input;
- domain/service logic MUST NOT invent a new identifier grammar in this task;
- identity normalization MUST NOT alter exact-match semantics unless later governed.

### Success semantics

For an existing identity, the operation MUST:

1. resolve exactly one Certification;
2. preserve the requested record identity;
3. return only approved Certification contract fields unless later additive fields are separately governed;
4. avoid fallback/substitution behavior.

### `not_found` semantics

For a well-formed lookup whose identity does not exist:

- return `not_found`;
- do not return another Certification;
- do not return a fabricated placeholder record;
- do not encode absence as a successful empty Certification object;
- do not collapse the absence into `service_failure`.

### `invalid_input` boundary

`invalid_input` is appropriate only for rules actually governed at the service/transport boundary.

A future implementation must distinguish:

- malformed transport input, when the selected transport defines such rules;
- validly conveyed but unknown Certification identity, which is `not_found`.

The exact transport error encoding remains unresolved.

## 5. Practice read contract

### Classification

**Bounded read candidate, not yet a fully authorized runtime service.**

Practice records currently have:

- `id`;
- `title`;
- `description`;
- `status`.

`status` is the closed set:

- `now`;
- `next`;
- `quarantine`.

### Safe read semantics

If a later implementation exposes Practice reads, it MUST:

- preserve Practice identity;
- preserve title and description;
- return only a supported `status` value;
- surface unsupported persisted values as integrity/service errors rather than silently mapping them into the closed set;
- avoid implying ownership, assignment, enrollment or personalization not yet governed.

### Filtering boundary

Remote status filtering remains optional and unresolved.

If later introduced, a supplied status outside the closed set MUST NOT be silently coerced or mapped. The appropriate semantic outcome would be `invalid_input` or `unsupported_state`, depending on the final operation contract.

## 6. Practice mutation contract

### Classification

**Blocked.**

No authoritative Practice mutation is authorized by current evidence.

In particular, the frontend status tabs are browser filter state and MUST NOT be translated into a backend operation that mutates `Practice.status`.

Any request equivalent to changing Practice status MUST currently resolve as `unsupported_operation` unless a later governed task establishes:

- mutation authority;
- ownership model;
- allowed transition graph;
- persistence semantics;
- concurrency/conflict behavior where relevant;
- authorization rules.

No silent success/no-op is permitted for a blocked mutation.

## 7. Evidence behavior contract

### Classification

**Frontend-local; durable service behavior blocked.**

The current Evidence UI demonstrates only browser-session URL collection.

The following service operations are NOT authorized by this contract:

- create durable Evidence;
- list durable Evidence;
- delete durable Evidence;
- clear a persisted Evidence collection;
- upload a file/blob;
- attach Evidence to Certification;
- attach Evidence to Practice;
- associate Evidence with User/Account;
- verify/review Evidence.

A future caller attempting such behavior before governance exists should receive `unsupported_operation`, not a speculative implementation.

The current frontend non-blank URL rule remains a local interaction rule; it does not establish a full durable Evidence service validation policy.

## 8. Error precedence and distinction

Where multiple conditions could appear to apply, future implementations should preserve this precedence reasoning:

1. Transport cannot parse/accept the request at all → transport-level rejection, representation unresolved here.
2. Request reaches service but violates an actually governed input rule → `invalid_input`.
3. Operation itself is not governed/authorized → `unsupported_operation`.
4. Requested state/value violates a governed closed set/lifecycle → `unsupported_state`.
5. Valid identifiable lookup finds no record → `not_found`.
6. Infrastructure/implementation prevents completion → `service_failure`.
7. Otherwise → `success`.

This ordering is semantic guidance, not a protocol status-code table.

## 9. Error integrity requirements

All future concrete implementations MUST preserve these properties:

- deterministic semantic category;
- stable distinction between caller/domain errors and infrastructure failures;
- no fabricated success payload on failure;
- no secrets, credentials, connection strings, stack traces or sensitive internal details in client-facing errors;
- enough internal observability for maintainers to diagnose `service_failure` without leaking internals to clients;
- no silent coercion of unsupported domain values unless explicitly governed;
- no converting blocked operations into successful no-ops for client convenience.

## 10. Representation contract

This task does not prescribe a universal response envelope.

A future transport may use status codes, typed unions, schema errors, exceptions translated at a boundary, or another mechanism, provided that the client-visible behavior preserves the semantic distinctions in this document.

Representation decisions MUST NOT change domain semantics.

For example:

- `not_found` must remain distinguishable from `service_failure`;
- `unsupported_operation` must remain distinguishable from successful no-op;
- `invalid_input` must remain distinguishable from unknown identity;
- a successful empty list must remain distinguishable from service failure.

## 11. Compatibility and versioning contract

Service contract evolution MUST be change-controlled and reviewable.

### Potentially breaking changes

The following are breaking unless explicitly governed otherwise:

- removing/renaming approved Certification fields;
- changing Certification identity matching semantics;
- changing unknown Certification lookup from `not_found` to fallback/success;
- changing meaning or vocabulary of `Practice.status`;
- introducing mandatory ownership/account context for currently unauthenticated candidate reads without a governed transition;
- converting previously blocked Evidence behavior into durable mutation without a governed domain/security decision;
- collapsing distinct error categories into one ambiguous client outcome.

### Additive changes

An additive serialized field is not automatically compatible from a domain-governance perspective. If the field introduces a new business concept or relationship, it requires source-backed authority even if existing clients ignore it.

### Schema-diff expectation

When a concrete transport/schema technology is selected, material request/response/error changes SHOULD be reviewable through schema diff, generated contract diff or an equivalent deterministic mechanism.

No tool is chosen here.

## 12. Retry and idempotency boundary

The currently authorized operation candidates are reads, so they SHOULD be safe to repeat from a domain-effect perspective.

No mutation idempotency key, retry policy or concurrency contract is defined because no authoritative mutation is currently authorized in this workstream.

When mutations are later governed, retry/idempotency semantics MUST be explicit rather than inherited blindly from transport defaults.

## 13. Service failure boundary

`service_failure` represents inability to complete due to implementation/infrastructure failure.

A future implementation MUST NOT:

- convert database/network/runtime failure into `not_found`;
- return stale/fabricated Certification data without an explicitly governed cache/fallback policy;
- hide integrity corruption by coercing invalid persisted status values;
- expose internal diagnostic detail to clients.

Observability/logging mechanisms remain an implementation decision for later governed scope.

## 14. Transport decisions intentionally deferred

This contract does not choose:

- REST;
- GraphQL;
- RPC/tRPC;
- server actions as canonical service transport;
- HTTP method/path naming;
- status-code mapping;
- JSON envelope format;
- OpenAPI;
- GraphQL schema tooling;
- client generation;
- hosting topology.

Any later selection must preserve this operation/outcome contract and be justified by actual repository/deployment/security needs.

## 15. Security boundary

Authentication and authorization behavior is deliberately outside `04.006`.

This document does not define:

- anonymous/authenticated caller identity;
- unauthenticated outcome;
- forbidden outcome;
- roles/permissions;
- tenant/account ownership;
- token/session mechanism.

Those concerns belong to `04.007–04.008` and MUST NOT be inferred here.

## 16. Verification expectations for a future runtime implementation

A concrete service implementation should provide deterministic evidence covering at least:

1. Certification list success;
2. successful Certification detail lookup;
3. unknown Certification identity → `not_found`;
4. service/infrastructure failure remains distinguishable from `not_found`;
5. no Certification fallback fabrication;
6. Practice status outside `now | next | quarantine` is not silently normalized if Practice service input exists;
7. blocked Practice mutation remains unavailable until governed;
8. Evidence durable mutations remain unavailable until governed;
9. contract/schema compatibility checks appropriate to selected transport;
10. current application quality baseline and clean working tree.

## 17. Current implementation readiness

After `04.006`, the strongest bounded candidates for later runtime implementation remain:

- list Certifications;
- get Certification by exact identity.

Practice reads remain conditionally bounded by unresolved ownership semantics.

Practice mutations and all durable Evidence operations remain blocked.

This contract does not itself authorize a specific transport or persistence implementation.

## 18. Handoff posture

`04.006` establishes deterministic service behavior and error semantics without introducing a speculative live API.

Downstream work MUST:

- preserve Certification exact lookup and deterministic `not_found`;
- preserve successful empty-list versus service-failure distinction;
- preserve approved Certification representation semantics;
- keep Practice mutation blocked until lifecycle/ownership/security are governed;
- keep Evidence durable behavior blocked;
- preserve closed Practice status values without silent coercion;
- maintain compatibility discipline when transport schemas are later introduced;
- defer auth/authz outcomes to the dedicated security workstream.

Any implementation exceeding these boundaries requires new governed evidence or explicit human authorization.
