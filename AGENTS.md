# LMS Portal - Global Development Rules

## 1. Git & Version Control Workflow
- **Atomic Commits:** Break changes down into small, logical units. Do not bundle unrelated features into a single commit. and always refactor the code before pushing changes to GIT.
- **Commit Messages:** Follow the Conventional Commits specification (e.g., `feat(auth): add login form`, `fix(nav): repair responsive hamburger menu`).
- **Post-Task Review:** After successfully completing a discrete task on application code (`client/` or `server/`), **you must** invoke the **`code-refactor-reviewer`** subagent (`.cursor/agents/code-refactor-reviewer.md` or Task `subagent_type: code-refactor-reviewer`) to review changed files, apply safe refactors, and write a timestamped report to `.cursor/reviews/`. The `.cursor/hooks.json` `stop` hook auto-requests this when application files are still dirty.
- **Post-Task Push:** After review (or when no review is needed), invoke the **`stable-build-git-push`** subagent (`.cursor/agents/stable-build-git-push.md` or Task `subagent_type: stable-build-git-push`) to verify the build, then stage, commit, and **push** to the current Git branch. Do not push if the build or syntax checks fail. The `.cursor/hooks.json` `stop` hook also auto-requests this when `client/` or `server/` files are still dirty.
- **Branch Protection:** Never attempt to force-push (`git push -f`) unless explicitly instructed by the user.

## 2. Code Quality & Architecture
- **Component Design:** Prefer functional components using React Hooks. Keep components modular, reusable, and focused on a single responsibility.
- **State Management:** Keep state local where possible. Lift state up or use Context API/Redux only when state needs to be shared across deeply nested components.
- **No Hardcoded Values:** Extract API endpoints, environment variables, configuration strings, and secret keys into `.env` files. Never commit secrets to version control.
- **Clean Code:** Remove dead code, unused imports, and `console.log` statements before finalizing a task. Leftover debugging logs are prohibited in production-ready files.
- **Design Tokens:** Use CSS variables from `client/src/shared/styles/tokens.css` for colors, shadows, and gradients — do not duplicate `:root` token blocks in module CSS.
- **Shared Modals:** Reuse `EditFormModal` for table edit flows and `form-modal.css` for dialog styling (profile, change password, dashboard edits).

## 3. CSS & Responsive Design
- **Bootstrap First:** Always leverage Bootstrap utility classes or React-Bootstrap components for structural layout, spacing (padding/margins), and alignment before writing custom CSS.
- **Mobile-First Approach:** Ensure all layout implementations look perfect on mobile screens (<576px) first, then scale up using Bootstrap's responsive breakpoints (`sm`, `md`, `lg`, `xl`).
- **Consistent Theming:** Maintain color scheme consistency using Scholar LMS tokens (`--eh-primary`, `--eh-gradient`, role accent variables) and Bootstrap theme utilities.
- Always make all the components and forms inside the web portal responsive.

## 4. Navigation & UX
- **Scroll on route change:** Mount `ScrollToTop` in `App.js` so every pathname navigation opens the new page from the top.
- **Table edit UX:** Opening **Edit** on portal tables must use a modal dialog, not an inline form below the table.

## 5. Data Persistence
- **Users:** MySQL `users` table via `userStore.js` (passwords bcrypt-hashed); legacy `users.json` migrated on first startup.
- **Contact:** MySQL `contact_messages` table via `contactStore.js`.
- **Courses:** MySQL `courses` table via `courseStore.js`; catalog grid and header search consume `GET /api/courses`.
- **Schema bootstrap:** Tables are created automatically when the Express server starts (`initUsersDb`, `initContactDb`, `initCoursesDb`) — no separate `db:init` script.

## 6. Error Handling & Security
- **Defensive Coding:** Always implement error boundaries or try/catch blocks when dealing with async operations, API fetches, or local storage parsing.
- **User Feedback:** Never fail silently. Provide clear, user-friendly feedback (e.g., Bootstrap Alert components or toasts) when an operation fails or succeeds.
- **Data Sanitization:** Treat all user inputs as untrusted. Ensure data forms have front-end validation implemented before sending payloads to any backend.
