import { THEME_STORAGE_KEY, THEMES } from '../constants';

const THEME_COLORS = {
  [THEMES.light]: '#FDF8F3',
  [THEMES.dark]: '#1A1A1A',
};

export function normalizeTheme(value) {
  return value === THEMES.dark ? THEMES.dark : THEMES.light;
}

export function getStoredTheme() {
  try {
    return normalizeTheme(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return THEMES.light;
  }
}

export function persistTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, normalizeTheme(theme));
  } catch {
    /* storage unavailable */
  }
}

export function applyTheme(theme) {
  const resolved = normalizeTheme(theme);
  document.documentElement.setAttribute('data-theme', resolved);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', THEME_COLORS[resolved]);
  }
}
