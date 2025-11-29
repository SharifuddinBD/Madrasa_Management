const Student = require('../models/Student');

// Create new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    
    res.status(201).json({
      success: true,
      message: 'শিক্ষার্থী সফলভাবে যুক্ত হয়েছে',
      data: student
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      
      return res.status(400).json({
        success: false,
        message: 'তথ্য যাচাই করতে সমস্যা হয়েছে',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'সার্ভার ত্রুটি ঘটেছে',
      error: error.message
    });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, className, search } = req.query;
    
    const query = {};
    if (className) query.className = className;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { fatherName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    const students = await Student.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Student.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: students,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'সার্ভার ত্রুটি ঘটেছে',
      error: error.message
    });
  }
};

// Get single student
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'শিক্ষার্থী খুঁজে পাওয়া যায়নি'
      });
    }
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'সার্ভার ত্রুটি ঘটেছে',
      error: error.message
    });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'শিক্ষার্থী খুঁজে পাওয়া যায়নি'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'তথ্য সফলভাবে আপডেট হয়েছে',
      data: student
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      
      return res.status(400).json({
        success: false,
        message: 'তথ্য যাচাই করতে সমস্যা হয়েছে',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'সার্ভার ত্রুটি ঘটেছে',
      error: error.message
    });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'শিক্ষার্থী খুঁজে পাওয়া যায়নি'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'শিক্ষার্থী সফলভাবে মুছে ফেলা হয়েছে'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'সার্ভার ত্রুটি ঘটেছে',
      error: error.message
    });
  }
};