# Wedding Planning OS Roadmap 01/07/2026

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

# Milestones

## M1 — Foundation Complete

- Core UI
- Dashboard
- Live Rundown Foundation
- Workspace Foundation
- Settings Foundation

## M2 — Live Rundown MVP

- Authentication
- Workspace
- Members
- Permissions
- Live Rundown
- Realtime Collaboration

## M3 — Planning Modules Business Logic

- Guest
- RSVP
- Budget
- Vendor
- Task

## M4 — Production Release

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
- Table Assignment Foundation
- Assigned Table Field
- Table List Foundation
- Unassigned Guests State
- Simple Table Assignment UI

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

#### ✅ Module 8 — Live Rundown

Completed

Part 1  
Foundation ✅

Part 2  
Mobile Responsive Layout ✅

Part 3  
Time Management UI ✅

Part 4  
Status Workflow ✅

Part 5  
Timeline Shift UI ✅

Part 6  
Timeline Shift Logic ✅

Part 7  
My Rundown ✅

Part 8  
Realtime Sync Foundation ✅

Goal

Replace the traditional Excel wedding rundown with a mobile-first collaborative wedding operation system.

Completed Foundation includes:

- Mobile Responsive Layout
- Time Management
- Status Workflow
- Timeline Shift
- My Rundown
- Realtime Foundation

Architecture

- Linked to Wedding Profile
- Linked to Vendor Management
- Independent from Task Management
- Designed for real-time wedding-day operations

---

#### ✅ Module 9 — Dashboard

Completed

Features

- Wedding Dashboard
- Wedding Overview
- Statistics Cards
- Upcoming Tasks
- Quick Actions
- Responsive Layout

Product Decision

Dashboard provides a high-level overview only.

Operational workflows belong to Live Rundown.

---

#### ✅ Module 10 — Workspace Foundation

Completed

Features

- Wedding Workspace List
- Create Wedding UI
- Internal Remarks Field
- Workspace Switcher
- Workspace Settings Preview
- Archive Wedding UI
- Responsive Workspace Layout

Architecture

- UI Foundation Only
- Placeholder Data Only
- No Business Logic
- No Firebase Integration

---

#### 🔄 Module 10 — Workspace Foundation

Current

Planned Features

- Wedding Workspace List
- Create Wedding
- Archive Wedding
- Workspace Switcher
- Workspace Settings
- Placeholder Data
- Responsive Layout

---

#### ✅ Module 11 — Settings Foundation

Completed

Features

- Company Profile
- Wedding Settings
- Appearance Settings
- System Preferences
- About
- Placeholder Data
- Responsive Layout

---

# Phase 2 — Authentication & Permissions

**Status:** Planned

## Module 12 — Authentication Foundation

Goal

Implement secure login and user session foundation.

Supported User Types

- Planner
- Coordinator
- Couple
- Vendor User

Completed Features

- Login UI
- Register UI
- Forgot Password UI
- Shared Authentication Layout
- Auth Context Structure
- Protected Route Structure
- Public Route Structure
- Placeholder Authentication State
- Firebase Authentication Preparation

---

## Module 13 — Wedding Members Foundation

Goal

Manage all members inside a Wedding Workspace.

Completed Features

- Wedding Members List
- Invite Member UI
- Member Detail Preview
- Role Badges
- Status Badges
- Placeholder Data
- Responsive Layout
- Workspace-page-aligned system management layout
- Invite Member card moved to top as primary action
- Two-column Member List + Member Details structure
- Single-click list selection and double-click Roles & Permissions panel behavior
- Member Summary card removed from Member Management page

Examples

- Planner
- Coordinator
- Bride
- Groom
- Vendor User

Planner manages all members.

---

## ✅ Module 14 — Permission Management Foundation

Goal

Create a configurable permission system.

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

Completed Features

- Permission Levels: No Access, View, Edit, Manage
- Module + Action Permission Structure
- Role Default Permissions (Planner, Coordinator, Couple, Vendor)
- User Override Permissions per Member
- Permission Matrix UI
- Role Templates UI
- User Override Panel UI
- Permission Summary UI
- Member Permission Preview UI
- UI Foundation Only (No Enforcement, No Firebase)

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

## ✅ Module 15 — Live Rundown Permission Integration

Goal

Connect permission rules to Live Rundown operations.

Planned Permissions

- View Live Rundown
- Edit Event
- Edit Status
- Edit Time
- Edit Remarks
- Delete Event
- Recalculate Timeline

Only Planner and authorized Coordinators can edit the event schedule.

All assigned wedding members can view Full Rundown.

My Rundown remains an optional filtered view based on Responsible Roles.

Completed Features

- Integrated Permission Foundation into Live Rundown UI behavior
- Added permission visibility rendering for Planner, Coordinator, Couple, and Vendor User preview
- Added Coordinator edit-bundle preview to demonstrate hidden actions when Edit is not granted
- Hid unavailable actions instead of disabling buttons (Edit Event, Delete Event, Edit Status, Edit Time, Edit Remarks, Recalculate Timeline)
- Added Public Remarks and Internal Remarks presentation
- Internal Remarks visible only to Planner and authorized Coordinator preview
- Updated mobile and desktop action menus/buttons to follow permission visibility
- Preserved Full Rundown as default and My Rundown as optional filtered view
- UI Foundation Only (No Firebase, No backend authorization)

---

## ✅ Module 15.5 — Navigation & Workspace Experience Foundation

Goal

Refine the overall navigation and workspace experience before Firebase integration.

Completed Features

- Global Navigation foundation for Planner / Master Account
- Workspace-only navigation experience for Couple and Vendor
- Fixed Workspace Navigation order
- Responsive Sidebar with collapse / expand behavior
- Mobile Drawer sidebar behavior
- Sidebar header branding without workspace name
- Workspace-aware top bar with current workspace information
- Search placeholder, notification placeholder, and user menu
- User menu actions: My Profile, Switch Workspace, Settings, Logout
- Workspace List preview and double-click enter flow
- Workspace access mode placeholders: Active, Read Only, Archived
- Read Only UI behavior foundation for hidden edit/delete/invite/timeline actions
- UI-only navigation architecture with no backend or Firebase integration
- Global Navigation refinement for system pages (Members Management, Settings)
- Removed Wedding Overview card from system-level pages
- Removed workspace summary/details surfaces from system-level pages
- Preserved sidebar, top header, search, notifications, user menu, and responsive behavior

---

## Module 16 — Live Rundown MVP Realtime Collaboration

Goal

Deliver production-ready Live Rundown collaboration.

Core Features

- Shared Full Rundown
- My Rundown
- Responsible Roles
- Current Event Marker
- Real-time Schedule Updates
- Mobile-first Experience
- Live Synchronization
- Instant Schedule Refresh

---

# Phase 1
UI Foundation ✅

**Status:** Completed

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


# Phase 2
Authentication & Permissions

---

# Phase 3 — Firebase & Realtime

**Status:** Planned

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

# Phase 4
MVP Internal Testing

--- 

# Phase 5 — UI / UX Polish

**Status:** Planned

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

**Status:** Planned

Prepare Wedding Planning OS for production deployment.

Includes

- Security
- Performance Optimization
- Testing
- Bug Fixes
- Mobile Optimization
- Monitoring
- Deployment

---

# Current Development Priority

Priority 1

Module 10 — Workspace Foundation

↓

Priority 2

Module 11 — Settings Foundation

↓

Priority 3

Module 12 — Authentication Foundation

↓

Priority 4

Module 13 — Wedding Members Foundation

↓

Priority 5

Module 14 — Permission Management Foundation

↓

Priority 6

Module 15 — Live Rundown Permission Integration

↓

Priority 7

Module 16 — Live Rundown Realtime Collaboration

↓

Priority 8

Business Logic for Planning Modules

↓

Priority 9

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

Dashboard is included as the project overview entry point.

Live Rundown remains the primary operational module.

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

Copilot should not update DEVLOG.md.

DEVLOG.md is updated manually by the project owner.

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
- Dashboard provides project overview only.
- Operational workflows belong to Live Rundown.
- Avoid duplicated information across modules.
- Every piece of information should have a single source of truth.
- Mobile-first experience is required for Live Rundown.
