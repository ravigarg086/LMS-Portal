---
description: Implement Contact Us page with validated form, details, Google Map, and MySQL persistence
globs: client/src/modules/contact/**/*,server/src/**/contact*
alwaysApply: false
---

# Technical Skills: Contact Us

## 1. Contact API (Client)
```js
export async function submitContactMessage(payload) {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
```

## 2. Client Validation
```js
export function validateContactForm({ fullName, email, designation, location, phone, subject, message }) {
  const errors = {};
  // validateRequired, validateEmail, designation select, location, phone (10+ digits)
  return errors;
}
```

## 3. MySQL Configuration (`server/src/config/mysql.js`)
```js
const mysql = require('mysql2/promise');

function getMysqlConfig() {
  return {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'lms-portal-db',
  };
}

async function getPool() {
  if (!pool) {
    pool = mysql.createPool({ ...getMysqlConfig(), waitForConnections: true, connectionLimit: 10 });
  }
  return pool;
}
```

## 4. Database Init (`server/src/db/initContactDb.js`)
- Create database `lms-portal-db` if missing.
- Create table `contact_messages`:
  - `id` CHAR(36) PK
  - `full_name`, `email`, `designation` ENUM, `location`, `phone`, `subject`, `message`
  - `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- Run on server startup via `initContactDb()` before accepting requests.

## 5. Server Store (`server/src/store/contactStore.js`)
```js
async function saveContactMessage(payload) {
  const { errors, fullName, email, designation, location, phone, subject, message } = validateContactPayload(payload);
  if (Object.keys(errors).length) throw validationError(errors);

  const pool = await getPool();
  const id = crypto.randomUUID();
  await pool.execute(
    `INSERT INTO contact_messages (id, full_name, email, designation, location, phone, subject, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, fullName, email, designation, location, phone, subject, message],
  );
  return { id, fullName, email, designation, location, phone, subject, message, createdAt: new Date().toISOString() };
}
```

## 6. Server Route
- `POST /api/contact` → validate body → insert into MySQL → `{ message: 'Thank you — we received your inquiry.' }`
- `GET /api/contact` → `authMiddleware` + `requireRole('admin')` → `{ messages: [...] }` from MySQL

## 7. Admin Dashboard Inbox
- Component: `client/src/modules/dashboard/components/AdminContactMessagesPanel.js`
- Hook: `client/src/modules/dashboard/hooks/useContactMessages.js`
- Render on admin dashboard only; responsive table + mobile cards.

## 8. Environment (`.env.example`)
```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=lms-portal-db
```

## 9. Page Layout
Three-column stack on desktop (`col-lg-4` details, `col-lg-8` form + map), single column on mobile.

## 10. Tests
Mock `POST /api/contact` success; assert form fields, validation error on empty submit, and success message after valid submit.
