const DEMO_PASSWORD_HASH = '$2b$12$NLd1PU5cAX5.BgYr160h6eSgfc9r7dpUWkjugeI1bR5N2DGJu/UlW';

function weeklyStats(seed) {
  return [
    { day: 'Mon', value: 35 + (seed % 25), isGoal: false },
    { day: 'Tue', value: 45 + (seed % 30), isGoal: false },
    { day: 'Wed', value: 40 + (seed % 28), isGoal: false },
    { day: 'Thu', value: 55 + (seed % 35), isGoal: false },
    { day: 'Fri', value: 50 + (seed % 25), isGoal: false },
    { day: 'Sat', value: 20 + (seed % 20), isGoal: true },
    { day: 'Sun', value: 15 + (seed % 15), isGoal: true },
  ];
}

function studentRecord(id, fullName, email, track, graduationYear, overallProgress) {
  const seed = email.length * 7;
  return {
    id,
    fullName,
    email,
    password: DEMO_PASSWORD_HASH,
    role: 'student',
    academicTrack: track,
    graduationYear,
    department: '',
    employeeId: '',
    accessLevel: '',
    dashboard: {
      featuredCourse: {
        title: track,
        progress: overallProgress,
        duration: '12 weeks',
        chapters: 24,
        completedChapters: Math.round((overallProgress / 100) * 24),
      },
      overallProgress,
      weeklyStats: weeklyStats(seed),
    },
    createdAt: '2026-05-23T12:00:00.000Z',
    updatedAt: '2026-05-23T12:00:00.000Z',
  };
}

const DEMO_STUDENTS = [
  studentRecord('demo-student-001', 'Mia Chen', 'mia.chen@campus.edu', 'Computer Science', '2027', 18),
  studentRecord('demo-student-002', 'Noah Patel', 'noah.patel@campus.edu', 'Computer Science', '2026', 84),
  studentRecord('demo-student-003', 'Sofia Rivera', 'sofia.rivera@campus.edu', 'Computer Science', '2028', 52),
  studentRecord('demo-student-004', 'Ethan Brooks', 'ethan.brooks@campus.edu', 'Information Technology', '2027', 24),
  studentRecord('demo-student-005', 'Ava Nguyen', 'ava.nguyen@campus.edu', 'Information Technology', '2026', 61),
  studentRecord('demo-student-006', 'Liam Okafor', 'liam.okafor@campus.edu', 'Information Technology', '2028', 79),
  studentRecord('demo-student-007', 'Emma Walsh', 'emma.walsh@campus.edu', 'Data Science', '2027', 12),
  studentRecord('demo-student-008', 'James Liu', 'james.liu@campus.edu', 'Data Science', '2026', 44),
  studentRecord('demo-student-009', 'Olivia Park', 'olivia.park@campus.edu', 'Data Science', '2028', 92),
  studentRecord('demo-student-010', 'Lucas Meyer', 'lucas.meyer@campus.edu', 'Business Analytics', '2027', 21),
  studentRecord('demo-student-011', 'Isabella Costa', 'isabella.costa@campus.edu', 'Business Analytics', '2026', 58),
  studentRecord('demo-student-012', 'Ben Carter', 'ben.carter@campus.edu', 'Business Analytics', '2028', 88),
];

module.exports = {
  DEMO_STUDENTS,
};
