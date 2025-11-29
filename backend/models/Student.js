const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'শিক্ষার্থীর নাম প্রয়োজন'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'জন্ম তারিখ প্রয়োজন'],
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'জন্ম তারিখ ভবিষ্যতের হতে পারে না'
    }
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  
  // Guardian Information
  fatherName: {
    type: String,
    required: [true, 'পিতার নাম প্রয়োজন'],
    trim: true
  },
  motherName: {
    type: String,
    required: [true, 'মাতার নাম প্রয়োজন'],
    trim: true
  },
  primaryGuardian: {
    type: String,
    required: [true, 'অভিভাবকের নাম প্রয়োজন'],
    trim: true
  },
  emergencyContact: {
    type: String,
    trim: true
  },
  
  // Contact Information
  phone: {
    type: String,
    required: [true, 'ফোন নম্বর প্রয়োজন'],
    validate: {
      validator: function(v) {
        return /^01[3-9]\d{8}$/.test(v.replace(/\s/g, ''));
      },
      message: 'সঠিক ফোন নম্বর দিন (01XXXXXXXXX)'
    }
  },
  currentAddress: {
    type: String,
    required: [true, 'বর্তমান ঠিকানা প্রয়োজন'],
    trim: true
  },
  permanentAddress: {
    type: String,
    required: [true, 'স্থায়ী ঠিকানা প্রয়োজন'],
    trim: true
  },
  
  // Academic Information
  className: {
    type: String,
    required: [true, 'ক্লাস নির্বাচন প্রয়োজন'],
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
  teacherName: {
    type: String,
    required: [true, 'জিম্মাদার উস্তাজের নাম প্রয়োজন'],
    trim: true
  },
  previousEducation: {
    type: String,
    trim: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  
  // Health Information
  medicalConditions: {
    type: String,
    trim: true
  },
  allergies: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);