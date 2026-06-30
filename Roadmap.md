# Wedding Planning OS Roadmap 30/06/2026

---

# Vision

Wedding Planning OS is an all-in-one wedding planning and wedding-day operation platform.

The system supports the complete wedding lifecycle, from planning and preparation to live wedding-day execution.

The development strategy is to build reusable foundations first, then deliver a production-ready Live Rundown MVP before completing the remaining business logic.

---

# Development Strategy

The project follows a feature-first development approach.

Every business module is first developed as a reusable UI foundation using placeholder data.

Business logic, backend integration, and production features are implemented only after the UI foundation is complete.

After all foundation modules are completed, development priority shifts to the Live Rundown MVP, which is the first production-ready feature of Wedding Planning OS.

---

# Phase 1 — UI Foundation

**Status:** In Progress

## Goal

Build reusable UI foundations shared across all business modules.

Current phase includes:

- Placeholder Data
- Reusable Components
- Responsive Layout
- Shared Design System

No Firebase.

No CRUD.

No Business Logic.

---

## Foundation Completed

### Application Foundation

- ✅ Application Layout
- ✅ Sidebar Navigation
- ✅ Top Navigation
- ✅ Dashboard
- ✅ Reusable Components
- ✅ UI State Components
- ✅ Shared Design System

---

### Core Modules

#### ✅ Module 1 — Wedding Profile

Completed

- Wedding Information
- Wedding Details
- Wedding Statistics

---

#### ✅ Module 2 — Guest Management

Completed

- Guest Overview
- Guest Form
- Guest Detail
- Guest Statistics

---

#### ✅ Module 3 — RSVP Management

Completed

- RSVP Overview
- RSVP Form
- RSVP Detail
- RSVP Statistics

---

#### ✅ Module 4 — Budget Management

Completed

- Budget Overview
- Budget Form
- Budget Detail
- Budget Filters

Architecture

- Shared Vendor Database Ready

---

#### ✅ Module 5 — Vendor Management

Completed

- Vendor Overview
- Vendor Form
- Vendor Detail
- Vendor Statistics

Architecture

- Shared Vendor Database
- Budget Integration Ready

---

#### ✅ Module 6 — Budget × Vendor Integration

Completed

- Shared Vendor Selection
- Shared Vendor Information
- Shared Vendor UI Standardization
- Shared Vendor Architecture

Goal Achieved

Budget Management and Vendor Management now share a unified Vendor data structure and UI foundation.

---

#### ✅ Module 7 — Task Management

Completed

- Task Overview
- Task Form
- Task Detail
- Task Statistics

Architecture

- Independent Module
- Optional Vendor Reference
- Shared Design System
- UI Foundation Only

---

#### 🔄 Module 8 — Live Rundown Management

Status: In Progress

Foundation

- Live Rundown Board
- Event Form
- Event Detail
- Rundown Statistics

Goal

Replace the traditional Excel wedding rundown with a real-time collaborative wedding operation system.

Architecture

- Linked to Wedding Profile
- Linked to Vendor Management
- Independent from Task Management
- Designed for real-time wedding-day operations

---

# Phase 2 — Production MVP (Highest Priority)

**Goal**

Deliver the first production-ready version of Wedding Planning OS that can be used during real weddings.

The MVP focuses on wedding-day collaboration rather than completing every planning module.

---

## 2.1 Authentication

Implement secure login.

Supported User Types

- Planner
- Coordinator
- Couple
- Vendor User

---

## 2.2 Wedding Workspace

Each wedding is an independent workspace.

Example

RC Event Planner

↓

Jason & Emily Wedding

↓

Wedding Dashboard

↓

Wedding Modules

Each user can only access weddings they are assigned to.

---

## 2.3 User Management

Manage all wedding members.

Examples

- Planner
- Coordinator
- Bride
- Groom
- Vendor Users

Planner manages all members.

---

## 2.4 Permission Management

Role-based permissions with per-user customization.

Default Roles

- Planner
- Coordinator
- Couple
- Vendor

Permissions are configurable and should never be hardcoded.

Planner can customize permissions for every member individually.

Example

Coordinator A

- View Guest
- View Budget
- Edit Live Rundown

Coordinator B

- View Live Rundown Only

Vendor User

- View Live Rundown Only

---

### Default Permission Matrix

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

\* Coordinator edit permission is configurable.

---

## 2.5 Live Rundown MVP

Highest Priority Feature

The Live Rundown is the first production-ready feature of Wedding Planning OS.

Purpose

Provide a real-time wedding-day operation platform for planners, coordinators, couples, and vendors.

Core Features

- Shared Full Rundown
- My Rundown (Optional Role Filter)
- Responsible Roles
- Current Event Marker
- Real-time Schedule Updates
- Mobile-first Experience
- Live Synchronization

Only Planner and authorized Coordinators can edit the event schedule.

All users immediately receive updated rundown information.

---

## 2.6 Real-time Collaboration

Implement:

- Real-time Synchronization
- Live Status Updates
- Shared Wedding Timeline
- Current Event Marker
- Instant Schedule Refresh

---

# Phase 3 — Planning Module Business Logic

Begin after the Live Rundown MVP is production-ready.

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
- State Management

---

# Phase 4 — Firebase & Backend

Implement backend infrastructure.

Authentication

- Firebase Authentication

Database

- Firestore

Storage

- Firebase Storage

Realtime

- Firestore Realtime
- Live Synchronization

Future

- Cloud Functions

Features

- Authentication
- CRUD
- File Upload
- Wedding Workspace
- User Permissions
- Real-time Collaboration

---

# Phase 5 — UI / UX Polish

Improve overall user experience.

Includes

- Responsive Optimization
- Better User Flow
- Loading States
- Empty States
- Error States
- Toast Notifications
- Accessibility
- Typography
- Icons
- Micro Animations
- Consistent Spacing

---

# Phase 6 — Production Release

Prepare Wedding Planning OS for production deployment.

Includes

- Security
- Performance Optimization
- Testing
- Bug Fixes
- Mobile Optimization
- Monitoring
- Deployment (Vercel)

---

# Current Development Priority

Priority 1

Complete Module 8 — Live Rundown Foundation

↓

Priority 2

Authentication

↓

Priority 3

Wedding Workspace

↓

Priority 4

User & Permission Management

↓

Priority 5

Live Rundown Realtime Collaboration

↓

Priority 6

Business Logic for Planning Modules

↓

Priority 7

Production Release

---

# MVP Definition

The first public release of Wedding Planning OS focuses on real wedding-day operations.

The MVP includes:

- Authentication
- Wedding Workspace
- User Management
- Permission Management
- Live Rundown
- Real-time Synchronization

Planning modules such as Guest, RSVP, Budget, Vendor, and Task will continue to evolve after the MVP has been released.

---

# Development Principles

Every module follows the same development workflow.

## Part 1 — Foundation

- UI Structure
- Reusable Components
- Placeholder Data

---

## Part 2 — Business Logic

- CRUD
- Search
- Filter
- Sorting
- Validation
- State Management

---

## Part 3 — Backend

- Firebase Authentication
- Firestore
- File Storage
- Real-time Database

---

## Part 4 — Polish

- UX Improvements
- Responsive Design
- Accessibility
- Animations

---

# Development Workflow

For every completed development part:

1. npm run build
2. git status
3. git add .
4. git commit
5. git push
6. Update DEVLOG.md
7. Update ROADMAP.md

---

# Long-term Architecture Principles

- One Company can manage multiple Weddings.
- One Wedding is one independent Workspace.
- Every Wedding has its own Members, Vendors, Guests, Budgets, Tasks, and Live Rundown.
- Full Rundown is always available to every assigned wedding member.
- My Rundown is an optional filtered view based on Responsible Roles.
- Roles provide default permissions only.
- Permissions are configurable per user.
- Planner manages members and permissions.
- Only authorized users may edit the Live Rundown schedule.
- Live Rundown is the core feature and first production-ready module of Wedding Planning OS.
- Remaining planning modules continue to evolve after the MVP is deployed.