# Stage 04 — Authorization & Security Contract

## Purpose

This document materializes the governed contract for `task.skillcertify.04.008` within the Stage 04 workstream **Transactions, Auth & Security**.

It refines `TRANSACTION_IDENTITY_AUTHORIZATION_BASELINE.md` into deterministic access-decision, security-error and transaction-security rules while remaining technology-neutral.

It does **not** select an authentication provider, define a User/Account model, introduce roles, choose OAuth/OIDC/password/session/JWT, add middleware, expose production secrets or authorize currently blocked mutations.

## 1. Access-decision contract

A future service operation that requires security context MUST resolve access through this conceptual sequence:

1. confirm that the requested operation itself is governed and supported;
2. determine whether that operation requires a principal;
3. if a principal is required, establish authenticated principal context at a trusted boundary;
4. evaluate authorization using only governed ownership/policy facts;
5. validate governed domain input/state requirements;
6. perform any required atomic state change;
7. report a stable semantic outcome without exposing sensitive implementation detail.

Authentication success alone MUST NOT imply authorization.

Authorization logic MUST NOT make an otherwise unsupported domain operation available.

## 2. Canonical security outcomes

The service outcome vocabulary is extended with these transport-neutral categories.

### `unauthenticated`

The operation requires a proven principal and no valid principal is established.

This category applies only when identity is actually required by the governed capability.

### `forbidden`

A valid principal is established but the principal does not satisfy the governed authorization rule for the requested operation/resource.

### `unsupported_operation`

The requested operation itself is not governed or authorized.

An authenticated or even highly privileged future principal MUST NOT convert an unsupported operation into a permitted one.

### `unsupported_state`

The requested mutation or state transition conflicts with a governed lifecycle/state rule.

### `not_found`

A governed identifiable resource does not exist under the applicable visibility policy.

Current Certification detail retains deterministic `not_found` semantics because its approved behavior is identity-neutral/public-like.

### `service_failure`

An implementation/infrastructure failure prevents correct completion.

Security middleware/provider failures must not be silently translated into successful access.

## 3. `unauthenticated` versus `forbidden`

The distinction is semantic, not a prescribed HTTP status-code mapping.

Use `unauthenticated` when:

- the capability requires a principal; and
- no principal is validly established.

Use `forbidden` when:

- a principal is validly established; and
- the governed access policy denies that principal.

The implementation MAY intentionally conceal this distinction at a client-facing transport boundary if revealing it would create a justified enumeration/security risk. Any such concealment must be explicit, reviewed and traceable to a threat model rather than accidental framework behavior.

## 4. Current capability authorization posture

### List Certifications

Current governed posture:

- identity requirement: none;
- authorization requirement: none currently governed;
- mutation: no;
- write transaction: none.

A future implementation MUST NOT require login for this capability merely because an authentication stack exists.

### Get Certification by exact identity

Current governed posture:

- identity requirement: none;
- authorization requirement: none currently governed;
- deterministic unknown identity outcome: `not_found`;
- mutation: no;
- write transaction: none.

Security infrastructure MUST NOT collapse current deterministic `not_found` into an auth-dependent outcome without explicit later governance.

### Read Practices

Current governed posture:

- ownership model: unresolved;
- identity requirement: unresolved;
- final authorization policy: unresolved.

Therefore no concrete allow rule is authorized yet.

A future implementation must not infer global/public visibility or user ownership from the frontend presentation.

### Mutate Practice status

Current governed posture:

- operation: blocked;
- authorization: not definable because the domain mutation itself is not authorized;
- expected current service posture: `unsupported_operation`.

No role, login state or principal may bypass this boundary.

### Durable Evidence create/list/delete

Current governed posture:

- operation: blocked;
- owner/subject/lifecycle: unresolved;
- authorization: not definable safely;
- expected current service posture: `unsupported_operation`.

Authentication technology cannot substitute for missing Evidence ownership semantics.

## 5. Deny-by-default contract

Deny-by-default applies whenever a requested operation requires ownership/authority that is not governed.

This means:

- absence of an explicit deny does not imply allow;
- UI visibility does not imply authorization;
- route possession does not imply authorization;
- syntactically valid identity claims do not imply authorization;
- authenticated state does not imply authorization;
- framework/provider default roles do not imply domain permission;
- administrator-like roles must not be invented to bypass missing domain policy.

When policy is unresolved, the operation remains unavailable until governance supplies the missing authority.

## 6. Trusted-boundary enforcement

Authorization MUST be enforced at a trusted server/service/domain boundary when concrete runtime behavior exists.

The following are insufficient as security controls by themselves:

- hidden buttons;
- disabled UI controls;
- client-side route guards;
- client-supplied owner IDs;
- client-supplied roles/permission claims that have not been verified;
- frontend-only filters;
- obscured URLs.

Client behavior may improve UX, but server-side/trusted-boundary enforcement remains authoritative.

## 7. Ownership prerequisite contract

Before an owned mutation can be authorized, governance must define at minimum:

1. what domain record or aggregate is being changed;
2. what principal concept exists;
3. how ownership/authority relates the principal to that record;
4. whether authority is direct, delegated or policy-based;
5. what lifecycle/state rules limit the mutation;
6. what authorization denial means semantically;
7. whether existence itself is sensitive;
8. what audit/observability evidence is required.

No permission matrix should be created before these facts exist.

## 8. Transaction-security ordering

For a future authorized mutation, authorization and state change MUST be composed so that a stale or bypassed access decision cannot knowingly produce an unauthorized committed state.

A default safe sequence is:

1. establish trusted request/principal context if required;
2. confirm operation support;
3. load the minimum authoritative state required for policy/invariant evaluation;
4. evaluate authorization;
5. validate mutation preconditions/state transition;
6. begin or enter the required atomicity boundary when partial state would violate invariants;
7. apply the state change;
8. verify required postconditions;
9. commit;
10. return the stable semantic outcome.

Technology-specific locking/isolation mechanics remain unresolved.

## 9. Time-of-check/time-of-use boundary

For future ownership-sensitive mutations, an authorization decision based on state that may change before commit can create a TOCTOU risk.

A concrete implementation must ensure that material policy facts used for authorization remain valid through the protected state change, using the smallest technology-appropriate mechanism consistent with the governed mutation.

This task does not choose locks, serializable transactions, optimistic concurrency or version columns.

## 10. Failure atomicity and authorization

A mutation MUST NOT report `success` when:

- authorization failed;
- authorization could not be evaluated reliably;
- the transaction failed;
- postconditions are uncertain;
- partial writes violate governed invariants.

On authorization denial, no authoritative mutation side effect should be committed.

On infrastructure/security-provider failure, the default posture for protected operations is fail closed, not allow-by-error.

## 11. Fail-closed posture

Protected operations MUST fail closed when the system cannot establish required security facts reliably.

Examples include:

- authentication verification unavailable;
- signature/session validation inconclusive;
- authorization policy dependency unavailable;
- authoritative ownership lookup fails;
- transaction state is uncertain.

This does not mean every public read must fail due to an unrelated auth subsystem outage. Security dependencies should only gate capabilities that actually require them.

## 12. Error redaction contract

Client-visible security errors MUST NOT expose:

- passwords;
- session IDs;
- bearer/access/refresh tokens;
- authorization headers;
- private keys;
- provider secrets;
- database connection strings;
- raw stack traces;
- internal file paths where unnecessary;
- SQL/query internals;
- internal policy implementation details that materially aid abuse;
- sensitive personal data unrelated to the response.

Internal observability may retain diagnostic context only with appropriate redaction and access control.

## 13. Resource enumeration posture

Existence concealment is capability-specific, not a global rule.

### Current Certification reads

Certification existence is part of the currently approved public-like behavior. Exact unknown identity therefore remains deterministic `not_found`.

### Future owned/sensitive resources

If exposing `forbidden` versus `not_found` would reveal sensitive resource existence, a later threat-model decision may intentionally unify the client-visible result while preserving internal diagnostics.

Such behavior must be explicitly governed and tested.

## 14. Input and authorization separation

Authorization logic and input validation are distinct concerns.

A future implementation MUST NOT:

- rely on malformed-input errors to enforce authorization;
- normalize attacker-controlled identity/owner fields into authorized values;
- trust a caller-supplied owner/principal identifier without verifying it against trusted principal context;
- leak sensitive existence information merely to provide a more precise validation error.

Exact ordering may vary by transport/threat model, but both concerns must remain independently testable.

## 15. Privilege model boundary

No role or permission model is authorized by current evidence.

This contract does not define:

- admin;
- super-admin;
- user;
- reviewer;
- moderator;
- issuer manager;
- staff;
- tenant owner;
- service account.

If roles are later introduced, each role must map to source-backed domain responsibilities rather than provider defaults or generic application conventions.

## 16. Authentication mechanism boundary

No concrete authentication mechanism is selected.

Unresolved options include, without endorsement:

- OAuth;
- OIDC;
- passwords;
- passkeys;
- cookie-backed sessions;
- bearer tokens;
- JWTs;
- external identity providers.

A later selection must justify credential lifecycle, revocation, session expiry, CSRF implications, token storage, provider trust and local/test reproducibility against actual product needs.

## 17. Session/token security requirements for later selection

If a session/token mechanism is later governed, the design must explicitly address as applicable:

- trusted issuance;
- integrity/signature verification;
- expiration;
- revocation/invalidation;
- replay risk;
- token/session fixation;
- credential rotation;
- storage exposure;
- transport protection;
- log redaction;
- logout semantics;
- stale authorization claims.

This contract defines review questions, not an implementation choice.

## 18. CSRF/CORS/cookie boundary

CSRF, CORS and cookie controls depend on selected transport/authentication architecture.

No concrete values or middleware are chosen here.

When applicable, later implementation must justify:

- trusted origins;
- credentialed cross-origin behavior;
- cookie security attributes;
- CSRF defense for state-changing requests;
- preflight/allowed-header policy;
- browser versus non-browser clients.

Permissive defaults must not be adopted merely to make integration easier.

## 19. Secret and configuration contract

Future security implementation MUST keep secrets outside committed source content.

Repository/documentation artifacts may contain:

- secret variable names;
- setup instructions;
- clearly synthetic placeholders.

They MUST NOT contain real credentials or private tokens.

Missing security configuration for a protected runtime should fail explicitly rather than silently downgrading security.

## 20. Logging and observability contract

Security-relevant operations should provide enough internal evidence to diagnose abuse/failure while minimizing sensitive data.

Future logging SHOULD distinguish, where appropriate:

- authentication failure class;
- authorization denial class;
- unsupported operation;
- security subsystem failure;
- mutation transaction failure.

Logs MUST NOT contain raw credentials/tokens by default.

This task does not create a persisted audit-event domain model or retention policy.

## 21. Abuse/rate-limit boundary

Rate limiting, throttling, lockout and abuse prevention remain unresolved because current evidence does not define an attack surface requiring a specific policy.

A later public/authenticated runtime should evaluate abuse controls based on actual exposed operations, cost and threat model.

No arbitrary request limits are invented here.

## 22. Security contract compatibility

Security changes are potentially breaking even when request/response schemas remain unchanged.

Examples include:

- adding an authentication requirement to a currently identity-neutral Certification read;
- changing a public-like `not_found` into concealed existence behavior;
- introducing ownership requirements;
- changing principal identity semantics;
- changing authorization from deny-by-default to implicit allow;
- changing session/token trust boundaries;
- widening CORS/credential exposure.

Such changes require explicit review and evidence.

## 23. Verification contract for future runtime implementation

When concrete security runtime behavior exists, evidence should cover applicable cases such as:

1. current public-like Certification reads remain usable without invented login requirements;
2. protected operation with missing/invalid authentication resolves to `unauthenticated` or an explicitly reviewed concealed equivalent;
3. authenticated but unauthorized principal resolves to `forbidden` or an explicitly reviewed concealed equivalent;
4. blocked Practice mutation remains `unsupported_operation`, even for authenticated principals;
5. blocked durable Evidence operations remain unavailable;
6. client/UI manipulation cannot bypass trusted-boundary authorization;
7. authorization denial commits no mutation side effect;
8. transaction/security subsystem failure does not fail open;
9. sensitive errors are redacted;
10. raw tokens/credentials are absent from logs;
11. existence-enumeration behavior matches the capability threat model;
12. current repository quality baseline passes and working tree is clean.

## 24. Current authorization matrix

| Capability | Principal required | Access posture | Security outcome today | Write transaction |
| --- | --- | --- | --- | --- |
| List Certifications | No | identity-neutral read | normal read outcomes | No |
| Get Certification | No | identity-neutral read | deterministic `not_found` for unknown identity | No |
| Read Practices | Unresolved | policy blocked pending ownership definition | no final allow rule | No if later read-only |
| Mutate Practice status | N/A | operation blocked | `unsupported_operation` | Not applicable |
| Durable Evidence operations | N/A | operations blocked | `unsupported_operation` | Not applicable |

This matrix reflects current governance only.

## 25. Decisions intentionally deferred

The following remain unresolved after `04.008`:

- User/Account/principal domain model;
- authentication provider;
- OAuth/OIDC/password/passkey/session/JWT choice;
- exact unauthenticated/forbidden transport mapping;
- role/permission model;
- Practice ownership;
- Evidence ownership;
- authorized mutations;
- transaction isolation/concurrency mechanism;
- audit-event model/retention;
- rate limiting/abuse policy;
- production secret manager;
- CORS/CSRF/cookie configuration.

## 26. Handoff posture

`04.008` closes the technology-neutral authorization/security contract layer for the current Stage 04 workstream without manufacturing an identity system.

Downstream work MUST:

- preserve identity-neutral Certification reads until explicitly changed by governance;
- distinguish authentication from authorization;
- enforce future authorization at trusted boundaries;
- deny unresolved ownership-sensitive mutations by default;
- keep Practice mutation and durable Evidence behavior blocked;
- fail closed for protected operations when required security facts cannot be established;
- compose authorization and mutation atomicity so unauthorized state is not committed;
- redact client-visible and logged sensitive information;
- treat existence concealment as an explicit threat-model decision;
- justify any concrete authentication/provider/session/token choice against actual runtime/product/security needs.

Any implementation beyond these boundaries requires new governed evidence or explicit human authorization.
