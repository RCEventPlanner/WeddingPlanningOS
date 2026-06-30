# Development Workflow

---

# Purpose

This document defines the standard development workflow for Wedding Planning OS.

All contributors, including AI coding assistants, should follow this workflow to ensure consistency, maintainability, and stable project progression.

---

# Development Strategy

The project follows a Feature-first Development approach.

Every feature progresses through four stages.

1. Foundation
2. Business Logic
3. Backend Integration
4. UI / UX Polish

A stage should be completed before moving to the next.

---

# Feature Development Workflow

Every feature should follow this sequence.

## Step 1 — Planning

Before writing code:

- Review ROADMAP.md
- Review Architecture.md
- Review DesignSystem.md
- Review relevant module documentation
- Understand existing reusable components

Goal

Avoid duplicated implementations and maintain consistency.

---

## Step 2 — Foundation

Build UI only.

Include:

- Page Structure
- Responsive Layout
- Placeholder Data
- Reusable Components

Do NOT implement:

- CRUD
- Firebase
- Authentication
- Business Logic
- Validation

---

## Step 3 — Review

After implementation:

- Check layout consistency
- Verify Design System
- Verify shared components
- Remove duplicated UI
- Improve naming if necessary

---

## Step 4 — Build Verification

Run:

```bash
npm run build
```

The project must compile successfully before continuing.

---

## Step 5 — Git Workflow

After a successful build:

```bash
git status

git add .

git commit -m "Describe feature"

git push
```

One meaningful feature per commit.

---

## Step 6 — Documentation

Update documentation when necessary.

Possible documents:

- DEVLOG.md
- ROADMAP.md
- Architecture.md
- FirebasePlan.md
- LiveRundown.md
- Permission.md
- DemoData.md

Documentation should always reflect the latest implementation.

---

# AI Collaboration Workflow

Before asking AI to generate code:

1. Explain the task clearly.
2. Reference the relevant documentation.
3. Reuse existing components whenever possible.

After AI generates code:

- Review manually.
- Understand the implementation.
- Verify consistency.
- Run build.
- Commit intentionally.

Never accept generated code without review.

---

# Coding Priorities

Priority order:

1. Architecture
2. Reusable Components
3. Correct Data Structure
4. UI Consistency
5. Visual Polish

Never sacrifice architecture for speed.

---

# Reusable Component Rules

Before creating a component:

Ask:

- Does this already exist?
- Can it be reused?
- Can it be generalized?

Avoid duplicate components.

---

# Shared Data Rules

Never duplicate data.

Always reference shared records.

Examples:

Vendor Management

↓

Budget

↓

Task

↓

Live Rundown

Vendor information belongs only to Vendor Management.

---

# Module Completion Checklist

Every completed module should satisfy:

UI

- Responsive
- Reusable Components
- Placeholder Data
- Consistent Layout

Verification

- npm run build passes

Git

- git status
- git add .
- git commit
- git push

Documentation

- DEVLOG updated
- ROADMAP updated
- Related docs updated if necessary

---

# Development Principles

Always prioritize:

- Readability
- Maintainability
- Consistency
- Scalability

Premature optimization should be avoided.

---

# Goal

Every completed feature should be:

- Stable
- Documented
- Reusable
- Build Verified
- Ready for future Business Logic implementation
