// models/bookModel.js

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  publishedYear: {
    type: Number,
  },
  ISBN: {
    type: String,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  // Timestamps to track creation and modification dates
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
