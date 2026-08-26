# Stage 05 — API & Contract Validation

## Purpose

This document materializes the bounded disposition for `task.skillcertify.05.006` — **Validar API e contratos**.

The task's canonical objective is to validate API/contracts/runtime, including negative scenarios and safe error messages. Its canonical stop conditions include absent/ambiguous contract, secret exposure, and unsafe error disclosure.

The repository was inspected against that contract before any runtime PASS claim was made.

## 1. Current repository execution baseline

Immediately before this artifact was materialized, the human owner synchronized the task branch and executed:

```text
npm ci
npm run quality
git status
```

Observed evidence:

- install completed;
- npm audit reported 0 vulnerabilities at execution time;
- lint PASS;
- typecheck PASS;
- repository tests 26/26 PASS;
- production build PASS;
- static generation 10/10 pages;
- working tree clean.

This remains repository/frontend evidence only.

## 2. Runtime/API discovery result

Repository inspection found no current versioned API transport/runtime surface for the governed Certification service contract:

- no `route.ts` API handler discovered;
- no repository API endpoint surface discovered;
- no REST transport selected;
- no GraphQL transport selected;
- no RPC/tRPC transport selected;
- no OpenAPI or equivalent concrete request/response schema exposed;
- no backend service runtime capable of receiving contract-test requests is established by current evidence.

Therefore no API/transport contract test can be executed honestly in this task revision.

## 3. Governing Stage 04 boundary

`SERVICE_IMPLEMENTATION_READINESS.md` explicitly establishes that Stage 04 readiness did not:

- implement routes/endpoints;
- select REST/GraphQL/RPC;
- select physical URL/path design;
- select schema tooling;
- choose hosting/backend runtime;
- create persistence/auth infrastructure.

It classifies only the following service capabilities as sufficiently specified for later implementation:

### Implementation-ready, not runtime-verified

- Certification collection read;
- Certification exact-identity read.

### Conditionally ready

- remote Certification filtering/search;
- Practice read.

### Blocked

- Practice mutation;
- durable Evidence operations;
- User/Account/Progress service surfaces.

These classifications remain unchanged by this QA task.

## 4. Canonical contract-test obligations still pending runtime

When a concrete Certification runtime exists, the minimum governed contract evidence remains:

1. list Certifications returns only approved fields;
2. empty collection is successful and distinct from failure;
3. exact known identity resolves one record;
4. unknown exact identity returns deterministic `not_found`;
5. unknown identity never falls back to another/fake record;
6. `service_failure` remains distinguishable from `not_found`;
7. `service_failure` remains distinguishable from successful empty collection;
8. Certification reads remain authentication-neutral under current governance;
9. User/Account/Progress data does not leak into the surface;
10. Practice mutation and durable Evidence operations remain unavailable.

These are **required future tests**, not executed PASS evidence.

## 5. Negative-input validation status

The canonical task requires invalid inputs to be rejected safely.

Current status:

- frontend/local exact-identity behavior has deterministic repository tests;
- no concrete API parser/request boundary exists;
- therefore malformed path/query/body/header contract behavior cannot be exercised at API level;
- no HTTP status/error payload semantics are selected;
- no transport-level invalid-input PASS may be claimed.

This is a runtime prerequisite gap, not evidence that the eventual contract fails.

## 6. Safe error-message validation status

The canonical task also requires API errors to be verified.

Current status:

- domain/service semantics distinguish `not_found`, empty success and `service_failure` conceptually;
- no concrete API/runtime error encoder exists;
- no transport payload exists to inspect for stack traces, secrets, infrastructure details or unsafe disclosure;
- no controlled runtime failure can be injected because no runtime boundary is implemented.

Therefore safe API error disclosure remains **required future evidence**.

## 7. Secrets/environment check

No production credential or secret is required by the current repository quality path or by this task disposition.

This task does not introduce:

- API keys;
- database credentials;
- auth secrets;
- production environment tokens;
- external service credentials.

The canonical stop condition regarding secrets is therefore preserved by avoiding speculative runtime setup.

## 8. Why this task does not create an API merely to test one

Creating a route/transport in `05.006` solely to manufacture contract-test execution would cross the QA boundary into implementation architecture.

Stage 04 explicitly requires transport/runtime selection to be justified through governed implementation work. The current QA task is not authority to invent:

- route naming;
- HTTP status mappings;
- schema format;
- runtime hosting;
- persistence;
- auth;
- remote filtering semantics.

Accordingly, this task records the prerequisite rather than creating implementation scope by convenience.

## 9. Evidence-state matrix

| Validation area | Current state | Permitted claim |
| --- | --- | --- |
| repository quality | executed | PASS for current branch/revision |
| Certification local exact lookup | executed repository behavior | PASS only for current local module behavior |
| API transport existence | not established | no runtime/API PASS |
| API contract tests | blocked by missing runtime | required future |
| invalid API input rejection | blocked by missing request boundary | required future |
| API `not_found` encoding | blocked by missing transport | required future |
| API `service_failure` encoding | blocked by missing runtime | required future |
| safe API error disclosure | blocked by missing runtime/error encoder | required future |
| auth-neutral Certification reads at runtime | not runtime-verified | required future |
| compatibility/schema diff | no concrete transport schema | required future |
| controlled service failure | no concrete runtime | required future |
| secrets exposure | none introduced by this task | boundary preserved |

## 10. Canonical validation disposition

Canonical validation criteria:

- contract tests execute;
- invalid inputs rejected safely;
- API errors verified.

Current disposition:

- **contract tests execute:** `BLOCKED — NO CONCRETE API/RUNTIME`;
- **invalid inputs rejected safely:** `BLOCKED AT API BOUNDARY`;
- **API errors verified:** `BLOCKED AT API/RUNTIME ERROR BOUNDARY`.

These states must not be converted to FAIL merely because implementation has not yet been authorized/materialized, and must not be converted to PASS without execution evidence.

## 11. Canonical stop-condition evaluation

### Contract absent/ambiguous

The semantic service contract exists for two Certification reads, but the concrete transport/runtime contract is absent. This triggers the task's runtime-boundary stop posture.

### Secret in environment

Not triggered by this task. No secret-dependent runtime is introduced.

### Unsafe error disclosure

Not observable because no concrete API error payload/runtime exists. It remains a mandatory future negative/security assertion.

## 12. 05.006 disposition

`task.skillcertify.05.006` reaches the following bounded QA conclusion:

- Stage 04 service semantics: **AVAILABLE / AUTHORITATIVE**;
- Certification read implementation readiness: **READY, NOT RUNTIME-VERIFIED**;
- concrete API transport/runtime: **NOT ESTABLISHED**;
- API/contract execution: **BLOCKED AT RUNTIME BOUNDARY**;
- invalid-input API evidence: **REQUIRED FUTURE**;
- safe API error evidence: **REQUIRED FUTURE**;
- backend/API PASS: **NOT CLAIMED**;
- blocked Stage 04 capabilities: **UNCHANGED**.

## 13. Handoff requirement

A future governed runtime implementation must exist before this QA obligation can be converted into executable contract evidence.

That implementation must preserve the Stage 04 readiness contract and enable deterministic tests for success, empty success, exact identity, `not_found`, controlled `service_failure`, identity-neutral reads, leakage prevention and blocked-operation non-exposure.

Until then, the correct QA result is the explicit blocker recorded here.

## Final disposition

**05.006: BLOCKED AT RUNTIME/API BOUNDARY — GOVERNED CONTRACT EXISTS, EXECUTABLE API DOES NOT.**

This is evidence of a missing prerequisite, not evidence of API correctness or API failure.
