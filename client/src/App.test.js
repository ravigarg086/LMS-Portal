import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';
import { popularCoursePlaceholders } from './modules/home/data/popularCourses';
import { courseStackKeys, courseStacks } from './modules/home/data/courseStacks';
import { SITE_NAME, THEMES, THEME_STORAGE_KEY } from './modules/home/constants';

beforeEach(() => {
  localStorage.removeItem(THEME_STORAGE_KEY);
  document.documentElement.removeAttribute('data-theme');
});
test('renders LMS Portal branding', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: new RegExp(SITE_NAME, 'i') })).toBeInTheDocument();
});

test('renders dashboard header and sidebar navigation', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /welcome back, learner/i })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /sidebar navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /^Dashboard$/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /^Registration$/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /^FAQ$/i })).toBeInTheDocument();
});

test('renders course stack submenus in sidebar', () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /sidebar navigation/i });

  courseStackKeys.forEach((stack) => {
    expect(within(nav).getByText(stack)).toBeInTheDocument();
    courseStacks[stack].forEach(({ label }) => {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument();
    });
  });
});

test('renders dashboard widgets and popular course placeholders', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /full stack mern development/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /continue learning/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /popular courses/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();

  popularCoursePlaceholders.forEach(({ id, title }) => {
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(document.getElementById(`course-card-${id}`)).toBeInTheDocument();
  });
});

test('theme toggle switches between light and dark modes', () => {
  render(<App />);

  expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.light);

  fireEvent.click(screen.getByRole('button', { name: /dark/i }));
  expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.dark);

  fireEvent.click(screen.getByRole('button', { name: /light/i }));
  expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.light);
});
