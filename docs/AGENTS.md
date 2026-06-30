# AGENTS.md

# Wedding Planning OS — AI Development Guide

This document defines the development rules for all AI coding assistants (Codex, GitHub Copilot, ChatGPT, etc.).

These rules must be followed before making any code changes.

---

# Project Philosophy

This project is a long-term SaaS platform for Wedding Planning.

The goal is NOT simply to build pages.

The goal is to build a scalable Wedding Planning Operating System.

Architecture consistency is more important than implementation speed.

Never sacrifice long-term maintainability for short-term convenience.

---

# Before Writing Any Code

Always read the following documents first:

1. ChatHistory.md
2. ROADMAP.md
3. DEVLOG.md
4. Architecture.md
5. ArchitecturePrinciples.md
6. ProjectPhilosophy.md
7. DesignSystem.md
8. FirebasePlan.md
9. LiveRundown.md
10. Permission.md
11. DemoData.md

Never start coding without understanding the existing architecture.

---

# Architecture Rules

Do NOT redesign the architecture unless explicitly instructed.

Do NOT rename major modules.

Do NOT introduce duplicate data models.

Do NOT move files unnecessarily.

Keep code clean and maintainable.

Follow existing project structure.

---

# Vendor Architecture

Vendor is the Single Source of Truth.

Vendor information must never be duplicated.

Budget, Task, Live Rundown and future modules must reference Vendor instead of storing duplicated vendor data.

If a change breaks this principle, stop and request confirmation.

---

# Module Standard

Every module should follow the same structure whenever applicable:

Overview

Form

Detail

Statistics

Maintain consistency across all modules.

---

# Foundation Rules

During Foundation phase:

DO

- Build reusable components
- Build placeholder pages
- Build design system
- Build layouts
- Use placeholder data

DO NOT

- Connect Firebase
- Write Business Logic
- Implement CRUD
- Optimize prematurely

---

# Coding Rules

Write readable code.

Prefer reusable components.

Avoid unnecessary abstraction.

Avoid duplicated code.

Keep components small.

Use meaningful names.

Do not leave commented-out code.

---

# Documentation

Whenever architecture or development changes:

Update DEVLOG.md

Update ROADMAP.md

If architecture changes intentionally:

Update Architecture.md

Never leave documentation outdated.

---

# Build Verification

Every completed development task MUST end with:

1. npm run build

Build must succeed before completion.

Fix build errors before continuing.

---

# Git Workflow

After every completed Part:

1. git status
2. git add .
3. git commit
4. git push

Do not skip these steps.

---

# Existing Features

Never remove existing functionality unless explicitly instructed.

Never rewrite working modules without clear reason.

Prefer extending existing functionality.

---

# Live Rundown Priority

Live Rundown is currently the highest-priority production module.

Changes affecting Live Rundown require extra caution.

Do not simplify its workflow.

---

# Permissions

Permissions must never be hardcoded.

Always respect the Permission architecture.

Roles provide defaults only.

Permissions override roles.

---

# AI Responsibility

AI is an implementation assistant.

AI is NOT the product owner.

AI must never make product decisions independently.

When architecture is unclear:

STOP

Explain the issue.

Ask for confirmation before implementing.

---

# General Principle

When two choices exist:

Always choose the solution that is:

- Easier to maintain
- More scalable
- More reusable
- More consistent with the existing architecture

Consistency is more important than cleverness.

# Scope Control

Implement only the requested task.

Do not modify unrelated files.

Do not perform refactoring unless explicitly requested.

---

# When in Doubt

If requirements are ambiguous:

Do not guess.

Ask questions before implementation.
