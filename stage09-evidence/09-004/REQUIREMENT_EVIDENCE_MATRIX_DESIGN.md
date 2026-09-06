# Stage09 — Requirement × Evidence Matrix Design

- Task: task.skillcertify.09.004
- Workstream: Requirement → Proof & Evidence
- Status: DESIGN_MATERIALIZED_PENDING_REQUIREMENT_EXTRACTION

## Purpose

Create a factual vacancy × requirement × evidence matrix without promoting unsupported claims.

## Coverage enum

- full: direct recoverable evidence covers the requirement materially and within scope.
- partial: evidence covers only part of the requirement; qualification is mandatory.
- none: no supporting evidence exists; unsupported claim must be omitted.
- unknown: requirement source or evidence state is insufficient/inaccessible.

## Mandatory semantics

- Requirement without source => unknown.
- Partial proof => partial + explicit qualification.
- No evidence => none.
- Inaccessible evidence => unknown + limitation.
- Similar technology alone does not justify full.
- Keyword similarity is not evidence.
- Repository presence is not automatically proof of authorship or production use.
- A role source being reachable does not establish that the vacancy is currently open.

## Evidence authority

Evidence refs must be recoverable and must identify scope and factual basis.

09.004 may create the matrix, but 09.005 remains responsible for revalidating evidence refs, authorship, scope and reproducibility before claims are reused.

## Initial requirement-source authority

Only accepted VERIFIED_PRIMARY sources inherited from 09.003 are seeded here:

- SRC-09-003-004 — BairesDev React Frontend
- SRC-09-003-005 — BairesDev React Next.js Developer

Their freshness remains FRESH_BOUNDED and does not prove current vacancy availability.

## Hard boundaries

- APPLICATION_AUTHORIZED=False
- OUTREACH_AUTHORIZED=False
- LINKEDIN_MUTATION_AUTHORIZED=False
- EXTERNAL_TOOL_ADOPTION_AUTHORIZED=False
- VACANCY_FIT_ESTABLISHED=False

## Next operation

Extract exact requirement statements from authorized primary sources, preserve source references, then map each requirement against recoverable SkillCertify evidence using full/partial/none/unknown.
