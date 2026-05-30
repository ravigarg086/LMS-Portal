import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { fetchUserSettings, updateUserSettings } from '../api/settingsApi';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../theme/ThemeProvider';
import { getStoredTheme, normalizeTheme } from '../theme/themeStorage';

const UserSettingsContext = createContext(null);

function mergeSettingsPatch(current, patch) {
  const next = { ...current };

  Object.keys(patch).forEach((key) => {
    if (patch[key] && typeof patch[key] === 'object' && !Array.isArray(patch[key])) {
      next[key] = { ...current[key], ...patch[key] };
    } else {
      next[key] = patch[key];
    }
  });

  return next;
}

export function UserSettingsProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const { setTheme } = useTheme();
  const setThemeRef = useRef(setTheme);
  setThemeRef.current = setTheme;
  const [userSettings, setUserSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [persisted, setPersisted] = useState(false);

  const loadSettings = useCallback(async () => {
    if (!isAuthenticated) {
      setUserSettings(null);
      setPersisted(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { settings, persisted: hasSavedSettings } = await fetchUserSettings();
      const nextSettings = { ...settings };

      if (hasSavedSettings && nextSettings.theme) {
        setThemeRef.current(nextSettings.theme);
      } else {
        nextSettings.theme = getStoredTheme();
      }

      setUserSettings(nextSettings);
      setPersisted(hasSavedSettings);
    } catch {
      setUserSettings(null);
      setPersisted(false);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings, user?.id]);

  const patchUserSettings = useCallback((patch) => {
    setUserSettings((current) => {
      if (!current) {
        return current;
      }

      return mergeSettingsPatch(current, patch);
    });
  }, []);

  const updateThemePreference = useCallback(async (nextTheme) => {
    const normalized = normalizeTheme(nextTheme);
    setTheme(normalized);
    patchUserSettings({ theme: normalized });

    if (!isAuthenticated) {
      return;
    }

    try {
      const response = await updateUserSettings({ theme: normalized });
      setUserSettings(response.settings);
      setPersisted(true);
    } catch {
      // Keep the locally applied theme; user can retry via Save personal settings.
    }
  }, [isAuthenticated, patchUserSettings, setTheme]);

  const saveUserSettings = useCallback(
    async (nextSettings) => {
      setSaving(true);

      try {
        const response = await updateUserSettings(nextSettings);
        setUserSettings(response.settings);
        setPersisted(true);

        if (response.settings?.theme) {
          setTheme(response.settings.theme);
        }

        return response.settings;
      } finally {
        setSaving(false);
      }
    },
    [setTheme],
  );

  const value = useMemo(
    () => ({
      userSettings,
      loading,
      saving,
      persisted,
      reload: loadSettings,
      patchUserSettings,
      updateThemePreference,
      saveUserSettings,
    }),
    [userSettings, loading, saving, persisted, loadSettings, patchUserSettings, updateThemePreference, saveUserSettings],
  );

  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>;
}

export function useUserSettings() {
  const context = useContext(UserSettingsContext);

  if (!context) {
    throw new Error('useUserSettings must be used within UserSettingsProvider');
  }

  return context;
}
