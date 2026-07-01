# Chat History

This document records major product discussions, architectural decisions, and development direction changes throughout the Wedding Planning OS project.

Unlike `DEVLOG.md`, which records implementation progress, this document records **why** important decisions were made.

---

# 2026-06-29

## Project Foundation Direction

Established the overall development strategy.

Development follows a Feature-first workflow:

1. Foundation
2. Business Logic
3. Backend
4. UI / UX Polish

Foundation focuses on:

- Placeholder Data
- Reusable Components
- Shared Design System
- No CRUD
- No Firebase
- No Business Logic

---

## Module Standardization

Every module follows the same structure:

- Overview
- Form
- Detail
- Statistics

This standard is applied across:

- Wedding Profile
- Guest
- RSVP
- Budget
- Vendor
- Task
- Live Rundown

---

## Shared Vendor Architecture

A major architectural decision was made:

Vendor information should only exist in one place.

Budget references Vendor records instead of duplicating vendor information.

Shared Vendor Fields

- Category
- Vendor Name
- Website
- Facebook
- Instagram
- PIC Name
- PIC Contact
- Default Package Details
- Notes

Budget owns only budget-related fields.

---

## Vendor UI Standardization

Vendor information layout was standardized.

Vendor Management displays:

Category

Vendor Name              Vendor Website

Vendor Facebook          Vendor Instagram

Vendor PIC Name          Vendor PIC Contact

Default Package Details

Notes

Other modules reference Vendor information without displaying Vendor Category.

This layout is shared across:

- Budget
- Task
- Live Rundown (Future)

---

## Budget × Vendor Integration

Budget Management now shares Vendor information.

Budget keeps ownership of:

- Expense
- Payment
- Invoice
- Receipt

Vendor keeps ownership of Vendor details.

---

## Task Management Independence

Task Management is designed for pre-wedding preparation.

Task Management remains independent from Live Rundown during the Foundation phase.

Related Vendor is optional.

Future integration will be evaluated after real-world usage.

---

# 2026-06-30

## Live Rundown Concept

A major product direction change was made.

The original Timeline module was replaced by Live Rundown.

Reason:

Real wedding operations require continuous schedule updates.

Traditional timeline pages are insufficient.

The product should replace the Excel rundown sheet currently used by wedding planners.

---

## Live Rundown Structure

The standard rundown structure is based on existing operational workflows.

Fields include:

- Time
- Program
- Used Time
- Food Serving
- Song
- Screen
- Remarks
- Responsible Roles
- Coordinator
- Status
- Sequence

This mirrors real wedding execution rather than a generic timeline.

---

## Full Rundown Principle

The Full Rundown is always the primary operational view.

Everyone involved in the wedding can access the complete rundown.

This preserves the traditional workflow where all participants share the same schedule.

---

## My Rundown

An optional "My Rundown" view was introduced.

Users may filter the rundown based on Responsible Roles.

Examples:

- DJ
- MC
- Photographer
- Videographer
- Reception
- Makeup Artist

My Rundown is a convenience feature only.

It does not restrict access to the Full Rundown.

---

## Responsible Roles

Each Live Rundown event can be assigned to multiple roles.

Examples:

- Planner
- Coordinator
- MC
- DJ
- Photographer
- Videographer
- Couple
- Family
- Banquet Captain

This allows users to quickly identify which activities require their attention.

---

## Coordinator Field

Each event includes a Coordinator field.

This represents the primary coordinator responsible for managing that specific event.

---

## Editing Permissions

Only authorized users may modify the Live Rundown.

Default editable roles:

- Planner
- Coordinator (if permission is granted)

Editable fields include:

- Time
- Used Time
- Status
- Remarks
- Event Order

Changes should synchronize to all connected users in real time.

---

## Current Event Marker

A Current Event Marker was introduced.

Purpose:

Provide everyone with a clear indication of wedding progress.

Display states:

✔ Completed

▶ Current Event

○ Upcoming

This feature will be implemented during the Business Logic phase.

---

## Mobile-first Direction

Live Rundown is primarily designed for:

- Mobile Phones
- Tablets

Desktop remains fully supported.

This reflects actual usage during wedding-day operations.

---

## Live Rundown Priority

After Foundation is completed, Live Rundown becomes the highest development priority.

Instead of implementing Business Logic across every module immediately, the focus shifts to delivering a production-ready Live Rundown MVP.

---

## Wedding Workspace

The platform architecture now supports multiple weddings.

Structure:

Company

↓

Wedding Workspace

↓

Members

↓

Modules

Each wedding maintains isolated data.

---

## Authentication Strategy

The first backend implementation will include:

- Firebase Authentication
- Wedding Workspace
- User Management

This establishes the foundation for multi-wedding support.

---

## User Types

Four default user types were defined.

- Planner
- Coordinator
- Couple
- Vendor User

Roles provide default permissions only.

---

## Permission Management

Permissions should not be hardcoded.

Planner can customize permissions for every individual user.

Examples:

Coordinator A

- Edit Live Rundown

Coordinator B

- View only

Vendor User

- Live Rundown only

Permissions override default role behavior.

---

## Permission Matrix

Default permissions were established.

Planner

Full access.

Coordinator

View most modules.

Editable access depends on assigned permissions.

Couple

Can edit:

- Wedding Profile
- Guest
- RSVP
- Budget
- Vendor
- Task

Can view Live Rundown.

Vendor User

Can access only Live Rundown.

---

## Future Permission Management Page

A dedicated Permission Management page was proposed.

Purpose:

Allow Planners to configure permissions per user instead of relying solely on predefined roles.

This enables flexible access control for different coordinators and wedding staff.

---

## Documentation Standard

Project documentation has been expanded.

Current documentation includes:

- ROADMAP.md
- DEVLOG.md
- DEV_WORKFLOW.md
- Architecture.md
- ArchitecturePrinciples.md
- ProjectPhilosophy.md
- DesignSystem.md
- FirebasePlan.md
- LiveRundown.md
- Permission.md
- DemoData.md
- ChatHistory.md

Each document has a distinct responsibility.

---

## AI Collaboration Workflow

AI assistants (GitHub Copilot, Codex, ChatGPT) are development assistants, not decision makers.

Every AI-generated change must be:

- Reviewed
- Understood
- Build Verified
- Committed intentionally

Architecture and product decisions remain human-led.

---

# Future Topics

The following topics are planned for future discussion and implementation.

## Live Notifications

- Event reminders
- Upcoming activities
- Push notifications

---

## Vendor Portal

Dedicated Vendor login experience.

Future capabilities may include:

- View assigned rundown
- Acknowledge attendance
- View assigned tasks
- Contact coordinator

---

## Coordinator Dashboard

Potential future dashboard showing:

- Assigned events
- Assigned tasks
- Current event
- Upcoming responsibilities

---

## Analytics

Future operational reports:

- Wedding progress
- Vendor performance
- Timeline delays
- Task completion
- Budget summaries

---

# Document Purpose

This document captures the reasoning behind major product and architectural decisions.

It provides historical context for future development and ensures that design decisions remain consistent as the project evolves.

# Decision:
Live Rundown v1.1
Remain current Desktop Table Layout
Mobile change to Card Layout
Add Status：
- Delayed
- Skipped
- Cancelled
Actual Start Time
Expected Duration
Actual Duration
Automatic Time Shift
Time Shift Banner
Recalculate Timeline
Remarks remain Text Only
Full Rundown / My Rundown
Mobile First Development Strategy
因为 ChatHistory 是产品决策来源（Source of Truth），这些都应该记录在这里。
