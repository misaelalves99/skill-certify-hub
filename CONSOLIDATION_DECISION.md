# Component & Token Consolidation — task.skillcertify.03.007

## Accepted extraction

The application shell is the only shared abstraction accepted in this task.

Observed repetition across Dashboard, Certifications, Practices and Evidence included:
- skip link;
- brand/header;
- mobile navigation;
- application-status indicator;
- workspace/sidebar navigation;
- active-route semantics;
- `main#main-content` focus target;
- responsive shell behavior and focus styles.

The repeated structure had the same responsibility on four surfaces, so it was extracted into `app/_components/AppShell.tsx` with one small variable input: `activePath` plus page `children`.

## Rejected extractions

Cards, result headers, section panels, preview badges and boundary notes remain local.

They look similar but currently carry different layout, semantics, interaction and state responsibilities. A universal component or variant API would add indirection and speculative props without a clear current benefit.

No new design tokens were added because the existing semantic tokens already cover the accepted shell extraction. Creating more tokens merely because values repeat would not improve the current model.

## Guardrails

- No design-system package or component library was introduced.
- No future variants or generic APIs were added.
- Existing page-specific state and interaction remain local.
- Keyboard and semantic behavior remain owned by the shared shell only where already identical.
- Existing tests remain the behavioral baseline; `tests/app-shell.test.mjs` adds structural coverage for reuse and active navigation semantics.

## Before / after

Before: four frontend surfaces independently owned nearly identical application-shell markup and shell CSS.

After: those surfaces consume one shared shell while retaining their page-specific content and styles. The extraction is intentionally limited to the observed common responsibility.
