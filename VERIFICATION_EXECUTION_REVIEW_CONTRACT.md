# Stage 04 — Verification Execution & Evidence Review Contract

## Purpose

This document materializes `task.skillcertify.04.011` in the Stage 04 workstream **Tests, AI Governance & Release Evidence**.

It operationalizes `VERIFICATION_RELEASE_EVIDENCE_BASELINE.md` by defining how verification evidence must be executed, captured, classified, reviewed and invalidated before it can support implementation-facing claims.

This contract remains technology-neutral. It does **not** implement a backend/API, choose CI or test providers, create authentication, introduce persistence, authorize release, or manufacture results for capabilities that do not yet exist.

## 1. Governing rule

**Execution creates evidence. Narrative only explains evidence.**

A reviewer must be able to distinguish:

- what command/check actually ran;
- what code state it ran against;
- what result was observed;
- what scope that result covers;
- what remains untested, blocked, skipped or unknown.

No generated summary, screenshot, prose assertion or AI review may collapse those distinctions.

## 2. Relationship to 04.010

`04.010` defines evidence states:

- `executed`;
- `versioned_historical`;
- `required_future`;
- `not_applicable_currently`;
- `unknown`.

This task adds **execution-result vocabulary** for checks that are actually evaluated:

- `PASS`;
- `FAIL`;
- `SKIP`;
- `BLOCKED`;
- `UNKNOWN`.

The two vocabularies are related but not interchangeable.

Example:

- a future Certification service test is currently `required_future`, not `PASS`;
- a check that ran and passed is `executed` + `PASS`;
- a check that could not run because a prerequisite is absent may be `executed` + `BLOCKED` if the attempted execution and cause are captured;
- an unevaluated area with insufficient evidence remains `unknown`, not `SKIP`.

## 3. Result semantics

### `PASS`

Use only when the defined check actually executed against an identified source/runtime state and all applicable acceptance conditions for that check were satisfied.

`PASS` is bounded to that exact scope. It does not imply adjacent capabilities also work.

### `FAIL`

Use when the check executed and one or more defined acceptance conditions were not satisfied.

A failure must preserve enough output to identify what failed. A generic summary such as "tests failed" is incomplete evidence when more specific output exists.

### `SKIP`

Use only when a check exists and is intentionally not executed under a documented rule or condition.

A skip must identify:

- the skipped check;
- the skip reason;
- whether the skip is permitted or exceptional;
- whether downstream acceptance is affected.

`SKIP` must never be used to hide an unknown or blocked prerequisite.

### `BLOCKED`

Use when evaluation cannot proceed because a required prerequisite, governed capability or authorized environment is absent.

Examples include:

- attempting to evaluate a protected capability before any principal/ownership model exists;
- attempting mutation verification while the capability remains governance-blocked;
- attempting deployment evidence where no governed deployment target exists.

`BLOCKED` is not a failure of an unimplemented capability and is not equivalent to `SKIP`.

### `UNKNOWN`

Use when evidence is insufficient to classify the outcome honestly.

Typical causes:

- logs are missing or partial;
- the commit under test is unknown;
- execution provenance cannot be established;
- a screenshot shows a result but not what produced it;
- AI prose reports a finding with no independent source evidence.

A reviewer must prefer `UNKNOWN` over inference.

## 4. Minimum execution record

For every deterministic check used as current evidence, the record MUST identify, directly or through a traceable workflow/PR context:

1. repository;
2. branch/ref;
3. immutable commit SHA or equivalent immutable source revision;
4. exact command or workflow job;
5. check/test scope;
6. start/end time or associated run timestamp when available;
7. environment/toolchain versions when material;
8. relevant configuration when material;
9. raw or machine-readable result where available;
10. final classification (`PASS`, `FAIL`, `SKIP`, `BLOCKED`, `UNKNOWN`);
11. failing/skipped test names or counts where applicable;
12. reviewer-visible linkage to the PR/issue/task consuming the evidence.

For local manual execution, terminal output plus an identified commit and clean/known repository state may satisfy this requirement when no CI exists.

## 5. Current repository baseline under this contract

Before this artifact was created, the `04.011` branch was synchronized and locally executed with:

```text
git fetch origin
git switch main
git pull
git switch task/skillcertify-04-011-verification-evidence-review
git pull
npm ci
npm run quality
git status
```

Observed task input records:

- `npm ci` — `PASS`;
- npm install audit — 0 vulnerabilities reported at execution time;
- lint — `PASS`;
- typecheck — `PASS`;
- repository tests — 22/22 `PASS`;
- production build — `PASS`;
- static generation — 10/10 pages;
- working tree — clean before this documentation change.

These results are evidence for the repository/frontend state only. They do not become backend/API/auth/persistence evidence by reuse or narrative.

## 6. Evidence capture priority

When multiple forms of evidence exist, reviewers should prefer the strongest available source in this order:

1. deterministic raw/machine-readable output bound to an immutable revision;
2. CI/workflow/job record with logs and source revision;
3. locally captured command output with identifiable repository state;
4. versioned human review record tied to concrete execution;
5. screenshot supporting already traceable execution;
6. prose summary;
7. AI-generated summary.

Lower-priority forms may supplement higher-priority evidence. They must not replace stronger evidence that exists.

## 7. Repeatability contract

A check intended to be relied on repeatedly should be reproducible from versioned repository instructions or configuration.

A reviewer should be able to determine:

- command to run;
- required setup;
- expected target/scope;
- result interpretation;
- any required environment assumptions.

If execution can only be reconstructed from historical conversation or ad hoc manual commands, the evidence may still be valid for the historical run but must be classified as a reproducibility gap.

The existing Stage 03 multi-route axe history is the current example: the historical five-route execution is admissible, while only the `/evidence` scan is exposed as a single versioned repository command.

## 8. Freshness and invalidation review

A reviewer MUST check whether evidence remains current for the claim being made.

Re-execution is required when the relevant executable state changed, including as applicable:

- source files covered by the check;
- dependencies or lockfile;
- compiler/build configuration;
- test configuration;
- service/runtime implementation;
- transport/schema;
- auth/security policy;
- deployment target/configuration.

Historical evidence must remain labeled historical after a material change until re-executed.

Documentation-only changes may reuse prior executable evidence when the reviewer can establish that executable state was unaffected and the claim remains correspondingly narrow.

## 9. Partial execution handling

A composite command must not be reported simply as `PASS` when only part of it ran.

For a command such as:

```text
npm run lint && npm run typecheck && npm run test && npm run build
```

if execution stops at `test`, reviewers must record the preceding successful steps and the failing/stopped step separately. `build` is then not executed, not failed.

Likewise:

- cancelled checks are not `FAIL` unless the check actually evaluated and failed;
- unstarted downstream checks are not `PASS`;
- missing logs may force `UNKNOWN` even when a UI badge appears green.

## 10. Negative evidence and absence-of-capability claims

Evidence that a capability is absent requires more discipline than a positive test result.

Allowed forms include:

- repository inspection showing no route/module/schema exposure;
- deterministic tests asserting forbidden concepts/operations are absent;
- contract/readiness documents explicitly marking a capability `blocked`;
- transport/schema diff showing no exposure.

An absence claim must identify the searched/reviewed scope.

Examples:

- "No Practice mutation route exists in the reviewed service surface" may be supported by schema/route inspection.
- "No authentication exists anywhere" is too broad unless the whole relevant repository/runtime scope was actually reviewed.

Absence of evidence is not automatically evidence of absence.

## 11. Blocked-surface review contract

For currently blocked capabilities, reviewers must verify two things separately:

1. the governance state remains `blocked`;
2. implementation has not accidentally exposed the capability.

Current blocked surfaces include:

- Practice mutation;
- durable Evidence operations;
- User/Account/Progress service surfaces.

A reviewer must not invent success tests for blocked behavior merely to make the evidence package appear complete.

If accidental exposure is discovered, that is a contract violation and should be recorded as a finding, not normalized into a new capability.

## 12. Future Certification service review

When the two `ready` Certification reads are implemented, reviewers MUST require execution evidence for the contract cases already established by 04.009/04.010, including:

- collection success;
- successful empty collection;
- exact known identity resolution;
- deterministic `not_found`;
- no fallback/fabricated record;
- controlled `service_failure` distinction;
- approved response fields only;
- identity-neutral access;
- absence of User/Account/Progress leakage;
- no blocked operation exposure.

Until implementation exists, these remain `required_future`; they must not receive a `PASS` label.

## 13. Transport/API review

A transport-specific check becomes applicable only after a transport exists.

When applicable, reviewers should require evidence for:

- encoding/decoding fidelity;
- input validation where governed;
- error-category preservation;
- exact identity semantics;
- blocked route/operation absence;
- compatibility/schema visibility;
- controlled failure behavior.

Protocol-specific semantics such as HTTP status codes or GraphQL error shapes must be evaluated only after they are explicitly implemented and governed.

No current API transport result exists under this task.

## 14. Authentication/authorization review

Current Certification reads remain identity-neutral by contract.

Therefore:

- no auth implementation is required to verify those reads;
- no fabricated auth test is allowed;
- adding a principal requirement by framework convention is a contract change requiring governance.

For any future protected capability, reviewers must require both positive and negative authorization cases tied to an approved principal/ownership policy.

A generic "auth middleware passed" statement is insufficient evidence for capability-specific authorization.

## 15. Controlled failure evidence

When backend/service implementation exists, `service_failure` evidence must be produced through a deterministic, test-safe mechanism.

Reviewers must be able to distinguish:

- induced implementation/infrastructure failure;
- domain `not_found`;
- successful empty collection;
- successful record response.

The failure-induction mechanism must not depend on production fault injection unless separately authorized.

Until such runtime exists, controlled service-failure evidence remains `required_future`.

## 16. Security/static-analysis output review

When a security/static-analysis tool is later introduced, its result is admissible only if the record identifies:

- tool name;
- version;
- configuration/ruleset;
- target scope;
- source revision;
- execution result;
- suppressed/ignored findings where applicable;
- severity interpretation;
- known limitations.

A clean scanner result means only that the configured scanner reported no matching findings in the scanned scope.

It must not be rewritten as:

- "the system is secure";
- "there are no vulnerabilities";
- "penetration testing passed" unless a penetration test actually occurred.

AI security review is never scanner evidence.

## 17. Evidence-quality defects

The following are review defects even when the underlying software may be correct:

- missing commit/source revision;
- stale results after material changes;
- partial logs presented as complete execution;
- test counts without identifiable scope;
- screenshots without traceable execution context;
- skipped checks without reason;
- blocked checks mislabeled as failures or passes;
- historical results presented as current;
- unexecuted requirements marked `PASS`;
- AI findings recorded as confirmed without independent verification;
- security claims broader than the executed control;
- build evidence not bound to the claimed artifact/source state.

A review may reject the evidence package because of these defects without asserting that the product behavior itself is broken.

## 18. Review decision vocabulary

For individual evidence items, reviewers should record one of:

- `accepted` — sufficient for the bounded claim;
- `accepted_with_limit` — valid but narrower/less reproducible than desired;
- `needs_reexecution` — stale or invalidated by relevant change;
- `insufficient` — cannot support the claim;
- `not_applicable` — capability/control does not currently apply;
- `blocked_by_governance` — evaluation cannot legitimately proceed until governance changes.

This review vocabulary is distinct from runtime/test `PASS`/`FAIL`.

## 19. AI-assisted review contract

AI may assist by:

- comparing claimed results with raw logs;
- identifying missing provenance fields;
- flagging stale evidence candidates;
- comparing contract requirements with executed checks;
- proposing candidate inconsistencies;
- drafting reviewer summaries.

Every material AI-originated finding must then be independently checked against authoritative source/execution evidence.

AI must not:

- confirm its own finding by restating it;
- transform ambiguity into a defect;
- mark unexecuted checks as pass/fail;
- infer auth/security correctness from unrelated checks;
- decide release/gate status;
- merge its own work.

If independent verification is unavailable, the finding remains a candidate or `UNKNOWN`.

## 20. Human review authority

Human review remains authoritative for accepting evidence packages and for any later gate/merge/release decision.

A human reviewer may use automated and AI-assisted analysis, but the decision record must remain grounded in the underlying evidence and explicitly preserve unresolved risks/unknowns.

A green deterministic baseline does not force a human reviewer to accept an incomplete evidence package.

## 21. Local vs CI evidence

This contract does not mandate CI.

Local execution is admissible when:

- the source revision is identifiable;
- commands are explicit;
- output is captured sufficiently;
- environment assumptions are understood;
- the reviewer can reproduce the check where practical.

If CI is later introduced, the same evidence requirements apply, with workflow/run/job identifiers providing stronger automated provenance.

A CI provider badge alone is not enough if the underlying job/source cannot be traced.

## 22. Evidence package review sequence

For a future implementation PR, reviewers should evaluate evidence in this order:

1. confirm task/contract scope;
2. confirm source revision and branch;
3. inspect changed executable surface;
4. verify deterministic checks executed on that revision;
5. review failures/skips/blocked/unknown states separately;
6. verify contract-specific tests;
7. verify negative/blocked-surface evidence;
8. review security/static outputs only if actually configured/executed;
9. confirm build/artifact provenance when applicable;
10. record residual risks and evidence limitations;
11. separate evidence acceptance from any later release/gate decision.

This order reduces the risk of a persuasive summary hiding missing execution evidence.

## 23. Current residual evidence gaps

At completion of 04.011, current gaps remain intentionally visible:

- no concrete Certification service/backend runtime;
- no API transport;
- no API schema diff artifact;
- no backend contract-test execution;
- no controlled backend `service_failure` execution;
- no principal/auth model for protected capabilities;
- no dedicated SAST/DAST/security scanning baseline;
- no governed CI provider requirement;
- no release artifact/deployment provenance package;
- historical five-route axe execution remains less reproducible than the single versioned `/evidence` command;
- no browser E2E or backend integration suite exists.

These gaps are not automatically defects. Their classification depends on whether the corresponding capability/control is currently required.

## 24. 04.011 completion decision

This task establishes the execution/review contract required to consume the 04.010 baseline consistently.

It defines:

- result semantics;
- minimum provenance;
- evidence capture hierarchy;
- repeatability/freshness rules;
- partial execution handling;
- negative and blocked-surface evidence;
- future service/API/auth/security review rules;
- evidence-quality defects;
- AI-assisted review constraints;
- human review authority.

No new backend/API/auth/security/release result is created by this document.

## 25. Handoff posture for 04.012

Downstream 04.012 work may consume this contract to assemble or evaluate a Stage 04 release/gate evidence package, but it MUST preserve:

- result-state distinctions;
- source/commit provenance;
- stale/partial/unknown evidence visibility;
- blocked capability boundaries;
- narrow security claims;
- AI as non-authoritative reviewer aid;
- human authority over final gate/release decisions.

04.012 must not convert the existence of this contract into proof that implementation, security or release readiness has already been achieved.
