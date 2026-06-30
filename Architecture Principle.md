# Wedding Planning OS - Project Philosophy

## Vision

Build a modern, scalable, and user-friendly Wedding Planning SaaS that helps couples organize every aspect of their wedding in one place.

---

# Core Principles

## 1. Feature First

Always prioritize completing business functionality before polishing the user interface.

Working software is more valuable than perfect visuals.

---

## 2. Component First

Every new feature should be designed as reusable components whenever possible.

Avoid duplicated code.

---

## 3. Scalability

Build with future expansion in mind.

Today's architecture should support tomorrow's features without major rewrites.

---

## 4. Consistency

Maintain a consistent design language across the application.

Use:

- Shared colors
- Shared spacing
- Shared typography
- Shared components

---

## 5. UI Polish Comes Later

Temporary layouts are acceptable during development.

Large UI redesigns should happen only during the dedicated UI/UX Polish phase.

Example:

Development

Display Card
+
Edit Form

Production

Display Mode
↓
Edit
↓
Edit Mode

---

## 6. Simplicity

Prefer simple solutions over complex ones.

Readable code is better than clever code.

---

## 7. Build Before Optimize

Make it work.

Then make it clean.

Finally make it fast.

---

## Development Workflow

Every feature follows the same workflow.

Plan

↓

Build

↓

Review

↓

npm run build

↓

Git Commit

↓

Git Push

↓

Update DEVLOG

---

## Code Standards

- TypeScript
- Tailwind CSS
- Functional Components
- Reusable Components
- Responsive Design

---

## Git Standards

One feature per commit.

Every successful feature should include:

- Build Verification
- Git Commit
- Git Push
- DEVLOG Update

---

## Long-term Goal

Create a production-ready SaaS application with:

- Modern architecture
- Excellent user experience
- Clean codebase
- Scalable components
- Reliable deployment

## AI Collaboration

GitHub Copilot is an assistant, not the decision maker.

Every generated code change should be:

- Reviewed
- Understood
- Built successfully
- Committed intentionally

Avoid accepting code without verification.

## Dashboard vs Form Principle

Dashboard pages should present only the most important categories for quick filtering and overview.

Forms should provide the complete list of categories for accurate data entry.

Keep dashboards simple.
Keep forms comprehensive.

# Architecture Principles

## Shared Data Architecture

Wedding Profile
├── Guest Management
├── RSVP Management
├── Budget Management
├── Vendor Management
├── Task Management
└── Timeline Management

Budget Management ↔ Vendor Management

- Shared Vendor Database
- Budget references Vendor records
- Vendor information is maintained in one place only

Package Details and Payment Information belong to Budget records and are not stored in the Vendor database.

# Module 8 — Live Rundown

Purpose

Manage real-time wedding day operations.

The Live Rundown replaces the traditional Excel rundown sheet while maintaining the same operational workflow used by wedding planners.

It is designed for live execution instead of planning.

---

Core Event Structure

- Time
- Program
- Used Time
- Food Serving
- Song
- Screen
- Remarks
- Responsible Roles (Multiple)
- Coordinator
- Status
- Sequence

---

Viewing Modes

### Full Rundown (Default)

All users can access the complete Live Rundown.

This serves as the digital replacement for the traditional printed or Excel rundown sheet used during wedding operations.

Every participant can view the full event schedule and understand the overall wedding flow.

### My Rundown (Optional)

Users may optionally switch to **My Rundown**.

My Rundown filters the event list to display only the activities assigned to the selected Responsible Role.

This is a convenience feature and does not restrict access to the complete rundown.

Examples

Role: DJ

Displays only events requiring DJ attention.

Role: Photographer

Displays only photography-related events.

Role: MC

Displays only MC-related activities.

Role: Coordinator

Normally uses the Full Rundown, but may also filter when needed.

---

Foundation Phase

UI only

- Rundown Overview
- Rundown Form
- Event Detail
- Statistics

No real-time synchronization.
No notifications.
No business logic.