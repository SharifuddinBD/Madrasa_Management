const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, 'কোর্সের নাম প্রয়োজন'],
    trim: true
  },
  courseCode: {
    type: String,
    required: [true, 'কোর্স কোড প্রয়োজন'],
    trim: true,
    unique: true,
    uppercase: true
  },
  className: {
    type: String,
    required: [true, 'ক্লাস নির্বাচন প্রয়োজন'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    default: null
  }
}, {
  timestamps: true
});

// Index for faster searches
courseSchema.index({ courseCode: 1 });
courseSchema.index({ className: 1 });
courseSchema.index({ teacherId: 1 });

module.exports = mongoose.model('Course', courseSchema);
