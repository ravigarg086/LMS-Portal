const { listCourses } = require('../store/courseStore');

function isMysqlUnavailable(error) {
  return error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR';
}

function parseCourseQuery(query) {
  return {
    search: typeof query.search === 'string' ? query.search : '',
    limit: query.limit,
    featuredOnly: query.featured === 'true',
  };
}

async function getCourses(req, res) {
  try {
    const courses = await listCourses(parseCourseQuery(req.query));
    res.json({ courses, total: courses.length });
  } catch (error) {
    if (isMysqlUnavailable(error)) {
      return res.status(503).json({ message: 'Course catalog is temporarily unavailable. Check MySQL and try again.' });
    }

    return res.status(500).json({ message: 'Unable to load courses.' });
  }
}

module.exports = { getCourses };
