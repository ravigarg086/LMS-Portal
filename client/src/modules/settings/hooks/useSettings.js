import { useCallback, useEffect, useState } from 'react';
import { fetchPlatformSettings, updatePlatformSettings } from '../../../shared/api/settingsApi';
import { useUserSettings } from '../../../shared/settings/UserSettingsContext';

export function useSettings(isAdmin) {
  const {
    userSettings,
    loading: userSettingsLoading,
    saving: userSaving,
    saveUserSettings: saveUserSettingsContext,
    patchUserSettings,
  } = useUserSettings();

  const [platformSettings, setPlatformSettings] = useState(null);
  const [platformLoading, setPlatformLoading] = useState(false);
  const [savingPlatform, setSavingPlatform] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadPlatformSettings = useCallback(async () => {
    if (!isAdmin) {
      setPlatformSettings(null);
      setPlatformLoading(false);
      return;
    }

    setPlatformLoading(true);
    setError('');

    try {
      const platformResponse = await fetchPlatformSettings();
      setPlatformSettings(platformResponse.settings);
    } catch (err) {
      setError(err.message || 'Unable to load platform settings.');
    } finally {
      setPlatformLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    loadPlatformSettings();
  }, [loadPlatformSettings]);

  const saveUserSettings = async (nextSettings) => {
    setError('');
    setSuccess('');

    try {
      await saveUserSettingsContext(nextSettings);
      setSuccess('Your settings were saved.');
      return nextSettings;
    } catch (err) {
      setError(err.message || 'Unable to save settings.');
      throw err;
    }
  };

  const savePlatformSettings = async (nextSettings) => {
    setSavingPlatform(true);
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
      setSavingPlatform(false);
    }
  };

  const patchPlatformSettings = (patch) => {
    setPlatformSettings((current) => ({ ...current, ...patch }));
  };

  return {
    userSettings,
    platformSettings,
    loading: userSettingsLoading || platformLoading,
    saving: userSaving || savingPlatform,
    error,
    success,
    setError,
    setSuccess,
    reload: loadPlatformSettings,
    saveUserSettings,
    savePlatformSettings,
    patchUserSettings,
    patchPlatformSettings,
  };
}
