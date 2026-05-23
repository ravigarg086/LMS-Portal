import { SECTION_IDS } from '../constants';

/**
 * Course catalog navigation — stack groups and related course submenus.
 * Hash anchors reserved for the future Course catalog module.
 */
export const courseStacks = {
  MEAN: [
    { label: 'Angular Fundamentals', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
    { label: 'Node.js & Express', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
    { label: 'MongoDB Mastery', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
    { label: 'TypeScript Essentials', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
  ],
  MERN: [
    { label: 'React & Hooks', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
    { label: 'Express API Design', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
    { label: 'MongoDB for MERN', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
    { label: 'Full Stack Capstone', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
  ],
  DevOps: [
    { label: 'Docker & Containers', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
    { label: 'Kubernetes Orchestration', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
    { label: 'CI/CD Pipelines', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
    { label: 'AWS Cloud Infrastructure', href: `#${SECTION_IDS.popularCourses}`, title: 'Course catalog coming soon' },
  ],
};

export const courseStackKeys = Object.keys(courseStacks);
