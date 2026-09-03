# Stage 08 - Tooling POC Evaluation

## Metadata

```yaml
record_type: portfolio-tooling-poc-evaluation
stage_id: stage.skillcertify.08
task_id: task.skillcertify.08.002
task_title: Avaliar tooling/POC de portfólio
issue_number: 157
source_commit: c1ac728e01b7ca891fdbc85283d44561b8b5a1ce
baseline_artifact: STAGE08_EVIDENCE_PACK.md
baseline_blob: 9e425c998ab3848cd2c6ebee923911d5bac5b698
status: HUMAN_REVIEW_APPROVED
data_class: interno
human_review_required: true
publication_authority: false
gp8_authority: false
```

## 1. Objective

Evaluate whether additional tooling materially reduces risk, gaps or rework beyond the existing manual/deterministic evidence workflow while preserving provenance, factuality, data safety, exportability, reversibility and human authority.

The reference baseline is the human-approved Stage 08 evidence pack plus Git, Markdown, repository-native deterministic checks, exact blob identities and manual inspection.

## 2. Decision model

A candidate is not adopted merely because it exists, is recommended elsewhere, or could theoretically automate work.

Each candidate is evaluated against:

- job fit;
- demonstrated need;
- source-ref preservation;
- factuality;
- risk/rework reduction;
- data exposure;
- exportability;
- reversibility/fallback;
- evidence preservation;
- error modes;
- out-of-scope change risk;
- human review and decision authority.

Valid outcomes include maintain, limit, reject, defer, manual preferred and AI not required.

## 3. Manual/deterministic baseline

Observed baseline capabilities:

| Capability | Observed state |
| --- | --- |
| Git source identity | ESTABLISHED |
| exact Git blob recovery | ESTABLISHED |
| claim-to-evidence map | ESTABLISHED |
| gap/unknown preservation | ESTABLISHED |
| human-review authority | ESTABLISHED |
| deterministic repository quality | ESTABLISHED |
| publication authority | NOT PROVIDED |
| production inference authority | NOT PROVIDED |

The baseline evidence pack contains 12 governed claim IDs and recoverable SHA-based provenance without requiring an external evidence-generation tool.

Baseline disposition: MANUAL_DETERMINISTIC_PREFERRED.

## 4. Candidate A - Codex / generative AI assistance

### Observed fit

The current job is evidence validation and provenance preservation. It does not require generative inference to establish source identity, blob identity, claim coverage, gap state or human authority.

Generated prose cannot become evidence merely because it was produced by an AI tool. Any generated interpretation would still require verification against the same repository sources already available to the deterministic/manual baseline.

### Risk / value comparison

- material provenance improvement over Git/blob refs: NOT DEMONSTRATED;
- factuality advantage: NOT DEMONSTRATED;
- reduction in required human authority: NOT ALLOWED;
- new evidence creation: NOT ALLOWED;
- fallback to manual/deterministic workflow: AVAILABLE;
- additional data exposure: POSSIBLE depending on use;
- adoption need for this job: NOT ESTABLISHED.

### Outcome

```yaml
candidate: codex
outcome: AI_NOT_REQUIRED
adopted: false
validated_for_08_002_job: false
reason: existing deterministic/manual baseline already establishes the required evidence properties
```

## 5. Candidate B - Playwright

### Observed repository state


The command `npm ls @playwright/test --all` returned an empty dependency tree. The package is not installed as an active project dependency.

The package-lock occurrence is an optional peer dependency entry and does not establish a Playwright harness, browser workflow or browser evidence capability.

Historical repository evidence explicitly records that Playwright/Cypress was not introduced where the governed scope did not justify the additional browser infrastructure.

### Job fit

Browser E2E remains a known broader assurance gap in historical evidence, but task 08.002 does not own browser E2E execution, media capture or screenshot generation.

Adding Playwright here would broaden task scope rather than validate the current evidence pack.

### Outcome

```yaml
candidate: playwright
outcome: DEFER
adopted: false
installed_for_this_task: false
browser_gap_denied: false
reason: browser automation is a real separate concern but is not required by the current evidence-provenance job
```

## 6. Candidate C - Gitleaks

### Observed repository state

No repo-native Gitleaks configuration or execution surface was found.

The repository already includes a bounded deterministic `guard:config-secrets` control. The guard checks sensitive tracked-file patterns, required ignore protections, environment-variable usage and GitHub Actions secret/environment bindings.

The current guard execution passed.

### Boundary

The repo-native guard is not equivalent to comprehensive secret scanning. Historical evidence correctly preserves comprehensive secret scanning as not established.

However, task 08.002 does not require comprehensive scanner adoption to validate the evidence pack, and no current evidence demonstrates that adding Gitleaks here would materially improve the provenance job enough to justify new tooling/infrastructure.

### Outcome

```yaml
candidate: gitleaks
outcome: DEFER_LIMIT
adopted: false
comprehensive_secret_scanning_established: false
current_bounded_guard_available: true
reason: broader scanner value may exist in a security-specific scope but is not required for this evidence-tooling job
```

## 7. Comparative decision matrix

| Candidate | Job fit | Provenance gain | Current need | New infrastructure | Outcome |
| --- | --- | --- | --- | --- | --- |
| Manual / Git / Markdown / hashes | HIGH | DIRECT | ESTABLISHED | NONE | MAINTAIN / PREFERRED |
| Codex / generative AI | LOW for factual evidence establishment | NOT DEMONSTRATED | NOT ESTABLISHED | POSSIBLE | AI NOT REQUIRED |
| Playwright | LOW for current job | NONE for claim/blob provenance | NOT REQUIRED HERE | YES | DEFER |
| Gitleaks | LOW-MEDIUM but security-specific | NONE for claim/blob provenance | NOT REQUIRED HERE | YES | DEFER / LIMIT |

## 8. POC result

```yaml
baseline: manual_deterministic
baseline_outcome: MAINTAIN
preferred_route: Git_Markdown_JSON_CSV_hashes_manual_inspection
codex_outcome: AI_NOT_REQUIRED
playwright_outcome: DEFER
gitleaks_outcome: DEFER_LIMIT
new_tool_adoption_recommended: false
new_external_connection_required: false
current_evidence_job_requires_ai: false
current_evidence_job_requires_browser_automation: false
current_evidence_job_requires_comprehensive_secret_scanner: false
historical_browser_e2e_gap_preserved: true
historical_comprehensive_secret_scan_gap_preserved: true
```

## 9. Governance boundaries

This evaluation does not:

- claim that Playwright has no future value;
- claim that comprehensive secret scanning is established;
- claim that the current config/secret guard replaces a comprehensive scanner;
- prohibit future tool evaluation in a task that actually owns the relevant job;
- authorize AI adoption;
- authorize external tool connection;
- authorize publication;
- update README;
- produce portfolio narrative;
- create screenshots or media;
- accept residual risk;
- perform G-P8;
- start Job Search.

## 10. Human-review checkpoint

```yaml
poc_completed: true
decision_materialized: true
manual_baseline_preserved: true
external_tool_adoption: false
human_review_pending: false
human_review_status: APPROVED
human_review_decision: MANUAL_DETERMINISTIC_PREFERRED
human_review_source: issue-157-comment-5519701603
human_decision_authority: HUMAN
```

The technical comparison is complete. Final acceptance of the Stage 08 tooling disposition remains human-only.
