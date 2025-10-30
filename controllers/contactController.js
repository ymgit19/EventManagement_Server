const Contact = require('../models/Contact');

// @desc    Submit contact inquiry
// @route   POST /api/contacts
// @access  Public
exports.submitInquiry = async (req, res) => {
  try {
    req.body.ipAddress = req.ip;
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all inquiries
// @route   GET /api/contacts
// @access  Private/Admin
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Contact.find().sort('-createdAt');

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single inquiry
// @route   GET /api/contacts/:id
// @access  Private/Admin
exports.getInquiry = async (req, res) => {
  try {
    const inquiry = await Contact.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update inquiry
// @route   PUT /api/contacts/:id
// @access  Private/Admin
exports.updateInquiry = async (req, res) => {
  try {
    let inquiry = await Contact.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    inquiry = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Contact.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    await inquiry.deleteOne();

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
