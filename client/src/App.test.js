import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { popularCoursePlaceholders } from './modules/home/data/popularCourses';
import { courseStackKeys, courseStacks } from './modules/home/data/courseStacks';
import { SITE_NAME, THEMES, THEME_STORAGE_KEY } from './modules/home/constants';

const mockExternalUser = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-7368031',
  address: { city: 'Gwenborough' },
  company: { name: 'Romaguera-Crona' },
};

function createFetchMock() {
  return jest.fn((url, options = {}) => {
    const urlString = typeof url === 'string' ? url : url.url;
    const method = (options.method || 'GET').toUpperCase();

    if (urlString.includes('jsonplaceholder.typicode.com/users')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([mockExternalUser]),
      });
    }

    if (urlString.includes('/api/external/users')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            users: [mockExternalUser],
            source: 'jsonplaceholder',
          }),
      });
    }

    if (urlString.includes('/api/contact') && method === 'POST') {
      return Promise.resolve({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ message: 'Thank you — we received your inquiry.' }),
      });
    }

    return Promise.resolve({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ message: 'Authentication required.' }),
    });
  });
}

beforeEach(() => {
  localStorage.removeItem(THEME_STORAGE_KEY);
  sessionStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.removeAttribute('data-bs-theme');

  global.fetch = createFetchMock();
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
  expect(within(nav).getByRole('link', { name: /^Dashboard$/i })).toHaveAttribute('href', '/');
  expect(within(nav).getByRole('link', { name: /^Registration$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: /^Photo Gallery$/i })).toHaveAttribute('href', '/photo-gallery');
  expect(within(nav).getByRole('link', { name: /^FAQ$/i })).toHaveAttribute('href', '/faq');
  expect(within(nav).getByRole('link', { name: /^Contact Us$/i })).toHaveAttribute('href', '/contact');
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

test('renders guest dashboard and popular course placeholders', async () => {
  await renderApp();

  expect(screen.getByRole('heading', { name: /explore the lms portal/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /portal services/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /built for every role/i })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /continue learning/i })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /popular courses/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /frequently asked questions/i })).not.toBeInTheDocument();

  popularCoursePlaceholders.forEach(({ id, title }) => {
    expect(document.getElementById(`course-title-${id}`)).toHaveTextContent(title);
    expect(document.getElementById(`course-card-${id}`)).toBeInTheDocument();
  });
});

test('navigates from contact page to guest dashboard', async () => {
  window.history.pushState({}, '', '/contact');
  await renderApp();

  expect(screen.getByRole('heading', { name: /^Contact Form$/i })).toBeInTheDocument();

  const nav = screen.getByRole('navigation', { name: /sidebar navigation/i });
  fireEvent.click(within(nav).getByRole('link', { name: /^Dashboard$/i }));

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /explore the lms portal/i })).toBeInTheDocument();
  });
  expect(screen.queryByRole('heading', { name: /^Contact Form$/i })).not.toBeInTheDocument();
});

test('renders FAQ on dedicated page', async () => {
  window.history.pushState({}, '', '/faq');
  await renderApp();

  expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
  expect(within(screen.getByRole('navigation', { name: /sidebar navigation/i })).getByRole('link', { name: /^FAQ$/i })).toHaveAttribute('aria-current', 'page');
});

test('renders external users table on dedicated page', async () => {
  window.history.pushState({}, '', '/external-data');
  await renderApp();

  expect(screen.getByRole('heading', { name: /external user directory/i })).toBeInTheDocument();
  const table = document.getElementById('external-users-table');
  const tbody = table.querySelector('tbody');
  expect(await within(tbody).findByText('Leanne Graham')).toBeInTheDocument();
  expect(within(tbody).getByText('Gwenborough')).toBeInTheDocument();
  expect(within(tbody).getByText('Romaguera-Crona')).toBeInTheDocument();
  expect(within(screen.getByRole('navigation', { name: /sidebar navigation/i })).getByRole('link', { name: /^External Data$/i })).toHaveAttribute('aria-current', 'page');
});

test('filters external users via global search', async () => {
  window.history.pushState({}, '', '/external-data');
  await renderApp();

  expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/search users/i), { target: { value: 'zzzznotfound' } });
  expect(await screen.findByText(/no users found matching your criteria/i)).toBeInTheDocument();
});

test('renders photo gallery with lightbox on dedicated page', async () => {
  window.history.pushState({}, '', '/photo-gallery');
  await renderApp();

  expect(screen.getByRole('heading', { name: /course photo gallery/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /open react & hooks in lightbox/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /open react & hooks in lightbox/i }));
  expect(screen.getByRole('dialog', { name: /react & hooks photo preview/i })).toBeInTheDocument();
});

test('renders contact page and submits validated form', async () => {
  window.history.pushState({}, '', '/contact');
  await renderApp();

  expect(screen.getByRole('heading', { name: /^Contact Details$/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /^Contact Form$/i })).toBeInTheDocument();
  expect(screen.getByTitle(/lms portal campus/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
  expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/^Full Name$/i), { target: { value: 'Alex Morgan' } });
  fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'alex@campus.edu' } });
  fireEvent.change(screen.getByLabelText(/^Designation$/i), { target: { value: 'student' } });
  fireEvent.change(screen.getByLabelText(/^Location$/i), { target: { value: 'Chicago, IL' } });
  fireEvent.change(screen.getByLabelText(/^Phone Number$/i), { target: { value: '+1 (312) 555-0199' } });
  fireEvent.change(screen.getByLabelText(/^Subject$/i), { target: { value: 'Course inquiry' } });
  fireEvent.change(screen.getByLabelText(/^Message$/i), { target: { value: 'I would like more details about MERN courses.' } });
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));

  expect(await screen.findByText(/thank you — we received your inquiry/i)).toBeInTheDocument();
});

test('theme toggle switches between light and dark modes', async () => {
  window.history.pushState({}, '', '/');
  await renderApp();

  expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.light);
  expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEMES.light);

  fireEvent.click(screen.getByRole('button', { name: /dark/i }));
  expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.dark);
  expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEMES.dark);

  fireEvent.click(screen.getByRole('button', { name: /light/i }));
  expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.light);
  expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEMES.light);
});
