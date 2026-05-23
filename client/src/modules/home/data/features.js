export const featureSections = [
  {
    id: 'feature-learning-paths',
    navLabel: 'Learning Paths',
    title: 'Adaptive paths that evolve with every learner',
    description:
      'Personalized modules, skill checkpoints, and AI-assisted recommendations keep students on track without overwhelming them.',
    visual: 'code',
    code: `const learner = await lms.enroll({
  track: 'MERN',
  pace: 'adaptive',
  goals: ['react', 'node', 'mongodb'],
});

await learner.syncProgress();`,
  },
  {
    id: 'feature-popular-courses',
    navLabel: 'Popular Courses',
    title: 'Featured courses ready for your catalog',
    description:
      'Prominent Popular Courses container with placeholders C1, C2, and C3 — wired for central course API integration.',
    visual: 'courses',
  },
  {
    id: 'feature-analytics',
    navLabel: 'Analytics',
    title: 'Real-time insight across every cohort',
    description:
      'Track enrollments, completion rates, and engagement signals from a single glass dashboard surface.',
    visual: 'blueprint',
  },
  {
    id: 'feature-integrations',
    navLabel: 'Integrations',
    title: 'Connect payments, data, and external APIs',
    description:
      'Unified hooks for PayPal, RBI payment rails, and third-party data feeds — without exposing sensitive tokens.',
    visual: 'code',
    code: `export function useExternalData() {
  return fetch('/api/external-data', {
    headers: { Authorization: 'Bearer ***' },
  });
}`,
  },
];
