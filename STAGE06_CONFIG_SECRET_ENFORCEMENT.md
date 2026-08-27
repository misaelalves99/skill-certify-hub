# Stage 06 — Configuration and Secret-Handling Enforcement

## Purpose

This document materializes `task.skillcertify.06.005` for Stage 06 — DevOps & Delivery.

The individual canonical display title for `06.005` is not available in the recovered source. The operational title used for this task is therefore non-canonical and derived from the Stage 06 secure-configuration/secrets concern plus the explicit gap preserved by `06.004`: ignore rules and documentation do not by themselves prove that protected material cannot enter the tracked repository.

This task converts the `06.004` policy baseline into deterministic repository enforcement. It does **not** establish comprehensive secret scanning, hosted-secret inventory, deployment infrastructure, credential validity, release authority, G-P6, or Stage 07 authorization.

## 1. Governed objective

Create a repository-native guard that fails deterministically when the currently approved configuration/secret-handling boundary changes without explicit review.

The control question is:

> Can the repository automatically reject known policy violations in the currently governed source/workflow surface while remaining explicit about what the guard does not detect?

## 2. Entry evidence

`task.skillcertify.06.004` completed through PR #116.

Post-merge `main` evidence:

```yaml
merge_commit: afbdd3deb50fb199ce874e67301f2d2f1129988e
workflow: Quality
run_number: 13
run_id: 33067217019
event: push
conclusion: success
```

Human-executed local baseline entering `06.005`:

```yaml
branch: task/skillcertify-06-005-config-secret-enforcement
node: v22.22.2
npm: 11.13.0
npm_ci: pass
packages_added: 344
packages_audited: 345
npm_audit_reported_vulnerabilities: 0
lint: pass
typecheck: pass
tests: 26/26_pass
build: pass
static_generation: 10/10_pass
working_tree: clean
```

Known non-blocking diagnostics remain visible:

- ESLint 9.39.5 deprecation warning;
- Node `MODULE_TYPELESS_PACKAGE_JSON` warning for `app/certifications/catalog.ts`.

They are not suppressed or reclassified by this task.

## 3. Entry policy-surface inspection

The human baseline used:

```powershell
git ls-files | Select-String -Pattern '(^|/)\.env|\.pem$|\.key$|\.p12$|\.pfx$'
git grep -n -I -E 'process\.env|NEXT_PUBLIC_' -- app next.config.ts
git grep -n -I -E 'secrets\.|^[[:space:]]*environment:' -- .github/workflows
```

Observed result for all three commands:

```text
no matches returned
```

Bounded interpretation:

```yaml
tracked_sensitive_filename_match: not_observed
application_process_env_usage: not_observed
application_next_public_usage: not_observed
workflow_secrets_context_usage: not_observed
workflow_environment_binding: not_observed
```

This is a current-revision repository observation only.

## 4. Versioned enforcement

This task adds:

```text
scripts/config-secret-guard.mjs
tests/config-secret-guard.test.mjs
```

The guard is repository-native and uses Node plus Git already required by the project workflow.

No new npm dependency is introduced.

The guard returns a non-zero exit code when a governed violation is found.

## 5. Guarded tracked-file boundary

The guard inspects `git ls-files` and rejects tracked files matching the current protected classes:

```text
.env
.env.*
*.pem
*.key
*.p12
*.pfx
```

This closes the specific `06.004` gap where `.gitignore` alone could not prove that a protected file had not been force-added or previously tracked.

The guard checks tracked filenames only. It does not inspect ignored/untracked local file contents.

## 6. Required ignore-rule boundary

The guard requires these exact active `.gitignore` rules:

```text
.env*
*.pem
*.key
*.p12
*.pfx
```

`06.005` extends the existing key-material protection beyond `*.pem` to include common private-key/certificate-container extensions:

```text
*.key
*.p12
*.pfx
```

Removal of a required rule causes deterministic failure.

## 7. Governed application configuration surface

The guard scans versioned source files beneath:

```text
app/
```

and any present Next configuration file among:

```text
next.config.ts
next.config.js
next.config.mjs
next.config.cjs
```

It rejects newly observed use of:

```text
process.env
NEXT_PUBLIC_*
```

This is not a permanent prohibition on environment configuration. It is a review gate: future runtime configuration must first update the governed policy and classification contract rather than entering silently.

## 8. Governed GitHub Actions surface

The guard scans YAML workflow files beneath:

```text
.github/workflows/
```

It rejects newly observed use of:

```text
secrets.*
environment:
```

Again, this is not a permanent prohibition. A future deployment/promotion task may explicitly authorize environment or secret consumption after documenting provider, trust boundary, least privilege, PR exposure rules, and credential ownership.

## 9. Log-safety behavior

When source/workflow policy matches are detected, the guard reports only:

- violation category;
- repository path.

It does **not** print the matching source line or value.

This reduces the chance that future CI failure output itself exposes credential material.

The guard is still not a secret scanner and does not validate whether a value is sensitive.

## 10. Synthetic negative-path tests

`tests/config-secret-guard.test.mjs` contains synthetic, non-sensitive fixtures that exercise:

1. valid governed baseline — accepted;
2. tracked `.env.local` — rejected;
3. tracked `.key` material — rejected;
4. missing `.env*` ignore protection — rejected;
5. application `process.env` introduction — rejected;
6. application `NEXT_PUBLIC_*` introduction — rejected;
7. workflow `secrets.*` introduction — rejected;
8. workflow `environment:` binding — rejected.

Human post-materialization execution:

```text
node --test tests/config-secret-guard.test.mjs
```

Observed result:

```yaml
tests: 8
pass: 8
fail: 0
cancelled: 0
skipped: 0
```

Therefore the controlled synthetic failure-path coverage is `ESTABLISHED` for these eight governed cases. No real credential or secret value was used.

## 11. Quality-path integration

`package.json` adds:

```text
guard:config-secrets = node scripts/config-secret-guard.mjs
```

The governed top-level quality chain becomes:

```text
config/secret guard
→ lint
→ typecheck
→ tests
→ production build
```

Equivalent command:

```text
npm run guard:config-secrets && npm run lint && npm run typecheck && npm run test && npm run build
```

Because GitHub Actions already executes `npm run quality`, the same guard will execute locally and remotely without duplicating CI-specific policy logic.

`tests/foundation.test.mjs` is updated to keep the repository's deterministic quality-contract assertion aligned with this new chain.

Human post-materialization execution established:

```yaml
guard_config_secrets: pass
repository_test_suite: 34/34_pass
quality_chain: pass
production_build: pass
static_generation: 10/10_pass
working_tree: clean
```

The explicit guard invocation returned:

```text
Config/secret policy guard: PASS
```

Known non-blocking ESLint and module-type warnings remained visible and did not change disposition.

## 12. Explicit limitations

This guard does **not** establish:

- entropy-based secret detection;
- vendor/token signature detection;
- credential validity testing;
- historical Git secret scanning;
- scanning of every arbitrary repository file for secret values;
- hosted GitHub repository/environment/organization secret inventory;
- scanning of ignored/untracked local files;
- external provider leak detection;
- dependency security assurance;
- runtime secret-store configuration;
- credential rotation/revocation implementation;
- deployment safety;
- comprehensive security PASS.

Therefore:

```text
policy_guard_pass != comprehensive_secret_scan_pass
policy_guard_pass != repository_security_pass
ci_green != G-P6
```

## 13. Provider/deployment boundary

No provider or secret store is selected by this task.

```yaml
deployment_provider: not_established
secret_store: not_established
production_runtime_environment: not_established
promotion_environment_model: not_established
real_secret_introduced: false
ci_deploy_credentials: not_created
```

## 14. Post-materialization evidence state

Direct human local execution after materialization established:

```yaml
materialization_commit: 9ff3ce7ce297b9007737bca74e9b11bf047a182b
local_post_materialization_guard: pass
synthetic_negative_tests: 8/8_pass
repository_tests: 34/34_pass
local_post_materialization_quality: pass
production_build: pass
static_generation: 10/10_pass
working_tree: clean
remote_ci: pending_pr_execution
```

The local PASS is authoritative only for the supplied human execution. It is not relabeled as remote CI PASS.

## 15. Hard-stop evaluation after local validation

- real secret committed for testing: `NO`;
- secret value intentionally printed to logs: `NO`;
- comprehensive secret-scanner claim made: `NO`;
- provider selected: `NO`;
- workflow secret introduced: `NO`;
- workflow environment introduced: `NO`;
- workflow write/deploy permission introduced: `NO`;
- deployment/promotion/release executed: `NO`;
- local PASS promoted to CI PASS: `NO`;
- G-P6 attempted: `NO`;
- Stage 07 authorization attempted: `NO`.

## 16. 06.005 evidence record

```yaml
record_type: stage06-config-secret-enforcement
stage: stage.skillcertify.06
task: task.skillcertify.06.005
title_status: operational_non_canonical
source_baseline: STAGE06_CONFIG_SECRETS_BASELINE.md
policy_guard: established_local
tracked_sensitive_filename_guard: established_local
required_ignore_guard: established_local
application_env_usage_guard: established_local
workflow_secret_environment_guard: established_local
synthetic_negative_tests: 8/8_pass
quality_integration: established_local
repository_tests: 34/34_pass
local_quality: pass
local_build: pass
static_generation: 10/10_pass
working_tree: clean
real_secret_introduced: false
comprehensive_secret_scanner: false
deployment_provider: not_established
secret_store: not_established
remote_ci: pending_pr_execution
gp6_decision: not_performed
stage07_authorized: false
```

Therefore `06.005` is **LOCAL_ENFORCEMENT_ESTABLISHED / SYNTHETIC_FAILURE_PATH_ESTABLISHED / REMOTE_CI_PENDING** until the governed PR produces direct GitHub Actions evidence.