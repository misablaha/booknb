const mongoose = require('../mongodb');

const bookSchema = new mongoose.Schema({
  _id: String,
  title: String,
  subtitle: String,
  author: String,
  publications: Array,
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
