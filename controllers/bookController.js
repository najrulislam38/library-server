const Book = require("./../models/bookModel");

const addBook = async (req, res) => {
  try {
    const { title, author, totalCopies, genre } = req.body;

    const newBook = new Book({
      title,
      author,
      totalCopies,
      availableCopies: totalCopies,
      genre,
    });

    await newBook.save();

    res.status(201).send({
      success: true,
      message: "Book created successfully.",
      data: newBook,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could not add book",
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could not retrieve book",
      error,
    });
  }
};

module.exports = { addBook, getBooks };
