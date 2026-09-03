# Stage 08 — Task 08.005 Capture Workflow

## Governance state

- Task: `task.skillcertify.08.005`
- Capture method: `MANUAL_CONTROLLED`
- Playwright adopted: `false`
- Visibility: `internal`
- Public-safety final review: `NOT_PERFORMED`
- Publication authorized: `false`
- G-P8 performed: `false`
- Job Search authorized: `false`

## Frozen source

- Commit: `d1c9d636c52865d5658bdc809327a58b52fd4031`
- Tree: `30ab912e4b7b96341e7902922a2240764dbb9526`

All captured assets must correspond to this frozen application source.

## Required capture set

| Evidence ID | Route | Output |
| --- | --- | --- |
| `VE-08-005-01` | `/` | `assets/VE-08-005-01-home.png` |
| `VE-08-005-02` | `/certifications` | `assets/VE-08-005-02-certifications.png` |
| `VE-08-005-03` | `/certifications/cert-frontend-foundations` | `assets/VE-08-005-03-certification-detail.png` |
| `VE-08-005-04` | `/evidence` | `assets/VE-08-005-04-evidence.png` |

Reserve route: `/practices`.

## Capture procedure

1. Confirm the task branch and frozen source commit.
2. Start the application using `npm run dev`.
3. Record browser name/version and viewport before capture.
4. Open each required route directly.
5. Confirm that the rendered route corresponds to the expected application surface.
6. Capture only the browser content required to evidence that surface.
7. Do not fabricate data, interaction state, capability, production status, or deployment state.
8. Save each PNG using the exact filename declared in `manifest.json`.
9. Record SHA-256 for every captured file after capture.
10. Perform human visual inspection before approval or merge.

## Visual inspection boundary

Capture completion does not mean public safety approval.

The human review for this task checks factual correspondence between asset and frozen source. Final public-safety disposition remains downstream and is not performed by task 08.005.

## Non-claims

- Screenshots are not proof of production deployment.
- Screenshots are not proof of comprehensive browser E2E coverage.
- Screenshots are not proof of comprehensive security review.
- Visual polish is not proof of capability beyond source-backed evidence.
- No asset is public-safe merely because it was successfully captured.
- No publication is authorized by this workflow.

## Human visual review

- Status: APPROVED
- Decision: VISUAL_EVIDENCE_INTERNAL_SOURCE_LINKED
- Authority: HUMAN
- Scope: INTERNAL_VISUAL_EVIDENCE_ONLY
- Source: issue-163-comment-5528934014
- Four governed PNG assets visually inspected.
- Visual evidence accepted as source-linked internal evidence for task.skillcertify.08.005.
- public_safe remains NOT_REVIEWED.
- public_safety_final remains NOT_PERFORMED.
- publication_authorized remains false.
- production claims remain unauthorized.
- G-P8 was not performed.
- Job Search was not authorized.
- This decision does not execute task.skillcertify.08.006 or task.skillcertify.08.007.
