// controllers/courseController.js
const Course = require('../models/Course');
const Teacher = require('../models/Teacher');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseCode, className, description } = req.body;

    // Validation
    if (!courseName || !courseCode || !className) {
      return res.status(400).json({
        success: false,
        message: 'কোর্সের নাম, কোড এবং ক্লাস প্রয়োজন'
      });
    }

    // Check if course code already exists
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: 'এই কোর্স কোড ইতিমধ্যে বিদ্যমান'
      });
    }

    const course = await Course.create({
      courseName,
      courseCode,
      className,
      description
    });

    res.status(201).json({
      success: true,
      message: 'কোর্স সফলভাবে তৈরি হয়েছে',
      data: course
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({
      success: false,
      message: 'কোর্স তৈরি করতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const { className, teacherId } = req.query;
    
    const filters = {};
    if (className) filters.className = className;
    if (teacherId) filters.teacherId = teacherId;

    const courses = await Course.find(filters)
      .populate('teacherId', 'teacherName designation')
      .sort({ createdAt: -1 });

    // Transform courses to include teacher name
    const transformedCourses = courses.map(course => ({
      _id: course._id,
      courseName: course.courseName,
      courseCode: course.courseCode,
      className: course.className,
      description: course.description,
      teacherId: course.teacherId?._id,
      teacherName: course.teacherId?.teacherName,
      createdAt: course.createdAt
    }));

    res.status(200).json({
      success: true,
      count: transformedCourses.length,
      data: transformedCourses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'কোর্স লোড করতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// Get a single course by ID
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacherId', 'teacherName designation phoneNumber email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'কোর্স পাওয়া যায়নি'
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'কোর্স লোড করতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { courseName, courseCode, className, description, teacherId } = req.body;

    const updateData = {};
    if (courseName) updateData.courseName = courseName;
    if (courseCode) updateData.courseCode = courseCode;
    if (className) updateData.className = className;
    if (description !== undefined) updateData.description = description;
    if (teacherId !== undefined) updateData.teacherId = teacherId || null;

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('teacherId', 'teacherName designation');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'কোর্স পাওয়া যায়নি'
      });
    }

    res.status(200).json({
      success: true,
      message: 'কোর্স সফলভাবে আপডেট হয়েছে',
      data: course
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'কোর্স আপডেট করতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'কোর্স পাওয়া যায়নি'
      });
    }

    res.status(200).json({
      success: true,
      message: 'কোর্স সফলভাবে মুছে ফেলা হয়েছে',
      data: course
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'কোর্স মুছতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// ==================== COURSE ASSIGNMENT CONTROLLERS ====================

// Assign a course to a teacher
exports.createCourseAssignment = async (req, res) => {
  try {
    const { teacherId, courseId } = req.body;

    // Validation
    if (!teacherId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'শিক্ষক এবং কোর্স নির্বাচন প্রয়োজন'
      });
    }

    // Check if teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'শিক্ষক পাওয়া যায়নি'
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'কোর্স পাওয়া যায়নি'
      });
    }

    // Check if course is already assigned
    if (course.teacherId) {
      return res.status(400).json({
        success: false,
        message: 'এই কোর্স ইতিমধ্যে একজন শিক্ষককে নির্ধারিত আছে'
      });
    }

    // Update course with teacher assignment
    course.teacherId = teacherId;
    await course.save();

    // Return assignment data
    const assignment = {
      _id: course._id,
      courseId: course._id,
      courseName: course.courseName,
      courseCode: course.courseCode,
      className: course.className,
      teacherId: teacher._id,
      teacherName: teacher.teacherName,
      assignedDate: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'কোর্স সফলভাবে নির্ধারিত হয়েছে',
      data: assignment
    });
  } catch (error) {
    console.error('Error assigning course:', error);
    res.status(500).json({
      success: false,
      message: 'কোর্স নির্ধারণ করতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// Get all course assignments
exports.getAllCourseAssignments = async (req, res) => {
  try {
    const { teacherId, className } = req.query;
    
    const filters = { teacherId: { $ne: null } };
    if (teacherId) filters.teacherId = teacherId;
    if (className) filters.className = className;

    const courses = await Course.find(filters)
      .populate('teacherId', 'teacherName designation')
      .sort({ createdAt: -1 });

    const assignments = courses.map(course => ({
      _id: course._id,
      courseId: course._id,
      courseName: course.courseName,
      courseCode: course.courseCode,
      className: course.className,
      teacherId: course.teacherId._id,
      teacherName: course.teacherId.teacherName,
      assignedDate: course.updatedAt
    }));

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error('Error fetching course assignments:', error);
    res.status(500).json({
      success: false,
      message: 'নির্ধারণ লোড করতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// Remove course assignment (unassign teacher from course)
exports.deleteCourseAssignment = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'কোর্স পাওয়া যায়নি'
      });
    }

    if (!course.teacherId) {
      return res.status(400).json({
        success: false,
        message: 'এই কোর্স কোন শিক্ষককে নির্ধারিত নেই'
      });
    }

    // Remove teacher assignment
    course.teacherId = null;
    await course.save();

    res.status(200).json({
      success: true,
      message: 'নির্ধারণ সফলভাবে মুছে ফেলা হয়েছে',
      data: course
    });
  } catch (error) {
    console.error('Error removing assignment:', error);
    res.status(500).json({
      success: false,
      message: 'নির্ধারণ মুছতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// Get teacher's assigned courses
exports.getTeacherCourses = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const courses = await Course.find({ teacherId })
      .select('courseName courseCode className description')
      .sort({ courseName: 1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching teacher courses:', error);
    res.status(500).json({
      success: false,
      message: 'কোর্স লোড করতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// Get course statistics
exports.getCourseStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const assignedCourses = await Course.countDocuments({ teacherId: { $ne: null } });
    const unassignedCourses = totalCourses - assignedCourses;

    // Get courses by class
    const coursesByClass = await Course.aggregate([
      {
        $group: {
          _id: '$className',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalCourses,
        assignedCourses,
        unassignedCourses,
        coursesByClass
      }
    });
  } catch (error) {
    console.error('Error fetching course stats:', error);
    res.status(500).json({
      success: false,
      message: 'পরিসংখ্যান লোড করতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};