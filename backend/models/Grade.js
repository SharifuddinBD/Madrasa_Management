// models/Grade.js
const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'শিক্ষার্থী নির্বাচন প্রয়োজন']
  },
  studentName: {
    type: String,
    required: true
  },
  studentClass: {
    type: String,
    required: true,
    enum: [
      'madani-first',
      'madani-second',
      'hifz-beginner',
      'hifz-intermediate',
      'hifz-advanced',
      'nazera',
      'qaida'
    ]
  },
  subject: {
    type: String,
    required: [true, 'বিষয় নির্বাচন প্রয়োজন'],
    trim: true
  },
  score: {
    type: Number,
    required: [true, 'নম্বর প্রয়োজন'],
    min: [0, 'নম্বর ০ থেকে ১০০ এর মধ্যে হতে হবে'],
    max: [100, 'নম্বর ০ থেকে ১০০ এর মধ্যে হতে হবে']
  },
  gradeLetter: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  teacherName: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    default: function() {
      return new Date().getFullYear().toString();
    }
  },
  term: {
    type: String,
    enum: ['First Term', 'Mid Term', 'Final Term'],
    default: 'First Term'
  },
  examType: {
    type: String,
    enum: ['মাসিক পরীক্ষা', 'ষান্মাসিক পরীক্ষা', 'বার্ষিক পরীক্ষা', 'অন্যান্য'],
    default: 'মাসিক পরীক্ষা'
  },
  remarks: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Method to calculate grade letter based on score
gradeSchema.methods.calculateGradeLetter = function() {
  const score = this.score;
  if (score >= 90) return 'A+';      // 90-100: Excellent (Green)
  if (score >= 85) return 'A';       // 85-89: Very Good
  if (score >= 80) return 'A-';      // 80-84: Good (Blue)
  if (score >= 75) return 'B+';      // 75-79: Above Average
  if (score >= 70) return 'B';       // 70-74: Average (Yellow)
  if (score >= 65) return 'B-';      // 65-69: Below Average
  if (score >= 60) return 'C+';      // 60-64: Poor (Orange)
  if (score >= 55) return 'C';       // 55-59: Very Poor
  if (score >= 50) return 'C-';      // 50-54: Failing
  if (score >= 40) return 'D';       // 40-49: Failing (Red)
  return 'F';                         // 0-39: Fail
};

// Pre-save middleware to auto-populate fields from Student and calculate grade
gradeSchema.pre('save', async function(next) {
  try {
    // Calculate grade letter
    this.gradeLetter = this.calculateGradeLetter();
    
    // Auto-populate student info if not provided
    if (this.studentId && (!this.studentName || !this.studentClass)) {
      const Student = mongoose.model('Student');
      const student = await Student.findById(this.studentId);
      
      if (student) {
        this.studentName = student.fullName;
        this.studentClass = student.className;
      }
    }
    
    // Auto-populate teacher info if not provided
    if (this.teacherId && !this.teacherName) {
      const Teacher = mongoose.model('Teacher');
      const teacher = await Teacher.findById(this.teacherId);
      
      if (teacher) {
        this.teacherName = teacher.teacherName;
      }
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-update middleware to recalculate grade letter and update student info
gradeSchema.pre('findOneAndUpdate', async function(next) {
  try {
    const update = this.getUpdate();
    
    // Handle $set updates
    if (update.$set) {
      // Recalculate grade letter if score is updated
      if (update.$set.score !== undefined) {
        const score = update.$set.score;
        let gradeLetter;
        
        if (score >= 90) gradeLetter = 'A+';
        else if (score >= 85) gradeLetter = 'A';
        else if (score >= 80) gradeLetter = 'A-';
        else if (score >= 75) gradeLetter = 'B+';
        else if (score >= 70) gradeLetter = 'B';
        else if (score >= 65) gradeLetter = 'B-';
        else if (score >= 60) gradeLetter = 'C+';
        else if (score >= 55) gradeLetter = 'C';
        else if (score >= 50) gradeLetter = 'C-';
        else if (score >= 40) gradeLetter = 'D';
        else gradeLetter = 'F';
        
        update.$set.gradeLetter = gradeLetter;
      }
      
      // Update student info if studentId changed
      if (update.$set.studentId) {
        const Student = mongoose.model('Student');
        const student = await Student.findById(update.$set.studentId);
        
        if (student) {
          update.$set.studentName = student.fullName;
          update.$set.studentClass = student.className;
        }
      }
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Static method to get grade statistics (for dashboard)
gradeSchema.statics.getStatistics = async function(filters = {}) {
  const query = {};
  
  // Build query based on filters
  if (filters.class) {
    query.studentClass = filters.class;
  }
  if (filters.subject) {
    query.subject = filters.subject;
  }
  if (filters.teacherId) {
    query.teacherId = filters.teacherId;
  }
  if (filters.academicYear) {
    query.academicYear = filters.academicYear;
  }
  if (filters.term) {
    query.term = filters.term;
  }

  const grades = await this.find(query);
  
  if (grades.length === 0) {
    return {
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      totalGrades: 0
    };
  }

  const scores = grades.map(g => g.score);
  const sum = scores.reduce((acc, score) => acc + score, 0);
  
  return {
    averageScore: Math.round(sum / scores.length),
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores),
    totalGrades: grades.length,
    // Additional statistics
    passCount: grades.filter(g => g.score >= 40).length,
    failCount: grades.filter(g => g.score < 40).length,
    excellentCount: grades.filter(g => g.score >= 90).length
  };
};

// Static method to get class-wise performance
gradeSchema.statics.getClassPerformance = async function(teacherId) {
  const pipeline = [
    { $match: { teacherId: new mongoose.Types.ObjectId(teacherId) } },
    {
      $group: {
        _id: '$studentClass',
        averageScore: { $avg: '$score' },
        totalStudents: { $addToSet: '$studentId' },
        totalGrades: { $sum: 1 }
      }
    },
    {
      $project: {
        class: '$_id',
        averageScore: { $round: ['$averageScore', 2] },
        studentCount: { $size: '$totalStudents' },
        totalGrades: 1,
        _id: 0
      }
    },
    { $sort: { averageScore: -1 } }
  ];
  
  return await this.aggregate(pipeline);
};

// Static method to get subject-wise performance
gradeSchema.statics.getSubjectPerformance = async function(filters = {}) {
  const matchStage = {};
  
  if (filters.teacherId) {
    matchStage.teacherId = new mongoose.Types.ObjectId(filters.teacherId);
  }
  if (filters.class) {
    matchStage.studentClass = filters.class;
  }
  
  const pipeline = [
    { $match: matchStage },
    {
      $group: {
        _id: '$subject',
        averageScore: { $avg: '$score' },
        highestScore: { $max: '$score' },
        lowestScore: { $min: '$score' },
        totalGrades: { $sum: 1 }
      }
    },
    {
      $project: {
        subject: '$_id',
        averageScore: { $round: ['$averageScore', 2] },
        highestScore: 1,
        lowestScore: 1,
        totalGrades: 1,
        _id: 0
      }
    },
    { $sort: { averageScore: -1 } }
  ];
  
  return await this.aggregate(pipeline);
};

// Indexes for faster queries
gradeSchema.index({ studentId: 1, subject: 1, academicYear: 1, term: 1 });
gradeSchema.index({ teacherId: 1 });
gradeSchema.index({ studentClass: 1 });
gradeSchema.index({ subject: 1 });
gradeSchema.index({ studentClass: 1, subject: 1 });
gradeSchema.index({ academicYear: 1, term: 1 });
gradeSchema.index({ score: 1 });
gradeSchema.index({ createdAt: -1 });

// Virtual for formatted score display
gradeSchema.virtual('scorePercent').get(function() {
  return `${this.score}%`;
});

// Virtual for student reference
gradeSchema.virtual('student', {
  ref: 'Student',
  localField: 'studentId',
  foreignField: '_id',
  justOne: true
});

// Virtual for teacher reference
gradeSchema.virtual('teacher', {
  ref: 'Teacher',
  localField: 'teacherId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtuals are included in JSON
gradeSchema.set('toJSON', { virtuals: true });
gradeSchema.set('toObject', { virtuals: true });

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;