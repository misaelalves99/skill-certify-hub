# ADR — Product Analytics Eligibility

Task: task.skillcertify.10.005
Stage: stage.skillcertify.10
Status: accepted
Human review: required
Decision authority: human
Evidence type: ADR
Data class: confidential

## Decision context

The governed objective is to decide whether product analytics is eligible and necessary in this cycle before any new instrumentation or interpretation of analytics data.

The canonical task has no explicit context_ref and therefore no discovered contract candidate is promoted to task authority.

The legacy PostHog reference is a derived execution hint only. It does not authorize selecting, connecting, configuring or instrumenting PostHog.

## Verified sources

- Path: app/page.tsx
  - Git blob: 8ffdea3f62e524406a06cd7c04d5ac644d88d49a
  - SHA-256: 2ace0905a3f4dfe893e3391888cf362c04f7ca000a9dd67e61093b9545bea5d1
- Path: ALPHA_EVIDENCE.md
  - Git blob: 661402b8225c6521767b2fb34985cb25b8f2ef99
  - SHA-256: 2655677679ad9f7f5005906c1a5ae6db082a177dca7c39fbf6856073c1203a27
- Path: scripts/stage07-telemetry.mjs
  - Git blob: 5ce9dd3a34450d3f3f5e754cf971200021693bbc
  - SHA-256: b47b211494936a35a3d89ad085e64c45cf92d1056cde625e309bb10f2da17f4d
- Path: stage10-evidence/10-002/METRICS_DICTIONARY_REPORT.md
  - Git blob: 3f102961b558952176b23c08684b24c3af3a5ddc
  - SHA-256: 1fe505e8cf8495aeade0f020cbe904090eed9a627e3eef77902e5990d1ff3560

### Product surface

The current dashboard intentionally exposes an empty tracking state. It does not establish connected product analytics, live progress records, saved user history or live backend analytics state.

### Historical frontend boundary

The Stage 03 alpha evidence describes the product slice as frontend-only and synthetic or mock where governed. It explicitly does not claim product analytics capability.

### Stage 07 telemetry

The Stage 07 telemetry source belongs to task.skillcertify.07.008 and measures bounded AI-runtime properties including provider token usage, latency and estimated input cost.

It is not promoted to a source of product-adoption, user-behavior or product-usage analytics.

### Stage 10 metrics dictionary

The Stage 10 metrics dictionary references analytics evidence associated with the Stage 09 job-search funnel, including discovery, vacancy prioritization, application targets and employment-outcome observations.

Those metrics do not constitute runtime product-usage analytics for SkillCertify and are not promoted to such a role.

## Analytics source availability

Verified product analytics runtime source: false.

Verified product analytics event data: false.

Declared product analytics SDK in package dependencies: false.

Product analytics source status: absent in the authorized evidence set.

Textual references containing terms such as analytics, privacy or telemetry are not treated as proof of a connected product analytics system.

## Consent and data-policy eligibility

Consent adequacy is not established.

Data-policy adequacy is not established.

No inadequacy is inferred merely from missing evidence.

Because no verified product analytics source exists in the authorized evidence set, consent or policy status cannot be used to override the source-absence stop condition.

## Instrumentation necessity

Instrumentation necessity is not established by the current evidence.

The current evidence does not support claiming that instrumentation is unnecessary in general.

The current evidence also does not authorize introducing instrumentation merely to make analytics available.

## Stop-condition evaluation

### fonte de analytics inexistente

Status: TRIGGERED.

Reason: no verified product analytics runtime source or product analytics event data was established in the authorized evidence set.

### consent/data policy inadequados

Status: NOT EVALUATED AS TRIGGER.

Reason: inadequacy is not inferred without evidence.

### instrumentação não necessária

Status: NOT ESTABLISHED.

Reason: the current evidence does not establish a general conclusion that instrumentation is unnecessary.

## Options considered

### Option A — Instrument product analytics now

Not eligible under the current evidence boundary. It would require introducing instrumentation before the task has established an eligible verified analytics source and governance basis.

### Option B — Connect or adopt PostHog now

Not authorized. PostHog is only a legacy tool hint and no source evidence promotes it to execution authority.

### Option C — Interpret existing Stage 07 telemetry as product analytics

Rejected. Stage 07 telemetry measures bounded AI-runtime properties and is not product-adoption telemetry.

### Option D — Interpret Stage 09 funnel analytics as SkillCertify product analytics

Rejected. Stage 09 analytics concerns the job-search funnel and uses different domain semantics.

### Option E — Defer new product analytics instrumentation

Current decision candidate. This preserves the stop condition and avoids inventing product usage evidence or introducing unapproved tracking.

## Decision

Candidate decision: DEFER PRODUCT ANALYTICS INSTRUMENTATION.

Decision status: approved by human review.

This ADR records the human-approved decision for task.skillcertify.10.005.

## Consequences

- No PostHog connection is authorized.
- No new analytics SDK is authorized.
- No product tracking event instrumentation is authorized.
- No product analytics data interpretation is authorized.
- Existing Stage 07 telemetry remains scoped to its governed AI-runtime purpose.
- Existing Stage 09 analytics remains scoped to its governed job-search funnel purpose.
- Future product analytics work requires a separately verified source, necessity decision and appropriate governance review.

## Unknowns

- Whether product analytics will become necessary in a future product cycle.
- Which product-adoption questions would justify instrumentation if future need is established.
- Which consent and data-policy requirements would apply to a future analytics design.
- Which analytics provider, if any, would be appropriate after an explicit tool-selection decision.

## Prohibited interpretations

- Absence of a current analytics source does not prove analytics is permanently unnecessary.
- Absence of consent evidence does not prove consent or policy inadequacy.
- Repository keyword matches do not prove analytics runtime execution.
- Stage 07 AI telemetry does not prove product adoption.
- Stage 09 job-search analytics does not prove SkillCertify product usage.
- PostHog is not selected by this draft.

## Human review

Required.

Human reviewer must approve or reject the candidate decision before the ADR can be frozen as final evidence.

Human review status: APPROVED.