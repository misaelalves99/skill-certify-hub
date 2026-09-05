# Stage 08.008 — Cross-Project Evidence: E-commerce Store

## Scope

Read-only cross-project evidence ingestion for professional role reconciliation.

Repositories inspected:

- `misaelalves99/ecommerce-store-next`
- `misaelalves99/ecommerce-store-asp.net`

## Frontend evidence

The Next.js repository establishes:

- Next.js application;
- React application;
- TypeScript development toolchain;
- Jest test workflow;
- build workflow.

## Backend evidence

The ASP.NET repository establishes code structure containing:

- Controllers;
- Services;
- Models;
- Data layer;
- migrations;
- ASP.NET Core MVC application structure;
- EF Core packages;
- Pomelo MySQL provider.

## Runtime limitation

The current Startup configuration explicitly does not register the DbContext.

The application currently uses mocked services without database access and disables database migrations / seed execution.

Therefore:

- database persistence MUST NOT be claimed as demonstrated runtime behavior;
- MySQL dependency/configuration is architecture/configuration evidence only;
- REST API integration is NOT_ESTABLISHED;
- frontend-to-backend integration is NOT_ESTABLISHED;
- production deployment is NOT_ESTABLISHED;
- end-to-end Fullstack operation is NOT_ESTABLISHED.

## Security finding

A public application configuration file currently contains a hardcoded database connection credential.

The secret value is intentionally NOT copied into this evidence package.

Classification:

- finding_id: SEC-08-008-ECOM-001
- state: OPEN
- severity: HIGH
- class: PUBLIC_REPOSITORY_CREDENTIAL_EXPOSURE
- required action: remove credential from tracked configuration;
- required action: rotate credential if it can still authenticate anywhere;
- required action: replace tracked value with environment-variable or local-secret configuration;
- public evidence suitability: RESTRICTED_UNTIL_REMEDIATED.

## Capability classification

| Capability | State | Evidence interpretation |
|---|---|---|
| Frontend implementation | SUPPORTED | Next.js repository |
| Next.js | SUPPORTED | application dependency |
| React | SUPPORTED | application dependency |
| TypeScript | SUPPORTED | development toolchain |
| ASP.NET Core backend | SUPPORTED | backend application structure |
| Controllers / services | SUPPORTED_AS_CODE_STRUCTURE | code exists |
| EF Core | SUPPORTED_AS_CODE_STRUCTURE | packages and project structure present |
| MySQL | CONFIGURED_NOT_ACTIVE | provider/configuration exists, runtime database use disabled |
| Real database persistence | NOT_ESTABLISHED | DbContext runtime registration disabled |
| REST API | NOT_ESTABLISHED | no accepted endpoint integration evidence |
| Frontend-backend integration | NOT_ESTABLISHED | no accepted integration evidence |
| Production deployment | NOT_ESTABLISHED | no production evidence accepted |
| Fullstack end-to-end application | NOT_ESTABLISHED | runtime/integration boundaries unresolved |

## Role implication

The project strengthens evidence that the subject has worked with both frontend and backend codebases across Next.js/React/TypeScript and ASP.NET Core.

It does not currently justify an end-to-end Fullstack application claim.

The backend should not be promoted as public evidence until SEC-08-008-ECOM-001 is remediated.

## Governance

- Public credential values must never be copied into Stage 08 artifacts.
- Package/configuration presence is not runtime proof.
- Database provider presence is not persistence proof.
- Separate frontend and backend repositories are not automatically an integrated Fullstack system.
- LinkedIn external mutation remains NOT_PERFORMED.
- Publication remains NOT_AUTHORIZED.
- G-P8 remains NOT_PERFORMED.
- Job Search remains NOT_AUTHORIZED.

## SEC-08-008-ECOM-001 — POST-REMEDIATION PUBLIC CHECKPOINT

Status: CURRENT_PUBLIC_TREE_REMEDIATED

Verified public repository:
- repository: `misaelalves99/ecommerce-store-asp.net`
- base commit before remediation: `7eb171c1f53f6ce5f171e224558df06da9af0e2a`
- remediation commit: `1a4cbf0ad3d7bcd64ecc6cbbef1028f61f488613`
- merged PR: `#1`
- public main merge commit: `13f2fb4257afb0cbd231340047414b0aa5461cef`
- public main tree: `411dc2609b9b2e83035604e53b96f3acdc6fd4df`

Post-merge verification:
- local `main` synchronized exactly with `origin/main`
- current tracked `Password=` matches: `0`
- current tracked `bin/` / `obj/` paths: `0`
- `bin/` and `obj/` are ignored going forward
- source `appsettings.json` no longer carries the exposed hardcoded database credential

Evidence interpretation:
- the exposed credential was removed from the current public repository tree;
- the generated tracked copy carrying the same credential was removed from the Git index;
- generated .NET outputs are no longer tracked in the current tree;
- this removes the previous CURRENT_TREE publication blocker associated with `SEC-08-008-ECOM-001`.

Explicit boundaries:
- historical Git objects were NOT rewritten or purged;
- credential rotation was NOT performed by this remediation;
- if the exposed credential remains valid or was reused, rotation remains required;
- this remediation does NOT establish production readiness;
- this remediation does NOT establish active production database persistence;
- this remediation does NOT establish frontend-backend integration;
- this remediation does NOT establish end-to-end fullstack operation;
- the separately preserved local authentication/database work is not part of the public `main` evidence.

Portfolio consequence:
- repository security state may now be evaluated against the remediated current public tree;
- factual technology claims must still remain bounded by independently verified implementation evidence;
- `Fullstack Developer` remains NOT_ESTABLISHED from this remediation alone.
