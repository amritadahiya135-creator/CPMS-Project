const express = require('express');
const timetableController = require('../controllers/timetableController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(timetableController.getAllTimetables)
  .post(restrictTo('admin'), timetableController.createOrUpdateTimetable);

router
  .route('/:day')
  .get(timetableController.getTimetable);

module.exports = router;
