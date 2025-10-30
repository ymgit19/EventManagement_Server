const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide an event description']
  },
  location: {
    venue: String,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  date: {
    type: Date,
    required: [true, 'Please provide an event date']
  },
  category: {
    type: String,
    trim: true
  },
  images: [String],
  capacity: {
    type: Number
  },
  isPublished: {
    type: Boolean,
    default: false
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
EventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', EventSchema);
