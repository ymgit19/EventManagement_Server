const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Please provide an item name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    trim: true
  },
  pricing: {
    hourly: Number,
    daily: Number,
    weekly: Number
  },
  images: [String],
  availability: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  specifications: {
    type: mongoose.Schema.Types.Mixed
  },
  rentalTerms: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
RentalSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Rental', RentalSchema);
