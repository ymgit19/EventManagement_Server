const express = require('express');
const router = express.Router();
const {
  getRentals,
  getAllRentals,
  getRental,
  createRental,
  updateRental,
  deleteRental
} = require('../controllers/rentalController');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

router.route('/')
  .get(getRentals)
  .post(protect, adminAuth, createRental);

router.route('/admin/all')
  .get(protect, adminAuth, getAllRentals);

router.route('/:id')
  .get(getRental)
  .put(protect, adminAuth, updateRental)
  .delete(protect, adminAuth, deleteRental);

module.exports = router;
