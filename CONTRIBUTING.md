# Development Principles

Build functionality before polishing the interface.

Prioritize reusable components and stable architecture.

Complete all business modules before performing large-scale UI/UX refinements.

Avoid redesigning pages repeatedly during feature development unless it blocks usability.

## Feature First

Always prioritize building complete business functionality before polishing the user interface.

## Reusable Components

Create reusable components whenever possible.
Avoid duplicated code.

## Temporary UI

During development it is acceptable to temporarily display duplicated information (such as a display card together with an edit form).

These temporary layouts will be refined during the UI/UX Polish phase.

## View Mode vs Edit Mode

For editable pages:

Preferred production workflow:

Display Mode
      ↓
Click Edit
      ↓
Edit Mode
      ↓
Save / Cancel
      ↓
Display Mode

Avoid permanently displaying both Display Mode and Edit Mode together in the final product unless there is a specific UX reason.

## Component Rules

- Keep components reusable.
- Keep pages lightweight.
- Prefer composition over duplication.

## Development Workflow

Every feature should follow:

Plan
→ Build
→ Review
→ npm run build
→ Git Commit
→ Git Push
→ Update DEVLOG

## UI Polish

Large UI redesigns should only happen during the dedicated UI/UX Polish phase unless they block development.
