# Alpha Evidence — Stage 03 Frontend Engineering

Governed task: `task.skillcertify.03.012`

Purpose: consolidate a versioned record of what Stage 03 actually implemented, executed, validated, reviewed, and decided before the later Stage 03 assessment and gate tasks.

This document is evidence consolidation only. It is not a readiness score, assessment decision, gate package, digest, or authorization for Stage 04.

## 1. Current stage boundary

Stage 03 remains a frontend-only product slice with synthetic/mock data where governed. The merged implementation does not claim production backend, persistence, authentication, live certification data, recommendation, billing, upload, analytics, saved progress, or production AI capability.

Current implemented frontend surfaces include:

- Dashboard: `/`
- Certifications catalog: `/certifications`
- Certification detail: `/certifications/[id]`
- Practices: `/practices`
- Evidence: `/evidence`

Three governed synthetic certification detail routes are statically generated:

- `/certifications/cert-frontend-foundations`
- `/certifications/cert-web-platform`
- `/certifications/cert-typescript-practice`

## 2. Traceability map — tasks 03.001–03.011

| Task | Issue | PR | Merged outcome / evidence role |
| --- | ---: | ---: | --- |
| `task.skillcertify.03.001` | #23 | #24 | Experience/state model frozen in `EXPERIENCE_MODEL.md`; quality 2/2 PASS; build PASS; human-approved scope. |
| `task.skillcertify.03.002` | #25 | #26 | Dashboard and honest empty state implemented; quality 4/4 PASS; runtime `GET /` 200; desktop/mobile human visual review. |
| `task.skillcertify.03.003` | #27 | #28 | Synthetic certifications list/filter implemented with populated and filtered-empty states; quality 6/6 PASS; desktop/mobile runtime/visual review. |
| `task.skillcertify.03.004` | #29 | #30 | Certification detail and not-found behavior implemented; quality 8/8 PASS; known detail 200 and unknown detail 404 runtime evidence; visual review. |
| `task.skillcertify.03.005` | #31 | #32 | Practices by Now / Next / Quarantine implemented; quality 11/11 PASS; keyboard tab behavior manually verified; responsive visual review. |
| `task.skillcertify.03.006` | #33 | #34 | Local/session-only Evidence UI implemented; quality 14/14 PASS; axe 0 violations after evidence-specific contrast corrections; manual keyboard workflow and visual review; `ACCESSIBILITY_CHECKLIST.md` added. |
| `task.skillcertify.03.007` | #35 | #36 | Repeated application-shell responsibility consolidated into `AppShell`; quality 16/16 PASS; visual, keyboard, focus and responsive review; speculative extractions explicitly rejected. |
| `task.skillcertify.03.008` | #37 | #38 | Responsive audit found and corrected R-01 intermediate-width certifications-filter overflow; quality 17/17 PASS; human visual recheck found no new material responsive findings. |
| `task.skillcertify.03.009` | #39 | #40 | Accessibility audit and evidence-backed contrast corrections; quality 19/19 PASS; manual keyboard/focus PASS; final representative axe sweep reported 0 violations on five reviewed routes. |
| `task.skillcertify.03.010` | #41 | #42 | Deterministic critical-journey contract automation added; `npm run test:journey` 3/3 PASS; full quality 22/22 PASS. |
| `task.skillcertify.03.011` | #43 | #44 | Bounded AI-assisted review POC documented in `AI_POC_EVALUATION.md`; product/runtime AI deferred; autonomous authority rejected; optional AI review aid retained only with independent verification. |

All listed PRs were merged by the human owner. AI/Codex did not merge them.

## 3. Current deterministic baseline

The repository-level deterministic quality gate is:

```text
npm run quality
  -> npm run lint
  -> npm run typecheck
  -> npm run test
  -> npm run build
```

Latest baseline immediately before this alpha-evidence artifact:

- `npm ci` — PASS
- npm audit during install — 0 vulnerabilities
- lint — PASS
- typecheck — PASS
- tests — 22/22 PASS
- build — PASS
- static generation — 10/10 pages generated
- working tree — clean

The current test suite includes source/contract protections for foundation assumptions, dashboard, certifications, certification detail, practices, evidence, shared shell, responsive regression, accessibility contrast regression, and the critical journey.

## 4. Critical-journey evidence

`task.skillcertify.03.010` added a dedicated deterministic journey command:

```text
npm run test:journey
```

Observed result before merge:

- tests — 3/3 PASS

Covered journey contract:

```text
Dashboard
→ Certifications
→ deterministic local filter
→ governed synthetic certification detail
→ return to catalog
```

This is a deterministic Node-based contract test, not a browser E2E suite. Playwright/Cypress were deliberately not introduced because the governed task did not demonstrate enough need for the additional runner/browser infrastructure.

## 5. Responsive evidence

The Stage 03 responsive review included representative desktop, intermediate-width, and narrow/mobile checks across the implemented surfaces.

Confirmed material finding:

### R-01 — Certifications filter overflow at intermediate width

Observed during `task.skillcertify.03.008`:

- the two-column filter panel could exceed available shell content width before the mobile layout activated;
- the correction reused the existing `920px` breakpoint and reflowed the filter panel to one column;
- wide desktop and existing mobile behavior were preserved;
- a deterministic regression test was added.

Final evidence recorded in PR #38:

- quality — 17/17 PASS
- build — PASS
- human visual verification of R-01 — PASS
- second responsive sweep — no new material findings reported on the reviewed core surfaces

This does not claim exhaustive device/browser certification.

## 6. Accessibility evidence

Accessibility evidence combines automated and manual/human review. Axe output is not treated as full accessibility conformance.

### Manual/human evidence

Recorded during `task.skillcertify.03.009`:

- keyboard-only review — PASS
- visible focus — PASS
- skip-link/main-content flow — PASS
- Practices keyboard semantics — PASS
- Evidence keyboard workflow — PASS

No screen-reader certification was performed or claimed.

### Automated axe evidence

The final `03.009` representative sweep reported `0 violations found` on:

- `/`
- `/certifications`
- `/certifications/cert-frontend-foundations`
- `/practices`
- `/evidence`

Before the final PASS, axe exposed evidence-backed color-contrast findings on shared AppShell navigation helper text and small auxiliary text on Dashboard, Certifications, and Practices. Those selectors were corrected to use the stronger approved secondary text token, with regression tests added.

Important limitation: the versioned `npm run a11y:axe` command currently reproduces only the `/evidence` route. The five-route final sweep was executed manually through individual axe CLI commands. This is an evidence-repeatability gap recorded by `task.skillcertify.03.011`; it is not an accessibility-failure claim and is not silently fixed in this alpha-evidence task.

## 7. Evidence UI boundary

The `/evidence` surface is intentionally local/session-only.

Supported behavior:

- accessible URL field;
- add local evidence interaction;
- generated local evidence link;
- clear-local-evidence interaction;
- explicit local/session-only boundary language.

Explicit non-claims:

- no upload;
- no remote storage;
- no API/database persistence;
- no account association/authentication;
- no production evidence ingestion.

`ACCESSIBILITY_CHECKLIST.md` remains a historical versioned evidence artifact from `03.006`. Three items were intentionally left unchecked there for final human confirmation at that task's review boundary. This alpha consolidation does not retroactively mark those historical checkboxes complete without explicit item-level evidence.

## 8. Component/reuse decision evidence

`task.skillcertify.03.007` accepted only the repeated application shell as a shared abstraction:

- `app/_components/AppShell.tsx`
- `app/_components/AppShell.module.css`

The extraction owns shared shell responsibilities such as navigation, active-route semantics, skip-link/main focus target, responsive shell behavior, and focus styles.

Cards, result headers, panels, preview badges, boundary notes, and page-specific interactions intentionally remained local because a broader shared API would have been speculative.

No design-system package or speculative universal component was introduced.

## 9. AI POC decision evidence

`AI_POC_EVALUATION.md` records the bounded `03.011` experiment.

Confirmed useful review finding:

- Stage 03 axe evidence covered five routes during the final manual sweep, while the versioned `a11y:axe` script reproduces only `/evidence`.

Rejected candidate:

- three unchecked `ACCESSIBILITY_CHECKLIST.md` items were not promoted to defects because available source evidence did not support claiming they had all been individually completed later.

Decision merged through PR #44:

- product/runtime AI — `defer`
- autonomous gate/release/merge authority — `reject`
- AI-assisted review — optional review aid only, with independent source/human verification

Generated AI output is therefore not authoritative evidence by itself.

## 10. Human-review evidence

Human review remained authoritative throughout Stage 03.

Material human evidence includes:

- approval of the experience/state model before frontend implementation;
- visual review of dashboard, catalog, certification detail/not-found, practices, evidence, shared shell, and responsive corrections;
- keyboard/focus review where required;
- explicit visual verification of R-01 after correction;
- manual verification used alongside axe automation;
- human merge of each governed Stage 03 PR listed in this document.

No AI/Codex merge is claimed.

## 11. Known limitations and non-claims

This alpha record deliberately does not claim:

- full WCAG conformance;
- screen-reader certification;
- exhaustive browser/device matrix coverage;
- browser-runner E2E automation;
- production backend/API/database/authentication;
- persisted user progress;
- live or official certification catalog data;
- production AI runtime or agent system;
- autonomous release/gate authority;
- Stage 03 readiness score or gate PASS.

Known evidence limitation carried forward:

- the final five-route axe sweep is documented in merged PR evidence, but the repository's `a11y:axe` script currently automates only `/evidence`.

## 12. Alpha evidence conclusion

The merged Stage 03 implementation currently demonstrates a frontend-only synthetic product slice with:

- an explicit experience/state model;
- navigable dashboard and certification catalog;
- deterministic local filtering;
- certification detail and not-found behavior;
- keyboard-operable practices status UI;
- local/session-only evidence interaction;
- consolidated application shell;
- responsive and accessibility corrections backed by findings;
- representative manual accessibility review;
- deterministic critical-journey contract automation;
- a bounded AI POC with conservative governance decision.

The current repository quality baseline is green at 22/22 tests with lint, typecheck, and production build passing.

This document is now suitable as an input artifact for the later governed Stage 03 assessment task. It does not itself perform that assessment or authorize any subsequent stage.