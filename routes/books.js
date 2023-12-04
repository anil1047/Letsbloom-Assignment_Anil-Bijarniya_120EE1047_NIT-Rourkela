const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Endpoint 1: Retrieve All Books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint 2: Add a New Book
router.post('/', async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Duplicate entry' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Endpoint 3: Update Book Details
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(updatedBook);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
