const express = require('express');
const router = express.Router();
const {
  getAllNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
  getRecentNotices
} = require('../controllers/noticeController');

// Public routes
router.get('/', getAllNotices);
router.get('/recent/:limit', getRecentNotices);
router.get('/:id', getNotice);

// Protected routes (add authentication middleware when ready)
router.post('/', createNotice);
router.put('/:id', updateNotice);
router.delete('/:id', deleteNotice);

module.exports = router;
