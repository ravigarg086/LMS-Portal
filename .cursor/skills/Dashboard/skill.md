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
  {user.role === 'faculty' && <FacultyAssignmentControls/>}
  {user.role === 'student' && <StudentReadOnlyView/>}