const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// IMPORTANT: Place specific routes BEFORE parameterized routes

// Get active teachers only
router.get('/status/active', teacherController.getActiveTeachers);

// Search teachers
router.get('/search/:query', teacherController.searchTeachers);

// Get teachers by designation
router.get('/designation/:designation', teacherController.getTeachersByDesignation);

// Get all teachers
router.get('/', teacherController.getAllTeachers);

// Get teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Create new teacher
router.post('/', teacherController.createTeacher);

// Update teacher
router.put('/:id', teacherController.updateTeacher);

// Delete teacher (soft delete)
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;