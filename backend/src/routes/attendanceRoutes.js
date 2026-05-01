const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

// Professors mark attendance, admins and professors can read
router
  .route('/')
  .post(restrictTo('professor'), attendanceController.markAttendance);

router
  .route('/:subjectId')
  .get(attendanceController.getAttendanceBySubject);

module.exports = router;
