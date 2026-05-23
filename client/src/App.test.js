import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { popularCoursePlaceholders } from './modules/home/data/popularCourses';
import { courseStackKeys, courseStacks } from './modules/home/data/courseStacks';
import { SITE_NAME, THEMES, THEME_STORAGE_KEY } from './modules/home/constants';

beforeEach(() => {
  localStorage.removeItem(THEME_STORAGE_KEY);
  sessionStorage.clear();
  document.documentElement.removeAttribute('data-theme');

  global.fetch = jest.fn((url) =>
    Promise.resolve({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ message: 'Authentication required.' }),
    }),
  );
});

async function renderApp() {
  render(<App />);
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
}

test('renders LMS Portal branding', async () => {
  await renderApp();
  expect(screen.getByRole('link', { name: new RegExp(SITE_NAME, 'i') })).toBeInTheDocument();
});

test('renders dashboard header and sidebar navigation', async () => {
  await renderApp();

  expect(screen.getByRole('heading', { name: /learn smarter/i })).toBeInTheDocument();
  const nav = screen.getByRole('navigation', { name: /sidebar navigation/i });
  expect(within(nav).getByRole('link', { name: /^Dashboard$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: /^Registration$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: /^FAQ$/i })).toHaveAttribute('href', '/faq');
  expect(screen.getAllByRole('link', { name: /^Sign In$/i }).length).toBeGreaterThan(0);
  expect(screen.queryByRole('button', { name: /^Logout$/i })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /^Sign Up$/i })).toBeInTheDocument();
});

test('renders course stack submenus when Courses is expanded', async () => {
  await renderApp();
  const nav = screen.getByRole('navigation', { name: /sidebar navigation/i });

  fireEvent.click(screen.getByRole('button', { name: /^Courses$/i }));

  courseStackKeys.forEach((stack) => {
    expect(within(nav).getByText(stack)).toBeInTheDocument();
    courseStacks[stack].forEach(({ label }) => {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument();
    });
  });
});

test('courses submenu toggles expand and collapse', async () => {
  await renderApp();

  const coursesBtn = screen.getByRole('button', { name: /^Courses$/i });
  expect(coursesBtn).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(coursesBtn);
  expect(coursesBtn).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('MEAN')).toBeInTheDocument();

  fireEvent.click(coursesBtn);
  expect(coursesBtn).toHaveAttribute('aria-expanded', 'false');
  expect(document.getElementById('submenu-courses')).toHaveAttribute('hidden');
});

test('renders dashboard widgets and popular course placeholders', async () => {
  await renderApp();

  expect(document.getElementById('featured-course-title')).toHaveTextContent(/full stack mern development/i);
  expect(screen.getByRole('link', { name: /continue learning/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /popular courses/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /frequently asked questions/i })).not.toBeInTheDocument();

  popularCoursePlaceholders.forEach(({ id, title }) => {
    expect(document.getElementById(`course-title-${id}`)).toHaveTextContent(title);
    expect(document.getElementById(`course-card-${id}`)).toBeInTheDocument();
  });
});

test('renders FAQ on dedicated page', async () => {
  window.history.pushState({}, '', '/faq');
  await renderApp();

  expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
  expect(within(screen.getByRole('navigation', { name: /sidebar navigation/i })).getByRole('link', { name: /^FAQ$/i })).toHaveAttribute('aria-current', 'page');
});

test('theme toggle switches between light and dark modes', async () => {
  window.history.pushState({}, '', '/');
  await renderApp();

  expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.light);

  fireEvent.click(screen.getByRole('button', { name: /dark/i }));
  expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.dark);

  fireEvent.click(screen.getByRole('button', { name: /light/i }));
  expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.light);
});