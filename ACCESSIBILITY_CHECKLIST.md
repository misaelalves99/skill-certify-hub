# Accessibility Checklist — task.skillcertify.03.006

Scope: `/evidence` local evidence UI.

## Automated baseline

- [x] `npm run quality` passes (14/14 tests, lint, typecheck, build).
- [x] `npm run a11y:axe` reports 0 violations against `http://127.0.0.1:3000/evidence` while the dev server is running.

## Keyboard

- [x] Skip link can receive focus and moves focus to main content.
- [ ] Mobile menu summary keyboard operation to be reconfirmed during final human PR review.
- [x] Evidence URL field is reachable with Tab.
- [x] Add local evidence button is reachable and operable with Enter/Space.
- [x] Added evidence link is keyboard reachable.
- [x] Clear local evidence button is keyboard reachable and operable.
- [x] Visible focus indication is present on interactive controls.

## Semantics and announcements

- [x] Evidence URL has a persistent visible label.
- [x] Help text is associated through `aria-describedby`.
- [x] Evidence list state uses `aria-live="polite"` without forcing focus changes.
- [x] Heading hierarchy remains understandable in reviewed desktop/mobile captures.
- [x] Navigation exposes the active Evidence page with `aria-current="page"`.

## Responsive / visual

- [x] Desktop layout has no horizontal overflow in reviewed captures.
- [x] Mobile layout has no horizontal overflow in reviewed captures.
- [ ] Very long evidence URL wrapping to be reconfirmed during final human PR review.
- [x] Text and controls remain legible at narrow viewport widths.

## Product boundary

- [x] UI clearly states evidence is session-only/local.
- [ ] Refresh-clears-local-evidence behavior to be reconfirmed during final human PR review.
- [x] No upload, API, database, auth, remote storage, or persistence is implied.

## Evidence record

- Automated quality: PASS.
- axe-core scan: PASS, 0 violations after contrast correction.
- Manual keyboard workflow: PASS, confirmed by human reviewer.
- Visual review: PASS for empty/populated desktop states and narrow/mobile states supplied as evidence.
- Remaining final-review checks are explicitly left unchecked rather than inferred.

Human reviewer should complete the remaining unchecked items before merge and record any exceptions in Issue #33 / the pull request.
