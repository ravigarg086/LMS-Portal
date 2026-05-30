---
description: Course catalog — MySQL persistence, REST API, header search, and Popular Courses grid
globs: client/src/modules/home/**/*,client/src/shared/api/coursesApi.js,server/src/**/course*
alwaysApply: false
---

# Technical Skills: Course Catalog

Follow `.cursor/rules/courses.mdc` for product requirements.

## 1. MySQL Schema (`server/src/db/schema/courses.sql`)

Table **`courses`** columns:
- `course_id` (PK), `title`, `description`, `category`, `stack`, `duration`
- `tags` JSON, `skills` JSON, `image`, `featured` TINYINT(1)
- `created_at`, `updated_at`

## 2. Database Init
- `initCoursesDb()` in `server/src/db/initCoursesDb.js` runs on server startup.
- Creates table if missing, then `seedCoursesIfEmpty()` from `server/src/data/courseCatalog.js`.

## 3. Server Store (`server/src/store/courseStore.js`)
```js
async function seedCoursesIfEmpty() { /* INSERT seed rows when COUNT = 0 */ }
async function listCourses({ search, limit, featuredOnly }) { /* SELECT with LIKE on text + JSON columns */ }
```

## 4. Server Routes
- `GET /api/courses` → `{ courses, total }`
- Query: `?search=react&limit=8&featured=true`

## 5. Client API (`client/src/shared/api/coursesApi.js`)
```js
export function fetchCourses({ search = '', limit, featured } = {}) {
  return apiRequest(`/courses${queryString}`);
}
```

## 6. Header Search (`CourseSearch.js`)
- Uses `useDebouncedValue(query, 300)` from `client/src/shared/hooks/useDebouncedValue.js`.
- Calls `fetchCourses({ search, limit: 8 })` when debounced query length ≥ 2.
- On select: scroll to `#popular-courses` and highlight `#course-card-{id}`.

## 7. Popular Courses Grid
- `PopularCoursesGrid.js` fetches `fetchCourses({ limit: 50 })` on mount.
- Renders `CourseCardPlaceholder` for each API course; falls back to `popularCourses.js` if API fails.

## 8. MCP Verification
```sql
SELECT COUNT(*) AS course_count FROM courses;
SELECT course_id, title, featured FROM courses ORDER BY featured DESC, title LIMIT 10;
SELECT course_id, title FROM courses WHERE title LIKE '%react%' OR CAST(tags AS CHAR) LIKE '%react%';
```

## 9. Do Not
- Do not store the live catalog in MongoDB or reintroduce mongoose `Course` model.
- Do not add `db:init` CLI scripts — bootstrap stays in Express startup.
