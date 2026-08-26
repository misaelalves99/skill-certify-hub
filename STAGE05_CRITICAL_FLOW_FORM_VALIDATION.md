# Stage 05 — Critical Flow & Form Validation

## Purpose

This document materializes `task.skillcertify.05.005` — **Validar fluxo crítico e formulários** — using the current repository/runtime evidence without inventing browser execution that does not exist.

The canonical task objective is to validate the critical journey, forms, error states and invalid inputs using synthetic or explicitly authorized data, with trace/artifact provenance available for review.

## 1. Source-backed task contract

Canonical validation requires:

- critical journey repeated;
- negative form/runtime cases pass;
- trace/artifact source available.

Expected evidence:

- journey test;
- trace/artifact;
- PR.

Stop conditions:

- real sensitive data without authorization;
- environment unstable beyond useful validation;
- auto-heal changes expectation.

## 2. Executed repository baseline

Immediately before this artifact was materialized, the task branch was synchronized from merged `main` and executed locally with:

```text
git fetch origin
git switch main
git pull
git switch task/skillcertify-05-005-critical-flow-forms
git pull
npm ci
npm run quality
git status
```

Observed evidence:

- `npm ci` completed successfully;
- install audit reported `0 vulnerabilities` at execution time;
- lint — PASS;
- typecheck — PASS;
- repository tests — `26/26 PASS`;
- production build — PASS;
- static generation — `10/10` pages;
- working tree — clean.

The known non-failing `MODULE_TYPELESS_PACKAGE_JSON` warning from the direct TypeScript catalog import remains visible. It is not a browser/runtime failure.

## 3. Existing critical-journey evidence

The repository already exposes:

```text
npm run test:journey
```

which executes `tests/critical-journey.test.mjs`.

That deterministic Node-based repository test verifies the governed path from dashboard to the synthetic certification catalog, deterministic local filtering, detail navigation and return-to-catalog behavior.

This is admissible critical-journey evidence **only for the repository/source-level assertions it executes**. It is not browser interaction evidence and does not produce a browser trace.

## 4. Current form/input surface

The current application does not expose a governed submit-form workflow.

The relevant interactive input surface is the Certifications search control in `app/certifications/page.tsx`:

- `type="search"` input;
- local `query` state;
- trim + lowercase normalization;
- matching by title, issuer and level;
- populated-result state;
- filtered empty state;
- explicit Clear filter action.

This is a **filter/search input**, not a durable form submission and not a backend-bound form.

Therefore this task must not imply validation of registration, login, evidence upload, account mutation, persistence or other forms that the current product slice does not implement.

## 5. Negative and edge cases currently evidenced

The existing deterministic repository suite covers source-level assertions for:

- local filter wiring;
- deterministic filter normalization;
- no-match empty-state copy;
- Clear filter action wiring;
- canonical exact Certification identity behavior;
- unknown/case-altered/empty/whitespace-padded/partial identities not resolving or falling back;
- honest not-found behavior;
- frontend-only and non-persistent boundaries.

The aggregate task baseline passed `26/26` tests.

These are valid repository-level negative/edge assertions. They are **not evidence that a real browser executed keyboard entry, click interaction, focus, navigation, history behavior or cross-engine rendering**.

## 6. Browser-harness inventory

The current versioned `package.json` exposes:

- `npm run test` — Node test runner;
- `npm run test:journey` — Node critical-journey test;
- `npm run a11y:axe` — axe CLI against `/evidence` when a local server is running;
- no Playwright script/dependency;
- no Cypress script/dependency;
- no other versioned browser-E2E runner.

Repository search also found no Playwright/Cypress/browser E2E configuration.

Therefore a reproducible browser-level journey harness is **not currently versioned**.

## 7. Trace/artifact boundary

The canonical task asks for trace/artifact provenance.

Current state:

- repository journey source: AVAILABLE;
- deterministic Node test report: AVAILABLE when executed;
- production build artifact evidence: AVAILABLE through build output;
- browser trace/video/screenshot from a governed E2E runner: NOT AVAILABLE;
- browser E2E runner configuration: NOT AVAILABLE.

No browser trace is fabricated for this task.

## 8. Validation disposition

### Critical journey repeated

**PASS — repository-level only.**

The current deterministic suite re-executed successfully as part of `npm run quality`, including the repository-defined critical journey.

### Negative form/runtime cases

**PARTIAL / BOUNDED.**

Negative and edge cases for the existing search/filter input and Certification identity behavior are represented by deterministic repository tests and passed in the task baseline.

A full browser/runtime interaction PASS is not established because no versioned browser E2E harness currently exists.

There are no governed submit-form workflows in the current product slice to validate.

### Trace/artifact source available

**PARTIAL.**

Source/test-report provenance is available. Browser trace provenance is not available because no browser E2E runner is versioned.

## 9. Canonical stop-condition assessment

- real sensitive data requested: **NO** — all current data is synthetic/repository-local;
- environment unstable beyond useful validation: **NO for repository baseline**;
- auto-heal changes expectation: **NOT USED**;
- missing reproducible browser harness: **YES — material execution gap for browser-level evidence**.

The missing browser harness is recorded as a concrete gap rather than converted into PASS.

## 10. Non-claims

This task does not establish:

- Playwright/Cypress/browser E2E PASS;
- browser trace/video/screenshot evidence;
- cross-browser compatibility PASS;
- actual browser keyboard/focus interaction PASS;
- submit-form validation beyond the current search/filter input;
- backend/API/auth/persistence runtime behavior;
- production runtime health;
- API/contract validation reserved for `05.006`.

## 11. Permitted next action

`05.005` can be reviewed as a **bounded validation result with an explicit browser-harness gap**.

Closing this task does not convert the missing browser-level evidence into PASS. Any later task or governing source that requires browser E2E execution must introduce or authorize a reproducible harness and execute it before such a claim is permitted.

## Final disposition

- repository critical journey: **EXECUTED / PASS within repository scope**;
- existing search/filter negative and edge assertions: **EXECUTED / PASS within repository scope**;
- governed submit forms: **NOT PRESENT in current product slice**;
- browser E2E harness: **NOT ESTABLISHED**;
- browser trace/artifact: **NOT ESTABLISHED**;
- sensitive-data boundary: **PRESERVED**;
- auto-heal expectation mutation: **NOT USED**;
- task result: **BOUNDED / PARTIAL — browser-level evidence gap remains explicit**;
- human review: **REQUIRED**.
