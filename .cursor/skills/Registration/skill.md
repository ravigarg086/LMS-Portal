---
description: Technical skills and form engineering patterns for multi-role user onboarding
globs: client/src/modules/registration/**/*
alwaysApply: false
---

# Technical Skills: Onboarding & Multi-Role Registration

## 1. Dynamic Form Rendering & State
- Implement a single, clean state object for form data to easily manage serialization to `sessionStorage`.
- Use a state variable (e.g., `const [role, setRole] = useState('student');`) to dynamically swap out custom field sub-sections (like `Employee ID` vs `Graduation Year`) while preserving core shared inputs like name, email, and password.
- Initialize component state by checking `sessionStorage.getItem('registration_progress')` to seamlessly resume a user's flow if they refresh mid-process.

## 2. Bootstrap UI Implementation
- Build the role selection using a clean Bootstrap styled element layout—such as a responsive horizontal card group or customized radio tab layout.
- Utilize Bootstrap form feedback utilities (`is-invalid` and `invalid-feedback` classes) paired with client-side regex or validation libraries to give instant UI cues for weak passwords or bad email formats.
- Bind the loading/submitting state directly to the button component:
```jsx
  <Button disabled="{isSubmitting}" type="submit">
    {isSubmitting ? 'Registering...' : 'Sign Up'}
  </Button>