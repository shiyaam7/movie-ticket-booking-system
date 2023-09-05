// backend/models/showtimes.js
const mongoose = require('mongoose');

const showtimesSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  showtime: Date,
  theater: String,
  // Add other fields as needed
});

const Showtimes = mongoose.model('Showtimes', showtimesSchema);

module.exports = Showtimes;
