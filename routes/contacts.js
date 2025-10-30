const express = require('express');
const router = express.Router();
const {
  submitInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

router.route('/')
  .post(submitInquiry)
  .get(protect, adminAuth, getInquiries);

router.route('/:id')
  .get(protect, adminAuth, getInquiry)
  .put(protect, adminAuth, updateInquiry)
  .delete(protect, adminAuth, deleteInquiry);

module.exports = router;
