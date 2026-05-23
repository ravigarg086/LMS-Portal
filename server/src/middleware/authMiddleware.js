const jwt = require('jsonwebtoken');
const userStore = require('../store/userStore');

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const user = await userStore.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
}

module.exports = authMiddleware;
