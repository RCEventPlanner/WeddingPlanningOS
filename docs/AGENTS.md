---

# Scope Control

Implement only the requested task.

Do not modify unrelated files.

Do not perform refactoring unless explicitly requested.

Avoid changing file structure without approval.

Do not introduce new dependencies unless required for the requested feature.

---

# When in Doubt

If requirements are ambiguous:

Do not guess.

Stop implementation.

Explain the uncertainty clearly.

Ask for confirmation before proceeding.

Never make architecture decisions on behalf of the product owner.

---

# Final Principle

Every change should make the project:

- Easier to maintain
- More reusable
- More scalable
- More consistent

If a proposed change conflicts with the existing architecture or documented decisions, follow the documentation and request clarification before proceeding.

---

# Development Workflow

Every completed Part must follow this workflow exactly:

1. Implement only the requested feature.
2. Run `npm run build`.
3. Fix all build errors.
4. Verify that no unrelated files were modified.
5. Run `git status`.
6. Run `git add .`.
7. Run `git commit`.
8. Run `git push`.
9. Update `DEVLOG.md`.
10. Update `ROADMAP.md`.

A task is NOT considered complete until all steps above have been finished successfully.

# Documentation Authority

ChatHistory.md is the authoritative record of all product decisions.

ROADMAP.md defines development order.

Architecture.md defines system architecture.

If any documentation conflicts, stop implementation and request clarification.

Do not infer, invent, or extend product features beyond what is documented.

Never add undocumented future features into summaries or implementations.
