# Skill Certify Hub

Skill Certify Hub is currently in **Stage 02 — Product Foundation**. The repository contains a verified Next.js + TypeScript foundation, a responsive application shell, a minimal semantic design-token baseline, a modular architecture contract, and an approved conceptual certification-domain model.

This README describes only what is implemented and verified today. It intentionally does not present deferred product capabilities as available features.

## Current foundation

Implemented and verified in the repository:

- Next.js App Router application foundation
- TypeScript
- ESLint
- npm lockfile and reproducible clean install
- responsive application shell
- semantic landmarks and keyboard-focus baseline
- minimal CSS-native semantic design tokens
- deterministic quality command covering lint, typecheck, tests, and production build
- modular architecture contract
- conceptual domain vocabulary for certifications

For architecture boundaries and dependency rules, see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

For the approved conceptual domain model, see [`DOMAIN_MODEL.md`](./DOMAIN_MODEL.md).

## Prerequisites

Use a supported Node.js/npm environment capable of installing the versions locked by this repository.

The foundation has been validated with:

- Node.js `v22.22.2`
- npm `11.13.0`

These values record the verified environment used during Stage 02; they are not a claim that other compatible Node/npm versions cannot work.

## Install

From the repository root:

```bash
npm ci
```

`npm ci` is the preferred installation command because this repository commits `package-lock.json` and uses the lockfile as the reproducible dependency baseline.

## Development

Start the local development server:

```bash
npm run dev
```

Next.js normally exposes the application at:

```text
http://localhost:3000
```

Use the address printed by the local Next.js process as the runtime source of truth.

## Quality baseline

Run the complete quality chain:

```bash
npm run quality
```

The aggregate command executes, in order:

```text
lint → typecheck → test → build
```

Individual commands are also available:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

The current foundation tests use Node's built-in test runner and verify the approved foundation scripts/baseline. They are intentionally minimal at this stage and must not be interpreted as full product test coverage.

## Production build

Create an optimized Next.js production build:

```bash
npm run build
```

Start a previously built application with:

```bash
npm run start
```

A successful build proves the current foundation compiles; it does not by itself represent a production deployment or operational-readiness claim.

## Repository structure

Current high-level structure:

```text
skill-certify-hub/
├── app/                 # Next.js routes, composition, shell and current CSS
├── public/              # public/static assets
├── tests/               # repository-level foundation checks
├── ARCHITECTURE.md      # modular architecture and dependency contract
├── DOMAIN_MODEL.md      # approved conceptual certification-domain vocabulary
├── package.json         # scripts and dependencies
├── package-lock.json    # reproducible dependency lock
└── README.md            # operational entry point
```

`modules/` and `shared/` are intentionally absent while no concrete implemented capability justifies those physical boundaries. See `ARCHITECTURE.md` for the lazy modularization policy.

## Conceptual domain baseline

The currently approved conceptual vocabulary is limited to:

- `Certification`
- `Issuer`
- `CertificationPath`
- `UserProgress`

These concepts are documented in `DOMAIN_MODEL.md`. They are semantic definitions only and do not imply database tables, API resources, folders, services, or implemented user-facing features.

## Intentionally deferred

The following are **not implemented foundation capabilities** at this point:

- certification catalog/data ingestion
- persistent user accounts or authentication
- persistent progress tracking
- database/ORM/migrations
- backend/API architecture
- recommendation engine
- AI product capabilities
- billing/subscriptions
- portfolio/evidence features
- production deployment/hosting contract
- full design system/component library
- Stage 03 product-feature implementation

Deferred items require their own governed task, evidence, and human review before they may be described as implemented.

## Governance

Repository work follows the approved repository policy and governed execution model:

- AI/Codex do not write directly to `main`
- AI/Codex do not perform merges
- implementation work occurs on short-lived governed branches
- material architecture/domain/design decisions require human authority where specified
- pull requests require human review before merge
- evidence must distinguish executed facts from assumptions or future intent

See [`REPOSITORY_POLICY.md`](./REPOSITORY_POLICY.md) for the repository-level policy already established for this project.

## Foundation status

The current repository represents a **product foundation**, not a complete certification platform.

Its purpose at this stage is to provide a reproducible, understandable, testable and governable base from which later product capabilities can be implemented without rewriting the foundation contract.
