# Stage 05 — Static Quality Gate

## 1. Governed task

- Task: `task.skillcertify.05.007`
- Title: **Criar gate lint typecheck build e análise estática**
- Stage: **Stage 05 — Quality Assurance**
- Workstream: **Static Quality & Security Assurance**
- Type: `quality`
- Human review: required
- Dependencies: `task.skillcertify.05.001`, `task.skillcertify.05.004`

## 2. Canonical objective

Estabelecer lint, typecheck, build e análise estática reproduzíveis sem calibrar gate para esconder achados.

## 3. Canonical validation

The task requires evidence that:

1. lint passes or an exception source exists;
2. typecheck passes;
3. build passes;
4. a static-analysis source is recorded.

Canonical stop conditions remain:

- quality gate tuned to suppress material findings;
- non-reproducible command;
- critical static failure open.

No stop condition was triggered by the baseline execution recorded below.

## 4. Repository-native deterministic gate

The repository already exposes a deterministic quality chain in `package.json`:

```text
npm run quality
  -> npm run lint
  -> npm run typecheck
  -> npm run test
  -> npm run build
```

The static-quality portion of this chain is therefore grounded in repository-native commands rather than a new vendor-specific quality platform.

For this task, the authoritative reproducible static-quality commands are:

```powershell
npm run lint
npm run typecheck
npm run build
```

The full repository regression gate remains:

```powershell
npm run quality
```

No SonarQube/SonarQube Cloud requirement is introduced. The legacy tooling hint is treated as `derived-hint-only`; vendor selection is not required to satisfy the current repository-scale static-quality contract.

## 5. Static-analysis source

The currently versioned static-analysis sources are:

- ESLint via `npm run lint`;
- TypeScript compiler checking via `npm run typecheck`;
- Next.js production build diagnostics via `npm run build`;
- deterministic repository tests within `npm run quality` as regression evidence adjacent to, but distinct from, static analysis.

This task does not claim that ESLint, TypeScript, or Next.js build diagnostics are equivalent to SAST. Security scanning is governed separately by `task.skillcertify.05.008`.

## 6. Baseline execution evidence

Immediately before this artifact was materialized, the user executed the task branch locally after synchronizing from `main`.

Observed results:

### Dependency installation

```text
npm ci
```

Result:

- 344 packages added;
- 345 packages audited;
- 0 vulnerabilities reported by the npm audit executed as part of install output;
- one deprecation warning for `eslint@9.39.5`.

The dependency-audit result is recorded only as baseline context. Security/dependency assurance remains owned by `05.008`.

### Lint

```text
npm run lint
```

Result: **PASS**.

No lint error was reported.

### Typecheck

```text
npm run typecheck
```

Result: **PASS**.

No TypeScript error was reported.

### Tests

```text
npm run test
```

Result:

- tests: 26;
- pass: 26;
- fail: 0;
- skipped: 0;
- cancelled: 0.

The test suite remains deterministic repository evidence but is not counted as static analysis itself.

### Build

```text
npm run build
```

Result: **PASS**.

Observed production-build evidence:

- Next.js `16.3.2`;
- compilation successful;
- TypeScript build phase successful;
- static page generation: `10/10`;
- generated routes include `/`, `/_not-found`, `/certifications`, three governed Certification detail paths, `/evidence`, and `/practices`.

### Working tree

```text
git status
```

Result: clean and up to date with `origin/task/skillcertify-05-007-static-quality-gate`.

## 7. Observed warnings and findings

### 7.1 ESLint package deprecation warning

`npm ci` reported:

```text
npm warn deprecated eslint@9.39.5: This version is no longer supported.
```

Disposition: **OPEN NON-BLOCKING MAINTENANCE WARNING**.

Reasoning:

- this is not a lint execution failure;
- lint itself passed;
- there is no evidence in this task that the warning represents a critical static defect;
- silently changing the dependency version inside `05.007` would expand scope and could alter tool behavior without separate review.

The warning must remain visible for later dependency/toolchain maintenance. It is not suppressed or reclassified as PASS.

### 7.2 Node `MODULE_TYPELESS_PACKAGE_JSON` warning

During tests, direct Node import of `app/certifications/catalog.ts` emitted `MODULE_TYPELESS_PACKAGE_JSON`, because package-level module type is unspecified and Node reparses the file as ESM.

Disposition: **OPEN NON-BLOCKING MODULE-CONFIGURATION WARNING**.

Reasoning:

- the warning does not break lint, typecheck, tests or production build;
- the test suite still passes 26/26;
- changing package module semantics solely to remove this warning could affect the repository execution model and is outside the bounded static-quality task;
- the finding remains visible rather than hidden through configuration tuning.

## 8. Gate result matrix

| Control | Command/source | Result | Evidence meaning |
| --- | --- | --- | --- |
| Lint | `npm run lint` | `PASS` | ESLint reports no blocking lint errors |
| Typecheck | `npm run typecheck` | `PASS` | TypeScript reports no blocking type errors |
| Build | `npm run build` | `PASS` | Production build completes and 10/10 pages generate |
| Full repository quality | `npm run quality` | `PASS` | lint + typecheck + 26/26 tests + build complete |
| Static-analysis source | ESLint + TypeScript + Next build diagnostics | `ESTABLISHED` | reproducible repository-native static sources recorded |
| ESLint deprecation warning | `npm ci` | `OPEN / NON-BLOCKING` | maintenance finding remains explicit |
| Node module-type warning | `npm run test` | `OPEN / NON-BLOCKING` | configuration finding remains explicit |
| SAST | `05.008` | `NOT PART OF 05.007` | no security-scan claim made here |

## 9. No gate tuning

No rule, threshold, ignore list, suppression directive, compiler option, build flag, or test expectation was modified to force a green result.

Specifically, this task does **not**:

- weaken ESLint rules;
- add blanket `eslint-disable` directives;
- relax TypeScript compiler checking;
- ignore build errors;
- hide warnings by redirecting output;
- introduce arbitrary quality percentages;
- classify unexecuted security scanners as PASS;
- treat vendor tooling hints as mandatory architecture.

The observed green status comes from the existing repository commands executing successfully.

## 10. Reproducibility contract

A reviewer can reproduce the current static-quality gate from a clean checkout with:

```powershell
git pull
npm ci
npm run lint
npm run typecheck
npm run build
npm run quality
git status
```

For minimal duplication, `npm run quality` already invokes lint, typecheck, tests and build. Running the individual commands remains useful when isolating a failure or collecting focused evidence.

A future material change to scripts, compiler configuration, lint configuration or build behavior must preserve reproducibility and must not silently redefine this gate.

## 11. Evidence interpretation boundaries

The current evidence establishes only repository/static-quality facts that were actually executed.

It does **not** establish:

- SAST PASS;
- dependency-security PASS beyond the exact npm audit output observed during the relevant install;
- secret-scanning PASS;
- DAST PASS;
- browser E2E PASS;
- API/runtime PASS;
- production deployment readiness;
- absence of all defects or vulnerabilities.

Those areas require their own execution evidence.

## 12. Stop-condition assessment

### Quality gate tuned to suppress material findings

Status: **NOT TRIGGERED**.

No gate tuning or suppression was introduced.

### Non-reproducible command

Status: **NOT TRIGGERED**.

All commands used are versioned `package.json` scripts or standard package-manager commands and were executed successfully from the task branch.

### Critical static failure open

Status: **NOT OBSERVED**.

No critical lint, typecheck or build failure was produced. Two non-blocking warnings remain explicit and unhidden.

## 13. Task disposition

`task.skillcertify.05.007` is **EVIDENCE-READY FOR HUMAN REVIEW** with the following bounded result:

- lint: `PASS`;
- typecheck: `PASS`;
- build: `PASS`;
- full repository quality: `PASS`;
- static-analysis source: `ESTABLISHED` through repository-native deterministic controls;
- material gate suppression: `NONE INTRODUCED`;
- critical static failure: `NOT OBSERVED`;
- ESLint deprecation warning: `OPEN / NON-BLOCKING`;
- Node module-type warning: `OPEN / NON-BLOCKING`;
- SAST/dependency/secret-scanning authority: remains with `05.008`.

Completion still requires post-materialization local validation, a human-reviewed PR, and human merge. This artifact does not self-authorize downstream work or any stage gate.
