# Stage 09 — Application Stack POC

Task: task.skillcertify.09.002
Canonical title: Executar POC da stack de candidatura
Status: HUMAN_APPROVED
Data class: interno
External action: false

## 1. Canonical objective

Validar se a stack reduz custo/erro sem aumentar exposição de dados ou lock-in; fallback manual é outcome válido.

## 2. Governing dependency

This POC is governed by task.skillcertify.09.001 and preserves its canonical-system, data-class, privacy, automation and human-only boundaries.

The POC does not authorize Job Search, application submission, outreach, LinkedIn mutation, CV publication/export, deployment or external-tool adoption.

## 3. POC method

The evaluation uses a synthetic Frontend Developer vacancy record. No real company, contact, application URL, PII, confidential data, credential or secret is used.

The workflow stops before any external or irreversible action.

Three operating modes are compared:

1. Manual/deterministic workflow using Git/GitHub as canonical portable record.
2. Bounded AI assistance for reversible internal analysis/drafting against synthetic or minimized authorized inputs.
3. Legacy ChatGPT Projects hint retained as a comparison candidate only; it is not selected, adopted, connected or validated.

## 4. Scenario

Synthetic vacancy ID: SYNTHETIC-FE-001

Synthetic target role: Frontend Developer

Controlled workflow:

- capture structured vacancy fields;
- classify evidence requirements;
- compare requirements against governed portfolio evidence;
- draft internal fit notes;
- flag unsupported claims;
- prepare a human-review package;
- stop before external submission.

## 5. Result by operating mode

### MODE-A — manual_deterministic

Result: viable baseline.

Strengths: high auditability, high reproducibility, no external data transfer requirement, low lock-in, full human control and deterministic fallback.

Cost: more manual handling and no claimed automation efficiency measurement.

### MODE-B — bounded_ai_assistance

Result: viable only under the 09.001 governance policy.

Strengths: can assist reversible internal classification/drafting while keeping the canonical record portable and human-reviewed.

Conditions: source backing, data minimization, authority check, persisted evidence and explicit human review remain mandatory.

No empirical time-saving or ROI claim is established by this POC.

### MODE-C — ChatGPT Projects legacy hint

Result: NOT_SELECTED_NOT_ADOPTED.

The architecture mentions ChatGPT Projects only as derived-hint-only. The current task does not establish authority to adopt it, transfer additional data to it or depend on it as the canonical system.

The POC does not require this product to obtain a valid outcome.

## 6. Cost, error, exposure and lock-in assessment

Cost reduction: structurally plausible for bounded reversible drafting, but measured time/cost savings are NOT_ESTABLISHED.

Error reduction: deterministic checklists plus source-backed human review provide a governed mechanism for reducing unsupported-claim and workflow-state errors; quantitative error-rate improvement is NOT_ESTABLISHED.

Data exposure: manual/deterministic mode minimizes exposure. AI-assisted mode is acceptable only with data minimization and authority defined by 09.001.

Lock-in: keeping Git/GitHub and portable Markdown/JSON as the canonical record materially limits dependency on any single assistant/tool. Product-specific lock-in for ChatGPT Projects is NOT_ESTABLISHED because it was not adopted or executed.

## 7. Fallback

Manual/deterministic execution remains a fully valid fallback and therefore prevents the POC from depending on an external AI product.

## 8. Preliminary decision

Candidate outcome: MANUAL_DETERMINISTIC_WITH_BOUNDED_AI_ASSISTANCE_PREFERRED.

Human-approved task decision: MANUAL_DETERMINISTIC_WITH_BOUNDED_AI_ASSISTANCE_PREFERRED.

ChatGPT Projects: NOT_AUTHORIZED_NOT_REQUIRED_FOR_CURRENT_POC.

## 9. Explicit non-claims

- no real Job Search was executed;
- no job application was submitted;
- no external outreach occurred;
- no personal or confidential candidate dataset was processed for the POC;
- no external tool was adopted;
- no measured time saving was established;
- no measured ROI was established;
- no production-scale behavior was established.

## 10. Required review

Human factual review: PASS.

Human privacy review: PASS.

The task cannot advance to commit authorization until those reviews are explicitly completed and the human POC decision is recorded.

## 11. Human POC decision

Human decision: APROVO — 09.002 HUMAN FACTUAL PRIVACY REVIEW E POC DECISION

Approved outcome: MANUAL_DETERMINISTIC_WITH_BOUNDED_AI_ASSISTANCE_PREFERRED

ChatGPT Projects remains NOT_ADOPTED and NOT_REQUIRED for the current POC.

This decision does not authorize Job Search, job applications, external outreach, LinkedIn mutation, CV publication/export, deployment or external-tool adoption.
