const Notice = require('../models/Notice');
const asyncHandler = require('../middleware/async');

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public
exports.getAllNotices = asyncHandler(async (req, res) => {
  const notices = await Notice.find()
    .sort({ createdAt: -1 })
    .select('-__v');

  res.status(200).json({
    success: true,
    count: notices.length,
    data: notices
  });
});

// @desc    Get single notice
// @route   GET /api/notices/:id
// @access  Public
exports.getNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findById(req.params.id);

  if (!notice) {
    return res.status(404).json({
      success: false,
      error: 'Notice not found'
    });
  }

  res.status(200).json({
    success: true,
    data: notice
  });
});

// @desc    Create new notice
// @route   POST /api/notices
// @access  Private/Admin
exports.createNotice = asyncHandler(async (req, res) => {
  const { title, content, type } = req.body;

  // Validation
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      error: 'Please provide title and content'
    });
  }

  const notice = await Notice.create({
    title,
    content,
    type: type || 'info'
  });

  res.status(201).json({
    success: true,
    data: notice
  });
});

// @desc    Update notice
// @route   PUT /api/notices/:id
// @access  Private/Admin
exports.updateNotice = asyncHandler(async (req, res) => {
  let notice = await Notice.findById(req.params.id);

  if (!notice) {
    return res.status(404).json({
      success: false,
      error: 'Notice not found'
    });
  }

  notice = await Notice.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: notice
  });
});

// @desc    Delete notice
// @route   DELETE /api/notices/:id
// @access  Private/Admin
exports.deleteNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findById(req.params.id);

  if (!notice) {
    return res.status(404).json({
      success: false,
      error: 'Notice not found'
    });
  }

  await notice.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get recent notices
// @route   GET /api/notices/recent/:limit
// @access  Public
exports.getRecentNotices = asyncHandler(async (req, res) => {
  const limit = parseInt(req.params.limit) || 5;

  const notices = await Notice.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');

  res.status(200).json({
    success: true,
    count: notices.length,
    data: notices
  });
});