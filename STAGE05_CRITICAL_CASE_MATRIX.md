# Stage 05 — Critical Case Matrix

## Purpose

This document materializes `task.skillcertify.05.002` — **Definir matriz de casos críticos**.

It establishes a behavior-first QA risk matrix for the currently governed SkillCertify surfaces. It consumes the merged `STAGE05_QA_EXECUTION_BASELINE.md`, the Stage 04 contracts and readiness boundaries, and the recovered Stage 05 source contract supplied by the human owner.

The matrix is intentionally risk-oriented rather than tool-oriented. It does not impose a universal coverage percentage, invent unsupported runtime behavior, or promote conditional/blocked capabilities.

## 1. Source and authority

Recovered Stage 05 source establishes:

- stage: `stage.skillcertify.05` — Quality Assurance;
- workstream: Quality Strategy, Risk Model & AI POC;
- canonical task: `task.skillcertify.05.002`;
- canonical title: **Definir matriz de casos críticos**;
- objective: define critical behavior, boundary, risk and assurance priorities without inventing a universal target;
- validation: critical flows mapped; risk cases mapped; no invented universal coverage target; human review;
- expected evidence: risk-case matrix plus issue/checklist traceability;
- hard stops: undefined critical behavior, omission of a material flow, or invented coverage target without source.

The recovered Stage 05 sequence authorizes `05.002` after completed `05.001`. This document does not authorize `05.003+` by itself.

## 2. Modeling rules

Each row is modeled by product behavior rather than by testing tool.

Qualitative risk language is used because the governing source does not define a numeric scoring model.

### Behavior class

- **happy** — intended successful behavior;
- **negative** — explicit rejection/failure behavior;
- **edge** — boundary or ambiguity-sensitive behavior;
- **guardrail** — behavior whose purpose is preventing unsupported state or claims.

### Failure impact

- **high** — could materially misrepresent certification identity/status, break a core navigation/interaction path, leak deferred concepts, or create misleading persistence/runtime claims;
- **medium** — degrades an important but recoverable interaction, accessibility property, filter/status behavior, or evidence traceability;
- **low** — localized presentation or non-critical quality degradation with limited functional consequence.

### Contextual likelihood

- **current** — behavior exists in the current repository/frontend and can occur now;
- **future-runtime** — behavior is governed but depends on a future backend/runtime implementation;
- **conditional** — behavior depends on unresolved semantics or future authorization;
- **blocked** — behavior must not be implemented/exposed under the current contract.

These labels express context, not probability percentages.

## 3. Critical-case matrix

| ID | Scenario / governed behavior | Class | Failure impact | Context | Candidate validation layer | Data / environment need | Automation suitability | Expected admissible evidence | Owner / authority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C-01 | Dashboard exposes approved empty-state experience without implying unavailable backend capability | happy / guardrail | high | current | repository assertions + browser/UI validation | synthetic/local repository state | high | deterministic test result; rendered UI evidence when browser execution is authorized | current frontend contract / human-reviewed Stage 03–05 baseline |
| C-02 | Dashboard links to certification catalog without implying deferred account/progress features | happy / guardrail | high | current | repository assertions + browser navigation | local static routes | high | journey test + route/navigation evidence | current frontend contract |
| C-03 | Certifications list renders only approved synthetic certification concepts/fields | happy | high | current | repository assertions + rendered UI | governed synthetic dataset | high | deterministic test output; UI snapshot/evidence if executed | current frontend + Stage 04 Certification contract |
| C-04 | Certification filter returns deterministic local results and reflows without overflow | happy / edge | medium | current | repository assertions + responsive browser validation | synthetic catalog; intermediate viewport sizes | high | filter tests; responsive browser evidence when executed | frontend contract |
| C-05 | Certification detail resolves known exact synthetic identity correctly | happy | high | current | repository assertions + route-level browser validation | governed certification IDs | high | exact-identity tests; route evidence | frontend contract; mirrors future Stage 04 service obligation |
| C-06 | Unknown certification identity produces honest deterministic not-found behavior | negative | high | current | repository assertions + route/browser validation | invalid/nonexistent ID | high | not-found test evidence; no fallback content | frontend contract; Stage 04 exact-identity semantics |
| C-07 | Unknown identity never falls back to fake/placeholder certification data | guardrail | high | current and future-runtime | repository assertions now; future service contract test | invalid/nonexistent ID | high | negative test proving absence of fallback | Stage 04 service behavior contract |
| C-08 | Critical journey dashboard → catalog → detail → catalog remains connected | happy | high | current | repository journey test + browser E2E when authorized | local routes + synthetic IDs | high | current journey test; later browser-level execution evidence | frontend contract / Stage 05 QA |
| C-09 | Shared navigation semantics remain present across core surfaces | happy / guardrail | medium | current | repository assertions + accessibility/browser inspection | core routes | high | deterministic tests; semantic inspection if executed | frontend/accessibility contract |
| C-10 | Keyboard-operable Practice status control preserves tab semantics | happy / accessibility | high | current | repository assertions + keyboard/browser validation | practices route | high | semantic tests; keyboard interaction evidence when executed | frontend/accessibility contract |
| C-11 | Practices surface exposes only canonical essential statuses | guardrail | high | current | repository assertions + UI inspection | local practices data/state | high | deterministic status-surface tests | frontend contract |
| C-12 | Practice UI state remains frontend-only/non-persistent | guardrail | high | current | repository assertions + reload/browser behavior when authorized | practices route; no backend | high | tests proving non-persistent boundary; browser reload evidence if executed | Stage 03/04 current boundary |
| C-13 | Practice read semantics are not promoted to unconditional backend readiness | guardrail | high | conditional | contract review / future runtime QA only after semantics resolved | ownership/visibility decision | medium | reviewed contract change + later runtime tests | currently unresolved; human/governed future task required |
| C-14 | Practice mutation remains unavailable until explicitly governed | guardrail / negative | high | blocked | repository surface inspection + future API negative tests if runtime exists | no mutation implementation | high | proof of absence/non-exposure; future endpoint contract evidence | Stage 04 blocked boundary |
| C-15 | Evidence surface exposes accessible local-link workflow | happy | medium | current | repository assertions + browser/accessibility validation | evidence route | high | current deterministic tests; browser/axe evidence if executed | frontend/accessibility contract |
| C-16 | Evidence state remains non-persistent and does not imply durable storage | guardrail | high | current | repository assertions + reload/browser validation | evidence route; no persistence | high | tests proving local/non-persistent boundary | Stage 03/04 current boundary |
| C-17 | Durable Evidence operations remain unavailable until identity/owner/lifecycle/storage/auth semantics are governed | guardrail / negative | high | blocked | contract review + future runtime negative exposure tests | no durable evidence backend | high | proof of absence; later governed contract/runtime evidence | Stage 04 blocked boundary |
| C-18 | User/Account/Progress concepts do not leak into current read surfaces | guardrail | high | current and future-runtime | repository assertions now; future service contract test | certification read payloads | high | no-leakage tests / schema assertions | Stage 04 service contract |
| C-19 | Certification collection read returns only approved fields | happy | high | future-runtime | backend service contract test | concrete service runtime; governed data | high once runtime exists | executed service test proving approved field set | Stage 04 implementation-ready capability |
| C-20 | Empty certification collection is successful and distinct from failure | edge | high | future-runtime | backend service contract test | runtime capable of controlled empty dataset | high once runtime exists | explicit empty-success result distinct from failure | Stage 04 service behavior contract |
| C-21 | Known exact certification identity resolves correctly in service runtime | happy | high | future-runtime | backend service contract test | runtime + known governed ID | high once runtime exists | executed exact-identity PASS | Stage 04 implementation-ready capability |
| C-22 | Unknown exact certification identity yields deterministic `not_found` | negative | high | future-runtime | backend service contract test | runtime + unknown ID | high once runtime exists | executed `not_found` evidence | Stage 04 behavior contract |
| C-23 | Controlled `service_failure` is distinguishable from `not_found` | negative / edge | high | future-runtime | backend controlled-failure test | injectable/controllable service failure mechanism | medium until runtime design exists | executed failure classification evidence | future runtime implementation under Stage 04 contract |
| C-24 | Controlled `service_failure` is distinguishable from successful empty list | negative / edge | high | future-runtime | backend controlled-failure test | empty dataset plus failure injection | medium until runtime exists | executed differential-result evidence | Stage 04 behavior contract |
| C-25 | Certification reads require no authentication under current contract | guardrail | high | future-runtime | service/API auth contract test | concrete transport/runtime if introduced | high once runtime exists | successful unauthenticated read evidence without protected-surface leakage | Stage 04 auth/security contract |
| C-26 | Read surface does not accidentally expose Practice mutation or durable Evidence operations | guardrail | high | future-runtime | API/service surface enumeration + negative contract tests | concrete runtime | high once runtime exists | endpoint/service inventory + negative exposure evidence | Stage 04 readiness contract |
| C-27 | Remote Certification filtering/search is not implemented as if semantics were already final | guardrail | high | conditional | contract review first; runtime tests only after governing semantics | resolved filtering/search semantics | medium | approved contract + later execution evidence | unresolved conditional capability |
| C-28 | Repository quality aggregate remains deterministic: lint → typecheck → tests → build | guardrail | medium | current | command execution | clean install | high | `npm run quality` output | repository baseline |
| C-29 | Production build continues generating the governed current routes successfully | happy | medium | current | build execution | clean dependency install | high | successful Next.js production build and route generation | repository baseline |
| C-30 | Accessibility tooling remains reproducible for `/evidence` | happy / guardrail | medium | current | axe CLI against running app | local server + axe CLI dependency | high | executed `npm run a11y:axe` output when run | repository package script / Stage 03–05 evidence governance |
| C-31 | Broader multi-route accessibility PASS is not claimed from historical evidence alone | guardrail | high | current | evidence/provenance review; fresh multi-route execution if claim required | running app + explicit route list | high | fresh outputs per route or bounded historical-only statement | Stage 03 evidence boundary / Stage 05 baseline |
| C-32 | Browser E2E PASS is not inferred from repository-level Node tests | guardrail | high | current | evidence provenance review; future browser runner execution | browser environment | high once runner is governed | explicit browser-run evidence | Stage 05 QA governance |
| C-33 | Backend/API/auth/persistence/security QA PASS is not inferred when no runtime exists | guardrail | high | current | evidence review | none until runtime introduced | high | explicit `NOT ESTABLISHED` state until executed evidence exists | Stage 05 QA governance |
| C-34 | Install audit result is reported with execution-time scope, not as permanent security certification | guardrail | medium | current | `npm ci`/audit evidence review | dependency registry/install | high | timestamp/revision-bounded audit output | repository baseline |
| C-35 | Deprecated ESLint warning remains a warning unless separately governed; it must not silently become a release blocker or be ignored as proof of supported status | edge / governance | medium | current | dependency/toolchain review | current package lock/install | high | captured install warning; separate governed remediation if opened | repository/toolchain ownership currently not separately assigned |
| C-36 | Stage 05 risk/evidence documents never convert AI narrative into execution PASS | guardrail | high | current | provenance review / human review | issue/PR/evidence records | high | claims linked to commands/artifacts; human review | Stage 05 governance |

## 4. Critical-flow groupings

### A. Current user-visible critical journey

The current core journey is:

1. dashboard presents the approved empty-state/product entry surface;
2. user reaches certification catalog;
3. catalog exposes deterministic synthetic certifications and local filtering;
4. user reaches exact certification detail;
5. unknown identity remains honest `not_found` rather than fabricated fallback;
6. user can return to catalog;
7. shared navigation/accessibility semantics remain intact.

Material cases: `C-01` through `C-10`, plus `C-28` and `C-29` as repository viability guardrails.

### B. Current deferred-capability integrity

The current product must not imply capabilities that Stage 04 left conditional or blocked.

Material cases: `C-11` through `C-18`, `C-27`, `C-33`.

The purpose of these cases is not to test nonexistent implementations; it is to ensure current surfaces and future work do not silently cross governance boundaries.

### C. Future Certification service contract

The two Certification reads are implementation-ready but not runtime-verified. If a runtime is introduced by an authorized task, the critical QA behavior is defined now without pretending execution has happened.

Material cases: `C-19` through `C-26`.

### D. Evidence integrity and reproducibility

QA claims must remain reproducible and scope-correct.

Material cases: `C-28` through `C-36`.

This includes accessibility provenance, browser-vs-repository evidence separation, dependency audit scope, and AI non-authority.

## 5. Risk priorities

No numeric universal score is assigned. Priority follows material impact and governance readiness.

### Priority A — must remain protected continuously

- exact/honest certification identity behavior (`C-03`, `C-05`, `C-06`, `C-07`);
- current critical journey connectivity (`C-01`, `C-02`, `C-08`);
- prevention of deferred/blocked capability leakage (`C-12`–`C-18`, `C-27`);
- evidence provenance/non-fabrication (`C-31`–`C-36`).

### Priority B — required when Certification runtime exists

- approved fields and empty-list semantics (`C-19`, `C-20`);
- exact identity and `not_found` (`C-21`, `C-22`);
- controlled failure differentiation (`C-23`, `C-24`);
- identity-neutral reads and absence of protected/deferred surface leakage (`C-25`, `C-26`).

These are future-required, not current FAIL/PASS claims.

### Priority C — important current quality properties

- responsive/filter behavior (`C-04`);
- shared navigation/accessibility semantics (`C-09`, `C-10`, `C-15`, `C-30`);
- deterministic quality/build execution (`C-28`, `C-29`);
- time-bounded dependency audit interpretation (`C-34`);
- deprecated ESLint warning traceability (`C-35`).

## 6. Test-data and environment posture

Current frontend/repository cases primarily use governed synthetic/local data and deterministic static routes.

Future runtime cases must not invent production-like data requirements prematurely. At minimum, future Certification service verification will need controlled fixtures capable of representing:

- one or more known exact Certification identities;
- an unknown identity;
- an empty collection;
- controlled service failure;
- payload inspection for approved fields and leakage checks.

Practice mutation, durable Evidence and User/Account/Progress fixtures are not required because those capabilities remain blocked.

## 7. Automation posture

Automation suitability is case-specific rather than a target percentage.

High-suitability behaviors are deterministic identity semantics, navigation assertions, schema/field boundaries, negative exposure checks, build/type/lint checks and known accessibility semantics.

Human/manual or mixed verification remains appropriate when the evidence depends on:

- unresolved product semantics;
- qualitative interaction review not yet encoded in a browser runner;
- source/authority reconciliation;
- gate/release decisions reserved to humans.

No automation coverage quota is established by this task.

## 8. Traceability checklist

- [x] current critical frontend journey mapped;
- [x] certification exact-identity happy/negative cases mapped;
- [x] current accessibility/navigation behaviors mapped;
- [x] current Practice/Evidence non-persistence guardrails mapped;
- [x] blocked-capability non-exposure mapped;
- [x] future Certification service read obligations mapped;
- [x] empty success vs `service_failure` vs `not_found` distinctions mapped;
- [x] unauthenticated-read and data-leakage boundaries mapped;
- [x] evidence provenance / browser-vs-repository / historical-vs-current boundaries mapped;
- [x] dependency audit scope mapped;
- [x] deprecated ESLint warning recorded without scope expansion;
- [x] no universal coverage target introduced;
- [x] unknown/conditional owners remain explicit rather than fabricated;
- [ ] human review/merge of this matrix.

## 9. Hard-stop review

### Critical behavior undefined

**Not detected in the currently governed scope.** The matrix names the material current behaviors and the future-required Certification runtime behaviors already established by Stage 04.

This does not mean all future product behavior is known; conditional/blocked capability semantics remain explicitly unresolved.

### Material flow omitted

No known material current frontend flow from the Stage 05 baseline is intentionally omitted. The dashboard → catalog → detail journey, Practice/Evidence boundaries, accessibility/evidence integrity and future Certification read contracts are all represented.

If human review identifies a material governed flow missing from this matrix, `05.002` must remain incomplete until corrected.

### Invented coverage target

**None introduced.** No percentage, line/branch target, automation quota or universal numeric threshold is claimed.

## 10. Evidence state after this task

This matrix is a **planning/risk-model artifact**, not execution evidence for cases that have not been run.

Current `PASS` claims remain limited to actual repository executions previously recorded by `05.001` and subsequent local quality validation.

Rows marked future-runtime, conditional or blocked retain those states until an authorized task provides new governed evidence.

## 11. 05.002 completion boundary

`05.002` is complete only when:

1. this risk-case matrix is versioned;
2. current critical flows are materially represented;
3. negative and edge/boundary cases are materially represented;
4. future Certification runtime obligations are captured without fabricated execution claims;
5. conditional/blocked boundaries remain preserved;
6. no unsupported universal coverage target exists;
7. repository quality remains green after the documentation change;
8. human review accepts that no known material governed flow is omitted.

## 12. Next-task boundary

This artifact does not execute `05.003` and does not self-authorize later work merely by existing.

After successful local verification and human review/merge of `05.002`, the coordinator may proceed only according to the recovered canonical Stage 05 sequence and the exact `05.003` contract from the authoritative package.

## Final disposition

- canonical task: `task.skillcertify.05.002`;
- critical flows: **MAPPED**;
- risk cases: **MAPPED**;
- happy / negative / edge / guardrail behavior: **MAPPED**;
- universal coverage target: **NOT INTRODUCED**;
- Stage 04 ready / conditional / blocked distinctions: **PRESERVED**;
- future runtime evidence: **NOT FABRICATED**;
- human review: **REQUIRED**;
- `05.003+`: **NOT EXECUTED BY THIS ARTIFACT**.
