---
description: Technical skills and code patterns for multi-role JWT authentication, MySQL user store, and account profile UI
globs: client/src/modules/signin/**/*,client/src/shared/auth/**/*,client/src/modules/home/components/Profile*.js,client/src/modules/home/components/ChangePasswordModal.js,server/src/store/userStore.js,server/src/controllers/authController.js
alwaysApply: false
---

# Technical Skills: Secure Multi-Role Authentication & Access Control

## 1. Context-Driven Role Distribution
- Save the authenticated user's profile metadata and permissions globally using `AuthContext`.
- The user session object must expose identity details and the designated access tier:
```ts
  interface UserSession {
    userId: string;
    role: 'student' | 'faculty' | 'admin';
    token: string;
    profilePictureUrl?: string;
  }
```

## 2. MySQL User Persistence
- Auth reads/writes go through `server/src/store/userStore.js` backed by the MySQL `users` table.
- Schema: `server/src/db/schema/users.sql`; bootstrap: `initUsersDb()` migrates legacy `users.json` on first run.
- Profile updates: `POST /api/auth/profile` (JWT cookie); password changes: `POST /api/auth/change-password`.
- `changePassword` hashes with bcrypt and calls `await user.save()` — updates `password_hash` in MySQL.
- Health check exposes `{ storage: { users: 'mysql' }, features: { profileUpdate: true } }`.

## 3. Profile & Account UI
- `ProfileMenu.js` — dropdown with **My profile**, **Change password**, **Sign out**.
- `ProfileModal.js` — edit name, email, role-specific fields, upload/remove profile picture (base64, max 500 KB); **closes on successful save**.
- `ChangePasswordModal.js` — current + new password with validation.
- Avatar helper: `client/src/shared/utils/userAvatar.js` (`getUserAvatarUrl`).
- Modal styles: `client/src/shared/styles/form-modal.css` (shared with `EditFormModal`).

## 4. Client API
```js
export function changePassword(payload) {
  return apiRequest('/auth/change-password', { method: 'POST', body: JSON.stringify(payload) });
}

export function updateProfile(payload) {
  return apiRequest('/auth/profile', { method: 'POST', body: JSON.stringify(payload) });
}
```
- `AuthContext.updateProfile` returns the full API response `{ message, user }` and updates cached session state.
