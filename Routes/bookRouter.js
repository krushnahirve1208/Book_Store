// routes/books.js

const express = require('express');
const router = express.Router();
const booksController = require('./../Controller/bookController');

// Endpoint 1: Retrieve All Books
router.get('/', booksController.getAllBooks);

// Endpoint 2: Add a New Book
router.post('/', booksController.addNewBook);

// Endpoint 3: Update Book Details
router.put('/:id', booksController.updateBookDetails);

module.exports = router;
