# Stage 05 — AI Test & Review POC

## Purpose

This document materializes `task.skillcertify.05.003` — **Executar POC de IA para testes e revisão**.

The task is an experiment. Its purpose is not to grant AI authority over expected behavior, acceptance, test truth, or release decisions. It evaluates whether bounded AI assistance can improve test/review preparation while preserving the deterministic/manual evidence baseline established by Stage 05.

## 1. Canonical task contract

Recovered task identity:

- task: `task.skillcertify.05.003`;
- title: `Executar POC de IA para testes e revisão`;
- type: `experiment`;
- priority: `agora`;
- data class: `interno`;
- human review: `necessária`;
- dependencies: `task.skillcertify.05.001`, `task.skillcertify.05.002`;
- external action: `false`.

Canonical objective:

> Executar POC bounded de IA para testes/revisão ou registrar decisão manual/defer/reject com fallback.

Canonical validation:

- POC or fallback decision reproducible;
- data policy respected;
- expected behavior remains human-owned.

Expected evidence:

- POC scorecard;
- diff/test evidence;
- decision note.

Stop conditions:

- restricted data requested by tool;
- POC changes expected behavior;
- tool output not reproducible.

## 2. Preconditions

The experiment consumes the following merged Stage 05 artifacts:

- `STAGE05_QA_EXECUTION_BASELINE.md` from `05.001`;
- `STAGE05_CRITICAL_CASE_MATRIX.md` from `05.002`.

The critical-case matrix remains the human-owned expected-behavior source for this experiment.

The POC is not allowed to redefine those expectations merely because an AI-generated suggestion appears plausible.

## 3. Current deterministic baseline

Immediately before this POC artifact was materialized, the human operator executed the `05.003` branch baseline locally.

Observed evidence:

- `npm ci` — successful;
- install audit — `0 vulnerabilities` reported at execution time;
- lint — `PASS`;
- typecheck — `PASS`;
- repository tests — `22/22 PASS`;
- production build — `PASS`;
- static generation — `10/10` pages;
- `git status` — clean.

This execution is the deterministic/manual baseline against which AI assistance is evaluated.

No browser E2E, backend runtime, persistence, auth/authz runtime, SAST, DAST, penetration-test, or production runtime PASS is created by this baseline.

## 4. POC experiment boundary

The POC is intentionally limited to **review assistance and candidate-test reasoning over repository-visible, internal, non-restricted material**.

Permitted AI activities in this POC:

1. read the existing QA baseline and critical-case matrix;
2. identify candidate omissions, contradictions, duplicate risk cases, or weak traceability;
3. suggest candidate assertions/test ideas for already governed behavior;
4. compare candidate suggestions against current versioned tests;
5. produce a reproducible scorecard and decision note;
6. preserve a deterministic fallback when suggestions are rejected.

Not permitted:

- changing expected product behavior;
- inventing backend/runtime facts;
- using restricted/sensitive data;
- merging code;
- turning AI narrative into execution evidence;
- accepting an AI-generated test solely because the AI proposed it;
- silently creating coverage targets;
- authorizing `05.004+` autonomously.

## 5. Tool/vendor posture

The recovered registry includes a legacy hint referencing GitHub Copilot, but marks that hint as `derived-hint-only`.

Therefore this POC evaluates the **AI-assisted method**, not a mandatory vendor.

No vendor-specific capability, pricing, telemetry, privacy posture, or runtime guarantee is asserted by this artifact.

## 6. Data-policy check

### Data used

The POC uses only repository-visible project artifacts and test/code structure already governed for this project.

### Data excluded

The POC does not require:

- secrets;
- credentials;
- tokens;
- personal user data;
- private production data;
- external customer datasets;
- restricted security findings;
- private operational logs.

### Result

**Data-policy posture: PASS for this bounded experiment scope.**

If future AI tooling requests data outside this boundary, the experiment must stop and be re-evaluated.

## 7. Reproducible experiment protocol

The experiment is defined so another reviewer can reproduce the decision without trusting AI narrative.

### Input set

1. `STAGE05_QA_EXECUTION_BASELINE.md`;
2. `STAGE05_CRITICAL_CASE_MATRIX.md`;
3. current versioned repository tests under `tests/`;
4. current `package.json` quality/test scripts;
5. Stage 04/05 contract artifacts already merged in the repository.

### Review questions

For each AI-assisted candidate observation, verify:

1. Does it reference an already governed behavior?
2. Is the behavior represented in the 05.002 critical-case matrix?
3. Is there existing versioned test evidence for it?
4. If not tested, is the candidate assertion executable in the current repository/runtime?
5. Does accepting the candidate change expected behavior?
6. Does it require unavailable backend/browser/auth/persistence/runtime infrastructure?
7. Does it require restricted data?
8. Can a human reviewer independently reproduce why the suggestion is accepted or rejected?

### Decision rule

An AI suggestion is only admissible as candidate work when all of the following are true:

- source behavior is identifiable;
- expected behavior remains unchanged;
- suggestion is independently reviewable;
- evidence can be produced deterministically;
- no restricted data is required.

Otherwise the suggestion is rejected, deferred, or kept manual.

## 8. POC review sample

The experiment applies the protocol to representative risk categories from the 05.002 matrix.

| Sample | AI-assisted review question | Current deterministic evidence | POC disposition |
| --- | --- | --- | --- |
| dashboard → catalog journey | Are the key navigation transitions already asserted? | repository critical-journey tests exist and pass | `manual-baseline-sufficient` |
| local Certification filter | Is deterministic filtering covered without remote-backend assumptions? | current repository tests assert local filtering | `manual-baseline-sufficient` |
| known Certification detail | Is governed synthetic identity/detail behavior asserted? | current detail tests pass | `manual-baseline-sufficient` |
| unknown Certification identity | Is fake/fallback detail prevented? | frontend not-found/non-goal assertions exist | `manual-baseline-sufficient` for current frontend scope |
| empty success vs failure | Can current tests distinguish backend empty success from service failure? | no concrete backend runtime exists | `defer` |
| backend `service_failure` | Can controlled failure behavior be executed now? | required future evidence only | `defer` |
| auth-neutral Certification reads | Can runtime auth behavior be tested now? | no concrete protected runtime/auth provider | `defer` |
| User/Account/Progress leakage | Can runtime field leakage be validated now? | no service runtime exists | `defer` |
| Practice mutation | Should AI generate mutation tests now? | capability remains blocked | `reject-current-scope` |
| durable Evidence operations | Should AI generate persistence tests now? | capability remains blocked | `reject-current-scope` |
| `/evidence` axe reproducibility | Is tooling versioned? | command exists; fresh axe run not part of `npm run quality` | `manual-execution-required` |
| broad multi-route accessibility | Can current broad PASS be claimed? | only historical broader evidence | `reject-pass-claim` |
| browser E2E | Can AI treat repository tests as browser E2E? | current tests are Node/repository-level | `reject-pass-claim` |
| SAST/DAST | Can AI infer security PASS from quality scripts? | no dedicated execution evidence | `reject-pass-claim` |

## 9. POC findings

### Finding A — AI is useful for evidence-boundary review

AI assistance is useful for rapidly checking whether a proposed QA claim exceeds the evidence actually available.

The sample above demonstrates a repeatable pattern: candidate claims can be mapped to one of the governed states:

- already covered by deterministic manual/versioned evidence;
- deferred because runtime infrastructure does not exist;
- rejected because capability is blocked;
- rejected because the claim would exceed evidence.

This is useful **review assistance**, not execution evidence.

### Finding B — AI does not materially improve the current deterministic repository test baseline by itself

The currently versioned suite already covers the present frontend/repository behavior that is executable in scope.

The major missing cases in the 05.002 matrix are not missing because the AI has failed to invent tests; they are missing because required runtime surfaces do not yet exist or remain blocked/conditional.

Therefore generating additional speculative tests would create noise or false assurance rather than stronger QA evidence.

### Finding C — AI-generated backend/security test ideas must remain deferred

Backend/API/auth/persistence/security runtime tests cannot be made truthful simply by generating test code before the corresponding runtime and contracts exist.

The correct disposition is `defer`, not speculative implementation.

### Finding D — human ownership remains necessary

The POC cannot independently determine whether a product behavior should change.

When a suggestion conflicts with the critical-case matrix or upstream contract, the contract/human decision wins.

## 10. POC scorecard

Scoring is qualitative to avoid inventing unsupported universal numeric thresholds.

| Dimension | Result | Evidence / rationale |
| --- | --- | --- |
| reproducibility | `PASS` | inputs, review questions and dispositions are versioned and independently reviewable |
| data-policy compliance | `PASS` | experiment uses only internal repository-visible project material |
| preserves expected behavior | `PASS` | AI suggestions cannot redefine the 05.002 behavior matrix |
| improves evidence-boundary review | `USEFUL` | rapidly classifies overclaims, deferred cases and blocked-scope suggestions |
| improves current deterministic test execution | `LIMITED` | executable current frontend/repository behaviors are already covered by versioned tests |
| produces new backend/runtime evidence | `NO` | no runtime exists; no such claim is allowed |
| produces browser E2E evidence | `NO` | no browser E2E execution occurred |
| replaces human review | `NO` | explicitly prohibited by task contract |
| safe fallback available | `PASS` | deterministic/manual baseline remains authoritative |

## 11. Diff/test evidence posture

This task does not need to modify product code or expected behavior to execute the experiment.

The POC evidence is therefore:

- pre-POC deterministic quality execution supplied by the human operator;
- the versioned Stage 05 baseline and critical-case matrix;
- this reproducible experiment protocol/scorecard/decision note;
- post-materialization repository quality validation to be executed by the human operator before PR creation.

No AI-generated code diff is accepted as evidence merely for existing.

If a future AI-assisted test diff is proposed, it must be independently validated and must not change expected behavior.

## 12. Decision note

### Decision

**Use AI assistance as a bounded review aid; keep deterministic/manual execution authoritative.**

Operational disposition:

- review assistance: `ACCEPT — BOUNDED`;
- autonomous test authority: `REJECT`;
- autonomous expected-behavior authority: `REJECT`;
- speculative backend/runtime test generation before runtime exists: `DEFER`;
- deterministic/manual fallback: `REQUIRED`.

This is not a blanket approval of any AI product or future workflow.

Any future use must repeat the same data-policy, reproducibility and human-ownership constraints.

## 13. Stop-condition assessment

| Canonical stop condition | Observed? | Result |
| --- | --- | --- |
| restricted data requested by tool | no | continue |
| POC changes expected behavior | no | continue |
| tool output not reproducible | no, because acceptance is tied to versioned inputs/protocol rather than opaque narrative | continue |

No canonical stop condition was triggered by the bounded experiment recorded here.

## 14. Non-claims

This POC does not establish:

- superiority of AI over human QA;
- correctness of any unexecuted generated test;
- backend/API/auth/persistence/security runtime PASS;
- browser E2E PASS;
- broad accessibility PASS;
- production readiness;
- autonomous AI approval authority;
- authorization of `05.004+` merely because this POC is favorable.

## 15. Completion boundary

`05.003` may be considered complete only after:

1. this POC record is versioned;
2. the human operator executes the repository quality baseline after materialization;
3. the resulting PR receives human review;
4. human merge accepts the POC decision record.

## Final disposition

- POC executed: **YES — BOUNDED REVIEW EXPERIMENT**
- reproducible protocol: **PASS**
- data policy: **PASS within bounded internal repository scope**
- expected behavior ownership: **HUMAN**
- deterministic/manual baseline: **AUTHORITATIVE**
- AI review assistance: **ACCEPT — BOUNDED**
- autonomous AI test/gate authority: **REJECT**
- speculative runtime test generation: **DEFER**
- backend/runtime QA completion: **NOT ESTABLISHED**
- browser E2E QA completion: **NOT ESTABLISHED**
- next-stage authorization: **NOT SELF-GRANTED**
