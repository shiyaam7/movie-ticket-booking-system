// const mongoose = require('mongoose');
// const Movie = require('./models/movies'); // Import your Movie model
// const express = require('express');
// const passport = require('passport');
// const session = require('express-session');
// const User = require('./models/user'); // Import your user model
// const app = express();
// const moviesData = require('../frontend/movies.json');
// const auths = require('./routes/auth');

// require('./config/passport');

// app.use(
//     session({
//         secret: 'your-secret-key',
//         resave: true,
//         saveUninitialized: true,
//     })
// );

// // Initialize Passport and restore authentication state
// app.use(passport.initialize());
// app.use(passport.session());
// app.use('/auth', auths);

// // Replace this URL with your MongoDB connection URL
// const mongoURI = 'mongodb://localhost:27017/movie-ticket-booking';

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on('connected', () => {
//   console.log('Connected to the database');  
// });

// mongoose.connection.on('error', (err) => {
//   console.error(`Database connection error: ${err}`);
// });

// // Import your movies router
// const moviesRouter = require('./routes/movies');

// // Use the movies router with the '/movies' path
// app.use('/movies', moviesRouter);

// const http = require('http');

// // Create an HTTP server
// // const server = http.createServer((req, res) => {
// //   // Set the response HTTP headers
// //   res.writeHead(200, { 'Content-Type': 'text/plain' });

// //   // Send a response to the client
// //   res.end('Hello, World!\n');
// // });

// // Define a route to serve movies data
// app.get('/api/movies', (req, res) => {
//   // Instead of sending "Hello, World!", send the moviesData JSON
//   res.json(moviesData);
// });

// // Specify the port and IP address for the server to listen on
// const port = process.env.PORT || 3000;
// const hostname = '127.0.0.1';

// // Start the server and listen for incoming requests
// server.listen(port, hostname, () => {
//   console.log(`Server is running at http://${hostname}:${port}/`);
// });

// // Define a route to serve movies data
// app.get('/api/movies', (req, res) => {
//   res.json(moviesData);
// });


// app.get('/profile', (req, res, next) => {
//     if (req.isAuthenticated()) {
//       // Authenticated user can access this route
//       res.send('Welcome to your profile.');
//     } else {
//       // Redirect unauthenticated users to the login page
//       res.send('/login');
//     }
// });

const mongoose = require('mongoose');
const Movie = require('./models/movies'); // Import your Movie model
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/user'); // Import your user model
const app = express();
const moviesData = require('../frontend/movies.json');
const auths = require('./routes/auth');

require('./config/passport');

app.use(
    session({
        secret: 'your-secret-key',
        resave: true,
        saveUninitialized: true,
    })
);

// Initialize Passport and restore authentication state
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auths);

// Replace this URL with your MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017/movie-ticket-booking';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to the database');  
});

mongoose.connection.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});

// Import your movies router
const moviesRouter = require('./routes/movies');

// Use the movies router with the '/movies' path
app.use('/movies', moviesRouter);

// Define a route to serve movies data
app.get('/api/movies', (req, res) => {
  res.json(moviesData);
});

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Movie Ticket Booking System API.');
});

const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});

app.get('/profile', (req, res, next) => {
    if (req.isAuthenticated()) {
      // Authenticated user can access this route
      res.send('Welcome to your profile.');
    } else {
      // Redirect unauthenticated users to the login page
      res.send('/login');
    }
});
