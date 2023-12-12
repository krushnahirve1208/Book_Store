// Import the express module
const express = require('express');
require('dotenv').config();
const bookRouter = require('./Routes/bookRouter');
const connectDB = require('./Config/db');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Define a route for the home page
app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

// Router to handle app request related to /api/books
app.use('/api/books', bookRouter);

// Set the port for the server to listen on
const PORT = process.env.PORT;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
