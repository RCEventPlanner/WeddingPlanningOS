# Wedding Planning OS — Architecture Principles

---

# Purpose

This document defines the long-term architecture principles of Wedding Planning OS.

It describes how data, modules, users, and permissions are organized across the system to ensure scalability, consistency, and maintainability.

These principles should guide all future development decisions.

---

# System Architecture

Wedding Planning OS is designed around independent Wedding Workspaces.

```
Company
│
├── Wedding Workspace A
├── Wedding Workspace B
├── Wedding Workspace C
└── ...
```

Each Wedding Workspace is completely isolated.

A workspace owns its own:

- Wedding Profile
- Members
- Permissions
- Guests
- RSVP
- Budget
- Vendors
- Tasks
- Live Rundown

No business data is shared between weddings.

---

# Module Architecture

```
Wedding Profile
│
├── Guest Management
├── RSVP Management
├── Budget Management
├── Vendor Management
├── Task Management
└── Live Rundown
```

Wedding Profile acts as the central module.

Every business module belongs to one Wedding Workspace.

---

# Planning vs Execution

Wedding Planning OS consists of two independent workflows.

## Planning Modules

Used before the wedding.

Modules

- Wedding Profile
- Guest Management
- RSVP Management
- Budget Management
- Vendor Management
- Task Management

Purpose

Prepare and organize the wedding.

---

## Execution Module

Used during the wedding.

Module

- Live Rundown

Purpose

Coordinate the wedding in real time.

Planning and Execution remain independent but share the same Wedding Workspace.

---

# Shared Vendor Architecture

Vendor information should exist in one place only.

```
Vendor Management
        │
        │ Shared Vendor Database
        │
Budget Management
        │
Task Management
        │
Live Rundown (Future)
```

Vendor Management is the single source of truth.

Other modules reference Vendor records instead of duplicating information.

---

## Vendor owns

- Category
- Vendor Name
- Vendor Website
- Vendor Facebook
- Vendor Instagram
- Vendor PIC Name
- Vendor PIC Contact
- Default Package Details
- Notes

---

## Referencing Modules own

Budget

- Expense Name
- Package Details
- Payment Information
- Invoice Number
- Payment Status
- Receipt
- Notes

Task

- Related Vendor (Optional)
- Task-specific Information

Live Rundown

- Event-specific Vendor Assignment
- Operational Notes

Vendor records should never be modified from referencing modules.

---

# Task Management Architecture

Task Management supports wedding preparation.

Responsibilities

- Planning
- Assignment
- Progress Tracking
- Due Dates
- Priority
- Status

Tasks remain independent from Live Rundown.

Tasks are not automatically converted into rundown events.

Future integration may be evaluated after observing real user workflows.

---

# Live Rundown Architecture

Live Rundown is designed for real-time wedding operations.

It replaces the traditional Excel rundown while preserving familiar operational workflows.

The module is optimized for speed, collaboration, and mobile accessibility.

---

## Core Event Structure

Each event contains:

- Sequence
- Status
- Time
- Program
- Used Time
- Food Serving
- Song
- Screen
- Remarks
- Responsible Roles
- Coordinator

---

# Full Rundown

The Full Rundown is the default operational view.

Every assigned wedding member can view the complete schedule.

This replaces the printed or Excel rundown traditionally used during weddings.

---

# My Rundown

My Rundown is an optional filtered view.

Users may filter the Full Rundown by Responsible Roles.

Examples

- Planner
- Coordinator
- DJ
- MC
- Photographer
- Videographer
- Reception
- Couple

My Rundown improves convenience.

It never replaces or restricts the Full Rundown.

---

# Responsible Roles

Responsible Roles identify who should pay attention to each event.

Examples

- Planner
- Coordinator
- MC
- DJ
- Photographer
- Videographer
- Makeup Artist
- Banquet Captain
- Reception
- Couple
- Family

Responsible Roles are used for filtering and communication.

They are not permission settings.

---

# Coordinator

Each event may assign one Coordinator.

The Coordinator is responsible for monitoring and coordinating that event during execution.

Coordinator assignment is operational information and is separate from user permissions.

---

# Permission Architecture

Permissions are configurable.

Roles provide default permissions only.

Default Roles

- Planner
- Coordinator
- Couple
- Vendor User

Permissions may be customized for each individual user.

Examples

Coordinator A

- Edit Live Rundown

Coordinator B

- View Live Rundown only

Vendor User

- View Live Rundown only

Planner manages all permissions.

Permissions should never be hardcoded.

---

# Live Editing Principles

Only authorized users may edit the Live Rundown.

Default editable roles

- Planner
- Coordinator (if granted Edit permission)

Editable fields

- Time
- Used Time
- Status
- Remarks
- Event Order

All updates should synchronize to every connected user once realtime functionality is implemented.

---

# Current Event Architecture

The system maintains one Current Event.

Display states

- ✔ Completed
- ▶ Current Event
- ○ Upcoming

Purpose

Allow every participant to immediately understand the wedding's current progress.

Future implementation depends on:

- Event Status
- Realtime Synchronization
- Live Rundown

---

# Foundation Architecture

During the Foundation phase, every module contains only:

- Page Structure
- Placeholder Data
- Reusable Components
- Responsive Layout

Excluded from Foundation

- Firebase
- CRUD
- Authentication
- Notifications
- Realtime Synchronization
- Business Logic

---

# Business Logic Phase

Business Logic introduces:

- CRUD
- Search
- Filter
- Sorting
- Pagination
- Validation
- State Management

No UI redesign should occur during this phase unless necessary.

---

# Backend Architecture

Backend services include:

- Firebase Authentication
- Firestore
- Firebase Storage
- Firestore Realtime
- Cloud Functions (Future)

Each Wedding Workspace stores independent business data.

---

# Architecture Principles Summary

- One Company can manage multiple Weddings.
- One Wedding equals one independent Workspace.
- Wedding Profile is the center of every Workspace.
- Planning modules and Live Rundown serve different purposes.
- Vendor information has a single source of truth.
- Referencing modules never duplicate Vendor data.
- Full Rundown is always available to every assigned wedding member.
- My Rundown is an optional filtered view.
- Responsible Roles are not permissions.
- Roles define default permissions only.
- Permissions are configurable per user.
- Planner manages members and permissions.
- Only authorized users may edit the Live Rundown.
- Live Rundown is the first production-ready feature of Wedding Planning OS.
- Every architectural decision should prioritize scalability, consistency, and long-term maintainability.