const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '8h' },
  );
}

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 8 * 60 * 60 * 1000,
  });
}

async function register(req, res) {
  try {
    const errors = require('../utils/validation').validateRegistrationPayload(req.body);
    if (Object.keys(errors).length) {
      return res.status(400).json({ message: 'Validation failed.', errors });
    }

    const { role, fullName, email, password, academicTrack, graduationYear, department, employeeId, accessLevel, inviteKey } =
      req.body;

    if (role === 'admin' && inviteKey !== process.env.ADMIN_INVITE_KEY) {
      return res.status(403).json({ message: 'Invalid master access token.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const user = await User.create({
      role,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      academicTrack: role === 'student' ? academicTrack.trim() : '',
      graduationYear: role === 'student' ? graduationYear.trim() : '',
      department: role === 'faculty' ? department.trim() : '',
      employeeId: role === 'faculty' ? employeeId.trim() : '',
      accessLevel: role === 'admin' ? accessLevel.trim() : '',
    });

    const token = signToken(user);
    setAuthCookie(res, token);

    return res.status(201).json({
      message: 'Registration successful.',
      user: user.toSafeJSON(),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
}

async function login(req, res) {
  try {
    const errors = require('../utils/validation').validateLoginPayload(req.body);
    if (Object.keys(errors).length) {
      return res.status(400).json({ message: 'Validation failed.', errors });
    }

    const { role, userId, password } = req.body;
    const identifier = userId.toLowerCase().trim();

    const user = await User.findOne({
      role,
      $or: [{ email: identifier }, { employeeId: identifier }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials for the selected persona.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials for the selected persona.' });
    }

    const token = signToken(user);
    setAuthCookie(res, token);

    return res.json({
      message: 'Signed in successfully.',
      user: user.toSafeJSON(),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Sign in failed. Please try again.' });
  }
}

function logout(req, res) {
  res.clearCookie('token');
  return res.json({ message: 'Signed out successfully.' });
}

async function getCurrentUser(req, res) {
  return res.json({ user: req.user.toSafeJSON() });
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  signToken,
  setAuthCookie,
};
