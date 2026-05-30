---
description: Use MCP servers for MySQL database operations and Playwright browser automation instead of ad-hoc shell scripts
globs: **/*
alwaysApply: false
---

# MCP Automation — MySQL & Playwright

Follow `.cursor/rules/mcp-servers.mdc` for when and how to use MCP. This skill adds implementation notes and examples.

Use configured MCP servers for database checks and browser automation. Do **not** add standalone `node -e` MySQL test scripts or `db:init` CLI helpers — the Express server bootstraps schema on startup via `initUsersDb()`, `initContactDb()`, and `initCoursesDb()`.

## 1. MySQL MCP (`user-mysql`)

**Verify connection:**
- Tool: `get_database_info` — lists databases, tables, and connection config for `lms-portal-db`.

**Run queries:**
- Tool: `sql_query` — one statement per call (DDL/DML as allowed by MCP config).
- Example checks:
  - `SELECT COUNT(*) AS user_count FROM users`
  - `SELECT COUNT(*) AS contact_count FROM contact_messages`
  - `SELECT COUNT(*) AS course_count FROM courses`
  - `SELECT course_id, title, featured FROM courses LIMIT 5`

**Schema reference:** `server/src/db/schema/*.sql` (users, contact_messages, password_reset_tokens, courses).

**App runtime:** Server still uses `server/src/config/mysql.js` + stores — MCP is for inspection, migrations, and agent automation only.

## 2. Playwright MCP (`user-playwright`)

Use for end-to-end UI verification instead of manual browser steps or one-off Puppeteer scripts.

**Common flow:**
1. `browser_navigate` — open `http://localhost:3000` (client) or `http://localhost:5000/api/health` (API).
2. `browser_snapshot` — inspect page structure and refs.
3. `browser_click` / `browser_type` / `browser_fill_form` — interact with forms (sign-in, contact, etc.).
4. `browser_take_screenshot` — capture evidence when debugging layout issues.

**Prerequisites:** `npm start` in `client/` (port 3000) and `npm run dev` in `server/` (port 5000).

## 3. Removed Patterns (do not reintroduce)

- ~~`server/src/db/runInitContactDb.js`~~ — deleted; use MCP `sql_query` or restart server for schema bootstrap.
- ~~`npm run db:init`~~ — removed from `server/package.json`.
- Avoid inline shell `node -e "require('./store/contactStore')..."` for routine DB verification — use MySQL MCP instead.
