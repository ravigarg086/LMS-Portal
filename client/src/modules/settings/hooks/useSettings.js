import { useCallback, useEffect, useState } from 'react';
import {
  fetchPlatformSettings,
  fetchUserSettings,
  updatePlatformSettings,
  updateUserSettings,
} from '../../../shared/api/settingsApi';

export function useSettings(isAdmin) {
  const [userSettings, setUserSettings] = useState(null);
  const [platformSettings, setPlatformSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const { settings } = await fetchUserSettings();
      setUserSettings(settings);

      if (isAdmin) {
        const platformResponse = await fetchPlatformSettings();
        setPlatformSettings(platformResponse.settings);
      }
    } catch (err) {
      setError(err.message || 'Unable to load settings.');
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    load();
  }, [load]);

  const saveUserSettings = async (nextSettings) => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await updateUserSettings(nextSettings);
      setUserSettings(response.settings);
      setSuccess('Your settings were saved.');
      return response.settings;
    } catch (err) {
      setError(err.message || 'Unable to save settings.');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const savePlatformSettings = async (nextSettings) => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await updatePlatformSettings(nextSettings);
      setPlatformSettings(response.settings);
      setSuccess('Platform settings were saved.');
      return response.settings;
    } catch (err) {
      setError(err.message || 'Unable to save platform settings.');
      if (err.errors) {
        setError(Object.values(err.errors).join(' '));
      }
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const patchUserSettings = (patch) => {
    setUserSettings((current) => {
      if (!current) {
        return current;
      }

      const next = { ...current };

      Object.keys(patch).forEach((key) => {
        if (patch[key] && typeof patch[key] === 'object' && !Array.isArray(patch[key])) {
          next[key] = { ...current[key], ...patch[key] };
        } else {
          next[key] = patch[key];
        }
      });

      return next;
    });
  };

  const patchPlatformSettings = (patch) => {
    setPlatformSettings((current) => ({ ...current, ...patch }));
  };

  return {
    userSettings,
    platformSettings,
    loading,
    saving,
    error,
    success,
    setError,
    setSuccess,
    reload: load,
    saveUserSettings,
    savePlatformSettings,
    patchUserSettings,
    patchPlatformSettings,
  };
}
