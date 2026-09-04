# Stage 08.007 — Deterministic Checks

## Identity

- Task: `task.skillcertify.08.007`
- Issue: `#167`
- Source commit: `a85ef1572b759522baa728214a72973509541194`
- Source tree: `452e5ad763f674b777b4e81eb036f2f77e4bc59f`
- Review mode: `MANUAL_DETERMINISTIC_BASELINE`
- Gitleaks: `NOT_EXECUTED`

## Deterministic results

- PS-01 / repo-native secret-config guard: `PASS`
- PS-01 / high-confidence text secret indicator scan: `PASS`
- PS-06 / exact governed asset identity: `PASS`
- PS-07 / required transcript/TTS boundary markers: `PASS`
- PS-12 / publication boundary: `PASS`

Scanner/check PASS does not independently establish `PUBLIC_SAFETY_PASS`.

## Exact asset identities

| Asset | SHA-256 | Bytes | Status |
| --- | --- | ---: | --- |
| `stage08-evidence/08-005/assets/VE-08-005-01-home.png` | `79f5006e8c41909be5c9b2c511f95da87db61a6c958779db34baca6e999b6a97` | 94240 | PASS |
| `stage08-evidence/08-005/assets/VE-08-005-02-certifications.png` | `889685ab465bc1c2ef88c2f27e4c99ac772f2918f451a211bd1cfc6986c1d416` | 82346 | PASS |
| `stage08-evidence/08-005/assets/VE-08-005-03-certification-detail.png` | `2b44b427544c417f233a37bd8a968b5f49b0412c7aaaa437d12d0d2c98a3e76f` | 72874 | PASS |
| `stage08-evidence/08-005/assets/VE-08-005-04-evidence.png` | `a3edf8f209537747c6e4a955a3b04ff74ce7ef7c18a7d58ff3119930e430c57d` | 77254 | PASS |
| `stage08-evidence/08-006/assets/VE-08-006-01-narration.wav` | `86fd55550869636f39e6eb3567068dc016eb00dde8367e5cfd94e207b183464a` | 2473270 | PASS |
| `stage08-evidence/08-006/assets/VE-08-006-01-short-demo.mp4` | `398520ac435a71a6f1e1685caf84e326f5e439bbe220a86ba03767151da02c78` | 63912618 | PASS |
| `stage08-evidence/08-006/assets/VE-08-006-02-short-demo-narrated.mp4` | `cf313ebefed243075365ae94de830d42480dee40f86a4ef60ce0ddab8c6261f7` | 62756671 | PASS |

## URL / local-path inventory

| File | Line | Text |
| --- | ---: | --- |
| `stage08-evidence/08-005/manifest.json` | 23 | "expected_base_url": "http://localhost:3001", |
| `stage08-evidence/08-005/manifest.json` | 46 | "capture_runtime_base_url": "http://localhost:3001", |
| `stage08-evidence/08-005/manifest.json` | 62 | "capture_runtime_base_url": "http://localhost:3001", |
| `stage08-evidence/08-005/manifest.json` | 78 | "capture_runtime_base_url": "http://localhost:3001", |
| `stage08-evidence/08-005/manifest.json` | 94 | "capture_runtime_base_url": "http://localhost:3001", |
| `stage08-evidence/08-006/manifest.json` | 120 | "base_url": "http://localhost:3000/", |
| `stage08-evidence/08-006/TRANSCRIPT.md` | 10 | - Runtime used for recording: `http://localhost:3000/` |

Inventory entries are not automatically findings. Human review must classify them.

## Human-review items still pending

- PS-02 PII / personal-data inspection
- PS-03 URL/path appropriateness classification
- PS-04 browser/desktop/out-of-scope visual inspection
- PS-05 media/document metadata appropriateness
- PS-07 full transcript/narration fidelity
- PS-08 claim-integrity review
- PS-09 production-implication review
- PS-10 cross-asset visual/provenance consistency
- PS-11 public-presentation residue

## Current state

- Deterministic checks: `PASS`
- Human media/text inspection: `PENDING`
- Public safe: `NOT_DECIDED`
- Publication: `NOT_AUTHORIZED`
- G-P8: `NOT_PERFORMED`
- Job Search: `NOT_AUTHORIZED`
