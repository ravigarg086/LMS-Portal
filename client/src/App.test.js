import { render, screen, within } from '@testing-library/react';
import App from './App';
import { homeNavItems } from './modules/home/data/homeNavItems';
import { popularCoursePlaceholders } from './modules/home/data/popularCourses';
import { courseStackKeys, courseStacks } from './modules/home/data/courseStacks';
import { SITE_NAME } from './modules/home/constants';

test('renders LMS Portal branding', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: SITE_NAME })).toBeInTheDocument();
});

test('renders PRD navigation menu items', () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /main navigation/i });

  homeNavItems.forEach((item) => {
    if (item.type === 'courses') {
      expect(within(nav).getByRole('button', { name: /^Course$/i })).toBeInTheDocument();
      return;
    }

    expect(within(nav).getByRole('link', { name: new RegExp(`^${item.label}$`, 'i') })).toBeInTheDocument();
  });
});

test('renders course stack submenus with related courses', () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /main navigation/i });

  courseStackKeys.forEach((stack) => {
    expect(within(nav).getByRole('button', { name: new RegExp(`^${stack}$`, 'i') })).toBeInTheDocument();
    courseStacks[stack].forEach(({ label }) => {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument();
    });
  });
});

test('renders hero and popular course placeholders', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /learn smarter with the lms portal/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /popular courses/i })).toBeInTheDocument();

  popularCoursePlaceholders.forEach(({ id, title }) => {
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(document.getElementById(`course-card-${id}`)).toBeInTheDocument();
  });
});
