const mongoose = require('mongoose');

const validator = require('validator');

const tripsSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: [validator.isAlpha, 'A name should only contain alphabets'],
    required: [true, 'A tour should have a name'],
    minlength: [5, 'A tour must have more than 10 letters in the name'],
    maxlength: [40, 'A tour must have lesss than 40 letters in  the name'],
    unique: true
  },
  city: {
    type: String,
    validate: [validator.isAlpha, 'City name should contain Alphabets only'],
    required: true
  },
  languages: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'A trip should have a price']
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'Group size for a tour should be provided']
  },

  ratingsAverage: {
    min: [0, 'The ratings must be greater than  0'],
    max: [5, 'The ratings must be less than  5'],
    type: Number,
    default: 4.5
  },

  reviews: {
    type: Object
  },
  summary: {
    type: String,
    required: [true, 'The trip must have a summary'],
    trim: true
  },
  description: {
    type: String,
    ////////////////////////////////
    trim: true
  },
  imageCover: {
    type: String
  },
  images: {
    type: [String],
    required: false
  }
});

const Trips = mongoose.model('Trip', tripsSchema);
module.exports = Trips;
