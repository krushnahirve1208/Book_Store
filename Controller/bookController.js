// controllers/booksController.js
const mongoose = require('mongoose');
const Book = require('./../Model/bookModel');

// Endpoint 1: Retrieve All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Endpoint 2: Add a New Book
const addNewBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear, ISBN, description } = req.body;

    // Create a new book instance
    const newBook = new Book({
      title,
      author,
      genre,
      publishedYear,
      ISBN,
      description,
    });

    // Save the new book to the database
    const savedBook = await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.ISBN) {
      // Duplicate key error handling for ISBN
      res.status(400).json({ error: 'ISBN must be unique' });
    } else {
      // Other errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

const updateBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    // Try to find the book by ID
    const existingBook = await Book.findById(bookId);

    // If the book is not found, return a 404 status
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Update the existing book with the new data
    existingBook.set(req.body);

    // Validate the updated data
    const validationError = existingBook.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    // Save the updated book to the database
    const updatedBook = await existingBook.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Validation error handling
      res.status(400).json({ error: error.message });
    } else {
      // Other errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = {
  getAllBooks,
  addNewBook,
  updateBookDetails,
};
