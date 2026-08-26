# Stage 05 — Minimal Critical Test Suite

## Purpose

This document materializes `task.skillcertify.05.004` — **Implementar suíte mínima unitária e de componentes** — as a bounded, deterministic test-automation step within Stage 05 — Quality Assurance.

It consumes the merged critical-case matrix from `05.002` and the bounded AI review POC from `05.003`. The expected behavior remains human-owned; AI assistance does not redefine assertions.

## 1. Canonical task contract

Recovered Stage 05 source establishes:

- workstream: **Test Automation & Critical Coverage**;
- task type: `test`;
- priority: `agora`;
- human review: required;
- dependencies: `05.002`, `05.003`;
- objective: implement a minimal unit/component/integration suite for critical behavior and edge cases;
- validation: deterministic execution, critical behavior/edge coverage, no critical flaky or tautological tests;
- expected evidence: tests, test report, PR.

Canonical stop conditions:

- critical test flaky;
- test tautological;
- test only mirrors implementation detail.

## 2. Selection rule

The merged `STAGE05_CRITICAL_CASE_MATRIX.md` is the behavior/risk source.

Only cases executable against the current repository architecture are eligible in this task. Browser E2E is reserved for `05.005`; concrete API/runtime contract execution is reserved for `05.006`; blocked backend/auth/persistence capabilities remain outside this task.

No universal coverage percentage is introduced.

## 3. Baseline before materialization

The human owner synchronized the branch and executed:

```text
npm ci
npm run quality
git status
```

Observed baseline:

- install completed successfully;
- audit reported `0 vulnerabilities` at execution time;
- lint PASS;
- typecheck PASS;
- repository tests `22/22 PASS`;
- production build PASS;
- static generation `10/10` pages;
- working tree clean.

The ESLint deprecation warning remains a warning only and is not expanded into unrelated dependency-upgrade scope.

## 4. Existing suite posture

The repository already contained deterministic source-contract and journey tests covering:

- dashboard → catalog → detail navigation;
- local catalog filtering;
- governed synthetic certification detail rendering;
- frontend `notFound()` handling;
- non-persistent Practice/Evidence boundaries;
- shared shell/navigation semantics;
- accessibility-related source assertions;
- foundation quality-script presence.

Those tests remain valid evidence for the scope they actually exercise.

However, several of them inspect repository source text. That is useful for versioned contract assertions but does not directly execute the pure catalog lookup behavior.

## 5. Added deterministic behavioral coverage

This task adds `tests/certification-catalog.test.mjs` to execute the current pure catalog module directly.

The added cases cover four critical behavior groups.

### 5.1 Canonical synthetic identities

Assert that the governed local catalog exposes exactly the three currently approved synthetic identities, in deterministic order:

- `cert-frontend-foundations`;
- `cert-web-platform`;
- `cert-typescript-practice`.

The test also asserts uniqueness of those identities.

### 5.2 Exact-identity resolution

For every governed catalog record, `findCertification(id)` must resolve the exact record.

This exercises the current repository implementation of the Stage 04/05 exact-identity behavior without claiming a backend runtime exists.

### 5.3 Unknown identity has no fallback

The lookup must return `undefined` for:

- an unknown synthetic identity;
- a case-changed identity;
- an identity with trailing whitespace.

This protects exact identity semantics and the no-fallback rule at the currently executable repository layer.

It does not claim transport-level `not_found`; the route remains responsible for translating a missing local lookup into frontend `notFound()` behavior.

### 5.4 Approved frontend fields only

Each local certification record must expose exactly:

- `id`;
- `title`;
- `issuer`;
- `level`;
- `summary`.

This provides deterministic repository-level evidence against accidental User/Account/Progress or other field leakage in the local synthetic catalog.

It is not backend/API schema evidence.

## 6. Anti-tautology posture

The new tests execute the exported catalog data/function rather than merely matching the source text of `findCertification()`.

Assertions are behavior-oriented:

- exact inputs resolve exact records;
- invalid identity variants do not resolve;
- governed records expose the approved public field set.

No test asserts implementation syntax such as the internal use of `.find()`.

## 7. Critical-case traceability

The new suite strengthens currently executable portions of the merged risk matrix, especially:

- governed Certification identity integrity;
- exact-identity detail lookup;
- unknown identity / no-fallback edge behavior;
- approved-field boundary and leakage prevention;
- deterministic synthetic catalog baseline.

Future-runtime cases such as `service_failure`, empty remote collection, auth-neutral transport, database behavior and durable Evidence remain future-required rather than falsely simulated here.

## 8. Determinism and flakiness

The added tests:

- use Node's existing repository test runner;
- require no network;
- require no browser;
- require no clock/randomness;
- require no external service;
- use immutable repository-local synthetic data;
- contain no retries or hidden fallback.

Therefore their design is deterministic. Actual PASS evidence must still come from execution after this materialization.

## 9. Evidence boundary

This task may establish, after successful execution:

- repository-level deterministic behavior coverage for the local Certification catalog;
- exact local lookup behavior;
- local no-fallback behavior;
- approved local record-field boundary;
- regression evidence from the existing suite.

This task does **not** establish:

- browser E2E PASS;
- API/backend contract PASS;
- remote filtering/search PASS;
- persistence/database PASS;
- authentication/authorization runtime PASS;
- transaction behavior;
- durable Evidence behavior;
- SAST/DAST/security PASS;
- production deployment/runtime PASS.

## 10. Completion boundary

`05.004` is ready for human review when:

1. the new deterministic tests are versioned;
2. `npm run quality` executes successfully after materialization;
3. the full test count and result are recorded from actual execution;
4. working tree is clean;
5. human review accepts the change.

No result in this document self-authorizes `05.005` or `05.006` before the governed merge of this task.

## Final disposition before post-materialization execution

- source-backed task contract: **RECOVERED**;
- selected behavior scope: **CURRENTLY EXECUTABLE / BOUNDED**;
- new behavioral tests: **VERSIONED**;
- anti-tautology design: **PRESERVED**;
- browser E2E: **OUT OF SCOPE / `05.005`**;
- API/runtime contract execution: **OUT OF SCOPE / `05.006`**;
- post-materialization test result: **PENDING HUMAN-EXECUTED VERIFICATION**.
