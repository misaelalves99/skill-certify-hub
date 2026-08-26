# Stage 05 — Security Scan Evidence

## Governed task

`task.skillcertify.05.008` — **Executar SAST dependências e secrets**

Stage 05 — Quality Assurance
Workstream: **Static Quality & Security Assurance**

## Purpose

This document records only security-assurance evidence that is actually available and reproducible for the current repository state. It intentionally separates dependency audit, SAST, and secret scanning so that evidence from one control is never promoted into PASS for another.

Canonical objective:

> Executar SAST, dependências e secret scanning, tratar achados materiais e preservar evidence/remediation refs.

Canonical validation:

- SAST/dependency/secret scans executed;
- critical findings handled;
- secret incident closed if applicable.

Canonical stop conditions:

- secret exposure unresolved;
- critical vulnerability open;
- scanner permission exceeds need.

## 1. Execution baseline

Before materialization, the task branch was validated locally by the human operator with:

```text
npm ci
npm run quality
git status
```

Observed repository baseline:

- `npm ci` completed successfully;
- 344 packages installed;
- 345 packages audited;
- `found 0 vulnerabilities`;
- lint PASS;
- typecheck PASS;
- tests 26/26 PASS;
- production build PASS;
- static generation 10/10 pages;
- working tree clean.

The npm audit result is dependency evidence only. It is not SAST and it is not secret scanning.

## 2. Independent security-control matrix

| Control | Executed? | Current evidence | Governed disposition |
| --- | --- | --- | --- |
| dependency vulnerability audit | yes | npm install/audit output: 345 packages audited, 0 vulnerabilities reported | `PASS — CURRENT NPM AUDIT SCOPE` |
| repository SAST | no independently evidenced scanner found | no versioned CodeQL/SAST workflow or repository SAST scanner configuration found during task inspection | `NOT ESTABLISHED` |
| secret scanning | no independently evidenced scanner result available | no versioned secret-scanning workflow/config or scan output available in the current repository evidence | `NOT ESTABLISHED` |
| Dependabot configuration | not found | repository search returned no versioned Dependabot configuration | `NOT ESTABLISHED` |
| CodeQL configuration | not found | repository search returned no versioned CodeQL configuration | `NOT ESTABLISHED` |

`PASS — CURRENT NPM AUDIT SCOPE` means only that the npm audit invoked by the current install reported zero known vulnerabilities for the audited dependency graph at that execution. It does not mean the project is free of vulnerabilities in every ecosystem, runtime, source path, or future dependency state.

## 3. Dependency audit evidence

The current npm dependency check produced:

```text
added 344 packages, and audited 345 packages
found 0 vulnerabilities
```

Disposition:

- dependency audit: `EXECUTED`;
- reported critical findings: `0`;
- reported high/moderate/low findings: no findings reported in the supplied execution output;
- remediation required from this audit execution: `NO`;
- residual limitation: npm audit covers the npm dependency graph and its advisory data, not arbitrary source-code weaknesses or secrets.

No claim of absolute vulnerability absence is authorized.

## 4. SAST evidence boundary

Repository inspection did not find a versioned CodeQL configuration or another independently identifiable SAST workflow/scanner configuration.

The Stage 05 legacy tooling hint references GitHub CodeQL, but that hint is `derived-hint-only`; it does not constitute evidence that CodeQL is enabled, configured, or executed.

Therefore:

- SAST execution: `NOT ESTABLISHED`;
- SAST findings: `UNKNOWN`;
- critical SAST finding state: `UNKNOWN`, not PASS;
- SAST remediation requirement: cannot be assessed until a scanner executes;
- no scanner permissions were expanded merely to satisfy this task.

The repository-native lint/typecheck/build controls remain static-quality evidence from `05.007`; they are not reclassified as SAST here.

## 5. Secret-scanning evidence boundary

No independently reproducible secret-scan output is available in the current task evidence, and repository inspection did not identify a versioned secret-scanning workflow/configuration.

Therefore:

- secret scanning execution: `NOT ESTABLISHED`;
- detected secret incidents: `UNKNOWN`;
- unresolved secret exposure: no exposure was observed in the supplied execution output, but absence of a secret-scan result prevents a PASS claim;
- no secret values are copied into this evidence document;
- no secret-scanner permissions were expanded.

If a future scanner identifies a real secret, evidence must reference the incident/remediation without reproducing the secret value.

## 6. Dependabot boundary

Repository search did not find a versioned Dependabot configuration.

This does not prove that every repository-level GitHub security feature is disabled, because repository-hosted feature state is not equivalent to versioned configuration and no authoritative security-feature status result was obtained in this task.

Disposition:

- versioned Dependabot configuration: `NOT FOUND`;
- Dependabot execution/alerts: `NOT ESTABLISHED`;
- no PASS inferred from npm audit.

## 7. CodeQL boundary

Repository search did not find a versioned CodeQL configuration.

Disposition:

- versioned CodeQL configuration: `NOT FOUND`;
- CodeQL execution: `NOT ESTABLISHED`;
- CodeQL findings: `UNKNOWN`;
- no PASS inferred from lint/typecheck/build.

## 8. Critical-finding handling

For the control that actually executed:

### npm dependency audit

- critical findings reported: none;
- remediation PR required: no;
- risk decision required for reported dependency vulnerabilities: no, because the supplied audit reported zero vulnerabilities.

For SAST and secret scanning:

- no scanner execution evidence exists;
- there are therefore no scanner findings to triage;
- this absence is not equivalent to zero findings.

## 9. Stop-condition evaluation

### `secret exposure unresolved`

No concrete secret exposure was identified in the supplied evidence. However, secret scanning remains `NOT ESTABLISHED`; the task does not claim comprehensive absence of secrets.

### `critical vulnerability open`

The executed npm audit reported zero vulnerabilities, so no critical npm dependency vulnerability is currently open from that execution. SAST critical-finding state remains `UNKNOWN` because SAST did not execute.

### `scanner permission exceeds need`

No scanner permissions were added or broadened during this task.

No canonical stop condition is known to have been triggered by the evidence actually available, but the missing SAST/secret-scan evidence remains explicit.

## 10. Security evidence disposition

Current source-backed result:

- dependency audit: **PASS — CURRENT NPM AUDIT SCOPE**;
- SAST: **NOT ESTABLISHED**;
- secret scanning: **NOT ESTABLISHED**;
- CodeQL config/execution: **NOT ESTABLISHED**;
- Dependabot config/execution: **NOT ESTABLISHED**;
- known critical npm dependency vulnerability: **NONE REPORTED BY CURRENT AUDIT**;
- comprehensive security PASS: **NOT CLAIMED**.

Because the canonical task asks for SAST, dependency and secret scanning, the overall task evidence is necessarily **BOUNDED / PARTIAL** until independently reproducible SAST and secret-scanning execution exists.

## 11. Future evidence required

To close the current evidence gaps without inventing results, future governed work should provide, as applicable:

1. an authorized, proportionate SAST scanner selection;
2. reproducible SAST execution command/workflow reference;
3. scanner output or workflow/run reference;
4. triage/remediation/risk-decision references for material findings;
5. authorized secret-scanning execution or authoritative repository security-feature evidence;
6. incident/remediation reference if a real secret is detected, without exposing the value;
7. rerun evidence after remediation when material findings are fixed.

Tool selection must remain proportional to repository need and must not require broader permissions than necessary.

## 12. Non-goals

This task does not:

- claim absolute absence of vulnerabilities;
- treat npm audit as SAST;
- treat lint/typecheck/build as SAST;
- treat absence of a scanner as PASS;
- expose secrets in documentation;
- enable or configure GitHub security products without explicit governed authority;
- add excessive scanner permissions;
- change application behavior merely to satisfy a security tool;
- merge its own PR or enable auto-merge.

## 13. Human review boundary

Human review remains required. The evidence supports a precise partial disposition rather than a complete security PASS.

A future Stage 05 assessment must preserve the distinction between:

- dependency audit evidence that actually executed;
- SAST evidence that remains unestablished;
- secret-scanning evidence that remains unestablished;
- static-quality evidence from `05.007`;
- runtime/API evidence from earlier workstreams.

No later gate may collapse these categories into a generic green security state without new evidence.
