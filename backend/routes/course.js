// routes/course.js
const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  createCourseAssignment,
  getAllCourseAssignments,
  deleteCourseAssignment,
  getTeacherCourses,
  getCourseStats
} = require('../controllers/courseController');

// Course Routes - Remove '/courses' prefix since it's already in server.js
router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/stats/summary', getCourseStats);
router.get('/:id', getCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

// Course Assignment Routes
router.post('/assignments', createCourseAssignment);
router.get('/assignments', getAllCourseAssignments);
router.delete('/assignments/:id', deleteCourseAssignment);

// Teacher Courses Route
router.get('/teachers/:teacherId', getTeacherCourses);

module.exports = router;