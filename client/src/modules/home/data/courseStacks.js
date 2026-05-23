import { SECTION_IDS } from '../constants';

/**
 * Course catalog navigation — stack groups and related course submenus.
 * Hash anchors reserved for the future Course catalog module.
 */
export const courseStacks = {
  MEAN: [
    { label: 'Angular Fundamentals', href: `#${SECTION_IDS.course}?stack=mean&course=angular-fundamentals` },
    { label: 'Node.js & Express', href: `#${SECTION_IDS.course}?stack=mean&course=nodejs-express` },
    { label: 'MongoDB Mastery', href: `#${SECTION_IDS.course}?stack=mean&course=mongodb-mastery` },
    { label: 'TypeScript Essentials', href: `#${SECTION_IDS.course}?stack=mean&course=typescript-essentials` },
  ],
  MERN: [
    { label: 'React & Hooks', href: `#${SECTION_IDS.course}?stack=mern&course=react-hooks` },
    { label: 'Express API Design', href: `#${SECTION_IDS.course}?stack=mern&course=express-api` },
    { label: 'MongoDB for MERN', href: `#${SECTION_IDS.course}?stack=mern&course=mongodb-mern` },
    { label: 'Full Stack Capstone', href: `#${SECTION_IDS.course}?stack=mern&course=fullstack-capstone` },
  ],
  DevOps: [
    { label: 'Docker & Containers', href: `#${SECTION_IDS.course}?stack=devops&course=docker` },
    { label: 'Kubernetes Orchestration', href: `#${SECTION_IDS.course}?stack=devops&course=kubernetes` },
    { label: 'CI/CD Pipelines', href: `#${SECTION_IDS.course}?stack=devops&course=cicd` },
    { label: 'AWS Cloud Infrastructure', href: `#${SECTION_IDS.course}?stack=devops&course=aws-cloud` },
  ],
};

export const courseStackKeys = Object.keys(courseStacks);
