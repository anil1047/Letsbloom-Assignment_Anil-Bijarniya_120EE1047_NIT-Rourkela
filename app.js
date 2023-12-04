const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const seedDatabase = async () => {
  await Book.deleteMany();
  await Book.create([
    { title: 'Book 1', author: 'Author 1', genre: 'Genre 1' },
    { title: 'Book 2', author: 'Author 2', genre: 'Genre 2' },
    
  ]);
};

seedDatabase();

// API Routes
app.use('/api/books', bookRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
