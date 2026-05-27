import { courseStackKeys, courseStacks } from '../../home/data/courseStacks';
import { popularCoursePlaceholders } from '../../home/data/popularCourses';

const STACK_IMAGES = {
  MEAN: [
    'https://images.unsplash.com/photo-1517694712202-14dd953809aa?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=900&q=80',
  ],
  MERN: [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
  ],
  DevOps: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a6?auto=format&fit=crop&w=900&q=80',
  ],
};

function pickImage(stack, index) {
  const images = STACK_IMAGES[stack] || popularCoursePlaceholders.map((course) => course.image);
  return images[index % images.length];
}

export function buildGalleryItems() {
  const items = [];

  courseStackKeys.forEach((stack) => {
    courseStacks[stack].forEach((course, index) => {
      items.push({
        id: `${stack}-${index}-${course.label.replace(/\s+/g, '-').toLowerCase()}`,
        title: course.label,
        stack,
        imageUrl: pickImage(stack, index),
        alt: `${course.label} — ${stack} stack course gallery photo`,
      });
    });
  });

  popularCoursePlaceholders.forEach((course) => {
    items.push({
      id: `featured-${course.id}`,
      title: course.title,
      stack: course.category,
      imageUrl: course.image,
      alt: `${course.title} featured course gallery photo`,
    });
  });

  return items;
}
