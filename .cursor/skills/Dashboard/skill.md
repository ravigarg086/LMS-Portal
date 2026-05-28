---
description: Technical skills, state-driven rendering patterns, and layout engineering for dashboards
globs: client/src/modules/dashboard/**/*
alwaysApply: false
---

# Technical Skills: Advanced Role-Based Dashboards

## 1. Secure Conditional Rendering
- Implement structural role separation by reading the user's role directly from your global authentication context (e.g., `const { user } = useAuth();`).
- Wrap layout sections using switch-case statements or explicit guard statements to guarantee correct component injection:
```jsx
  {user.role === 'admin' && <AdminUserManagement/>}
  {user.role === 'admin' && <AdminContactMessagesPanel/>}
  {user.role === 'faculty' && <FacultyAssignmentControls/>}
  {user.role === 'student' && <StudentReadOnlyView/>}
```

## 2. Role Dashboard Sections (Shared Shell)
- Use `RoleDashboardShell` for student, faculty, and admin tab navigation.
- Sync active section with URL search param `?section=` for shareable deep links.
- Mount only the active panel to keep the view focused and reduce simultaneous API load.

**Student** (`StudentDashboard.js`): `overview` (default), `mentors`, `courses` — see `studentDashboardSections.js`.

**Faculty** (`FacultyDashboard.js`): `analytics` (default), `students` — see `facultyDashboardSections.js`.

**Admin** (`AdminDashboard.js`): `analytics` (default), `contact`, `users` — see `adminDashboardSections.js`.

```jsx
{user.role === 'student' && <StudentDashboard />}
{user.role === 'faculty' && <FacultyDashboard />}
{user.role === 'admin' && <AdminDashboard />}
```

## 3. Admin Contact Messages (MySQL)
**Server:**
- `GET /api/contact` — protected by `authMiddleware` + `requireRole('admin')`; returns `{ messages: [...] }` from `contact_messages` ordered by `created_at DESC`.
- `PUT /api/contact/:id` — admin only; validates payload and updates the MySQL row.
- `DELETE /api/contact/:id` — admin only; removes the MySQL row.

**Client API:**
```js
export function fetchContactMessages(search = '') { /* GET */ }
export function updateContactMessage(id, payload) { /* PUT */ }
export function deleteContactMessage(id) { /* DELETE */ }
```

**Hook:**
```js
export function useContactMessages(enabled = true) {
  // fetch on mount; expose reload, updateMessage, deleteMessage, submitting, actionError
}
```

**Component:** `AdminContactMessagesPanel.js`
- Search input filters by name, email, subject, or location.
- Desktop: responsive table with Actions column (Edit / Delete).
- Mobile: card list (`d-md-none`) with Edit / Delete below each message.
- Edit panel: `ContactMessageEditForm.js` reuses contact validation rules.
- Designation badges: student / faculty / admin.

## 4. Responsive Role Dashboard Layout
- Use Bootstrap 12-column grid (`row g-3`, `col-12 col-lg-*`).
- Reserve fixed min-heights for loading placeholders to prevent CLS.
- Keep admin panels inside `eduhive-card role-panel role-panel--admin`.
