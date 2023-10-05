const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  publishedDate: String
},{
  collection: 'bookInfo'
});

const Book = mongoose.model('Book', bookSchema);

module.exports.Book = Book;