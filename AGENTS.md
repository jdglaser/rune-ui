# Rune UI project instructions

## Architecture

- Use React, TypeScript, Vite, Emotion, and React Aria.
- Use Emotion's css prop and object styles.
- Do not use Emotion styled.
- Keep router-aware code outside src/ui.
- Keep route files thin.
- Components must not access localStorage directly.
- TanStack Query owns asynchronous cached data.
- The URL owns applied filter state.
- Do not manually edit src/routeTree.gen.ts.

## Verification

Before completing a change, run:

- npm run typecheck
- npm run lint
- npm test
- npm run build

## Learning plan

The staged application work is defined in:

docs/RUNE_UI_APPLICATION_LEARNING_PLAN.md

When asked to complete a lesson:

1. Read the entire lesson and relevant prior lessons.
2. Inspect the repository to confirm prerequisite lessons are complete.
3. Implement only the requested lesson.
4. Explain the concept and architectural choices.
5. Run all checks.
6. Stop after the requested lesson.