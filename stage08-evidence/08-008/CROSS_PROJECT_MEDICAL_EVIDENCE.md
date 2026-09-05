# Stage 08.008 — Cross-Project Evidence: Medical Appointment System

## Scope

Read-only cross-project evidence ingestion for professional role reconciliation.

Repositories inspected:

- `misaelalves99/medical-appointment-system-next`
- `misaelalves99/medical-appointment-system-asp.net`

Other Medical Appointment variants exist in the GitHub account but are not treated as evidence in this checkpoint.

## Frontend evidence

The Next.js repository establishes:

- Next.js application;
- React application;
- TypeScript toolchain;
- lint workflow;
- Jest test workflow;
- build workflow.

The repository explicitly distinguishes local build / CI success from production publication.

## Backend evidence

The ASP.NET repository establishes application-layer backend implementation with:

- ASP.NET Core MVC structure;
- Controllers;
- Services;
- Models;
- Data/ApplicationDbContext;
- Entity Framework migrations;
- patient service;
- doctor service;
- specialty service;
- appointment service;
- CRUD-oriented application behavior.

## Important limitation

The backend README describes the project as a study/prototyping system without a real database and with in-memory seed data.

Therefore:

- DbContext/migrations MUST NOT be translated into a claim of demonstrated real database persistence;
- the project MUST NOT be described as production-ready;
- deployment to production is NOT_ESTABLISHED;
- REST API integration is NOT_YET_ESTABLISHED;
- frontend-to-backend integration is NOT_YET_ESTABLISHED.

## Capability classification

| Capability | State | Evidence interpretation |
|---|---|---|
| Frontend implementation | SUPPORTED | Next.js repository |
| Next.js | SUPPORTED | package dependency / application repository |
| React | SUPPORTED | package dependency / application repository |
| TypeScript | SUPPORTED | TypeScript development toolchain |
| ASP.NET Core backend | SUPPORTED | backend repository structure and application code |
| Backend services | SUPPORTED | multiple service implementations |
| DbContext / migrations | SUPPORTED_AS_CODE_STRUCTURE | code exists, but does not prove real persisted production database |
| Real database persistence | NOT_ESTABLISHED | backend README explicitly limits database posture |
| REST API | NOT_YET_ESTABLISHED | requires endpoint/API evidence |
| Frontend-backend integration | NOT_YET_ESTABLISHED | requires integration evidence |
| Production deployment | NOT_ESTABLISHED | no production evidence accepted |
| Fullstack end-to-end application | NOT_YET_ESTABLISHED | integration boundary still unresolved |

## Role implication

This project materially strengthens evidence that the subject has implemented both frontend and backend application code.

It does NOT yet justify upgrading the public role claim to `Fullstack Developer` because the end-to-end integration and persistence boundaries remain unresolved.

A bounded phrase such as `Fullstack Development` remains a candidate pending additional cross-project evidence.

## Governance

- Repository existence is not sufficient proof of a capability.
- Framework dependency is not sufficient proof of professional production experience.
- Backend code is not equivalent to production backend operation.
- DbContext/migrations are not equivalent to demonstrated real database persistence.
- Separate frontend and backend repositories are not automatically an integrated Fullstack system.
- LinkedIn external mutation remains NOT_PERFORMED.
- Publication remains NOT_AUTHORIZED.
- G-P8 remains NOT_PERFORMED.
- Job Search remains NOT_AUTHORIZED.
