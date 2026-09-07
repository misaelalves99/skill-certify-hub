# Cycle Metrics Dictionary Draft

Task: task.skillcertify.10.002
Stage: stage.skillcertify.10
Status: ready after human factual, privacy, authority and semantic approval

## Governance

This dictionary defines metrics before interpretation.
It does not populate new metric values in task 10.002.
It does not infer universal targets.
It does not make causal claims.
A missing denominator is preserved as missing.
NOT_OBSERVED is not converted to verified zero.
The observed discovery, prioritization and application quantities use different units and must not be represented as a statistical conversion funnel.
Commit counts are not treated as productivity metrics.

Frozen cycle period:
- start: 2026-08-21T19:51:40-03:00
- end: 2026-09-07T14:48:11-03:00

Human review authority:
- owner role: human reviewer required by task.skillcertify.10.002

## metric-discovery-source-units

Decision question: How many recoverable discovery source units were observed in the Stage 09 analytics source?
Definition: Count of discovery source units under the explicit discovery semantics of the frozen Stage 09 analytics evidence.
Formula: count of records classified as discovery source units by the authoritative analytics source.
Unit: source units.
Source: stage09-evidence/09-011/FUNNEL_TOOL_REEVALUATION_REPORT.json and stage09-evidence/09-011/FUNNEL_TOOL_REEVALUATION_REPORT.md.
Reproduction: read the discovery denominator from the frozen Stage 09 analytics artifact; no new value is calculated in task 10.002.
Period or window: Stage 09 analytics observation window as frozen by its source, reviewed inside the Cycle Review period 2026-08-21T19:51:40-03:00 to 2026-09-07T14:48:11-03:00.
Denominator or population: not applicable to this count metric.
Filters: only units explicitly included by the Stage 09 discovery denominator semantics.
Owner: human Cycle Review reviewer.
Data class: internal sanitized analytics evidence.
Freshness: frozen Stage 09 analytics evidence.
Quality or completeness: recoverable for the source-unit count, but not interchangeable with vacancy or application counts.
Limitations: discovery units are source observations, not applications; no conversion inference is authorized.
Interpretation boundary: use only as operational discovery volume under its own denominator.

## metric-prioritized-vacancies

Decision question: How many vacancies entered the explicit prioritization decision set?
Definition: Count of vacancies represented in the frozen Stage 09 prioritization decision set.
Formula: count of vacancy decision records in the authoritative prioritization artifact.
Unit: vacancies.
Source: stage09-evidence/09-006/VACANCY_PRIORITIZATION_DECISION.json and stage09-evidence/09-011/FUNNEL_TOOL_REEVALUATION_REPORT.json.
Reproduction: inspect the frozen prioritization decision set and its Stage 09 analytics summary; no new value is calculated in task 10.002.
Period or window: Stage 09 prioritization window within the frozen Cycle Review period.
Denominator or population: not applicable to this count metric.
Filters: only vacancies included in the explicit frozen prioritization decision.
Owner: human Cycle Review reviewer.
Data class: internal sanitized vacancy evidence.
Freshness: frozen Stage 09 prioritization evidence.
Quality or completeness: sufficient to identify the frozen decision set, not to infer market-wide opportunity volume.
Limitations: priority bands are contextual decisions and are not universal employability, ATS or hiring-probability scores.
Interpretation boundary: do not divide by discovery source units to claim a conversion rate.

## metric-human-authorized-application-targets

Decision question: How many application targets entered a human-authorized application flow?
Definition: Count of application targets explicitly covered by the human-authorized Stage 09 application flow.
Formula: count of application targets with explicit human authorization in the frozen application evidence.
Unit: application targets.
Source: stage09-evidence/09-010/APPLICATION_STATUS.json and stage09-evidence/09-011/FUNNEL_TOOL_REEVALUATION_REPORT.json.
Reproduction: inspect the sanitized frozen application state and analytics source; no new value is calculated in task 10.002.
Period or window: Stage 09 application observation window within the frozen Cycle Review period.
Denominator or population: not applicable to this count metric.
Filters: only targets with explicit human authorization in the governed flow.
Owner: human Cycle Review reviewer.
Data class: internal sanitized application evidence.
Freshness: frozen Stage 09 application evidence.
Quality or completeness: platform-level candidacy state is recoverable; vacancy-specific receipt remains unavailable.
Limitations: active platform-level candidacy does not establish vacancy-specific receipt, interview selection, employment or hiring.
Interpretation boundary: do not treat the count as application success or hiring effectiveness.

## metric-screening-rate

Decision question: What proportion of compatible outcome-denominator units produced an observed screening event?
Definition: Screening events divided by a compatible, explicitly defined outcome denominator.
Formula: observed screening events divided by compatible outcome denominator.
Unit: ratio.
Source: stage09-evidence/09-011/FUNNEL_TOOL_REEVALUATION_REPORT.json and stage09-evidence/09-011/HUMAN_REVIEW.json.
Reproduction: currently not executable because the compatible outcome denominator and true screening count are unresolved.
Period or window: Stage 09 outcome observation window within the frozen Cycle Review period.
Denominator or population: unavailable and must not be inferred.
Filters: only explicit observed outcome events would qualify.
Owner: human Cycle Review reviewer.
Data class: internal sanitized analytics evidence.
Freshness: frozen Stage 09 analytics evidence.
Quality or completeness: insufficient for rate calculation.
Limitations: screening is NOT_OBSERVED rather than verified zero and no compatible outcome denominator exists.
Interpretation boundary: no screening rate may be calculated from current evidence.

## metric-interview-rate

Decision question: What proportion of compatible outcome-denominator units produced an observed interview event?
Definition: Interview events divided by a compatible, explicitly defined outcome denominator.
Formula: observed interview events divided by compatible outcome denominator.
Unit: ratio.
Source: stage09-evidence/09-011/FUNNEL_TOOL_REEVALUATION_REPORT.json and stage09-evidence/09-011/HUMAN_REVIEW.json.
Reproduction: currently not executable because the compatible outcome denominator and true interview count are unresolved.
Period or window: Stage 09 outcome observation window within the frozen Cycle Review period.
Denominator or population: unavailable and must not be inferred.
Filters: only explicit observed outcome events would qualify.
Owner: human Cycle Review reviewer.
Data class: internal sanitized analytics evidence.
Freshness: frozen Stage 09 analytics evidence.
Quality or completeness: insufficient for rate calculation.
Limitations: interview is NOT_OBSERVED rather than verified zero and no compatible outcome denominator exists.
Interpretation boundary: no interview rate may be calculated from current evidence.

## metric-rejection-rate

Decision question: What proportion of compatible outcome-denominator units produced an observed rejection event?
Definition: Rejection events divided by a compatible, explicitly defined outcome denominator.
Formula: observed rejection events divided by compatible outcome denominator.
Unit: ratio.
Source: stage09-evidence/09-011/FUNNEL_TOOL_REEVALUATION_REPORT.json and stage09-evidence/09-011/HUMAN_REVIEW.json.
Reproduction: currently not executable because the compatible outcome denominator and true rejection count are unresolved.
Period or window: Stage 09 outcome observation window within the frozen Cycle Review period.
Denominator or population: unavailable and must not be inferred.
Filters: only explicit observed outcome events would qualify.
Owner: human Cycle Review reviewer.
Data class: internal sanitized analytics evidence.
Freshness: frozen Stage 09 analytics evidence.
Quality or completeness: insufficient for rate calculation.
Limitations: rejection is NOT_OBSERVED rather than verified zero and no compatible outcome denominator exists.
Interpretation boundary: no rejection rate may be calculated from current evidence.

## metric-offer-rate

Decision question: What proportion of compatible outcome-denominator units produced an observed offer event?
Definition: Offer events divided by a compatible, explicitly defined outcome denominator.
Formula: observed offer events divided by compatible outcome denominator.
Unit: ratio.
Source: stage09-evidence/09-011/FUNNEL_TOOL_REEVALUATION_REPORT.json and stage09-evidence/09-011/HUMAN_REVIEW.json.
Reproduction: currently not executable because the compatible outcome denominator and true offer count are unresolved.
Period or window: Stage 09 outcome observation window within the frozen Cycle Review period.
Denominator or population: unavailable and must not be inferred.
Filters: only explicit observed outcome events would qualify.
Owner: human Cycle Review reviewer.
Data class: internal sanitized analytics evidence.
Freshness: frozen Stage 09 analytics evidence.
Quality or completeness: insufficient for rate calculation.
Limitations: offer is NOT_OBSERVED rather than verified zero and no compatible outcome denominator exists.
Interpretation boundary: no offer rate may be calculated from current evidence.

## Overall data quality

Status: limited.

Rationale:
- discovery, prioritization and application operational evidence is recoverable;
- their units and denominators are different and cannot form a classical conversion funnel;
- screening, interview, rejection and offer remain NOT_OBSERVED rather than verified zero;
- a compatible outcome denominator is unavailable;
- the Stage 09 analytics sample and observation window are too limited for hiring-effectiveness or market-response conclusions.

## Prohibited interpretations

- no universal target;
- no cross-stage conversion rate;
- no causal hiring conclusion;
- no productivity conclusion from commit counts;
- no replacement of missing denominators with assumptions;
- no conversion of NOT_OBSERVED into zero.

## Human approval

Approval source: stage10-evidence/10-002/HUMAN_METRICS_DICTIONARY_APPROVAL.md
Approval source SHA-256: f096426d1183ad27055129fc9e337801b4738b1deaa2916135b1b789635b9d44
Approved at: 2026-09-07T16:26:53-03:00
Baseline ID: baseline.skillcertify.10.002.metrics.v1

The reviewed dictionary is frozen as ready.
Metric values remain unpopulated by task 10.002.
Universal targets remain uninferred.
Causal claims remain absent.
