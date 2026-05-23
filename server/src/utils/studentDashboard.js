function createStudentDashboard(user) {
  const track = user.academicTrack || 'Full Stack MERN Development';
  const seed = user.email.length * 7;

  return {
    featuredCourse: {
      title: track,
      progress: 40 + (seed % 45),
      duration: '12 weeks',
      chapters: 24,
      completedChapters: 8 + (seed % 12),
    },
    overallProgress: 45 + (seed % 40),
    weeklyStats: [
      { day: 'Mon', value: 35 + (seed % 20), isGoal: false },
      { day: 'Tue', value: 50 + (seed % 30), isGoal: false },
      { day: 'Wed', value: 45 + (seed % 25), isGoal: false },
      { day: 'Thu', value: 70 + (seed % 25), isGoal: false },
      { day: 'Fri', value: 55 + (seed % 20), isGoal: false },
      { day: 'Sat', value: 25 + (seed % 20), isGoal: true },
      { day: 'Sun', value: 20 + (seed % 15), isGoal: true },
    ],
  };
}

module.exports = { createStudentDashboard };
