# Skill Certify Hub

Skill Certify Hub is a governed Next.js + TypeScript certification-platform project whose repository lifecycle has reached **Stage 08 — Portfolio & Evidence**.

The public application currently demonstrates a bounded frontend product slice backed by synthetic/local certification data, deterministic repository checks, governed evidence, and a deliberately limited AI proof of concept retained as engineering evidence.

This README describes only source-backed repository capabilities. A completed stage, green CI run, successful build, or human gate decision must not be interpreted as proof of production deployment, production AI, comprehensive security, or operational readiness.

## Current implemented surface

The repository currently includes:

- Next.js App Router application foundation;
- TypeScript and ESLint;
- responsive shared application shell and navigation;
- semantic design tokens and accessibility-oriented UI checks;
- deterministic synthetic certification catalog;
- local certification list/filter flow;
- governed synthetic certification detail routes;
- dashboard and governed empty-state experience;
- evidence surface with frontend-only/non-persistent boundaries;
- practices surface with canonical local statuses;
- repository-native tests and deterministic quality automation;
- Stage 07 bounded AI/semantic-retrieval POC evidence;
- Stage 08 claim-to-evidence and tooling-decision records.

Current application routes include:

```text
/
/certifications
/certifications/[id]
/evidence
/practices
```

The certification data demonstrated by the current frontend is synthetic and governed. It must not be described as live provider data, production ingestion, or a persistent certification backend.

## Lifecycle status

The repository has progressed through governed work covering product foundation, bounded frontend implementation, architecture/service readiness, quality assurance, delivery readiness, bounded AI evaluation, and current portfolio/evidence preparation.

Stage 08 is concerned with turning already-approved technical work into recoverable, factual evidence and career-facing assets while preserving provenance, visibility rules, public-safety review, and human publication authority.

Current Stage 08 evidence establishes a claim-to-evidence map and a tooling evaluation. The preferred evidence route remains manual/deterministic: Git, Markdown, repository-native checks, exact source identities, and human inspection.

No new external tooling is required to establish the current evidence/provenance job.

## Verified local environment

The current Stage 08 README validation and complete repository quality contract were executed successfully with:

- Node.js `v22.22.2`;
- npm `11.13.0`.

These versions record the environment actually verified for this README revision. They are not a claim that other compatible Node.js/npm versions cannot run the repository.
## Install

From the repository root:

```bash
npm ci
```

`npm ci` is preferred because the repository commits `package-lock.json` and uses the lockfile as the reproducible dependency baseline.

## Development

Start the local development server:

```bash
npm run dev
```

Use the address printed by the Next.js development process as the runtime source of truth.

## Quality

Run the complete repository quality contract:

```bash
npm run quality
```

The current aggregate command executes:

```text
guard:config-secrets
→ lint
→ typecheck
→ test
→ eval:stage07
→ build
```

Individual commands are available:

```bash
npm run guard:config-secrets
npm run lint
npm run typecheck
npm run test
npm run eval:stage07
npm run build
```

The repository-native test suite and Stage 07 deterministic evaluation are reproducibility and contract evidence. They do not establish comprehensive browser E2E coverage, comprehensive security assurance, semantic perfection, AI business value, or production readiness.

## Production build

Create an optimized build:

```bash
npm run build
```

Start a previously built application:

```bash
npm run start
```

A successful production build demonstrates that the governed repository state compiles. It does not demonstrate that the application has been deployed to production or that production operational controls exist.

## Architecture and domain boundaries

For repository architecture and dependency boundaries, see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

For the approved domain vocabulary, see [`DOMAIN_MODEL.md`](./DOMAIN_MODEL.md).

The current frontend implementation must not be used to infer database tables, persistent APIs, authentication, durable user progress, billing, or other backend capabilities that are not directly established by repository evidence.

## AI evidence boundary

Stage 07 produced a bounded semantic-retrieval/AI POC retained as engineering evidence.

The recorded semantic observation contains two expected top-1 matches and one miss across the bounded observed cases. Material semantic-quality and adoption thresholds remain not established.

The Stage 07 work does **not** establish:

- AI as a required product capability;
- broader AI adoption approval;
- production AI authorization;
- perfect semantic retrieval;
- actual billed provider cost;
- a production AI budget;
- production latency SLO compliance;
- production residual-risk acceptance.

The deterministic `eval:stage07` command reproduces the repository evaluation contract without making an external provider call.

## Evidence and governance

Repository work follows a governed evidence chain: real source → task/action → check → evidence/reference → bounded claim → assessment/package → human decision.

Important repository records include:

- `STAGE08_EVIDENCE_PACK.md` — Stage 08 claim-to-evidence map;
- `STAGE08_TOOLING_POC_EVALUATION.md` — Stage 08 tooling disposition;
- stage-specific assessments, package manifests, and human gate decisions preserved in the repository.

These records provide traceability. Their existence does not automatically authorize publication, production use, external tool adoption, or expansion of a bounded claim.

## Known limitations and non-claims

The current repository does not establish:

- production deployment or production operational readiness;
- live deployment/promotion/release execution;
- production health monitoring or rollback execution;
- comprehensive browser E2E coverage;
- comprehensive security assurance;
- a production backend/API where historical evidence keeps that runtime boundary absent;
- persistent authentication/accounts;
- persistent user progress;
- production AI or broader AI adoption;
- public portfolio publication approval;
- demonstrated business ROI.

Historical or current gate PASS records do not erase these limitations.

## Repository governance

Implementation and evidence work use short-lived governed branches and human-reviewed pull requests.

Material decisions concerning publication, visibility, external tool adoption, residual risk, and Stage 08 G-P8 authority remain human decisions.

Stage 08 work must not automatically trigger public publication or Job Search.

See [`REPOSITORY_POLICY.md`](./REPOSITORY_POLICY.md) for repository-level governance rules.

## Current status

Skill Certify Hub is an actively governed project with a reproducible frontend implementation, accumulated engineering evidence, and current Stage 08 portfolio/evidence preparation.

The repository should be evaluated by the capabilities and evidence it directly demonstrates, not by inferred production maturity or future roadmap intent.
