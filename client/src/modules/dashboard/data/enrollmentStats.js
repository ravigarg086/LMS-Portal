const COURSE_CATALOG = [
  { id: 'C1', name: 'Full Stack MERN', tracks: ['Computer Science', 'Information Technology'] },
  { id: 'C2', name: 'Data Science & MEAN', tracks: ['Data Science'] },
  { id: 'C3', name: 'DevOps & Cloud', tracks: ['Business Analytics'] },
];

function resolveCourseId(student) {
  const track = student.academicTrack || '';
  const match = COURSE_CATALOG.find((course) => course.tracks.includes(track));
  if (match) {
    return match.id;
  }
  const seed = student.email?.length || 0;
  return COURSE_CATALOG[seed % COURSE_CATALOG.length].id;
}

function resolveEnrollmentStatus(student) {
  const progress = student.dashboard?.overallProgress ?? 0;
  if (progress >= 75) {
    return 'completed';
  }
  if (progress >= 30) {
    return 'inProgress';
  }
  return 'enrolled';
}

export function buildEnrollmentAnalytics(students) {
  const tallies = COURSE_CATALOG.reduce((acc, course) => {
    acc[course.id] = { enrolled: 0, inProgress: 0, completed: 0, total: 0 };
    return acc;
  }, {});

  const statusBreakdown = { enrolled: 0, inProgress: 0, completed: 0 };
  const trackTallies = {};

  students.forEach((student) => {
    const courseId = resolveCourseId(student);
    const status = resolveEnrollmentStatus(student);
    tallies[courseId][status] += 1;
    tallies[courseId].total += 1;
    statusBreakdown[status] += 1;

    const track = student.academicTrack || 'Unassigned';
    trackTallies[track] = (trackTallies[track] || 0) + 1;
  });

  const courses = COURSE_CATALOG.map((course) => ({
    id: course.id,
    name: course.name,
    enrolled: tallies[course.id].enrolled,
    inProgress: tallies[course.id].inProgress,
    completed: tallies[course.id].completed,
    total: tallies[course.id].total,
  }));

  const tracks = Object.entries(trackTallies)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const maxTotal = Math.max(...courses.map((course) => course.total), 1);

  return {
    courses,
    statusBreakdown,
    tracks,
    summary: {
      totalStudents: students.length,
      maxEnrollment: maxTotal,
      activeCourses: COURSE_CATALOG.length,
    },
  };
}
