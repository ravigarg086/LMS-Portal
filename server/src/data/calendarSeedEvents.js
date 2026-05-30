const VALID_EVENT_TYPES = new Set(['class', 'assignment', 'exam', 'personal', 'other']);

function addDays(baseDate, days) {
  const result = new Date(baseDate);
  result.setDate(result.getDate() + days);
  return result;
}

function atTime(date, hours, minutes = 0) {
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

/** Demo events relative to today so the calendar always has visible content. */
function buildSeedEventsForUser(userId, role) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (role === 'student') {
    const classStart = atTime(addDays(today, 1), 10);
    const classEnd = atTime(addDays(today, 1), 11, 30);
    const assignmentDue = atTime(addDays(today, 3), 23, 59);
    const examStart = atTime(addDays(today, 7), 14);
    const examEnd = atTime(addDays(today, 7), 16);

    return [
      {
        userId,
        title: 'Data Structures Lecture',
        description: 'Binary trees, heaps, and graph traversals.',
        eventType: 'class',
        startAt: classStart,
        endAt: classEnd,
        allDay: false,
        location: 'Room 204',
      },
      {
        userId,
        title: 'Web Development Assignment Due',
        description: 'Submit the React portfolio project.',
        eventType: 'assignment',
        startAt: assignmentDue,
        endAt: null,
        allDay: false,
        location: 'Online portal',
      },
      {
        userId,
        title: 'Midterm Exam — Algorithms',
        description: 'Closed book. Bring student ID.',
        eventType: 'exam',
        startAt: examStart,
        endAt: examEnd,
        allDay: false,
        location: 'Hall B',
      },
      {
        userId,
        title: 'Study Group',
        description: 'Weekly peer review session.',
        eventType: 'personal',
        startAt: atTime(addDays(today, 2), 18),
        endAt: atTime(addDays(today, 2), 20),
        allDay: false,
        location: 'Library Room 3',
      },
    ];
  }

  if (role === 'faculty') {
    return [
      {
        userId,
        title: 'Office Hours',
        description: 'Drop-in Q&A for enrolled students.',
        eventType: 'class',
        startAt: atTime(addDays(today, 2), 15),
        endAt: atTime(addDays(today, 2), 17),
        allDay: false,
        location: 'Faculty Suite 12',
      },
      {
        userId,
        title: 'Department Meeting',
        description: 'Curriculum planning and accreditation review.',
        eventType: 'other',
        startAt: atTime(addDays(today, 5), 9),
        endAt: atTime(addDays(today, 5), 10, 30),
        allDay: false,
        location: 'Conference Room A',
      },
    ];
  }

  return [
    {
      userId,
      title: 'Platform Maintenance Window',
      description: 'Scheduled LMS updates and backup verification.',
      eventType: 'other',
      startAt: atTime(addDays(today, 4), 2),
      endAt: atTime(addDays(today, 4), 4),
      allDay: false,
      location: 'Data center',
    },
    {
      userId,
      title: 'Admin Review — Enrollment Reports',
      description: 'Monthly enrollment and retention metrics.',
      eventType: 'other',
      startAt: atTime(addDays(today, 6), 11),
      endAt: atTime(addDays(today, 6), 12),
      allDay: false,
      location: 'Admin Office',
    },
  ];
}

module.exports = {
  VALID_EVENT_TYPES,
  buildSeedEventsForUser,
};
