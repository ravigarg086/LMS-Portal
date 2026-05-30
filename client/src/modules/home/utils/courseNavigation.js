import { SECTION_IDS } from '../constants';

const HIGHLIGHT_DURATION_MS = 2200;

export function scrollToCourse(courseId) {
  const section = document.getElementById(SECTION_IDS.popularCourses);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  window.requestAnimationFrame(() => {
    const card = document.getElementById(`course-card-${courseId}`);
    if (!card) {
      return;
    }

    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('portfolio-item--highlight');
    window.setTimeout(() => card.classList.remove('portfolio-item--highlight'), HIGHLIGHT_DURATION_MS);
  });
}
