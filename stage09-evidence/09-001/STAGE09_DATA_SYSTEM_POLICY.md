# Stage 09 — Canonical Data & System Policy

## Identity

- Task: `task.skillcertify.09.001`
- Stage: `stage.skillcertify.09`
- Workstream: `workstream.skillcertify.09.01`
- Policy status: `HUMAN_APPROVED`
- External action: `false`
- Job Search authorization: `false`

## 1. Purpose

This policy establishes the canonical system of record, data classes, handling rules, automation boundaries, human-only authority boundaries, privacy controls and deterministic fallback path for Stage 09.

It creates governance for future Job Search execution. It does not authorize Job Search, applications, outreach, publication, LinkedIn mutation, CV publication/export, external tool adoption or any other external or irreversible action.

## 2. Canonical system of record

The Git repository `misaelalves99/skill-certify-hub`, together with governed Stage 09 evidence committed through the approved Git/GitHub workflow, is the canonical execution record for Stage 09.

The canonical record must preserve:

- stable task IDs;
- source references;
- factual claims and their evidence;
- human decisions and their durable references;
- execution state;
- validation state;
- data classification;
- automation authority;
- external-action authority;
- residual risks and unresolved unknowns.

Chat history, AI-generated text, local scratch files, screenshots without source/version, inferred state and third-party tool state are not canonical by themselves.

Local checkpoints are recovery and transfer evidence. They do not replace the governed repository record.

## 3. Source authority

Every material Job Search fact must have a source whose authority and freshness are appropriate to the claim.

Allowed source states:

- `verified_current` — source inspected and sufficiently current for the decision;
- `verified_historical` — authentic historical evidence, not asserted as current;
- `candidate_unverified` — discovered but not yet trusted for material action;
- `stale` — too old for the intended current-state claim;
- `suspicious` — provenance or integrity concern;
- `unknown` — authority cannot yet be established.

`candidate_unverified`, `stale`, `suspicious` and `unknown` cannot independently authorize an application, outreach, external write or irreversible decision.

## 4. Data classes

### D0 — Public

Information intentionally public and lawfully accessible, such as public job descriptions, public company pages, public repository evidence and approved public portfolio material.

Default handling: may be read and referenced internally. External action still requires the authority applicable to that action.

### D1 — Internal

Non-public operational notes, rankings, research annotations, internal assessments, draft messaging, checkpoint metadata and execution planning.

Default handling: repository/local controlled workflow. Do not publish automatically.

### D2 — Confidential

Full CV source material, non-public career strategy, private correspondence, private recruiter/hiring-manager context, unpublished personal records and other information whose disclosure could materially affect privacy or career activity.

Default handling: minimize, restrict and require explicit authority before transfer to an external provider.

### D3 — Restricted / Secret

Passwords, API keys, access tokens, credentials, session secrets, private keys, authentication material, prohibited production data and equivalent sensitive secrets.

Default handling: must not be entered into Stage 09 evidence, AI prompts, public artifacts, issue bodies or external tools.

If discovered, stop the affected workflow and follow the appropriate security/remediation path.

### D4 — Personal / PII

Personal identifiers and contact information belonging to the user or third parties, including non-public email, telephone, address or other identifying/contact data.

Default handling: collect only when necessary and legitimately sourced; minimize retention and propagation; never enrich, infer or disclose sensitive personal information without a valid governed purpose and authority.

## 5. Data minimization

Stage 09 uses the minimum data required for the current governed task.

Rules:

- do not copy an entire document when a source reference or bounded excerpt is sufficient;
- do not duplicate confidential data across tools without need;
- do not preserve secrets in evidence;
- do not convert unknown or inferred personal information into asserted fact;
- do not retain candidate data merely because tooling permits it;
- prefer references and deterministic metadata over unnecessary raw personal content.

## 6. Action classes

### `read`

Inspect authorized sources without changing source or external state.

Default: allowed when source/data authority exists.

### `draft`

Create internal proposed content that has no external effect.

Default: allowed when source/data handling rules are satisfied. Draft output is not proof and is not approved external communication.

### `write_internal`

Persist governed internal evidence or execution records in the authorized repository/local workflow.

Default: allowed only within the active task scope and normal review/commit governance.

### `supervised_run`

Execute bounded tooling whose effects and data movement are understood and whose use has been authorized for the specific task.

Default: requires established tool/data authority and applicable human supervision.

### `external_or_irreversible`

Any action that changes externally visible state, contacts another person/entity, submits an application, publishes material, changes visibility, adopts an external service with data transfer, or creates another material irreversible effect.

Default: HUMAN-ONLY AUTHORITY. Specific human authorization is required before execution.

## 7. Automation authority matrix

| Activity | Automation status | Human authority |
| --- | --- | --- |
| Read authorized public sources | Allowed when source authority exists | Review when material |
| Normalize deterministic metadata | Allowed | Review when material |
| Calculate hashes/checks | Allowed | No external authority implied |
| Detect duplicates/schema violations | Allowed | Review result |
| Produce internal draft | Allowed | Human review before external use |
| Rank/score opportunities | Decision-support only | Human decides material use |
| Infer unsupported facts | Prohibited | Cannot be cured by automation |
| Handle secrets as normal evidence | Prohibited | Security stop required |
| Apply to a job | Not authorized by this policy | Specific human authorization required |
| Send recruiter/company message | Not authorized by this policy | Specific human authorization required |
| Mutate LinkedIn/profile | Not authorized by this policy | Specific human authorization required |
| Publish/export CV externally | Not authorized by this policy | Specific human authorization required |
| Publish portfolio/release | Not authorized by this policy | Specific human authorization required |
| Adopt external tool/provider | Not authorized by recommendation alone | Explicit human adoption/data authority required |

Automation may assist evidence retrieval, normalization, deterministic checks and drafting. It must not silently cross from decision support into external execution.

## 8. Human-only boundaries

The following remain human-controlled unless a later canonical task explicitly establishes a narrower approved authority:

- final factual acceptance of material career claims;
- privacy acceptance;
- tool/provider adoption;
- authorization to move confidential data to an external provider;
- final opportunity selection where a material career action follows;
- application submission;
- recruiter/employer outreach;
- LinkedIn/profile mutation;
- CV publication/export;
- publication/visibility change;
- acceptance of material residual risk;
- Stage gates and bounded handoffs.

AI recommendation, tool availability, successful validation or technical ability to perform an action does not constitute human authorization.

## 9. AI and external-tool policy

Legacy recommendations such as `ChatGPT Projects` are `derived-hint-only`.

`recommended`, `conditional`, `available` or `poc_required` do not mean adopted, connected, validated or authorized.

Before an external tool may receive non-public Stage 09 data, the workflow must establish:

1. specific governed purpose;
2. relevant data class;
3. minimum necessary data;
4. provider/tool authority;
5. human authorization when required;
6. bounded expected action/effect;
7. fallback if the tool is unavailable or rejected.

## 10. PII and privacy boundary

Public professional information may be processed only for the governed Job Search purpose and within the applicable source/action authority.

Non-public third-party PII must not be harvested, enriched, guessed or propagated merely to improve outreach.

Do not create sensitive-person profiles or infer protected/sensitive attributes.

When a task can be completed without personal data, use the non-personal path.

Privacy review is required before `09.001` can be accepted.

## 11. Factual integrity

AI-generated content is a draft unless tied back to source evidence.

Rules:

- generated text is not execution proof;
- a plausible claim is not a verified claim;
- absence of evidence must remain an absence/unknown;
- source disagreement must be surfaced, not silently reconciled;
- historical evidence must not be presented as current without current verification;
- career claims must not exceed the evidence boundary established by Stage 08 or later governed evidence.

## 12. Manual deterministic fallback

When automation, AI or an external tool is unavailable, rejected, unauthorized or unsuitable, execution falls back to:

1. Git/Markdown/JSON/CSV records;
2. deterministic scripts/checks;
3. source-by-source manual inspection;
4. hashes and stable references;
5. human factual/privacy review;
6. explicit human decision for external or irreversible actions.

No task should require adoption of a paid or external AI tool merely to remain executable.

## 13. Hard stops

Stop the affected workflow when:

- source is stale, suspicious or unverified for the material decision;
- required data/tool authority is absent;
- PII or secret exposure would occur;
- automation boundary is ambiguous;
- generated content is being treated as source evidence;
- an external action lacks specific authority;
- a confidential-data transfer lacks the required authorization.

A hard stop must be resolved, narrowed, deferred or escalated to a human decision. It must not be silently bypassed.

## 14. State separation

The system must distinguish at least:

- `discovered`;
- `candidate_unverified`;
- `verified`;
- `draft`;
- `ready_for_human_review`;
- `human_approved`;
- `authorized_for_specific_external_action`;
- `executed`;
- `blocked`;
- `deferred`;
- `rejected`.

`verified` does not mean `approved`.

`approved` does not automatically mean `authorized_for_specific_external_action`.

`authorized` does not mean `executed`.

## 15. Current authority snapshot

At materialization of this policy:

- Stage 08 G-P8: `PASS — HUMAN`;
- Stage 09 eligibility: `true`;
- `task.skillcertify.09.001` start: explicitly authorized;
- Job Search execution: `not authorized`;
- job application: `not authorized`;
- recruiter/employer outreach: `not authorized`;
- LinkedIn mutation: `not authorized`;
- CV publication/export: `not authorized`;
- external publication/deployment: `not authorized`;
- external tool adoption: `not authorized`.

## 16. Acceptance boundary

Human factual review and privacy review have been completed with PASS for `09.001`.

Acceptance of `09.001` establishes governance readiness only. It does not authorize Job Search or any downstream external action.
