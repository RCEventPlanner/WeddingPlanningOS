# Wedding Planning OS Roadmap

## Phase 1 — Foundation ✅

Status: Completed

Completed

- ✅ Application Layout
- ✅ Sidebar Navigation
- ✅ Top Navigation
- ✅ Dashboard
- ✅ Reusable Components
- ✅ UI State Components

Goal

Build a reusable UI foundation shared by all business modules.

---

## Phase 2 — Core Business Modules

Develop every module using placeholder data and reusable components only.

No Firebase.
No CRUD.
No Business Logic.

---

### ✅ Module 1 — Wedding Profile

Status: Foundation Completed

- ✅ Wedding Profile Card
- ✅ Wedding Information Form
- ✅ Wedding Information View
- ✅ Wedding Statistics

---

### ✅ Module 2 — Guest Management

Status: Foundation Completed

- ✅ Guest Overview
- ✅ Guest Form
- ✅ Guest Detail
- ✅ Guest Statistics

---

### ✅ Module 3 — RSVP Management

Status: Foundation Completed

- ✅ RSVP Overview
- ✅ RSVP Form
- ✅ RSVP Detail
- ✅ RSVP Statistics

---

### ✅ Module 4 — Budget Management

Status: Foundation Completed

- ✅ Budget Overview
- ✅ Budget Form
- ✅ Budget Detail
- ✅ Budget Filters

Architecture

- Shared Vendor Database Ready

---

### ✅ Module 5 — Vendor Management

Status: Foundation Completed

- ✅ Vendor Overview
- ✅ Vendor Form
- ✅ Vendor Detail
- ✅ Vendor Statistics

Architecture

- Shared Vendor Database
- Budget Integration Ready

---

### ✅ Module 6 — Budget × Vendor Integration

Status: Foundation Completed

Completed

- ✅ Shared Vendor Selection
- ✅ Shared Vendor Information
- ✅ Shared Vendor UI Standardization
- ✅ Shared Vendor Architecture (UI Foundation)

Goal Achieved

Budget Management and Vendor Management now share a unified Vendor UI and data structure.

Scope

- Shared Vendor Dropdown
- Shared Vendor Information
- Shared Vendor Architecture
- UI Foundation Only

No Firebase.
No CRUD.
No business logic has been implemented in this phase.

---

### ✅ Module 7 — Task Management

Foundation

Status: Foundation Completed

Completed

- ✅ Task Overview
- ✅ Task Form
- ✅ Task Detail
- ✅ Task Statistics

Architecture

- Independent module
- Optional Vendor reference
- No dependency on Live Rundown
- UI Foundation only

Goal Achieved

Task Management Foundation is complete and follows the shared Design System, reusable components, and placeholder data architecture.

---

### Module 8 — Live Rundown Management

Foundation

- Live Rundown Overview
- Rundown Schedule
- Rundown Event Detail
- Rundown Statistics

Goal

Provide a real-time wedding day rundown for planners and coordinators.

Features (Future)

- Live event timeline
- Real-time schedule adjustments
- Drag-and-drop event reordering
- Delay tracking
- Instant time recalculation
- Staff assignments
- Vendor coordination
- Ceremony & banquet flow
- Progress tracking
- Mobile-friendly interface

Architecture

- Linked to Wedding Profile
- Linked to Vendor Management
- Linked to Task Management
- Shared event schedule
- Designed for real-time operation on the wedding day

---

Goal

Every module should include

- Placeholder Data
- Responsive Layout
- Reusable Components
- Consistent Design System

No business logic during this phase.

# Wedding Planning OS Roadmap Update 30/06/2026

## Vision

Wedding Planning OS is an all-in-one wedding planning and live operation platform.

The system supports the complete wedding lifecycle, from planning to wedding-day execution.

Development follows a feature-first approach.

Foundation is completed before Business Logic and Backend implementation.

---

## Phase 1 — Foundation ✅

Status: In Progress

Goal

Build reusable UI foundations using placeholder data only.

No Firebase.

No CRUD.

No Business Logic.

Completed

- ✅ Application Layout
- ✅ Sidebar Navigation
- ✅ Top Navigation
- ✅ Dashboard
- ✅ Reusable Components
- ✅ Design System

Core Modules

- ✅ Module 1 — Wedding Profile
- ✅ Module 2 — Guest Management
- ✅ Module 3 — RSVP Management
- ✅ Module 4 — Budget Management
- ✅ Module 5 — Vendor Management
- ✅ Module 6 — Budget × Vendor Integration
- ✅ Module 7 — Task Management
- 🔄 Module 8 — Live Rundown

---

## Phase 2 — Live Rundown MVP (Highest Priority)

Goal

Deliver the first production-ready feature that can be used during real weddings.

This phase has the highest development priority after Foundation.

---

### 2.1 Authentication

Support secure login.

User Types

- Planner
- Coordinator
- Couple
- Vendor User

---

### 2.2 Wedding Workspace

Each wedding is an independent workspace.

Example

RC Event Planner
↓
Jason & Emily Wedding
↓
Wedding Dashboard
↓
Modules

Each user only accesses weddings they are assigned to.

---

### 2.3 User Management

Manage wedding members.

Examples

- Planner
- Coordinator
- Bride
- Groom
- Vendor Users

Planner manages all members.

---

### 2.4 Role Management

Default Roles

- Planner
- Coordinator
- Couple
- Vendor

Roles define default permissions.

---

### 2.5 Permission Management

Permissions are configurable.

Permissions should NOT be hardcoded.

Planner can customize permissions for every member.

Example

Coordinator A

- View Guest
- View Budget
- Edit Live Rundown

Coordinator B

- View Live Rundown
- No Edit Permission

Vendor User

- View Live Rundown only

---

### Permission Matrix (Default)

| Module | Planner | Coordinator | Couple | Vendor |
|----------|:-------:|:-----------:|:------:|:------:|
| Dashboard | Edit | View | View | View |
| Wedding Profile | Edit | View | Edit | No Access |
| Guest | Edit | View | Edit | No Access |
| RSVP | Edit | View | Edit | No Access |
| Budget | Edit | View | Edit | No Access |
| Vendor | Edit | View | Edit | No Access |
| Task | Edit | View | Edit | No Access |
| Live Rundown | Edit | View* | View | View |

*Edit permission for Coordinators is configurable.

---

### 2.6 Live Rundown

Highest Priority Feature

The Live Rundown replaces the traditional Excel rundown sheet.

Purpose

Support real-time wedding day operations.

Foundation Structure

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

---

### Live Rundown Principles

#### One Shared Live Rundown

Every participant can access the complete rundown.

The Full Rundown is the primary operational view.

---

#### My Rundown (Optional)

Users may switch to:

My Rundown

This filters events based on Responsible Roles.

This is a convenience feature.

It does NOT restrict access to the Full Rundown.

---

#### Responsible Roles

Each event may have multiple Responsible Roles.

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

---

#### Coordinator

Coordinator represents the primary person responsible for coordinating that event.

---

#### Editing Principle

Only authorized users may edit the Live Rundown.

Default

Planner

Coordinator (if granted permission)

Editable Fields

- Time
- Used Time
- Status
- Remarks
- Event Order

Every update is synchronized immediately.

---

#### Real-time Synchronization

Changes made by authorized users are reflected instantly.

Every connected user sees the latest rundown.

---

#### Current Event Marker

Future Feature

Highlight

✔ Completed

▶ Current Event

○ Upcoming

Purpose

Help everyone immediately understand the current wedding progress.

Dependencies

- Live Status
- Real-time Synchronization

---

#### Mobile-first Design

Live Rundown is primarily designed for:

- Mobile Phones
- Tablets

Desktop remains fully supported.

---

## Phase 3 — Core Business Logic

After Live Rundown MVP is stable.

Modules

- Wedding Profile
- Guest
- RSVP
- Budget
- Vendor
- Task

Business Logic

- CRUD
- Search
- Filter
- Sorting
- Pagination
- Validation

---

## Phase 4 — Firebase & Backend

Authentication

Firestore

Storage

Realtime Database

Cloud Functions (Future)

Features

- CRUD
- File Upload
- Real-time Sync
- Wedding Workspace
- User Permissions

---

## Phase 5 — UI / UX Polish

Improve

- Responsive Layout
- Animations
- Empty States
- Loading
- Error States
- Accessibility
- Toast Notifications
- Better User Flow

---

## Phase 6 — Production Release

Production Ready

- Security
- Performance
- Testing
- Bug Fixes
- Mobile Optimization
- Vercel Deployment
- Monitoring

---

## Development Principles

Every module follows the same workflow.

### Part 1 — Foundation

- UI Structure
- Reusable Components
- Placeholder Data

### Part 2 — Business Logic

- CRUD
- Search
- Filter
- Validation

### Part 3 — Backend

- Firebase
- Firestore
- Authentication

### Part 4 — Polish

- UX
- Responsive
- Accessibility
- Animations

---

## Development Workflow

For every completed Part

1. npm run build
2. git status
3. git add .
4. git commit
5. git push
6. Update DEVLOG.md
7. Update ROADMAP.md

---

## Long-term Architecture Principles

- One Wedding = One Workspace
- Full Rundown is always available to every wedding member.
- My Rundown is an optional filtered view.
- Permissions are configurable per user.
- Roles provide default permissions only.
- Planner manages members and permissions.
- Live Rundown is the first production-ready feature.
- Other planning modules continue evolving after the MVP is deployed.