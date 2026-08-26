# Stage 05 — Quality Assurance Execution Baseline

## Purpose

This document materializes `task.skillcertify.05.001` as the bounded entry point into Stage 05 — Quality Assurance.

It consumes the exact human-approved Stage 04 G-P4 handoff and establishes what QA evidence is already admissible, what remains missing, and what may be claimed at Stage 05 entry without inventing an unrecovered Stage 05 master contract.

The exact canonical leaf wording and full Stage 05 task map are not currently exposed in the repository. This operational baseline is therefore intentionally bounded and must yield to any later recovered higher-authority source.

## 1. Authorization source

Stage 05 entry is authorized only by the merged human G-P4 decision in `STAGE04_GP4_DECISION.md`.

The decision is bound to:

- package id: `skillcertify-stage04-gp4`;
- package version: `stage04-gp4-v1`;
- source revision: `14a63df920808967a7ebc07ae1753f7f26d3a09c`;
- payload files: `12`;
- payload bytes: `173134`;
- SHA-256: `a839e59a027d2aa8ad35b7f7f08ff0c3dc556f621154033de52bf4adc7c8e8e8`;
- human gate decision: `G-P4: PASS`.

The bounded authorization is **BEGIN `05.001` ONLY**. It does not authorize `05.002+` automatically.

## 2. Stage 05 entry rule

**G-P4 PASS authorizes QA entry; it does not convert missing runtime evidence into QA PASS.**

At Stage 05 entry, every claim must remain tied to actual executed/versioned evidence.

Existing repository/frontend verification may be accepted as evidence for the scope it actually exercises. It must not be promoted into backend/API/auth/persistence/runtime verification.

## 3. Current executed repository baseline

Immediately before this baseline was materialized, the `05.001` branch was synchronized from merged `main` and locally executed with:

```text
git fetch origin
git switch main
git pull
git switch task/skillcertify-05-001-qa-execution-baseline
git pull
npm ci
npm run quality
git status
```

Observed execution evidence:

- branch synchronized with `origin/task/skillcertify-05-001-qa-execution-baseline`;
- `npm ci` — completed successfully;
- install audit — `0 vulnerabilities` reported at execution time;
- lint — `PASS`;
- typecheck — `PASS`;
- repository tests — `22/22 PASS`;
- production build — `PASS`;
- static generation — `10/10` pages;
- `git status` — clean before this documentation change.

This is bounded repository/frontend evidence only.

## 4. Versioned QA-relevant commands

The repository currently exposes the following deterministic quality commands through `package.json`:

- `npm run lint`;
- `npm run typecheck`;
- `npm run test`;
- `npm run build`;
- `npm run quality` as the aggregate sequence;
- `npm run test:journey` for the repository-defined critical journey test;
- `npm run a11y:axe` for the versioned axe scan of the `/evidence` route.

The aggregate `quality` command executes lint, typecheck, tests, and production build in sequence.

These commands are admissible QA inputs for their actual scope. They do not establish browser E2E, backend integration, API contract execution, auth enforcement, security scanning, persistence behavior, or production deployment health.

## 5. Current test coverage boundary

The 22 repository tests currently exercise repository/frontend concerns including:

- shared application shell/navigation semantics;
- accessibility-related text-token expectations;
- dashboard empty-state behavior;
- certifications list/filter behavior;
- governed synthetic certification detail behavior;
- deterministic not-found behavior in the frontend surface;
- critical repository journey from dashboard to catalog/detail;
- evidence-page local-link workflow and non-persistent boundaries;
- presence of a reproducible axe command;
- foundation scripts/core product baseline;
- practices essential status representation and keyboard-operable tab semantics;
- preservation of frontend-only/non-persistent boundaries.

The current suite is useful QA evidence for those repository/frontend assertions.

It is **not evidence** for:

- a concrete backend runtime;
- HTTP/GraphQL/RPC transport behavior;
- backend service failure behavior;
- persistence/database/ORM behavior;
- authentication or authorization enforcement;
- transaction behavior;
- durable Evidence behavior;
- production runtime behavior;
- security scanner findings;
- browser-level cross-engine E2E behavior unless separately executed and recorded.

## 6. Accessibility evidence boundary

Current accessibility evidence includes versioned repository assertions and a reproducible axe CLI command for `/evidence`.

Historical Stage 03 evidence reported broader multi-route axe execution, but the currently versioned command only directly reproduces the `/evidence` route.

Therefore:

- versioned `/evidence` axe reproducibility may be cited as available tooling/evidence when actually executed;
- historical broader coverage remains historical evidence;
- broader current multi-route accessibility PASS must not be claimed without a fresh reproducible execution.

## 7. Stage 04 readiness boundaries carried into QA

Stage 05 must preserve the exact readiness classifications inherited from the Stage 04 package until new governed evidence legitimately changes them.

### Implementation-ready, not runtime-verified

- Certification collection read;
- Certification exact-identity read.

### Conditionally ready

- remote Certification filtering/search;
- Practice read.

### Blocked

- Practice mutation;
- durable Evidence operations;
- User/Account/Progress service surfaces;
- any other capability explicitly marked blocked by the Stage 04 package.

G-P4 PASS does not silently alter these states.

## 8. QA evidence matrix at Stage 05 entry

| QA area | Current evidence state | Permitted claim |
| --- | --- | --- |
| lint | executed | `PASS` for current repository revision/branch execution |
| TypeScript typecheck | executed | `PASS` for current repository revision/branch execution |
| repository tests | executed | `22/22 PASS` for current test suite |
| production build | executed | `PASS` for current Next.js build |
| static generation | executed | `10/10` current generated pages |
| npm install audit | executed | `0 vulnerabilities reported` at this execution time |
| repository critical journey test | versioned/tested as part of suite | PASS for repository-defined deterministic journey assertions |
| axe `/evidence` tooling | versioned | command available; current branch full axe result not established by `npm run quality` |
| broad multi-route axe | historical | historical evidence only unless re-executed |
| browser E2E | not established | no PASS claim |
| backend contract tests | future-required | no PASS claim |
| API transport/integration tests | not established | no PASS claim |
| controlled backend `service_failure` | future-required | no PASS claim |
| persistence/database tests | not established | no PASS claim |
| auth/authz runtime tests | not established | no PASS claim |
| SAST/DAST/penetration testing | not established | no PASS claim |
| production runtime/health | not established | no PASS claim |

## 9. Known QA gaps

The following gaps remain visible at Stage 05 entry:

1. exact canonical Stage 05 master/task wording is not versioned in the current repository;
2. no concrete backend runtime exists to test from the available evidence;
3. the two Certification reads are implementation-ready but not runtime-verified;
4. the required future backend contract-test matrix remains unexecuted;
5. controlled `service_failure` execution evidence remains absent;
6. API transport/schema compatibility evidence is absent;
7. persistence/database/transaction execution evidence is absent;
8. auth/authz runtime evidence is absent;
9. browser-level E2E evidence is not established by the current repository test suite;
10. current reproducible axe tooling is narrower than historical multi-route coverage;
11. dedicated SAST/DAST/penetration-test evidence is not established;
12. production deployment/runtime-health evidence is not established.

These gaps are QA inputs and prerequisites, not failures that may be silently converted to PASS or completion claims.

## 10. Required future backend contract evidence inherited from Stage 04

If/when a concrete Certification service runtime is introduced by properly authorized work, the minimum governed contract evidence inherited from Stage 04 includes verification that:

1. Certification list succeeds with only approved fields;
2. empty collection is a successful result distinct from failure;
3. exact known Certification identity resolves correctly;
4. unknown exact identity returns deterministic `not_found`;
5. unknown identity does not return fallback/fake placeholder data;
6. `service_failure` is distinguishable from `not_found`;
7. `service_failure` is distinguishable from successful empty collection;
8. the two Certification reads require no authentication by current contract;
9. User/Account/Progress data does not leak into the read surface;
10. Practice mutation or durable Evidence operations are not accidentally exposed.

This baseline records those future QA obligations. It does not claim they have been executed.

## 11. Source-contract unknowns

The current repository does not expose sufficient authoritative material to safely invent:

- the complete Stage 05 task count;
- Stage 05 workstream structure;
- canonical names for `05.002+`;
- a Stage 05 WIP limit;
- a final Stage 05 gate identifier;
- exact Stage 05 exit criteria beyond what future recovered sources may establish.

These remain `UNKNOWN` rather than inferred.

If a higher-authority current-master Stage 05 source is later recovered, this operational baseline must be reconciled to it before progression that depends on those missing details.

## 12. AI governance in QA

AI assistance may:

- inventory evidence;
- compare outputs;
- identify contradictions/gaps;
- propose deterministic commands;
- summarize executed results.

AI assistance may not:

- convert unexecuted checks to PASS;
- treat G-P4 as runtime QA evidence;
- authorize `05.002+` without governing source/authority;
- fabricate backend/auth/security results;
- self-approve a human QA gate;
- merge its own PR.

## 13. 05.001 completion boundary

This task is complete when:

- the merged G-P4 package/decision is traceably identified;
- current QA-relevant commands and evidence are inventoried;
- repository/frontend PASS claims are bounded to their actual execution scope;
- missing backend/runtime/browser/security evidence remains explicit;
- Stage 04 ready/conditional/blocked boundaries are preserved;
- Stage 05 source-contract unknowns are recorded instead of invented;
- repository quality remains green after the baseline is materialized;
- human review/merge accepts this baseline.

## 14. Permitted next action

Until the canonical Stage 05 continuation contract is recovered or another governing source explicitly authorizes a subsequent task, this baseline does **not** self-authorize `05.002`.

After human review/merge of `05.001`, the permitted coordinator action is to recover/reconcile the authoritative Stage 05 continuation source and then open only the next task supported by that authority.

## Final disposition

- Stage 05 entry authorization: **VALID — G-P4 PASS / `05.001` ONLY**
- current repository/frontend quality baseline: **EXECUTED / PASS within bounded scope**
- backend/runtime QA completion: **NOT ESTABLISHED**
- browser E2E QA completion: **NOT ESTABLISHED**
- security QA completion: **NOT ESTABLISHED**
- Stage 04 readiness boundaries: **PRESERVED**
- canonical Stage 05 continuation contract: **UNKNOWN / MUST BE RECOVERED**
- autonomous authorization of `05.002+`: **NOT PERMITTED**
