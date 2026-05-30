import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { THEMES } from '../../modules/home/constants';
import { applyTheme, getStoredTheme, persistTheme, normalizeTheme } from './themeStorage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme) => {
    setThemeState(normalizeTheme(nextTheme));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      isDark: theme === THEMES.dark,
    }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
