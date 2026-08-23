# Accessibility Checklist — task.skillcertify.03.006

Scope: `/evidence` local evidence UI.

## Automated baseline

- [ ] `npm run quality` passes.
- [ ] `npm run a11y:axe` reports 0 violations against `http://127.0.0.1:3000/evidence` while the dev server is running.

## Keyboard

- [ ] Skip link can receive focus and moves focus to main content.
- [ ] Mobile menu summary can be operated with keyboard.
- [ ] Evidence URL field is reachable with Tab.
- [ ] Add local evidence button is reachable and operable with Enter/Space.
- [ ] Added evidence link is keyboard reachable.
- [ ] Clear local evidence button is keyboard reachable and operable.
- [ ] Visible focus indication is present on interactive controls.

## Semantics and announcements

- [ ] Evidence URL has a persistent visible label.
- [ ] Help text is associated through `aria-describedby`.
- [ ] Evidence list state uses `aria-live="polite"` without forcing focus changes.
- [ ] Heading hierarchy remains understandable.
- [ ] Navigation exposes the active Evidence page with `aria-current="page"`.

## Responsive / visual

- [ ] Desktop layout has no horizontal overflow.
- [ ] Mobile layout has no horizontal overflow.
- [ ] Long evidence URLs wrap instead of overflowing their card.
- [ ] Text and controls remain legible at narrow viewport widths.

## Product boundary

- [ ] UI clearly states evidence is session-only/local.
- [ ] Refresh clears local evidence as expected.
- [ ] No upload, API, database, auth, remote storage, or persistence is implied.

Human reviewer should complete this checklist before merge and record any exceptions in Issue #33 / the pull request.
