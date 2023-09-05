// // backend/routes/auth.js
// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const bcrypt = require('bcryptjs');
// const User = require('../models/user');

// // User registration
// router.post('/register', (req, res) => {
//   const { email, password } = req.body;
//   User.findOne({ email: email }).then((user) => {
//     if (user) {
//       return res.status(400).json({ message: 'Email already exists' });
//     } else {
//       const newUser = new User({
//         email,
//         password,
//       });

//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;
//           newUser.password = hash;
//           newUser.save().then((user) => {
//             return res.status(201).json(user);
//           });
//         });
//       });
//     }
//   });
// });

// // User login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(401).json({ message: 'Incorrect credentials' });
//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       return res.status(200).json({ message: 'Logged in successfully' });
//     });
//   })(req, res, next);
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

// User registration
router.post(
  '/register',
  [
    // Validate email and password
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if the user already exists
    User.findOne({ email: email }).then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Email already exists' });
      } else {
        // Create a new user
        const newUser = new User({
          email,
          password,
        });

        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            // Save the user to the database
            newUser.save().then((user) => {
              return res.status(201).json({ message: 'User registered successfully' });
            });
          });
        });
      }
    });
  }
);

// User login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Incorrect credentials' });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: 'Logged in successfully' });
    });
  })(req, res, next);
});

module.exports = router;
