import { render, screen, within } from '@testing-library/react';
import App from './App';
import { homeNavItems } from './modules/home/data/homeNavItems';
import { popularCoursePlaceholders } from './modules/home/data/popularCourses';
import { courseStackKeys, courseStacks } from './modules/home/data/courseStacks';
import { SITE_NAME } from './modules/home/constants';

test('renders LMS Portal branding', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: new RegExp(SITE_NAME, 'i') })).toBeInTheDocument();
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

  expect(within(nav).getByRole('link', { name: /get started/i })).toBeInTheDocument();
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

test('renders superdesign hero, features, and popular course placeholders', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /learn beyond/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/ask the lms assistant/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();

  popularCoursePlaceholders.forEach(({ id, title }) => {
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(document.getElementById(`course-card-${id}`)).toBeInTheDocument();
  });
});
