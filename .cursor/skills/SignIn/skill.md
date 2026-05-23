---
description: Technical skills and code patterns for implementing secure multi-role React authentication
globs: client/src/modules/signin/**/*
alwaysApply: false
---

# Technical Skills: Secure Multi-Role Sign In

## 1. React Component Architecture
- Manage the selected user persona using a clean React state hook: `const [userRole, setUserRole] = useState('student');`.
- Utilize **Bootstrap Nav Tabs** (`<Nav variant="tabs">`) or **Button Groups** (`<ButtonGroup>`) to create a slick, responsive persona switcher for Student, Faculty, and Admin.
- Build standard controlled components for form inputs to enforce synchronized client-side state handling.

## 2. State & Token Management
- Keep active authentication tokens strictly out of unencrypted `localStorage`. Instead, implement session management using standard **HttpOnly Cookies** or a secure, centralized in-memory state manager (like React Context combined with a `sessionStorage` fallback if necessary).
- Ensure all token decoding (e.g., reading JWT claims for roles) happens securely, instantly scrubbing sensitive data on component unmount or logout actions.

## 3. Integration & Routing
- Use `react-router-dom` hooks (like `useNavigate`) to handle smooth, instant client-side transitions to the respective dashboards upon receiving a successful response from the authentication API.
- Abstract the login API service call into an isolated helper function using standard `fetch` or `axios` instances with structured error interceptors.