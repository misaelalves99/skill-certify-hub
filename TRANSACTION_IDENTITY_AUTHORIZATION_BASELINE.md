# Stage 04 — Transaction, Identity & Authorization Baseline

## Purpose

This document materializes the governed baseline for `task.skillcertify.04.007` within the Stage 04 workstream **Transactions, Auth & Security**.

It is derived from the merged domain, migration and service contracts. It defines the security-sensitive boundaries that must exist before any concrete authentication provider, token/session mechanism, role system or transactional runtime is introduced.

It does **not** create a User/Account model, select OAuth/OIDC/password/session/JWT, define roles, choose a provider, implement authorization middleware or authorize blocked mutations.

## 1. Separation of concerns

The following concerns are distinct and MUST NOT be collapsed:

- **Identity** — which principal, if any, a request is associated with.
- **Authentication** — how a claimed principal is proven.
- **Authorization** — whether an authenticated or anonymous principal may perform a governed operation.
- **Transaction boundary** — which state changes must succeed or fail atomically.

A project may have identity without a particular authentication technology, and an authenticated principal is not automatically authorized for an operation.

## 2. Current capability security classification

### Certification list

**Current posture: read-only candidate that does not require governed user identity.**

Current approved behavior is a synthetic public-like catalog read. No source-backed User/Account ownership requirement exists.

Therefore this baseline does not require authentication for this capability and does not invent one.

### Certification detail by identity

**Current posture: read-only candidate that does not require governed user identity.**

Exact lookup and deterministic `not_found` semantics are already governed. No ownership-sensitive field exists in the current Certification representation.

A future security decision may change exposure policy only with explicit governed justification.

### Practice read

**Current posture: security classification unresolved because ownership is unresolved.**

The domain contract does not establish whether Practice is global, user-specific, assigned or otherwise scoped.

Therefore a concrete authorization rule cannot yet be defined safely.

### Practice mutation

**Current posture: blocked.**

No governed mutation authority, ownership model or transition graph exists.

Authorization middleware MUST NOT be used to make an otherwise unsupported mutation appear authorized. The operation itself remains `unsupported_operation` until its domain lifecycle is governed.

### Evidence durable behavior

**Current posture: blocked.**

No durable owner/subject/identity/lifecycle exists for Evidence. Authentication technology cannot substitute for missing domain ownership semantics.

## 3. Transaction classification

### Read-only operations

The current strongest authorized service candidates are reads:

- list Certifications;
- get Certification by exact identity.

These do not modify authoritative domain state and therefore do not require a write transaction for domain correctness.

Implementation-level consistent-read/snapshot behavior remains technology-specific and is not selected here.

### Future mutations

A mutation requires a transaction or equivalent atomicity boundary when partial success could violate a governed invariant.

Before any mutation is implemented, its contract MUST define:

1. authoritative state being changed;
2. invariants that must hold before and after;
3. all writes that belong to the same logical operation;
4. failure behavior;
5. retry/idempotency implications;
6. authorization decision point;
7. recovery behavior when infrastructure fails.

No transaction should be added merely because a database library exposes transaction APIs.

## 4. Atomicity baseline

For a future authorized mutation, the smallest domain-consistent operation is the default transaction boundary.

The implementation MUST NOT knowingly leave partially committed state that violates the operation's governed postconditions.

If multiple persistent changes together represent one domain outcome, they should either:

- commit together; or
- fail/recover in a way that preserves defined invariants.

Distributed/saga patterns, nested transactions and provider-specific isolation levels remain unresolved because no current authorized mutation requires them.

## 5. Identity baseline

No User, Account, Profile, tenant or authentication identity model is currently authorized by the domain contract.

Therefore this task does not define:

- user IDs;
- email identity;
- username identity;
- external-provider subject IDs;
- account membership;
- tenant IDs;
- service accounts;
- reviewer identities.

If later work introduces an identity-bearing principal, its domain meaning and lifecycle must be governed before physical storage or token claims are treated as authoritative.

## 6. Authentication baseline

Authentication is evidence that a caller corresponds to a principal recognized by the system.

This baseline requires future authentication design to preserve the following properties:

- credentials/secrets are not exposed to client-visible errors or repository content;
- authentication failure is distinguishable from authorization denial where doing so does not create a security leak;
- authentication state is validated at a trusted boundary;
- client-supplied identity claims are not trusted merely because they are syntactically valid;
- expiry/revocation/session validity semantics are explicit for the selected mechanism;
- sensitive authentication material is never logged indiscriminately.

No mechanism is chosen here.

## 7. Authorization baseline

Authorization is evaluated against a governed operation, principal context and domain ownership/policy.

### Deny-by-default for unresolved mutations

If an operation requires ownership/permission semantics that are not governed, the safe outcome is to keep the operation unavailable rather than infer access from UI context, route shape or common product patterns.

### No role invention

This task does not create roles such as:

- admin;
- user;
- reviewer;
- moderator;
- issuer manager.

Roles/permissions require explicit domain authority.

### Server-side enforcement

When authorization is later implemented, client/UI visibility MUST NOT be the security boundary. Authorization must be enforced at a trusted service/domain boundary.

## 8. Security outcome vocabulary

The service-level outcome vocabulary from `04.006` is extended conceptually with reserved security outcomes for future implementations:

### `unauthenticated`

The requested operation requires a proven principal and none is validly established.

### `forbidden`

A valid principal is established but is not authorized to perform the governed operation.

These categories are transport-neutral. They do not prescribe HTTP status codes, GraphQL error codes or RPC exceptions.

Current Certification reads do not yet require either outcome because no identity requirement is governed for them.

## 9. Outcome precedence and information disclosure

A future secure implementation must avoid turning error detail into an information leak.

Where resource existence itself is sensitive, a later security contract may intentionally map multiple internal conditions to the same client-visible outcome. Such concealment must be explicit and reviewed, not accidental.

For current Certification reads, resource existence is already part of approved public-like behavior, so deterministic `not_found` remains the current contract.

This task does not globally require hiding existence for all future owned resources.

## 10. Authorization-before-mutation rule

For any future mutation:

1. validate that the operation itself is governed;
2. establish principal context if required;
3. evaluate authorization at the trusted boundary;
4. validate governed input/state transition rules;
5. open the required transaction/atomicity boundary;
6. apply the mutation;
7. verify invariants before successful completion.

Exact ordering may vary when a security-safe existence check or parser must occur first, but authorization must never be bypassed by direct persistence access.

## 11. Transaction failure semantics

A transactional mutation must not report `success` when the authoritative state is uncertain or partially failed.

Future implementation must distinguish, as appropriate:

- governed validation failure;
- unauthenticated caller;
- forbidden caller;
- unsupported operation/state;
- conflict/concurrency failure if later governed;
- infrastructure/service failure.

Provider-specific exceptions must be translated into stable service semantics rather than exposed directly to clients.

## 12. Retry and idempotency security boundary

Retries can create duplicate or unauthorized effects if mutation semantics are not explicit.

Therefore future write operations MUST define whether they are:

- safely repeatable;
- protected by an idempotency strategy;
- rejected on replay/conflict;
- unsafe to retry automatically.

Authentication alone does not solve duplicate-effect risk.

No idempotency mechanism is selected because no current mutation is authorized.

## 13. Sensitive data and secret handling baseline

Future auth/security implementation MUST NOT:

- commit credentials, tokens, private keys or connection secrets to the repository;
- expose secrets in browser-rendered error messages;
- include raw credentials/tokens in logs;
- trust environment names as proof that destructive/security-sensitive operations are safe;
- copy real user/private data into development seeds.

Environment-specific secret storage/provider choice remains out of scope.

## 14. CSRF, CORS, cookies and token-specific controls

These controls depend on the eventual transport and authentication mechanism.

This baseline therefore does not prescribe:

- cookie `SameSite` policy;
- CSRF token design;
- bearer token placement;
- CORS allowlists;
- refresh-token rotation;
- PKCE;
- OAuth scopes.

Once a mechanism is selected, applicable controls become mandatory design considerations and must be justified against its threat model.

## 15. Security logging and audit boundary

Future security-sensitive operations should provide enough internal observability to investigate failures/abuse without logging secrets or excessive personal data.

This task does not define a persisted audit domain model.

Audit events, retention, reviewer identity and compliance requirements remain unresolved until source-backed needs exist.

## 16. No auth-by-convention decision

Current repository evidence does not justify selecting a specific authentication stack.

A later technology decision should consider at least:

- whether any governed feature actually requires identity;
- deployment/runtime topology;
- server/client boundaries;
- required external identity providers, if any;
- session revocation needs;
- authorization complexity;
- secret management;
- local/test reproducibility;
- security maintenance/update posture;
- operational complexity.

Popularity or framework integration alone is insufficient.

## 17. Security verification expectations for future runtime work

When concrete auth/transaction behavior is later introduced, deterministic evidence should cover applicable cases such as:

- anonymous read behavior for capabilities intentionally public;
- required-auth operation rejects missing/invalid authentication;
- authenticated but unauthorized principal is denied;
- UI/client manipulation cannot bypass server-side authorization;
- blocked operations remain unavailable even to authenticated principals;
- transaction failure does not leave invariant-breaking partial state;
- duplicate/retry behavior matches the mutation contract;
- client-facing errors do not expose secrets/internal stack details;
- current application quality baseline and clean working tree.

## 18. Current authorization matrix

| Capability | Identity required now? | Authorization status | Transaction need |
| --- | --- | --- | --- |
| List Certifications | No governed requirement | Read candidate permitted by current contract | No write transaction |
| Get Certification | No governed requirement | Read candidate permitted by current contract | No write transaction |
| Read Practices | Unresolved | Cannot define final policy until ownership is governed | Read-only if later authorized |
| Mutate Practice status | N/A | Blocked / `unsupported_operation` | Not applicable until governed |
| Durable Evidence create/list/delete | N/A | Blocked / `unsupported_operation` | Not applicable until governed |

The matrix describes current governance, not permanent product policy.

## 19. Decisions intentionally deferred

The following remain unresolved after `04.007`:

- existence and shape of a User/Account domain model;
- principal identifier strategy;
- authentication provider;
- OAuth/OIDC/password/passkey/session/JWT strategy;
- cookie/token transport;
- role/permission model;
- Practice ownership;
- Evidence ownership;
- mutable domain operations;
- transaction isolation level;
- concurrency/conflict policy;
- audit model;
- rate limiting/abuse controls;
- production secret management.

## 20. Handoff posture

`04.007` establishes a technology-neutral transaction/identity/authorization baseline without manufacturing a login system or speculative permissions model.

Downstream work MUST:

- preserve current Certification reads without adding identity requirements by convention;
- keep Practice/Evidence mutations blocked until their domain ownership/lifecycle is governed;
- separate authentication from authorization;
- enforce future authorization at trusted service/domain boundaries;
- use atomicity only where governed mutations require it;
- keep security outcomes distinct from generic service failures where applicable;
- avoid secrets and sensitive implementation details in client-visible errors;
- justify any concrete auth/transaction technology against actual product/runtime/security needs.

Any implementation beyond these boundaries requires new governed evidence or explicit human authorization.
