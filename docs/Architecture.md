# Wedding Planning OS Architecture

---

# Vision

Wedding Planning OS is designed as an all-in-one wedding planning and wedding-day operation platform.

The architecture separates planning workflows from live event execution while keeping all data within a single Wedding Workspace.

The system is built using a feature-first architecture, allowing reusable UI foundations to be completed before business logic and backend implementation.

---

# Development Strategy

The project follows a feature-first development approach.

Development order:

1. UI Foundation
2. Business Logic
3. Backend Integration
4. UI / UX Polish

Each module follows the same lifecycle before moving to the next stage.

---

# Overall System Architecture

```
Company
│
└── Wedding Workspace
    │
    ├── Wedding Profile
    ├── Guest Management
    ├── RSVP Management
    ├── Budget Management
    ├── Vendor Management
    ├── Task Management
    └── Live Rundown
```

A company can manage multiple weddings.

Each Wedding Workspace is completely independent.

Every workspace owns its own:

- Wedding Profile
- Guests
- RSVP Records
- Budget
- Vendors
- Tasks
- Live Rundown
- Members
- Permissions

No data is shared between different weddings unless explicitly designed in the future.

---

# Module Relationship

```
Wedding Profile
        │
        ├──────── Guest Management
        │
        ├──────── RSVP Management
        │
        ├──────── Budget Management
        │               │
        │               │
        │        Shared Vendor Database
        │               │
        ├──────── Vendor Management
        │
        ├──────── Task Management
        │
        └──────── Live Rundown
```

Wedding Profile is the central module.

Every business module belongs to a Wedding Workspace.

Task Management and Live Rundown are intentionally separated because they serve different operational purposes.

---

# Shared Vendor Architecture

Vendor Management is the single source of truth for vendor information.

Budget Management references Vendor records instead of duplicating vendor data.

```
Vendor Management
        │
        │ Shared Vendor Database
        │
Budget Management
```

Vendor information should only exist in one place.

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

## Budget owns

- Expense Name
- Selected Vendor
- Package Details
- Payment Information
- Invoice Number
- Receipt
- Payment Status
- Notes

Package Details inside Budget are specific to that wedding and should never overwrite the Vendor default package.

---

# Task Management

Task Management is designed for wedding preparation.

Its purpose is to help planners complete all planning work before the wedding day.

Responsibilities

- Planning Tasks
- Internal Checklist
- Assignment
- Due Dates
- Priority
- Progress Tracking

---

## Task Structure

```
Task
├── Category
├── Task Name
├── Assigned To
├── Due Date
├── Priority
├── Status
├── Related Vendor (Optional)
├── Description
└── Notes
```

Related Vendor is optional.

Tasks may reference Vendor records but remain independent from Budget Management.

Task Management does not control the Live Rundown.

---

# Live Rundown

Live Rundown is a dedicated operational module for the actual wedding day.

It replaces the traditional Excel Rundown while maintaining the familiar workflow used by wedding planners and coordinators.

Unlike Task Management, Live Rundown is intended for real-time execution instead of planning.

---

## Core Event Structure

Each Live Rundown event contains:

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

This structure mirrors the existing Excel rundown format currently used by RC Event Planner.

---

# Relationship Between Task Management and Live Rundown

Task Management

↓

Wedding Preparation

↓

Live Rundown

↓

Wedding Day Execution

Task Management and Live Rundown are independent modules.

Tasks are not automatically converted into Live Rundown events.

Future integration may be considered after observing real user workflows.

---

# Live Rundown Viewing

Every wedding member has access to the Full Rundown.

The Full Rundown is always the primary operational view.

Future versions may optionally provide a filtered "My Rundown" view.

---

## Full Rundown

Displays every event for every participant.

Purpose

Provide a shared operational timeline during the wedding.

---

## My Rundown (Optional)

Users may switch to:

My Rundown

This view filters events using Responsible Roles.

Examples

Planner

Displays every event.

DJ

Displays only events assigned to DJ.

Photographer

Displays photography-related events.

Reception

Displays reception duties.

This feature improves convenience.

It does **not** replace or restrict the Full Rundown.

---

# Responsible Roles

Each Live Rundown event may contain multiple Responsible Roles.

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

They are not permissions.

---

# Coordinator

Coordinator represents the primary person responsible for coordinating that event.

Each event should have one Coordinator assigned.

The Coordinator is responsible for monitoring the execution of that specific event.

---

# Live Editing

Only authorized users may edit the Live Rundown.

Default editable roles

- Planner
- Coordinator (with Edit permission)

Editable fields

- Time
- Used Time
- Status
- Remarks
- Event Order

Changes are reflected immediately for all connected users once real-time synchronization is implemented.

---

# Current Event Marker

One event is highlighted as the current event.

Display States

- ✔ Completed
- ▶ Current Event
- ○ Upcoming

Purpose

Allow every participant to instantly understand:

- Current event
- Upcoming event
- Completed events

---

## Wedding Guest Operations Architecture

The guest-operation workflow follows a single-direction data flow:

Guest Management
→ RSVP Management
→ Table Assignment
→ Floor Plan
→ Wedding Day Check-in

### Guest Management

Source of basic guest identity data.

Owns:

- Guest Full Name
- Phone Number
- Email Address
- Preferred Name
- Guest From
- Guest Group

### RSVP Management

Owns attendance and banquet-related data.

Owns:

- RSVP Status
- Adults
- Children
- Meal Preferences
- Invitation Status

### Table Assignment

Owns the relationship between confirmed RSVP guests and tables.

Owns:

- Table Name
- Table Capacity
- Assigned Guests
- Assigned Seats
- Remaining Seats

### Floor Plan

Future visual layer for Table Assignment.

Responsibilities:

- Store the uploaded venue-layout reference
- Position tables visually
- Display table capacity and occupancy
- Reference existing Table Assignment data

Floor Plan must not duplicate guest, RSVP or table records.

### Wedding Day Check-in

Future operational layer for wedding-day attendance.

Reads:

- Guest identity from Guest Management
- Attendance and meal data from RSVP Management
- Seating data from Table Assignment
- Visual table locations from Floor Plan

Check-in status should be stored separately and must not overwrite RSVP status.

### Architecture Rules

- Each data type must have one source of truth.
- Floor Plan is a visualization layer, not a separate seating database.
- Wedding Day Check-in is an operational status layer.
- Future modules should reuse existing Guest, RSVP and Table Assignment records.
- These modules must not create duplicated guest profiles.

This significantly improves communication during live wedding operations.

---

# Real-time Synchronization

Future implementation

Planner or authorized Coordinator updates the schedule.

↓

Live Rundown recalculates event timing.

↓

Current Event updates.

↓

Every connected user immediately receives the latest rundown.

No manual refresh should be required.

---

# User & Permission Architecture

Users belong to a Wedding Workspace.

Each user has:

- Role
- Permissions
- Assigned Weddings

Default Roles

- Planner
- Coordinator
- Couple
- Vendor User

Roles provide default permissions.

Permissions can be customized per user.

Permissions should never be hardcoded.

Planner manages all members and permissions.

---

# Workspace Architecture

```
RC Event Planner
        │
        ├── Jason & Emily Wedding
        │
        ├── Ryan & Chloe Wedding
        │
        └── Aaron & Michelle Wedding
```

Each Wedding Workspace contains its own:

- Members
- Permissions
- Guests
- RSVP
- Budget
- Vendors
- Tasks
- Live Rundown

Users only access weddings they are assigned to.

---

# Future Backend

Backend implementation will use Firebase.

Components

- Firebase Authentication
- Firestore Database
- Firebase Storage
- Firestore Realtime
- Cloud Functions (Future)

---

# Architecture Principles

- One Company can manage multiple Weddings.
- One Wedding equals one independent Workspace.
- Wedding Profile is the center of every Workspace.
- Vendor information is maintained in one place only.
- Budget references Vendor records instead of duplicating data.
- Task Management focuses on wedding preparation.
- Live Rundown focuses on wedding-day execution.
- Full Rundown is always available to every assigned wedding member.
- My Rundown is an optional filtered view.
- Responsible Roles are for filtering, not permissions.
- Roles define default permissions.
- Permissions are configurable per user.
- Planner manages users and permissions.
- Only authorized users can edit the Live Rundown.
- Live Rundown is designed as the first production-ready feature of Wedding Planning OS.