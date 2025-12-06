// controllers/homeworkController.js
const Homework = require('../models/Homework');

// @desc    Create new homework
// @route   POST /api/homework
// @access  Private (Teacher)
exports.createHomework = async (req, res) => {
  try {
    const homework = await Homework.create(req.body);
    res.status(201).json({
      success: true,
      data: homework,
      message: 'গৃহকর্ম সফলভাবে যোগ করা হয়েছে'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'গৃহকর্ম যোগ করতে সমস্যা হয়েছে'
    });
  }
};

// @desc    Get all homework
// @route   GET /api/homework
// @access  Public
exports.getAllHomework = async (req, res) => {
  try {
    const { className, teacherId, status } = req.query;
    
    let query = {};
    
    if (className) query.className = className;
    if (teacherId) query.teacherId = teacherId;
    if (status) query.status = status;
    
    const homework = await Homework.find(query)
      .populate('teacherId', 'teacherName designation')
      .sort({ dueDate: 1 });
    
    res.status(200).json({
      success: true,
      count: homework.length,
      data: homework
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'গৃহকর্ম লোড করতে সমস্যা হয়েছে'
    });
  }
};

// @desc    Get single homework by ID
// @route   GET /api/homework/:id
// @access  Public
exports.getHomework = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id)
      .populate('teacherId', 'teacherName designation')
      .populate('completedBy.studentId', 'fullName className');
    
    if (!homework) {
      return res.status(404).json({
        success: false,
        error: 'গৃহকর্ম পাওয়া যায়নি'
      });
    }
    
    res.status(200).json({
      success: true,
      data: homework
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'গৃহকর্ম লোড করতে সমস্যা হয়েছে'
    });
  }
};

// @desc    Update homework
// @route   PUT /api/homework/:id
// @access  Private (Teacher)
exports.updateHomework = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    
    if (!homework) {
      return res.status(404).json({
        success: false,
        error: 'গৃহকর্ম পাওয়া যায়নি'
      });
    }
    
    const updatedHomework = await Homework.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: updatedHomework,
      message: 'গৃহকর্ম সফলভাবে আপডেট করা হয়েছে'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'গৃহকর্ম আপডেট করতে সমস্যা হয়েছে'
    });
  }
};

// @desc    Delete homework
// @route   DELETE /api/homework/:id
// @access  Private (Teacher)
exports.deleteHomework = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    
    if (!homework) {
      return res.status(404).json({
        success: false,
        error: 'গৃহকর্ম পাওয়া যায়নি'
      });
    }
    
    await homework.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'গৃহকর্ম সফলভাবে মুছে ফেলা হয়েছে'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'গৃহকর্ম মুছে ফেলতে সমস্যা হয়েছে'
    });
  }
};

// @desc    Get homework by class
// @route   GET /api/homework/class/:className
// @access  Public
exports.getHomeworkByClass = async (req, res) => {
  try {
    const homework = await Homework.getByClass(req.params.className);
    
    res.status(200).json({
      success: true,
      count: homework.length,
      data: homework
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'গৃহকর্ম লোড করতে সমস্যা হয়েছে'
    });
  }
};

// @desc    Get homework by teacher
// @route   GET /api/homework/teacher/:teacherId
// @access  Public
exports.getHomeworkByTeacher = async (req, res) => {
  try {
    const homework = await Homework.getByTeacher(req.params.teacherId);
    
    res.status(200).json({
      success: true,
      count: homework.length,
      data: homework
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'গৃহকর্ম লোড করতে সমস্যা হয়েছে'
    });
  }
};

// @desc    Mark homework as completed by student
// @route   POST /api/homework/:id/complete
// @access  Private (Student)
exports.markAsCompleted = async (req, res) => {
  try {
    const { studentId } = req.body;
    
    const homework = await Homework.findById(req.params.id);
    
    if (!homework) {
      return res.status(404).json({
        success: false,
        error: 'গৃহকর্ম পাওয়া যায়নি'
      });
    }
    
    // Check if already completed by this student
    const alreadyCompleted = homework.completedBy.some(
      item => item.studentId.toString() === studentId
    );
    
    if (alreadyCompleted) {
      return res.status(400).json({
        success: false,
        error: 'এই গৃহকর্ম ইতিমধ্যে সম্পন্ন হয়েছে'
      });
    }
    
    homework.completedBy.push({
      studentId,
      completedDate: new Date()
    });
    
    await homework.save();
    
    res.status(200).json({
      success: true,
      data: homework,
      message: 'গৃহকর্ম সম্পন্ন হিসেবে চিহ্নিত করা হয়েছে'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'গৃহকর্ম আপডেট করতে সমস্যা হয়েছে'
    });
  }
};

// @desc    Update status of all homework (run as cron job)
// @route   PUT /api/homework/update-status
// @access  Private
exports.updateAllStatus = async (req, res) => {
  try {
    const allHomework = await Homework.find();
    
    for (let hw of allHomework) {
      await hw.updateStatus();
    }
    
    res.status(200).json({
      success: true,
      message: 'সকল গৃহকর্মের স্ট্যাটাস আপডেট করা হয়েছে'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে'
    });
  }
};