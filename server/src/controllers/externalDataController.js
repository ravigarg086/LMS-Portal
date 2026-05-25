const { getExternalUsers } = require('../utils/fetchExternalUsers');

async function listExternalUsers(req, res) {
  try {
    const { users, source } = await getExternalUsers();
    res.json({ users, source });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load external users.' });
  }
}

module.exports = { listExternalUsers };
