# Stage 06 — Secure Configuration and Secrets Baseline

## Purpose

This document materializes `task.skillcertify.06.004` for Stage 06 — DevOps & Delivery.

The individual canonical display title for `06.004` is not available in the recovered source. The task title used operationally is therefore non-canonical and derived from the Stage 06 mission concern of secure configuration and secrets handling.

This baseline records what the current repository actually consumes, what it protects, and what future configuration/secret use must obey. It does **not** create credentials, choose a secret manager, select a deployment provider, perform deployment/promotion/release work, pass G-P6, or authorize Stage 07.

## 1. Governed objective

Establish a factual, versioned configuration/secrets safety baseline for the current application and CI pipeline without inventing runtime configuration or secret infrastructure that the repository does not yet require.

The control question is:

> What configuration and secret-sensitive surfaces exist today, what is currently absent/not established, and what rules must govern future use?

## 2. Stage-entry evidence

`task.skillcertify.06.003` completed the verifiable CI baseline through PR #113.

Post-merge `main` evidence:

```yaml
merge_commit: 1dca11243f7e0ca0ea6ffb3ed029ba39e56b2c68
workflow: Quality
run_number: 11
run_id: 33027553766
event: push
conclusion: success
```

This establishes that the current versioned quality workflow runs successfully after merge to `main`. It does not create any configuration/secrets assurance beyond the evidence recorded in this task.

## 3. Human-executed local baseline entering 06.004

Branch:

```text
task/skillcertify-06-004-secure-config-secrets-baseline
```

Base revision:

```text
1dca112 — Merge pull request #113 from misaelalves99/task/skillcertify-06-003-versioned-ci-execution-baseline
```

Observed local runtime:

```text
Node.js: v22.22.2
npm:     11.13.0
```

Dependency installation:

```text
npm ci: PASS
344 packages added
345 packages audited
0 vulnerabilities reported in current npm audit scope
```

Repository quality execution:

```text
lint: PASS
typecheck: PASS
tests: 26/26 PASS
build: PASS
static/SSG generation: 10/10 PASS
```

Known non-blocking diagnostics remain visible:

- `eslint@9.39.5` deprecation warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning for `app/certifications/catalog.ts`.

They are not suppressed or reclassified by this task.

Working tree after validation:

```text
clean
```

## 4. Current runtime/environment configuration consumption inventory

The human-executed repository inspection used:

```powershell
git grep -n -I -E 'process\.env|NEXT_PUBLIC_' -- app tests next.config.ts package.json .github/workflows
```

Observed result:

```text
no matches returned
```

Bounded conclusion:

```yaml
process_env_usage_in_inspected_paths: not_observed
next_public_usage_in_inspected_paths: not_observed
current_application_runtime_env_requirement: not_established
```

This statement is scoped to the inspected versioned paths and current revision. It is not a universal claim about every possible external runtime setting or future implementation.

## 5. Current CI secret/environment consumption inventory

The human-executed workflow inspection used:

```powershell
git grep -n -I -E 'secrets\.|environment:' -- .github/workflows
```

Observed result:

```text
no matches returned
```

The current `Quality` workflow separately establishes:

```yaml
permissions:
  contents: read
```

and contains no versioned reference to GitHub Actions `secrets.*` or an Actions `environment:` declaration.

Bounded conclusion:

```yaml
versioned_quality_workflow_secret_reference: not_observed
versioned_quality_workflow_environment_binding: not_observed
workflow_write_permission: not_requested
workflow_deploy_permission: not_requested
```

This does **not** prove that repository/org/environment secrets do not exist in hosted GitHub settings. Hosted secret inventory was not established by this task and must not be inferred from repository source alone.

## 6. Repository secret-sensitive file protections

Current `.gitignore` includes:

```text
*.pem
.env*
```

Current related protection also ignores:

```text
.vercel
```

Allowed claim:

> The current repository ignore rules protect common local environment files matching `.env*` and PEM key/certificate material matching `*.pem` from ordinary Git tracking, and ignore local Vercel metadata.

Not allowed:

> Therefore secrets can never be committed.

Ignore rules reduce accidental inclusion; they do not replace review, secret scanning, credential hygiene, or human responsibility.

## 7. Configuration classification contract

Future runtime/configuration values must be classified before introduction.

| Class | Meaning | Repository handling |
| --- | --- | --- |
| public/non-sensitive configuration | value safe for browser/user disclosure and repository-visible configuration where appropriate | may be versioned only when task/source requires it |
| client-visible environment configuration | value intentionally exposed to browser bundles | may use `NEXT_PUBLIC_*` only when disclosure is explicitly acceptable |
| server-only non-secret configuration | runtime value not intended for client exposure but not credential-sensitive | keep server-side; source/provider choice must be explicit |
| sensitive/secret | credential, private key, token, password, signing secret, private connection material or equivalent | never commit real value; never place under `NEXT_PUBLIC_*`; consume only through an explicitly governed secret mechanism |
| not currently required | no current source-backed application need | do not invent placeholder production configuration merely to anticipate future infrastructure |

## 8. Next.js client/server exposure boundary

For future Next.js environment variables:

```text
NEXT_PUBLIC_* = client-visible / must be treated as public
```

Therefore:

- passwords must not use `NEXT_PUBLIC_*`;
- API secrets/tokens must not use `NEXT_PUBLIC_*`;
- private database credentials must not use `NEXT_PUBLIC_*`;
- signing/private-key material must not use `NEXT_PUBLIC_*`;
- any value placed under `NEXT_PUBLIC_*` must be assumed visible to users of the built application.

A future variable without `NEXT_PUBLIC_*` is not automatically safe merely because it is server-oriented. Its value and usage still require classification and controlled handling.

## 9. Future CI secret-handling contract

If a later governed task requires CI secrets, all of the following are required before use:

1. explicit source-backed need;
2. named consumer/job/step;
3. least-privilege permission and scope;
4. no secret echoing or intentional logging;
5. no credential values committed to workflow/source files;
6. no secret exposure to untrusted pull-request execution without a separately reviewed security model;
7. environment/repository/organization secret scope chosen only when the deployment/promotion architecture justifies it;
8. rotation/revocation ownership established when a real credential is introduced;
9. failures must not print raw secret material;
10. CI green must not be interpreted as proof that secret handling is universally secure.

This task introduces no CI secret.

## 10. Provider and secret-store status

Current repository evidence does not establish a production provider or secret-management implementation.

Therefore:

```yaml
deployment_provider: not_established
production_runtime_environment: not_established
secret_store: not_established
promotion_environment_model: not_established
production_credentials: not_created
ci_deploy_credentials: not_created
```

The presence of `.vercel` in `.gitignore` is not sufficient evidence that Vercel is the governed deployment target.

No AWS, Azure, GCP, Vercel, Vault, Doppler, GitHub Environment, repository secret, organization secret, or other provider is selected by this baseline.

## 11. Secret demonstration policy

This task deliberately does **not** create a fake-but-secret-looking committed credential as proof.

A secret-handling baseline can be demonstrated through rules and repository inspection without adding material that resembles live credentials.

If a later test requires example syntax, examples must be unmistakably non-sensitive placeholders and must never be presented as usable credentials.

## 12. Current controls and gaps

| Control | Evidence state |
| --- | --- |
| `.env*` ignored | ESTABLISHED |
| `*.pem` ignored | ESTABLISHED |
| current inspected application paths use `process.env` | NOT OBSERVED |
| current inspected application paths use `NEXT_PUBLIC_*` | NOT OBSERVED |
| current `Quality` workflow references `secrets.*` | NOT OBSERVED |
| current `Quality` workflow binds `environment:` | NOT OBSERVED |
| current workflow permission baseline | ESTABLISHED — `contents: read` |
| real secret committed by this task | NO |
| deployment/provider choice | NOT ESTABLISHED |
| secret-store choice | NOT ESTABLISHED |
| production runtime configuration | NOT ESTABLISHED |
| hosted GitHub secret inventory | NOT INSPECTED / NOT ESTABLISHED |
| credential rotation/revocation process | NOT APPLICABLE UNTIL REAL CREDENTIAL INTRODUCTION |
| G-P6 | NOT PERFORMED |
| Stage 07 authorization | FALSE |

## 13. Claim boundaries

Allowed claims:

- current inspected source paths do not expose `process.env` or `NEXT_PUBLIC_*` usage;
- current versioned Quality workflow does not reference `secrets.*` or an Actions environment;
- `.gitignore` protects `.env*` and `*.pem` patterns from ordinary Git tracking;
- current CI workflow remains read-only at the repository-content permission boundary;
- no real secret/provider/deployment credential is introduced by `06.004`.

Prohibited claims:

- no secrets exist anywhere in GitHub hosted settings;
- ignored files can never be committed;
- `npm audit` 0 proves security;
- a non-`NEXT_PUBLIC_*` variable is automatically secure;
- Vercel is selected because `.vercel` is ignored;
- CI green proves comprehensive secrets security;
- this baseline passes G-P6 or authorizes Stage 07.

## 14. Hard-stop evaluation

- real secret created or committed: `NO`;
- sensitive value placed under `NEXT_PUBLIC_*`: `NO`;
- secret echoed to logs: `NO`;
- `.gitignore` secret protections weakened: `NO`;
- hosted secret absence inferred from source search: `NO`;
- deployment/secret provider invented: `NO`;
- CI write/deploy permission added: `NO`;
- promotion/release/deploy executed: `NO`;
- G-P6 attempted: `NO`;
- Stage 07 authorization attempted: `NO`.

## 15. 06.004 disposition

```yaml
record_type: stage06-secure-config-secrets-baseline
stage: stage.skillcertify.06
task: task.skillcertify.06.004
title_status: operational_non_canonical
local_runtime: node_22.22.2_npm_11.13.0
local_quality: pass
local_tests: 26/26_pass
local_build: pass
static_generation: 10/10_pass
process_env_usage_in_inspected_paths: not_observed
next_public_usage_in_inspected_paths: not_observed
quality_workflow_secret_reference: not_observed
quality_workflow_environment_binding: not_observed
env_ignore_protection: established
pem_ignore_protection: established
real_secret_introduced: false
deployment_provider: not_established
secret_store: not_established
gp6_decision: not_performed
stage07_authorized: false
```

Therefore `06.004` is **CONFIG_SECRET_BASELINE_ESTABLISHED / REAL_SECRET_NOT_REQUIRED / PROVIDER_NOT_ESTABLISHED**.
