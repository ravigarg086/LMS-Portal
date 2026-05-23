const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const {
  getMyDashboard,
  listStudents,
  listFaculty,
  createManagedUser,
  updateManagedUser,
  getEnrollmentComparison,
  deleteManagedUser,
} = require('../controllers/usersController');

const router = express.Router();

router.use(authMiddleware);

router.get('/me/dashboard', requireRole('student'), getMyDashboard);
router.get('/enrollment-comparison', requireRole('admin'), getEnrollmentComparison);
router.get('/students', requireRole('faculty', 'admin'), listStudents);
router.get('/faculty', requireRole('admin'), listFaculty);
router.post('/', requireRole('faculty', 'admin'), createManagedUser);
router.put('/:id', requireRole('faculty', 'admin'), updateManagedUser);
router.delete('/:id', requireRole('admin'), deleteManagedUser);

module.exports = router;
