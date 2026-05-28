---
description: Technical skills for the LMS home/guest dashboard shell, header UX, and shared navigation patterns
globs: client/src/modules/home/**/*
alwaysApply: false
---

# Technical Skills: Home & Guest Dashboard

## 1. Layout Shell
- `DashboardContent.js` — guest vs role dashboards inside `eduhive-shell` + `Sidebar` + `eduhive-main`.
- `DashboardShell.js` — reusable shell for standalone pages (FAQ, Contact, External Data, etc.).

## 2. Guest Header (`DashboardHeader.js`)
```jsx
<>
  <div className="guest-top-bar">
    <button className="guest-top-bar__menu" ... /> {/* mobile only */}
    <div className="guest-action-bar">...</div>   {/* top-right pill bar */}
  </div>
  <header className="dashboard-hero dashboard-hero--guest">...</header>
</>
```
- Styles: `guest-action-bar.css`, hero styles in `lms-theme.css`.
- **Start Learning** CTA: `dashboard-hero__cta` — gradient pill with hover arrow animation.

## 3. Authenticated Header
- `dashboard-user-panel` with role badge, welcome copy, compact search, `ProfileMenu`.
- Styles: `dashboard-user-header.css` (imports `form-modal.css` for account modals).

## 4. Navigation UX
- `ScrollToTop.js` in `App.js` — `window.scrollTo(0, 0)` on `pathname` change.
- Same-page section anchors handled by `scrollToSection.js` in `DashboardContent` (hash only, same pathname).

## 5. Design Tokens
- Single source: `client/src/shared/styles/tokens.css`
- Role badge tokens: `client/src/shared/styles/role-badges.css`
- Component polish: `light-theme.css`, `theme-overrides.css`, `lms-theme.css`

## 6. Shared Modals
- Account: `ProfileModal.js`, `ChangePasswordModal.js`
- Table edits (dashboard): `EditFormModal.js` + `form-modal.css`
