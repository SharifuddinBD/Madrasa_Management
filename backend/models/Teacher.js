const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  // Personal Information
  teacherName: {
    type: String,
    required: [true, 'শিক্ষকের নাম প্রয়োজন'],
    trim: true
  },
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
  spouseName: {
    type: String,
    trim: true
  },
  birthDate: {
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
  nid: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^\d{10}$|^\d{13}$|^\d{17}$/.test(v);
      },
      message: 'জাতীয় পরিচয়পত্র নম্বর ১০, ১৩ বা ১৭ ডিজিটের হতে হবে'
    }
  },
  
  // Contact Information
  currentAddress: {
    type: String,
    required: [true, 'বর্তমান ঠিকানা প্রয়োজন'],
    trim: true
  },
  permanentAddress: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'মোবাইল নম্বর প্রয়োজন'],
    validate: {
      validator: function(v) {
        return /^01[3-9]\d{8}$/.test(v.replace(/[-\s]/g, ''));
      },
      message: 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)'
    }
  },
  emergencyContact: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^01[3-9]\d{8}$/.test(v.replace(/[-\s]/g, ''));
      },
      message: 'সঠিক জরুরি যোগাযোগ নম্বর দিন (01XXXXXXXXX)'
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'সঠিক ইমেইল ঠিকানা দিন'
    }
  },
  
  // Educational Qualifications
  education: {
    type: String,
    required: [true, 'শিক্ষাগত যোগ্যতা প্রয়োজন'],
    trim: true
  },
  university: {
    type: String,
    trim: true
  },
  passingYear: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^\d{4}$/.test(v);
      },
      message: 'পাসের বছর ৪ ডিজিটের হতে হবে'
    }
  },
  subject: {
    type: String,
    trim: true
  },
  
  // Experience
  experience: {
    type: String,
    trim: true
  },
  previousInstitution: {
    type: String,
    trim: true
  },
  
  // Job Information
  joiningDate: {
    type: Date,
    required: [true, 'যোগদানের তারিখ প্রয়োজন'],
    default: Date.now
  },
  designation: {
    type: String,
    required: [true, 'পদবী প্রয়োজন'],
    trim: true
  },
  salary: {
    type: String,
    trim: true
  },
  
  // Additional Information
  medicalConditions: {
    type: String,
    trim: true
  },
  references: {
    type: String,
    trim: true
  },
  specialSkills: {
    type: String,
    trim: true
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for calculating age
teacherSchema.virtual('age').get(function() {
  if (!this.birthDate) return null;
  const today = new Date();
  const birthDate = new Date(this.birthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for calculating years of service
teacherSchema.virtual('yearsOfService').get(function() {
  if (!this.joiningDate) return null;
  const today = new Date();
  const joiningDate = new Date(this.joiningDate);
  let years = today.getFullYear() - joiningDate.getFullYear();
  const monthDiff = today.getMonth() - joiningDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < joiningDate.getDate())) {
    years--;
  }
  return years;
});

// Virtual for full name with designation
teacherSchema.virtual('fullNameWithDesignation').get(function() {
  return `${this.teacherName} (${this.designation || 'শিক্ষক'})`;
});

// Index for faster searches
teacherSchema.index({ teacherName: 1 });
teacherSchema.index({ phoneNumber: 1 });
teacherSchema.index({ email: 1 });
teacherSchema.index({ designation: 1 });
teacherSchema.index({ isActive: 1 });

// Ensure virtuals are included in JSON
teacherSchema.set('toJSON', { virtuals: true });
teacherSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Teacher', teacherSchema);