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