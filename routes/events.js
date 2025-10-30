const express = require('express');
const router = express.Router();
const {
  getEvents,
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

router.route('/')
  .get(getEvents)
  .post(protect, adminAuth, createEvent);

router.route('/admin/all')
  .get(protect, adminAuth, getAllEvents);

router.route('/:id')
  .get(getEvent)
  .put(protect, adminAuth, updateEvent)
  .delete(protect, adminAuth, deleteEvent);

module.exports = router;
