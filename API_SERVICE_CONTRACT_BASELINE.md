# Stage 04 — API & Service Contract Baseline

## Purpose

This document materializes the governed baseline for `task.skillcertify.04.005` within the Stage 04 workstream **API, Services & Contract Integrity**.

It maps the currently approved frontend behavior and merged Stage 04 domain/migration contracts into candidate service capabilities and contract-level semantics. It does **not** select REST, GraphQL, RPC, route naming, transport serialization, authentication, authorization, deployment runtime, database technology or persistence implementation.

The control question for this workstream is:

> Is the frontend consuming real behavior through a coherent contract, or only endpoints that happen to work on the happy path?

The baseline therefore treats deterministic success/error behavior, compatibility, explicit mutation boundaries and evidence-backed capability design as first-class concerns.

## 1. Contract posture

This baseline uses four classifications:

- **Candidate read capability** — current approved behavior demonstrates a stable read/query need that may later be exposed through a service boundary.
- **Candidate mutation capability** — current approved behavior suggests a user action, but backend authority/persistence semantics may still be unresolved.
- **Frontend-local behavior** — current behavior must remain local because no authoritative backend contract exists yet.
- **Blocked/unresolved capability** — insufficient domain, ownership, persistence or security authority exists to define the service safely.

A capability in this document is not an endpoint. No path, method, protocol, handler or network transport is implied.

## 2. Certification service capabilities

### 2.1 List certifications

**Classification:** Candidate read capability.

The current frontend contains a finite synthetic Certification catalog with records carrying:

- `id`;
- `title`;
- `issuer` attribution;
- `level`;
- `summary`.

A future service may expose a capability equivalent to “list governed certifications” because the frontend already consumes a collection view.

### Contract-level success semantics

A successful collection read should:

- return zero or more Certification representations;
- preserve stable Certification identity;
- preserve the source-backed contract fields only;
- not fabricate User/Account/Progress, independent Issuer entities or unsupported relationships;
- distinguish an empty collection from a service failure.

### Unresolved

This baseline does not define:

- pagination;
- ordering guarantees;
- filtering syntax;
- search semantics;
- external/live issuer synchronization;
- cache behavior;
- transport response envelope.

The current frontend filter behavior is local and does not by itself authorize a remote filtering API.

## 3. Certification detail lookup

### Classification

**Candidate read capability with strong deterministic semantics.**

Current behavior resolves a Certification by exact `id`. Unknown identifiers resolve to no Certification and invoke the governed not-found path rather than returning fallback data.

### Contract-level input

- one Certification identity token.

The physical identifier format remains unresolved. A transport must not redefine domain identity semantics merely for routing convenience.

### Success semantics

For a known identity:

- resolve exactly one Certification;
- return the source-backed Certification representation;
- preserve exact identity match semantics.

### Not-found semantics

For an unknown identity:

- return a deterministic **not found** outcome;
- do not substitute another Certification;
- do not synthesize placeholder/fallback data;
- do not convert not-found into an empty successful Certification object.

The transport-specific representation of “not found” remains unresolved.

### Invalid-input boundary

The current product does not establish a complete validation grammar for Certification identities beyond string-based exact lookup. Therefore a later transport contract must distinguish malformed transport input from a well-formed-but-unknown domain identity where relevant, without inventing unsupported identifier grammar here.

## 4. Practice service capabilities

### 4.1 List/read practices

**Classification:** Candidate read capability, bounded by unresolved ownership.

The approved frontend contains identifiable Practice records with:

- `id`;
- `title`;
- `description`;
- `status`.

The status vocabulary is closed:

- `now`;
- `next`;
- `quarantine`.

A future service may expose a read capability for Practice records only if the implementation preserves the unresolved domain boundary: the current evidence does not establish whether Practice is global, user-specific, assigned, enrolled or otherwise owned.

### Success semantics

A successful Practice read should:

- preserve Practice identity;
- preserve title/description;
- return `status` only from `now | next | quarantine`;
- reject or surface unsupported persisted status rather than silently normalizing it to a valid value.

### Filtering boundary

The current UI filters a local in-memory Practice collection by exact status equality. This is evidence for the status vocabulary and read-selection behavior, but it does **not** require a remote filter parameter or endpoint.

If a future service supports status filtering, compatibility and unsupported-value behavior must be explicit rather than inferred from the UI control.

## 5. Practice mutation boundary

### Classification

**Blocked/unresolved mutation capability.**

The current `activeStatus` interaction changes only the selected browser filter. It does not mutate a Practice record.

Therefore this baseline explicitly prohibits interpreting the UI status tabs as authorization for a backend operation equivalent to “change Practice status.”

Before a persisted Practice mutation contract can exist, later governed work must establish:

- whether Practice is mutable;
- who/what may mutate it;
- ownership boundary;
- allowed transition graph;
- conflict/concurrency semantics where relevant;
- authorization requirements;
- persistence scope.

No update-status endpoint/capability is authorized by `04.005`.

## 6. Evidence service boundary

### Classification

**Frontend-local behavior; durable service capability blocked.**

The current Evidence surface allows a user to enter a non-blank URL and stores it only in browser/component state. Refresh clears it. There is no upload, remote storage, account association, database or API.

The locally generated `Date.now()` identifier is a UI/session key, not a durable domain identity.

### Permitted conclusion

The frontend demonstrates a user interaction concept equivalent to “register a local evidence reference for this session.” It does not demonstrate an authoritative backend mutation.

### Blocked service capabilities

`04.005` does not authorize capabilities equivalent to:

- create durable Evidence;
- list durable Evidence;
- delete durable Evidence;
- upload evidence files;
- attach Evidence to Certification;
- attach Evidence to Practice;
- attach Evidence to User/Account;
- verify/review Evidence.

These remain blocked until Evidence subject, ownership, identity, lifecycle, URL policy, storage semantics and security/authorization requirements are governed.

## 7. Query versus mutation contract rule

A future API/service implementation MUST distinguish reads from mutations by domain effect rather than UI appearance.

### Reads

A read/query:

- observes governed state;
- does not alter domain state;
- has deterministic not-found/invalid-input/failure semantics;
- should be safe to repeat absent explicitly documented external side effects.

### Mutations

A mutation:

- changes authoritative domain state or causes an authorized domain side effect;
- requires explicit input validation and outcome/error semantics;
- requires ownership/authorization decisions when applicable;
- must define retry/idempotency/concurrency behavior when those concerns are material.

A button, form or tab in the frontend is not sufficient evidence that a domain mutation exists.

## 8. Contract-level outcome model

Future service capabilities should distinguish at least the following semantic outcomes where applicable. These are domain/service outcomes, not prescribed HTTP status codes or GraphQL error shapes.

### Success

The requested governed behavior completed and the returned representation satisfies the current contract.

### Not found

A requested identifiable domain record does not exist for the supplied valid identity.

Current Certification detail behavior strongly demonstrates this outcome.

### Invalid input

Input fails a contract rule that is actually governed for that capability.

Examples currently supportable at contract level include:

- unsupported Practice status when a status value is accepted by a future capability;
- blank Evidence reference if a future Evidence mutation is eventually authorized.

No broader validation taxonomy is invented here.

### Unsupported operation/state

The caller requests behavior not authorized by the current domain lifecycle/contract.

This outcome is preferable to silently accepting speculative behavior. A persisted Practice status transition would currently fall into this category because transition semantics are unresolved.

### Service/internal failure

The capability could not complete due to an implementation/infrastructure failure rather than domain absence or caller-invalid input.

A future transport must not collapse this into “not found” or a successful empty response.

### Authorization outcomes

Authentication/authorization outcomes are intentionally deferred to the `Transactions, Auth & Security` workstream. `04.005` does not define unauthenticated/forbidden semantics beyond reserving them as later contract concerns.

## 9. Error integrity rules

Future implementation should preserve these rules:

1. Known not-found behavior must remain deterministic and testable.
2. Invalid input must not be silently coerced into a different valid domain request unless that normalization is explicitly governed.
3. Unsupported domain operations must not be presented as successful no-ops merely to simplify clients.
4. Infrastructure/service failures must remain distinguishable from domain absence.
5. Error representations must not leak secrets, credentials, internal stack traces or sensitive infrastructure details.
6. Transport-specific error encoding must preserve the semantic distinctions defined by the service contract.

## 10. Representation and compatibility baseline

A future request/response contract must be versioned or otherwise reviewably change-controlled.

### Compatibility posture

Changes should be classified by client impact rather than assumed safe because serialization still succeeds.

Potentially breaking changes include:

- removing or renaming a contract field consumed by the approved frontend;
- changing Certification identity semantics;
- changing `Practice.status` values or meaning;
- changing not-found behavior into fallback/synthetic success;
- making previously optional/absent behavior mandatory without governed agreement;
- introducing a relationship/ownership requirement not authorized by the domain contract.

### Additive changes

An additive transport field is not automatically domain-safe. It still requires source/domain authority if it represents a new business concept.

### Schema diff expectation

When a concrete schema/serialization format is later selected, material contract changes should be reviewable through schema diff or an equivalent compatibility mechanism.

`04.005` defines the requirement, not the tool.

## 11. Candidate frontend-to-service map

| Frontend behavior | Current source | Candidate service posture |
| --- | --- | --- |
| Render Certification collection | synthetic catalog | candidate read capability |
| Resolve Certification detail by exact `id` | `findCertification(id)` | candidate read capability with deterministic not-found |
| Filter Certifications in UI | local frontend state | remain local unless remote filtering is later justified |
| Render Practice records | local synthetic array | candidate read capability with unresolved ownership |
| Filter Practice by `now/next/quarantine` | local UI filter | local behavior; status vocabulary remains contract input |
| Change selected Practice status tab | browser UI state | not a domain mutation |
| Add Evidence URL | browser/session state | frontend-local; durable mutation blocked |
| Clear Evidence list | browser/session state | frontend-local; durable deletion blocked |

This map is deliberately capability-oriented. It must not be converted mechanically into endpoint-per-row architecture.

## 12. Transport and runtime decisions intentionally deferred

This baseline does not choose:

- REST;
- GraphQL;
- RPC/tRPC;
- server actions as the canonical external/internal service boundary;
- HTTP route structure;
- JSON envelope conventions;
- OpenAPI/GraphQL schema tooling;
- service hosting topology;
- database/query implementation;
- cache/provider strategy;
- authentication mechanism;
- authorization mechanism.

A later choice must be justified against the actual client/runtime/deployment/security needs and this contract, not popularity alone.

## 13. Test/evidence expectations for future implementation

A future concrete service implementation should provide evidence equivalent to:

- success-path contract tests for authorized capabilities;
- deterministic Certification not-found test;
- invalid-input tests for actually governed rules;
- unsupported Practice status behavior where status input is exposed;
- compatibility/schema validation appropriate to the selected transport;
- explicit confirmation that local-only Evidence behavior has not been silently promoted to durable backend mutation;
- no invented User/Account/Progress API surface;
- current application quality baseline;
- clean working tree.

## 14. Decisions intentionally open after 04.005

The following remain unresolved:

- transport/protocol selection;
- exact service/module topology;
- endpoint/operation names;
- pagination/filter/search semantics;
- Practice ownership and mutation lifecycle;
- Evidence durable service behavior;
- authentication/authorization semantics;
- transaction boundaries;
- persistence implementation;
- external/live certification source integration;
- User/Account/Progress APIs.

## 15. Handoff posture

`04.005` establishes a bounded API/service vocabulary without creating a speculative live API.

The safe downstream posture is:

- treat Certification collection/detail as the strongest current candidate read capabilities;
- preserve deterministic Certification not-found behavior;
- treat Practice reads as candidate capabilities while keeping ownership unresolved;
- preserve `now | next | quarantine` as a closed Practice value set without inventing transitions;
- keep current Certification/Practice filters as local until remote query semantics are explicitly justified;
- keep Evidence create/list/delete behavior frontend-local until durable Evidence is governed;
- keep all User/Account/Progress and auth/security capabilities outside this task;
- require future transport/schema choices to preserve the semantic outcome and compatibility rules in this baseline.

Any implementation that exceeds these boundaries requires new governed evidence or explicit human authority.
