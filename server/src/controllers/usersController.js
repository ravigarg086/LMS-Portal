const userStore = require('../store/userStore');
const { createStudentDashboard } = require('../utils/studentDashboard');
const { buildEnrollmentComparison } = require('../utils/enrollmentStats');

const STUDENT_EDITABLE_FIELDS = ['fullName', 'email', 'academicTrack', 'graduationYear'];
const ADMIN_EDITABLE_FIELDS = [
  'fullName',
  'email',
  'academicTrack',
  'graduationYear',
  'department',
  'employeeId',
  'accessLevel',
];

async function getMyDashboard(req, res) {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Dashboard data is only available for student accounts.' });
  }

  if (!req.user.dashboard?.featuredCourse?.title) {
    req.user.dashboard = createStudentDashboard(req.user);
    await req.user.save();
  }

  return res.json({ dashboard: req.user.dashboard, user: req.user.toSafeJSON() });
}

async function listStudents(req, res) {
  const students = await userStore.findByRole('student');
  return res.json({ users: students.map((student) => student.toSafeJSON()) });
}

async function listFaculty(req, res) {
  const faculty = await userStore.findByRole('faculty');
  return res.json({ users: faculty.map((member) => member.toSafeJSON()) });
}

async function createManagedUser(req, res) {
  try {
    const { role, fullName, email, password, academicTrack, graduationYear, department, employeeId } = req.body;

    if (req.user.role === 'faculty') {
      if (role && role !== 'student') {
        return res.status(403).json({ message: 'Faculty can only create student accounts.' });
      }
    } else if (req.user.role === 'admin') {
      if (!['student', 'faculty'].includes(role)) {
        return res.status(400).json({ message: 'Admins can only create student or faculty accounts.' });
      }
    } else {
      return res.status(403).json({ message: 'You do not have permission to create users.' });
    }

    const targetRole = req.user.role === 'faculty' ? 'student' : role;

    if (!fullName?.trim() || !email?.trim() || !password || password.length < 8) {
      return res.status(400).json({ message: 'Full name, email, and password (8+ chars) are required.' });
    }

    const payload = {
      role: targetRole,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
    };

    if (targetRole === 'student') {
      payload.academicTrack = academicTrack?.trim() || 'Computer Science';
      payload.graduationYear = graduationYear?.trim() || '';
      payload.dashboard = createStudentDashboard({
        email: payload.email,
        academicTrack: payload.academicTrack,
      });
    } else {
      payload.department = department?.trim() || '';
      payload.employeeId = employeeId?.trim() || '';
    }

    const user = await userStore.createUser(payload);
    return res.status(201).json({ user: user.toSafeJSON() });
  } catch (error) {
    if (error.status === 409) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Unable to create user.' });
  }
}

async function updateManagedUser(req, res) {
  try {
    const target = await userStore.findById(req.params.id);
    if (!target) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (req.user.role === 'faculty') {
      if (target.role !== 'student') {
        return res.status(403).json({ message: 'Faculty can only edit student profiles.' });
      }

      STUDENT_EDITABLE_FIELDS.forEach((field) => {
        if (req.body[field] !== undefined) {
          target[field] = String(req.body[field]).trim();
        }
      });
    } else if (req.user.role === 'admin') {
      if (target.role === 'admin' && target.id !== req.user.id) {
        return res.status(403).json({ message: 'Admin accounts cannot be edited by other admins here.' });
      }

      ADMIN_EDITABLE_FIELDS.forEach((field) => {
        if (req.body[field] !== undefined) {
          target[field] = String(req.body[field]).trim();
        }
      });

      if (target.role === 'student' && target.dashboard?.featuredCourse && req.body.academicTrack) {
        target.dashboard.featuredCourse.title = req.body.academicTrack.trim();
      }
    } else {
      return res.status(403).json({ message: 'You do not have permission to edit this profile.' });
    }

    await target.save();
    return res.json({ user: target.toSafeJSON() });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update user.' });
  }
}

async function getEnrollmentComparison(req, res) {
  const students = await userStore.findByRole('student');
  const payload = students.map((student) => student.toSafeJSON());
  return res.json(buildEnrollmentComparison(payload));
}

async function deleteManagedUser(req, res) {
  try {
    const target = await userStore.findById(req.params.id);
    if (!target) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!['student', 'faculty'].includes(target.role)) {
      return res.status(403).json({ message: 'Only student or faculty accounts can be deleted.' });
    }

    if (target.id === req.user.id) {
      return res.status(403).json({ message: 'You cannot delete your own account from this panel.' });
    }

    await userStore.deleteUser(target.id);
    return res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete user.' });
  }
}

module.exports = {
  getMyDashboard,
  listStudents,
  listFaculty,
  createManagedUser,
  updateManagedUser,
  getEnrollmentComparison,
  deleteManagedUser,
};
