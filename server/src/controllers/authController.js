const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userStore = require('../store/userStore');
const { createStudentDashboard } = require('../utils/studentDashboard');

function signToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role },
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

    const {
      role,
      fullName,
      email,
      password,
      academicTrack,
      graduationYear,
      department,
      employeeId,
      accessLevel,
      inviteKey,
    } = req.body;

    if (role === 'admin' && inviteKey !== (process.env.ADMIN_INVITE_KEY || 'lms-admin-invite-2026')) {
      return res.status(403).json({ message: 'Invalid master access token.' });
    }

    const payload = {
      role,
      fullName: String(fullName || '').trim(),
      email: String(email || '').trim(),
      password,
      academicTrack: role === 'student' ? String(academicTrack || '').trim() : '',
      graduationYear: role === 'student' ? String(graduationYear || '').trim() : '',
      department: role === 'faculty' ? String(department || '').trim() : '',
      employeeId: role === 'faculty' ? String(employeeId || '').trim() : '',
      accessLevel: role === 'admin' ? String(accessLevel || '').trim() : '',
    };

    if (role === 'student') {
      payload.dashboard = createStudentDashboard({
        email: payload.email.toLowerCase(),
        academicTrack: payload.academicTrack,
      });
    }

    const user = await userStore.createUser(payload);

    return res.status(201).json({
      message: 'Registration successful. Please sign in with your new account.',
      user: user.toSafeJSON(),
    });
  } catch (error) {
    if (error.status === 409) {
      return res.status(409).json({ message: error.message });
    }
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

    const user = await userStore.findByCredentials(role, identifier);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials for the selected persona.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials for the selected persona.' });
    }

    if (user.role === 'student' && !user.dashboard?.featuredCourse?.title) {
      user.dashboard = createStudentDashboard(user);
      await user.save();
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

async function changePassword(req, res) {
  try {
    const errors = require('../utils/validation').validateChangePasswordPayload(req.body);
    if (Object.keys(errors).length) {
      return res.status(400).json({ message: 'Validation failed.', errors });
    }

    const { currentPassword, newPassword } = req.body;
    const user = req.user;
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update password. Please try again.' });
  }
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  changePassword,
  signToken,
  setAuthCookie,
};
