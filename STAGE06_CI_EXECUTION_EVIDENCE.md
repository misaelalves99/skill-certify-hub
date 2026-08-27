# Stage 06 — CI Execution Evidence Baseline

## Purpose

This document materializes `task.skillcertify.06.003` for Stage 06 — DevOps & Delivery.

It records the versioned CI definition and the direct execution evidence required before any CI PASS or failure-path claim is allowed.

This document does **not** claim deployment readiness, G-P6, or Stage 07 authorization.

## 1. Governed objective

Create a minimal, versioned CI baseline that executes the repository's deterministic quality chain on governed change events and produces direct evidence of both successful execution and regression/failure rejection.

## 2. Inputs inherited from 06.001 and 06.002

`06.001` established:
- local `npm ci` reproducibility;
- local `npm run quality` PASS;
- no explicit exact Node runtime pin;
- no versioned CI workflow;
- no CI execution evidence;
- no failure-path evidence.

`06.002` established:
- AI review assistance is bounded;
- deterministic/source-backed evidence remains authoritative;
- local green execution must not be relabeled as CI PASS;
- future CI green must not be relabeled as G-P6 PASS.

## 3. Versioned CI definition

Workflow path:

```text
.github/workflows/quality.yml
```

Workflow name:

```text
Quality
```

Governed events:
- `pull_request` targeting `main`;
- `push` to `main`.

Permissions:

```yaml
permissions:
  contents: read
```

No write, deployment, package publishing, environment, secret, issue or pull-request mutation permission is requested.

## 4. Runtime and package-manager contract

The final governed workflow uses:

```yaml
node-version: '22'
```

and explicitly pins npm before dependency installation:

```text
npm install --global npm@11.13.0
```

Observed GitHub-hosted project runtime in the validated CI path:
- Node `v22.23.2` from `actions/setup-node@v4`;
- npm is explicitly upgraded to `11.13.0` before `npm ci`.

A GitHub Actions runner warning states that `actions/checkout@v4` and `actions/setup-node@v4` target the deprecated Node 20 action runtime and are being forced to run on Node 24 by the runner. That warning concerns the internal runtime of those actions, not the project runtime installed by `setup-node`; it did not fail the governed CI runs recorded below.

This task does not claim Node 22 is the only product-supported runtime. It is the explicit CI project runtime family selected and directly validated for this workflow.

## 5. Dependency installation and compatibility constraint

CI uses:

```text
npm ci
```

During bootstrap, actual GitHub Actions execution exposed a lockfile-resolution defect:

```text
Invalid: lock file's picomatch@2.3.2 does not satisfy picomatch@4.0.7
Missing: picomatch@2.3.2 from lock file
```

The first observed bootstrap failure was therefore a real clean-run reproducibility defect, not the planned deliberate regression probe.

Regenerating the lockfile alone with npm 10 or npm 11 left an invalid hoisted dependency topology. A nested install strategy corrected the topology but expanded the installation to approximately 4,200 packages and was rejected as an unsuitable repository contract.

The accepted narrow correction adds the exact compatibility constraint:

```json
"picomatch": "4.0.7"
```

to `devDependencies`. This leaves `picomatch@2.3.2` under the `micromatch` branch while allowing `fdir` / `tinyglobby` to resolve `picomatch@4.0.7` without `ELSPROBLEMS`.

The corrected lockfile is consumed by `npm ci` under the governed Node 22 / npm 11.13.0 workflow.

## 6. Clean-checkout typecheck correction

Actual CI execution also exposed that `app/layout.tsx` depended on the generated global Next.js helper `LayoutProps<"/">` before `.next/types` existed in a clean checkout.

The previous local typecheck could pass after prior Next.js generation had populated local generated types, while clean CI failed at:

```text
app/layout.tsx(20,50): error TS2304: Cannot find name 'LayoutProps'.
```

The root layout was corrected to use an explicit `ReactNode` children contract, making `npm run typecheck` independent of previously generated `.next/types` state.

## 7. Quality execution contract

CI executes the existing top-level repository command:

```text
npm run quality
```

which expands to:

```text
lint → typecheck → test → build
```

The workflow intentionally reuses the existing deterministic repository chain rather than maintaining a divergent duplicate check list.

## 8. Bootstrap execution evidence

Operational bootstrap PR:

```text
PR #114
```

Bootstrap introduced the workflow onto the default branch and exposed real clean-run defects before task 06.003 could obtain admissible execution evidence.

Observed failure evidence included:
- Quality run ID `33021638373`: `npm ci` failed due package/lockfile mismatch;
- later bootstrap execution reached `npm run quality` but failed clean-checkout typecheck on `LayoutProps`;
- after runtime/dependency/typecheck corrections, bootstrap head `ab4e4a3fcbce688e92a939be3098812c23e34289` produced Quality run #5 with conclusion `success`.

PR #114 was then merged manually by the human authority with merge commit:

```text
8e81204ae05fba937d0e1a094a7b651a9e995dd3
```

These bootstrap failures are retained as diagnostic/reproducibility evidence. They are **not** substituted for the deliberate negative-path proof required below.

## 9. Positive-path evidence on PR #113

After synchronizing the 06.003 branch with the validated bootstrap baseline, the first governed green execution on PR #113 was observed.

```yaml
pr: 113
head_sha: cb1f0b3fa24092792c86fd82e127fb6fa953fe2f
workflow: Quality
run_number: 7
run_id: 33027008990
status: completed
conclusion: success
```

This establishes an actual GitHub Actions CI PASS for that exact PR revision.

It does **not** establish G-P6 or authorize Stage 07.

## 10. Deliberate failure-path evidence

Starting from the green revision above, the task branch introduced an isolated and explicit workflow step:

```yaml
- name: Deliberate failure-path proof
  run: exit 1
```

Deliberate failing revision:

```yaml
head_sha: e9591dc8781f2b2454d7e27c862d664a638f3696
commit_message: "[task.skillcertify.06.003] Exercise deliberate CI failure path"
workflow: Quality
run_number: 8
run_id: 33027176496
job: quality
job_id: 98371164351
status: completed
conclusion: failure
```

Step evidence:
- `Checkout repository` — success;
- `Setup Node.js` — success;
- `Pin npm` — success;
- `Install dependencies` — success;
- `Deliberate failure-path proof` — **failure**;
- `Run repository quality gate` — skipped because the deliberate proof step failed.

The deliberately failing revision was never merged to `main`.

This directly establishes that the governed PR pipeline can reject an explicit non-green revision.

## 11. Restoration and final green evidence

The deliberate failure commit was reverted by:

```text
8c3952f207c4f259e1777b681b9510273e00cf1a
```

The revert removed only the deliberate `exit 1` proof step and restored the governed workflow.

Local restoration validation before push:
- `npm ci` — PASS;
- `npm run quality` — PASS;
- tests — 26/26 PASS;
- production build — PASS;
- static generation — 10/10;
- `git status` — clean.

Final remote green execution:

```yaml
pr: 113
head_sha: 8c3952f207c4f259e1777b681b9510273e00cf1a
workflow: Quality
run_number: 9
run_id: 33027352698
status: completed
conclusion: success
```

This is the final restored green CI evidence for the deliberate-failure cycle.

## 12. Diagnostics carried forward

Non-blocking diagnostics remain explicit:
- ESLint `9.39.5` deprecation warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning for `app/certifications/catalog.ts`;
- GitHub runner warning that `actions/checkout@v4` and `actions/setup-node@v4` target Node 20 internally and are being forced by the runner to Node 24.

This task does not suppress or relabel these warnings merely to obtain green output.

## 13. Claim boundaries

| Claim | Current state |
| --- | --- |
| versioned CI workflow exists | ESTABLISHED |
| workflow project runtime is explicit | ESTABLISHED — Node 22 |
| workflow package manager is explicit | ESTABLISHED — npm 11.13.0 |
| workflow permissions are read-only | ESTABLISHED |
| lockfile install in workflow | ESTABLISHED — `npm ci` |
| repository quality chain wired to CI | ESTABLISHED — `npm run quality` |
| clean-checkout CI PASS on PR #113 | ESTABLISHED — run `33027008990` |
| CI rejects deliberate non-green revision | ESTABLISHED — run `33027176496` |
| final restored head is green | ESTABLISHED — run `33027352698` |
| deliberate failing revision merged to `main` | NO |
| deploy/release readiness | NOT CLAIMED |
| G-P6 | NOT PERFORMED |
| Stage 07 authorization | FALSE |

## 14. Hard-stop evaluation

- workflow absent: `NO`;
- project runtime implicit: `NO`;
- package-manager version implicit in governed CI: `NO`;
- dependency installation mutable: `NO`;
- CI PASS invented before run: `NO`;
- failure-path invented before negative run: `NO`;
- deliberate failing revision merged to `main`: `NO`;
- unnecessary write/deploy/secrets permission: `NO`;
- G-P6 attempted: `NO`;
- Stage 07 authorization attempted: `NO`.

## 15. Disposition

`06.003` execution evidence is now:

```text
CI_EXECUTION_BASELINE_ESTABLISHED / POSITIVE_AND_NEGATIVE_PATH_EVIDENCE_COMPLETE
```

The governed branch has direct positive-path, deliberate failure-path, and final restored-green evidence.

No deployment, release, G-P6 PASS, residual-risk acceptance, or Stage 07 authorization is claimed by this document.

Human review and merge authority remain required before task 06.003 can be integrated into `main`.
