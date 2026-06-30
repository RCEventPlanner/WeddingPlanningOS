# Wedding Planning OS Architecture

## Development Strategy

Feature-first Development

1. Foundation
2. Business Logic
3. Backend
4. UI / UX Polish

---

# Application Architecture

Wedding Profile
│
├── Guest Management
├── RSVP Management
├── Budget Management
├── Vendor Management
├── Task Management
└── Timeline Management

---

# Shared Data Architecture

Vendor Management
        │
        │ Shared Vendor Database
        │
Budget Management

Vendor data should only exist in one place.

Budget references Vendor records instead of duplicating vendor information.

---

# Module Relationship

Wedding Profile
    ↓
Guest
    ↓
RSVP

Vendor
    ↔
Budget

Task
Timeline

---

# Future Backend

Firebase Authentication

Firestore

Storage

Cloud Functions (Future)

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
- Vendor information is maintained in one place only.

Vendor owns:

- Category
- Vendor Name
- Vendor Website
- Vendor Facebook
- Vendor Instagram
- Vendor PIC Name
- Vendor PIC Contact
- Default Package Details
- Notes

Budget owns:

- Expense Name
- Package Details
- Payment Information
- Invoice Number
- Receipt
- Payment Status
- Notes

## Live Rundown Management

The Live Rundown module is designed for wedding day operations.

Unlike a traditional timeline, the Live Rundown is intended to be updated in real time during the event.

Primary users

- Wedding Planner
- Wedding Coordinator
- Event Crew

Future capabilities

- Adjust event timings during the wedding
- Automatically shift subsequent events
- Track current event progress
- Coordinate vendors and crew
- Display live event status


## Task Management

Task Management is designed for wedding preparation before the event.

Responsibilities

- Planning tasks
- Task assignment
- Progress tracking
- Due dates
- Priority
- Status

Task Structure

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

Related Vendor is optional and references the shared Vendor database.

Task data remains independent from Budget Management.

---

## Live Rundown

Live Rundown is a separate module designed for wedding day operations.

Responsibilities

- Wedding day schedule
- Ceremony flow
- Banquet flow
- Real-time adjustments
- Live event progress

---

## Task Management & Live Rundown

Task Management and Live Rundown are independent modules.

Task Management focuses on wedding preparation.

Live Rundown focuses on wedding day execution.

No direct relationship will be implemented during the Foundation phase.

Future integration, if required, will be evaluated during the Business Logic phase based on real user workflows.

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

Role-based Viewing

Each rundown event can be assigned to one or more Responsible Roles.

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

Future Business Logic

Users may switch between:

- Full Rundown
- My Rundown

My Rundown displays only the events assigned to the selected role.

Example

Role: DJ

Displays only events requiring DJ attention.

Role: Photographer

Displays only photography-related events.

Role: Coordinator

Displays the complete rundown.

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

## Current Time Marker (Current Event)

Purpose

Provide all users with a clear indication of the current event during live wedding operations.

The Current Time Marker helps every participant immediately understand:

- Which event is currently in progress.
- Which event is next.
- Which events have already been completed.

This feature improves communication and reduces the need for verbal updates during the event.

---

Display States

✔ Completed

▶ Current Event

○ Upcoming

Example

✔ 6:50 PM  Guest Registration

✔ 7:00 PM  Couple Arrival

▶ 7:10 PM  First March In

○ 7:20 PM  Opening Speech

○ 7:30 PM  First Course

---

Behavior

The Current Event is updated by the Planner or Coordinator.

Any change is synchronized to all connected users in real time.

When the event schedule is adjusted, the Current Time Marker automatically reflects the updated sequence.

---

Implementation Phase

Phase 3 — Business Logic

Dependencies

- Live Rundown
- Real-time synchronization
- Event Status

