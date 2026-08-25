# Stage 04 — Verification & Release Evidence Baseline

## Purpose

This document materializes `task.skillcertify.04.010` in the Stage 04 workstream **Tests, AI Governance & Release Evidence**.

Its purpose is to establish what may be claimed from executed evidence, what remains future-required evidence, what provenance is required for release-facing claims, and how AI-authored narrative is constrained by deterministic artifacts and human authority.

This baseline is intentionally technology-neutral and does **not** implement a backend/API, choose a test framework, select a security scanner, create auth, authorize release, or manufacture results for capabilities that do not yet exist.

## 1. Core rule

**Evidence over inference. AI narrative is not evidence.**

A statement such as "tests pass", "the API is secure", "auth works", "the build is releasable", or "the service is production-ready" is admissible only when the exact claim is supported by traceable execution evidence appropriate to that claim.

Generated summaries may explain evidence. They may not replace raw checks, logs, diffs, version identifiers, review records, or human gate authority.

## 2. Evidence-state vocabulary

### `executed`

A check was actually run against a known repository state and an observable result exists.

### `versioned_historical`

A prior executed result is preserved in repository/PR/issue evidence and remains useful as historical context, but is not automatically proof of the current branch state.

### `required_future`

The evidence is mandatory once the corresponding runtime/capability exists, but no result may be claimed before execution.

### `not_applicable_currently`

The evidence category is not meaningful for the currently implemented surface because the governed capability does not exist yet.

### `unknown`

The repository/evidence trail is insufficient to make a positive or negative claim.

## 3. Current repository execution evidence

The current `04.010` branch was locally verified immediately before this artifact was created with:

```text
git fetch origin
git switch main
git pull
git switch task/skillcertify-04-010-verification-evidence-baseline
git pull
npm ci
npm run quality
git status
```

Observed results supplied for this task:

- branch synchronized with `origin/task/skillcertify-04-010-verification-evidence-baseline`;
- `npm ci` — PASS;
- npm install audit — 0 vulnerabilities reported;
- lint — PASS;
- typecheck — PASS;
- tests — 22/22 PASS;
- build — PASS;
- static generation — 10/10 pages;
- working tree — clean before this documentation change.

The versioned `quality` command is:

```text
npm run lint && npm run typecheck && npm run test && npm run build
```

This is evidence for the current frontend/repository baseline only. It is **not** evidence that a backend/API/auth/persistence runtime works, because those capabilities are not implemented.

## 4. Historical evidence that remains admissible

`ALPHA_EVIDENCE.md` preserves the Stage 03 evidence package, including deterministic quality results, critical-journey evidence, responsive review, accessibility review, the bounded AI POC, and human review/merge authority.

`AI_POC_EVALUATION.md` establishes the current AI-governance precedent:

- product/runtime AI — deferred;
- autonomous AI authority — rejected;
- bounded AI review assistance — optional;
- deterministic/manual evidence — authoritative.

Historical evidence may establish lineage, prior decisions and previously observed behavior. It must not be silently promoted to current execution evidence after materially relevant code, dependency, configuration or runtime changes.

## 5. Stage 04 implementation-readiness boundary

`SERVICE_IMPLEMENTATION_READINESS.md` establishes the current minimum implementation-safe service surface:

- Certification collection read — `ready`;
- Certification exact-identity detail read — `ready`;
- remote Certification filtering/search — `conditionally_ready`;
- Practice read — `conditionally_ready`;
- Practice mutation — `blocked`;
- durable Evidence operations — `blocked`;
- User/Account/Progress service surfaces — `blocked`.

Therefore this task must define verification requirements for future Certification read implementation while preserving the fact that no concrete service runtime result currently exists.

## 6. Current evidence matrix

| Evidence category | Current state | What can be claimed now | What cannot be claimed now |
| --- | --- | --- | --- |
| install/dependency resolution | `executed` | current branch dependencies installed successfully | long-term supply-chain safety or future install success |
| npm audit during install | `executed` | install reported 0 vulnerabilities at execution time | absence of all dependency/security risk |
| lint | `executed` | current source passed configured lint rules | semantic/runtime correctness |
| typecheck | `executed` | current TypeScript passed configured static checking | runtime correctness or API contract correctness |
| repository tests | `executed` | current 22 tests passed | backend/API/auth behavior not represented by those tests |
| production build | `executed` | current Next.js production build succeeded | production deployment/runtime health |
| static route generation | `executed` | current governed static routes generated successfully | remote service availability |
| Stage 03 manual/accessibility evidence | `versioned_historical` | prior reviewed frontend evidence exists | current exhaustive accessibility certification |
| Certification backend/service contract tests | `required_future` | requirements can be defined | no PASS/FAIL result may be stated |
| API transport tests | `not_applicable_currently` | none | no API behavior claim |
| auth tests | `not_applicable_currently` | Certification reads remain identity-neutral by contract | no login/session/provider correctness claim |
| mutation/transaction tests | `not_applicable_currently` | blocked capabilities remain outside runtime scope | no mutation durability/idempotency/concurrency claim |
| security scanner/SAST results | `unknown` | only configured lint/type/static evidence may be cited | no generic "security scan passed" claim |
| release/deployment evidence | `required_future` | provenance requirements can be defined | no release-ready/production-ready claim |

## 7. Required future Certification service evidence

When the two `ready` Certification reads are concretely implemented, deterministic execution evidence MUST cover at least:

1. list Certifications succeeds and returns only approved fields;
2. empty governed source returns successful empty collection;
3. exact known identity returns exactly one matching Certification;
4. unknown identity produces deterministic `not_found`;
5. unknown identity never falls back to another or fabricated record;
6. controlled service/infrastructure failure remains distinguishable from `not_found`;
7. controlled service/infrastructure failure remains distinguishable from successful empty collection;
8. Certification reads do not require authentication under current governance;
9. User/Account/Progress concepts do not appear in the representation;
10. blocked Practice mutation and durable Evidence operations are not accidentally exposed.

These are `required_future` until implementation and execution occur.

## 8. Test-evidence admissibility rules

A test claim is admissible only when the evidence identifies, directly or through a traceable CI/PR record:

- repository;
- branch/commit SHA or immutable equivalent;
- command/test runner;
- test scope;
- execution result;
- relevant configuration/version when material;
- execution time or associated workflow/PR context;
- failing/skipped/cancelled status where applicable.

A screenshot or prose summary without traceable execution context is weaker supporting material and must not substitute for machine-readable/raw output when such output exists.

A test count alone is insufficient if the covered behavior is not identifiable.

## 9. API/transport evidence requirements

No transport exists today, so no API transport result is claimed.

Once a concrete adapter exists, verification MUST demonstrate as applicable:

- request/response encoding preserves the approved service semantics;
- exact identity behavior is preserved at the transport boundary;
- `not_found`, successful empty collection and `service_failure` remain distinguishable;
- malformed/invalid transport input cannot silently change domain meaning;
- blocked capabilities are not routable/exposed;
- material contract changes are visible through schema/contract diff or an equivalent deterministic artifact.

HTTP status codes, GraphQL errors, RPC envelopes or other protocol-specific mappings belong to later implementation evidence, not this baseline.

## 10. Authentication and authorization evidence

Current Certification reads are governed as identity-neutral. Therefore:

- an auth subsystem is not required to prove those reads;
- absence of auth tests is not currently a defect for this two-read surface;
- introducing mandatory auth by framework convention would violate the current contract unless separately governed.

If a future protected capability is authorized, evidence MUST prove both allowed and denied behavior against an approved principal/ownership policy.

Generic claims such as "middleware protects the API" are inadmissible without capability-specific authorization evidence.

Practice reads remain conditional because ownership/visibility is unresolved. Practice/Evidence mutations remain blocked; tests must not be fabricated for them.

## 11. Security/static-analysis evidence

Current admissible security-adjacent evidence is limited to what was actually executed/configured, including the install audit result and existing deterministic source checks.

This task does not claim execution of:

- dedicated SAST;
- DAST;
- dependency policy enforcement beyond the observed install audit;
- secret scanning;
- container/image scanning;
- infrastructure scanning;
- penetration testing;
- threat-model validation.

If any such control is introduced later, its evidence MUST identify the exact tool/version/configuration/scope and result. A generated AI security review cannot be relabeled as scanner output or penetration-test evidence.

A clean scanner result also must not be translated into a universal claim that the system is secure.

## 12. Build and release provenance

A future release-facing evidence package MUST bind the claimed artifact to the code that produced it.

At minimum, provenance should identify:

- repository and immutable source commit;
- branch/tag/release identifier where applicable;
- clean/known source state;
- dependency lockfile used;
- exact build command;
- build result;
- test/check results required by the applicable gate;
- produced artifact identifier, digest/checksum or immutable deployment identifier where the platform supports one;
- environment/toolchain versions when materially relevant;
- CI workflow/run/job identifiers when CI is used;
- human reviewer/gate decision when authorization is required.

A build log from commit A cannot authorize release of artifact B without an explicit provenance link.

## 13. Evidence freshness and invalidation

Evidence is not permanently current.

Re-execution is required when a change can materially affect the claim, including as applicable:

- relevant source changes;
- dependency/lockfile changes;
- compiler/build configuration changes;
- test configuration changes;
- runtime/transport changes;
- security/auth policy changes;
- deployment environment changes.

Documentation-only changes may reuse prior runtime evidence only when the reviewer can establish that the underlying executable state is unchanged and the claim explicitly reflects that boundary.

## 14. AI-governance rules

AI may:

- summarize raw execution evidence;
- compare artifacts and propose candidate inconsistencies;
- help classify residual risk;
- draft review notes;
- propose missing checks.

AI may not, without independent evidence:

- convert unexecuted requirements into PASS results;
- infer backend/API behavior from frontend tests;
- invent logs, test cases as executed, scanner findings or deployment results;
- claim release readiness from narrative consistency;
- treat its own code review as deterministic validation;
- silently resolve ambiguous evidence;
- exercise human merge/release/gate authority.

Every AI-originated factual finding that affects a gate, defect, security statement or release claim must be independently verifiable from authoritative source or execution evidence.

## 15. Narrative-to-evidence claim rules

The following forms are acceptable:

- "`npm run quality` passed on commit X with 22/22 repository tests" — when backed by execution evidence.
- "Certification service tests are required before implementation acceptance" — requirement, not result.
- "No auth provider is currently implemented or required for Certification reads" — bounded architectural fact.

The following forms are not acceptable without additional evidence:

- "The API passes all tests" when no API exists;
- "Authentication is secure" when no auth subsystem exists;
- "The backend is production-ready" from a successful frontend build;
- "No vulnerabilities exist" from one npm audit result;
- "AI review confirms correctness" as a gate substitute.

## 16. Residual risks and unknowns

Current residual risks/unknowns include:

- no concrete Certification backend/service runtime exists yet;
- no transport/protocol has been selected;
- no API schema/compatibility artifact exists yet;
- no controlled backend `service_failure` path has been executed;
- no auth/principal model exists for future protected capabilities;
- Practice ownership/visibility remains unresolved;
- Practice mutations and durable Evidence remain blocked;
- no dedicated security scanning baseline is established by this task;
- no CI/release artifact provenance package is established by this task;
- the historical multi-route axe sweep remains less reproducible than the single versioned `/evidence` command;
- current tests are repository/contract tests and not a browser E2E or backend integration suite.

Unknowns must remain unknown until evidence resolves them.

## 17. Minimum future implementation evidence package

When the Certification read runtime is later implemented, its PR should include as applicable:

1. immutable source revision;
2. selected runtime/transport rationale;
3. exact files/modules changed;
4. deterministic service contract tests and raw result;
5. transport tests if a transport exists;
6. controlled `service_failure` evidence;
7. compatibility/schema-diff evidence where a schema exists;
8. proof that identity-neutral Certification reads remain unauthenticated by contract;
9. proof that blocked capabilities remain unavailable;
10. current `npm run quality` result;
11. successful production build;
12. dependency/security checks actually configured for that implementation;
13. clean/known repository state;
14. no secrets/private production data in fixtures/logs;
15. human review before any merge/gate/release decision.

## 18. 04.010 completion decision

This baseline establishes a governed distinction between:

- evidence already executed on the current repository;
- historical versioned evidence;
- evidence required only after the Certification runtime exists;
- currently non-applicable backend/auth/mutation evidence;
- unresolved security/release evidence.

It does not create new runtime claims.

The current repository may be described as having a green frontend/repository quality baseline for the executed checks listed in Section 3. It may **not** be described as having a verified backend/API/auth/release baseline.

## 19. Handoff posture for 04.011–04.012

Downstream Tests, AI Governance & Release Evidence work MUST preserve these rules:

- executable evidence precedes positive runtime claims;
- raw/deterministic artifacts remain authoritative over generated summaries;
- evidence must be traceable to an immutable or clearly identified code state;
- historical evidence must not masquerade as fresh execution;
- blocked/unimplemented capabilities cannot receive fabricated PASS evidence;
- security claims remain narrower than the tools/checks actually executed;
- release claims require artifact/source provenance;
- AI findings remain candidates until independently verified;
- human review/gate/merge authority remains authoritative.

Any later gate or release decision must consume this evidence model rather than replacing it with narrative confidence.
