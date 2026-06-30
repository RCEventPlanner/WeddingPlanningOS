# Wedding Planning OS Design System

---

# Design Philosophy

Wedding Planning OS follows a modern SaaS dashboard design focused on clarity, consistency, and efficiency.

The interface should minimize learning time while supporting both long-term wedding planning and real-time wedding-day operations.

Every module should feel like part of the same product by sharing layouts, spacing, components, and interaction patterns.

---

# Core Design Principles

- Consistency over creativity
- Reusable components first
- Mobile-friendly design
- Clear information hierarchy
- Minimal visual noise
- Fast data entry
- Easy scanning during live operations

---

# Theme

Modern SaaS Dashboard

Style

- Clean
- Minimal
- Professional
- Spacious
- Data-focused

---

# Color System

## Primary

Used for:

- Primary Actions
- Active Navigation
- Selected Items

---

## Secondary

Used for:

- Secondary Actions
- Supporting UI

---

## Success

Used for:

- Success Messages
- Completed Status
- Positive Statistics

---

## Warning

Used for:

- Pending
- Attention Required
- Upcoming Events

---

## Danger

Used for:

- Delete Actions
- Errors
- Critical Warnings

---

## Neutral

Used for:

- Borders
- Backgrounds
- Disabled States
- Placeholder Content

---

# Layout System

Every page should follow the same structure.

```
Page Title

↓

Statistics Cards (Optional)

↓

Toolbar

↓

Main Content

↓

Detail Panel / Modal
```

Statistics are displayed before toolbars.

Toolbars are displayed before data.

The primary content should always receive the largest amount of screen space.

---

# Card Design

Cards should remain visually consistent across every module.

Standard

- Rounded corners
- Soft shadow
- Consistent padding
- Consistent spacing
- White background

Cards should never contain unnecessary nested borders.

---

# Statistics Cards

Statistics cards appear at the top of management pages.

Purpose

Provide quick insights before interacting with data.

Examples

Guest

- Total Guests
- Confirmed
- Pending

Budget

- Total Budget
- Paid
- Outstanding

Task

- Total Tasks
- Completed
- Pending

Live Rundown

- Current Event

Statistics should remain compact.

---

# Toolbar Design

Standard toolbar layout

Left

- Search
- Filter

Right

- View Options
- Primary Action Button

Toolbar components should remain consistent across all modules.

---

# Form Design

Desktop

Two-column layout

Mobile

Single-column layout

Required fields

```
*
```

Optional fields

```
(Optional)
```

Use full-width fields only when appropriate.

Examples

- Notes
- Description
- Package Details

---

# Detail View Design

Every management module should provide a read-only Detail View.

Purpose

Allow users to quickly review information without entering edit mode.

Design Rules

- Same spacing across every module
- Same typography
- Same section hierarchy
- Consistent label alignment

---

# Buttons

Primary

Main actions

Examples

- Save
- Create
- Update

---

Secondary

Alternative actions

Examples

- Cancel
- Back

---

Ghost

Low emphasis actions

Examples

- View
- More

---

Danger

Destructive actions

Examples

- Delete
- Remove

---

# Tables

Tables are the primary layout for management modules.

Requirements

- Consistent spacing
- Responsive
- Easy scanning

Future

- Sticky Header
- Column Sorting
- Pagination
- Column Visibility

---

# Typography

## Page Title

Largest heading

One per page.

---

## Section Title

Used for

- Cards
- Forms
- Detail Sections

---

## Body

Default content.

---

## Caption

Used for

- Helper text
- Small descriptions
- Metadata

---

# Responsive Design

## Mobile

Single-column layout

Stack information vertically.

---

## Tablet

Hybrid layout

Maintain usability without horizontal scrolling whenever possible.

---

## Desktop

Two-column forms

Large tables

Side-by-side layouts

---

# Vendor Information Standard

Vendor information is maintained in one consistent format across the application.

---

## Vendor Management

Displays the complete Vendor record.

```
Category

Vendor Name                 Vendor Website

Vendor Facebook             Vendor Instagram

Vendor PIC Name             Vendor PIC Contact

Default Package Details

Notes
```

Vendor Management is the only module that displays Vendor Category and Default Package Details.

---

## Shared Vendor Information

Modules

- Budget
- Task
- Live Rundown
- Future Modules

Display

```
Vendor Name                 Vendor Website

Vendor Facebook             Vendor Instagram

Vendor PIC Name             Vendor PIC Contact

(Module-specific Fields)

Notes (Optional)
```

Rules

- Vendor Category is not displayed.
- Module Category remains owned by the module.
- Vendor information should always use the same layout.
- Vendor data comes from the shared Vendor database.

---

# Status Badge Standard

Status badges should use consistent colors throughout the system.

Completed

Success

Pending

Warning

In Progress

Primary

Cancelled

Danger

Live Rundown

- ✔ Completed
- ▶ Current
- ○ Upcoming

---

# Live Rundown Design System

Live Rundown is not a planning page.

It is an operational dashboard used during live wedding execution.

The interface prioritizes speed, readability, and real-time awareness.

---

## Live Rundown Layout

```
Page Title

↓

Current Event Card

↓

Toolbar

↓

Live Rundown Table
```

The table should occupy most of the available screen space.

---

## Live Rundown Table Structure

Columns

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
- Actions

---

## Current Event

Display one compact card above the table.

Example

```
Current Event

First March In
```

Future versions will automatically update this card using real-time synchronization.

---

## Full Rundown

The Full Rundown is always the default operational view.

Every assigned wedding member can access the complete rundown.

---

## My Rundown

My Rundown is an optional filtered view.

Purpose

Show only events matching the selected Responsible Role.

This feature improves convenience.

It does not replace the Full Rundown.

---

## Responsible Roles

An event may contain multiple Responsible Roles.

Examples

- Planner
- Coordinator
- MC
- DJ
- Photographer
- Videographer
- Reception
- Banquet Captain
- Couple
- Family

Responsible Roles are visual labels and future filtering options.

They are not permissions.

---

## Editing

Foundation Phase

UI only

Future Business Logic

Only authorized users may edit:

- Time
- Used Time
- Status
- Remarks
- Event Order

Planner always has edit permission.

Coordinator edit permission is configurable.

---

# Empty States

Every module should provide a consistent empty state.

Include

- Illustration (Future)
- Short Title
- Helpful Description
- Primary Action

---

# Loading States

Future implementation

- Skeleton Loaders
- Loading Indicators
- Progressive Rendering

---

# Error States

Use consistent error presentation.

Include

- Clear Message
- Recovery Action
- Retry Button (Future)

---

# Accessibility

Future improvements

- Keyboard Navigation
- Focus States
- Screen Reader Support
- Color Contrast
- ARIA Labels

---

# Component Reuse Rules

Before creating a new component:

1. Check existing shared components.
2. Reuse whenever possible.
3. Extend only when necessary.
4. Avoid duplicate UI patterns.

Consistency is prioritized over customization.

---

# Design Principles Summary

- One shared design language across all modules.
- Reuse components whenever possible.
- Vendor information follows one standard layout.
- Detail pages follow one consistent structure.
- Statistics always appear before toolbars.
- Tables remain the primary management interface.
- Live Rundown is optimized for real-time wedding operations.
- Full Rundown is always available.
- My Rundown is an optional filtered view.
- Responsive design is required across the application.
- Maintain a clean, professional SaaS experience.