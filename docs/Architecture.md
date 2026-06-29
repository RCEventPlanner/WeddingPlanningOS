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

