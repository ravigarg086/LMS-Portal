---
description: Technical skills and code patterns for implementing multi-role JWT authentication and data-view guards
globs: client/src/modules/signin/**/*
alwaysApply: false
---

# Technical Skills: Secure Multi-Role Authentication & Access Control

## 1. Context-Driven Role Distribution
- Save the authenticated user's profile metadata and permissions globally using a secure React Context provider (`AuthContext`).
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

## 3. Profile UI
- `ProfileMenu.js` — dropdown with **My profile**, **Change password**, **Sign out**.
- `ProfileModal.js` — edit name, email, role-specific fields, upload/remove profile picture via base64 data URL.
- Avatar helper: `client/src/shared/utils/userAvatar.js` (`getUserAvatarUrl`).