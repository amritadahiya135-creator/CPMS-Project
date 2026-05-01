const express = require('express');
const subjectController = require('../controllers/subjectController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(subjectController.getAllSubjects)
  .post(restrictTo('admin'), subjectController.createSubject);

router
  .route('/:id')
  .get(subjectController.getSubject)
  .put(restrictTo('admin'), subjectController.updateSubject)
  .delete(restrictTo('admin'), subjectController.deleteSubject);

module.exports = router;
