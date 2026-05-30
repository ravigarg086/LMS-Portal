const { getPool } = require('../config/mysql');
const { COURSE_CATALOG } = require('../data/courseCatalog');

const COURSE_SELECT = `
  SELECT course_id, title, description, category, stack, duration, tags, skills, image, featured
  FROM courses
`;

const SEARCH_COLUMNS = ['title', 'description', 'category', 'stack'];
const JSON_SEARCH_COLUMNS = ['tags', 'skills'];

function parseJsonArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function mapCourseRow(row) {
  return {
    id: row.course_id,
    title: row.title,
    description: row.description,
    category: row.category,
    stack: row.stack,
    duration: row.duration,
    tags: parseJsonArray(row.tags),
    skills: parseJsonArray(row.skills),
    image: row.image,
    featured: Boolean(row.featured),
  };
}

function normalizeLimit(limit, fallback = 50, max = 100) {
  return Math.min(Math.max(Number(limit) || fallback, 1), max);
}

function buildSearchClause(search) {
  const trimmedSearch = String(search || '').trim();
  if (!trimmedSearch) {
    return { clause: '', params: [] };
  }

  const term = `%${trimmedSearch}%`;
  const textMatches = SEARCH_COLUMNS.map((column) => `${column} LIKE ?`).join(' OR ');
  const jsonMatches = JSON_SEARCH_COLUMNS.map((column) => `CAST(${column} AS CHAR) LIKE ?`).join(' OR ');
  const params = Array(SEARCH_COLUMNS.length + JSON_SEARCH_COLUMNS.length).fill(term);

  return {
    clause: ` AND (${textMatches} OR ${jsonMatches})`,
    params,
  };
}

function mapSeedRow(course) {
  return [
    course.courseId,
    course.title,
    course.description,
    course.category || 'General',
    course.stack || '',
    course.duration || '',
    JSON.stringify(course.tags || []),
    JSON.stringify(course.skills || []),
    course.image || '',
    course.featured ? 1 : 0,
  ];
}

async function seedCoursesIfEmpty() {
  const pool = await getPool();
  const [countRows] = await pool.query('SELECT COUNT(*) AS count FROM courses');
  const existingCount = Number(countRows[0]?.count || 0);

  if (existingCount > 0 || !COURSE_CATALOG.length) {
    return existingCount;
  }

  const placeholders = COURSE_CATALOG.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');

  await pool.execute(
    `INSERT INTO courses
      (course_id, title, description, category, stack, duration, tags, skills, image, featured)
     VALUES ${placeholders}`,
    COURSE_CATALOG.flatMap(mapSeedRow),
  );

  return COURSE_CATALOG.length;
}

async function listCourses({ search = '', limit = 50, featuredOnly = false } = {}) {
  const pool = await getPool();
  const safeLimit = normalizeLimit(limit);
  const { clause, params } = buildSearchClause(search);

  let query = `${COURSE_SELECT} WHERE 1 = 1`;
  const queryParams = [...params];

  if (featuredOnly) {
    query += ' AND featured = 1';
  }

  query += `${clause} ORDER BY featured DESC, title ASC LIMIT ?`;
  queryParams.push(safeLimit);

  const [rows] = await pool.execute(query, queryParams);
  return rows.map(mapCourseRow);
}

module.exports = {
  seedCoursesIfEmpty,
  listCourses,
  mapCourseRow,
};
