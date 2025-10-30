const Rental = require('../models/Rental');

// @desc    Get all available rentals (Public)
// @route   GET /api/rentals
// @access  Public
exports.getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ availability: true }).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: rentals.length,
      data: rentals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all rentals (Admin)
// @route   GET /api/rentals/admin/all
// @access  Private/Admin
exports.getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find().sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: rentals.length,
      data: rentals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single rental
// @route   GET /api/rentals/:id
// @access  Public
exports.getRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found'
      });
    }

    res.status(200).json({
      success: true,
      data: rental
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new rental
// @route   POST /api/rentals
// @access  Private/Admin
exports.createRental = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const rental = await Rental.create(req.body);

    res.status(201).json({
      success: true,
      data: rental
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update rental
// @route   PUT /api/rentals/:id
// @access  Private/Admin
exports.updateRental = async (req, res) => {
  try {
    let rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found'
      });
    }

    rental = await Rental.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: rental
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete rental
// @route   DELETE /api/rentals/:id
// @access  Private/Admin
exports.deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found'
      });
    }

    await rental.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
