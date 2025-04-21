const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, require: true },
  author: { type: String, required: true },
  totalCopies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
  genre: { type: String, required: true },
  borrowedCount: { type: Number, default: 0 },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
