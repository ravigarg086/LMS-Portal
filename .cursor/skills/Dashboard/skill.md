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

## 2. Admin Contact Messages (MySQL)
**Server:** `GET /api/contact` — protected by `authMiddleware` + `requireRole('admin')`; returns `{ messages: [...] }` from `contact_messages` table ordered by `created_at DESC`.

**Client API:**
```js
export function fetchContactMessages(search = '') {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return apiRequest(`/contact${query}`);
}
```

**Hook:**
```js
export function useContactMessages(enabled = true) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState('');
  // fetch on mount + search reload
  return { messages, loading, error, reload, search, setSearch };
}
```

**Component:** `AdminContactMessagesPanel.js`
- Search input filters by name, email, subject, or location.
- Desktop: responsive table inside `table-responsive`.
- Mobile: card list (`d-md-none`) with key fields and expandable message body.
- Designation badges: student / faculty / admin.

## 3. Responsive Admin Layout
- Use Bootstrap 12-column grid (`row g-3`, `col-12 col-lg-*`).
- Reserve fixed min-heights for loading placeholders to prevent CLS.
- Keep admin panels inside `eduhive-card role-panel role-panel--admin`.
