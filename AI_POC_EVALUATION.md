# AI POC Evaluation — task.skillcertify.03.011

## Decision

**Outcome: `defer` for product/runtime adoption; retain only as an optional bounded review aid.**

The experiment found one independently verifiable cross-artifact inconsistency that the deterministic test/build baseline does not detect. It also produced one plausible-but-ambiguous candidate that was rejected after source verification. This is enough to show limited review value, but not enough to justify product AI, autonomous gating, agent infrastructure, or a required AI dependency in Stage 03.

## Hypothesis

> Can a bounded AI-assisted review find a material inconsistency in the current frontend/evidence package that is not caught by deterministic tests, without turning ambiguous observations into defects or assuming release authority?

## Baseline without AI

The repository already has a strong deterministic/manual baseline:

- `npm run quality`;
- `npm run test:journey`;
- manual responsive review;
- manual keyboard/focus review;
- axe scans;
- human PR review and merge authority.

At the start of this task the governed branch passed:

- 22/22 tests;
- lint;
- typecheck;
- production build;
- working tree clean.

The AI POC is therefore evaluated only as a possible **second-layer review aid**, not as a replacement for any of these controls.

## Input boundary

Only public/non-sensitive repository material was used. No credentials, private user data, production data, external account data, backend data, or restricted sources were required.

Reviewed material included:

- current `package.json` scripts;
- `ACCESSIBILITY_CHECKLIST.md`;
- Stage 03 issue/PR evidence for accessibility and critical-journey work;
- current frontend/test contracts already present in the repository.

## Procedure

1. Ask the AI reviewer to look for mismatches between executed evidence, committed reproducibility, and current repository contracts.
2. Treat every AI observation as a **candidate only**.
3. Verify each candidate against repository files and issue/PR evidence.
4. Reject candidates when evidence is incomplete or historical intent explains the apparent mismatch.
5. Record only independently supported findings.

## Candidate A — rejected after verification

### Observation

`ACCESSIBILITY_CHECKLIST.md` still contains three unchecked items from `03.006`:

- mobile-menu keyboard operation;
- very-long evidence URL wrapping;
- refresh-clears-local-evidence behavior.

### Verification

Issue #33 explicitly states that these three items were intentionally left unchecked for final human review rather than inferred.

The later Stage 03 evidence does confirm broader responsive and keyboard/focus quality, but the reviewed source set does not provide explicit enough evidence to assert that **all three historical checklist items** were individually completed.

### Result

**Rejected as a finding.**

This candidate demonstrates a key limitation: a plausible inconsistency is not a defect until the source trail supports it.

## Finding AI-POC-01 — verified

### Observation

The final `03.009` accessibility sweep executed axe against five current surfaces and recorded `0 violations found` for:

- `/`;
- `/certifications`;
- `/certifications/cert-frontend-foundations`;
- `/practices`;
- `/evidence`.

However, the committed `package.json` currently exposes only:

```text
npm run a11y:axe
```

and that script scans only:

```text
http://127.0.0.1:3000/evidence
```

### Why this matters

The final accessibility evidence is valid because it was actually executed and human-reviewed, but the **full five-route sweep is not captured as one versioned, repeatable repository command**.

A future reviewer can reproduce the Evidence scan directly from `package.json`, but must reconstruct the other four commands from historical review context.

### Independent verification

Confirmed directly against the current `package.json` and the recorded `03.009` final axe evidence.

### Classification

**Verified review/evidence reproducibility gap.**

This is not a product defect, accessibility regression, or release blocker. It is a traceability/repeatability improvement candidate and should be handled by the later alpha-evidence/package work rather than expanded inside this AI POC task.

## Measured POC result

Small evaluation sample:

- verified additional findings: **1**;
- rejected ambiguous candidates: **1**;
- product defects found: **0**;
- new security/privacy exposure required: **0**;
- deterministic gate replacements justified: **0**;
- autonomous decisions justified: **0**.

This sample is intentionally too small to claim a general precision/recall rate for AI review.

## Value assessment

### Value demonstrated

AI-assisted cross-artifact review can be useful for:

- comparing current repository contracts with historical execution evidence;
- surfacing traceability/reproducibility gaps that ordinary source tests do not encode;
- prompting targeted human verification across files/issues/PR evidence.

### Value not demonstrated

The POC does **not** justify:

- product-facing AI capability;
- required model/API dependency;
- autonomous test/gate/release authority;
- autonomous merge authority;
- agent framework;
- RAG/vector infrastructure;
- replacement of deterministic tests, axe, manual accessibility review, or human PR review.

## Failure modes observed

- historical unchecked checklist items can look stale even when intentionally preserved;
- cross-task evidence can be incomplete or differently scoped;
- an AI reviewer can overstate a candidate unless every material claim is independently checked;
- review quality depends on having authoritative source artifacts available.

## Recommendation

For the remainder of Stage 03:

- keep deterministic/manual validation authoritative;
- allow AI only as an **optional bounded review assistant** for cross-artifact consistency checks;
- require human/source verification before recording any AI finding;
- do not add AI to the product runtime;
- do not make AI execution mandatory for CI, release, gate, or merge decisions;
- carry `AI-POC-01` forward as a candidate for `03.012` alpha-evidence reproducibility work, without implementing that later task here.

## Final decision vocabulary

- product/runtime AI: **`defer`**;
- autonomous AI authority: **`reject`**;
- bounded review assistance: **`optional`**;
- deterministic/manual baseline: **`authoritative`**.
