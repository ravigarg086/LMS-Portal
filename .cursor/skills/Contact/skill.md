---
description: Implement Contact Us page with validated form, details, and Google Map
globs: client/src/modules/contact/**/*
alwaysApply: false
---

# Technical Skills: Contact Us

## 1. Contact API
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

## 3. Form Hook
```js
export function useContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  // handleChange, handleSubmit
}
```

## 4. Google Map Embed
Use a responsive `ratio ratio-16x9` wrapper with an iframe `title="LMS Portal campus map"`. No API key required for standard embed.

## 5. Server Route
- `POST /api/contact` → validate body → append to `server/data/contact-messages.json`
- Return `{ message: 'Thank you — we received your inquiry.' }`

## 6. Page Layout
Three-column stack on desktop (`col-lg-4` details, `col-lg-8` form + map), single column on mobile.

## 7. Tests
Mock `POST /api/contact` success; assert form fields, validation error on empty submit, and success message after valid submit.
