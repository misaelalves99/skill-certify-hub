# Stage09 — Authorized Search & Alert Evidence Design

- Task: task.skillcertify.09.003
- Stable stage: stage.skillcertify.09
- Workstream: workstream.skillcertify.09.01
- Status: DESIGN_MATERIALIZED_PENDING_EXECUTION_AND_HUMAN_REVIEW
- Data class: publico

## Objective

Capturar buscas/alertas e vacancy sources com snapshot/freshness, sem aplicar ou criar pipeline fictício.

## Current boundary

This artifact defines the evidence model only.

- No live vacancy search has been performed.
- No alert has been created.
- No authenticated account has been accessed.
- No job application has been submitted.
- No outreach has been performed.
- No LinkedIn profile mutation has been performed.
- No external tool has been adopted.

## Source authorization model

A source may enter execution only when all of the following are true:

1. The source is publicly inspectable or explicitly authorized.
2. The source identity and ownership can be established.
3. Vacancy freshness can be observed or conservatively classified.
4. Inspection does not require disclosure of personal, confidential or secret data.
5. Search activity does not itself submit an application or contact a third party.

## Candidate source classes

| Source class | Candidate role | Current state |
| --- | --- | --- |
| Official employer careers page | Primary source | CANDIDATE_NOT_YET_VERIFIED |
| Employer-operated ATS page | Primary/near-primary source | CANDIDATE_NOT_YET_VERIFIED |
| Public job-board vacancy page | Discovery source | CANDIDATE_NOT_YET_VERIFIED |
| LinkedIn Jobs | Legacy discovery hint only | NOT_SELECTED_NOT_ADOPTED |

No candidate source is considered verified merely because it appears in this design.

## Query strategy

Primary positioning remains Frontend / Fullstack Developer, with Frontend as primary strength and Fullstack as expansion.

Search design uses bounded variants rather than unrestricted volume:

- Frontend Developer
- Front-end Developer
- React Developer
- Next.js Developer
- JavaScript Developer
- TypeScript Developer
- Fullstack Developer with frontend emphasis

Query execution must record the exact query string and filters actually used.

## Filter model

Allowed filters include role/title, location/remote model, seniority when explicitly represented by the source, technology keywords, publication date/freshness, and source type.

A missing filter must be recorded as NOT_APPLIED rather than inferred.

## Freshness model

- FRESH_CONFIRMED: source exposes a current date/status with no contrary signal.
- FRESH_BOUNDED: source is current enough for inspection but exact publication age is incomplete.
- STALE: source indicates the vacancy is expired, closed or materially outdated.
- UNKNOWN: freshness cannot be established.

UNKNOWN is not equivalent to current.

## Vacancy status rule

Discovered vacancy != valid/current vacancy.

A vacancy may be classified as actionable evidence only after source, freshness and factual state are inspected.

## Privacy model

Permitted evidence is limited to public vacancy/source metadata required for factual evaluation.

Do not capture:

- candidate personal identifiers not required by the task;
- recruiter personal contact details for bulk outreach;
- private account data;
- authentication tokens;
- secrets;
- hidden applicant data;
- information obtained through unauthorized access.

## Evidence unit

Each executed search/source inspection must produce, at minimum:

- source_id
- source_class
- source_reference
- inspected_at
- exact_query
- filters
- vacancy_reference when applicable
- freshness_class
- freshness_basis
- factual_status
- privacy_review
- source_verification
- limitations

## Hard stops

Stop execution if the source is stale/suspicious/unverified, tool/data authority is absent, PII or secret exposure would occur, or automation authority becomes ambiguous.

## Human review gate

No execution result becomes accepted task evidence until human factual/privacy review is recorded.

## Non-claims

- Search effectiveness is NOT_ESTABLISHED.
- Vacancy availability is NOT_ESTABLISHED.
- Market demand is NOT_ESTABLISHED.
- Application fit is NOT_ESTABLISHED.
- Response probability is NOT_ESTABLISHED.
- Interview probability is NOT_ESTABLISHED.
- Offer probability is NOT_ESTABLISHED.

This design does not authorize applying to any vacancy.
