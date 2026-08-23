# Experience & State Model

## Governance

- Task: `task.skillcertify.03.001`
- Stage: Stage 03 — Frontend Engineering
- Status: candidate for human review
- Authority: this document maps approved frontend experience scope; it does not declare implementation complete.
- Source constraints: approved Stage 02 foundation, `DOMAIN_MODEL.md`, `ARCHITECTURE.md`, and the G-P2 handoff.

## Objective

Freeze a small, verifiable frontend experience map before new product UI is implemented. The map distinguishes executable Stage 03 surfaces from deferred domain dependencies and prevents mocks/placeholders from being mistaken for backend capability or product requirements.

## Executable surface scope

### 1. Home

**Purpose**
Provide the application entry point and orient the user toward the certification catalog experience.

**Current relationship**
Evolves the existing responsive foundation shell rather than introducing a separate product subsystem.

**Allowed states**
- default/ready
- navigation available

**Data boundary**
- no real certification data required for the shell itself
- no authentication state
- no personalized recommendations

**Primary transition**
- Home → Certifications list

### 2. Certifications list

**Purpose**
Represent a browsable certification catalog experience using authorized synthetic/mock data until a real data source is governed.

**Required states**
- loading
- empty
- populated
- error

**Data boundary**
- synthetic/mock certification data only in this Stage 03 slice
- mock data must be visibly treated in code/documentation as mock/synthetic
- no claim of authoritative certification ingestion

**Primary transitions**
- Home → Certifications list
- Certifications list → Certification detail
- error → retry/list recovery when implemented

**Backend dependency**
Deferred. No API, database, ingestion pipeline, or persistence contract is implied by this surface.

### 3. Certification detail

**Purpose**
Represent the approved `Certification` concept and its relationship to an `Issuer` at a user-facing detail level.

**Required states**
- loading
- success
- not found
- error

**Data boundary**
- synthetic/mock data only until a governed real source exists
- do not invent exam pricing, prerequisites, renewal rules, validity periods, official URLs, or issuer claims unless the specific data is authorized and sourced

**Primary transitions**
- Certifications list → Certification detail
- Certification detail → Certifications list/back navigation

**Backend dependency**
Deferred. Detail retrieval may be simulated locally for frontend engineering, but a local mock is not a real API.

## Deferred domain dependencies

### CertificationPath

`CertificationPath` remains an approved conceptual domain concept but is **not an executable central surface in this slice**.

Allowed Stage 03 treatment:
- referenced as a future experience dependency;
- represented in mock/domain fixtures only when necessary to test an already-approved UI boundary;
- no recommendation engine or prescriptive learning path may be inferred.

### UserProgress

`UserProgress` remains an approved conceptual domain concept but is **not a persistent product capability in this slice**.

Allowed Stage 03 treatment:
- future/deferred state dependency;
- local/mock-only representation if a later governed frontend task explicitly needs it;
- must never be presented as saved, synchronized, authenticated, or durable without a separately approved persistence/backend task.

## State model

| Surface | Loading | Empty | Success/Ready | Not found | Error | Persistence required |
| --- | --- | --- | --- | --- | --- | --- |
| Home | No | No | Yes | No | No | No |
| Certifications list | Yes | Yes | Yes | No | Yes | No |
| Certification detail | Yes | No | Yes | Yes | Yes | No |
| CertificationPath | Deferred | Deferred | Deferred | Deferred | Deferred | Deferred |
| UserProgress | Deferred | Deferred | Deferred | Deferred | Deferred | Deferred |

The required states above define what frontend engineering must be able to represent honestly. They do not require every state to be implemented in the same task.

## Mock and synthetic-data contract

Mocks are permitted only to make frontend states deterministic and reviewable.

Rules:
- use clearly synthetic or explicitly authorized data;
- keep mock ownership local and replaceable;
- do not encode a speculative backend schema as if it were approved;
- do not present mock content as live or official data;
- do not use secrets, personal data, or copied private datasets;
- a mock success response does not prove API/backend readiness.

## Experience boundaries and non-goals

This model does **not** authorize:
- authentication or user accounts;
- database, ORM, migrations, or persistence;
- real certification ingestion;
- backend/API architecture;
- recommendation engine;
- persistent progress tracking;
- billing/subscriptions;
- portfolio/evidence features;
- AI product features;
- production deployment claims;
- expansion into a comprehensive design system.

Any such capability requires its own governed task and evidence.

## Component boundary guidance

Stage 03 implementation should prefer the smallest useful component boundaries around visible experience responsibility, for example:
- application/navigation shell;
- certification collection/list presentation;
- certification item/card presentation;
- certification detail presentation;
- state feedback for loading/empty/error/not-found where reuse is demonstrated.

These are boundary candidates, not mandatory folder names or a command to create abstractions before reuse exists. `ARCHITECTURE.md` remains authoritative for lazy modularization.

## Review checklist

The map is acceptable only if human review confirms that:
- Home, Certifications list, and Certification detail are the central executable surfaces for the initial Stage 03 slice;
- loading/empty/error/not-found states are not silently omitted where relevant;
- all current catalog/detail data is explicitly mock/synthetic until a real source is governed;
- `CertificationPath` and `UserProgress` remain deferred dependencies rather than implied implemented features;
- no authentication, persistence, backend, recommendation, or official-data claim has been invented;
- the scope remains coherent with the Stage 02 foundation and approved domain vocabulary.

## Freeze rule

After human approval, material changes to central surfaces, state semantics, mock boundaries, or deferred/non-goal classification require a governed follow-up decision rather than silent expansion during implementation.
