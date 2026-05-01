const express = require('express');
const professorController = require('../controllers/professorController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// All professor routes require authentication
router.use(protect);

router
  .route('/')
  .get(professorController.getAllProfessors)
  .post(restrictTo('admin'), professorController.createProfessor);

router
  .route('/:id')
  .get(professorController.getProfessor)
  .put(restrictTo('admin'), professorController.updateProfessor)
  .delete(restrictTo('admin'), professorController.deleteProfessor);

module.exports = router;
