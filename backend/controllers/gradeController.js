// controllers/gradeController.js
const Grade = require('../models/Grade');
const Student = require('../models/Student');
const mongoose = require('mongoose');

// @desc    Create a new grade
// @route   POST /api/grades
// @access  Private (Teacher)
exports.createGrade = async (req, res) => {
  try {
    const { studentId, subject, score, term, remarks } = req.body;
    
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'অনুমোদন প্রয়োজন'
      });
    }
    
    const teacherId = req.user.id;

    // Validate input
    if (!studentId || !subject || score === undefined) {
      return res.status(400).json({
        success: false,
        message: 'শিক্ষার্থী, বিষয় এবং নম্বর প্রয়োজন'
      });
    }

    // Validate score range
    if (score < 0 || score > 100) {
      return res.status(400).json({
        success: false,
        message: 'নম্বর ০ থেকে ১০০ এর মধ্যে হতে হবে'
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: 'অবৈধ শিক্ষার্থী আইডি'
      });
    }

    // Find student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'শিক্ষার্থী পাওয়া যায়নি'
      });
    }

    // Get academic year and term
    const academicYear = new Date().getFullYear().toString();
    const gradeTerms = term || 'First Term';

    // Check if grade already exists for this student, subject, and term
    const existingGrade = await Grade.findOne({
      studentId,
      subject,
      term: gradeTerms,
      academicYear
    });

    if (existingGrade) {
      return res.status(400).json({
        success: false,
        message: 'এই শিক্ষার্থীর জন্য এই বিষয়ে ইতিমধ্যে নম্বর যোগ করা হয়েছে'
      });
    }

    // Extract student name and class properly
    const studentName = student.fullName || 'Unknown';
    const studentClass = student.className || 'Unknown';

    // Create new grade
    const grade = await Grade.create({
      studentId,
      studentName,
      studentClass,
      subject,
      score,
      teacherId,
      term: gradeTerms,
      academicYear,
      remarks
    });

    res.status(201).json({
      success: true,
      message: 'নম্বর সফলভাবে যোগ করা হয়েছে',
      data: grade
    });

  } catch (error) {
    console.error('Create grade error:', error);
    res.status(500).json({
      success: false,
      message: 'নম্বর যোগ করতে ব্যর্থ হয়েছে',
      error: error.message
    });
  }
};

// @desc    Get all grades (with filters)
// @route   GET /api/grades
// @access  Private (Teacher)
exports.getAllGrades = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'অনুমোদন প্রয়োজন'
      });
    }
    
    const teacherId = req.user.id;
    const { 
      class: className, 
      subject, 
      studentId, 
      academicYear, 
      term,
      page = 1,
      limit = 50
    } = req.query;

    // Build query
    let query = { teacherId };

    if (className && className !== 'all') {
      query.studentClass = className;
    }

    if (subject && subject !== 'all') {
      query.subject = subject;
    }

    if (studentId) {
      query.studentId = studentId;
    }

    if (academicYear) {
      query.academicYear = academicYear;
    }

    if (term) {
      query.term = term;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch grades with student details and pagination
    const grades = await Grade.find(query)
      .populate('studentId', 'fullName className')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination
    const totalCount = await Grade.countDocuments(query);

    // Transform data for frontend
    const transformedGrades = grades.map(grade => ({
      id: grade._id,
      studentId: grade.studentId?._id,
      student: grade.studentName,
      class: grade.studentClass,
      subject: grade.subject,
      score: grade.score,
      gradeLetter: grade.gradeLetter,
      term: grade.term,
      academicYear: grade.academicYear,
      remarks: grade.remarks,
      createdAt: grade.createdAt,
      updatedAt: grade.updatedAt
    }));

    res.status(200).json({
      success: true,
      count: transformedGrades.length,
      totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      data: transformedGrades
    });

  } catch (error) {
    console.error('Get grades error:', error);
    res.status(500).json({
      success: false,
      message: 'নম্বর লোড করতে ব্যর্থ হয়েছে',
      error: error.message
    });
  }
};

// @desc    Get grade by ID
// @route   GET /api/grades/:id
// @access  Private (Teacher)
exports.getGradeById = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'অবৈধ গ্রেড আইডি'
      });
    }

    const grade = await Grade.findById(req.params.id)
      .populate('studentId', 'fullName className');

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'নম্বর পাওয়া যায়নি'
      });
    }

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'অনুমোদন প্রয়োজন'
      });
    }
    
    // Check if teacher owns this grade
    if (grade.teacherId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'এই নম্বর দেখার অনুমতি নেই'
      });
    }

    res.status(200).json({
      success: true,
      data: grade
    });

  } catch (error) {
    console.error('Get grade error:', error);
    res.status(500).json({
      success: false,
      message: 'নম্বর লোড করতে ব্যর্থ হয়েছে',
      error: error.message
    });
  }
};

// @desc    Update grade
// @route   PUT /api/grades/:id
// @access  Private (Teacher)
exports.updateGrade = async (req, res) => {
  try {
    const { score, remarks, term } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'অবৈধ গ্রেড আইডি'
      });
    }

    // Find grade
    let grade = await Grade.findById(req.params.id);

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'নম্বর পাওয়া যায়নি'
      });
    }

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'অনুমোদন প্রয়োজন'
      });
    }
    
    // Check if teacher owns this grade
    if (grade.teacherId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'এই নম্বর সম্পাদনা করার অনুমতি নেই'
      });
    }

    // Validate score if provided
    if (score !== undefined) {
      if (typeof score !== 'number' || score < 0 || score > 100) {
        return res.status(400).json({
          success: false,
          message: 'নম্বর ০ থেকে ১০০ এর মধ্যে হতে হবে'
        });
      }
      grade.score = score;
    }

    if (remarks !== undefined) grade.remarks = remarks;
    if (term) grade.term = term;

    await grade.save();

    res.status(200).json({
      success: true,
      message: 'নম্বর সফলভাবে আপডেট করা হয়েছে',
      data: grade
    });

  } catch (error) {
    console.error('Update grade error:', error);
    res.status(500).json({
      success: false,
      message: 'নম্বর আপডেট করতে ব্যর্থ হয়েছে',
      error: error.message
    });
  }
};

// @desc    Delete grade
// @route   DELETE /api/grades/:id
// @access  Private (Teacher)
exports.deleteGrade = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'অবৈধ গ্রেড আইডি'
      });
    }

    const grade = await Grade.findById(req.params.id);

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'নম্বর পাওয়া যায়নি'
      });
    }

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'অনুমোদন প্রয়োজন'
      });
    }
    
    // Check if teacher owns this grade
    if (grade.teacherId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'এই নম্বর মুছে ফেলার অনুমতি নেই'
      });
    }

    await grade.deleteOne();

    res.status(200).json({
      success: true,
      message: 'নম্বর সফলভাবে মুছে ফেলা হয়েছে'
    });

  } catch (error) {
    console.error('Delete grade error:', error);
    res.status(500).json({
      success: false,
      message: 'নম্বর মুছে ফেলতে ব্যর্থ হয়েছে',
      error: error.message
    });
  }
};

// @desc    Get grade statistics
// @route   GET /api/grades/stats
// @access  Private (Teacher)
exports.getGradeStats = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'অনুমোদন প্রয়োজন'
      });
    }
    
    const teacherId = req.user.id;
    const { class: className, subject, academicYear, term } = req.query;

    let query = { teacherId };
    if (className && className !== 'all') query.studentClass = className;
    if (subject && subject !== 'all') query.subject = subject;
    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;

    const grades = await Grade.find(query);

    if (grades.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          averageScore: 0,
          highestScore: 0,
          lowestScore: 0,
          totalGrades: 0,
          passRate: 0,
          gradeDistribution: {
            'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0
          }
        }
      });
    }

    const scores = grades.map(g => g.score);
    const gradeDistribution = grades.reduce((acc, grade) => {
      acc[grade.gradeLetter] = (acc[grade.gradeLetter] || 0) + 1;
      return acc;
    }, { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 });

    const passedStudents = grades.filter(g => g.score >= 40).length;
    const passRate = Math.round((passedStudents / grades.length) * 100);

    const stats = {
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      totalGrades: grades.length,
      passRate,
      gradeDistribution
    };

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'পরিসংখ্যান লোড করতে ব্যর্থ হয়েছে',
      error: error.message
    });
  }
};

// @desc    Get student grades (for student/guardian view)
// @route   GET /api/grades/student/:studentId
// @access  Private (Student/Guardian)
exports.getStudentGrades = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { academicYear, term } = req.query;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: 'অবৈধ শিক্ষার্থী আইডি'
      });
    }

    let query = { studentId };
    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;

    const grades = await Grade.find(query)
      .populate('teacherId', 'teacherName')
      .sort({ subject: 1, createdAt: -1 });

    // Calculate overall statistics
    const totalScore = grades.reduce((sum, grade) => sum + grade.score, 0);
    const averageScore = grades.length > 0 ? Math.round(totalScore / grades.length) : 0;

    res.status(200).json({
      success: true,
      count: grades.length,
      averageScore,
      data: grades
    });

  } catch (error) {
    console.error('Get student grades error:', error);
    res.status(500).json({
      success: false,
      message: 'নম্বর লোড করতে ব্যর্থ হয়েছে',
      error: error.message
    });
  }
};