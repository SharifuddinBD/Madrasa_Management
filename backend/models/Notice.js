const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'নোটিশের শিরোনাম আবশ্যক'],
    trim: true,
    maxlength: [200, 'শিরোনাম সর্বোচ্চ 200 অক্ষর হতে পারে']
  },
  content: {
    type: String,
    required: [true, 'নোটিশের বিষয়বস্তু আবশ্যক'],
    trim: true
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'success'],
    default: 'info'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  expiresAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  targetAudience: {
    type: [String],
    enum: ['all', 'students', 'teachers', 'staff', 'parents'],
    default: ['all']
  },
  attachments: [{
    filename: String,
    url: String,
    fileType: String
  }]
}, {
  timestamps: true
});

// Index for efficient querying
noticeSchema.index({ isActive: 1, createdAt: -1 });
noticeSchema.index({ expiresAt: 1 });

// Virtual for checking if notice is expired
noticeSchema.virtual('isExpired').get(function() {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
});

// Method to deactivate expired notices
noticeSchema.statics.deactivateExpired = async function() {
  const now = new Date();
  await this.updateMany(
    { expiresAt: { $lte: now }, isActive: true },
    { $set: { isActive: false } }
  );
};

module.exports = mongoose.model('Notice', noticeSchema);
