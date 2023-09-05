// backend/routes/showtimes.js
const express = require('express');
const router = express.Router();
const Showtimes = require('../models/showtimes'); // Import your Showtimes model

// Fetch showtimes by movie ID
router.get('/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  
  Showtimes.find({ movieId })
    .then((showtimes) => {
      res.json(showtimes);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
