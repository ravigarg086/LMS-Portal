const settingsStore = require('../store/settingsStore');
const { validatePlatformSettings } = require('../utils/defaultSettings');

async function getMySettings(req, res) {
  try {
    const { settings, persisted } = await settingsStore.getUserSettingsWithMeta(req.user.id);
    return res.json({ settings, persisted });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: error.message || 'Unable to load settings.' });
  }
}

async function updateMySettings(req, res) {
  try {
    const settings = await settingsStore.updateUserSettings(req.user.id, req.body || {});
    return res.json({ message: 'Settings saved.', settings, persisted: true });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: error.message || 'Unable to save settings.' });
  }
}

async function getPlatformSettings(req, res) {
  try {
    const settings = await settingsStore.getPlatformSettings();
    return res.json({ settings });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load platform settings.' });
  }
}

async function updatePlatformSettings(req, res) {
  try {
    const errors = validatePlatformSettings(req.body || {});
    if (Object.keys(errors).length) {
      return res.status(400).json({ message: 'Validation failed.', errors });
    }

    const settings = await settingsStore.updatePlatformSettings(req.body || {}, req.user.id);
    return res.json({ message: 'Platform settings saved.', settings });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to save platform settings.' });
  }
}

module.exports = {
  getMySettings,
  updateMySettings,
  getPlatformSettings,
  updatePlatformSettings,
};
