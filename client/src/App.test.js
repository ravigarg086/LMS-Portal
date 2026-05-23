import { render, screen, within } from '@testing-library/react';
import App from './App';

test('renders LearnHub branding', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /LearnHub/i })).toBeInTheDocument();
});

test('renders main navigation menu items', () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /main navigation/i });
  expect(within(nav).getByRole('link', { name: /^Home$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: /^Registration$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('button', { name: /^All Courses$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: /3rd Party Data/i })).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: /^Contact Us$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: /^Sign In$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: /^MEAN$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: /React & Hooks/i })).toBeInTheDocument();
});

test('renders contact form fields', () => {
  render(<App />);
  expect(screen.getByLabelText(/^Name \*$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Designation \*$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Email \*$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Location \*$/i)).toBeInTheDocument();
});
