# Stage 09.006 — Vacancy Prioritization Design

## Authority

Task: `task.skillcertify.09.006`  
Workstream: `workstream.skillcertify.09.03`  
Objective: prioritize a small weekly vacancy set by fit, evidence, risk and capacity without a universal target or authoritative score.

The input authority is limited to the vacancy sources inherited from 09.004 and the requirement/evidence state verified through 09.005.

## Non-authoritative scoring rule

No numeric total, ATS percentage, universal threshold or opaque weighted score is allowed.

Prioritization must remain explainable through separate dimensions:

1. `evidence_alignment`
   - strong
   - mixed
   - weak
   - unknown

2. `gap_risk`
   - low
   - material
   - high
   - unknown

3. `source_actionability`
   - confirmed
   - unconfirmed
   - unavailable
   - unknown

4. `application_effort`
   - low
   - moderate
   - high
   - unknown

5. `priority_band`
   - P1
   - P2
   - HOLD
   - OMIT
   - PENDING

No dimension may silently override another.

## Evidence-alignment semantics

Evidence alignment is derived from requirement-level coverage and verified evidence limitations.

- `full` means exact-scope evidence materially covers the requirement.
- `partial` requires explicit qualification.
- `none` means the requirement is unsupported.
- `unknown` remains unresolved and cannot be promoted to evidence.

Full coverage is not universal mastery.

## Gap-risk semantics

Risk must explicitly preserve material gaps such as:

- unsupported duration claims;
- unsupported language-proficiency claims;
- missing exact technology;
- unverified performance evidence;
- unverified deployment availability;
- partial rendering-strategy evidence;
- authorship or scope limitations.

Similar technology cannot be treated as exact experience.

## Source-actionability semantics

A discovered or previously verified vacancy source is not automatically actionable.

`FRESH_BOUNDED` does not mean currently open.

Live source status must be revalidated before the final weekly priority decision.

## Capacity semantics

Capacity is contextual and non-authoritative.

Application effort must consider how much truthful tailoring, qualification and evidence packaging would be required. It must not create a quota or universal weekly target.

## Decision rules

A vacancy cannot become `P1` solely because it has many full-coverage requirements.

A material hard gap can outweigh broad technical alignment.

An unknown mandatory requirement remains visible.

An unavailable or stale source cannot become actionable.

Human factual/privacy review is required before task completion.

## Prohibited claims and actions

This task does not authorize:

- job application;
- outreach;
- LinkedIn mutation;
- impersonation;
- autonomous acceptance of terms or offers;
- keyword stuffing;
- fabrication of experience;
- conversion of repository age into employment duration;
- conversion of Context into Redux/Flux/Relay experience;
- conversion of deployment metadata into performance evidence;
- conversion of English code/documentation into advanced-English proof.

## Current phase

This artifact materializes the prioritization contract and frozen input set only.

Final prioritization has not yet been performed.
Vacancy fit has not yet been established.
Actionability has not yet been confirmed.
Application remains unauthorized.
