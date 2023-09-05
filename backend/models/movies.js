// const mongoose = require('mongoose');

// const movieSchema = new mongoose.Schema({
//   title: String,
//   releaseYear: Number,
//   // Add other fields as needed
// });

// const Movie = mongoose.model('Movie', movieSchema);

// module.exports = Movie;

// backend/models/movies.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  releaseYear: Number,
  showtimes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Showtimes',
  }],
  // Add other fields as needed
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
