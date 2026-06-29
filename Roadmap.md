# Development Strategy

The project follows a feature-first development approach.

During development, UI duplication and placeholder content are acceptable.
The priority is to complete all core business modules before performing large-scale UI/UX refinements.

After all core features are implemented, a dedicated UI/UX Polish phase will refine layouts, interactions, animations, editing workflows, and overall user experience.

---

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

### 🔄 Module 5 — Vendor Management

Status: Foundation In Progress

- ⏳ Vendor Overview
- ⏳ Vendor Form
- ⏳ Vendor Detail
- ⏳ Vendor Statistics

Architecture

- Shared Vendor Database
- Budget Integration Ready

---

### ⏳ Module 6 — Task Management

Foundation

- Task Board
- Task Form
- Task Detail
- Task Statistics

---

### ⏳ Module 7 — Timeline Management

Foundation

Wedding Day Timeline

- Timeline Overview
- Timeline Form
- Event Detail
- Timeline Statistics

---

Goal

Every module should include:

- Placeholder Data
- Responsive Layout
- Reusable Components
- Consistent Design System

No business logic during this phase.

---

## Phase 3 — Business Logic & Backend

After ALL modules are completed.

### Business Logic

- Search
- Filter
- Sorting
- Pagination
- CRUD
- Form Validation
- State Management

### Backend

- Firebase Authentication
- Firestore Database
- File Storage
- CRUD Operations
- Real-time Dashboard

Goal

Replace placeholder data with fully functional application logic.

---

## Phase 4 — UI / UX Polish

After all modules are functional.

### Improvements

- View / Edit Mode
- Better User Flow
- Responsive Optimization
- Typography
- Icons
- Loading States
- Empty States
- Error States
- Toast Notifications
- Modal Dialogs
- Accessibility
- Micro Animations
- Consistent Spacing

Goal

Transform the prototype into a polished SaaS application.

---

## Phase 5 — Production Ready

- Settings
- Notifications
- Security
- Performance Optimization
- Testing
- Bug Fixes
- Mobile Optimization
- Deployment (Vercel)

Goal

Prepare Wedding Planning OS for production release.

---

# Development Principles

Every module follows the same workflow.

## Part 1 — Foundation

- Page Structure
- Reusable Components
- Placeholder Data

## Part 2 — Business Logic

- Search
- Filter
- CRUD
- Validation
- State Management

## Part 3 — Backend

- Firebase
- Firestore
- Authentication
- File Storage

## Part 4 — Polish

- UX Improvements
- Responsive Design
- Accessibility
- Animations

---

# Development Workflow

Every completed Part follows this checklist:

1. npm run build
2. git status
3. git add .
4. git commit
5. git push
6. Update DEVLOG.md
7. Update ROADMAP.md

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

---

# Shared Architecture

## Shared Vendor Database

Budget Management and Vendor Management share the same Vendor database.

Vendor information should only be maintained in one place.

Shared Vendor Fields

- Category
- Vendor Name
- Vendor Website
- Vendor Facebook
- Vendor Instagram
- Vendor PIC Name
- Vendor PIC Contact

Budget-specific Fields

- Expense Name
- Package Details
- Payment Information
- Invoice Number
- Receipt
- Notes

Goal

Budget records reference Vendor records instead of duplicating vendor information.

---

# Demo Data Standard

All placeholder data across the project should use the same demo dataset.

Do not create duplicate vendor names unless necessary.

If a sample vendor already exists, reuse it throughout the project.

Refer to:

docs/DemoData.md