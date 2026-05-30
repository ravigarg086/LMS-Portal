/**
 * LMS course catalog seed — mirrors client popular courses and stack submenus.
 */
const POPULAR_COURSES = [
  {
    courseId: 'C1',
    title: 'Full Stack MERN Development',
    description: 'Build production-ready web applications with MongoDB, Express, React, and Node.',
    category: 'Development',
    stack: 'MERN',
    duration: '8 weeks',
    tags: ['React', 'Node.js', 'MongoDB'],
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'REST API'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    courseId: 'C2',
    title: 'Data Science & MEAN Stack',
    description: 'Analyze datasets and deploy data-driven applications on the MEAN stack.',
    category: 'Data Science',
    stack: 'MEAN',
    duration: '10 weeks',
    tags: ['Python', 'Analytics', 'Angular'],
    skills: ['Python', 'Analytics', 'Angular', 'MongoDB', 'Data Visualization'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    courseId: 'C3',
    title: 'DevOps & Cloud Engineering',
    description: 'Automate pipelines and ship resilient cloud-native infrastructure.',
    category: 'Cloud',
    stack: 'DevOps',
    duration: '12 weeks',
    tags: ['AWS', 'Docker', 'CI/CD'],
    skills: ['AWS', 'Docker', 'CI/CD', 'Kubernetes', 'Terraform', 'Cloud'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
];

const STACK_COURSES = [
  { courseId: 'mean-angular-fundamentals', title: 'Angular Fundamentals', stack: 'MEAN', category: 'MEAN Stack', tags: ['Angular', 'TypeScript'], skills: ['Angular', 'Components', 'Routing'] },
  { courseId: 'mean-node-express', title: 'Node.js & Express', stack: 'MEAN', category: 'MEAN Stack', tags: ['Node.js', 'Express'], skills: ['Node.js', 'Express', 'API Design'] },
  { courseId: 'mean-mongodb-mastery', title: 'MongoDB Mastery', stack: 'MEAN', category: 'MEAN Stack', tags: ['MongoDB', 'NoSQL'], skills: ['MongoDB', 'Aggregation', 'Indexing'] },
  { courseId: 'mean-typescript', title: 'TypeScript Essentials', stack: 'MEAN', category: 'MEAN Stack', tags: ['TypeScript', 'JavaScript'], skills: ['TypeScript', 'Generics', 'Interfaces'] },
  { courseId: 'mern-react-hooks', title: 'React & Hooks', stack: 'MERN', category: 'MERN Stack', tags: ['React', 'Hooks'], skills: ['React', 'Hooks', 'State Management'] },
  { courseId: 'mern-express-api', title: 'Express API Design', stack: 'MERN', category: 'MERN Stack', tags: ['Express', 'REST'], skills: ['Express', 'REST', 'Middleware'] },
  { courseId: 'mern-mongodb', title: 'MongoDB for MERN', stack: 'MERN', category: 'MERN Stack', tags: ['MongoDB', 'Mongoose'], skills: ['MongoDB', 'Mongoose', 'Schema Design'] },
  { courseId: 'mern-capstone', title: 'Full Stack Capstone', stack: 'MERN', category: 'MERN Stack', tags: ['MERN', 'Capstone'], skills: ['MERN', 'Deployment', 'Authentication'] },
  { courseId: 'devops-docker', title: 'Docker & Containers', stack: 'DevOps', category: 'DevOps', tags: ['Docker', 'Containers'], skills: ['Docker', 'Containers', 'Images'] },
  { courseId: 'devops-kubernetes', title: 'Kubernetes Orchestration', stack: 'DevOps', category: 'DevOps', tags: ['Kubernetes', 'Orchestration'], skills: ['Kubernetes', 'Pods', 'Services'] },
  { courseId: 'devops-cicd', title: 'CI/CD Pipelines', stack: 'DevOps', category: 'DevOps', tags: ['CI/CD', 'Automation'], skills: ['CI/CD', 'GitHub Actions', 'Jenkins'] },
  { courseId: 'devops-aws', title: 'AWS Cloud Infrastructure', stack: 'DevOps', category: 'DevOps', tags: ['AWS', 'Cloud'], skills: ['AWS', 'EC2', 'S3', 'Cloud'] },
].map((course) => ({
  description: `${course.title} — part of the ${course.stack} learning track.`,
  duration: '6 weeks',
  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  featured: false,
  ...course,
}));

const COURSE_CATALOG = [...POPULAR_COURSES, ...STACK_COURSES];

module.exports = { COURSE_CATALOG, POPULAR_COURSES };
