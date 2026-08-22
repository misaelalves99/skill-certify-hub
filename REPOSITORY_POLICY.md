# Repository Policy

Task: `task.skillcertify.02.001`

This repository remains public and keeps `main` as its default branch.

## Change model

- Use a short-lived branch for each governed unit of work.
- AI/Codex must not write directly to `main`.
- AI/Codex must not merge changes into `main`.
- Human review is required before merge.
- Global work-in-progress limit is 2 governed tasks.

## Current task boundary

For `task.skillcertify.02.001`:

- execution branch: `task/skillcertify-02-001-repo-policy`;
- tracking issue: `#1`;
- no GitHub Project setup;
- no application scaffold;
- no dependency installation or changes.

Any merge into `main` is a human-maintainer action after review.
