// routes/homework.js
const express = require('express');
const router = express.Router();
const {
  createHomework,
  getAllHomework,
  getHomework,
  updateHomework,
  deleteHomework,
  getHomeworkByClass,
  getHomeworkByTeacher,
  markAsCompleted,
  updateAllStatus
} = require('../controllers/homeworkController');

// IMPORTANT: Place specific routes BEFORE parameterized routes

// Update all homework status (for cron job or admin)
router.put('/update-status', updateAllStatus);

// Get homework by class
router.get('/class/:className', getHomeworkByClass);

// Get homework by teacher
router.get('/teacher/:teacherId', getHomeworkByTeacher);

// Mark homework as completed
router.post('/:id/complete', markAsCompleted);

// Get all homework (with optional query params: ?className=&teacherId=&status=)
router.get('/', getAllHomework);

// Get single homework by ID
router.get('/:id', getHomework);

// Create new homework
router.post('/', createHomework);

// Update homework
router.put('/:id', updateHomework);

// Delete homework
router.delete('/:id', deleteHomework);

module.exports = router;