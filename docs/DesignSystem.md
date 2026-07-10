# Wedding Planning OS – Design System

Version: 1.0
Last Updated: 2026-07-10

---

# Design Philosophy

Wedding Planning OS follows a unified SaaS design system.

Every business module should provide the same user experience, interaction pattern and page structure.

Goals:

- Consistent UI
- Reusable Components
- Minimal Learning Curve
- Mobile Friendly
- Future Firebase Ready

---

# Standard Module Layout

All business modules should follow the same layout.

```
Module Header

↓

Statistics

↓

Advanced Filters

↓

Listing / Table
```

No module should have duplicated search sections or permanently visible forms.

---

# Module Header

Every module should begin with the standardized header.

Left

- Page Title
- Short Description

Right

- Search
- Primary Action Button

Example

Guest
Search Guests
Add Guest

Budget
Search Expenses
Add Expense

Vendor
Search Vendors
Add Vendor

Task
Search Tasks
Add Task

RSVP
Search RSVP
Send Invitation

Live Rundown
Search Events
Add Event

---

# Search

Search always belongs in the Header.

Never create another standalone Search card.

Search should support keyword searching only.

Advanced filtering belongs to the Filters section.

---

# Statistics

Statistics always appear below the Module Header.

Purpose:

- Quick overview
- Current module summary

Examples:

Guest
- Total Guests
- Confirmed
- Pending
- Declined

Budget
- Total Budget
- Paid
- Remaining
- Outstanding

Vendor
- Total Vendors
- Confirmed
- Pending

Task
- Total Tasks
- Completed
- Overdue

---

# Advanced Filters

Filters appear below Statistics.

Keep filters minimal.

Prefer dropdown filters.

Examples:

Budget
- Category
- Payment Status

Guest
- RSVP Status
- Guest Group

Vendor
- Category
- Status

Task
- Priority
- Status

---

# Listing / Table

The Listing is the primary workspace.

Users spend most of their time here.

Requirements:

- Responsive
- Searchable
- Sortable (Future)
- Pagination (Future)

Each row includes:

- Information
- Status
- Actions

---

# CRUD Workflow

Every module follows exactly the same workflow.

---

## Create

Header

↓

Add Button

↓

Popup Modal

↓

Reusable Form

↓

Save / Cancel

Never navigate to another page.

---

## View

Listing

↓

View

↓

Popup Modal

↓

Reusable Detail Component

Read-only.

---

## Edit

Listing

↓

Edit

↓

Reusable Form Modal

↓

Save / Cancel

Reuse the Create Form.

Do not build separate Edit Forms.

---

## Delete

Listing

↓

Delete

↓

Confirmation Dialog

↓

Delete

Always require confirmation.

---

# Popup / Modal Rules

Use popup modals for:

- Add
- View
- Edit

Requirements:

- Scrollable
- Responsive
- Close Button
- ESC Support
- Click Outside to Close (where appropriate)

Never duplicate components.

---

# Component Reuse

Always reuse existing components.

Examples:

GuestForm

used for:

- Add Guest
- Edit Guest

GuestDetailCard

used for:

- View Guest

BudgetForm

used for:

- Add Expense
- Edit Expense

BudgetDetailCard

used for:

- View Expense

Apply the same principle across every module.

---

# Responsive Rules

Desktop

- Two-column layouts where appropriate
- Statistics in one row
- Filters in one row

Tablet

- Reduce columns
- Allow horizontal table scrolling

Mobile

- Stack vertically
- Large touch targets
- Full-screen modals where appropriate

---

# Color System

## Permission

No Access
Red

View
Blue

Edit
Cyan

Management
Orange-Brown

---

## System Role

Planner
Orange-Brown

Coordinator
Brown

Couple
Cyan

Couple Family / Friend
Teal

Vendor
Blue

---

# Workspace Design Principles

Dashboard

Dashboard is an overview page only.

Should contain:

- Wedding Overview
- Statistics
- Progress
- Quick Actions

Do not place operational data here.

---

Notification Center

Notification Center is the single location for:

- Recent Activity
- System Notifications
- Wedding Reminders

Opens from the Top Navigation.

Uses a right-side slide-out drawer.

---

## Future Wedding Day Operations

### Table Assignment

Table Assignment remains a child page of RSVP Management.

Requirements:

- Preserve Workspace Top Header
- Preserve Workspace Sidebar
- Keep RSVP as the active navigation item
- Use two main areas: Table List and RSVP Guest Cards
- Support future drag-and-drop interaction
- Display a Future Modules information card at the bottom

### Floor Plan

Future Floor Plan UI should:

- Remain inside the Workspace layout
- Open as a child workflow from RSVP or Table Assignment
- Not become a separate Global Navigation module
- Use the uploaded venue image as the visual canvas
- Overlay reusable table components on the image
- Reuse existing Table Assignment data
- Support desktop and tablet as the primary editing experience
- Provide a simplified read-only mobile experience where necessary

### Wedding Day Check-in

Future Check-in UI should prioritize:

- Fast guest search
- Large touch targets
- Clear check-in state
- Assigned-table visibility
- Adults and children count
- Meal-preference visibility
- Real-time summary statistics
- Mobile and tablet operation

Suggested page structure:

Check-in Header
→ Live Attendance Statistics
→ Guest Search and Filters
→ Guest Check-in Listing
→ Guest Detail or Check-in Modal

### Future Module Placeholder

Before these modules are implemented:

- Show them only as non-clickable future-module labels.
- Do not add empty Sidebar items.
- Do not add inactive routes.
- Do not create fake working buttons.
- Clearly mark them as planned features.

---

Workspace Navigation

User Menu

Planner

- My Wedding Profile
- Switch Workspace
- Logout

Coordinator

- My Wedding Profile
- Switch Workspace
- Logout

Vendor

- My Wedding Profile
- Switch Workspace
- Logout

Couple

- My Wedding Profile
- Logout

---

My Wedding Profile

Current Wedding Settings.

Displayed as a popup modal.

Organized using tabs.

Contains:

- Wedding
- Groom
- Bride
- Family
- Preferences

---

# Single Source of Truth

Every piece of information should exist in only one place.

Examples:

Wedding Information

↓

My Wedding Profile

Guest

↓

Guest Management

Vendor

↓

Vendor Management

Permission Templates

↓

Default Permission Profiles

Avoid duplicated data across modules.

---

# Future Development Principles

When creating a new module:

Always follow:

Header

↓

Statistics

↓

Filters

↓

Listing

↓

View Modal

↓

Edit Modal

↓

Delete Confirmation

No exceptions unless there is a strong product reason.

---

# UI Consistency Rule

If a new interaction is introduced, ask:

Can an existing interaction already solve this?

If yes,

Reuse it.

Do not create another UI pattern.

Consistency is preferred over creativity.

---

# Design Goal

Users should only need to learn one workflow.

Once a user understands one module, they should immediately understand every other module.