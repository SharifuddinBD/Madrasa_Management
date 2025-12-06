// models/Homework.js
const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'বিষয় প্রয়োজন'],
    trim: true
  },
  assignment: {
    type: String,
    required: [true, 'কাজের বিবরণ প্রয়োজন'],
    trim: true
  },
  dueDate: {
    type: Date,
    required: [true, 'শেষ তারিখ প্রয়োজন'],
    validate: {
      validator: function(value) {
        // Allow today's date or future dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value >= today;
      },
      message: 'শেষ তারিখ আজকের বা ভবিষ্যতের তারিখ হতে হবে'
    }
  },
  className: {
    type: String,
    enum: [
      'madani-first',
      'madani-second',
      'hifz-beginner',
      'hifz-intermediate',
      'hifz-advanced',
      'nazera',
      'qaida'
    ],
    trim: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  teacherName: {
    type: String,
    trim: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedBy: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    completedDate: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['active', 'expired', 'completed'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for faster searches
homeworkSchema.index({ subject: 1 });
homeworkSchema.index({ className: 1 });
homeworkSchema.index({ teacherId: 1 });
homeworkSchema.index({ dueDate: 1 });
homeworkSchema.index({ status: 1 });

// Virtual to check if homework is overdue
homeworkSchema.virtual('isOverdue').get(function() {
  return new Date() > this.dueDate && !this.isCompleted;
});

// Method to update status based on due date
homeworkSchema.methods.updateStatus = function() {
  const now = new Date();
  if (this.isCompleted) {
    this.status = 'completed';
  } else if (now > this.dueDate) {
    this.status = 'expired';
  } else {
    this.status = 'active';
  }
  return this.save();
};

// Static method to get homework by class
homeworkSchema.statics.getByClass = function(className) {
  return this.find({ className, status: { $ne: 'expired' } })
    .sort({ dueDate: 1 });
};

// Static method to get homework by teacher
homeworkSchema.statics.getByTeacher = function(teacherId) {
  return this.find({ teacherId })
    .sort({ dueDate: 1 });
};

// Ensure virtuals are included in JSON
homeworkSchema.set('toJSON', { virtuals: true });
homeworkSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Homework', homeworkSchema);