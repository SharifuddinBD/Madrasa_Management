// routes/grade.js
const express = require('express');
const router = express.Router();
const {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
  getGradeStats,
  getStudentGrades
} = require('../controllers/gradeController');
const { protect, authorize } = require('../middleware/auth');

// Public/Student routes (with auth when ready)
router.get('/student/:studentId', getStudentGrades);
router.get('/stats', protect, getGradeStats);
router.get('/:id', protect, getGradeById);
router.get('/', protect, getAllGrades);

// Protected routes (require authentication)
router.post('/', protect, createGrade);
router.put('/:id', protect, updateGrade);
router.delete('/:id', protect, deleteGrade);

module.exports = router;