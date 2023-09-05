// // backend/routes/movies.js
// const express = require('express');
// const router = express.Router();
// const Movie = require('../models/movies'); // Import your Movie model

// // Fetch all movies
// router.get('/', (req, res) => {
//   Movie.find()
//     .then((movies) => {
//       res.json(movies);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// module.exports = router;

// backend/routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/movies'); // Import your Movie model

// Fetch all movies with associated showtimes
router.get('/', (req, res) => {
  Movie.find()
    .populate('showtimes')
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
